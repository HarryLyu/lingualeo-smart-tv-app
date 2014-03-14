(function () {
    //var tvKey = new Common.API.TVKeyValue();
    var tvKey = {};

    var LeoApp = {
        anchorElementSelector: '#anchor',

        init: function () {
            /*this.WidgetAPI = new Common.API.Widget();    // create Common module
            this.TVKey = new Common.API.TVKeyValue();
            this.WidgetAPI.sendReadyEvent();*/

            this.private_assignEvents();

            this.private_loadTemplate();
        },

        private_loadTemplate: function () {
            var self = this;
            LEO.utils.template('index', null, function (html) {
                $('[data-container]').html(html);
                self.dumpSSOInformation();
            })
        },

        private_assignEvents: function () {
            $(this.anchorElementSelector).focus().on('keydown', this.private_keyDownHandler.bind(this));
        },

        dumpSSOInformation: function () {
            $('[data-output]').html("Search string: " + window.location.search);
        },

        private_keyDownHandler: function (event) {
            var keyCode = event.keyCode;
            $('[data-key-code]').html("Main Key code : " + keyCode);

            switch (keyCode) {
                case this.TVKey.KEY_LEFT:
                    alert("left");
                    document.getElementById("welcome").innerHTML = "Nice to meet you.";
                    break;
                case this.TVKey.KEY_RIGHT:
                    alert("right");
                    document.getElementById("welcome").innerHTML = "I'm so happy.";
                    break;
                case this.TVKey.KEY_UP:
                    alert("up");
                    document.getElementById("welcome").innerHTML = "I Love you.";
                    break;
                case this.TVKey.KEY_DOWN:
                    alert("down");
                    document.getElementById("welcome").innerHTML = "Good job.";
                    break;
                case this.TVKey.KEY_ENTER:
                    alert("enter");
                    break;
                case this.TVKey.KEY_RETURN:
                    break;
            }
        }
    };


    window.LeoApp = LeoApp;
})();