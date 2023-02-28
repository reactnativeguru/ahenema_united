import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {SIZES} from '../../constants';
import {scale} from 'react-native-size-matters';
import avatar from '../../assets/images/avatar.png';

const RetailerPostMapScreen = ({locations, onPress}) => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude:
            locations && locations[0]?.latitude
              ? locations[0]?.latitude
              : 37.78825,
          longitude:
            locations && locations[0]?.longitude
              ? locations[0]?.longitude
              : -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}>
        {locations.map(item => (
          <Marker
            onPress={() => onPress(item)}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}>
            <Image source={{uri: item.image}} style={styles.locationImage} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default RetailerPostMapScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: -SIZES.paddingLeft,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: scale(SIZES.radius * 2),
  },
  locationImage: {
    height: 35,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    width: 35,
  },
});
