# Mở đầu
Bạn đang đọc document của Vue? Và mọi thứ có vẻ đang thuận lợi. Prop, component, event. Okay, so far so good. Vue có vẻ như dễ hơn bạn tưởng, bạn sắp thành pro đến nơi rồi.

Nhưng không, đột nhiên một thứ không mong chờ xuất hiện.

> nextTick()

Hmm, bạn mới bắt đầu hiểu được Vue một chút mà...


Dù sao thì, đừng hoảng loạn. Hãy bình tĩnh và quay lại từ cơ bản nào. Ý mình là document của Vue nổi tiếng vì là một trong số những document tốt nhất mà.

> Vue.nextTick( [callback, context] ) 
> 
> Defer the callback to be executed after the next DOM update cycle. Use it immediately after you’ve changed some data to wait for the DOM update.
> 
>Trì hoãn callback để thực hiện sau chu kỳ cập nhật DOM tiếp theo. Thực hiện nó ngay lập tức sau khi bạn đã thay đổi một số dữ liệu để chờ DOM cập nhật.


![](https://images.viblo.asia/b15b39e6-51e6-470c-8b0e-699fe9f31652.gif)

*Cái gì* cơ?

*Cái gì* thực hiện sau khi *cái gì* làm *cái gì* cơ?

Mình hiểu bạn đang cảm thấy thế nào.

Tuy nhiên đừng hoảng sợ! nextTick() của Vue có vẻ trông đáng sợ lúc đầu, nhưng có 2 điều bạn cần biết:
1. Nó không được sử dụng thường xuyên lắm. Bạn có thể viết một vài ứng dụng mà chỉ đụng phải nextTick() một hay hai lần.
2. Nó sẽ dễ hiểu hơn một khi bạn gặp một vài trường hợp cụ thể. Sau khi bạn hiểu ý tưởng, bạn sẽ không còn sợ nữa, và bạn sẽ có một công cụ tiện dụng dưới thắt lưng của bạn.

Vậy thì cùng bắt đầu nào.

# Hiểu về nextTick()

Chúng ta là lập trình viên, chúng ta sẽ sử dụng cách tiếp cận "chia để trị" để dịch đoạn document kia từng chút một, hãy bắt đầu với:
> Defer the callback.
> 
> Trì hoãn callback.
> 
Ok, giờ chúng ta biết nó sẽ chấp nhận một callback. Vậy thì nó sẽ trông thế này:
```js
Vue.nextTick(function () {
  // do something cool
})
```
Tuyệt, vậy callback này được trì hoãn, cho đến...
>the next DOM update cycle.
>
>chu kỳ cập nhật DOM tiếp theo.

Được rồi, bạn có thể sẽ biết rằng **Vue thực hiện cập nhật DOM không đồng bộ**. Nó có một cách để giữ các bản cập nhật này được "lưu trữ" cho đến khi nó được áp dụng. Nó tạo ra một queue của các cập nhật và đẩy chúng ra khi cần thiết. Sau đó, DOM được "vá" và được cập nhật lên phiên bản mới nhất.

![](https://images.viblo.asia/ec9022e3-2e5f-4ca8-a8b9-b188e627e05c.gif)

Cái gì, không hiểu sao? Được rồi, để mình thử lại nhé: tưởng tượng component của bạn làm một việc cực kì quan trọng và thông minh kiểu `this.potatoAmount = 3`. Vue sẽ không render lại component (và cả DOM) tự động. Nó sẽ xếp các yêu cầu sửa đổi vào một hàng đợi. Sau đó, trong "tick" tiếp theo (như một tick tắc trong đồng hồ), hàng đợi được đẩy ra và cập nhật được áp dụng. *Tada!*

Được rồi! Giờ thì chúng ta biết rằng chúng ta có thể sử dụng nextTick () để truyền một callback mà sẽ được thực thi **ngay sau khi** dữ liệu được set và DOM đã được cập nhật.


Mình có thể nghe thấy não bạn đang la hét đâu đây.

> Trời má, tại sao mình cần cái này làm cái quái gì?

Như mình đã nói trước đó, nó không được sử dụng thường xuyên lắm. Cách tiếp cận dữ liệu trên nền tảng Vue, React và một số khác từ Google khiến nextTick() không cần thiết trong hầu hết trường hợp. Tuy nhiên, đôi khi chúng ta cần đợi một số phần tử *xuất hiện / biến mất /  sửa đổi* trong DOM. Đây là khi nextTick() có ích.

>Use it immediately after you’ve changed some data to wait for the DOM update.
>
>Thực hiện nó ngay lập tức sau khi bạn đã thay đổi một số dữ liệu để chờ DOM cập nhật.


Chính xác! Đây là phần định nghĩa cuối cùng mà document Vue cung cấp cho chúng ta. Bên trong callback của chúng ta, DOM đã được cập nhật để chúng ta có thể tương tác với phiên bản "mới nhất" của nó.

# Chứng minh
Okay, okay. Hãy thử [demo Codepen này](https://codepen.io/thangcx-1985/pen/dyKBYZz). Mở console lên, và bạn sẽ thấy rằng giá trị dữ liệu của chúng ta đã được  cập nhật chỉ bên trong callback của nextTick:
{@embed: https://codepen.io/thangcx-1985/pen/dyKBYZz}

# Một trường hợp cụ thể
Giờ hãy thử xác định một số trường hợp hữu dụng để sử dụng nextTick().

Hãy tưởng tượng rằng bạn cần thực hiện một số hành động khi một component đã được mounted. NHƯNG! Không chỉ component. Bạn cũng cần đợi cho đến khi tất cả các phần tử con của nó được mounted và có hiệu lực trong DOM. Đây là lúc vấn đề xảy ra, mounted  hook không đảm bảo rằng tất cả phần tử component đã được render.

Giá như mà có một thứ gì dùng để đợi chu kỳ cập nhật DOM tiếp theo...

Và đây là lúc để tỏa sáng:

```js
mounted() {
  this.$nextTick(() => {
    // The whole view is rendered,
    // so I can safely access or query the DOM. ¯\_(ツ)_/¯
  })
}
```

# Tổng kết

Vậy: nextTick() là một cách tiện dụng để thực hiện một function sau khi dữ liệu đã được set và DOM đã được cập nhật.

Bạn cần đợi DOM, có thể vì bạn cần thực hiện một số chuyển đổi hoặc bạn cần đợi thư viện bên ngoài tải nội dung của nó? Vậy thì hãy sử dụng nextTick().