/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomView}
 */
const config = {
  name: 'Crm Integration',
  cloudIdentifier: 'gcp-eu',
  env: {
    development: {
      initialProjectKey: 'b2b-demo-fr',
    },
    production: {
      customViewId: 'clysrp6th0023bqy5trwebd54',
      url: 'https://crm-integration.netlify.app/',
    },
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },
  type: 'CustomPanel',
  typeSettings: {
    size: 'LARGE',
  },
  locators: ['orders.order_details.general'],
};

export default config;
