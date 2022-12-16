# 3 cách để tránh re-render khi dùng React context

Nếu đã từng sử dụng React context cho dự án của bạn, và gặp phải tình trạng các component con - Consumer re-render rất nhiều lần, thậm chí bị sai logic khi dùng với các thư viện UI có animation, và đau đầu không biết lý do tại sao, làm cách nào để khắc phục việc này, thì hãy cùng mình tìm hiểu bài viết ngày hôm nay nhé.

## 1. Sơ lược về useContext.

Cùng với sự phát triển, hoàn thiện từng ngày của React thì React context API, và useContext đang dần trở nên phổ biến và rất được ưa chuộng trong các dự án có scope nhỏ. Nếu toàn bộ dự án chỉ có một vài ngữ cảnh data cần truyền từ componentA sang componentB.

Trường hợp A và B cách xa nhau, và bạn không muốn pass props từ component A lên component cha, rồi từ cha xuống con, cháu, chắt, ... cuối cùng mới tới được B (nghĩ tới mình cũng thấy mệt ^^).

Ví dụ như có một thanh search chung ở trên header, hay side menu, ... và bạn muốn ở các component con cũng có thể thực hiện thao tác search,... thì React context là một sự lựa chọn tuyệt vời.

Chi tiết về việc sử dụng React context Api, useContext, các bạn có thể tham khảo ở các bài viết khá hay: Sử dụng Context trong React theo cách đơn giản nhất - Tác giả: Sơn Dương

## 2. Cẩn thận khi dùng React context

Như từ đầu bài viết mình có nói đến việc React context rất dễ gây ra re-render nếu sử dụng không khéo léo.

Dạo gần đây nếu theo dõi "kỹ sư mặt tiền", các bạn chắc hẳn đã để ý mình cứ nhai nhải việc re-render ^^.

Thường thì re-render nếu không gây ảnh hưởng một cách trực quan đến project thì bạn không cần phải lo lắng, nhưng nếu có các tác vụ tính toán và animation thì chúng ta phải hết sức cẩn thận.

Xét ví dụ sau nhé :
```
const { useContext, useState, createContext } = React;
const AppContext = createContext();

function AppProvider(props) {
  // biến state count này được sử dụng bởi component con
  const [count, setCount] = useState(0);
  // message này là cố định, không thay đổi
  const [message, setMessage] = useState(
    'Message này mà bị re-render là sẽ đổi màu'
  );
  const value = {
    count,
    setCount,
    message,
  };
  return <AppContext.Provider value={value} {...props} />;
}

function Message() {
  const { message } = useContext(AppContext);
  // mỗi lần bị re-render, đoạn text message sẽ có màu khác nhau
  // giúp chúng ta dễ hình dung
  const getColor = () => Math.floor(Math.random() * 255);
  const style = {
    color: `rgb(${getColor()},${getColor()},${getColor()})`,
  };
  return (
    <div>
      <h4 style={style}>{message}</h4>
    </div>
  );
}

function Count() {
  const { count, setCount } = useContext(AppContext);
  return (
    <div>
      <h3>Current count from context: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <AppProvider>
        <h2>Re-renders! 😩</h2>
        <Message />
        <Message />
        <Message />
        <Count />
      </AppProvider>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```


Ở đây mình đã tạo một context tên là AppConText bao gồm giá trị biến đếm, hàm set biến đếm, và nội dung của message.

Bằng cách làm như trên, đứng ở component con Count, ta đã có thể lấy được giá trị biến count, trực tiếp set biến count, ở component Message ta có thể lấy được nội dung message truyền từ component cha xuống mà không cần pass các props từ component cha xuống con.

Nói cách khác, giờ đây, nhờ context, dù cho component con đứng ở bất cứ đâu, miễn là nằm trong phạm vi của Provider, thì chúng có thể access được các biến kia.

**NHƯNG**

Chạy bản live-demo bên dưới (bấm tab Result, bấm Run pen), bạn sẽ thấy một vấn đề rất lớn, đó là re-render

***Mỗi lần bấm nút tăng biến đếm, các component Message bị re-render (đồng nghĩa với bị đổi màu, vì mỗi lần re-render, hàm getColor sẽ được chạy)***


