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

        title: 'Тренировки слов',

        render: function () {
            var self = this;

            this.getInitialData(function (data) {
                var trainingsData = self.cleanData(data.initial_data);

                LEO.utils.template('trainingsList', {trainingsData: trainingsData}, function (html) {
                    self.app.writeToContainer(html);

                    self.fillTrainingsItemsData();

                    self.selectWelcomeItem(0);

                    self.private_assignEvents();
                })
            });
        },

        fillTrainingsItemsData: function () {
            this.$trainingsItems = this.app.getContainer().find('[' + this.trainingItemAttr + ']');
            this.trainingsCount = this.$trainingsItems.length;
        },

        selectWelcomeItem: function (index) {
            this.selectedItemIndex = index;
            this.$trainingsItems.removeClass('active');
            $(this.$trainingsItems[this.selectedItemIndex]).addClass('active');
        },

        private_assignEvents: function () {
            var self = this;

            this.clickCallback = function () {
                LEO.log('click callback');
                var $elem = $(this),
                    trainingName = $elem.attr(self.trainingItemAttr);

                LEO.log('click callback: ' + trainingName);

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
                        $(self.$trainingsItems[self.selectedItemIndex]).click();
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
            LEO.Request.request('POST', '/training/getinitialdata', {wordSetId: 0}, callback, null);
        }
    }
})();