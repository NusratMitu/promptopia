import NextAuth from "next-auth";
import GooglePRovider from 'next-auth/providers/google';
// import { connectToDB } from "@utils/database";

console.log({ clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET});
    
const handler = NextAuth({
    providers: [GooglePRovider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
],
async session({session}) {

},

async signIn({profile}) {
try {
    // 
}
cache (error) {
console.log(error);
}
}})

export { handler as GET, handler as POST };

