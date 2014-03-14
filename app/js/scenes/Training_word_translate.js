(function () {
    LEO.scenes.Training_word_translate = function (app) {
        this.app = app;
    };

    LEO.scenes.Training_word_translate.prototype = {
        render: function () {
            var self = this;

            self.private_assignEvents();

            this.getTrainingData(function (data) {
                var trainingsData = self.cleanData(data.game);
                self.prepareQuestionData(trainingsData);
                self.loadQuestion(0);
            });
        },

        private_assignEvents: function () {

        },

        loadQuestion: function (index) {
            var self = this;

            var question = this.trainingsData[this.questionIds[index]];
            LEO.utils.template('training_word_translate', {question: question}, function (html) {
                self.app.writeToContainer(html);
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
                KEY_ENTER: {
                    callback: function () {
                        self.$trainingsItems[self.selectedItemIndex].click();
                    }
                },
                KEY_1: {
                    callback: function () {
                        self.selectAnswer(0);
                        self.acceptAnswer();
                    }
                },
                KEY_2: {
                    callback: function () {
                        self.selectAnswer(1);
                        self.acceptAnswer();
                    }
                },
                KEY_3: {
                    callback: function () {
                        self.selectAnswer(2);
                        self.acceptAnswer();
                    }
                },
                KEY_4: {
                    callback: function () {
                        self.selectAnswer(3);
                        self.acceptAnswer();
                    }
                },
                KEY_5: {
                    callback: function () {
                        self.selectAnswer(4);
                        self.acceptAnswer();
                    }
                },
                KEY_0: {
                    callback: function () {
                        self.acceptDontKnow();
                    }
                },
                KEY_UP: {
                    callback: function () {
                        self.acceptDontKnow();
                    }
                },
                KEY_DOWN: {
                    callback: function () {
                        self.acceptDontKnow();
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
            //TODO stub
            callback({
                "game": {
                    "29717": {
                        "text": "pay",
                        "answers": {
                            "29717": {
                                "questionText": "pay",
                                "answerText": "платить",
                                "transcription": "pˈeɪː",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/29717-631152008.mp3",
                                "picture": {
                                    "id": 21527,
                                    "translate_id": 57042,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/21527.png"
                                },
                                "pictures": {
                                    "21527": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/21527.png",
                                    "18988": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/18988.png",
                                    "27555": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/27555.png",
                                    "373": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/373.png",
                                    "173764": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/173764.png",
                                    "51205": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/51205.png",
                                    "51139": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/51139.png",
                                    "1496033": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496033.png",
                                    "53634": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/53634.png",
                                    "74278": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/74278.png",
                                    "1496237": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496237.png"
                                }
                            },
                            "4803": {
                                "questionText": "begin",
                                "answerText": "начинать",
                                "transcription": "bɪgˈɪn",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/4803-631152008.mp3",
                                "picture": {
                                    "id": 1530131,
                                    "translate_id": 3892355,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1530131.png"
                                },
                                "pictures": {
                                    "1530131": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1530131.png",
                                    "1457498": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1457498.png",
                                    "1519256": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1519256.png",
                                    "1475738": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1475738.png",
                                    "1496996": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496996.png",
                                    "1451738": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1451738.png",
                                    "1392104": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1392104.png",
                                    "1506603": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1506603.png",
                                    "1388364": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1388364.png",
                                    "1433169": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1433169.png",
                                    "1515411": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1515411.png"
                                }
                            },
                            "34079": {
                                "questionText": "remember",
                                "answerText": "помнить",
                                "transcription": "rɪmˈembə",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/34079-631152008.mp3",
                                "picture": {
                                    "id": 1541149,
                                    "translate_id": 3906441,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1541149.png"
                                },
                                "pictures": {
                                    "1541149": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1541149.png",
                                    "1547650": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1547650.png"
                                }
                            },
                            "20854": {
                                "questionText": "IMPOSSIBLE",
                                "answerText": "невозможный",
                                "transcription": "ɪmpˈɒsəbl",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/20854-631152008.mp3",
                                "picture": {
                                    "id": 51831,
                                    "translate_id": 350260,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/51831.png"
                                },
                                "pictures": {
                                    "51831": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/51831.png",
                                    "14001": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/14001.png",
                                    "87184": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/87184.png",
                                    "115539": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/115539.png",
                                    "12208": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/12208.png",
                                    "12207": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/12207.png",
                                    "115537": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/115537.png",
                                    "115928": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/115928.png",
                                    "77990": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/77990.png",
                                    "1357741": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1357741.png",
                                    "121581": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/121581.png"
                                }
                            },
                            "28537": {
                                "questionText": "OUGHT",
                                "answerText": "должен",
                                "transcription": "ˈɔːt",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/28537-631152008.mp3",
                                "picture": {
                                    "id": 70977,
                                    "translate_id": 132692,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/70977.png"
                                },
                                "pictures": {
                                    "70977": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/70977.png",
                                    "27248": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/27248.png",
                                    "49397": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/49397.png",
                                    "196930": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/196930.png",
                                    "34134": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/34134.png",
                                    "12681": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/12681.png",
                                    "217494": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/217494.png",
                                    "30737": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/30737.png",
                                    "404186": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/404186.png",
                                    "1183291": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1183291.png",
                                    "192554": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/192554.png"
                                }
                            }
                        },
                        "translate_id": 57042,
                        "progress_percent": 0,
                        "transcription": "pˈeɪː",
                        "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/29717-631152008.mp3",
                        "picture": {
                            "id": 21527,
                            "translate_id": 57042,
                            "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/21527.png"
                        },
                        "pictures": {
                            "21527": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/21527.png",
                            "18988": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/18988.png",
                            "27555": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/27555.png",
                            "373": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/373.png",
                            "173764": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/173764.png",
                            "51205": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/51205.png",
                            "51139": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/51139.png",
                            "1496033": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496033.png",
                            "53634": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/53634.png",
                            "74278": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/74278.png",
                            "1496237": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496237.png"
                        }
                    },
                    "21895": {
                        "text": "interest",
                        "answers": {
                            "21895": {
                                "questionText": "interest",
                                "answerText": "интерес",
                                "transcription": "[ˊɪntrɪst]",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/21895-631152008.mp3",
                                "picture": {
                                    "id": 168194,
                                    "translate_id": 297941,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/168194.png"
                                },
                                "pictures": {
                                    "168194": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/168194.png",
                                    "169": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/169.png",
                                    "63669": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/63669.png",
                                    "214412": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/214412.png",
                                    "212354": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/212354.png",
                                    "120422": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/120422.png",
                                    "130482": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/130482.png",
                                    "85975": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/85975.png",
                                    "221773": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/221773.png",
                                    "348456": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/348456.png",
                                    "1470855": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1470855.png"
                                }
                            },
                            "7906": {
                                "questionText": "choice",
                                "answerText": "выбор",
                                "transcription": "tʃˈɔɪːs",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/7906-631152008.mp3",
                                "picture": {
                                    "id": 1359218,
                                    "translate_id": 142818,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1359218.png"
                                },
                                "pictures": {
                                    "1359218": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1359218.png",
                                    "1331164": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1331164.png",
                                    "1215774": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1215774.png",
                                    "1527440": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1527440.png",
                                    "1405525": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1405525.png",
                                    "1383607": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1383607.png",
                                    "821659": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/821659.png",
                                    "1526120": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1526120.png",
                                    "1429353": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1429353.png",
                                    "1438535": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1438535.png",
                                    "1433648": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1433648.png"
                                }
                            },
                            "20854": {
                                "questionText": "IMPOSSIBLE",
                                "answerText": "невозможный",
                                "transcription": "ɪmpˈɒsəbl",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/20854-631152008.mp3",
                                "picture": {
                                    "id": 51831,
                                    "translate_id": 350260,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/51831.png"
                                },
                                "pictures": {
                                    "51831": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/51831.png",
                                    "14001": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/14001.png",
                                    "87184": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/87184.png",
                                    "115539": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/115539.png",
                                    "12208": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/12208.png",
                                    "12207": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/12207.png",
                                    "115537": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/115537.png",
                                    "115928": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/115928.png",
                                    "77990": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/77990.png",
                                    "1357741": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1357741.png",
                                    "121581": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/121581.png"
                                }
                            },
                            "35397": {
                                "questionText": "SAMPLE",
                                "answerText": "образец",
                                "transcription": "sˈɑːmpl",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/35397-631152008.mp3",
                                "picture": {
                                    "id": 727419,
                                    "translate_id": 219640,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/727419.png"
                                },
                                "pictures": {
                                    "727419": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/727419.png",
                                    "1495690": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1495690.png",
                                    "1142775": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1142775.png"
                                }
                            },
                            "20623": {
                                "questionText": "ILLEGAL",
                                "answerText": "незаконный",
                                "transcription": "ɪlˈiːgl",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/20623-631152008.mp3",
                                "picture": {
                                    "id": 742439,
                                    "translate_id": 39799,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/742439.png"
                                },
                                "pictures": {
                                    "742439": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/742439.png",
                                    "914064": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/914064.png",
                                    "149476": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/149476.png",
                                    "282133": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/282133.png",
                                    "1074092": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1074092.png",
                                    "420559": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/420559.png",
                                    "220047": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/220047.png",
                                    "873726": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/873726.png",
                                    "873724": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/873724.png",
                                    "1331237": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1331237.png",
                                    "1418138": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1418138.png"
                                }
                            }
                        },
                        "translate_id": 297941,
                        "progress_percent": 0,
                        "transcription": "[ˊɪntrɪst]",
                        "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/21895-631152008.mp3",
                        "picture": {
                            "id": 168194,
                            "translate_id": 297941,
                            "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/168194.png"
                        },
                        "pictures": {
                            "168194": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/168194.png",
                            "169": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/169.png",
                            "63669": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/63669.png",
                            "214412": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/214412.png",
                            "212354": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/212354.png",
                            "120422": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/120422.png",
                            "130482": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/130482.png",
                            "85975": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/85975.png",
                            "221773": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/221773.png",
                            "348456": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/348456.png",
                            "1470855": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1470855.png"
                        }
                    },
                    "14392": {
                        "text": "enjoy",
                        "answers": {
                            "14392": {
                                "questionText": "enjoy",
                                "answerText": "наслаждаться",
                                "transcription": "ɪndʒˈɔɪː",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/14392-631152008.mp3",
                                "picture": {
                                    "id": 1546161,
                                    "translate_id": 3879117,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1546161.png"
                                },
                                "pictures": {
                                    "1546161": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1546161.png",
                                    "1528181": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1528181.png",
                                    "1528158": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1528158.png",
                                    "1507092": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1507092.png",
                                    "1535490": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1535490.png",
                                    "1532724": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1532724.png"
                                }
                            },
                            "7906": {
                                "questionText": "choice",
                                "answerText": "выбор",
                                "transcription": "tʃˈɔɪːs",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/7906-631152008.mp3",
                                "picture": {
                                    "id": 1359218,
                                    "translate_id": 142818,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1359218.png"
                                },
                                "pictures": {
                                    "1359218": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1359218.png",
                                    "1331164": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1331164.png",
                                    "1215774": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1215774.png",
                                    "1527440": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1527440.png",
                                    "1405525": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1405525.png",
                                    "1383607": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1383607.png",
                                    "821659": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/821659.png",
                                    "1526120": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1526120.png",
                                    "1429353": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1429353.png",
                                    "1438535": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1438535.png",
                                    "1433648": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1433648.png"
                                }
                            },
                            "16761": {
                                "questionText": "forget",
                                "answerText": "забывать",
                                "transcription": "fəgˈet",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/16761-631152008.mp3",
                                "picture": {
                                    "id": 1502507,
                                    "translate_id": 3908947,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1502507.png"
                                },
                                "pictures": {
                                    "1502507": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1502507.png",
                                    "1516595": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1516595.png"
                                }
                            },
                            "30962": {
                                "questionText": "play",
                                "answerText": "играть",
                                "transcription": "plˈeɪː",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/30962-631152008.mp3",
                                "picture": {
                                    "id": 450442,
                                    "translate_id": 181237,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/450442.png"
                                },
                                "pictures": {
                                    "450442": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/450442.png",
                                    "423847": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/423847.png",
                                    "259023": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/259023.png",
                                    "583970": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/583970.png",
                                    "467881": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/467881.png",
                                    "1291969": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1291969.png",
                                    "494620": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/494620.png",
                                    "616205": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/616205.png",
                                    "1359859": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1359859.png",
                                    "1496507": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496507.png",
                                    "1450112": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1450112.png"
                                }
                            },
                            "39865": {
                                "questionText": "SURFACE",
                                "answerText": "поверхность",
                                "transcription": "sˈɜːfɪs",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/39865-631152008.mp3",
                                "picture": {
                                    "id": 16968,
                                    "translate_id": 77635,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/16968.png"
                                },
                                "pictures": {
                                    "16968": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/16968.png",
                                    "3561": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/3561.png",
                                    "8501": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/8501.png",
                                    "26569": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/26569.png",
                                    "173798": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/173798.png",
                                    "74430": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/74430.png",
                                    "120847": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/120847.png",
                                    "57951": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/57951.png",
                                    "99016": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/99016.png",
                                    "120851": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/120851.png",
                                    "173797": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/173797.png"
                                }
                            }
                        },
                        "translate_id": 3879117,
                        "progress_percent": 0,
                        "transcription": "ɪndʒˈɔɪː",
                        "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/14392-631152008.mp3",
                        "picture": {
                            "id": 1546161,
                            "translate_id": 3879117,
                            "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1546161.png"
                        },
                        "pictures": {
                            "1546161": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1546161.png",
                            "1528181": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1528181.png",
                            "1528158": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1528158.png",
                            "1507092": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1507092.png",
                            "1535490": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1535490.png",
                            "1532724": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1532724.png"
                        }
                    },
                    "30400": {
                        "text": "phone",
                        "answers": {
                            "30400": {
                                "questionText": "phone",
                                "answerText": "телефон",
                                "transcription": "foun",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/30400-631152008.mp3",
                                "picture": {
                                    "id": 1544572,
                                    "translate_id": 58254,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1544572.png"
                                },
                                "pictures": {
                                    "1544572": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1544572.png"
                                }
                            },
                            "21895": {
                                "questionText": "interest",
                                "answerText": "интерес",
                                "transcription": "[ˊɪntrɪst]",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/21895-631152008.mp3",
                                "picture": {
                                    "id": 168194,
                                    "translate_id": 297941,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/168194.png"
                                },
                                "pictures": {
                                    "168194": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/168194.png",
                                    "169": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/169.png",
                                    "63669": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/63669.png",
                                    "214412": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/214412.png",
                                    "212354": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/212354.png",
                                    "120422": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/120422.png",
                                    "130482": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/130482.png",
                                    "85975": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/85975.png",
                                    "221773": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/221773.png",
                                    "348456": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/348456.png",
                                    "1470855": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1470855.png"
                                }
                            },
                            "34297": {
                                "questionText": "RESERVE",
                                "answerText": "сдержанность",
                                "transcription": "rɪzˈɜːv",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/34297-631152008.mp3",
                                "picture": {
                                    "id": 620176,
                                    "translate_id": 2679888,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/620176.png"
                                },
                                "pictures": {
                                    "620176": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/620176.png",
                                    "202958": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/202958.png",
                                    "253836": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/253836.png",
                                    "455753": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/455753.png",
                                    "1408497": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1408497.png",
                                    "633502": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/633502.png",
                                    "1450699": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1450699.png",
                                    "401199": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/401199.png"
                                }
                            },
                            "24700": {
                                "questionText": "MAGNITUDE",
                                "answerText": "величина",
                                "transcription": "mˈægnɪtjud",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/24700-631152008.mp3",
                                "picture": {
                                    "id": 26332,
                                    "translate_id": 626423,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/26332.png"
                                },
                                "pictures": {
                                    "26332": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/26332.png",
                                    "73986": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/73986.png",
                                    "804782": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/804782.png",
                                    "752722": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/752722.png",
                                    "1138289": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1138289.png",
                                    "1324771": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1324771.png",
                                    "704885": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/704885.png"
                                }
                            },
                            "16514": {
                                "questionText": "FLY",
                                "answerText": "летать",
                                "transcription": "flˈaɪ",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/16514-631152008.mp3",
                                "picture": {
                                    "id": 315434,
                                    "translate_id": 148035,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/315434.png"
                                },
                                "pictures": {
                                    "315434": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/315434.png",
                                    "299366": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/299366.png",
                                    "139034": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/139034.png",
                                    "140327": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/140327.png",
                                    "226431": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/226431.png",
                                    "156754": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/156754.png",
                                    "319262": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/319262.png",
                                    "400504": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/400504.png",
                                    "210521": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/210521.png",
                                    "131687": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/131687.png",
                                    "128131": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/128131.png"
                                }
                            }
                        },
                        "translate_id": 58254,
                        "progress_percent": 0,
                        "transcription": "foun",
                        "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/30400-631152008.mp3",
                        "picture": {
                            "id": 1544572,
                            "translate_id": 58254,
                            "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1544572.png"
                        },
                        "pictures": {
                            "1544572": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1544572.png"
                        }
                    },
                    "41202": {
                        "text": "ticket",
                        "answers": {
                            "41202": {
                                "questionText": "ticket",
                                "answerText": "билет",
                                "transcription": "tˈɪkɪt",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/41202-631152008.mp3",
                                "picture": {
                                    "id": 336227,
                                    "translate_id": 80170,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/336227.png"
                                },
                                "pictures": {
                                    "336227": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/336227.png",
                                    "363235": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/363235.png",
                                    "813120": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/813120.png",
                                    "11977": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/11977.png",
                                    "1266281": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1266281.png",
                                    "1395746": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1395746.png",
                                    "1277607": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1277607.png",
                                    "1496046": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496046.png",
                                    "363234": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/363234.png",
                                    "1371090": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1371090.png",
                                    "1338926": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1338926.png"
                                }
                            },
                            "4182": {
                                "questionText": "bag",
                                "answerText": "сумка",
                                "transcription": "bˈæg",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/4182-631152008.mp3",
                                "picture": {
                                    "id": 135717,
                                    "translate_id": 147576,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/135717.png"
                                },
                                "pictures": {
                                    "135717": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/135717.png",
                                    "184610": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/184610.png",
                                    "220102": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/220102.png",
                                    "215963": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/215963.png",
                                    "101890": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/101890.png",
                                    "42150": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/42150.png",
                                    "170711": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/170711.png",
                                    "129230": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/129230.png",
                                    "202642": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/202642.png",
                                    "206228": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/206228.png",
                                    "1517379": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1517379.png"
                                }
                            },
                            "27893": {
                                "questionText": "OBVIOUS",
                                "answerText": "очевидный",
                                "transcription": "ˈɒbvɪəːs",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/27893-631152008.mp3",
                                "picture": {
                                    "id": 641823,
                                    "translate_id": 276654,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/641823.png"
                                },
                                "pictures": {
                                    "641823": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/641823.png",
                                    "658726": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/658726.png",
                                    "638003": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/638003.png",
                                    "667101": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/667101.png",
                                    "666645": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/666645.png",
                                    "813666": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/813666.png",
                                    "641822": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/641822.png",
                                    "723239": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/723239.png",
                                    "663190": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/663190.png",
                                    "773631": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/773631.png",
                                    "884020": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/884020.png"
                                }
                            },
                            "39099": {
                                "questionText": "STONE",
                                "answerText": "камень",
                                "transcription": "stoun",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/39099-631152008.mp3",
                                "picture": {
                                    "id": 73898,
                                    "translate_id": 76103,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/73898.png"
                                },
                                "pictures": {
                                    "73898": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/73898.png",
                                    "5480": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/5480.png",
                                    "141837": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/141837.png",
                                    "122137": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/122137.png",
                                    "6600": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/6600.png",
                                    "156545": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/156545.png",
                                    "99330": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/99330.png",
                                    "335550": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/335550.png",
                                    "173654": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/173654.png",
                                    "204277": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/204277.png",
                                    "959566": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/959566.png"
                                }
                            },
                            "25727": {
                                "questionText": "MILITANT",
                                "answerText": "борец",
                                "transcription": "mˈɪlɪtənt",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/25727-631152008.mp3",
                                "picture": {
                                    "id": 91319,
                                    "translate_id": 2474746,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/91319.png"
                                },
                                "pictures": {
                                    "91319": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/91319.png",
                                    "252664": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/252664.png",
                                    "253824": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/253824.png"
                                }
                            }
                        },
                        "translate_id": 80170,
                        "progress_percent": 0,
                        "transcription": "tˈɪkɪt",
                        "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/41202-631152008.mp3",
                        "picture": {
                            "id": 336227,
                            "translate_id": 80170,
                            "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/336227.png"
                        },
                        "pictures": {
                            "336227": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/336227.png",
                            "363235": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/363235.png",
                            "813120": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/813120.png",
                            "11977": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/11977.png",
                            "1266281": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1266281.png",
                            "1395746": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1395746.png",
                            "1277607": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1277607.png",
                            "1496046": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496046.png",
                            "363234": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/363234.png",
                            "1371090": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1371090.png",
                            "1338926": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1338926.png"
                        }
                    },
                    "7706": {
                        "text": "cheap",
                        "answers": {
                            "7706": {
                                "questionText": "cheap",
                                "answerText": "дешевый",
                                "transcription": "tʃˈiːp",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/7706-631152008.mp3",
                                "picture": {
                                    "id": 1488572,
                                    "translate_id": 14045,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1488572.png"
                                },
                                "pictures": {
                                    "1488572": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1488572.png",
                                    "1312299": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1312299.png",
                                    "609986": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/609986.png",
                                    "1409155": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1409155.png",
                                    "1379293": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1379293.png",
                                    "741826": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/741826.png",
                                    "1333615": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1333615.png",
                                    "312875": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/312875.png",
                                    "990839": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/990839.png",
                                    "1016433": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1016433.png",
                                    "1472909": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1472909.png"
                                }
                            },
                            "29717": {
                                "questionText": "pay",
                                "answerText": "платить",
                                "transcription": "pˈeɪː",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/29717-631152008.mp3",
                                "picture": {
                                    "id": 21527,
                                    "translate_id": 57042,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/21527.png"
                                },
                                "pictures": {
                                    "21527": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/21527.png",
                                    "18988": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/18988.png",
                                    "27555": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/27555.png",
                                    "373": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/373.png",
                                    "173764": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/173764.png",
                                    "51205": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/51205.png",
                                    "51139": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/51139.png",
                                    "1496033": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496033.png",
                                    "53634": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/53634.png",
                                    "74278": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/74278.png",
                                    "1496237": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496237.png"
                                }
                            },
                            "22096": {
                                "questionText": "INVADE",
                                "answerText": "вторгаться",
                                "transcription": "ɪnvˈeɪːd",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/22096-631152008.mp3",
                                "picture": {
                                    "id": 23326,
                                    "translate_id": 42535,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/23326.png"
                                },
                                "pictures": {
                                    "23326": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/23326.png",
                                    "112945": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/112945.png",
                                    "49196": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/49196.png",
                                    "42806": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/42806.png",
                                    "89135": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/89135.png",
                                    "62831": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/62831.png",
                                    "304291": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/304291.png",
                                    "297978": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/297978.png",
                                    "363191": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/363191.png",
                                    "116692": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/116692.png",
                                    "758072": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/758072.png"
                                }
                            },
                            "34297": {
                                "questionText": "RESERVE",
                                "answerText": "сдержанность",
                                "transcription": "rɪzˈɜːv",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/34297-631152008.mp3",
                                "picture": {
                                    "id": 620176,
                                    "translate_id": 2679888,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/620176.png"
                                },
                                "pictures": {
                                    "620176": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/620176.png",
                                    "202958": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/202958.png",
                                    "253836": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/253836.png",
                                    "455753": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/455753.png",
                                    "1408497": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1408497.png",
                                    "633502": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/633502.png",
                                    "1450699": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1450699.png",
                                    "401199": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/401199.png"
                                }
                            },
                            "7297": {
                                "questionText": "CATEGORY",
                                "answerText": "категория",
                                "transcription": "kˈætɪgəri",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/7297-631152008.mp3",
                                "picture": {
                                    "id": 160805,
                                    "translate_id": 13242,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/160805.png"
                                },
                                "pictures": {
                                    "160805": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/160805.png",
                                    "95103": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/95103.png",
                                    "743614": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/743614.png",
                                    "865517": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/865517.png",
                                    "865515": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/865515.png"
                                }
                            }
                        },
                        "translate_id": 14045,
                        "progress_percent": 0,
                        "transcription": "tʃˈiːp",
                        "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/7706-631152008.mp3",
                        "picture": {
                            "id": 1488572,
                            "translate_id": 14045,
                            "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1488572.png"
                        },
                        "pictures": {
                            "1488572": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1488572.png",
                            "1312299": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1312299.png",
                            "609986": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/609986.png",
                            "1409155": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1409155.png",
                            "1379293": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1379293.png",
                            "741826": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/741826.png",
                            "1333615": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1333615.png",
                            "312875": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/312875.png",
                            "990839": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/990839.png",
                            "1016433": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1016433.png",
                            "1472909": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1472909.png"
                        }
                    },
                    "8390": {
                        "text": "close",
                        "answers": {
                            "8390": {
                                "questionText": "close",
                                "answerText": "закрывать",
                                "transcription": "klous",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/8390-631152008.mp3",
                                "picture": {
                                    "id": 1494361,
                                    "translate_id": 15421,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1494361.png"
                                },
                                "pictures": {
                                    "1494361": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1494361.png",
                                    "1479197": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1479197.png",
                                    "664617": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/664617.png",
                                    "1022276": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1022276.png",
                                    "1410230": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1410230.png",
                                    "1171834": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1171834.png",
                                    "1109521": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1109521.png",
                                    "612385": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/612385.png",
                                    "998839": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/998839.png",
                                    "1483265": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1483265.png",
                                    "1538400": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1538400.png"
                                }
                            },
                            "34079": {
                                "questionText": "remember",
                                "answerText": "помнить",
                                "transcription": "rɪmˈembə",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/34079-631152008.mp3",
                                "picture": {
                                    "id": 1541149,
                                    "translate_id": 3906441,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1541149.png"
                                },
                                "pictures": {
                                    "1541149": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1541149.png",
                                    "1547650": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1547650.png"
                                }
                            },
                            "25716": {
                                "questionText": "MILD",
                                "answerText": "умеренный",
                                "transcription": "mˈaɪld",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/25716-631152008.mp3",
                                "picture": {
                                    "id": 277643,
                                    "translate_id": 49471,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/277643.png"
                                },
                                "pictures": {
                                    "277643": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/277643.png",
                                    "310413": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/310413.png",
                                    "420567": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/420567.png",
                                    "1139667": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1139667.png",
                                    "726995": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/726995.png",
                                    "499221": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/499221.png",
                                    "1278113": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1278113.png",
                                    "1477006": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1477006.png",
                                    "1456927": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1456927.png",
                                    "1457343": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1457343.png"
                                }
                            },
                            "3448": {
                                "questionText": "ARGUE",
                                "answerText": "спорить",
                                "transcription": "ˈɑːgju",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/3448-631152008.mp3",
                                "picture": {
                                    "id": 85098,
                                    "translate_id": 5688,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/85098.png"
                                },
                                "pictures": {
                                    "85098": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/85098.png",
                                    "126860": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/126860.png",
                                    "65095": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/65095.png",
                                    "218272": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/218272.png",
                                    "102143": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/102143.png",
                                    "127322": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/127322.png",
                                    "158399": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/158399.png",
                                    "79190": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/79190.png",
                                    "59420": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/59420.png",
                                    "204076": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/204076.png",
                                    "252866": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/252866.png"
                                }
                            },
                            "36723": {
                                "questionText": "SHARP",
                                "answerText": "острый",
                                "transcription": "ʃˈɑːp",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/36723-631152008.mp3",
                                "picture": {
                                    "id": 123817,
                                    "translate_id": 71131,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/123817.png"
                                },
                                "pictures": {
                                    "123817": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/123817.png",
                                    "153504": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/153504.png",
                                    "200414": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/200414.png",
                                    "201784": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/201784.png",
                                    "1460526": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1460526.png",
                                    "232863": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/232863.png",
                                    "151607": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/151607.png",
                                    "426226": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/426226.png",
                                    "397278": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/397278.png",
                                    "63552": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/63552.png",
                                    "693750": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/693750.png"
                                }
                            }
                        },
                        "translate_id": 15421,
                        "progress_percent": 0,
                        "transcription": "klous",
                        "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/8390-631152008.mp3",
                        "picture": {
                            "id": 1494361,
                            "translate_id": 15421,
                            "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1494361.png"
                        },
                        "pictures": {
                            "1494361": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1494361.png",
                            "1479197": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1479197.png",
                            "664617": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/664617.png",
                            "1022276": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1022276.png",
                            "1410230": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1410230.png",
                            "1171834": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1171834.png",
                            "1109521": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1109521.png",
                            "612385": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/612385.png",
                            "998839": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/998839.png",
                            "1483265": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1483265.png",
                            "1538400": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1538400.png"
                        }
                    },
                    "6512": {
                        "text": "bus",
                        "answers": {
                            "6512": {
                                "questionText": "bus",
                                "answerText": "автобус",
                                "transcription": "bˈʌs",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/6512-631152008.mp3",
                                "picture": {
                                    "id": 143273,
                                    "translate_id": 11755,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/143273.png"
                                },
                                "pictures": {
                                    "143273": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/143273.png",
                                    "24555": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/24555.png",
                                    "89875": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/89875.png",
                                    "161053": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/161053.png",
                                    "1391842": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1391842.png",
                                    "879460": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/879460.png",
                                    "186195": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/186195.png",
                                    "352640": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/352640.png",
                                    "186196": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/186196.png",
                                    "1503242": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1503242.png",
                                    "1277272": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1277272.png"
                                }
                            },
                            "4803": {
                                "questionText": "begin",
                                "answerText": "начинать",
                                "transcription": "bɪgˈɪn",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/4803-631152008.mp3",
                                "picture": {
                                    "id": 1530131,
                                    "translate_id": 3892355,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1530131.png"
                                },
                                "pictures": {
                                    "1530131": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1530131.png",
                                    "1457498": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1457498.png",
                                    "1519256": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1519256.png",
                                    "1475738": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1475738.png",
                                    "1496996": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496996.png",
                                    "1451738": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1451738.png",
                                    "1392104": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1392104.png",
                                    "1506603": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1506603.png",
                                    "1388364": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1388364.png",
                                    "1433169": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1433169.png",
                                    "1515411": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1515411.png"
                                }
                            },
                            "16014": {
                                "questionText": "find",
                                "answerText": "находить",
                                "transcription": "fˈaɪnd",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/16014-631152008.mp3",
                                "picture": {
                                    "id": 1360,
                                    "translate_id": 30809,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1360.png"
                                },
                                "pictures": {
                                    "1360": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1360.png",
                                    "106608": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/106608.png",
                                    "98383": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/98383.png",
                                    "157277": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/157277.png",
                                    "129145": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/129145.png",
                                    "103053": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/103053.png",
                                    "18652": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/18652.png",
                                    "81881": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81881.png",
                                    "92562": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/92562.png",
                                    "1503186": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1503186.png",
                                    "1392841": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1392841.png"
                                }
                            },
                            "22787": {
                                "questionText": "keep",
                                "answerText": "держать",
                                "transcription": "kˈiːp",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/22787-631152008.mp3",
                                "picture": {
                                    "id": 81570,
                                    "translate_id": 192078,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81570.png"
                                },
                                "pictures": {
                                    "81570": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81570.png",
                                    "54523": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/54523.png",
                                    "74871": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/74871.png",
                                    "58511": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/58511.png",
                                    "81053": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81053.png",
                                    "81052": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81052.png",
                                    "112341": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/112341.png",
                                    "559120": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/559120.png",
                                    "585002": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/585002.png",
                                    "103672": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/103672.png",
                                    "1376561": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1376561.png"
                                }
                            },
                            "30400": {
                                "questionText": "phone",
                                "answerText": "телефон",
                                "transcription": "foun",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/30400-631152008.mp3",
                                "picture": {
                                    "id": 1544572,
                                    "translate_id": 58254,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1544572.png"
                                },
                                "pictures": {
                                    "1544572": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1544572.png"
                                }
                            }
                        },
                        "translate_id": 11755,
                        "progress_percent": 0,
                        "transcription": "bˈʌs",
                        "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/6512-631152008.mp3",
                        "picture": {
                            "id": 143273,
                            "translate_id": 11755,
                            "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/143273.png"
                        },
                        "pictures": {
                            "143273": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/143273.png",
                            "24555": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/24555.png",
                            "89875": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/89875.png",
                            "161053": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/161053.png",
                            "1391842": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1391842.png",
                            "879460": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/879460.png",
                            "186195": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/186195.png",
                            "352640": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/352640.png",
                            "186196": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/186196.png",
                            "1503242": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1503242.png",
                            "1277272": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1277272.png"
                        }
                    },
                    "22787": {
                        "text": "keep",
                        "answers": {
                            "22787": {
                                "questionText": "keep",
                                "answerText": "держать",
                                "transcription": "kˈiːp",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/22787-631152008.mp3",
                                "picture": {
                                    "id": 81570,
                                    "translate_id": 192078,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81570.png"
                                },
                                "pictures": {
                                    "81570": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81570.png",
                                    "54523": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/54523.png",
                                    "74871": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/74871.png",
                                    "58511": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/58511.png",
                                    "81053": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81053.png",
                                    "81052": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81052.png",
                                    "112341": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/112341.png",
                                    "559120": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/559120.png",
                                    "585002": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/585002.png",
                                    "103672": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/103672.png",
                                    "1376561": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1376561.png"
                                }
                            },
                            "4182": {
                                "questionText": "bag",
                                "answerText": "сумка",
                                "transcription": "bˈæg",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/4182-631152008.mp3",
                                "picture": {
                                    "id": 135717,
                                    "translate_id": 147576,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/135717.png"
                                },
                                "pictures": {
                                    "135717": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/135717.png",
                                    "184610": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/184610.png",
                                    "220102": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/220102.png",
                                    "215963": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/215963.png",
                                    "101890": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/101890.png",
                                    "42150": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/42150.png",
                                    "170711": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/170711.png",
                                    "129230": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/129230.png",
                                    "202642": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/202642.png",
                                    "206228": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/206228.png",
                                    "1517379": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1517379.png"
                                }
                            },
                            "30962": {
                                "questionText": "play",
                                "answerText": "играть",
                                "transcription": "plˈeɪː",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/30962-631152008.mp3",
                                "picture": {
                                    "id": 450442,
                                    "translate_id": 181237,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/450442.png"
                                },
                                "pictures": {
                                    "450442": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/450442.png",
                                    "423847": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/423847.png",
                                    "259023": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/259023.png",
                                    "583970": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/583970.png",
                                    "467881": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/467881.png",
                                    "1291969": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1291969.png",
                                    "494620": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/494620.png",
                                    "616205": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/616205.png",
                                    "1359859": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1359859.png",
                                    "1496507": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1496507.png",
                                    "1450112": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1450112.png"
                                }
                            },
                            "37654": {
                                "questionText": "smell",
                                "answerText": "чувствовать запах",
                                "transcription": "smˈel",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/37654-631152008.mp3",
                                "picture": {
                                    "id": 1547846,
                                    "translate_id": 607246,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1547846.png"
                                },
                                "pictures": {
                                    "1547846": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1547846.png",
                                    "1547936": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1547936.png"
                                }
                            },
                            "39099": {
                                "questionText": "STONE",
                                "answerText": "камень",
                                "transcription": "stoun",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/39099-631152008.mp3",
                                "picture": {
                                    "id": 73898,
                                    "translate_id": 76103,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/73898.png"
                                },
                                "pictures": {
                                    "73898": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/73898.png",
                                    "5480": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/5480.png",
                                    "141837": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/141837.png",
                                    "122137": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/122137.png",
                                    "6600": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/6600.png",
                                    "156545": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/156545.png",
                                    "99330": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/99330.png",
                                    "335550": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/335550.png",
                                    "173654": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/173654.png",
                                    "204277": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/204277.png",
                                    "959566": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/959566.png"
                                }
                            }
                        },
                        "translate_id": 192078,
                        "progress_percent": 0,
                        "transcription": "kˈiːp",
                        "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/22787-631152008.mp3",
                        "picture": {
                            "id": 81570,
                            "translate_id": 192078,
                            "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81570.png"
                        },
                        "pictures": {
                            "81570": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81570.png",
                            "54523": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/54523.png",
                            "74871": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/74871.png",
                            "58511": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/58511.png",
                            "81053": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81053.png",
                            "81052": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/81052.png",
                            "112341": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/112341.png",
                            "559120": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/559120.png",
                            "585002": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/585002.png",
                            "103672": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/103672.png",
                            "1376561": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1376561.png"
                        }
                    },
                    "7064": {
                        "text": "careful",
                        "answers": {
                            "7064": {
                                "questionText": "careful",
                                "answerText": "осторожный",
                                "transcription": "kˈeəːfl",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/7064-631152008.mp3",
                                "picture": {
                                    "id": 1519250,
                                    "translate_id": 3883840,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1519250.png"
                                },
                                "pictures": {
                                    "1519250": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1519250.png"
                                }
                            },
                            "2096": {
                                "questionText": "advice",
                                "answerText": "совет",
                                "transcription": "ədvˈaɪs",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/2096-631152008.mp3",
                                "picture": {
                                    "id": 1524849,
                                    "translate_id": 3896807,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1524849.png"
                                },
                                "pictures": {
                                    "1524849": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1524849.png",
                                    "1521284": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1521284.png",
                                    "1546582": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1546582.png",
                                    "1540891": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1540891.png"
                                }
                            },
                            "6512": {
                                "questionText": "bus",
                                "answerText": "автобус",
                                "transcription": "bˈʌs",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/6512-631152008.mp3",
                                "picture": {
                                    "id": 143273,
                                    "translate_id": 11755,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/143273.png"
                                },
                                "pictures": {
                                    "143273": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/143273.png",
                                    "24555": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/24555.png",
                                    "89875": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/89875.png",
                                    "161053": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/161053.png",
                                    "1391842": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1391842.png",
                                    "879460": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/879460.png",
                                    "186195": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/186195.png",
                                    "352640": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/352640.png",
                                    "186196": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/186196.png",
                                    "1503242": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1503242.png",
                                    "1277272": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1277272.png"
                                }
                            },
                            "54682": {
                                "questionText": "POTENTIALLY",
                                "answerText": "потенциально",
                                "transcription": "pətˈenʃəli",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/54682-631152008.mp3",
                                "picture": {
                                    "id": 1324760,
                                    "translate_id": 381874,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1324760.png"
                                },
                                "pictures": {
                                    "1324760": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1324760.png",
                                    "1079290": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1079290.png",
                                    "1526453": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1526453.png"
                                }
                            },
                            "28537": {
                                "questionText": "OUGHT",
                                "answerText": "должен",
                                "transcription": "ˈɔːt",
                                "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/28537-631152008.mp3",
                                "picture": {
                                    "id": 70977,
                                    "translate_id": 132692,
                                    "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/70977.png"
                                },
                                "pictures": {
                                    "70977": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/70977.png",
                                    "27248": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/27248.png",
                                    "49397": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/49397.png",
                                    "196930": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/196930.png",
                                    "34134": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/34134.png",
                                    "12681": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/12681.png",
                                    "217494": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/217494.png",
                                    "30737": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/30737.png",
                                    "404186": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/404186.png",
                                    "1183291": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1183291.png",
                                    "192554": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/192554.png"
                                }
                            }
                        },
                        "translate_id": 3883840,
                        "progress_percent": 0,
                        "transcription": "kˈeəːfl",
                        "sound_url": "http:\/\/d2x1jgnvxlnz25.cloudfront.net\/v2\/1\/7064-631152008.mp3",
                        "picture": {
                            "id": 1519250,
                            "translate_id": 3883840,
                            "url": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1519250.png"
                        },
                        "pictures": {
                            "1519250": "\/\/d144fqpiyasmrr.cloudfront.net\/uploads\/picture\/1519250.png"
                        }
                    }
                }
            });
        }
    }
})();