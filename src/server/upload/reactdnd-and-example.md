Việc kéo thả một item trên trang web rất phổ biến, tuy nhìn việc kéo thả có vẻ đơn giản nhưng việc để làm được ra các action như vậy không phải một hai dòng là xong cần một chút logic nhất định và vài kiến thức cơ bản về dom và trình duyệt. Việc react phân chia thành các component mà và việc react dùng dom ảo cũng như vậy, chúng ta cũng có viết chúng dựa trên dom ảo hoặc thư viện. Bài viết hôm nay mình sẽ nói về ReactDnD một thư viện khá phổ biến, ví dụ : Trello Storify... cũng đang sử dụng thư viện này. <br>
Thật sự phần document của reactDnD rất khó hiểu ,nên mình sẽ viết bài này thông qua các ví dụ và giải thích chức năng.


Cùng xem ví này nhé ! 
![alt](https://images.viblo.asia/9ca432ee-6dbb-425d-a575-885187fecbe0.gif)
Có 3 componet chính Dustbin, Box, Example và mình sử dụng React Hook, ở bài tiếp theo mình sẽ hướng dẫn sử dụng class component

![](https://images.viblo.asia/2cc7f88b-8533-4c88-b3f8-25680880bd6f.png)

**Box**: Vật được kéo (drag)<br>
**Dustbin**: Nơi chứa (drog)<br>
**Example**: Nơi chưa 2 component trên<br>

À trước khi vào ví dụ các bạn cài reactDnD vào nhé
> npm i react-dnd

### 1. Example
```js
import React from 'react'
import Dustbin from './Dustbin'
import Box from './Box'
export default function Container() {
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Dustbin />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Box name="Glass" />
        <Box name="Banana" />
        <Box name="Paper" />
      </div>
    </div>
  )
}
```
Mỗi box sẽ chứa một giá trị truyền từ prop vào, chúng ta có 3 component box với 3 name khác nhau
### 2. Box
```js
import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./ItemTypes";
const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left"
};
const Box = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: ItemTypes.BOX },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log(dropResult);
      if (item && dropResult) {
        alert(
          `You dropped ${item.name} into ${dropResult.name}! with ${item.type}`
        );
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {name}
    </div>
  );
};
export default Box;
```
Giờ mình giải thích từng dòng code cho các bạn.
![](https://images.viblo.asia/62f6c29f-6417-4540-b1b1-010ef7785bd1.png)

Cũng như useState(), useRef() .... useDrag() cũng có 2 tham số truyền vào. Tham số thứ nhất {isDragging,...} bao gồm các biến lấy ra các giá trị trong quá trình kéo (drag) như trạng thái kéo, kết thúc chưa, hover...,Tham số thứ hai là reference đến đối tượng kéo.<br>
Tiếp theo là 3 API setting cho useDrag:

![](https://images.viblo.asia/cc2a827d-752a-460b-b403-f1afd2e5dc85.png)
#### 1. item
Thuộc tính này bắt buộc phải có ở mỗi useDrag, nó là thuộc tính bao gồm giá trị kéo (**name**) và  **type**, vể giá trị thì đơn giản rồi, còn type chính là mục tiêu mà người dùng muốn thả ví dụ bạn muốn gửi bưu kiện thì cần có địa chỉ type cũng giống như vậy là một địa chỉ type này là một **String**.
#### 2. end
Khi bạn kết thúc việc kéo thì sự kiện này sẽ được gọi tức là nó là một function. Trong ví dụ trên function có thể truyển vào 2 thuộc tính đó là item và monitor. Về item thì nó chính là thuộc tính mình vừa nói phía trên, còn monitor hơi đặc biệt. Việc kéo thả có nhiều trạng thái khác nhau khi click, lúc giữ chuột , thi thả chuyện hay khi di chuyển item lúc đó monitor sẽ quản lý việc này và cho ta biết nó đang ở trạng thái nào.Ở đây<br>
> **monitor.getDropResult()** sẽ trả về đối tượng đến nơi được thả vào cụ thể là  API **drop()** ở component Dustbin, cụ thể nữa nó nằm ở đây

![](https://images.viblo.asia/03b80468-cf0c-48c6-99a8-69809028f3c0.png)
#### 3. collect:
Là một bộ các function, nó sẽ trả về đối tượng hoặc trạng thái và được sử dụng bên trong component. Ví dụ những trường hợp kéo không thành công, đang kéo, hover... Trong ví dụ này thì<br>
> **monitor.isDragging()**   có nghĩa là bạn nếu bạn đang trong trạng thái kéo thì trả về **true**, chưa nhả chuột hoặc chưa tác động nó defaulf nhận giá trị **false**

![](https://images.viblo.asia/2f20f05c-5d2d-4625-a807-16063d3471f0.png)
Những bài sau mình sẽ giới thiệu các function monitor khác
### 3. Dustbin
```js
import React from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left"
};
const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ name: "Dustbin" }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {isActive ? "Release to drop" : "Drag a box here"}
    </div>
  );
};
export default Dustbin;
```

Đối với Drop nơi đón nhận sự kiện từ drag cũng vậy , nó cũng có các tham số truyền vào và ref sử dụng bằng hook **useDrop ()**.

![](https://images.viblo.asia/67a73a69-8613-4df9-b256-fc84075f4cfc.png)
Và nó cũng có các API seting cho hoạt động kéo thả.
#### 1. accept
Bên Drop cũng có một thuộc tính bắt buộc đó là accept nó nhận giá trị chuỗi. nêú bên Box (drag) phía trên có type để xác định địa chỉ gửi đi thì bên này cũng cần công khai địa chỉ của mình khớp với địa chỉ của Box.
#### 2. drop
Khai báo bởi một function khi mà vật thể rơi trúng mục tiêu là Dustbin thì function sẽ được chạy, giá trị trả về sẽ được monitor lưu lại để thể hiện đã kéo tới như demo.
#### 3. collect
Bên Drop này cũng có collect như Drag, nhưng ở mỗi bên Drop có tham số monitor truyền vào khác với drag. <br> 
> **monitor.isOver()** trả về fasle nếu vật thể nằm ngoài vùng thả và true thì ngược lại. <br> 


> **monitor.canDrop()** trả về true nếu đang trong quá trình kéo hoặc kéo vào đúng vùng thả , và fasle nếu chưa tác động hoặc kết thúc sự  thả mà không trúng mục tiêu.

Còn rất nhiều function monitor khác ở bài sau mình sẽ nói tiếp.

### 4. Tóm lại 
| API setting             | Drag       | Drop      |  
|:---------------------|:--------------:| :-------------:|
| Địa chỉ |item |accept|  
|after action |end| drop |
| collect | monitor.isDragging() | monitor.isOver() <br> monitor.canDrop()|

Đó là những gì bạn cần biết trong ví dụ này, ở ví dụ sau mình sẽ giới thiệu thêm. Cảm ơn các bạn đã quan tâm bài viết của mình