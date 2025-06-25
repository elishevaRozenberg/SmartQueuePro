// // QueueList.jsx
// import React from 'react';

// const QueueList = ({ queues, role }) => {
//   const handleUpdate = (id) => {
//     // logic to update queue info
//     console.log(`Update queue ${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`/queues/${id}`, { method: 'DELETE' });
//       console.log(`Deleted queue ${id}`);
//     } catch (err) {
//       console.error('Failed to delete queue:', err);
//     }
//   };

//   const handleAddQueue = () => {
//     // open modal or navigate to create form
//     console.log('Add new queue');
//   };

//   return (
//     <div className="queue-list">
//       <button onClick={handleAddQueue}>Add Queue</button>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Estimated Wait</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {queues.map(queue => (
//             <tr key={queue._id}>
//               <td>{queue.name}</td>
//               <td>{queue.description}</td>
//               <td>{queue.estimatedWait} min</td>
//               <td>
//                 <button onClick={() => handleUpdate(queue._id)}>Update</button>
//                 <button onClick={() => handleDelete(queue._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QueueList;

import React from 'react';

const QueueList = ({ queues, onUpdate }) => {
  const handleUpdate = (id) => {
    // לעתיד: לוגיקת עדכון פרטי תור (עריכת שם/תיאור וכו')
    console.log(`Update queue ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/queues/${id}`, { method: 'DELETE' });
      console.log(`Deleted queue ${id}`);
      if (onUpdate) onUpdate(); // רענון הרשימה לאחר מחיקה
    } catch (err) {
      console.error('Failed to delete queue:', err);
    }
  };

  const handleAddQueue = () => {
    // לעתיד: פתיחת מודאל או ניווט לטופס יצירת תור חדש
    console.log('Add new queue');
  };

  return (
    <div className="queue-list">
      <button onClick={handleAddQueue}>Add Queue</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Estimated Wait</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queues.map(queue => (
            <tr key={queue.id}>
              <td>{queue.name}</td>
              <td>{queue.description}</td>
              <td>{queue.estimatedWait || 0} min</td>
              <td>
                <button onClick={() => handleUpdate(queue.id)}>Update</button>
                <button onClick={() => handleDelete(queue.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueueList;

