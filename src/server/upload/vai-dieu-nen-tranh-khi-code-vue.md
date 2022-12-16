## Data/computed tĩnh
Khi bạn định nghĩa các data/computed tĩnh, Vue sẽ khiến các thuộc tính này `reactive` và điều này là không cần thiết vì bạn sẽ không thay đổi nó.
Giải pháp là đưa những thuộc tính này vào object  `vm.$options`

![](https://cdn-images-1.medium.com/max/1600/1*TUsVw4rEJwhw2iFuSyEWkw.png)

![](https://cdn-images-1.medium.com/max/1600/1*HYgxVfj99dt-yaGIeSABGw.png)

## Một vài loại data `non-reactive` nhưng bạn lại nghĩ là `reactive`

Vue sẽ không biết được khi nào thì `cookies` update, nên ví dụ dưới đây sẽ không hoạt động:

![](https://cdn-images-1.medium.com/max/1600/1*mSQ5DXcLOlFK6vfdz-Gyjw.png)

Thay vì thế, bạn hãy sử dụng `methods`  để update thủ công:

![](https://cdn-images-1.medium.com/max/1600/1*Q7HhvYfTsHNUZLMcnptbhw.png)

## Sử dụng mixins cho những việc vốn chỉ cần thực hiện 1 lần

Như ví dụ dưới đây, việc thêm global mixins khiến cho nó được gọi ở mọi components, tuy nhiên việc này không cần thiết

![](https://cdn-images-1.medium.com/max/1600/1*qCp4mZoUYKb2PPoqDFeByA.png)

Thay vào đó, chúng ta có thể thức hiện việc này một lần duy nhất ở root instance và sử dụng kết quả thông qua `$root`

![](https://cdn-images-1.medium.com/max/800/1*7-g24ZUvldsPh8XIIPaxTw.png)

## Sử dụng không đúng setTimout/setInterval

Việc gọi  `setTimout/setInterval` mà không `clearInterval` hoặc `clearTimeout` có thể gây ra lỗi khi unmmout component.

![](https://cdn-images-1.medium.com/max/800/1*FxPRflqqk8K6wRr4jUyFBQ.png)

Việc nên làm là sử dụng `clearInterval` ở hook `beforeDestroy` để xóa interval

![](https://cdn-images-1.medium.com/max/800/1*7kBqD5KNSkCTTpP2O7FUgw.png)

## Mutating parents data

Vue sẽ cảnh báo nếu bạn mutete props nhưng Vue lại không thể phát hiện việc bạn thay đổi data của parent thông qua ` $parent`

![](https://cdn-images-1.medium.com/max/800/1*MYb4iAVzlvQPZDWqCnJM0w.png)

Hãy emit event ở  component con và lắng nghe event ở component cha để làm điều đó

![](https://cdn-images-1.medium.com/max/800/1*pJkabHNu8Gx7f4UMM07FMg.png)

MOdifier `.sync` sẽ giúp bạn làm việc này đơn giản hơn

![](https://cdn-images-1.medium.com/max/800/1*yypns5Qp2y_t7HrsPT5O7g.png)

## Tự validate from data

Thực ra việc này không phải là cần tránh, mà chỉ là sugguest. Nếu việc code phần validate khiến code của bạn phình to quá

![](https://cdn-images-1.medium.com/max/800/1*yn_pt6eFfOIz-RvMEA30gQ.png)

thì có thể thử sử dụng [v-validate](https://monterail.github.io/vuelidate/) giúp code clean hơn nhiều

![](https://cdn-images-1.medium.com/max/800/1*omOSNM6WmpsYSN3C4dy4dw.png)

Trên đây là một số điều có thể bạn sẽ gặp phải trong quá trình sử dụng Vue. Chúc các bạn thành công!