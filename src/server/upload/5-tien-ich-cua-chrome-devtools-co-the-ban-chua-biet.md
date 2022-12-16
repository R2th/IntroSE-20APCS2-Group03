Dưới đây là 5 tiện ích mà DevTools hỗ trợ để debug rất hay được tác giả sử dụng vì sự tiện lợi của nó

### $ và $$
Đây là 2 cách viết khác để lấy ra `selector` của một element:

```
$ tương đương với: document.querySelector()
$$ tương đương với: document.querySelectorAll()
```

Cách thứ nhất trả về một element và cách thứ 2 trả về một collection.
Có một chú ý là nếu bạn đang sử dụng thư viện Jquery thì ký tự $ sẽ bị ghi đè, tức là mọi thứ sẽ theo jQuery.
### Hàm inspect()
Hàm này có thể được kết hợp sử dụng với cách ở trên. Bạn biết là HTML document của chúng ta rất là lớn và chúng ta muốn chọn một button trong HTML document đó từ `console log` của trình duyệt. Giả sử ta có một HTML như sau:

![](https://images.viblo.asia/a02a8afc-8443-419f-abef-cb495c9e10bd.png)

Nếu chúng ta viết như sau:

```
    inspect($'button')
```
Sau khi bạn nhấn Enter, DevTools sẽ chuyển từ Console tab sang Element tab và hightlight HTML element được chọn.
Trong trường hợp trên thì DevTools sẽ lấy button đầu tiên.

Bạn có thể sử dụng $$ nếu muốn lấy hết tất cả các selector là button

```
    inspect($$'button')
```

Nó hiển thị một list các button trong Console và khi click vào element nào thì sẽ nhảy tới element đó trong Element tab.
### Monitor và Unmonitor
Nếu chúng ta muốn theo dõi khi một phương thức nào đó được gọi trên trang của chúng ta, chúng ta có thể sử dụng hàm `monitor()`.
Xem đoạn code dưới đây:

```
let app = new Vue({
      el: '#app',
      data: {
          message: 'super impressive counter',
          count: 0,
          isUgly: false,
          person: { first: 'alex', last: 'ritzcovan' }
      },
      methods: {
          increment() {
              this.count++;
          },
          decrement() {
              this.count--;
          },
          applyUgly() {
              this.isUgly = !this.isUgly;
          }
      }
  });
```

Nếu chúng ta muốn theo dõi hàm `applyUgly()` khi mà nó được gọi, như sau:

```
    monitor(app.applyUgly)
```
Bây giờ, bất cứ khi nào hàm `applyUgly` được gọi, DevTools sẽ log ra 

![](https://images.viblo.asia/3306517c-c0f5-43f9-b368-52159d19e6bf.png)

Còn khi muốn ngưng theo dõi hàm trên, chúng ta chỉ việc gọi `unmonitor`

![](https://images.viblo.asia/f6921238-7894-45b3-8067-37062824edfc.png)
#### Keys/values
Tiện ích này hữu dụng cho việc lấy ra `keys` hoặc `values` của một object.
ví dụ cho một object như sau:

```
    const myObj = {
          first: 'alex',
          last: 'ritzcovan',
          state: 'ny'
      }
```

Sử dụng `keys()` và `values()`, chúng ta có thể lấy ra keys và values bằng cách gọi object trực tiếp như sau:

![](https://images.viblo.asia/83b3a52e-a51c-455d-b66c-51de215039bb.png)

Cái này thực chất cũng là viết tắt của `Object.keys(myObj)` và `Object.values(myObj)`

### Table
Đây là cái cuối cùng mình muốn giới thiệu nhưng cũng không kém phần quan trọng đó là hàm `table()`.
Sử dụng lại object `myObj` ở trên, nếu chúng ta đưa nó vào làm tham số của hàm table, ta có kết quả như sau trên console:

![](https://images.viblo.asia/e93f8196-24a8-4a87-9c84-9b7f5f107f9b.png)

Nguồn tham khảo: [https://medium.com/dailyjs/5-chrome-devtools-utilities-you-need-to-know-5bfe58c75773](https://medium.com/dailyjs/5-chrome-devtools-utilities-you-need-to-know-5bfe58c75773)