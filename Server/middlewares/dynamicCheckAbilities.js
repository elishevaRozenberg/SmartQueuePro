const checkAbilities = require("../middlewares/checkAbilities");

const dynamicCheckAbilities = (req, res, next) => {
  const user = req.session.user;

  if (!user || !user.role) {
    return res.status(403).send({ message: "User not authenticated" });
  }

  let subject;

  switch (user.role) {
    case "client":
      subject = "Clients";
      break;
    case "secretary":
      subject = "Appointments";  // נניח שמזכירה אחראית על ניהול תורים
      break;
    case "admin":
      subject = "AdminPanel";    // לדוגמה — גישה לניהול המערכת
      break;
    default:
      subject = "General";       // גישה מוגבלת כברירת מחדל
      break;
  }

  // קורא ל-checkAbilities עם הפעולה והישות המתאימה
  const abilityMiddleware = checkAbilities("create", subject);
  abilityMiddleware(req, res, next);
};

module.exports = dynamicCheckAbilities;
