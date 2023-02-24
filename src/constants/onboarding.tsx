import {SelectListProps} from '../utils/interfaces';

const optionsGender = [
  {
    color: '#2660A4',
    label: 'Please select',
    id: 1,
    value: '',
  },
  {
    color: '#2660A4',
    label: 'Male',
    id: 2,
    value: 'male',
  },
  {
    color: '#FF6B35',
    label: 'Female',
    id: 3,
    value: 'female',
  },
  {
    color: '#FFBC42',
    label: 'Trans',
    id: 4,
    value: 'trans',
  },
  {
    color: '#AD343E',
    label: 'Binary',
    id: 5,
    value: 'binary',
  },
] as SelectListProps;

const optionsEthnicity = [
  {
    color: '#2660A4',
    label: 'Please select',
    value: '',
    id: 1,
  },
  {
    color: '#2660A4',
    label: 'African',
    value: 'african',
    id: 2,
  },
  {
    color: '#FF6B35',
    label: 'Caribbean',
    value: 'caribbean',
    id: 3,
  },
  {
    color: '#FFBC42',
    label: 'Indian',
    value: 'indian',
    id: 4,
  },
  {
    color: '#AD343E',
    label: 'Asian',
    value: 'asian',
    id: 5,
  },
  {
    color: '#051C2B',
    label: 'Any other Asian background',
    value: 'other',
    id: 6,
  },
] as SelectListProps;

const optionsUserType = [
  {
    id: 1,
    label: 'Mentor',
    value: 'Mentor',
  },
  {
    id: 2,
    label: 'Mentee',
    value: 'Mentee',
  },
] as SelectListProps;

const optionsProfession = [
  {
    id: 1,
    label: 'Please select',
    value: '',
  },
  {
    id: 2,
    label: 'CTO',
    value: 'cto',
  },
  {
    id: 3,
    label: 'Developer',
    value: 'developer',
  },
  {
    id: 4,
    label: 'Doctor',
    value: 'doctor',
  },
  {
    id: 4,
    label: 'Cofounder',
    value: 'cofounder',
  },
] as SelectListProps;

export {optionsUserType, optionsGender, optionsEthnicity, optionsProfession};
