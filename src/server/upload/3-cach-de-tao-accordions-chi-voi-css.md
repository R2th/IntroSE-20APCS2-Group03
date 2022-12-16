Hầu hết các accordion đều dựa vào JavaScript, chủ yếu là jQuery, nhưng vì việc sử dụng các kỹ thuật CSS3 nâng cao đã trở nên phổ biến, chúng ta cũng có thể tìm thấy các ví dụ đẹp chỉ sử dụng HTML và CSS, làm cho chúng có thể truy cập được trong môi trường JavaScript bị vô hiệu hóa.

Việc tạo ra các accordion chỉ dung  CSS có thể là một nhiệm vụ phức tạp, vì vậy trong bài viết này, chúng ta sẽ cố gắng hiểu các khái niệm chính mà các nhà phát triển sử dụng khi họ cần tạo ra nó.

Trong việc tạo các tab chỉ dùng CSS thường có hai cách tiếp cận chính, mỗi phương thức có hai trường hợp sử dụng thường xuyên. Cách tiếp cận đầu tiên sử dụng các phần tử biểu mẫu ẩn, trong khi phương pháp thứ hai sử dụng **CSS pseudo-selectors**.
## 1. The Radio Button Method
The Radio Button Metho thêm một đầu vào radio ẩn và một nhãn  tương ứng cho mỗi tab của accordion. Logic rất đơn giản: khi người dùng chọn một tab, về cơ bản họ kiểm tra nút radio thuộc về tab đó, giống như cách họ điền vào biểu mẫu. Khi họ nhấp vào tab tiếp theo trong accordion, họ chọn nút radio tiếp theo, v.v.

Trong phương thức này, chỉ một tab có thể mở cùng một lúc. Logic của HTML trông giống như sau:
```
<div class="css-only-accordion">
 
  <!-- One Tab Inside The Accordion -->
  <div>
    <input type="radio" name="tab-1" id="tab-1">
    <label for="tab-1">Title of Tab 1</label>
     
    <div class="tab-content">
      <h2>Content Title (don't use h1 tag here)</h2>
      <p>Some content.... </p>p>
    </div>
   
  </div>
   
  <!-- Other Tabs with The Same Structure -->
   
</div>
```
Bạn cần phải thêm một cặp nhãn radio riêng biệt cho mỗi tab trong accordion. Chỉ riêng HTML sẽ không cung cấp hành vi mong muốn, bạn cũng cần thêm các quy tắc CSS phù hợp, hãy xem cách bạn có thể thực hiện điều đó.
**Fixed Height Vertical Tabs**
Logic cơ bản của CSS ở đây là như sau:
```
input[type=radio] {
  display: none;
}
label {
  position: relative;
  display: block;
}
label:after {
  content: "+";
  position: absolute;
  right: 1em;
}
input:checked + label:after {
  content: "-";
}
input:checked ~ .tab-content {
  height: 150px;
}
```
**Image   Accordion với Radio Buttons**
Tương tự như trên, chỉ hơi khác là trong trường hợp này các tab không được đặt theo chiều dọc mà theo chiều ngang, và HTML thay vì label sẽ là các thẻ figcaption 
![](https://images.viblo.asia/e0259a84-9aaa-419b-a43f-8bf114462aa2.jpg)
## 2. The Checkbox Method
Phương thức Checkbox sử dụng loại đầu vào Checkbox thay vì  Radio Button. Khi người dùng chọn một tab, về cơ bản họ chọn Checkbox tương ứng.

Sự khác biệt so với phương pháp Radio Buttons là có thể mở nhiều tab cùng một lúc, giống như có thể check nhiều Checkbox bên trong biểu mẫu.

Mặt khác, các tab sẽ không tự đóng lại khi người dùng nhấp vào một tab khác. Logic của HTML cũng giống như trước , chỉ trong trường hợp này bạn cần sử dụng Checkbox cho kiểu đầu vào.
```
<div class="css-only-accordion">
 
  <!-- One Tab Inside The Accordion -->
  <div>
    <input type="checkbox" name="tab-1" id="tab-1">
    <label for="tab-1">Title of Tab 1</label>
     
    <div class="tab-content">
      <h2>Content Title (don't use h1 tag here)</h2>
      <p>Some content.... </p>p>
    </div>
   
  </div>
   
  <!-- Other Tabs with The Same Structure -->
   
</div>
```
Đoạn CSS cũng giống như với Radio Buttons ở trên với cả 2 trường hợp
## 3. The :target Method
: target là một trong những pseudo-selectors của CSS3. Với sự trợ giúp của nó, bạn có thể liên kết một phần tử HTML với một thẻ a cách sau:
```
<section id="tab-1">
  <h2><a href="#tab-1"></a>Title of the Tab</a></h2>
  <p>Content of the Tab</p>
</section>
```
Khi người dùng nhấp vào tiêu đề của một tab, toàn bộ phần sẽ mở nhờ :target pseudo-selector và URL cũng sẽ được thay đổi thành định dạng sau: www.some-url.com/#tab-1.
![](https://images.viblo.asia/66ee3ab3-2af2-48e3-a6a6-5814f0f260a5.jpg)