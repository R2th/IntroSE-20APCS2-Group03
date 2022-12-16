Javascript là một ngôn ngữ lập trình duy nhất ở thời điểm hiện tại có thể chạy trên trình duyệt web ( WA - Web assembly có thể chạy trên browser, web assembly khiến cho binary code có thể chạy trên nền web). Duy nhất ở đây không phải là không thể tạo ra ngôn ngữ nào khác thay thế mà là không cần thiết vì Javascript đã quá trở nên phổ biến (ở đây tập trung nói về client-side Javascript). Javascript được thiết kế theo **event-driven** paradigm (Hướng sự kiện). Javascript không phải là ngôn ngữ duy nhất được thiết kế dựa trên paradigm này (Hầu hết các ngôn ngữ hỗ trợ xây dựng GUI đều hỗ trợ). 

# Event-driven Paradigm

Giống như OOP được thiết kế dựa trên các `Object` & `Class` thì event-driven programming language được thiết kế dựa trên thành phần chủ yếu là `Event` & `Listener`. Đa phần các ngôn ngữ lập trình có thể xây dựng ứng dụng (application) đều hỗ trợ paradigm (Java, C, C++, et cetera). Lưu ý rằng là application ở đây không chỉ nói riêng về các GUI ở phía client mà còn cả ở phía server, vì server cũng phải luôn lắng nghe các request từ internet (dễ dàng mở rộng, tích hợp). Các ngôn ngữ lập trình đã hỗ trợ các **event** built-in (click, nhập liệu, di chuyển chuột, đọc file, xoá file, et cetera). 


# Event Emitters / Event Listeners

Event có rất nhiều loại, tuy nhiên ta có thể khái quát lại thế giới của event-driven paradigm gồm : `emitters` & `listeners`. Một **event** được định nghĩa là một hành động nào đó xảy ra, khi các điều kiện phù hợp với một tiêu chuẩn nào đó , **event** đó sẽ `emit` ra một tín hiệu (`signal`) đến cho nhiều `listener` đang chờ đợi tín hiệu đó. Khi nhận được các tín hiệu thì các `listener` sẽ được thực thi. Thông thường `listener` là các hàm (callback) đã được khai báo sẵn, khi nhận được tín hiệu thì sẽ lập tức thực thi. Điều này cho phép ta sắp đặt các `listener` phù hợp với tương ứng với các event. Ví dụ như khi người dùng click nút `Mua` thì ta sẽ lập tức hiển thị lên thông tin về giao dịch, ...

Ta cũng có nhiều vấn đề phát sinh như sau:
- **Event** `emit` tín hiệu khi chương trình kết thúc thì như thế nào?
- Làm sao chúng ta biết được khi nào một **Event** `emit` tín hiệu?
- Lúc nhận được tín hiệu mà chúng ta đang thực hiện đoạn code khác thì sao?
- ...

Thông thường đối với vấn đề thứ nhất và thứ hai, ta sẽ chọn cách giải quyết là để chương trình luôn chạy, luôn luôn khiến các `listener` ỏ trong trạng thái sẵn sàng (mặc dù đã hết phần code ở phần main) tín hiệu từ Event. Vấn đề thứ ba ta có thể sử dụng đa luồng để giải quyết. 

Lợi ích của event-driven paradigm gồm đơn giản và dễ mở rộng. Ví dụ về vấn đề mua hàng, ta có thể mở rộng bằng cách thêm các listener đảm nhận chức năng sign up/sign in vào mà không ảnh hưởng code của việc thực hiện giao dịch (tất nhiên vẫn phải đảm bảo logic: đã đăng nhập => điền thông tin => hiển thị thông tin giao dịch), giúp chúng ta tracing (theo dấu) được các hành vi của người dùng một cách tốt hơn.

# Event Loops

Tổng kết lại, một hành động `listener` sẽ được thực thi khi một sự kiện `event` nào đó được xảy ra (không nhất thiết từ phía người dùng). Để các `event` & `listener` chạy đúng đắn (`event` này xảy ra thì `listener` này được thực hiện, et cetera) thì chương trình cần phải chạy liên tục, luôn luôn chờ `signal` từ các `event emitter` (nguồn phát tín hiệu báo sự kiện hoàn thành ) để có thể thực hiện các `listener`. **Event Loops** là cơ chế giúp javascript có thể luôn chờ các tín hiệu phát ra, và điều phối thứ tự thực hiện các `listener` của nhiều `event` khác nhau. Event Loops giống một đứa con nít luôn hỏi mẹ "Mẹ ơi khi nào về?", chỉ khác thứ **Event Loops** yêu cầu là tín hiệu của bất kỳ `event`. Javascript khi nhận được `signal` từ `event emitter` sẽ tìm kiếm đến các `listener` (một hàm callback) đang lắng nghe `event` và thực hiện (execute, call, invoke) nó.

