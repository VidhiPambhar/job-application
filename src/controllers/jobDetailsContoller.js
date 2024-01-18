const Sequelize = require("sequelize");
const {
  UserDetails,
  EducationDetails,
  JobProfile,
} = require("../models/jobProfile.model");
const sequelize = require("../utils/helpers");
const { Op } = require("sequelize");

exports.userDetails = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      gender,
      contact,
      ssc,
      hsc,
      graduation,
      master_degree,
      board_univercity,
      year,
      percentage,
      knownLanguage,
      technical_experince,
      Preferred_location,
      expected_ctc,
      current_ctc,
      noticePeriod,
    } = req.body;

    const result = await sequelize.transaction(async (t) => {
      const userDetails = await UserDetails.create(
        { name, email, address, gender, contact },
        { transaction: t }
      );

      // Create education details
      const educationDetails = await EducationDetails.create(
        {
          ssc,
          hsc,
          graduation,
          master_degree,
          board_univercity,
          year,
          percentage,
          userId: userDetails.id,
        },
        { transaction: t }
      );

      // Create job profile
      const jobProfileDetails = await JobProfile.create(
        {
          knownLanguage,
          technical_experince,
          Preferred_location,
          expected_ctc,
          current_ctc,
          noticePeriod,
          userId: userDetails.id,
        },
        {
          transaction: t,
        }
      );

      // Return the created data
      return {
        userDetails,
        educationDetails,
        jobProfileDetails,
      };
    });

    // Send the response
    res.status(201).json(result);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, address, gender, contact, education, jobProfile } =
      req.body;

    // Check if the user is an admin
    //   if (req.user && req.user.role === 'admin') {
    const result = await sequelize.transaction(async (t) => {
      // Update user details
      await UserDetails.update(
        { name, email, address, gender, contact },
        { where: { id: userId }, transaction: t }
      );

      // Update education details
      await EducationDetails.update(
        { education },
        { where: { userId }, transaction: t }
      );

      // Update job profile
      await JobProfile.update(
        { jobProfile },
        { where: { userId }, transaction: t }
      );

      return true;
    });

    res
      .status(200)
      .json({ success: true, message: "Updated successfully", result });

    //   } else {
    //     res.status(403).json({ error: 'Unauthorized' });
    //   }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming userId is part of the request parameters

    // Check if the user is an admin (if required)
    // if (req.user && req.user.role === 'admin') {

    const result = await sequelize.transaction(async (t) => {
      // Delete user details
      await UserDetails.destroy({ where: { id: userId }, transaction: t });
      // Delete education details
      await EducationDetails.destroy({ where: { id: userId }, transaction: t });

      // Delete job profile
      await JobProfile.destroy({ where: { id: userId }, transaction: t });
    });

    res.status(200).json({ success: true, message: "Deleted successfully" });
    // } else {
    //   res.status(403).json({ error: 'Unauthorized' });
    // }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//   exports.getAllUsersDetails = async (req, res) => {
//     try {
//       // Fetch all user details
//       const allUserDetails = await UserDetails.findAll();

//       // Fetch all education details
//       const allEducationDetails = await EducationDetails.findAll();

//       // Fetch all job profile details
//       const allJobProfileDetails = await JobProfile.findAll();

//       // Combine the details
//       const allDetails = {
//         allUserDetails,
//         allEducationDetails,
//         allJobProfileDetails,
//       };

//       // Send the response
//       res.status(200).json(allDetails);
//     } catch (error) {
//       // Handle errors
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

exports.getAllUsersDetailsWithSearch = async (req, res) => {
  try {
    let allUserDetails, allEducationDetails, allJobProfileDetails;

    if (req.query.searchQuery) {
      allUserDetails = await UserDetails.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${req.query.searchQuery}%` } },
            { email: { [Op.like]: `%${req.query.searchQuery}%` } },
          ],
        },
      });

      allEducationDetails = await EducationDetails.findAll({
        where: {
          ssc: { [Op.like]: `%${req.query.searchQuery}%` },
        },
      });

      allJobProfileDetails = await JobProfile.findAll({
        where: {
          [Op.or]: [
            { knownLanguage: { [Op.like]: `%${req.query.searchQuery}%` } },
            {
              technical_experince: { [Op.like]: `%${req.query.searchQuery}%` },
            },
          ],
        },
      });
    } else {
      allUserDetails = await UserDetails.findAll();

      allEducationDetails = await EducationDetails.findAll();

      allJobProfileDetails = await JobProfile.findAll();
    }

    const allDetails = {
      allUserDetails,
      allEducationDetails,
      allJobProfileDetails,
    };

    res.status(200).json(allDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
