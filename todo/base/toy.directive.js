/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    angular.module('store').directive("toyContainer", function () {
        return {
            restrict: "A",
            templateUrl: "directives/toy.html"
        };
    });
})();