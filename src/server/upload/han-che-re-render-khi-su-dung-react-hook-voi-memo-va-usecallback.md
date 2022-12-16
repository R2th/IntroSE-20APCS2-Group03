Xin chào tất cả mọi người, trong các bài viết trước thì mình đã có giới thiệu qua về React hook cũng như ưu và nhược điểm của nó. Tuy nhiên khi sử dụng React hook thì sẽ có những lúc bạn cảm thấy performance của app bị giảm đi so với khi sử dụng Class component mà không rõ nguyên nhân là gì. Những lúc như vậy hẳn là bạn sẽ rất chán nản phải không nào!? Vậy, trong bài viết ngày hôm nay chúng ta cùng nhau tìm hiểu cách để giải quyết vấn đề trên nhé.

### React.memo là gì
Trước hết chúng ta cần phải nói qua về vấn đề render component trong React hook. Thì theo tài liệu doc trên trang chủ của ReactJS để ngăn chặn việc re-render thì ta có thể sử dụng 1 API của React đó là **React.memo**:
> React.memo is a higher order component. It’s similar to React.PureComponent but for function components instead of classes.

 Có thể thấy rõ được rằng **React.memo** có chức năng tương tự như **React.PureComponent** và hàm **shouldComponentUpdate** trong **Class Component**. Bằng cách dùng **React.memo** wrap toàn bộ component ta có thể ngăn chặn được sự render dư thừa.
 
Mỗi khi Component được wrap bởi **React.memo** nó sẽ so sánh giá trị lần cuối được render lưu trong bộ nhớ của React với lần render kế tiếp, nếu như giống nhau thì nó sẽ bỏ qua việc render component và sử dụng lại kết quả được render cuối cùng.

### Bài toán đặt ra
Chúng ta cùng nhau theo dõi ví dụ bên dưới:
```js
const Foo = () => {
  console.log('HomePage is rendered!');
  const [text, setText] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <>
      <TextField margin="normal" variant="outlined" label="TextField" value={text} onChange={e => setText(e.target.value)} />
      <Bar value={isChecked} />
    </>
  );
};

const Bar = ({ value }) => {
  console.log('Checkbox is rendered!');
  return <Checkbox value={value ? 'checkedB' : ''} />;
};

export default Foo;
```
Ta có 2 component là **Foo** và **Bar**, trong **Foo** ta sẽ gọi đến **Bar** và truyền cho nó 1 prop với type là *boolean*. 

Và ta sẽ test thử xem component **Bar** sẽ render như thế nào khi nhập value vào **TextField** trong các trường hợp dưới đây:
- **Trường hợp 1: Không dùng React.memo**

   * Kết quả: **Bar** bị re-render*
