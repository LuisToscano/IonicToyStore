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
                $scope.curToy = {};
                
                $scope.toyListEmpty = function () {
                    return $scope.toys.length === 0;
                };
                $scope.commentListEmpty = function (toy) {
                    return toy.comments.length === 0;
                };
                $scope.toggleInfoVisible = function (toy) {
                    $toys.toggleInfo(toy);
                };
                $scope.toggleCommentsVisible = function (toy) {
                    if (toy.comments.length > 0) {
                        $toys.toggleComments(toy);
                    }
                };

                $scope.newToy = new modalForm($ionicModal, $scope, "modals/new-toy.html");
                $scope.editToy = new modalForm($ionicModal, $scope, "modals/edit-toy.html");
                $scope.newComment = new modalForm($ionicModal, $scope, "modals/edit-toy.html");
                
                $scope.addToy = function (valid) {
                    $scope.newToy.submitted = true;
                    if (valid)
                    {
                        $toys.addToy($scope.newToy.val);
                        $scope.newToy.close();
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
                
                $scope.openComment = function (toy){
                    $scope.curToy = toy;
                    $scope.newComment.open();
                };
                $scope.addComment = function (valid) {
                    $scope.newComment.submitted = true;
                    if (valid)
                    {
                        $toys.addComment($scope.curToy, $scope.newComment.val);
                        $scope.curToy = {};
                        $scope.newComment.close();
                    }
                };
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

function modalForm($ionicModal, $scope, url) {

    this.submitted = false;
    this.val = {};
    var that = this;

    $ionicModal.fromTemplateUrl(url, function (modal) {
        that.modal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    this.open = function () {
        this.modal.show();
    };

    this.close = function () {
        this.modal.hide();
        this.val = {};
        this.submitted = false;
    };
}

