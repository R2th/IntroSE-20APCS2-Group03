![](https://images.viblo.asia/3562dbb2-6551-405b-8818-607c2ced80e8.png)

Cách tốt nhất để bắt đầu với React hook là học cách sử dụng chúng như thế nào.

Nhưng nếu bạn gặp phải tình huống mà bạn không thể hiểu tại sao chúng lại hoạt động khác với những gì bạn mong đợi. Hiểu biết về cách sử dụng React hook là không đủ, bạn cần biết cả những phần cần lưu ý, không nên sử dụng của chúng.

Trong bài này, chúng ta cùng tìm hiểu một số lưu ý thông qua các ví dụ về sai lầm khi sử dụng React hook, và cách khắc phục chúng nhé.
# 1. Không thay đổi thứ tự gọi của các hook trong các lần render
Giờ hãy cùng check component `FetchGame` có nhiệm vụ lấy thông tin game qua id.

```js

function FetchGame({ id }) {
  if (!id) {
    return 'Please select a game to fetch';
  }

  const [game, setGame] = useState({ 
    name: '',
    description: '' 
  });

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(`/api/game/${id}`);
      const fetchedGame = await response.json();
      setGame(fetchedGame);
    };
    fetchGame();
  }, [id]);

  return (
    <div>
      <div>Name: {game.name}</div>
      <div>Description: {game.description}</div>
    </div>
  );
}
```

Component `FetchGame`  nhận vào prop `id`  (id của game sẽ được lấy data), hook `useEffect()` sẽ lấy thông tin game `await fetch(`/game/${id}`)` và lưu nó vào state với biến `game`

Mở [demo](https://codesandbox.io/s/hooks-order-warning-rdxpg?file=/pages/index.js) và load thử một vài game. 
Component sẽ thực hiện fetch, và cập nhật state với data được fetch, mọi thứ có vẻ khá trơn tru. Nhưng không, hãy để ý đến Problems tab, bạn sẽ thấy Eslint cảnh báo về thứ tự hook không chính xác.

![](https://images.viblo.asia/fc170ed2-a884-497a-b6d8-7321d5e16b47.png)

Vấn đề này xảy ra vì có một return sớm:

```js
function FetchGame({ id }) {
  if (!id) {
    return 'Please select a game to fetch';
  }
  
   // ...
}
```

Khi id là rỗng, component sẽ  ngay lập tức render `'Please select a game to fetch' and exits. No hooks are invoked.`, không chạy qua bất cứ hook nào.
Nhưng nếu id không rỗng (ví dụ bằng '1'), các hook `useState()` và `useEffect()` sẽ được gọi.

Việc các hook thực thi với điều kiện có thể dẫn đến những lỗi không mong muốn, khó để debug. Cách React hook hoạt động yêu cầu component phải luôn luôn gọi hook với cùng thứ tự giữa các lần rendering.

Đó chính xác là một đề xuất trong [rule đầu tiên của hook](https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level): 
> *Don’t call Hooks inside loops, conditions, or nested functions.*


Chúng ta sẽ giải quyết việc thứ tự của hook không chính xác bằng cách chuyển các câu lệnh `return` và phần kiểm tra điều kiện vào trong các hook

```js

function FetchGame({ id }) {
  const [game, setGame] = useState({ 
    name: '',
    description: '' 
  });

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(`/api/game/${id}`);
      const fetchedGame = await response.json();
      setGame(fetchedGame);
    };
    if (id) { 
      fetchGame(); 
    }
  }, [id]);

  if (!id) {
    return 'Please select a game to fetch';
  }

  return (
    <div>
      <div>Name: {game.name}</div>
      <div>Description: {game.description}</div>
    </div>
  );
}
```

Và bây giờ không quan trọng là id rỗng hay không, `useState()` và `useEffect()` sẽ luôn luôn được gọi cùng thứ tự trong các lần render.

Một rule chung để bạn không bị mắc sai lầm ở rule này là hãy để các hook ở phần đầu tiên của nội dung component. Để chắc chắn hơn nữa, bạn nên cài `eslint-plugin-react-hooks` cho ứng dụng của mình, nó sẽ giúp bạn đảm bảo thứ tự thực hiện của các hook.

# 2. Không sử dụng state cũ
Component `MyIncreaser` dưới đây tăng biến `count` trong state mỗi khi button được click.
```js
function MyIncreaser() {
  const [count, setCount] = useState(0);

  const increase = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleClick = () {
    increase();
    increase();
    increase();
  };

  return (
    <>
      <button onClick={handleClick}>Increase</button>
      <div>Counter: {count}</div>
    </>
  );
}
```
Phần thú vị ở đây là `handleClick` được gọi làm state update 3 lần.

Trước khi mở demo, hãy làm một trắc nghiệm nho nhỏ. Nếu bạn click và button 1 lần, liệu `count` có được tăng lên bằng 3?

Ok, nhớ trả lời trước khi đọc tiếp nhé. Hãy mở [demo](https://codesandbox.io/s/stale-variable-jo32q?file=/src/index.js) và click vào button `Increase` một lần.

Bạn có thấy bất ngờ không, mặc dù `increase` được gọi 3 lần bên trong `handleClick()`, nhưng `count` chỉ tăng lên 1 lần. Hm.......

Vấn đề xảy ra trong `setCount(count + 1)` . Khi button được click, React gọi `setCount(count + 1)` 3 lần:

```js
  const handleClick = () {
    increase();
    increase();
    increase();
  };

//  giống như:

  const handleClick = () {
    setCount(count + 1);
    // biến count hiện tại đã cũ
    setCount(count + 1);
    setCount(count + 1);
  };
```
Lần đầu tiên được gọi của `setCount(count + 1)` update chính xác `count + 1 = 0 + 1 = 1`. Tuy nhiên, 2 lần gọi tiếp theo của `setCount(count + 1)` cũng set biến `count` thành 1 vì nó sử dụng state cũ (count = 0).

Vấn đề state cũ sẽ được giải quyết bằng cách update state theo cách functional. Thay vì sử dụng `setCount(count + 1)`, chúng ta sẽ sử dụng ` setCount(count => count + 1)`:

```js
function MyIncreaser() {
  const [count, setCount] = useState(0);

  const increase = useCallback(() => {
    setCount(count => count + 1);
  }, []);

  const handleClick = () {
    increase();
    increase();
    increase();
  };

  return (
    <>
      <button onClick={handleClick}>Increase</button>
      <div>Counter: {count}</div>
    </>
  );
}
```

Bằng việc sử dụng `count => count + 1`, React giúp bạn có được giá trị cuối cùng của state.

Hãy mở phần [demo được fix](https://codesandbox.io/s/stale-variable-fixed-3j0p8?file=/src/index.js). Giờ  click vào button Increase, biến `count` sẽ được update = 3 đúng như mong đợi.
Đây là rule để có thể tránh được xung đột với các biến state cũ.

> Nếu bạn cần sử dụng state cũ để tính toán state tiếp theo, hãy luôn luôn sử dụng cách functional để update state `setValue(prevValue => prevValue + someResult).`

# 3.  Không tạo closure cũ

React hooks chủ yếu dựa vào khái niệm clousure. Nếu chưa hiểu về closure, bạn có thể vào [đây](https://codeaholicguy.com/2015/12/31/javascript-closures/) để đọc thêm nhé.

Khi sử dụng hook chấp nhận callback làm đối số (như `useEffect (callback, deps)`, `useCallback (callback, deps))`, bạn có thể tạo một closure cũ - một closure đã bắt các biến state hoặc props lỗi thời.

Hãy xem trường hợp một closure cũ được tạo khi sử dụng hook `useEffect (callback, deps)` và không thiết lập giá trị phụ thuộc cho hook. Bên trong component` <WatchCount>`, hook `useEffect ()` ghi lại giá trị của `count` sau mỗi 2 giây:
    
```js
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
  }, []);

  const handleClick = () => setCount(count => count + 1);

  return (
    <>
      <button onClick={handleClick}>Increase</button>
      <div>Counter: {count}</div>
    </>
  );
}
```
 Mở [demo](https://codesandbox.io/s/stale-closure-tmcpd?file=/src/index.js) và click vào button `Increase` . Sau đó check trên console, cứ 2 giây sẽ xuất hiện `Count is 0` - không có thay đổi gì với giá trị hiện tại của biến `count`.

Tại sao lại như vậy ?

Tại lần render đầu tiên, closure đã bắt được biến `count = 0`.
Sau đó, khi button được click và count tăng lên, `setInterval` vẫn được gọi với closure cũ , nó nhận vào `count = 0` từ lần render đầu tiên, `log` là một closure cũ vì nó bắt một biến cũ `count`.

Giải pháp ở đây là để `useEffect()` sẽ dùng closure `log` phụ thuộc vào `count` và reset timer khi `count` thay đổi.

```js

function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    const id = setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
    return () => clearInterval(id);
  }, [count]);

  const handleClick = () => setCount(count => count + 1);

  return (
    <>
      <button onClick={handleClick}>Increase</button>
      <div>Counter: {count}</div>
    </>
  );
}
```
Với các thành phần phụ thuộc được đặt đúng, `useEffect ()` cập nhật closure trong `setInterval () `ngay khi `count` thay đổi. 
    
Mở bản [demo đã được fix](https://codesandbox.io/s/stale-closure-fixed-rrfc2?file=/src/index.js)  và click vào Increase vài lần. Console sẽ log ra giá trị của `count`. 
Để ngăn việc closure sẽ nắm bắt các giá trị cũ:
> Luôn đảm bảo rằng bất kỳ giá trị state hoặc prop nào được sử dụng bên trong callback của hook đều được chỉ định là phụ thuộc. 
    
eslint-plugin-react-hooks có thể giúp bạn luôn nhớ thiết lập đúng các phụ thuộc hook.

# 4. Đừng sử dụng state cho các data hạ tầng (infrastructure data)

Ở bài toán lần này, chúng ta cần gọi side effect khi state được update, nhưng sẽ không gọi nó với lần render đầu tiên. `useEffect(callback, deps)` luôn luôn gọi callback sau khi component mounting và chúng ta đang muốn tránh nó.

Giải pháp đầu tiên bạn có thể nghĩ ra có thể là:

```js
function MyComponent() {
  const [isFirst, setIsFirst] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      return;
    }
    console.log('The counter increased!');
  }, [count]);

  return (
    <button onClick={() => setCount(count => count + 1)}>
      Increase
    </button>
  );
}
```
Biến state `isFirst` lưu giữ thông tin về lần render đầu tiên của component. Việc lưu giữ thông tin như vậy trong state là một lỗi cần tránh vì ngay sau khi bạn update `setIsFirst(false)`, lần re-render khác sẽ diễn ra mà không có lý do gì cả.

Sẽ có ý nghĩa để giữ `count` như một state nếu thông tin `count` được hiển thị. Tuy nhiên, `isFirst` ở đây không được sử dụng để tính trực tiếp đầu ra.

Thông tin về lần đầu render không nên được lưu trong state. Data hạ tầng, như chi tiết về vòng đời rendering (như lần đầu render, số lượng render), định danh của timer (`setTimeout(),` `setInterval()`), các tham chiếu trực tiếp đến các phần tử DOM, etc. nên được lưu trữ và cập nhật bằng cách sử dụng  `useRef()` để tránh việc render.

Hãy lưu thông tin về lần đầu render vào một reference:
```js
function MyComponent() {
  const isFirstRef = useRef(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return;
    }
    console.log('The counter increased!');
  }, [count]);

  return (
    <button onClick={() => setCounter(count => count + 1)}>
      Increase
    </button>
  );
}
```
`isFirstRef` là một reference nắm giữ thông tin về lần đầu render của component. `isFirstRef.current` thuộc tính được sử dụng để truy cập và update giá trị của reference.

Và quan trọng nhất là việc update reference `isFirstRef.current = false` sẽ không làm re-rendering

# 5. Đừng quên clean side-effect
Nhiều side-effect, như tạo fetch request hoặc sử dụng timer như `setTimeout()`, là bất động bộ.
Đừng quên dọn dẹp chúng khi component unmount hoặc khi nó không cần đến kết quả của side-effect nữa.

Ví dụ, nếu bạn đã khởi tạo một timer, hãy chắc chắn rằng đã dừng timer đó khi component unmount.
Component dưới đây có button `Start increasing`. Khi button được click, counter được tăng lên 1 với mỗi giây.
```js
function DelayedIncreaser() {
  const [count, setCount] = useState(0);
  const [increase, setShouldIncrease] = useState(false);

  useEffect(() => {
    if (increase) {
      setInterval(() => {
        setCount(count => count + 1)
      }, 1000);
    }
  }, [increase]);

  return (
    <>
      <button onClick={() => setShouldIncrease(true)}>
        Start increasing
      </button>
      <div>Count: {count}</div>
    </>
  );
}
```
Mở [demo](https://codesandbox.io/s/unmounted-state-update-n1d3u?file=/src/index.js), và click vào button `Start increasing`. Như mong đợi, biến `count` sẽ tăng lên mỗi giây.

Trong khi phần tăng counter đang được thực hiện, click vào `Unmount Increase` button để unmount component. React sẽ cảnh báo trên console rằng bạn đang update state trong khi component đã được unmount.

![](https://images.viblo.asia/d52631a8-30dc-440c-8a38-6db173321b7b.png)

Để sửa nó thì khá đơn giản, chỉ cần trả về cleanup function từ callback của `useEffect()`
```js
function DelayedIncreaser() {
  // ...

  useEffect(() => {
    if (increase) {
      const id = setInterval(() => {
        setCount(count => count + 1)
      }, 1000);
      return () => clearInterval(id);
    }
  }, [increase]);

  // ...
}
```
Mở [demo đã được fix](https://codesandbox.io/s/unmounted-state-update-fixed-siq8w?file=/src/index.js). Click vào button `Staring Increasing` và kiểm tra count được tăng. Sau đó click vào Unmount Increaser, và bạn sẽ thấy `() => clearInterval(id) ` đã cleanup interval. Không còn cảnh báo từ React.


Mỗi lần bạn code một side-effect, hãy tự hỏi bản thân nếu nó nên được clean up. Các timer, các fetch request nặng (như upload file), socket cần được clean up.

Bài viết đến đây là hết rồi. 

Cảm ơn các bạn đã theo dõi bài viết, hy vọng bài viết đã giúp các bạn có thể kiến thức về React hook.

Nguồn: https://dmitripavlutin.com/react-hooks-mistakes-to-avoid/