const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const contactRouter = require('./routers/contactRouter');

const hbs = require('express-handlebars').create({
    extname: '.hbs',
    helpers: {
        goBack: () => 'window.location.href = \'/\''
    }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/",contactRouter);
app.use("/favicon.ico",(request,response) =>
{
    const filePath = request.url.substr(1);
    fs.readFile(filePath, function(error, data){
              
        if(error){
                  
            response.statusCode = 404;
            response.end("Resourse not found!");
        }   
        else{
            response.end(data);
        }
    });
});


app.listen(process.env.PORT || port, () => 
{
    console.log(`http://localhost:${port}`);
});
