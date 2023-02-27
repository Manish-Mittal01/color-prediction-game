class Utility {
  static getRandomValue(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
}

module.exports.Utility = Utility;
