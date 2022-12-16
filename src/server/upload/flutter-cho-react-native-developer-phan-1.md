## I. Mở đầu
Chào mọi người !

Mình tạo series này dành cho những người đã có kinh nghiệm code react native và muốn chuyển sang hoặc học thêm về flutter

Bài viết này dựa trên tài liệu của flutter : https://flutter.dev/docs/get-started/flutter-for/react-native-devs

Trong tài liệu này flutter đã hướng rất chi tiết cho những ace RN có thể đọc và code flutter như react native, 

Mình sẽ bỏ qua sự khác nhau giữa ngôn ngữ dart và js vì mọi người có thể dễ dàng tìm được những bài tương tự về dart cơ bản trên mạng

Ở series này mình sẽ hệ thống ra những kiến thức mà react native developer có thể đem sang flutter và code ngon lành

Vì mình cũng chưa từng code flutter trước đây mà ý định của mình là sẽ vừa dịch , vừa viết bài để học luôn, nên mọi người thấy sai ở đâu thì comment luôn cho mình sửa và học hỏi luôn nha mình rất cảm ơn ạ .

## II. Nội dung: 
### A . Viết ứng dụng hello world

#### * React Native : 

```
import React from "react";
import {Text, View} from "react-native";
 
const App = () => {
 return (
   <View style={styles.container}>
     <Text>Hello</Text>
   </View>
 );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
 
export default App;
```

#### * Flutter
```
import 'package:flutter/material.dart';
void main() {
  runApp(
    Center(
      child: Text(
        'Hello, world!',
        style: const TextStyle(fontSize: 30),
        textDirection: TextDirection.ltr,
      ),
    ),
  );
}
```

* Như mọi người thấy : Các thành phần UI được react render từ các component, sử dụng các cặp thẻ như View, Text, …
* Ở flutter thay vì dùng các UI Component chúng ta sử dụng các widgets ví dụ như  Center và Text như ở trên
* Về style, thay vì dùng StyleSheet, flutter có các kiểu style riêng cho các Widgets:
    * Không như react, chúng ta có thể style cho tất cả các component base của RN, ví dụ như thêm margin, padding cho thẻ <Text />.
    * Ở FLutter ứng với mỗi loại Widget sẽ có một kiểu style riêng của nó, ví dụ với Text bạn chỉ có thể sửa các style liên quan đến ký tự như là font-size, font-style chứ k thể nào thay đổi được margin, padding của nó
    * Không phải cái gì bên react native là style thì bên flutter cũng viết trong style, ví dụ như ở trên textDirection lại là một thuộc tính riêng nằm ngoài style
    * 
-> React native -> tất cả là component ( tất nhiên còn nhiều thứ nữa …)

-> FLutter -> tất cả là widgets

### B. Tạo ra 1 “component” để sử dụng lại 

Ở react chúng ta tạo ra 1 component bình thường sau đó chuyền các props để tái sử dụng component

Ở flutter chúng ta có thể tạo 1 class widget để tái sử dụng được

#### Ví dụ :
###### Khởi tạo một widgets tên CustomCard:
```
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class CustomCard extends StatelessWidget {
  CustomCard({@required this.index, @required this.onPress});

  final String? index;
  final VoidCallback? onPress;

  @override
  Widget build(BuildContext context) {
    return Card(
        child: Column(
      children: <Widget>[
        Text('Card $index'),
        TextButton(
          child: const Text('Press'),
          onPressed: onPress,
        ),
      ],
    ));
  }
}
```

widgets này sẽ nhận vào 2 “props” đó là biến `index` và `Function onPress`

Từ đó chúng ta có thể tái sử dụng như sau:

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: CustomCard(
        index: "hello",
        onPress: () {
          print('Card hello');
        },
      ),
    );
  }
}
```

 Nhìn khá tương đồng với RN đúng không nào.
 
 Mình tạm kết thúc ở đây, ở phần 2 mình sẽ viết chi tiết về các components thay thế khi mọi người chuyển từ RN sang flutter