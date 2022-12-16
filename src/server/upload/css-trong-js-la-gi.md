![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/09/lady-1721678_1280.jpeg) 

CSS trong JS hay `CSS-in-JS` là một thuật ngữ mô tả việc viết code style CSS trong code JS, tức viết vào file `.js` , `.jsx` thay vì viết code CSS vào file `.css` như bình thường.

## CSS trong JS ra đời khi nào?

`CSS-in-JS` ra đời khi mà trang web ngày càng phức tạp và việc duy trì tất cả các CSS của toàn bộ hệ thống trang web (code base lớn) trở nên khó khăn.

Vì tất cả CSS sẽ nằm chung trong một scope global document (hay global scope selectors) gây nhiều xung đột (khi trùng tên class, id) và việc ghi đè CSS trở nên khó khăn hơn (ghi đè nhiều lớp, sử dụng !important, …) . 

Thêm vào đó xu hướng `component-based development` (hay component driven development) ngày càng phát triển với React khiến việc style từng thành phần (component) càng trở nên cấp thiết.

## CSS-in-JS đã giúp giải quyết các vấn đề này như thế nào?

`CSS-in-JS` sẽ trích xuất CSS theo từng component thay vì theo document như CSS. 

`styled-components` là một thư việc CSS-in-JS được sử dụng phổ biến nhất. Ngoài ra còn có `Aphrodite`, `Radium`, `Glamorous`, `JSS`

Một ví dụ với thư viện Styled Component (`styled-components`):

Tạo Text mặc định sẽ nhận thẻ p, với font size là 16px.


```js
import styled from 'styled-components'

const Text = styled.p`
  font-size: 16px;
`
```

và truyền thẻ `h2` vào thuộc tính `“as”` để Text sử dụng:

```js
<Text as='h2'>This is a H2 heading</Text>
```
Khi đó code CSS sẽ tự động tạo một class duy nhất và được gắn vào DOM như sau:
```html
<style>
  .gZxhj123 {
    font-size: 16px;
  }
</style>
```

## Ưu điểm khi sử dụng CSS-in-JS

→ Code ngắn gọn và nhất quán hơn

→ Giảm xung đột CSS

→ CSS dynamic với props

→ Kế thừa style

→ Cú pháp SASS giúp style dễ dàng với pseudo element và pseudo class

→ Dễ dàng thay đổi theme với ThemeContext

→ Tự động tạo prefix cho class CSS, không sợ bị trùng nhau

→ Có thể viết unit test cho CSS

## Nhược điểm khi sử dụng CSS-in-JS

→ Sẽ không phù hợp với người chưa biết JS

→ Tốn thời gian làm quen với thư viện, gây khó khăn cho người mới

→ Khó khăn khi muốn debug bằng tên class

→ Hiệu suất không tốt bằng CSS, do sử dụng nhiều thẻ style hơn, nặng code base hơn

----

Trên đây là vài note tóm tắt mình tìm hiểu được về CSS-in-JS. 

Với mình, nếu dự án nhỏ, và làm việc với các bạn chưa có nhiều kinh nghiệm về JS, về OOP, … thì mình sẽ chọn CSS truyền thống (hoặc SASS – vẫn dynamic được) vì các bạn sẽ dễ tiếp cận hơn. 

Còn dự án vừa và lớn, tính kế thừa cao, nhiều components, dev nhiều kinh nghiệm hơn thì mình sẽ chọn các thư viện CSS-in-JS như styled-components.

Bạn thấy sao về CSS-in-JS? Nếu được chọn thì bạn sẽ sử dụng styled-components hay CSS truyền thống để style cho ứng dụng React của bạn?

[Bài viết gốc](https://beautyoncode.com/css-trong-js-la-gi/) nằm ở blog cá nhân của mình, mời bạn ghé chơi.

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!