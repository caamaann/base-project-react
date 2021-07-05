import React, { useState, useEffect } from 'react'
import { Column, Row } from 'simple-flexbox'
import { connect, useDispatch } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Button from '@material-ui/core/Button'
import { reduxForm, Field } from 'redux-form'
import { formInput } from '../../components/commons/form'
import IconInput from '../../assets/icon/icon-input'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import { history } from '../../utils'
import LoginImage from '../../assets/img/gedung_h-2.jpg'

// ACTION REDUX
import Auth from '../../store/actions/auth'

let Login = ({ handleSubmit, loggingIn }) => {
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    Auth.logout()
  }, [])

  const onSubmit = ({ username, password }) => {
    dispatch(Auth.auth_login({ username, password }))
  }

  return (
    <Grid container>
      <Grid
        item
        xs={1}
        sm={1}
        md={4}
        lg={4}
        className={css(styles.sideContainer)}
      >
        <img
          className={css(styles.loginImg)}
          src={LoginImage}
          alt="login-img"
        />
      </Grid>
      <Grid
        item
        xs={10}
        sm={10}
        md={7}
        lg={7}
        className={css(styles.loginContainer)}
      >
        <Column>
          <span className={css(styles.loginTitle)}>
            Login ke Sistem Pengajuan Beasiswa
          </span>
          <span className={css(styles.loginDesc)}>
            Masukkan NIM atau NIP dan password Anda
          </span>
          {/* <hr className={css(styles.loginSeparator)} /> */}
          <div className={css(styles.loginSeparator)}></div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={css(styles.loginForm)}
          >
            <Field
              name="username"
              placeholder="NIM atau NIP"
              component={formInput}
            />
            <Field
              name="password"
              placeholder="Password"
              type={!isVisible ? 'password' : 'text'}
              autoComplete="current-password"
              isVisible={isVisible}
              setIsVisible={() => setIsVisible(!isVisible)}
              isTypePassword
              component={formInput}
              className={css(styles.inputMargin)}
            />
            <Row horizontal="space-between">
              <Button
                style={{ width: '120px' }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={loggingIn}
                className={css(styles.approveButton)}
                startIcon={
                  loggingIn ? (
                    <CircularProgress
                      size={14}
                      color="secondary"
                      style={{ marginRight: 10 }}
                    />
                  ) : (
                    <></>
                  )
                }
              >
                Login
              </Button>
              <Column>
                <span
                  // onClick={() => history.push("/forgot-password")}
                  className={css(styles.inputLink)}
                >
                  {/* Lupa password? */}
                </span>
              </Column>
            </Row>
          </form>
        </Column>
      </Grid>
    </Grid>
  )
}

const styles = StyleSheet.create({
  sideContainer: {
    height: '100vh',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  loginImg: {
    objectFit: 'cover',
    width: '100%',
    display: 'block',
    height: '100vh',
  },
  loginContainer: {
    // width: "auto",
    margin: 'auto',
  },
  loginTitle: {
    color: '#00008B',
    fontSize: 36,
    fontWeight: 'bold',
    margin: 15,
  },
  loginDesc: {
    fontSize: 16,
    margin: '0 15px',
  },
  loginSeparator: {
    maxWidth: 400,
    margin: '20px 15px',
    // borderTop: '2px solid rgba(0,0,0,0.1)',
    '@media (max-width: 480px)': {
      width: '100%',
    },
  },
  loginForm: {
    width: 400,
    marginLeft: 15,
    '@media (max-width: 480px)': {
      width: '100%',
    },
  },
  approveButton: {
    background: '#00008B 0% 0% no-repeat padding-box',
    boxShadow: 'none',
    margin: '15px 0',
  },
  inputMargin: {
    margin: '15px 0',
  },
  inputLink: {
    fontSize: 16,
    color: 'black',
    textDecoration: 'none',
    marginLeft: 15,
    marginTop: 30,
    ':hover': {
      cursor: 'pointer',
    },
  },
})

const validate = ({ username, password }) => {
  const errors = {}
  if (!username) {
    errors.username = 'Username harus diisi'
  }
  if (!password) {
    errors.password = 'Password harus diisi'
  }
  return errors
}

Login = reduxForm({
  form: 'Login',
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Login)

const mapStateToProps = ({ auth: { loggingIn } }) => {
  return { loggingIn }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
