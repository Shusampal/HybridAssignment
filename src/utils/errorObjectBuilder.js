const errorObjectBuilder = (statusCode , message) => {
    return {
        error: true,
        message,
        statusCode
    }
}

module.exports = errorObjectBuilder;