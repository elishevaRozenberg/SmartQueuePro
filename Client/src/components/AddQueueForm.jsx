

// // // components/AddQueueForm.jsx
// // import React, { useState } from 'react';

// // export default function AddQueueForm({ onAdd }) {
// //   const [name, setName] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [maxCapacity, setMaxCapacity] = useState(10);
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!name.trim() || maxCapacity < 1) {
// //       setError('Please provide valid name and capacity.');
// //       return;
// //     }

// //     try {
// //       await onAdd({
// //         name,
// //         description,
// //         max_capacity: maxCapacity
// //       });

// //       setName('');
// //       setDescription('');
// //       setMaxCapacity(10);
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to add queue.');
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="bg-white shadow-md p-4 rounded mb-6">
// //       <h2 className="text-lg font-semibold mb-4">New Queue</h2>

// //       {error && <p className="text-red-600 mb-2">{error}</p>}

// //       <div className="mb-4">
// //         <label className="block text-sm text-slate-700 mb-1">Queue Name</label>
// //         <input
// //           type="text"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //           className="w-full border rounded px-3 py-2"
// //           required
// //         />
// //       </div>

// //       <div className="mb-4">
// //         <label className="block text-sm text-slate-700 mb-1">Description (optional)</label>
// //         <textarea
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           className="w-full border rounded px-3 py-2"
// //         />
// //       </div>

// //       <div className="mb-4">
// //         <label className="block text-sm text-slate-700 mb-1">Max Capacity</label>
// //         <input
// //           type="number"
// //           value={maxCapacity}
// //           min={1}
// //           onChange={(e) => setMaxCapacity(Number(e.target.value))}
// //           className="w-full border rounded px-3 py-2"
// //           required
// //         />
// //       </div>

// //       <button
// //         type="submit"
// //         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //       >
// //         Add Queue
// //       </button>
// //     </form>
// //   );
// // }


// import React, { useState } from 'react';

// export default function AddQueueForm({ onAdd }) {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [maxCapacity, setMaxCapacity] = useState(10);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name.trim() || maxCapacity < 1) {
//       setError('Please provide valid name and capacity.');
//       return;
//     }

//     try {
//       await onAdd({
//         name,
//         description,
//         max_capacity: maxCapacity
//       });

//       setName('');
//       setDescription('');
//       setMaxCapacity(10);
//       setError('');
//     } catch (err) {
//       setError('Failed to add queue.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white shadow-md p-4 rounded mb-6">
//       <h2 className="text-lg font-semibold mb-4">New Queue</h2>

//       {error && <p className="text-red-600 mb-2">{error}</p>}

//       <div className="mb-4">
//         <label className="block text-sm text-slate-700 mb-1">Queue Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full border rounded px-3 py-2"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm text-slate-700 mb-1">Description (optional)</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full border rounded px-3 py-2"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm text-slate-700 mb-1">Max Capacity</label>
//         <input
//           type="number"
//           value={maxCapacity}
//           min={1}
//           onChange={(e) => setMaxCapacity(Number(e.target.value))}
//           className="w-full border rounded px-3 py-2"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Add Queue
//       </button>
//     </form>
//   );
// }


// AddQueueForm.jsx
import React, { useState } from 'react';
import './AddQueueForm.css';

const AddQueueForm = ({ onQueueAdded }) => {
  const [formData, setFormData] = useState({ name: '', description: '', estimatedWait: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/queues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (onQueueAdded) onQueueAdded(data);
      setFormData({ name: '', description: '', estimatedWait: '' });
    } catch (err) {
      console.error('Failed to add queue:', err);
    }
  };

  return (
    <form className="add-queue-form" onSubmit={handleSubmit}>
      <h2>Create New Queue</h2>
      <input
        type="text"
        name="name"
        placeholder="Queue Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="estimatedWait"
        placeholder="Estimated Wait (minutes)"
        value={formData.estimatedWait}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Queue</button>
    </form>
  );
};

export default AddQueueForm;

