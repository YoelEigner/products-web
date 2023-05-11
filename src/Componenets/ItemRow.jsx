import { Card, Form, InputGroup, Row } from "react-bootstrap"



export const ItemRow = ({ editable, item, title, handleEdit }) => {
    return (
        <Row>
            <Card.Text className={'nonStrikethrough'}>
                {title.charAt(0).toUpperCase() + title.slice(1)}: {editable ? <InputGroup >
                    <Form.Control
                        className="text-input"
                        placeholder={title}
                        aria-label="Title"
                        step={title === 'price' || title === 'quantity' ? "1" : "2"}
                        type={title === 'price' || title === 'quantity' ? "number" : "text"}
                        title={title}
                        aria-describedby="basic-addon1"
                        value={item}
                        onChange={(e) => { handleEdit(e, item) }}
                    />
                </InputGroup> : item}
            </Card.Text>
        </Row>
    )
}