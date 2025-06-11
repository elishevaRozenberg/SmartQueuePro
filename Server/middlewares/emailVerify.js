// // const emailVerify = (req, res, next) => {

// //     if (!req.session.user) {
// //     return res.status(401).json({ error: "You are not logged in" });
// //   }

// //   if (!req.session.user.isEmailVerified) {
// //     return res.status(403).json({ error: "Email is not verified" });
// //   }

// //   next();
// // };

// // module.exports = emailVerify;
// const emailVerify = (req, res, next) => {
//   console.log("req.session is:", req.session);
//   if (!req.session) {
//     return res.status(500).json({ error: "Session is not initialized" });
//   }
//   if (!req.session.user) {
//     return res.status(401).json({ error: "You are not logged in" });
//   }
//   if (!req.session.user.isEmailVerified) {
//     return res.status(403).json({ error: "Email is not verified" });
//   }
//   next();
// };
// module.exports = emailVerify;
