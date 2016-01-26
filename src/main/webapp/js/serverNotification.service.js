'use strict';

/**
 * ServerNotificationService Factory
 * @namespace Factories
 */
(function () {
    angular
        .module('nmsdemoApp')
        .factory('serverNotificationService', serverNotificationService);

    serverNotificationService.$inject = ['logger', '$rootScope', '$window'];

    /**
     * @namespace Logger
     * @desc Application wide logger
     * @memberOf Factories
     */
    function serverNotificationService(logger, $rootScope, $window) {

        var ws_listeners = [];
        var worker = new Worker("js/ws_worker.js");
        var event_buffer = [];
        var scrollBusy=false;
        var lastScrollMS=0;
        var scrollIdleFactorMS=500;
        logger.log("worker created.");


        angular.element($window).bind("scroll", function () {
            lastScrollMS=(new Date()).getTime();
            scrollBusy=true;
        });
        worker.onmessage = function (evt) {
            //logger.log(evt.data);
            event_buffer.push(evt.data);
            
        }

        setInterval(function () {
            if(scrollBusy && (new Date()).getTime()-lastScrollMS>scrollIdleFactorMS){
                scrollBusy=false;
            }
            if (0 < event_buffer.length && !scrollBusy) {
                $rootScope.$apply(function () {
                    for (var i = 0; i < ws_listeners.length; i++) {
                        ws_listeners[i](event_buffer.shift());
                    }
                });
            }
        }, 10);

        return {
            addListener: addListener,
            removeListener: removeListener,
            connect: connect,
            sendJSON: sendJSON,
            sendMessage: sendMessage
        };

        function addListener(fun) {
            ws_listeners.push(fun);
        }
        function removeListener(fun) {
            for (var i = 0; i < ws_listeners.length; i++) {
                if (ws_listeners[i] == fun) {
                    ws_listeners.splice(i, 1);
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