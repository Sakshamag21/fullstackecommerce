import React,  { useEffect } from 'react';

import { Box, styled } from '@mui/material';

import NavBar from './Home/NarBar';
import Banner from './Home/Banner';
import MidSlide from './Home/MidSlide';
import MidSection from './Home/MidSection';
import Slide from './Home/Slide';

import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../redux/actions/productActions';
import { getProductCategory as categoryproduct } from '../redux/actions/productActions';

const Component = styled(Box)`
    padding: 20px 10px;
    background: #F2F2F2;
`;
let i=0;
let valueProduct={'Winter Wear':[],'Topwear':[],'Innerwear and Swimwear':[],'Bottomwear':[],'Clothing Accessories':[]}
const Home = () => {
    const getProducts = useSelector(state => state.getProducts);
    const { products, error } = getProducts;
    console.log(products,"products");
    
    const getProductCategoryWise = useSelector(state => state.getProductCategory);
    const { loading,product } = getProductCategoryWise;
    console.log(product,"productcat");
    // valueProduct.push(product)
    if (product.length>0){
    valueProduct[product[0]['category']]=product}

    console.log(valueProduct,'valueProduct',i)
    // let datae=products
    // if (product){
    //     datae=product
    // }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
        dispatch(categoryproduct('Topwear'))
        dispatch(categoryproduct('Winter Wear'))
        dispatch(categoryproduct('Innerwear and Swimwear'))
        dispatch(categoryproduct('Clothing Accessories'))
        dispatch(categoryproduct('Bottomwear'))

    }, [dispatch])

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products} />
                <MidSection />
                <Slide
                    data={products} 
                    title='Discounts for You'
                    timer={false} 
                    multi={true} 
                />
                {valueProduct['Topwear'].length==10 &&<Slide
                    data={valueProduct['Topwear']} 
                    title='Top wear'
                    timer={false} 
                    multi={true} 
                />}
                {valueProduct['Winter Wear'].length==10 &&<Slide
                    data={valueProduct['Winter Wear']} 
                    title='Winter wear'
                    timer={false} 
                    multi={true} 
                /> }
                {valueProduct['Innerwear and Swimwear'].length==10 &&<Slide
                    data={valueProduct['Innerwear and Swimwear']} 
                    title='Innerwear and swimwear'
                    timer={false} 
                    multi={true} 
                />}
                {valueProduct['Clothing Accessories'].length==10 &&<Slide
                    data={valueProduct['Clothing Accessories']} 
                    title='Clothing Accessories'
                    timer={false} 
                    multi={true} 
                />}
                {valueProduct['Bottomwear'].length==10 &&<Slide
                    data={valueProduct['Bottomwear']} 
                    title='Bottom wear'
                    timer={false} 
                    multi={true} 
                />}
            </Component>
        </>
    )
}

export default Home;