Trong một ứng dụng Android hay iOS thường sẽ có rất nhiều màn hình và tại đó sẽ có một vài thành phần mà chúng ta thường xuyên sử dụng lại. Có thể kể ra một số ví dụ dưới đây:

1. Header (Title screen)
2. Footer
3. Navigation
4. Base view ( phần hiển thị content)
5. v..v

Hôm nay chúng ta sẽ thử cùng nhau tìm cách để làm sao dùng lại Header khi điều hướng sang các màn hình khác nhau các bạn nhé. Với các thành phần còn lại mọi người có thể làm tương tự. OK let's go...

### 1. Component trong React Native là gì?

Đây là phần khái niệm tương đối căn bản, nhưng sẽ khó khăn nếu ta chỉ mới bắt đầu.

**Component** là những thành phần nhỏ cấu thành một ứng dụng mà ở đó chúng được tách riêng biệt và có thể sử dụng lại. Thành phần này chính là các View (phần hiển thị) để người dùng có thể hiểu hoặc tương tác.

Trong React Native có khá nhiều loại components:

> Basic Components
> 
> User Interface
> 
> List Views
> 
> iOS-specific
> 
> Android-specific
> 
> Others
> 
Nội dung về bài viết **Header component** này nằm trong loại Basic Components.

### 2. Khởi tạo một component dùng chung?

Chúng ta đã biết về khái niệm rồi vậy thì Làm sao để tạo và sử dụng một component bất kì đây. Từ từ chúng ta sẽ dần sáng rõ hơn với từng bước dưới đây nhé :smiley:

Thông thường bạn sẽ dùng một Text để hiển thị nội dung như sau:

```
import React, {Component} from 'react';
//Khai báo component Text
import {Text} from 'react-native';

//Sử dụng Text để hiện thị nội dung
<Text>Welcome to React Native!</Text>
```

Kết quả bạn sẽ thấy dòng chữ: *Welcome to React Native!*

Khá thú vị phải không nào?

Bây giờ chúng ta sẽ tạo component Header dùng cho toàn bộ app nhé.

**Bước 1:** Tạo file js chứa component

***Root folder >> create new file >>> header.js***

