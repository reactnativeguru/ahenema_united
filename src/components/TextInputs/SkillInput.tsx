import React, {useState, forwardRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';
import {scale} from 'react-native-size-matters';

const SkillInput = forwardRef((props, ref) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.input}
        value={text}
        onChangeText={val => setText(val)}
        editable={!props.disabled}
        ref={ref ? ref : null}
      />
      <TouchableOpacity
        style={styles.textOpacityView}
        onPress={() => {
          props.Add(text);
          setText('');
        }}
        activeOpacity={0.5}
      >
        <Text style={{...FONTS.h5, color: COLORS.white}}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
});
export default SkillInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    paddingHorizontal: SIZES.paddingLeft,
  },
  textOpacityView: {
    width: scale(70),
    height: '100%',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
});
