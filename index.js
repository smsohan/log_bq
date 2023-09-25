const express = require('express');
const { Storage } = require('@google-cloud/storage');
const { NginxLogLine } = require("./nginx_log_line");
const {BqWriter} = require("./bq_writer");

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    // Send a simple response
    res.send('Hello, world!');
});


/* Example event
{
  kind: 'storage#object',
  id: 'log-bq/nginx.log/1695244339891301',
  selfLink: 'https://www.googleapis.com/storage/v1/b/log-bq/o/nginx.log',
  name: 'nginx.log',
  bucket: 'log-bq',
  generation: '1695244339891301',
  metageneration: '1',
  contentType: 'application/octet-stream',
  timeCreated: '2023-09-20T21:12:19.895Z',
  updated: '2023-09-20T21:12:19.895Z',
  storageClass: 'STANDARD',
  timeStorageClassUpdated: '2023-09-20T21:12:19.895Z',
  size: '157589',
  md5Hash: '6Vhn4lbIm4gL3yWWfELIdQ==',
  mediaLink: 'https://storage.googleapis.com/download/storage/v1/b/log-bq/o/nginx.log?generation=1695244339891301&alt=media',
  crc32c: 'atyaBA==',
  etag: 'COWYv6WNuoEDEAE='
}
*/

app.post('/', async (req, res) => {
    const storage = new Storage();
    //TODO: see if this can be streamed instead of loading the whole file in memory.
    const logs = (await storage.bucket(req.body.bucket).file(req.body.name).download()).toString();

    const bqRows = []
    logs.split("\n").forEach(line => {
        line = line.trim()
        if (line.length > 0) {
            bqRows.push(new NginxLogLine(line).toRow())
        }
    })

    const bqWriter = new BqWriter(process.env.PROJECT_ID, process.env.BQ_DATASET_NAME, process.env.BQ_TABLE_NAME);
    //TODO: Make this smarter so that we can write the data in chunks
    // and handle errors
    await bqWriter.load(bqRows);
    res.send(`Completed processine the file ${req.body.name}. Loaded ${bqRows.length} rows`);
});

// Start the server
app.listen(process.env.PORT || "8080", () => {
    console.log('Server listening on port 3000');
});