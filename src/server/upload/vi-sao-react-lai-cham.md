> App React càng to, ta càng thấy nó chậm một cách hư cấu.. 
>

###  DOM manipulation

Thời đại của JQuery, DOM manipulation là vua, tức ta dùng javascript để chọc ngoáy thẳng vào DOM tree:
```
// dí dụ 1 kiểu data binding phong cách JQuery
<input id="fill-me" />
<p id="display-here" />

var input = ''; // lưu vào sau dùng lại ở chỗ khác
$('#fill-me').on('input', function(e) {
  input = e.target.value;
  $('#display-here').text(input);
});
```

Ở đây, dù code không nhiều nhưng ta có thể thấy có kha khá vấn đề đau não:
- Đặt tên id như nào cho xinh đẹp và không dụng hàng?
- Biến "input" cất ở đâu cho đỡ lộ thiên?
- Thêm node vào bên trong kiểu chi?
- Với cơ chế đơn giản là listen theo event thế này thì quản lý code base về lâu dài như nào?

Nhưng nhìn chung, vấn đề chính vẫn là **state management**. Virtual DOM là cơ chế để React giành hết việc DOM manipulation, giúp chúng ta có thể tập trung vào việc quản lý state.

### Virtual DOM

Thay vì update DOM ở mỗi lần state bị thay đổi, React tạo ra Virtual DOM (gọi là VDOM cho gọn), là bản clone của DOM thật, và bằng cách so sánh sự khác biệt của VDOM trong quá khứ và VDOM hiện tại (đã có thay đổi)
React có thể quyết định update DOM một cách tối ưu, tức hạn chế việc re-render lại trang web.

Để tạo ra VDOM, React sử dụng 2 thứ: dùng Javascript Object để làm cấu trúc cho cây VDOM (gọi là "Element"), và dùng JSX để giúp việc viết các Element này dễ hơn.
```
// Kết quả return của mỗi component sẽ là một JSX
function Icon() { return <img ... />; }
function Text() { return <p ... />; }
function Label() {
  return (
    <>
      <Icon />
      <Text />
    </>
  );
}

// Các phần JSX sẽ được dịch ra thành các Element: dí dụ giản lược như sau
{
  name: "Label
  ...,
  children: [
    {
      name: "Text",
      tag: "p",
      props: ...,
    },
    {
      name: "Icon",
      tag: "img",
      props: ...,
      ...,
    }
  ]
}

// Tất cả các Element lồng nhau vào kiểu như này sẽ tạo ra một cây VDOM hoàn chỉnh.
```

Như vậy, VDOM thực tế không hề "xịn hơn" hay "đểu hơn" so với DOM, vì nó chỉ là snapshot của DOM! Sau đây sẽ là cách mà React sử dụng DOM.

### Reconciliation

Mọi thay đổi của state sẽ được React lưu vào VDOM, và nó sẽ lôi VDOM bản cũ và bản mới ra so với nhau, thấy khác chỗ nào thì update chỗ đó, theo cơ chế sau:
- Nếu cũ và mới khác loại tag => đập đi update mới hết, không quan tâm các tag con bên trong có thay đổi hay không.
- Nếu cũ và mới cùng loại tag => ra so các attribute/ props của nó rồi chỉ cập nhật các attribute mà thôi.

Nhờ cơ chế này, ta có thể tập trung vào code UI và quản lý state thoải mái mà không cần để tâm nhiều đến việc React sẽ update cái DOM như nào. Tuy nhiên, cơ chế VDOM này có vài hạn chế mà ta cần lưu ý vì nó có thể ảnh hưởng đến hiệu năng.

### Diffing is not free

Với VDOM, React có thể tính toán chán chê trên VDOM rồi mới tiến hành update DOM thật, như vậy thì có thể giảm đi kha khá số lần re-render của trang web (mà mỗi lần re-render thì trình duyệt lại repaint và reflow lại rất tốn thời gian).
Tuy nhiên, việc so sánh 2 cây VDOM cũng khá tốn kém, việc so sánh recursive 2 cây VDOM có vẻ không phải là vấn đề gì to tát nhưng với 2 cây VDOM sâu (application to và lồng nhiều), thì hiệu năng lúc này bắt đầu bị ảnh hưởng.

Một ví dụ sau sẽ làm rõ vì sau ở một số trường hợp VDOM lại chậm hơn so với dùng javascript thuần:
```
// trường hợp lý tưởng, VDOM nhanh hơn
vanila JS => update to A => repaint + reflow
valila JS => update to B => repaint + reflow
valila JS => update to A => repaint + reflow

React => update to A => save to VDOM
React => update to B => save to VDOM
React => update to A => save to VDOM
React => diff 2 VDOM => no differences => do nothing

// trường hợp chắc chắn sẽ đổi, VDOM chậm hơn
vanila JS => update to A => repaint + reflow

React => update to A => save to VDOM
React => diff 2 VDOM => changes => repaint + reflow
```

