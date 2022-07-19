// const config = process.env.REACT_APP_ENVIRONMENT === 'production'
//     ? prod
//     : (process.env.REACT_APP_ENVIRONMENT === 'staging' ? staging : dev);

const config = {
    databaseConnectionString:
        `mongodb+srv://kvsCusat:xBTN8nRohWLOFh17@cluster0.tphmm.mongodb.net/Mock_test?retryWrites=true&w=majority`,
}

module.exports = config;