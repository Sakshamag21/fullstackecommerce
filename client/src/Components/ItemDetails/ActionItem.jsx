import React, { useState, useContext } from 'react';

import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';

import { LoginContext } from '../../context/ContextProvider';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import LoginDialog from '../Login/LoginDialog';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px 20px',
    border: '1px solid #f0f0f0',
    width: '95%'
});

const StyledButton = styled(Button)`
    width: 46%;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;

const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const { id } = product;
    const { account, setAccount } = useContext(LoginContext);

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com'});
        var information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response    
        }
        post(information);
    }

    const addItemToCart = () => {
        if (account){
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }
        else{
            setOpen(true);
            // alert('You must login first')
        }
    }
    const [open, setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
    }
    return (
        <LeftContainer>
            <Image src={product.url} /><br />
            <StyledButton onClick={() => addItemToCart()} style={{marginRight: 10, background: '#ff9f00'}} variant="contained"><Cart />Add to Cart</StyledButton>
            <StyledButton onClick={() => buyNow()} style={{background: '#fb641b'}} variant="contained"><Flash /> Buy Now</StyledButton>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />

        </LeftContainer>
    )
}

export default ActionItem;