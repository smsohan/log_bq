# log_bq

This is a sample application that subscribes to a pub/sub message when nginx log files are uploaded
to a Google Cloud Storage bucket and writes the data to a BigQuery table.

Nginx logs used for this application has the following format

```txt
205.105.208.67 2023-09-20T21:11:45.225Z Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36 GET /upload 404 10852
```

And the BigQuery table has the following schema:

```sql
CREATE TABLE `<gcp_project_id>.<bq_dataset_name>.<bq_table_name>`
(
  ipAddress STRING,
  dateTime DATETIME,
  userAgent STRING,
  requestMethod STRING,
  requestPath STRING,
  responseStatusCode INT64,
  responseBytes INT64
);
```

## Generate some random nginx logs

```bash
$ node generate.js [number of log lines] [filename]
```

By default `number of log lines` is set to `1000` and `filename` is set to `'./nginx.log'`


## Create necessary GCP resources

1. Google Cloud Storage Bucket
2. Google Cloud Run Service
3. Create a trigger to connect Cloud
4. Create the BigQuery dataset and tables

## Deploy the service to Cloud Run

```bash
$ PROJECT_ID=<GCP PROJECT ID> DATASET=<BQ Dataset name> TABLE=<BQ Table name> ./deploy.sh
```

