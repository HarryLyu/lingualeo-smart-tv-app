LEO.utils = {
    templatesCache: {}
};

LEO.log = function (text) {
    $('#log').prepend(text).prepend('<br/>');
}

LEO.utils.template = function (path, data, callback) {
    if (!callback) {
        return;
    }

    var self = this;

    data = data || {};

    if (this.templatesCache[path]) {
        callback(this.templatesCache[path](data));
    }

    $.get('templates/' + path + '.jst', function (templateString) {
        self.templatesCache[path] =
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                    "with(obj){p.push('" +
                    templateString
                        .replace(/[\r\t\n]/g, " ")
                        .split("<%").join("\t")
                        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                        .replace(/\t=(.*?)%>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'")
                    + "');}return p.join('');");

        callback(self.templatesCache[path](data));
    });
};
