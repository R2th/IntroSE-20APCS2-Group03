Những chuỗi ngày cận Tết, quây quần bên gia đình, bên nồi bánh xanh đỏ lửa, nghi ngút khói mà thấy hạnh phúc vô cùng. Lại còn hì hục nướng củ khoai, bắp ngô, mặt đen nhẻm mà rộn ràng tiếng nói cười. 😽😽 

Ngẫm lại thì, vèo cái đã hết một năm. Cảm ơn thật nhiều những người thân ở bên cạnh, những người anh chị em tuyệt vời luôn sát cánh và những trải nghiệm thú vị trong năm qua.

Chia tay năm cũ, chào đón năm *Nhâm Dần* với những thử thách và mục tiêu mới. Tết năm nay thì đúng vị rồi, rét chút và có tí mưa xuân nữa 💦💦

**Chúc cho tất cả chúng ta bắt đầu một năm *Nhâm Dần 2022* với nhiều điều thật mới mẻ, thật thành công, thật bình yên và thật vui tươi nhé** <3 <3 <3

![](https://www.dropbox.com/s/45d2r6mu7wc7kbx/chucmung.gif?dl=1)

## ◼ Đặt vấn đề

Từ ngay đầu tháng qua, *[chú Đen](https://www.youtube.com/channel/UCWu91J5KWEj1bQhCBuGeJxw)* đã dặn dò các *Đồng âm*:

```js
- Mang tiền về cho Mẹ, đừng mang ưu phiền về cho mẹ ~~
```

*Chú Đen* mang tiền về cho mẹ thì rõ ràng rồi. Hưởng ứng chia sẻ của chú, chị gái ngồi cạnh mang quà về cho mẹ, anh trai phía sau mang con dâu về cho mẹ, genZ em kề cạnh thì nhất quyết mang khẩu trang về cho mẹ, *blabla*... 😸😸

Quay trở lại với  `ReactJS` của chúng ta, không biết `JSX` nhà mình mang lại điều gì cho chiếc thư viện này nhỉ? Điều gì thật sự diễn ra sau những đoạn mã `JSX` đó...*(suynghiii)*

Khởi động năm mới với chiếc chủ đề nhẹ nhàng này cùng mình nhé 😽😽))

