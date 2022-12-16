Trong website đôi lúc chúng ta cần in đậm, in nghiêng hay thay đổi font chữ của một đoạn văn bản nào đó mà không muốn sử dụng thẻ HTML để tác động. Chúng ta hoàn toàn có thể làm được điều đó với các thuộc tính font trong CSS.
bài viết này mình tổng hợp các thuộc tính tác động vào text trong css3.

### **1. Thuộc tính word-break trong CSS3.**

-Thuộc tính này trong CSS3 có tác dụng thay đổi thể thống nhất của một từ. Nghĩa một từ có thể xuống dòng bất kỳ từ chữ nào, nếu dòng trên đã bị lấp đầy.

**Cú pháp:**

`word-break: value;`

Trong đó value là một trong các giá trị sau:
+ break-all - cứ khi nào một dòng được lấp đầy thì sẽ xuống dòng bất kể là đã hết chữ cái hay chưa.
+ hyphenate - sẽ xuống dòng nếu như gặp dấu gạch nối thích hợp.
+ normal - trả về giá trị mặc định cho thành phần.

***Ví dụ về giá trị: `hyphenate`***

HTML:

```
<h1>Chú ý cái đoạn xuống dòng bạn nhá... hyphenate</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit-sedssss do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
```

CSS:
```
h1 {
  color: red;
}
p {
  width: 200px;
  word-break: hyphenate;
}
```

***Kết quả:***

