import { Button } from 'react-bootstrap'

function StationsTableItem({ station, i, setTrain, setModalStatus, setAlertStatus }) {
  const stops = [...station.STOPS]
  stops.splice(0, 1)

  const loadStation = async (stpId) => {
      try {
        const TRAINS_ENDPOINT = `/api/1.0/ttarrivals.aspx?stpid=${stpId}&outputType=JSON&key=e22345c93ad34bad94edbc2a46fa90ad`
        setModalStatus(true)
        const train = await (await fetch(TRAINS_ENDPOINT)).json()
        if (train.ctatt.eta) {
          setTrain(train.ctatt.eta)
        }
      } catch (e) {
        setAlertStatus(true)
      }
    }

  return<>
    < tr >
      <td rowSpan={station.STOPS.length}>{i + 1}</td>
      <td rowSpan={station.STOPS.length}>{station.STATION_NAME}</td>
      <td>{station.STOPS[0].STOP_NAME}</td>
      <td><Button onClick={() => loadStation(station.STOPS[0].STOP_ID)}>Detail</Button></td>
    </tr >
  {
    stops.map((stop, j) => <tr key={j}>
      <td>{stop.STOP_NAME}</td>
      <td><Button onClick={() => loadStation(stop.STOP_ID)}>Detail</Button></td>
    </tr>)
  }
  </>
}

export default StationsTableItem
