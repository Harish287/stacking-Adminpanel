import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Kaitwallet = () => {
  const kaitwalletData = ["Pending Approvals", "Approved", "Rejected"];
  const [selectedCategory, setSelectedCategory] = useState("pending");
  const [pendingData, setPendingData] = useState(null);
  const [approvedData, setApprovedData] = useState(null);
  const [rejectData, setRejectData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // New state for selected user
  const apiUrl = "http://103.181.21.93:8099/api/v1/admin/crypto/list";

  const fetchData = (status, setter) => {
    const data = JSON.stringify({
      type: "send",
      status: status,
      pageno: 1
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(`Fetched ${status} Data:`, response.data);
        setter(response.data);
      })
      .catch((error) => {
        console.error(`Error Fetching ${status} Data:`, error);
      });
  };

  useEffect(() => {
    fetchData("pending", setPendingData);
    fetchData("approved", setApprovedData);
    fetchData("rejected", setRejectData);
  }, []);

  const pendingCount = pendingData?.data?.TotalCount || 0;
  const approvedCount = approvedData?.data?.TotalCount || 0;
  const rejectCount = rejectData?.data?.TotalCount || 0;

  const getDataForCategory = () => {
    switch (selectedCategory) {
      case "pending":
        return pendingData?.data?.Data || [];
      case "approved":
        return approvedData?.data?.Data || [];
      case "rejected":
        return rejectData?.data?.Data || [];
      default:
        return [];
    }
  };

  const tableData = getDataForCategory();

  return (
    <div className='bg-[#17519b] p-8 border rounded-[20px] container m-[auto]'>
      <div className='mb-4'>
        <div className='grid grid-cols-3 gap-4'>
          {kaitwalletData.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg ${selectedCategory === category.toLowerCase() ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border border-blue-700'
                }`}
              onClick={() => setSelectedCategory(category.toLowerCase())}
            >
              {category} ({{
                pending: pendingCount,
                approved: approvedCount,
                rejected: rejectCount
              }[category.toLowerCase()]})
            </button>
          ))}
        </div>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:h-[250px] h-auto'>
        <div className='rounded-[20px] border bg-white p-4'>
          <h3
            className='text-2xl font-bold text-gray-500 cursor-pointer'
            onClick={() => setSelectedCategory("pending")}
          >
            {kaitwalletData[0]}
          </h3>
          <div
            className='lg:text-[50px] sm:text-[20px] font-bold cursor-pointer'
            onClick={() => setSelectedCategory("pending")}
          >
            {pendingCount}
          </div>
        </div>
        <div className='rounded-[20px] border bg-white p-4'>
          <h3
            className='text-2xl font-bold text-gray-500 cursor-pointer'
            onClick={() => setSelectedCategory("approved")}
          >
            {kaitwalletData[1]}
          </h3>
          <div
            className='lg:text-[50px] sm:text-[20px] font-bold cursor-pointer'
            onClick={() => setSelectedCategory("approved")}
          >
            {approvedCount}
          </div>
        </div>
        <div className='rounded-[20px] border bg-white p-4'>
          <h3
            className='text-2xl font-bold text-gray-500 cursor-pointer'
            onClick={() => setSelectedCategory("rejected")}
          >
            {kaitwalletData[2]}
          </h3>
          <div
            className='lg:text-[50px] sm:text-[20px] font-bold cursor-pointer'
            onClick={() => setSelectedCategory("rejected")}
          >
            {rejectCount}
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white p-4 rounded-lg'>
        <h2 className='text-2xl font-bold text-gray-700 mb-4'>
          Data Table - {kaitwalletData.find(cat => cat.toLowerCase() === selectedCategory)}
        </h2>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-100 text-[20px]'>
              <th className='border px-4 py-2'>ID</th>
              <th className='border px-4 py-2'>Email</th>
              <th className='border px-4 py-2'>Currency</th>
              <th className='border px-4 py-2'>Amount</th>
              <th className='border px-4 py-2'>Date</th>
              <th className='border px-4 py-2'>Action</th> {/* New column for action */}
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item) => (
                <tr key={item._id} className='text-[20px]'>
                  <td className='border px-4 py-2'>{item._id}</td>
                  <td className='border px-4 py-2'>{item.email}</td>
                  <td className='border px-4 py-2'>{item.currency}</td>
                  <td className='border px-4 py-2'>{item.amount}</td>
                  <td className='border px-4 py-2'>{new Date(item.date).toLocaleString()}</td>
                  <td className='border px-4 py-2'>
                    <button
                      className='text-blue-500 hover:underline'
                      onClick={() => setSelectedUser(item)}
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className='border px-4 py-2 text-center'>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Modal or detailed view */}
      {selectedUser && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-lg w-1/2'>
            <h2 className='text-2xl font-bold mb-4'>User Details</h2>
            <p><strong>ID:</strong> {selectedUser._id}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Currency:</strong> {selectedUser.currency}</p>
            <p><strong>Amount:</strong> {selectedUser.amount}</p>
            <p><strong>network:</strong> {selectedUser.network}</p>
            <p><strong>Date:</strong> {new Date(selectedUser.date).toLocaleString()}</p>
            <button
              className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kaitwallet;
