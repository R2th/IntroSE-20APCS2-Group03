> Có vài state mà component con kế thừa từ component cha.
> Đôi khi ta chỉ muốn chỉnh những state đó ở component con, mà không muốn làm ảnh hưởng gì đến component cha cả.
> 

### Clone state

Clone state tất nhiên sẽ làm mất binding giữa state và view. Tuy nhiên là chúng ta rất dễ quên điều đó. :|

```
function Parent({ foo }) {
  const [foo, setFoo] = useState(foo)
  render (
      <>
          <Child foo={foo} />
          <button onClick={() => setFoo('bar')}>to bar!!</bar>
      </>
  )
}

function Child({ name }) {
  // ta "capture" lại giá trị của Parent để modify nó mà ko ảnh hưởng gì đến state của Parent cả
  const [longFoo, setLongFoo] = useState(name + name + name) // "foofoofoo"
  render <p>{longFoo}</p>
}

// dùng lần đầu tiên, kết quả vẫn như dự đoán
<Parent foo="foo" /> //  => "<p>foofoofoo</p>"

// ấn vào nút "to bar!!!"
// => "<p>foofoofoo</p>" !!!!
```

### Keep state up-to-date

Để giữ cho state luôn update thì ta có 2 phương án:

- Cho thằng component cha giữ mọi state, và thằng component con chỉ việc render mà thôi.
- Sử dụng `useEffect`.

Ở cách đầu thì không có gì để giải thích thêm, rất dễ hiểu và dễ làm. Và tất nhiên như vậy nó sẽ đi kèm nhược điểm: *component cha đang làm quá nhiều thứ*. Về lâu dài, component cha sẽ phình ra khiến code khó đọc, khó quản lý và flow trở nên rắc rối. Trong khi đó, component con lại dường như chả làm gì nhiều, kể cả việc của bản thân nó (chỉnh sửa dữ liệu từ cha pass lại rồi hiển thị).

Ở cách thứ hai, ai làm việc của người đó, code sẽ bớt lùng bùng hơn, và mặc nhiên nó sẽ có yếu điểm là thêm nhiều code hơn, hiệu năng chậm hơn tí. Cách này được viết như sau:

```
function Child({ name }) {
  const getName = () => name + name + name
  const [longFoo, setLongFoo] = useState(getName())
  
  // ta theo dõi sự thay đổi của name,
  // mỗi lần nó đổi, ta sẽ đổi state của Child theo
  useEffect(() => {
    setLongFoo(getName())
  }, [name])
  
  render <p>{longFoo}</p>
}
```

### Extra: useState và defaultProps

Hành vi trên là hệ quả của useState: *chỉ chạy 1 lần khi load component*. Một cách hiểu sai khá phổ biến cũng xảy ra khi người ta sử dụng defaultProps.

- defaultProps the wrong way

```
// nó ko phải default value, nó không phải như này
let foo = passedValue || 'foo'
```

- defaultProps the right way: "nếu không truyền gì thì sẽ nhận giá trị default", "truyền null, undefined thì vẫn là giá trị hợp lệ, giá trị default sẽ không được dùng".

### Kết

Như vậy, cơ chế binding của React rất rõ ràng và không có tí "phép thuật" gì cả, thể hiện rõ qua `hooks`. Nếu chúng ta không sử dụng đúng bản chất của nó thì sẽ rất dễ gặp các trường hợp kì lạ :|. Cảm ơn các độc giả đã dành thời gian và chúc các bạn sẽ có những trải nghiệm vui với React.