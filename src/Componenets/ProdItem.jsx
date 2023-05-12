/**
Product item component to display a single product information.
@param {Object} product - Object containing the product information.
@param {Function} editItem - Callback function to handle editing the item.
@returns {JSX.Element}
*/
import { useState } from "react"
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, UpdateProduct } from "../Utils/Utils";
import { ItemRow } from "./ItemRow";


export const ProdItem = ({ product, editItem }) => {
    const [editable, setEditable] = useState(false)
    const dispatch = useDispatch()
    const { products, token } = useSelector((state) => state);



    const handleEdit = (event, id) => {
        let name = event.currentTarget.title
        let value = event.target.value
        editItem(name, value, id)
    }
    const onDelete = async (item) => {
        await dispatch(DeleteProduct(products, item.ID, token))
        setEditable(false)
    }

    const onEdit = async () => {
        setEditable(!editable)
        if (editable) {
            await dispatch(UpdateProduct(products, product, token))
        }

    }
    return (
        <>
            <Container className="products-container">
                <Card className='mx-auto newproductCard'>
                    <Card.Header as="h5" className={product?.status ? 'strikethrough' : 'nonStrikethrough'}>
                        ID: {product?.ID}
                    </Card.Header>
                    <Card.Body >
                        <Container className="product-body">
                            <Col>
                                <ItemRow editable={editable} item={product?.name} title={'name'} handleEdit={(e) => { handleEdit(e, product?.ID) }} />
                                <ItemRow editable={editable} item={product?.description} title={'description'} handleEdit={(e) => { handleEdit(e, product?.ID) }} />
                                <ItemRow editable={editable} item={product?.price} title={'price'} handleEdit={(e) => { handleEdit(e, product?.ID) }} />
                                <ItemRow editable={editable} item={product?.quantity} title={'quantity'} handleEdit={(e) => { handleEdit(e, product?.ID) }} />
                            </Col>
                        </Container>
                    </Card.Body>
                    <Container>
                        {editable && <Button onClick={() => onDelete(product)} className="products-buttons delete-btn" variant="danger">Delete</Button>}
                        <Button onClick={() => onEdit()} disabled={product?.status} className="products-buttons add-btn" variant="dark">{!editable ? 'Edit' : 'Update'}</Button>
                    </Container>
                </Card>
            </Container>

        </>
    )
}