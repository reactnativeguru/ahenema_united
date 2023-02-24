import React, {forwardRef} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {SIZES, COLORS} from '../../constants';
import CountryPicker from 'react-native-region-country-picker';

const PhoneInput = forwardRef((props, ref) => {
  const countryInput = () => (
    <CountryPicker
      countryPickerRef={() => {
        //  countryPickerRef = ref;
      }}
      enable={true}
      darkMode={true}
      countryCode={props.countryCode}
      showFlag={true}
      showCallingCode={true}
      onSelectCountry={data => {
        console.log('DATA', data);
        props.setCountryCallingCode(`+${data.callingCode}`);
        props.setCountryCode(data.code);
      }}
      onOpen={() => {
        console.log('Open');
      }}
      onClose={() => {
        console.log('Close');
      }}
      containerStyle={{
        container: {
          height: '100%',
          paddingLeft: SIZES.paddingLeft,
          paddingRight: 5,
          width: 80,
          borderBottomLeftRadius: 25,
          borderTopLeftRadius: 25,
        },
        countryCodeStyle: {
          display: 'none',
        },
        countryNameStyle: {
          display: 'none',
        },
      }}
      modalStyle={{
        container: {
          flex: 1,
        },
        itemStyle: {
          itemContainer: {flex: 1},
          flagStyle: {flex: 1},
          countryCodeStyle: {
            flex: 1,
            display: 'none',
          },
          countryNameStyle: {
            flex: 3,
            width: '100%',
            fontWeight: '300',
          },
          callingNameStyle: {
            flex: 2,
          },
        },
      }}
      title={'Country'}
      searchPlaceholder={'Search'}
      showCloseButton={true}
      showModalTitle={true}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.codeView}>{countryInput()}</View>
      <TextInput
        {...props}
        style={styles.input}
        onChangeText={props.onChangeText}
        editable={!props.disabled}
        keyboardType={'number-pad'}
        ref={ref ? ref : null}
      />
    </View>
  );
});
export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.lightGray4,
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: SIZES.paddingLeft,
    borderBottomWidth: 1,
    alignSelf: 'flex-end',
    borderColor: COLORS.lightGray4,
    marginLeft: 10,
  },
  iconOpacityView: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeView: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray4,
  },
});