![Event loops - client side](https://sonlhcsuit.github.io/p/event-loops/img-1_hu38b9218ffc448345a22f3f9616787b81_25269_1024x0_resize_box_2.png)
![Event loops - nodejs](https://sonlhcsuit.github.io/p/event-loops/img-2_hu819fc556566a62b34a283c94f16a21d0_18977_1024x0_resize_box_2.png)

Điều đáng chú ý rằng javascript là một ngôn ngữ **single thread** (đơn luồng) dẫn tới việc javascript chỉ có 1 heap và 1 callstack (callback có thể sử dụng nhiều hàm chức năng khác nên callstack là cần thiết). Nếu nhiều `event` phát ra tín hiệu liên tiếp thì có cách giải quyết nào? Để giải quyết trường hợp này thì javascript hỗ trợ thêm khái niệm **Event Queue**, nhằm mục đích lưu trữ thứ tự các signal được emit từ các event khác nhau. Khi một `listener` được hoàn thành (thường là callstack trống), **Event Queue** sẽ lần lượt xử lý các `listener` tiếp theo. 

Javascript lúc bình thường sẽ chạy từng dòng một từ trên xuống đồng bộ (synchronous), tuy nhiên khi các `event` phát ra `signal` thì phải được xử lý thông qua **Event Queue** (Từng event một sẽ được xử lý). 

# WebAPIs and Synchronous - Asynchronous
Synchronous nghĩa là đồng bộ, nhằm chỉ việc code của chúng ta sẽ được thực thi theo thứ tự nhất định (từng dòng 1). Khi gặp các tao thác I/O thì code sẽ bị block (không chạy phần phía dưới) cho đến khi I/O hoàn thành (điển hình là `alert`  & `prompt`). Cơ chế event queue của javascript cũng được tính vào synchronous và asynchronous.

Xem xét ví dụ sau đây.

```js
let btn = document.querySelector("#btn")
btn.addEventListener("click",()=>{
    console.log("clicked")
})
btn.click() // thực hiện thao tác click vào nút, thay vì đợi người dùng click
console.log("he?")
// clicked
// he
// listener được execute trước!
```

Asynchronous nghĩa là bất đồng bộ, hằm chỉ việc code của chúng ta sẽ không được thực thi theo thứ tự đã viết.
Xem xét ví dụ sau đây.

```javascript
let btn = document.querySelector("#btn")
btn.addEventListener("click",()=>{
    setTimeout(()=>{
        console.log("clicked")

    },0)
})
btn.addEventListener("click",()=>{
        console.log("clicked 2")
})
btn.click() // thực hiện thao tác click vào nút, thay vì đợi người dùng click
console.log("he?")
// clicked 2
// he
// clicked
// listener được execute sau!
```

Lí giải tại sao ví dụ thứ 2 lại có kết quả như vậy là bởi vì có sự can thiệp của `Web API`. WebAPI hỗ trợ chúng ta nhiều thứ như `ajax`, `timers`, `file reader`, et cetera. Về mặt bản chất thì Web API cũng hoạt động dựa trên event queue, tuy nhiên hơi khác một tí là: Nếu sử dụng Web APIs thì thứ tự ưu tiên của event được emit từ Web APIs sẽ "kém hơn" các event, nghĩa là Event sẽ bị hoãn cho tới khi callstack trống (code của chương trình chính được chạy hoàn toàn) thì mới được đưa vào Event Queue và bắt đầu xử lý theo quy tắc của Event Queue( lấy từng Event ra -> tạo callstack mới -> execute listener). 

Hãy thử đoạn code trên với vòng lặp for dùng để blocking khoảng 2s
```javascript
let btn = document.querySelector("#btn")
btn.addEventListener("click",()=>{
    setTimeout(()=>{
        console.log("clicked")

    },0)
})
btn.addEventListener("click",()=>{
        console.log("clicked 2")
})

btn.click() // thực hiện thao tác click vào nút, thay vì đợi người dùng click
for(let i = 0;i<3000000000;i++){
// block 3s
}
console.log("he?")
// clicked 2
// Phải đợi khoảng 3s, mặc dù hàm setTimeout có thời gian đợi là 0s!
// he
// clicked
```

Những tác vụ có sử dụng Web APIs được gọi là những tác vụ asynchronous (điều ngược lại không đúng). Các tác vụ asynchronous (thường là `function`) sẽ có độ ưu tiên kém (chỉ được thêm vào event queue khi `callstack` trống lần đầu tiên - Hoàn thành hết code synchronous). Sau đó thì cũng sẽ được xử lý dưới cơ chế **event queue** & **event loops**. Sau khi đã qua hoàn thành code javascript synchronous thì mọi thứ sẽ được nhường về cho **Event Loops** và những thứ liên quan. Nên chú ý một chút về các `listener`, các `listener` phải được hoàn thành toàn bộ (callstack rỗng) thì event queue mới có thể đưa `listener` kế tiếp vào hoàn thành, vậy nên nếu `listener` trước chưa được hoàn thành thì phải đợi chờ đến khi được hoàn thành. Khi một listener đang chạy (tốn thời gian rất lâu) thì các interaction khác sẽ không chạy (ví dụ như `scroll`, `click`,..) cho nên đừng có làm gì quá rắc rối trong `listener` - Ví dụ như animation, đệ quy không có điểm dừng, tính số fibnacci ,... - cơ chế này có tên là "Run to completion".

Đây cũng chính là sức mạnh của Javascript khi so sánh với các ngôn ngữ khác!

Tổng kết lại, **event loops** sẽ xem xét xem thử có bất kỳ `event` nào phát ra tín hiệu không? Nếu có thì sẽ thêm vào event queue. Nếu callstack trống, **event queue** sẽ xử lý từng `listener` tương ứng với signal được `event` phát ra. **WebAPIs** cung cấp cho chúng ta các công cụ tiện lợi(`timers`, `fetch`, `file reader`, et cetera) và hoạt động dựa vào **event loops**! Tuy nhiên WebAPIs bao gồm nhiều hành động asynchronous, kỹ năng xử lý hành động asynchronous rất quan trọng khi làm việc với Javascript.

Có một câu hỏi hay khi phỏng vấn như thế này:"Javascript là ngôn ngữ lập trình đơn luồng hay là đa luồng? Tại sao Javascript lại là đơn luồng/ đa luồng? Nếu Javascript là đơn luồng thì tại sao tại thực hiện được nhiều tác vụ cùng một lúc (ví dụ như fetch nhiều request cùng lúc)?". Điều đâu tiên, javascript là ngôn ngữ đơn luồng bởi vì javascript chỉ có duy nhất một **callstack** và **heap**. Javascript không thực sự xử lý nhiều `request` cùng 1 lúc, chỉ là cơ chế Event loops của Javascript khiến cho Javascript trông như có thể xử lý nhiều hành động cùng 1 lúc (nhiều `event` có thể xảy ra cùng 1 lúc nhưng các `listeners` thì phải được giải quyết theo thứ tự). Nói về hàm `fetch`, Javascript có thể sử dụng hàm `fetch` để lấy thông tin nhiều `request` cùng lúc (`Promise.all`), tuy nhiên, fetch là **WebAPIs** - nghĩa là thứ thực hiện việc gọi nhiều request cùng lúc là Browser, runtime engine chứ không phải Javascript. Khi tất cả các request được hoàn thành (nhận được response) thì **WebAPIs** sẽ đẩy Event vào **Event Queue**, lúc này các `listeners` (hay là các đoạn code handle `promise`) sẽ được thực hiện lần lượt.

---

# References & more resources
- https://en.wikipedia.org/wiki/Event-driven_programming
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
- https://www.youtube.com/watch?v=8aGhZQkoFbQ
- https://medium.com/@giangcoffee/event-loop-l%C3%A0-g%C3%AC-v%C3%A0-ho%E1%BA%A1t-%C4%91%E1%BB%99ng-th%E1%BA%BF-n%C3%A0o-d52caa908090

### P/S:
Các đoạn code ở trên được mình chạy ở trên engine V8 của Chrome thông qua trình duyệt Brave. Có thể tuỳ thuộc vào các engine có một cách thực thi Javascript khác nhau nên có gì sai sót xin email cho mình để mình cập nhật. Xin cảm ơn!   
Last Updated: 07/05/2021