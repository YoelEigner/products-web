
/**
Renders the Login screen component
@returns {JSX.Element} Login Screen Component
*/
import { useState } from "react"
import { Alert, Button, Col, Form } from "react-bootstrap"
import { Login } from "../Utils/Utils"
import { useDispatch } from "react-redux";


export const LoginScreen = () => {
    const [err, setErr] = useState("")
    const dispatch = useDispatch()
    const [creds, setCreds] = useState(() => {
        return {
            username: 'admin',
            password: 'admin',
        }
    })
    const submit = async (e) => {
        e.preventDefault()
        await dispatch(await Login(creds.username, creds.password))
    }
    const handleEdit = (e) => {
        let name = e.currentTarget.title
        setCreds((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    return (
        <Col >
            {err !== "" && <Alert key={'danger'} variant={'danger'}>
                {err}
            </Alert>}
            <h3 className="white-text">Login</h3>
            <Form className="center-form" onSubmit={(e) => { submit(e) }}>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label className="white-text">Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" title="username" value={creds.username} onChange={(e) => { handleEdit(e) }} />
                </Form.Group>
                <div className="login-form">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="white-text">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" title="password" value={creds.password} onChange={(e) => { handleEdit(e) }} />
                    </Form.Group>
                </div>
                <Button variant="secondary" type="submit">
                    Login
                </Button>
            </Form>
        </Col>
    )
}