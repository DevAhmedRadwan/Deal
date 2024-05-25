import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
  VerifiedCallback,
} from "passport-jwt";
import TokenDto from "../dtos/token.dto";
import { TOKEN_TYPE } from "../enums/token-type.enum";
import User from "../models/user.model";
import { config } from "./env";

const jwtOptions: StrategyOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: TokenDto, done: VerifiedCallback) => {
  try {
    if (payload.type !== TOKEN_TYPE.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };
