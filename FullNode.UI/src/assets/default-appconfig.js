"use strict";
exports.__esModule = true;
var DefaultConfig = /** @class */ (function () {
    function DefaultConfig() {
        this.asString = "\{" +
            "\"apiUrl\" : \"http://localhostZZZZZ:37220/api\"," +
            "\"startNode\" : \"true\"" +
            "\}";
        this.asStringWithoutURL = "\{" +
            "\"startNode\" : \"true\"" +
            "\}";
        this.apiUrl = new URL("http://localhost:37220/api");
        this.startNode = true;
    }
    return DefaultConfig;
}());
exports.DefaultConfig = DefaultConfig;
