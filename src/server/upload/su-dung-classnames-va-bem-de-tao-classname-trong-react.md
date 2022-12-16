## Giới thiệu
Nếu bạn là 1 ReactJS hay frontend developer thì Bem là 1 trong những rule đặt tên class mà bạn cần phải nắm. Theo mình thấy, hầu hết các dự án đều sử dụng bem không ít thì nhiều BEM (block, element, modifier) trong dự án đó. Việc sử dụng BEM giúp cho việc xác định vai trò của block/element trở nên dễ dàng hơn chỉ bằng việc đọc tên class.

Nhưng ở bài viết này mình không nói sâu về BEM vì nó có khá nhiều trên mạng rồi, bạn có thể đọc thêm về BEM trong bài viết: https://viblo.asia/p/tim-hieu-ve-bem-gioi-thieu-qzaGzNMzGyO

Trong Reactjs, việc đặt tên class khá đơn giản với từ khoá className:
```
<div className="App"></div>
```

Và khi đặt tên class động dựa vào tên biến:
```
const isDangerField = true
<button className={`btn ${isDangerField ? 'btn-danger' : ''}`}>Submit</button>
```

Nhưng nếu có nhiều biến cần để tạo class thì sao:
```
const isDangerField = true
const isRoundedField = false
const isDisabled = false
```

Ta có reactElement như thế này:
```
<button className={`btn btn__summit ${isDangerField ? 'btn--danger' : ''} ${isRoundedField ? 'btn--rounder' : ''} ${isDisabled ? 'btn-disable' : ''}`}>Submit</button>
```

Khá khó đọc và rối phải không. Vậy nên classnames dependence sinh ra để giải quyết việc này:
```
    <button className={classnames(
       'btn',
       'btn__summit',
       { 'btn--danger': isDangerField },
       { 'btn--rounder': isRoundedField },
       { 'btn-disable': isDisabled }
     )}>Submit</button>
```
Việc đọc code trở nên sáng và dễ hiểu hơn khá nhiều rồi chứ. Nhưng bài viết này mình cũng không tìm hiểu nhiều về utility này. Thôi quay trở lại việc chính bài viết hôm nay mình muốn làm một ví dụ về việc tạo 1 utility để tạo BEM class cho component, bắt đầu nào.

## Demo
Prerequire: Bạn đã tạo 1 project với create-react-app và cài đặt classnames dependence.

Ở folder src, ta tạo subfolder utils nơi lưu các hàm dùng chung. Tại đây, tạo file classnames.js
```
import classNames from 'classnames'
 
export const createBEM = namespace => ({
 create: blockName => {
   let block = blockName
 
   if (typeof namespace === 'string') {
     block = `${namespace}-${blockName}`
   }
 
   return {
     b: (...more) => classNames(block, more),
     e: (className, ...more) => classNames(`${block}__${className}`, more),
     m: (className, ...more) => classNames(`${block}--${className}`, more),
   }
 },
})
 
const bemNames = createBEM('cr')
 
export default bemNames
```
Hàm createBEM trả lại 1 object trong đó có có hàm create , hàm này nhận blockName làm đối số và trả lại 1 object khác với các key là b, e, m tương ứng với block, elemen, modifier trong BEM. 
Mỗi key này khi gọi đến sẽ trả lại 1 BEM class tương ứng.
Sử dụng thử xem thế nào nhé:

Mình tạo component Content sử dụng utility bemnames  vừa tạo ở trên:
```
import React from 'react'
import classnames from 'classnames'
 
import bn from './utils/bemnames'
 
const bem = bn.create('content')
 
const Content = ({ className, ...restProps }) => {
     // Tạo block class
     const blockClasses = bem.b(className)
     // Tạo element class
     const elementClasses = bem.e(className)
     // Tạo modifier class
     const modifierClasses = bem.m(className)
     const { title } = restProps

     return <div className={classnames(blockClasses, elementClasses, modifierClasses)}>
       <h2>{title}</h2>
     </div>
}
 
export default Content
```
Và trong file App.js chỉ đơn giản truyền vào className cũng như tham title cho Content component thôi.
```
import React from 'react';
import Content from './Content'
 
function App() {
     return (
       <div className="App">
         <Content className="content" title="this is title"/>
       </div>
     );
}
 
export default App;

```

Và đây là thành quả:
![](https://images.viblo.asia/37dfe00c-69e2-47e4-80f0-1f039d8018d0.png)

## Lời kết
Bạn có thể tuỳ biến hàm createBEM của mình để tạo ra cấu trúc BEM class của riêng mình nhé.