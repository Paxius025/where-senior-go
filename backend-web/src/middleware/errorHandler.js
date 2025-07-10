export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging purposes

    // Determine the status code
    const statusCode = err.statusCode || 500;

    // Send the error response
    res.status(statusCode).json({
        message: err.message || 'An unexpected error occurred',
        // You might want to include more details in development, but not in production
        // error: process.env.NODE_ENV === 'development' ? err : {}
    });
};
