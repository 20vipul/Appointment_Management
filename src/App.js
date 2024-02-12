import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCalendar2CheckFill } from "react-icons/bs";
import { Container, Row, Col, Card, CardHeader, ListGroup } from "react-bootstrap";
import Search from './Components/Search';
import AddAppointment from './Components/AddAppointment';
import AppointmentInfo from './Components/AppointmentInfo';
import { useCallback, useEffect, useState } from 'react';


function App() {

  let [appointmentList,setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortby, setSortBy] = useState("firstName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.lastName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase()) 
      )
    }
  ).sort((a, b) =>{
    let order = (orderBy === "asc")? 1 : -1 ;
    return(
      a[sortby].toLowerCase() < b[sortby].toLowerCase() ? -1*order : 1*order
    )
  })

  const fetchData = useCallback(() =>{
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      setAppointmentList(data)
    })
  },[])

  useEffect(()=>{
    fetchData()
  },[fetchData])


  return (
   <div className="App">
      <Container>

        <Row>
          <Col>
            <h1 className="text-center fw-light mt-3 "><BsCalendar2CheckFill/> Appointments</h1>
          </Col>
        </Row>

        <Row  className="justify-content-center mb-3 ">
          <AddAppointment 
            onSendAppointment={myAppointment => setAppointmentList([...appointmentList,myAppointment])} 
            lastId = {appointmentList.reduce((max, item)=> Number(item.id) > max ? Number(item.id) : max, 0)}/>
        </Row>

        <Row className="justify-content-center ">
          <Col md={4}>
            <Search 
              query={query} 
              onQueryChange={myQuery => setQuery(myQuery)}
              orderBy={orderBy}
              onOrderByChange={myOrder => setOrderBy(myOrder)}
              sortBy = {sortby}
              onSortByChange = {mySort =>setSortBy(mySort)}
              />
          </Col>
        </Row>

        <Row className="justify-content-center ">
          <Col md="8">
            <Card className="mb-3">
              <CardHeader>Appointments</CardHeader>
              <ListGroup variant="flush">
                {filteredAppointments.map(appointment =>(
                <AppointmentInfo key={appointment.id} appointment = {appointment}
                onDeleteAppointment={
                  appointmentId => setAppointmentList(appointmentList.filter(
                    appointment => appointment.id !== appointmentId
                  ))
                }/>
              ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>

        
      </Container>
   </div>
  );
}
export default App;