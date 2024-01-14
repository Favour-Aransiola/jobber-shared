import JWT from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { NotAuthorizedError } from "./error-handler"

const tokens: string[] = ["auth", "seller", "gig", "search", "buyer", "chat", "order", "review"]



export function verifyGateWayRequest(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers.gatewayToken) {
        throw new NotAuthorizedError("Invalid request", "request not coming from api gateway")
    }
    const token: string = req.headers.gatewayToken as string;
    try {
        const payload: { id: string, iat: number } = JWT.verify(token, "") as { id: string, iat: number }
        if (!tokens.includes(payload.id)) {
            throw new NotAuthorizedError("Invalid request", "request not coming from api gateway")
        }
        next()
    }
    catch (err) {
        throw new NotAuthorizedError("Invalid request", "request not coming from api gateway")
    }
}