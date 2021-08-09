import React, { useState, useEffect } from "react";

import "./Formulario.css";
import httpHelper from "../../helpers/httpHelper";
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Jumbotron, Panel, Radio, Row, Table } from "react-bootstrap";

const Formulario = () => {
  // 2.1
  const checkboxesList = [
    "TV / Radio/ Diario/ Revistas",
    "Agencia Territorial/ Oficina de Empleo",
    "Sindicato/ Camara/ Entidad Intermedia",
    "Amigos/ Compañeros/ Vecinos",
    "Redes Sociales",
    "Otros",
  ];

  const getDefaultCheckboxes = () =>
    checkboxesList.map((checkbox) => ({
      name: checkbox,
      fieldName: "radioGroup",
      checked: false,
    }));

  const [deshabilitarInputOtro, setDeshabilitarInputOtro] = useState(true);

  const useCheckboxes = () => {
    const [checkboxes, setCheckboxes] = useState(getDefaultCheckboxes());

    function setCheckbox(index, checked) {
      const newCheckboxes = [...checkboxes];
      newCheckboxes[index].checked = checked;
      setCheckboxes(newCheckboxes);
      if (newCheckboxes[index].name === "Otros") {
        setDeshabilitarInputOtro(false);
      } else {
        setDeshabilitarInputOtro(true);
      }
    }
    return {
      setCheckbox,
      checkboxes,
    };
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...entrevista, [id]: value });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log("VALUES", entrevista);
    console.log("CHECKBOXES", checkboxes.checkboxes);
    httpHelper(entrevista);
  };

  const [entrevista, setValues] = useState({
    cuil: 0,
    nombre: "",
    estado: "",
    tipoDocumento: "",
    numeroDocumento: 0,
    genero: "",
    email: "",
    fecha: Date,

    conocimiento: "",
  });

  const checkboxes = useCheckboxes();

  // 2.2

  const radios22 = ["Si", "No", "N/C"];

  const generarRadio22 = (radioId, ncDisabled) => {
    return radios22.map((opcion) => {
      return (
        <Radio
          id={radioId}
          name={radioId}
          onChange={handleInputChange}
          inline
          disabled={opcion === "N/C" && ncDisabled}
        >
          {opcion}
        </Radio>
      );
    });
  };

  //  3.1

  const radiosList = ["Si", "No"];

  const traerRadios2 = (radioId) => {
    return radiosList.map((opcion) => {
      return (
        <Radio id={radioId} name={radioId} onChange={handleInputChange} inline>
          {opcion}
        </Radio>
      );
    });
  };

  return (
    <Grid>
      <br />
      <h3> Formulario N° 6 Entrevista Virtual a Participantes </h3>
      <Jumbotron>
        <span>
          La información incluida como respuesta tiene carácter de declaración
          jurada.Su opinión es muy importantepara que podamos evaluar la calidad
          de las acciones y actividades ofrecidas en el marco de los Programas
          de la Secretaria de Empleo
        </span>
      </Jumbotron>
      <br />
      <h5> 1. Participante </h5>
      <Form onSubmit={onSubmitForm}>
        <section>
          <Row>
            <Col className="col-md-3">
              <FormGroup>
                <ControlLabel> Cuil </ControlLabel>
                <FormControl
                  id="cuil"
                  onChange={handleInputChange}
                  type="number"
                />
              </FormGroup>
            </Col>
            <Col className="col-md-9">
              <ControlLabel> Nombre y Apellido </ControlLabel>
              <FormControl
                onChange={handleInputChange}
                id="nombre"
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col className="col-md-3">
              <ControlLabel> Estado </ControlLabel>
              <FormControl onChange={handleInputChange} id="estado" />
            </Col>
            <Col className="col-md-3">
              <ControlLabel> Tipo de Documento </ControlLabel>
              <FormControl
                componentClass="select"
                id="tipoDocumento"
                onChange={handleInputChange}
              >
                <option value="">Seleccione</option>
                <option value="pasaporte">Pasaporte</option>
                <option value="dni">DNI Argentino</option>
                <option value="extranjero">Documento Extranjero</option>
              </FormControl>
            </Col>
            <Col className="col-md-3">
              <ControlLabel> N° Documento </ControlLabel>
            </Col>
            <Col className=" col-md-3">
              <FormGroup>
                <ControlLabel> Genero: </ControlLabel>
                <div className="d-block">
                  <Radio
                    onChange={handleInputChange}
                    id="genero"
                    value="Masculino"
                    name="radioGroup"
                    inline
                  >
                    Hombre
                  </Radio>
                  <Radio
                    onChange={handleInputChange}
                    id="genero"
                    value="Femenino"
                    name="radioGroup"
                    inline
                  >
                    Mujer
                  </Radio>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className=" col-md-7">
              <ControlLabel>Correo Electronico </ControlLabel>
              <FormControl
                type="email"
                onChange={handleInputChange}
                id="email"
              />
            </Col>
            <Col className=" col-md-5 ">
              <ControlLabel>Fecha de Entrevista </ControlLabel>
              <FormControl
                type="date"
                onChange={handleInputChange}
                id="fecha"
                required
              />
            </Col>
          </Row>
        </section>
        <Panel>
          <Col>
            <h6>
              Identificación de prestación / proyecto al que estuvo vinculado al
              momento de la visita:
            </h6>
          </Col>
          <Panel.Body>
            <Row>
              <Col className="col-md-4">
                <span>Código de Agencia Territorial:</span>
                <FormControl type="number" id="territorial" />
              </Col>
              <Col className="col-md-4">
                <span>Código de Programa:</span>
                <FormControl type="number" id="programa" />
              </Col>
              <Col className="col-md-4">
                <span>Código de Proyecto:</span>
                <FormControl type="number" id="proyecto" />
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
        <hr />
        <h4> 2. Control y Funcionamiento de la Actividad </h4>
        <section>
          <h6> 2.1¿ Cómo se entero de la oferta de la acción / proyecto </h6>
          <Row>
            <Col className="col-md-12 opciones-radio ">
              {checkboxes.checkboxes.map((checkbox, index) => {
                return (
                  <Radio
                    name={checkbox.fieldName}
                    onChange={(e) => {
                      checkboxes.setCheckbox(index, e.target.checked);
                    }}
                  >
                    {checkbox.name}
                  </Radio>
                );
              })}
              <Row>
                <Col md={6} mdPush={6}>
                  <FormControl
                    type="text"
                    disabled={deshabilitarInputOtro}
                    id="conocimiento"
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
        <hr />
        <section>
          <h6>
            2.2 Informacion sobre la acción / prouecto en el que participó
          </h6>
          <Row>
            <Col className="col-md-9">
              <FormGroup>
                <ControlLabel>
                  ¿Tuvo que abonar para acceder al proyecto o los materiales y
                  plataforma ?
                </ControlLabel>
              </FormGroup>
            </Col>
            <Col className="col-md-3" mdPush={1}>
              <FormGroup>{generarRadio22("tuvoAbonarAcceder", true)}</FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-9">
              <FormGroup>
                <ControlLabel>
                  ¿Tuvo que abonar para que le certifiquen la aprobación del
                  Curso / Taller ?
                </ControlLabel>
              </FormGroup>
            </Col>
            <Col className="col-md-3" mdPush={1}>
              <FormGroup>
                {generarRadio22("tuvoAbonarCertifiquen", false)}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-9">
              <FormGroup>
                <ControlLabel>
                  ¿La acción / proyecto en el que participó coincidió con su
                  inscripción ?
                </ControlLabel>
              </FormGroup>
            </Col>
            <Col className="col-md-3" mdPush={1}>
              <FormGroup>
                {generarRadio22("accionProyectoCoincidio", true)}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-9">
              <FormGroup>
                <ControlLabel>
                  ¿Recibió algún tipo de comunicación de la fecha de inicio de
                  las actividades ?
                </ControlLabel>
              </FormGroup>
            </Col>
            <Col className="col-md-3" mdPush={1}>
              <FormGroup>
                {generarRadio22("ricibioComunicacion", true)}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-9">
              <FormGroup>
                <ControlLabel>
                  ¿Pudo conectarse sin dificultad a la plataforma ?
                </ControlLabel>
              </FormGroup>
            </Col>
            <Col className="col-md-3" mdPush={1}>
              <FormGroup> {generarRadio22("pudoConectarse", true)} </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-9">
              <FormGroup>
                <ControlLabel>
                  ¿Logró comunicarse con el soporte técnico para solucionar
                  problemas ? (si corresponde)
                </ControlLabel>
              </FormGroup>
            </Col>
            <Col className="col-md-3" mdPush={1}>
              <FormGroup>{generarRadio22("logroComunicarse", false)}</FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-9">
              <FormGroup>
                <ControlLabel>
                  ¿Hubo Foros de consultas / novedades / debatesdisponibles ?
                </ControlLabel>
              </FormGroup>
            </Col>
            <Col className="col-md-3" mdPush={1}>
              <FormGroup> {generarRadio22("foroDeConsultas", true)} </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-9">
              <FormGroup>
                <ControlLabel>
                  ¿El tutor estuvo disponible para consultas sobre la acción /
                  proyecto ? (si corresponde)
                </ControlLabel>
              </FormGroup>
            </Col>
            <Col className="col-md-3" mdPush={1}>
              <FormGroup>{generarRadio22("tutorDisponible", false)}</FormGroup>
            </Col>
          </Row>
        </section>
        <hr />
        <h6>2.3 Opinión sobrelos contenidos y actividades de la plataforma</h6>
        <section>
          <Col>
            <FormGroup>
              <ControlLabel>
                Según su experiencia, indique el grado de satisfacción con los
                conocimientos y experiencias adquiridos en la actividad
              </ControlLabel>
            </FormGroup>
          </Col>
          <Table responsive bordered condensed>
            <tbody>
              <tr className="fila-chica">
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Muy bueno </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Bueno </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Regular </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Malo </Radio>
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </Table>
          <br />
          <Col>
            <FormGroup>
              <ControlLabel>
                Según su parecer cómo le resultó el / los contenidosactividades
                del proyecto
              </ControlLabel>
            </FormGroup>
          </Col>
          <Table responsive bordered condensed>
            <tbody>
              <tr className="fila-chica">
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Muy bueno </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Bueno </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Regular </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Malo </Radio>
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </section>
        <hr />
        <h6> 2.4 Materiales de acción </h6>
        <section>
          <Col>
            <FormGroup>
              <ControlLabel>
                ¿Los materiales(documentos de lectura, manuales, etc.) fueron
                útilespara el desarrollo dela acción / proyecto ? Indiquesu
                opinión
              </ControlLabel>
            </FormGroup>
          </Col>
          <Table responsive bordered condensed>
            <tbody>
              <tr className="fila-chica">
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Muy bueno </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Bueno </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Regular </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Malo </Radio>
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </section>
        <hr />
        <h6> 2.5 Tutor / Soporte técnico </h6>
        <section>
          <Col>
            <FormGroup>
              <ControlLabel>
                ¿Qué opina sobrelas intervenciones, orientaciones y
                respuestasdel tutor / capacitador ? (si corresponde)
              </ControlLabel>
            </FormGroup>
          </Col>
          <Table responsive bordered condensed>
            <tbody>
              <tr className="fila-chica">
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Muy bueno </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Bueno </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Regular </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Malo </Radio>
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </section>
        <hr />
        <h6> 2.6 Tiempos de actividad </h6>
        <section>
          <Col>
            <FormGroup>
              <ControlLabel>
                Los tiemposasignadospara el desarrollo de cada actividad fueron
                :
              </ControlLabel>
            </FormGroup>
          </Col>
          <Table responsive bordered condensed>
            <tbody>
              <tr className="fila-chica">
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Muy bueno </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Bueno </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Regular </Radio>
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup>
                    <Radio name="satisfaccionConocimientos"> Malo </Radio>
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </section>
        <hr />
        <h4> 3. Evolucion General y sugerencias del Participante </h4>
        <section>
          <h5>
            3.1¿ Cree que podría introducir alguna mejora en el proyecto / curso
            que realizó ?
          </h5>
          <FormGroup> {traerRadios2("mejoraElProyecto", true)} </FormGroup>
          <Row>
            <Col className="col-md-2">
              <ControlLabel> ¿Qué mejoraría ?</ControlLabel>
            </Col>
            <Col className="col-md-10">
              <FormControl
                type="text"
                disabled={deshabilitarInputOtro}
                id="opinion"
                onChange={handleInputChange}
              />
            </Col>
          </Row>
        </section>
        <Row>
          <Col md={12} className="text-right">
            <Button type="submit" className="btn-primary">
              Enviar
            </Button>
          </Col>
        </Row>
      </Form>
    </Grid>
  );
};
export default Formulario;
