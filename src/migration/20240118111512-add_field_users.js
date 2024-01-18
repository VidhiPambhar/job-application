
module.exports = {
  up: function ({ context }) {
    return context
      .describeTable('job_profiles')
      .then((tableDefinition) => {
        if (!tableDefinition['noticePeriod']) {
          return context.addColumn('job_profiles', 'noticePeriod', {
            type: require('sequelize').DataTypes.STRING,
            allowNull: true,
          });
        } else {
          return Promise.resolve(true);
        }
      })
      .catch((error) => {
        console.log(`error while running migrations ${__filename}`);
        throw error;
      });
  },
};
