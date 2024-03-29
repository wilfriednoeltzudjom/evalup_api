const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildAssessmentResultController = require('../../../../controllers/assessment-result-controller');

module.exports = function buildRouter(dependecies) {
  const router = express.Router({ mergeParams: true });
  const assessmentResultController = buildAssessmentResultController(dependecies);

  router.post('/', (req, res, next) => {
    assessmentResultController
      .createAssessmentResult(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.get('/', (req, res, next) => {
    assessmentResultController
      .getAssessmentResults(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.put('/:assessmentResultId/note', (req, res, next) => {
    assessmentResultController
      .noteAssessmentResult(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
