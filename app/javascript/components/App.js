import React, { useState, useEffect } from 'react'
import Field from './Field'

const kphToMinsKM = (kmh) => {
  let minsKM = (60/kmh)
  return numToMinutes(minsKM)
}

// Converts a numerical representation of some minutes
// to the literal string representation mm:ss
const numToMinutes = (n) => {
  let minutes = Math.floor(n)
  let seconds = ((n - minutes) * 60).toFixed(0)
  return minutes + ":"  + seconds
}

const App = () => {
  const [kph, setKPH] = useState(0)
  const [mph, setMPH] = useState(0)
  const [mpk, setMPK] = useState(0)
  const [minsMI, setMinsMI] = useState(0)
  const [fiveKM, setFiveKM] = useState(0)
  const [tenKM, setTenKM] = useState(0)
  const [halfMarathon, setHalfMarathon] = useState(0)
  const [marathon, setMarathon] = useState(0)
  const [data, setData] = useState({
    'kph':0,
    'mph':0,
    'mpk':0,
    'mpmi':0,
    'fiveKM':0,
    'tenKM':0,
    'halfMarathon':0,
    'marathon':0
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect(() => {
    setMPK(kphToMinsKM(kph))
  }, [kph])

  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.value, "=>",kphToMinsKM(e.target.value))
    setKPH(e.target.value)
  }

  return(
    <div>
      <Field
        name={"KM/Hour"}
        key={"kph"}
        value={kph}
        handleChange={handleChange}
      />
      <Field
        name={"mins/KM"}
        key={"mpk"}
        value={mpk}
        handleChange={handleChange}
      />
    </div>
  )
}

export default App