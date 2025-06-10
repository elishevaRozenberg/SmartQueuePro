const { ForbiddenError } = require("@casl/ability");
const { defineAbilitiesFor } = require("./abilities");

const checkAbilities = (action, subject) => (req, res, next) => {
  const user = req.session && req.session.user;
  
  if (!user || !user.role) {
    return res.status(403).send({ message: "User not authenticated" });
  }

  const ability = defineAbilitiesFor(user);

  try {
    ForbiddenError.from(ability).throwUnlessCan(action, subject);
    next();
  } catch (error) {
    res.status(403).send({ message: "Access Denied", error: error.message });
  }
};


module.exports = checkAbilities;
