import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import Field from './Field'

const Wrapper = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 40px;
`
const Card = styled.div`
  border: 1px solid #e6e6e6;
  padding: 10px 25px;
  background-color: white;
  box-shadow: 8px 8px 6px -10px #b3c6ff;
  border-radius: 5px;
`

const BottomBar = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0px;
  display: flex;
  padding-bottom: 5px;
  justify-content: center;
`

const App = () => {
  // Constants for math
  const mileInKM = 1.60934
  const marathonDistance = 42.2

  // All measurements are based off mins/km
  const [inputData, setInputData] = useState({
    minsKM: "0:00",
    minsMI: "0:00",
    fiveKM: "0:00",
    tenKM: "0:00",
    marathon: "0:00",
    halfMarathon: "0:00"
  })

  // Converts a formatted time string into seconds
  const getSecondsFromInput = (str) => {
    let words = str.split(':')
    if (words.length > 3) return 0
    let seconds = 0
    for (let i = words.length - 1, j = 1; i >= 0; i--, j *= 60) {
      let interval = parseInt(words[i])
      if (Object.is(interval, NaN)) interval = 0
      seconds += interval * j
    }
    return seconds
  }

  // Converts seconds into a formatted time string
  const getTimeFormat = (seconds) => {
    if (seconds >= 3600) {
      let hours = parseInt(seconds / 3600)
      seconds -= hours*3600
      let minutes = parseInt(seconds / 60)
      seconds -= minutes*60
      return hours + ":" + padTime(minutes) + ":" + padTime(seconds % 60)
    } else {
      let minutes = parseInt(seconds / 60)
      return minutes + ":" + padTime(seconds % 60)
    }
  }

  // Utility method for time formatting
  const padTime = (time) => {
    if (time < 10) {
      return "0" + time
    } else {
      return time
    }
  }


  useEffect(() => {
    console.log(inputData)
  }, [inputData])

  const handleChange = (e) => {
    e.preventDefault()
    let seconds = getSecondsFromInput(e.target.value)
    console.log("Input => ",e.target.value)
    console.log("getSecondsFromInput => ", seconds)
    console.log("getTimeFormat => ", getTimeFormat(seconds))
    let newInputData = {}

    // Inserting current value
    newInputData[e.target.name] = e.target.value

    var pace
    if (e.target.name !== "minsKM") {
      // Setting mins/KM state data
      pace = getMinsKMFrom(e.target.name,seconds)
      newInputData["minsKM"] = getTimeFormat(pace)
    } else {
      pace = getSecondsFromInput(e.target.value)
    }

    for (const key in inputData) {
      if (key !== "minsKM" && key !== e.target.name)
        newInputData[key] = getTimeFormat(getPaceFromMinsKM(key, pace))
    }
    setInputData(newInputData)
  }
  
  // Converts minsKM in type Minute to their other respective representations
  const getPaceFromMinsKM = (key,pace) => {
    let seconds
    switch(key) {
      case "minsMI":
        seconds = pace * mileInKM
        break
      case "fiveKM":
        seconds = pace * 5
        break
      case "tenKM":
        seconds = pace * 10
        break
      case "marathon":
        seconds = pace * marathonDistance
        break
      case "halfMarathon":
        seconds = pace * (marathonDistance / 2)
        break
      default:
        return pace
    }
    return Math.round(seconds)
  }

  const getMinsKMFrom = (key, pace) => {
    let minsKM
    switch(key) {
      case "minsMI":
        minsKM = pace / mileInKM
        break
      case "fiveKM":
        minsKM = pace / 5
        break
      case "tenKM":
        minsKM = pace / 10
        break
      case "halfMarathon":
        minsKM = pace / (marathonDistance / 2)
        break
      case "marathon":
        minsKM = pace / (marathonDistance)
        break
      default:
        return pace
    }
    return Math.round(minsKM)
  }

  return(
    <Fragment>
      <Wrapper>
        <Card>
          <Field
            name={"mins/KM"}
            id={"minsKM"}
            value={inputData["minsKM"]}
            handleChange={handleChange}
          />
          <Field
            name={"mins/MI"}
            id={"minsMI"}
            value={inputData["minsMI"]}
            handleChange={handleChange}
          />
          <Field
            name={"5K"}
            id={"fiveKM"}
            value={inputData["fiveKM"]}
            handleChange={handleChange}
          />
          <Field
            name={"10K"}
            id={"tenKM"}
            value={inputData["tenKM"]}
            handleChange={handleChange}
          />
          <Field
            name={"Half Marathon"}
            id={"halfMarathon"}
            value={inputData["halfMarathon"]}
            handleChange={handleChange}
          />
          <Field
            name={"Marathon"}
            id={"marathon"}
            value={inputData["marathon"]}
            handleChange={handleChange}
          />
        </Card>
      </Wrapper>
      <BottomBar>
        Made with 🏃‍♂️🏃‍♀️💨 by Michael Truong.
      </BottomBar>
    </Fragment>
  )
}

export default App