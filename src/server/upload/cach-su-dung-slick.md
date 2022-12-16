Chào các bạn đây là bài viết đầu tiên của mình về fontend. Vì kinh nghiệm mình cũng chưa nhiều kiến thức còn kém, nhưng không sao cũng tốt cho các bạn mới tìm hiểu về nó, thêm một link là thêm cơ hội được hiểu về nó hơn. Tìm hiểu  về slick này mình tự tìm hiểu không biết có đúng không. Các anh professional thấy có gì sai sai nhẹ tay góp ý .

![](https://images.viblo.asia/638d6d11-9f15-42c4-9993-2061608174ff.png)
## 1.  Slick là gì ?
        
Slick.js là một plugin jQuery nổi tiếng được tạo ra bởi Ken Wheeler cho phép bạn tạo ra những responsive carousel tuyệt đẹp. Để hiểu rõ hơn về những gì plugin này có thể mang lại cho bạn, cùng mình tìm hiểu nhé.

## 2.  Chuẩn bị gì ?

###  2.1. HTML
Chúng ta cần một list danh sách các item để gọi hàm slick xử lý:
```
<div>
  <div><h3>1</h3></div>
  <div><h3>2</h3></div>
  <div><h3>3</h3></div>
  <div><h3>4</h3></div>
  <div><h3>5</h3></div>
  <div><h3>6</h3></div>
</div>
```
###  2.2. Thư viện cần thiết
Thêm thư viện slick bằng cách sử dụng trực tiếp file download [này](https://github.com/kenwheeler/slick/) về hoặc sử dụng link của cdn.jsdelivr.net.

CSS
```
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
```
JS
```
<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
```

 Nếu trong quá trình làm lỗi phát sinh bạn đổi slick.min.js thanh slick.js để sử dụng tốt hơn nhé.

Hoặc các bạn có thể cài bằng npm vào node-modules
```
npm install slick-carousel
```

## 3.  Setting Slick

Dùng jquery để gọi hàm slick
```
$('.multiple-items').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3
});
```
Chúng ta sẽ setting các thuộc tính có sẵn của slick như sau: 

| Tên thuộc tính| Mục đích sử dụng | Kiểu giá trị |  Ví dụ : (mặc định) |  
|---|---|---|---|
| slidesToShow |  Số lượng phần tử được nhìn thấy  |  int |   |
| slidesToScroll | Số phần tử được lướt sang   | int  |   |
| accessibility  |  Cho phép qua lại phần tử bằng bàn phím qua lại  |  bool | Accessibility: true  |
| adaptiveHeight  | Nếu kích thước item lớn thì sẽ tự động giãn chiều cao  | bool  | adaptiveHeight:false  |
| autoplaySpeed  | Tự đông chạy cho slide |  int(ms) | autoplaySpeed :3000   |
| arrows  |  Cho phép hiển thị phím mũi tên chạy | bool  | arrows:true  |
| asNavFor  | Đặt thanh trượt thành điều hướng của thanh trượt khác Thường đi với focusOnSelect| string  |  $(function(){ <br> $("#slider").slick(  <br> autoplay: true, <br> speed: 1000, <br> arrows: false, <br> asNavFor: "#thumbnail_slider" }); <br> $("#thumbnail_slider").slick({ <br> slidesToShow: 3,<br>speed: 1000,<br>asNavFor: "#slider"<br>}); <br> }); <br>  https://codepen.io/blanks-site/pen/pWMGjm
| appendArrows  |  Đưa các button điều khiển vào một thẻ cho trước |string   |  appendArrows: ‘.contron-pre-next’|
| appendDots  |  Tương tự như anpenArrows là chấm chỉ mục | string  |  appendDots: ‘.dot’ |
| prevArrow  |  Button next slide |String   |  ```<button type="button" class="slick-prev">Previous</button>``` |
| nextArrow  |  Button prev slide | String  |  ```<button type="button" class="slick-next">Next</button>``` |
| centerMode  |  Hiển thị slide ở trung tâm, bao gồm các slide trước và tiếp theo. slidesToShowChỉ định cả hai với một số lượng item là số lẻ. | bool  | centerMode: true  |
| centerPadding  | Khoảng cách của phần hiển thị bị che một item chưa show (dung chung với centerMode)  | String  |  centerPadding :’50px’ or ‘50%’ |
| cssEase  |  Hiệu ứng chuyển trang | String  |  Tìm hiểu them về animation-timing-funtion của css <br>```cssEase: 'linear' or 'cubic-bezier(0.7, 0, 0.3, 1)'``` <br> linear,ease,ease-in,ease-out,ease-in-out,step-start,step-end,steps(int,start,end),cubic bezier(n,n,n,n),initial,inherit; |
| customPaging  |  Biến những dấu chấm phân silde thành những con số. chính vì vậy dot: true  | Funtion  |  <br> customPaging: <br> function(slick,index) { <br> return '<a>' + (index + 1) + '</a>';  }|
| dot  |  Dấu chấm định danh địa chỉ đên cho mỗi item show |bool   |  dots: fasle |
| dotClass  | Css class cho các dấu chấm tương ứng với các slide của slider  |  string |  dotClass:  ‘slick-dots’ |
| draggable  | Cho phép kéo chuột  | bool  |  draggable: true |
| fade  | Mờ dần khi chuyển slide  |bool   |fade: false   |
| focusOnSelect  | Khi click vào slide con bên dưới thì slide chính được show   | bool   | focusOnSelect: false  |
| easing  |  Thêm các animation của jquery | string  |  easing: 'linner'( or swing,_default )|
| infinite  | Vòng lăp vô tận  |  bool | infinite:true  |
| initialSlide  |  Thứ tự xuất hiện lần đầu của item show | int  |  initialSlide: 0 |
| rows  | Show số hàng item trên một slile  | int  |  rows: 1 |
|responsive | Reponsive cho từng kích thước view | Object | responsive: [ <br>  {<br>  breakpoint: 768,<br> settings: {<br> arrows: false,<br> centerMode: true,<br> centerPadding: '40px',<br> slidesToShow: 3<br> }<br> },<br> {<br>  breakpoint: 480,<br> settings: {<br> arrows: false,<br> centerMode: true,<br> centerPadding: '40px',<br> slidesToShow: 1<br> }} ] |
|mobileFirst | Bật tắt chế độ reponsive ngay trên màn hình desktop | bool | mobileFirst: false |
|pauseOnFocus|Tạm dừng auto slide đang chạy khi click vào item show|bool|pauseOnFocus: true|
|pauseOnDotsHover|Tạm dừng auto slide đang chạy khi hover vào dot show|bool|pauseOnDotsHover: true|
|pauseOnHover|Tạm dừng auto slide đang chạy khi hover vào item show|Bool|pauseOnHover: true|
|respondTo|Chiều rộng được định cho repoonsive|String|respondTo: ‘tenClass’|
|slide|Show toàn bộ item|element|Slide:'  '  <br> (using Slide: ‘p.light’ nó sẽ show toàn bộ item ra)|
|slidesPerRow|Show toàn bộ item. Ví dụ bằng 2 thì xếp 2 item vào 1 nhóm trải dài, có 8 item thì có 4 nhóm|int|slidesPerRow: 1|
|speed|Tốc độ chuyển slide|Int|Speed:300|
|swipe|Cho phép vuốt slide|Bool|Swipe: true|
|swipeToSlide|Vuốt click chỉ đươc 1 item nếu true được bật|Bool|swipeToSlide: false|
|touchMove|Bật tắt chế độ cảm ứng|Bool|touchMove: true|
|touchThreshold|Khi chuyển slide bằng cách vuốt thì thuộc tính này tính chiều dài của việc vuốt đó bằng công thức (1/value)*chiều dài item|Float|touchThreshold:5|
|variableWidth|Vô hiệu hóa vùng nhìn của slide|Bool|variableWidth: false|
|vertical|Slide di chuyển lên xuống thay vì trái phải hoặc dùng verticalSwiping|bool|vertical: false,|
<br>

Đây là những cái cơ bản về slick mà mình tìm hiểu cũng như test qua, còn rất nhiều thứ về nó như events, methods mình chưa tìm hiểu hết, có cơ hội mình sẽ viết tiếp về nó. Đây là một số link mình tham khảo các bạn cũng có thể tìm hiểu thêm tại đây

https://kenwheeler.github.io/slick/
https://tr.you84815.space/slick/settings/accessibility.html

Mong bài viết sẽ có ích với các bạn.