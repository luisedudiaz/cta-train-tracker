import React, {useState} from 'react'
import { Alert, Container, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import Header from './components/Navbar';
import StationsTable from './components/StationsTable'

import './App.css'

function App() {

  const [stationName, setStationName] = useState("")
  const [alertStatus, setAlertStatus] = useState(false);

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col>
            <Alert show={alertStatus} variant="danger" onClose={() => setAlertStatus(false)} dismissible>
              Something wrong happend.
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl onChange={e => setStationName(e.target.value)} placeholder="Search your station" />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <StationsTable stationName={stationName} setAlertStatus={setAlertStatus.bind(this)}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
