import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import meshiCtrl from '../controllers/meshi.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/meshi - Get list of meshi */
  .get(meshiCtrl.list)

  /** POST /api/meshi - Create new meshi */
  .post(validate(paramValidation.createMeshi), meshiCtrl.create);

router.route('/:meshiId')
  /** GET /api/meshi/:meshiId - Get meshi */
  .get(meshiCtrl.get)

  /** PUT /api/meshi/:meshiId - Update meshi */
  .put(validate(paramValidation.updateMeshi), meshiCtrl.update)

  /** DELETE /api/meshi/:meshiId - Delete meshi */
  .delete(meshiCtrl.remove);

/** Load meshi when API with meshiId route parameter is hit */
router.param('meshiId', meshiCtrl.load);

export default router;
