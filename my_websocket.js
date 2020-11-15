var G_UXWEBSOCKET = undefined;
function uxwebSocket() {
    G_UXWEBSOCKET = this;
}
uxwebSocket.prototype.url = 'wss://127.0.0.1:3000';
uxwebSocket.prototype.socketObj = undefined;
uxwebSocket.prototype.socketState = {notbuilt: 0, built: 1, closing: 2, closed: 3};
uxwebSocket.prototype.callbackFunc = function () {};
uxwebSocket.prototype.initSocket = function (config) {
    if (!config) {
        return;
    }

    this.callbackFunc = config.callbackFunc;
    this.url = config.url || this.url;
    this.socketState = config.socketState || this.socketState;
    function socketGuard() {
        setTimeout(function () {
            if (!G_UXWEBSOCKET.socketObj) {
                console.log('it is time to build socket');
                G_UXWEBSOCKET.buildNewWebSocket();
                socketGuard();
            }
            else {
                socketGuard();
            }
        }, 5000);
    }
    socketGuard();
};
uxwebSocket.prototype.buildNewWebSocket = function () {
    if (typeof G_UXWEBSOCKET.url !== 'string') {
        return;
    }

    if (!G_UXWEBSOCKET.socketObj) {
        G_UXWEBSOCKET.socketObj = new WebSocket(this.url);
        G_UXWEBSOCKET.socketObj.onopen = function (e) {
            console.log(e);
        };
        G_UXWEBSOCKET.socketObj.onclose = function (e) {
            // console.log("onclose mesg",e);
            G_UXWEBSOCKET.socketObj = undefined;
        };
        G_UXWEBSOCKET.socketObj.onmessage = function (e) {
            // console.log("recieved mesg",e);
            if (G_UXWEBSOCKET.callbackFunc) {
                G_UXWEBSOCKET.callbackFunc(e);
            }

        };
        G_UXWEBSOCKET.socketObj.onerror = function (e) {
            console.log('onerror mesg', e);
            G_UXWEBSOCKET.socketObj.close();
            G_UXWEBSOCKET.socketObj = undefined;
        };
    }

};
uxwebSocket.prototype.sendData = function (data) {
    if (!G_UXWEBSOCKET.socketObj) {
        G_UXWEBSOCKET.buildNewWebSocket(G_UXWEBSOCKET.url);
    }

    if (G_UXWEBSOCKET.socketObj.readyState === G_UXWEBSOCKET.socketState.built) {
        (typeof data === 'string') && G_UXWEBSOCKET.socketObj.send(data);
    }
    else {
        setTimeout(function () {
            if (G_UXWEBSOCKET.socketObj.readyState === G_UXWEBSOCKET.socketState.built) {
                (typeof data === 'string') && G_UXWEBSOCKET.socketObj.send(data);
            }

        }, 1000);
    }
};
