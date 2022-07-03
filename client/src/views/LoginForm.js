import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import UserForm from '../components/UserForm';
import Header from '../components/Header';
import Image from 'react-bootstrap/esm/Image';

const LoginForm = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const lateralColumn = () => {
        return <Col sm={2} className="bg-primary">
            {/* <Image src={welcome} /> */}
        </Col>
    }

    return (
        <>
            <Header props='login' />
            <Container>
                <Row className="m-6">
                    <h1 className="text-center">Bienvenido a <span className="text-primary font-italic font-weight-bold">JOBKY</span></h1>
                </Row>
                <Row>
                    <Col sm={2} className="bg-primary">
                    </Col>
                    <Col sm={8} className="text-center">
                        <p>Hola</p>
                    </Col>
                    <Col sm={2} className="bg-primary">
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginForm;