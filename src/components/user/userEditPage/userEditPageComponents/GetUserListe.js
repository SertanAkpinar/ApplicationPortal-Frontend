// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function GetUserList() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("https://localhost:443/api/users")
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   return (
//     <ul>
//       {users.map((user) => (
//         <li key={user.id}>{user.name}</li>
//       ))}
//     </ul>
//   );
// }

// export default GetUserList;
