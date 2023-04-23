import { getProductBySlugOrId } from '@/lib/swell/products'
import Product from '@/app/components/product'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata({ params, searchParams }) {
  // fetch data
  const product = await getProductBySlugOrId(params.slug)

  // return metadata
  return {
    title: `${product.name} / BlendWave`,
    description: product.description
  }
}

const Page = async ({ params }) => {
  const product = await getProductBySlugOrId(params.slug)

  return <Product product={product} />
}

export const revalidate = 60 // revalidate this page every 60 seconds

export default Page
