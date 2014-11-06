(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common','$scope','$filter', '$location', '$rootScope', '$utils', '$reportappHttp', '$http', '$q', '$sanitize', dashboard]);

    function dashboard(common, $scope, $filter, $location, $rootScope, $utils, $reportappHttp, $http, $q, $sanitize) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Report Dashboard',
            description: 'Welcome to reporting engine.'
        };
        vm.messageCount = 0;
        vm.title = 'Dashboard';
       
       
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };


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
                $scope.report.noRecordShow = false;
                $scope.report.showRecord = false;
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

        $scope.yearChange = function (value) {
            $scope.pageError = "";
            $scope.report.defaultYear = value
            $scope.report.filterData.yearId = $scope.report.defaultYear.Value;
        };

        $scope.categoryChange = function (value) {
            $scope.pageError = "";
            $scope.report.defaultCategory = value;
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
                            $scope.search();
                        }
                        else {
                            $scope.pageError = result.Message;
                            toggleSpinner(false);
                        }

                    }).error(function (data, status, headers, config) {
                        $scope.pageError = status;
                        toggleSpinner(false);
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
            toggleSpinner(true);
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
                        toggleSpinner(false);
                    }).error(function (data, status, headers, config) {
                        $scope.pageError = status;
                    });
            }
            catch (ex) {
                toggleSpinner(false);
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

       
        function activate() {
            var promises = [init()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }    

        function toggleSpinner(on) { vm.isBusy = on; }
    }
})();