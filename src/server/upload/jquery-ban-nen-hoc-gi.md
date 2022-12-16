Chào mọi người, đọc tiêu đề chắc bạn cũng đã biết được hôm nay mình muốn chia sẻ gì với mọi người rồi. 

Trải qua 1 thời gian làm việc cũng jQuery thì mình cũng có chút kinh nghiệm và có tham khảo nguồn khác để tóm tắt lại học jQuery thì mình nên học gì để có thể sử dụng code Frontend 1 cách thành thạo nhé.

Nào mình cùng bắt đầu với việc tại sao phải học jQuery??
## Tại sao bạn cần học jQuery?
Một số người có thể hỏi - Trong kỷ nguyên Angular, Vue và React tại sao điều quan trọng là phải biết jQuery? Câu trả lời là:

1. jQuery tích hợp dễ dàng với các công nghệ web như ASP.NET, PHP, Python, v.v. Khi bạn lập trình các ngôn ngữ này, chắc chắn bạn cũng cần jQuery để lập trình các chức năng cho user thao tác, nên bạn sẽ cần sử dụng jQuery cùng với JavaScript.
2. Các ngôn ngữ frontend như Angular, React & Vue là các thư viện hoàn chỉnh, bạn có thể lập trình toàn bộ dự án của mình trên nền những framework này, thậm chí không cần các công nghệ phía máy chủ như ASP.NET, Python, PHP, v.v.
3. Học Angular, React & Vue mất nhiều thời gian nên bạn sẽ khó học hơn, jQuery thì dễ hơn rất nhiều nên bạn có thể nhanh chóng học nó chỉ trong vài giờ.
4. Nếu bạn biết JavaScript thì bạn có thể dễ dàng học jQuery. Điều này không đúng với Angular, React & Vue vì chúng có các tính năng và chức năng riêng để thực hiện các nhiệm vụ khác nhau.

Như vậy bạn đã biết lý do cần học jQuery rồi đúng không? vậy để hiểu được jQuery bạn cần học những gì?

## Cần học gì trong jQuery?
### 1. jQuery get started
Việc đầu tiên là bạn cần include thư viện jQuery vào project đúng không?
Việc này rất đơn giản, bạn có thể tải source về hoặc sử dụng sử dụng jQuery CDN và thêm vào đầu trang của bạn.
```
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
```

### 2. jQuery document ready
Bạn cần viết code JQuery trong document ready để đảm bảo rằng trang DOM đã sẵn sàng để mã thực thi tất cả mã jQuery của bạn.

Dưới đây là code demo:
```
$(document).ready(function() {
    alert('DOM is Ready');
});
```
Hoặc cách viết khác:
```
$(function() {
    alert('DOM is Ready');
});
```

### 3. jQuery Selector
Một việc được sử dụng chủ yếu trong jQuery đó là các `Selector`, có nhiều cách để chọn `element` với id, class, name, attribute, parent, children, v.v ...

Ví dụ:
```
$("*")	//Chọn tất cả elements
$(this)	//Chọn element HTML hiện tại
$("p.intro")	//Chọn tất cả các phần tử <p> với class="intro"
$("p:first")	//Chọn phần tử <p> đầu tiên
$("ul li:first")	//Chọn phần tử <li> đầu tiên của <ul> đầu tiên
$("ul li:first-child")	//Chọn phần tử <li> đầu tiên của mọi <ul>
$("[href]")	//Chọn tất cả các thành phần có thuộc tính href
$("a[target='_blank']")	//Chọn tất cả các phần tử <a> có giá trị thuộc tính target="_blank"
$("a[target!='_blank']")	//Chọn tất cả các phần tử <a> có giá trị thuộc tính khác target="_blank"
$(":button")	//Chọn tất cả các phần tử <button> và <input> type = "button"
$("tr:even")	//Chọn tất cả các phần tử <tr> chẵn	
$("tr:odd")	//Chọn tất cả các phần tử <tr> lẻ
```

