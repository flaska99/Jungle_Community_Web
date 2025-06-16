import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET ?? 'defaultSecretKey'
        });
    }

    async validate(payload : any) {
        return { userId : payload.sub, user_id : payload.user_id, user_name : payload.user_name, jungle_grade : payload.jungle_grade};
    }
}
