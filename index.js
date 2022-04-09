require('dotenv').config();
const httpClient = require('axios').default;

const { logger } = require('./infrastructure');

const { API_LOGIN_ENDPOINT, API_USER, API_PASSWORD } = process.env;

const getAuthToken = async (username, password) => {
  const { data } = await httpClient.request({
    method: 'post',
    url: API_LOGIN_ENDPOINT,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ username, password }),
  });

  return data;
};

const main = async () => {
  logger.info('Hello world');
  const auth = await getAuthToken(API_USER, API_PASSWORD);
  logger.info(auth);
};

(() => main())();
