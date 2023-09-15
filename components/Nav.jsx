'use client'
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session} = useSession()
  console.log({session});
    // const isUserLoggedIn = true
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
      const serProviders = async () => {
        const response = await getProviders()
        setProviders(response)
      }
      setProviders()
    }, []);
    console.log({providers});
    // console.log({toggleDropdown});

  return (
    <>
   
         <nav className='flex-between w-full mb-16 pt-3'>
      <Link href={'/'} className='flex gap-2 flex-center'>
       <Image src={'/assets/images/logo.svg'}
       alt="logo"
       width={30}
       height={30}
       className="object-contain"
       />
        <p className='logo_text'>Promptopia</p>
      </Link>
    {alert(session?.user)}
      {/* pc navigation */}
      <div className="sm:flex hidden">
{
    session?.user ?
    (<div className="flex gap-3 md:gap-5">
        <Link href={`/create-prompt`} className="black_btn">
        Create Post
        </Link>
        <button type="button" 
        cursor="pointer"
        onClick={()=> signOut} 
        className="outline_btn"> Sign Out</button>
        <Link href={`/profile`}>
            <Image 
            src={`/assets/images/logo.svg`}
            width={37}
            height={37}
            alt="profile icon"
            />
             
        </Link>

    </div>)
    :
    (<>
    {
      providers && Object.values(providers).map(provider => (
        console.log(provider),
        <button
        type="button"
        key={provider.name}
        onClick={()=> signIn(provider.id)}
        className="black_btn"
        >
          Sign In
        </button>
      ))
    }
    </>)
}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
{
    session?.user ?
    (<div className="flex">
        
            <Image 
            src={`/assets/images/logo.svg`}
            width={37}
            height={37}
            alt="profile"
            onClick={() => setToggleDropdown(!toggleDropdown)}
              
            />
            {
              toggleDropdown && (
                <div className="dropdown">
                   <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                   <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                Create prompt
                </Link>
                
                <button type="button" 
        cursor="pointer"
        onClick={()=>{ setToggleDropdown(false);
          signOut()}} 
        className="black_btn mt-5 w-full"> Sign Out</button>
                </div>
              )
            }

    </div>)
    :
    (<>
    {
      providers && Object.values(providers).map(provider => (
        <button
        type="button"
        key={provider.name}
        onClick={()=> signIn(provider.id)}
        className="black_btn"
        >
          Sign In
        </button>
      ))
    }
    </>)
}
      </div>
      </nav>
    </>
  )
}

export default Nav

