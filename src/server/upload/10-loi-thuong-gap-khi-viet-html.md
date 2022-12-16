Chào các bạn!

Các bạn có tự tin khi viết HTML mà không mắc 1 lỗi nào không? Dưới đây là danh sách đánh dấu những lỗi phổ biến lên HTML do các nhà phát triển giao diện người dùng thực hiện. Cho dù bạn là một nhà thiết kế web mới, hoặc một lập trình viên muốn thử thiết kế giao diện người dùng thì bạn cần cố gắng tránh những sai lầm này.

## 1. Không đặt các phần tử khối trong các phần tử nội tuyến

Một phần tử HTML được hiển thị dưới dạng khối hoặc theo mặc định. Các phần tử khối, chẳng hạn như **<div>** và các đoạn văn bản, tạo thành cấu trúc của tài liệu. Các phần tử nội tuyến nằm trong các khối này, chẳng hạn như thẻ **span**. Vì vậy bạn không nên đặt phần tử khối bên trong các phần tử nội tuyến.
    
**Sai:**

```
<a href="#"><h2> Phần tử khối nằm trong phần tử nội tuyến</h2></a>
```
    
**Đúng**

```
<h2><a href="#"> Phần tử khối nằm trong phần tử nội tuyến</a></h2>
```
    
## 2. Luôn luôn có thuộc tính alt cho các thẻ hình ảnh

Thuộc tính **alt** là một yêu cầu cho thẻ <img>, nó mô tả ngữ cảnh của hình ảnh. Nó cũng làm cho các trình thu thập thông tin web chỉ mục nội dung của bạn tốt hơn. Nếu các hình ảnh mục đích chỉ để hiển thị, sử dụng một thuộc tính alt trống như sau: **alt = “”**

**Sai**
    
```
<img src="sun.jpg"/>
```

**Đúng**

```
<img src="sun.jpg" alt="Sun-asterisk"/>
```

## 3. Không sử dụng ngắt dòng để hiển thị một danh sách

Nếu bạn muốn hiển thị một danh sách theo thứ tự hoặc có thứ tự, bạn không nên sử dụng thẻ ngắt dòng **br**. Sử dụng các danh sách không có thứ tự **<ul>** hoặc các thẻ liệt kê có thứ tự **<ol>**

**Sai:**
    
```
1. Nguyễn Văn A <br/>
2. Nguyễn Văn B <br/>
3. Nguyễn Văn C <br/>
```
**Đúng**

```
<ol start="number">
    <li>Nguyễn Văn A</li>
    <li>Nguyễn Văn B</li>
    <li>Nguyễn Văn C</li>
</ol>
```

## 4. Không sử dụng <b> và <i> để in đậm và in nghiêng
    
**<b>** và **<i>** được sử dụng để in đậm và in nghiêng các văn bản. Bạn nên sử dụng các đặc tính CSS font-weight và font-style cho những mục đích này tương ứng. Nếu áp dụng cho các phong cách trên tài liệu, hãy sử dụng **<strong>** và **<em>** thay thế. Chúng làm công việc giống như **<b>** và **<i>** nhưng đúng ngữ nghĩa.

Trong trường hợp này thì không hẳn là sai mà chính xác hơn thì là nên dùng **<strong>** và **<em>** hơn vì 2 tag này tốt cho SEO.

```
<strong> Dòng text in đậm. </strong>
<em> Dòng text in nghiêng</em>
```
    
## 5. Không sử dụng nhiều ngắt dòng

Thẻ ngắt dòng **br** chỉ nên được sử dụng để ngắt dòng đơn trong dòng văn bản. Nó không nên được sử dụng để tạo khoảng trống giữa các phần tử, thay vào đó, chia văn bản thành các đoạn riêng biệt, hoặc điều chỉnh lề theo kiểu CSS.
    
**Sai:**
```
Đây là dòng text 1
<br/>
<br/>
Đây là dòng text 2
```
    
**Đúng:**
```
<p>Đây là dòng text 1</p>
<p>Đây là dòng text 2</p>
```  
    
