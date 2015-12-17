/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('store', ['ionic'])
            .directive("toyContainer", function () {
                return {
                    restrict: "A",
                    templateUrl: "directives/toy.html"
                };
            })

            .controller("toyController", function ($toys, $scope, $ionicModal, $ionicPopup) {
                $scope.toys = $toys.list;
                $scope.search = "";
                $scope.newtoy = {};
                $scope.newcomment = {};
                $scope.curToy = {};

                $scope.toySubmitted = false;

                $scope.toyListEmpty = function () {
                    return $scope.toys.length === 0;
                };

                $scope.commentListEmpty = function (toy) {
                    return toy.comments.length === 0;
                };

                $scope.addToy = function (valid) {
                    $scope.toySubmitted = true;
                     if(valid)
                     {
                        $toys.addToy($scope.newtoy);
                        $scope.newtoy = {};
                        $scope.toyModal.hide();
                        $scope.toySubmitted = false;
                     }
                };

                $scope.deleteToy = function (toy) {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Borrar juguete',
                        template: 'Realmente quieres borrar "' + toy.name + '"?'
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            $toys.deleteToy(toy);
                        }
                    });
                };

                $scope.addComment = function () {
                    $toys.addComment($scope.curToy, $scope.newcomment);
                    $scope.newcomment = {};
                    $scope.curToy = {};
                    $scope.commentModal.hide();
                };

                $scope.toggleInfoVisible = function (toy) {
                    $toys.toggleInfo(toy);
                };

                $scope.toggleCommentsVisible = function (toy) {
                    if (toy.comments.length > 0) {
                        $toys.toggleComments(toy);
                    }
                };

                //<editor-fold defaultstate="collapsed" desc="MODALS">

                //NUEVO JUGUETE
                $ionicModal.fromTemplateUrl('new-toy.html', function (modal) {
                    $scope.toyModal = modal;
                }, {
                    scope: $scope,
                    animation: 'slide-in-up'
                });

                $scope.openNewToy = function () {
                    $scope.toyModal.show();
                };

                $scope.closeNewToy = function () {
                    $scope.toyModal.hide();
                    $scope.newtoy = {};
                    $scope.toySubmitted = false;
                };

                //NUEVO COMENTARIO
                $ionicModal.fromTemplateUrl('new-comment.html', function (modal) {
                    $scope.commentModal = modal;
                }, {
                    scope: $scope,
                    animation: 'slide-in-up'
                });

                $scope.openNewComment = function (toy) {
                    $scope.curToy = toy;
                    console.log($scope.curToy);
                    $scope.commentModal.show();
                };

                $scope.closeNewComment = function () {
                    $scope.commentModal.hide();
                    $scope.curToy = {};
                };
                //</editor-fold>


            })

            .service("$toys", function () {
                this.list = window.localStorage['toys'] ? angular.fromJson(window.localStorage['toys']) : [];

                this.addToy = function (newtoy) {
                    this.list.push({
                        name: newtoy.name,
                        description: newtoy.description,
                        comments: [],
                        info_visible: false,
                        comments_visible: false
                    });
                    window.localStorage['toys'] = angular.toJson(this.list);
                };

                this.deleteToy = function (toy) {
                    var index = this.list.indexOf(toy);
                    if (index >= 0) {
                        this.list.splice(index, 1);
                        window.localStorage['toys'] = angular.toJson(this.list);
                    } else {
                        console.error("Object does not exist.");
                        console.log(toy);
                    }
                };


                this.addComment = function (toy, comment) {
                    toy.comments.push({
                        author: comment.author,
                        body: comment.body
                    });
                    window.localStorage['toys'] = angular.toJson(this.list);
                };

                this.toggleInfo = function (toy) {
                    toy.info_visible = !toy.info_visible;
                    window.localStorage['toys'] = angular.toJson(this.list);
                };

                this.toggleComments = function (toy) {
                    toy.comments_visible = !toy.comments_visible;
                    window.localStorage['toys'] = angular.toJson(this.list);
                };
            });
    ;
})();

