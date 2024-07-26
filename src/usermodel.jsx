import React from 'react';
import ReactDOM from 'react-dom';

const UserModal = ({ user, onClose }) => {
  return ReactDOM.createPortal(
    <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/2 lg:w-1/3'>
        <h2 className='text-xl font-bold mb-4'>User Details</h2>
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Level:</strong> {user.level}</p>
        <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
        <p><strong>Verified:</strong> {user.emailVerified ? 'Verified' : 'Not Verified'}</p>
        <button
          onClick={onClose}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default UserModal;
