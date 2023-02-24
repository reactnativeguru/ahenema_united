import * as Yup from 'yup';

const UsernameSchema = () =>
  Yup.object().shape({
    username: Yup.string()
      .min(4, 'Username is too short')
      .max(20, 'Username is too long')
      .required('Please enter username'),
  });

const SignInSchema = () =>
  Yup.object().shape({
    username: Yup.string().required('Please enter username'),
    password: Yup.string().required('Please enter password'),
  });

const SignUpSchema = () =>
  Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter email'),
    password: Yup.string()
      .min(2, 'Password is too short')
      .required('Please enter password'),
    confirmPassword: Yup.string()
      .required('Please enter confirm password.')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    username: Yup.string()
      .min(4, 'Username is too short')
      .required('Please enter username'),
    phoneNumber: Yup.string()
      .min(7, 'Phone number is too short')
      .max(17, 'Phone number is too short')
      .required('Please enter phone number'),
  });

const SignUpMentorSchema = () =>
  Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter email'),
    password: Yup.string()
      .min(2, 'Password is too short')
      .required('Please enter password'),
    confirmPassword: Yup.string()
      .required('Please enter confirm password.')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    username: Yup.string()
      .min(4, 'Username is too short')
      .required('Please enter username'),
    phoneNumber: Yup.string()
      .min(7, 'Phone number is too short')
      .max(17, 'Phone number is too short')
      .required('Please enter phone number'),
  });

const ConfirmCodeSchema = () =>
  Yup.object().shape({
    username: Yup.string()
      .min(4, 'Username is too short')
      .max(20, 'Username is too long')
      .required('Please enter username'),
    code: Yup.string()
      .min(6, 'confirm code is too short')
      .max(6, 'confirm code is too long')
      .required('Please enter confirm code'),
    password: Yup.string()
      .min(2, 'Password is too short')
      .required('Please enter password'),
  });

export {
  UsernameSchema,
  SignInSchema,
  SignUpSchema,
  SignUpMentorSchema,
  ConfirmCodeSchema,
};
