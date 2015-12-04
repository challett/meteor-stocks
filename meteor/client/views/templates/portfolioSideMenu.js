/**
 * Created by Connor on 11/26/2015.
 */
Template.portfolioSideMenu.events({
    'click .item-checkbox': function (event) {
        console.log(this)
    }
});

Template.portfolioSideMenu.helpers({
    'stockInfo': function () {
        var stock = Stocks.findOne();
        return lodash.keys(stock);
    },
    'weHaveData': function (key) {
        var stock = Stocks.findOne(),
            exclude = [
                '_id'
            ];
        return stock[key] && lodash.indexOf(exclude, key) === -1
    },
    'checked': function (key) {
        return Session.equals(key , true)
    },
    preference: function () {
        return Preferences.find();
    },

});