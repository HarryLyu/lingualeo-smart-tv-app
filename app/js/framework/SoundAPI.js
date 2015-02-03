(function () {
    var SoundAPI = {
        audioElement: null,
        init: function () {
            if (!this.audioElement) {
                this.audioElement = document.getElementById('pluginPlayer');
            }
        },

        play: function (soundUrl, loop) {
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', soundUrl);
            audioElement.load();

            if (loop) {
                audioElement.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }

            audioElement.play();
            return audioElement;
        }
    };

    window.LEO.SoundAPI = SoundAPI;
})();