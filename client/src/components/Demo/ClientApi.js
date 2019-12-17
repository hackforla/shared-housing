export const ApiUrls = {
  candidates: '/api/v1/candidates',
  locations: '/api/v1/locations',
  locationResponseValues: '/api/v2/locationresponsevalues',
  candidateResponseValues: '/api/v2/candidateresponsevalues',
  locationQuestions: '/api/v2/locationquestions',
  candidateQuestions: '/api/v2/candidatequestions',
  rejectedValues: '/api/v2/rejectedvalues',
};

const postJson = async (url, data) =>
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => {
    if (response.status !== 200) {
      throw new Error(response.statusText);
    } else {
      return response.text();
    }
  });

const getJson = async url =>
  await fetch(url).then(response => {
    if (response.status !== 200) {
      throw new Error(response.statusText);
    } else {
      return response.json();
    }
  });

export const ClientApi = {
  addCandidate: async function(candidate) {
    return await postJson(ApiUrls.candidates, candidate)
      .then(function(responseText) {
        return responseText;
      })
      .catch(err => {
        throw err;
      });
  },
  getCandidates: async function() {
    return await getJson(ApiUrls.candidates);
  },

  addLocation: async function(location) {
    return await postJson(ApiUrls.locations, location)
      .then(function(responseText) {
        return responseText;
      })
      .catch(err => {
        throw err;
      });
  },
  getLocations: async function() {
    return await getJson(ApiUrls.locations);
  },

  addCandidateQuestion: async function(candidateQuestion) {
    return await postJson(ApiUrls.candidateQuestions, candidateQuestion)
      .then(function(responseText) {
        return responseText;
      })
      .catch(err => {
        throw err;
      });
  },
  getCandidateQuestions: async function() {
    console.log(`getCandidateQuestions: fetching...`);
    const candidateQuestions = await getJson(ApiUrls.candidateQuestions);
    console.log(
      `getCandidateQuestions: candidateQuestions = ${JSON.stringify(
        candidateQuestions,
      )}...`,
    );
    return candidateQuestions;
  },

  addLocationQuestion: async function(locationQuestion) {
    return await postJson(ApiUrls.locationQuestions, locationQuestion)
      .then(function(responseText) {
        return responseText;
      })
      .catch(err => {
        throw err;
      });
  },
  getLocationQuestions: async function() {
    console.log(`getLocationQuestions: fetching...`);
    const locationQuestions = await getJson(ApiUrls.locationQuestions);
    console.log(
      `getLocationQuestions: locationQuestions = ${JSON.stringify(
        locationQuestions,
      )}...`,
    );
    return locationQuestions;
  },

  addRejectedValue: async function(rejectedValue) {
    return await postJson(ApiUrls.rejectedValues, rejectedValue)
      .then(function(responseText) {
        return responseText;
      })
      .catch(err => {
        throw err;
      });
  },
  getRejectedValues: async function() {
    return await getJson(ApiUrls.rejectedValues);
  },
};
