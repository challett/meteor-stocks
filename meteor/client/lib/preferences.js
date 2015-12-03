/**
 * Created by Connor on 12/2/2015.
 */
Preferences = new Ground.Collection('preferences', {connection: null});

PreferencesSchema = new SimpleSchema({
    name: {
        type: String
    },
    showPortfolio: {
        type: Boolean,
        autoform: {
            type: 'boolean-checkbox'
        }
    }
});
Meteor.startup(function () {
    if (Preferences.find().count() === 0){
        var fields = ["symbol", "ask", "bid", "askRealtime", "bidRealtime", "previousClose", "open", "dividendYield", "dividendPerShare", "dividendPayDate", "exDividendDate", "change", "changeAndPercentChange", "changeRealtime", "changePercentRealtime", "changeInPercent", "lastTradeDate", "tradeDate", "lastTradeTime", "afterHoursChangeRealtime", "commission", "daysLow", "daysHigh", "lastTradeRealtimeWithTime", "lastTradeWithTime", "lastTradePriceOnly", "1YrTargetPrice", "changeFrom200DayMovingAverage", "percentChangeFrom200DayMovingAverage", "changeFrom50DayMovingAverage", "percentChangeFrom50DayMovingAverage", "50DayMovingAverage", "200DayMovingAverage", "daysValueChange", "daysValueChangeRealtime", "pricePaid", "daysRange", "daysRangeRealtime", "holdingsGainPercent", "annualizedGain", "holdingsGain", "holdingsGainPercentRealtime", "holdingsGainRealtime", "52WeekHigh", "52WeekLow", "changeFrom52WeekLow", "changeFrom52WeekHigh", "percentChangeFrom52WeekLow", "percebtChangeFrom52WeekHigh", "52WeekRange", "moreInfo", "marketCapitalization", "marketCapRealtime", "name", "notes", "sharesOwned", "stockExchange", "volume", "averageDailyVolume", "earningsPerShare", "epsEstimateCurrentYear", "epsEstimateNextYear", "epsEstimateNextQuarter", "bookValue", "ebitda", "pricePerSales", "pricePerBook", "peRatio", "peRatioRealtime", "pegRatio", "pricePerEpsEstimateCurrentYear", "pricePerEpsEstimateNextYear", "shortRatio", "tickerTrend", "orderBookRealtime", "highLimit", "lowLimit", "holdingsValue", "holdingsValueRealtime"];
        lodash.forEach(fields, function (value){
            Preferences.insert({
                name: value,
                showPortfolio: false
            })
        });
    }
    Preferences.attachSchema(PreferencesSchema);
});
