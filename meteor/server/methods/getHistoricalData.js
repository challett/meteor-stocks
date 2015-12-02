/**
 * Created by Connor on 12/1/2015.
 */
Meteor.methods({
    'getHistoricalData': function (params) {
        //lodash.each(YahooFinance.historical({symbols:[params.symbol], from:moment().subtract(6,"months").format('YYYY-MM-DD'), to:moment().format('YYYY-MM-DD')})[params.symbol], function (item) {
        //    Stocks.update({symbol: item.symbol}, {$addToSet: {historical: {date: moment(item.date).format("DD-MMM-YY"), price:item.close}}})
        //})
        return YahooFinance.historical({symbols:[params.symbol], from:moment().subtract(6,"months").format('YYYY-MM-DD'), to:moment().format('YYYY-MM-DD')})[params.symbol]
    }
});