import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const TermsAndConditions = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.text}>
            publishing any Website material in any other media; selling,
            sublicensing and/or otherwise commercializing any Website material;
            publicly performing and/or showing any Website material; using this
            Website in any way that is or may be damaging to this Website; using
            this Website in any way that impacts user access to this Website;
            using this Website contrary to applicable laws and regulations, or
            in any way may cause harm to the Website, or to any person or
            business entity; engaging in any data mining, data harvesting, data
            extracting or any other similar activity in relation to this
            Website; using this Website to engage in any advertising or
            marketing. publishing any Website material in any other media;
            selling, sublicensing and/or otherwise commercializing any Website
            material; publicly performing and/or showing any Website material;
            using this Website in any way that is or may be damaging to this
            Website; using this Website in any way that impacts user access to
            this Website; using this Website contrary to applicable laws and
            regulations, or in any way may cause harm to the Website, or to any
            person or business entity; engaging in any data mining, data
            harvesting, data extracting or any other similar activity in
            relation to this Website; using this Website to engage in any
            advertising or marketing. publishing any Website material in any
            other media; selling, sublicensing and/or otherwise commercializing
            any Website material; publicly performing and/or showing any Website
            material; using this Website in any way that is or may be damaging
            to this Website; using this Website in any way that impacts user
            access to this Website; using this Website contrary to applicable
            laws and regulations, or in any way may cause harm to the Website,
            or to any person or business entity; engaging in any data mining,
            data harvesting, data extracting or any other similar activity in
            relation to this Website; using this Website to engage in any
            advertising or marketing. publishing any Website material in any
            other media; selling, sublicensing and/or otherwise commercializing
            any Website material; publicly performing and/or showing any Website
            material; using this Website in any way that is or may be damaging
            to this Website; using this Website in any way that impacts user
            access to this Website; using this Website contrary to applicable
            laws and regulations, or in any way may cause harm to the Website,
            or to any person or business entity; engaging in any data mining,
            data harvesting, data extracting or any other similar activity in
            relation to this Website; using this Website to engage in any
            advertising or marketing.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, margin: 10},
  text: {
    ...FONTS.h5,
    textAlign: 'center',
    color: COLORS.lightGray,
  },
});

export default TermsAndConditions;
