import React from "react";
import Image from "react-bootstrap/lib/Image";
import Col from "react-bootstrap/lib/Col";
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import img from '../../assets/img/min_trabajo_empleo_seguridad_social.png'
import './header.css'


const Header = () => (
    <Grid>
        <Row>
            <Col md={4} >
                <Image src={img} />
            </Col>
            <Col md={8} mdPush={2}>
                <h3>Acciones con modalidad a distancia / semipresencial</h3>
            </Col>
            <Col md={8} mdPush={3}>
                <span>Dirección de Seguimineto Técnico, Supervisión y Fiscalización</span>
            </Col>
        </Row>
    </Grid>
)



export default Header;




