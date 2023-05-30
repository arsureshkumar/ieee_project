"use client";

import { getAllUsers } from "@/api-handler/api-handlers";
import React, { useState, useEffect, useRef } from "react";

export default function AllUsers() {

    const [users, setUsers] = useState([]);
    console.log(users)
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await getAllUsers();
            setUsers(response.users);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };

        fetchUsers();

    }, []);

    return (
        <body>
            <div className="grid gap-2">
                {users.map(user => (
                    <>
                    <h1> {user.username} </h1>
                    <img className="w-1/2" src={user.head_shot} />
                    </>
                ))}
            </div>

        </body>    
    )

}