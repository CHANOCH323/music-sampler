class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message); // קריאה לקונסטרקטור של Error
        this.statusCode = statusCode; // הגדרת ה-statusCode
        this.isOperational = true; // הגדרת ה-isOperational כ-true
        Error.captureStackTrace(this, this.constructor); // שמירת המידע על השגיאה
    }
}
// מחלקות שגיאה מותאמות
class DBError extends AppError {
    constructor(message = 'Database error occurred') {
        super(message, 500);
    }
}

class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
        super(message, 400);
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

class BadRequestError extends AppError {
    constructor(message = 'Bad request') {
        super(message, 400);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

class SpecialError extends AppError {
    constructor(message = 'Bad request') {
        super(message, 400);
    }
}

class ForbiddenError extends AppError {
    constructor(message = 'Forbidden: You do not have access to this resource') {
        super(message, 403); // סטטוס קוד 403 מתאים יותר לגישה אסורה
    }
}


// module.exports = {
//     AppError,
//     DBError,
//     ValidationError,
//     NotFoundError,
//     BadRequestError,
//     UnauthorizedError
// };

export { AppError, DBError, ValidationError, NotFoundError, BadRequestError, UnauthorizedError, SpecialError, ForbiddenError };