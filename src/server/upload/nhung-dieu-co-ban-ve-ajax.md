> Cos đối, sin bù, phụ chéo, khác pi tan
>
> (Cosin của hai góc đối bằng nhau; sin của hai góc bù nhau thì bằng nhau; phụ chéo là 2 góc phụ nhau thì sin góc này = cos góc kia, tan góc này = cot góc kia; tan của hai góc hơn kém pi thì bằng nhau).

Với dòng thơ trên không còn quá xa lạ với các bậc tiền bối cả nữa rồi (hihi). Vì sao mình lại quote lại câu thơ này. Bởi vì, điều mình muốn nói có liên quan 1 chút đến nội dung sắp viết của mình :D. Đó là khi mới học 1 thứ gì đó mới mẻ mà lại khó nhớ, khó hình dung thường người ta sẽ cố nghĩ ra những bài thơ hay những điều có thể liên tưởng đến được thực tế.

Vâng! Và bài viết này cũng như thế, để hiểu rõ hơn về thuật ngữ AJAX cũng như cách thức làm việc, vì sao phải dùng nó, mình đã liên tưởng 1 trang web như 1 nhà hàng làm đồ ăn nhanh để học AJAX 1 cách nhanh chóng và nhớ lâu hơn. Để giải thích rõ hơn hãy theo cùng đọc bài viết này của mình nhé!
# AJAX là gì?

AJAX là chữ viết tắt của **Asynchronous JavaScript and XML**. Nó là một bộ các kỹ thuật thiết kế web giúp cho các ứng dụng web hoạt động bất đồng bộ – xử lý mọi yêu cầu tới server từ phía sau. Để hiểu rõ hơn, mình sẽ giải thích với từng thuật ngữ một cho bạn biết AJAX là gì?

Asynchronous, JavaScript, XML trong từ AJAX là:

**Asynchronous**, hay nói ngắn hơn là Async – bất đồng bộ. Bất đồng bộ có nghĩa là một chương trình có thể xử lý không theo tuần tự các hàm, không có quy trình, có thể nhảy đi bỏ qua bước nào đó. Ích lợi dễ thấy nhất của bất đồng bộ là chương trình có thể xử lý nhiều công việc một lúc.

**JavaScript** là một ngôn ngữ lập trình nổi tiếng. Trong số rất nhiều chức năng của nó là khả năng quản lý nội dung động của website và hỗ trợ tương tác với người dùng.

**XML** là một dạng của ngôn ngữ markup như HTML, chữ đầy đủ của nó là eXtensible Markup Language. Nếu HTML được dùng để hiển thị dữ liệu, XML được thiết kế để chứa dữ liệu.

Cả JavaScript và XML đều hoạt động bất đồng bộ trong AJAX. Kết quả là, nhiều ứng dụng web có thể sử dụng AJAX để gửi và nhận data từ server mà không phải toàn bộ trang

# AJAX trông như thế nào?

Không ai còn xa lạ với Facebook, thì bạn có nhận thấy khi comment về 1 bài post trên Facebook mà không cần tải lại toàn bộ trang? Đó là vì AJAX đang hoạt động. AJAX cho phép user tương tác với ứng dụng web mà không cần tải lại hoàn toàn trang.

Hãy tưởng tượng nếu mỗi khi bạn thả tym cho bài post của "gâu gâu" hay comment khen người yêu mình xinh, trang sẽ tải lại? Điều đó là tệ :'(. Thay vào đó, Facebook đã biến thành 1 ảo thuật gia tài năng, nó sẽ thêm 'comment' hay 'like' của bạn vào bài post nhanh chóng và cho phép bạn tiếp tục đọc.

# Tại sao chúng ta cần AJAX?

Có 4 lợi ích chính của việc sử dụng AJAX đem lại:

* **Callbacks**:  Ajax được sử dụng để thực hiện một cuộc gọi lại. AJAX thực hiện việc truy xuất và / hoặc lưu dữ liệu mà không gửi toàn bộ trang trở lại máy chủ. Trong các trang web băng thông hạn chế, điều này có thể cải thiện đáng kể hiệu suất.
* **Thực hiện các cuộc gọi không đồng bộ**: Điều này cho phép trình duyeẹt của người dùng tránh phải chờ tất cả dữ liệu đến trước khi cho phép người dùng hành động 1 lần nữa.
* **Thân thiện với người dùng**: Vì không phải post lại trang lên server.
* **Tăng tốc độ**: Mục đích chính của Ajax là cải thiện tốc độ, hiệu suất và khả năng sử dụng của một ứng dụng web.

Lý thuyết hay mơ hồ làm sao :D. Để biết ro hơn vì sao ta cần AJAX mình sẽ lấy ví dụ trực quan hơn.

Hãy tưởng tượng toàn bộ ứng dụng web của bạn như một nhà hàng gọi đồ ăn nhanh. Bạn đóng vai trò là người tiếp tân, mọi người muốn order đồ phải thông qua bạn hết. Nhiệm vụ của bạn là xử lý các yêu cầu từ customer.

