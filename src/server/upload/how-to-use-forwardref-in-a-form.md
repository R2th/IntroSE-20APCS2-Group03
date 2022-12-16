Forwarding refs mean that ref will be passed to a child component. In this post I will introduce the way to get value by ref in a form with multiple inputs.
For example, we aleady have a form with 2 fields: email and password like this:
LoginForm.js
```
// LoginForm.js
class LoginForm extends PureComponent {
    formRef = React.createRef()
    render() {
        const inputs = [{
          placeholder: 'Enter your email',
          error: '',
          type: 'email'
        }, {
          placeholder: 'Enter your password',
          error: '',
          type: 'password'
        }]
        return (
            <FormAuth
                onClick={this.checkValidationForm}
                inputs={inputs}
                buttonTitle='Login'
                ref={this.formRef}
              />
        )
    }
}
```
We created a ref for the parent component, now we forward ref to a child component.
```
// FormAuth.js
import React from 'react'
import { Form, Button } from 'react-bootstrap'
import FormInput from './FormInput'
import './styles/formAuth.css'

const FormAuth = React.forwardRef((props, ref) => {
  const { onClick, inputs, buttonTitle } = props
  return (
    <Form 
        ref={ref} // pass ref into form
        onSubmit={(e) => {
          e.preventDefault()
          onClick()
    }}>
      {
        inputs.map((item, index) => (
          <FormInput
            key={`form${index}`} input={item}
          />
        ))
      }
      <Button variant="info" type="submit">{buttonTitle}</Button>
    </Form>
  )
})

export default FormAuth
```
As we can see, in this form, we have 2 inputs, we dont need to use ref directly from the inputs. We also forward refs to children components input
```
// FormInput.js
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
const FormInput = React.forwardRef((props, ref) => {
  const [text, setText] = useState('')
  const { input } = props
  return (
    <Form.Group>
      <Form.Control
        className="form-input"
        type={input.type}
        placeholder={input.placeholder}
        onChange={(e) => setText(e.target.value)}
        value={text}
        ref={ref}
      />
      {input.error && <p className="error">{input.error}</p>}
    </Form.Group>
  )
})
```
To get value of each input, you can follow this:
```
const email = this.formRef.current[0].value
const password = this.formRef.current[1].value
```
With ref, you dont need to use state to save email or password, prevent rendering in many times.