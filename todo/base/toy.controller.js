/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('store').controller("toyController", toyController);
    toyController.$inject = ['$toys', '$ionicModal', '$ionicPopup', '$scope'];
    function toyController($toys, $ionicModal, $ionicPopup, $scope) {

        var vm = this;
        vm.toys = $toys.list;
        vm.search = "";
        vm.curToy = {};
        vm.newToy = new modalForm($ionicModal, $scope, "modals/new-toy.html");
        vm.editToy = new modalForm($ionicModal, $scope, "modals/edit-toy.html");
        vm.newComment = new modalForm($ionicModal, $scope, "modals/edit-toy.html");
        vm.toyListEmpty = toysEmpty;
        vm.commentListEmpty = commentsEmpty;
        vm.toggleInfoVisible = toggleInfo;
        vm.toggleCommentsVisible = toggleComments;
        vm.addToy = add;
        vm.deleteToy = deleToy;
        vm.openComment = openCmnt;
        vm.addComment = addCmnt;

        /**
         * Check if vm.toys is empty;
         * @return {Boolean} true if vm.toys is empty. Otherwise, false.
         */
        function toysEmpty() {
            return vm.toys.length === 0;
        };
        /**
         * Check if a toy's comment list is empty;
         * @param {Object} toy
         * @return {Boolean} true if the 'comments' attribute list of the provided toy is empty. Otherwise, false.
         */
        function commentsEmpty(toy) {
            return toy.comments.length === 0;
        };
        /**
         * Calls 'toggleInfo' method on the toys service.
         * @param {Object} toy
         * @return {none}
         */
        function toggleInfo(toy) {
            $toys.toggleInfo(toy);
        };
        /**
         * Calls 'toggleComments' method on the toys service if there are any comments
         * in the provided toy's 'comments' attribute.
         * @param {Object} toy
         * @return {none} 
         */
        function toggleComments(toy) {
            if (toy.comments.length > 0) {
                $toys.toggleComments(toy);
            }
        };
        function add(valid) {
            vm.newToy.submitted = true;
            if (valid)
            {
                $toys.addToy(vm.newToy.val);
                vm.newToy.close();
            }
        };
        function deleToy(toy) {
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
        function openCmnt(toy) {
            vm.curToy = toy;
            vm.newComment.open();
        };
        function addCmnt(valid) {
            vm.newComment.submitted = true;
            if (valid)
            {
                $toys.addComment(vm.curToy, vm.newComment.val);
                vm.curToy = {};
                vm.newComment.close();
            }
        };
    }
})();
