/**
 * Created by Connor on 10/30/2015.
 */

Template.home.helpers({
    portfolioStock: function () {
        var searchKey = Session.get('searchKey').toUpperCase();
        var searchRegex = '^'+searchKey+'.*';
        var portfolioSymbols = Portfolio.find().map(function (stock) {
            return stock.symbol
        });
        return Stocks.find({$and: [
            {symbol: {$in: portfolioSymbols}},
            {symbol: {$regex: searchRegex}}
        ]})
    },
    searched: function () {
        return Session.get('searchKey')
    },
    stockNumber: function (key) {
        return this && this[key] && this[key].toFixed(2)
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
    showElement: function (element) {
        return Preferences.findOne({name: element}).showPortfolio;
    }

});

Template.home.rendered = function () {
    Meteor.call('getQuotes', {symbols:  Portfolio.find().map( function (object) {
        return object.symbol
    }), fields: Fields});
};

Template.home.events({
    'click .remove-button': function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();

        Portfolio.remove({symbol: this.symbol})
    },
    'click .add-button': function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();

        Portfolio.insert({symbol: this.symbol})
    }
});

Template.home.created = function () {
    Session.set('searchKey', '')
};