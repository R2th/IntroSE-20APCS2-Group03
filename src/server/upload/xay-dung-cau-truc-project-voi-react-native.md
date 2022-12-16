Trong quá trình xây dựng và phát triển một dự án ngoài việc lựa chọn công nghệ, lựa chọn các thư viện hỗ trợ... thì việc tổ chức các thư mục, các thành phần, cấu trúc của project là việc cực kì quan trọng, nó là một trong những công việc cần phải thực hiện đầu tiên trước khi bạn bắt tay vào việc coding.
### Lợi ích của một project có cấu trúc chặc chẽ:


-----

* Source code dễ nhìn, dễ hiểu(điều này sẽ rất có lợi cho những người mới vào sau dễ dàng làm quen với dự án hơn)
* Việc quản lý project sẽ trở nên dễ dàng và hiệu quả
* Và điều cuối cùng nó sẽ giúp cho project của chúng ta nhìn trờ nên chuyên nghiệp hơn :D
### Cách bố cục của project với react-native

-----

Để việc tổ chức bố cục của project được hiệu quả bạn cần xác định được các nhóm resource có liên quan với nhau thành các thư mục riêng và tất cả sẽ nằm chung trong cùng folder `src`. Thông thường các project của mình sẽ chia thành các loại như sau:
* assets: chức các loại là hình ảnh, font, color...
* theme: chức các stylesheet css
* reducers: chứa các reducers của các màn hình
* containers: chứa các xử lý logic liên quan của từng màn hình
* components: chứa các màn hình hiển thị và các Constom Components
* navigators: chứa xử lý sự kiện di chuyển màn hình và định nghĩa các const cho các route màn hình
* common: chứa các định nghĩa key, value const
* untils: chứa các xử lý logic chung cho ứng dụng của bạn. ví dụ như: xử lý format thời gian, xử lý chuỗi, xử lý request...

Trên đây là một số những thư mục thường được tổ chức trên project của mình. Để các bạn dễ hình dung hơn mình sẽ lấy 1 ví dụ áp dụng cấu trúc trên nhé.

Như đã trình bày ở trên đây chính là cấu trúc project của mình

![](https://images.viblo.asia/690586ac-9c3c-4d27-994b-f83c7b5ee428.PNG)

Tiếp theo mình sẽ trình bày nội dung trong một số thư mục để các bạn dễ hình dung, ở đây mình sẽ trình bày 2 thư mục đó là `theme` và `components` 2 thư mục này để làm gì thì các bạn xem lại ở trên nhé

### Theme
![](https://images.viblo.asia/cbd195f0-5da8-4770-9dd1-38d9e2b83c2e.PNG)

* StyleCommon: là file chứa các style sheet chung dành cho toàn components
```
import {
    StyleSheet
} from 'react-native';
const StyleCommon = StyleSheet.create({
    viewMain: {
        padding: 20
    },
    button1: {
        backgroundColor: 'red',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold'
    }
});
export default StyleCommon;
```
* StyleMain: là file chứa các style sheet dùng cho màn component `Main`
```
import {
    StyleSheet
} from 'react-native';
const StyleMain = StyleSheet.create({
    button2: {
        backgroundColor: 'green',
        marginTop: 10,
        padding: 20,
        color: 'yellow'
    }
});
export default StyleMain;
```
* index: là file sẽ tổng hợp tất cả các style sheet trong filder theme để sử dụng
```
import StyleCommon from './StyleCommon';
import StyleMain from './StyleMain';
const AppStyle = {
    StyleCommon,
    StyleMain,
}
export default AppStyle;
```

### Components
![](https://images.viblo.asia/2efff50f-2ff2-472f-83ab-dfcb389ef434.PNG)

Trong components sẽ chứa 1 component có tên là `Main` trong `Main` sẽ sử dụng `theme` như sau:

```
import React, { Component } from "react";
import AppStyle from '../theme';
import {
    View,
    Text
} from 'react-native'
export default class Main extends Component {
    render(){
        return(
            <View style={AppStyle.StyleCommon.viewMain}>
                <Text style={AppStyle.StyleCommon.button1}>
                    'Button 1!'
                </Text>
                <Text style={AppStyle.StyleMain.button2}>
                    'Button 2!'
                </Text>
            </View>
        );
    }
}
```
Nhìn vào đoạn code trên các bạn sẽ thấy:

`import AppStyle from '../theme';` chúng ta chỉ cần import theme thay vì import từng file trong thư mục theme vì chúng ta đã cấu hình chúng trên `theme/index.js` rồi.

Tiếp theo các bạn nhìn tiếp các dòng lệnh: 

`<View style={AppStyle.StyleCommon.viewMain}>`

`<Text style={AppStyle.StyleCommon.button1}>`

`<Text style={AppStyle.StyleMain.button2}>`


đây là cách mà chúng ta sẽ sử dụng các style trong theme

### Kết luận


-----


Từ cách trình bày trên chúng ta có thể thấy trình bày cấu trúc project một cách hợp lý và khoa học sẽ giúp cho project của chúng ta sáng sủa hơn, dễ đọc, dễ hiểu hơn. Hi vọng bài viết này sẽ giúp ích được cho các bạn!