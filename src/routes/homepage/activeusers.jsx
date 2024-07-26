import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Activeusers = () => {
    const [userdata, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const adminUrl = 'http://103.181.21.93:8099/api/v1/admin/user/list';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(adminUrl);
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (userdata) {
            const activeUsers = userdata.data.filter(data => data.isActive === true);
            setFilteredUsers(activeUsers);
        }
    }, [userdata]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredUsers(userdata?.data?.filter(data => data.isActive === true) || []);
        } else {
            const filtered = userdata?.data?.filter(item =>
                item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase())
            ).filter(data => data.isActive === true);
            setFilteredUsers(filtered);
        }
    }, [searchTerm, userdata]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400&display=swap" rel="stylesheet" />

            <div className='pt-12'>
                <h1 className='font-bold mb-6 text-blue-700 lg:text-[50px] md:text-[30px] sm:text-[25px]' style={{ fontFamily: "Nunito, sans-serif" }}>Active Users</h1>
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
                <div className="overflow-x-auto">
                    <table className='w-full border-collapse border border-gray-300'>
                        <thead className='bg-gray-200'>
                            <tr className='text-center border border-black'>
                                <th className='px-4 py-2 text-left text-blue-700 font-bold bg-gray-300 lg:text-[30px] sm:text-[17px] md:text-[20px]'>User Name</th>
                                <th className='px-4 py-2 text-left text-blue-700 font-bold bg-gray-300 lg:text-[30px] sm:text-[17px] md:text-[20px]'>Email Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={index} className={`text-center border border-black ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                    <td className='px-4 py-2 text-left lg:text-[25px] sm:text-[17px] md:text-[20px]' style={{ fontFamily: 'Nunito, sans-serif' }}>{user.username}</td>
                                    <td className='px-4 py-2 text-left lg:text-[25px] sm:text-[17px] md:text-[20px]' style={{ fontFamily: 'Nunito, sans-serif' }}>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Activeusers;
