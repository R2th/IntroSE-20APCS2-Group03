Chào mọi người, lại là mình đây :) Sau 1 thời gian vừa viết bài hướng dẫn, vừa viết code thì mình đã đưa được cái app cơ bản của mình lên google play. Đây là link: https://play.google.com/store/apps/details?id=com.bloodycotech001 . Giờ thì các bạn có thể vào trải nghiệm app trước khi quyết định có nên theo dõi series hướng dẫn này hay chưa rồi nhé (yeah). Nếu các bạn có thời gian, có thể cho mình xin 1 đánh giá ( bao nhiêu sao cũng được) và 1 comment chân thành từ các bạn về app hoặc góp ý để app phát triển hơn. Mình sẽ lắng nghe tất cả các góp ý và đánh giá của tất cả các bạn để dần hoàn thiện series hướng dẫn này cũng như app ``happy math``

Mọi người có thể theo dõi các phần trước của mình tại đây

**Phần 1** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-63vKjzNVK2R]

**Phần 2** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-2-RQqKLQv4Z7z]

**Phần 3** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-3-Eb85oLMkK2G]

**Phần 4** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-4-djeZ1ynGZWz]

PR vầy cho cái series này chắc đủ rồi, giờ là lúc vào việc thôi =))

## 1) Fix bug

Với cái app hiện tại mình có để link phía trên thì còn kha khá bug, hiện tại còn 1 số bug như:

- Nút reset ở Practice làm reset cả lại điểm người chơi
- Nút Home ở Practice không reset điểm của người đang chơi
- Không có điểm dừng khi người chơi đạt điểm âm ở Battle

Ngoài ra còn 1 số bug khác nhưng mình chưa phát hiện ra (yaoming). Mọi người có thể fix nó từ từ để app hoàn thiện nhé

## 2) TÍnh năng chọn thời gian cho Practice

Đây là 1 tính năng hay và quan trọng cho các bé khi học, vì không phải bé nào cũng có thể làm phép toán trong 10s. Ý tưởng: sẽ cho người chơi trước khi vào Practice, sẽ cho lựa chọn thời gian trả lời câu hỏi, gồm 6 mức độ:

-  Mẫu giáo: không có thời gian
-  Tiểu học: 45 giây
-  Trung học cơ sở: 30 giây
-  Trung học phổ thông: 15 giây
-  Trên 18 tuổi: 10 giây
-  Thiên tài: 3 giây

Sau khi người chơi chọn thời gian, thì sẽ có nút "tiếp tục" để chuyển qua màn hình practice.

Giờ bắt đầu, trước tiên chúng ta sẽ tạo ra màn hình chooseTime. Màn hình này sẽ nằm giữa welcome và practice, cụ thể là

- Welcome Screen => bấm nút Practice => ChooseTime Screen => Chọn thời gian, rồi bấm Play => Practice Screen

Code cụ thể sẽ như thể này:
````js
// chooseTime.js
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import { colors, fonts, spaces, borderRadius } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { StackRoute } from '../constants/route';
import { PlayIcon } from '../assets/icons/index';
import PracticeStore from '../stores/practiceStore';
import Checkbox from '../component/Form/Checkbox';

const ChooseTimeScreen = observer(() => {
  const Navigate = useNavigation();

  const renderListCheckbox = () => {
    return PracticeStore.ArrPlayTime.map((item, index) => {
      return (
        <Checkbox
          key={`${item.time}_${index}`}
          handleCheckValue={() => PracticeStore.setPLayTime(item.time)}
          value={item.time}
          label={
            item.time === 0
              ? `${item.description}`
              : `${item.time} giây (${item.description})`
          }
          valueSelected={PracticeStore.PlayTime}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.styleTitle}>Chọn thời gian chơi</Text>
      <View style={styles.containerList}>{renderListCheckbox()}</View>
      <TouchableHighlight
        style={styles.imageContainer}
        onPress={() => Navigate.navigate(StackRoute.Main.Practice)}>
        <Image source={PlayIcon} />
      </TouchableHighlight>
    </View>
  );
});

export default ChooseTimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.bg_primary,
    paddingTop: '20%',
  },
  styleTitle: {
    textTransform: 'uppercase',
    color: colors.text,
    fontSize: fonts.larger,
    marginRight: spaces.space2,
  },
  containerList: {
    marginTop: spaces.space5,
  },
  imageContainer: {
    minWidth: 150,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spaces.space3,
    position: 'absolute',
    bottom: spaces.space3,
  },
});
````

