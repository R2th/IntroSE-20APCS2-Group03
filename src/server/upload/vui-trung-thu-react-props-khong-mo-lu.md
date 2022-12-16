## ■ Intro
Sáng nay `gió mùa Đông Bắc` về, một buổi mai đầy sương thu và trên không có những đám mây bàng bạc, mình lại nao nức những kỷ niệm về những ngày đầu mới tìm hiểu `React` 💦

Tiết trời dịu dàng như vậy thì có lý do gì mà chẳng thả một chiếc bài viết nhẹ nhàng về `React` nhỉ ^^


![](https://images.viblo.asia/8d990c6f-7176-475c-a6a2-7e40283912be.png)


*Trong bài viết này, chúng mình cùng nhau tìm hiểu về `React Props` theo một lăng kính mới nhé !*
## ■ Đối tượng
Chủ đề không đao to búa lớn nên hoàn toàn phù hợp với các bạn mới học `React` hoặc các bạn đã và đang làm việc với `React` rồi muốn tìm hiểu sâu thêm về nó nha các `homies`.


*Trước tiên hãy điểm nhanh qua `Props` một chút nào 😋))* 

## ■ Props

### Mục đích
Theo `concept` của `React`, ứng dụng của chúng ta sẽ được phân tách ra thành các `component`. Mỗi `component` lại có tính độc lập và riêng biệt. Do đó, các `state` của `component` đó cũng sẽ không được truy cập bởi các `components` còn lại 😕😕 !?! 

Như vậy thì làm sao để các `component` trong một ứng dụng có thể giao tiếp được với nhau đây?

Đó là chính là lý do `props` được `React` đưa vào 🎉
<br/>

> - `Component` có thể truyền `values`, `states`, `methods` xuống các `component con` với vai trò như một `props`.
> - Các `component` con có thể sử dụng chúng *(**`One-way data flow - flow down`**)*.

### Cú pháp

Cách một `ReactJS component` truyền dữ liệu xuống một  `ReactJS component khác` *(giả sử là `HComponent component`)* như sau:
```js
<HComponent url="https://haodev.wordpress.com" />
```


Khi đó thì `HComponent` nhận `props` trong `argument`:
```js
// Class component receives props:
class HComponent extends Component {
    constructor(props) {};
    render() {
        return <>{this.props.url}</>
    }
}

// Function component receives props:
function HComponent(props) {
    return <div>{props.url} Cat</div>
}
```

## ■ Render props vs. Function props

### Render props

`Props` của chúng ta có thể nhận đa dạng các kiểu dữ liệu như: `Objects`, `Arrays`, `Booleans`, `Strings`, `Numbers` và thậm chí đó là một `Function` 😺😺.

<br/>

*Theo [Official document](https://reactjs.org/docs/):*
> A render prop is a function prop that a component uses to know what to render.

<br/>

Quan sát ví dụ về `Render props` nhé:

```JS
// Pass
<HComponent1 tags={() => [ "haodev", "haole" ]} />
<HComponent1 keys={()=><a href="https://haodev.wordpress.com/">Make It Awesome</a>} />

// Receive
{this.props.tags()}
{this.props.keys()}
```

### Function props
Xem qua ví dụ về `Render props`, nếu bạn thoáng có suy nghĩ:
```js
- Xùy !! Khác gì `<button onClick={this.props.handleClickBtn} />` đâu. Văn vở ><
```
thì chưa phải đâu nhé !

<br/>

Chúng ta cần phân biệt một chút 2 khái niệm này:
> * **Các `props` nhận giá trị là một `function` được gọi là `Function props`.**
> 
> * **`Render props` - một kiểu của `Function props` - có mục đích để tái sử dụng, xử lý để component biết những gì cần render.**



Còn `this.props.handleClickBtn` phía trên thì chỉ được thực thi khi có sự kiện `click` vào `button` thôi ^^

## ■ Default props

Truyền `props` xuống `component con`, `component con` nhận `props` để xử lý. Mọi thứ vẫn đang rất là `ổn áp` như chúng ta mong đợi 😺😺.

Thế nhưng giả sử vì lý do nào đó `parent component` không truyền giá trị của `url props` xuống thì sao?

Lúc này giá trị của nó sẽ là `undefined`  thay vì giá trị hợp lệ cần truyền xuống. Nếu trong `HComponent` vẫn thao tác xử lý sẽ dẫn tới [`Runtime errors`](https://airbrake.io/blog/what-is/runtime-error#:~:text=A%20runtime%20error%20is%20an,zero%20errors%20%2C%20and%20many%20more.).

*Thế là dở rồi =)))*


