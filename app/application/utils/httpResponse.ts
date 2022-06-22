import { statusCode, respMessage } from "./httpStatus";
import logger from "../../infrastructure/logger/logger";
class HttpResponse {
    statusCode: any;
    body: any;
    constructor(statusCode: any, body: any) {
        this.statusCode = statusCode;
        this.body = body;
    }
    static create(responseCode: any, body: any) {
        if (responseCode === statusCode.SERVER_ERROR || responseCode === statusCode.NOT_FOUND || responseCode === statusCode.UNAUTHORIZED) {
            return new HttpResponse(responseCode, { message: body });
        }
        return new HttpResponse(responseCode, body);
    }

    static convertToExpress(res: any, httpResponse: any) {
        return res.status(httpResponse.statusCode).json(httpResponse.body);

    }

}

export default HttpResponse;