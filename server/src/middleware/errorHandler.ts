import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    (() => {
        console.error(err.statusCode);
        console.error(err.message);
        console.error(err);
    })();

    if (err.statusCode === 500) {
        err.statusCode = 400;
        err.message = 'An unexpected error occurred';
    }

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    res.status(400).json({
        status: 'error',
        message: 'An unexpected error occurred'
    });
}

export default errorHandler;
