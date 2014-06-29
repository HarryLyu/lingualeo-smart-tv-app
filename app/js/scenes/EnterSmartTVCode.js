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
                self.app.writeToContainer(html);

                LEO.log('1');
                self.fillElementsData(self.app.getContainer());
                LEO.log('2');
                //self.private_assignEvents();
                LEO.log('3');
                self.imeBox = self.createInputHandler('smartTVCodeInput', function () {
                    self.codeInputOnComplete.apply(self, Array.prototype.slice.call(arguments, 0))
                });
                LEO.log('4');
                this.$.codeInputBtn.addClass('active').focus();
            });
        },

        createInputHandler: function (elementId, onCompleteCallback) {
            try {
                LEO.SmartTV.PluginAPI.registIMEKey();
                LEO.SmartTV.PluginAPI.registAllKey();

                var imeBox = new IMEShell_Common();

                imeBox.inputboxID = elementId;
                imeBox.inputTitle = 'Code';
                imeBox.setOnCompleteFunc = onCompleteCallback;
                imeBox.isSetNumberdMode = true;
                document.getElementById(elementId).focus();
                LEO.log('imebox: ' + Object.keys(imeBox).join(' '));
                return imeBox;
            }
            catch (e) {
                LEO.log('Exception in createInputHandler: ' + e.message);
            }
        },

        codeInputOnComplete: function () {
            LEO.log('complete: ' + JSON.stringify(arguments));
        },

        fillElementsData: function ($container) {
            for (var locator in this.config.locators) {
                if (this.config.locators.hasOwnProperty(locator)) {
                    this.$[locator] = $container.find(this.config.locators[locator])
                }
            }
        },

        private_assignEvents: function () {
            var self = this;
            this.app.getContainer().on('click', '[data-code-input]', function () {
                //self.imeBox.onShow();
            });
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
                        try {
                            self.$.codeInputField.focus;
                            self.imeBox.onShow();
                        } catch (e) {
                            LEO.log('err ' + e.message);
                        }
                    }
                }

            };
        }
    }
})();