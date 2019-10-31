const { User, Score, Game } = require("../model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = {
  // 회원가입
  signup: {
    post: async function(reqBody) {
      let salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(reqBody.password, salt);
      return User.count({ where: { username: reqBody.username } })
        .then(count => {
          if (count != 0) return 0;
          else
            return User.create({
              username: reqBody.username,
              password: hash,
              salt: salt
            });
        })
        .catch(err => err);
    }
  },

  signin: {
    post: async function(reqBody) {
      let salt = await User.findOne({
        attributes: ["salt"],
        where: {
          username: reqBody.username
        }
      })
        .then(res => res.dataValues.salt)
        .catch(err => {
          console.log(err);
        });
      let hash = bcrypt.hashSync(reqBody.password, salt);
      let cookies = bcrypt.hashSync(reqBody.username + reqBody.password, salt);

      return User.findOne({
        where: {
          username: reqBody.username,
          password: hash
        }
      })
        .then(result => [result, reqBody.username, cookies])
        .catch(err => err);
    }
  },

  // 점수등록 (들어올때에는 username, gamename, score / 포스트할때에는 userId, gameId, score)
  score: {
    post: async function(reqBody) {
      let userId = await User.findOne({
        where: { username: reqBody.username }
      })
        .then(user => {
          return user.dataValues.id;
        })
        .catch(err => err);
      let gameId = await Game.findOne({
        where: { gamename: reqBody.gamename }
      })
        .then(game => {
          return game.dataValues.id;
        })
        .catch(err => err);

      return await Score.create({
        gameId: gameId,
        userId: userId,
        score: reqBody.score
      })
        .then(res => {
          let ret = {
            userId: res.userId,
            gameId: res.gameId,
            score: res.score
          };
          return ret;
        })
        .catch(err => err);
    }
  },

  getrank: {
    get: async function(reqBody) {
      return Score.findAll({
        attributes: ["score"],
        include: [
          {
            model: User
          },
          {
            model: Game
          }
        ],
        where: {},
        order: [["score", "desc"]]
      }).then(res => {
        let ret = [];
        for (let i = 0; i < res.length; i++) {
          let username = res[i].dataValues.user.dataValues;
          let gamename = res[i].dataValues.game.dataValues;
          ret.push(
            Object.assign(
              { score: res[i].dataValues.score },
              username,
              gamename
            )
          );
        }
        console.log(ret);
        return ret;
      });
    }
  }
};
