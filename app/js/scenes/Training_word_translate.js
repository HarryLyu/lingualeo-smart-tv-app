(function () {
    LEO.scenes.Training_word_translate = function (app) {
        this.app = app;
    };

    LEO.scenes.Training_word_translate.prototype = {

        title: 'Выберите правильный перевод',

        render: function () {
            var self = this;

            this.getTrainingData(function (data) {
                var trainingsData = self.cleanData(data.game);
                self.prepareQuestionData(trainingsData);
                self.loadQuestion(0);
            });

            this.words = {};
        },

        selectAnswer: function (index) {
            LEO.log('select answer');
            this.selectedAnswerIndex = index;
            this.app.getContainer().find('[data-answer-item]').removeClass('active');
            this.app.getContainer().find('[data-answer-item=' + this.selectedAnswerIndex + ']').addClass('active');
        },

        acceptAnswer: function () {
            var self = this;
            var currentAnswerId = this.app.getContainer().find('[data-answer-item=' + this.selectedAnswerIndex + ']').attr('data-answer-id');
            this.words[this.currentQuestionId] = (this.currentQuestionId == currentAnswerId) ? 1 : 0;

            // good
            if (this.words[this.currentQuestionId] == 1) {

            }
            else {

            }

            this.private_enableAnyClickHandler(function () {
                self.loadNextQuestion();
                return false;
            });
        },

        private_enableAnyClickHandler: function (handler) {
            LEO.log('anyClick');
            this.anyClickHandler = handler;
        },

        loadNextQuestion: function () {
            this.private_enableAnyClickHandler(null);

            this.currentQuestionIndex++;

            if (this.currentQuestionIndex >= this.questionIds.length) {
                alert('finish');
            }
            else {
                this.loadQuestion(this.currentQuestionIndex);
            }
        },

        fillQuestionsData: function () {
            //this.questionsItems =
        },

        loadQuestion: function (index) {
            var self = this;

            this.currentQuestionIndex = index;
            this.currentQuestionId = this.questionIds[index];
            this.currentQuestion = this.trainingsData[this.currentQuestionId];

            LEO.utils.template('training_word_translate', {question: this.currentQuestion}, function (html) {
                self.app.writeToContainer(html);
                self.fillQuestionsData();
                self.selectAnswer(1);
            })
        },

        prepareQuestionData: function (trainingsData) {
            this.trainingsData = trainingsData;
            // TODO переделать на старую ECMA если что
            this.questionIds = Object.keys(this.trainingsData);
        },

        destroy: function () {
            this.app.getContainer().removeClass('view-trainings-list');
            this.app.getContainer().off('click', '[' + this.trainingItemAttr + ']', this.clickCallback);
            this.clickCallback = null;
        },

        getKeyHandler: function () {
            var self = this;

            return {
                ANY: function () {
                    if (self.anyClickHandler) {
                        return self.anyClickHandler();
                    }
                },
                KEY_ENTER: {
                    callback: function () {
                        self.acceptAnswer();
                    }
                },
                KEY_1: {
                    callback: function () {
                        self.selectAnswer(1);
                        self.acceptAnswer();
                    }
                },
                KEY_2: {
                    callback: function () {
                        self.selectAnswer(2);
                        self.acceptAnswer();
                    }
                },
                KEY_3: {
                    callback: function () {
                        self.selectAnswer(3);
                        self.acceptAnswer();
                    }
                },
                KEY_4: {
                    callback: function () {
                        self.selectAnswer(4);
                        self.acceptAnswer();
                    }
                },
                KEY_5: {
                    callback: function () {
                        self.selectAnswer(5);
                        self.acceptAnswer();
                    }
                },
                KEY_0: {
                    callback: function () {
                        self.selectAnswer(0);
                        self.acceptAnswer();
                    }
                },
                KEY_UP: {
                    callback: function () {
                        LEO.log('up');
                        self.selectAnswer(Math.max(0, self.selectedAnswerIndex - 1));
                    }
                },
                KEY_DOWN: {
                    callback: function () {
                        LEO.log('down');
                        self.selectAnswer(Math.min(self.questionIds.length - 1, self.selectedAnswerIndex + 1));
                    }
                }
            };
        },

        cleanData: function (trainingsData) {
            for (var item in trainingsData) {
                if (typeof trainingsData[item] == 'object') {
                    trainingsData[item] = this.cleanData(trainingsData[item]);
                }
                else {
                    delete trainingsData[item].pictures;
                }
            }
            return trainingsData;
        },

        getTrainingData: function (callback) {
            LEO.Request.getLocal('ajax-data/trainings/word_translate.json', callback, null);
        }
    }
})();