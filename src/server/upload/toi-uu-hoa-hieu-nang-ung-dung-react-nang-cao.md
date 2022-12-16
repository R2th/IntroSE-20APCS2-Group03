React rất là nhanh. Mình thực sự thấy nó rất nhanh. Đó là điều làm cho React thực sự tuyệt vời.

Nhưng nếu bạn muốn tối ưu hóa ứng dụng của bạn thì có một số cách bạn có thể làm.

Hôm nay chúng ta sẽ thấy 2 công nghệ hữu dụng nhất được React cung cấp sẽ giải quyết những vấn đề về hiệu năng như thế nào.

**1. Bắt đầu với một ví dụ đơn giản.**

Lấy một ví dụ đơn giản, chúng ta có một component  <code>Display</code> hiển thị một dòng văn bản.

Component này là con của component <code>Controller</code>, trong đó <code>Controller</code> còn chứa một nút có tác dụng làm tăng giá trị biến <code>count</code> trong state khi được click vào.

```JSX
import React, { useState } from 'react';

const Controller = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count => count + 1)}>Click</button>
      <Display />
    </>
  );
};

const Display = () => {
  console.log('display is re-rendering');
  return (
    <>This is a display function </>
  );
};
```

Chúng ta thêm <code>console.log(...)</code> vào để phát hiện component <code>Display</code> của chúng ta có bị render lại hay không.

Bây giờ, khi chúng ta click vào button bên trong <code>Controller</code> và mở console.

