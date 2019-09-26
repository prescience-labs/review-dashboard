import axios from "axios";

const config = {
  baseUrl: process.env.REACT_APP_REVIEW_SERVICE_URL + "/v1",
  resources: {
    products: {
      path: "/products"
    },
    reviews: {
      path: "/reviews"
    },
    transactions: {
      path: "/transactions"
    },
    vendors: {
      path: "/vendors"
    }
  }
};

const instance = axios.create({
  baseURL: config.baseUrl
});

/**
 * Returns a paginated list of all products.
 * @param {integer} [limit=50]
 * @param {integer} [offset=0]
 */
export const getProducts = async (limit = 50, offset = 0) => {
  return await instance.get(
    `${config.resources.products.path}?limit=${limit}&offset=${offset}`
  );
};

/**
 * Returns a single object with all of the product data.
 * @param {uuid} id
 */
export const getProductById = async id => {
  return await instance.get(`${config.resources.products.path}/${id}`);
};

/**
 * Returns a paginated list of all reviews.
 * @param {integer} [limit=50]
 * @param {integer} [offset=0]
 * @param {string} [searchText=] [Text to include in a fuzzy search on the review text field]
 * @param {string} [before=] [EXCLUSIVE created before date (YYYY-MM-DD)]
 * @param {string} [after=] [INCLUSIVE created after date (YYYY-MM-DD)]
 */
/**
  "id": "b944b9e3-a368-4af4-b39f-d65ee4a2f39b",
            "product": null,
            "transaction": null,
            "text": "The pretty bracelet is comfortable to wear.  It is a pretty color cut in square chunks.  Looks like real turquoise.",
            "rating": 5,
            "rating_max": 5,
            "analytics_id": "73f19c88-e473-4da0-85f2-7ba533dc0790",
            "sentiment_analysis": {}
            "created_at": "2019-09-25T00:45:41.295458Z",
            "updated_at": "2019-09-25T03:02:40.461594Z",
            "vendor": "7770eaec-dc1b-42dd-b7d2-0b853a2f8891"
 */
export interface IReview {
  id: string;
  product: undefined;
  transaction: undefined;
  text: string;
  rating: number;
  rating_max: number;
  analytics_id: string;
  sentiment_analysis: object;
  created_at: string;
  updated_at: string;
  vendor: string;
}
export const getReviews = async (
  limit = 500,
  offset = 0,
  searchText = undefined,
  before = undefined,
  after = undefined
): Promise<IReview[]> => {
  let requestUrl = `${config.resources.reviews.path}?limit=${limit}&offset=${offset}`;
  requestUrl += searchText ? `&text=${searchText}` : "";
  requestUrl += before ? `&before=${before}` : "";
  requestUrl += after ? `&after=${after}` : "";
  const { data } = await instance.get(requestUrl);
  return data.results;
};

/**
 * Returns a single object with all of the review data.
 * @param {uuid} id
 */
export const getReviewById = async id => {
  return await instance.get(`${config.resources.reviews.path}/${id}`);
};

/**
 * Returns a paginated list of all transactions.
 * @param {integer} [limit=50]
 * @param {integer} [offset=0]
 */
export const getTransactions = async (limit = 50, offset = 0) => {
  return await instance.get(
    `${config.resources.transactions.path}?limit=${limit}&offset=${offset}`
  );
};

/**
 * Returns a single object with all of the transaction data.
 * @param {uuid} id
 */
export const getTransactionById = async id => {
  return await instance.get(`${config.resources.transactions.path}/${id}`);
};

/**
 * Returns a paginated list of all vendors.
 * @param {integer} [limit=50]
 * @param {integer} [offset=0]
 */
export const getVendors = async (limit = 50, offset = 0) => {
  return await instance.get(
    `${config.resources.vendors.path}?limit=${limit}&offset=${offset}`
  );
};

/**
 * Returns a single object with all of the vendor data.
 * @param {uuid} id
 */
export const getVendorById = async id => {
  return await instance.get(`${config.resources.vendors.path}/${id}`);
};
