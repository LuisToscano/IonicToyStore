/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){
    angular.module('store', ['ionic'])
            .directive("toyContainer", function(){
                return {
                  restrict: "A",
                  templateUrl: "directives/toy.html"
                };
            })
            
            .controller("toyController", function($toys, $scope, $ionicModal){
                $scope.toys = $toys.list;
                $scope.search = "";
                $scope.newtoy = {};
                $scope.newcomment = {};
                $scope.curToy = {};
        
                $scope.toyListEmpty = function(){
                    return $scope.toys.length === 0;
                };
                
                $scope.commentListEmpty = function(toy){
                    return toy.comments.length === 0;
                };
                
                $scope.openNewToy = function () {
                    $scope.toyModal.show();
                };

                $scope.closeNewToy = function () {
                    $scope.toyModal.hide();
                };
                
                $scope.addToy = function(){
                    $toys.addToy($scope.newtoy);
                    $scope.newtoy = {};
                    $scope.toyModal.hide();
                };
                
                $scope.openNewComment = function (toy) {
                    $scope.curToy = toy;
                    console.log($scope.curToy);
                    $scope.commentModal.show();
                };

                // Close the new task modal
                $scope.closeNewComment = function () {
                    $scope.commentModal.hide();
                    $scope.curToy = {};
                };
                
                $scope.addComment = function(){
                    $toys.addComment($scope.curToy, $scope.newcomment);
                    $scope.newcomment = {};
                    $scope.curToy = {};
                    $scope.commentModal.hide();
                };
                
                $scope.toggleInfoVisible = function(toy){
                    $toys.toggleInfo(toy);
                };
                
                $scope.toggleCommentsVisible = function(toy){
                    if(toy.comments.length>0){
                        $toys.toggleComments(toy);
                    }
                };

                $ionicModal.fromTemplateUrl('new-toy.html', function (modal) {
                    $scope.toyModal = modal;
                }, {
                    scope: $scope,
                    animation: 'slide-in-up'
                });
                
                $ionicModal.fromTemplateUrl('new-comment.html', function (modal) {
                    $scope.commentModal = modal;
                }, {
                    scope: $scope,
                    animation: 'slide-in-up'
                });
            })
            
            .service("$toys", function(){
                this.list = window.localStorage['toys'] ? angular.fromJson(window.localStorage['toys']) : [];
        
                this.addToy = function(newtoy){
                    this.list.push({
                        name : newtoy.name,
                        description : newtoy.description,
                        comments : [],
                        info_visible : false,
                        comments_visible : false
                    });
                    window.localStorage['toys'] = angular.toJson(this.list);
                };
                
                this.addComment = function(toy, comment){
                    toy.comments.push({
                        author: comment.author,
                        body: comment.body
                    });
                    window.localStorage['toys'] = angular.toJson(this.list);
                };
                
                this.toggleInfo = function(toy){
                  toy.info_visible = !toy.info_visible;
                  window.localStorage['toys'] = angular.toJson(this.list);
                };
                
                this.toggleComments = function(toy){
                  toy.comments_visible = !toy.comments_visible;
                  window.localStorage['toys'] = angular.toJson(this.list);
                };
            });
    ;
})();

