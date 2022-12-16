Chào mọi người mình lại quay lại và ăn hại hơn xưa đây! Hôm nay mình sẽ giới thiệu về Promise và các ứng dụng của nó trong Javascript các ban nhé!

`Promise` được sử dụng khá nhiều ở cả front-end (AngularJS- VueJS......) và back-end(NodeJS), do đó nắm vững khái niệm này sẽ giúp bạn rất nhiều trong việc code và … trả lời phỏng vấn đấy nhé :)

Bắt đầu chém gió thôi nào! 
Chắc hẳn ai từ trước đến giờ đều ai cũng một lần cho người khác mượn tiền đúng không nhỉ :) và đều có 1 trong 3 kết quả sau đó là có đứa hứa sẽ trả (ahihi bạn tốt đấy) `(pending)` , có đứa trả` (fulfilled)`, và cũng có đứa một đi không trở lại` (reject).`

> Đây cũng 3 trạng thái của Promise.
> 
> 
> + Lúc còn là tờ giấy nợ hứa sẽ trả tiền (ngon),` pending`.
> 
>  + Lúc bạn đã  trả tiền, Promise được resolve, đây là trạng thái `fulfilled` trong truyền thuyết. Chúng ta cũng có kết quả trả về là số tiền cầm trên tay, ôi những thứ tưởng đã mất khi quay trở về mới thật vi diệu làm sao, bố mày thề ko bao giờ cho mượn tiền nữa.
> 
>  + Lúc bị quịt , Promise bị reject, đây là trạng thái cuối cùng trước khi chúng ta lao ra quán nhậu để chia tay 1 cuộc tình. Có thể là tình yêu, hoặc là tình bạn (mình từng bị reject như này khi mất tiền chỉ biết mở nhạc Ưng Hoàng Phúc lên nghe thôi :)))
>  
Nhưng khi đi sâu vào Promise thì chúng ta phải biết nguyên nhân tại sao nó lại được sinh ra nhé

