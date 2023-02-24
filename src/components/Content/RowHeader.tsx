import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {SIZES, COLORS, FONTS} from '../../constants';

type Props = {
  title: string;
  onPress: () => void;
};

const RowHeader = (props: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View>
        {props.onPress ? (
          <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.text}>View All</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default RowHeader;

RowHeader.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    ...FONTS.body5,
  },
  text: {
    fontSize: SIZES.body5,
    // fontFamily: 'Montserrat-Bold',
    color: COLORS.primary,
  },
});
