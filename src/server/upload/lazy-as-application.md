*Tâm sự một chút, sau kì nghỉ Tết vừa rồi mình có `review` lại hướng đi trong thời gian tới, nghĩ thì chưa ra mà vô tình sa vào trạng thái `Chênh vênh` nên có stress tẹo, định cho bản thân thời gian `F5 refresh` mà sinh ra `lười biếng` hồi nào chẳng hay. Cũng may có buổi nói chuyện với một người anh nên vấn đề cũng đã được giải quyết, cái lười cũng sợ quá chạy mất tiêu*  ![](https://s.yimg.com/lq/i/mesg/emoticons7/24.gif) 
  

*Cũng với cái chủ đề `lười` này, với con người chúng ta ảnh hưởng là vậy, cơ mà với `application` thì tốt lắm nhé ! Để mình kể cho mà nghe, chuyện ông `Lazy loading` và bà `Code-splitting`  : )))*  

![](https://images.viblo.asia/6a600798-340f-4910-a13d-ee91f6f1f8eb.png)


*Bắt đầu thoyyyy !*

## Base

*Với mỗi `application`, trong quá trình phát triển, chúng ta luôn cố gắng chia kiến trúc `code` nhỏ và chi tiết nhất để có thể dễ dàng xử lý `logic` và `maintain` sau này. Song, khi `build` để `deploy` lên `server`, các `files` này sẽ được `Webpack`, `Rollup` hay `Browserify` `đóng gói` lại.*

*Cùng nhau ngó qua cơ chế `Webpack` thực hiện việc này một chút nhé !*

### How `Webpack` bundling works?
Trong quá trình `Bundling`, `Webpack` sẽ tạo ra một thứ gọi là **`dependency graph`** có dạng:

![](https://cloud.githubusercontent.com/assets/1365881/5745055/40da9236-9c26-11e4-9e2b-6611cd743423.png)

<br/>

**`Root` của `dependency graph` chính là `entry point` được `config` trong `Webpack`** *(giả sử nó là `main.js`)*.

Các `modules` được `import` trong `main.js` sẽ trở thành các `node tương ứng` của `root`. Và dĩ nhiên, mỗi `module` được `import` trong các `node` này sẽ trở thành các `node con` của chúng.

> **`Dependency graph` cũng tương tự như [`Original DOM tree`](https://viblo.asia/p/original-dom-vs-shadow-dom-vs-virtual-dom-GrLZDQO3lk0) trong `HTML`**.

<br/>

Nếu chúng ta sử dụng các `Web APIs` để `detect` các `DOM nodes` thì thông qua `Dependency graph`, `Webpack` cũng `detect` các `modules` được đưa vào **`output bundle`**.

> `Output bundle` là một file (hoặc nhiều nếu dùng `lazy loading`) chứa các `code vanila Javascript` được compiles từ các modules trong `dependency graph`.
> 
<br/>

Muốn xem nội dung file `Output bundle` trên `brouser`, bạn chỉ cần mở cửa sổ `Console` lên, trong Tab `Network`:

![](https://i2.wp.com/css-tricks.com/wp-content/uploads/2019/03/s_78CDF3627F90DB89EF0E3A00D73150FD348D4FE709E3CA7B887E8C3626D3366F_1545251365662_Screenshotfrom2018-12-1921-28-37.png?w=523&ssl=1)

sau đó `click` vào file `bundle.js`, sẽ thấy nó ...đáng yêu vô cùng luônnnn =)))

![](https://i.imgur.com/QLUfIfN.gif)


##### BONUS
*Trong tab `Network`, phía bên cột `Waterfall`, nếu có đoạn `progress` màu đỏ, nghĩa là có tài-nguyên-chưa-thực-sự-cần và nên thực hiện lazy load đó ! Có thể mình sẽ chia sẻ thêm về sử dụng các chức năng của `Chrome dev tools` trong thời gian tới ^^*

<br/>

<br/>

Để tóm tắt lại, quá trình `bundling` của `Webpack` có thể được hình dung theo sơ đồ sau:

![](https://images.viblo.asia/cd97210f-8536-4f7f-8f7f-6e1077da1246.png)



<br/>


*Yayyyyy, bây giờ đã hiểu được Webpack làm gì rồi, ta lại nhận ra một vấn đề phát sinh:*

> Khi application càng nhiều modules, kích cỡ file bundle ban đầu càng to
> 
> Khi bundle càng to, thời gian client load càng lâu
> 
> Khi thời gian càng lâu, khả năng người dùng rời trang web càng cao. 
> 

<br/>

Đó là chưa kể người dùng còn sử dụng máy tính cấu hình thấp, `mobile internet data` hay các trường hợp có `slow internet connections` nữa thì toang đúng không nào :v

<br/>

Tổ lái sang `UX` một xíuuu,  **theo phân tích của Google, 53% người dùng mobile quyết định rời khỏi trang web nếu thời gian phản hồi của nó lớn hơn 3s**.

Như vậy, vấn đề **bigger bundle = fewer users** có thể trực tiếp làm mất `potential revenue` (doanh thu từ những người khách hàng tiềm năng).

*Một ví dụ cụ thể, việc `delay 2s` sau khi hiển thị kết quả đã khiến [Bing](https://www.bing.com/) mất đi 4.3% `potential revenue`.*

![](https://i.imgur.com/be9D0Di.gif)

<br/>

*Như chúng ta đã phân tích phía trên, `Application` từ 1 `bundle` ban đầu sẽ rất lớn, khi `load` về sẽ chậm hơn khi `bundle` càng ngày càng to, và có thể có nhiều phần code mà màn hình đó người dùng ko cần. Điều này cũng làm giảm `performance` đi `sương sương`. Lúc này đây, `Lazy loading` và `code splitting` được sinh ra cho đời bớt khổ (J4F)* 🥰🥰


## Main

### Code-Splitting concept



> `Code splitting` is just a **process of splitting the app into this lazily loaded `chunks`**.

<br/>

**Ý tưởng là ta sẽ tách file `bundle.js` ban đầu ra thành `1 file bundle` nhỏ hơn và các  `file chunks nhỏ hơn`, chỉ tải những thứ `client-thực-sự-cần`.**

![](https://images.viblo.asia/14a2e5ea-da87-414d-9c6d-e696434e847c.jpg)

Điều này có thể làm giảm kích thước `bundle` và các tài nguyên cần thiết tải lên cho lần khởi tạo đầu tiên; **Việc tải các component hoặc modules khác chỉ diễn ra khi phía `client-thực-sự-yêu-cầu`.**

![](https://images.viblo.asia/c4afa81d-e687-4925-8ef0-30131db1d0e7.png)

*Và đó chính là `Lazy loading`:*
### Lazy loading

> `Lazy loading` is technique of rendering only-needed or critical user interface items first, then quietly unrolling the non-critical items later.

<br/>

##### Notes:


> **`Code splitting` is process of splitting app into chunks.**
>
>**`Lazy loading` is process of loading chunks.**

<br/>

## Pet demo
    
#### Observation
Quan sát kĩ các files được load trong tab Network nhé:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/03/s_78CDF3627F90DB89EF0E3A00D73150FD348D4FE709E3CA7B887E8C3626D3366F_1545259151017_ezgif.com-video-to-gif.gif?ssl=1)

#### Architect
`Root App component` chứa một `button toggle`, `click` vào `toggle` thì bắt đầu load `component Hello`. Hết : ))

#### Explaination
Khi sử dụng `lazy loading`, `bundle` ban đầu là một `parent chunk`, trường hợp mình `split route` hay `render thêm một lazy component` *(`Hello component`)*, nó sẽ `load` `children chunk` tương ứng. Lúc này, trên thẻ `head` sẽ được `append` thêm `file javascript` này:
```html
<script src="/static/js/child-chunk.js"></script>
``` 
để chỉ dẫn cho thằng `browser` sẽ đi `load` `children chunk` sau khi `load` xong `parent`.

*Bạn có thể tìm hiểu sâu hơn về `code splitting concept` của `Webpack` [trên trang chủ của nó](https://webpack.js.org/guides/code-splitting/?fbclid=IwAR3ivolKJAuz7jw05YPmXq2JCIksmMYm52QMBe3QlWxVkkWOy7CIKWl5d6Y#prefetchingpreloading-modules) nhé.*

#### Notes
*Mình gọi đây là một `pet demo` vì nó chỉ có 2 `component`, và ban đầu cột `Waterfall` cũng không thể hiện việc có `tài-nguyên-nào-đó` bị `load` thừa cả. Mục đích của mình là để chúng ta có thể hiểu được cách hoạt động và dễ dàng quan sát cơ chế của nó ^^*

<br/>

![](https://i.imgur.com/WK21Tjp.gif)

<br/>


*Khi chưa thử `code demo` mình đã nghĩ rằng các phương pháp làm tăng `performance` nói chung cũng như `Lazy loading` và `Code splitting` nói riêng, có nhiều ý nghĩa như vậy, chắc `code` cũng phải cũng `đao to búa lớn` lắm. Thế nhưng `NHẦM TO` các bạn à. Không tin thì đọc tiếp phần dưới xem nào : )))*


## How's `ReactJS` lazy?

*Phần này viết này mình sẽ giới thiệu một vài cách thực hiện `lazy loading` trong `ReactJS` nhé, các `hotface` khác cùng với `ReactJS` như `Angular`, `VueJS` cũng có các `features`, `library` tương ứng hỗ trợ , nếu có thắc mắc gì thêm các bạn có thể `ping` cho mình ^^*

*Ý tưởng của 3 cách mình giới thiệu xoay quanh một điểm chốt: sử dụng `dynamic import()`.*

### `React.lazy()` feature

<br/>

Đây là `feature` mới của `ReactJS version 16.6`:

```js
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App = () => (
  <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <LazyComponent />
        </section>
      </Suspense>
  </div>
);
```


##### Notes:

Dù đã là một `feature` khá hay ho của `ReactJS` nhưng `React.lazy` và `Suspense` chưa hỗ trợ cho việc `server-side rendering`.

Đó là lý có thêm `2 libraries` dưới đây:

### `react-loadable` library (RL)

```js
import Loadable from 'react-loadable';

const LazyComponent = Loadable({
  loader: () => import('./LazyComponent'),
  loading: <div>Loading...</div>,
});

const App = () => (<LazyComponent/>)
```

Theo thông tin mình `hóng` được thì `react-loadable` đã từng được `recommended` trong một thời gian dài. Song, tính tại thời điểm mình viết bài này *(02/2020)*, điểm trừ duy nhất của `RL` là vẫn chưa tương thích được với `Webpack v4+` và `Babel v7+` 😭😭

### Loadable component (LC)

```js
import loadable from '@loadable/component';

const LazyComponent = loadable(() => import('./LazyComponent'))

const App = () => (
  <div>
    <LazyComponent />
    </div>
);
```
Trong `Loadable Component`, ta cũng có `lazy() method`, `Suspense component`, `fallback`,... có cú pháp giống y `React.lazy()` 😄

Trường hợp muốn sử dụng `fallback` thì chúng ta không nhất thiết dùng phải `Suspense`:
```js
// Type 1: Dùng Suspense (như Syntax của React.lazy())

// Type 2: Trong loadable() options
const LazyComponent = loadable(
  () => import('./LazyComponent'),
  { fallback: <div>Loading...</div> }
);

// Type 3: Via fallback props
const App = () => (<LazyComponent fallback={<div>Loading...</div>} />);
```
<br/>

Ngoài ra, `Loadable component` còn cho phép ta truyền một `dynamic value` vào `dynamic import()`:
```js
import loadable from '@loadable/component'

const AsyncPage = loadable(props => import(`./${props.page}`))

const App = () => (
  <div>
    <AsyncPage page="Home" />
    <AsyncPage page="Contact" />
  </div>
)
```

<BR/>

##### Bonus:
Ngoài `syntax` cơ bản như trên, `RL` và  `LC` còn  cho phép xử lý khá nhiều `case`: tùy chỉnh `Loading component` trong trường hợp `slow network conection` *(hay thậm chí là rớt mạng)* 🤣, `customize` lại `modules` được `render` hay thậm chí là xoắn quẩy thêm `Preloading` nữa... 😄 Ta có thể tìm hiểu chi tiết trên `Github` của chúng.

## Lazy as application

*Cá nhân mình thấy rằng, việc `application` `load` các `modules` cũng tương tự như cách chúng ta đối diện với các mục tiêu trong cuộc sống ấy:*

> Có bao giờ ở một thời điểm nào đó, bạn mong chờ ở bản thân `code` giỏi, có `mindset full-stack...overflow`, muốn học một khóa `UI - UX`, muốn tập chơi `organ`, muốn mở kênh `youtube`, viết `blog` chia sẻ với cộng đồng `Developers`,... không? Và thế là không biết bắt đầu cái nào trước, lại `return undefined; // Chênh vênh` . `OKR` tràn từ quý này sang quý khác mà mục tiêu vẫn còn đó.

<br/>

Và nếu như `application` thực hiện `lazy loading`: `Load` những `modules` thực sự cần thiết trước, sau đó `load` tiếp nếu có `request`, chúng ta cũng sẽ làm điều tương tự: **đánh `specify` cho các mục tiêu này *(có thể phương pháp [SMART](https://en.wikipedia.org/wiki/SMARTcriteria))*, sau đó `pick` ngay `module` đầu tiên và thực hiện nó**. Từ đó bạn sẽ cảm thấy dễ dàng hơn khi đưa ra quyết định ^^ 

![](https://i.imgur.com/gjsyyNk.gif)


## Conclusion
Vậy là chúng ta đã cùng nhau tìm hiểu về `Lazy Loading - Code splitting`: cách `Webpack build files`,  ý nghĩ `files` `bundle`, `chunk`, `pet demo` và một vài cách áp dụng cụ thể trong `ReactJS` rồi 😄😄

`Lazy Loading` tuyệt vời là vậy, nên nếu như ngày nọ ông `dev` ngồi cạnh có bảo:
```js
- Mày lười như phần mềm ấy >.<
```
thì hãy vui vẻ đón nhận, bởi vì đó là một lời khen mà 😉))

Song, mình chỉ muốn lưu ý thêm một điều:

  > **`Lazy loading` giúp tăng `performance` nhưng không phải `project` nào xài nó thì `performance` cũng cao.**

<br/>

`Pet demo` nho nhỏ trên giúp chúng ta trực quan hiểu rõ hơn về cơ chế của nó thôi, thực tế mà áp dụng thì quả là trường hợp `dùng dao mổ trâu để giết gà` đó 🤣🤣 Dùng đúng mới thấy hiệu quả chứ k phải cái gì cũng `code splitting` nha ^^

![](https://i.imgur.com/Zhz3o9w.gif)


Hy vọng rằng bài viết này mang lại giá trị cho các bạn.
Cảm ơn các bạn đã đọc bài chia sẻ của mình. Tặng mình **`1 upvote`** để có thêm động lực cho những bài viết sắp tới nhé 😛😛

*Đã đọc tới đây rồi, tiện ghé qua [**Blog của mình**](http://haodev.wordpress.com/) chơi một chút rồi về !*

*Chúc các bạn cuối tuần vui vẻ !*

*Happy coding !*

<br/>

<br/>

*Reference: [CSS Tricks](https://css-tricks.com/using-react-loadable-for-code-splitting-by-components-and-routes/), [Medium](https://blog.bitsrc.io/lazy-loading-react-components-with-react-lazy-and-suspense-f05c4cfde10c), [VueSchool](https://vueschool.io/articles/vuejs-tutorials/lazy-loading-and-code-splitting-in-vue-js/), [**Haodev**](https://haodev.wordpress.com/2020/02/21/lazy-as-application/).*