# 1.Lập trình bất đồng bộ trong Javascript
Bạn nào từng làm AJAX đều biết rằng Javascript kết nối với server theo [cơ chế bất đồng bộ(Async)](https://nhungdongcodevui.com/2017/07/19/javascript-hieu-ro-co-che-xu-li-dong-bo-va-bat-dong-bo-sync-vs-async-trong-javascript-p1/) , các hàm phía sau không đợi hàm AJAX chạy xong mà tiếp tục chạy luôn.

Ví dụ như dự án mình vừa làm gần đây! mình dùng ajax call lên serve để lấy dữ liệu và ngay dưới hàm call đấy mình dùng 1 hàm document.getElementById("23") đẩy lấy Dom của cái id bài viết mà js bind ra! và kết quả là bị undefined luôn! vì khi mình call lấy dự liệu trả về thì thằng document.getElementById("23") nó cũng chạy mà lúc đấy thì làm gì có dự liệu mà lấy đúng không!

`Do đó, để lấy kết quả của hàm ajax, ta phải truyền cho nó 1 callback. Sau khi hàm AJAX lấy được kết quả, nó sẽ gọi hàm callback với kết quả thu được.`

ví dụ 
```javascript
// Truyền callback vào hàm ajax
var callback =  function(money){
  console.log(money);
};
ajax.get("xintienme", callback);

// Có thể viết gọn như sau
ajax.get("xintienme", function(money) {
  console.log(money);
})
```
Cơ bản là giải quyết được rồi đúng không! nhưng wait tý nhỉ!  Sử dụng callback chồng chéo sẽ làm code trở nên rối rắm, khó đọc; việc bắt exception, hiển thị lỗi trở cũng nên phức tạp.
Ví dụ nhé 
```javascript
// Do javascript bất đồng bộ, bạn không thể lấy dữ liệu lần lượt kiểu này! đây là lỗi khá thường gặp khi mọi người mới code js
var tien = xin_tien_me(); // xin tiền mẹ nào ahihi
var sinhnhatbangai = sinh_nhat_ban_gai(tien); // Lấy tiền tổ chức sinh nhật cho bạn gái nào 
var abcd = chở_gái_vào_hotel(y); // Đi chơi xong rồi dẫn bạn gái đi đâu đó hóng gió hihi

// Mà phải sử dụng đống callback  tạo thành callback hell
xin_tien_me(function(tien) {
    sinh_nhat_ban_gai(xe, function(sinhnhatbangai) {
    });
});
```
bạn dính phải callback hell rồi đấy! bạn thấy hàm của bạn gọi lằng nhằng lắm đúng không! đấy là chỉ có vào nhà nghỉ! xong nhà nghỉ xong rồi lại đi ăn chè uống trà sữa thì có mà sấp mặt nhuôn

Để giải quyết vấn đề này, các bác developer đã sáng tạo ra một khái niệm gọi là promise.

# Promise là gì ?
`The Promise object is used for asynchronous computations. A Promise represents an operation that hasn't completed yet, but is expected in the future.`

Khái niệm này khá khó hiểu để dễ hiểu mọi người chỉ cần hiểu Promise là 1 lời hứa. Tương tự như trong thực tế, có người hứa rồi làm, có người hứa rồi … thất hứa.
# Khi nào dùng Promise?
Khi 1 function đang kẹt nhưng hứa sẽ trả kết quả cho chúng ta vào 1 tương lai xa. Nhưng chúng ta lại cần dùng kết quả đó trong 1 function khác. Khi đấy Promise sẽ đóng vai trò là giá trị chúng ta cần, để chúng ta có thể sử dụng ngay.

Lúc này anh em cứ nghĩ Promise là 1 tờ giấy lộn, nhưng có tác dụng thật, là minh chứng (proxy) cho cục tiền nợ có nguy cơ mất 99% kia.

```javascript
tra_tien_em_anh_oi() // trả về 1 Promise.
  .then(function(tien) {
    // chúng ta có thể làm gì đó với số tiền này ngay lập tức
    // ơ làm gì đây
    return nhau_an_mung(tien);
  })
  .catch(function(ly_do_quit){
    console.log(ly_do_quit);
  })
```
tra_tien_em_anh_oi() sẽ ko phun ra xu nào, mà chỉ trả về tờ giấy nợ Promise. Tạm thời chưa nói đến cách tạo. Anh em chú ý thằng .then và .catch đây là 2 method của Promise.prototype, chỉ gọi dc khi new Promise lên.
## .then
Phần này được  gọi khi Promise resolve, tất nhiên khi đấy chúng ta sẽ lấy được kết quả, và làm gì với kết quả đó là tuỳ chúng ta.

Muốn .then nhiều lần cũng dc, khi đấy Promise sẽ thực hiện các function trong .then theo thứ tự
```javascript
tra_tien_em_anh_oi() 
  .then(function(tien) {
    return nhau_an_mung(tien);
  })
  .then(function(tien_con_lai_sau_khi_nhau){
    return mat_xa(tien_con_lai_sau_khi_nhau);
  })
  .then(function(){ // het tien 
    return hue_oi();
  });
```
> Lưu ý trong cái .then thứ 2, giá trịtien_con_lai_sau_khi_nhau là kết quả của function nhau_an_mung, sau đó tiền, à ko có sau đó nữa vì đã hết tiền, .then cuối cùng ko có giá trị gì truyền vào cả !
>
## .catch
Trong trường hợp tra_tien_em_anh_oi không  trả tiền, tức là Promise bị reject, thì phần này sẽ chạy, tất nhiên là không có tiền, nhưng chúng ta sẽ nhận được lý do quịt nợ một cách lịch sự, có thể chỉ là 1 string, hoặc cũng có thể là 1 exception. Nói chung chúng ta sẽ có 1 lý do là sao lại quịt nơ >.<

> Promise ưu việt hơn callback ở chổ chúng ta có thể trả về  một exception một cách thoải mái mà không lo lắng vì .catch sẽ lụm được hết.**
> 

```javascript
function tra_tien_em_anh_oi() {
  // tạo và trả về 1 Promise, khi này Promise ở trang thái pending
  return new Promise(function(resolve, reject) {
    // tâm sinh lý ngẫu nhiên 
    var isHappy = Math.random() >= 0.5;

    // nếu vui thì gọi resolve để trả tiền 
    if (isHappy) {
      var tien = 1000;
      return resolve(tien); //  Promise dc fulfilled  
    }

    // không vui quịt luôn
  // nhớ cho ng ta biết lý do vì chúng ta là lập trình viên lịch sự.
    var reason = 'lịt pẹ bố dek trả đấy làm gì nhau';
    reject(reason); //  Promise ở trạng thái reject
  });
```
# Promise Hell
Tuy nói Promise giúp tổ chức code, và tránh callback hell, nhưng nếu viết code không khô thoáng và sạch sẽ thì anh em vẫn rơi vào Promise Hell. Do đó lúc nào chúng ta cũng phải dùng kotexcode.

`Promise Hell`
```javascript
tra_tien_em_anh_oi()
    .then(function(tien){
      return nhau_an_mung(tien)
        .then(function(tien_con_lai){
          return mat_xa(tien_con_lai)
            .then(function(){
              return hue_oi();
            })
        })
    })
```
Viết lại thành Kotexcode
```javascript
 tra_tien_em_anh_oi()
    .then(nhau_an_mung)
    .then(mat_xa)
    .catch(console.error.bind(console));
```
# KẾT LUẬN
Với các ưu điểm của mình, promise đang dần dần thay thế cho callback. Dĩ nhiên là không thay thế hoàn toàn đâu. Với các hàm đơn giản thì dùng callback sẽ ngắn và dễ hiểu hơn promise.

Vì khái niệm promise khá là khó, mình khuyên các bạn nên đọc lại nhiều lần, kết hợp với xem những bài viết khác liên quan tới nó nhé!
Tài liệu tham khảo

https://toidicodedao.com/2016/07/05/javascript-promise/
https://kipalog.com/posts/Promise-la-khi-gi-
https://kipalog.com/posts/prototype-la-khi-gi-
## My Blog
https://tranvanmy.github.io/MyBLog/