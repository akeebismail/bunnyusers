
const validate = (schema, props = 'body') => {
    return (req, res, next) => {
        const {error} = schema.validate(req[props], {abortEarly: false, allowUnknown: true});
        const valid = error == null
        if (valid){
            next()
        } else {
            const {details} = error

            return res.status(422).send({
                success: false,
                message: details.map(i => i.message && i.message.replace(/['"]/g, '').replace(/mongo/g,'')).join(' and ')
            })
        }
    }
}

module.exports = validate;
