const Sequelize = require('sequelize') 
const sequelize = require('../utils/helpers') 
sequelize.define('user_details', { 

	id:{ 
		type:Sequelize.INTEGER, 
		autoIncrement:true, 
		allowNull:false, 
		primaryKey:true
	}, 
	ssc: { type: Sequelize.STRING, allowNull:false }, 
	hsc: { type: Sequelize.STRING, allowNull:false }, 
    graduation: { type: Sequelize.STRING, allowNull:false },
    master_degree:{type: Sequelize.STRING, allowNull:false},
    board_univercity:{type: Sequelize.STRING, allowNull:false},
    year:{type: Sequelize.NUMBER, allowNull:false},
    percentage:{type: Sequelize.STRING, allowNull:false},
    master_degree:{type: Sequelize.STRING, allowNull:false},
	createdAt: Sequelize.DATE, 
	updatedAt: Sequelize.DATE, 
}) 
// UserDetails.hasOne(EducationDetails, { foreignKey: 'userId' });
EducationDetails.belongsTo(UserDetails, { foreignKey: 'userId' });

