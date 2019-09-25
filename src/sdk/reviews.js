import axios from 'axios'

const config = {
  baseUrl: process.env.REVIEW_SERVICE_URL + '/v1',
  resources: {
    products: {
      path: '/products',
    },
    reviews: {
      path: '/reviews',
    },
    transactions: {
      path: '/transactions',
    },
    vendors: {
      path: '/vendors',
    },
  },
}

const instance = axios.create({
  baseURL: config.baseUrl,
})

/**
 * Returns a paginated list of all products.
 * @param {integer} [limit=50]
 * @param {integer} [offset=0]
 */
export const getProducts = async (
  limit = 50,
  offset = 0,
) => {
  return await instance.get(`${config.resources.products.path}?limit=${limit}&offset=${offset}`)
}

/**
 * Returns a single object with all of the product data.
 * @param {uuid} id
 */
export const getProductById = async(id) => {
  return await instance.get(`${config.resources.products.path}/${id}`)
}

/**
 * Returns a paginated list of all reviews.
 * @param {integer} [limit=50]
 * @param {integer} [offset=0]
 * @param {string} [searchText=] [Text to include in a fuzzy search on the review text field]
 * @param {string} [before=] [EXCLUSIVE created before date (YYYY-MM-DD)]
 * @param {string} [after=] [INCLUSIVE created after date (YYYY-MM-DD)]
 */
export const getReviews = async (
  limit = 50,
  offset = 0,
  searchText = undefined,
  before = undefined,
  after = undefined,
) => {
  let requestUrl = `${config.resources.reviews.path}?limit=${limit}&offset=${offset}`
  requestUrl += searchText ? `&text=${searchText}` : ''
  requestUrl += before ? `&before=${before}` : ''
  requestUrl += after ? `&after=${after}` : ''
  return await instance.get(requestUrl)
}

/**
 * Returns a single object with all of the review data.
 * @param {uuid} id
 */
export const getReviewById = async(id) => {
  return await instance.get(`${config.resources.reviews.path}/${id}`)
}

/**
 * Returns a paginated list of all transactions.
 * @param {integer} [limit=50]
 * @param {integer} [offset=0]
 */
export const getTransactions = async (
  limit = 50,
  offset = 0,
) => {
  return await instance.get(`${config.resources.transactions.path}?limit=${limit}&offset=${offset}`)
}

/**
 * Returns a single object with all of the transaction data.
 * @param {uuid} id
 */
export const getTransactionById = async(id) => {
  return await instance.get(`${config.resources.transactions.path}/${id}`)
}

/**
 * Returns a paginated list of all vendors.
 * @param {integer} [limit=50]
 * @param {integer} [offset=0]
 */
export const getVendors = async (
  limit = 50,
  offset = 0,
) => {
  return await instance.get(`${config.resources.vendors.path}?limit=${limit}&offset=${offset}`)
}

/**
 * Returns a single object with all of the vendor data.
 * @param {uuid} id
 */
export const getVendorById = async(id) => {
  return await instance.get(`${config.resources.vendors.path}/${id}`)
}
