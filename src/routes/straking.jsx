import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Straking = () => {
  const [apidata, setApiData] = useState(null);
  const adminUrl = 'http://103.181.21.93:8099/api/v1/admin/totalRoyality';

  useEffect(() => {
    axios.get(adminUrl)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const transactions = apidata?.data?.data || [];
  const totalAmount = apidata?.data?.TotalAmount?.[0]?.Total || 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Royalty Data</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Total Amount: {totalAmount}</h2>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-lg">
            <th className="p-3 border-b">No.</th>
            <th className="p-3 border-b">Amount</th>
            <th className="p-3 border-b">Plan</th>
            <th className="p-3 border-b">Type</th>
            <th className="p-3 border-b">Sender Name</th>
            <th className="p-3 border-b">Receiver Name</th>
            <th className="p-3 border-b">Currency Symbol</th>
            <th className="p-3 border-b">Date Time</th>
            {/* <th className="p-3 border-b">Used</th> */}
            {/* <th className="p-3 border-b">User ID</th>
            <th className="p-3 border-b">To ID</th> */}
            <th className="p-3 border-b">Created At</th>
            <th className="p-3 border-b">Updated At</th>
            <th className="p-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{item.amount}</td>
              <td className="p-3">{item.Plan}</td>
              <td className="p-3">{item.Type}</td>
              <td className="p-3">{item.sendername}</td>
              <td className="p-3">{item.recivername}</td>
              <td className="p-3">{item.currencySymbol}</td>
              <td className="p-3">{new Date(item.dateTime).toLocaleString()}</td>
              {/* <td className="p-3">{item.used ? 'Yes' : 'No'}</td> */}
              {/* <td className="p-3">{item.userId}</td>
              <td className="p-3">{item.ToId}</td> */}
              <td className="p-3">{new Date(item.createdAt).toLocaleString()}</td>
              <td className="p-3">{new Date(item.updatedAt).toLocaleString()}</td>
              <td className="p-3">
                <Link to={`/details/${item._id}`} className="text-blue-500 hover:underline">View More</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Straking;
