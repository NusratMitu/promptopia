'use client'
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
    const isUserLoggedIn = true
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
    console.log({toggleDropdown});
 const handleClick = () => { 
   console.log("hghjghjghjgj")
 }
  return (
    <>
    <button type="submit" onClick={()=> console.log("dgdrgreer")}>Click</button>
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
    
      {/* pc navigation */}
      <div className="sm:flex hidden">
{
    isUserLoggedIn ?
    (<div className="flex gap-3 md:gap-5">
        <Link href={`/create-prompt`} className="black_btn">
        Create Post
        </Link>
        <button type="button" 
        cursor="pointer"
        onClick={handleClick} 
        // onClick={()=> signOut} 
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
    isUserLoggedIn ?
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

