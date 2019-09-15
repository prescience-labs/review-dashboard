const latestReviewTable = {
  title: 'Latest Reviews',
  willPaginate: true,
  theaders: ['Store', 'Purchase Price', 'Review', 'Purchaser', ''],
  rows: [
    {
      store: {
        name: 'Amazon',
        img: 'https://www.vectorlogo.zone/logos/amazon/amazon-tile.svg'
      },
      purchasePrice: '$2,500 USD',
      status: 'pending',
      avatar: {
        id: 'tooltip1',
        name: 'Jessica Doe',
        img: require("../assets/img/theme/team-4-800x800.jpg")
      }
    },
    {
      store: {
        name: 'WooCommerce',
        img: 'https://wordpress.2bearstudio.com/wp-content/uploads/2013/09/logo-woocommerce.jpg'
      },
      purchasePrice: '$1,800 USD',
      status: 'completed',
      avatar: {
        id: 'tooltip2',
        name: 'Ryan Tompson',
        img: require("../assets/img/theme/team-1-800x800.jpg")
      }
    },
    {
      store: {
        name: 'Shopify',
        img: 'https://www.floydconsultancy.com/wp-content/uploads/2019/04/shopify-logo-600x600.jpg'
      },
      purchasePrice: '$3,150 USD',
      status: 'delayed',
      avatar: {
        id: 'tooltip3',
        name: 'Romina Hadid',
        img: require("../assets/img/theme/team-2-800x800.jpg")
      }
    },
    {
      store: {
        name: 'eBay',
        img: 'data:image/png;base64,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'
      },
      purchasePrice: '$4,400 USD',
      status: 'schedule',
      avatar: {
        id: 'tooltip4',
        name: 'Alexander Smith',
        img: require("../assets/img/theme/team-3-800x800.jpg")
      }
    },
    {
      store: {
        name: 'Shopify',
        img: 'https://www.floydconsultancy.com/wp-content/uploads/2019/04/shopify-logo-600x600.jpg'
      },
      purchasePrice: '$2,200 USD',
      status: 'completed',
      avatar: {
        id: 'tooltip5',
        name: 'Ryan Tompson',
        img: require("../assets/img/theme/team-1-800x800.jpg")
      }
    }
  ]
}

const storeReviewsTable = {
  title: 'Reviews by Store',
  willPaginate: false,
  theaders: ['Referral', 'Visitors', ''],
  rows: [
    {
      store: {
        name: 'Facebook',
        visitors: '1,480',
        value: 60,
        progessColor: 'bg-gradient-danger'
      }
    },
    {
      store: {
        name: 'Facebook',
        visitors: '5,480',
        value: 70,
        progessColor: 'bg-gradient-success'
      }
    },
    {
      store: {
        name: 'Google',
        visitors: '4,807',
        value: 80,
        progessColor: ''
      }
    },
    {
      store: {
        name: 'Instagram',
        visitors: '3,678',
        value: 75,
        progessColor: 'bg-gradient-info'
      }
    },
    {
      store: {
        name: 'Twitter',
        visitors: '2,645',
        value: 30,
        progessColor: 'bg-gradient-warning'
      }
    }
  ]
}

export default {
  latestReviewTable,
  storeReviewsTable
}
