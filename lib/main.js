"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var integrations_1 = require("./integrations");
var apiKey = 'undefined';
var ccs = new integrations_1.Ciceksepeti(apiKey);
var today = 1653933581000;
var yesterday = 1653847181000;
var startDate = new Date(yesterday);
var endDate = new Date(today);
ccs.getOrdersBulk({
    startDate: ccs.timeFormatter(startDate),
    endDate: ccs.timeFormatter(endDate),
}).then(function (r) {
    console.log(r);
});
