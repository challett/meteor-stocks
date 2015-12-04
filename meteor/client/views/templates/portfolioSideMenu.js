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
                /**
                *These are options that we do NOT want in our side bar.
                */
                
                '_id',
                'ask',
                'bid',
                'changeAndPercentChange',
                'previousClose',
                'lastTradeDate',
                'lastTradeTime',
                'lastTradeWithTime',
                'lastTradePriceOnly',
                '1YrTargetPrice',
                'changeFrom200DayMoving',
                '50DayMovingAverage',
                '200DayMovingAverage',
                'daysRange',
                '52WeekHigh',
                '52WeekLow',
                'changeFrom52WeekLow',
                'changeFrom52WeekHigh',
                'changeFrom50DayMovingAverage',
                'changeFrom200DayMovingAverage',
                'percentChangeFrom52WeekLow',
                'percentChangeFrom52WeekHigh',
                'percentChangeFrom200DayMovingAverage',
                'percentChangeFrom50DayMovingAverage',
                'percebtChangeFrom52WeekHigh',
                '52WeekRange',
                'marketCapitalization',
                'volume',
                'averageDailyVolume',
                'epsEstimateCurrentYear',
                'epsEstimateNextQuarter',
                'bookValue',
                'ebitda',
                'pricePerSales',
                'pricePerBook',
                'pricePerEpsEstimateCurrentYear',
                'pricePerEpsEstimateNextYear',
                'shortRatio',
                'pegRatio',
                'epsEstimateNextYear',
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