import { DataTypes,Model } from "sequelize";
import sequelize from "../../config/db.js";

class User extends Model{}

User.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    fullName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:true
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false
    },
   updatedAt:{
    type:DataTypes.DATE,
    allowNull:false
   }, 
   role:{
    enum:['patient','doctor','admin'],
    type:DataTypes.STRING,
    defaultValue:'patient',
    allowNull:false
   },
   date_of_birth:{
    type:DataTypes.DATE,
    allowNull:true
   },
   gender:{
    type:DataTypes.STRING,
    enum:['male','female','others']
   },
   location:{
    type:DataTypes.STRING,
    allowNull:true
   },
   profile_image:{
    type:DataTypes.STRING,
    allowNull:true
   },
   status:{
    type:DataTypes.STRING,
    enum:['active','inactive','blocked']
   },
   emergency_contact:{
    type:DataTypes.STRING,
    allowNull:true
   },
   
   resetPasswordToken: {
  type: DataTypes.STRING
},
resetPasswordExpires: {
  type: DataTypes.DATE

   }},{
    
sequelize,
modelName:'user',
tableName:'users',
timestamps:true
    
})
export default User

