# Mình xin giới thiệu đến các bạn toàn tập tịch tà kiếm phổ jQuery thường được sử dụng, chi tiết nhất
## Nhắc về khái niệm của nó 1 chút :
- jQuery là một thư viện javascript.
- jQuery đơn giản hóa code cho lập trình javascript.
- Phiên bản hiện tại mình viết bài này là 3.5.0, release ngày 10 tháng 4 năm 2020

-> Phần 2 ở đây nhé : https://viblo.asia/p/tat-tan-tat-ve-jquery-cac-phuong-thuc-hay-su-dung-p2-6J3ZgPDLlmB
### $(document).ready()
 - Thường thì các bạn có thể thấy mọi code jQuery đều nằm trong này ? vậy tại sao nó lại nằm trong này ?
    * Thông thường code jQuery của ta sẽ bất đầu thực thi nếu file js được tải xong, nhưng nếu nó đã được tải xong mà các DOM chưa tải xong thì nó có chạy đâu :))
    * Do vậy khi code jQuery của bạn nằm ở trong hàm này , nó ngăn chặn code được thực thi trước khi các DOM chưa được load xong
  
  Sử dụng : 
  
```js
$(document).ready(function(){
      // code jQuery ở đây
});
    
  // hoặc
 $(function(){
   // code jQuery ở đây
 });
```
    
### Selector
- Selector trong jQuery tương tự như trong CSS :
```js
// Đối với các tag html
$('[ten_tag]')
$('*') tất cả các elements
$(this) thực thi với element hiện tại đang trỏ tới
$('p') -> lấy tất cả các element <p></p>
$('p.test') lấy tất cả các element của <p></p> có class là test
$('p:first') lấy element đầu tiên được tìm thấy của <p></p>
$("a[target='_blank']") lấy ra các tag <a></a> có target là _blank
// Đặc biệt sử dụng nhiều thì chắc là hai cái này chắc ai cũng biết sử dụng khi làm việc với jQuery nhỉ:
$('#id_element') 
$('.class_element')
...
```
Ngoài ra có rất nhiều Selector các bạn có thể khảm tại : https://www.w3schools.com/jquery/jquery_selectors.asp

### Event 
- Vậy khi ta muốn bắt sự kiện thì làm thế nào ? 
- Có rất nhiều sự kiện trong jQuery được định nghĩa, mình chỉ liệt kê những cái hay sử dụng nhất :
#### .click(), dblclick()
```js
$("button").click(function(){
  // hàm này được thực thi khi t click vào selector được chỉ định vd của mình là button
});
```

#### .mouseenter(), mouseleave(), mousedown(), mouseup()
```js
$("button").mouseenter(function(){
  // hàm này được thực thi khi t rê chuột vào selector được chỉ định vd của mình là button
  // ngược lại thì ta dùng mouseleave()
});

$("button").mousedown(function(){
  // hàm này được thực thi khi t rê chuột vào selector được chỉ định và nhấn chuột vào vd của mình là button
  // ngược lại thì ta dùng mouseup() nó sẽ thực thi khi t rê chuột vào element và tính khi ra đã click và thả ra
});
```
- Ngoài ra còn rất nhiều về các hàm mouse như : .mouseout() , .mouseover(), .mouseup()
- Các bạn có thể xem thêm tại : https://api.jquery.com/category/events/ 
#### .trigger(), .toggle()
- 2 event tiếp theo mình rất hay sử dụng :
 * trigger()
```js
    $('element').trigger('action_nao_do'); hàm này có tác dụng thực thi một action được chỉ định lên element :
    $("button").click(function(){
        $('#trigger').trigger('click'); // Sau khi click vào button thì element #trigger sẽ thực hiện event click, chúng ta có thể trigger bất kì event nào mà muốn nó thực thi
    });
    Ngoài ra trigger rất đa dạng cách sử dụng: 
    $( "p" ).click(function( event, a, b ) {
        // ở đây khi click vào thẻ p thì a,b sẽ undefined, nhưng t thêm trigger phía sau nó sẽ gán ["a","b"] vào tham số tương ứng sau tham số event
      }).trigger( "click", [ "a", "b" ] );
```

* toggle()
```js
    $('element').toggle(); hàm này giúp chuyển đổi animation hay đại loại như vậy được truyền vào trong function nếu ko truyền mặc định nó sẽ toggle giữa ẩn và hiện element
    $( "button" ).click(function() {
      $( "p" ).toggle( "slow" ); // ta truyền vào slow thì khi click button nó sẽ cho thẻ p show từ từ và ẩn từ từ
      $( "p" ).slideToggle( "slow" ) // ngoài ra nó còn có thể ẩn/hiện thị theo dạng slide nếu t dùng slideToggle()
      $( "p" ).toggleClass( "class" ) // ngoài ra nó còn có thể  thêm hoặc xóa class nếu ta dùng toggleClass
    });
    
    // Cách sử dụng rất nhiều $(selector).toggle(speed,easing,callback); với các tham số lần lượt truyền vào chúng ta sẽ custom đc nhiều hiệu ứng khác nhau
    $(selector).toggle("slow", "swing", function() {
        // code callback here
    })
```

- Còn rất nheeifu event khác, mình chỉ nêu vài cái mình hay gặp và dùng
#### Effect 
  * .hide(), show(), remove(), slideDown(), slideUp(), slideToggle()
  ```js
        $('button').click(function() {
               $( "#p" ).hide(speed, callback); // dùng để ẩn đi element
               $( "#p1" ).show(speed, callback); // dùng để hiển thị element
               $( "#p3" ).remove(speed, callback); // dùng để xóa đi element khỏi DOM
               $( "#p" ).slideDown(speed, callback); // dùng để hiển thị element theo dạng slide xuống
               $( "#p1" ).slideUp(speed, callback); // dùng để ẩn thị element theo dạng slide lên
               $( "#p3" ).slideToggle(speed, callback); // chuyển đổi ẩn/hiện theo dạng slide
               
               // ngoài ra t có thể dùng .stop() để dừng effect đang chạy
        })
  ```
  * fadeIn(), fadeOut(), fadeToggle(), fadeTo() : Các hàm này thi tương tự cách sử dụng của các hàm trên, mà hiệu ứng của nó thì dùng để ẩn/hiện theo cách mờ ảo :D


#### Tương tác với DOM
- text() -> Set hoặc return về chuỗi của element 
- html() - Set hoặc return về chuỗi của element  (bao hồm cả HTML tag)
- val() - Set hoặc return value của các thẻ trong form
```js
    $('p').text()  || $('p').text('set new text');
    $('p').html()  || $('p').html('<p>set new text with html tag<p>');
    $('input#test').val() || $('input#test').val(10);
```
  
- append() - Chèn thêm văn bản (có thể có HTML tag) vào trong cuối của element được chọn
- prepend() - Chèn thêm văn bản (có thể có HTML tag) vào trong đầu của element được chọn
- after() - Chèn thêm văn bản (có thể có HTML tag) vào sau element được chọn
- before() - Chèn thêm văn bản (có thể có HTML tag) vào trước element được chọn
```js
$("div.a").append("<div class='c'>C</div>");
<div class='a'>
  <div class='b'>b</div>
   <div class='c'>C</div> // nó sẽ được chèn vào đây 
</div>

$("div.a").after("<div class='c'>C</div>");
<div class='a'>
  <div class='b'>b</div>
</div>
<div class='c'>C</div> // nó sẽ được chèn vào đây
//- 2 Caí kia tương tự
```

- remove(), empty()
```js
    $("selector").remove(); // dùng để remove element khỏi DOM
    $("selector").empty(); // dùng để xóa toàn bộ element con ra khỏi DOM
```

- addClass() - Thêm class vào element
- removeClass() - Xóa class khỏi element
- css() - Set hoặc trả về style của element đó

```js
    $("selector").addClass('test-class');
    $("selector").removeClass('test-class');
    $("selector").css();
    $("selector").css("background-color", "yellow");
    $("selector").css({
        "background-color": "yellow",
        "font-size": "200%"
   });
```

- index(), clone()
```js
    $("selector").index(); // trả về index hiện tại của element đối với các select tương đương nó, nếu có tham số truyền vào mà k được tìm thấy sẽ trả về -1
    $("selector").clone(); // trả về một bản sao của element hiện tại
    vd : $("#selector").clone().appendTo(#selector);
```

### Các thường hợp đặc biệt hay dùng :
- Có khi nào bạn đã từng rơi vào trường hợp là khi dùng append hay appendTo ( hoặc các hàm chèn html tag liên quan) vào DOM rồi sau đó bắt sự kiện nó k hđ :
```js
    // Code bạn như thế này :
    $(document).ready(function(){
      $('.test').click(function() {
         $(this).append('<div class="test"><div>')); // sau đó bạn click vào cái vừa sinh ra k thực hiện tiếp đc ?
      })
    })
```

- Đó là vì khi bạn sử dụng $(document).ready() thì nó sẽ đọc được các DOM  đã được load từ đầu, còn cái sau này bạn mới append vào sau thì DOM nó chưa hiểu đc thằng đó đã load chưa, hoặc là bắt DOM nó load lại hoặc là dùng cách khác
```js
    $(document).ready(function(){
      $('body').on('click', '.test', function() {
         $(this).append('<div class="test"><div>')); // bạn thử như vậy đi chắc chắn sẽ thành công
      // Why? bởi vì khi bạn sử dụng như vậy, nó sẽ bắt đầu quét element bạn tương tác miễn sao nó nằm trong body, không cần biết nó được load từ đầu hay sau
      });
    });
    // Vậy .on() là gì, sao ko thấy nhắc tới ? Nó là một hàm dùng để hearing 1 hoặc nhiều sự kiện của element đó, vd:
    $('.test').on('click', function() {
      alert(1);
    });
     // hoặc
     $('p').on({
        click: function(){
            console.log('clicked');
        },
        mouseenter: function(){
            console.log('mouseentered');
        },
        mouseleave: function(){
            console.log('mouseleaved');
        }
    });
 
```
#### Lấy props của 1 element : 
```js
    // Ví dụ ta có, và muốn khi click vào sẽ lấy href và data-id thì làm tn ?
    <a href="test.com" data-id="1" id="test"></a>
    // Đơn giản, chỉ cần làm như naỳ :
    $('#test').click(function() {
      const href = $(this).attr('href');
      const id = $(this).attr('data-id');
      // hoặc thế này để lấy id
      const id = $(this).data('id');
            
    });
```

## Các tips khác mà trong quá trình lafm mình tích lũy và tham khảo được
```js
// kiểm tra nếu Element đó tồn tại :
if ($("#someDiv").length) {
  // handle
}
// filter chồng nhau, chẳng hạn bạn muốn lấy ra ele không có class intro
$("#contact, #address, #email, #sales, #equipment, #notes, #marketingdata").filter(":not(.intro)")

// bạn có thể dùng như này
$(document).ready(function ()
{
    // ...
});
// hoặc như này đều được
$(function ()
{
    // ...
});
// Bạn có thể excute với element cùng với forEach nếu set time ở tham số thứ 3 cuar nó
$('.selector').forEach( function() {}, 1000 );
// Hoặc như này cũng có thể dùng loop qua từng element
$('a').each(function() {
   // và như này để gắn element hiện tại vào 1 biến để tiện thực thi trên element đang được trỏ đến trong loop
   var $this = $(this);
});

// Bạn muốn if(true) thì adđ class này else thì remove class này :
$("selector")[true ? "addClass" : "removeClass"](".someClass");
 
// Muốn check element đó có như này hoặc như kia không :
$('input').is(":checked") 
$('.selector').is(":hidden");
$('.selector').is(":visible");
  
// Vô hiệu hóa chuột phải trên 1 vùng nào đó
$('someElement').bind("contextmenu", function(e) {
    return false;
});
    
// Sao chép một element nào đó 
$('someElement').clone();
    
// Lấy element gần nhấn với element hiện tại :
$('someElement').closest('elementClosest');
```

Còn rất nhiều các hàm xịn xò khác của jQuery mình xin để dành P.2 cho series này, mong các bạn đón xem. Ở P.2 mình sẽ giới thiệu sâu hơn về option của các hàm, callback của nó và custom lại, các hàm lq tới ajax, get, post .. 
Mình xin kết thúc tại đây, cảm ơn các bạn đã đọc, mọi thứ đều như tìm hiểu của mình và có tham khảo tại jQuery, nếu có sai sót xin các bạn góp ý .