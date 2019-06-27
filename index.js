require('dotenv').config();
const getPage = require('./getPage')();
const utils = require('./utils');

const login = process.env.SMARTPASS_LOGIN;
const pass = process.env.SMARTPASS_PASSWORD;
const baseUrl = process.env.BASE_URL;

let portalPage;
let journeyPage;
let poPortal;
let poJourney;
(async () => {
  portalPage = await getPage();

  poPortal = require('./pageObjects/portal')(portalPage, baseUrl);

  await poPortal.login(login, pass);
  const isAuthorizedOnAPortal = await poPortal.isAuthorized();

  console.log(`I should be authorized on portal:`, isAuthorizedOnAPortal);

  await utils.sleep(5000);

  journeyPage = await getPage();
  poJourney = require('./pageObjects/journey')(journeyPage, baseUrl);

  await poJourney.openJourney('buy-a-home');
  const isAuthorizedOnJourney = await poJourney.isAuthorized();

  console.log(`I should be authorized on journey:`, isAuthorizedOnJourney);
})();