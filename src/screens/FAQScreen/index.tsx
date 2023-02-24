import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Image, Platform} from 'react-native';
import {
  HeaderBar,
  MainAppContainer,
  FaqsList,
  RoundButton,
} from '../../components';
import {globalStyles, SIZES, COLORS} from '../../constants';
import {verticalScale} from 'react-native-size-matters';
import DumyImg from '../../assets/images/faq.png';

const FAQScreen = () => {
  const [Ids, setIds] = useState([]);
  const faqArr = [
    {
      id: 0,
      title: 'Conciquat maximus',
      detail:
        'Conciquat maximusLorem ipsum, or lipsum as it is sometimes known, is dummy text used',
    },
    {
      id: 1,
      title: 'how do we do this?',
      detail:
        'how do we do this detail Lorem ipsum, or lipsum as it is sometimes known, is dummy text used',
    },
    {
      id: 2,
      title: 'how we start socializing people?',
      detail:
        'how we start socializing people Lorem ipsum, or lipsum as it is sometimes known, is dummy text used',
    },
    {
      id: 3,
      title: 'how we testing?',
      detail:
        'how we start testing people Lorem ipsum, or lipsum as it is sometimes known, is dummy text used',
    },
  ];

  const showDetail = id => {
    if (Ids.indexOf(id) !== -1) {
      let idArr = [...Ids];
      idArr.splice(Ids.indexOf(id), 1);
      setIds(idArr);
    } else {
      setIds([...Ids, id]);
    }
  };

  return (
    <MainAppContainer>
      <View style={styles.container}>
        <HeaderBar
          title={'FAQs'}
          height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
          showBackIcon
        />
        <ScrollView
          style={globalStyles.scrollViewContentStyle}
          contentContainerStyle={styles.scrollViewContentStyle}
        >
          <View style={globalStyles.contentContainerStyle}>
            <Image source={DumyImg} style={styles.img} />
            <View>
              {faqArr && faqArr.length
                ? faqArr.map((item, index) => (
                    <FaqsList
                      key={index}
                      item={item}
                      handleClick={id => showDetail(id)}
                      isDetail={Ids.indexOf(item.id) !== -1}
                    />
                  ))
                : null}
            </View>
          </View>
        </ScrollView>
        <View style={styles.btns}>
          <RoundButton
            title={'CONTACT US'}
            bgColor={COLORS.primary}
            fgColor={COLORS.offWhite}
          />
        </View>
      </View>
    </MainAppContainer>
  );
};
export default FAQScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 220,
    width: '100%',
  },
  btns: {
    width: '100%',
    position: 'absolute',
    bottom: 2 * SIZES.paddingLeft,
    alignSelf: 'center',
    paddingHorizontal: SIZES.paddingLeft,
  },
  scrollViewContentStyle: {paddingBottom: 100},
});
