const httpClient = require('axios').default;

const { API_BASE_URL, API_USER, API_PASSWORD } = process.env;

const getAuth = async (username, password) => {
  const { data: { data } } = await httpClient.request({
    method: 'post',
    url: `${API_BASE_URL}/login`,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ username, password }),
  });

  return data;
};

const getUnreportedBills = async () => {
  const auth = await getAuth(API_USER, API_PASSWORD);

  const { data } = await httpClient.request({
    method: 'get',
    url: `${API_BASE_URL}/bills/unreported`,
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': auth.userId,
      'X-Auth-Token': auth.authToken,
    },
  });

  return data;
};

module.exports = { getUnreportedBills };
