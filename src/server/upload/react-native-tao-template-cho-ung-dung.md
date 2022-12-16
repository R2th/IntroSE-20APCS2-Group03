## I. Tổng quan
Như các bạn cũng đã biết, React Native là một framework đã trở nên cực kỳ phổ biến vì nó cho phép các nhà phát triển tạo ra các ứng dụng đa nền tảng chạy trên Android và IOS, với common UI code-base được viết bằng Javascript. Hầu hết các nhà phát triển React Native cho rằng gần như 90% code chạy được trên cả hai nền tảng. Tuy nhiên, mỗi nền tảng sẽ đều yêu cầu hay cần thiết code native với tỷ lệ 10%. Hầu hết 10% này để config, setting cho các thư viện hoặc các thành phần đang được sử dụng. Cũng có thể có sự khác biệt về thiết kế hoặc chức năng tùy thuộc vào thông số kỹ thuật của ứng dụng.

Vậy, một kỹ thuật tốt để tạo ra một ứng dụng như vậy là tạo, thiết lập một ***template*** cho tất cả các pages (screen) để tránh tất cả các khác biệt có thể có giữa các màn hình. Hay nói đơn giản là chúng ta sẽ tạo những lớp base cho ứng dụng của mình. Cách làm này được các nhà phát triển ưa thích và thường sử dụng, nó làm giảm đáng kể số lượng mã code, tại khả năng sử dụng lại (reusability) và giảm thiểu effort, mang lại chất lượng sản phẩm tốt nhất. 

Bây giờ, hãy cùng mình bắt đầu tạo một ví dụ về ***template*** nhé :D

