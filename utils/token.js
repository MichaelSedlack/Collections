const jwt = require("jsonwebtoken");
require("dotenv").config();

function createToken( firstName, lastName, id ){
    return _createToken( firstName, lastName, id );
}

function _createToken ( firstName, lastName, id ){
    
  try{
      const expiration = new Date();
      const user = {id,firstName,lastName};

      // const accessToken =  jwt.sign( user, process.env.SECRET);

      // In order to exoire with a value other than the default, use the 
       // following
      
      const accessToken= jwt.sign(user,process.env.SECRET, { expiresIn: '30m'} );
      //                  '24h'
      //                 '365d'
      

      var ret = accessToken;
    }
    catch(e){
      var ret = {error:e.message};
    }
    
    return ret;
}

// GETS JWT TOKEN FROM HEADER
function getToken(request){
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7);
  }

  return null;
}

function isExpired( token ){
  return jwt.verify( token, process.env.SECRET, (err, verifiedJwt) =>
  {
    if( err ){
      return "Error";
    }
    else{
      return verifiedJwt;
    }
  });
}

function refresh( token ){
  var ud = jwt.decode(token,{complete:true});

  var userId = ud.payload.id;
  var firstName = ud.payload.firstName;
  var lastName = ud.payload.lastName;

  return _createToken( firstName, lastName, userId );
}

module.exports = {
  refresh,
  isExpired,
  createToken,
  getToken
}