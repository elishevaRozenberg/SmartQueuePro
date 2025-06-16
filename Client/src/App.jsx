// import { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// // ייבוא קומפוננטות
// // מחליפים את הייבוא של NavBar ו-Footer בייבוא של Layout
// import Layout from './Layout'

// // דפי עמודים
// import { UserProvider } from './context/UserContext';
// // קומפוננטות אבטחה
// import ProtectedRoute from "./components/auth/ProtectedRoute";

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />

//           {/* דוגמא להגנה על רוט */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute requiredRole="admin">
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           />

//           <Route path="/profile" element={<Profile />} />
//           <Route path="/queues" element={<Queues />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/statics" element={<Statics />} />
//           <Route path="/users" element={<UserManagement />} />
//         </Routes>
//       </Layout>
//     </Router>
//   )
// }

