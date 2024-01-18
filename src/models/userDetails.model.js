const Sequelize = require('sequelize') 
const sequelize = require('../utils/helpers') 
const roles = require('./roles.model')

const userDetails=sequelize.define('user_details', { 

	id:{ 
		type:Sequelize.INTEGER, 
		autoIncrement:true, 
		allowNull:false, 
		primaryKey:true
	}, 
	name: { type: Sequelize.STRING, allowNull:false }, 
	email: { type: Sequelize.STRING, allowNull:false }, 
    address: { type: Sequelize.TEXT, allowNull:false },
    // gender:{type: Sequelize.ENUM('Female','Male','Other'), allowNull:false},
    // contact:{type: Sequelize.NUMBER, allowNull:false},
	createdAt: Sequelize.DATE, 
	updatedAt: Sequelize.DATE, 
}) 

roles.hasOne(userDetails, { foreignKey: 'roleId' });



