function filterRates(selectedCurrencies, rates) {
  return selectedCurrencies.reduce(
    (res, key) => ({ ...res, [key]: rates[key] }),
    {}
  );
}
module.exports=filterRates