Ta có thể thấy ở trường hợp thứ 2, dù thay đổi A có to hay nhỏ thì việc so sánh cây DOM sẽ vẫn được tiến hành từ ngọn tới rễ, sẽ rất thốn nếu đây là cây DOM lớn!
Với cơ sở trên, ta sẽ có vài cách thức để cải thiện hiệu năng của React.

### How to be faster: lift state "down"?

Khi thay đổi state của một component, nó sẽ bị re-render cùng với các thằng child bên trong, bất kể thằng child đó có thay đổi hay không.
```
function Parent() {
  const [state, setState] = useState({
    shared: ...,
    foo: ..., // foo mà đổi thì <ChildBar /> cũng re-render
    bar: ..., // bar mà đổi thì <ChildFoo /> cũng re-render
  });
  
  return (
    <>
      <ChildFoo foo={state.foo} shared={shared} />
      <ChildBar bar={state.bar} shared={shared}/>
    </>
  );
};
```

 Ta có thể xử lí bằng cách đùn các state chia sẽ không cần thiết xuống các child component.
 
 ```
 function Parent() {
  const [state, setState] = useState({
    shared: ...,
  });
  
  return (
    <>
      <ChildFoo shared={shared} />
      <ChildBar shared={shared}/>
    </>
  );
};

function ChildFoo({ shared }) {
  const [foo, setFoo] = useState(...); // foo mà đổi thì mình thằng ChildFoo re-render
  ...
};
 ```

### How to be faster: should I render?

Props thay đổi là component sẽ re-render, tuy nhiên việc so sánh props cũ và mới là dựa theo cơ chế shallow comparing, tức so sánh theo reference chứ méo phải value, nên dù props mới và cũ có giá trị giống hệt nhau nhưng là 2 object khác nhau thì vẫn sẽ re-render.
```
var a = { foo: 1 };
var b = a;
var c = { ... a };

shallowCompare(a, b); // true
shallowCompare(a, c); // false
```

Với class-based component, ta có thể dùng shouldComponentUpdate để tự code logic so sánh props thay vì dùng shallowCompare:
```
shouldComponentUpdate(nextProps, nextState) {
  return ...my compare logic...;
}

// hoặc ta có thể dùng React.PureComponent thay vì React.Component, mặc định nó sẽ so sánh toàn bộ value của props
class MyComponent extends React.PureComponent { ... }
```

Với functional component, ta có thể dùng memo với tác dụng tương tự:
```
function MyComponent() { ... }

function myCustomDiffLogic() { ... } // cái này sẽ có vai trò như shouldComponentUpdate

memo(MyComponent, myCustomDiffLogic)
```

### How to be faster: how about caching?

Một kĩ thuật na ná computed value ở bên Vuejs, đơn giản chỉ là input và result thành cặp key-value, nếu cùng key thì chỉ việc lôi value ra chứ không cần tính toán lại nữa.
```
function MyComponent({ rawData }) {
  const calculated = veryExpensiveCalculation(rawData);
  return ...
}

// Thêm caching đơn giản
let cache = {};
function MyComponent({ rawData }) {
  let calculated;
  if (caches[rawData.key]) {
    calculated = caches[rawData.key];
  } else {
    calculated = veryExpensiveCalculation(rawData);
    cache[rawData.key] = calculated;
  }
  return ...
}
```

Tuy nhiên, viết kiểu này khá tốn giấy và phải mất công clear cache. React mới đây có tặng thêm hàm helper với tên "useMemo", có tính năng tương tự:
```
function MyComponent({ rawData }) {
  const calculated = useMemo(() => veryExpensiveCalculation(rawData), [rawData.key]);
  return ...
}
```

### How to be faster: preloading?

Ta có thể tranh thủ thời gian lúc App đang chạy nhẹ nhàng không áp lực và tranh thủ render ra các component sẽ dùng, nhưng để nó ẩn đi.
```
function MyFutureComponent({ visible }) {
  ...
  return <div myCssRule={visible}>...
}
```

### How to be faster: act like it is faster but actually not?

Đa phần ta không cần tất-tần-tật cái app được load ra cùng lúc, như vậy thì thời gian init load sẽ rất lâu, ta có thể dùng Lazy-Suspense để load dần từng phần một.
Dù tổng thời gian không thay đổi, nhưng trải nghiệm người dùng sẽ tăng lên rất nhiều.
```
const MyFutureComponentFoo = React.lazy(() => import('./MyFutureComponent'));
const MyFucuteComponentBar = React.lazy(() => import('./MyFutureComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<Spinner />}> // Nếu đến lúc cần mà vẫn chưa load xong thì có thể show tạm ra cái component khác
      <div>
        <MyFutureComponentFoo />
      </div>
    </React.Suspense>
    
    <React.Suspense fallback={<Spinner />}>
      <div>
        <MyFucuteComponentBar />
      </div>
    </React.Suspense>
  );
}
```

Như vậy cách áp dụng nhanh nhất ta có thể nghĩ ra là việc lazy load cho từng url của app hoặc lazy load khi đang chờ api request.

#### Phần tới: xử lí khi form giật lag