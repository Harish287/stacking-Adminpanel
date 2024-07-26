import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import UserModal from './usermodel'; // Import the UserModal component

const App = () => {
  const [apidata, setApiData] = useState(null);
  const [verified, setVerified] = useState(false);
  const [activeUsersTable, setActiveUsersTable] = useState(false);
  const [UsersTable, setUsersTable] = useState(true);
  const [notverified, setNotverified] = useState(false);
  const userRef = useRef();
  const [chartData, setChartData] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user

  const adminUrl = 'http://103.181.21.93:8099/api/v1/admin/user/list';
  const chartUrl = 'http://103.181.21.93:8099/api/v1/admin/get_graph_data';

  // Fetch user data
  useEffect(() => {
    axios.post(adminUrl)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Fetch chart data
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`${chartUrl}?interval=${selectedInterval}`);
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [selectedInterval]);

  // Update chart options
  useEffect(() => {
    if (chartData) {
      setOptions(prevOptions => ({
        ...prevOptions,
        xAxis: {
          categories: chartData.categories
        },
        series: [{
          ...prevOptions.series[0],
          data: chartData.message.map(item => ({
            y: item.count,
            name: String(item.timeLabel).toUpperCase()
          }))
        }]
      }));
    }
  }, [chartData]);

  // Prepare chart options
  const [options, setOptions] = useState({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Growth of Staking Users'
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: 'Number of Users'
      }
    },
    series: [{
      name: 'Internet Users',
      data: []
    }],
    credits: {
      enabled: false
    }
  });

  // User table data
  useEffect(() => {
    if (apidata) {
      const allUsers = apidata.data;
      let filtered = allUsers.filter(user => {
        if (UsersTable) return true;
        if (verified) return user.emailVerified === true;
        if (notverified) return user.emailVerified === false;
        if (activeUsersTable) return user.isActive === true;
        return false;
      });

      // Apply search term filter
      if (searchTerm) {
        filtered = filtered.filter(user =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredUsers(filtered);
    }
  }, [apidata, UsersTable, verified, notverified, activeUsersTable, searchTerm]);

  const totalUsers = apidata?.data?.length || 0;
  const verifiedUsers = apidata?.data?.filter(data => data.emailVerified === true).length || 0;
  const notverifiedUsers = apidata?.data?.filter(data => data.emailVerified === false).length || 0;
  const activeUsersCount = apidata?.data?.filter(data => data.isActive === true).length || 0;

  // Handlers to toggle between tables
  const toggleActiveUsersTable = () => {
    userRef?.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveUsersTable(true);
    setUsersTable(false);
    setNotverified(false);
    setVerified(false);
  };

  const toggleUsersTable = () => {
    userRef?.current?.scrollIntoView({ behavior: 'smooth' });
    setUsersTable(true);
    setActiveUsersTable(false);
    setNotverified(false);
    setVerified(false);
  };

  const togglenotverifiedUsersTable = () => {
    userRef?.current?.scrollIntoView({ behavior: 'smooth' });
    setNotverified(true);
    setUsersTable(false);
    setActiveUsersTable(false);
    setVerified(false);
  };

  const toggleVerifiedTable = () => {
    userRef?.current?.scrollIntoView({ behavior: 'smooth' });
    setNotverified(false);
    setUsersTable(false);
    setActiveUsersTable(false);
    setVerified(true);
  };

  const handleViewMore = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className='container m-auto'>
      <div className='bg-[#17519b] p-8 border rounded-[20px]'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:h-[400px] h-auto'>
          <div className='rounded-[20px] border bg-white p-4' onClick={toggleUsersTable} style={{ cursor: 'pointer' }}>
            <h1 className='text-2xl font-bold text-gray-500'>Total Users</h1>
            <h1 className='lg:text-[50px] sm:text-[20px] font-bold'>{totalUsers}</h1>
          </div>
          <div className='rounded-[20px] border bg-white p-4'>
            <h1 className='text-2xl font-bold text-gray-500' onClick={toggleVerifiedTable} style={{ cursor: 'pointer' }}>Verified Users</h1>
            <h1 className='lg:text-[50px] sm:text-[20px] font-bold' onClick={toggleVerifiedTable} style={{ cursor: 'pointer' }}>{verifiedUsers}</h1>
            <div className='pt-[30px]'>
              <div className='flex justify-around text-[20px] font-bold gap-[20px]'>
                <h3 className='text-gray-500' onClick={toggleVerifiedTable} style={{ cursor: 'pointer' }}>Email Verified Users</h3>
                <h3 className='text-gray-500' onClick={togglenotverifiedUsersTable} style={{ cursor: 'pointer' }}>Email Not-Verified Users</h3>
              </div>
              <div className='flex justify-around text-[20px] font-bold gap-[20px]'>
                <h4 onClick={toggleVerifiedTable} style={{ cursor: 'pointer' }}>{verifiedUsers}</h4>
                <h4 onClick={togglenotverifiedUsersTable} style={{ cursor: 'pointer' }}>{notverifiedUsers}</h4>
              </div>
            </div>
          </div>
          <div className='rounded-[20px] border bg-white p-4'>
            <h1 className='text-2xl font-bold text-gray-500' onClick={toggleActiveUsersTable} style={{ cursor: 'pointer' }}>Active Users</h1>
            <h1 className='lg:text-[50px] sm:text-[20px] font-bold' onClick={toggleActiveUsersTable} style={{ cursor: 'pointer' }}>{activeUsersCount}</h1>
          </div>
          <div className='rounded-[20px] border bg-white p-4'>
            <h1 className='text-2xl font-bold text-gray-500'>Placeholder Content</h1>
          </div>
          <div className='rounded-[20px] border bg-white p-4 lg:col-span-2'>
            <h1 className='text-2xl font-bold text-gray-500'>Blocked Users</h1>
          </div>
        </div>
      </div>

      {chartData ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { height: '400px' } }}
        />
      ) : (
        <div>Loading chart data...</div>
      )}

      <div ref={userRef} className='pt-[30px]'>


        {/* Display User Tables */}
        {activeUsersTable && (
          <div className='pt-12'>
            <h1 className='font-bold mb-6 text-blue-700 lg:text-[50px] md:text-[30px] sm:text-[25px]' style={{ fontFamily: "Nunito, sans-serif" }}>Active Users</h1>
            {/* Search Box */}
            <div className="flex justify-end mb-4">
              <input
                type="text"
                placeholder="Search by username or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                style={{ maxWidth: '300px' }}
              />
            </div>  <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-100 text-[20px]'>
                  <th className='p-3 text-left border-b'>No.</th>
                  <th className='p-3 text-left border-b'>Name</th>
                  <th className='p-3 text-left border-b'>Email</th>
                  <th className='p-3 text-left border-b'>Status</th>
                  <th className='p-3 text-left border-b'>Actions</th> {/* Add Actions column */}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.userId} className='hover:bg-gray-50 text-[20px]'>
                    <td className='p-3'>{index + 1}</td>
                    <td className='p-3'>{user.username}</td>
                    <td className='p-3'>{user.email}</td>
                    <td className='p-3'>{user.isActive ? 'Active' : 'Inactive'}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => handleViewMore(user)}
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {verified && (
          <div className='pt-12'>
            <h1 className='font-bold mb-6 text-blue-700 lg:text-[50px] md:text-[30px] sm:text-[25px]' style={{ fontFamily: "Nunito, sans-serif" }}>Verified Users</h1>
            {/* Search Box */}
            <div className="flex justify-end mb-4">
              <input
                type="text"
                placeholder="Search by username or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                style={{ maxWidth: '300px' }}
              />
            </div> <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-100 text-[20px]'>
                  <th className='p-3 text-left border-b'>No.</th>
                  <th className='p-3 text-left border-b'>Name</th>
                  <th className='p-3 text-left border-b'>Email</th>
                  <th className='p-3 text-left border-b'>Status</th>
                  <th className='p-3 text-left border-b'>Actions</th> {/* Add Actions column */}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.userId} className='hover:bg-gray-50 text-[20px]'>
                    <td className='p-3'>{index + 1}</td>
                    <td className='p-3'>{user.username}</td>
                    <td className='p-3'>{user.email}</td>
                    <td className='p-3'>{user.isActive ? 'Active' : 'Inactive'}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => handleViewMore(user)}
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {UsersTable && (
          <div className='pt-12'>
            <h1 className='font-bold mb-6 text-blue-700 lg:text-[50px] md:text-[30px] sm:text-[25px]' style={{ fontFamily: "Nunito, sans-serif" }}>Total Users</h1>
            {/* Search Box */}
            <div className="flex justify-end mb-4">
              <input
                type="text"
                placeholder="Search by username or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                style={{ maxWidth: '300px' }}
              />
            </div>  <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-100 text-[20px]'>
                  <th className='p-3 text-left border-b'>No.</th>
                  <th className='p-3 text-left border-b'>Name</th>
                  <th className='p-3 text-left border-b'>Email</th>
                  <th className='p-3 text-left border-b'>Status</th>
                  <th className='p-3 text-left border-b'>Actions</th> {/* Add Actions column */}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.userId} className='hover:bg-gray-50 text-[20px]'>
                    <td className='p-3'>{index + 1}</td>
                    <td className='p-3'>{user.username}</td>
                    <td className='p-3'>{user.email}</td>
                    <td className='p-3'>{user.isActive ? 'Active' : 'Inactive'}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => handleViewMore(user)}
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {notverified && (
          <div className='pt-12'>
            <h1 className='font-bold mb-6 text-blue-700 lg:text-[50px] md:text-[30px] sm:text-[25px]' style={{ fontFamily: "Nunito, sans-serif" }}>Not Verified Users</h1>
            {/* Search Box */}
            <div className="flex justify-end mb-4">
              <input
                type="text"
                placeholder="Search by username or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                style={{ maxWidth: '300px' }}
              />
            </div>  <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-100 text-[20px]'>
                  <th className='p-3 text-left border-b'>No.</th>
                  <th className='p-3 text-left border-b'>Name</th>
                  <th className='p-3 text-left border-b'>Email</th>
                  <th className='p-3 text-left border-b'>Status</th>
                  <th className='p-3 text-left border-b'>Actions</th> 
                  {/* Add Actions column */}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.userId} className='hover:bg-gray-50 text-[20px]'>
                    <td className='p-3'>{index + 1}</td>
                    <td className='p-3'>{user.username}</td>
                    <td className='p-3'>{user.email}</td>
                    <td className='p-3'>{user.emailVerified ? 'Verified' : 'Not Verified'}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => handleViewMore(user)}
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