Hãy dành 1 chút thời gian để đọc đoạn code trên nhé, đừng chỉ copy nó rồi chạy như bình thường, lỗi đấy.

Nếu bạn đã đọc qua code rồi, ắt hẳn bạn sẽ thấy, trong ```chooseTime.js``` sẽ có dùng tới Checkbox và PracticeStore. PracticeStore thì chúng ta đã có, nhưng Checkbox thì chưa nhỉ? Chưa thì bạn phải tạo nó ra thôi.

Vì mình có thói quen, cái gì tự code được mình sẽ tự code, không lạm dụng library, nên cái Checkbox này mình sẽ tự làm. Trong folder Component, mình tạo 1 folder Form và tạo file Checkbox.js trong đó. Tới đây, mọi người có thể dừng lại, và thử code Checkbox xem, nó cũng giống như web thôi, còn nếu bạn lười, có thể tham khảo file dưới:
```js
import * as React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';

import { fonts, colors, spaces, borderRadius } from '../../constants/theme';

const Checkbox = props => {
  const { handleCheckValue, label, value, valueSelected, isDisabled } = props;
  return (
    <View style={styles.container} isDisabled={isDisabled}>
      <TouchableHighlight
        style={styles.checkboxContainer}
        onPress={() => handleCheckValue()}>
        <View
          style={[
            styles.checkedMark,
            valueSelected === value ? styles.checked : styles.unchecked,
          ]}
        />
      </TouchableHighlight>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: spaces.space1,
    backgroundColor: colors.bg_primary,
  },
  checkboxContainer: {
    width: spaces.space6,
    height: spaces.space6,
    backgroundColor: colors.white,
    borderRadius: borderRadius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedMark: {
    width: '60%',
    height: '60%',
    borderRadius: borderRadius.circle,
    backgroundColor: colors.black,
  },
  checked: {
    backgroundColor: colors.bg_primary,
  },
  unchecked: {
    backgroundColor: colors.white_milk,
  },
  label: {
    fontSize: fonts.large,
    marginLeft: spaces.space2,
    color: colors.text,
    fontWeight: 'bold',
  },
});
```
Giờ là qua update thêm cho PracticeStore, ý tưởng của chooseTime Screen đã được nêu phía trên, giờ ta cần tạo ra 1 array để chứa các giá trị cho checkbox, và 1 biến để lưu giá trị được chọn. Cụ thể sẽ thêm những điều sau:
```js
  @observable playTime = 0;
  @observable thresholdPoint = 0;

  arrPlayTime = [
    {
      time: 0,
      description: 'Không có thời gian',
    },
    {
      time: 45,
      description: 'Tiểu học',
    },
    {
      time: 30,
      description: 'Trung học',
    },
    {
      time: 15,
      description: 'Phổ thông',
    },
    {
      time: 10,
      description: '18 +',
    },
    {
      time: 3,
      description: 'Game là dễ',
    },
  ];

  @action setPoint(item) {
    this.point = item;
  }

  @action setPLayTime(time) {
    this.playTime = time;
  }

  @action setThresholdPoint(time) {
    this.thresholdPoint = time;
  }

//chúng ta cũng cần 1 hàm để reset lại cái store nưa
  @action reset() {
    this.firstParameter = 0;
    this.secondParameter = 0;
    this.isCorrect = true;
    this.point = 0;
    this.playTime = 0;
    this.thresholdPoint = 0;
  }

  @computed get Point() {
    return this.point;
  }

  @computed get PlayTime() {
    return this.playTime;
  }

  @computed get ArrPlayTime() {
    return this.arrPlayTime;
  }

  @computed get ThresholdPoint() {
    return this.thresholdPoint;
  }
```

Có thể 1 số bạn sẽ thắc mắc là vì sao cái ```arrPlayTime``` này không có chữ ```@observable``` ở trước. Lý do là vì chúng ta đang sử dụng nó như 1 hằng số, không thay đổi, nên không cần phải check nó bằng observable. Bạn có thể đặt ở file khác nếu thích.

Ngoài ra chúng ta cũng cần sửa 1 tí ở ```practice.js```
```js
{!!PracticeStore.PlayTime && ( // nếu PlayTime = 0 thì !!PlayTime sẽ cho ra false và không render CuontDown
          <CountDown
            id={`counter-${CounterStore.IsReset}`}
            until={PracticeStore.PlayTime} // ở chỗ này ta dùng PlayTime, không set cứng là 10 nữa
            onFinish={() => Navigate.navigate(StackRoute.Main.Failed)}
            size={spaces.space4}
            timeToShow={['S']}
            timeLabels={{ s: '' }}
            digitStyle={styles.digitStyle}
            digitTxtStyle={styles.digitTextStyle}
          />
        )}
```

