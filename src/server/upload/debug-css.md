# 1.What is Debug?
Trong quá trình phát triển hệ thống chắc hạn bạn đã gặp quá nhiều bug(lỗi) . Việc bạn tìm nguyên nhân tại sao lại xuất hiện những bug như vậy để giải quyết chúng chính là **DEBUG** .
Chúng ta thường nghe các tiền bối cao siêu debug  **js,php,java** ..etc . Nhưng hôm nay mình xin giới thiệu một vài cách debug đơn giản với **CSS** (cái này mới nhiều bug nè nhưng cũng tương đối dễ ăn), khách hàng cứ nhìn thấy cái font k ưng í hay block màu k phải màu hường là reject bạn ngay lập tức, hay trong quá trình nhập môn ta thường đau đầu suy nghĩ vì sao code **CSS** như sách giáo khoa mà dao diện như sh*t. ><
# 2. Các Case tạo nên bug.
Có 3 case chính mình đưa ra ở đây đó là :
* **Bạn viết CSS sai Element.**
* **Element bị ghi đè CSS bạn đã style.**
* **Thuộc tính CSS sai or giá trị sai.**

Viết xong  thì thấy cũng chỉ có 1 case là Element k nhận css bạn đã viết >< .
# 3. Công cụ debug
Bạn cần 1 trình soạn thảo và 1 trình duyệt để làm điều này.
Mình thì hay dùng combo **sublimeText + Chrome**. Bạn cũng có thể dùng **notepad + IE** nếu muốn :trollface .
Nếu dùng sublimeText thì mình khuyên bạn nên cài thêm 1 vài package hỗ trợ code css như  **Emmet,ColorPicker,AutoPrefix**...etc
Bạn có thể tham khảo cách cài các package[ tại đây](https://packagecontrol.io/installation).
# 4.Tạo Bug và Đè Bug
Dao diện  **mong muốn**   của mình là nó sẽ hiện trông ntn 
![](https://images.viblo.asia/0a0871d4-3957-4c67-b218-d8715b832e6c.png)
 Sau hồi nhìn cái dao diện dễ dãi này thì mình hí hửng lao đầu vào code và chắc mẩm 5p sau sẽ làm i mẫu k sai 1mm ><
Mình sẽ tạo 1file html bao gồm cả html và css  (debug cho tiện)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Debug Css</title>
</head>
<body>
    <div id="wraper">
        <h1 class="title">This is Title</h1>
        <h1 class="title title2">This is Title 2</h1>
        <p class="content">This is Content</p>
    </div>
</body>
</html>
<style>
  #wrper{
    background: #aae0c6;
    text-align: center;
    padding: 30px;
    max-width: 1200px;
    margin: auto;
  }
  .title2{
      color: red;
  }
  .title{
      color: blue;
  }
  .content{
      display: block;
      padding: 30px;
      border: 10px double yenxg;
  }
</style> 
```
Nhưng thật k may dù đã nghĩ rằng mình code như sách giáo khoa rồi mà dao diện như đồng nát, nó lại hiện ra ntn là sao :seaduck
![](https://images.viblo.asia/bdf6ec24-d1c7-4a6a-926f-4134bc980439.png)

Các bạn nghĩ mình nên làm gì?Nếu như là lúc mới học code mình sẽ quay lại đọc từng dòng code **html & css** sau đó đối chiếu xem tên **class,id** đúng chưa? xem code có sai dấu, sai chữ gì k? ...blabla...nhưng Google đã tạo ra cho bạn chiếc bánh xe(**Chrome dev tool**) thì bạn đừng chạy bộ nữa, mà thay vào đó hãy vác chiếc bánh xe và chạy :trollface . Thật ra là lên máy bay lái thôi :))) . 

Việc đầu tiên mình làm là click chuột phải vào trang web và chọn **Inspect**
![](https://images.viblo.asia/c57400a6-3535-48cb-b0da-653d53dc82b2.png)
# 5. Element không nhận được Css
Trước tiên chúng ta cùng kiểm tra xem vì sao **#wraper** không có background **màu xanh**
![](https://images.viblo.asia/300d90da-c635-4efd-9f9a-20699146b58c.png)

Giờ thì quay lại đọc code đã viết cho **#wraper** xem sai xót gì
![](https://images.viblo.asia/975b02b0-0f1c-4fb1-b797-b609bcb5c8d2.png)

 Sau khi sửa lại và f5 trình duyệt cùng xem kết quả nhé
 
 ![](https://images.viblo.asia/4f81b3c3-4489-439d-bc44-98cb9fc38fb9.png)
 
 Vậy là xong case 1. Ở case này thường là bộ chọn của các bạn đang bị sai (**sai tên Id, Class, Element**).
# 6.  CSS bạn viết bị ghi đè
 Tiếp theo cùng check xem sao "**This is title 2**" đang không có màu đỏ như hình mẫu.
 ![](https://images.viblo.asia/dd3e6048-0a9c-4344-841d-6492ca527c3e.png)
 
 Nên giải quyết sao với case style bạn viết đang bị gạch đi ntn???
 
 ![](https://images.viblo.asia/5d8edc54-124a-4fa0-8508-e02581d12c7c.png)
# 7. Thuộc tính CSS sai
 CSS  thì có quá trời thuộc tính và giá trị mà đến giờ mình cũng chưa tìm hiểu được hết :((( hay việc các bạn mới học code , dễ code sai và nhầm thì cũng dễ hiểu. Nên case này cũng hay xảy ra lắm.Giờ chúng ta check tiếp tại sao "**this is content**" chưa có border nhé! Let's start !
 ![](https://images.viblo.asia/4d833b2b-64f5-4ec6-b805-0e9cd94aed0a.png)\
 
 Cùng sửa lại "green" thay vì "yenxg" nhé. Kết quả giờ đã khá hơn
 
 ![](https://images.viblo.asia/ab6d82a7-1595-44cf-b8e3-f4699f090467.png)
# 8. Ngoài lề
 Chrome dev tool   thật sự rất hay ho vì mình còn debug được cả Javascript hay Tốc độ load trang , Số lượng Request , giả lập tốc độ Internet...etc. Nhưng hôm nay mình đang tập trung về việc debug CSS bằng Chrome dev tool . Nên combo thêm 2 cái ảnh khá hay ho dưới đây:
 
**Styles tab:**

 ![](https://images.viblo.asia/9832b984-b22e-4b5b-969d-b5c14e4d0ab3.png)
 
**Computed tab:**
![](https://images.viblo.asia/806e2239-93f5-42ce-b5b4-20c5a413a3ed.png)

# Kết luận
**CSS** chỉ là bước đầu của việc trở thành 1 Programer or Developer nhưng mình nghĩ chúng ta hãy bước những bước đầu thật vững chắc và thú vị nhé!
Nếu bạn có góp í gì thì để lại cmt giúp mình nhé !
Cảm ơn đã đọc bài viết  :*  :*