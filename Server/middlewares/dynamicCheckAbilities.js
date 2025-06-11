const checkAbilities = require("../middlewares/checkAbilities");
const { defineAbilitiesFor } = require('../middlewares/abilities');
const { ForbiddenError } = require('@casl/ability');

const dynamicCheckAbilities = (action, subject) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Unauthorized - not logged in' });
    }

    const ability = defineAbilitiesFor(req.session.user);

    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Forbidden - no permission' });
    }
  };
};

module.exports = dynamicCheckAbilities;
