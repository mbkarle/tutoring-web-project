/*================================================*/
/*          Matt's default Node Server            */
/*================================================*/

/*----------Import Modules----------*/
const path = require('path');
const fs = require('fs')
const rawData = fs.readFileSync("Upgrade-list.json")
const upgradeList = JSON.parse(rawData)
/*----------Export File----------*/
module.exports = function(app) {

    app.route('/game')
        .get(home); //user has accessed homepage
    app.route("/")
        .get((req, res) => {
          res.redirect("./home.html")
        });
    app.route('/upgrades')
        .get(getUpgrades);
}

/*----------Endpoint Functions----------*/
function home(req, res) {
    //send homepage html
    res.sendFile(path.join(__dirname + '/index.html'));
}
function getUpgrades(req, res){

res.json(upgradeList)

}