![](https://images.viblo.asia/6e682abc-18e0-4dd4-b0be-16773ddf927c.png)

### Bước 2: Custom component

Sau khi đã tạo file xong bạn áp dụng các bước trên để sử dụng 1 component. Mình sẽ dùng Text vì phần tiêu đề màn hình sẽ chỉ có nội dung và màu nền thôi cho đơn giản nhé.

`header.js`

```
import React from 'react';
import { Text, View } from 'react-native';

const Header = () => {

  return <Text>App Header</Text>;
};

//export component để dùng ở 1 nơi khác
module.exports = Header;
```

Lưu ý: Ở dòng cuối cùng nhiều bạn thường hay dùng câu lệnh khác để export là : `export default Header;` tuy nhiên nó sẽ dễ xảy ra lỗi với **version react native 0.59.9**.

**Bước 3: Sử dụng component Header**

Trong file App.js của  bạn chỉ cần import và sử dụng như sau:

```
import Header from './src/components/header.js';

//...
<Header />

```

Đến đây việc sử dụng component Header đã xong và bạn chạy thử : **react-native run-android**
Để xem kết quả.

Nhưng vẫn còn 1 điều chưa ổn, bạn nhìn lại file header.js thấy rằng bất kể lúc nào sử dụng nó sẽ chỉ hiển thị ra một text có màu đen với nội dung **App Header** nếu sang một màn hình khác là Setting hoặc Menu thì sao đây ?

Nó chưa đáp ứng được việc thay đổi nội dung và màu sắc background thì không có. Việc tiếp theo chúng ta sẽ phải custom lại cho nó ngon hơn :grinning:

Tôi sẽ dùng thêm component View để set background và vị trí text luôn ở center, bạn chỉnh sửa lại file js như sau:

```
import React from 'react';
import { Text, View } from 'react-native';

//make a Component
const Header = (props) => {
  const { headerStyle, bgHeader } = styles;

  return (
    <View style = {bgHeader}>
      <Text style = { headerStyle }>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  bgHeader: {
    backgroundColor: '#0288D1',
    justifyContent:'center',
    alignItems:'center',
  },
  headerStyle: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
};

module.exports = Header;
```

Nhìn lại câu lệnh sử dụng component :

```
<View style = {bgHeader}>
      <Text style = { headerStyle }>{props.headerText}</Text>
</View>
```

Ở đây mình đã set style cho view với màu sắc và vị trí hiển thị content. Cách set thuộc tính của style gần giống như CSS, anh em nào làm mảng front-end sẽ hiểu dễ dàng hơn, nhưng không sao các bạn cứ quen tay là hiểu nó đơn giản hơn thôi.

Tiếp đến bạn chú ý đến phần khởi tạo `const Header = (props)` có 1 tham số là **props** tại đây cho phép bạn truyền vào một giá trị cho nội dung hiển thị bất kì.

Ok tương đối ngon rồi đấy nhỉ ^^, giờ mình quay lại file App.js chỉnh sửa tí xíu

`App.js`

```
type Props = {};
export default class App extends Component<Props> {
  render() {

    return (

      <View style={styles.container}>
        <Header headerText={'Title App'}/>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}
```

Dòng lệnh : `<Header headerText={'Title App'}/>` Bạn có thể thay thế giá trị headerText bằng tên màn hình mà người dùng chuyển đến nhé

Sau khi chạy kết quả hiển thị được sẽ như hình dưới đây:
![](https://images.viblo.asia/96a1c733-a1e3-49dc-84e3-0ee451e87092.png)

### 3. Bonus

Nhân tiện phần stylesheet mình sẽ làm cho giao diện nó material hơn nữa. Các bạn nhìn vào title app nó có phần khô cứng đúng không ?
Nếu trên native code Android bạn có thể dùng Toolbar nó sẽ có thêm phần đổ bóng ngay dưới tiêu đề và trên iOS cũng vậy.

Để làm được điều này bạn thêm dòng lệnh sau vào trong phần sử dụng style của component Header :

`header.js`

```
const styles = {
  bgHeader: {
    backgroundColor: '#0288D1',
    justifyContent:'center',
    alignItems:'center',
    elevation: 10,
    height: 45,
    shadowColor: '#00000',
    shadowOffset:{width: 0, height:10},
    shadowOpacity: 0.2,
    position: 'relative'
  },
  headerStyle: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
};
```

***Thuộc tính:***

**elevation** : đổ bóng cho View chỉ có tác dụng trên Android

`   shadowColor: '#00000'` màu sắc đổ bóng

```
  shadowOffset:{width: 0, height:10},
    shadowOpacity: 0.2,
```

Thuộc tính này có tác dụng trên iOS

Thêm cái component Image nữa cho view nó sinh động bạn nhỉ :D 

Bạn sửa thêm tí trong App.js như sau :

`App.js`

```
type Props = {};
export default class App extends Component<Props> {
  render() {
    const pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };

    return (

      <View style={styles.container}>
        <Header headerText={'Title App'}/>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <Image source={pic} style={styles.imgStyle} />


      </View>
    );
  }
}
```

**Kết quả cuối cùng:**

![](https://images.viblo.asia/1392cd08-45f5-4a85-9be2-33d3acc38d73.png)

Bạn quan sát phần header bây giờ nó có chiều sâu hơn rồi phải không nào. Trong quá trình thực hành bạn có vấn đề gì thì hãy comment ở dưới bài viết để mình giải đáp nhé hoặc có cách làm nào hay hơn bạn chia sẻ cho anh em cùng nắm bắt nha.

### 4. Tổng kết

Trên đây là cách làm cũng như một số lưu ý quan trọng khi xây dựng một component Header bất kì trong ứng dụng. Mong rằng bài viết có nhiều hữu ích với bạn. Happy coding !!!