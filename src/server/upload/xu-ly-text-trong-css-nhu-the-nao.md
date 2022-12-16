Chào các bạn!

Đã bao giờ các bạn đau đầu trong việc xử lý text dài ngắn hay không? Chẳng hạn có một số trường hợp như thế này:
- Text nó cứ kéo dài mãi, bị tràn sang cả khu vực khác, muốn nó tự nhảy xuống dòng mà không được?
- Muốn ẩn bớt text khi tới 1 giới hạn nào đó?
- Hoặc là muốn ẩn bớt text nhưng vẫn có thêm dấu ... để người khác biết là vẫn còn text thừa phía sau?
Vân vân và mây mấy số trường hợp...

Thực ra đây cũng là vấn đề của rất nhiều người. Bản thân mình khi chưa có kinh nghiệm về mấy cái này thì thường hay lạm dụng jquery để check các case. Tuy nhiên sau khi phát hiện ra 1 số thuộc tính với cách sử dụng vô cùng đơn giản thì mình đã quăng jquery ra sau đầu ngay và luôn. Bây giờ cùng đi vào bài viết nhé.

## 1. Text Overflow

**Thuộc tính text-overflow** dùng để xử lý một đoạn text bị tràn ra ngoài phần tử chứa nó bằng cách cắt bớt đoạn tràn hoặc hiển thị dưới dạng dấu chấm lửng "..." để làm dấu hiệu cho người dùng.

Hai giá trị thường dùng nhất là:

- **clip**: cắt bớt đoạn text bị tràn ra ngoài (mặc định).
- **ellipsis**: thêm ba dấu chấm (...) nếu text bị tràn ra ngoài.
Hai thuộc tính đi kèm text-overflow là:
```
white-space: nowrap;
overflow: hidden;
```

Ngoài ra còn có 2 giá trị khác: 
- **initial** : thiết lập giá trị mặc định
- **inherit** : kế thừa giá trị từ thẻ HTML cha.

> Cú pháp: text-overflow: clip|ellipsis|string|initial|inherit;

```

.text {
   white-space: nowrap; 
   width: 200px; 
   overflow: hidden;
   border: 1px solid #000000;
}

div.a {
   text-overflow: clip; 
}

div.b {
  text-overflow: ellipsis; 
}
```

Kết quả hiển thị sẽ như thế này:
![](https://images.viblo.asia/9593239c-7c3a-41e8-ba9a-6290c0698577.png)

Vậy để xem lại đoạn text đầy đủ thì làm như thế nào?

```
.text:hover {
    overflow: visible;
}
```

![](https://images.viblo.asia/94be6e36-3172-4a8b-b15c-5c9336d2cdf2.gif)

## 2. Word Wrap

Thuộc tính word-wrap cho phép đoạn text xuống hàng cho dù chữ đó dài cỡ nào đi nữa.

> Cú pháp: word-wrap: normal|break-word|initial|inherit;

Trong đó:
- **normal**: hiển thị theo mặc định, từ dài có thể bị tràn ra ngoài box (mặc định)
- **break-word**: đoạn text nhảy xuống dòng nếu chữ quá dài, tuy nhiên có thể gây hiện tượng đứt gãy từ.
- **initial**: trở về trang thái mặc định
- **inherit** : kế thừa giá trị từ thẻ HTML cha

```
div {
  width: 250px; 
  border: 1px solid #000000;
}

div.a {
  word-wrap: normal;
}

div.b {
  word-wrap: break-word;
}
```

Kết quả hiển thị như thế này

![](https://images.viblo.asia/0dfec9bc-2c2b-47a2-8a38-b9bdcc4ebc9e.png)

## 3. Word Break

**Word-wrap** xác định có xuống dòng hay không, còn thuộc tính **work-break** xác định kiểu xuống dòng.

Các giá trị thường thấy là:

- **normal**: hiển thị theo mặc định, từ dài có thể bị tràn ra ngoài box (mặc định)
- **keep-all**: không sử dụng với các đoạn text tiếng Trung Quốc/Nhật Bản/Hàn Quốc (CJK), chức năng tương tự với normal. Khác biệt ở chỗ nếu từ có gạch nối sẽ được xuống dòng tại một vị trí thích hợp.
- **break-all**: khi hết đoạn thì một từ sẽ tự động ngắt ở bất kỳ ký tự nào để xuống dòng, có thể gây hiện tượng đứt gãy từ.
- **break-word:** khi hết đoạn thì sẽ tự động ngắt ở bất kỳ từ nào để xuống dòng.
Nếu là văn bản bình thường, ta sẽ dùng break-word nhiều hơn, còn break-all thường chỉ dùng cho số (nếu có).

> Cú pháp: word-break: normal|break-all|keep-all|break-word

```
div {
  width: 250px; 
  border: 1px solid #000000;
}

div.a {
 word-break: normal;
}

div.b {
 word-break: keep-all;
}

div.c {
 word-break: break-all;
}

div.d {
 word-break: break-word;
}
```

![](https://images.viblo.asia/f1c561bf-e318-416f-8057-d27a18e4d42d.png)

## 4. Writing Mode

**Thuộc tính writing-mode** sử dụng để định kiểu cho đoạn text được đặt theo chiều ngang hay chiều dọc.

Các giá trị của writing-mode:

- **horizontal-tb**: đoạn text sẽ được đặt theo chiều ngang từ trái sang phải, đọc từ trên xuống dưới (mặc định).
- **vertical-rl**: đoạn text được đặt theo chiều dọc từ phải sang trái, đọc từ trên xuống dưới.
- **vertical-lr**: đoạn text được đặt theo chiều dọc từ trái sang phải, đọc từ trên xuống dưới.

> Cú pháp: writing-mode: horizontal-tb|vertical-rl|vertical-lr

```
p.test1 {
  writing-mode: horizontal-tb; 
  width: 300px;
  border: 4px double red;
  padding: 15px;
}

p.test2 {
  writing-mode: vertical-rl; 
  height: 200px;
  margin-right: 50px;
  border: 4px double navy;
  padding: 15px;
}

p.test3 {
  writing-mode: vertical-lr; 
  height: 200px;
  border: 4px double green;
  padding: 15px;
}
```

Kết quả hiển thị như sau:

![](https://images.viblo.asia/ed643115-0e91-4192-aa66-3747e4d5ca61.png)

Như vậy qua bài viết bài của mình, có lẽ các bạn cũng đã hiểu được sơ sơ cách xử lý text sao cho đẹp, đơn giản và nhanh chóng rồi nhỉ.
Chúc các bạn thành công!