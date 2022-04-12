import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams } from 'react-router';
import {
    ImageBg, ItemPageContainer, ItemPageImageWraper,
    ItemPageText, ItemPageInput, InputText, Dropdown, Option,
    ItemPagePrice, GoBackButton, AddToCartButton, Buttons
} from './ItemPage.styles';
import Image from 'react-bootstrap/Image';
import port from '../../res/Port.jpg'
import { Link } from "react-router-dom";
import { getCard } from '../../api/Api';
import React, { useState, useEffect } from 'react';
import { Loading } from '../loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseAmount } from '../../redux/actions';

const ItemPage = () => {
    const cartItems = useSelector((state) => state.cartItems.cartItems);
    let dispatch = useDispatch();

    const { id } = useParams();
    const [card, setCard] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [load] = useState(0);
    useEffect(() => {
        setIsLoaded(false);
        getCard(id).then(res => {
            setCard(res);
            setIsLoaded(true);
        });
    }, [load]);

    return (
        <ItemPageContainer>
            <div className="d-flex justify-content-around">
                <ImageBg src={port} />
                <ItemPageImageWraper>
                    {isLoaded ? <Image src={card.image} /> : <Loading />}
                </ItemPageImageWraper>
                <ItemPageText>
                    <h3 className="display-1 fs-3 fw-normal text-dark py-3">{card.name}</h3>
                    {card.comments[0]}
                    <div className="d-flex">
                        <div className="d-flex flex-column py-3">
                            <InputText className="font-weight-bold py-3">Enter amount of video cards:</InputText>
                            <ItemPageInput id="amount" type="search" placeholder="Amount..." aria-label="Search"/>
                        </div>
                        <div className="d-flex flex-column py-3 px-5">
                            <InputText className="font-weight-bold py-3">Choose color of Card:</InputText>
                            <Dropdown>
                                <Option>Red</Option>
                                <Option>White</Option>
                                <Option>Blue</Option>
                                <Option>Black</Option>
                                <Option>Yellow</Option>
                            </Dropdown>
                        </div>
                    </div>
                </ItemPageText>
            </div>
            <div className="d-flex justify-content-between p-5 mx-5">
                <ItemPagePrice>Price: {card.price} $</ItemPagePrice>
                <Buttons className="d-flex justify-content-between">
                    <Link className="px-3" to={'/'}>
                        <GoBackButton>Go back</GoBackButton>
                    </Link>
                    <Link to={'/cart'}>
                        <AddToCartButton>Add to cart</AddToCartButton>
                    </Link>
                </Buttons>
            </div>
        </ItemPageContainer>
    )
}

export default ItemPage;