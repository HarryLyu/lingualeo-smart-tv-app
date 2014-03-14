(function () {
    var LeoApp = {
        scenes: {},
        currentScene: null,

        init: function () {
            this.private_assignEvents();
            this.start();

            if (this.isRunOnSmartTV()) {
                this.initSmartTVObjects();
            }
        },

        start: function () {
            var self = this;

            this.loadScene('TrainingsList', function (sceneInstance) {
                self.runScene('TrainingsList');
            });
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
                this.currentScene.destroy();
                this.currentScene = null;
            }

            this.currentScene = this.scenes[sceneName];

            this.getContainer().addClass(this.currentScene.containerClassName);
            this.currentScene.render();

            this.KeyHandler.setHandlerKeyMap(this.currentScene.getKeyHandler());
        },

        isRunOnSmartTV: function () {
            return !!window.location.search;
        },

        initSmartTVObjects: function () {
            this.WidgetAPI = new Common.API.Widget();
            this.WidgetAPI.sendReadyEvent();
        },

        getContainer: function () {
            return $('[data-container]');
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