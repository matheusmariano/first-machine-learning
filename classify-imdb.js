/// <reference path="typings/main.d.ts" />
"use strict";
var Classifier_1 = require('./src/Classifier');
var fs = require('fs');
var classifier = new Classifier_1.Classifier();
fs.readFile('datasets/light-imdb.json', function (error, data) {
    var dataset = JSON.parse(data.toString());
    dataset.forEach(function (data) {
        classifier.teach(data.text, data.category);
    });
    dataset = null;
    var result = classifier.classify('I am happy today.');
    console.log(result);
});
