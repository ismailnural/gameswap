const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const SwapsController = require('./controllers/SwapsController');
const SwapControllerPolicy = require('./policies/SwapControllerPolicy');
const ProfileController = require('./controllers/ProfileController');
const OfferController = require('./controllers/OfferController');
const OfferControllerPolicy = require('./policies/OfferControllerPolicy');

const isAuthenticated = require('./policies/isAuthenticated');

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register);
    app.post('/login',
        AuthenticationController.login);

    app.get('/swaps',
        SwapsController.index);
    app.get('/swaps/:swapId',
        SwapsController.show);
    app.put('/swaps/:swapId',
        SwapsController.put);
    app.post('/swaps',
        isAuthenticated,
        SwapControllerPolicy.add,
        SwapsController.post);

    app.get('/profile/:userId',
        ProfileController.show);
    app.get('/profile/:userId/swaps',
        SwapsController.index);

    app.get('/offers/:offerId',
        OfferController.show);
    app.post('/offers',
        isAuthenticated,
        OfferControllerPolicy.add,
        OfferController.add);
};
