(function () {
    LEO.scenes.TrainingsList = function (app) {
        this.app = app;
    };

    LEO.scenes.TrainingsList.prototype = {
        availableTrainings: [
            //'word_translate',
            //'translate_word',
            'rapid_repetition'
        ],

        trainingItemAttr: 'data-training-item',

        containerClassName: 'view-trainings-list',

        title: 'Тренировки слов',

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

        runTraining: function (trainingName) {
            var self = this;

            LEO.log('run training: ' + trainingName);

            self.app.loadScene('Training_' + trainingName, function () {
                self.app.runScene('Training_' + trainingName);
            });
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
                        self.runTraining($(self.$trainingsItems[self.selectedItemIndex]).attr(self.trainingItemAttr));
                    }
                }
            };
        },

        destroy: function () {
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
            if (this.app.isDemoUser) {
                LEO.Request.getLocal('ajax-data/trainings/trainings_data.json', callback, null);
            }
            else {
                LEO.Request.request('POST', '/training/getinitialdata', {wordSetId: 0}, callback, null);
            }
        }
    }
})();