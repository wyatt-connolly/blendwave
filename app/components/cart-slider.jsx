'use client'

import { Fragment, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Blinker } from './ui/loading'
import { formatCurrency } from '@/lib/utils'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { removeFromCart } from '@/lib/swell/cart'
import { useSWRConfig } from 'swr'

const CartSlider = ({ cart, cartIsLoading, open, setCartSliderIsOpen }) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(false)
  const isMutating = loading || isPending

  const removeItem = async itemId => {
    setLoading(true)
    await removeFromCart(itemId)
    setLoading(false)
    mutate('cart')
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setCartSliderIsOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='w-screen max-w-md pointer-events-auto'>
                  <div className='flex flex-col h-full overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 px-4 py-6 overflow-y-auto sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          {' '}
                          Shopping cart{' '}
                        </Dialog.Title>
                        <div className='flex items-center ml-3 h-7'>
                          <button
                            type='button'
                            className='p-2 -m-2 text-gray-400 hover:text-gray-500'
                            onClick={() => setCartSliderIsOpen(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='w-6 h-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='-my-6 divide-y divide-gray-200'
                          >
                            {cart?.items?.length > 0 &&
                              cart.items.map(item => (
                                <li key={item.id} className='flex py-6'>
                                  <div className='relative flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md'>
                                    <Image
                                      src={item.product.images[0].file.url}
                                      alt={item.product.name}
                                      className='object-cover object-center w-full h-full'
                                      layout='fill'
                                    />
                                  </div>

                                  <div className='flex flex-col flex-1 ml-4'>
                                    <div>
                                      <div className='flex justify-between text-base font-medium text-gray-900'>
                                        <h3>
                                          <a
                                            href={`/products/${item.product.slug}`}
                                          >
                                            {' '}
                                            {item.product.name}{' '}
                                          </a>
                                        </h3>
                                        <p className='ml-4'>
                                          {formatCurrency({
                                            amount: item.price_total
                                          })}
                                        </p>
                                      </div>
                                      <p className='mt-1 text-sm text-gray-500'>
                                        {item.product.name}
                                      </p>
                                    </div>
                                    <div className='flex items-end justify-between flex-1 text-sm'>
                                      <p className='text-gray-500'>
                                        Qty {item.quantity}
                                      </p>

                                      <div className='flex'>
                                        <button
                                          type='button'
                                          disabled={isMutating}
                                          onClick={() => removeItem(item.id)}
                                          className='font-medium text-pink-600 hover:text-pink-500 disabled:cursor-not-allowed disabled:opacity-50'
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='px-4 py-6 border-t border-gray-200 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Subtotal</p>
                        <p>
                          {formatCurrency({ amount: cart?.sub_total || 0 })}
                        </p>
                      </div>
                      <p className='mt-0.5 text-sm text-gray-500'>
                        Shipping and taxes calculated at checkout.
                      </p>

                      {cart?.checkout_url && (
                        <div className='mt-6'>
                          <Link href={cart.checkout_url}>
                            <button
                              disabled={cartIsLoading}
                              className='flex items-center justify-center w-full h-12 px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-75'
                            >
                              {cartIsLoading ? <Blinker /> : 'Checkout'}
                            </button>
                          </Link>
                        </div>
                      )}

                      <div className='flex justify-center mt-6 text-sm text-center text-gray-500'>
                        <p>
                          or{' '}
                          <button
                            type='button'
                            className='font-medium text-cyan-600 hover:text-cyan-500'
                            onClick={() => setCartSliderIsOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CartSlider
