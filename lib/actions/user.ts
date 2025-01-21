import User from "../models/user.model";

import {connect} from '../mongodb/mongoose'

interface EmailAddress {
    email_address: string;
    // Add other properties if needed
  }
export const CreateOrUpdateUser = async ( 
    Id:string,
    first_name:string,
    last_name:string,
    image_url:string,
    email_addresses: EmailAddress[],
    ) => {
   try {
    await connect();
    const user = await User.findOneAndUpdate(
        {clerkId:Id},
         {
            $set:{
                firstName:first_name,
                lastName:last_name,
                profilePicUrl:image_url,
                email:email_addresses[0].email_address
            }
        },{upsert:true, new:true}
    );
        return user;
   } catch (error) {
    console.log('Error: Could not create or update user:',error)
   }
    
}

export const deleteUser = async (Id:string)=>{
    try {
        await connect();
        await User.deleteOne({clerkId:Id});
    } catch (error) {
        console.log('Error: Could not delete user:',error)
    }
}