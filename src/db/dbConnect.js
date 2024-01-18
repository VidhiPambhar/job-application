const Sequelize = require("sequelize");
// const db = require("../models");
const Umzug = require("umzug");
const path = require("path");
const sequelize = require('../utils/helpers')
//  require('../models/roles.model')
require('../models/jobProfile.model')
const umzugSeeders = require('../seeders/20240118111420-add_role'); // Adjust the path based on your project structure
// const umzugSeeders = require('../umzug/seeders');
//  require('../models/userDetails.model')

//  require('../models/userEductionDetails.model')


async function dbConnect() {
 
  sequelize
  .sync({ force: false })
  .then(async () => {
    // try {
    //   await umzugSeeders
    //     .up()
    //     .then(async () => {
    //       console.log("sdfjkdfjdkfj");
    //       // try {
    //       //   // await umzugSeeders.up();
    //       //   console.log('models synced');
    //       // } catch (error) {
    //       //   console.log('Error while running seeders', error);
    //       //   throw error;
    //       // }
    //     })
    //     .catch(error => {
    //       console.log('Error while running migrations', error);
    //       throw error;
    //     });
    // } catch (error) {
    //   console.error('Error while running migrations and seeders:', error);
    //   throw error;
    // }
  })
  .catch(error => {
    console.error('Error while syncing models:', error);
    throw error;
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return sequelize; 
}

module.exports = dbConnect;