![](https://images.viblo.asia/798a9280-21f3-4e9d-9c43-de83cac8efb0.png)

## ■ Đối tượng
Bài viết chủ yếu hướng tới các bạn đã và đang tìm hiểu về [ReactJS](https://reactjs.org), nhưng trong quá trình tiếp cận `JSX` còn băn khoăn cũng như muốn có cái nhìn rõ nét hơn về nó.

*Trong bài viết này, chúng ta sẽ cùng nhau điểm qua `03 phần`:*

🔗 **Overview - Tổng quan JSX** 

🔗 **Behind the scene - Những gì diễn ra phía sau JSX**

🔗 **Common issues - Một số vấn đề thường gặp với JSX**

<br/>

*Đầu tiên, cùng nhau xem lại `JSX` một chút! 😺😺*

## ■ Overview

Theo *[Trang chủ](https://reactjs.org/docs/introducing-jsx.html)*:

> `JSX` is `a syntax extension` to `JavaScript`.

Là cú-pháp-mở-rộng của `JavaScript`, `JSX` cho phép chúng ta mô tả `DOM tree` của ứng dụng một cách ngắn gọn và quen thuộc.

Như ngay chính *[JSX Spec](https://facebook.github.io/jsx/)* của *`React team`* cũng đã đề cập:

> (JSX)…to define `a concise and familiar syntax` for defining `tree structures` with `attributes`.

Và cũng chính vì quá đỗi gần gũi như vậy, dẫn đến một-hiểu-lầm-khá-phổ-biến với các bạn tiếp cận với `React` rằng: *`JSX` là `HTML`*.

Thoáng nhìn qua, cứ ngỡ một biến `JavaScript` lại được gán giá trị là một thẻ `HTML` 😹😹:

```jsx
const blogTitle = <h1>Make It Awesome</h1>;
```

Một điều lưu ý, `JSX` không phải là kiểu `JavaScript` tương thích với trình duyệt. Nghiễm nhiên, trình duyệt của không thể hiểu được đoạn mã này 😵😵. Đó là lý do chúng ta cần có `Babel`.

![](https://www.dropbox.com/s/0gmw703soghmeuj/khongphaiem.gif?dl=1)

Nói qua chút thì **`Babel` là một `JavaScript compiler/transpiler`** giúp chúng ta dịch đoạn `JSX` trên thành `JavaScript thuần` *(có thể [ghé đây](https://haodev.wordpress.com/2019/03/07/relationship-js-ecmascript/) nếu muốn tìm hiểu thêm nha)* - đến đây thì quá là `easy game` cho trình duyệt rồi 😽😽

Quá trình chuyển đổi này diễn ra trong `build process`, do đó, trình duyệt sẽ không biết được sự có mặt của `JSX` ngay từ đầu, thứ nó nhận được là một `object` mô tả cấu trúc của ứng dụng 😸😸.

Hơn nữa, với một vài tính năng mới của `ECMAScript 6`, một số trình duyệt cũ hơn vẫn chưa hiểu được, do đó, vẫn cần có `Babel compiler`.

*Giờ thì cùng xem thử `Babel` làm như  nào để được `object` đó nhé (go).*

## ■ Behind the scene
### ■ JSX to JS

Với `component Blog`:

```jsx
const Blog = () => (<h1>Make It Awesome</h1>);
```

sẽ được dịch thành:
```js
const Blog = () => React.createElement(
    'h1',
    null,
    'Make It Awesome'
);
```

Dĩ nhiên, khi ta viết thẳng `React.createElement()` mà không dùng `JSX` thì `component Blog` vẫn cho cùng một kết quả tương tự.

Song, với một đoạn mã nhỏ xíu như trên thì việc dùng `JSX` hay `React.createElement()` đều ổn hết.

![](https://www.dropbox.com/s/2zcthcrh2iwz4rh/no2.gif?dl=1)

Trải nghiệm với  `React.createElement()` sẽ kém cạnh hơn khi `components` có `logic` quá phức tạp hoặc các `elements` lồng nhau đa cấp. Trông khá khó đọc và khó bảo trì. Có lẽ `JSX` sẽ nâng cao chất lượng trải nghiệm của `dev` hơn - mang theo sức mạnh của `HTML` và `JavaScript`.

*Để xem thêm cách chuyển đổi từ JSX sang React.createElement() như thế nào, bạn có thể ghé [qua đây](https://babel-repl-clone.vercel.app/) thử với các đoạn JSX cụ thể nha. 😉😉*


### ■ React.createElement() API

Cú pháp của `React.createElement() API`:

```JS
React.createElement(type, [props], [...children]);
```

Cùng xem qua các tham số của `API này`:

- **`type`**: có thể là `HTML tag` *(`div`, `h1`, etc.)*, `React fragment` hoặc `React component` của `element`.
- **`props`**: `null` hoặc một đối tượng chứa các thuộc tính của `element`.
- **`children`**: là các `HTML tags` hoặc `React components` con của `element`; trường hợp có nhiều `children`, sử dụng `array`


`React.createElement` sẽ tạo ra một `object` đại diện cho `element` đó:

```js
{   
    type: 'h1',   
    props: {     
        children: 'Make It Awesome',
        ...
    }
    ...
}
```

Chúng ta có thể xem chi tiết các `property` của `object này` bằng cách `log` ra cửa sổ `Console`:

```jsx
const Blog = () => {
    const blogTitle = <h1>Make It Awesome</h1>;
    console.log(blogTitle);
    return blogTitle;
};
```

*[Open in ⇱Code Sandbox](https://codesandbox.io/s/makeitawesome-haodev-codes-jsx-1st95).*

Kết quả cho ra một `plain JavaScript object` - được gọi là `React element` - mô tả chính xác những gì được hiển thị lên màn hình.

![](https://www.dropbox.com/s/so22jfd24lpsm9f/lamsao.gif?dl=1)

FYI, có thể nói, `React elements` - đại diện cho `HTML elements` *(nằm trên `Original DOM`)* - nằm trên `Virtual DOM`. `React` dựa vào các `React elements`  để tạo `HTML elements` trên `Virtual DOM`; Sau đó đồng bộ hóa với `Original DOM`. Chi tiết về `Original DOM`, `Virtual DOM`, bạn có thể đọc qua [bài viết này tại đây](https://haodev.wordpress.com/2019/06/21/original-dom-vs-shadow-dom-vs-virtual-dom/) nhé!

Quay lại ví dụ của chúng ta, thêm chút `props` và `event`:

```jsx
const dropByMyBlog = () => { /* ... */ };

const blogTitle = (
    <h1 id="blogTitle" onClick={dropByMyBlog}>Make It Awesome</h1>
);
```
 sẽ được dịch thành:
 
```js
React.createElement(
    'h1',
    {
        id: "blogTitle", 
        onClick: function() { /* ... */ }
     },
     "Make It Awesome"
);
```

*Bạn đoán xem: `Object` được tạo ra có dạng như thế nào? Thử và kiểm tra lại kết quả trên [Code Sandbox](https://codesandbox.io/s/makeitawesome-haodev-codes-jsx-1st95) nhé 😸😸*

*Giờ thì chúng ta cùng nhau đi qua một số vấn đề xoay quanh `JSX` (go)*

## ■ Common issues
### ■ Adjacent JSX-s
Cập nhật chút `component Blog`:

```jsx
const Blog = () => (
    <h1>Make It Awesome</h1>
    <p>URL: https://haodev.wordpress.com</p>
);
```

thì gặp ngay:

```jsx
SyntaxError: Adjacent JSX elements must be wrapped in closing tag.
```

Lý do thì như thông báo rồi, cơ mà có bao giờ bạn tự hỏi tại sao lại như vậy!?! 🤔🤔

![](https://www.dropbox.com/s/b6x5ed4o63l0a4v/chuonle2.gif?dl=1)

Điều này cũng dễ hiểu thôi. Ở phần trước, chúng ta đã biết `JSX` được dịch sang `React.createElement()`, hàm này tạo ra một `object` tương ứng, được trả về bởi `component`. Mà bản chất `component` cũng chỉ là một `function`. `Function` trong `JavaScript` thì chỉ trả về 1 giá trị thôi.

Do đó, `component` không thể nào mà trả về 02 đối tượng ngang nhau được:

```jsx
const Blog = () => (
    React.createElement('h1', null, 'Make It Awesome'); React.createElement('p', null, 'URL: https://haodev.wordpress.com');
);
```

Để xử lý lỗi này, chúng ta có thể có 3 lựa chọn:

- **Div Tag**
- **React Fragment**
- **Array Converter**

Hai cách đầu có lẽ cũng không xa lạ gì:

```jsx
const Blog = () => (
    <div>
        <h1>Make It Awesome</h1>
        <p>URL: https://haodev.wordpress.com</p>
    </div>
);
```
hay

```jsx
const Blog = () => (
    <>
        <h1>Make It Awesome</h1>
        <p>URL: https://haodev.wordpress.com</p>
    </>
);
```

Cách dùng mảng thì có lẽ hơi ít gặp một chút:
```jsx
const Blog = () => (
    [<h1 key="blogTitle">Make It Awesome</h1>, <p key="blogURL">URL: https://haodev.wordpress.com</p>]
);
```

Sở dĩ chúng ta có thể làm như vậy vì trong `JSX`, một đoạn `<p>{[1, 2, 3, 4]}</p>` sẽ được chuyển thành  `<p>{1}{2}{3}{4}</p>`, `1234` vẫn được in ra bình thường không vấn đề gì 😸😸.

Chú ý thêm `unique key` cho mỗi phần tử trong mảng để tránh `Warning` nha ^^

*Việc tại sao cần dùng key, bạn có thể tìm hiểu thêm trong [bài viết này](https://haodev.wordpress.com/2020/04/25/su-quan-trong-cua-key-props-trong-reactjs/).^^*

![](https://www.dropbox.com/s/ouvjtoa6pcjwd15/khongphaiem2.gif?dl=1)

Trong `03` hướng xử lý trên, mình hay dùng `React.Fragment` dạng `shorthand` để bọc các `Adjacent JSX-s`. Với trường hợp cần thêm các `properties` *(như `key` trong vòng lặp chẳng hạn)*, mình chuyển qua dạng đầy đủ:

```jsx
[1, 2, 3].map(num => (
    <React.Fragment key={num}>
        <h1>Make It Awesome</h1>
        <p>URL: https://haodev.wordpress.com</p>
    </React.Fragment>
));
```


`React.Fragment` được thêm vào trong `React version 16.2` để tránh việc chúng ta phải dùng `Div tag` trong các trường hợp không cần thiết *(không có ý nghĩa trong `DOM Structure` hoặc chỉ có mục đích để tránh lỗi trên)*, một số khác cũng sẽ ảnh hưởng tới `style` ứng dụng *(`flexbox` chẳng hạn)*. Với hướng *Array Converter* thì hơi khó nhìn và đòi hỏi việc kiểm soát `key`.

Chốt lại thì `React.Fragment` quá ư là ổn rồi đúng không nào ^^

> `Fragments` group a list of children `without adding extra nodes` to the `DOM`.


### ■ Class vs. className

Chúng ta có thể thêm các thuộc tính vào các `JSX elements`:

```jsx
<h1 id="blogTitle" className="blog-title">Make It Awesome</h1>
```

Đợt nọ, sau `seminar React Fundamentals` nội bộ, *[một anh giáo Laravel](https://viblo.asia/u/pht)* đố mình, **tại sao chúng ta phải dùng `className` thay vì `class`!?!**

*Hmm...*

*Thử xem saooo...*

Mạnh dạn sửa thành `class="blog-title"` nhận ngay chiếc
```js
Warning: Invalid DOM property 'class'.
```

*Tại sao nhỉ? (thinking)* 

Theo *[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)*:

> The name `className` is used for `class property` instead of `class` because of conflicts with the `class` keyword in many languages which are used to manipulate the DOM.

Chính vì vậy, việc truy cập `props.class` dẫn đến `Warning` như trên 😸😸.

*Ngoài ra, bạn có thể [ghé Quora](https://qr.ae/pN9tdV) để tham khảo thêm câu trả lời siêu có tâm của chị `Sophie Alpert` - cựu `React team manager` tại `Facebook` nha, quá là uy tín luônn =))*

### ■ import React

Khi làm việc với các `components`, bạn có bao giờ để ý đoạn `import` quen thuộc này:

```js
import React from 'react';
```

Giả sử như `component` phía dưới chỉ trả về đoạn `JSX` đơn giản; và cũng không sử dụng các `APIs` khác trong thư viện `'react'` như *`useState()`, `useEffect()`, etc.*

**Giờ thì xóa dòng này điii =))**

*Thử đoán xem kết quả sẽ như thế nào nhé...*

![](https://www.dropbox.com/s/xfzl3pfbx1dyqcz/ginhi.gif?dl=1)

Hai trường hợp có thể xảy ra:
- Hoặc vẫn chạy ngon lành
- Hoặc thông báo lỗi trong `build process`.

**Vậy, lý do thật sự cho điều này là gì?**

Ở phần trên, chúng ta cũng đã biết `JSX` sẽ được `compile` ra `React.createElement()` rồi đúng không nào.

> When compiled, it calls the `React.createElement()` function. So we need to have `React` in scope for `JavaScript` to know-what-to-do-with-the-compiled-code.

Khi chúng ta sử dụng `JSX`, `Babel compiler` sẽ chuyển chúng thành các lệnh gọi hàm `React.createElement()`. Do đó, chúng ta cần có `React` trong `scope` hoạt động của `JSX` *(buộc cần `import React from 'react';`)*.

Cho tới bản `React 17.0`, `Facebook team` đã `"collaborate"` với `Babel`, [`JSX` with new transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) không còn yêu cầu điều này nữa. 😽😽

> It is possible to write `JSX` without importing the `React` library at the top level or having `React` in scope.

```jsx
// Inserted by a compiler (don't import it yourself!)
import {jsx as _jsx} from 'react/jsx-runtime';

const Blog = () => _jsx('h1', { children: 'Make It Awesome' });
```


 ## ■ Kết
*Yayyy...* Như vậy là chúng ta đã cùng nhau tìm hiểu về `JSX` và vài điều thú vị diễn ra xung quanh nó rồi.

Hy vọng rằng bài viết này có thể giúp ích được các bạn đã và đang tiếp cận với `ReactJS`. Có thể nói rằng, `JSX` chẳng phải từ khóa khó tiếp cận với người mới, ấy thế nhưng, cùng nhau tìm hiểu thêm chút để giải thích *Tại sao thế này, Tại sao thế kia?* để nắm được bản chất thì cũng thú vị nhỉ ^^

![](https://www.dropbox.com/s/isdhlhtcik0ojt6/ahihi.gif?dl=1)

Cảm ơn các bạn đã đọc bài chia sẻ này. Đầu xuân năm mới, **lì xì mình `1 upvote`** để có thêm động lực cho những bài viết sắp tới nhé 😺😺

<br/>


#### Và trong thời điểm hiện tại thì...

Mặc dù thời gian này *(thời điểm mình `publish` bài viết, 01/02/2022)*, các tỉnh đã có các biện pháp phòng tránh, kiểm soát tình hình dịch bệnh; Việc tiêm `vaccine Covid-19` cũng đã được triển khai, song, đang trong thời gian nghỉ *Tết Âm lịch* nên nhu cầu di chuyển của người dân là không thể tránh khỏi, chúng ta cũng chưa thể chủ quan, hãy tiếp tục tuân thủ quy tắc  `5K` được `Bộ Y tế` khuyến cáo:
```py
#Coronavirus #5K #BoY Te
Khẩu trang - Khử khuẩn - Khoảng cách - Không tập trung - Khai báo y tế
```
để có thể giữ an toàn cho bản thân và mọi người xung quanh 😺😺

![](https://www.dropbox.com/s/rwzrhv67abbwcqt/yessir.gif?dl=1)

*Một lần nữa, chúc các bạn kì nghỉ Tết ấm áp, đong đầy hạnh phúc bên gia đình nhé!* 

*Năm mới ghé qua [**nhà mình**](https://haodev.wordpress.com/) "thưởng bánh uống trà" chút rồi về ^^*
 
## ■ Credits

- **Resources: [React document](https://reactjs.org/docs/getting-started.html), [*Yogesh Chavan*'s post via *Freecodecamp*](https://www.freecodecamp.org/news/jsx-in-react-introduction/), [*Ryan Harris*'s post via *Freecodecamp*](https://www.freecodecamp.org/news/what-the-heck-is-jsx-and-why-you-should-use-it-to-build-your-react-apps-1195cbd9dbc6/), [*Ifeoma Imoh*'s post via *Progress Telerik*](https://www.telerik.com/blogs/how-jsx-react-works-under-hood).**
- **Thumbnail: [Đen - Mang Tiền Về Cho Mẹ ft. Nguyên Thảo (M/V)](https://www.youtube.com/watch?v=UVbv-PJXm14), [*cuongkhung1993* via *Reddit*](https://www.reddit.com/r/VietNam/comments/rtix1b/mang_ti%E1%BB%81n_v%E1%BB%81_cho_m%E1%BA%B9_%C4%91%E1%BB%ABng_mang_m%C3%A8o_v%E1%BB%81_cho_m%E1%BA%B9/).**
- **Policies:**
    - [**This original article from My Make It Awesome blog**](https://haodev.wordpress.com/2022/02/01/chu-den-mang-tien-ve-cho-me-con-jsx-mang-gi-ve-cho-react/).
    - **Use my contents for sharing purpose, please attached resource linked to [my blog](https://haodev.wordpress.com).**
    - **Use my contents for trading purpose, please [contact me](https://haodev.wordpress.com).**
    - **Support: [Buy me a pizza](https://www.buymeacoffee.com/haolt).**
- **Copyright:** **The posts in a spirit of sharing knowledge. If there is anything with regard to copyright of your contents, please [contact me](https://haodev.wordpress.com).**

<br/>


***Happy coding!***