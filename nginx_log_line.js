const fs = require("fs")
const { Agent } = require("http")

class NginxLogLine {
    constructor(log) {
        if(log === null || log === undefined){
          return
        }
        let rest
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
        //TODO: Convert to the Date type
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

    toString() {
        return `${this.ipAddress} ${this.dateTime} ${this.userAgent} ${this.requestMethod} ${this.requestPath} ${this.responseStatusCode} ${this.responseBytes}`;
    }

    toRow() {
        return {
            ipAddress: this.ipAddress,
            dateTime: this.dateTime?.slice(0, -1),
            userAgent: this.userAgent,
            requestMethod: this.requestMethod,
            requestPath: this.requestPath,
            responseStatusCode: this.responseStatusCode,
            responseBytes: this.responseBytes
        }
    }
}

module.exports = {NginxLogLine};