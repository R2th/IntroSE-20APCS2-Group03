Chắc hẳn bạn đã từng nghe qua các thuật ngữ như Styled Componnents, Radium, Aphrodite và hỏi rằng "Các thứ này là gì nhỉ???" - Sau khi tìm câu trả lời thì thuật ngữ để dùng chung các thứ trên đó là CSS-in-JS. Đó sẽ là concept tốt giúp bạn không còn phải maintain 1 đống style-sheets. CSS-in-JS sẽ trích xuất model CSS theo level component, thay vì theo level document. Bắt đầu những cái hay ho về CSS-in-JS thôi nào!!!

![](https://images.viblo.asia/9de99e84-b1c6-4e19-ade7-9e8a2a74ace0.jpg)

## 1.  Nhìn qua về CSS-in-JS

CSS-in-JS là một kỹ thuật sử dụng JavaScript để định kiểu các thành phần. Khi JavaScript này được phân tích cú pháp, CSS được tạo và được đính kèm vào DOM ngay. Chức năng này được thực hiện bởi các thư viện bên thứ ba. Ví dụ, ở đây được triển khai với styled-components:

```js
import styled from 'styled-components'

const Title = styled.div`
    color: black;
    font-size: 20px;
`
```
```js
<StyledText>Hello CSS-in-JS</StyledText>
```

Trong browser, đoạn code này sẽ attach với DOM như thế này:
```css
<style>
.gZxhj123 {
    color: black;
    font-size: 20px;
}
</style>
```
Bạn thấy có gì khác biệt ở đây không? CSS-in-JS gắn tag <style>  ở phần trên của DOM. Điều này có nghĩa là bạn có thể sử dụng mọi truy vấn media & selector ngụy tạo mà bạn có thể nghĩ đến.
    
## 2.  Những lợi ích cùng những bất lợi khi sử dụng CSS-in-JS
    
Dưới đây chỉ là vài lợi ích khi chúng ta sử dụng css-in-js mà mình có thể liệt kê: 
* Code ngắn gọn hơn. Bạn sẽ không còn phải maintain quá nhiều style-sheets nữa.  CSS-in-JS sẽ trích xuất model CSS ở cấp độ component, thay cho cấp độ document (phương pháp modularity). 
* CSS-in-JS sẽ khai thác tối đa hệ sinh thái JavaScript nhằm tăng cường cho CSS.
* Giải quyết xung đột global namespace và style:  Các module CSS, Shadow DOM và vô số các quy ước đặt tên (như BEM) đã được cộng đồng giải quyết từ lâu. Styled-components sẽ thực hiện việc đặt tên thay chúng ta. Vì con người dễ mắc sai lầm còn máy tính thì ít khi mắc sai lầm lắm.
* CSS rules được tự động vendor prefix.
* Dễ dàng chia sẻ constants & functions giữa JS và CSS.
* Có thể Unit tests cho CSS.
    
Khó có cái gì có thể hoàn hảo như vậy nên bên cạnh những lợi ích chúng ta cũng có bất lợi khi sử dụng như sau:
*  Các thành viên mới trong team sẽ gặp khó khăn để thích nghi với code-base, phải học rất nhiều thứ.
*  Chưa được kiểm duyệt tính scale trong các project lớn và sinh ra những class ngầu nhiên gây khó khăn cho những người đã quen việc debug CSS bằng tên class.
    
Nhìn chung những bất lợi là nằm ở vấn đề thích nghi với cái mới và những nỗ lực cần thiết để học được kĩ năng mới sau một khoảng thời gian nhất định.
    
## 3.  Các thư viện phổ biến CSS-in-JS năm 2019
### Styled components
    
![](https://images.viblo.asia/f72f5697-fabe-43a7-b894-fc335103cbaf.png)
    
Với Styled Components thay vì sử dụng những selector để làm đẹp cho element như trên chúng ta sẽ định nghĩa những components với style chỉ dành riêng cho bản thân nó. 
    
Link: https://www.styled-components.com/
    
 ### Radium
    
 ![](https://images.viblo.asia/3c30590b-334a-4bbd-ba6d-678caad1e494.jpg)
    
Radium là một bộ công cụ để dễ dàng viết React component styles. Nó giải quyết các trạng thái trình duyệt và truy vấn phương tiện để áp dụng styles chính xác cho components của bạn, tính đặc hiệu hoặc sự phụ thuộc thứ tự nguồn.
    
Link: https://github.com/FormidableLabs/radium
    
 ### Aphrodite
Aphrodite là một thư viện CSS-in-JS dựa trên khung với sự hỗ trợ cho kết xuất phía máy chủ, tiền tố trình duyệt và tạo CSS tối thiểu. Aphrodite biến đổi mọi thứ thành các lớp và sử dụng thuộc tính lớp.
```js
import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
 
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'red'
    },
    title: {
        backgroundColor: 'blue'
    }
});
 
class App extends Component {
    render() {
        return (
            <div className={css(styles.wrapper)}>
                <h1 className={css(styles.title)}>Hello Aphrodite!<h1>
            </div>;
        )
    }
}
```
Link: https://github.com/Khan/aphrodite
                    
 ### Glamorous
                    
![](https://images.viblo.asia/f098f817-b234-4000-848e-5751157e816d.png)

Glamorous được định hướng xây dựng "maintainable CSS with React” lấy cảm hứng từ styled-component và jsxtyle. Nó có API rất giống với styled-components và sử dụng các công cụ tương tự như hood.

```js
import React from 'react'
import glamorous from 'glamorous'
 
const Wrapper = glamorous.div({
    backgroundColor: 'black'
})
 
const Title = glamorous.h1({
    color: 'white'
})
```
Link: https://github.com/paypal/glamorous
                    
### JSS
                    
![](https://images.viblo.asia/939abbaf-3539-4962-86a0-927b678d0add.png)
                    
JSS là một bản tóm tắt về CSS, sử dụng JavaScript để mô tả các kiểu theo cách khai báo và duy trì. Nó là một trình biên dịch JS sang CSS hiệu suất cao, hoạt động ở thời gian chạy và phía máy chủ. Thư viện lõi này là mức độ bất khả tri và khung thấp, và khoảng 6KB (được rút gọn và nén). Nó cũng có thể được mở rộng thông qua API plugin. 
                    
```js
import React from 'react'
import injectSheet from 'react-jss'
 
const styles = {
    wrapper: {
        background: 'black'
    },
    title: {
        color: 'white'
    }
}
 
 
const App = ({classes}) => (
    <div className={classes.wrapper}>
        <h1 className={classes.title}>Hello JSS </h1>
    </div>
)
 
export default injectSheet(styles)(App)
```
                    
Link: https://github.com/cssinjs/jss
                    
Cảm ơn bạn đã dành thời gian đọc bài viết!