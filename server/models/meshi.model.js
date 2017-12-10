import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Meshi Schema
 */
const MeshiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
MeshiSchema.method({
});

/**
 * Statics
 */
MeshiSchema.statics = {
  /**
   * Get meshi
   * @param {ObjectId} id - The objectId of meshi.
   * @returns {Promise<Meshi, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((meshi) => {
        if (meshi) {
          return meshi;
        }
        const err = new APIError('No such meshi exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List meshi in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of meshi to be skipped.
   * @param {number} limit - Limit number of meshi to be returned.
   * @returns {Promise<Meshi[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  /**
   * Get meshi randomly
   * @returns {Promise<Meshi, APIError>}
   */
  random() {
    return this.aggregate({ $sample: { size: 1 } })
      .exec()
      .then((meshi) => {
        if (meshi && meshi.length > 0) {
          return meshi[0];
        }
        const err = new APIError('No such meshi exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef Meshi
 */
export default mongoose.model('Meshi', MeshiSchema);
