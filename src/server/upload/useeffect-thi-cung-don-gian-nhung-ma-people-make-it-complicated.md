*Những ngày đầu đông gõ cửa, tiết trời Hà Nội sao mà đỏng đảnh đến thế. Sáng ra vẫn còn vấn vương những tia nắng ấm, làn gió mơn man mà chiều về đã mang theo cơn mưa nhẹ lất phất. Ấy thế mà Hà Nội vẫn có cho riêng mình sức hút lạ kì. Còn gì tuyệt vời hơn khi cùng homies ghé qua những con phố, nghe hương hoa sữa thoang thoảng, hay "cố tình" đi chậm lại chỉ để ngắm nhìn những gánh cúc họa mi một chút <3* 

![](https://images.viblo.asia/full/752ec301-e939-4fc8-a072-fff422de3533.PNG)

*Chill như vậy, âu cũng là cái cớ để chúng ta cùng ngồi lại trao đổi về một chủ đề nữa trong `ReactJS` đón chào chiếc giao mùa nhỉ =))*

## ◼ Đặt vấn đề

Vẫn là anh bạn mình nhắc tới trong bài viết *[Yêu React chẳng cần cớ, cần hiểu rõ setState() cơ !](https://viblo.asia/p/yeu-react-chang-can-co-can-hieu-ro-setstate-co-63vKjDY6l2R)*, sau hơn năm chinh chiến dự án thì `React` chẳng còn là cái gì đó "xoắn quẩy" với người anh nữa. Ngay ngày hôm qua, còn phím đố mình:
```js
- Tại sao một vài trường hợp hàm trong useEffect() vẫn chạy lại trong khi dependency không hề thay đổi?
```

*Hmm...*
*Không biết có bạn nào gặp trường hợp này chưa?*

Trong bài viết này, chúng ta cùng tìm hiểu về `useEffect()` để giúp mình tìm ra câu trả lời thỏa đáng để `"đá bóng"` lại [ông anh](https://viblo.asia/u/ngduyws) nhé !!!

![](https://images.viblo.asia/e7938467-4dde-4a4b-ab52-41932c88ca4c.png)

## ■ Đối tượng
Bài viết chủ yếu hướng tới các bạn đã nắm được [các `concepts` cơ bản của `ReactJS`](https://reactjs.org/docs/state-and-lifecycle.html) nhưng trong quá trình tìm hiểu còn băn khoăn về `useEffect()` cũng như muốn có cái nhìn rõ nét hơn về `React API` này ^^

*Nhấp ngụm mật ong chanh cho ấm bụng rồi cùng bắt đầu thôiii!* 🍯🍯

## ■ `useEffect()` API

### ■ Tổng quan

Đó giờ `ReactJS` đã hỗ trợ chúng ta khai báo một `component` theo 2 hướng cú pháp:
- Thông qua `Function` 
```js
const FunctionComponent = () => <p>Function Component</p>;
```

- Thông qua `Class`

```JS
class ClassComponent extends React.Component {
  render() {
    return <p>Class Component</p>;
  }
}
```

Ở thời điểm trước đó, `Function Component` chỉ được xem như một kiểu [`Presentation component/Stateless Component`](https://haodev.wordpress.com/2019/02/04/stateful-component-vs-stateless-component/) do chưa được `React` hỗ trợ về việc quản lý `state`, `track life cycles` so với `Class Component`. 

Cho tới `2019`, `Function component` mới thật sự bùng nổ và bắt đầu được sử dụng rộng rãi hơn khi có thêm sức mạnh của `React Hooks` - một nhóm các `APIs` được `ReactJS` trình làng trong  `version 16.8`.

`useEffect()` là một trong số đó. `API này` hỗ trợ chúng ta giải quyết một số thách thức khi làm việc với `life cycle` trong `component`.

*Giờ thì hãy đi vào cú pháp của `useEffect()`😃))*

### ■ Cú pháp
```js
useEffect(callback, dependency);
```

`useEffect()` là một hàm nhận vào `2 tham số`:

- **`Callback`**:
    - Là một hàm:
        - Không nhận tham số.
        - Bên trong chứa các `effects` cần được xử lý; Chúng sẽ được thực thi khi `component` được `mount` ở lần `render-đầu-tiên` và `được-gọi-lại` nếu `một-trong-các-giá-trị` trong mảng `dependency` thay đổi.
        - Luôn trả về hoặc một hàm khác *(gọi là `cleanup`)* hoặc `undefined`.
    - Bắt buộc truyền vào


- **`Dependency`**:
    - Là một mảng gồm các `dependencies`, quyết định việc có gọi lại các `effects` trong `callback` hay không:
        - Nếu không truyền gì thì mặc định, các `effects` sẽ được gọi lại sau mỗi lần `render`.
        - Nếu truyền vào một mảng rỗng `[]` thì `effects` sẽ CHỈ chạy trong lần `render` đầu tiên.

    - Tùy chọn truyền vào hoặc không.


Đâu đó chúng ta đã bắt gặp:

```js
useEffect(() => {
    getPostDetail(id);          // <-- effect
    
    return () => {
        cleanPostDetail();      // <-- cleanup
    }
}, [id]);                       // <-- dependency
```


Theo *[Trang chủ ReactJS](https://reactjs.org/docs/hooks-effect.html)*:
> `The Effect Hook` lets you perform `side effects` in `function components`.

Này là một số `use cases` về các `side effects` thực tế chúng ta thường gặp:
- Thêm `subscriber`, `event listener` cho `element`.
- Gọi dữ liệu từ API sau khi `component` được `render` trong giai đoạn `mounting`.
- Thực thi một `business logic`/`DOM update` nào đó khi `state` hoặc `props` trong `component` thay đổi.
- Tiến hành dọn dẹp, `unsubscribe` các `event listeners` trước đó đã sử dụng trước khi `component` `unmount`.
- ...

<br/>


*Nói như vậy, **liệu rằng `life cycle methods` trong `Class component(CC)` làm được gì thì `useEffect()` trong `Function component(FC)` cũng "cân" được hết hay sao nhỉ!?!***

![](https://images.viblo.asia/full/452d0008-c170-4cfc-aca6-2f36d2e3dd0c.gif)

*Cùng chuyển sang phần tiếp theo để đi tìm câu trả lời!*


## ■ `useEffect()` vs. `Lifecycle methods`

Nếu như bạn đã quen với các `life cycle methods` trong `Class component`, có thể hiểu rằng `useEffect()` là sự kết hợp giữa 3 `methods` là  `componentDidMount()`, `componentDidUpdate()` và `componentWillUnmount()` 😸😸))

Chi tiết được mô tả trong bảng sau:

| **Class Component** | **Function Component** |
| -------- | -------- |
| `componentDidMount(){ effects() }`     | `useEffect(() => { effects() }, [])`  |
| `componentDidUpdate(){ effects() }`   | `useEffect(() => { effects() }, dependencies)`  |
| `componentWillUnmount(){ cleanup() }`     | `useEffect(() => () => { cleanup() }, [])`  |

[Open in CodeSandbox ▷▷▷](https://codesandbox.io/s/techpost-useeffect-api-97gj0?file=/src/components/LifecyclesOrder.js)

*Nếu muốn tìm hiểu thêm về phần này, bạn có thể tham khảo trên *[Trang chủ React](https://reactjs.org/docs/getting-started.html)* hoặc nghía qua [chiếc slide trong một seminar giới thiệu chung về hooks](https://docs.google.com/presentation/d/1W0XCQlCHsEc08s47Oam0teVi1sydtYhtRQQKgYR1xQg/edit#slide=id.ge7b2914d9a_0_199) mình làm cho `team` gần đây nhé ^^*

*Giờ thì điểm qua một số vấn đề thường gặp khi làm việc với `useEffect()`!*

## ■ Các vấn đề thường gặp

Như đã đề cập ở trên, thay vì:
```js
useEffect(callback);
```
thì với cú pháp
```js
useEffect(callback, dependency);
```
chúng ta có thể kiểm soát những lần gọi lại `callback` không cần thiết của `component`.

Các giá trị được sử dụng bên trong `useEffect()` và nằm trong `component` nên được truyền vào `dependency`. Nếu chưa quen, thời gian đầu chúng ta có thể nhờ tới sự hỗ trợ của **[`Lint Tools`](https://www.npmjs.com/package/eslint-plugin-react-hooks)**:
> We provide `the exhaustive-deps ESLint rule` as a part of the `eslint-plugin-react-hooks` package to find components that don’t handle updates consistently.

Giờ thì xem qua một ví dụ:
```js
useEffect(() => {
    getPostDetail(id);
}, [id]);  
```

Này thì dễ rồi nhỉ 😸😸
`getPostDetail()` sẽ chạy trong lần `render` đầu tiên và được gọi lại nếu như giá trị `id` thay đổi.

*Hmm...*

**Dựa vào đâu để `React` phát hiện được "sự thay đổi" *(`change detection`)*?**

`React` sẽ so sánh `id` hiện tại và `id` ở lần `render` ngay trước đó.

**Vậy nếu nó là một `Object` hay `Function` thì sao?** 🙂))

Trong `JavaScript`, chúng ta biết rằng khi so sánh:

```JS
// Primitive values
const prevURL = 'https://haodev.wordpress.com';
const currURL = 'https://haodev.wordpress.com';
prevURL === currURL    // TRUE

// Reference values
const prevBlog = { name: 'Make It Awesome' };
const currBlog = { name: 'Make It Awesome' };
prevBlog === currBlog  // FALSE
```

Ở một số trường hợp thực tế, `Dependency` có thể là 1 mảng các `props`, `state`, thậm chí là một `function`, như vậy thì sẽ không thể tránh khỏi việc `trigger` `effects` thừa thãi.

*Cùng đi vào chi tiết nhé!*

<br/>

### ■ `Dependency` chứa `object`

```js
const ObjDependency = () => {
  const [vote, setVote] = useState({
    value: 0,
  });

  useEffect(() => {
    console.log("Component is invoked when vote changes");
  }, [vote]);

  return (
    <>
      <p>Vote value: {vote.value}.</p>
      <button onClick={() => setVote({ value: 0 })}>Set vote = 0</button>
    </>
  );
};
```
Lúc này, dù `vote.value` vẫn bằng `0` nhưng chuỗi `Component is invoked when vote changes` vẫn sẽ được `log` ra khi ta `click` vào `button` 😿😿

![](https://images.viblo.asia/full/29ad79f6-3411-4167-b694-38a63e39fcfb.PNG)


Để xem nào, chúng ta sẽ có một vài hướng tiếp cận để xử lý như sau:

- **Chỉ thêm những giá trị `property` thật sự cần thiết**


```js
useEffect(() => {
    console.log("Component is invoked when vote.value changes");
}, [vote.value]);
```

Truyền `vote.value` vào mảng `dependency` thay vì đưa cả `object` `vote` vào như trước.

Song, chẳng phải lúc nào `value` cũng tồn tại trong `vote` *(optional property)* hoặc nếu `object` đó có nhiều `properties` thì ta phải liệt kê hết vào hay sao? 🙃🙃))

Đến đây thì có thể tham khảo 03 cách tiếp theo:

- **Sử dụng `JSON.stringify()`**
```js
useEffect(() => {
    console.log("Component is invoked when JSON.stringify(vote) changes");
}, [JSON.stringify(vote)]);
```

- **Kết hợp `useRef()` and một số `helpers` hỗ trợ so sánh `object`**

```js
const useDeepCompareWithRef = (value) => {
    const ref = useRef();
    // Hoặc 1 helper deep comparison 2 objects thay vì lodash _.isEqual()
    if (!_.isEqual(value, ref.current)) {
        ref.current = value;
    }
    return ref.current;
};

useEffect(() => {
     console.log("Component is invoked when vote changes with useDeepCompareWithRef()");
}, [useDeepCompareWithRef(vote)]);  
```


- **Dùng `use-deep-compare-effect`**

Tới đây, nếu `object` của chúng ta vẫn quá phức tạp để so sánh *(thông thường thì không tới mức đó, hoặc chỉ đơn giản là bạn muốn kế thừa `open source` sẵn có 😸😸)* thì có thể tham khảo  [`package này`](https://www.npmjs.com/package/use-deep-compare-effect). 

Chỉ cần thay `useEffect()` bằng `useDeepCompareEffect()` là mọi thứ ổn thỏa, chẳng cần `"xoắn quẩy"` nữa:
```js
import useDeepCompareEffect from 'use-deep-compare-effect';

useDeepCompareEffect(() => {
    console.log("Component is invoked when vote changes with useDeepCompareEffect()");
},[obj])
```

<br/>

### ■ `Dependency` chứa `function`

Xét một trường hợp dưới đây:

```js
const FuncDependency = ({ data}) => {
    const doSomething = () => { console.log(data); };

    useEffect(() => {
        doSomething();
    }, []);
    // ...
};
```

`doSomething()` sử dụng `props` `data`, nhưng `data` lại không nằm trong `dependency`. Điều này dẫn tới việc khi ai đó cập nhật `data`, `doSomething()` sẽ không được gọi lại.

Theo *[Trang chủ React](https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)*:
> It is only safe to `omit a function` from the `dependency list` if `nothing-in-it` *(or the functions called by it)* references props, state, or values derived from them.
> 
> The recommended fix is to `move that function inside of your effect`. 

Do đó, trong trường hợp này, chúng ta có thể định nghĩa `doSomething` bên trong `useEffect()` rồi gọi luôn.

Thực tế trong dự án, chúng ta thường tách các `requests`, `logics`, `UIs`, `helpers` thành các `files` độc lập để thuận tiện cho việc tái sử dụng và viết `unit test` hoặc hàm đó là một `props` nhận từ `component cha` 😸😸.

![](https://images.viblo.asia/full/1a2a9f33-4f2e-4471-982d-1176325f0f22.gif)

Cùng đi tới một ví dụ nữa, chúng ta có `02 components`: `Parent` và `Child`:
- `Parent` là component cha của `Child`
- `Parent` truyền 2 hàm `updateAnyStates` và `updateCounter` xuống `Child`

như đoạn `code` dưới đây:
```js
const Parent = () => {
    const [counter, setCounter] = useState(0);
    const [anotherState, setAnotherState] = useState(0);

    const doSTOnAnyChange = () => { console.log("doSTOnAnyChange runs on ANY changes") };
    const doSTOnCounterChange   = () => { console.log("doSTOnCounterChange should run on COUNTER changes") };

    return (
        <>
          <button onClick={() => setCounter(counter + 1)}>Update counter state</button>
          <button onClick={() => setAnotherState(anotherState + 1)}>Update a different state</button>
          <Child doSTOnAnyChange={doSTOnAnyChange} doSTOnCounterChange={doSTOnCounterChange} />
        </>
    );
}
```

```js
const Child = ({ doSTOnAnyChange, doSTOnCounterChange }) => {
    useEffect(() => {
        doSTOnAnyChange();
    }, [doSTOnAnyChange]);

    useEffect(() => {
        doSTOnCounterChange();
    }, [doSTOnCounterChange]);

  return <p>Child</p>;
}
```

**Cùng đoán xem điều gì sẽ xảy ra khi chúng ta click vào 2 `buttons` nào?**

![](https://images.viblo.asia/full/452d0008-c170-4cfc-aca6-2f36d2e3dd0c.gif)

Luôn có 2 chuỗi 
```js
> doSTOnAnyChange runs on ANY changes
> doSTOnCounterChange should run on COUNTER changes
```
được `log` dưới cửa sổ `Console`, điều này nghĩa là, khi `Parent` `re-renders`,  `Child` nhận thấy sự thay đổi của cả  `updateAnyStates`, `updateCounter`. 

Thực tế thì hàm `doSTOnCounterChange` - đúng như tên gọi của nó - chỉ cần chạy lại khi có sự thay đổi của `state couter` thôi.

Tới đây thì **`useCallback()` được sinh ra cho "đời bớt khổ"**, hạn chế những lần chạy không cần thiết 😸😸

Chỉ cần thay đổi một chút khi khai báo hàm `doSTOnCounterChange`:
```js
const doSTOnCounterChange = useCallback(() => {
    console.log("doSTOnCounterChange should run on COUNTER changes");
}, [counter]);
```


Tương tự với cú pháp của `useEffect()`, `useCallback()` cũng nhận vào 2 tham số: `callback` và `dependency`.

> `useCallback()` will return `a memoized version of the callback` that `only changes-its-identity if any of the dependencies has changed`, ensuring we don't create a new instance of the function every time the parent re-renders.


Với `useCallback()`, chẳng cần phải lo nghĩ `doSTOnCounterChange ` bị tạo lại mỗi lần `Parent` `re-renders` nữa 😸😸 

Thử chạy lại và cảm nhận nhé 😽😽

`Source code` trong các ví dụ ở các mục trên, bạn có thể [vào đây tham khảo](https://codesandbox.io/s/techpost-useeffect-api-97gj0?file=/src/App.js:449-456) ^^

*Xong rồi thì cùng đi  tiếp `02 lưu ý nhỏ xíu xiu` nữa nào!*

<br/>

### ■ Infinite loop

Một vòng lặp vô hạn *(`infinite loop`)* có thể được tạo ra và dẫn đến các lỗi không mong muốn trong một vài trường hợp chúng ta `trigger` một vài sự kiện làm `component re-renders` *(`props` hoặc `state` thay đổi)* bên trong `useEffect()`.

Quan sát ví dụ dưới đây:
```js
const InfiniteLoop = () => {
    const [value, setValue] = useState("");
    const [count, setCount] = useState(-1);

    useEffect(() => {
        setCount(count + 1);
        console.log("Infinite Loop is created & go on ...");
    });
 
  return (
    <input type="text" value={value} onChange={({ target }) => setValue(target.value)} />
  );
};
```

Khi `component` thay đổi giá trị trường `input` ⇒ kích hoạt sự kiện `onChange` ⇒ `setValue()` được gọi ⇒ `Component` được `re-render` ⇒ `callback` trong `useEffect()` được gọi lại ⇒ `setCount` chạy ⇒ `component` lại `re-render` ⇒ `callback` trong `useEffect()` được gọi lại ⇒ `setCount` chạy ⇒ .... 😵😵

Cứ như vậy, một vòng lặp vô hạn được tạo ra.

![](https://images.viblo.asia/full/d1fd6a00-ef54-4952-8a87-cad3e70ce3aa.PNG)

Hướng giải quyết thì có thể chọn cách thêm `dependency` vào `params thứ 2` của `hook` này:
```js
useEffect(() => setCount(count + 1), [value]);
```

Do đó, trong quá trình làm việc, chúng ta cần hiểu rõ cơ chế hoạt động của `useEffect()` và `ReactJS lifecycle` để có thể nắm rõ được luồng chạy của ứng dụng ^^

<br/>

### ■ Parent Effect vs. Child Effect

Giờ thì chúng ta có `02 components`:
```js
const ParentComponent = () => {
    useEffect(() => { console.log('Parent Component') });
    return <ChildComponent />;
}

function ChildComponent() {
    useEffect(() => { console.log('Child Component') });  
}
```

Khi `ParentComponent` được `render`, chuỗi `Child Component` sẽ được `log` ra trước `Parent Component`.

*Hmm...*
*Qua đây thì cần lưu ý gì không nhỉ?*

Giả sử chúng ta cần làm chức năng **`Tự động thanh toán`**. Đoạn `code` xử lý này được viết trong `component con` sau mỗi lần `render`. Trong khi đó, thông tin hóa đơn *(tổng chi phí, thông tin giảm giá, tổng thanh toán hay các chi tiết bắt buộc khác)* lại được xử lý trong `effect` của `component cha`!?!

Như vậy thì có gì đó `"chưa ổn"` rồi, thanh toán không thành công 😹😹

Thông qua ví dụ này, điều mình muốn nhấn mạnh là, ngoài việc nắm rõ được thứ tự `lifecycle-trong-1-component`, chúng ta cũng cần lưu ý một chút về `tương-quan-lifecycle-giữa-các-components` để có thể xây dựng một cấu trúc `components` phù hợp nhaaa <3 


 ## ■ Kết
Như vậy là chúng ta đã cùng nhau điểm qua cơ chế hoạt động của `useEffect()` và một số trường hợp thú vị xung quanh nó rồi.

Hy vọng rằng bài viết này có thể giúp ích được các bạn đang tiếp cận với `ReactJS`, từ đó có thể hiểu về luồng của ứng dụng và kiểm soát được một số lỗi liên quan tốt hơn. 

![](https://images.viblo.asia/full/752ec301-e939-4fc8-a072-fff422de3533.PNG)

Cảm ơn các bạn đã đọc bài chia sẻ này. Tặng mình **`1 upvote`** để có thêm động lực cho những bài viết sắp tới nhé 😺😺

<br/>


#### Và trong thời điểm hiện tại thì...

Mặc dù thời gian này *(thời điểm mình `publish` bài viết, 01/12/2021)*, `Hà Nội` đã nới lỏng giãn cách xã hội và việc tiêm `vaccine Covid-19` cũng đã được triển khai, song, chúng ta cũng chưa thể chủ quan, hãy tiếp tục tuân thủ quy tắc  `5K` được `Bộ Y tế` khuyến cáo:
```py
#Coronavirus #5K #BoY Te
Khẩu trang - Khử khuẩn - Khoảng cách - Không tập trung - Khai báo y tế
```
để có thể giữ an toàn cho bản thân và mọi người xung quanh 😺😺

![](https://images.viblo.asia/full/bcac0ae4-37b9-4f82-a75a-8dc9bbdd51ba.gif)

*Chúc các bạn ngày làm việc hiệu quả! Tiện ghé qua [**nhà mình**](https://haodev.wordpress.com/) chơi một chút rồi về!*
 
## ■ Credits

- **Resources: [React document](https://reactjs.org/docs/getting-started.html), [1st Dev.to](https://dev.to/nibble/what-is-useeffect-hook-and-how-do-you-use-it-1p9c), [2nd Dev.to](https://dev.to/vsramalwan/ways-to-handle-deep-object-comparison-in-useeffect-hook-1elm), [Kênh thời tiết](https://kenhthoitiet.vn/co-mot-ha-noi-am-uong-nhung-lai-dep-den-nao-long-vao-mua-hoa-thang-3-146332/), [
Better Programming](https://betterprogramming.pub/tips-for-using-reacts-useeffect-effectively-dfe6ae951421), [Codeburst](https://codeburst.io/advanced-react-hooks-deep-dive-into-useeffect-hook-18470266047d).**
- **Poster & thumbnail: [Bước Qua Nhau / Vũ. (Live Session trên tàu Cát Linh - Hà Đông)
](https://www.youtube.com/watch?v=Vdm6i1m4tDE).**
- **Policies:**
    - [**This original article from My Make It Awesome blog**](https://haodev.wordpress.com/2021/12/01/useeffect-thi-cung-don-gian-nhung-ma-people-make-it-complicated/).
    - **Use my contents for sharing purpose, please attached resource linked to [my blog](https://haodev.wordpress.com).**
    - **Use my contents for trading purpose, please [contact me](https://haodev.wordpress.com/me/).**
    - **Support: [Buy me a pizza](https://www.buymeacoffee.com/haolt).**
- **Copyright:** **The posts in a spirit of sharing knowledge. If there is anything with regard to copyright of your contents, please [contact me](https://haodev.wordpress.com/me/).**

<br/>


***Happy coding!***