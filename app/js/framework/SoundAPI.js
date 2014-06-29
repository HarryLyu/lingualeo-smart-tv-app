(function () {
    var SoundAPI = {
        audioElement: null,
        init: function () {
            if (!this.audioElement) {
                this.audioElement = document.getElementById('pluginPlayer');
            }
        },

        play: function (soundUrl) {
            this.init();
            this.audioElement.Play("http://d2x1jgnvxlnz25.cloudfront.net/v2/1/41202-631152008.mp3");
        }
    };

    window.LEO.SoundAPI = SoundAPI;
})();