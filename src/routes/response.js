const respond = (res,data, code = 200) => {
    return res.status(code).send(data)
}

const respondWithInternalError = (res) => {
    return res.status(500).send({
        success: false,
        status_code: 500,
        message: 'Something went wrong!',
        data: []
    })
}

module.exports = {respond, respondWithInternalError}