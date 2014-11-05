(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext','$scope','$filter', '$location', '$rootScope', '$utils', '$reportappHttp', '$http', '$q', '$sanitize', dashboard]);

    function dashboard(common, datacontext, $scope, $filter, $location, $rootScope, $utils, $reportappHttp, $http, $q, $sanitize) {
        $scope.selectedYear = "Filter by Year";
        $scope.selectedCategory = "Filter by Category";

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Report Dashboard',
            description: 'Welcome to reporting engine.'
        };
        vm.messageCount = 0;
        vm.title = 'Dashboard';
        init();
        function init() {
            try {
                $scope.welcomeMessage = 'Welcome Test User';

                $scope.report = {};
                $scope.report.years = [];
                $scope.report.categories = [];
                $scope.report.variables = [];
                $scope.report.filterData = [];
                $scope.report.filterData.PagingData = []
                $scope.report.filterData.dtStartDate = "";
                $scope.report.filterData.projectID = "-1"
                $scope.report.filterData.userID = "-1";
                $scope.report.filterData.statusID = "-1"
                $scope.report.filterData.dtEndDate = "";
                $scope.report.filterData.PagingData.TotalItems = 0;
                $scope.report.filterData.PagingData.Page = 1;
                $scope.report.filterData.PagingData.PageSize = 10;
                $scope.reportFilter = {};

                $scope.$on('PagerInitialized', function (event, pageData) {
                    $scope.pageError = "";
                    $scope.report.filterData.PagingData = pageData;
                });

                $scope.$on('PagerSelectPage', function (event, pagingData) {
                    $scope.pageError = "";
                    $scope.report.filterData.PagingData = pagingData;
                    $scope.reportFilter.PagingData = $scope.report.filterData.PagingData;
                    getSearchResult();
                });

                getSearhCriteria();
            }
            catch (ex) {
            }
        }

        $scope.yearChange = function () {
            $scope.pageError = "";
            $scope.report.filterData.yearId = $scope.report.defaultYear.Value;
        };

        $scope.categoryChange = function () {
            $scope.pageError = "";
            $scope.report.filterData.categoryId = $scope.report.defaultCategory.Value;
        };

        $scope.search = function () {

            $scope.pageError = "";
            $scope.report.filterData.PagingData.TotalItems = 0;
            $scope.report.filterData.PagingData.Page = 1;
            getFilterData();
            getSearchResult();
        };

        function getSearhCriteria() {
            $scope.pageError = "";

            try {
                $reportappHttp.getSearhCriteria()
                    .success(function (result, status, headers, config) {
                        if (result.Success) {

                            $scope.report.years = $utils.fillResult(result.years, "- Select One -", "-1");
                            $scope.report.categories = $utils.fillResult(result.categories, "- Select One -", "-1");

                            $scope.report.defaultYear = $scope.report.years[0];
                            $scope.report.defaultCategory = $scope.report.categories[0];

                        }
                        else {
                            $scope.pageError = result.Message;
                        }

                    }).error(function (data, status, headers, config) {
                        $scope.pageError = status;
                    });
            }
            catch (ex) {

            }
            finally {

            }
        }

        function getSearchResult() {
            $scope.pageError = "";
            $scope.report.variables = {};

            try {
                $reportappHttp.GetSearchResult($scope.reportFilter)
                    .success(function (result, status, headers, config) {
                        if (result.Success) {

                            $scope.report.variables = result.Result;

                            if ($scope.report.variables.length > 0) {

                                $scope.report.noRecordShow = false;
                                $scope.report.showRecord = true;
                            }
                            else {

                                $scope.report.noRecordShow = true;
                                $scope.report.showRecord = false;
                            }
                        }
                        else {
                            $scope.pageError = result.Message;
                        }
                        //Broad Cast to Paging Controller to set Pager
                        $rootScope.$broadcast('PagerSetData', result.pagingData);

                    }).error(function (data, status, headers, config) {
                        $scope.pageError = status;
                    });
            }
            catch (ex) {

            }
            finally {

            }
        }

        function getFilterData() {
            var filterdata = {};
            filterdata.yearId = $scope.report.filterData.yearId == "-1" ? null : $scope.report.filterData.yearId;
            filterdata.categoryId = $scope.report.filterData.categoryId == "-1" ? null : $scope.report.filterData.categoryId;
            filterdata.pagingData = $scope.report.filterData.PagingData

            $scope.reportFilter = filterdata;
        }

        activate();

        $scope.years = getYearFilter();
        $scope.categories = getCategoryFilter();

        function activate() {
            var promises = [getMessageCount(), getPeople()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }

    }
})();