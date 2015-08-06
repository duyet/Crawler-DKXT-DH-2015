'use strict';

angular.module('mongoWebQueryApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $scope.page = 0;
    $scope.perpage = 200;

    $scope.search = function() {
      if($scope.keyword === '') {
        return;
      }

      $scope.loading = true;
      $http.post('/api/query', { keyword: $scope.keyword, page: $scope.page, perpage: $scope.perpage }).success(function(data) {
          $scope.data = data;
          $scope.loading = false;
      });
    };
    $scope.search();

    $scope.nextPage = function() {
      $scope.page = $scope.page + $scope.perpage;
      $scope.search();
    }

    $scope.prePage = function() {
      if ($scope.page - $scope.perpage < 0) {
        alert('You cannot!');
        return;
      }

      $scope.page = $scope.page - $scope.perpage;
      $scope.search();
    }

    $scope.export = function(item) {
      
    };
  });
