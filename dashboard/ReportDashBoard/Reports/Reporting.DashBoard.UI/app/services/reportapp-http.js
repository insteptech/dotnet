
(function () {
    'use strict';

    var serviceId = '$reportappHttp';
    angular.module('app').factory(serviceId, [ '$rootScope', '$utils', '$http', $reportappHttp]);

    function $reportappHttp( $rootScope, $utils, $http) {
        var factory = {};

        factory.getSearhCriteria = function () {

            var url = $utils.toFullUrl("/Api/Report/GetSearchCriteria");

            return $http.post(url);
        };

        factory.GetSearchResult = function (reportFilter) {

            var url = $utils.toFullUrl("/Api/Report/GetSearchResult");

            return $http.post(url,
                 reportFilter
            );
        };

        return factory;
    }
})();