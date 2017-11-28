
function ensureLoggedIn(redirPath) {

    return function (req, res, next) {

        // console.log(req.user);
        if (!req.user) {
            res.redirect(redirPath)
        } else {
            next();
        }

    }
}

function ensureAdmin() {
    return function (req, res, next) {
        req.userIsAdmin = !req.user.roleId != 4;
        next();

    }
}

module.exports = {
    eli: ensureLoggedIn,
    eia: ensureAdmin
};