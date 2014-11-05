//'use strict';

///* Services To Call Server Side Methods*/
//angular.module('reportapp.Http', [])

//.factory('$reportappHttp', ['$resource', '$rootScope', '$utils', '$http', function ($resource, $rootScope, $utils, $http) {

//    var factory = {};

//    factory.getSearhCriteria = function () {
     
//        var url = $utils.toFullUrl("/Api/Report/GetSearchCriteria");

//        return $http.post(url);
//    };

//    factory.GetSearchResult = function (reportFilter) {

//        var url = $utils.toFullUrl("/Api/Report/GetSearchResult");

//        return $http.post(url,
//             reportFilter
//        );
//    };

//    return factory;

//}]);
(function () {
    'use strict';

    var serviceId = '$reportappHttp';
    angular.module('app').factory(serviceId, ['$resource', '$rootScope', '$utils', '$http', $reportappHttp]);

    function $reportappHttp($resource, $rootScope, $utils, $http) {
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