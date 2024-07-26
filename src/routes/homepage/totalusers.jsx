import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Totalusers = ({ ref }) => {
    const [userdata, setUserData] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const adminUrl = 'http://103.181.21.93:8099/api/v1/admin/user/list';

    useEffect(() => {
        axios.post(adminUrl).then((response) => {
            setUserData(response.data);
        });
    }, []);

    useEffect(() => {
        if (userdata) {
            const filteredUsers = userdata.data.filter(item =>
                item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filteredUsers);
        }
    }, [userdata, searchTerm]);

    const Totaluser = filteredUsers.map(item => item.username);
    const MailId = filteredUsers.map(item => item.email);

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />

            <div ref={ref} className='pt-[30px]'>
                <h1 className=' font-bold mb-6 text-blue-700 lg:text-[50px]  md:text-[30px] sm:text-[25px]' style={{ fontFamily: "Nunito, sans-serif" }}>Total Users</h1>
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="Search by username or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        style={{ maxWidth: '300px' }}
                    />
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
                    <thead style={{ backgroundColor: '#f2f2f2' }}>
                        <tr className='text-center border-2 border-black'>
                            <th className='px-4 py-2 text-left text-blue-700 font-bold bg-gray-300 lg:text-[30px] sm:text-[17px] md:text-[20px]'>User Name</th>
                            <th className='px-4 py-2 text-left text-blue-700 font-bold bg-gray-300 lg:text-[30px] sm:text-[17px] md:text-[20px]'>Email Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Totaluser.map((username, index) => (
                            <tr className='text-center border-2 border-black' key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                                <td className='px-4 py-2 text-left lg:text-[25px] sm:text-[17px] md:text-[20px]' style={{ fontFamily: 'Nunito, sans-serif' }}>{username}</td>
                                <td className='px-4 py-2 text-left lg:text-[25px] sm:text-[17px] md:text-[20px]' style={{ fontFamily: 'Nunito, sans-serif' }}>{MailId[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Totalusers;
