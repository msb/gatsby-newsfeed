import React, { FC, FormEventHandler, ChangeEventHandler } from 'react'
import styled from "styled-components"
import { ThemedPropsBase, spacing } from '../theme'
import Icon from './Icon'

const Form = styled.form`
  display: flex;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.40);
`

const Input = styled.input.attrs({
  type: "search",
  placeholder: "Search the content"
})<ThemedPropsBase>`
  border: none;
  height: 40px;
  font-family: "Roboto Mono";
  padding: 0 ${spacing}px;
  &:focus{
    outline: none;
  }
  font-size: 1em;
  width: 100%
`

const Button = styled.button`
  background: gray;
  border: none;
  cursor: pointer;
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #ccc;
  }
`

type SearchFormProps = {
  // invoked on the form's submit event
  onSubmit: FormEventHandler<HTMLFormElement>
  // invoked on the search input's change event 
  onChange: ChangeEventHandler<HTMLInputElement>
  // search input's value
  value: string
}

// A component combining a styled search input and form.
const SearchForm: FC<SearchFormProps> = ({value, onSubmit, onChange}) => (
  <Form onSubmit={onSubmit}>
    <Input onChange={onChange} value={value}/>
    <Button type="submit">
      <Icon>search</Icon>
    </Button>
  </Form>
)

export default SearchForm
