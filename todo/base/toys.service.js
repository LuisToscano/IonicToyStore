/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('store').service("$toys", toysService);
    function toysService() {
        this.list = window.localStorage['toys'] ? angular.fromJson(window.localStorage['toys']) : [];
        this.addToy = addT;
        this.deleteToy = deleT;
        this.addComment = addC;
        this.toggleInfo = toggleI;
        this.toggleComments = toggleC;
        
        function addT(newtoy) {
            this.list.push({
                name: newtoy.name,
                description: newtoy.description,
                comments: [],
                info_visible: false,
                comments_visible: false
            });
            window.localStorage['toys'] = angular.toJson(this.list);
        };
        function deleT(toy) {
            var index = this.list.indexOf(toy);
            if (index >= 0) {
                this.list.splice(index, 1);
                window.localStorage['toys'] = angular.toJson(this.list);
            } else {
                console.error("Object does not exist.");
                console.log(toy);
            }
        };
        function addC(toy, comment) {
            toy.comments.push({
                author: comment.author,
                body: comment.body
            });
            window.localStorage['toys'] = angular.toJson(this.list);
        };
        function toggleI(toy) {
            toy.info_visible = !toy.info_visible;
            window.localStorage['toys'] = angular.toJson(this.list);
        };
        function toggleC(toy) {
            toy.comments_visible = !toy.comments_visible;
            window.localStorage['toys'] = angular.toJson(this.list);
        };
    };
})();