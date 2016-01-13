'use strict';

/**
 * ServerNotificationService Factory
 * @namespace Factories
 */
(function () {
    angular
        .module('nmsdemoApp')
        .factory('serverNotificationService', serverNotificationService);

    serverNotificationService.$inject = ['logger', '$timeout', '$interval'];

    /**
     * @namespace Logger
     * @desc Application wide logger
     * @memberOf Factories
     */
    function serverNotificationService(logger, $timeout, $interval) {
        var service = {
            connect: connect,
            sendJSON: sendJSON,
            sendMessage: sendMessage
        };
        return service;

        var ws /*= new WebSocket("")*/;
        var ws_state = 0; //0: not connected, 1: connected, 2: trying to connect

        
        ////////////

        /**
         * @name connect
         * @desc Connect to server websocket.
         * @param {String} addr websocket address (like: "ws://localhost/echo").
         * @param {String} heartbeat Heartbeat message interval in ms.
         * @returns {Boolean}
         * @memberOf Factories.ServerNotificationService
         */
        function connect(addr, heartbeat) {
            if (connectOnce(addr, heartbeat)) {
                return true;
            }else{
                $timeout(function(){
                    connect(addr, heartbeat);
                }, 3000);
                return false;
            }
        };
        function connectOnce(addr, heartbeat) {
            try {
                logger.log("Try to connect to websocket: " + addr);
                ws_state=2;
                ws = new WebSocket(addr);
                logger.log("Connected: " + addr);

                ws.onopen = function () {
                    logger.log("ws onopen!");
                    ws_state = 1;
                };
                logger.log("1");

                ws.onclose = function () {
                    logger.log("ws onclose.");
                    
                    if(ws_state!=2){
                        ws_state = 2;
                        $timeout(function () {
                        logger.log("Reconnect to websocket.");
                        connect(addr, heartbeat);
                    }, 3000);
                    }
                };
                logger.log("2");
                ws.onerror = function (event) {
                    logger.log("onerror: " + event);
                    
                    if(ws_state!=2){
                        ws_state = 2;
                        $timeout(function () {
                        logger.log("Reconnect to websocket.");
                        connect(addr, heartbeat);
                    }, 3000);
                    }
                };
                logger.log("3");

                ws.onmessage = function (event) {
                    logger.log("onmessage: " + event.data);
                    //ws.send(message.data);
                };
                
                logger.log("4");

                $interval(function () {
                    if (ws_state==1) sendMessage("heartbeat: " + (new Date().toString()));
                }, heartbeat);
                return true;
            } catch (e) {
                logger.log("5");
                logger.error("Exception: "+e.message);
                return false;
            }
        };

        function sendJSON(obj) {
            if (ws_state!=1) {
                return false;
            }
            ws.send(JSON.stringify(obj));
            return true;
        }
        function sendMessage(str) {
            if (ws_state!=1) {
                return false;
            }
            ws.send(str);
            return true;
        }
    }
})();