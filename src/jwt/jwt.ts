import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common'
import { NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import {Response} from 'express'

export const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    if (authHeader) {
        jwt.verify(token, process.env.JWT, (err,user) => {
            if (err) return res.status(401).json("You are not authenticated!")
            req.user = user
            next()
        })
    }
}

@Injectable()
export class verifyTokenAndAuthorization implements NestMiddleware {
    use(@Req() req: any, @Res() res: Response, next: NextFunction){
        verifyToken(req,res, () => {
            if (req.params.id === req.user.id) {
                next()
            }else {
                return res.status(403).json("You are not allowed to do that!")
            }
        })
    }
}