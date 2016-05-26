const express = require('express');
const app = express();
const services  = require(`${__dirname}/services.js`)
const bodyparser = require('body-parser')
const JsonParser = bodyparser.json();

app.use('/public',express.static(`${__dirname}/public`))
app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/index.html`);
})
app.use('/dispatch/browser/location',JsonParser, services.getLocation )
app.post('/dispatch/browser/location',(req,res) =>{
    res.send('')
});
app.use('/dispatch/cell/location',services.getLocationCellTower);
app.get('dispatch/cell/location',function(req,res){
    res.send('');
})
app.use('/dispatch/macaddress/location', services.getLocationMacAddress);
app.get('/dispatch/macaddress/location',function(req,res){
    res.send('');
});

app.listen(8080);