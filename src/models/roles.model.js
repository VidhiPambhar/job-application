const Sequelize = require('sequelize') 
const sequelize = require('../utils/helpers') 
const userDetails = require('./userDetails.model')
const roles=sequelize.define('roles', { 

	id:{ 
		type:Sequelize.INTEGER, 
		autoIncrement:true, 
		allowNull:false, 
		primaryKey:true
	}, 
	name: { type: Sequelize.STRING, allowNull:false }, 
	email: { type: Sequelize.STRING, allowNull:false }, 
    password: { type: Sequelize.STRING, allowNull:false },
    slug:{type: Sequelize.STRING, allowNull:false},
	createdAt: Sequelize.DATE, 
	updatedAt: Sequelize.DATE, 
}) 

userDetails.belongsTo(roles, { foreignKey: 'roleId' });


