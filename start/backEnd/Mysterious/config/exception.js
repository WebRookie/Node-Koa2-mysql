// http-exception 
const {
    SERVICE_ERROR,
    PARAM_ERROR,
    NO_RESOURCE_ERROR,
    NOT_LOGIN_ERROR,
    NO_AUTH_ERROR,
} = require('./codeMsg.js');
class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = SERVICE_ERROR, code = 500) {
        super();
        this.errorCode = errorCode;
        this.code = code;
        this.msg = msg;
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 400;
        this.msg = msg || '参数有误';
        this.errorCode = errorCode || PARAM_ERROR
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.msg = msg || '暂无资源';
        this.code = 404;
        this.errorCode = errorCode || NO_RESOURCE_ERROR;
    }    
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.msg = msg || '授权失败';
        this.code = 401;
        this.errorCode = errorCode || NOT_LOGIN_ERROR;
    }
}

class Forbidden extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 403;
        this.errorCode = errorCode || NO_AUTH_ERROR;
    }
}

module.exports = {
    HttpException,
    ParameterException,
    NotFound,
    AuthFailed,
    Forbidden
}