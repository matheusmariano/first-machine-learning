"use strict";
var _ = require('lodash');
var Classifier = (function () {
    function Classifier() {
        // Initializes properties avoiding conversion issues on JavaScript.
        this.categories = {
            total: 0,
            list: []
        };
        this.words = [];
    }
    Classifier.prototype.teach = function (text, name) {
        var scope = this;
        // Selects every single important word on text.
        var words = this.tokenize(text);
        // Adds a new memory to all categories.
        this.categories.total += 1;
        // Selects the index of specific category.
        var ci = _.findIndex(this.categories.list, { name: name });
        // Registers a new category if it doesn't exist.
        if (ci === -1) {
            ci = this.categories.list.push({ name: name, total: 0, words: [] }) - 1;
        }
        // Adds a new memory to the specific category.
        this.categories.list[ci].total += 1;
        console.log(words);
        // Memorizes all important words.
        words.forEach(function (text) {
            // Selects the index of a specific word.
            var wi = _.findIndex(scope.words, { text: text });
            // Registers a new word if it doesn't exist.
            if (wi === -1) {
                wi = scope.words.push({ text: text, total: 1 }) - 1;
            }
            // Adds a new memory to the specific word.
            scope.words[wi].total += 1;
            // Selects the index of a specific word related to a specific category.
            wi = _.findIndex(scope.categories.list[ci].words, { text: text });
            // Registers a new word related to a specific category.
            if (wi === -1) {
                wi = scope.categories.list[ci].words.push({ text: text, total: 0 }) - 1;
            }
            // Memorizes the word related to a specific category.
            scope.categories.list[ci].words[wi].total += 1;
        });
    };
    Classifier.prototype.classify = function (text) {
        var scope = this;
        // Select every single important word on text.
        var words = this.tokenize(text);
        // Analyzes every category available.
        var probabilities = this.categories.list.map(function (category) {
            // Filter words the algorithm doesn't know yet.
            var validWords = category.words.filter(function (word) {
                return _.some(words, function (text) { return text == word.text; });
            });
            // Returns zero if there are no valid words.
            if (validWords.length === 0) {
                return { name: category.name, value: 0 };
            }
            // Analyzes every word that the algorithm already know.
            var probability = validWords.map(function (word) {
                var a = word.total;
                var b = category.total;
                var c = _.find(scope.words, { text: word.text }).total;
                var d = scope.categories.total;
                return (a / b) / (c / d);
            }).reduce(function (a, b) { return a * b; }, 1) * category.total / scope.categories.total;
            return { name: category.name, value: probability };
        });
        // Select the most likely category.
        var category = { name: 'none', value: 0 };
        probabilities.forEach(function (p) {
            if (p.value > category.value) {
                category = p;
            }
        });
        return category.name;
    };
    Classifier.prototype.tokenize = function (text) {
        // Splits the text into a list of words.
        var words = text.split(' ');
        // Removes repeated words in list.
        words = _.uniq(words);
        return words;
    };
    return Classifier;
}());
exports.Classifier = Classifier;
