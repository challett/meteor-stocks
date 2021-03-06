/**
 * Created by Connor on 12/5/2015.
 */
Template.searchBar.events({
    'keyup #searchBar': lodash.debounce(function (e) {
        e.stopImmediatePropagation();

        Session.set('searchKey', $('#searchBar').val().trim())
    }, 500)
    ,
    'click .remove-search': function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Session.set('searchKey', '')
    }
});

Template.searchBar.helpers({
    'searchKey': function () {
        return Session.get('searchKey')
    }
});

Template.searchBar.created = function () {

};
