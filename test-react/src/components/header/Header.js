import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import logo from '../../res/Shop-logo.png';
import { NavLink } from 'react-router-dom';
import HeaderForm from './HeaderForm.js';
import { NavDiv } from './Header.styles';
import { useContext } from 'react';
import HeaderContext from '../../contexts/HeaderContext';

const Header = () => {
    const { setIsSearchEnabled } = useContext(HeaderContext);
    return (
        <header style={{ height: 60 }} className="d-flex bg-light justify-content-between">
            <div className="d-flex mx-4">
                <Image style={{ maxWidth: 60 }} src={logo} />
                <a className="navbar-brand my-2 mx-4 text-dark">Test Shop</a>
            </div>
            <NavDiv style={{ width: 2000 }}>
                <Nav>
                    <Nav.Item>
                        <NavLink className="nav-link bg-light border-0 text-dark py-3" to={'/'}
                            onClick={() => {
                                setIsSearchEnabled(true)
                            }}>Catalog</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="nav-link bg-light border-0 text-dark py-3" to={'/cart'}
                            onClick={() => {
                                setIsSearchEnabled(false)
                            }}>Cart</NavLink>
                    </Nav.Item>
                </Nav>
            </NavDiv>
            <HeaderForm />
        </header>
    );
}

export default Header;