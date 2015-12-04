/**
 * Created by Connor on 10/30/2015.
 */

Template.home.helpers({
    items: function () {
        return Stocks.find()
    },
    price: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.lastTradePriceOnly;
    },
    change: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.change;
    },
    name: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.name;
    },
    changeStyle: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        if (stock) {
            var change = stock.change;
            if (change > 0){
                return 'button-balanced'
            } else if (change < 0) {
                return 'button-assertive'
            } else {
                return "button-calm"
            }
        }
    },
    changeColor: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        if (stock) {
            var change = stock.change;
            if (change > 0){
                return '#2ec76f'
            } else if (change < 0) {
                return '#d22d2d'
            } else {
                return "#3f5973"
            }
        }
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
    }
});