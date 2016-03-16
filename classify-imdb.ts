/// <reference path="typings/main.d.ts" />

import { Classifier } from './src/Classifier'
import fs = require('fs')

interface Data { text: string, category: string }

var classifier = new Classifier()

fs.readFile('datasets/imdb.json', function (error, data) {
    var dataset: Data[] = JSON.parse(data.toString())
    
    dataset.forEach(function (data) {
        classifier.teach(data.text, data.category)
    })
    
    dataset = null
    
    var result = classifier.classify('I am happy today.')
    
    console.log(result)
})
