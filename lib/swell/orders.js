import swell from './client'

export const getOrders = async id => {
  return await swell.cart.getOrder(id)
}
