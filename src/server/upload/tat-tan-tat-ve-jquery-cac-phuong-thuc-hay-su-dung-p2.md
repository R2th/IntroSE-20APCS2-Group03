# Mình xin giới thiệu đến các bạn toàn tập tịch tà kiếm phổ jQuery thường được sử dụng, chi tiết nhất
Mình xin tiếp tục giới thiệu đến các bạn p2 của loạt bài bế quan luyện công jQuery, bạn nào chưa xem phần 1 thì hãy xem lại tại link này: https://viblo.asia/p/tat-tan-tat-ve-jquery-cac-phuong-thuc-hay-su-dung-p1-Az45bz2z5xY

Ở phần trước chúng ta đã đi qua những hàm cơ bản, hay sử dụng nhất của jQuery loạt bài này mình van~ tiếp tục với những hàm hay ho của jQuery:

## Truy cập vào các phần tử:
- Ví dụ ta có một đoạn HTML như sau, giờ ta muốn từ #here và muốn truy cập vào thằng parent gần nhất.
```html
  <div> Ông cố nó
    <ul> Ông nội nó 
      <li id="li-tag"> Cha nó
        <span id="here">
            <p id="p-here">Bắt đầu từ đây</p>
        </span>
        <span class="here">
            <p>Bắt đầu từ đây</p>
        </span>
      </li>
      <li>
          <p>empty text</p>
      </li>
    </ul>   
  </div>
```
 ta làm như sau:
 ```js
   $(document).ready(function() {
      $('#here').parent(); // => element gần nó nhất <li></li>
      $('#here').children(); // => element con của nó <p></p>
      
     $('#here').parents(); // => danh sách các ele là cha nó ( bao gồm cả <body> và <html>)
     $('#here').parents('tag_name'); // => hoặc như này để lấy những tag name chỉ định
     $('#here').parentsUntil('tag_name'); // => hoặc như này để lấy những tag name cho
     // đến tag_name chỉ định
     // Ta cũng có thể thêm effect hoặc các method khác vào sau :
     $('#here').parents().hide();
     $('#here').parents('tag_name').slideUp(2000);
     $('#here').parentsUntil('tag_name').css({"color": "red"})
     
     // Hoặc find element nào đó
     $('#li-tag').find('span'); // => danh sách các span là con của nó
     $('#li-tag').find('span.here'); // => danh sách các span có class here là con nó
     // hoặc
    $('#li-tag').find(':contains(đây)'); // hồm 1 element chứa ele có từ đây
    // và list ele chứa từ đây
    $('#li-tag').find('p:contains(đây)'); // list ele <p></p> chứa từ đây
   });
 ```
 
 ### Ngoài ra các bạn có thể laasy các selector của form dễ dàng như sau :
 ```html
    <form action="/action_page.php">
        <input type="text" id="username">
        <input type="password" id="password">
        <input type="checkbox" id="checkbox1" name="checkbox1" value="Bike">
        <input type="checkbox" id="checkbox2" name="checkbox2" value="Bike" checked>
        <input type="file" id="file">
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
    </form> 
```
```js
// Với các loại input t có các cách lấy như sau 
$(':text') // cho input có type là text
$(':password') // cho input có type là password
$(':checked') // cho input có type là checkbox và đã đc checked
$(':submit') // cho input có type là submit
// tương tự các loại còn lại
```

## Thêm elements
-  Ở bài trước chúng ta đã tìm hiểu các loại như : append, after, before, prepend... với bài này mình sẽ chỉ cho các bạn những cách khác để tùy hoafn cảnh sử dụng
```html
    <div class="container">
          <div class="here">Div1</div>
          <div class="here">Div2</div>
    </div>
```

```js
// Bây giờ ta muốn thêm 1 thẻ để bọc ngoài các element có class là here
// rất nhiều cách để sử dụng nhưn rất dài dòng đơn giản với wrap() t làm như sau:
$( ".here" ).wrap( "<div class='here-1'></div>" );
// ngược với nó ta cũng có : 
$( ".here" ).unwrap( "<div class='here-1'></div>" );

// hoặc nhét nó vào trong không muốn nó ở ngoài
$( ".here" ).wrapInner( "<div class='here-1'></div>" );
```
- Và kết quả như này, rất nhanh và gọn
```html
<!-- wrap() -->
    <div class="container">
        <div class='here-1'>
            <div class="here">Div1</div>
        </div>
        <div class='here-1'>
            <div class="here">Div2</div>
        </div>
    </div>
<!-- và đường nhiên unwrap sẽ trở về ban đầu -->

<!-- wrapInner() -->
    <div class="container">
        <div class='here'>
            <div class="here-1">Div1</div>
        </div>
        <div class='here'>
            <div class="here-1">Div2</div>
        </div>
    </div>
```
### loại bỏ các phần tử trùng không cần thiết:
```js
const jq = $.noConflict();
jq(document).ready(function(){
  jq("button").click(function(){
    jq(".here").remove();
  });
});

// => <div class="container"></div>
//
```

