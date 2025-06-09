const { AbilityBuilder, Ability } = require("@casl/ability");

const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (!user || !user.role) {
    cannot("manage", "all");
  } else {
    switch (user.role) {
      case "admin":
        can("manage", "all");
        break;

      case "secretary":
        can("read", "Appointments");
        can("create", "Appointments");
        can("update", "Appointments");
        can("delete", "Appointments");
        can("read", "Users");
        break;

      case "client":
        can("create", "Appointments");
        can("read", "Appointments", { userId: user.id });
        can("delete", "Appointments", { userId: user.id });
        break;

      default:
        cannot("manage", "all");
        break;
    }
  }

  return build();
};

module.exports = { defineAbilitiesFor };
