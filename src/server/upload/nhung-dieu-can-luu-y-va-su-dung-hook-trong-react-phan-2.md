# II. UseEffect và điều cần lưu ý .
Nếu bạn đã quen thuộc với các phương thức vòng đời của lớp React, bạn có thể nghĩ đến useEffect Hook khi kết hợp componentDidMount, componentDidUpdate và componentWillUnmount.


Có hai loại xử lý phổ biến trong các thành phần React: những xử lý phụ không yêu cầu cleanup và những xử lý phụ có cleanup. Hãy xem xét sự khác biệt này chi tiết hơn.

Đó là 1 trong những cái chúng ta làm rõ trong bài viết này.

## 1. Side effect là gì ? Và chúng có bao nhiêu loại ?

Side effect hiểu nôm na là những thứ tác động và nó chạy phía bên ngoài component của mình.

* Gọi API lấy dử liệu
* Tương tác với DOM
* Subscriptions
* setTimeOut, setInterval

Cái mà chúng ta hay dùng đó là cái gọi api trên server nhé. 
Trên tài liệu chính thức thì thằng React nó chia ra 2 nhóm.

1. Effect không cần cleanup : Gọi API , tương tác với DOM
2. Effect cần cleanup : subscriptions, setTimeOut, setInterval

Lý do là sao. Ví dụ như setInterval , khi thao tác với nó thì nó cứ chạy và chạy cho đến khi nó bị UnMount và nó sẽ xảy ra lỗi (memory leak) . Nên nó được đưa vào danh sách cần cleanup . 

## 2. Giới thiệu hook useEffect()

* Là một hook cơ bản trong React Hook .
* Sử dụng cho Side Effect.
* Mỗi hook có 2 thành phần là **side effect** và **clean up** (optional)
* Được thực thi sau mỗi lần render
* Được thực thi ít nhất một lần sau lần render đầu tiên.
* Những lần render sau chỉ được thực thi nếu có dependencies thay đổi.
* Effect cleanup sẽ được thực thi trướcrun effect lần tiếp theo hoặc unmount.

**Cú pháp.**
```javascript
// callback : Side effect của bạn 
// dependencies : Chỉ thực hiện lệnh gọi lại nếu một trong các phần phụ thuộc của bạn thay đổi

function useEffect(callback, dependencies) {}
```

useEffect về cơ bản nó là 1 cái function . Đầu tiên là nó nhận 1 cái callback và thứ 2 là nhận danh sách dependencies.
Cho bạn 1 ví dụ nhe : 

```javascript
function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
        return function cleanup() {
          // cleanup
        };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Trong lần render đầu tiên :

***MOUNTING***
- **rendering** (run phần jsx trước)
- **run useEffect()** (Lưu ý là nó chỉ run phần side effect chứ chưa run phần cleanup nhé)

Đến lần render tiếp theo. 

***UPDATING***

- **rendering** (lại render phần jsx trước)
- run **useEffect() cleanup** nếu dêpndencies thay đổi (Lúc này nó sẽ cleanup cái side effect chạy lần trước ở mounting nhé)
- **run useEffect()** nếu dependencies thay đổi. (Đoạn này nó sẽ chay side effect lần 2 nhé)

Bước cuối cùng nó sẽ chạy unmount để nó đảm bảo đả cleanup hết trước khi unmount

***UNMOUNTING***

- run **useEffect() cleanup**

Cho nên các bạn đừng nhầm là khi nó chạy vào useEffect là nó chạy luôn vào cleanup là không đúng nhé.

## 3. Một số lưu ý khi dùng useEffect()

Có 3 cách dùng useEffect với điều kiện. Chúng ta cùng tìm hiểu nhé.

**Cách 1 :** Không khai báo dependencies
```javascript
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
       return function cleanup() {
          // cleanup
        };
  });

  return ();
}
```

Nếu không khai bao dependencies đồng nghĩa với việc nó luôn luôn được thực hiện . Cứ mỗi lần render, sau khi render xong là nó được chạy và chạy sau mỗi lần render.

**Cách 2:** Nếu dependencies là 1 mãng empty

```javascript
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {

        return function cleanup() {
          // cleanup
        };
  }, []);

  return ();
}
```
Có nghĩa là nó sẽ chạy đúng 1 lần thôi. Có nghiã là sao.

Tức là cái side effect chỉ chạy đúng 1 lần sau khi render và cleanup chạy đúng 1 lần khi Unmount thôi. Như vậy chổ chạy **side effect** nó tương tự như là **componentDidMount** và chổ chạy **cleanup** sẽ giống với **componentWillUnmount** phía bên life cycle nhé.

**Cách 3:** Nếu dependencies là 1 mãng có giá trị.

```javascript
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {

        return function cleanup() {
          // cleanup
        };
  }, [count]);

  return ();
}
```

Thì lần đầu nó sẽ chạy sau khi render . Và những lần sau nó có render hay không thì nó sẽ phụ thuộc vào cái thằng **count** . Nếu thằng count thay đổi thì thằng useEffect mới gọi 
## 4. Chuyển từ life cycles sang useEffect() hook 
```javascript
class Example extends PureComponent {
  componentDidMount() {
    console.log("Component Did Mount")
  }

  componentWillUnMount() {
    console.log("Component Will Unmount")
  }
}
```

 Viết lại tương đương với hook .
```javascript
function Example() {
  useEffect(() => {
        console.log("Component Did Mount")
        
        return function cleanup() {
          console.log("Component Will Unmount")
        };
  }, []);
}
```


Tiếp theo

```javascript
class Example extends PureComponent {
  componentDidMount() {
    console.log("Component Did Mount or Did Update")
  }

  componentDidUpdate() {
    console.log("Component Did Mount or Did Update")
  }
}
```

Viết lại thành 

```javascript
function Example() {
  useEffect(() => {
        console.log("Component Did Mount or Did Update")
  });
}
```

## 5. Những lưu ý cần nhớ

* Side effect là gì ? Có bao nhiêu loại ?
* Có thể kèm điều kiện để thực thi useEffect()
* Có thể dùng nhiều useEffect()
* Tư duy về side Effects khi dùng useEffect() hook thay vì lifeCycle (Đừng tư duy theo kiểu từ class component viết như nào rùi conver qua hook nhé. Suy nghĩ vậy là sai lầm).

## 6. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍
Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc . Một số nguồn :

https://reactjs.org/docs/hooks-intro.html

https://reactjs.org/docs/hooks-faq.html