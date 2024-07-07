import React, {useState} from "react";
import {Button} from "./Button";
import { Link } from "react-router-dom";

export const Appbar = () => {
    return (
        <div className="flex justify-between h-14 shadow">
            <div className="flex flex-col justify-center h-full ml-4">
                <h1>PayTM App</h1>
            </div>
            <div className="flex flex-col justify-center mr-4">
                <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    <p>Hello</p>
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
                </div>   
            </div>
        </div>
    )
}

export const Balance = ({balance}) => {
    return (
        <div className="flex flex-col justify-center text-left px-2 h-12">
            <div className="flex ">
                <p className="text-lg font-medium text-gray-900">Your balance: Rs {balance}</p>
            </div>
        </div>
    )
}

export const Users = () => {
    const [users, setUsers] = useState([{
        firstName: "John",
        lastName: "Doe",
        _id: "1",
    }]);

    return (
        <div className=" h-max px-2">
            <div className="text-lg text-gray-900 font-bold text-left mt-6">
                Users
            </div>
            <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div className="mt-3">
                {users.map(user => <User user={user}/>)}
            </div>
        </div>
    )
}

function User({user}) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Link to={'/send'}>
                <Button children={"Send Money"} />
            </Link>
            
        </div>
    </div>
}

