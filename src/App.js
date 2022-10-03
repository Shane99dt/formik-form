import Input from "./components/Input"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useState } from "react"

const App = () => {

  const [ formSubmitted, setFormSubmitted ] = useState(false)
  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      passwordConfirmation:"",
      firstName:"",
      lastName:"",
      username:"",
      birthday:"",
      profileGithub:"",
    },
    onSubmit: (values, {resetForm, setSubmitting})=> {
      setSubmitting(true)

      setTimeout(() => {
        setSubmitting(false)
        setFormSubmitted(true)
        resetForm()
      }, 3000)
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("email is required")
        .email('Not an email'),
      password: Yup.string()
        .required('Password is required')
        .min(8, "Password must be more than 8 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain One Uppercase, One Lowercase, One Number and One Special Case Character"),
      passwordConfirmation: Yup.string()
        .required('Password confirmation is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      firstName: Yup.string()
        .required('Firstname is required'),
      lastName: Yup.string()
        .required('Lastname is required'),
      username: Yup.string()
        .required('Username is required')
        .min(4, 'Username must be at least 4 characters'),
      profileGithub: Yup.string()
        .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,'Not an valid URL')
        .required('Please enter website'),
      birthday: Yup.date()
        .required()
        .test("age", "You must be 18 or older", function(birthdate) {
          const cutoff = new Date();
          cutoff.setFullYear(cutoff.getFullYear() - 18);
          return birthdate <= cutoff;
        })

    })
  })

  return(
    <>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="First name"
          name="firstName"
          placeholder="First name"
          handleChange={formik.handleChange}
          value={formik.values.firstName}
          type="text"
          error={formik.errors.firstName}
          disabled={formik.isSubmitting}
        />
        <Input
          label="Last name"
          name="lastName"
          placeholder="Last name"
          handleChange={formik.handleChange}
          value={formik.values.lastName}
          type="text"
          error={formik.errors.lastName}
          disabled={formik.isSubmitting}
        />
        <Input
          label="E-mail"
          name="email"
          placeholder="E-mail"
          handleChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          error={formik.errors.email}
          disabled={formik.isSubmitting}
        />
        <Input
          label="Password"
          name="password"
          placeholder="Password"
          handleChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          error={formik.errors.password}
          disabled={formik.isSubmitting}
        />
        <Input
          label="Password confirmation"
          name="passwordConfirmation"
          placeholder="Password Confirmation"
          handleChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
          type="password"
          error={formik.errors.passwordConfirmation}
          disabled={formik.isSubmitting}
        />
        <Input
          label="Username"
          name="username"
          placeholder="Username"
          handleChange={formik.handleChange}
          value={formik.values.username}
          type="text"
          error={formik.errors.username}
          disabled={formik.isSubmitting}
        />
        <Input
          label="Birthday"
          name="birthday"
          handleChange={formik.handleChange}
          value={formik.values.birthday}
          type="date"
          error={formik.errors.birthday}
          disabled={formik.isSubmitting}
        />
        <Input
          label="Github profile"
          name="profileGithub"
          placeholder="Github profile"
          handleChange={formik.handleChange}
          value={formik.values.profileGithub}
          type="url"
          error={formik.errors.profileGithub}
          disabled={formik.isSubmitting}
        />
        <button type="submit" disabled={formik.isSubmitting}>
          Create Account
        </button>
      </form>

      {formSubmitted && <p style={{color:"green"}}>Submitted</p>}

    </>
  )
}

export default App