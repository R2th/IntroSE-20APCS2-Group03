![](https://images.viblo.asia/62c1a3d4-7c22-4d66-a6d4-e01bcd4c3ddf.png)
Như vậy chúng ta đã hiểu được nguyên lý của lớp nền chạy dưới **styled-components** dựa trên Tagged template literals (ES6 feature) ở kì 1. Với **styled-components** trong dự án giờ chúng ta sẽ có những lợi ích có thể liệt kê ra được dưới đây:

* Style trực tiếp trong file JS: Nhờ vậy những dumb component (component có tính chất nhỏ, lẻ, những component cấp dưới không được promote lên làm sếp Container)  được tạo ra dễ dàng hơn rất nhiều và không còn lòng vòng qua file external css.
* Sử dụng để xây dựng các common component biến đổi linh hoạt với conditional render qua **props** truyền vào. Không còn phải tạo điều kiện cho những Object style. Dễ dàng tái sử dụng và lên kế hoạch test.
* Không còn đau đầu trong việc naming cũng như gây xung đột các class. Chúng ta hoàn toàn có thể dùng đi dùng lại các tên gọi thông thường trong mỗi Component. **Styled-components** sẽ tự động generate ra những unique name cho mỗi class được tạo nên.

Chúng ta sẽ tìm hiểu kĩ càng thêm dưới đây:

## 1. Reusable Component

```js
import React, { Component } from 'react'
import styled from 'styled-components'

const Quote = styled.p`
  color: #bada55;
  font-family: Helvetica, san-serif;
`

class Component extends Component {
  render() {
    return (
      <Quote>Less is more!</Quote>
    )
  }
}

export default Component
```

Như vậy chúng ta vừa tạo ra một Quote component với màu sắc và font chữ huyền thoại.
Tuy nhiên component này đang bị fixed hard code nên không có linh hoạt lắm, bây giờ chúng ta sẽ tạo ra một component mang tính nền tảng nhiều hơn.

```js
import React, { Component } from 'react'
import styled from 'styled-components'

const Quote = styled.p`
  color: ${props => props.color ||  '#bada55'};
  font-family: Helvetica, san-serif;
  font-size: 24px;
  display: inline-block;
  border: 1px solid ${props => props.color ||  '#bada55'};
  padding: 8px 16px;
`

const pickedColor = '#c0ffee';

class ReusableComponent extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <Quote color={pickedColor}>
          Less is more!
        </Quote>
      </div>
    )
  }
}

export default styled(ReusableComponent)`
  width: 100vw;
  height: 100vh;
  text-align: center;
`
```

Như các bạn thấy lần này \<Quote> sẽ nhận thêm props truyền vào để check style. Bí mật bên dưới dòng code `${props => props.color || '#bada55'}` đã được bật mí ở kì trước. Nhờ vào đó ta có thể làm rất nhiều điều khi styling cho một component.

Có 2 điểm cần chú ý:

* `ReusableComponent` có thể là một **third party component** bất kì (được import từ một package hay được tạo ra từ hư không) đều có thể style qua **styled-components**

```js
export default styled(ReusableComponent)`
  width: 100vw;
  height: 100vh;
  text-align: center;
`
```

* Nếu không chắc các **third party component** có support props className ko thì ta chỉ cần bọc component này trong một thẻ div với `<div className={this.props.className}>`

## 2. Global style and Reusable styles with css()

* Chúng ta vẫn có thể hoàn toàn tạo ra những bộ class css hay reset, abcxyz vào global style trong **styled-components**:

injectGlobal `body { background-color: white; padding: 0; margin: 0; }`

* Ngoài ra **styled-components** đã chuẩn bị sẵn một function để tái sửa dụng các css in common:

```js
import styled, { css } from 'styled-components'

...

const border = css`
  ${props => {
    if (props.showBorder) {
      return `
        border: 1px solid ${mainColor};
        border-radius: 50%;
      `
    }
  }}
`

const RoundIcon = styled.img`
  padding: 5px;
  margin: 15px;
  ${border}
`
```

## 3. Conditional/Functional Styling

Dựa vào ví dụ trên đây bạn có thể hiểu được sức mạnh của JS trong **styled-components**. Dưới đây là một ví dụ khác sử dụng ternary operator:
```js
const Thumbnail = styled.img`
  width: 250px;
  height: 250px;
  padding: 16px;
  margin: auto;
  ${props =>
    props.showBorder
    ? return `
      border: 1px solid ${mainColor};
      border-radius: 8px;
    `
    : return `
      background-color: #c0ffee;
    `
    }
  }}
`
```
## 4 Refs
* [ Styled-Components in Action](https://hackernoon.com/styled-components-in-action-723852f2a93d)