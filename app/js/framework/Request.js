(function () {
    var Request = {
        request: function (type, url, params, callbackSuccess, callbackError) {
            var url = 'http://188.120.233.173/ajax-data/' + url;

            $.ajax(url, {
                type : type,
                dataType : 'json',
                params: params,
                setCookies: this.auth.cookies,
                success: function(obj, status, response) {
                    callbackSuccess && callbackSuccess(JSON.parse(response.responseText));
                },
                error: function(obj, status, response) {
                    callbackError && callbackError(response);
                }
            });
        },

        getAuthorization: function (userCode, callbackSuccess, callbackError) {
            var url = LEO.config.apiHost + '/api/login',
                self = this;

            $.ajax(url, {
                type : 'POST',
                dataType : 'json',

                params: {
                    port: LEO.config.apiPort,
                    email: 'igor@lingualeo.com',
                    smartTvCode: userCode,
                    password: userCode
                },

                success: function(data, textStatus, request) {
                    if (!data.error_msg) {
                        callbackError && callbackError(data.error_msg);
                        return;
                    }

                    self.auth.cookies = request.getAllResponseHeaders();
                    self.auth.user = data.user;
                    callbackSuccess && callbackSuccess(self.auth.user)
                },

                error: function(data, textStatus, request) {
                    callbackError && callbackError(data);
                }
            });
        }
    };


    window.LEO.Request = Request;
})();