"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import React, {useState} from "react";
import { useRouter } from "next/navigation";
export default function ProfilePage() {

    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout Successful");
            router.push('/login');
        }
        catch(err : any) {
            console.log(err.message);
            toast.error(err.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/getInfo');  
        console.log(res.data);
        setData(res.data.data.username);
    }

    return (
        <div className="flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2>{data === 'nothing' ? "Nothing" : 
            <Link href={`/profile/${data}`}>Link to User Profile</Link>
            }</h2>
            <hr />
            <button
            onClick={logout}
            className="bg-blue-500 nt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            <button
            onClick={getUserDetails}
            className="bg-green-700 nt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get User Details</button>
        </div>
    )
}