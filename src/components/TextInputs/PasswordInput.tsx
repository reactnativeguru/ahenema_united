import React, {useState, forwardRef} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {SIZES, COLORS} from '../../constants';
import {Entypo} from '..';

const PasswordInput = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.input}
        onChangeText={props.onChangeText}
        editable={!props.disabled}
        secureTextEntry={!show}
        ref={ref ? ref : null}
      />
      <TouchableOpacity
        style={styles.iconOpacityView}
        onPress={() => setShow(!show)}
      >
        <Entypo
          color={COLORS.gray}
          size={25}
          name={show ? 'eye' : 'eye-with-line'}
        />
      </TouchableOpacity>
    </View>
  );
});
export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    paddingHorizontal: SIZES.paddingLeft,
  },
  iconOpacityView: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
