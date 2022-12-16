# 1. VueJS là gì?
**VueJS** là một JavaScript framework mã nguồn mở, tiến bộ để xây dựng giao diện người dùng nhằm mục đích dần dần có thể được áp dụng. Thư viện cốt lõi của VueJS chỉ tập trung vào lớp `view` và dễ dàng tích hợp với các thư viện khác hoặc các dự án có sẵn.
# 2. Các tính năng chính của VueJS là gì?
Dưới đây là một số tính năng chính nổi bật trong VueJS:
1. **Virtual DOM:** Nó sử dụng DOM ảo tương tự như các framework hiện có khác như ReactJS, Ember, v.v. Virtual DOM là một đại diện cây trong bộ nhớ có dung lượng nhẹ của DOM HTML gốc và được cập nhật mà không ảnh hưởng đến DOM gốc.
2. **Component:** Được sử dụng để tạo các phần tử tùy chỉnh có thể tái sử dụng trong các ứng dụng VueJS.
3. **Template:** VueJS cung cấp các template dựa trên HTML liên kết DOM với dữ liệu.
4. **Định tuyến (routing):** Điều hướng giữa các trang được thực hiện thông qua vue-router.
5. **Nhẹ (light-weight):** VueJS là thư viện có trọng lượng nhẹ so với các framework khác.

