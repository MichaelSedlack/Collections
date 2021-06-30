const jwt = require("jsonwebtoken");
const config = require('./config');

function createToken( firstName, lastName, id ){
    return _createToken( firstName, lastName, id );
}

function _createToken ( firstName, lastName, id ){
  var ret;
  try{
      const user = {id, firstName, lastName};
      
      const accessToken= jwt.sign(user, config.SECRET, { expiresIn: '30m'} );

      ret = accessToken;
    }
    catch(e){
      ret = {error:e.message};
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
  return jwt.verify( token, config.SECRET, (err, verifiedJwt) =>
  {
    if( err ){
      return null;
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