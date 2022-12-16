## ■ Intro.


Đợt này mình làm việc tại nhà, ở quê giờ cũng đang vụ mùa. Sau một tối chạy mưa té khói, trời nhỏ cho vài giọt như bình xịt hoa thì xong đâu lại vào đấy. Có khi nay còn nóng "rực rỡ" hơn :joy::joy: 

Lại nói đến mưa mùa Hạ, chẳng mong thì nó ào ào như vũ bão. Mà đợi hoài thì mất tăm mất tích luôn, nói như [Đen Vâu](https://www.youtube.com/channel/UCWu91J5KWEj1bQhCBuGeJxw) bây giờ thì:
```js
- Anh đi tìm thì mưa lại trốn, anh đi trốn thì mưa chẳng tìm...
```

Quay trở lại với câu chuyện lập trình của chúng ta, `coding` & `unit testing` cũng như cặp `kẻ trốn - người tìm` trong mỗi giai đoạn phát triển phần mềm vậy.

Đó giờ các vấn đề xoay quanh `coding` chiếm `spotlight` nhiều rồi, hôm nay cùng mình tìm hiểu về chủ đề `unit testing` - cụ thể là **Áp dụng `Enzyme` để thực hiện `unit test` trong dự án `ReactJS`** nhé :smile::smile:))


