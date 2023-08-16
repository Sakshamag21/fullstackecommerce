// import historyuser from "../model/userHistorySchema";
import historyuser from "../model/userHistorySchema.js";
export const historySave = async (request, response) => {
    console.log({ user_id: request.body.user_id, product_id: request.body.product_id},'4')
    try {
        let userpro = await historyuser.find({ user_id: request.body.user_id, product_id:request.body.product_id });
        console.log(userpro,'userpro')
        if (userpro.length >0){
            console.log(userpro,'userpro1')
            userpro[0].quantity++;
            console.log(userpro,'userpro2')
            await userpro[0].save()
        }else{
            console.log('inside else')
            const data = request.body;
            // data['quantity']=1;
            console.log(data, 'server_side')
            const historydata = new historyuser(data);
            await historydata.save();
            response.status(200).json({ mesage: user });
        }
        
        // console.log(response)
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const historyget = async (request, response) => {
    // console.log({ username: request.body.username, password: request.body.password})
    try {
        let user = await historyuser.find({ username: request.body.username });
        if(user) {
            return response.status(200).json(user);
        } else {
            return response.status(401).json('Invalid user history');
        }

    } catch (error) {
        response.json('Error: ', error.message);        
    }
}