## 6. Tránh sử dụng css inline

**Css inline** là những css được đặt trực tiếp vào trong element như thế này:

```
<p style="color: blue;">Đây là dòng text 1</p>
```
Khi viết như này sẽ gây khó khăn rất lớn cho việc override css hoặc bảo trì code sau này. Không những thế, cách viết này sẽ ảnh hưởng lớn đến performance của 1 website. Chính vì thế, hãy hạn chế sử dụng css inline. Thay vào đó là việc sử dụng load css external, tức là dùng file css để define css.
```
<p class="text">Đây là dòng text 1</p>
    
.text {
    color: #ff000;
}
```
    
## 7.  Không thêm (hoặc xóa) thuộc tính border trong HTML

**Sai:**
```
<img src="sun.jpg" alt="Sun-asterisk" border="0"/>
```

**Đúng:**
```
<img class="no-border" src="sun.jpg" alt="Sun-asterisk"/>
    
.no-border {
    border: 0;
}
```
 
## 8. Viết thiếu hoặc không chính xác chữ DOCTYPE

**DOCTYPE** cho trình duyệt web biết phiên bản HTML nào trang của bạn đang sử dụng. Về mặt kỹ thuật, nó đề cập đến một định nghĩa kiểu tài liệu xác định các quy tắc cho phiên bản HTML đó.

**DOCTYPE** nên luôn luôn là dòng đầu tiên của mã HTML của bạn và nó là trường hợp nhạy cảm.

Tìm hiểu thêm về **DOCTYPE** [Tại đây](https://www.w3schools.com/tags/tag_doctype.asp)
    
## 9. Viết không đúng định dạng HTML
    
**- Thiếu dấu ngoặc kép cho các thuộc tính**

Mặc dù các phiên bản cũ của HTML không yêu cầu bạn bao quanh các giá trị với dấu ngoặc kép, các phiên bản tương lai (bao gồm cả XHTML) có thể vẫn sẽ không yêu cầu dấu ngoặc kép. Nhưng để tránh mắc phải những lỗi về hiển thị trên hầu hết các trình duyệt, bạn nên đặt dấu ngoặc kép xung quanh các giá trị.
    
**Sai:**
```
<img src=sun.jpg alt=Sun-asterisk/>
```

**Đúng:**
```
<img src="sun.jpg" alt="Sun-asterisk"/>
```
    
**– Thiếu thẻ đóng**

Hầu hết các thẻ HTML đều có cả thẻ mở và thẻ đóng (ví dụ: **<a></a>**). Nếu bạn thiếu thẻ đóng thì trình duyệt sẽ hiển thị sai kết quả.

**– Các thẻ HTML phải được đóng theo đúng thứ tự theo các thẻ bạn đã mở**

**Sai:** 
    
```
<div><a href="#"><span>Đây là ví dụ</a></span></div>
```
    
**Đúng:**
    
```
<div><a href="#"><span>Đây là ví dụ</span></a></div>
```
Đây là lỗi hay thường thấy nhất. Hiện tại đa phần các bạn sử dụng các editor cho phép auto thêm thẻ đóng thì sẽ ít bị mắc lỗi sai này. Tuy nhiên với các bạn mới học, chỉ gõ thẻ mở mà quên gõ thẻ đóng hoặc đặt sai thứ tự thì hậu quả sẽ là đoạn code đó khi hiển thị sẽ bị vỡ tanh bành.
Như vậy, để khắc phục lỗi này thì nên gõ thẻ đóng ngay sau khi gõ thẻ mở trong trường hợp bạn dùng editor không hỗ trợ auto thẻ đóng.
    
## 10. Nội dung phần đầu phải nằm trong thẻ <head>
    
Các thẻ **<title>**, **<meta>**, **<style>** phải nằm trong cặp thẻ **<head>** và **</head>**
    
Như vậy, qua bài này các bạn đã biết mình hay mắc phải lỗi nào chưa? Và nhớ sửa lại đúng cách viết nhé. 
    
Chúc các bạn may mắn!