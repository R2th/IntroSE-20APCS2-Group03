### Mở đầu
Trong lúc mình làm Dự án thì cũng có gặp một số bug về Javascript  trong lúc search thì cũng tìm được một số kiến thức khá hay mà chúng ta thường không để ý đến =)) đó là  `return false; `
vậy chắc hẳn chúng ta ở đây đều đã sử dụng đến `return false` trong JS cụ thể ở đây mình dùng jquery 1 thư viện của JavaScript. vậy khi ta gọi return false thì Jquery nó sẽ làm cái gì.

### What does “return false;” do?


`return false` nằm trong một callback dùng để chặn những hành động mặc định. ví dụ khi ta thực hiện submit thì `return false` nó sẽ ngăn chặn hành động submit xảy ra tức là nó sẽ không submit form. 

Và `return false` cũng sẽ stops bubbling (ngừng lan truyền) có nghĩa là các parents của element cũng sẽ không biết được là event đó đã được xảy ra.

Vậy có nghĩa là khi mà ta thực hiện gọi return false nó bằng ta gọi thực hiện
`Return false = event.preventDefault() + event.stopPropagation()`
event.preventDefault() cái này chắc hầu như ai dùng jquery cũng từng gọi nó vậy định nghĩa qua một chút . 

> Description: Khi method này được called thì những action default của event sẽ không được trigge.
> 
> Note:  Hàm này sẽ không nhận bất kì tham số nào cả. 
> 
event.stopPropagation() là gì :
> Description: Ngăn chặn event lan đến DOM tree, (từ element đó đến các parents của nó ) và ngăn không cho thông báo đến Parents của element rằng sự kiện của element đó vừa được kích hoạt.
> 
> Note:  Hàm này sẽ không nhận bất kì tham số nào cả. 
> 
Đương nhiên khi ta return false thì nó các dòng code sau return false sẽ không được excute nữa.
Chúng ta có một ví dụ nho nhỏ như sau ở phần dưới chúng ta dùng` e.preventDefault();`
phần HTML
```
<div id="theDiv">
    <form id="theForm" >
        <input type="submit" value="submit"/> 
    </form>
</div>​
```
Phần JS 
```
$('#theDiv').submit(function() {
    alert('DIV!');
});
$('#theForm').submit(function(e) {
    alert('FORM!');
    e.preventDefault();
});
```
[LIVE DEMO](http://jsfiddle.net/zwY5p/)

Ở phần dưới chúng ta sẽ dùng return false;
```
$('#theDiv').submit(function() {
    alert('DIV!');
});
$('#theForm').submit(function(e) {
    alert('FORM!');
    return false;
});
```
[LIVE DEMO](http://jsfiddle.net/zwY5p/9/)
Vậy khi ta chạy ở phần trên thì ta đã thấy là hàm alert đã thực hiện 2 lần nhưng khi ta chạy phần dưới ( sử dụng `return false` ) thì hàm alert() chỉ được call đúng 1 lần duy nhất .

Giả sử khi ta thực hiện Ajax nếu ta cũng có element lồng nhau giả sử như radio ở trong thẻ td. 
require đưa ra là click vào thẻ td sẽ thực hiện lưu ajax .và click vào radio cũng như vậy . nếu chúng ta không thực hiện handle tốt những trường hợp như vậy sẽ dẫn đến việc gửi lên 2 request ajax và sẽ xảy ra những lỗi không mong muốn.

Vậy chúng ta đã hiểu được bản chất của return false là gì. nó thực hiện được những gì và dùng thế nào sẽ hợp lí tùy vào trường hợp khác nhau.

Mình xin phép kết bài tại đây.

Nguồn : 

https://stackoverflow.com/questions/10729198/what-does-return-false-do

https://api.jquery.com/event.preventDefault/

https://api.jquery.com/event.stoppropagation/