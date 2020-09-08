const { Assessment, Asset } = require('../../database/entities');

module.exports = function buildCreateAssessment({ databaseServices }) {
  const {
    assessmentRepository,
    groupRepository,
    teacherRepository,
    courseRepository,
    assetRepository,
  } = databaseServices;

  function parseAssetsArrayToInstantiatedAssetsArray(assets) {
    if (!Array.isArray(assets)) throw new Error('assets must be an array');

    return assets.map((asset) => new Asset(asset));
  }

  async function execute({
    title,
    type,
    description,
    startDate,
    endDate,
    assets,
    groupId,
    courseId,
    teacherId,
  } = {}) {
    const group = await groupRepository.checkGroupId(groupId);
    const course = await courseRepository.checkCourseId(courseId);
    const teacher = await teacherRepository.checkTeacherId(teacherId);
    const assessment = new Assessment({
      title,
      type,
      description,
      startDate,
      endDate,
      assets: parseAssetsArrayToInstantiatedAssetsArray(assets),
      group,
      teacher,
      course,
    });
    const persistedAssets = await assetRepository.createAll(assessment.assets);
    assessment.assets = persistedAssets;
    const persistedAssessment = await assessmentRepository.create(assessment);

    return persistedAssessment.toJSON();
  }

  return {
    execute,
  };
};
