Trong bài viết đầu tiên của Khóa học Vue.js chúng ta đã cùng nhau thực hiện ví dụ Hello world với bằng cả Vue.js và jQuery, cả hai đều hoạt động tốt và ở bài viết này tôi cũng đã cảnh báo nếu số lượng các thẻ <h1> và thẻ <input> thì việc quản lý code trong jQuery sẽ phức tạp hơn nhiều. (Bạn nên xem lại ví dụ Hello world trong bài Giới thiệu framework Vue.js để hiểu hơn về ví dụ tiếp theo đây).

```php
<html>
<head>
    <title>Quản lý trạng thái trong jQuery - allaravel.com</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <div class="row">          
            <div class="col-md-12">
                <h1 id="display-1">Xin chào, tôi là Vue.js</h1>
                <h1 id="display-2">Xin chào, tôi là Vue.js</h1>
                <h1 id="display-3">Xin chào, tôi là Vue.js</h1>
            </div>
        </div>
        <div class="row">          
            <div class="col-md-12">
                <input id="input-1" type="text" value="Xin chào, tôi là Vue.js">
                <input id="input-2" type="text" value="Xin chào, tôi là Vue.js">
                <input id="input-3" type="text" value="Xin chào, tôi là Vue.js">
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $("#input-1").on("change blur keyup mouseup", function() {
                var text = $(this).val();
                $("#display-1").text(text);
                $("#display-2").text(text);
                $("#display-3").text(text);
                $("#input-2").val(text);
                $("#input-3").val(text);
            });
            $("#input-2").on("change blur keyup mouseup", function() {
                var text = $(this).val();
                $("#display-1").text(text);
                $("#display-2").text(text);
                $("#display-3").text(text);
                $("#input-1").val(text);
                $("#input-3").val(text);
            });
            $("#input-3").on("change blur keyup mouseup", function() {
                var text = $(this).val();
                $("#display-1").text(text);
                $("#display-2").text(text);
                $("#display-3").text(text);
                $("#input-1").val(text);
                $("#input-2").val(text);
            });
        });
    </script>
</body>
</html>
```
    
 
    
Ví dụ này không có gì đặc biệt, khi bạn thay đổi văn bản trong bất kỳ 3 ô nhập liệu thì dữ liệu sẽ cập nhật lại tất cả các thành phần khác trong giao diện. Nó hoạt động tốt và không có vấn đề gì nếu số lượng chỉ là 3 thẻ <h1> và 3 thẻ <input>. Bạn thử tưởng tượng một ứng dụng có đến hàng trăm chỗ cần cập nhật giá trị, thật là rối rắm khi lượng code phải kiểm tra cập nhật nhiều lên rất nhanh. Chúng ta hãy thử viết lại ví dụ này với Vue.js nhé.


 ```php
 <html>
<head>
    <title>Quản lý trạng thái trong Vue.js - allaravel.com</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container" id="app">
        <div class="row">          
            <div class="col-md-12">
                <h1 id="display-1">{{ myObject.message }}</h1>
                <h1 id="display-2">{{ myObject.message }}</h1>
                <h1 id="display-3">{{ myObject.message }}</h1>
            </div>
        </div>
        <div class="row">          
            <div class="col-md-12">
                <input id="input-1" type="text" v-model="myObject.message">
                <input id="input-2" type="text" v-model="myObject.message">
                <input id="input-3" type="text" v-model="myObject.message">
            </div>
        </div>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <script type="text/javascript">
        var vm = new Vue({
            el: '#app',
            data: {
                myObject: {
                    message: 'Xin chào, tôi là Vue.js!'
                }
            }
        })
    </script>
</body>
</html>
```
    
 Bạn sẽ thấy một số điểm lạ, tại sao phải dùng đối tượng myObject trong khi chỉ cần đẩy message ra thành đối tượng ở cấp cao nhất. myObject sẽ được dùng đến trong các ví dụ dưới đây, chỉ đơn giản vậy thôi :). Kết quả cũng như ví dụ với jQuery:

    
    
    
Bạn thấy đấy trong Vue.js việc hướng đến dữ liệu đã giúp các vấn đề quản lý trạng thái trở lên đơn giản, chúng ta không cần phải quan tâm đến các sự kiện có thể làm thay đổi dữ liệu, như vậy nếu có hàng trăm ô nhập liệu với các sự kiện khác nhau cũng không thành vấn đề. Một câu hỏi đặt ra, tại sao framework Vue.js có thể thực hiện được điều này? Đó là nhờ Vue.js xây dựng sẵn một reactivity system - hệ thống có thể tự phản ứng lại khi có thay đổi.
    
