module.exports = (page, baseUrl) => {
  const openJourney = async (journeyUrl) => {
    await page.goto(`${baseUrl}/journeys/${journeyUrl}`);
    await page.waitForSelector('.header-wrapper', {
      delay: 60*1000
    })
  };

  const isAuthorized = async () => {
    try {
      await page.click('#uil-side-menu__toggle-bar');
      page.waitForSelector('.uil-smart-pass-button');
      return false;
    } catch(e) {
      return true;
    }
  }

  return {
    openJourney,
    isAuthorized,
  }
}