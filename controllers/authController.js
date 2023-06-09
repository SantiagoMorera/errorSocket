const nodeMailerUtils = require('../utils/nodeMailer.js');
const twilioUtils = require('../utils/twilio.js');
const logger = require('../utils/winston.js');

const getLoginController = async (req, res) => {
    if (req.isAuthenticated()) {
        const { username, password } = req.user;
        const user = { username, password };
        res.render("LogInSuccess", { layout: 'logged', user });
    } else {
        res.render("login");
    }
};

const getSignupController = async (req, res) => {
    if (req.isAuthenticated()) {
        const { username, password } = req.user;
        const user = { username, password };
        res.render("LogInSuccess", { layout: 'logged', user });
    } else {
        res.render("signup");
    }
};

const postLoginController = async (req, res) => {
    const { username, password } = req.user;
    const user = { username, password };
    req.session.admin = true;
    res.render('LogInSuccess', { layout: 'logged', user });
};

const postSignupController = async (req, res) => {
    const { username, password } = req.user;
    const user = { username, password };
    nodeMailerUtils.sendEmail(user.username, " ");
    nodeMailerUtils.sendEmail("santi.iztli@gmail.com", user);
    twilioUtils.sendSMS("User Registration succesful ✅", req.user.telefono);
    res.render("LogInSuccess", { layout: 'logged', user });
};

const getLogoutController = async (req, res) => {
    try {
        const { username, password } = req.user;
        const user = { username, password };
        req.logout(() => {
            res.render("logout", { layout: "index", user });
        });
    } catch (e) {
        logger.log('warn', '⚠️ No session to logout:', `${e}`);
        res.render('login');
    }
};

const getFailloginController = async (req, res) => {
    res.render("login-error", {});
};

const getFailsignup = async (req, res) => {
    res.render("signup-error", {});
};

const failRouteController = async (req, res) => {
    try {
        const clientRoute = req.params;
        logger.log('warn', `⚠️ Route entered by the client: ${JSON.stringify(clientRoute)}`);
        res.status(404).render("routing-error", {});
    } catch (e) {
        logger.log('error', `❌ Fail route controller: ${e}`);
    }
};

module.exports = {
    getLoginController,
    getSignupController,
    postLoginController,
    postSignupController,
    getLogoutController,
    getFailloginController,
    getFailsignup,
    failRouteController
};
