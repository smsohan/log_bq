const fs = require("fs")
const { Agent } = require("http")

class NginxLogLine {
    constructor(log) {
        let rest, more
        [this.ipAddress, this.dateTime, ...rest] = log.split(' ');
        if(rest){
          this.userAgent = [...rest.slice(0,-4)].join(' ');
          [this.requestMethod, this.requestPath, this.responseStatusCode, this.responseBytes] = [...rest.slice(-4)]
        }
    }

    get ipAddress() {
        return this._ipAddress;
    }

    set ipAddress(ipAddress) {
        this._ipAddress = ipAddress;
    }

    get dateTime() {
        return this._dateTime;
    }

    set dateTime(dateTime) {
        this._dateTime = dateTime;
    }

    get userAgent() {
        return this._userAgent;
    }

    set userAgent(userAgent) {
        this._userAgent = userAgent;
    }

    get requestMethod() {
        return this._requestMethod;
    }

    set requestMethod(requestMethod) {
        this._requestMethod = requestMethod;
    }

    get requestPath() {
        return this._requestPath;
    }

    set requestPath(requestPath) {
        this._requestPath = requestPath;
    }

    get responseStatusCode() {
        return this._responseStatusCode;
    }

    set responseStatusCode(responseStatusCode) {
        this._responseStatusCode = parseInt(responseStatusCode, 10);
    }

    get responseBytes() {
        return this._responseBytes;
    }

    set responseBytes(responseBytes) {
        this._responseBytes = parseInt(responseBytes, 10);
    }

    get referer() {
        return this._referer;
    }

    set referer(referer) {
        this._referer = referer;
    }

    toString() {
        return `${this.ipAddress} ${this.dateTime} ${this.userAgent} ${this.requestMethod} ${this.requestPath} ${this.responseStatusCode} ${this.responseBytes}`;
    }
}

const numberOfLines = process.argv[2] || 1000;
const fileName = process.argv[3] || './nginx.log';

const fileDescriptor = fs.openSync(fileName, 'r')

fs.readFileSync(fileName, "utf-8").split("\n").forEach((line, index) => {
    line = line.trim()
    if (line.length > 0 && numberOfLines > index) {
        const nll = new NginxLogLine(line)
        console.log(index, nll)
    }
})
