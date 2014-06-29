(function () {
    LEO.KeyHandler = function () {
        var self = this;

        /*this.$anchor = $('<a></a>').attr({
            href: 'javascript:void(0)'
        });

        this.$anchor.on('click', function (event) {
            self.private_keyDownHandler(event);
        });

        this.$anchor.appendTo(document.body);
        this.$anchor.focus();*/

        $(window).on('keydown', function (event) {
            self.private_keyDownHandler(event);
        })

        this.initKeys();
    };

    LEO.KeyHandler.prototype = {
        keys: {},
        initKeys: function () {
            try {
                this.TVKeyValue = new Common.API.TVKeyValue();
                for (var key in this.TVKeyValue) {
                    if (this.TVKeyValue.hasOwnProperty(key)) {
                        this.keys[key] = this.TVKeyValue[key];
                    }
                }
            }
            catch (e) {
                this.keys = {
                    //KEY_RETURN: 13,
                    KEY_UP: 38,
                    KEY_DOWN: 40,
                    KEY_LEFT: 37,
                    KEY_RIGHT: 39,
                    KEY_ENTER: 13,
                    KEY_1: 49,
                    KEY_2: 50,
                    KEY_3: 51,
                    KEY_4: 52,
                    KEY_5: 53,
                    KEY_6: 54,
                    KEY_7: 55,
                    KEY_8: 56,
                    KEY_9: 57,
                    KEY_0: 48
                };
            }
        },

        private_keyDownHandler: function (event) {
            if (!this.currentHandlerKeyMap) {
                return;
            }

            var anyClickCallbackObject =  this.currentHandlerKeyMap.ANY;

            if (anyClickCallbackObject) {
                if (anyClickCallbackObject.callback.call(anyClickCallbackObject.context) === false) {
                    return;
                }
            }

            var keyCode = event.keyCode,
                keyLabel = this.private_getKeyLabelByCode(keyCode),
                callbackObject =  this.currentHandlerKeyMap[keyLabel];

            LEO.log(keyCode + ', ' + keyLabel);

            if (callbackObject) {
                callbackObject.callback.call(callbackObject.context);
            }
        },

        private_getKeyLabelByCode: function (code) {
            for (var label in this.keys) {
                if (this.keys[label] == code) {
                    return label;
                }
            }
        },

        setHandlerKeyMap: function (keymap) {
            this.currentHandlerKeyMap = keymap;
        },

        removeHandler: function () {
            this.setHandlerKeyMap(null);
        }
    };

    /*
    KEY_TOOLS
    KEY_MUTE
    KEY_RETURN
    KEY_UP
    KEY_DOWN
    KEY_LEFT
    KEY_RIGHT
    KEY_WHEELDOWN
    KEY_WHEELUP
    KEY_ENTER
    KEY_INFO
    KEY_EXIT
    KEY_RED
    KEY_GREEN
    KEY_YELLOW
    KEY_BLUE
    KEY_INFOLINK
    KEY_RW
    KEY_PAUSE
    KEY_FF
    KEY_PLAY
    KEY_STOP
    KEY_1
    KEY_2
    KEY_3
    KEY_4
    KEY_5
    KEY_6
    KEY_7
    KEY_8
    KEY_9
    KEY_0
    KEY_EMPTY
    KEY_PRECH
    KEY_SOURCE
    KEY_CHLIST
    KEY_MENU
    KEY_WLINK
    KEY_CC
    KEY_CONTENT
    KEY_FAVCH
    KEY_REC
    KEY_EMODE
    KEY_DMA
    KEY_PANEL_CH_UP
    KEY_PANEL_CH_DOWN
    KEY_PANEL_VOL_UP
    KEY_PANEL_VOL_DOWN
    KEY_PANEL_ENTER
    KEY_PANEL_SOURCE
    KEY_PANEL_MENU
    KEY_PANEL_POWER
    */
})();