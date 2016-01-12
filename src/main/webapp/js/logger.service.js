'use strict';

/**
 * Logger Factory
 * @namespace Factories
 */
(function() {
  angular
      .module('nmsdemoApp')
      .factory('logger', logger);
      
      logger.$inject = ['$log'];

  /**
   * @namespace Logger
   * @desc Application wide logger
   * @memberOf Factories
   */
  function logger ($log) {
      var service = {
          error: error,
          log: log
      };
      return service;

      ////////////

      /**
       * @name error
       * @desc Logs errors
       * @param {String} msg Message to log
       * @returns {String}
       * @memberOf Factories.Logger
       */
      function error(msg) {
          var loggedMsg = 'Error: ' + msg;
          $log.error(loggedMsg);
          return loggedMsg;
      };
      
      /**
       * @name log
       * @desc Logs logs
       * @param {String} msg Message to log
       * @returns {String}
       * @memberOf Factories.Logger
       */
      function log(msg) {
          var loggedMsg = 'Log: ' + msg;
          $log.log(loggedMsg);
          return loggedMsg;
      };
  }
})();