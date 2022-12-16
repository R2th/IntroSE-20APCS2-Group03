# `Improve perfomance với useCallback - liệu có đáng?`
Ở bài trước, mình có giới thiệu về các cách sử dụng cơ bản với React Hook. Qua một thời gian trải nghiệm, mình thấy React hook render nhiều hơn mình tưởng. React cũng thấy những điều như vậy, vậy nên ở bài này, mình sẽ tập trung nhiều hơn vào cách cải thiện performance cho nó. 
Lý do hầu hết khi làm cho app chậm chính là các render không cần thiết. Giờ hãy cùng mình tìm hiểu cách xử lý cho chung nào
![](https://images.viblo.asia/3b9b3cd5-5376-4f5f-aa41-57dc9d46e045.png)
## Bài toán
Tạo trang tin nhắn
```js
const List = ({ messages, like }) => (
  <ul>
    {messages.map(message => (
      <li key={message.id} onClick={() => like(message.id)}>
        {message.id} - {message.text}
      </li>
    ))}
  </ul>
);

function App() {
  const onLikeMessage = id => {
    console.log("You like message id:", id);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <List messages={messages} like={onLikeMessage} />
    </div>
  );
}
```
Bạn dễ thấy, ta truyền xuống function `onLikeMessage` để component `List` nhận và callback lên khi cần thiết . Đây là bài toán thường gặp phải. Điều này sẽ thực sự quan trọng khi bạn quan tâm đến số lượng render không cần thiết. Giả dụ mỗi khi một message nào đó được thay đổi khiến cho List được gọi render lại, tương ứng số lượng function trên sẽ được tạo ra. Hay nếu chứa những props khác, thì việc thay đổi này cũng gây ra render lại.

Vậy thì ta sẽ làm cách nào, may mắn thay React support ta hàm useCallback giúp ngăn chặn việc khởi tạo lại function không cần thiết. Lúc này ta có thể viết

```js
function App() {
  const onLikeMessage = useCallback(id => {
    console.log("You like message id:", id);
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <List messages={messages} like={onLikeMessage} />
    </div>
  );
}
```

## Cùng thử kiểm chứng tác dụng nào
Với cách như vậy, `onLikeMessage` sẽ không bị rerender lại mỗi khi `App` thay đổi nữa. Để kiểm chức ta làm như thế nào?
```js
const stack = []
const stack2 = []
function App() {
  const onLikeMessage = id => {
    console.log("You like message id:", id);
  };
  
  const onLikeMessageWithUseCallback = useCallback(id => {
    console.log("You like message id:", id);
  }, []);
  
  stack.push(onLikeMessage)
  stack2.push(onLikeMessageWithUseCallback)
  ...
}
```
Như vậy mỗi lần render, stack sẽ được add thêm 1 tham chiếu đến function `onLikeMessage` trên, kiểm tra lại:
```js
stack[0] === stack[1] -> false
stack2[0] === stack2[1] -> true
```
Như vậy useCallback thực sự đã làm giảm số lần function được tạo ra rồi đó các bạn.

## Liệu useCallback có hiệu quả như tưởng tượng?
Ta thử đếm số allocation cần dùng nhé. 
```js
Một nè
id => {
  console.log("You like message id:", id);
}
Hai nè
[]
Ba nè
useCallback(...)
```
Như vậy số lượng mem cần thiết để cho hàm này từ 1 function đã cần đến thêm 1 object, thêm 1 return kết quả từ hàm `useCallback` nữa. Hiệu năng chưa thấy đâu nhưng bộ nhớ chắc chắc là tốn hơn rồi. Vì bản chất đây chính là các memorize mà
Thay vì cách phức tạp rườm ra trên, đơn giản bạn chỉ cần vứt function ra bên ngoài. Phải không nào?
```js
const onLikeMessage = id => {
  console.log("You like message id:", id);
};
function App() {
  ...
}
  ```
  

  Tuy nhiên, nếu những function mà cần dùng đến props trong App nữa, thì điều này quả là chỉ có useCallback mới giải quyết được mà thôi.
  ## Conclusion
  Qua một số thử nghiệm trên, mình có thể thấy rằng tùy vào trường hợp mà nên có nhưng phương án xử lý thích hợp. Sáng tạo thì đó mới là cách bạn tạo nên sức mạnh của bản thân.
 ##  `References`
1. https://reactjs.org/docs/hooks-reference.html#usecallback
2. https://kentcdodds.com/blog/usememo-and-usecallback