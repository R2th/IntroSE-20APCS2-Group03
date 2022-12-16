![Hiệu ứng động cho số tăng dần](https://images.viblo.asia/cce54e77-f098-4b4b-b4b3-b5941ccc259b.png)

Trong xây dựng trang Landing Page, một khu vực đóng vai trò cực quan trọng để gây hứng thú cho người xem chính chính là **khu vực hiển thị những số liệu**. Bởi những con số, thống kê chính là thứ rõ ràng và khách quan nhất và luôn dễ dàng dành được sự quan tâm cho người xem. Một cách rất hay để làm "nổi bật" khu vực này trên trang Landing của bạn là thêm **hiệu ứng động tăng dần** cho các con số.

Có rất nhiều thư viện "mì ăn liền" giúp bạn tạo hiệu ứng kể trên mà bạn có thể dễ dàng tìm thấy trên NPM. Tuy nhiên, ở bài viết này, mình xin được đi cùng các bạn tìm hiểu các giải pháp để tạo hiệu ứng kể trên và tạo ra nó **từ con số 0** chỉ bằng **Javascript thuần**, và cũng qua đó tìm hiểu thêm về Javascript nhé.

# Tạo template ban đầu
Mình đã tạo nhanh chóng một template HTML một mục số liệu đơn giản. Đây là phần template để chúng ta thực hành trong bài này.

{@embed: https://codepen.io/tranxuanthang/pen/rNOozNJ}

# Tạo hiệu ứng số tăng dần
## Giải pháp `setInterval()`
### Bước đầu dùng thử
Hàm `setInterval()` hoạt động rất đơn giản: nó giúp chúng ta liên tục **chạy một hàm lặp đi lặp lại**, với một khoảng thời gian delay do chúng ta lựa chọn. Những lời gọi hàm qua `setInterval()` cũng được thực hiện theo cách bất đồng bộ. Nghe ban đầu thôi là đã đủ thấy `setInterval()` rất phù hợp để dùng làm tạo animation cho chúng ta ngày hôm nay. Giờ mình sẽ thử dùng nó để tạo animation xem liệu chúng ta có gặp vấn đề gì không nhé.

Sau một hồi, mình tạo ra được một hàm khá "ngây thơ" để làm nhiệm vụ animate như sau:

```javascript
function animateNumber(finalNumber, delay, startNumber = 0, callback) {
  let currentNumber = startNumber
  const interval = window.setInterval(updateNumber, delay)
  function updateNumber() {
    if (currentNumber >= finalNumber) {
      clearInterval(interval)
    } else {
      currentNumber++
    }
    callback(currentNumber)
  }
}
```

Hàm này chỉ làm nhiệm vụ: liên tục tăng số thêm 1 cho đến khi bằng số ban đầu thì thôi. Với mỗi lần tăng số, mình lại gọi vào một callback. Callback này được truyền vào khi sử dụng hàm trên, giúp hoàn thiện nốt những tác vụ còn lại như format số (về dạng phân cách phần nghìn kiểu 1,000,000 chẳng hạn) và cập nhật nó lên giao diện. Một ví dụ về việc sử dụng hàm trên như sau:

```javascript
animateNumber(98, 50, 0, function (number) {
    const formattedNumber = number.toLocaleString()
    document.getElementById('city-count').innerText = formattedNumber
  })
```

Phía trên là đoạn code để mình áp dụng hiệu ứng cho số 98 ở mục "thành phố", với delay giữa mỗi lần cập nhật là 50ms, số bắt đầu đếm từ 0. Số sẽ được format theo dạng phân cách phần nghìn với phương thức `toLocaleString()`. Sau khi format xong, số đó được thêm vào phần tử có id là `city-count`.

Và khi áp dụng vào cái template đã có ở phần đầu bài, kết quả ban đầu mình nhận được là thế này:

{@embed: https://codepen.io/tranxuanthang/pen/VwvqzYN}

Bước đầu trông cũng khá ngon đấy, nhưng vướng ngay phải một vấn đề:
* Phần "thành phố" thì chạy khá ngắn.
* Phần "khách hàng" thì chạy tương đối lâu mới dừng lại.
* Phần "lượt giao dịch" thì vì số quá lớn, nên **chạy mãi không xong** luôn, cho dù đã đặt delay rất ngắn.

Rõ ràng số đếm lâu như phần "lượt giao dịch" không phải là cái mình muốn. Với tăng số lần lượt 1 đơn vị với lượt giao dịch tận 4000000, bạn **mất sơ sơ >60 phút** để bộ đếm dừng lại, đấy là với delay được set là 1ms.

Hơn nữa, sẽ tốt hơn nhiều nếu để cả 3 thông số "thành phố", "khách hàng" và "lượt giao dịch" cùng hoàn thành đếm xong trong cùng một khoảng thời gian, ví dụ 5 giây chẳng hạn. Vậy phải làm sao để cải thiện nó?

### Thay đổi cách tăng số
Thế rồi mình nhận thấy ngay có 2 chỗ có thể cải thiện:
* Không nhất thiết mỗi lần repeat lại hàm là phải tăng chỉ 1 đơn vị. Mình hoàn toàn có thể +5, +10 hoặc nhiều hơn thế.
* Hầu hết các màn hình hiện nay đều có tần số quét là 60Hz, đồng nghĩa với việc chỉ hiển thị được tối đa là **60 khung hình/giây**. Vậy mình có thể chỉ cần set cứng delay là 17ms là đủ (vì 1000/60 xấp xỉ bằng 17).

Hàm `animateNumber()` của mình được cải thiện thêm như sau:

```javascript
function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
  let currentNumber = startNumber
  const interval = window.setInterval(updateNumber, 17)
  function updateNumber() {
    if (currentNumber >= finalNumber) {
      clearInterval(interval)
    } else {
      let inc = Math.ceil(finalNumber / (duration / 17))
      if (currentNumber + inc > finalNumber) {
        currentNumber = finalNumber
        clearInterval(interval)
      } else {
        currentNumber += inc
      }
      callback(currentNumber)
    }
  }
}
```

Ở trên đây, mình đã đặt thời gian delay thành 17ms. Đồng thời, lượng số tăng thêm mỗi lần chạy của `setInterval()` đã thay đổi linh động theo thời gian chạy mong muốn của người dùng.

```javascript
let inc = Math.ceil(finalNumber / (duration / 17))
```

Ví dụ, nếu số bạn muốn animate là 10000, và thời lượng animate là 5000ms. Vậy là có (xấp xỉ) 5000/17 = 300 lần chạy lặp lại của `setInterval()` tất cả, và mỗi lần lặp như thế bạn cần cộng số hiện tại thêm 10000/300 = 34 để hiệu ứng số đếm của ta được tăng đều.

Cách sử dụng cũng tương tự phần đầu (mình animate cho số 98 với tổng thời lượng là 3000ms, bắt đầu khởi điểm từ số 0):

```javascript
animateNumber(98, 3000, 0, function (number) {
    const formattedNumber = number.toLocaleString()
    document.getElementById('city-count').innerText = formattedNumber
  })
```

Và đây là thành quả:

{@embed: https://codepen.io/tranxuanthang/pen/QWjzzPQ}

Tuy 3 số chưa hẳn 100% đã dừng cùng lúc với nhau, nhưng kết quả đã tuyệt hơn nhiều rồi nhỉ :D

# Tạm kết
Sự thật là, `setInterval()` **chưa phải là lựa chọn tốt nhất** để tạo ra các hiệu ứng, animation cho Web. Nếu ở ví dụ trên, thiết bị được sử dụng có cấu hình thấp (ví dụ như smartphone đời cũ), hay nếu thiết bị đang có nhiều tác vụ đang chạy thì `delay` của `setInterval()` sẽ không cho thời gian như mong đợi, có thể mất lâu hơn 17ms rất nhiều, và kết quả cuối cùng là FPS tụt và **thời gian animation sẽ lâu hơn** đáng kể.

Ở phần kế tiếp, mình xin được cùng các bạn tìm hiểu về một **API hoàn toàn mới** vốn được thiết kế dành riêng cho animation: `requestAnimationFrame()` và làm cho phần code hiệu ứng của chúng ta hoàn thiện hơn nữa.