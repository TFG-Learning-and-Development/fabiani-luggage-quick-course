export const config = {
  peopleConnectUrl: '',
  storageKey: 'fabiani-luggage:progress:v1',
  storageVersion: 1,
};

export const sections = [
  { id: 'overview', label: 'Overview', nav: 'overview' },
  { id: 'customer-moment', label: 'Customer Moment', nav: 'customer-moment' },
  { id: 'product-range', label: 'Product Range', nav: 'product-range' },
  { id: 'product-basics', label: 'Product Basics', nav: 'product-basics' },
  { id: 'how-to-sell', label: 'How to Sell', nav: 'how-to-sell' },
  { id: 'conversation', label: 'Customer conversation', nav: 'how-to-sell' },
  { id: 'assessment', label: 'Assessment', nav: '' },
] as const;

export const navigation = ['overview', 'customer-moment', 'product-basics', 'product-range', 'how-to-sell'] as const;
export const asset = (name: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/${name}.webp`;
