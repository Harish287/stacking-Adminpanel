import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailedView = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://103.181.21.93:8099/api/v1/admin/transaction/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!data) return <div>Loading...</div>;

  const transaction = data; // Assuming the API returns a single transaction object

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
      <div className="mb-4">
        <p><strong>Amount:</strong> {transaction.amount}</p>
        <p><strong>Plan:</strong> {transaction.Plan}</p>
        <p><strong>Type:</strong> {transaction.Type}</p>
        <p><strong>Sender Name:</strong> {transaction.sendername}</p>
        <p><strong>Receiver Name:</strong> {transaction.recivername}</p>
        <p><strong>Currency Symbol:</strong> {transaction.currencySymbol}</p>
        <p><strong>Date Time:</strong> {new Date(transaction.dateTime).toLocaleString()}</p>
        <p><strong>Used:</strong> {transaction.used ? 'Yes' : 'No'}</p>
        <p><strong>User ID:</strong> {transaction.userId}</p>
        <p><strong>To ID:</strong> {transaction.ToId}</p>
        <p><strong>Created At:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(transaction.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default DetailedView;
