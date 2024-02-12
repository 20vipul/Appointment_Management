import { Button, Card, CardBody, CardHeader, Col, Form, Row } from "react-bootstrap";
import { BsChevronBarExpand } from "react-icons/bs";
import { useState } from "react";

const AddAppointment =({onSendAppointment, lastId}) =>{

  const clearData = {
    firstName : '',
    lastName : '',
    aptDate : '',
    aptTime : '',
    aptNotes : ''
  }

  let [toggleform, setToggleForm] = useState(false) 
  let [formData, setFormData] = useState(clearData)

  function formDataPublish() {
    const appointmentInfo = {
      id : lastId +1,
      firstName : formData.firstName,
      lastName : formData.lastName,
      aptDate : formData.aptDate + ', '+ formData.aptTime,
      aptNotes : formData.aptNotes
    }

    onSendAppointment(appointmentInfo);
    setToggleForm(!toggleform);
  }

  function handleToggle(){
    return(
      setToggleForm(!toggleform)
    )
  }

  let cardBodyContent = null;

  if (toggleform) {
    cardBodyContent=(
      <CardBody>
            <Form> 
              <Row className="mb-3">
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="FirstName" id="firstName" 
                  onChange={(event) => setFormData({...formData, firstName : event.target.value })}/>
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="LastName" id="lastName" 
                  onChange={(event) => setFormData({...formData, lastName : event.target.value })}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Appointment Date</Form.Label>
                  <Form.Control type="date" id="aptDate" 
                  onChange={(event) => setFormData({...formData, aptDate : event.target.value })}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Appointment Time</Form.Label>
                  <Form.Control type="time" id="aptTime" 
                  onChange={(event) => setFormData({...formData, aptTime : event.target.value })}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control as="textarea" id="aptNotes" 
                  onChange={(event) => setFormData({...formData, aptNotes : event.target.value })}/>
                </Form.Group>

                <Button variant="primary" onClick={formDataPublish}>Submit</Button>

              </Row>
            </Form>
          </CardBody>
    )
  }


  return(
    <>
      <Col md="8">
        <Card mb="3">
          <CardHeader> Add Appointment 
            <Button className="sm float-end" variant="light" onClick={handleToggle}><BsChevronBarExpand /></Button>
          </CardHeader>
          {cardBodyContent}
        </Card>
      </Col>
    </>
  )
}

export default AddAppointment;