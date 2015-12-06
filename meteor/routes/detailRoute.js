/**
 * Created by Connor on 10/30/2015.
 */
/**
 * Created by Connor on 10/30/2015.
 */
DetailsController = RouteController.extend({
    template: 'detail',
    waitOn: function() {
    },
    data: function() {
        this.subscribe('stockBySymbol', {symbol: this.params.symbol});
        return {
            stock: Stocks.findOne({symbol: this.params.symbol})
        }
    },
    before: function () {
        this.next();
    }
});

Router.route('/:symbol', {
    name: 'detail',
    controller: DetailsController
});