# Vue reactivity system
Một trong những điểm tuyệt vời nhất của Vue là hệ thống giám sát và phản ứng các thay đổi. Model chỉ đơn giản là các đối tượng Javascript, khi bạn thay đổi chúng, các View sẽ được cập nhật, nó giúp quản lý trạng thái đơn giản và trực quan. Vue cho phép khai báo các reactivity property trong thuộc tính data của thực thể Vue (Vue instance - bạn nào chưa rõ khái niệm này nên đọc lại bài viết Cơ bản về Vue instance). Thuật ngữ reactivity property có thể tạm dịch là thuộc tính tự động cập nhật hoặc thuộc tính "phản ứng", trong suốt loạt bài của khóa học này tôi sẽ giữ nguyên các thuật ngữ reactivity property và reactivity system.
    
![](https://images.viblo.asia/6393978a-beeb-4a87-9185-062e1da866e0.jpg)

Vue.js được lấy cảm hứng từ mô hình MVVM, với các thuộc tính phản ứng việc gán kết dữ liệu hai chiều (two-way data binding) là hết sức đơn giản. Làm cách nào Vue.js có thể theo dõi được các thay đổi? và như chúng ta đã biết cũng có những thay đổi Vue không thể theo dõi được mà bắt buộc phải thông qua một phương thức được xây dựng sẵn trong Vue là Vue.set(). Xem thêm về Vue.set ở đây. ## Theo dõi các thay đổi bằng reactivity property

Khi bạn truyền một đối tượng Javascript thông thường vào một thực thể Vue qua tùy chọn data, Vue sẽ duyệt qua tất cả các thuộc tính của đối tượng này và chuyển chúng sang getter/setter sử dụng Object.defineProperty. Đây là một tính năng chỉ có trên ECMAScript 5 (một tên gọi khác của Javascript), đây cũng chính là lý do tại sao Vue không hỗ trợ trình duyệt IE8 và thấp hơn. ### Getter và setter trong Javascript

Một đối tượng trong Javascript khi được truy xuất để lấy dữ liệu hoặc thay đổi thuộc tính thường theo cách trực tiếp như sau:
    
```php
var myObject = {
      message: "Xin chào, tôi là Vue.js"
};
console.log(myObject.message) // "Xin chào, tôi là Vue.js"
```
    
 Nhưng khi sử dụng các phương thức get và set trong Javascript để định nghĩa các thuộc tính giả (pseudo properties) thì các phương thức này sẽ ghi đè lên cách thức mặc định. Cú pháp get kết nối thuộc tính đối tượng với một hàm mà hàm này sẽ được gọi khi chúng ta lấy giá trị thuộc tính.

```php
var obj = {
  log: ['example','test'],
  get latest() {
    if (this.log.length == 0) return undefined;
    return this.log[this.log.length - 1];
  }
}
console.log(obj.latest); // "test".

```
    
 Phương thức set thì ngược lại, nó cũng kết nối một thuộc tính với một hàm và hàm này được gọi khi thiết lập giá trị cho thuộc tính.

```php
var language = {
  set current(name) {
    this.log.push(name);
  },
  log: []
}

language.current = 'EN';
console.log(language.log); // ['EN']

language.current = 'FA';
console.log(language.log); // ['EN', 'FA']
```
    
 Chúng ta có thể định nghĩa các phương thức get và set cho một đối tượng thông qua phương thức Object.defineProperty():

```php
var myObj = {
   a: 0
};
Object.defineProperty(myObj, 'b', { 
   get: function() { 
      return this.a + 1; 
   } 
});
Object.defineProperty(myObj, 'c', { 
   set: function(x) { 
      this.a = x / 2; 
   } 
});
console.log(myObj.b) // Gọi đến get và trả về a + 1, ở đây kết quả là 0 + 1 = 1
myObj.c = 10;
console.log(myObj.a) // Kết quả là 5
```
    
Framework Vue.js đã dùng chính cách thức ở trên để kiểm soát sự thay đổi giá trị các thuộc tính. Các getter và setter này ẩn với người dùng, nó giúp Vue có thể thực hiện các theo dõi độc lập và báo cáo sự thay đổi khi các thuộc tính được truy xuất hoặc thay đổi. Một lưu ý nữa là chế độ console trong trình duyệt định dạng lại getter/setter một cách khác nhau khi chuyển đổi đối tượng data được ghi log bởi vậy bạn cần phải cài đặt Vue Devtools để có một giao diện thân thiện hơn khi debug. Trong ví dụ Vue.js ở đầu bài, bạn hãy bật màn hình console lên, và gõ vào vm.myObject bạn sẽ thấy Vue đã thay đổi đối tượng myObject với các getter và setter:


![](https://images.viblo.asia/1c7cc9ca-5f79-4da4-a5bf-a9d869df6fb3.jpg)

    
    
Bạn thấy đấy, Vue đã không kiểm soát được các thuộc tính thêm vào sau khi khởi tạo thực thể Vue, không có phương thức get và set cho thuộc tính active được tạo ra. Để thêm được các thuộc tính này chúng ta phải sử dụng phương thức Vue.set hoặc với các mảng dữ liệu chúng ta có thể sử dụng phương thức splice().


```php
Vue.set(vm.myObject, 'from', 'All Laravel')
```
    
Kiểm tra lại chúng ta thấy thuộc tính from đã được thêm vào các phương thức get và set.

![](https://images.viblo.asia/1ce3fd7a-eb6a-4d08-a3af-2145fd9d28c8.jpg)

Đôi khi ban cũng muốn gán một số thuộc tính vào một đối tượng tồn tại, ví dụ sử dụng Object.assign() hoặc _.extend(). Tuy nhiên các thuộc tính được thêm vào đối tượng sẽ không được kích hoạt thay đổi. Trong trường hợp này, cần tạo một đối tượng mới với các thuộc tính từ cả đối tượng gốc và thuộc tính muốn thêm vào.

    
```php
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })

```

# Đọc thêm về Vue.set và các cách thức thiết lập giá trị cho mảng trong bài Xử lý lặp với v-for.

Mô hình reactivity system trong Vue
Với các thông tin về getter, setter và Object.defineProperty chúng ta đã hiểu được cách thức xử lý của Vue, mô hình dưới đây tổng hợp lại các xử lý chi tiết ở phần trên.
    
    
![](https://images.viblo.asia/b9404756-0668-405f-81c1-4c5118da7213.png)

Mỗi thực thể component có một thực thể watcher tương ứng để ghi lại các thuộc tính được xử lý trong quá trình render. Sau đó, setter được kích hoạt, nó sẽ thông báo cho watcher và điều này làm cho các component được render lại. Vue không cho phép thêm tự động các thuộc tính "phản ứng" ở root-level, bạn cần khởi tạo thực thể Vue và khai báo các thuộc tính cần thiết, thậm chí chỉ là một giá trị rỗng.


    
```php
var vm = new Vue({
  data: {
    // Khai báo message với giá trị rỗng
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// thiết lập `message` sau đó
vm.message = 'Hello!'
```

Nếu bạn không khai báo message trong tùy chọn data, Vue sẽ cảnh báo bạn rằng chức năng render cố truy nhập một thuộc tính không tồn tại. Có những lý do kỹ thuật đằng sau sự hạn chế này. Khai báo các thuộc tính "phản ứng" làm cho mã component dễ hiểu hơn khi được xem lại hoặc được đọc bởi các nhà phát triển khác. ## Cập nhật hàng đợi bất đồng bộ

Vue thực hiện cập nhật DOM một cách bất đồng bộ, bất kỳ dữ liệu thay đổi nào cũng được giám sát, nó tạo ra một hàng đợi và bộ đệm cho tất cả dữ liệu được thay đổi trong cùng một vòng lặp của sự kiện. Nếu cùng một watcher được kích hoạt nhiều lần, nó sẽ được đẩy vào hàng đợi chỉ một lần, giúp cho giảm tính toán và các thao tác với DOM không cần thiết. Sau đó, trong vòng lặp của sự kiện tiếp theo, Vue xóa hàng đợi. Vue cố thực hiện các phương thức thuần túy Promise.then và MutationObserver để bất đồng bộ hàng đợi và nếu lỗi thì thực hiện setTimeout(fn,0).

Ví dụ khi thiết lập vm.someData = 'new value', component sẽ không được render lại ngay lập tức, nó sẽ cập nhật trong "tick" tiếp theo, khi hàng đợi được xóa. Vue.js khuyến khích các nhà phát triển đi theo hướng data-driver, tránh việc xử lý DOM trực tiếp. Theo thứ tự, nếu bạn muốn chờ cho đến khi Vue.js kết thúc cập nhật DOM sau khi dữ liệu được thay đổi, bạn có thể sử dụng Vue.nextTick(callback) ngay sau khi dữ liệu được thay đổi. Callback sẽ được gọi sau khi DOM hoàn thành cập nhật. Ví dụ:


```php
<div id="example">{{ message }}</div>

```

```php
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // change data
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})

```{.language-php}

 Bởi vì vm.$nextTick() là phương thức thực thể, nó thao tác bên trong component một cách đặc biệt, nó không cần biến Vue toàn cục và nó tự callback với đầu vào biến ngữ cảnh this - là một thực thể Vue. 

```{.language-php}
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: 'not updated'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => 'not updated'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => 'updated'
      })
    }
  }
})
```
    
# Lời kết
Qua bài viết, hẳn bạn đã hiểu được kha khá nội tình bên trong Vue.js và cũng củng cố thêm các trường hợp bất thường mà Vue.js không kiểm soát được. Bài viết mang tính đào sâu về một số vấn đề mà reactivity system giải quyết được, nó diễn giải các kiến thức bạn đã biết một cách rõ hơn do vậy sẽ không có bài tập thực hành, hẹn gặp lại các bạn trong phần tiếp theo nhé.