(function () {
    LEO.scenes.Welcome = function (app) {
        this.app = app;
    };

    LEO.scenes.Welcome.prototype = {
        $: {},
        containerClassName: 'view-trainings-list',
        btnsAttr: 'data-login-mode',

        title: 'Добро пожаловать на LinguaLeo!',

        selectedItemIndex: null,

        render: function () {
            var self = this;

            LEO.utils.template('welcome', {}, function (html) {
                self.app.writeToContainer(html);
                self.fillElementsData(self.app.getContainer());

                self.selectLoginItem(0);

                self.private_assignEvents();
            });
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
            var self = this;

            this.clickCallback = function () {
                var $elem = $(this),
                    selectedMode = $elem.attr(self.btnsAttr),
                    sceneName;

                if (selectedMode == 'demo') {
                    self.app.isDemoUser = true;
                    sceneName = 'TrainingsList';
                }
                if (selectedMode == 'code') {
                    sceneName = 'EnterSmartTVCode';
                }

                self.app.loadScene(sceneName, function (sceneInstance) {
                    self.app.runScene(sceneName);
                });

                return false;
            };

            this.app.getContainer().on('click', '[' + this.btnsAttr + ']', this.clickCallback);
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
                        $(self.$.loginItems[self.selectedItemIndex]).click();
                    }
                }
            };
        },

        destroy: function () {
            this.app.getContainer().off('click', '[' + this.trainingItemAttr + ']', this.clickCallback);
            this.clickCallback = null;
            this.$trainingsItems = null;
            this.trainingsCount = null;
        }
    }
})();