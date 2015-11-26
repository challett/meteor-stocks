/**
 * Created by Connor on 10/30/2015.
 */
Template.appLayout.helpers({
    'isPortfolioPage': function () {
        return Router.current().route.getName() === 'home'
    }
});