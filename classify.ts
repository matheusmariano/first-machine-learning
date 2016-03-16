/// <reference path="typings/main.d.ts" />

import { Classifier } from './src/Classifier'

var classifier = new Classifier()

classifier.teach(`Combien des élèves y a-t-il dans votre collège`, 'french')
classifier.teach(`Voulez-vous me peser ce colis, s'il vous plaît.`, 'french')
classifier.teach(`Ciao, non ti va di andare al cinema`, 'italian')
classifier.teach(`Mi sai dire quando apre il negozio`, 'italian')

var result = classifier.classify(`Non so quando andare al cinema`)

console.log(result)
