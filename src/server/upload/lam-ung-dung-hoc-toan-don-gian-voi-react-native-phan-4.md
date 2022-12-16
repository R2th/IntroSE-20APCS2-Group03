Chào mọi người,  vậy là mình đã trở lại với series về ứng dụng học toán đơn giản với React Native, trong thời gian qua, mình có việc bận nên không thể update thêm cho cái app học toán được :(. Giờ thì rảnh rỗi tí, nên tranh thủ update thêm cho nó ngày càng hoàn hảo hơn và dễ thương hơn :3.
. Nếu đây là lần đầu các bạn đọc bài về series của mình thì đây là link của các phần trước

**Phần 1** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-63vKjzNVK2R] 

**Phần 2**  [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-2-RQqKLQv4Z7z] 

**Phần 3**  [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-3-Eb85oLMkK2G] 

 PR tí cho cái series vầy chắc đủ rồi, mình vào lun nhé
 
 **1) Update cho chức năng Practice**
 
 Ở màn hình practice, chúng ta sẽ thêm chức năng đếm thời gian cho nó, có nghĩa là người dùng phải trả lời câu hỏi trong 1 thời gian hạn định, nếu đúng sẽ được thêm 1 điểm và thời gian reset lại từ đầu, nếu sai thì sẽ bị chuyển trực tiếp tới màn hình failed và trò chơi kết thúc.
 
 Đầu tiên, chúng ta sẽ thêm vào thư viện sẽ dùng để tạo ra counter components để đỡ mất thời gian code, đó là thư viện react-native-countdown-component :
 
 `yarn add react-native-countdown-component`
 
 Mọi người có thể vào link của nó để đọc thêm về cách dùng: https://www.npmjs.com/package/react-native-countdown-component
 
 Giờ chúng ta sẽ apply nó vào trong practice `import CountDown from 'react-native-countdown-component';`, và tạo ra component `CountDown` như sau:
 
 ```
 <CountDown
    id={`counter-${CounterStore.IsReset}`}
    until={kCounterNumber} // kCounterNumber ở đây mình đặt là 10 nha.
    onFinish={() => Navigate.navigate(StackRoute.Main.Failed)}
    size={spaces.space4}
    timeToShow={['S']}
    timeLabels={{s: ''}}
    digitStyle={styles.digitStyle}
    digitTxtStyle={styles.digitTextStyle}
/>
 ```
 
 Nếu chú ý 1 chút và có theo dõi series từ đầu, bạn sẽ thấy ở đây đã có 1 sự xuất hiện của 1 store mới, đó là `CounterStore`, code của nó cũng khá là ngắn thôi, nhưng mình vẫn thích rõ ràng và tách biệt nên vẫn tách hẳn ra 1 store, đây là code của nó
 ```
 import {observable, action, computed} from 'mobx';

class CounterStore {
  @observable isReset = false;

  @action reset() {
    this.isReset = !this.isReset;
  }
  @computed get IsReset() {
    return this.isReset;
  }
}

const counterStore = new CounterStore();
export default counterStore;
 ```
 Ngoài ra còn phải style 1 chút cho cái components `CountDown` nữa
 ```
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
  digitTextStyle: {color: colors.bg_primary, fontSize: fonts.larger},
  digitStyle: {
    backgroundColor: colors.white,
    borderRadius: 999,
    width: spaces.space9,
    height: spaces.space9,
  },
});
 ```
 
 và đây là phun-sụt-cốt của file practice.js
```
import {observer} from 'mobx-react-lite';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {colors, fonts, spaces} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {StackRoute} from '../constants/route';

import WorkingSection from '../component/WorkingSection';
import AnswerButton from '../component/AnswerButton';
import PointSection from '../component/PointSection';

import PracticeStore from '../stores/practiceStore';
import CounterStore from '../stores/counterStore';
import CountDown from 'react-native-countdown-component';

const windowWidth = Dimensions.get('window').width;

const kCounterNumber = 10;

const PracticeScreen = observer(() => {
  const Navigate = useNavigation();
  const [result, setResult] = useState(PracticeStore.calculateResult());

  function randomNumber(to, from) {
    return Math.floor(Math.random() * from) + to;
  }

  useFocusEffect(React.useCallback(() => {}, []));

  useEffect(() => {
    PracticeStore.setFirstParameter(randomNumber(1, 9));
    PracticeStore.setSecondParameter(randomNumber(1, 9));
    setResult(PracticeStore.calculateResult());
  }, []);

  function pressAnswer(type) {
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
  }

  function reset() {
    PracticeStore.setPoint(0);
    PracticeStore.setFirstParameter(PracticeStore.randomNumber(1, 9));
    PracticeStore.setSecondParameter(PracticeStore.randomNumber(1, 9));
    setResult(PracticeStore.calculateResult());
  }

  return (
    <View style={styles.container}>
      <PointSection
        point={PracticeStore.Point}
        handleReset={() => reset()}
        isShowHomeButton
      />
      <CountDown
        id={`counter-${CounterStore.IsReset}`}
        until={kCounterNumber}
        onFinish={() => Navigate.navigate(StackRoute.Main.Failed)}
        size={spaces.space4}
        timeToShow={['S']}
        timeLabels={{s: ''}}
        digitStyle={styles.digitStyle}
        digitTxtStyle={styles.digitTextStyle}
      />
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
  digitTextStyle: {color: colors.bg_primary, fontSize: fonts.larger},
  digitStyle: {
    backgroundColor: colors.white,
    borderRadius: 999,
    width: spaces.space9,
    height: spaces.space9,
  },
});
```

