import { getProducts } from '@/lib/swell/products'
import Products from '../components/products'

export const metadata = {
  title: 'Products / BlendWave',
  description: 'Created by Wyatt Connolly'
}

const Page = async () => {
  const { results: products } = await getProducts({ page: 1 })

  return <Products products={products} />
}

export const revalidate = 60 // revalidate this page every 60 seconds

export default Page
