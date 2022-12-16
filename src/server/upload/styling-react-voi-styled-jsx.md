# `Styling React với styled-jsx`
Trong những dự án sử dụng React, chắc hăn các bạn đã rất quen thuộc với những thư viện để hỗ trợ viết style như Styled-component, css-module. Nhờ những thư viện như vậy, việc viết styling trở nên thật dễ dàng, sự trùng chéo class name không còn phải là mối bận tâm nữa. Nhưng bạn đã từng nghe đến thư viện styled-jsx chưa? Thư viện này giúp bạn có thể viết được ngay style trong component, hay còn gọi là single file component.
![](https://images.viblo.asia/f3924402-7b81-4eef-b597-a3565119ca7a.png)
## Styled-jsx
Để cài đặt mình cần phải thêm một số config nho nhỏ
```js
npm install --save styled-jsx


Thêm styled-jsx/babel vào plugins trong babel

{
  "plugins": [
    "styled-jsx/babel"
  ]
}
```

Giờ thì bạn đã có thể sẵn sàng code với style-jsx rồi
```js
export default () => (
  <div>
    <p>only this paragraph will get the style :)</p>

    <style jsx>{`
      p {
        color: red;
      }
    `}</style>
  </div>
)
```

Nhờ đâu mà thư viện có thể giúp mình tránh việc trùng chéo style. ở trên, mình có thể thấy là mình đang styling toàn bộ những thẻ p, vậy thì những thẻ p khác không mong muốn thì sao. Đó chính là nhờ ở babel plugin ta vừa config trên đã hỗ trợ trêm những định danh cho những thẻ mà ta chỉ mong muốn hướng tới.
Đoạn code trên sẽ được compile trở thành
```js
import _JSXStyle from 'styled-jsx/style'

export default () => (
  <div className="jsx-123">
    <p className="jsx-123">only this paragraph will get the style :)</p>
    <_JSXStyle id="123">{`p.jsx-123 {color: red;}`}</_JSXStyle>
  </div>
)
```
Những đoạn như jsx-123 chính là những định danh để phân biệt các thẻ cần style với nhau.
Trong trường hợp bạn muốn viết style global thì sao, style-jsx cũng hỗ trợ bạn điều đó
```js
export default () => (
  <div>
    <style jsx global>{`
      body {
        background: red
      }
    `}</style>
  </div>
)
```

Trong nhiều tình huống, bạn sẽ cần override 1 style thư viện nào đó, hoặc đơn giản chỉ là style từ component cha xuống component con, việc đó cũng rất đơn giản như sau
```js
import Select from 'react-select'
export default () => (
  <div>
    <Select optionClassName="react-select" />

    <style jsx>{`
      div :global(.react-select) {
        color: red
      }
    `}</style>
  </div>
)
```
Với thuộc tính `:global` , class .react-select trong `Select` component sẽ được style một cách nhanh chóng. Chỉ những class như vậy mới được style mà thôi.

Trường hợp dynamic style cũng đơn giản như khi bạn truyền prop vậy
```js
const Button = (props) => (
  <button>
     { props.children }
     <style jsx>{`
        button {
          padding: ${ 'large' in props ? '50' : '20' }px;
          background: ${props.theme.background};
          color: #999;
          display: inline-block;
          font-size: 1em;
        }
     `}</style>
  </button>
)
```
## Conclusion

Trên đây là một số tính năng mà style jsx đã hỗ trợ mà mình đã tìm hiểu được. Đây là một thư viện khá hấp dẫn, đáng để sử dụng trong những ngày mà bạn đã cảm thấy quá quen thuộc với những thư viện cũ. Hy vọng rằng bạn sẽ có thể tìm được những điểm thụ vị khi sử dụng thư viện này như mình.
## `References`
https://github.com/zeit/styled-jsx