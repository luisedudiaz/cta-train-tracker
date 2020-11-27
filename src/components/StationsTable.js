import { useState, useEffect } from 'react'
import { Col, Modal, Row, Table } from 'react-bootstrap'
import StationsTableItem from './StationsTableItem'


function StationsTable({ stationName, setAlertStatus }) {

  const STATIONS_ENDPOINT = 'https://raw.githubusercontent.com/thomasjfox1/cta-stations/master/cta_stations.json'
  const headers = ['#', 'STATION', 'PLATFORM', ""]
  const [stations, setStations] = useState([])
  const [modalStatus, setModalStatus] = useState(false)
  const [train, setTrain] = useState(null)

  const handleClose = () => {
    setModalStatus(false)
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      const loadStations = async () => {
        try {
          const stations = await (await fetch(STATIONS_ENDPOINT)).json()
          setStations(stations)
        } catch (e) {
          setAlertStatus(true)
        }
      }
      loadStations()
    }
    return () => { unmounted = true };
  }, [setAlertStatus])

  return <>
    <div id="table-scroll">
      <Table responsive bordered>
        <thead>
          <tr>
            {headers.map((header, i) => <th key={i}><span>{header}</span></th>)}
          </tr>
        </thead>
        <tbody style={{overflow: 'auto'}}>
          {stations.filter(s =>
            stationName === '' || s.STATION_NAME.includes(stationName))
            .map((station, i) => <StationsTableItem
              key={i}
              i={i}
              station={station}
              setModalStatus={setModalStatus.bind(this)}
              setTrain={setTrain.bind(this)}
              setAlertStatus={setAlertStatus.bind(this)}
            />)}
        </tbody>
      </Table>
    </div>
    <Modal
      show={modalStatus}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Arrivals</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {train ?
          train.map((e, i) => {
            return <div key={i}>
              <Row>
                <Col xs={12}>
                  Station: {e.staNm}
                </Col>
                <Col xs={12}>
                  Platform: {e.stpDe}
                </Col>
                <Col xs={12}>
                  Estimated Arrival Time: {new Date(e.arrT).toLocaleTimeString()}
                </Col>
                <Col xs={12}>
                  Status: {e.isApp === '0' ? 'Due' : 'Approaching'}
                </Col>
              </Row>
              <hr />
            </div>
          })
          :
          <h1 className="text-center">NO DATA</h1>
        }
      </Modal.Body>
    </Modal>
  </>
}

export default StationsTable
