/**
 * Created by Connor on 12/5/2015.
 */
Template.searchBar.events({
    'keyup #searchBar': lodash.debounce(function (e) {
        e.stopImmediatePropagation();

        Session.set('searchKey', $('#searchBar').val().trim())
    }, 500)
});

Template.searchBar.created = function () {
    var self = this;

    self.autorun(function () {
        if(Session.get('searchKey'))
        self.subscribe('searchStocks', {searchKey: Session.get('searchKey')})
    })
};
