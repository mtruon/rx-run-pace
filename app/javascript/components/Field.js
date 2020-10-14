import React from 'react'
import styled from 'styled-components'

const FieldWrapper = styled.div`
  width: 100%;
  
  h1 {
    font-size: 16px;
    font-weight: 300;
  }

  input {
    min-height: 30px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    margin: 0 0 12px 0;
    padding: 12px;
    width: 96%;
  }
`

const Field = (props) => {
  return(
    <FieldWrapper>
      <h1>{props.name}</h1>
      <input
        onChange={props.handleChange}
        value={props.value}
        name={props.id}
      />
    </FieldWrapper>
  )
}



export default Field