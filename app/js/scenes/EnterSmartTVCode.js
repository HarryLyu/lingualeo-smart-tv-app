(function () {

    LEO.scenes.EnterSmartTVCode = function (app) {
        this.app = app;
    };

    LEO.scenes.EnterSmartTVCode.prototype = {
        title: 'Привяжите свой аккаунт на LinguaLeo',
        $: {},
        imeBox: null,
        config: {
            locators: {
                codeInputBtn: '[data-code-input]',
                codeInputField: '#smartTVCodeInput'
            }
        },

        render: function () {
            var self = this;

            LEO.utils.template('enterSmartTVCode', {}, function (html) {
                try {
                    self.app.writeToContainer(html);

                    self.fillElementsData(self.app.getContainer());

                    self.imeBox = self.createInputHandler('smartTVCodeInput', function (hz, code) {
                        LEO.log('SmartTVCode received ' + code);
                        self.codeInputOnComplete(code)
                    });
                } catch (e) {
                    LEO.log('Exception in EnterSmartTVCode.render: ' + e.message);
                }
            });
        },

        createInputHandler: function (elementId, onCompleteCallback) {
            try {
                LEO.SmartTV.PluginAPI.registIMEKey();
                LEO.SmartTV.PluginAPI.registAllKey();

                var imeBox = new IMEShell_Common();

                imeBox.inputboxID = elementId;
                imeBox.inputTitle = 'Code';
                imeBox.isSetNumberdMode = true;

                // FFFFFUUUUUUUU!!!!11 они перепутали названия коллбэков!
                imeBox.onKeyPressFunc = onCompleteCallback;
                //imeBox.setOnCompleteFunc = onCompleteCallback;

                return imeBox;
            }
            catch (e) {
                LEO.log('Exception in createInputHandler: ' + e.message);
            }
        },

        codeInputOnComplete: function (code) {
            var self = this;

            LEO.log('EnterSmartvCode.codeInputOnComplete start request');

            LEO.Request.getAuthorization(code,
                function (user) {
                    LEO.log('codeInputOnComplete: Authorization went good!');
                    self.app.loadScene('TrainingsList', function (sceneInstance) {
                        self.app.runScene('TrainingsList');
                    });
                },
                function () {
                    LEO.log('codeInputOnComplete: Authorization went bad!');
                }
            );

            LEO.log('EnterSmartvCode.codeInputOnComplete request sent');
        },

        fillElementsData: function ($container) {
            for (var locator in this.config.locators) {
                if (this.config.locators.hasOwnProperty(locator)) {
                    this.$[locator] = $container.find(this.config.locators[locator])
                }
            }
        },

        private_assignEvents: function () {

        },

        destroy: function () {
            this.imeBox = null;
            this.$ = {};
        },

        getKeyHandler: function () {
            var self = this;

            return {
                KEY_ENTER: {
                    callback: function () {
                        //self.$.codeInputField.focus;
                        self.imeBox.onShow();
                    }
                }

            };
        }
    }
})();