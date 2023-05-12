/**
Component for adding a new product to the list.
@param {Object} props - Component props.
@param {function} props.setShowNewProduct - Function to set whether the new product modal is displayed or not.
@return {JSX.Element} - Rendered component.
*/

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SaveNewProduct } from '../Utils/Utils';
import { FaTag, FaInfo, FaMoneyBillAlt, FaTh } from 'react-icons/fa';

export const NewProduct = ({ setShowNewProduct }) => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state)
    const [product, setProduct] = useState(() => {
        return {
            name: '',
            descrtiption: '',
            price: 0,
            quantity: 0
        }
    })
    const handleEdit = (e) => {
        let name = e.currentTarget.title
        setProduct((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(SaveNewProduct(product, token))
        setShowNewProduct(false)
    }


    return (
        <>
            <Container>
                <Card className='mx-auto newproductCard products-container'>
                    <Card.Header as="h5" className='nonStrikethrough'>Add new product</Card.Header>
                    <Card.Body>
                        <Form >
                            <Container style={{ textAlign: "left" }}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><FaTag /></InputGroup.Text>
                                    <Form.Control
                                        className='new-text-input'
                                        placeholder="Name"
                                        aria-label="Name"
                                        title={'name'}
                                        aria-describedby="basic-addon1"
                                        value={product.name}
                                        onChange={(e) => { handleEdit(e) }}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><FaInfo /></InputGroup.Text>
                                    <Form.Control
                                        className='new-text-input'
                                        title={'descrtiption'}
                                        placeholder="Descrtiption"
                                        value={product.descrtiption}
                                        onChange={(e) => { handleEdit(e) }}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><FaMoneyBillAlt /></InputGroup.Text>
                                    <Form.Control
                                        className='new-text-input'
                                        placeholder="Price"
                                        aria-label="Price"
                                        type='number'
                                        step='1'
                                        title={'price'}
                                        aria-describedby="basic-addon1"
                                        value={product.price}
                                        onChange={(e) => { handleEdit(e) }}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><FaTh /></InputGroup.Text>
                                    <Form.Control
                                        className='new-text-input'
                                        title={'quantity'}
                                        type='number'
                                        step='1'
                                        placeholder="Quantity"
                                        value={product.quantity}
                                        onChange={(e) => { handleEdit(e) }}
                                    />
                                </InputGroup>
                            </Container>
                            <Button onClick={onSubmit} className='add-btn' variant="dark">Save</Button>
                            <Button onClick={() => { setShowNewProduct(false) }} className='add-btn' variant="dark">Cancel</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}