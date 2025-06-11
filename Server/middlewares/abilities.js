const { AbilityBuilder, createMongoAbility } = require("@casl/ability");       

const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (!user || !user.role) {
    cannot("manage", "all");
  } else {
    switch (user.role) {
      case "admin":
        can("manage", "all");
        break;

      case "worker":
        can("read", "Client");
        can("read", "Call");
        can("delete", "Call");
        can("update", "Call");
        can("createAsClient", "Call");
        can("view", "Statistics");
        can("updateOwn", "Profile");
        break;

      case "client":
        can("create", "Call");
        can("deleteOwn", "Call");
        can("view", "Statistics");
        can("updateOwn", "Profile");
        break;

      default:
        cannot("manage", "all");
        break;
    }
  }

  return build();
};

module.exports = { defineAbilitiesFor };