**2) Update animation và thêm lottie animation**

Chúng ta trở lại màn hình welcome nhé, các bạn có còn nhớ ở các bài trước, chúng ta đã tạo animation cho dấu hỏi, nhưng animation đó chỉ chạy được lúc mới vào 1 tí, và nhìn nó thật ra là hơi chán. Giờ chúng ta sẽ cho cái dấu hỏi đó xoay vòng vòng liên tục để làm điểm nhấn cho app và thêm 1 hình động vào trang welcome để nhìn app dễ thương hơn. 

Nhưng trước tiên, tìm hiểu lottie là gì đã nhé, vào link này để biết thêm chi tiết: https://airbnb.io/lottie/#/, sau khi tìm hiểu lottie thì chúng ta sẽ vào thư viện của nó để lựa 1 cái về để bỏ vào app của chúng ta: https://lottiefiles.com/. Với mình thì mình chọn animation rocket đang bay (https://lottiefiles.com/user258396), và mún dùng nó thì chúng cũng phải cài thư viện của lottie vào `yarn add lottie-react-native` và import vào welcome `import LottieView from 'lottie-react-native';`. chúng ta download file json trong thư viện của lottie và cũng import nó vào welcome lun
`import {AnimationRocket} from '../assets/animations/index';` mình đã tạo thêm folder animations để chứa file animation json của lottie. 