Ok, vầy là chúng ta vừa update thêm chức năng chọn thời gian trả lời. App nhìn xịn xò hơn rồi đấy nhỉ! (hehe). Nhưng chúng ta sẽ không dừng ở đây, mà sẽ tiếp tục thêm 1 tính năng cho nó.

## 3) Hiện popup thông báo

Chúng ta sẽ thêm 1 phần quan trọng nữa vào app, đó là popup. Nó sẽ đảm nhận chức năng thông báo tới người dùng những thông tin từ app. Cụ thể trong app chúng ta, trong phần chơi practice, khi người đạt điểm đến 1 ngưỡng nào đó (10, 20, 30,... ) chúng ta sẽ hỏi người chơi có muốn điều chỉnh lại mức độ hay không và vẫn sẽ giữ nguyên mức điểm đang đạt được để chơi tiếp.

Vì vậy, chúng ta sẽ  1 lần nữa thêm vào ở ```practiceStore.js``` 1 chút code
```js
@observable thresholdPoint = 0;

 @action setThresholdPoint(time) {
    this.thresholdPoint = time;
  }

@computed get ThresholdPoint() {
    return this.thresholdPoint;
  }
```

Tiếp theo chúng ta phải tạo Component Popup đã, ở đây mình dùng thư viện ```react-native-modal```, mình đã xài qua thử và nó khá là ổn áp, bạn có thể tham khảo code của mình ở đây
```js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { colors, fonts, spaces, borderRadius } from '../constants/theme';
import Modal from 'react-native-modal';

const Popup = props => {
  const { isShowPopup, handleClosePopup, handleYesButton, content } = props;
  const [isShowModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isShowPopup);
    console.log('isShowPopup', isShowPopup);
  }, [isShowPopup]);

  const onPressYesButton = () => {
    handleClosePopup(false);
    handleYesButton();
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={isShowModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      onModalHide={handleClosePopup}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.bodyText}>{content}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight
            style={[styles.buttonFooter, styles.buttonLeft]}
            onPress={() => onPressYesButton()}>
            <Text style={styles.textStyle}>Có</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonFooter, styles.buttonRight]}
            onPress={() => handleClosePopup(false)}>
            <Text style={styles.textStyle}>Không</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.header,
    marginHorizontal: spaces.space4,
  },
  body: {
    padding: spaces.space3,
    backgroundColor: colors.white,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bodyText: {
    fontSize: fonts.medium,
    color: colors.bg_primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: spaces.space1,
    borderTopColor: 'transparent',
  },
  buttonFooter: {
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
    padding: spaces.space2,
    width: '50%',
  },
  buttonLeft: {
    borderRightWidth: spaces.space0,
    borderBottomLeftRadius: 10,
    borderRightColor: 'transparent',
  },
  buttonRight: {
    borderLeftWidth: spaces.space0,
    borderBottomRightRadius: 10,
    borderLeftColor: 'transparent',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: fonts.large,
  },
});
```

