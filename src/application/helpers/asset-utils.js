const entityValidator = require('./entity-validator');
const assetEnums = require('../../database/enums/asset');
const { BadRequestError } = require('./errors');

function ensureAssetsArrayHasExactlyOnePrimaryRoleAssetAndItsRoleIsPDF(assets) {
  const primaryRoleAssets = assets.filter((asset) => asset.role === assetEnums.roles.PRIMARY);
  if (!Array.isArray(primaryRoleAssets) || primaryRoleAssets.length !== 1) {
    throw new BadRequestError('Assets array must have exactly one primary role asset');
  }

  if (primaryRoleAssets[0].type !== assetEnums.types.PDF) {
    throw new BadRequestError('Assets array primary role asset must be a PDF file');
  }
}

function validateAssets({ assets = [], required = false } = {}) {
  assets.forEach((asset) => {
    entityValidator.validateAsset({ asset, required });
  });

  ensureAssetsArrayHasExactlyOnePrimaryRoleAssetAndItsRoleIsPDF(assets);
}

function parseAssetsToJSONArray(assets = []) {
  return assets.map((asset) => asset.toJSON());
}

module.exports = {
  validateAssets,
  parseAssetsToJSONArray,
};
