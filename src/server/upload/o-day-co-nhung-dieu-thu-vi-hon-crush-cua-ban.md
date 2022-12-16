![](https://images.viblo.asia/fc7ecceb-74b9-49da-8190-f04e0e99251d.jpeg)

Xin chào các bạn, chắc hẳn các bạn đã quá quen thuộc với các bài viết về html của mình rồi phải không? Và hôm nay cũng không ngoại lệ, các bạn hãy cùng mình tìm hiểu về các thuộc tính thú vị của html tiếp nhé ;) 

### allow
Thuộc tính `allow` xác định phạm vi với các tính năng có sẵn trong iframe. Một số giá trị của thuộc tính này: accelerometer, fullscreen, microphone, USB...

`allow` xác định lại cách thực hiện của các tính năng có trong iframe. Đó là cách tiếp tục và để lại các thuộc tính allowfullscreen hoặc allowpaymentrequest cho kế thừa.

```html
<iframe src="/url-to-load" 
        title="demo"
        width="700" 
        height="400"
        allow="accelerometer; camera; geolocation; gyroscope">
</iframe>
```
### cite

Đây là một thuộc tính thú vị của tag `<blockquote>`, dùng để xác định nguồn cho `<blockquote>`, nhưng ngoài ra cũng có thể được sử dụng trong `<del>`, `<ins>` hoặc `<q>` 

Vì có tác dụng xác định nguồn nên giá trị của bạn này sẽ là một URL, chứa tài nguyên trực tuyến trong đó chứa tham chiếu được trích dẫn (hoặc thông tin chèn / xóa trong trường hợp tương ứng là <ins> và <del>).

`cite` không phải là một thuộc tính bắt buộc, nhưng nó có thể rất hay ho khi chúng ta đang trích dẫn một bài báo hoặc tài liệu trực tuyến. Được sử dụng như này nhé:
```html
<blockquote cite="https://dev.to/alvaromontoro/don-t-just-practice-coding-n0d">
  <p>
    Coding is fundamental for a developer, but there's more
    to it than just that: soft skills are essential too!
    Actually, social and communication skills are almost as 
    critical and not as easy to master.
  </p>
</blockquote>
```

Lưu ý: Thuộc tính này không hỗ trợ trong phần lớn trình duyệt nên bạn cân nhắc trước khi sử dụng nhé!
    
###    datetime
Thông thường sử dụng thuộc tính `datetime` trong tag `<time>`, nhưng các phần tử `<ins>` và `<del>` cũng có thể sử dụng thuộc tính này.
    
Trong tag <time>, thuộc tính `datetime` dùng để xác định ngày tháng hoặc thời gian cho thành phần time.
```html
<time thuoctinh="giatri"></time>
 ```
    
Tương tự, đối với các tag`<ins>` và `<del>` thì `datetime` sẽ cho biết thời điểm chèn / xóa và phải là ngày hợp lệ với chuỗi thời gian tùy chọn. Ví dụ:

```html
<p>
  Marie enjoys reading books, visiting new places,
  <del datetime="2010-07-10T19:00">listening to BSB,</del> 
  <ins datetime="2020-11-08T12:00">programming in HTML,</ins>
  and a nice cup of coffee.
</p>
```
### headers
Một ô trong bảng (<td> hoặc <th>), có thể được xác định bởi các tiêu đề khác nhau, nhưng trong các bảng phức tạp, có thể có nhiều hơn hai tiêu đề. Thuộc tính `headers` sẽ chứa danh sách ID của tiêu đề áp dụng cho một ô nhất định.

Thuộc tính này hữu ích khi được sử dụng trong các bảng phức tạp vì nó cung cấp ngữ cảnh cho máy. Nó có thể thú vị đối với các công nghệ hỗ trợ hoặc trải nghiệm tăng cường nhưng sự hỗ trợ của nó còn thiếu sót nên các bạn hãy sử dụng một cách thận trọng!

Ví dụ:
```html
<table>
  <caption>Weekend plan</caption>
  <thead>
    <tr>
      <th></th>
      <th id="saturday">Saturday</th>
      <th id="sunday">Sunday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td><th id="morning" colspan="2">Morning</th>
    </tr>
    <tr>
      <th id="hour08">8:00-10:00</th>
      <td headers="saturday morning hour08">Soccer practice</td>
      <td headers="sunday morning hour08">Reading</td>
    </tr>
    <tr>
      <th id="hour10">10:00-12:00</th>
      <td headers="saturday morning hour10">Basketball game</td>
      <td headers="sunday morning hour10">Brunch</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td></td><th id="afternoon" colspan="2">Afternoon</th>
    </tr>
    <tr>
      <th id="hour12">12:00-14:00</th>
      <td headers="saturday afternoon hour12">Siesta</td>
      <td headers="sunday afternoon hour12">Golf</td>
    </tr>
    <tr>
      <th id="hour14">14:00-18:00</th>
      <td headers="saturday afternoon hour14">Party!</td>
      <td headers="sunday afternoon hour14">Monday readiness</td>
    </tr>
  </tbody>
</table>
```
### inputmode
Thuộc tính `inputmode` cho phép chúng ta hiển thị loại bàn phím ảo nào sẽ được hiển thị trên các thiết bị có bàn phím ảo như: điện thoại, tablet...
Khi ta click vào 1 input thì thường có các loại bàn phím ảo là Numeric, Tel, Decimal, Email, Url, Search ... Với mỗi bàn phím ảo được chỉ đinh cụ thể, bản thân thiết bị sẽ được ra được những suggest tương ứng với loại bàn phím ảo đó.
    
```html
<textarea inputmode="none" name="myTextarea"></textarea>

<div contenteditable inputmode="decimal"></div>
```
### ping
Thuộc tính này chỉ định danh sách URL được phân tách bằng dấu cách, khi liên kết sau đó, các yêu cầu đăng với body ping sẽ được gửi bởi trình duyệt (trong bối cảnh). Thường được sử dụng để theo dõi.
```html
<a href="https://twitter.com/alvaro_montoro" ping="/url-stats.php">
  Check my twitter profile
</a>
```
Một vấn đề lớn với thuộc tính này là Firefox không hỗ trợ nó, điều này làm mất đi một lượng lớn người dùng.
### poster
Thuộc tính dùng để xác định một tập tin hình ảnh dùng để làm ảnh đại diện cho video trước khi phát.
```html
<video controls poster="link-to-poster-image.jpg">
  <source src="link-to-video.mp4" type="video/mp4">
  <source src="link-to-video.webm" type="video/webm">
  Sorry, your browser doesn't support embedded videos.
</video>
```
    
### Tổng kết
Cảm ơn các bạn đã dành thời gian đọc bài viết! Hy vọng bài viết sẽ đem lại nhiều kiến thức mới lạ cho các bạn. Bài viết được tham khảo [tại đây](https://dev.to/alvaromontoro/7-interesting-html-attributes-you-may-not-know-58j0)!