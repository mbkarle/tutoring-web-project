/*================================================*/
/*          Matt's default Node Server            */
/*================================================*/

/*----------Import Modules----------*/
const path = require('path');

/*----------Export File----------*/
module.exports = function(app) {

    app.route('/')
        .get(home); //user has accessed homepage
    app.route("/home")
        .get((req, res) => {
          res.redirect("./home.html")
        });

}

/*----------Endpoint Functions----------*/
function home(req, res) {
    //send homepage html
    res.sendFile(path.join(__dirname + '/index.html'));
}
