## Intro.
Với các bạn đã và đang tìm hiểu về `ReactJS`, đó giờ hẳn đã từng nghe qua từ khóa `React hooks`, hay cụ thể hơn là `Hooks trong React function components` 😺😺.

Đây là một `features` mới trong phiên bản `ReactJS 16.8` với ý tưởng chính là cho phép chúng ta quản lý `state`, tác động vào `lifecycles` của các `component-không-được-định-nghĩa-bằng-class`.

Với chủ đề này thì hôm nay chúng ta sẽ cũng nhau bàn luận về `React Custom hooks` nhé ^^

![[]()](https://images.viblo.asia/34559210-a1aa-456d-966d-74162b96a109.png)

## Prerequisite
Bài viết chủ yếu hướng tới các bạn đã và đang tiếp cận với  `ReactJS`, đã có kiến thức cơ bản về `React Hook` nhưng còn băn khoăn về `React custom hooks` cũng như muốn có cái nhìn rõ nét hơn về em nó ^^

*Cùng bắt đầu thôi !*

## What
*Theo  [`Official Document`](https://reactjs.org/):*
> Hooks -  a new addition in React 16.8 - let you use state and other React features without writing a class.

<br/>

Như mình đã spoil ở phần giới thiệu, `Hooks` là một tính năng được các `ae dev` cho là tuyệt vời trong `phiên bản 16.8` của `ReactJS`.

Có lẽ đầu tiên chúng ta phải kể tới các `built-in hooks` được xây dựng sẵn hỗ trợ xử lý một số tác vụ rất hiệu quả như *`useState()`, `useEffect()`, etc.* *Nếu chưa nhớ lắm thì bạn có thể tạt qua một vòng [tại đây](https://reactjs.org/docs/hooks-overview.html) rồi quay lại đọc tiếp* 😛😛

Ngoài các `built-in hooks` kể trên, chúng ta có thể tự tạo ra `Custom hooks` theo chức năng mình mong muốn.
`Custom hooks` cho phép:
- Kết hợp một hoặc nhiều các `built-in hooks` trong cùng một `custom hooks`.
- Tái sử dụng lại logic giữa các component tương tự nhau.

<br/>

*Hiểu là vậy đã, chúng ta tìm hiểu xem `Custom hooks` có gì hay ho nhé !*

## Why

### Problem
Một trong những `concepts` nổi bật ở `ReactJS` chúng ta không thể không nhắc tới đó là việc phân chia `views phức tạp` thành `hệ thống các component nhỏ-gọn, độc-lập & tái-sử-dụng`.

Song, đôi khi việc tách một số `components "to to"` ra chưa phải là một giải pháp hay do chúng có quan hệ logic mật thiết với nhau.

Như là **anh Dan Abramov** - *co-founder của Redux và Create React App* - từng chia sẻ:
> React doesn’t let them separate concerns.

<br/>

Nghe trừu tượng nhỉ ?

Ví dụ cụ thể như *các `component` có `animation-phụ-thuộc-vào-logic`; `form-xử-lý-nhiều-trường-đa-dạng`, etc.*
Ouh chắc phải xử lý nhiều lắm đây, mà chưa kể lặp `code` nữa 😿😿.

Mới nghe thôi đã thấy hơi hơi...ngài ngại rồi, chỉ muốn về quê trồng rau nuôi cá ngay luôn thì **`Custom hook` lúc này được tạo ra để giúp cho đời bớt khổ nè** :D :D 


### Size
Khi tạo thêm `React Hooks` vào `source code` của `version` trước, kích thước của thư viện `ReactJS` tăng lên *(dĩ nhiên rồi =)))*, song điều đáng nói là chỉ tăng vỏn vẹn `~1.5kB` *(`min`+`gzip`)*.

![](https://i.imgur.com/x9txHEW.gif)

Việc khai báo `component` bằng `Class` hay `Function` chẳng khác nhau là mấy, song, với cùng một cách xử lý `logic`, bỏ qua các sai số tự nhiên, trong `React conferences`, **anh Dan Abramov** cũng chia sẻ rằng việc sử dụng `Hooks` có thể làm giảm kích thước `file bundle.js` *(không đáng kể và chỉ giảm-một-chút thôi)*.

*Sau bài này bạn thử tự kiểm chứng xem đúng không nhé ^^*

## How

Sau khi tìm hiểu nó là cái gì, nó dùng làm gì thì phải biết làm như thế nào chứ nhỉ ^^ Đâu nói suông vậy được 😸😸.

Cùng thử tạo một `custom hooks` đơn giản:
```js
function useCustomHooks() {
  let blogName = 'Make It Awesome';
  let blogUrl = 'https://haodev.wordpress.com';
  return [blogName, blogUrl];
}
```

Chẳng khác gì mình đang khai báo một `Javascript function` đâu đúng không nào ^^

Có chăng điều chúng ta cần lưu ý một chút về **`Naming rules` của một `custom hooks` là cần phải có `prefix`  `use-` trước tên hàm**.

Ví dụ như là *`useTimeSet()`, `useCheckbox()`, etc.*

<br/> 

Khai báo xong xuôi, giờ `component MyBlog` muốn sử dụng `hook` này thì làm như sau:

```js
function MyBlog() {
  const [blogName, blogUrl] = useCustomHooks();
  return (<h3>{`${ blogName } - ${ blogUrl }`}</h3>)
}
```

<br/>

<br/>

*Tiếp theo, chúng ta cùng xem qua một ví dụ để hiểu rõ hơn !*
## Example

Giả sử trong `Users module`, mình có `component User` có chức năng hiển thị `một user` lấy từ` API` *(/users)* dựa vào `id`.

Ta viết theo kiểu `functional component` sẽ kiểu như này:

```js
function User({ id }){
    const [user, setUser] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        fetch(`/api/users/${id}`).then(response => {
            response.json().then(user => setUser(user));
        })
        .catch(error => setError(error);
    },[]);

    return (<>{ /* Bind users here */ }</>);
};
```

<br/>

Vài ngày sau mình có thêm `Products module`, `component Product` cũng có chức năng hiển thị một `product` lấy từ `API` *(/products)* dựa vào `id`. Thế là nhanh trí sang `User component` `copy`, `paste` sang `Product`, đổi tên component, thế là xong !  IQ vô cực chưa (J4F) 😸😸))) 

