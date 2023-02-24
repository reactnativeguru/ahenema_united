import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FloatingLabelInput as Input} from 'react-native-floating-label-input';
import {COLORS, WIDTH} from '.';

const AppInput: FC = (props: any) => {
  const {
    errorMessage,
    errorMessageStyle,
    placeholder,
    ref,
    isPassword,
    secureTextEntry,
    editable = true,
    keyboardType,
    ...rest
  } = props;

  return (
    <View style={{width: WIDTH * 0.95}}>
      <Input
        {...rest}
        containerStyles={styles.containerStyles}
        customLabelStyles={{
          fontSizeFocused: 11,
          fontSizeBlurred: 13,
          colorBlurred: COLORS.lightGray4,
          colorFocused: COLORS.lightGray4,
        }}
        ref={ref ? ref : null}
        keyboardType={keyboardType}
        editable={editable}
        secureTextEntry={secureTextEntry}
        isPassword={isPassword}
        placeholder={placeholder}
        showPasswordImageStyles={{
          tintColor:
            isPassword === false ? COLORS.transparent : COLORS.lightGray2,
        }}
        inputStyles={{
          ...styles.inputStyle,
          color: editable === true ? COLORS.black : COLORS.borderColor,
        }}
        labelStyles={styles.label}
      />
      <Text style={[styles.errorText, errorMessageStyle]}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray4,
    color: COLORS.borderColor,
  },
  errorText: {fontSize: 11, color: COLORS.lightGreen3, marginLeft: 5},
  label: {marginLeft: -5},
  inputStyle: {paddingBottom: 0, paddingLeft: 0},
});

export default AppInput;