### Loop các elements
```html
<ul>
  <li>Coffee</li>
  <li>Milk</li>
  <li>Soda</li>
</ul>
```
```js
    $("li").each(function(index, item){
       console.log(item) => <li>...<li>
       console.log($(item)) => S.fn.init [li]
    });
    
    // hoặc 
     $("li").each(function(){
     console.log($(this)) => S.fn.init [li]
    });
    
    // ngoài ra cũng có thể chuyển nó thành array
    $("li").toArray() => [li, li, li] // với  từng li là 1 element
```
## Dường như quả đủ các cách tương tác với element rồi nhỉ, đến đây sẽ là ajax và cách sử dụng chúng
- Với khái niệm thì các bạn tìm trên gg chắc đầy ra, ở đây mình chỉ muốn nói đến các bạn công dụng của nó là t lấy một phần data từ phía server mà không cần load lại trang và hiển thị chúng lên trình duyệt.

### $.get()
- Với các chức năng get data đơn giản, t chỉ cần sử dụng phương thức này rất nhanh và tiện
- Cách hoạt động chính là t chỉ cần truyền 1URL và tham số thứ nhất, data trả về trong function() hoặc 1 Promise
- Với tham số thứ 2 là tùy chọn, nếu k có t có thể bỏ luôn function() return ở đây
```js
  $.get(URL,data,function(data,status,xhr),dataType)
  // với rất nhiều cách để call với $.get() này:
  $.get('demo.php', (data,status,xhr) => {
         alert(data);
         // or
         status === 200 ? alert('success') : alert('something');
         ...
  });
// hoặc sử dụng như cách này
    $.get('demo.php')
        .then( res => alert(res))
        .catch(err => console.log(err))
// Bạn có thể sử dụng cách nào nếu bạn muốn
```

### $.post()
- Có get thì chắc phải có post rồi phải không ?
- Với các tham số và cách hđ thì như $.get nhưng nó được dùng cho mục đích post data lên server
```js
$.post(URL,data,function(data,status,xhr),dataType)
// và cách sử dụng cũng tương tự get.
$.post("post-data.php", {name: 'something'}, res => {
    console.log(res);
  });
  // với callback trả về t có 3 tham số, mặc định t để tham số nhất 
 // nó sẽ tự biết là response từ server nhé $.get cũng vậy
 // và cách sd thứ 2 cũng tư tự get();
```

### $.ajax();
- Với những hàm $.get và $.post ta chỉ làm việc với những thao tác cơ bản, vậy $.ajax() làm được những gì
- Thật ra nó cũng như 2 hàm kia nhưng có nhiều option hơn để chúng ta sd theo nhiều cách
```js
// cách sử dụng cơ bản
$.ajax({url: "demo.php", success: (res) => res => alert(res)});
// ơ thế thì nó i chang thằng $.get rồi còn đâu ?
$.ajax({
        url: "post-data.php",
        data: {name: 'something'},
        method: 'POST',
        success: res => {
            console.log(res);
        }
  });
 // thằng này cũng vậy? khác gì thằng post trên đâu, dài dòng vcl 
 // khoan đã nhé với các method khác như 
 // và đây là những option mình hay sử dụng chứ kh phải dừng tại đây
 $.ajax({
        url: "post-data.php",
        data: {name: 'something'},
        method: 'POST/PUT/PATCH/DELETE', // đề có thể sử dụng
        beforeSend: () => {
            // ta làm cái gì đó trước khi data đc gửi đi
            // ví dụ ta thêm loading vô chẳng hạn !
        },
        dataType: 'JSON/HTML/SCRIPT...', // khai báo dữ liệu trả về
        success: res => {
            console.log(res);
        },
        error: err => {
            console.log(err)
        }
  });
  // ngoài ra chúng t cũng os thể sử dụng nó như $.get, $.post với cách dùng kia
  const xhr = $.ajax({...});
  xhr.then(e => console.log(e))
        .catch(err => console.log(err))
 // hoặc
 xhr.done(e => console.log(e))
        .fail(err => console.log(err)

//ngoài ra với các cách trên t có thêm
.always( () => {});
// sẽ luôn chạy với mỗi xhr được send đi
// tham khảo thêm tại đây : https://www.w3schools.com/jquery/ajax_ajax.asp
```
### Với đó là tất cả các hàm jQuery "mình hay dùng đến", nhoài ra còn có các hàm khác rất hay, các bạn hãy tham khảo document nó nhé. mình xin khép lại tại đây, mong các bạn ủng hộ mình với các series tiếp theo. cảm ơn đã xem (bow)