/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function modalForm($ionicModal, $scope, url) {

    this.submitted = false;
    this.val = {};
    var that = this;
    this.open = openM;
    this.close = closeM;

    $ionicModal.fromTemplateUrl(url, function (modal) {
        that.modal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    function openM() {
        this.modal.show();
    };
    function closeM() {
        this.modal.hide();
        this.val = {};
        this.submitted = false;
    };
}