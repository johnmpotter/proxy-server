'use strict';

var koa = require('koa');
var logger = require('koa-logger');
var serve = require('koa-static');

var app = koa();

app.use(logger());
app.use(serve('public'));
app.listen(3333);
console.log('Listening on 3333...');