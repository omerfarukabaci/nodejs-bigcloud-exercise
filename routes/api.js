const express = require('express')
const { BigQuery } = require('@google-cloud/bigquery');
const { validateLog } = require('../helpers/requestValidationHelper');
const { object, array } = require('@hapi/joi');
const router = express.Router()

router.post('/log-event/', function(req, res){
  const datasetId = "codeway_exercise";
  const tableId = "user_logs";
  const bigquery = new BigQuery();
  const dataset = bigquery.dataset(datasetId);
  const table = dataset.table(tableId);

  // Request validation
  const { error, value } = validateLog(req.body)
  if(error) return res.status(400).json({
      msg: error
  })

  // Convert timestamps to seconds
  if (Array.isArray(req.body)) {
    req.body.forEach(element => {
      element.event_time = Math.floor(new Date(element.event_time).getTime() / 1000)
    });
  }
  else {
    req.body.event_time = Math.floor(new Date(req.body.event_time).getTime() / 1000)
  }

  table.insert(req.body)
    .then((data) => {
      const apiResponse = data[0];
      return res.status(200).json({
        message: "Success."
      })
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Something went wrong."
      })
    });
})

router.post('/get-statistics/', function(req, res){
  const bigquery = new BigQuery();

  const totalUsersQuery = ["SELECT COUNT(DISTINCT user_logs.user_id) AS total_users FROM codeway_exercise.user_logs"]
  const dailyActiveUsersQuery = [
    "SELECT",
    "TIMESTAMP_TRUNC(user_logs.event_time, DAY) AS event_date,",
    "COUNT(DISTINCT user_logs.user_id) AS daily_active_users,",
    "FROM   codeway_exercise.user_logs",
    "GROUP BY event_date",
    "ORDER BY event_date"
  ]
  const dailyAvergaDurationQuery = [
    "SELECT AVG(duration) AS daily_average_duration, event_date",
    "FROM",
    "(",
      "SELECT",
      "TIMESTAMP_TRUNC(user_logs.event_time, DAY) AS event_date,",
      "TIMESTAMP_DIFF(MAX(event_time), MIN(event_time), SECOND) AS duration,",
      "user_id",
      "FROM codeway_exercise.user_logs",
      "GROUP BY event_date, user_id",
      "ORDER BY event_date, user_id",
    ")",
    "GROUP BY event_date",
  ]

  bigquery.query({
    query: totalUsersQuery.join("\n")
  }).then(function(data) {
    const totalUsers = data[0][0]["total_users"];
    bigquery.query({
      query: dailyActiveUsersQuery.join("\n")
    }).then(function(data) {
      const dailyActiveUsers = data[0];
      bigquery.query({
        query: dailyAvergaDurationQuery.join("\n")
      }).then(function(data) {
        const dailyAverageDuration = data[0];
        return res.status(200).json({
          totalUsers: totalUsers,
          dailyActiveUsers: dailyActiveUsers,
          dailyAverageDuration: dailyAverageDuration // in seconds.
        })
      }).catch(function(error) {
        return res.status(400).json({
          message: "Something went wrong."
        })
      });
    }).catch(function(error) {
      return res.status(400).json({
        message: "Something went wrong."
      })
    });
  }).catch(function(error) {
    return res.status(400).json({
      message: "Something went wrong."
    })
  });
})

module.exports = router