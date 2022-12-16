Chào các bạn, hôm nay mình sẽ giới thiệu một tip nhỏ khi làm việc với **ReactJS**, trong bài viết này mình sử dụng **styled-components** các bạn nên tìm hiểu một chút về nó trước khi đọc bài viết này nhé.
Chắc các bạn khi làm việc với jQuery có lẽ từng phải làm một yêu cầu như: tạo một cái **dropdown list** mà khi ta click chuột ra khỏi dropdown đó thì nó đóng lại. 

Với JQuery và CSS bạn có thể hoàn thành rất dễ dàng, nhưng với **ReactJS** thì sao? 
Mình sẽ hướng dẫn các bạn thực hiện việc này với một ví dụ đơn giản nhất, còn bạn hãy thử áp dụng với việc làm một cái dropdown list nhé.

![](https://images.viblo.asia/846cb7c9-3321-496b-adac-ae66852ea9e4.gif)

## Yêu cầu
![](https://images.viblo.asia/ae67d764-7ede-4f94-b69a-8f1fbb9fc36b.gif)

Khi nhấn chuột vào **button** kia thì thẻ **div** sẽ dịch chuyển sang phải **200px**, sau đó nhấn chuột vùng bên ngoài thì thẻ **div** quay về vị trí cũ. Bắt tay vào làm thôi.
## Cấu trúc

Đây là cấu trúc thư mục của mình, chỉ bao gồm 3 thành phần chính, **App** để quản lý **state** điều khiển việc duy chuyển của **Box**, còn **Button** chịu trác nhiệm cho việc thực hiện hành động đó.

![](https://images.viblo.asia/b2746035-5f59-4d84-ba75-9561a5275572.png)
## Phân tích
 1. ### App

    Theo yêu cầu trên thì khi click vào **Button** thì **Box** sẽ di chuyển, vì thế ta cần một nơi để quản lý **state** chung cho toàn bộ yêu cầu để kiểm soát sự di chuyển đó, đấy chính là **App**.
    ```js
      import React, {useState} from "react";
      //....
      //Some thing
      const [left, setLeft] = useState(false);//state và action
    ```
    left là **state** lưu trữ giá trị **boolean**, **setLeft** là action có nhiệm vụ thay đổi state cho **App**, ta sẽ truyển **state** và **action** cho các component con theo cách sau ( nhớ import trước nhé). Tìm hiểu thêm về **useState**  [tại đây](https://reactjs.org/docs/hooks-state.html).
    ```js
    return (
      <div className="App">
        <Button handleClick={setLeft}/>
        <Box left={left} handleClick={setLeft} />
      </div>
    );
    ```
2. ### Button
    Component **Box** sẽ nhận 1 **props** là **handleClick** được truyền từ component **App** xuống, mà khi nhấn chuột vào button, state **left** sẽ thay đổi từ **false** sang **true**.
    ```js
    import React from "react";
    import styled from "styled-components";

   const Button = ({handleClick}) => {
   const ButtonStyling = styled.button`
      margin-bottom: 10px;
      width: 83px;
      height: 37px;
      // Thêm một chút style ở đây
      }
    `;

     return <ButtonStyling onClick={() => handleClick(true)}>Click</ButtonStyling>;
   };
   
   export default Button;
   ```
 


  

3. ### Box
    Là một component quan trọng nhất, nên mình sẽ giải thích chi tiết nhất có thể.
    ```js
    import React, { useEffect, useRef } from "react";
   import styled from "styled-components";

    const Box = ({ left, handleClick }) => {
     const box = useRef();
     const BoxStyling = styled.div`
      position: relative;
      left: ${() => (left ? "200px" : 0)};
    `;
     // 
    //...
     return <BoxStyling ref={box}/>;
   };
    ```
    Import **useEffect**, **useRef** (đây là 2  [**Hooks**](https://reactjs.org/docs/hooks-intro.html) của **ReactJS**), gán biến **box** bằng **useRef** là một **refs** để trỏ đến chính nó.
    ```js
    const moveDiv = e => {
      //Nếu click vào chính Box thì không làm gì cả và return kết thúc hàm
     if (box.current.contains(e.target)) return;
     //Ngược lại thì thực hiện việc thay đổi state
     handleClick(false);
    };
   ```
   Khai báo **moveDiv** là một **arrow function**, có chức năng kiểm tra xem người dùng nhấp chuột vào vùng nào của ứng dụng.
   Quay lại phía trên, bạn có thấy đoạn code này không?
   ```js
     position: relative;
     left: ${() => (left ? "200px" : 0)};
   ```
   Mục đích là khi **state** được truyền xuống theo dạng **props**, nếu như state **left** là **true**, thì giá trị **css left** sẽ là **200px**.
   Tuy nhiên chừng đấy vẫn chưa đủ, ứng dụng sẽ không hoạt động như mong muốn, mình cần một **side-effect** cho component sau khi nó được **render**. Đây là lúc **useEffect** được sử dụng.
   ```js
    useEffect(() => {
      document.addEventListener("mousedown", moveDiv);
      return () => {
       document.removeEventListener("mousedown", moveDiv);
    };
   }, []);
   ```
   **useEffect** sẽ được gọi sau khi component được **render**, **[ ]** là một **dependency**(giá trị phụ thuộc) khi nó rỗng thì **useEffect** chỉ gọi 1 lần duy nhất.
   Khi được gọi **useEffect** sẽ gắn một **event** là **mousedown** vào **DOM**, giúp **trigger** nhấp chuột của người dùng.
  
      Còn cái **return** kia là sao? Đó gọi là **cleanup**, sẽ trả về một **function** có nhiệm vụ gỡ bõ **event** mà lúc nãy chúng ta đã gắn vào **DOM**.
   Cuối cùng, gắn **ref** cho component và demo thôi.
   ```js
   return <BoxStyling ref={box}/>;
   ```
    Hầy, vì mình không thể gắn **Embed** của **Codesanbox** vào được, nên mọi người xem demo ở [đây](https://codesandbox.io/s/angry-sun-93d1b) nhé.

## Còn nữa
Hmmm, đôi khi ứng dụng của bạn cần sử dụng việc này nhiều lần mà bạn lại ngại khai báo lại các **function**, các **useEffect** thì làm sao đây. Bắt tay vào tạo một **custom hook** cho riêng mình thôi.
```js
//UseOnClickOutside.js**
import React, {useEffect} from 'react';

const UseOnClickOutside = (ref, handler) => {
  useEffect(() => {
   const listener = event => {
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    handler(event);
   };
   document.addEventListener('mousedown', listener);

   return () => {
    document.removeEventListener('mousedown', listener);
   };
  },
  [ref, handler],);
};

export default UseOnClickOutside;

//Sử dụng App.js**
import UseOnClickOutside from "./UseOnClickOutside";
//......
UseOnClickOutside(box, () => setLeft(false))

```

Bài viết của mình đến đây là hết, hy vọng sẽ giúp ích cho các bạn trong một số trường hợp. Tham khảo [Css tricks](https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/)