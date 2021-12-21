import { ThemeProvider } from "@emotion/react"
import { Button, Container, createTheme, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material'
import CelebrationIcon from '@mui/icons-material/Celebration'
import { SubmitHandler, useForm } from "react-hook-form"
import { SnackbarProvider, useSnackbar } from 'notistack'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider autoHideDuration={1200}>
        <LoginPage />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App

type LoginFormInput = {
  email: string
  password: string
}

const LoginPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormInput>()
  const { enqueueSnackbar } = useSnackbar()
  const onSubmit: SubmitHandler<LoginFormInput> = data => {
    console.log(data)
    enqueueSnackbar('login dc roi', { variant: 'success' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='sm'>
        <Grid
          container
          height='100vh'
          alignItems='center'
        >
          <Grid
            container
            justifyContent='center'
            spacing={2}
          >
            <Grid
              item
              xs={12}
              container
              justifyContent='center'
            >
              <CelebrationIcon fontSize='large' />
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent='center'
            >
              <TextField
                variant='outlined'
                label='Email'
                type='email'
                required
                {...register('email')}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent='center'
            >
              <TextField
                variant='outlined'
                label='Password'
                type='password'
                required
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...register('password', {
                  minLength: {
                    value: 10,
                    message: 'too short'
                  }
                })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent='center'
            >
              <Button variant="contained" type='submit' style={{ width: 230 }}>
                Login
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent='center'
            >
              <Typography>
                Don't have an account?
                {' '}
                <Link style={{ cursor: 'pointer' }}>
                  sign up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </form>
  )
}
