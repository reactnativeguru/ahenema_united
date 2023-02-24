import {showMessage} from 'react-native-flash-message';

type Props = {
  message: string;
  description?: string;
  type: 'none' | 'default' | 'info' | 'success' | 'danger' | 'warning';
};

const FlashMessage = ({message, description, type}: Props) =>
  showMessage({
    message,
    description,
    type,
  });
export default FlashMessage;
