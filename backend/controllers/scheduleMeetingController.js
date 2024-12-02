import { Application } from "../models/applicationSchema.js";
import {ScheduleMeeting} from "../models/scheduleMeetingSchema.js";
import mongoose from "mongoose";

export const createScheduleMeeting = async(req,res)=>{
    try {

        const{name,email,date,applicationId,jobSeekerEmail} = req.body;

        if(!name || !email || !date ||!applicationId||!jobSeekerEmail){
            return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
        }

        const newscheduleMeeting = await ScheduleMeeting.create({
            name,email,date,applicationId,jobSeekerEmail
        })
        
        const {id} = req.params;
        console.log("Application Id: ",id)
        const updateApplication = await Application.findByIdAndUpdate(
            id,
            { scheduleMeeting: newscheduleMeeting._id },
            { new: true }
          ).populate('scheduleMeeting');


        return res.status(200).json({
			success: true,
			newscheduleMeeting,
            updateApplication,
			message: "Meeting Schedule successfully",
		});
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Internal server error",
			error: error.message,
        })
    }
}