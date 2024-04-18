import { envMode } from "../app.js";

const errorMiddleware = (err, req, res, next) => {
    console.log("Middleware Error Handling");
    console.log(err);
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';

    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: envMode === 'DEVELOPMENT' ? err.stack : {},
    })
};


const tryCatch = (passedFunc) => async (req, res, next) => {
    try {
        await passedFunc(req, res, next);
    } catch (error) {
        next(error);
    }
};

export {
    tryCatch,
    errorMiddleware
};