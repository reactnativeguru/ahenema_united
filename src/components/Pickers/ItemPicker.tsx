import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import {Select, SelectItem} from '@ui-kitten/components';

type Item = {
  label: string;
  name: string;
};

const ItemPicker = forwardRef(({data, drawer, ...otherProps}: any, ref) => {
  return (
    <Select style={styles.container} ref={ref ? ref : null} {...otherProps}>
      {data.map(({label, name}: Item, index: number) => (
        <SelectItem key={index.toString()} title={drawer ? name : label} />
      ))}
    </Select>
  );
});

export default ItemPicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS?.primary,
  },
});
