## 1. Mở đầu
<hr>

Ở bài viết trước mình đã giới thiệu và chia sẻ cho các bạn về tác dụng cũng như cách dùng 3 `hooks` trong `ReactJS` lần lượt là `useState`, `useReducer` và `useEffect`. Trong bài viết này mình sẽ tiếp tục giới thiệu thêm về một số `hooks` khác và cả một số thư viện bên thứ 3 mình hay sử dụng cũng đã hỗ trợ  sử dụng `hooks`. Nếu bạn vẫn chưa đọc bài trước thì có thể xem tại [đây](https://viblo.asia/p/tim-hieu-ve-hooks-trong-react-Ljy5VzGG5ra)

## 2. React Hook
<hr>

### d. useMemo

Dựa vào tên gọi của `hooks` nói trên chắc các bạn cũng đoán ra được tác dụng của nó chính là dùng để ghi nhớ (hay có thể gọi là cache lại) một thứ gì đó hay nếu theo trên docs của `React` thì nó sẽ có tác dụng là **Returns a memoized value**. `useMemo` trên thực tế có thể được coi là một trong các phương pháp dùng để tối ưu ứng dụng `React` của bạn hoặc ngược lại :smile:. Nhưng trước tiên chúng ta sẽ đi vào phần tốt trước. `useMemo` khi chúng ta sử dụng sẽ có dạng như sau:
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
Về cơ bản `useMemo` sẽ nhận vào một hàm bất kì của bạn là tham số đầu tiên và tham số thứ 2 là một mảng. Nếu bạn còn nhớ ở bài trước đó thì `useEffect` cũng nhận vào một mảng như vậy. Đối với cả 2 `hooks` thì mảng này có vai trò giống hệt nhau, với `useEffect` thì nếu bất cửa giá trị nào trong mảng này bị thay đổi thì hàm thứ nhất sẽ được gọi là thì điều tương tự cũng xảy ra với `useMemo`. Với ví dụ trên trong trường hợp biến `a` hoặc `b` của chúng ta bị thay đổi thì hàm `computeExpensiveValue` sẽ được chạy lại và trả về một giá trị mới cho biến `memorizedValue`. Để rõ hơn thì chúng ta sẽ có một ví dụ ngớ ngẩn và vô nghĩa như sau
```js
const ResultCard = ({x, y}) => {

    function calculateResult() {
        let z = 0;
        while (z < 10000) {
            z++;
        }
        return x + y;
    }

    const result = useMemo(() => {
        let z = 0;
        while (z < 10000) {
            z++;
        }
        return x + y;
    }, [x, y]);

    return (
        <p>Result From Function: {calculateResult()}</p>
        <p>Result From Memorized: {result}</p>
    );
}
```
Như bạn thấy trên component của chúng ta sẽ có chức năng là nhận vào 2 props là `x` và `y` và hiển thị ra màn hình của chúng. Ở trong function `calculateResult` và `useMemo` ngoài việc trả về kết quả thì mình còn cho thêm một vòng `while` vô nghĩa để "làm tăng độ phức tạp" :D :D :D. Với cả 2 cách làm trên thì giả sử ở lần thứ nhất ta truyền vào lần lượt là các giá  trị là 1, 2 thì cả `calculateResult` và `useMemo` sẽ đều đều thực hiện phần nội dung hàm của nó bao gồm chạy một vòng `while` vô nghĩa và tính kết quả sau đó ta sẽ thu được trên màn hình kết quả là 3. Ở lần tiếp theo ta vẫn tiếp tục truyền vào 2 giá trị là 1, 2 tiếp thì lúc này kết quả mà chúng ta thu được vẫn là 3 :D. Tuy nhiên ở đây đối với hàm `calculateResult` sẽ tiến hành tính chạy lại toàn bộ nội dung bên trong nó bao gồm chạy vòng `while` sau đó mới trả về tổng `x + y`. Còn với `useMemo` thì khác, như mình đã nói ở trên, nội dung của hàm ta viết trong `useMemo` sẽ chỉ chạy lại nếu mảng gồm `[x. y]` bị thay đổi. Do ở lần thứ 2 ta tiếp tục truyền vào 2 giá trị giống lần thứ nhất nên `useMemo` sẽ trả về ngay giá trị 3 mà không cần chạy lại nội dung hàm. Điều này xảy ra vì với mỗi lần chạy thì `useMemo` sẽ "ghi nhớ" lại kết quả (giá trị) của lần chạy đó, nếu có giá trị trong dependancy array của bạn bị thay đổi thì `useMemo` mới chạy lại còn không thì nó sẽ luôn trả về giá trị ghi nhớ trước đó. Trên thực tế ta sẽ dùng hàm này nếu giá trị mà ta  dùng cần trải qua một quá trình tính toán phức tạp nào đó (đó là vì sao mình cho cái vòng while vào) thì ta có ta có thể dùng hàm này để lưu lại kết qủa và tái sử dụng lại trong trường hợp dependancy array không có thay đổi. Tuy nhiên bạn không nên lạm dụng hàm này bằng cách sử dụng nó ở mọi nơi vì nó có thể gây ra phản tác dụng là làm cho hiệu năng ứng dụng của bạn tồi tệ hơn.

### e. useCallback

Tương tự với `useMemo` thì ta có `hooks` tiếp theo là `useCallback` với tác dụng được biết đến trong docs là **Returns a memoized callback**. Bạn có thể thấy ở với `useMemo` sẽ là return **value** còn `useCallback` là **callback** vì `useMemo` ta sẽ dùng khi muốn sử dụng ngay giá trị sau khi chay qua phần code phải tính toán phức tạp còn với `useCallback` sẽ trả về cho chúng ta một function để ta có thể gọi function đó ở các hàm khác hoặc có thể gán vào event handler. Về chi tiết thì hàm `useCallback` sẽ có nội dung như sau:
```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
Sau khi này ta có thể sử dụng hàm `memoizedCallback()` giống như một function bình thường ở bất cứ đâu ta cần. Mục đích chúng ta có hàm `useCallback` là vì trong một function component như sau:
```js
const SomeComponent = ({ str }) => {

    function handleThisThing() {

    }

    function handleThatThing() {

    }
    
    function handleOtherThing() {

    }

    return (
        <Fragment>
            <p>Hihi - {str} </p>
            <button onClick={handleThisThing}>THIS</button>
            <button onClick={handleThatThing}>THAT</button>
            <button onClick={handleOtherThing}>OTHER</button>
         </Fragment>
    )
}
```
Mỗi khi thuộc tính `str` truyền vào bị thay đổi thì tất nhiên component của chúng ta sẽ bị render lại. Chính vì sự render lại này nên các function chúng ta định nghĩa lần lượt là `handleThisThing`,  `handleThatThing` và `handleOtherThing` sẽ được tạo lại cho mỗi lần `render`. Còn với nếu bạn dùng `useCallback` thì hàm này sẽ được dùng lại nếu depencancy array không thay đổi thay vì luôn luôn tại mới. Có thể đọc đến đây bạn sẽ thấy `useCallback` không có nghĩa lắm hoặc chả hiểu gì :D. Vì thế chúng ta sẽ đi vào một ví dụ cũng vô nghĩa như sau ([link](https://codesandbox.io/s/default-zvdlz)):
```js
const Child = ({ handleThis }) => {
  console.log("CHILD RE-RENDER");

  return <h2 onClick={handleThis}>CHILD</h2>;
};

const Parent = () => {
  const [counter, setCounter] = useState(0);

  console.log("PARENT RE-RENDER");

  function handleThis() {
    console.log("THIS");
  }

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <h1> Parent Counter: {counter}</h1>
      <button onClick={increment}>INCREMENT</button>
      <Child handleThis={handleThis} />
    </div>
  );
};
```
Như bạn có thể thấy ở đây chúng ta có 2 component là `Parent` và `Child`, component `Child` sẽ được sử dụng trong component `Parent` và nhận một thuộc tính được truyền vào đó là hàm `handlThis`. Còn component `Parent` sẽ có một cái biến `counter` và một button + 1 function dùng để tăng cái biến `counter` đó lên một đơn vị. Đồng thời ở đây mình cũng đã setup cho phép bạn có thể nhìn thấy mỗi lần component của chúng ta re-render sẽ `console.log` một đoạn text với cả 2 component. Bạn có thể dễ dàng nhận ra là mỗi khi ta bấm button INCREMENT
 thì biến `counter` của chúng ta sẽ tăng lên và kéo theo component `Parent` của chúng ta được render lại và kéo theo cả component `Child` được render lại. Đối với component `Child` điều này là không hợp lý vì bản thân component `Child` vẫn hiển thị ra nội dung y hệt không có gì bị thay đổi cả. Chính vì thế chúng ta sẽ tiến hành tối ưu việc re-render của component `Child` bằng cách sử dụng hàm `React.memo` nếu bạn chưa biết hàm này thì có thể đọc tại [đây](https://reactjs.org/docs/react-api.html#reactmemo). Về cơ bản thì `React.memo` sẽ có khả năng ghi nhớ lại component của chúng ta và chỉ thực hiện re-render lại khi cần thiết (khi có state thay đổi hoặc props thay đổi). Ta sẽ viết lại như sau:
```js
const Child = React.memo(({ handleThis }) => {
  console.log("CHILD RE-RENDER");

  return <h2 onClick={handleThis}>CHILD</h2>;
});

