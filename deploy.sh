gcloud run deploy log-bq --region us-central1 --source . \
 --set-env-vars "PROJECT_ID=$PROJECT_ID" \
 --set-env-vars "BQ_DATASET_NAME=$DATASET" \
 --set-env-vars "BQ_TABLE_NAME=$TABLE"