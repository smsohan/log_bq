const { BigQuery } = require('@google-cloud/bigquery');

class BqWriter {
    constructor(project, dataset, table) {
        this.project = project
        this.dataset = dataset
        this.table = table
        this.bigQuery = new BigQuery()
    }

    async load(rows) {
        await this.bigQuery.dataset(this.dataset).table(this.table).insert(rows);
    }
}

module.exports = {BqWriter}