(function () {
    LEO.scenes.TrainingsList = function (app) {
        this.app = app;
    };

    LEO.scenes.TrainingsList.prototype = {
        availableTrainings: [
            'word_translate',
            'translate_word',
            'rapid_repetition'
        ],

        trainingItemAttr: 'data-training-item',

        containerClassName: 'view-trainings-list',

        render: function () {
            var self = this;

            this.getInitialData(function (data) {
                var trainingsData = self.cleanData(data.initial_data);

                LEO.utils.template('trainingsList', {trainingsData: trainingsData}, function (html) {
                    self.app.writeToContainer(html);

                    self.fillTrainingsItemsData();

                    self.selectTrainingItem(0);

                    self.private_assignEvents();
                })
            });
        },

        fillTrainingsItemsData: function () {
            this.$trainingsItems = this.app.getContainer().find('[' + this.trainingItemAttr + ']');
            this.trainingsCount = this.$trainingsItems.length;
        },

        selectTrainingItem: function (index) {
            this.selectedItemIndex = index;
            this.$trainingsItems.removeClass('active');
            $(this.$trainingsItems[this.selectedItemIndex]).addClass('active');
        },

        private_assignEvents: function () {
            var self = this;

            this.clickCallback = function () {
                var $elem = $(this),
                    trainingName = $elem.attr(self.trainingItemAttr);

                self.app.loadScene('Training_' + trainingName, function () {
                    self.app.runScene('Training_' + trainingName);
                });

                return false;
            };

            this.app.getContainer().on('click', '[' + this.trainingItemAttr + ']', this.clickCallback);
        },

        getKeyHandler: function () {
            var self = this;

            return {
                KEY_LEFT: {
                    callback: function () {
                        self.selectTrainingItem(Math.max(0, --self.selectedItemIndex));
                    }
                },
                KEY_RIGHT: {
                    callback: function () {
                        self.selectTrainingItem(Math.min(self.trainingsCount - 1, ++self.selectedItemIndex));
                    }
                },
                KEY_ENTER: {
                    callback: function () {
                        self.$trainingsItems[self.selectedItemIndex].click();
                    }
                }
            };
        },

        destroy: function () {
            this.app.getContainer().off('click', '[' + this.trainingItemAttr + ']', this.clickCallback);
            this.clickCallback = null;
            this.$trainingsItems = null;
            this.trainingsCount = null;
        },

        cleanData: function (trainingsData) {
            for (var trainingName in trainingsData) {
                if (this.availableTrainings.indexOf(trainingName) == -1) {
                    delete trainingsData[trainingName];
                }
            }
            return trainingsData;
        },

        getInitialData: function (callback) {
            //TODO stub
            callback({
                "initial_data": {
                    "word_translate": {
                        "active": true,
                        "availableCount": 30,
                        "wordsToRepeat": 0,
                        "dictionarySize": 30,
                        "learned_words_count": 0,
                        "wordset_name": "Мой словарь",
                        "wordset_picture_url": "http:\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/glossary\/0.png",
                        "progress": 0,
                        "lock": false,
                        "level": "easy",
                        "trainingType": [1, 2],
                        "needCount": 0
                    },
                    "translate_word": {
                        "active": true,
                        "availableCount": 30,
                        "wordsToRepeat": 0,
                        "dictionarySize": 30,
                        "learned_words_count": 0,
                        "wordset_name": "Мой словарь",
                        "wordset_picture_url": "http:\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/glossary\/0.png",
                        "progress": 0,
                        "lock": false,
                        "level": "easy",
                        "trainingType": [1, 2],
                        "needCount": 0,
                        "recommend": true
                    },
                    "word_puzzle": {
                        "active": true,
                        "availableCount": 30,
                        "wordsToRepeat": 0,
                        "dictionarySize": 30,
                        "learned_words_count": 0,
                        "wordset_name": "Мой словарь",
                        "wordset_picture_url": "http:\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/glossary\/0.png",
                        "progress": 0,
                        "lock": {
                            "level": 3
                        },
                        "access_by_level": 3,
                        "level": "normal",
                        "trainingType": [1, 2],
                        "needCount": 0
                    },
                    "words_cards": {
                        "active": true,
                        "availableCount": 30,
                        "wordsToRepeat": 0,
                        "dictionarySize": 30,
                        "learned_words_count": 0,
                        "wordset_name": "Мой словарь",
                        "wordset_picture_url": "http:\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/glossary\/0.png",
                        "progress": 0,
                        "lock": {
                            "level": 10
                        },
                        "access_by_level": 10,
                        "level": "easy",
                        "trainingType": [1, 2],
                        "needCount": 0
                    },
                    "audio_word": {
                        "active": false,
                        "availableCount": 30,
                        "wordsToRepeat": 0,
                        "dictionarySize": 30,
                        "learned_words_count": 0,
                        "wordset_name": "Мой словарь",
                        "wordset_picture_url": "http:\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/glossary\/0.png",
                        "progress": 0,
                        "lock": {
                            "status": "gold"
                        },
                        "access_by_level": 1,
                        "level": "hard",
                        "trainingType": [1, 2],
                        "needCount": 0,
                        "demo": true,
                        "availableTrainingCount": 0,
                        "dailyTrainingAmount": 0
                    },
                    "crossword": {
                        "active": false,
                        "availableCount": 29,
                        "wordsToRepeat": 0,
                        "dictionarySize": 29,
                        "learned_words_count": 0,
                        "wordset_name": "Мой словарь",
                        "wordset_picture_url": "http:\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/glossary\/0.png",
                        "progress": 0,
                        "lock": {
                            "status": "gold"
                        },
                        "access_by_level": 1,
                        "level": "hard",
                        "trainingType": [1],
                        "needCount": 0,
                        "demo": true,
                        "availableTrainingCount": 0,
                        "dailyTrainingAmount": 0
                    },
                    "bridge": {
                        "active": true,
                        "availableCount": 30,
                        "wordsToRepeat": 0,
                        "dictionarySize": 30,
                        "learned_words_count": 0,
                        "wordset_name": "Мой словарь",
                        "wordset_picture_url": "http:\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/glossary\/0.png",
                        "progress": 0,
                        "lock": {
                            "level": 8
                        },
                        "access_by_level": 8,
                        "level": "normal",
                        "trainingType": [1, 2],
                        "needCount": 0,
                        "availableTrainingCount": 3,
                        "dailyTrainingAmount": 3
                    },
                    "rapid_repetition": {
                        "active": true,
                        "availableCount": 30,
                        "wordsToRepeat": 0,
                        "dictionarySize": 30,
                        "learned_words_count": 0,
                        "wordset_name": "Мой словарь",
                        "wordset_picture_url": "http:\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/glossary\/0.png",
                        "progress": 0,
                        "lock": {
                            "level": 6
                        },
                        "access_by_level": 6,
                        "level": "normal",
                        "trainingType": [1, 2],
                        "needCount": 0,
                        "availableTrainingCount": 3,
                        "dailyTrainingAmount": 3
                    },
                    "phrase_puzzle": {
                        "active": true,
                        "availableCount": 0,
                        "wordsToRepeat": 0,
                        "dictionarySize": 0,
                        "learned_words_count": 0,
                        "wordset_name": "Мой словарь",
                        "wordset_picture_url": "http:\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/glossary\/0.png",
                        "progress": 0,
                        "lock": false,
                        "level": "normal",
                        "trainingType": [3],
                        "needCount": 1,
                        "availableTrainingCount": 3,
                        "dailyTrainingAmount": 3
                    },
                    "word_mix": {
                        "active": true,
                        "availableCount": 30,
                        "wordsToRepeat": 0,
                        "dictionarySize": 30,
                        "learned_words_count": 0,
                        "wordset_name": "Мой словарь",
                        "wordset_picture_url": "http:\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/glossary\/0.png",
                        "progress": 0,
                        "lock": false,
                        "level": "hard",
                        "trainingType": [1, 2],
                        "needCount": 0
                    }
                }
            });
        }
    }
})();