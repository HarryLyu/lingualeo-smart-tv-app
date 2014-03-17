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
            LEO.log('run scene 1');
            if (this.currentScene) {
                LEO.log('run scene 2');
                this.KeyHandler.setHandlerKeyMap(null);
                this.getContainer().empty().removeClass(this.currentScene.containerClassName);
                this.setTitle('');
                this.currentScene.destroy();
                this.currentScene = null;
            }
            LEO.log('run scene 3');

            this.currentScene = this.scenes[sceneName];

            LEO.log('run scene 4');

            this.getContainer().addClass(this.currentScene.containerClassName);
            this.setTitle(this.currentScene.title);
            LEO.log('run scene 5');
            this.currentScene.render();

            LEO.log('run scene 6');
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