Chào các bạn, có lẽ cách để học 1 cái gì đó mới 1 cách nhanh nhất, không gì bằng việc bắt tay vào làm nó ngay lập tức. Đối với react native cũng vậy, sau 1, 2 ngày dành ra để đọc docs của nó, mình đã tạo ra 1 app đơn giản để giúp cho các bé cấp 1 có thể học môn toán 1 cách đỡ nhàm chán hơn. Ứng dụng dù còn khá sơ sài nhưng thông qua nó để tiếp cận React native cũng không quá tệ. Nên hôm nay mình sẽ viết 1 bài hướng dẫn để giúp  các bạn tạo ra app đầu tiên của mình

**1) Cài đặt**

Trước tiên để bắt đầu làm với React native, bạn phải cài đặt đã, hãy làm theo hướng dẫn của link sau là ok: https://reactnative.dev/docs/environment-setup, với thiết bị test, mình chọn simulator nên phải cài thêm Android Studio ( hoặc bạn có thể dùng Genymotion -> không khuyến khích), nếu bạn chọn máy thật thì test sẽ trực quan hơn nhiều ( khuyến khích cách này)

Câu lệnh cài đặt ``npx react-native init <Tên app của bạn>``,  đơn giản phải không. Giờ thì bắt đầu được rồi, đến đây thì bắt đầu được rồi

**2) Tạo giao diện**

App của mình sẽ chỉ có 1 màn hình duy nhất thôi, nên giao diện cũng sẽ vô cùng đơn giản 

![](https://images.viblo.asia/8aa29a89-bc08-4b5e-a413-9a5fdce1ed0d.PNG)


Như các bạn quan sát, mình chia bố cục làm 3 phần là Header, Body và Footer, vì vậy code của mình sẽ được sắp xếp như này 
````
return (
    <View style={styles.container}>
      <Header />
      <Body />
      <Footer />
    </View>
  );
````

Với mỗi Component, mình sẽ code riêng ,để sau này nếu muốn phát triển thêm cũng dễ chịu hơn

````
const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.point}>{point} Điểm</Text>
      </View>
    );
  };
  const Body = () => {
    return (
      <View style={styles.body}>
        {statusQuiz.isStart ? (
          <Text style={styles.content}>
            {a} + {b} = {result} ?
          </Text>
        ) : (
          <TouchableHighlight
            style={styles.buttonStart}
            onPress={() => pressStart()}>
            <Text style={styles.textButton}>{statusQuiz.content}</Text>
          </TouchableHighlight>
        )}
      </View>
    );
  };
  const Footer = () => {
    return (
      <View style={styles.footer}>
        <TouchableHighlight
          style={[styles.buttonLeft, styles.buttonFooter]}
          onPress={() => pressAnswer('right')}>
          <Text style={styles.textButton}>ĐÚNG</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonRight, styles.buttonFooter]}
          onPress={() => pressAnswer('wrong')}>
          <Text style={styles.textButton}>SAI</Text>
        </TouchableHighlight>
      </View>
    );
  };
````

Nếu các bạn đã đọc tới đây ( và đã từng làm React), thì có nhận ra và nói: "Ồ, nó cũng giống Reactjs nhở, có khác lắm đâu". Đúng rồi, nó không khác lắm so với React về cú pháp và cách sử dụng Component. Tuy nhiên nó vẫn có những đặc trưng của nó.

Ví dụ: Thẻ ``View`` trong RN sẽ được xem như thẻ div trong React, thẻ ``Text`` là thẻ p ( nói chung là nó chứa chữ đấy), Thẻ ``TouchableHighlight`` giống như thẻ div kết hợp với button ( nghĩa là bấm được và style cho nó được). 

Trong RN không có className hay class, mà thay vào đó ta có style để chỉnh giao diện cho app. Nếu so sánh với React thì style của RN được sử dụng khá giống với styled-components trong React. Dù vậy, vẫn có ít nhiều sự khác biệt rõ ràng, bạn có thể trực tiếp cảm nhận thông qua những dòng code dưới đây
````
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0099ff',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  point: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  body: {
    width: windowWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },
  buttonStart: {
    color: '#FFF',
    backgroundColor: '#f50093',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginVertical: 20,
    borderRadius: 10,
  },
  footer: {
    width: windowWidth,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  buttonFooter: {
    height: 50,
    width: windowWidth / 2 - 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 30,
  },
  buttonLeft: {
    marginLeft: 10,
    backgroundColor: '#029911',
  },
  buttonRight: {
    marginHorizontal: 10,
    backgroundColor: '#d90804',
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFF',
  },
});
````

