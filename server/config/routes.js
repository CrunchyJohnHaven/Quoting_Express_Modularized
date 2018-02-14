
var mongoose = require('mongoose');
    Quote = mongoose.model('Quote');
module.exports = function(app){

app.get('/', function(req, res) {
    res.render('index');
});
app.get('/quotes', function(req, res) {
    Quote.find({}, function(err, quotes){
        if(err){
            res.send(err);
        }
        else {
            res.render('quotes', {quotes:quotes});
        }
    });
});
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    var quote = new Quote({name:req.body.name, quote:req.body.quote});
    quote.save(function(err){
        if(err){
            console.log('something went wrong.');
            res.render('index', {errors:quote.err});
        }
        else{
            console.log('quote successfully added.');
            res.redirect('/quotes');
        }
    }); 
});
};