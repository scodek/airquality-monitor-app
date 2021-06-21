const  loginToken = (req, res, next) => {
  try{
    if(req.body['username'] === 'airquality' && req.body['password'] === 'test123'){
      return res.send({
        token: 'test123'
      });
    }else{
      throw new Error('invalid username or password');
    }
    

  }catch(err){
    next(err);
  }
  
}

export default loginToken;