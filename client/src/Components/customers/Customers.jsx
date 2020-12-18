import React, {useState, useEffect} from 'react';
import axios from 'axios';


function Customers(){
    const [users, setUsers] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            const users = await axios('/api/customers',);
            setUsers(users.data);
        }
        fetchData();
    }, []);
    
    return(
        <div>
            <ul>
                {users.map((user) => {
                    return(<li>{user.name}</li>);
                })}
            </ul>
        </div>
    )
}

export default Customers;