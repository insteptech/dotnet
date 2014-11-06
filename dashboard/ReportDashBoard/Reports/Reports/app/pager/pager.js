(function () {
    'use strict';
    var controllerId = 'PagePagination';
    angular.module('app').controller(controllerId, ['$scope', '$rootScope', , PagePagination]);

    function PagePagination($scope, $rootScope) {
        init();

        function init() {
            $rootScope.pager = [];
            $rootScope.pager.maxSize = 5;
            $rootScope.pager.totalItems = 0;
            $rootScope.pager.currentPage = 1;
            $rootScope.pager.pageSize = 10;
            $rootScope.pager.pageSizeValues = [5, 10, 15, 20, 50, 100];
            $rootScope.pager.pagerContext = "";
            $rootScope.pager.showPager = false;

            $scope.onSelectPage = function (page) {

                $rootScope.pager.currentPage = Math.ceil(page);
                if ($rootScope.pager.currentPage < 1 || $rootScope.pager.currentPage > Math.ceil($rootScope.pager.totalItems / $rootScope.pager.pageSize)) {
                    return;
                }
                var pagingData = $scope.readPagingData();
                //Broad Cast to PageOrderController Pass Paging Data
                $rootScope.$broadcast('PagerSelectPage', pagingData);
            };

            $scope.onSelectPageSize = function () {
                $rootScope.pager.totalItems = 0;
                $rootScope.pager.currentPage = 1;

                var pagingData = $scope.readPagingData();

                $rootScope.$broadcast('PagerSelectPage', pagingData);
            };

            $scope.readPagingData = function () {
                var pagingData = {
                    "TotalItems": $rootScope.pager.totalItems,
                    "Page": $rootScope.pager.currentPage,
                    "PageSize": $rootScope.pager.pageSize
                };
                return pagingData;
            };

            $scope.$on('PagerResetData', function (event) {
                $rootScope.pager.totalItems = 0;
                $rootScope.pager.currentPage = 0;
                $rootScope.pager.showPager = false;
            });

            $scope.$on('PagerSetData', function (event, data) {
                if (data.Page == 1) {
                    $rootScope.pager.totalItems = data.TotalItems;
                    $rootScope.pager.currentPage = data.Page;
                    $rootScope.pager.pageSize = data.PageSize;
                    $rootScope.pager.showPager = ($rootScope.pager.totalItems > 0);
                }
            });

            $scope.initPager = function () {
                //BroadCast the parent controller when the Pagination control is initialized             
                var data = $scope.readPagingData();
                $rootScope.$broadcast('PagerInitialized', data);
            };
        }
    }
})();