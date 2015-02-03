(function () {
    LEO.scenes.Training_rapid_repetition = function (app) {
        this.app = app;
    };

    LEO.scenes.Training_rapid_repetition.prototype = {

        title: 'Выберите правильный перевод',

        render: function () {
            var self = this;

            LEO.log('play sound');
            LEO.SoundAPI.play('sound/training/start_tick.mp3', true);

            this.getTrainingData(function (data) {
                var trainingsData = self.cleanData(data.game);
                self.prepareQuestionData(trainingsData);
                self.loadQuestion(0);
            });

            this.words = {};
        },


        private_enableAnyClickHandler: function (handler) {
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

            LEO.utils.template('training_rapid_repetition', {question: this.currentQuestion}, function (html) {
                self.app.writeToContainer(html);
                self.fillQuestionsData();
                //self.selectAnswer(1);
            })
        },

        prepareQuestionData: function (trainingsData) {
            this.trainingsData = trainingsData;
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
                KEY_LEFT: {
                    callback: function () {
                        LEO.log('up');
                        self.selectAnswer(Math.max(0, self.selectedAnswerIndex - 1));
                    }
                },
                KEY_RIGHT: {
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
            LEO.Request.getLocal('ajax-data/trainings/rapid_repetition.json', callback, null);
        },


/*
        canAnswer: false, // лок на начание
        skipIntro: false, // не показывание начального экрана
*/
        finishing: false, // тренировка закончина
        playSound: true, // проигрование звуков в тренировке
        params: {
            time: 60, // нормлаьное время тренировки
            minTime: 20, // время тренировки при недостаке слов
            prepereTime: 4, // время приготовления к тренировке
            minWords: 16, // минимальное количество слов необходимое для тренировки
/*
            clickDelay: 400, // минимальное время между нажатиями
            showIcoDelay: 1000, // время в течении которого пропадает значек отвеа
*/
            endTimerTick: 5                         // за сколько секунд до конца начинает играть звук конца тренировки
        },
        timer: null,
        startTimer: null,
        score: 0,
        pauseCount: 3,
        bonusSystem: null,
        answers: {},
        resultWords: null,
        soundIds: [
            'finish_tick',
            'correct',
            'incorrect',
            'start_tick',
            'gong',
            'bonus',
            'show_result'
        ],
        soundPathTpl: 'sound/training/{sound}.mp3',

        init: function (params) {
            var self = this;
            this.$ = {};

            this.resultWords = [];

            this.bonusSystem = new LEO.classes.BonusSystem(
                this.$.elem.find('[data-bonus-title]'),
                this.$.elem.find('[data-bonus-stick]'),
                {
                    scoreDie: this.params.showIcoDelay,
                    bonusSound: this.private_PlayBonusSound.bind(this)
                });

            this.timer = new LEO.classes.Timer(this.$.timerPanel, {time: this.params.time});
            this.startTimer = new LEO.classes.Timer(this.$.startTimerPanel, {
                time: this.params.prepereTime
            });

            this.private_initTimers();
        },

        playSoundId: function (soundId) {
            if (this.playSound) {
                LEO.Modules.asyncCall('Talker.play', {soundId: soundId});
            }
        },

        // override
        private_createDOM: function () {
            this.$ = this._super();
            var $elem = this.$.elem;
            $elem.html(LEO.templates.trainingsBody[this.params.template]());

            return $.extend(this.$, {
                question: $elem.find('[data-question]'),
                answerItems: $elem.find('[data-answer-item]'),
                context: $elem.find('[data-context]'),
                wrongButton: $elem.find('[data-wrong-button]'),
                rightButton: $elem.find('[data-right-button]'),
                startButton: $elem.find('[data-start-button]'),
                timerPanel: $elem.find('[data-timer]'),
                startTimerPanel: $elem.find('[data-start-timer-count]'),
                scorePanel: $elem.find('[data-score]'),
                scoreBonus: $elem.find('[data-score-bonus]'),
                cardBlock: $elem.find('[data-card-block]'),
                //result screen
                ratingBlock: $elem.find('[data-rating-block]')
            });
        },

        // override
        private_assignEvents: function () {
            this._super();
            this.inputHandler = this.private_keyboardHandler.bind(this);
            this.$.elem
                .on('click', '[data-right-button=]', this.private_clickRightButton.bind(this))
                .on('click', '[data-wrong-button=]', this.private_clickWrongButton.bind(this))
                .on('click', '[data-start-rapid]', this.private_clickStartButton.bind(this))
                .on('click', '[data-pause-game]', this.private_pause.bind(this))
                .on('click', '[data-soundoff]', this.private_toggleSound.bind(this))
                .on('click', '[data-continue-button]', this.private_continueTraning.bind(this))
                .on('click', '[data-show-detail]', this.private_showDetailRating.bind(this))
                .on('click', '[data-show-brief]', this.private_showBriefRating.bind(this))
                .on('click', '[data-add-to-dict]', this.private_addWord.bind(this))
                .on('click', '[data-del-from-dict]', this.private_deleteWord.bind(this))
                .on('click', '[data-how-it-work]', this.private_showHelpScreen.bind(this))
                .on('click', '[data-interval-repetition]', this.private_showInitialRepetitionDialog.bind(this))
                .on('click', '[data-back-button]', this.private_clickBackButton.bind(this))
                .on('click', '[data-reset-button]', function(){
                    location.href = LEO.getUrl('goldPage') + '?from=training-list'
                }.bind(this));


        },

        private_clickBackButton: function () {
            if (this.onClose) {
                this.onClose();
            }
            return false;
        },


        private_initTimers: function () {
            this.startTimer
                .addListener(this.startTimer.consts.FINISH, this.private_startGame.bind(this))
                .addListener(this.startTimer.consts.TICK, this.private_PlayStartTickSound.bind(this));
            this.timer
                .addListener(this.timer.consts.FINISH, this.private_onFinish.bind(this))
                .addListener(this.timer.consts.TICK, this.private_PlayTickSound.bind(this));
        },

        private_keyboardHandler: function (keyCode, event) {
            var numberKey = String.fromCharCode(event.keyCode);
            if ($.browser.opera || $.browser.msie) {
                numberKey = String.fromCharCode(keyCode);
            }

            switch (keyCode) {
                case LEO.Keyboard.consts.LEFT_ARROW:
                    this.$.wrongButton.click();
                    return true;
                    break;
                case LEO.Keyboard.consts.RIGHT_ARROW:
                    this.$.rightButton.click();
                    return true;
                    break;
                case LEO.Keyboard.consts.SPACE:
                    if (this.$.elem.hasClass('show-help')) {
                        this.helpContent.hide();
                    } else if (this.$.elem.hasClass('show-game')) {
                        this.private_pause();
                        return true;
                    }
                    break;
                case LEO.Keyboard.consts.ENTER:
                    if (this.$.elem.hasClass('show-help')) {
                        this.helpContent.hide();
                    } else if (this.$.elem.hasClass('show-rating')) {
                        if (this.resultTimer) {
                            location.href = LEO.getUrl('goldPage') + '?from=training-result'
                        } else {
                            this.private_continueTraning();
                        }
                        return true;
                    }
                    break;
                default:
                    return true;

            }
            return false;
        },

        // override
        start: function (data) {
            var trainData = CONFIG.pages.training.initialData.rapid_repetition;

            this.stopped = false;
            this.data = data;
            this.rightAnswers = 0;
            this.totalAnswers = 0;
            this.score = 0;
            this.haveAGoodLuck = true;
            this.reactionTime = [];
            $('#content').addClass('show-sprint-train');
            /*this.$.elem.find('[data-available-words]').html(trainData.availableCount);
             this.$.elem.find('[data-user-dick-size]').html(trainData.dictionarySize);*/

            // Очищаем все объекты и массивы, чтобы не передавать результаты пролой сессии
            this.answersResult = [];
            this.answersResultSeq = [];
            this.answers = {};

            if (this.private_start) {
                this.private_start();
            }
            if (!CONFIG.pages.training.showSprintHelp) {
                this.private_showHelpScreen();
                return this;
            }
            if (trainData.availableCount || this.skipIntro) {
                this.private_clickStartButton();
                this.$.elem.removeClass('loading');

            } else {
                if (!this.skipIntro) {
                    this.skipIntro = true;
                    this.$.elem.removeClass('loading').addClass('show-begin');
                }

            }

            return this;
        },

        reset: function () {
            this.$.elem.removeClass('show-game show-help show-begin show-rating show-timer').addClass('loading')
                .find('[data-rating-block]').removeClass('all-done detail');

            this.private_setRotation(this.$.elem.find('[data-start-timer-spinner]'), 360);
            this.private_setRotation(this.$.elem.find('[data-timer-spinner]'), 360);
            this.$.elem.find('[data-timer-block]').removeClass('low-time');
            this.canAnswer = false;
            this.finishing = false;
            this.pauseCount = 3;
            this.stopped = true;
            this.answers = {};
            this.resultWords = [];
            this.timer.stop();
            this.startTimer.stop();
            this.$.scorePanel.html(0);
            this.$.question.text("");
            this.$.answerItems.text("");
            this.bonusSystem.reset();
            this.$.cardBlock.removeClass('wrong success');
        },

        private_pause: function () {
            if (this.pauseCount) {
                this.timer.pause();
                if (this.timer.running) {
                    this.pauseCount--;
                    if (this.timer.time < this.params.endTimerTick) {
                        if (this.playSound) {
                            this.playSoundId('finish_tick')
                        }
                    }
                    this.canAnswer = true;
                    this.$.elem.removeClass('pause')
                        .find('.btn').removeClass('disabled');
                    LEO.Tracker.addEvent('training', 'leoSprint', 'pauseOff');
                } else {
                    if (this.timer.time < this.params.endTimerTick) {
                        this.playSoundId('finish_tick');
                    }
                    this.canAnswer = false;
                    this.$.elem.addClass('pause')
                        .find('.btn').addClass('disabled');
                    LEO.Tracker.addEvent('training', 'leoSprint', 'pause');
                }
            }
            return false;
        },
        // override
        private_start: function () {
            //this._super();
            LEO.Keyboard.registerInputHandler(this.inputHandler, 'keydown');
        },

        // override
        private_stop: function () {
            this.reset();

            LEO.Keyboard.unregisterInputHandler(this.inputHandler, 'keydown');
        },

        private_continueTraning: function () {
            if (this.onContinue && typeof this.onContinue === "function") {
                this.getRootElement().removeClass('show-rating').addClass('loading');
                this.onContinue();
            }
            return false;
        },

        // override
        private_switchToNextQuestion: function () {
            if (this.questions.length === this.questionIndex + 1) {
                this.private_generateQueue(false);
            }
            this.timeStep = new Date().getTime();
            this.currentQuestion = this.questions[++this.questionIndex];
            if (this.currentQuestion) {
                this.private_showQuestion(this.currentQuestion);
            }
        },

        private_clickWrongButton: function (e) {
            if (this.canAnswer) {
                this.private_checkAnswer(false);
                this.private_SetTimeoutClick();
            }
            return false;
        },

        private_clickRightButton: function (e) {
            if (this.canAnswer) {
                this.private_checkAnswer(true);
                this.private_SetTimeoutClick();
            }
            return false;
        },

        private_checkAnswer: function (answer) {
            var currentQuestion = this.currentQuestion,
                self = this;
            if (this.timer.time) {
                //Todo убрать нахер эту логику :(
                $.each(this.answersResult, function (index, item) {
                    var curWord = currentQuestion.word_value.toLowerCase(),
                        itemWord = item.word_value.toLowerCase(),
                        curTranslate = currentQuestion.translate_value.toLowerCase(),
                        itemTranslate = item.translate_value.toLowerCase();
                    if (curWord == itemWord) {
                        // переводы равны или id слова и id слова перевода равны и пользователь нажал на "верно"
                        if (( (curTranslate == itemTranslate || currentQuestion.other_word_id === currentQuestion.word_id ) && answer) ||
                            ( curTranslate != itemTranslate && !answer)) { // переводы не равны и пользователь нажал на "не верно"
                            self.private_correctAnswer();
                            if (curTranslate == itemTranslate) {
                                self.private_removeFromQueue();
                            }
                        } else {
                            self.private_incorrectAnswer();
                        }
                        return false;
                    }
                });
                this.reactionTime.push(new Date().getTime() - this.timeStep);
                //
                this.private_switchToNextQuestion();
            }
        },

        private_correctAnswer: function () {
            this.playSoundId('correct');

            this.$.cardBlock.removeClass('wrong success')
            setTimeout((function () {
                this.$.cardBlock.addClass('success');
            }).bind(this), 50);

            this.bonusSystem.correctAnswer();
            this.$.scorePanel.html(this.bonusSystem.getScore());
            if (this.currentQuestion.correct) {
                this.rightAnswers++;
                this.answers[this.currentQuestion.word_id] = true;
                this.resultWords.push($.extend({}, this.currentQuestion, {answer: true}));
                this.totalAnswers++;
            }
        },
        private_incorrectAnswer: function () {
            this.playSoundId('incorrect');
            this.haveAGoodLuck = false;
            this.$.cardBlock.removeClass('wrong success');
            setTimeout((function () {
                this.$.cardBlock.addClass('wrong');
            }).bind(this), 50);
            this.bonusSystem.incorrectAnswer();

            if (this.currentQuestion.correct) {
                this.answers[this.currentQuestion.word_id] = false;
            }
            this.resultWords.push($.extend({}, this.currentQuestion, {answer: false}));
            this.totalAnswers++;

        },
        private_removeFromQueue: function () {
            var index = this.questionIndex + 1,
                question;

            for (; index < this.questions.length; index++) {
                question = this.questions[index];
                if (question.word_value == this.currentQuestion.word_value ||
                    question.translate_value == this.currentQuestion.translate_value) {
                    this.questions.splice(index, 1);
                    index--;
                }
            }
            //this.currentQuestion = this.questions[++this.questionIndex];
        },

        private_SetTimeoutClick: function () {
            var self = this;
            this.canAnswer = false;
            setTimeout(function () {
                self.canAnswer = self.timer.running;
            }, this.params.clickDelay);
        },


        private_clickStartButton: function (e) {
            if (e) {
                var $target = $(e.currentTarget);
                if ($target.hasClass('disabled')) {
                    return false;
                }
            }

            this.$.elem.removeClass('show-begin').addClass('show-timer')
                .find('[data-rapid-rate-bar]').attr('style', '');

            this.startTimer.start();

            this.private_generateQueue(true);
            return false;
        },
        private_startGame: function () {
            var self = this;
            this.private_switchToNextQuestion();
            this.$.elem.removeClass('show-timer').addClass('show-game');
            this.timer.start();
            this.canAnswer = true;
            this.playSoundId('gong');
            LEO.Tracker.addEvent('training', 'leoSprint', 'gameStarted');
        },

        private_onFinish: function (timer) {
            var score = this.bonusSystem.getScore();

            function add(a, b) {
                return a + b;
            }

            LEO.Modules.asyncCall('Talker.stop', {soundId: 'finish_tick'});
            this.playSoundId('show_result');

            this.prevAvaliableCount = CONFIG.pages.training.initialData.rapid_repetition.availableCount;
            if (this.haveAGoodLuck) {
                LEO.Tracker.addEvent('training', 'leoSprint', 'unrealLuck');
            }
            LEO.Tracker.addEvent('training', 'leoSprintResult', (score - (score % 100)).toString());
            /*
             time: ( (Math.round(this.reactionTime.reduce(add, 0) / this.reactionTime.length)) || 0 ) + " мс",
             accuracy: ( Math.round((this.rightAnswers / this.totalAnswers) * 100) || 0 )+ "%",
             */
            this.onFinish({
                correct: this.rightAnswers,
                total: this.totalAnswers,
                score: score,
                words: this.answers,
                resultWords: this.resultWords
            });
            this.reset();

        },

        // override
        private_showQuestion: function (question) {
            this.$.question.text(question.word_value);
            this.$.answerItems.text(question.translate_value.toLowerCase());
        },

        private_generateQueue: function (firstGenerate) {
            this.questions = this.private_generateUserQueue.bind(this)(this.data, firstGenerate);
        },

        /**
         * Генирация очерееди слов
         * @param data - данные для генерации
         * @return {Array} - сгенерированна очередь
         */
        private_generateUserQueue: function (data, firstGenerate) {
            if (!firstGenerate) {
                LEO.Tracker.addEvent('training', 'leoSprint', 'newQueueGen');
            }
            // удаление null переводов
            data.user_words = $.grep(data.user_words, function (item) {
                if (!item.translate_value) {
                    LEO.Tracker.addEvent('nullTranslation', CONFIG_GLOBAL.userId, item.word_value);
                }
                return item.translate_value;
            });
            var self = this,
                availableCount = CONFIG.pages.training.initialData.rapid_repetition.availableCount,
                queue = $.map(data.user_words, function (item, index) {
                    item.correct = true;
                    if (index < availableCount) {
                        item.remind = true;
                    }
                    return item;
                }),
                shuffle = LEO.utils.arrayShuffle(data.user_words),
                addLength = shuffle.length / 2;
            if (data.user_words.length < this.params.minTime && firstGenerate) {
                this.timer.params.time = this.params.minTime;
            }
            this.answersResult = queue.slice(0, queue.length);
            $.each(shuffle.slice(0, addLength), function (index, item) {
                queue.push({
                    translate_value: item.translate_value,
                    translate_id: item.translate_id,
                    word_id: data.user_words[index].word_id,
                    word_value: data.user_words[index].word_value,
                    correct_translate_id: data.user_words[index].translate_id,
                    correct_translate_value: data.user_words[index].translate_value,
                    sound_url: data.user_words[index].sound_url
                });
            });
            $.each(LEO.utils.arrayShuffle(data.other_words), function (index, item) {
                var elem;
                if (index >= addLength) {
                    return false;
                }
                elem = $.extend({}, shuffle[index % self.params.minWords], item);
                elem.correct_translate_id = shuffle[index % self.params.minWords].translate_id,
                    elem.correct_translate_value = shuffle[index % self.params.minWords].translate_value
                elem.sound_url = shuffle[index % self.params.minWords].sound_url
                delete elem['correct'];
                queue.push(elem);
            });


            this.questionIndex = -1;

            queue = LEO.utils.arrayShuffle(queue);
            for (var i = queue.length - 1; i > availableCount * 3; i--) {
                if (queue[i].remind) {
                    var place = LEO.utils.getRandomNumber(0, availableCount * 3);
                    queue.splice(place, 0, queue.splice(i, 1)[0]);
                    i++;
                }
            }
            return queue;
        },

        /**
         * Генирация очерееди слов
         * @param data - данные для гинерации
         * @return {Array} - сгенерированна очередь
         */
        private_generateTop5000Queue: function (data, firstGenerate) {
            if (!firstGenerate) {
                LEO.Tracker.addEvent('training', 'leoSprint', 'newQueueGen');
            }
            var queue = data.other_words.map(function (item) {
                    item.correct = true;
                    item.word_id = item.other_word_id;
                    item.word_value = item.other_word_value;
                    delete item['other_word_id'];
                    delete item['other_word_value'];
                    return item;
                }),
                shuffle = LEO.utils.arrayShuffle(data.other_words);
            this.answersResult = queue.slice(0, queue.length);
            $.each(shuffle, function (index, item) {
                queue.push({
                    translate_value: item.translate_value,
                    translate_id: item.translate_id,
                    word_id: data.other_words[index].word_id,
                    word_value: data.other_words[index].word_value
                });
            });


            this.questionIndex = -1;

            return LEO.utils.arrayShuffle(queue);
        },

        private_PlayTickSound: function (timer, time) {
            setTimeout((function () {
                var angle = (time - 1) * 360 / timer.params.time;
                this.$.elem.find('[data-timer-block]').toggleClass('half', timer.params.time / 2 > (time - 1))
                    .toggleClass('low-time', time < this.params.endTimerTick);

                this.private_setRotation(this.$.elem.find('[data-start-timer-spinner]'), angle);
                this.private_setRotation(this.$.elem.find('[data-timer-spinner]'), angle);
            }).bind(this), 50);
            if (time < this.params.endTimerTick && !this.finishing) {
                this.playSoundId('finish_tick');
                this.finishing = true;
            }
        },

        private_PlayBonusSound: function () {
            this.playSoundId('bonus');
        },

        private_PlayStartTickSound: function (timer, time) {

            setTimeout((function () {
                var angle = (time - 1) * 360 / timer.params.time;
                this.$.elem.find('[data-start-timer-block]').toggleClass('half', timer.params.time / 2 > (time - 1));
                this.private_setRotation(this.$.elem.find('[data-start-timer-spinner]'), angle);
            }).bind(this), 50);
            this.playSoundId('start_tick');
        },

        private_setRotation: function (item, angle) {
            item.css({
                "-moz-transform": "rotate(" + angle + "deg)",
                "-webkit-transform": "rotate(" + angle + "deg)",
                "-o-transform": "rotate(" + angle + "deg)",
                "transform": "rotate(" + angle + "deg)"
            });
        },

        setResultData: function (data, resultWords) {

        }
    }
})();