import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'
import { CardButton } from './Card.styles';
import { Link } from "react-router-dom";
import HeaderContext from '../../contexts/HeaderContext';
import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { deleteCard } from '../../api/Api';

const CardItem = ({ name = 'No name.', imageUrl, count, price, size, id }) => {
    const { setIsSearchEnabled } = useContext(HeaderContext);
    const [showModal, setShowModal] = useState(false);

    const showModalChange = () => {
        setShowModal(!showModal);
    }

    const deleteCardFunc = () => {
        deleteCard(id);
        window.location.reload();
        setShowModal(!showModal);
    }

    return (
        <Card style={{ width: '220px' }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body className="">
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    Count: {count} cards
                    <br />
                    Width: {size.width} cm
                    <br />
                    Height: {size.height} cm
                    <br />
                </Card.Text>
                <Card.Text><strong>
                    Price: {price} $
                </strong></Card.Text>
            </Card.Body>
            <small className="d-flex justify-content-around py-3">
                <Link to={"/itempage/" + id} onClick={() => { setIsSearchEnabled(false) }}>
                    <CardButton className="px-4 py-0 mr-5">Show More</CardButton>
                </Link>
            </small>
            <small className="d-flex justify-content-around py-3">
                <CardButton className="px-4 py-0 mr-5" onClick={showModalChange}>Delete</CardButton>
            </small>
            <Modal show={showModal} onHide={showModalChange}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete {name}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showModalChange}>
                        No!
                    </Button>
                    <Button variant="primary" onClick={deleteCardFunc}>
                        Yes!
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>

    );
}



export default CardItem