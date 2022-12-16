## Đặt vấn đề
Trong quá trình xây dựng các ứng dụng với `ReactJS`, chúng ta luôn phải đau đầu chú ý tới performance để tránh việc  `API calls`, `async requests` , `DOM updates`,... quá nhiều lần qua các *React features* như  `shouldComponentUpdate()`, `React.PureComponent`, `React.memo` hay `Hooks`(`useState()`, `useMemo()`, `useContext()`, `useReducer()`*, etc.*

![](https://media1.tenor.com/images/c521a9f855a28aed2c3303a460b3133e/tenor.gif?itemid=13502747)
> Code "chạy được" là một câu chuyện, code "xịn"  lại là một câu chuyện khác.
> 
<br>

Trong bài viết này, chúng mình sẽ cùng xem xét một cách cải thiện hiệu suất của các *React app* mà không sử dụng bất kỳ các  *React features* nào kể trên, thay vào đó là **một kỹ thuật chung không chỉ áp dụng cho `React`**: **Throttling** và **Debouncing**.

Bắt đầu thôi nàooooo 😽😽))

## Bắt đầu với ví dụ
##### Search Box
Ta bắt đầu với một ví dụ nhé:
```js
import React from 'react';
import './autocomp.css';
class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            results: []
        }
    }
    handleInput = evt => {
        const value = evt.target.value
        fetch(`/api/users`)
            .then(res => res.json())
            .then(result => this.setState({ results: result.users }))
    }
    render() {
        let { results } = this.state;
        return (
            <div className='autocomp_wrapper'>
                <input placeholder="Enter your search.." onChange={this.handleInput} />
                <div>
                    {results.map(item=>{item})}
                </div>
            </div>
        );
    }
}
export default SearchBox;
```
Trong ví dụ trên, `SearchBox`, khi bạn gõ một từ khóa nào trong ô `input`, nó sẽ gửi `API request` để lấy danh sách `users` ra và hiển thị. Điều này có nghĩa là cứ sau mỗi ký tự bạn gõ sẽ có 1 `request` gửi lên, nếu thành công, `DOM` lại được `update` sau lời gọi `setState()`.

Như vậy, khi bạn gõ 10 ký tự thì sẽ tương ứng 10 `API requests` và 10 lần `updates DOM`. Mà đó là chúng ta đang xét mới chỉ một `user` thôi đó 🙃🙃. Bất chấp cả `database` lưu dưới `local` thì việc `update DOM` sau mỗi ký tự cũng vô cùng "tổn phí" đúng không nào 😭😭
<br/>

<br/>

##### Use &  attachment of events

Một ví dụ khác là việc ta dùng kèm với sự kiện `resize` || `scroll`. Đa phần, một trang `web` được cuộn `~1000 lần/s`. 

Giả sử ta có đoạn code như sau:
```js
document.body.addEventListener('scroll', ()=> {
    console.log('Scrolled !!!')
})
```
Hàm này sẽ được gọi `~1000 lần/s` 😵😵 Trường hợp xấu nhất là trình xử lý sự kiện phải thực hiện các tính toán và thao tác DOM nặng nề.
```js
function longOp(ms) {
    var now = Date.now()
    var end = now + ms
    while(now < end) {
        now = Date.now()
    }
}
document.body.addEventListener('scroll', ()=> {
    // simulating a heavy operation
    longOp(9000)
    console.log('Scrolled !!!')
})
```
Như bạn đã thấy, sau `9s` hệ thống sẽ `log` ra `Scrolled !!!`. Nếu chúng ta cuộn `body` tới `5000px`, sẽ có tới `200+` sự kiện bị gọi. Mỗi sự kiện cần 9s để kết thúc. Vậy là sau `9 * 200 = 1800s` để hoàn thành hết `200+` sự kiện. Do đó, mất tới nửa giờ từ lúc bắt đầu cho tới kết thúc.
Chắc chắn kết quả sẽ không ngọt ngào rằng `brouser` sẽ "ổn" đâu, nó có thể bị `lag` hoặc không phản hồi 🤣🤣

Hmmm... nhận ra vấn đề ở đây rồi đúng không nào 😉😉

Cùng tìm hiểu `base` `throttling` & `debouncing` chút đã nhé 😛😛