# 3. Các phương thức vòng đời của VueJS là gì?
Các lifecycle hook cho thấy thư viện bạn đang sử dụng hoạt động như thế nào ở background. Bằng cách sử dụng các hook này, bạn sẽ biết khi nào thành phần của bạn được tạo, được thêm vào DOM, được cập nhật hoặc bị phá hủy. Hãy xem sơ đồ vòng đời trước khi đi đến chi tiết từng hook vòng đời,

 ![](https://images.viblo.asia/ad2e8676-a0c3-4a4a-b256-41dc79369d54.png)

1. **Khởi tạo:**
Creation Hooks cho phép bạn thực hiện các hành động trước khi thành phần của bạn thậm chí đã được thêm vào DOM. Bạn cần sử dụng các hook này nếu bạn cần thiết lập mọi thứ trong thành phần của mình cả trong quá trình client rendering và server rendering.
    1. **beforeCreate:**
Hook này chạy khi khởi tạo thành phần của bạn. hook quan sát dữ liệu và các sự kiện khởi tạo trong thành phần của bạn. Ở đây, dữ liệu vẫn chưa hoạt động và các sự kiện xảy ra trong vòng đời của thành phần chưa được thiết lập.
    ```javascript
        new Vue({
          data: {
           count: 10
          },
          beforeCreate: function () {
            console.log('Nothing gets called at this moment')
            // `this` points to the view model instance
            console.log('count is ' + this.count);
          }
        })
           // count is undefined
     ```
     2. **created:**
Hook này được gọi khi Vue đã thiết lập các sự kiện và quan sát dữ liệu. Tại đây, các sự kiện đang hoạt động và quyền truy cập vào dữ liệu phản ứng được bật mặc dù các mẫu chưa được gắn hoặc hiển thị.
    ```javascript
      new Vue({
        data: {
         count: 10
        },
        created: function () {
          // `this` points to the view model instance
          console.log('count is: ' + this.count)
        }
      })
         // count is: 10
    ```
    
2. **Mounting (Chèn DOM):**
Các mounting hook thường là những hook được sử dụng nhiều nhất và chúng cho phép bạn truy cập thành phần của mình ngay lập tức trước và sau lần hiển thị đầu tiên.
     1. **beforeMount:**
beforeMount cho phép bạn truy cập thành phần của mình ngay lập tức trước và sau lần hiển thị đầu tiên.
    ```javascript
      new Vue({
        beforeMount: function () {
          // `this` points to the view model instance
          console.log(`this.$el is yet to be created`);
        }
      })
    ```
    2. **mounted:**
Đây là hook được sử dụng nhiều nhất và bạn sẽ có toàn quyền truy cập vào thành phần phản ứng, các pattern và DOM được hiển thị (thông qua `this.$el`). Các pattern được sử dụng thường xuyên nhất là quá trình tìm lấy dữ liệu cho thành phần của bạn.
    ```javascript
    <div id="app">
        <p>I’m text inside the component.</p>
    </div>
      new Vue({
        el: ‘#app’,
        mounted: function() {
          console.log(this.$el.textContent); // I'm text inside the component.
        }
      })
    ```
    
3. **Cập nhật (Diff & Re-render):**
         Update hook được gọi bất cứ khi nào một thuộc tính phản ứng được sử dụng bởi thành phần của bạn thay đổi hoặc điều gì đó khiến nó hiển thị lại.
     1. **beforeUpdate:**
Hook `beforeUpdate` chạy sau khi dữ liệu thay đổi trên thành phần của bạn và chu kỳ cập nhật bắt đầu, ngay trước khi DOM được vá và hiển thị lại.
    ```javascript
    <div id="app">
      <p>{{counter}}</p>
    </div>
    ...// rest of the code
      new Vue({
        el: '#app',
        data() {
          return {
            counter: 0
          }
        },
         created: function() {
          setInterval(() => {
            this.counter++
          }, 1000)
        },

        beforeUpdate: function() {
          console.log(this.counter) // Logs the counter value every second, before the DOM updates.
        }
      })
    ```
    2. **updated:**
    Hook này chạy sau khi dữ liệu thay đổi trên thành phần của bạn và DOM hiển thị lại.
    ```javascript
    <div id="app">
      <p ref="dom">{{counter}}</p>
    </div>
    ...//
      new Vue({
        el: '#app',
        data() {
          return {
            counter: 0
          }
        },
         created: function() {
          setInterval(() => {
            this.counter++
          }, 1000)
        },
        updated: function() {
          console.log(+this.$refs['dom'].textContent === this.counter) // Logs true every second
        }
      })
    ```
    
4. **Hủy (Teardown):**
Destruction hook cho phép bạn thực hiện các hành động khi thành phần của bạn bị phá hủy, chẳng hạn như dọn dẹp hoặc gửi phân tích.
    1. **beforeDestroy:**
`beforeDestroy` được gọi ngay trước khi hủy. Nếu bạn cần dọn dẹp các sự kiện hoặc đăng ký phản ứng, trước đây có lẽ là lúc bạn nên làm điều đó. Thành phần của bạn sẽ vẫn có đầy đủ và hoạt động.
    ```javascript
    new Vue ({
      data() {
        return {
          message: 'Welcome VueJS developers'
        }
      },

      beforeDestroy: function() {
        this.message = null
        delete this.message
      }
    })
    ```
    2. **destroyed:**
Các hook này được gọi sau khi thành phần của bạn đã bị phá hủy, các lệnh của nó không được liên kết và các trình nghe sự kiện của nó đã bị xóa.
    ```javascript
    new Vue ({
        destroyed: function() {
          console.log(this) // Nothing to show here
        }
      })
    ```
# 4. Các lệnh điều kiện là gì?
VueJS cung cấp tập hợp các chỉ thị để hiển thị hoặc ẩn các phần tử dựa trên các điều kiện. Các lệnh có sẵn là: **v-if, v-else, v-else-if và v-show**

**1. v-if:** Chỉ thị v-if dùng để thêm hoặc xóa các phần tử DOM dựa trên biểu thức đã cho. 

Ví dụ: nút bên dưới sẽ không hiển thị nếu isLoggedIn được thiết lập thành false.
```javascript
<button v-if = "isLoggedIn"> Đăng xuất </button>
```
Bạn cũng có thể kiểm soát nhiều phần tử bằng một câu lệnh v-if bằng cách gói tất cả các phần tử trong phần tử `<template>` với điều kiện. Ví dụ: bạn có thể áp dụng đồng thời cả nhãn và nút có điều kiện,
```javascript
<template v-if = "isLoggedIn">
  <label> Đăng xuất </button>
  <button> Đăng xuất </button>
</template>
```

**2. v-else:** Chỉ thị này chỉ được sử dụng để hiển thị nội dung khi biểu thức liền kề v-if chuyển thành false. Điều này tương tự như khối else trong bất kỳ ngôn ngữ lập trình nào để hiển thị nội dung thay thế và nó được đặt trước bởi khối v-if hoặc v-else-if. Bạn không cần phải chuyển bất kỳ giá trị nào cho nó.

Ví dụ: v-else được sử dụng để hiển thị nút Đăng nhập nếu isLoggedIn được đặt thành false (chưa đăng nhập).
```javascript
<button v-if = "isLoggedIn"> Đăng xuất </button>
<button v-else> Đăng nhập </button>
```
    
**3. v-else-if:** Chỉ thị này được sử dụng khi chúng ta cần kiểm tra nhiều hơn hai tùy chọn.

Ví dụ: chúng tôi muốn hiển thị một số văn bản thay vì nút Đăng nhập khi thuộc tính ifLoginDisabled được đặt thành true. Điều này có thể đạt được thông qua câu lệnh v-else.
```javascript
<button v-if = "isLoggedIn"> Đăng xuất </button>
<label v-else-if = "isLoginDisabled"> Đăng nhập của người dùng bị tắt </label>
<button v-else> Đăng nhập </button>
```

**4. v-show:** Chỉ thị này tương tự như v-if nhưng nó hiển thị tất cả các phần tử tới DOM và sau đó sử dụng thuộc tính hiển thị CSS để hiển thị / ẩn các phần tử. Chỉ thị này được khuyến nghị nếu các phần tử được bật và tắt thường xuyên.
```javascript
<span v-show = "user.name"> Chào mừng người dùng, {{user.name}} </span>
```

# 5. Sự khác biệt giữa chỉ thị v-show và v-if là gì?
Dưới đây là một số điểm khác biệt chính giữa các lệnh **v-show** và **v-if**,

1. `v-if` chỉ kết xuất phần tử tới DOM nếu biểu thức chuyển trong khi `v-show` kết xuất tất cả các phần tử tới DOM và sau đó sử dụng thuộc tính hiển thị CSS để hiển thị / ẩn các phần tử dựa trên biểu thức.
 2. `v-if` hỗ trợ các chỉ thị `v-else` và `v-else-if` trong khi v-show không hỗ trợ các chỉ thị else.
 3. `v-if` có chi phí chuyển đổi cao hơn trong khi `v-show` có chi phí hiển thị ban đầu cao hơn. tức là `v-show` có lợi thế về hiệu suất nếu các phần tử được bật và tắt thường xuyên, trong khi `v-if` có lợi thế khi nói đến thời gian hiển thị ban đầu.
 4. `v-if` hỗ trợ tab `<template>` còn `v-show` thì không hỗ trợ.