# Mở đầu
React chính thức được ra mắt vào năm 2013 và đang là thư viện web được yêu thích và hấp dẫn nhất cho developers. Không có gì ngạc nhiên khi nó trở thành thư viện Javascript nổi tiếng nhất ở thời điểm hiện tại.

Một trong những điều khiến React trở nên hấp dẫn đối với mình là mặc dù đã sử dụng nó trong thời gian dài, bạn vẫn có thể khám phá các kỹ thuật và thủ thuật mới. Và mặc dù các kỹ thuật mà mình sẽ giới thiệu có thể sẽ không được sử dụng thường xuyên, tuy nhiên, chúng lại rất mạnh khi được sử dụng trong một kịch bản phù hợp. Đây là bốn điều mà bạn có thể không biết mình có thể làm trong React.
## 1. Buộc component remount  sử dụng thuộc tính "key"
Chúng ta đều biết cần dùng "key" khi render ra 1 danh sách với nhiều phần tử giống nhau. Vậy tại sao chúng ta phải dùng nó ?
Vì "key" chính là thứ dùng để định danh cho mỗi phần tử khi dữ liệu của chúng bị thay đổi và cần được render lại, xóa đi, thêm vào.

Hãy tưởng tượng bạn có 1 array `['Dog', 'Cat', 'Own']` và bạn muốn render chúng trong 1 component nào đó. 
Sau khi bạn render, bạn quên mất 1 phần tử và muốn thêm nó vào đầu hoặc cuối danh sách. Ví dụ thêm vào đầu thì bạn sẽ phải đẩy 3 phần tử cũ xuống dưới. Khi không có "key" React sẽ biến đổi 3 phần tử cũ thay vì chỉ việc đẩy nó xuống dưới, đó là lúc chúng ta cần dùng đến "key".
Khi có "key" React sẽ hiểu đây là các phần tử cũ không cần render lại nữa và chỉ render thêm 1 phần tử vào đầu danh sách mà thôi.
Khi đã hiểu nó, ta có thể tùy ý sử dụng thuộc tính "key" trong các trường hợp khác nhau. Về cơ bản có thể nói rằng nó sẽ là thứ để định danh khi component có sự thay đổi, và chúng ta có thể khởi tạo lại nó bất cứ khi nào chúng ta muốn. Ví dụ đơn giản về nút reset counter như sau:

Code:
```javascript
const App = () => {
  const [key, setKey] = React.useState(0);

  return (
    <div>
      <Counter key={key} />
      <button onClick={() => setKey(key + 1)}>
        Reset the state from parent
      </button>
    </div>
  );
};

const Counter = () => {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
};
```
Demo
https://z49v3.csb.app/

Bằng cách tận dụng thuộc tính "key" từ component cha App, chúng ta có thể reset một cách dễ dàng state trong component con Counter. Mẹo này thi thoảng thực sự tiện dụng, mặc dù có thể ảnh hưởng đến hiệu suất.

## 2. Truyền Components như những Props
Cái này không khó như ở bên trên, nó khá dễ hiểu nhưng lại không được sử dụng thường xuyên.

React khuyên chúng ta nên sử dụng các thành phần thay vì sử dụng kế thừa để sử dụng lại các đoạn code giữa nhưng components, nhờ đó chúng ta có `props.children` Nhưng thi thoảng chúng ta cần nhiều `props.children`, lúc đó ta có thể tạo các quy ước cho việc truyền components. 

Ví dụ chúng ta có left sidebar, main content, right panel:

```javascript
const Sidebar = () => <div>I'm a sidebar :)</div>;
const Settings = () => <button>Click here to change the settings</button>;

const Layout = ({ children, leftPanel, rightPanel }) => (
  <div>
    <div>{leftPanel}</div>
    <main>{children}</main>
    <div>{rightPanel}</div>
  </div>
);

const App = () => {
  return (
    <Layout leftPanel={<Sidebar />} rightPanel={<Settings />}>
      <p>Hello from main!</p>
    </Layout>
  );
};
```