![](https://images.viblo.asia/f994e929-347d-42e1-81cb-3e001cb8e070.png)


## ■ Target

Bài viết này gồm `02` phần chính:
- **Giới thiệu về `Enzyme`**.
- **Áp dụng `Enzyme` trong dự án `ReactJS`**.

Do vậy, những bạn đã có kiến thức cơ bản về `React` và đang muốn tìm hiểu về `unit test` trong `ReactJS components` là một trong những đối tượng chính của bài viết nhaa ^^

*Bây giờ thì hãy bắt đầu thôiii !*

![](https://i.imgur.com/mfpmwki.gif)

## ■ Enzyme

*Theo [Trang chủ](https://enzymejs.github.io/enzyme/):*

> `Enzyme` is `a JavaScript Testing utility` for `React` that makes it easier to test your `React Components`' output.


`Enzyme` - thư viện được phát triển bởi nhà [`Airbnb`](https://airbnb.io/) - thông qua đa dạng các hàm từ *`render` các `components` cho tới tìm kiếm hay tương tác sự kiện với các `elements`* đã giúp cho việc thực hiện `unit test` trở nên dễ dàng hơn.

```js
- Ngại gì vết bẩn vì đã có Enzyme <3
```

Trong `Coding`, khi phát triển một nghiệp vụ nào đó, chúng ta thường xác định `03` câu hỏi:
- `Input?`
- `Output?`
- `How to implement?`.


Với `Unit testing` cũng như vậy. `"Một kịch bản"` sẽ được mô tả thông qua:
```js
describe("NAME_1", () => {
    test("CASE_1", () => { /* ... */ });
    test("CASE_2", () => { /* ... */ });
    // ...
});

describe("NAME_2", () => { /* ... */ });
// ...
```
 
 *Để làm rõ điều này, cùng bắt tay vào ví dụ thực hành dưới đây ^^*

## ■ Practices

### ■ Init

Khởi tạo một dự án `ReactJS` thông qua [`Create React App`](https://create-react-app.dev/docs/getting-started/):
```js
npx create-react-app PROJECT_NAME
```

Ta được cấu trúc thư mục như sau:
```py
■ PROJECT_NAME
└──────────── ■ src
│            ├──────────────── 📋 App.js
│            ├──────────────── 📋 App.test.js
│            ├──────────────── 📋 setupTests.js
│            ├──────────────── ...
├──────────── 📋 package.json
│...
```
Tiếp theo, tiến hành cài đặt các `devDependencies` cần thiết:

```js
yarn add --dev enzyme enzyme-adapter-react-16
```

Để chạy lệnh `test`, chúng ta sử dụng câu lệnh:
```js
yarn test
```
*Tahdaahh!!*

Kết quả tương tự như vầyy: `PASS`

![](https://images.viblo.asia/43010fc2-9751-43f3-b666-9c06ca8543dd.png)

### ■  Coding - Config

Trên cơ sở tập trung giới thiệu về `Enzyme` *(bỏ qua câu chuyện `"code first - test last"` hay `"code last - test first"`)*, chúng ta xét một ví dụ về `Counter` đơn giản:

```jsx:App.js
function App() {
    const [counter, setcounter] = useState(0);
    
    return (
        <div>
            <h1>This is counter app</h1>
            <div id="counter-value">{counter}</div>
            <button id="increment-btn" onClick={() => setcounter(counter + 1)}>
                Increment
            </button>
            <button id="decrement-btn" onClick={() => setcounter(counter - 1)}>
                 Decrement
            </button>
        </div>
    );
}
```

Trước khi vào phần tiến hành viết `test` cho `component` này, hãy thêm `config`:
```js:setupTests.js
import "@testing-library/jest-dom/extend-expect";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter(
});
```

*Được rồi, bắt đầu `test` nhé ^^*

![](https://i.imgur.com/zwZtyMJ.gif)

### ■ UI Testing
Chúng ta tiến hành `test` mặt `UI`*(User Interface)* trước như *kiểm tra `text value`, `status` trên `User Interface`, etc*.

#### Check text element

```js:App.test.js
import { configure, shallow } from "enzyme";

describe("Counter Testing", () => {
    test("render the title of counter", () => { 
        const wrapper = shallow(<App />);
        expect(wrapper.find("h1").text()).toContain("This is counter app");
    });
});
```

Lưu ý một chút,`shallow()` là một hàm trong `Enzyme` - nhận `params` là một `ReactElement` và trả về là một `wrapper instance around-rendered-output`.

Hàm `.find()` là một trong số `medthod` của `instance` này:
```js
wrapper.find("h1").text()
```

<br/>

Tương tự, chúng ta tiến hành `test` `button`:
```js:App.test.js
describe("Counter Testing", () => {
    // ...
    test("render a button with text of `increment`", () => { 
        const wrapper = shallow(<App />);
        expect(wrapper.find("#increment-btn").text()).toBe("Increment");
    });
    // test("render a button with text of `increment`", ...)
});
```

### ■ Logic Testing
Giả sử chưa kể các `specs` phát sinh, chúng ta có `03 cases` cơ bản:
- Case 1: Giá trị ban đầu của `count` là 0.
- Case 2: Khi nhấn vào `Increace` thì giá trị `count` tăng lên 1 đơn vị.
- Case 3: Khi nhấn vào `Decreace` thì giá trị `count` giảm xuống 1 đơn vị.


#### Case 1:
```js
describe("Counter Testing", () => {
    // ...
    test("render the initial value of state in a div", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find("#counter-value").text()).toBe("0");
    });
});
```

#### Case 2:
```js
describe("Counter Testing", () => {
    // ...
    test("render the click event of increace button and decrement counter value", () => {
        const wrapper = shallow(<App />);
        wrapper.find("#increment-btn").simulate("click");
        expect(wrapper.find("#counter-value").text()).toBe("1");
    });
});
```
  
#### Case 3:

```js
describe("Counter Testing", () => {
    // ...
    test("render the click event of decrement button and decrement counter value", () => {
        const wrapper = shallow(<App />);
        wrapper.find("#increment-btn").simulate("click");
        expect(wrapper.find("#counter-value").text()).toBe("1");
        
        wrapper.find("#decrement-btn").simulate("click");
        expect(wrapper.find("#counter-value").text()).toBe("0");
    });
});
```

*Như đã được mô tả trong ví dụ, *`find()`, `.text()`, `.simulate()`,...* là một số hàm được sử dụng phổ biến trong `Enzyme`. Ngoài ra, bạn có thể tham khảo thêm [tại đây](https://enzymejs.github.io/enzyme/docs/api/).*

<br/>

#### Challenge
Dựa vào đa dạng các `utilities` kể trên, mình có một `challenge` dành cho các bạn:
```JS
Specs thay đổi:
- Giá trị nhỏ nhất `count` có thể nhận là `0`.
- Khi `count = 0` thì `Decreace` sẽ bị `disabled`.
```
*Hãy tham khảo phía trên rồi tự mình xử lý `logic` & hoàn thành đoạn `unit test` này nhaaa ^^*

### ■ Refactor
#### beforeEach() || afterEach()

Trong mỗi `test(CASE_i)`, dòng:

```js
const wrapper = shallow(<App />);
```
luôn bị lặp đi lặp lại :sob::sob:

Để xử lý vấn đề này, bên `Enzyme` có hàm `beforeEach()` với cách dùng rất đơn giản:
```js
describe("Counter Testing", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<App />);
    });
    
    // test(CASE_i) deleted the line `const wrapper = shallow(<App />);`
});
```

Tương tự với `afterEach()`:

```js
describe("Counter Testing", () => {
    // beforeEach
    
    afterEach(() => {
        wrapper.unmount();
    });
  
    // test(CASE_i)
});

```

<br/>

#### shallow() vs. mount()

Một ứng dụng thì có thể có nhiều `modules` kèm vô số các `components`. Do đó, trong ví dụ trên, chúng ta tách `Counter component` khỏi `App`:
```jsx
const App = () => (
    <div className="App">
        <Counter />
    </div>
);

const Counter = () => { /* title, count và 2 button về counter như trên */ };
```

Đến đây thì thấy bị báo `FAIL test`.
Vào ngay `App.test.js` đổi `.shadow()` thành `.mount()` thì báo `PASS test` như cũ.

<br/>

**Như vậy, `shallow()` liệu có khác so với `mount()`?**

Có thể nhận ra ngay điểm khác biệt giữa hai hàm này khi `log` luôn nè:
```js:App.test.js
shallowWrapper = shallow(<App />);
console.log(shallowWrapper.debug());
```
```html:Terminal
// RESPONSE: shallowWrapper
<div className="App">
  <Counter />
<div>
```
Còn với `mount()` thì:

```js:App.test.js
mountWrapper = mount(<App />);
console.log(mountWrapper.debug());
```

```html:Terminal
// RESPONSE: mountWrapper
<div className="App">
  <Counter>
    <div>
      <h1>This is counter app</h1>
      <div id="counter-value">{counter}</div>
      <button id="increment-btn">Increment</button>
      <button id="decrement-btn">Decrement</button>
    <div>
  <Counter>
<div>
```

Ngoài `mount()`, `shadow()`, chúng ta còn 1 hàm nữa là `render()`. Một bảng mô tả sự khác biệt giữa chúng:



| Utils| mount() | render() | shadow() |
| -------- | -------- | -------- | -------- |
| **Render**     | Full DOM     |  `static HTMLs` | chỉ `"render"` ra một `component` đang `test` mà không bao gồm các `component con`,  tạo sự tách biệt việc `test` trên từng `component-độc-lập`    |
| **Common use**       | Integration Test |  Integration Test| Unit Test |

<br/>

*Trên đây là một số thông tin cơ bản về `Enzyme` cũng như cách sử dụng. Để tìm hiểu & trải nghiệm thêm những `Unit Test Challenges` phức tạp & thú vị, bạn có thể đọc thêm [tại đây](https://enzymejs.github.io/enzyme/docs/api/) nhé!*

 ## ■ Sumup
 
Yayyy, vậy là chúng ta đã cùng nhau tìm hiểu về `Enzyme` và thử viết một chút `unit test` trong `React component` rồi nè  🎉🎉

Bên cạnh một số thư viện`testing` phổ biến khác như `Jest`, `Enzyme` với sức mạnh của mình cũng có thể xem như một trong những mảnh ghép quan trọng trong hệ sinh thái `React`. 

![](https://i.imgur.com/rX3cvsB.gif) 


Mình cảm ơn các bạn vì đã đọc bài viết này và hy vọng rằng nó có thể mang lại được giá trị nào đó.



Tặng mình **`1 upvote`** để có thêm động lực cho những bài viết sắp tới nha <3

<br/>

#### Và trong thời điểm hiện tại thì...

Hãy cùng nhau thực hiện quy tắc  `5K` được `Bộ Y tế` khuyến cáo:
```py
#Coronavirus #5K #BoY Te
Khẩu trang - Khử khuẩn - Khoảng cách - Không tập trung - Khai báo y tế
```
để có thể giữ an toàn cho bản thân và mọi người xung quanh nhé 😺😺

*Chúc các bạn cuối tuần vui vẻ ^^*
 
## ■ Credits

- **Resources: [React's Official document](https://reactjs.org/docs/getting-started.html), [Jest's Official document](https://jestjs.io/), [Enzyme's Official document](https://airbnb.io/enzyme/), [Thời tiết Hà Nội page](https://www.facebook.com/thoitietHN), [
Bitfumes](https://www.youtube.com/watch?v=-bmdf1oATQo).**
- **Poster & thumbnail: [Điều nhỏ xíu xiu page](https://www.facebook.com/dieunhoxiuxiu/posts/2939811016232025), [Đen - Trốn Tìm ft. MTV band (M/V)](https://www.youtube.com/watch?v=Ws-QlpSltr8).**
- **Policies:**
    - [**This original article from My Make It Awesome blog**](https://haodev.wordpress.com/2021/06/01/react-tim-thi-enzyme-tron-react-tron-enzyme-van-tim/).
    - **Use my contents for sharing purpose, please attached resource linked to [my blog](https://haodev.wordpress.com).**
    - **Use my contents for trading purpose, please [contact me](https://haodev.wordpress.com/me/).**
- **Copyright:** **The posts in a spirit of sharing knowledge. If there is anything with regard to copyright of your contents, please [contact me](https://haodev.wordpress.com/me/).**

<br/>


***Happy coding !***