## 2. Thực hành
VD: Ứng dụng của mình sẽ có 3 màn hình đơn giản như sau:
![](https://images.viblo.asia/876084d5-3f44-4ce7-aad8-38384d5b7e37.png)

Nhìn vào các màn hình trên, mình có thể chia từng màn hình với các thành phấn chính như sau:

A. Header

B. Content

C. Footer

**A. Header**: Hay thường được biết như là một Navigation Bar.  Đây là thành phần mà trong hầu hết các trường hợp phải có trên mỗi màn hình, giúp người dùng điều hướng qua ứng dụng (nó thường chứa: tiêu đề màn hình, nút quay lại, biểu tượng menu hamburger - để mở menu bên hoặc bất kỳ tùy chọn nào khác, hay như bộ lọc filters).

**B. Content**: Chi tiết ở đằng sau nhé :D

**C. Footer**: Hay thường được biết như là Tab Bar.  Tuy nhiên, trong Android, thường thì Tab Bar nằm dưới Header. Tab Tab footer sẽ là tùy chọn thứ hai, nên có một vị trí cố định trên màn hình, để người dùng có thể truy cập mọi lúc, tương tự như Header.

### Step 1:
Trong ứng dụng này, ta sẽ chỉ có Header và Content. Chúng ta sẽ tạo ***template*** gồm 2 thành phần là header và content.
Lưu ý: Chúng ta sẽ k sử dụng react-navigation's NavBar, mà sẽ tạo custom component cho Header.

### Step2: 
Tạo template bằng cách chèn các thành phần chính mà chúng ta đã xác định ở Step 1:
```javascript
import React, { Component } from 'react';
import { View } from 'react-native'; 
import styled from 'styled-components/native'; 
const Wrapper = styled.View`
 width: 100%;
 height: 100%;
` 
const Header = styled.View`
 height: 80px;
 width: 100%; 
` 
const Content = styled.View`
 flex: 1; 
` 
export default class Page extends Component {
 render() {
  return (
   <Wrapper>
    <Header/>
    <Content> {this.props.children} </Content>
   </Wrapper>
  );
 }
}
import React, { Component } from 'react';
import Page from '../templates/page'; 
export default class Hello extends Component {
 render() {
  return ( <Page/> );
 }
}
```

### Step 3:
Chọn style phù hợp cho mỗi thành phần ở trên, chú ý ở các điểm sau: 
- Xem thật kỹ design của từng màn hình
- Tìm điểm tương đồng nhất, bắt đầu từ margins (lề).

Sau khi xem xét thật kỹ, chúng ta sẽ thêm padding riêng cho cả Header và Content.
```javascript
import React, { Component } from 'react'; 
import { View } from 'react-native'; 
import styled from 'styled-components/native'; 
const Wrapper = styled.View`
 width: 100%;
 height: 100%; 
` 
const Header = styled.View`
 height: 80px;
 width: 100%; 
`
 [...] 
const Content = styled.View`
 flex: 1;
 background-color: white;
 padding: 16px; 
` 
export default class Page extends Component {
 render() {
  return (
   <Wrapper>
    <Header> [...] </Header>
    <Content> {this.props.children} </Content>
   </Wrapper>
  );
 }
}
```

- Thiết lập, chọn loại nội dung:
1. Sample View: chỉ sử dụng khi bạn chắc chắn rằng các thành phần trong page của bạn sẽ phù hợp với page bất kể điều gì (ví dụ: nếu bạn có các thành phần có kích thước tương đối với khoảng trống có sẵn, như trong hình là khoảng 60% màn hình)
2. Scroll View: sử dụng tùy chọn này nếu bạn có các thành phần sẽ không vừa với màn hình 100%, đặc biệt là trên các thiết bị nhỏ hơn.
3. Keyboard Aware Scroll View (react-native-keyboard-aware-scroll-view) là một thư viện xử lý vị trí của màn hình khi bạn có thao tác nhập văn bản bên trong màn hình của bạn. Nó sẽ đẩy các thành phần input (TextInput) của bạn lên phía trên bàn phím để cho phép người dùng ứng dụng của bạn có thể tương tác mượt và với TextInput. (Bạn có thể sử dụng bất cứ component/library nào nhé, mình thấy cái này ổn :D). 

1 ứng dụng phức tạp cũng có thể có tất cả các loại content được mô tả ở trên. Vì vậy hãy xem xét cân nhắc lựa chọn và kết hợp 1 hoặc nhiều loại content nhé :D

LƯU Ý: Không đặt Scrollable View bên trong Content, nhưng hãy đặt Content là một Scrollable view. Nếu không, khi bạn include 1 Scrollview bên trong 1 view mà nó padding, scroll bar sẽ không được hiển thị chính xác.

### Step 4:
Implement các loại nội dung vào bố cục page:
```javascript
import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Wrapper = styled.View`
 width: 100%;
 height: 100%;
`
const Header = styled.View`
 height: 80px;
 width: 100%;
`
[...]
`
const Content = styled.View`
 flex: 1;
 background-color: white;
 padding: 16px;
` 
const ScrollContent = styled.ScrollView`
 flex: 1;
 background-color: white;
 padding: 16px;
`
const HeaderComponent = () => (
 <Header> [...] </Header>
 );
const PageContent = ({children}) => (
 <Content> {children} </Content>
 ); 
const ScrollablePageContent = ({children}) => (
 <ScrollContent> {children} </ScrollContent>
 );
const KeyboardAwareScrollablePageContent = ({children}) => {
 let containerStyle = {flexGrow: 1, padding: 16};
 return (
 <KeyboardAwareScrollView contentContainerStyle={containerStyle}>        
   {children}
 </KeyboardAwareScrollView>
 );
};
export default class Page extends Component {
 constructor(props) {
  super(props);
  const { contentType } = this.props;
  let ContentTag;
  switch (contentType) {
   case 'view':
    ContentTag = PageContent;
    break;
   case 'scroll-view':
    ContentTag = ScrollablePageContent;
    break;
   case 'keyboard-aware-scroll-view':
    ContentTag = KeyboardAwareScrollablePageContent;
    break;
   default:
    ContentTag = PageContent;
  }
  this.state = { ContentTag }
 }
 render() {
  const { ContentTag } = this.state;
  return (
   <Wrapper> <HeaderComponent {...this.props} />
    <ContentTag {...this.props} />
   </Wrapper>
  );
 }
}
```

LƯU Ý:  Nếu bạn sử dụng
- fastlane + react-native base, react-native-keyboard-aware-scroll-view sẽ hoạt động tốt 
- Dành cho Expo.IO, hãy nhớ:
+ Add "androidStatusBar": { "backgroundColor": "#fff" } vào trong file app.json, nếu không bàn phím của bạn sẽ bao phủ các field Text.
+ Bạn sẽ phải thêm ScrollView bên trong Bàn phím Aware Scroll View, nếu không, bàn phím của bạn sẽ đẩy nội dung của bạn lên và compress Components của bạn!

### Step 5: 
Chia main components của bạn thành các components nhỏ hơn (smaller components).

Trong ứng dụng trên, các page có cùng cấu trúc bên trong Content:
+ Intro
+ Content
+ Submit

Nếu Content của bạn có bố cục (layout) khác nhau cho hầu hết các màn hình, thì các bạn có thể bỏ qua bước 5 này. Nhưng nếu chỉ có 2 hoăc 3 loại layout, chúng ta sẽ thêm các kiểu layout dưới dạng custom.

## Kết luận
Đừng đánh giá thấp một thiết kế đơn giản cần được triển khai cho đa nền tảng và hãy cố gắng tạo đúng mẫu ngay từ đầu nhé. :D

Thanks for reading!