![](https://images.viblo.asia/485c49f5-3578-4837-93d6-99455478f6ec.png)

***Ví dụ về giá trị là `break-all`***

*HTML:*
```
<h1>Chú ý cái đoạn xuống dòng bạn nhá...break-all</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit-sedssss do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
```
*CSS:*
```
h1 {
  color: red;
}
p {
  width: 200px;
  word-break: break-all;
}
```
*Kết quả:*

![](https://images.viblo.asia/872ecbc4-ddbe-4d8c-953f-c1f7f717f56c.png)

### **2. Thuộc tính tab-size trong CSS3.**

-Thuộc tính tab-size trong CSS3 có tác dụng xác định khoảng trống khi chúng ta cấn tab được sử lý như thế nào.


**Cú pháp:**

`tab-size: value;`

Trong đó: value có thể là giá các số đo khoảng cách hoặc initial hoặc inherit.

**Ví dụ:**
*HTML:*
```
<h1>tab-size trong CSS3</h1>
<pre class="tab1">Tab	11</pre>
<pre class="tab2">Tab	21</pre>
<pre class="tab3">Tab	69</pre>
```
*CSS:*
```
.tab1{
  -moz-tab-size: 11;
  -o-tab-size: 11;
  tab-size: 11;
}
.tab2{
  -moz-tab-size: 21;
  -o-tab-size: 21;
  tab-size: 21;
}
.tab3{
  -moz-tab-size: 69;
  -o-tab-size: 69;
  tab-size: 69;
}
```
*Kết quả:*

![](https://images.viblo.asia/df9f54b3-dcb4-49fb-8f14-d72de763bcf4.png)

### **3. Thuộc tính word-wrap trong CSS3.**
-Thuộc tính này có tác dụng làm cho những từ dài xuống mà không làm vỡ giao diện (thuộc tính này rất quan trọng trong responsive design).

**Cú pháp:**

`word-wrap: value;`

Trong đó value có thể là 1 trong 2 giá trị sau:
+ break-word - những từ dài quá sẽ được ngắt xuống dòng sao cho thích hợp.
+ normal - trả về giá trị mặc định cho thành phần.

**Ví dụ:**

*HTML:*
```
<div class="box">
  <h3>Chưa CSS</h3>
  <div>
    Framgia Vietnam WSM portal and applicationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
  </div>
</div>
<div class="box">
  <h3>Đã ăn CSS</h3>
  <div class="wrod-wrap">
    Framgia Vietnam WSM portal and applicationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
  </div>
</div>
```
*CSS:*
```
.box{
  width: 200px;
  margin: 0 auto;
  border: 1px solid orange;
  margin-top: 30px;
}
.wrod-wrap{
  word-wrap: break-word;
}
```

*Kết quả:*

![](https://images.viblo.asia/a8e41103-f543-4350-9274-3d257d741b64.png)


### **4. Thuộc tính text-align-last trong CSS3.**

-Thuộc tính này trong CSS3 có tác dụng xác định xem dòng cuối cùng của thành phần được căn lề như thế nào.

**Cú pháp:**

`text-align-last: value;`

Trong đó: value có thể là một trong các giá trị
+ auto - đây là giá trị mặc định. Xác định dòng cuối cùng của thành phần được căn lề trái
+ left - xác định dòng cuối cùng của thành phần được căn lề trái
+ right - xác định dòng cuối cùng của thành phần được căn lề phải
+ center - xác định dòng cuối cùng của thành phần được căn giữa
+ justify - xác định dòng cuối cùng của thành phần được căn đều trên một dòng
+ start -  xác định dòng cuối cùng của thành phần được căn theo chiều của thành phần
+ end - xác định dòng cuối cùng của thành phần được căn theo chiều ngược lại của thành phần

### **5. Các thuộc tính mới trong text-decoration.**

-Thuộc tính này trong CSS3 đã hỗ trợ thêm cho chúng ta 4 thuộc tính khác tác động vào nó

+ **Thuộc tính text-decoration-color:**

    -Thuộc tính này có tác dụng thiết lập màu sắc cho đường line trong thuộc tính  text-decoration.

    **Cú Pháp:**

    `text-decoration-color: value;`

    Trong đó: value là màu sắc mà bạn muốn thiết lập.

+ **Thuộc tính text-decoration-line:**

    -Thuộc tính này xác định các kiểu đường line cho thuộc tính text-decoration

    **Cú pháp:**

    `text-decoration-line: value;`

    Trong đó, value là một trong các giá trị sau:
        + none - không gạch.
        + underline - gạch dưới.
        + overline - gạch trên.
        + line-through - gạch ngang.
        + initial.
        + inherit.

+ **Thuộc tính text-decoration-style:**

    -Thuộc tính này có tác dụng xác định kiểu đường line của thuộc tính text-decoration.

    **Cú pháp:**

    `text-decoration-style: value;`

    Trong đó, value là một trong các giá trị sau:
     + solid (là giá trị mặc định).
     + double
     + dotted
     + dashed
     + wavy
     + initial

+ **Thuộc tính text-underline-position:**

    -Thuộc tính này có tác dụng xác định vị trí của underline nếu như nó được sử dụng trong thuộc tính text-decoration.

### **6. Thuộc tính text-shadow trong CSS3.**

-Thuộc tính này có tác dụng tạo ra bóng cho text.

**Cú pháp:**

`text-shadow: ngang dọc blur color;`

Trong đó:
+ ngang - xác định vị trí của bóng theo chiều ngang, có thể âm (tham số bắt buộc).
+ dọc  - xác định vị trí của bóng theo chiều dọc, có thể âm (tham số bắt buộc).
+ blur - là độ nhòe của bóng (tham số không bắt buộc).
+ color - là màu sắc của bóng.

*Ví dụ:*

HTML:
```
<h1>Framgia Vietnam</h1>
<h1>Framgia Vietnam</h1>
<h1>Framgia Vietnam</h1>
```

*CSS:*
```
h1{
  text-shadow: 9px 6px 9px red;
}
```

*Kết quả:*

![](https://images.viblo.asia/27f9d286-c176-4faf-bbd8-b92db41b5a69.png)

Trên đây là các thuộc tính liên quan và tác động đến text trong css3. hy vọng nó phần nào hữu ích với bạn !
Cảm ơn bạn đã theo dõi bài viết !!