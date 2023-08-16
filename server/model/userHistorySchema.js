import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const userHistorySchema = new mongoose.Schema({
    user_id:String,
    product_id:String,
    quantity:{
        type:Number,
        default:1
    }
});

autoIncrement.initialize(mongoose.connection);
userHistorySchema.plugin(autoIncrement.plugin, 'userhistory');

const historyuser = mongoose.model('userhistory', userHistorySchema);

export default historyuser;