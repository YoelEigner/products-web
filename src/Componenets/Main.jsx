/**
The main component of the application.
This component renders the navbar, add new product button, list of products, and login screen.
If there is no token available, the component will render the login screen.
Otherwise, it will show the list of products and an "Add New Product" button that opens a form.
@returns {JSX.Element} The main component JSX.
*/

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { NewProduct } from './NewProduct';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavbarComp } from './Navbar';
import { Products } from './Products';
import { LoginScreen } from './LoginScreen';
import { SaveProducts } from '../Utils/Utils';


export const Main = () => {
    const [showNewProduct, setShowNewProduct] = useState(false)
    const { token } = useSelector((state) => state);
    const dispatch = useDispatch()
    const handleClick = () => {
        setShowNewProduct(!showNewProduct)
    }

    useEffect(() => {
        const getItems = async () => {
            await dispatch(SaveProducts(token))
        }
        if (token) getItems()
    }, [token])



    if (!token) return <LoginScreen />
    return (
        <Container>
            <NavbarComp />
            <Container className='add-new-btn-container'>
                <Container >
                    <Container  >
                        <Button variant="dark" className='add-btn' onClick={handleClick}>Add New Product</Button>
                    </Container>
                    {showNewProduct && <NewProduct setShowNewProduct={(data) => { setShowNewProduct(data) }} />}

                    <Container >
                        <Products />
                    </Container>
                </Container>
            </Container>

        </Container>
    )
}