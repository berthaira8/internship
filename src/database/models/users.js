import { DataTypes,Model } from "sequelize";
import sequelize from "../config/db.js";


class User extends Model{}
User.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryValue:true

    },
    fullName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true

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
    }

},{ 
    sequelize,
    modelName:'User',
    tableName:'users',
    timestamps:true
})

export default User
