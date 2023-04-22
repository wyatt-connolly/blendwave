'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSWRConfig } from 'swr'

import clsx from 'clsx'

import { Disclosure, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '@/lib/utils'
import { addToCart } from '@/lib/swell/cart'
import { Blinker } from './ui/loading'

const details = [
  {
    name: 'Features',
    items: [
      'Unique flavor profile: Blended coffee typically features a complex and nuanced taste that combines the best qualities of different coffee beans. A well-crafted blend can create a distinctive and unforgettable flavor profile that stands out from single-origin coffee.',
      'Consistent quality: Blended coffee can offer consistent quality and flavor, as the blend is designed to produce a consistent taste from batch to batch. This can be especially important for businesses that need to maintain a consistent product for their customers.',
      'Versatility: Blended coffee can be used in a wide range of brewing methods, including drip, espresso, French press, and more. This versatility makes blended coffee a convenient choice for coffee lovers who like to experiment with different brewing methods.',
      "Unique aroma: Blended coffee can have a unique aroma that sets it apart from other types of coffee. The aroma can be influenced by the blend's specific beans, roast level, and other factors.",
      'Balanced acidity: Blended coffee can offer a balanced acidity that is neither too high nor too low. This can make the coffee more enjoyable to drink and less likely to cause digestive issues.',   
    ]
  }
]

const Product = ({ product }) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(false)

  const isMutating = loading || isPending

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    await addToCart({
      product_id: product.id,
      quantity: 1
    })
    setLoading(false)
    mutate('cart')
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <section className='py-24'>
      <div className='container'>
        <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
          {/* Image gallery */}
          <Tab.Group as='div' className='flex flex-col-reverse'>
            {/* Image selector */}
            <div className='hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none'>
              <Tab.List className='grid grid-cols-4 gap-6'>
                {product.images.map(image => (
                  <Tab
                    key={image.id}
                    className='relative flex items-center justify-center h-24 text-sm font-medium uppercase bg-white rounded-md cursor-pointer text-stone-900 hover:bg-stone-50 focus:outline-none'
                  >
                    {({ selected }) => (
                      <>
                        <span className='sr-only'>
                          {' '}
                          {image?.file?.metadata}{' '}
                        </span>
                        <span className='absolute inset-0 overflow-hidden rounded-md'>
                          <Image
                            alt=''
                            fill
                            src={image?.file?.url}
                            className='object-cover object-center w-full h-full'
                          />
                        </span>
                        <span
                          className={clsx(
                            selected ? 'ring-sky-500' : 'ring-transparent',
                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                          )}
                          aria-hidden='true'
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className='w-full aspect-w-1 aspect-h-1'>
              {product.images?.map(image => (
                <Tab.Panel key={image.id}>
                  <Image
                    fill
                    src={image.file.url}
                    alt={image.file.metadata || ''}
                    className='object-cover object-center w-full h-full sm:rounded-lg'
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className='px-4 mt-10 sm:mt-16 sm:px-0 lg:mt-0'>
            <h1 className='text-3xl font-bold tracking-tight text-stone-900'>
              {product.name}
            </h1>

            <div className='mt-3'>
              <h2 className='sr-only'>Product information</h2>
              <p className='text-3xl tracking-tight text-stone-900'>
                {formatCurrency({ amount: product.price })}
              </p>
            </div>

            {/* Reviews */}
            <div className='mt-3'>
              <h3 className='sr-only'>Reviews</h3>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  {[0, 1, 2, 3, 4].map(rating => (
                    <StarIcon
                      key={rating}
                      className={clsx(
                        (product.rating || 4) > rating
                          ? 'text-yellow-500'
                          : 'text-stone-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden='true'
                    />
                  ))}
                </div>
                <p className='sr-only'>{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className='mt-6'>
              <h3 className='sr-only'>Description</h3>

              <div
                className='space-y-6 text-base text-stone-700'
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <form className='mt-6' onSubmit={handleSubmit}>
              <div className='flex mt-10 sm:flex-col1'>
                <button
                  type='submit'
                  disabled={isMutating}
                  className='flex items-center justify-center flex-1 max-w-xs px-8 py-3 text-base font-medium text-white border border-transparent rounded-md bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-stone-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-full'
                >
                  {isMutating ? <Blinker /> : 'Add to Cart'}
                </button>
              </div>
            </form>

            <section aria-labelledby='details-heading' className='mt-12'>
              <h2 id='details-heading' className='sr-only'>
                Additional details
              </h2>

              <div className='border-t divide-y divide-stone-200'>
                {details?.map(detail => (
                  <Disclosure as='div' key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className='relative flex items-center justify-between w-full py-6 text-left group'>
                            <span
                              className={clsx(
                                open ? 'text-sky-600' : 'text-stone-900',
                                'text-sm font-medium'
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className='flex items-center ml-6'>
                              {open ? (
                                <MinusIcon
                                  className='block w-6 h-6 text-sky-400 group-hover:text-sky-500'
                                  aria-hidden='true'
                                />
                              ) : (
                                <PlusIcon
                                  className='block w-6 h-6 text-stone-400 group-hover:text-stone-500'
                                  aria-hidden='true'
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as='div'
                          className='pb-6 prose-sm prose'
                        >
                          <ul role='list'>
                            {detail.items.map(item => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Product
