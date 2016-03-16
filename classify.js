/// <reference path="typings/main.d.ts" />
"use strict";
var Classifier_1 = require('./src/Classifier');
var classifier = new Classifier_1.Classifier();
classifier.teach("Combien des \u00E9l\u00E8ves y a-t-il dans votre coll\u00E8ge", 'french');
classifier.teach("Voulez-vous me peser ce colis, s'il vous pla\u00EEt.", 'french');
classifier.teach("Ciao, non ti va di andare al cinema", 'italian');
classifier.teach("Mi sai dire quando apre il negozio", 'italian');
var result = classifier.classify("Non so quando andare al cinema");
console.log(result);
