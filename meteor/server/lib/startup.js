/**
 * Created by Connor on 12/3/2015.
 */
Meteor.startup( function () {
        if(Stocks.find().count() === 0) {
            var data;
            Papa.parse(Assets.getText('symbols.csv'), {
                header: true,
                complete: function(results) {
                    data = results.data;
                    console.log('done')

                }
            });
            Stocks.rawCollection().insert(data, function (err,res) {
                console.log(err, res)
            })
        }
    }
);

