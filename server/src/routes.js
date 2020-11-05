const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const SwapsController = require('./controllers/SwapsController');
const SwapControllerPolicy = require('./policies/SwapControllerPolicy');

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

};
