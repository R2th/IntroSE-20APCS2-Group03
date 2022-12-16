![image.png](https://images.viblo.asia/29a581cc-b4cb-4f8f-b9ce-c0a43978d54f.png)

Trước React 16.3, `refs` chỉ là một props mà bạn có thể gán nó đến React Elements, để bạn có thể nắm bắt được phần tử DOM đó.

Hầu như `refs` được dùng để lưu trữ ở đâu đó, và thực hiện clear nó khi component bị hủy (unmount).

```
    class Input extends React.Component {
      constructor(props) {
        super(props);
        this.storeRef = this.storeRef.bind(this);
      }

      inputRef = null;
      storeRef = element => this.inputRef = element;

      focusInput = () => {
        if (!this.inputRef) { return; }

        this.inputRef.focus();
      }

      render() {
        /* now we have the ref for the rest of the time this component is mounted  */
        return (
          <form>
            <input ref={storeRef} />
            <button onClick={focusInput}>Focus the input!</button>
          </form>
        )
      }
    }
```

Nhưng đối với React 16.3 trở về sau này thì khi ta sử dụng `refs`, thì ta phải dùng với hình thức thế này `ref.current`

```
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focusInput = () => {
    if (!this.inputRef.current) { return; }

    this.inputRef.current.focus();
  }

  render() {
    /* now we have the ref for the rest of the time this component is mounted  */
    return (
      <form>
        <input ref={this.inputRef} />
        <button onClick={focusInput}>Focus the input!</button>
      </form>
    )
  }
}
```

Câu hỏi đặt ra là tại sao cần phải current? Để trả lời chúng ta phải hiểu được khái niệm closure là gì!

**Giới thiệu sơ về closure.**

Bạn biết rằng một function có thể return 1 function?

Khi đó function được return sẽ nhớ tất cả các variable của function return về nó(wrapper function).

```
    const Add = (number1) => { // this is wrapper function
        return number2 => {
            console.log(`${number1} + ${number2} = `, number1 + number2); // this is returned function
        };
    }
    
    let number1 = 10;
    
    const addingNumber = Add(number1);
    
    addingNumber(20); // 10 + 20 =  30
    addingNumber(10); // 10 + 10 =  20
    number1 = 20  // Changle the number1 to 20
    addingNumber(30) // 10 + 30 =  40
```

Như bạn thấy ở ở dòng `14`, chúng ta có thực hiện việc update lại biến `number1 = 20  // Changle the number1 to 20` nhưng  `number1` trong function `addingNumber` vẫn là 10.

*NOTE: Đây là một trong nguyên nhân gây ra việc phải khai báo biến vào mảng dependencies của useEffect*

Để giải quyết vấn đề trên thì chúng ta chỉ cần thay đổi từ cách truyền params là một value thành một reference.

```
// param truyền xuống là một value
let a = false;

const b = a;

a = true;

const passByValue = value => {
    console.log(value);
}

passByValue(b);

// Chuyển nó thành reference.

let a = {};

const b = a;

a.current = true;

const passByReference = reference => {
    console.log(reference.current);
}

passByReference(b);
```

**Áp dụng vào React**

```
    const PassByValue = ({ mess }) => {
      React.useEffect(() => {
        message = mess;
      })

      React.useEffect(() => {
        window.setInterval(() => {
          console.log(message);
        }, 1000)
      }, [])

      return null;
    }

    const ExampleComponent = () => {
      const mess = 'Hello world';

      const changeMess = () => {
        mess = Math.random().toString(36).substring(7);
      }

      return (
        <>
          <PassByValue mess={mess} />
          <button onClick={changeMess}>Change Mess</button>
        </>
      );
    }

    class App extends React.Component {

      render() {
        return (
          <div className="App">
            <ExampleComponent />
          </div>
        );
      }
    }


    const rootElement = document.getElementById("root");
    ReactDOM.render(<App />, rootElement);
```
[xem kết quả ở đây ](https://codepen.io/trn-ngc-tn/pen/ZEKKdvm)

Bạn có thể thấy kết quả vẫn là hello world cho dù bạn đã click vào button change mess

Nguyên do là cái bạn truyền vào là một message với value là hello world, và acction change mess chỉ thực hiện việc set lại data cho biến mess. Do đó nó Rerender không được chạy.

Để giải quyết ta thì ta chỉ cần thay đổi param mess vào là một refenrence.
```
   const PassByReference = ({ mess }) => {
      React.useEffect(() => {
        stored = mess;
      })

      React.useEffect(() => {
        window.setInterval(() => {
          console.log(stored.current)
        }, 1000)
      }, [])

      return null;
    }

    const ExampleComponent = () => {
      const mess = { current: 'Hello world' };

      const changeMess = () => {
        mess.current = Math.random().toString(36).substring(7);
      }

      return (
        <>
          <PassByReference mess={mess} />
          <button onClick={changeMess}>Change Mess</button>
        </>
      );
    }

    class App extends React.Component {

      render() {
        return (
          <div className="App">
            <ExampleComponent />
          </div>
        );
      }
    }


    const rootElement = document.getElementById("root");
    ReactDOM.render(<App />, rootElement);
```
[xem kết quả ở đây ](https://codepen.io/trn-ngc-tn/pen/YzVVoeq?editors=1111)


Và kết quả đã đúng với mong muốn của chúng ta. Nguyên do là biến mess chúng ta chỉ là một refer đến biến mess của ExampleComponent, do đó khi nó thực hiệc việc truy cập vào mess để lấy data current, thì data đó luôn là data mới nhất.

*NOTE: Các bạn nên chú ý, khi dùng trick này thì phải biết các biến mình làm gì, thay đổi khi nào. Không thì việc debug cũng khá là nhọc nhằn.*

**Cảm ơn các bạn đã đọc bài viết, hi vọng bạn có cái nhìn rõ hơn về việc sử dụng reference trong React. (Bow)**