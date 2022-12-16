Refs được dùng để truy cập các DOM nodes hoặc các React elements được tạo ra khi render components.

Refs là viết tắt của từ reference, có nghĩa là 1 cách can thiệp (nôm na là như vậy).

Khi chúng ta render componet, muốn thay đổi các thuộc tính thì thường bằng cách thông qua props hooặc state.

```
const SomeFucntionConponent: React.FC<Props> = (props) => {
  const [someVariable, setSomeVariable] = useState(defaultValue);

  ...

    return (
      <ChildComponent someValue={someValue}>
      </ChildComponent>
    )
}
```

Có nghĩa là muốn thay đổi gì đó ở ChildCompoennt thì ta phải tạo 1 biến rồi truyền vào hoặc tạo 1 hook để giữ giá trị rồi tuyền vào nơi cần render.

Tuy nhiên chúng ta có thể thông qua Ref để làm điều này .

Ta có 2 cách để khởi tạo 1 biến giữ ref trong react:

```
const someRef = React.createRef();


const someRef = useRef();
```

Khi render ta gán biến này là xong 


```
render (
  ...
  <div ref={ref => { someRef = ref }>
  </div>
)
```

Lúc này somefRef đã được refer đên 1 DOM node hay 1 DOM element (của div vừa được render ra) và ta có thể thao tác, thay đổi bằng cách gán trực tiếp các tham số, ví dụ:


```
someRef.getBoundingClientRect().width = 100
```

Cơ bản cách sử dụng ref chỉ có vậy.

Vậy ref refer đến cái gì? Trong ví dụ phía trên đoạn code này `<div ref={ref => { someRef = ref }>` ta đã pass 1 function và thẻ `<div>` khi render function này sẽ được gọi đến cùng tham số là React component instance hoặc  HTML DOM element

Đối với React component instance, bạn hoàn toàn có thế gọi trực tiếp các hàm bên trong component đó, ví dụ:

```
const SomeFucntionConponent: React.FC<Props> = (props) => {
  const someRef = useRef();

  ...

  return (
    <>
      <ChildComponent ref={someRef}>
      </ChildComponent>
      <div onClick={() => someRef && someRef.someFunction()}/>
    </>
   )
}
```

trong dó someFunction được định nghĩa trong ChildComponent.

Trường hợp thứ 2 là HTML DOM element, ta cùng nói về DOM nodes và DOM element:

ví dụ về DOM nodes , giả sử ta có đoạn html 

```
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <!-- Page Body -->
    <h2>My Page</h2>
    <p id="content">Thank you for visiting my web page!</p>
  </body>
</html>
```

Tương ứng với nó là 1 DOM nodes như sau:

![](https://images.viblo.asia/ad22197d-100a-41ba-b3c4-32dcc7b76d13.png)

Còn đối với DOM element thì ta sẽ không thấy các element giữ các đối tượng là text vì đơn giản chúng là những thẻ tag `<div>`, `<h2>` ...
    
Chúng ta có thể thấy rõ sự khác biệt hơn với ví dụ sau:
    
```
  const paragraph = document.querySelector('p');

  paragraph.childNodes; // NodeList:       [HTMLElement, Text]
  paragraph.children;   // HTMLCollection: [HTMLElement]
```

Bạn có thể dựa vào Node Type để phân biện dạng node, có những loại type sau:
    
```
  Node.ELEMENT_NODE
  Node.ATTRIBUTE_NODE
  Node.TEXT_NODE
  Node.CDATA_SECTION_NODE
  Node.PROCESSING_INSTRUCTION_NODE
  Node.COMMENT_NODE
  Node.DOCUMENT_NODE
  Node.DOCUMENT_TYPE_NODE
  Node.DOCUMENT_FRAGMENT_NODE
  Node.NOTATION_NODE
```
 
Trong ví dụ trên `paragraph.children` sẽ lấy các node có type là `Node.ELEMENT_NODE`, do vậy text (có type là Node.TEXT_NODE) không có trong list
     
Cảm ơn và hi vọng bài viết có ích trong công việc của bạn
    
Bài viết được tổng hợp từ nguồn từ nguồn:
- https://dmitripavlutin.com/dom-node-element/
- https://reactjs.org/docs/refs-and-the-dom.html
- https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html