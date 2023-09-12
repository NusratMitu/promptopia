import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GooglePRovider from 'next-auth/providers/google';

console.log({ clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET});
    
const handler = NextAuth({
    providers: [GooglePRovider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
],
async session({session}) {
    const sessionUser = await User.findOne({
        email: session.user.email // get the current email from the session
    })
    session.user.id = sessionUser._id.toString()
    return session
},

async signIn({profile}) {
try {
  await connectToDB();
    // check if a user is already exist
    const UserExists = await User.findOne({
        email: profile.email
    })

    //if not create a new user
    if(!UserExists) {
        await User.create({
            email: profile.email, 
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
        })
    }
    return true;
}
cache (error) {
console.log(error);
return false
}
}})

export { handler as GET, handler as POST };

