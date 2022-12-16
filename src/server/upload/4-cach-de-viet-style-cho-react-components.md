Có tất cả 4 cách khác nhau để viết style cho các React Components, tùy thuộc vào sở thích cá nhân và độ phức tạp cụ thể của ứng dụng. Ví dụ:

Nếu bạn chỉ muốn thêm vài thuộc tính style cho components/elements thì *inline style* là lựa chọn tốt nhất.

Khi bạn muốn tái sử dụng các components/elements đã được style trong cùng một file thì *style-component* là một lựa chọn hoàn hảo.

Khi ứng dụng của bạn phức tạp hơn thì tôi đánh giá cao việc sử dụng CSS Modules hoặc sử dụng CSS stylesheets thông thường.

### 1. CSS Stylesheet

Đơn giản là các bạn sẽ import file css vào component bằng cách

```javascript
import './App.css'
```

nên bạn có thể tách file css ra cho mỗi component. 

Tuy nhiên dù bạn chỉ import ở 1 component nhưng css được import sẽ được áp dụng lên toàn bộ ứng dụng.

### 2. Inline styling
Trong React, inline styles không được viết dưới dạng string (chuỗi) như html thông thường. Thay vào đó nó sẽ được viết dưới dạng Object với key được viết theo kiểu camelCased còn style của value sẽ thường là kiểu string.

Ngoài ra, chúng ta cũng có thể tạo một biến lưu trữ giá trị css rồi truyền nó vào các element như sau:

```javascript
const styleObject = {backgroundColor: 'white', color: 'red'}

<div style={styleObject}>Hello</div>
```
hoặc truyền thẳng style vào element:

```javascript
<div style={{backgroundColor: 'white', color: 'red'}}>Hello</div>
```
### 3. CSS Modules
Một CSS Module là một file CSS mà tất cả các tên class và tên hiệu ứng sẽ được bao bọc lại và chỉ có tác dụng trong những file được import. Để có thể dễ hiểu hơn mình xin đưa ra một ví dụ cụ thể hơn về CSS module:
```javascript
import React from 'react';
import styles from './DashedBox.css';

const DashedBox = () => (
  <div className={styles.container}>
    <p className={styles.content}>Get started with CSS Modules style</p>
  </div>
);

export default DashedBox;
```
Hơi khác với import css thông thường ta import css bằng cách: `import styles './DashedBox.css'` sau đó ta sử dụng như một object.

Với những bạn nào sử dụng thư viện create-react-app để tạo ứng dụng thì cách viết ở trong file CSS hơi khác biệt một chút, đó là ta phải viết theo cú pháp `:local(selector)`. Ví dụ: 
```css
//DashedBox.css

:local(.container) {
   margin: 40px;
   border: 5px dashed pink;
 }
 :local(.content) {
   font-size: 15px;
   text-align: center;
 }
```
Còn với nhưng bạn sử dụng boilerplate khác thì có thể viết css như thường và thêm đoạn loader dưới đây vào file config webpack:
```javascript
{
  test: /\.css$/,
  loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
}
```
### 4. Styled-components 💅
Styled-components là một thư viện dành cho React và React Native cho phép bạn viết style ở cấp độ component trong ứng dụng của bạn.

Đầu tiên ta phải cài đặt thư viện styled-components: 

```terminal
npm install styled-components --save
```

Giờ chúng ta có thể tạo các biến mới bằng cách sử dụng các thẻ html quen thuộc và thêm style cho chúng theo cú pháp: 

`const Div = styled.htmlEle { styleKey: 'styleValue' }`

Sau đó ta có thể sử dụng biến mới tạo này như các React Component:
`<Div></Div>`

Sau đây là một ví dụ cụ thể hơn: 
```javascript
import React from 'react';
import styled from 'styled-components';

// Tạo một react component <Title> mà sẽ render ra thẻ <h1> mà text ở giữa, cỡ chữ 1.5em và màu chữ là palevioletred
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Tạo một react component nữa là <Wrapper>, render ra thẻ <section> với padding và nền papayawhip
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Cuối cùng sử dụng các component vừa tạo như các React component khác ngoại trừ việc các component này đã được "styled"
<Wrapper>
  <Title>Hello World, this is my first styled component!</Title>
</Wrapper>
```
### 5. Tổng kết: 
Tất cả những phương pháp trên đều có những ưu điểm và nhược điểm, vì vậy hãy suy nghĩ, tính toán trước về độ phức tạp của ứng dụng cũng như sở thích của bạn để chọn ra phương pháp hợp lý và hiệu quả nhất.

Nguồn: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822