Để biết chi tiết hơn các bạn có thể truy cập vào [jQuery selector w3school](https://www.w3schools.com/jquery/jquery_selectors.asp) để học nhé.
### 4. jQuery Load Method Complete Guide
Khi có task vụ gì cần load ngay sau khi load trang như load data từ file, bạn nên dùng hàm `.load()`, hàm này sẽ thực thi ngay lập tức và bạn không phải chờ đợi lâu.

VD:
```
<script>
$(function() {
        $("#loadTextFile").click(function (e) {
                $("#textData").load("file.txt");
        });
});
$(function() {
    $("#loadNoTextFile").click(function (e) {
        $("#textNoData").load("no-file.txt", function (response, status, xhr) {
                if (status == "error"){
                        $("#textNoData").html("Error: " + xhr.status + ": " + xhr.statusText);
                }
        });
    });
});
</script>
```
### 5. jQuery Animation tutorial
Sẽ có những lúc bạn cần một vài hiệu ứng trên website của bạn. Bạn có thể làm nó với phương thức `.animate()`, animate có thể được áp dụng cả trên các thuộc tính CSS.

VD:
```
<script type="text/javascript">
    $(function(){
            //Khi click sẽ di chuyển sang phải 300px
            $("button").click(function(){
                    $("img").animate({
                            left: "300px"
                    });
            });
            
            //Di chuyển nhiều vị trí và nhiều thuộc tính
            $("button").click(function(){
                    $(".box").animate({
                            width: "300px",
                            height: "300px",
                            marginLeft: "150px",
                            borderWidth: "10px",
                            opacity: 0.5
                    });
            });
    });
</script>
```

Bạn có thể xem chi tiết hơn ở đây: [jQuery Animation tutorial](https://www.tutorialrepublic.com/jquery-tutorial/jquery-animation-effects.php)
### 6. jQuery Timer Examples and implementation
jQuery có thể xây dựng các hiệu ứng hẹn giờ như slide, hình động, đồng hồ và v.v....

VD 1: Slider
```
//Các hình ảnh được hiển thị bằng cách sử dụng thẻ ul và li.
<ul id="slider">
    <li><img src="image1.jpg"/></li> 
    <li><img src="image2.jpg"/></li>
    <li><img src="image3.jpg"/></li>
</ul>
```
Ban đầu mình sẽ ẩn các thẻ img ngoại trừ các phần tử img đầu tiên.

Sau đó, với hàm setInterval() mình sẽ chỉ hiển thị hình ảnh tiếp theo sau mỗi 2 giây .
```
<script type="text/javascript">
$(function(){
var x = 1;
setInterval(function () {
       $(slides).hide();
       $(slides).parents("#slider>li:nth-child(" + x + ")").find("img").show();
       if (x == slides.length){
                x = 1;
        } else {
                x++;
        }
}, 2000);
</script>
```

VD2: Hiển thị đồng hồ
```
<div id="timeClock"></div>
<script>
var myVar = setInterval(myTimer, 1000);
function myTimer() {
        var d = new Date();
        var t = d.toLocaleTimeString();
        $("#timeClock").html(t);
}
</script>
```

Để xem nhiều ví dụ hơn, bạn có thể vào [jQuery Timer](http://www.yogihosting.com/jquery-timer/)

### 7. jQuery Traversing
Trong khi lập trình bạn chắc chắn sẽ gặp những lúc cần di chuyển qua các element hoặc tìm element thông qua element khác. jQuery Traversing chính là thứ bạn cần biết.
Hình ảnh dưới đây minh họa một trang HTML dưới dạng cây (cây DOM). Với chuyển đổi jQuery, bạn có thể dễ dàng di chuyển lên (tổ tiên), xuống (con cháu) và đi ngang (anh chị em) trong cây, bắt đầu từ phần tử (hiện tại) đã chọn. Chuyển động này được gọi là di chuyển ngang - hoặc di chuyển qua - cây DOM.

![jQuery Traversing](https://images.viblo.asia/3d4bad7f-fb2b-4716-a723-5d32e60007f3.png)

* Phần tử <div> là cha mẹ của <ul> và là tổ tiên của mọi thứ bên trong nó
* Phần tử <ul> là cha mẹ của cả hai phần tử <li> và là con của <div>
* Phần tử <li> bên trái là cha mẹ của <span>, con của <ul> và là hậu duệ của <div>
* Phần tử <span> là con của <li> bên trái và là hậu duệ của <ul> và <div>
* Hai phần tử <li> là anh em ruột (chúng có cùng cha mẹ)
* Phần tử <li> bên phải là cha mẹ của <b>, con của <ul> và là hậu duệ của <div>
* Phần tử <b> là con của <li> và là hậu duệ của <ul> và <div>

Như vậy bạn đã hiểu qua jQuery Traversing rồi đúng không? tiếp theo mình sẽ giới thiệu tiếp về validate form trong jQuery nhé.

### 8. jQuery Form Validation
Với jQuery có rất nhiều thư viện đã ra đời phục vụ cho việc Form Validation, dĩ nhiên đây chỉ là validate từ phía client, còn server bạn vẫn cần validate để đảm bảo an toàn bảo mật.

1 ví dụ đơn giản cho validate:
Nếu trường name không được nhập thì mình sẽ alert ra 1 thông báo là hãy nhập trường name

```
<form name="myForm" action="/action_page.php" onsubmit="return validateForm()" method="post">
    Name: <input type="text" name="fname">
    <input type="submit" value="Submit">
</form>

<script>
function validateForm() {
      var x = document.forms["myForm"]["fname"].value;
      if (x == "") {
            alert("Name must be filled out");
            return false;
      }
}
</script>
```

Ngoài ra bạn cũng có thể tham khảo link sau để sử dụng thư viện cho tiện nhé:
[jQuery form validatation](https://www.sitepoint.com/basic-jquery-form-validation-tutorial/)
### 9. jQuery AJAX Method
AJAX - Một cái tên mà chắc chắn bạn sẽ nghe và làm việc cực nhiều với jQuery trong các bộ dự án của bạn. Đây là cách bạn thao tác với cơ sở dữ liệu mà không cần refresh lại trang.

Dưới đây là 1 ví dụ đơn giản về AJAX get file và hiển thị nội dung khi get file thành công:
```
<script>
$(document).ready(function () {
    $("#loadTextFile").click(function (e) {
        $.ajax({
            url: "file.txt",
            success: function (result,status,xhr) {
                $("#textData").html(result);
            }
        });
    });
});
</script>
```
AJAX còn rất nhiều thuộc tính bên trong như error, complete, beforeSend, v.v.., bạn có thể tìm hiểu chi tiết hơn tại [jQuery AJAX](http://api.jquery.com/jquery.ajax/)

### 10. jQuery Each
Một thành phần không thể thiếu trong jQuery đó là Each. 

JQuery each() được sử dụng để lặp qua từng phần tử của một Object, array. Nó cũng có thể được sử dụng để lặp qua các phần tử DOM như tất cả các tag của trang.
```
//Each tag <a>
$("a").each(function (index, value) { 
      console.log("anchor" + index + ":" + $(this).attr("href")); 
});

// Each array names
var names = ["yogi","john","gia","michael","czar"];
$.each(names , function (index, value){
      console.log("Array Current Index is: "+ index + " :: Value is: " + value); 
});
```

Ngoài ra tại đây [jQuery each](http://www.yogihosting.com/jquery-each/) còn rất nhiều ví dụ cho bạn tham khảo nếu bạn muốn hiểu sâu hơn nhé.
## Kết luận
Như vậy bạn thấy jQuery không có khó đúng không? nhưng công dụng của jQuery trong các project thì kỳ thực mà nói là điều không thể thiếu, nó vừa nhanh mà lại dễ sử dụng. 

Vậy còn chần chừ gì mà không bắt tay vào học ngay jQuery đúng không nhỉ?

Thanks you for reading :))

**Tài liệu tham khảo**
1. https://blog.cloudboost.io/best-jquery-tutorials-to-help-you-master-it-in-just-few-hours-2ce1be915bd5

2. https://www.w3schools.com/js/

3. http://www.yogihosting.com