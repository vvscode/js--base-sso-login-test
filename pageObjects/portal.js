const utils = require('../utils');

module.exports = (page, baseUrl) => {
  const login = async (login, password) => {
    await page.goto(`${baseUrl}/`);
    await page.click('#dvUserMenu');
    await page.waitForSelector('button[type=submit]', {
      timeout: 60 * 1000,
    });
    await page.click('button[type=submit]');

    await page.waitForSelector('input[name="username"]', {
      timeout: 60 * 1000,
    });
    await page.click('input[name="username"]');
    await page.type('input[name="username"]', login);
    await page.click('input[name="password"]');
    await page.type('input[name="password"]', password);
    await utils.sleep(1000);
    await page.click('input[type=submit]');
  }

  const isAuthorized = async () => {
    try {
      await page.waitForSelector('#tamm-model', {
        timeout: 60 * 1000
      });
      await page.waitForSelector('.loggeduser', {
        timeout: 60 * 1000
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  return {
    login,
    isAuthorized,
  }
}