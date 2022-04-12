import 'bootstrap/dist/css/bootstrap.min.css'
import FilterArea from './filter/FilterArea';
import { StyledHeader, CardWrapper, CardDeck, AddCardButton } from './Catalog.styles';
import CardItem from '../card/CardItem';
import CatalogContext from '../../contexts/CatalogContext';
import React, { useState, useEffect, useContext } from 'react';
import { getCardList, postCard } from '../../api/Api';
import { Loading } from "../loading/Loading";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Catalog = () => {
    let { setDataRender } = useContext(CatalogContext);
    const { dataRender } = useContext(CatalogContext);
    const { filters } = useContext(CatalogContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [load] = useState(0);
    const [errorText, setErrorText] = useState();

    useEffect(() => {
        setIsLoaded(false);
        getCardList().then(res => {
            setDataRender(res);
            setIsLoaded(true);
        });
    }, [load]);

    useEffect(() => {
        setIsLoaded(false);
        let data = dataRender;
        if (filters.sortOrder == "asc")
            data.sort((card1, card2) => card1.price - card2.price);
        else
            data.sort((card1, card2) => card2.price - card1.price);
        setDataRender(data);
        setIsLoaded(true);
    }, [filters]);

    const showModalChange = () => {
        setErrorText("");
        setShowModal(!showModal);
    }

    const createCard = () => {
        let name = document.getElementById("Name").value;
        let imageUrl = document.getElementById("Image URL").value;
        let width = document.getElementById("Width").value;
        let height = document.getElementById("Height").value;
        let count = document.getElementById("Count").value;
        let price = document.getElementById("Price").value;
        let weight = document.getElementById("Weight").value;
        if(name == "" ||  imageUrl == "" || width == "" ||
            height == "" || count == "" || price  == "" || 
            weight == ""){
                setErrorText("Fields cannot be empty");
                return;
            }
        let card = {
            "id": dataRender.length+1,
            "imageUrl": imageUrl,
            "name": name,
            "count": parseInt(count),
            "size": {
                "width": parseInt(width),
                "height": parseInt(height)
            },
            "weight": weight,
            "price": parseInt(price),
            "comments": [
                "Some kind of comment",
                "Another comment"
            ]
        };
        postCard(card);
        setIsLoaded(false);
        getCardList().then(res => {
            setDataRender(res);
            setIsLoaded(true);
            setShowModal(!showModal);
        });
    }

    return (
        <div>
            <FilterArea />
            <StyledHeader className="pt-4">Best video cards in our collection</StyledHeader>
            <CardDeck className="m-3">
                <CardWrapper className="flex-wrap">
                    {isLoaded ? dataRender.map(({ name, imageUrl, count, price, size, id }) => (
                        <CardItem
                            name={name}
                            imageUrl={imageUrl}
                            count={count}
                            size={size}
                            price={price}
                            id={id}
                        />
                    )) : <Loading />}
                </CardWrapper>
            </CardDeck>
            <div className="py-3 d-flex justify-content-center">
                <AddCardButton onClick={showModalChange}>Add new card</AddCardButton>
            </div>
            <Modal show={showModal} onHide={showModalChange}>
                <Modal.Header closeButton>
                    <Modal.Title>Create card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorText ? <div className="font-italic text-danger">*{errorText}</div> : <></>}
                    <Form>
                        <Form.Group className="mb-3" controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="Name"/>
                        </Form.Group>
                        <Form.Group className ="mb-3" controlId="Image URL">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="Image URL" />
                        </Form.Group>
                        <Form.Group className ="mb-3" controlId="Width">
                            <Form.Label>Width (cm)</Form.Label>
                            <Form.Control type="Width (cm)" />
                        </Form.Group>
                        <Form.Group className ="mb-3" controlId="Height">
                            <Form.Label>Height (cm)</Form.Label>
                            <Form.Control type="Height (cm)" />
                        </Form.Group>
                        <Form.Group className ="mb-3" controlId="Count">
                            <Form.Label>Count</Form.Label>
                            <Form.Control type="Count" />
                        </Form.Group>
                        <Form.Group className ="mb-3" controlId="Weight">
                            <Form.Label>Weight (g)</Form.Label>
                            <Form.Control type="Weight" />
                        </Form.Group>
                        <Form.Group className ="mb-3" controlId="Price">
                            <Form.Label>Price ($)</Form.Label>
                            <Form.Control type="Price ($)" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showModalChange}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={createCard}>
                        Add new Card
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default Catalog;