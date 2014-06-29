(function () {
    var Localization = {
        applicationParams: null,
        suportedLanguages: ['ru', 'tr', 'pt'],

        defaultLanguage: 'en',

        init: function (applicationParams) {
            this.applicationParams = applicationParams;
            this.loadLocalization(this.applicationParams);
        },

        loadLocalization: function (applicationParams) {
            LEO.log('load localization: stub');
        }
    };


    window.LEO.Localization = Localization;
})();