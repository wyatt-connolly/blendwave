'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import CartSlider from '../cart-slider'
import { getCart } from '@/lib/swell/cart'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { SignedIn, SignedOut } from '@clerk/nextjs/app-beta/client'

const Header = () => {
  const { data: cart, isLoading } = useSWR('cart', getCart)
  const [cartSliderIsOpen, setCartSliderIsOpen] = useState(false)

  return (
    <>
      <header className='relative z-10 text-stone-400'>
        <div className='bg-white'>
          <div className='border-b border-gray-200'>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <nav className='flex items-center justify-between h-16'>
                {/* Logo */}
                <div className='lg:flex lg:items-center'>
                  <Link href='/'>
                    <Image
                      src='https://www.freepnglogos.com/uploads/coffee-logo-png/coffee-logo-symbol-19.png'
                      alt=''
                      height={64}
                      width={64}
                    />
                  </Link>
                </div>

                {/* Nav links */}
                <ul className='flex items-center gap-10'>
                  <li className='text-sm font-medium tracking-wider uppercase'>
                    <Link href='/products'>Products</Link>
                  </li>
                </ul>

                {/* Shopping cart */}
                <div className='flex items-center justify-between gap-6'>
                  <button
                    className='flex items-center pl-4 gap-x-2'
                    onClick={() => setCartSliderIsOpen(open => !open)}
                  >
                    <ShoppingCartIcon className='h-7 w-7' />

                    {cart?.item_quantity ? (
                      <span className='flex items-center justify-center w-5 h-5 text-xs font-medium text-white rounded bg-sky-600'>
                        {cart?.item_quantity}
                      </span>
                    ) : null}
                  </button>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode='modal'>
                      <button className='rounded border border-gray-400 px-3 py-0.5'>
                        Sign in
                      </button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <CartSlider
        cart={cart}
        cartIsLoading={isLoading}
        open={cartSliderIsOpen}
        setCartSliderIsOpen={setCartSliderIsOpen}
      />
    </>
  )
}

export default Header
