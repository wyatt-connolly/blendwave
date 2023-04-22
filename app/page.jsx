import Image from 'next/image'
import heroImage from '@/public/images/hero.jpg'
import Link from 'next/link'

const offers = [
  {
    name: 'Download the app',
    description: 'Get an exclusive $5 off code',
    href: '#'
  },
  {
    name: "Return when you're ready",
    description: '60 days of free returns',
    href: '#'
  },
  {
    name: 'Sign up for our newsletter',
    description: '15% off your first order',
    href: '#'
  }
]

const perks = [
  {
    name: 'Free returns',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description:
      'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.'
  },
  {
    name: 'Same day delivery',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.'
  },
  {
    name: 'All year discount',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.'
  },
  {
    name: 'For the planet',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description:
      'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.'
  }
]

const Page = () => {
  return (
    <>
      <div className='bg-white'>
        <div className='flex flex-col border-b border-gray-200 lg:border-0'>
          <nav aria-label='Offers' className='order-last lg:order-first'>
            <div className='mx-auto max-w-7xl lg:px-8'>
              <ul
                role='list'
                className='grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0'
              >
                {offers.map(offer => (
                  <li key={offer.name} className='flex flex-col'>
                    <a
                      href={offer.href}
                      className='relative flex flex-col justify-center flex-1 px-4 py-6 text-center bg-white focus:z-10'
                    >
                      <p className='text-sm text-gray-500'>{offer.name}</p>
                      <p className='font-semibold text-gray-900'>
                        {offer.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className='relative'>
            <div
              aria-hidden='true'
              className='absolute hidden w-1/2 h-full bg-gray-100 lg:block'
            />
            <div className='relative bg-gray-100 lg:bg-transparent'>
              <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:grid lg:grid-cols-2 lg:px-8'>
                <div className='max-w-2xl py-24 mx-auto lg:max-w-none lg:py-64'>
                  <div className='lg:pr-16'>
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl'>
                    Experience Blendwave Coffee Shop
                    </h1>
                    <p className='mt-4 text-xl text-gray-600'>
                    At Blendwave Coffee Shop, we're dedicated to serving only the finest quality coffee beans that have been carefully sourced and roasted to perfection. Our expert baristas take pride in creating the perfect cup of coffee, and our warm and welcoming atmosphere makes us the go-to destination for coffee lovers everywhere.
                    </p>
                    <div className='mt-6'>
                      <Link
                        href='/products'
                        className='inline-block px-8 py-3 font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700'
                      >
                        Shop Products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full h-48 sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2'>
              <div className='relative w-full h-full'>
                <Image
                  src='https://images.unsplash.com/photo-1586848384751-aa8f7ee302c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80'
                  alt=''
                  className='object-cover object-center w-full h-full'
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section
        aria-labelledby='perks-heading'
        className='border-t border-gray-200 bg-gray-50'
      >
        <h2 id='perks-heading' className='sr-only'>
          Our perks
        </h2>

        <div className='px-4 py-24 mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0'>
            {perks.map(perk => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'
              >
                <div className='md:flex-shrink-0'>
                  <div className='flow-root'>
                    <img
                      className='w-auto h-24 mx-auto -my-1'
                      src={perk.imageUrl}
                      alt=''
                    />
                  </div>
                </div>
                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-gray-500'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
