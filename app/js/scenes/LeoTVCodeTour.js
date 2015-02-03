(function () {
    LEO.scenes.LeoTVCodeTour = function (app) {
        this.app = app;
    };

    LEO.scenes.LeoTVCodeTour.prototype = {
        $: {},
        containerClassName: 'leo-tv-code-tour-scene',
        btnsAttr: 'data-login-mode',

        selectedItemIndex: null,

        render: function () {
            try {
                var self = this;

                LEO.utils.template('LeoTVCodeTour', {}, function (html) {
                    try {
                        self.app.writeToContainer(html);
                        self.fillElementsData(self.app.getContainer());

                        self.selectLoginItem(0);

                        self.private_assignEvents();
                    } catch (e) {
                        LEO.log('Exception in Welcome.template.render: ' + e.message);
                    }
                });
            } catch (e) {
                LEO.log('Exception in Welcome.render: ' + e.message);
            }
        },

        fillElementsData: function ($container) {
            this.$.loginItems = $container.find('[' + this.btnsAttr + ']');
        },

        selectLoginItem: function (index) {
            this.selectedItemIndex = index;
            this.$.loginItems.removeClass('active');
            $(this.$.loginItems[this.selectedItemIndex]).addClass('active');
        },

        private_assignEvents: function () {

        },

        clickCallback: function ($elem) {
            try {
                var self = this,
                    selectedMode = $elem.attr(self.btnsAttr),
                    sceneName;

                if (selectedMode == 'no') {
                    self.app.isDemoUser = true;
                    sceneName = 'TrainingsList';
                }

                if (selectedMode == 'yes') {
                    sceneName = 'EnterSmartTVCode';
                }

                self.app.loadScene(sceneName, function (sceneInstance) {
                    self.app.runScene(sceneName);
                });
            } catch (e) {
                LEO.log('Exception in Welcome.clickCallback ' + e.message);
            }
        },

        getKeyHandler: function () {
            var self = this;

            return {
                KEY_LEFT: {
                    callback: function () {
                        self.selectLoginItem(Math.max(0, --self.selectedItemIndex));
                    }
                },
                KEY_RIGHT: {
                    callback: function () {
                        self.selectLoginItem(Math.min(self.$.loginItems.length - 1, ++self.selectedItemIndex));
                    }
                },
                KEY_ENTER: {
                    callback: function () {
                        LEO.log('Welcome scene ENTER handler');
                        self.clickCallback($(self.$.loginItems[self.selectedItemIndex]));
                    }
                },
                KEY_RETURN: {
                    callback: function () {
                        return false;
                    }
                }
            };
        },

        destroy: function () {
            try {
                this.app.getContainer().off('click', '[' + this.trainingItemAttr + ']', this.clickCallback);
                this.clickCallback = null;
                this.$trainingsItems = null;
                this.trainingsCount = null;
            } catch (e) {
                LEO.log('Exception in LeoTvCodeTour.destroy: ' + e.message);
            }
        }
    }
})();