Và cũng phải sửa cả ở ```practice.js``` nữa, bạn có thể tham khảo code đầy đủ ở đây
```js
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { colors, fonts, spaces } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { StackRoute } from '../constants/route';

import WorkingSection from '../component/WorkingSection';
import AnswerButton from '../component/AnswerButton';
import PointSection from '../component/PointSection';
import Popup from '../component/Popup';

import PracticeStore from '../stores/practiceStore';
import CounterStore from '../stores/counterStore';
import CountDown from 'react-native-countdown-component';

const windowWidth = Dimensions.get('window').width;

const kPointThreshold = 10;

const PracticeScreen = observer(() => {
  const Navigate = useNavigation();
  const [result, setResult] = useState(PracticeStore.calculateResult());
  const [isShowModal, setShowModal] = useState(false);

  function randomNumber(to, from) {
    return Math.floor(Math.random() * from) + to;
  }

  useFocusEffect(React.useCallback(() => {}, []));

  useEffect(() => {
    PracticeStore.setFirstParameter(randomNumber(1, 9));
    PracticeStore.setSecondParameter(randomNumber(1, 9));
    PracticeStore.setThresholdPoint(PracticeStore.Point + kPointThreshold);
    setResult(PracticeStore.calculateResult());
  }, []);

  useEffect(() => {
    if (PracticeStore.Point >= PracticeStore.ThresholdPoint) {
      setShowModal(true);
    }
  }, [PracticeStore.point]);

  const pressAnswer = type => {
    const isTrue =
      PracticeStore.FirstParameter + PracticeStore.SecondParameter === result;
    CounterStore.reset();

    if ((type === 'wrong' && isTrue) || (type === 'right' && !isTrue)) {
      Navigate.navigate(StackRoute.Main.Failed);
      return;
    }
    if ((type === 'wrong' && !isTrue) || (type === 'right' && isTrue)) {
      PracticeStore.setFirstParameter(randomNumber(1, 9));
      PracticeStore.setSecondParameter(randomNumber(1, 9));
      setResult(PracticeStore.calculateResult());
      return PracticeStore.setPoint(PracticeStore.Point + 1);
    }
  };

  const reset = isResetPoint => {
    if (isResetPoint) {
      PracticeStore.setPoint(0);
    }
    PracticeStore.setFirstParameter(PracticeStore.randomNumber(1, 9));
    PracticeStore.setSecondParameter(PracticeStore.randomNumber(1, 9));
    setResult(PracticeStore.calculateResult());
  };

  const handleChangeLevel = () => {
    Navigate.goBack();
  };

  const handleIgnoreChangeLevel = () => {
    PracticeStore.setThresholdPoint(PracticeStore.Point + kPointThreshold);
  };

  return (
    <>
      <View style={styles.container}>
        <PointSection
          point={PracticeStore.Point}
          handleReset={() => reset(false)}
          handleGoBack={() => reset(true)}
          isShowHomeButton
        />
        {!!PracticeStore.PlayTime && (
          <CountDown
            id={`counter-${CounterStore.IsReset}`}
            until={PracticeStore.PlayTime}
            onFinish={() => Navigate.navigate(StackRoute.Main.Failed)}
            size={spaces.space4}
            timeToShow={['S']}
            timeLabels={{ s: '' }}
            digitStyle={styles.digitStyle}
            digitTxtStyle={styles.digitTextStyle}
          />
        )}
        <View style={styles.body}>
          <WorkingSection
            firstParameter={PracticeStore.FirstParameter}
            secondParameter={PracticeStore.SecondParameter}
            result={result}
          />
        </View>
        <AnswerButton
          onRightAnswer={() => pressAnswer('right')}
          onWrongAnswer={() => pressAnswer('wrong')}
        />
      </View>
      <Popup
        isShowPopup={isShowModal}
        handleClosePopup={setShowModal}
        handleYesButton={handleChangeLevel}
        handleNoButton={handleIgnoreChangeLevel}
        content={
          'Bạn có cảm thấy mức độ này quá dễ và muốn chỉnh lại mức độ hay không?'
        }
      />
    </>
  );
});

export default PracticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_primary,
  },
  body: {
    width: windowWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitTextStyle: {
    color: colors.bg_primary,
    fontSize: fonts.larger,
  },
  digitStyle: {
    backgroundColor: colors.white,
    borderRadius: 999,
    width: spaces.space9,
    height: spaces.space9,
  },
});
```
Vậy là xong, giờ chúng ta đã có được chức năng thông báo rồi

## 4) Chạy app

Update xong rồi, chúng ta chạy thử 1 vòng thôi (yeah)

Vào app nè
![](https://images.viblo.asia/74d2a59a-4623-4273-928b-bb085d267e3c.png)

Chọn Practice nhé
![](https://images.viblo.asia/05154348-013c-4c79-947a-50d7c449120a.png)

Đây là màn hình chọn thời gian, chọn mức độ phù hợp để trải nghiệm nhé
![](https://images.viblo.asia/f2dc60cb-f9c4-42b5-ad2c-27a619fbf1f0.png)

Sau mỗi lần thắng 10 câu liên tiếp, nó sẽ hiện popup thông báo này
![](https://images.viblo.asia/eff6567c-7249-41ef-9989-dd2fe2e7f7cf.png)

Lần sau chúng ta sẽ update thêm nội dung cho popup

Cảm ơn mọi người đã bỏ thời gian để đọc qua bài viết của mình. Xin chào mọi người và hẹn sớm gặp lại ở bài viết tới.

**P/S**

Các bạn có thể theo dõi full series của mình tại đây: 
https://viblo.asia/s/lam-ung-dung-hoc-toan-don-gian-voi-react-native-375z0mxPZGW
Mình đã upload app lên Google store, các bạn có thể tải về xem trước, tên app mình có hơi thay đổi 1 tí, mong mọi người vẫn ủng hộ series của mình

**Link app :** https://play.google.com/store/apps/details?id=com.bloodycotech001

Xin chân thành cảm ơn các bạn!!! <3 <3 <3