<BR/>

Thực ra thì điều này chẳng sai, song, sau khi tìm hiểu về `React Hook` rồi, mình có thêm một cách khác để tránh lặp `code` ở đây.

Mình sẽ tách đoạn xử lý ra làm một `Custom hook`:
```js
function useItemById(endpoint, id){
    const [item, setItem] = useState();
    const [error, setError] = useState();
 
    useEffect(() => {
        fetch(`/api/${endpoint}/${id}`).then(response => {
            response.json().then(item => setUser(item));
        })
        .catch(error => setError(error);
    },[]);

    return [item, error];
}
```

<br/>

Và sau đó chỉ cần qua `User` để `refactor` lại cho ngắn gọn:
```js
function User({ id }){
    const [user, error] = useItemById('user', id);
   
    return return (<>{ /* Bind users here */ }</>);
};
```

<br/>

Với `Product` cũng tương tự như vậy nhé. Các `component` bây giờ trông gọn gàng hơn rất nhiều. Sau này có thêm `n module` có chức năng tương tự thì chỉ cần gọi lại `custom hook useItemById()` thôi đúng không nào ^^


> Lúc cần `hook` có, lúc khó `hook` lo !

<br/>

<br/>

*Tiếp theo, mình cùng lên bàn cân để hiểu rõ hơn về `Hooks` cũng như `Custom hooks` nhé !*
## Comparison

### Hooks vs. Class

`React hooks` không hẳn là một cách khai báo `component` `đối lập` với `React Class`. Chúng đều hỗ trợ mình xử lý các tác vụ trong `component`. Trong một dự án, hoàn toàn có thể sử dụng đồng thời `React hooks` đối với `Function component` và `setState(), lifecycle methods` đối với `Class component` 😺😺.

Mở rộng hơn một chút, ý tưởng về `Hooks` không hẳn chỉ có trong `ReactJS`. Chỉ trong vòng vài ngày đầu sau thời điểm `React hooks` được giới thiệu trong `React Conference` diễn ra, nhiều `developer communities` đã `implement` `Hooks API` cả cho `Vue`, `Web Components` hay thậm chí là cả `plain JS functions`.


### React Hook vs. Service & Helpers

*`Service`, `Helpers`, `Add-ons`, `Utils` hay khái niệm nào đó tương tự* có thể được sử dụng ở bất kì đâu, cả trong `React hook` luôn.

`React hook` thì chỉ-có-thể-hoạt-động ở trong `React component`. Nó có thể *định nghĩa `state`, truy cập vào `context` của `component`* -  điều mà những anh bạn kia lại chưa làm được 🎉🎉.

<br/>

#### React Hook vs. HOC?
Như đã đề cập ở phía trên, `React hooks` PHẢI được sử dụng trong `function component`.. Giả sử bây giờ muốn tái sử dụng `logic` giữa các `components` thì phải làm sao?

