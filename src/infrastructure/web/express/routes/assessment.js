const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildAssessmentController = require('../../../../controllers/assessment-controller');
const buildAssessmentResultRoutes = require('./assessment-result');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const assessmentController = buildAssessmentController(dependecies);

  router.post('/', (req, res, next) => {
    assessmentController
      .createAssessment(new HttpRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.use(
    '/:assessmentId/assessment-results',
    buildAssessmentResultRoutes(dependecies)
  );

  return router;
};