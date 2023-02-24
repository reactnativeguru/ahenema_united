import React, {forwardRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';
import {scale} from 'react-native-size-matters';

type Props = {
  textarea?: boolean;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  disabled?: boolean;
  search?: boolean;
  placeholder: string;
  value: string;
  maxLength?: number;
  multiline?: boolean;
};

const Input = forwardRef((props: Props, ref) => (
  <TextInput
    autoCapitalize="none"
    {...props}
    style={[
      styles.container,
      !props.textarea ? styles.textInputArea : styles.input,
      props.search ? styles.searchInput : {},
    ]}
    textAlignVertical={'top'}
    placeholderTextColor={COLORS.lightGray4}
    multiline={props.textarea}
    numberOfLines={props.textarea ? 5 : 1}
    onChangeText={props.onChangeText}
    editable={!props.disabled}
    ref={ref ? ref : null}
    selectionColor={COLORS.lightPrimary}
  />
));
export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingHorizontal: SIZES.paddingLeft,
    backgroundColor: COLORS.lightGray5,
    color: COLORS.black,
    ...FONTS.body7,
  },
  textInputArea: {height: 50},
  input: {paddingVertical: scale(10)},
  searchInput: {paddingRight: 40},
});
