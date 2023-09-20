const fs = require('fs');
const {NginxLogLine} = require("./nginx_log_line")

// Generate a random IP address
function generateRandomIp() {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

// Generate a random user agent
function generateRandomUserAgent() {
  const userAgents = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_16_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36',
    'curl/7.88.0',
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

// Generate a random request method
function generateRandomRequestMethod() {
  const requestMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  return requestMethods[Math.floor(Math.random() * requestMethods.length)];
}

// Generate a random request path
function generateRandomRequestPath() {
  const requestPaths = [
    '/index.html',
    '/login',
    '/images/logo.png',
    '/api/products',
    '/errors/500',
    '/upload',
    '/healthz',
    '/metrics',
    '/favicon.ico',
  ];
  return requestPaths[Math.floor(Math.random() * requestPaths.length)];
}

// Generate a random response status code
function generateRandomResponseStatusCode() {
  const responseStatusCodes = [200, 404, 500];
  return responseStatusCodes[Math.floor(Math.random() * responseStatusCodes.length)];
}

// Generate a random response bytes
function generateRandomResponseBytes() {
  return Math.floor(Math.random() * 100000);
}

// Generate a random referer
function generateRandomReferer() {
  return '';
}

// Write a line to the log file
function writeLogLine(file, logLine) {
  fs.writeSync(file, logLine + "\n")
}

// Generate a random nginx log line
function generateRandomNginxLogLine() {
  const logLine = new NginxLogLine();
  logLine.ipAddress = generateRandomIp();
  logLine.dateTime = new Date().toISOString();
  logLine.userAgent = generateRandomUserAgent();
  logLine.requestMethod = generateRandomRequestMethod();
  logLine.requestPath = generateRandomRequestPath();
  logLine.responseStatusCode = generateRandomResponseStatusCode();
  logLine.responseBytes = generateRandomResponseBytes();
  logLine.referer = generateRandomReferer();

  return logLine.toString();
}


// Get the number of lines to generate from the command line
const numberOfLines = process.argv[2] || 1000;
const fileName = process.argv[3] || './nginx.log';

const fileDescriptor = fs.openSync(fileName, 'w')
for (let i = 0; i < numberOfLines; i++) {
  fs.writeSync(fileDescriptor, generateRandomNginxLogLine() + "\n");
}
fs.closeSync(fileDescriptor);

console.log(`Generated ${numberOfLines} random nginx log lines to nginx.log`);

