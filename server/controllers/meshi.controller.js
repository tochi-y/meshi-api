import Meshi from '../models/meshi.model';

/**
 * Load meshi and append to req.
 */
function load(req, res, next, id) {
  Meshi.get(id)
    .then((meshi) => {
      req.meshi = meshi; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get meshi
 * @returns {Meshi}
 */
function get(req, res) {
  return res.json(req.meshi);
}

/**
 * Create new meshi
 * @property {string} req.body.name - The name of meshi.
 * @returns {Meshi}
 */
function create(req, res, next) {
  const meshi = new Meshi(req.body);

  meshi.save()
    .then(savedMeshi => res.json(savedMeshi))
    .catch(e => next(e));
}

/**
 * Update existing meshi
 * @property {string} req.body.name - The name of meshi.
 * @returns {Meshi}
 */
function update(req, res, next) {
  const meshi = req.meshi;
  meshi.name = req.body.name;

  meshi.save()
    .then(savedMeshi => res.json(savedMeshi))
    .catch(e => next(e));
}

/**
 * Get meshi list.
 * @property {number} req.query.skip - Number of meshi to be skipped.
 * @property {number} req.query.limit - Limit number of meshi to be returned.
 * @returns {Meshi[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Meshi.list({ limit, skip })
    .then(meshi => res.json(meshi))
    .catch(e => next(e));
}

/**
 * Delete meshi.
 * @returns {Meshi}
 */
function remove(req, res, next) {
  const meshi = req.meshi;
  meshi.remove()
    .then(deletedMeshi => res.json(deletedMeshi))
    .catch(e => next(e));
}
/**
 * Get meshi randomly
 * @returns {Meshi}
 */
function getRandomly(req, res, next) {
  Meshi.random()
    .then(meshi => res.json(meshi))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getRandomly };