## 3. Nguyên nhân
Trong thế giới React context, tất cả component mà consume (hay useContext, subscribe, sử dụng, lắng nghe,... bạn dùng từ nào cũng được) một context A, thì toàn bộ component con đó sẽ re-render bất kể khi nào context A kia thay đổi, dù cho context đó không được dùng để render trong component con.

Xét lại ví dụ message phía trên, AppContext chứa 3 giá trị là: biến state count, hàm set giá trị setCount, và cuối cùng là biến state message

Mỗi khi bấm nút tăng biến đếm, biến count thay đổi -> AppContext thay đổi -> component Message re-render, mặc dù nó không hề có nhu cầu, và cũng không liên quan gì đến việc tăng giảm biến đếm.

Ok, chúng ta đã biết được nguyên nhân, vậy đâu là giải pháp để tránh re-render khi sử dụng React context?

## 4. Các cách khắc phục


Các solution liệt kê dưới đây chính là recommend từ tác giả trong đội ngũ phát triển React context, anh ấy đã comment trong stack overflow, các bạn có thể [xem](https://github.com/facebook/react/issues/15156) nội dung comment gốc nếu muốn.

### Tách context ra thành nhiều context khác nhau

Cách được ưa dùng nhất là tách nhỏ context, context nào liên quan đến nhau, re-render chung với nhau thì đi chung, còn không thì tách riêng

Thay vì chỉ có một AppContext, chúng ta tách ra làm 2 context riêng biệt là CounterContext và MessageContext

```
function App() {
  return (
    <div>
      <CounterProvider>
        <Count />
      </CounterProvider>
      <MesageProvider>
        <Message />
        <Message />
        <Message />
      </MessageProvider>
    </div>
  );
}
```


Như vậy, Message component đã không còn bị ảnh hưởng bởi việc tăng biến đếm.

### Dùng React.memo và chèn một component trung gian vào giữa

Nếu bạn đang maintain code và không thể tách rời state và context như cách trên, thì hãy thử làm như sau:

```
const Message = React.memo((props) => {
  const getColor = () => Math.floor(Math.random() * 255);
  const style = {
    color: `rgb(${getColor()},${getColor()},${getColor()})`,
  };
  return (
    <div>
      <h4 style={style}>{props.message}</h4>
    </div>
  );
});

const componentWrapper = () => {
    const {message} = useContext(AppContext);
    return <Message message={message}>;
}
```

Bằng cách sử dụng React.memo và tạo một component trung gian, thì dù cho componentWrapper bị re-render (bởi việc AppContext change) thì Message của chúng ta vẫn không bị re-render (vì React.memo nhận thấy prop message) nó nhận vào không đổi. Thanks memo!

Mọi tác vụ render phức tạp đều nằm ở component Message, nên việc ảnh hưởng performance từ việc rerender ở component trung gian componentWrapper không còn quan trọng.
### useMemo

Cách cuối cùng, vì một lý do nào đó bạn vẫn muốn mọi thứ chỉ nằm trong một component, thì hãy dung useMemo, wrap phần giá trị trả về (return) bên trong component đó, với list các dependencies hợp lý.
```

const Message = props => {
  const { message } = useContext(AppContext);

  return useMemo(() => {
    const getColor = () => Math.floor(Math.random() * 255);
    const style = {
      color: `rgb(${getColor()},${getColor()},${getColor()})`,
    };
    return (
      <div>
        <h4 style={style}>{props.message}</h4>
      </div>
    );
  }, [message]);
};
```
Với cách làm này, component Message của chúng ta vẫn chạy lại khi AppContext counter thay đổi, nhưng React sẽ không render lại các DOM node của compoennt vì dependency message truyền vào useMemo là giống nhau.

## 5. Kết luận
Hy vọng qua bài viết này, các bạn đã biết đến vấn đề re-render tồn tại với React context và cách xử lý hiệu quả.

Cùng comment phía dưới nếu bạn còn biết cách nào khác hiệu quả nữa nha.

Thấy hay thì cho mình một like nhé, hẹn gặp các bạn trong các bài viết tiếp theo.

Mến chào các bạn!