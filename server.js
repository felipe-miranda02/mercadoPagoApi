const express = require("express");
const app = express();
const cors = require("cors");
var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken('TEST-4357401509386255-060813-e9e92338d7705c6f448e02fc404e67a2-1393999317');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/process_payment', (req, res) => {

    mercadopago.payment.save(req.body)
    .then(function(response) {
      const { status, status_detail, id } = response.body;
      res.status(response.status).json({ status, status_detail, id });
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send(error);
    })
    .finally(function() {
      res.end(); 
    });

});


app.listen(3001, () => {
	console.log("The server is now running on Port 3001");
});