Để xử lý vấn đề này, chúng ta có thể  check `url props` có tồn tại hay không để xử lý `logic` cũng như có `fallback value` tương ứng trong phần `JSX`:

```JS
<h3>{this.props.url || 'Please directly contact to get my blog url.' }</h3>
```

Nghe cũng hợp lý đó nhỉ? Mình cũng hay chọn cách xử lý này.

<br/>

Ngoài ra, 1 cách nữa mà mình cảm thấy `"xịn" hơn, "ngon" hơn` muốn giới thiệu với các bạn -  đó là `defaultProps` 😺😺.

### Overview

`React` cung cấp cho chúng ta `defaultProps` giúp xử lý vấn đề này:

> `defaultProps` is a property in `React component` used to set default values for the props argument.

<br/>

**`defaultProps` có thể được xem như một `property` của `component`.** Tương tự như biến, giá trị mặc định `props` có thể được ghi đè nếu như `component` truyền `props` và được sử dụng nếu ngược lại.

Nó được áp dụng cả trong `class componnent` cũng như `function component`, đến đây thì vẫn đề chỉ còn là cú pháp thôi 😸😸.

### Class component
```js
class ReactComp extends React.Component {}
ReactComp.defaultProps = { }
    
// OR

class ReactComp extends React.Component {
    static defaultProps = { };
}
```

Với ví dụ phía trên thì:
```js
class HComponent extends Component {
    /* ... */ 
};
HComponent.defaultProps = {
    url: 'https://haodev.wordpress.com'
};

// OR

class HComponent extends Component {
    static defaultProps = {
        url: 'https://haodev.wordpress.com'
    }
    /* ... */
};
```

### Function component

```js
function HComponent(props) {};

HComponent.defaultProps = {};
```

Tương ứng với ví dụ trên sẽ là:

```js
function HComponent(props) { /* ... */ }

HComponent.defaultProps = {
    url: 'https://haodev.wordpress.com'  
}
```

<br/>

#### Nhận xét

Dù cùng giải quyết được một vấn đề nhưng cá nhân mình nghĩ, có vẻ cách dùng `defaultProps` ngon lành cành đào hơn:
- Phân tách được `logic` và `template`.
- Phần `JSX` sẽ không còn bị rối với như cách xử lý với `||` nữa.

Bạn thấy sao chứ mình ưng bụng ghê ấy ^^

<br/>

*Tiếp theo, chúng mình xem qua phần mở rộng khi React tích hợp Typescript xử lý vấn đề này như thế nào nhé  !*

### Mở rộng với React sử dụng TypeScript

Xây dựng một `Interface`:

```js
type url = "https://haodev.wordpress.com";
export interface HProps {
    url: url
};
```

Sau đó áp vào `component`:

```js
// CLASS COMPONENT
class HComponent extends Component<HProps> {
    static defaultProps = {
        url: "https://haodev.wordpress.com"
    };
    /* ... */
};


// FUNCTION COMPONENT
function HComponent(props: HProps) { /* ... */ };
CatComponent.defaultProps = {
    url: "https://haodev.wordpress.com"
}
```



*Nom có vẻ ổn quá nhỉ ^^*

## ■ Kết

Vậy là nãy giờ chúng ta đã cùng nhau tìm hiểu về `Props` - `Render props` - `Default props` rồi 🎉🎉

Cảm ơn các bạn đã đọc bài chia sẻ này và hy vọng rằng bài viết này có thể giúp ích được các bạn đang tiếp cận với `ReactJS` cũng như đang tìm hiểu về chủ đề này.

**Tặng mình `1 upvote` để có thêm động lực cho những bài viết sắp tới nhé 😺😺 !** 


![](https://images.viblo.asia/0fba689e-171a-4656-a73e-4577800eaa2c.gif)


*Chúc các bạn mùa Trung Thu vui vẻ bên gia đình ! Tiện ghé qua [nhà mình](https://haodev.wordpress.com/) chơi một chút rồi về !*


## ■ Credits
- ***References from** **Chidume Nnamdi's [article 1](https://blog.bitsrc.io/understanding-react-default-props-5c50401ed37d), [article 2](https://blog.bitsrc.io/understanding-render-props-in-react-1edde5921314) at Medium**.*
- [**My Make It Awesome blog**](https://haodev.wordpress.com/):
    - [**Original article from my blog here**](https://haodev.wordpress.com/2020/09/20/vui-trung-thu-react-props-khong-mo-lu/).
    - **Use my contents for sharing purpose, please attached references linked to my blog.**
    - **Use my contents for trading purpose, please [contact me](https://haodev.wordpress.com/me/).**

<br/>


*Happy coding !*