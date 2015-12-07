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
});
Template.detail.events({
    'click .date-selector': function (e) {
        d3.select("svg").remove();
        Meteor.call('getHistoricalData', {symbol: this.stock.symbol , days: e.target.attributes.value.value}, function (err, data) {
            var margin = {top: 0, right: 0, bottom: 0, left: 0},
                width = document.getElementById("graph-card-section").clientWidth,
                height = document.getElementById("graph-card-section").clientHeight;
            xAxisHeight = height - 32;

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

            // function for the x grid lines
            /*function make_x_axis() {
             return d3.svg.axis()
             .scale(x)
             .orient("bottom")
             .ticks(0)
             }*/

            // function for the y grid lines
            /*function make_y_axis() {
             return d3.svg.axis()
             .scale(y)
             .orient("left")
             .ticks(0)
             }*/

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

            // Draw the x Grid lines
            //svg.append("g")
            // .attr("class", "grid")
            // .attr("transform", "translate(0," + height + ")")
            // .call(make_x_axis()
            // .tickSize(-height, 0, 0)
            // .tickFormat("")
            // )

            // Draw the y Grid lines
            /*svg.append("g")
             .attr("class", "grid")
             .call(make_y_axis()
             .tickSize(-width, 0, 0)
             .tickFormat("")
             )*/

            // Add the valueline path.
            svg.append("path")
                .attr("d", valueline(data));

            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(-20," + xAxisHeight + ")")
                .call(xAxis)

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(35,0)")
                .attr("x", margin.top - (height / 2))
                .attr("dy", ".71em")
                .call(yAxis);

            // Add the white background to the y axis label for legibility
            /*svg.append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("x", margin.top - (height / 2))
             .attr("dy", ".71em")
             .style("text-anchor", "end")
             .attr("class", "shadow")
             .text("Price ($)");*/

            // Add the text label for the Y axis
            /*svg.append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("x", margin.top - (height / 2))
             .attr("dy", ".71em")
             .style("text-anchor", "end")
             .text("Price ($)");*/


        });
    }
});
Template.detail.rendered = function () {
    Meteor.call('getHistoricalData', {symbol: this.data.stock.symbol , days: 180}, function (err, data) {
        var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = document.getElementById("graph-card-section").clientWidth,
            height = document.getElementById("graph-card-section").clientHeight;
            xAxisHeight = height - 32;

        var parseDate = d3.time.format("%d-%b-%y").parse;

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.time.format("%b-%d"));

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

        // function for the x grid lines
        /*function make_x_axis() {
            return d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(0)
        }*/

        // function for the y grid lines
        /*function make_y_axis() {
            return d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(0)
        }*/

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

        // Draw the x Grid lines
        /*svg.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(make_x_axis()
                .tickSize(-height, 0, 0)
                .tickFormat("")
        )*/

        // Draw the y Grid lines
        /*svg.append("g")
            .attr("class", "grid")
            .call(make_y_axis()
                .tickSize(-width, 0, 0)
                .tickFormat("")
        )*/

        // Add the valueline path.
        svg.append("path")
            .attr("d", valueline(data));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(-20," + xAxisHeight + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(35,0)")
            .attr("x", margin.top - (height / 2))
            .attr("dy", ".71em")
            .call(yAxis);

        // Add the white background to the y axis label for legibility
        /*svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("x", margin.top - (height / 2))
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("class", "shadow")
            .text("Price ($)");*/

        // Add the text label for the Y axis
        /*svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("x", margin.top - (height / 2))
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Price ($)");*/


    });
};