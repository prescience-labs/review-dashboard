export default {
  api: {
    reviewBaseUrl: process.env.REACT_APP_REVIEW_SERVICE_URL,
    authBaseUrl: process.env.REACT_APP_AUTH_SERVICE_URL
  },
  baseUrl: process.env.REACT_APP_REVIEW_SERVICE_URL + "/v1",
  integrationsUrl: process.env.REACT_APP_REVIEW_PROXY,
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
