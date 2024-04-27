import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userName = await getDataFromToken(request);
        console.log(userName);
        const userInfo = await User.findOne({username: userName}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: userInfo
        })
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({error: error.message}, {status: 400});
    }
}