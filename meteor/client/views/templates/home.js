/**
 * Created by Connor on 10/30/2015.
 */

Template.home.helpers({
    portfolioStock: function () {
        var portfolioSymbols = Portfolio.find().map(function (stock) {
            return stock.symbol
        });
        return Stocks.find({symbol: {$in: portfolioSymbols}})
    },
    searched: function () {
        return Session.get('searchKey')
    },
    name: function () {
        var stock = this;
        return stock && stock.name;
    },
    open: function () {
        var stock = this ;
        return stock && stock.open;
    },
    daysLow: function () {
        var stock = this;
        return stock && stock.daysLow && stock.daysLow.toFixed(2);
    },
    daysHigh: function () {
        var stock = this;
        return stock && stock.daysHigh && stock.daysHigh.toFixed(2);
    },
    stockExchange: function () {
        var stock = this;
        return stock && stock.stockExchange;
    },
    earningsPerShare: function () {
        var stock = this;
        return stock && stock.earningsPerShare && stock.earningsPerShare.toFixed(2);
    },
    previousClose: function () {
        var stock = this;
        return stock && stock.previousClose && stock.previousClose.toFixed(2);
    },
    peRatio: function () {
        var stock = this;
        return stock && stock.peRatio && stock.peRatio.toFixed(2);
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