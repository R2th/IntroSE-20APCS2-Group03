Nếu bạn đang tìm kiếm cách để đặt các đoạn text của mình thẳng đứng như tiêu đề của các loại sách báo thì bạn nên cân nhăc sử sụng thuộc tính **CSS writing-mode**.

Chúng ta sẽ đi tìm hiểu **CSS writing-mode** là gì, khi nào nên sử dụng với ví dụ cụ thể.

# 1. CSS Writing-mode là gì

Thuộc tính Writing-mode thay đổi sự căn chỉnh của văn bản để có thể đọc từ trên xuống dưới hoặc từ trái sang phải, tùy thuộc vào ngôn ngữ. Ví dụ,  chúng ta muốn thêm một số văn bản được đọc từ trên xuống dưới và từ phải sang trái, như ví dụ sau:

Ta khai báo sử dụng thuộc tính Writing -mode
```
.vertical-rl { 
writing-mode: vertical-rl; 
}
```

Để xoay đoạn text ta có dưới đây theo chiều dọc

```
<p>This is text that needs to be read from top to bottom, and from right to left:</p>

<p class="vertical-rl">This is text that needs to be read from top to bottom, and from right to left.</p>
```

Và kết quả:

![](https://images.viblo.asia/ab29fad8-4e0e-464c-99ae-b71c784db5d2.png)


Thuộc tính này thực sự hữu ích trong các ngôn ngữ như tiếng Trung, tiếng Nhật hoặc tiếng Hàn các nước mà văn bản thường được đặt theo chiều dọc. Trong ngôn ngữ tiếng Anh hoặc các ngôn ngữ khác có nhiều trường hợp bạn muốn sử dụng thuộc tính này vì lý do thẩm mỹ, chẳng hạn như căn chỉnh một tiêu đề trong một khối văn bản như thế này:

{@embed: https://codepen.io/team/css-tricks/pen/YWBWGA?editors=1100}

# 2. Các giá trị của Writing-mode

Trong các ví dụ dưới đây, chúng ta tạo ra chữ cái đầu tiên của văn bản màu đỏ, để dễ dàng hơn trong việc bạn đọc theo hướng nào.

### horizontal-tb
Đây là giá trị mặc định, văn bản sẽ được đọc từ trái sang phải, trên xuống dưới.

{@embed: https://codepen.io/team/css-tricks/pen/kXAdoN}

### vertical-rl
Văn bản được đọc từ phải sang trái, từ trên xuống dưới.

{@embed: https://codepen.io/team/css-tricks/pen/AXJkRj}

### vertical-lr
Văn bản đọc từ trái sang phải, trên xuống dưới.

{@embed: https://codepen.io/team/css-tricks/pen/BzqZRP}

# 3. Browser support

![](https://images.viblo.asia/53ebaae2-f1bd-49cc-9c1c-31c21ab2c465.png)

Qua bài viết này phần nào các bạn đã hiểu về Text rotation và các trường hợp sử dụng, hy vọng bài viết sẽ có ích với các bạn.

*Tham khảo*

https://ishadeed.com/article/css-writing-mode/
http://generatedcontent.org/post/45384206019/writing-modes