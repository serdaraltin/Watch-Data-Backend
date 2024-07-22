import Joi from "joi"

const UserSchemaValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    role: Joi.string(),
    deletedAt: "null"
 });
 export default UserSchemaValidation