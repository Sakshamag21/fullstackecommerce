import * as actionTypes from '../constants/historyConstants';
import axios from 'axios';

export const postHistory = () => async (dispatch) => {
    try {
        const { data } = await axios.post(`http://localhost:8000/history`);
        dispatch({ type: actionTypes.POST_ITEM_TO_HISTORY, payload: data });

    } catch (error) {
        console.log('Error calling history api')
        }
};


