/**
A component representing the Navbar of the application.
It contains a search bar to filter products and a logout button.
@returns {JSX.Element} The JSX code for the NavbarComp component.
 */

import { useState } from 'react';
import { Form, FormControl, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { Logout, onSerachQuery } from '../Utils/Utils';


export const NavbarComp = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('Filter Status')


    const handleSearch = async (event) => {
        setTitle('Filter Status')
        await dispatch(onSerachQuery(event.target.value))
    };

    const logout = async () => {
        await dispatch(await Logout())
    }

    return (
        <Container className="App">
            <Container className='navbar-margin-btm'>
                <Navbar bg="dark" variant="dark" fixed="top">
                    <Container>
                        <Navbar.Brand href="#home" className='filter'>Products</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home" onClick={() => { logout() }}>Logout</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Navbar.Brand variant="outline-secondary" className='filter'>Filter</Navbar.Brand>
                            <Container className='margin-right'>
                                <FormControl
                                    type="search"
                                    placeholder="Type to search"
                                    className="mr-2 text-input"
                                    aria-label="Search"
                                    onChange={(event) => { handleSearch(event) }}
                                />
                            </Container>

                        </Form>
                    </Container>
                </Navbar>
            </Container>
        </Container>

    )
}