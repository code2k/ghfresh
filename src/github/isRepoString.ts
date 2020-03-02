const matcher = /^[^/ ]+\/[^/ ]+$/;

/**
 * @param {string} repo - A github repository ID. e.g. ("preactjs/preact")
 * @returns {boolean} true if valid
 */
const isRepoString = (repo: string) => {
  return matcher.test(repo);
};

export default isRepoString;
