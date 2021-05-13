// Import dependencies
import cors from 'cors';
import express from 'express';
import routes from './routes/routes';


const app = express();
const port = process.env.PORT;
app.use((req, res, next) => {
    console.log(`Request Endpoint: ${req.method} ${req.url}`);
    next();
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/',routes);


app.get('*', function(req,res,next){
  const err = Error("page is not found !!!!");
  next(err);
});



app.use((error, req, res,next) => {
  //console.log("Wrong path");
  if (!error.statusCode) error.statusCode = 500;
  return res.status(error.statusCode).json({ msg: error.toString()});
});




app.listen(port, () => console.log(`Backend listening on: ${port}`));

