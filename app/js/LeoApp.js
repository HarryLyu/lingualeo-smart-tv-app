(function () {
    var LeoApp = {
        scenes: {},
        currentScene: null,
        auth: {},
        smartTvObjects: {
            userDataFileName: 'userdata.json'
        },
        applicationParams: null,
        container: null,

        init: function () {
            try {
                this.applicationParams = LEO.SmartTV.getApplicationParams();

                // load localization
                LEO.Localization.init(this.applicationParams);

                // init container
                this.container = $('[data-container]');

                this.private_assignEvents();
                this.start();

                if (LEO.SmartTV.isRunOnSmartTV()) {
                    LEO.SmartTV.initSmartTVObjects();
                }
            } catch (e) {
                LEO.log('Exception in LeoApp.init: ' + e.message);
            }
        },

        start: function () {
            LEO.log('Start 1');
            try {
                var self = this;

                var storedUser = LEO.FileAPI.getStoredUserData();

                LEO.log('Start 2');
                if (storedUser.smartTVCode) {
                    LEO.log('Start 3');
                    LEO.log('Found stored userCode: ' + storedUser.smartTVCode);

                    LEO.Request.getAuthorization(storedUser.smartTVCode,
                        function (user) {
                            LEO.log('Authorization of stored user went ok');
                            self.loadScene('TrainingsList', function (sceneInstance) {
                                self.runScene('TrainingsList');
                            });

                        }, function (error) {
                            LEO.log('Authorization of stored user went wrong');
                            this.loadScene('Welcome', function (sceneInstance) {
                                self.runScene('Welcome');
                            });
                        }
                    );
                }
                else {
                    LEO.log('Start 4');
                    this.loadScene('Welcome', function (sceneInstance) {
                        self.runScene('Welcome');
                    });
                }
            } catch (e) {
                LEO.log('Exception in LeoApp.start: ' + e.message);
            }
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
            try {
                if (this.currentScene) {
                    this.KeyHandler.setHandlerKeyMap(null);
                    this.currentScene.destroy && this.currentScene.destroy();
                    this.getContainer().empty().removeClass(this.currentScene.containerClassName);
                    this.setTitle('');
                    this.currentScene = null;
                }

                this.currentScene = this.scenes[sceneName];

                this.getContainer().addClass(this.currentScene.containerClassName);
                this.setTitle(this.currentScene.title);
                this.currentScene.render();

                this.KeyHandler.setHandlerKeyMap(this.currentScene.getKeyHandler());
            } catch (e) {
                LEO.log('Exception in runScene: ' + e.message);
            }
        },

        getContainer: function () {
            return this.container;
        },

        setTitle: function (title) {
            $('[data-title]').html(title);
        },

        writeToContainer: function (html) {
            this.getContainer().html(html);
        },

        private_assignEvents: function () {
            this.KeyHandler = new LEO.KeyHandler();
        }
    };


    window.LeoApp = LeoApp;
})();