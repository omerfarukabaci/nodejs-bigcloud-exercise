**Log Event**
-------------
  Log event to Google BigQuery.

* **URL**

  api/log-event/

* **Method**

  `POST`

* **Request**

  * **Payload**

  ::

      [
        {
          "type": str,
          "app_id": str,
          "session_id": str,
          "event_name": str
          "event_time": timestamp,
          "page": str,
          "country": str,
          "region": str,
          "city": str,
          "user_id": str
        }
      ]

* **Success Response:**

  * **Code:** 200
  
  * **Content:**
  
  ::

      {
        "message": "Success",
      }

**Get Statistics**
------------------
  Get statistics.

* **URL**

  api/get-statistics/

* **Method**

  `POST`

* **Request**

  * **Payload**

  ::

      {}

* **Success Response:**

  * **Code:** 200
  
  * **Content:**
  
  ::

      {
        "totalUsers": 11,
        "dailyActiveUsers": [
            {
                "event_date": {
                    "value": "2020-05-16T00:00:00.000Z"
                },
                "daily_active_users": 1
            },
            {
                "event_date": {
                    "value": "2020-08-23T00:00:00.000Z"
                },
                "daily_active_users": 10
            },
            {
                "event_date": {
                    "value": "2020-08-24T00:00:00.000Z"
                },
                "daily_active_users": 10
            },
            {
                "event_date": {
                    "value": "2020-08-25T00:00:00.000Z"
                },
                "daily_active_users": 10
            }
        ],
        "dailyAverageDuration": [
            {
                "daily_average_duration": 0,
                "event_date": {
                    "value": "2020-05-16T00:00:00.000Z"
                }
            },
            {
                "daily_average_duration": 46613.399999999994,
                "event_date": {
                    "value": "2020-08-23T00:00:00.000Z"
                }
            },
            {
                "daily_average_duration": 42421.19999999999,
                "event_date": {
                    "value": "2020-08-24T00:00:00.000Z"
                }
            },
            {
                "daily_average_duration": 37470.899999999994,
                "event_date": {
                    "value": "2020-08-25T00:00:00.000Z"
                }
            }
        ]
    }
  