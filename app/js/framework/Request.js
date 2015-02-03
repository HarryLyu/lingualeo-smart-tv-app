(function () {
    var Request = {
        auth: {},
        request: function (type, endPoint, params, callbackSuccess, callbackError) {
            var url = LEO.config.apiHost + endPoint


            LEO.log('start request ' + endPoint);

            var XHRTool = new XHRToolKit(type, url, params, function(data, status, response) {
                LEO.log('success request');
                callbackSuccess && callbackSuccess(data);
            }, function(obj, status, response) {
                LEO.log('error request');
                callbackError && callbackError(response);
            });
            XHRTool.sendXHRRequest();
        },

        getLocal: function (endPoint, callbackSuccess, callbackError) {
            var XHRTool = new XHRToolKit('GET', endPoint, {}, function(data, status, response) {
                callbackSuccess && callbackSuccess(data);
            }, function(obj, status, response) {
                callbackError && callbackError(response);
            });
            XHRTool.sendXHRRequest();
        },


        getAuthorization: function (userCode, callbackSuccess, callbackError) {
            var url = LEO.config.apiHost + '/api/login?port=' + LEO.config.apiPort + '&email=igor@lingualeo.com&smartTvCode=' + userCode + '&password=' + userCode,
                self = this;

            LEO.log('LEO.Request.getAuthorization for ' + userCode);

            try {
                var XHRTool = new XHRToolKit('GET', url, null, function (data, request) {
                    try {
                        if (!data.error_msg) {
                            callbackError && callbackError(data.error_msg);
                            return;
                        }

                        self.auth.cookies = request.getAllResponseHeaders();
                        self.auth.user = data.user;
                        callbackSuccess && callbackSuccess(self.auth.user)
                    } catch (e) {
                        LEO.log('Auth response parse error ' + e.message);
                    }
                }, callbackError);
                XHRTool.sendXHRRequest();

            } catch (e) {
                LEO.log('Exception in Auth request ' + e.message);
            }

        }
    };


    window.LEO.Request = Request;
})();