const Parent = () => {
  const [counter, setCounter] = useState(0);

  console.log("PARENT RE-RENDER");

  function handleThis() {
    console.log("THIS");
  }

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <h1> Parent Counter: {counter}</h1>
      <button onClick={increment}>INCREMENT</button>
      <Child handleThis={handleThis} />
    </div>
  );
};
```
Trong trường hợp này của chúng ta `React.memo` sẽ chỉ tiến hành re-render lại component khi mà props truyền vào là `handleThis` bị thay đổi. Bằng việc sử dụn `React.memo` ta mong muống component `Child` của chúng ta sẽ không bao bị re-render lại mỗi khi ta bấm nút INCREMENT cả. Tuy nhiên trên thực tế nếu bạn tiếp tục bấm nút INCREMENT ở component `Parent` sẽ thấy cả hai vẫn bị re-render lại như trước kia và hàm `React.memo` không hoạt động như ta mong đợi. Điều này xảy ra là do thực tế mỗi lần component `Parent` của chúng ta re-render thì nó sẽ tạo ra một function `handleThis` mới và truyền vào cho component `Child`, vì vậy `React.memo` sẽ luôn coi đây là thay đổi props và sẽ render lại component `Child`. Bạn có thể kiểm chứng tại [đây](https://codesandbox.io/s/withmemo-ox4nm).  Đây chính là lúc mà `useCallback` phát huy tác dụng, ta sẽ đưa `useCallback` vào cuộc chơi bằng cách sửa lại code như sau:
```js
const Child = React.memo(({ handleThis }) => {
  console.log("CHILD RE-RENDER");

  return <h2 onClick={handleThis}>CHILD</h2>;
});