Và đây là Component của Lottie khi apply vào app
```
  <LottieView
    ref={animation => {
      this.animation = animation;
    }}
    style={styles.styleAnimation}
    loop={true}
    source={AnimationRocket}
  />
  ```
  bạn nhớ thêm đoạn này useEffect nữa nhé `this.animation.play();`. Vầy là về cơ bản chúng ta đã thêm lottie vào app, đây là code của welcom.js sau khi sửa:
  ```
  import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableHighlight, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import {
  colors,
  fonts,
  spaces,
  borderRadius,
  borderWidth,
} from '../constants/theme';

import {PlayIcon} from '../assets/icons/index';
import {StackRoute} from '../constants/route';
import WorkingSection from '../component/WorkingSection';
import {AnimationRocket} from '../assets/animations/index';

export default function WelcomeScreen() {
  const Navigate = useNavigation();
  const [isShowOption, setIsShowOption] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsShowOption(false);
      this.animation.play();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.styleTitle, styles.title1]}>Happy</Text>
        <Text style={[styles.styleTitle, styles.title2]}>Math</Text>
      </View>
      <WorkingSection firstParameter={1} secondParameter={1} result={3} />
      <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        style={styles.styleAnimation}
        loop={true}
        source={AnimationRocket}
      />
      {isShowOption ? (
        <View>
          <TouchableHighlight
            style={styles.imageContainer}
            onPress={() => Navigate.navigate(StackRoute.Main.Practice)}>
            <Text style={[styles.styleTitle, styles.selectText]}>practice</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageContainer}
            onPress={() => Navigate.navigate(StackRoute.Main.Battle)}>
            <Text style={[styles.styleTitle, styles.selectText]}>battle</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => setIsShowOption(true)}>
          <Image source={PlayIcon} />
        </TouchableHighlight>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: borderWidth.normal,
    borderColor: 'transparent',
    paddingHorizontal: spaces.space3,
    borderRadius: borderRadius.header,
  },
  styleTitle: {
    textTransform: 'uppercase',
    color: colors.text,
  },
  title1: {
    fontSize: fonts.header1,
    marginRight: spaces.space2,
  },
  title2: {
    fontSize: fonts.header4,
    fontWeight: 'bold',
  },
  selectText: {
    fontWeight: 'bold',
    fontSize: fonts.large,
    padding: spaces.space4,
  },
  imageContainer: {
    minWidth: 150,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spaces.space3,
  },
  styleAnimation: {
    width: 150,
    height: 150,
    marginBottom: spaces.space5,
  },
});
```
Đó là lottie, chúng ta vẫn còn 1 nhiệm vụ là update animation của dấu hỏi, để sửa nó thì chúng ta vào file workingSection.js, các bạn copy y nguyên đoạn code này của mình nhé, chứ giờ mà ngồi giải thích làm sao để làm được cái animation này thì cũng dài bằng 1 bài viết này rồi (yaoming)
```
import * as React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {colors, fonts, spaces} from '../constants/theme';

const WorkingSection = props => {
  const {firstParameter, secondParameter, result, isCorrect} = props;
  const fadeAnim = new Animated.Value(0);
  const rotateY360deg = new Animated.Value(0);

  rotateY360deg.interpolate({
    inputRange: [0, 6],
    outputRange: ['0deg', '360deg'],
  });

  useFocusEffect(
    React.useCallback(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(rotateY360deg, {
            toValue: 6,
            duration: 1000,
            useNativeDriver: true,
          }),
        ),
      ]).start();
    }, [fadeAnim, rotateY360deg]),
  );

  return (
    <View style={styles.expressionContainer}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>
          {firstParameter} + {secondParameter}
        </Text>
        <Text style={styles.number}>= {result}</Text>
      </View>
      <Animated.View
        style={[
          {
            opacity: fadeAnim,
            transform: [{rotateY: rotateY360deg}],
          },
        ]}>
        <Text style={styles.questionMark}>{isCorrect ? '!' : '?'}</Text>
      </Animated.View>
    </View>
  );
};

export default WorkingSection;

const styles = StyleSheet.create({
  expressionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spaces.space4,
  },
  numberContainer: {
    alignItems: 'center',
  },
  number: {
    color: colors.white_milk,
    fontSize: fonts.header4,
    lineHeight: fonts.header4,
    fontWeight: 'bold',
  },
  questionMark: {
    color: 'white',
    fontSize: fonts.header6 + fonts.header4,
    lineHeight: fonts.header6 + fonts.header4,
    marginHorizontal: spaces.space4,
    fontWeight: 'bold',
  },
});
```
Nếu bạn chú ý kỹ thì đoạn code chủ yếu chúng ta sửa để thay đổi animation là ở đây
```
  const rotateY360deg = new Animated.Value(0);

  rotateY360deg.interpolate({
    inputRange: [0, 6],
    outputRange: ['0deg', '360deg'],
  });

  useFocusEffect(
    React.useCallback(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(rotateY360deg, {
            toValue: 6,
            duration: 1000,
            useNativeDriver: true,
          }),
        ),
      ]).start();
    }, [fadeAnim, rotateY360deg]),
  );
  ```
  Nếu bạn có hứng thú với nó, hãy tìm hiểu thêm về Animated.sequence và Animated.loop nhé
  
  **3) Chỉnh sửa, fix bug lặt vặt**
  
  Trong bài viết lần này, chủ yếu là để nâng cấp app lên, nhưng vì nâng cấp lên như vậy nên cũng sẽ có 1 số "tính năng" được sinh ra trong lúc code (ahihi). Vì vậy chúng ta phải chỉnh sửa 1 tí, cụ thể là ở trong file failed.js, chúng ta sẽ bỏ mục chọn 2 option là chơi battle hay practice, thay vào đó sẽ cho nó điều hướng lại màn welcome. code cụ thể sẽ như này:
  ```
  import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  colors,
  fonts,
  spaces,
  borderRadius,
  borderWidth,
} from '../constants/theme';
import WorkingSection from '../component/WorkingSection';

import {PlayIcon} from '../assets/icons/index';
import {StackRoute} from '../constants/route';
import PracticeStore from '../stores/practiceStore';

export default function FailedScreen() {
  const Navigate = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.styleTitle, styles.title1]}>Happy</Text>
        <Text style={[styles.styleTitle, styles.title2]}>Math</Text>
      </View>
      <WorkingSection
        firstParameter={PracticeStore.FirstParameter}
        secondParameter={PracticeStore.SecondParameter}
        result={PracticeStore.FirstParameter + PracticeStore.SecondParameter}
        isCorrect
      />
      <View style={styles.pointContainer}>
        <Text style={styles.pointText}>Điểm: </Text>
        <Text style={styles.pointText}>{PracticeStore.Point}</Text>
      </View>
      <TouchableHighlight
        style={styles.imageContainer}
        onPress={() => Navigate.navigate(StackRoute.Main.Welcome)}>
        <Image source={PlayIcon} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: borderWidth.normal,
    borderColor: 'transparent',
    paddingHorizontal: spaces.space3,
    borderRadius: borderRadius.header,
  },
  styleTitle: {
    textTransform: 'uppercase',
    color: colors.text,
  },
  title1: {
    fontSize: fonts.header1,
    marginRight: spaces.space2,
  },
  title2: {
    fontSize: fonts.header4,
    fontWeight: 'bold',
  },
  selectText: {
    fontWeight: 'bold',
    fontSize: fonts.large,
    padding: spaces.space4,
  },
  expressionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spaces.space4,
  },
  numberContainer: {
    alignItems: 'center',
  },
  number: {
    color: colors.white_milk,
    fontSize: fonts.header2,
    fontWeight: 'bold',
  },
  questionMark: {
    color: 'white',
    fontSize: fonts.header6 + fonts.largest,
    marginLeft: spaces.space4,
    fontWeight: 'bold',
    transform: [
      {
        rotate: '8deg',
      },
    ],
  },
  pointContainer: {
    backgroundColor: colors.bg_primary,
    borderRadius: borderRadius.header,
    borderWidth: borderWidth.bolder,
    borderColor: colors.white,
    marginBottom: spaces.space8,
    flexDirection: 'row',
    paddingHorizontal: spaces.space6,
    paddingVertical: spaces.space2,
  },
  pointText: {
    fontSize: fonts.header2,
    fontWeight: 'bold',
    color: colors.text,
  },
  imageContainer: {
    minWidth: 150,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spaces.space3,
  },
});
  ```
  
  Đó là chính sửa ở failed.js, giờ mình sẽ thêm nút back lại trang home ở cả 2 chế độ practice và battle, nút reset câu đố trong chế độ practice. Tất cả chỉnh sửa chúng ta sẽ viết trong file PointSection.js
  ```
  import * as React from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {HomeIcon, ResetIcon} from '../assets/icons/index';
import {useNavigation} from '@react-navigation/native';
import {spaces, widthComponent} from '../constants/theme';

const PointSection = props => {
  const Navigate = useNavigation();

  const handleReset = () => {
    props.handleReset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointContainer}>
        {props.isShowHomeButton && (
          <TouchableOpacity onPress={Navigate.goBack}>
            <Image source={HomeIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        <Text style={styles.point}>{props.point} Điểm</Text>
        {props.handleReset && (
          <TouchableOpacity onPress={() => handleReset()}>
            <Image source={ResetIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PointSection;

const styles = StyleSheet.create({
  container: {
    paddingTop: spaces.space4,
    width: '100%',
    alignItems: 'center',
  },
  pointContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: spaces.space4,
  },
  icon: {
    marginTop: spaces.space0,
    width: widthComponent.iconHeader,
    height: widthComponent.iconHeader,
  },
  point: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
  ```
  
  Giờ thì chúng ta đã update xong cho cái app rồi đấy, nhìn thành quả tí nhé:
  
  **4) Chạy thử nè**
  
 Nhìn màn welcome sau khi update nè:
 
 ![](https://images.viblo.asia/79f7f3e3-3558-4681-b459-08be49302582.png)

Giờ app của chúng ta đã có điểm nhấn rồi, vào chọn chế độ chơi thôi

![](https://images.viblo.asia/0a14427d-be9f-45a7-9253-b3b0644153e1.png)

Vào chơi practice để kiểm tra tính năng counter mới nhé

![](https://images.viblo.asia/abe6b9e1-fcdd-4ea1-bdae-d0ccc51b2129.png)

Nhìn cũng ổn ổn nhỉ, khi thua sẽ qua màn hình failed, bạn sẽ thấy cả dấu ! giờ cũng xoay xoay lun

![](https://images.viblo.asia/6a1b23d2-4121-4b8b-ab41-38e05213ad8a.png)

Bài viết lần này của mình đến đây là đã hết, cảm ơn các bạn đã chịu khó đọc và hẹn gặp lại vào phần tiếp theo trong 1 ngày không xa. /(^.^)/

**P/S**

Các bạn có thể theo dõi full series của mình tại đây: 
https://viblo.asia/s/lam-ung-dung-hoc-toan-don-gian-voi-react-native-375z0mxPZGW
Mình đã upload app lên Google store, các bạn có thể tải về xem trước, tên app mình có hơi thay đổi 1 tí, mong mọi người vẫn ủng hộ series của mình

**Link app :** https://play.google.com/store/apps/details?id=com.bloodycotech001

Xin chân thành cảm ơn các bạn!!! <3 <3 <3