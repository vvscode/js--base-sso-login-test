const puppeteer = require('puppeteer');

module.exports = () => {
  const browser = puppeteer.launch({
    headless: false,
  });

  return () => browser.then((browser) => browser.newPage());
};