const Parent = () => {
  const [counter, setCounter] = useState(0);

  console.log("PARENT RE-RENDER");

  const handleThis = useCallback(() => {
      console.log("THIS");
 }, []);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <h1> Parent Counter: {counter}</h1>
      <button onClick={increment}>INCREMENT</button>
      <Child handleThis={handleThis} />
    </div>
  );
};
```
Với việc sử dụng `useCallback` thì funciton  `handleThis` của chúng ta sẽ không bị tạo lại nữa mà sẽ được "ghi nhớ" lại để mỗi lần re-render lại component `Parent` sẽ đem ra sử dùng luôn hay đem ra truyền cho component `Child` thay vì sử dụng lại. Chính vì thế lúc này component `Child` của bạn sẽ đồng thời không còn bị re-render lại nữa. Tất nhiên bạn cũng có thể kiểm nghiệm lại tại [đây](https://codesandbox.io/s/withcallback-5k4mh). Tuy nhiên mình lại muốn nhắc lại với các bạn một lần nữa là không nên dùng `useCallback` ở mọi nơi mà hãy thực hiện các biện pháp đo lường để biết được ứng dụng của bạn đang gặp vấn đề hiệu năng ở chỗ nào trước khi quyết định sử dụng `useCallback` hay bất cứ function nào khác. Vì bất cữ biện pháp tối ưu hóa nào bạn đưa ra hay sử dụng sẽ đi kèm một tác dụng phụ nhất định nên bạn cần cân đo đong đếm về tác dụng và tác hại của mỗi biện pháp.

## 3. Kết bài
<hr>

Bài viết của mình đến đây là kết thúc, nếu các bạn có phần nào đọc không hiểu có thể comment ngay ở phía dưới mình sẽ hỗ trợ việc giải đáp hoặc nếu có phần nào mình viết không đúng thì cũng hay chia sẽ xuống phía dưới để mình có thể kịp thời cập nhật lại. Cám ơn các bạn đã đọc bài viết và đừng quên đề lại 1 upvote nhé :D.