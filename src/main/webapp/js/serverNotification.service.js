'use strict';

/**
 * ServerNotificationService Factory
 * @namespace Factories
 */
(function () {
    angular
        .module('nmsdemoApp')
        .factory('serverNotificationService', serverNotificationService);

    serverNotificationService.$inject = ['logger', '$rootScope', '$window', '$interval', 'commonUtil'];

    /**
     * @namespace Logger
     * @desc Application wide logger
     * @memberOf Factories
     */
    function serverNotificationService(logger, $rootScope, $window, $interval, commonUtil) {

        /*
        listener: {filter:function(),fun:function()}
        */
        var ws_listeners = [];
        var worker = new Worker("js/ws_worker.js");
        var event_buffer = [];
        var scrollBusy = false;
        var lastScrollMS = 0;
        var scrollIdleFactorMS = 500;
        logger.log("worker created.");


        angular.element($window).bind("scroll", function () {
            lastScrollMS = (new Date()).getTime();
            scrollBusy = true;
        });
        worker.onmessage = function (evt) {
            event_buffer.push(evt.data);
            //logger.log((new Date()).toString()+" event_buffer.length: "+event_buffer.length);
            
        }

        setInterval(function () {
            if (scrollBusy && (new Date()).getTime() - lastScrollMS > scrollIdleFactorMS) {
                scrollBusy = false;
            }
            if (!scrollBusy && 0 < event_buffer.length) {
                var ev = event_buffer.shift();
                for (var i = 0; i < ws_listeners.length; i++) {
                    var listener = ws_listeners[i];
                    if (null == listener.filter || listener.filter(ev)) {
                        listener.fun(ev);
                    }

                }
            }
        }, 10);

        return {
            addListener: addListener,
            removeListener: removeListener,
            connect: connect,
            sendJSON: sendJSON,
            sendMessage: sendMessage
        };

        function addListener(listener) {
            ws_listeners.push(listener);
            logger.log("After addListener: "+listener.name+", ws_listeners.length: " + ws_listeners.length);
        }
        function removeListener(listener) {
            for (var i = 0; i < ws_listeners.length; i++) {
                if (ws_listeners[i] == listener) {
                    ws_listeners.splice(i, 1);
                    logger.log("After removeListener: "+listener.name+", ws_listeners.length: " + ws_listeners.length);
                    return;
                }
            }
        }
        ////////////

        /**
         * @name connect
         * @desc Connect to server websocket.
         * @param {String} addr websocket address (like: "ws://localhost/echo").
         * @param {String} heartbeat Heartbeat message interval in ms.
         * @returns {Boolean}
         * @memberOf Factories.ServerNotificationService
         */
        function connect(_addr, _heartbeat) {
            worker.postMessage({ cmd: 'connect', addr: _addr, heartbeat: _heartbeat });
        };

        function sendJSON(_obj) {
            worker.postMessage({ cmd: 'sendJSON', obj: _obj });
        }
        function sendMessage(_str) {
            worker.postMessage({ cmd: 'sendMessage', str: _str });
        }

    }
})();