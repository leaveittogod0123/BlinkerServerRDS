const model = require("../db");

module.exports = {
  // 회원가입
  signup: {
    post: async function(reqBody) {
      return await model.signup.post(reqBody);
    }
  },
  signin: {
    post: async function(reqBody) {
      return await model.signin.post(reqBody);
    }
  },

  // 점수등록
  score: {
    post: async function(reqBody) {
      return await model.score.post(reqBody);
    }
  },

  getrank: {
    get: async function(reqBody) {
      return await model.getrank.get(reqBody);
    }
  }
};