![](https://images.viblo.asia/ec8b4aea-7075-4f7b-a872-8b62144a755a.png)

Mặc dù chúng ta không hề tác động gì tới component <code>Display</code> nhưng mà nó luôn bị render lại mỗi khi chúng ta click vào button.

Điều này không hề ổn một chút nào. Điều gì sẽ xảy ra nếu chúng ta sử dụng component <code>Display</code> này ở trên toàn bộ project?

Hiệu năng sẽ hoàn toàn bị phá vỡ.

**2. Memoization là gì ?**

Memoization là một kĩ thuật quen thuộc được sử dụng ở rất nhiều nơi. Nó cũng không có gì ngoài bộ nhớ đệm (caching).

Theo Wikipedia nó được định nghĩa như sau :

> In computing, **memoization** or **memoisation** is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

Như vậy, Nếu memoization là một kĩ thuật giúp cải thiện hiệu năng cho các hàm (function), chúng ta có thể ứng dụng nó cho functional component hay không ?

Yes, rất may chúng ta có thể làm nó. React cung cấp cho chúng ta một tính năng được gọi là <code> React.memo()</code>

Bây giờ, chúng ta hãy xem cách để giải quyết vấn đề trên.

**3. Sử dụng React.memo() để chặn render lại (re-render).**

<code>React.memo()</code> nhận vào 2 tham số :

* Đầu tiên là hàm mà chúng ta muốn ghi nhớ (memorize).
* Thứ 2 là hàm có chức năng giống như <code>shouldComponentUpdate()</code> (optional). Chúng ta sẽ gọi nó sau,

Bây giờ, nhìn xem điều gì sẽ xảy ra nếu chúng ta viết lại component <code>Display</code> như sau ...

```JSX
import React,{useState , memo} from 'react';

const Display = memo(() => {
    console.log('display is re-rendering');
    return (
    <div> This is a display function.</div>
    )
})
```
Thật tuyệt vời, component của chúng ta đã không bị render lại mỗi khi click vào button.

**4. Hãy tiến thêm một bước nữa.**

Okey, bây giờ chúng ta đã có một component tối ưu. Nhưng vấn đề là component này thật ngu ngốc, nó chỉ hiển thị một dòng text. chả có tác dụng gì cả. Tôi muốn nội dung của <code>Display</code> phụ thuộc vào một vài <code>props</code> truyền vào nó.

Bây giờ sẽ viết lại component <code>Display</code> cho nó hiển thị một danh sách tên người.

Mỗi khi click vào button sẽ thêm một cái tên mới vào state.

```JSX
import React,{useState , memo} from 'react';

const Controller = () => {
    const [names , setNames] = useState([]);
    const addName = () => {
        const newNames = names;
        newNames.push('another name')
        setNames(newNames);
    }
    return <>
        <button onClick={() => addName()}> Add Name </button>
        <Display names={names}/>
    </>
};

const Display = memo((props) => {
    return <div>
        {props.names.map(name => <div>{name}</div>)}
    </div>
});
```
Chúng ta sẽ nhìn thấy <code>another name</code> được thêm vào danh sách tên mỗi lần click vào button <code>Add Name</code>.

Nhưng không có gì xảy ra cả. Tại sao vậy ? Chúng ta sẽ giải đáp thắc mắc này trong phần tiếp theo.

**5. Mutable vs Immutable.**

Để giải quyết vấn đề này, chúng ta phải thực sự hiểu về <code>Immutable</code> ( tính bất biến )

Ở dòng <code>newNames = names</code>, chúng ta nghĩ rằng gắn <code>names</code> cho biến mới <code>newNames</code> nhưng thực sự <code>arrays</code> trong Javascript không làm việc như vậy.

Khi thực hiện dòng lệnh trên, nó sẽ gán tham chiếu của mảng <code>names</code> cho <code>newNames</code>. Nên kết quả là nội dung của mảng <code>names</code> thay đổi nhưng tham chiếu không hề thay đổi.

Và tất nhiên chúng ta đều biết React chỉ re-render lại khi state thay đổi nên việc chạy hàm <code>addName()</code> kia hoàn toàn không có tác dụng.

Chúng ta giải quyết vấn đề này bằng các viết lại hàm <code>addName()</code> như sau ...
```JSX
const addName = () => {
    const newNames = [...names];   // SEE HERE
    newNames.push('another name');
    setNames(newNames);
}
```

Toán tử <code>...</code> (spread operator) trả về một mảng mới và gán cho <code>newNames</code>.

Bây giờ nếu chúng ta click vào button, chúng ta có thể thấy component đã được render lại.

**6. Khi React.memo không được, hãy sử dụng useCallback() để giải quyết.**

Vòa một ví dụ khác. Chúng ta tạo một component tương tự ví dụ trước, sẽ thêm một cái tên mới mỗi khi click vào button.

Và chúng ta có một component khác để xóa danh sách tên trên.

```JSX
import React,{useState , memo} from 'react';

const Controller = () => {
    const [names , setNames] = useState([]);

    const addName = () => {
        const newNames = [...names];
        newNames.push('another name');
        setNames(newNames);
    };

    const clearNames = () => setNames([]);
    
    return <>
        <button onClick={() => addName()}> Add Name </button>
        
        <div>{names.map(name => <div>{name}</div>)}</div>
        
        <ClearButton clearNames={clearNames}/>
    </>
};

const ClearButton = memo((props) => {
    return <div>
        <button onClick={props.clearNames}> Clear</button>
    </div>
});
```

Bây giờ, chúng ta click vào button <code>Add Name</code>. Component <code>ClearButton</code> đã bị render lại, điều này là không cần thiết.

Để giải quyết vấn đề này chúng ta có thể sử dụng một hook tên là <code>useCallback()</code>. Cái hook <code>useCallback()</code> này giúp chúng ta ngăn chặn việc tính toán lại (re-computing) <code>clearNames</code>. Nó được cung cấp bởi React và có thể import như sau ...
```JSX
import React,{ useCallback} from 'react';
```
Và chúng ta có thể viết lại hàm <code>clearNames</code> như sau ...
```JSX
const clearNames = useCallback(() => setNames([]), [setNames]);
```
Yeee, vấn đề của chúng ta không còn nữa !

Tổng kết lại thì trên đây là một số các bạn có thể sử dụng để cải thiện ứng dụng React của mình. Nhưng những điều tốt đẹp thì thường đi cùng cạm bẫy. Nên hãy cố gắng sử dụng khôn ngoan để tránh ăn bug nhé các bạn. :grinning::grinning::grinning:

Còn các bạn làm gì để tối ưu hiệu năng ứng dụng React, hãy comment cho mình và mọi người tham khảo nhé! Happy Coding!

Tìm hiểu thêm :

* [useCallBack()](https://reactjs.org/docs/hooks-reference.html#usecallback)
* [React.memo()](https://reactjs.org/docs/react-api.html#reactmemo), [useMemo()](https://reactjs.org/docs/hooks-reference.html#usememo)