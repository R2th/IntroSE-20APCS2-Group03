Tiếp nối bài viết trước "Tìm hiểu về CSS-in-JS", hôm nay mình muốn giới thiệu rõ hơn về một thư viện thuộc CSS-in-JS đó là Styled Component.

![](https://images.viblo.asia/f72f5697-fabe-43a7-b894-fc335103cbaf.png)

## 1. Sự ra đời của Styled component
Trước khi CSS-in-JS được tạo, cách phổ biến nhất để tạo kiểu cho các ứng dụng web là viết CSS trong một tệp riêng và liên kết nó từ HTML. Nhưng điều này gây ra rắc rối trong các dự án lớn có nhiều người tham gia. Mọi người đều có cách viết CSS riêng. Điều này gây ra các vấn đề cụ thể và dẫn đến mọi người sử dụng !important.

Rồi đến Sass_một phần mở rộng của CSS cho phép chúng ta sử dụng những thứ như biến, quy tắc lồng nhau, nhập nội tuyến và hơn thế nữa. Nó cũng giúp giữ mọi thứ ngăn nắp và cho phép chúng ta tạo biểu định kiểu nhanh hơn. Mặc dù Sass có thể được coi là một cải tiến so với CSS, nhưng nó được cho là gây ra nhiều tác hại hơn là không có hệ thống nhất định được đưa ra.

Sau đó, BEM ra đời. BEM là một phương pháp cho phép chúng ta giảm các vấn đề cụ thể bằng cách bắt chúng ta viết các tên class duy nhất. BEM không giải quyết được vấn đề cụ thể, nhưng nó làm cho HTML dài dòng hơn. Các tên class có thể trở nên dài một cách không cần thiết và nó khó có thể tạo ra các tên class duy nhất khi bạn có một ứng dụng web lớn.

Sau đó, các Modules CSS đã ra đời. Các Modules CSS đã giải quyết những gì mà cả Sass và BEM đều không thể - vấn đề về các tên class duy nhất - bằng cách sử dụng công cụ thay vì dựa vào tên do nhà phát triển đưa ra, từ đó giải quyết các vấn đề cụ thể.

Vấn đề duy nhất với tất cả các giải pháp mới này là các nhà phát triển đã được tạo ra để học các cú pháp mới. Điều gì xảy ra nếu chúng ta có thể viết CSS chính xác như cách chúng ta viết nó trong tệp .css nhưng trong JS? Và do đó styled components ra đời.

Styled component sử dụng template literals, một tính năng ES6. Template literal là chuỗi ký tự cho phép biểu thức nhúng. Chúng cho phép các chuỗi nhiều dòng và các tính năng nội suy chuỗi với chúng.

Điều đặc biệt nhất là styled componnet nó cho phép chúng ta viết CSS-in- JS.

Những nội dung trên đã trả lời được tại sao chúng ta nên sử dụng styled-component rồi, bắt đầu sử dụng nó thôi nào.

## 2. Cài đặt ban đầu 
Câu lệnh npm:
```
npm install --save styled-components
```
Hoặc yarn:
```
yarn add styled-components
```
Và có thể install với cdn:
```
<script src="https://unpkg.com/styled-components/dist/styled-components.min.js"></script>
```

Các version mình đang dùng:
* Node 12.6.0
* npx 6.4.1
* yarn 1.17.3
> Lưu ý: Styled components được thiết kế riêng cho React, vì vậy bạn phải sử dụng React để sử dụng styled component.
## 3. Bắt đầu sử dụng Styled component
#### Tạo 1 component
```js
import styled from "styled-components";
const component = styled.nameTag`
   //conent css
`;
```
Ví dụ:
```js
const Title = styled.div`
    color: black;
    font-size: 20px;
`
```
#### Cách truyền props vào 1 component
Ví dụ: Tạo ra 1 tiêu đề, ở đây thuộc tính color sẽ được truyền vào sau khi sử dụng component.
```js
const Title = styled.h2`
   color: ${props => props.color};
   /* :default props */
   font-size: ${props => props.size || "30px"};
`;
```
Ở đây ta có thể thấy:
* Title này là 1 component có thẻ h2.
* Thuộc tính color: props là color.
* Thuộc tính font-size: props là size, nhưng nó sẽ nhận giá trị 30px khi ta không truyền props vào là default props style.
```html
<Title color="blue">title table</Title>
```
#### Kế thừa style component
Có thể kế thừa component là styled component hoặc component bất kỳ qua cú pháp:
```js
const extendComponent = styled(Component)`
   //conent
`;
```
Ví dụ: ta có component là Title, và tạo ra 1 component là Title speical (hiển thị đầu tiên) có màu nền khác các màu nền của các component còn lại:
```js
const Title = styled.div`
    color: black;
    font-size: 20px;
`

const TitleSpecial = styled(Title)`
  color: red;
`;
```
#### Sử dụng class css đã viết sẵn:
Ta dùng thuộc tính className cho các styled-components tương tự như các component bình thường khác, như dưới đây:
```html
<Title className="text-primary">title table</Title>
```
Đây là sự kết hợp tuyệt vời viết css và inline style trong component.
#### Animations
Styled-Components cung cấp cơ chế sinh ra các unique name cho các keyframes ở mỗi components, bởi vậy chúng ta sẽ không cần lo lắng về việc tên của keyframes có bị trùng hay không nữa:
```js
import styled from 'styled-components';
 
import { keyFrameExampleOne } from './KeyFrames';
 
export const Box = styled.div`
  display: inline-block;
  background: pink;
  width: 200px;
  height: 200px;
  position: relative;
  animation: ${keyFrameExampleOne} 2s ease-in-out 0s infinite;
`
 
export default Box;
```
```
import styled, { keyframes } from 'styled-components';
 
export const keyFrameExampleOne = keyframes`
  0% {
    height: 200px;
  }
  100% {
    height: 600px;
    background: orange;
  }
`
```
#### Responsive styled components
Chúng ta cũng có thể responsive dễ dàng với styled componnets.
```js
const Container = styled.div`
  width: 400px;
  margin: 30px auto;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  color: ${gray2};
  @media (max-width: 400px) {
    width: 100%;
  }
`;
```
## 4. Tổng kết
Styled Component giúp bạn dễ dàng viết CSS của bạn trong JS và đảm bảo không có các vấn đề về tên class hoặc tính đặc hiệu xung đột với nhiều lợi ích khác. Điều này làm cho việc viết CSS là một niềm vui. Trong bài chia sẻ này, chúng ta đã khám phá các tính năng cơ bản của Styled Component, ngoài ra còn nhiều điều hay ho về styled component có thời gian bạn hãy tìm hiểu thêm sẽ không làm bạn thất vọng.

Cảm ơn bạn đã dành thời gian đọc bài viết!