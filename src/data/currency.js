export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateToINR: 1.0 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateToINR: 83.5 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateToINR: 91.2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateToINR: 108.4 }
};

export function convertFromINR(amountINR, targetCurrencyCode = 'INR') {
  const curr = CURRENCIES[targetCurrencyCode] || CURRENCIES.INR;
  if (curr.code === 'INR') return amountINR;
  return Number((amountINR / curr.rateToINR).toFixed(2));
}

export function formatCurrency(amountINR, targetCurrencyCode = 'INR') {
  const curr = CURRENCIES[targetCurrencyCode] || CURRENCIES.INR;
  const val = convertFromINR(amountINR, targetCurrencyCode);
  return `${curr.symbol}${val.toLocaleString()}`;
}
