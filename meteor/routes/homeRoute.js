/**
 * Created by Connor on 10/30/2015.
 */
HomeController = RouteController.extend({
    template: 'home',
    waitOn: function() {
    },
    data: function() {
    },
    before: function () {
        this.next();
    }
});

Router.route('/', {
    name: 'home',
    controller: HomeController
});