![](https://images.viblo.asia/9fa83dcc-17d9-44b5-b989-e947585733f9.png)

- **Trường hợp 2: Có sử dụng React.memo**

    Ta sẽ sử dụng React.memo để wrap component Bar lại:
    ```js
    const Bar = React.memo(({ value }) => {
      console.log('Checkbox is rendered!');
      return <Checkbox value={value ? 'checkedB' : ''} />;
    });
    ```
    *Kết quả: **Bar** không còn bị re-render nữa*
    ![](https://images.viblo.asia/bc64228e-3e30-4d58-a227-5421299bd6a9.png)
    
    Như vậy là **React.memo** có vẻ hoạt động tốt đấy chứ. Nhưng mà chờ đã, chúng ta cùng thử thêm 1 trường hợp nữa, đó là khi truyền đến **Bar** 1 prop có type không phải là *boolean* mà là 1 *function* xem sao nhé!
- **Trường hợp 3: Có sử dụng React.memo và truyền prop đến Bar là 1 function**

    ```js
    const Foo = () => {
      // ...
      const toggleChecked = () => setIsChecked(!isChecked);
      return (
        <>
          <TextField margin="normal" variant="outlined" label="TextField" value={text} onChange={e => setText(e.target.value)} />
          <Bar value={isChecked} onClick={toggleChecked} />
        </>
      );
    };

    const Bar = ({ value, onClick }) => {
      console.log('Checkbox is rendered!');
      return <Checkbox value={value ? 'checkedB' : ''} onClick={onClick} />;
    };
    ```
    
   * Kết quả: **Bar** lại bị re-render* :cold_sweat:
    ![](https://images.viblo.asia/e0757efa-044c-464d-83c3-ec73731bda16.png)
    
Tại sao truyền vào 1 giá trị kiểu *boolean* thì được mà function thì lại không được nhỉ!?

Lí do là trong lần render đầu tiên function `toggleChecked` sẽ được gán vào 1 đối tượng để truyền vào component **Foo**, khi thay đổi value trong **TextField** thì component **Foo** sẽ bị render lại và đồng thời `toggleChecked` cũng sẽ được gán lại vào 1 đối tượng khác, chính vì vậy mà **React.memo** mới hiểu rằng giá trị truyền vào prop `value` bị thay đổi và tiến hành re-render component.

Cơ chế so sánh của **Reat.memo** có thể được biểu diễn thông qua ví dụ dưới đây:

```js
function sumFactory() {
  return (a, b) => a + b;
}

const sum1 = sumFactory();
const sum2 = sumFactory();

console.log(sum1 === sum2); // => false
console.log(sum1 === sum1); // => true
console.log(sum2 === sum2); // => true
```

### Giải pháp
Rất may là React hook có cung cấp cho chúng ta 1 API có thể giải quyết được vấn đề trên đó là **useCallback**. Nó sẽ trả về một callback (function) đã được memoized, **useCallback** được sử dụng với mục đích tối ưu hóa ngăn chặn sự render dư thừa giống như là **React.memo**

```js
const Bar = React.useCallback(({ value, onClick }) => {
      console.log('Checkbox is rendered!');
      return <Checkbox value={value ? 'checkedB' : ''} onClick={onClick} />;
}, []);
 ```
 Để hiểu rõ thêm **useCallback**, các bạn có thể tìm hiểu qua bài viết [sau](https://viblo.asia/p/cung-tim-hieu-ve-cac-hook-trong-react-hooks-Ljy5VYgjlra)

Ngoài ra còn có 1 cách nữa đó là bạn chỉ cần khai báo function cần truyền vào prop bên ngoài Component là được, ví dụ: 
```js
const toggleChecked = () => setIsChecked(!isChecked);

const Foo = () => {
  console.log('HomePage is rendered!');
  const [text, setText] = React.useState('');
  return (
    <>
      <TextField margin="normal" variant="outlined" label="TextField" value={text} onChange={e => setText(e.target.value)} />
      <Bar value={isChecked} onClick={toggleChecked} />
    </>
  );
};
```

Tuy nhiên trong thực tế trường hợp này rất ít xảy ra, bởi vì khi gặp trường hợp cần dùng đến prop hay state trong Component thì cách này sẽ không còn sử dụng được nữa, thay vào đó ta bắt buộc phải sử dụng **useCallback**

### Kết
Qua bài viết trên, thì mình đã giới thiệu tới mọi người các cách để chúng ta có thể tránh được việc re-render trong **React hooks**, tuy nhiên thì cá nhân mình nhận thấy cách sử dụng **useCallback** trên vẫn chưa thực sự là tối ưu khi app của chúng ta được mở rộng. bởi vì việc sử dụng **useCallback** quá nhiều chắc chắn sẽ làm tốn bộ nhớ và như vậy chúng ta sẽ lại phải quay lại bài toán đó là tối ưu performance. 

Nhưng cho đến lúc React tìm được giải pháp thích hợp về vấn đề re-render thì ta vẫn có thể chấp nhận được cách trên đó là sử dụng **useCallback**