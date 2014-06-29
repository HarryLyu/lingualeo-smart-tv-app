(function () {
    var LeoApp = {
        scenes: {},
        currentScene: null,
        auth: {},
        smartTvObjects: {
            userDataFileName: 'userdata.json'
        },
        applicationParams: null,

        init: function () {
            this.applicationParams = LEO.SmartTV.getApplicationParams();
            LEO.Localization.init(this.applicationParams);

            this.private_assignEvents();
            this.start();

            if (LEO.SmartTV.isRunOnSmartTV()) {
                LEO.SmartTV.initSmartTVObjects();
            }
        },

        start: function () {
            var self = this;

            var storedUser = LEO.FileAPI.getStoredUserData();

            if (storedUser.smartTVCode) {
                LEO.Request.getAuthorization(storedUser.smartTVCode, function (user) {
                    LEO.log('result: ' + JSON.stringify(user));
                }, function (error) {
                    LEO.log('error: ' + JSON.stringify(user));
                });
            }
            else {
                this.loadScene('Welcome', function (sceneInstance) {
                    self.runScene('Welcome');
                });
            }

            /*this.loadScene('TrainingsList', function (sceneInstance) {
                self.runScene('TrainingsList');
            });*/
        },

        loadScene: function (sceneName, callback) {
            var self = this;

            if (self.scenes[sceneName]) {
                callback(self.scenes[sceneName]);
                return;
            }

            $.getScript('js/scenes/' + sceneName + '.js', function () {
                self.scenes[sceneName] = new LEO.scenes[sceneName](self);
                callback(self.scenes[sceneName]);
            });
        },

        runScene: function (sceneName) {
            if (this.currentScene) {
                this.KeyHandler.setHandlerKeyMap(null);
                this.getContainer().empty().removeClass(this.currentScene.containerClassName);
                this.setTitle('');
                this.currentScene.destroy();
                this.currentScene = null;
            }

            this.currentScene = this.scenes[sceneName];

            this.getContainer().addClass(this.currentScene.containerClassName);
            this.setTitle(this.currentScene.title);
            this.currentScene.render();

            this.KeyHandler.setHandlerKeyMap(this.currentScene.getKeyHandler());
        },

        getContainer: function () {
            return $('[data-container]');
        },

        setTitle: function (title) {
            $('[data-title]').html(title);
        },

        writeToContainer: function (html) {
            this.getContainer().html(html);
        },

        private_assignEvents: function () {
            this.KeyHandler = new LEO.KeyHandler();
        },

        getAuthorization: function (userCode, callbackSuccess, callbackError) {
            var url = LEO.config.apiHost + '/api/login',
                self = this;

            $.ajax(url, {
                type : 'POST',
                dataType : 'json',

                params: {
                    port: LEO.config.apiPort,
                    email: 'igor@lingualeo.com',
                    smartTvCode: userCode,
                    password: userCode
                },

                success: function(data, textStatus, request) {
                    if (!data.error_msg) {
                        callbackError && callbackError(data.error_msg);
                        return;
                    }

                    self.auth.cookies = request.getAllResponseHeaders();
                    self.auth.user = data.user;
                    callbackSuccess && callbackSuccess(self.auth.user)
                },

                error: function(data, textStatus, request) {
                    callbackError && callbackError(data);
                }
            });
        }
    };


    window.LeoApp = LeoApp;
})();