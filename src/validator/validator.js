const validate = (schema) => {
    return (req, res, next) => {
      const options = {
        abortEarly: false,
        allowUnknown: false,
      };
  
      const { error } = schema.validate(req.body, options);
      const valid = error == null;
  
      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');
  
        res.status(400).json({ error: message });
      }
    };
  };
  export default validate;
  