## Throttling

> Throttling enforces a maximum number of times a function can be called over time
> 
<br/>

Throttling là việc điều chỉnh thực thi một chức năng nhất định sau khi một khoảng thời gian xác định đã trôi qua.

Ví dụ như *“Chỉ thực thi hàm này nhiều nhất 1 lần trong 100ms”*.
Hay giả sử như mình gọi một hàm với tốc độ `1000 lần/20s`. Nếu chúng ta điều tiết để thực thi trong mỗi `500ms`, thì trong `20s`, chức năng sẽ được thực thi trong `40 lần/20s`:
```js
1000 * 20 secs = 20,000ms
20,000ms / 500ms = 40 times
```
Từ `20000` xuống `40`, đáng kể chưaaaaa 🤗🤗
Để ứng dụng `Throttling` trong `React`, chúng ta sẽ sử dụng `underscore`, `lodash libraries`, `RxJS` & *tùy chỉnh riêng*.

### `underscore`

Thư viện `underscore` là một package trên npm, dùng để điều tiết `component`.
```cmd
npm i underscore
```
Ta có thể sử dụng trong `component` như sau:
```js
// ...
import * as _ from underscore;

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
       this.handleInputThrottled = _.throttle(this.handleInput, 100)
    }
    handleInput = evt => {
        const value = evt.target.value
        const filteredRes = data.filter((item)=> {
            // algorithm to search through the `data` array
        })
        this.setState({ results: filteredRes })
    }
    render() {
        let { results } = this.state;
        return (
            <div className='autocomp_wrapper'>
                <input
                    placeholder="Enter your search.."
                    onChange={this.handleInputThrottled}
                />
                <div>
                    {results.map(result=>{result})}
                </div>
            </div>
        );
    }
}
```
Trong đoạn code trên, hàm điều tiết `handleInputThrottled()` nhận vào một `callback` là `handleInput()` *(hàm cần được điều tiết)* và một `timebox`.

Trở lại với ví dụ phía trên, giả sử tốc độ gõ bình thường của một kí tự là 200ms, gõ 10 ký tự sẽ tốn `200 x 10 = 2000ms`.  Hàm `handleInput` bây giờ sẽ chỉ được gọi `2000 / 1000 = 2` lần thôi, thay vì 10 lần như trước.

### `lodash`
`lodash` cũng là một thư viện giúp chúng ta xử lý vấn đề này.
```
npm i lodash
```
Với ví dụ đầu tiên:
```js
// ...
import { throttle } from lodash;

class SearchBox extends React.Component {
    constructor(props) {
        // ...
       this.handleInputThrottled = throttle(this.handleInput, 100)
    }
    handleInput = evt => {
        // ...
    }
    render() {
        // ...
}
```
Chả khác gì ngoài thay hàm *`throttle`*  bên `lodash` với *`_.throttle`* bên `underscore` cả 😺😺

### `RxJS`
`RxJS` là `Reactive Extensions in JS` cung cấp cho chúng ta các toán tử, trong đó có một toán tử xử lý vấn đề `throttling`.
```
npm i rxjs
```
Ví dụ đầu tiên sẽ được xử lý như sau với `RxJS`:
```JS
// ...
import { BehaviorSubject } from 'rxjs';
import { throttle } from 'rxjs/operators';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
        this.inputStream = new BehaviorSubject()
    }
    componentDidMount() {
        this.inputStream
            .pipe(
                throttle(100)
            )
            .subscribe(v => {
                const filteredRes = data.filter((item)=> {
                    // algorithm to search through the `data` array
                })
                this.setState({ results: filteredRes })
        })
    }
    render() {
        let { results } = this.state;
        return (
            <div className='autocomp_wrapper'>
                <input
                    placeholder="Enter your search.."
                    onChange={e => this.inputStream.next(e.target.value)}
                />
                <div>
                    {results.map(result => { result })}
                </div>
            </div>
        );
    }
}
```
Chúng ta import `throttle` & `BehaviorSubject` từ thư viện `RxJS`. Đầu tiên, khởi tạo một `inputStream property` là một `BehaviorSubject instance`. 
Khi bắt đầu gõ ký tự vào input là lúc emit giá trị đó vào inputStream.

