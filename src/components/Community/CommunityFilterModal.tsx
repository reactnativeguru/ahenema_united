import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {COLORS, FONTS, WIDTH, HEIGHT} from '../../constants';
// import {Context as CommunityContext} from '../../context/communityContext';

type Item = {
  label: string;
  slug: string;
};

type Props = {
  heading?: string;
  labels: any;
  communityValue: string;
  communityTitle: string;
  _OnPress: (label?: string, title?: string) => void;
};

export default function CommunityFilterModal({
  heading,
  labels,
  communityValue,
  communityTitle,
  _OnPress,
}: Props) {
  const [selected, setSelected] = useState('');
  const [title, setTitle] = useState('');

  // const {state: communityState, selectCommunity} = useContext(CommunityContext);

  useEffect(() => {
    const getData = () => {
      setSelected(communityValue);
      setTitle(communityTitle);
    };
    return getData();
  }, [communityValue, communityTitle]);

  const onSelect = (item: Item) => {
    setSelected(item.slug);
    setTitle(item.name);
    // selectCommunity(item);
  };

  return (
    <Modal
      isVisible={true}
      style={styles.modalContainer}
      // transparent
      swipeDirection={'down'}
      onSwipeComplete={() => _OnPress()}
      onBackButtonPress={() => _OnPress()}
      onBackdropPress={() => _OnPress()}
      backdropColor={COLORS.black}
      propagateSwipe={true}
    >
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.modalSubContainer}
          onPress={() => _OnPress(communityValue, communityTitle)}
        />
        <View style={styles.subView}>
          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => _OnPress(communityValue, communityTitle)}
          />
          <View style={[styles.headView]}>
            <View style={styles.headTextView}>
              <Text style={styles.headText}>{heading}</Text>
            </View>
            <TouchableOpacity
              style={styles.doneView}
              onPress={() => _OnPress(selected, title)}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollViewContainer}>
            {labels.map((item: Item, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.selectView}
                  onPress={() => onSelect(item)}
                >
                  <View style={[styles.selectTextView]}>
                    <Text style={styles.selectText}>{item.name}</Text>
                  </View>

                  <View style={styles.selectIconView}>
                    {selected === item.slug ? (
                      <Icon
                        name={'check'}
                        size={25}
                        color={'#000'}
                        style={styles.icon}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
  },
  modalSubContainer: {
    width: WIDTH,
    height: HEIGHT - 400,
  },
  view: {
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
  },
  subView: {
    width: WIDTH,
    height: 400,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  viewBtn: {
    width: 50,
    height: 5,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#afafaf',
  },
  headView: {
    width: WIDTH,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  headTextView: {
    width: WIDTH - 150,
    marginLeft: 75,
    height: 50,
    justifyContent: 'center',
  },
  headText: {
    ...FONTS.body4,
    fontWeight: '700',
    marginVertical: 10,
    textAlign: 'center',
  },
  doneView: {
    width: 75,
    height: 50,
    justifyContent: 'center',
    paddingRight: 20,
  },
  doneText: {
    ...FONTS.body5,
    marginVertical: 10,
    textAlign: 'right',
    color: COLORS.lightGray,
  },
  scrollViewContainer: {
    flex: 1,
  },
  selectView: {
    width: WIDTH,
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  selectTextView: {
    width: WIDTH - 80,
    paddingLeft: 20,
    height: 60,
    justifyContent: 'center',
  },
  selectText: {
    ...FONTS.h4,
    marginVertical: 10,
    color: COLORS.black,
  },
  selectIconView: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    paddingRight: 20,
    alignItems: 'flex-end',
  },
  icon: {fontWeight: 'bold'},
});
