const fs = require("fs")
const {NginxLogLine} = require("./nginx_log_line")

const numberOfLines = process.argv[2] || 1000;
const fileName = process.argv[3] || './nginx.log';

fs.readFileSync(fileName, "utf-8").split("\n").forEach((line, index) => {
    line = line.trim()
    if (line.length > 0 && numberOfLines > index) {
        const nll = new NginxLogLine(line)
        console.log(index, nll)
    }
})