![](https://i.imgur.com/r9iL3Bv.gif)

Ngày `React hooks` chưa được giới thiệu, một trong những giải pháp là chúng ta có thể dùng `HOC` *(**H**igher **O**rder **C**omponent)*.

Ví dụ như `withRouter()` trong `React Router` chẳng hạn:
```js
class A /* declaration */
    const { match, location, history } = this.props;
    /* render*/
export default withRouter(A);
```

<br/>

Giả sử mình cần biến `{ match }` thôi chẳng hạn, thế nhưng `props` truyền xuống sẽ có nhiều thành phần dư thừa 😕😕. Phân tích ý này vậy thôi chứ mình cũng thích `HOC` lắm ^^ Bạn nào biết thêm thông tin thì chia sẻ phía dưới `comments` nhé 😺😺


### JS Function vs. React Hook?

Đọc nãy giờ, có giây phút nào bạn nảy ra trong đầu ý nghĩ:

```js
-  Xùyyy,  Văn vở =))) Nó có khác gì hàm trong Javascript đâu (2tat) :">
```

Chính xác ! Hiểu đơn giản thì hook cũng là một `function` đó. 

Trong `JS function`, chúng ta có các `built-in function` *(như `parseInt()`, `Math.pow()`, etc.)*. Tương tự,  `hooks` trong `ReactJS` cũng vậy, tồn tại tận `10 built-in hooks` cho phép chúng ta quản lý `state` và xử lý `lifectycles`.

![](https://i.imgur.com/H0BbhNG.gif)


Chậm lại một chút, chúng ta hãy cùng ngẫm lại về `Code Reuse`.

Có rất nhiều cách để tái sử dụng `code` về `logic` trong `ReactJS`. Chẳng nói đâu cho xa xôi, ngay chính mình đây, mình hay viết chúng thành các `pure functions`. Chừng nào cần thì vào `component` đó gọi ra sử dụng luôn 😺😺.

*Cách di chuyển `code logic` tốn ít công sức nhất, dành sức mà đi `chill` =)))*
 
 <br/>

Khi tìm hiểu về `Custom hooks` thì mình mới nhận ra một vài đặc điểm về cách làm này. Là những hàm thông thường trong `Javascript`, chúng không có states. Thông thường thì điều này chẳng sao cả, vẫn rất ngon lành cho đến khi mình muốn tính *`window size`, cập nhật `state`, tạo `animation` phụ thuộc vào `state` trong `component` đó, etc.* 😕😕

<br/>

`Hooks` với những đặc quyền sử dụng các `React features` *(`state`, `useState()`, etc.)* sẽ khắc phục được hạn chế này, cho phép chúng ta tương tác với *`state`, `lifecycle`, `context`, etc.* Một điểm lưu ý rằng **`Hooks` phải được gọi trong một `function-component-đã-được-rende-ra-giao-diện`** nhé !


## Conclusion

Vậy là chúng ta đã cùng nhau điểm qua `Custom hook`, so sánh nó với một vài anh bạn tương tự như *`lifecycle methods`, `JS functions`, `services`, etc* để hiểu hơn rồi ^^

Theo ý kiến cá nhân của mình, `Hook` có phần "được lòng" hơn một chút so với `class` 😸😸. Dù chúng đều cho phép quản lý `state`, xử lý `lifecycles`, song, sự linh hoạt trong việc tạo ra các `custom hook` để tái sử dụng cũng như tách `logic` làm mình cảm thấy rất là `"bánh cuốn"`.

![](https://i.imgur.com/NQRwyBp.gif)

Có chăng đây sẽ là cách được ưa chuộng trong tương lai nhỉ ^^ Chia sẻ ý kiến của bản thân về nó cho mình biết dưới `comments` nhé ^^

Cảm ơn các bạn đã đọc bài chia sẻ này và hy vọng rằng bài viết này có thể giúp ích được các bạn đang tiếp cận với `ReactJS` cũng như đang tìm hiểu về `Custom hooks`. **Tặng mình `1 upvote` để có thêm động lực cho những bài viết sắp tới nhé 😺😺 !** 

<br/>


*Chúc các bạn cuối tuần vui vẻ ! Tiện ghé qua [nhà mình](https://haodev.wordpress.com/) chơi một chút rồi về !*


## Credits
- ***Thumbnail refer to:**  [BigCityBoi - Touliver x Binz MV](https://www.youtube.com/watch?v=jgZkrA8E5do).*
- ***Stickers on** Chat++ for Chatwork.*
- ***References from** [Dan Abremov's article](https://medium.com/@danabramov/making-sense-of-react-hooks-fdbde8803889), [Mayank Gupta's article](https://medium.com/technofunnel/creating-custom-react-hooks-9d4f382359bb) on Medium | [ehkoo.com](https://ehkoo.com/bai-viet/react-hooks-la-gi) | [Freetuts](https://freetuts.net/xay-dung-hook-trong-react-js-2725.html) | [Stephen E. Chiang's article](https://dev.to/chiangs/custom-react-hooks-vs-services-mcm), [Rohan Faiyaz Khan's article](https://dev.to/rohanfaiyazkhan/react-custom-hooks-what-why-and-how-5053) on Dev.to | [Alexandre](https://medium.com/swlh/how-to-start-with-react-hooks-b8ab723ec048) | [Personal Blog](https://haodev.wordpress.com/) | [Stackoverflow](https://stackoverflow.com/questions/59488213/whats-the-difference-between-a-javascript-function-and-a-react-hook).*
- [**My Make It Awesome blog**](https://haodev.wordpress.com/):
    - [**Original article from my blog here**](https://haodev.wordpress.com/2020/08/21/custom-hook-with-reactboi/).
    - **Use my contents for sharing purpose, please attached references linked to my blog.**
    - **Use my contents for trading purpose, please [contact me](https://haodev.wordpress.com/me/).**

<br/>

<br/>

*Happy coding !*