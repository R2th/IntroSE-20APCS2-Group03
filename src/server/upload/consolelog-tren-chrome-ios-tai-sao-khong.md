Bạn đã biết mình có thể `Console.log` trên chính chiếc điện thoại của mình hay chưa ? Tôi thật sự kinh ngạc khi lần đầu sử dụng nó và chắc chắc rằng nó sẽ thật sự có ích đối với anh em developer chúng ta. 

Tất nhiên, bạn có thể debug trên iOS bằng safari, nhưng do khi dùng safari sẽ dẫn đến một số khó khăn nhất định, do đó đội ngũ Chrome đã quyết định build 1 cái logger của riêng họ.

Cách hoạt động:
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--T5hF25QL--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://cdn.hashnode.com/res/hashnode/image/upload/v1612624732869/EC8QonfNP.gif" />
### Cách dùng
Mở chrome lên và nhập vào thanh tìm kiếm:
```
chrome://inspect
```
Chrome sau đó sẽ hiện 1 tab như thế này:
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--JKFdIYav--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn.hashnode.com/res/hashnode/image/upload/v1612624974716/gjdFmdlV4.png" />
Các bạn ấn start logging, sau đó mở tab khác, nên nhớ là mở tab khác mà không đóng tab hiện tại,
truy cập vào site bạn muốn debug.
Ví dụ, tôi mở codepen sau khi mở site debug, gõ `console.log("Hello Chrome iOS debuggger")` vào khung viết code js, kết quả sẽ ra như này:

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s---hjmdm2R--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn.hashnode.com/res/hashnode/image/upload/v1612625017613/mtdHjv8vF.png" />

### Chúc các bạn thành công!

* Nguồn: https://dev.to/dailydevtips1/console-log-on-chrome-for-ios-i66