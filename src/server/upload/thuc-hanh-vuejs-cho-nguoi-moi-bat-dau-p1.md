Học một framework mới có thể là một quá tình rất khó khăn đối với bất kì một developer nào, đặc biệt đối với một người vẫn đang học ngôn ngữ cơ bản(Javascript). Tôi sẽ viết mộy series làm cho việc ọc Vue.js trở nên dễ dàng và dễ hiểu nhất có thể.

Điều kiện là bạn cần có một số kiến thức HTML/CSS/Js cơ bản. Bạn ko cần là một dev front-end có kinh nghiệm nưng ít nhất bạn cần có khả năng viết HTML, hiểu cơ bản về cách CSS hoạt động, và cách viết javascript.

# Vue as library
Có một số cách mà bạn có thể kết hợp Vue vào dự án của mình. hãy bắt đầu bằng cách đơn giản nhất.
Hầu hết các bài hướng dần/bài viết sẽ chỉ cho bạn về cách thiết lập môi trường phát triển, tỏng đó bạn sẽ sử dụng những thứ như npm, webpack để thiết lập project của bạn. Haỹ thoát ra khỏi hộp - chúng ta có thể bắt đầu với một cách tiếp cận thân thiện với người mói bắt đầu đơn giản hơn nhiều. thẻ `<script>` đáng tin cậy.
Đầu tiên, tạo một file mới tên là index.html.
```
<html>
  <head>
    <title>Vue 101</title>
  </head>

  <body>
    <h1>Hello!</h1>
    <div id="app"></div>
  </body>
</html>
```
Không có gì lạ, chúng ta thiết lập "khung xương" cho một trang web đơn giản. Bây giờ chúng ta hãy import thư viện Vue vào đó. Dán thẻ tập lệnh này trước khi đóng thẻ </body>.
```
[...]
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</body>
```
Bây giờ Vue đang được tải vào trang của chúng ta, chúng ta có thể bắt đầu sử dụng nó.

Hãy tiếp tục và tạo một Vue instance mới bằng cách thêm `new` trong thẻ `<script>`. Tôi sẽ tạo một selector bằng cách pass #app đến thuộc tính el của đối tượng options và theo cách này chúng ta sẽ biết ứng dụng của mình sẽ được hiển thị ở đâu.(<div> có id của app).
```
<script>
    const app = new Vue({
        el: '#app', // 1
        data: { // 2
            myLocalProperty: 'Im a local property value' // 3
        }
    });
</script>
```
Vậy điều gì xảy ra ở đây?
Chúng ta đã tạo ra thực thể Vue và truyền cho nó một đối tượng xem {} là một tham số.
*     `el`: Như tôi đã đề cập ở trên, ở đây chúng ta nói với Ve rằng trong HTML của mình tôi muốn ứng dụng của mình được hiển thị. Trong trường hợp này, div với app id.
*     `data`: Mỗi thực thể Vue có một bộ lưu trữ cục bộ, giống như một hộp các variables và thuộc tính mà nó sẽ giữ cho mình và ta có thể sử dụng khi coding app. Data chứa một object javascript nên tôi sẽ gán bằng cú pháp {}.
*     `myLocalProperty`: Thuộc tính này được định nghĩa bên trong `data`

# Displaying properties on our app
Ngay bây giơf nếu bạn mở index.html sẽ có có nhiều chuyện xảy ra.
    
Hãy thêm một số code để hiển thị thuộc tínhtrong HTML. File của bạn sẽ như thế này:
```
<html>
    <head>
        <title>Vue 101</title>
    </head>

    <body>
        <h1>Hello!</h1>
        <div id="app">
          <p>My local property: {{ myLocalProperty }}</p>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

        <script>
          const app = new Vue({
            el: '#app',
            data: {
              myLocalProperty: 'Im a local property value'
            }
          });
        </script>
    </body>
</html>
```
Hãy chú ý đến dòng này:
```
<p>My local property: {{ myLocalProperty }}</p>
```
Điều xảy ra ở đây được gọi là phép nội suy biến `variable interpolation`.
    
Tải lại trang và bây h bạn sẽ thấy các chuột đã được cập nhật theo biến của ta.
Bạn tiếp tục thay đồi chuỗi bên trong myLocalProperty thành text khác, bạn sẽ thấy trang được cập nhật tương ứng.

# Reactivity
Cuối cùng, đối với bài viết này hãy nói về `reactivity`. Bạn có thẻ đã nghe nói rằng Vue là ột reactive framework. Nhưng chính xác điều này có nghĩa là gì? Hãy mở cốnle ttrong trình duyệt developer tools trên trang index.html của bạn gõ:
```
app.myLocalProperty = 'Vue is reactive';
````
Bạn sẽ thấy trang react với sự thay đổi của biến này.
Hãy theo dõi phần sau ở lần sau nhé!
    
Mình hi vọng bài viết sẽ giúp được các bạn phần nào, nếu có góp ý cho mình hãy comment bên dưới nhé. Source: https://dev.to/vuevixens/hands-on-vuejs-for-beginners-part-1-2j2g