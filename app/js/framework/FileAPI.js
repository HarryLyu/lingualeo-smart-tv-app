(function () {
    var FileAPI = {
        fileSystem: null,
        userDataFileName: 'userdata.json',

        init: function () {
            var fileSystemObj = this.getSmartTvFilesystem();

            if (!fileSystemObj) {
                return false;
            }

            if (!fileSystemObj.isValidCommonPath(curWidget.id)) {
                fileSystemObj.createCommonDir(curWidget.id);
            }

            return true;
        },

        getSmartTvFilesystem: function () {
            if (!this.fileSystem) {
                try {
                    this.fileSystem = new FileSystem();
                }catch (e){}
            }

            return this.fileSystem;
        },

        getStoredUserData: function () {
            try {
                if (!this.init()) {
                    return {};
                }
                var fileObj = this.getSmartTvFilesystem().openCommonFile(curWidget.id + '/' + this.userDataFileName, 'r');
                return JSON.parse(fileObj.readAll());
            } catch (e) {
                LEO.log('Exception in getStoredUserData: ' + e.message);
            }
        },

        saveStoredUserData: function (userData) {
            if (!this.init()) {
                return null;
            }
            var fileSystem = this.getSmartTvFilesystem(),
                fileObj = fileSystem.openCommonFile(curWidget.id + '/' + this.userDataFileName, 'w');

            fileObj.writeAll(JSON.stringify(userData));
            this.getSmartTvFilesystem().closeCommonFile(fileObj);
            return true;
        }
    };


    window.LEO.FileAPI = FileAPI;
})();