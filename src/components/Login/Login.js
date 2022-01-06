import React, { useContext, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }

  }
  return { value: '', isValid: false }
}
const passReducer = (state, action) => {
  if (action.type === 'PASS_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'PASS_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }

  }
  return { value: '', isValid: false }
}

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passState, dispatchPass] = useReducer(passReducer, { value: '', isValid: null });

  const { isValid: emailIsValis } = emailState;
  const { isValid: passIsValis } = passState;

  const authCtx = useContext(AuthContext);

  //useEffect(() => {
  // const identifier = setTimeout(() => {
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //   );
  //}, 500);
  // return () => {
  //   clearTimeout(identifier)
  // }
  //  }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

    setFormIsValid(
      passIsValis && emailIsValis
    );

  };

  const passwordChangeHandler = (event) => {
    dispatchPass({ type: 'PASS_INPUT', val: event.target.value })

    setFormIsValid(
      passIsValis && emailIsValis
    );

  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPass({ type: 'PASS_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passState.value);
    } else if (!emailIsValis) {

    } else {

    }

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" label="E-Mail" type="email" isValid={emailIsValis} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        <Input id="password" label="Password" type="password" isValid={passIsValis} value={passState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