![](https://images.viblo.asia/ce16dcbe-be03-437c-8bdb-6595c741f868.png)

Với sơ đồ này, ta có thể thấy 3 công việc riêng biệt cần thực hiện.

1. Nhân viên tiếp tân phải xử lý các yêu cầu user với tốc độ nhanh.
2. Bạn cần có người đầu bếp để đưa bánh mì vào vỉ nướng và chuẩn bị tất cả các món ăn.
3. Bạn cần 1 đội đóng đồ ăn để đóng gói thức ăn và đặt nó vào 1 cái túi hoặc 1 cái khay.

Với việc xử lý không có AJAX, bạn sẽ chỉ được phép xử lý 1 đơn hàng tại 1 thời điểm từ đầu đến cuối. Tức là bạn sẽ nhận đơn đặt hàng, sau đó tính tiền cho khách hàng, sau đồ ngồi đó không làm gì cả trong khi đầu bếp đang chuẩn bị đồ ăn. Khi đầu bếp đã làm xong đồ ăn, tiếp tục đợi nhóm đóng đồ ăn gói đồ ăn vừa làm. Bạn sẽ chỉ nhận 1 đơn đặt hàng tiếp theo sau khi tất cả quá trình vừa xong hoàn thành.

![](https://images.viblo.asia/05ecacf8-b7d0-48ca-a313-0dafaec5f020.png)

Thực sự điều ở trên là 1 trải nghiệm người dùng quá tệ. Nếu 1 nhà hàng bán theo kiểu này sẽ sớm bị phá sản mất thôi (ahuhu).

Để xử lý điều đó ta sẽ dùng AJAX. Bạn sẽ có thể yêu cầu dữ liệu hoặc gửi dữ liệu mà không cần tải toàn bộ trang. Điều này giống như cách 1 nhà hàng hoạt động. Là nhân viên tiếp tân sẽ nhận đơn đặt hàng của khách hàng, gửi nó cho bên nhóm làm bếp và sẵn sàng tiếp nhận đơn đặt hàng tiếp theo của khách hàng.

![](https://images.viblo.asia/1d563835-95ee-4444-8bcb-c10751af9906.png)

# Cách tạo request POST

Là 1 nhân viên tiếp tân, bạn cần phải gửi yêu cầu của khách hàng xuống nhà bếp để những người ở đó có thể chuẩn bị đồ ăn cho khách hàng. Và bạn có thể làm điều đó với **request POST.**

Trong code thì nó có tác dụng lấy dữ liệu từ server bằng phương thức **HTTP POST REQUEST**.

Cú pháp:
```js
$(selector).post(URL, data, function(data, status, xhr), dataType)
```
* **URL**: bắt buộc, đường dẫn đến file cần lấy thông tin.
* **data**: không bắt buộc ,là một đối tượng object gồm các key : value sẽ gửi lên server.
* **function(data, status, xhr)**: là function sẽ xử lý khi thực hiện thành công với các parameter. Với:
  
  * **data**: bao gồm các dữ liệu trả về từ request.
  * **status**: bao gồm trạng thái request ('success', 'notmodified', 'error', 'timeout', 'parserror').
  * **xhr**: gồm các đối tượng XMLHttpRequest.
 *  **dataType**: là dạng dữ liệu trả về (text, json, script, xml, html, jsonp).

Khi đặt đồ ăn, sẽ có rất nhiều đơn hàng và mỗi đơn hàng lại 1 thể loại khác nhau. Ví dụ ở đây mình có 2 đơn hàng.
1. Chỉ có khoai tây chiên.
2. 1 đơn hàng combo bao gồm: burger, khoai tây chiên, và đồ uống.

Mỗi đơn hàng ứng với 1 yêu cầu. Vì vậy, ta cần các URL khác nhau.
```js
$.post('/comboMeal')
$.post('/fries')
```
Tiếp theo là *data*. Đây là 1 đối tượng cho chúng ta biết thêm 1 chút về yêu cầu. Với URL cho đơn đặt hàng combo, ta cần biết:
1. Các món ăn chính.
2. Đồ uống.
3. Giá tiền.
4. Các yêu cầu đặc biệt khác.

Đối với URL cho đơn hàng chỉ có khoai tây chiên, ta chỉ cần:
1. Kích thước của khoai tây chiên.
2. Giá tiền.

![](https://images.viblo.asia/3719bee9-3a04-400f-9dc8-d6afbca6d31c.png)

Với ví dụ cho đơn hàng combo: 1 chiếc burger kẹp phô mai với Pepsi có giá $6,00 thì đoạn code ta có:
```js
let order = {
  mainMeal: 'cheeseburger',
  drink: 'Pepsi',
  price: 6, 
  exceptions: '' 
};
$.post('/comboMeal', order);
```
Biến order sẽ giữ nội dung của đơn hàng đó. Và sau đó ta sẽ đưa nó vào request POST để gửi cho nhân viên bếp biết là cần chuẩn bị cái gì cho đơn đặt hàng combo này.

Nhưng ta không thể cho đoạn code kia chạy 1 cách ngẫu nhiên! Ta cần 1 sự kiện kích hoạt request đó. Trong trường hợp này, 1 đơn đặt hàng của khách tại nhà hàng sẽ giống như 1 người nhấp vào nút 'Order' trên trang web. Ta có thể dùng **event click()** của JQuery để chạy request POST khi người dùng click vào button.
```js
$('button').click(function(){ 
  let order = { 
    mainMeal: 'cheeseburger',
    drink: 'Pepsi', 
    price: 6, 
    exceptions: '' 
  };
 
  $.post('/comboMeal', order); 
});
```
Khi đơn đặt hàng của khách đã được gửi đi, ta cần nói với khách hàng 1 cái gì đó. Vì vậy chúng ta có thể sử dụng nó trong hàm callback() để cho thấy rằng đơn hàng đã được gửi.
```js
$('button').click(function(){ 
   let order = {
     mainMeal: 'cheeseburger',
     drink: 'Pepsi',
     price: 6,
     exceptions: '' 
   };
$.post('/comboMeal', order, function(){
     alert('Next customer please!'); 
  }); 
})
```
# Cách tạo request GET

Vừa rồi ta đã gửi đơn đặt hàng. Bây giờ, chúng ta cần 1 cách để cung cấp đơn đặt hàng đó cho khách hàng. Để nhận được yêu cầu dữ liệu từ server (hay ở đây là nhà bếp) thì ta sử dụng **request GET**. 
Hãy chú ý rằng: bây giờ, cơ sở dữ liệu của chúng ta có đầy đủ các đơn đặt hàng. Đây là 1 sự khác biệt quan trọng vì các **request GET không làm thay đổi cơ sở dữ liệu**, nó chỉ cung cấp các thông tin cho front-end. Còn **request POST sẽ làm thay đổi thông tin trong cơ sở dữ liệu** có thể thêm, sửa hoặc hủy.

Cú pháp:
```js
$.get(URL,data,function(data,status,xhr),dataType)
```

Trước khi gửi đồ lại cho khách, nhân viên tiếp tân sẽ thường hỏi 1 số câu hỏi:
1. Bạn có muốn ăn ở đây hay mang đi?
2. Bạn có cần bất kỳ gia vị (như sốt cà chua hay mù tạt ...)?
3. Số được ghi trên biên lai là gì (dùng để xác minh xem đồ ăn có phải của bạn)?

Vì vậy, giả sử bạn đã đặt 3 combo. Bạn muốn ăn tại nhà hàng, cần sốt cà chua, và số trên biên lai là 999. Chúng ta có thể tạo 1 request GET với URL '/comboMeal', tương tự với request POST cùng với 1 URL. Nhưng, lần này chúng ta cần dữ liệu khác nhau. Đó là 1 loại request hoàn toàn khác. Tên URL giống nhau chỉ cho phép chúng ta quản lý code được dễ dàng hơn.
```js
let meal = {
  location: 'here',
  condiments: 'ketchup',
  receiptID: 999 
};
$.get('/comboMeal', meal);
```

![](https://images.viblo.asia/d1503c18-978b-4dcb-ac36-abc6826bde3f.png)

Tương tự như trên, để trả lời các câu hỏi mà nhân viên tiếp tân đưa ra, chúng ta có thể tạo 1 **event click()**.
```js
$('.answer').click(function(){
  let meal = {
     location: 'here',
     condiments: 'ketchup',
     idNumber: 999, 
  };
$.get('/comboMeal', meal); 
});
```

![](https://images.viblo.asia/3ef6eaf5-ca9c-4113-986e-84a9b796f0e5.png)

Và cuối cùng, để nhận được đồ ăn, chúng ta cần sử dụng hàm callback().
```js
$('.answer').click(function(){
   let meal = {
     location: 'here',
     condiments: 'ketchup',
     idNumber: 999, 
   };
 
  //data contains the data from the server 
  $.get('/comboMeal', meal, function(data){ 
     //eat is a made-up function but you get the point 
     eat(data); 
  }); 
});
```
Về mặt lý thuyết biến data, sẽ chứa các nội dung trong đơn hàng combo đó. Nó phụ thuộc vào cách được viết trên back-end!

![](https://images.viblo.asia/fec1d098-b3f6-46b2-abd5-e67c887c36d8.png)

# Tổng kết

Qua cách trình bày liên tưởng đến đời thực như này, có thể giúp bạn hiểu rõ hơn toàn bộ quá trình hoạt động của AJAX như nào. Bài viết này còn nhiều thiếu sót, mong mọi người thông cảm và có thể đưa ra ý kiến để mình rút kinh nghiệm cho những bài viết sau. Xin cảm ơn các bạn đã quan tâm đến bài viết của mình (bow)

Tham khảo:

https://wiki.matbao.net/kb/ajax-la-gi-cach-su-dung-ajax-toi-uu-nhat/

https://medium.com/free-code-camp/ajax-basics-explained-by-working-at-a-fast-food-restaurant-88d95f5fcb7a

https://www.w3schools.com/Js/js_ajax_intro.asp