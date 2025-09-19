import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt  } from "passport-jwt";
import { CamperModel } from "./models/campusModel";


const CamperModel = new CamperModel()

const opts = {
    jwtFromrequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET

};

passport.use (
new JwtStrategy ( opts, async (jwt_payload, done) => {

try{


  
    const camper = await CamperModel.searchCamperById(jwt_payload.id);

    if (camper) return done (null, camper)

    
    return done(null, false);
  
} catch(error) {
    return done(error, false)
}

})


);

export default passport;