Những thành phần như ``StyleSheet``, ``View`` hay ``Text`` ta sẽ import trực tiếp từ RN
````
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
````

Thật đơn giản để làm giao diện đúng không.

**3) Function**

Trong app này, mình sẽ sử dụng tới React Hook cho tiện lợi, mình sẽ khai báo điểm, thuật toán để random ra phép tính và kết quả
````
 const [statusQuiz, setStatusQuiz] = useState({
    isStart: false,
    content: 'BẮT ĐẦU',
  });
  const [point, setPoint] = useState(0);
  const [a, setA] = useState(randomNumber(0, 10));
  const [b, setB] = useState(randomNumber(0, 10));
  const [result, setResult] = useState(calculateResult());
  function calculateResult() {
    const isTrue = Math.floor(Math.random() * 2);
    if (isTrue === 0) {
      return a + b;
    }
    const isBigger = Math.floor(Math.random() * 2);
    let resultFalse = 0;
    if (isBigger === 0) {
      resultFalse = a + b + Math.floor(Math.random() * 5);
    } else {
      resultFalse = a + b - Math.floor(Math.random() * 5);
    }
    return resultFalse < 0 ? 0 : resultFalse;
  }

  function randomNumber(to, from) {
    return Math.floor(Math.random() * from) + to;
  }

  useEffect(() => {
    setA(randomNumber(1, 9));
    setB(randomNumber(1, 9));
    setResult(calculateResult());
  }, [point]);

  function pressAnswer(type) {
    const isTrue = a + b === result;
    if ((type === 'wrong' && isTrue) || (type === 'right' && !isTrue)) {
      setPoint(0);
      setStatusQuiz({
        isStart: false,
        content: 'SAI RỒI! BẠN CÓ MUỐN LÀM LẠI KHÔNG?',
      });
      return;
    }
    if ((type === 'wrong' && !isTrue) || (type === 'right' && isTrue)) {
      return setPoint(point + 1);
    }
  }
  function pressStart() {
    setStatusQuiz({
      isStart: true,
      content: '',
    });
  }
````

Thuật toán và ý tưởng khá là dễ hiểu và đơn giản phải không :D. Chỉ cần lắp ráp lại là ta có 1 app hoàn chỉnh để vọc rồi.

**4) Demo**
Lúc vào app nó sẽ thế này

![](https://images.viblo.asia/8aa29a89-bc08-4b5e-a413-9a5fdce1ed0d.PNG)

Bấm vào "Bắt Đầu" để bắt đầu :v: 

![](https://images.viblo.asia/4a439a1d-c4ce-46e7-adb4-c63a85939587.PNG)

Trả lời đúng thì điểm số sẽ lên

![](https://images.viblo.asia/b5902ea2-6322-4782-883a-04da05192920.PNG)

Sai 1 câu, điểm sẽ về 0 và hiện lên thông báo :v: 

![](https://images.viblo.asia/b8d8b014-19a4-42d3-9e5a-e10b4117915c.PNG)

App chỉ có vậy thôi , nhưng cũng đủ để cháu mình học toán cả 1 buổi chiều rồi (yaoming)

Cảm ơn các bạn đã theo dõi bài viết của mình. Nếu có gì sai sót và các bạn muốn góp ý bổ sung, hãy để lại bình luận ở dưới để mình biết nhé, xin cảm ơn các bạn :3

**P/S**

Các bạn có thể theo dõi full series của mình tại đây: 
https://viblo.asia/s/lam-ung-dung-hoc-toan-don-gian-voi-react-native-375z0mxPZGW
Mình đã upload app lên Google store, các bạn có thể tải về xem trước, tên app mình có hơi thay đổi 1 tí, mong mọi người vẫn ủng hộ series của mình

**Link app :** https://play.google.com/store/apps/details?id=com.bloodycotech001

Xin chân thành cảm ơn các bạn!!! <3 <3 <3