Demo: https://ori2x.csb.app/

Điều này sẽ khiến layout của bạn trở nên linh hoạt hơn bởi vì ta có thể chuyển phần `settings` sang vị trí `leftPanel` và `sidebar` sang `rightPanel`. Ta có thể truyền thẳng JSX nếu muốn thay vì components.

## 3. Cập nhật thứ gì đó sử dụng useState
Chúng ta xem lại ví dụ `Counter` ở bên trên. Ta sử dụng useState để quản lý state của Counter. Oke, nó hoạt động rất tốt. 
Nhưng nếu chúng ta muốn cộng current value lên mỗi giây thì sao nhỉ ?
Ta có thể làm như này: 

```javascript
React.useEffect(() => {
    let counterInterval = setInterval(() => {
      console.log("Current count", count);
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(counterInterval);
  }, []);
```
Demo: https://r0wxv.csb.app/

Ta setup cho count tăng lên 1 mỗi giây nhưng chỉ 1 lần rồi dừng lại ngay. Mở console lên sẽ thấy các giá trị được in ra.
Ơ đợi đã, dù ấn liên tục để tăng count lên bao nhiêu đi nữa thì sau 1 giây nó vẫn sẽ quay về giá trị khởi tạo và cộng thêm 1 => "1" sẽ được hiển thị. Dường như nó bị kẹt thì phải. Hãy cùng sửa nó nhé. Để ý thấy chúng ta đang gán giá trị khởi tạo (0) cho hàm `setInterval`, do đó sau khoảng thời gian 1s nó sẽ cộng thêm 1 ( 0 + 1 = 1) nên hiển thị luôn là 1 sau 1s sau khi bấm nút "+" lần đầu. Vậy để sửa nó, đơn giản chúng ta gán giá trị hiện tại chứ không phải giá trị khởi tạo là ổn. 
```
let counterInterval = setInterval(() => {
  setCount(count => count + 1)
}, 1000)
```

Oke giờ count sẽ được tăng mỗi giây chứ không bị kẹt lại nữa.

Demo: https://6s3kw.csb.app/

Code: https://codesandbox.io/s/beautiful-stonebraker-6s3kw

## 4. Lazy State initialization
Một số chức năng useState hiếm khi được sử dụng, mình nghĩ sẽ tốt khi đề cập rằng bạn cũng có thể tạo ra các đối tượng phức tạp một cách lazy với nó.

Có một vài cách để tạo ra các đối tương phức tạp một cách lazy bằng cách sử dụng hook. Bạn có thể sử dụng `useMemo`, sự lựa chọn phổ biến hơn từ những gì mình đã thấy, giúp lưu trữ tính toán của bạn bằng cách sử dụng mảng phụ thuộc (trông khá giống với useEffect).

```javascript
const value = useMemo(() => calculation(a, b), [a, b]);
```

Bây giờ đây là một cách thực sự tốt để lazy tạo một đối tượng nếu bạn có sự phụ thuộc vào tính toán của mình. Nhưng, nó chỉ đóng vai trò là một gợi ý và không đảm bảo rằng tính toán sẽ không chạy lại.

Tuy nhiên, nếu bạn không có phụ thuộc và chỉ muốn tạo đối tượng một khi bạn có thể truyền một hàm cho useState. Hãy cùng xem Hãy xem điều này có thể như thế nào:
```javascript
const App = props => {
  const [state, setState] = React.useState(() => {
    const init = expensiveCalculation(props);
    return init;
  });

  return <Chart data={state} />;
};
```

Đây là thứ mà có lẽ bạn sẽ không sử dụng thường xuyên, nhưng mình vẫn nghĩ rằng nó rất đáng được nhắc đến.

Hy vọng những thứ bạn đọc được hôm nay sẽ giúp ích cho project của bạn Chúc may mắn.

[###Tham khảo](https://medium.com/swlh/4-things-you-might-not-know-you-can-do-in-react-be234bdcab1b)