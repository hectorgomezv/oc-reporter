const httpClient = require('axios').default;

const { API_BASE_URL, API_USER, API_PASSWORD } = process.env;

let currentAuth;

const getAuth = async (username, password) => {
  if (!currentAuth) {
    const { data: { data } } = await httpClient.request({
      method: 'post',
      url: `${API_BASE_URL}/login`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ username, password }),
    });

    currentAuth = data;
  }

  return currentAuth;
};

const getCommonHeaders = ({ userId, authToken }) => ({
  'Content-Type': 'application/json',
  'X-User-Id': userId,
  'X-Auth-Token': authToken,
});

const getUnreportedBills = async () => {
  const auth = await getAuth(API_USER, API_PASSWORD);

  const { data } = await httpClient.request({
    method: 'get',
    url: `${API_BASE_URL}/bills/unreported`,
    headers: getCommonHeaders(auth),
  });

  return data;
};

const markAsReported = async (codes) => {
  const auth = await getAuth(API_USER, API_PASSWORD);

  await httpClient.request({
    method: 'post',
    url: `${API_BASE_URL}/bills/reported`,
    headers: getCommonHeaders(auth),
    data: JSON.stringify({ codes }),
  });
};

module.exports = { getUnreportedBills, markAsReported };
