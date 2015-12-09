/**
 * Created by Connor on 11/26/2015.
 */
Template.detail.helpers({
    fields: NamedFields,
    stockFieldValue: function (fieldName) {
        return (this.stock[fieldName])
    },
    showElement: function (name) {
        return Preferences.findOne({name: name}).showDetail;

    },
    changeColor: function () {
        var stock = this.stock;
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
    fixDecimals: function (field, fieldVal, floatDec) {
        if ((field==='volume') || (field==='averageDailyVolume')){
            return fieldVal;
        } else if (typeof(fieldVal) === 'number') {
            return fieldVal.toFixed(floatDec);
        } else {
            return fieldVal;
        }
    },
    inPortfolio: function (stockName) {
        return Portfolio.findOne({symbol: stockName}).symbol
    }
});
Template.detail.events({
    'click .date-selector': function (e) {
        d3.select("svg").remove();
        Meteor.call('getHistoricalData', {symbol: this.stock.symbol , days: e.target.attributes.value.value}, function (err, data) {
            var margin = {top: 50, right: 0, bottom: 0, left: 35},
                width = document.getElementById("graph-card-section").clientWidth - 35,
                height = document.getElementById("graph-card-section").clientHeight - 60;

            var parseDate = d3.time.format("%d-%b-%y").parse;

            var x = d3.time.scale()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom").ticks(8).tickFormat(d3.time.format("%b-%d"));

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var line = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.close); });

            var area = d3.svg.area()
                .x(function(d) { return x(d.date); })
                .y0(height)
                .y1(function(d) { return y(d.close); });

            var valueline = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.close); });


            var svg = d3.select("#graph").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            data.forEach(function(d) {
                d.date = parseDate(moment(d.date).format('DD-MMM-YY'));
                d.close = +d.close;
            });

            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain(d3.extent(data, function(d) { return d.close; }));

            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

            // Add the filled area
            svg.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area);



            // Add the valueline path.
            svg.append("path")
                .attr("d", valueline(data));

            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(-10,-50)")
                .call(xAxis)
                .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(-75)" );

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .attr("dy", ".71em")
                .call(yAxis);


        });
    },
    'click .remove-button': function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        var self = this.stock;
        IonPopup.show({
            title: 'Remove Stock',
            template: 'Are you sure you want to remove this stock from your portfolio?',
            buttons: [{
                text: 'Remove',
                type: 'button-positive',
                onTap: function() {
                    Portfolio.remove({symbol: self.symbol})
                    IonPopup.close()
                }
            },
                {
                    text: 'Keep',
                    type: 'button-positive',
                    onTap: function() {
                        IonPopup.close()
                    }
                }]
        });
    },
    'click .add-button': function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        var self= this.stock;
        IonPopup.show({
            title: 'Stock Added',
            template: self.symbol + ' has been added to your portfolio!',
            buttons: []
        });
        Portfolio.insert({symbol: self.symbol})
        setTimeout(function () {
            IonPopup.close();
        }.bind(this), 2000)
    }
});
Template.detail.rendered = function () {
    Meteor.call('getHistoricalData', {symbol: this.data.stock.symbol , days: 180}, function (err, data) {
        var margin = {top: 50, right: 0, bottom: 0, left: 35},
            width = document.getElementById("graph-card-section").clientWidth - 35,
            height = document.getElementById("graph-card-section").clientHeight - 60;

        var parseDate = d3.time.format("%d-%b-%y").parse;

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom").ticks(8).tickFormat(d3.time.format("%b-%d"));

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

        var area = d3.svg.area()
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.close); });

        var valueline = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

        var svg = d3.select("#graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        data.forEach(function(d) {
            d.date = parseDate(moment(d.date).format('DD-MMM-YY'));
            d.close = +d.close;
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain(d3.extent(data, function(d) { return d.close; }));

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        // Add the filled area
        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area);

        // Add the valueline path.
        svg.append("path")
            .attr("d", valueline(data));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(-10,-50)")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-75)" );

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .attr("dy", ".71em")
            .call(yAxis);

    });
};