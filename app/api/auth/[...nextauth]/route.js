import NextAuth from "next-auth";
import GooglePRovider from 'next-auth/providers/google';

const handler = NextAuth({

    providers: [GooglePRovider({
        clientId:'',
        clientSecret: '',
    })
],
async session({session}) {

},

async signIn({profile}) {

}
})

export { handler as GET, handler as POST };
