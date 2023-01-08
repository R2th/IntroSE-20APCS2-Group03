import checkIcon from '../../assets/svg/check.svg';
import errorIcon from '../../assets/svg/error.svg';
import infoIcon from '../../assets/svg/info.svg';
import warningIcon from '../../assets/svg/warning.svg';

const TOAST_PROPERTIES = [
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Link copied',
    description: '',
    backgroundColor: '#5cb85c',
    icon: checkIcon,
  },
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Error',
    description: 'This is an error toast component',
    backgroundColor: '#d9534f',
    icon: errorIcon,
  },
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Info',
    description: 'This is an info toast component',
    backgroundColor: '#5bc0de',
    icon: infoIcon,
  },
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Warning',
    description: 'This is a warning toast component',
    backgroundColor: '#f0ad4e',
    icon: warningIcon,
  },
];

export default TOAST_PROPERTIES;
