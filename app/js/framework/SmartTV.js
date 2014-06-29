(function () {
    var SmartTV = {
        WidgetAPI: null,

        getApplicationParams: function () {
            var data = window.location.search.split('?')[1],
                params = data ? data.split('&') : [],
                appVars = {};

            params.forEach(function (value, index) {
                var appVar = value.split('=');
                appVars[appVar[0]] = appVar[1];
            });

            return appVars;
        },

        isRunOnSmartTV: function () {
            return !!window.location.search;
        },

        initSmartTVObjects: function () {
            this.WidgetAPI = new Common.API.Widget();
            this.WidgetAPI.sendReadyEvent();

            this.PluginAPI = new Common.API.Plugin();
            this.TVKeyValue = new Common.API.TVKeyValue();
        }

    };


    window.LEO.SmartTV = SmartTV;
})();