Trong `componentDidMount`, cho `inputStream` đi qua một `pipe` với `throttle(1000)` (nghĩa là `RxJS` sẽ điều tiết `inputStream` sau mỗi `1000ms`), sau đó trả về một `Observable`, ta `subscrible` để lấy được giá trị đó.

### Tự viết custom implementation
Để hiểu hơn về cơ chế `throttling`, có lẽ chúng ta nên tự viết `throttling implementation`
```js
function throttle(fn, ms) {
    let timeout
    function exec() {
        fn.apply()
    }
    function clear() {
        timeout == undefined ? null : clearTimeout(timeout)
    }
    if(fn !== undefined && ms !== undefined) {
        timeout = setTimeout(exec, ms)
    } else {
        console.error('callback function and the timeout must be supplied')
    }
    // API to clear the timeout
    throttle.clearTimeout = function() {
        clear();
    }
}
```
Trong component SearchBox ta chỉ cần:
```js
// Trong constructor()
this.handleInputThrottled = throttle(this.handleInput, 100)
```
là được rồi 😁😁

## Debouncing
> Debouncing enforces that a function will not be called again until a certain amount of time has passed since its last call.
> 
<br/>

Trong `Debouncing`, nó bỏ qua tất cả các lệnh gọi đến một hàm và đợi cho đến khi hàm đó ngừng được gọi trong một khoảng thời gian xác định.
Về áp dụng, cú pháp giống y `throtting` luôn, mình có thể dùng `lodash`, `underscore` hay `RxJS`:
```js
// Case 1
import { debounce } from 'lodash';
...
this.handleInputThrottled = debounce(this.handleInput, 100)
```
```js
// Case 2
import * as _ from 'underscore';
this.handleInputThrottled = _.debounce(this.handleInput, 100)
```
```js
// Case 3
import { BehaviorSubject } from 'rxjs';
import { debounce } from 'rxjs/operators';

class SearchBox extends React.Component {
    constructor(props) {
        // ...
        this.inputStream = new BehaviorSubject()
    }
    componentDidMount() {
        this.inputStream
            .pipe(
                debounce(100)
            )
            .subscribe(v => {
                // ...
        })
    }
```
Bạn cũng có thể tham khảo một `demo` sử dụng `debounce` trong `lodash` với `Functional Component` [tại đây](https://codesandbox.io/s/functional-component-debounce-5jtfd).
## Common cases
Các trường hợp hay sử dụng tới `throtting` hay `deboucing` ta có thể kể tới như trong các `Game`, đặc biệt là các game hành động yêu cầu nhấn phím hoặc thực hiện các hành động như *bắn súng, tăng tốc,...* game thủ có thể bấm một phím thường xuyên *(40 lần trong 20 giây tức là 2 lần một giây)* nhưng cho dù game thủ nhấn phím bắn bao nhiêu lần thì nó cũng sẽ chỉ bắn một lần *(giả sử nói mỗi giây)*.

Ngoài ra thì trường hợp `SearchBox` như trên cũng thường được sử dụng `throtting` hay `deboucing` khá nhiều để hạn chế các `API calls`, như một cách để giảm tải cho `server` chẳng hạn. 😺😺

## Kết
Thay vì phải gọi liên tục gọi các phương thức trong ứng dụng `React`,  `Throtting` hay `Deboucing`thực sự là một giải pháp tốt để xử lý, nâng cao hiệu suất, tránh các trường hợp `DOM-re-rendering` không cần thiết các `node`.

Cảm ơn các bạn vì đã đọc bài viết của mình, tặng mình một `upvote` để có thêm động lực cho các chủ đề sắp tới nhaaaaa ^^ 

![](https://i.gifer.com/origin/bc/bc27b7f0168622ce242debd8bfc9e2a6_w200.gif)

Tham khảo thêm các bài viết liên quan [tại đây](http://haodev.wordpress.com/). Nếu có ý kiến bổ sung hay bất kỳ câu hỏi nào liên quan đến vấn đề này, hãy `comment` phía dưới cho mình nhé !

Chúc bạn một ngày làm việc hiệu quả  🤗🤗🤗

Happy coding !

<br/>

<br/>

*References:* *[Medium](https://blog.bitsrc.io/improve-your-react-app-performance-by-using-throttling-and-debouncing-101afbe9055)*