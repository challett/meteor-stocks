/**
 * Created by Connor on 12/6/2015.
 */
Template.searchResults.rendered = function () {

};

Template.searchResults.helpers({
    'searchResult': function () {
        var searchKey = Session.get('searchKey').toUpperCase();
        var searchRegex = '^'+searchKey+'.*';
        var sort = Preferences.findOne({name: 'sort'}).sort;
        var sortOptions = {};
        sortOptions[sort] = sort === 'lastTradePriceOnly' ? -1 : 1;
        Meteor.call('getQuotes', {symbols:  Stocks.find().map( function (object) {
            return object.symbol
        }), fields: Fields})
        return Stocks.find({symbol: {$regex: searchRegex}, lastTradePriceOnly: {$ne: null}, symbol: {$not: {$in: Portfolio.find().map(function (stock) {return stock.symbol})}}}, {limit: 5, sort: sortOptions})
    },
    searched: function () {
        return Session.get('searchKey')
    },
    changeStyle: function () {
        var stock = this;
        if (stock && stock.change) {
            var change = stock.change;
            if (change > 0) {
                return 'button-balanced'
            } else if (change < 0) {
                return 'button-assertive'
            } else {
                return "button-calm"
            }
        }
    },
    changeColor: function () {
        var stock = this;
        if (stock) {
            var change = stock.change;
            if (change > 0) {
                return '#2ec76f'
            } else if (change < 0) {
                return '#d22d2d'
            } else {
                return "#3f5973"
            }
        }
    },
    stockNumber: function (key) {
        return this && this[key] && this[key].toFixed(2)
    },
    showElement: function (element) {
        return Preferences.findOne({name: element}).showPortfolio;
    }
});