Ở bài trước chúng ta đang dừng lại ở reactivity. Phần này bạn sẽ thực hành cùng tôi về events, methods, directives và conditional.
# Listening to events
Ở bài trước ta đang nói đến reactivity của Vue, source code đang là
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
Để thực hành với event, ta sẽ thêm một button để thay đổi giá trị `myLocalProperty`
```
<div id="app">
  <p>My local property: {{ myLocalProperty }}</p>
  <hr>
  <button>Click me</button>
</div>
```
Vậy làm thế nào để gọi event khi click button? Trong Jquery: `$('button').click();` Nhưng đối với Vue có một quy tắc là không bao giờ thao tác trực tiếp với DOM. Chúng sẽ copy một bản HTML ảo sau đó tự động tìm ra vị trí và cập nhật nó khi thuộc tính  thay đổi.  
Vì thế, hãy thêm event vào button:
```
<button @click="myLocalProperty = 'The button has been clicked'">//@click là shorthands của v-on:click
  Click me
</button>
```
Điều gì xảy ra ở đây: `@click=""` là một  directives trong vue. Nó có thể hiểu là khi ta click vào DOM đã khai báo thì sẽ thực hiện một hành động nào đó. Cụ thể khi click vào button nó thay đổi giá trị của `myLocalProperty` từ "Im a local property value" sang  "The button has been clicked".
# Methods
Trong hầu hết các trường hợp, khi dùng @click điều bạn cần làm nhiều hơn là thay đổi giá trị của một biến. Do đó hãy tìm hiểu về methods(functions).  
Tiếp tục với ví dụ trên. khi click vào nút ta sẽ gọi một hàm đơn giản chẳng hạn như hiển thị một giá trị ngầu nhiên mới.     
Trước hết hãy replace bằng dòng code sau:
```
<button @click="buttonClicked">Click me</button> // Chúng ta có thể bỏ qua "()" sau function khi ta không truyền bất kì đối số nào vào function.
```
Tiếp theo ta sẽ handle function buttonClicked
```
<script>
  const app = new Vue({
    el: '#app',
    data: {
      myLocalProperty: 'Im a local property value'
    },
    methods: { // Khai báo một thuộc tính methods bên trong Vue instance, bên trong nó đặt tất cả các functions/methods.
      buttonClicked() { // Hàm này chính là hàm đã gọi ở sự kiện click trên DOM và nó ko có tham số truyênf vào.
        const newText = 'The new value is: ' + Math.floor( Math.random() * 100); // Chúng ra randoms một số mới

        this.myLocalProperty = newText; // Gán giá trị của chuỗi mới cho `myLocalProperty`
      }
    }
  });
</script>
```
Trong các method, từ khóa `this` sẽ đề cập đến Vue instance. Vue sẽ thực hiện một số magic đằng sau để bạn có thể đọc/viết các thuộc tính của mình bên trong data bằng cách thực hiện this.property=value.  
Đã xong, bây giờ bạn hãy reload index và click button để xem giá trị myLocalProperty đựoc cập nhật nhé.
# A simple if-else
Một trong những phần quan trọng nhất hay sử dụng là conditional. Khả năng hiển thị hoặc ẩn các phần trong ứng dụng phụ thuộc vào một điều kiện hoặc giá trị nào đó.   
Tiếp tục ví dụ @click ở trên, ta sẽ thay đổi các lần click vào button để tạo ra số ngẫu nhiên nhưng thay vì return ra chuỗi string ta sẽ chuyển đổi hiển thị một vài phần tử trên DOM.  
Trước hết, cấu trúc lại phần script của mình một tí :
```
<script>
  const app = new Vue({
    el: '#app',
    data: {
      myLocalProperty: 'Im a local property value',
      randomNumber: 0 // add thêm một biến local mới với giá  trị mặc định là 0
    },
    methods: {
      buttonClicked() {
        this.randomNumber = Math.floor(Math.random() * 100); // Thay dổi function lưu lại số ngẫu nhiên vào biến đã khởi tạo
      }
    }
  });
</script>
```
Ta muốn hiển thị/ẩn nội dung của thẻ `<p>` tùy thuộc vào gias trị `randomNumber` mỗi khi click button. Chỉ show khi giá trị lớn hơn 50
```
<div id="app">
  <p>My local property: {{ myLocalProperty }}</p>
  <hr>
  <button @click="buttonClicked">Click me</button>
  <hr>
  <!-- 1 -->
  <p v-if="randomNumber >= 50">randomNumber is >= 50!</p>// v-if là một directive của Vew. Về mặt lý thuyết, v-if "bảo" với Vue chỉ hiển thị phần tử này khi điều kiện bên trong nó là đúng cụ thể là "randomNumber lớn hơn hoặc bằng 50"

  <!-- 2 -->
  <p v-else>Sorry, randomNumber is only <b>{{ randomNumber }}</b></p>// Bất cứ khi nào có v-if sẽ có v-else là trường hợp khác không đúng với trường hợp trên (Either/or)
</div>
```
Tải lại trang và xem thẻ `<p>` hiện thị cái gì nhé!
# v-show
Một lựa chọn nữa cho việc hiện hoặc ẩn một phần tử web theo điều kiện là directive v-show. Cách dùng v-show cũng tương tự với v-if.  
Điểm khác biệt giữa v-show và v-if là phần tử được đánh dấu với v-show sẽ luôn luôn được render và chứa trong DOM; v-show chỉ bật tắt thuộc tính display của phần tử này.
> v-show không hỗ trợ thẻ <template> và cũng không hoạt động với v-else.            

v-if và v-show – khi nào thì dùng gì???  
v-if là render theo điều kiện “thật sự,” vì nó bảo đảm các event listener và component con bên trong khối điều kiện được hủy và khởi tạo lại trong quá trình bật/tắt.

v-if cũng lười biếng (lazy): nếu giá trị của điều kiện là false trong lần render đầu tiên, nó sẽ không làm gì cả - khối điều kiện sẽ không được render cho đến khi điều kiện trở thành true lần đầu tiên.

Trong khi đó, v-show đơn giản hơn nhiều - phần tử sẽ được render bất kể điều kiện là đúng hay sai, và chỉ được hiện/giấu đi bằng CSS.

Nói chung, v-if có phí tổn bật/tắt cao, còn v-show có phí tổn render cao. Vì thế, nếu bạn cần bật/tắt thường xuyên, hãy dùng v-show. Ngược lại, nếu điều kiện ít khi thay đổi trong suốt vòng đời của ứng dụng, hãy dùng v-if.
 
# Conclusion
Với các phần tôi đã đề cập, có thể bạn đã bắt đầu tạo làm ứng dụng của bạn thêm thú vị. Hãy cúng đón chờ và theo dõi part3 nhé