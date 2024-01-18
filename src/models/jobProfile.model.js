const Sequelize = require('sequelize');
const sequelize = require('../utils/helpers');

 const Roles = sequelize.define('roles', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: { type: Sequelize.STRING, allowNull: true },
  email: { type: Sequelize.STRING, allowNull: true },
  password: { type: Sequelize.STRING, allowNull: true },
  slug: { type: Sequelize.STRING, allowNull: true },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

 const UserDetails = sequelize.define('user_details', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: { type: Sequelize.STRING, allowNull: true },
  email: { type: Sequelize.STRING, allowNull: true },
  address: { type: Sequelize.TEXT, allowNull: true },
  gender: { type: Sequelize.ENUM('Female', 'Male', 'Other'), allowNull: false },
  contact: { type: Sequelize.STRING, allowNull: true },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

const EducationDetails = sequelize.define('education_details', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  ssc: { type: Sequelize.STRING, allowNull:true }, 
  hsc: { type: Sequelize.STRING, allowNull:true }, 
  graduation: { type: Sequelize.STRING, allowNull:true },
  master_degree:{type: Sequelize.STRING, allowNull:true},
  board_univercity:{type: Sequelize.STRING, allowNull:true},
  year:{type: Sequelize.STRING, allowNull:true},
  percentage:{type: Sequelize.STRING, allowNull:true},
  master_degree:{type: Sequelize.STRING, allowNull:true},
  createdAt: Sequelize.DATE, 
  updatedAt: Sequelize.DATE,

});

const JobProfile = sequelize.define('job_profile', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    knownLanguage: { type: Sequelize.STRING, allowNull:true }, 
    technical_experince: { type: Sequelize.ENUM('beginner','Mediator','Expert'), allowNull:true }, 
    Preferred_location: { type: Sequelize.ENUM('Ahemdabad','Surat','Baroda'), allowNull:true },
    expected_ctc:{type: Sequelize.STRING, allowNull:true},
    current_ctc:{type: Sequelize.STRING, allowNull:true},
    noticePeriod:{type: Sequelize.STRING, allowNull:true},
    createdAt: Sequelize.DATE, 
    updatedAt: Sequelize.DATE,
  
  });
// // Define associations
UserDetails.hasOne(EducationDetails, { foreignKey: 'userId' });
EducationDetails.belongsTo(UserDetails, { foreignKey: 'userId' });
JobProfile.belongsTo(UserDetails, { foreignKey: 'userId' });
Roles.hasOne(UserDetails, { foreignKey: 'roleId' });
UserDetails.belongsTo(Roles, { foreignKey: 'roleId' });

module.exports = {
    Roles,
    UserDetails,
    EducationDetails,
    JobProfile
  };