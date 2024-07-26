import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Graph from "./graph";
import User from "./routes/homepage/totalusers";
import Verifed from "./routes/homepage/verifiedusers";
import Notverified from "./routes/homepage/notverified"
import Active from "./routes/homepage/activeusers"

const App = () => {
  const [apidata, setApiData] = useState(null);
  const [verified,setVerified] = useState(false)
  const [activeUsersTable, setActiveUsersTable] = useState(false);
  const [UsersTable, setUsersTable] = useState(true);
  const [notverified, setNotverified] = useState(false);
  const adminUrl = 'http://103.181.21.93:8099/api/v1/admin/user/list';
  const userRef = useRef();
  useEffect(() => {
    axios.post(adminUrl)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const totalUsers = apidata?.data?.length || 0;
  const verifiedUsers = apidata?.data?.filter(data => data.emailVerified === true).length || 0;
  const notverifiedUsers = apidata?.data?.filter(data => data.emailVerified === false).length || 0;
  const activeUsersCount = apidata?.data?.filter(data => data.isActive === true).length || 0;


  const toggleActiveUsersTable = () => {
    userRef?.current?.scrollIntoView({ behavior: 'smooth' })

    setActiveUsersTable(true);
    setUsersTable(false);
    setNotverified(false);
    setVerified(false)
   
  };

  const toggleUsersTable = () => {
    document.getElementById("box");
    userRef?.current?.scrollIntoView({ behavior: 'smooth' })

    setUsersTable(true);
    setActiveUsersTable(false);
    setNotverified(false);
    setVerified(false)
  };

  const togglenotverifiedUsersTable = () => {
    userRef?.current?.scrollIntoView({ behavior: 'smooth' })

    setNotverified(true);
    setUsersTable(false);
    setActiveUsersTable(false);
    setVerified(false)

  };

  const toggleVerifiedTable = () => {
    userRef?.current?.scrollIntoView({ behavior: 'smooth' })

    setNotverified(false);
    setUsersTable(false);
    setActiveUsersTable(false);
    setVerified(true)

  };

  console.log(userRef, "userRef");

  return (
    <div className='  container m-auto'>
      <div className=' bg-[#17519b]  p-8 border rounded-[20px]'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:h-[400px] h-auto '>
          <div className=' rounded-[20px] border bg-white p-4' onClick={toggleUsersTable} style={{ cursor: 'pointer' }}>
            <h1 className='text-2xl font-bold  text-gray-500'>Total Users</h1>
            <h1 className='lg:text-[50px] sm:text-[20px] font-bold '>{totalUsers}</h1>
          </div>
          <div className=' rounded-[20px] border bg-white p-4 ' >
            <h1 className='text-2xl font-bold text-gray-500' onClick={toggleVerifiedTable} style={{ cursor: 'pointer' }}>Verified Users</h1>
            <h1 className='lg:text-[50px] sm:text-[20px] font-bold' onClick={toggleVerifiedTable} style={{ cursor: 'pointer' }}>{verifiedUsers}</h1>
            <div className='pt-[30px]'>
              <div className='flex justify-around text-[20px] font-bold gap-[20px]'>
                <h3 className=' text-gray-500' onClick={toggleVerifiedTable} style={{ cursor: 'pointer' }} >Email Verified Users</h3>
                <h3 className='  text-gray-500 ' onClick={togglenotverifiedUsersTable} style={{ cursor: 'pointer' }}>Email Not-Verified Users</h3>
              </div>
              <div className='flex justify-around text-[20px] font-bold gap-[20px]'>
                <h4 onClick={toggleVerifiedTable} style={{ cursor: 'pointer' }} >{verifiedUsers}</h4>
                <h4 className='' onClick={togglenotverifiedUsersTable} style={{ cursor: 'pointer' }} >{notverifiedUsers}</h4>
              </div>
            </div>
          </div>
          <div className=' rounded-[20px] border bg-white p-4'>
            <h1 className=' text-2xl font-bold text-gray-500' onClick={toggleActiveUsersTable} style={{ cursor: 'pointer' }}>Active Users</h1>
            <h1  className='lg:text-[50px] sm:text-[20px] font-bold' onClick={toggleActiveUsersTable} style={{ cursor: 'pointer' }}>{activeUsersCount}</h1>
          </div>
          <div className=' rounded-[20px] border bg-white p-4'>
            <h1 className='text-2xl font-bold text-gray-500'>Placeholder Content</h1>
          </div>
          <div className=' rounded-[20px] border bg-white p-4 lg:col-span-2'>
            <h1 className='text-2xl font-bold text-gray-500'>Blocked Users</h1>
          </div>
        </div>
      </div>

      <Graph />
      <div ref={userRef}></div> 


      <div>  
 {     activeUsersTable && <Active/>}
        {UsersTable && <User />}
        {  verified && <Verifed />}
        {notverified && <Notverified />}</div>
    </div>
  );
};

export default App;
