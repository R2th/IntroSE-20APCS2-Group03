# Đôi nhời phát biểu
Trong quá trình phát triển các sản phẩm phần mềm, mình thấy việc chú ý đến **code conventions**(các nguyên tắc chung khi lập trình làm cho code dễ hiểu, dễ đọc và dễ bảo trì) khá là quan trọng. 

Thế nhưng mình thấy kha khá nhiều người không để ý đến việc code **CSS** sao cho đẹp, ngắn gọn và dễ đọc thì phải. Nếu ứng dụng của bạn nhỏ thì không nói nhưng nếu đối với các ứng dụng lớn hãy xem số code **CSS** được các lập trình viên viết ra, có thể tới chục nghìn dòng, rất cồng kềnh, trùng lặp code sẽ xảy ra => ảnh hưởng tới tốc độ `render` trang của chúng ta.

Dẫu vẫn biết là code **CSS** tương đối dễ viết thế nhưng để viết sao cho đẹp, chuyên nghiệp lại là một chuyện khác. Vì vậy mình quyết tâm tìm hiểu để chia sẻ với mọi người những gì mình đã tìm hiểu được.

![](https://images.viblo.asia/4d9b6632-f173-4152-984a-94feb08404b8.jpg)
# CSS coding standard
## 1. Format
Điều đầu tiên mình muốn giới thiệu là **CSS coding standard**. Mình sẽ liệt kê vài ví dụ sau.
* Lùi vào 2 space (khoảng trống) cho mỗi thuộc tính
* Sử dụng ngoặc kép thay vì sử dụng ngoặc đơn (**`font-family: "Arial Black", input[type="checkbox"]`**)
* Đặt một dấu cách ở đằng sau dấu **`:`**
* Đặt một dấu cách ở trước dấu **`{`**
* Kết thúc định nghĩa các thuộc tính bằng một dấu chấm phẩy (mặc dù việc thêm dấu chấm phẩy là không bắt buộc nhé)
* Sử dụng các cú pháp ngắn gọn nếu có thể ví dụ như (padding, margin...)
* Chỉ khai báo mỗi dòng một thuộc tính (dễ nhìn, nếu lỗi có thể biết lỗi được ở dòng nào thuộc tính nào)
* Code thêm những thuộc tính khác mà trình duyệt này hỗ trợ mà trình duyệt khác không hỗ trợ
* Giữa các khối CSS nên có một khoảng trắng
* Khuyến khích sử dụng mã màu (**#fff**)

```css
p {
  display: block;
  color: #fff;
  background-color: #000;
}
```
## 2. Cách đặt tên
Trước tiên thì hãy đặt tên cho **ID** và **class** có nghĩa, hãy đặt một cái tên mà thể hiện rõ được mục đích của phần tử được đề cập tới.

```css
/* Không nên, đặt tên không có nghĩa */
#phu-1998 {
  color: #e1e1e1;
  font-size: 16px
}

/* Nên, có ý nghĩa với đối tượng cụ thể */
#gallery {}
#login {}
.video {}
```

Cố gắng truyền được nội dung của **ID** và **class** ngắn nhất nếu có thể, thế nhưng đừng vì thế mà viết tắt quá nhiều nhé, sẽ rất khó để chúng ta biết được ý nghĩa của tên chúng ta đặt nó sẽ làm chức năng gì.

```css
/* Không nên */
#navigation {} /* có thể viết ngắn gọn được */
.atr {} /* cái này tượng trưng cho gì vậy??? */

/* Thay vào đó */
#nav {}
.author {}
```
Đặt tên của **ID** và **class** ở dạng `lowercase` và sử dụng dấu **`-`**

```css
/* nên */
.dataset-list {}

/* không nên */
.datasetlist {}
.datasetList {}
.dataset_list {}
```
> Ngoài những cái nêu trên thì mình khuyên các bạn nên đặt tên theo kĩ thuật **BEM**, có thể hiểu đơn giản thì nó là quy ước đặt tên cho class trong HTML và CSS. Để tìm hiểu cái này bạn hãy đọc bài tiếp theo của bài này nhé :D

## 3. Comments
Có thể nhiều bạn sẽ thường bỏ qua cái phần **comment** này, nhưng đối với cá nhân mình thì đây là một phần khá quan trọng. Để khi chúng ta hay người khác đọc lại code có thể biết được rằng phần này định dạng css cho cái gì để dễ dàng sửa đổi, hạn chế được việc đoán 'mò' chức năng đoạn code có thể gây tới sửa sai.
### File comment
Trong ứng dụng, chúng ta có thể sẽ chia nhỏ các file css ra để dễ dàng làm việc hơn. 

Nếu vậy thi hãy thêm chút `comment` để biết được file này làm công việc gì
```css
/**
 * @file
 * Mô tả qua qua về file làm công việc gì
 */
```
### Multi-line comments
Đối với những mô tả dài dòng, hãy để ý rằng mỗi dòng comment nên chỉ có tối đa 80 ký tự. Nếu dài hơn hãy xuống dòng giống như thế này 
```css
/**
 * The first sentence of the long description starts here and continues on this
 * line for a while finally concluding here at the end of this paragraph.
 **/
```
### Single-line comments
Dù là `multi-line` hay `single-line` thì hãy đảm bảo được số ký tự trên mỗi dòng tối đa là 80.
```css
.example {
  /* Đặt margin của body bằng 0 */
  margin: 0;
}

/* Đọan này để CSS cho .example */
.example--item {
  display: inline;
}
```
## 4. Selector
### Các loại selectors
Selectors chia ra làm hai loại chung chung đó là **selectors cụ thể** và **selectors không cụ thể**.
#### Selectors cụ thể
* **Type selectors(h1, h2...) và pseudo-elements (::after, ::before)**
* **Class selector (.example ...), attribute selectors ([type="radio"] ...)**
* **ID selectors (#content)**

#### Selectors không cụ thể
Sẽ bao gồm selectors **`(*)`** , các selectors bao gồm các toán tử như **`(+, >, ~, ' ', ||)`**, và negation pseudo-class **`(:not())`**.

Đối với các `selector cụ thể` chúng ta không cần thiết khai báo quá rõ 'chân tơ kẽ tóc' của selectors đó, vì đôi khi ít nhiều sẽ ảnh hưởng đến performance của trang web.

```css
/* Không cần thiết */
ul#example {}
div.error {}

/* Ổn */
#example {}
.error {}
```

### Thứ tự sắp sếp các selectors
Mình có tìm được một bức ảnh khá nổi tiếng về độ ưu tiên của các selectors. Chúng ta có thể áp dụng cái độ ưu tiên này để viết CSS theo một trật tự. Mình có xem qua 1 vài source code cũng thấy họ tổ chức code theo các này.

Các bạn xem quả bức ảnh bên dưới để hiểu được cách tổ chức 1 file CSS. Mình thấy bức ảnh giải thích khá chi tiết rồi nên sẽ không nói thêm gì nữa.
![](https://images.viblo.asia/dbf7c462-4aad-4e5c-b79c-8122504c4765.png)
## 5. Properties
Việc tổ chức các thuộc tính bên trong một `block`(khối) cũng có quy định của nó cả. 

Thường thường mình thấy mọi người hay không chú tâm phần này lắm chẳng hạn như trật tự sắp xếp. Nếu dự án của các bạn cài thêm tool để check file CSS sẽ thấy nó có yêu cầu sắp xếp các thuộc tính theo thứ tự.

Như đã nói ở trên việc viết thuộc tính cần tuân thủ theo vài thứ sau
* Kết thúc bằng dấu chấm phẩy, theo sau dấu **`:`** là một khoảng cách
* Tất cả các thuộc tính phải viết dưới dạng lowercase, trừ `font names`
* Hãy sử dụng hex code color hoặc là `rbga()`
* Sử dụng cú pháp ngắn gọn nếu có thể

### Thứ tự sắp xếp 
Để sắp xếp thì chúng ta cứ sắp xếp theo từ quan trọng cho đến ít quan trọng :D.
* **SASS INHERITANCE**: @extend, @mixin..
* **CONTENT**: Áp dụng với các pseudo-elements sẽ có thuộc tính là content (::before, ::after)
* **POSITION AND LAYOUT**: position, z-index, top, bottom, left, right, các thuộc tính của Flexbox, float, clear
* **DISPLAY AND VISIBILITY**: display, opacity, transform
* **CLIPPING**: animation, transition
* **BOX MODEL**: margin, border, box-shadow, width, height ...
* **BACKGROUND**: background, cursor
* **TYPOGRAPHY và COLOR**: font-size, line-height...
* **PSEUDO-CLASSES & PSEUDO-ELEMENTS**: Cái này chỉ áp dụng khi bạn viết CSS theo kiểu nested. (:hover, :before, :after...)

```css
#content {
    position: absolute;
    z-index: 1;
    padding: 10px;
    background: #fff;
    color: #777;
}
```

Nếu bạn thấy cách sắp xếp trên khó nhớ quá, hãy sử dụng một cách khác là **sắp xếp theo thứ tự chữ cái** :D.
```css
background: fuchsia;
 border: 1px solid;
 -moz-border-radius: 4px;
 -webkit-border-radius: 4px;
 border-radius: 4px;
 color: black;
 text-align: center;
 text-indent: 2em;
```
### Declaration Separation
Đối với các selectors có chung các thuộc tính, hãy viết xuống dòng từng selectors
```css
/* Hợp lý */
 h1,
 h2,
 h3 {
   font-weight: normal;
   line-height: 1.2;
 }
 
 /* Chưa hợp lý */
 h1, h2, h3 {
   font-weight: normal;
   line-height: 1.2;
 }
```
## 6. Values
Nói đến **properties** rồi thì chắc chắn cũng **values** cũng sẽ có thể cần phải để ý
* Đằng sau `value` phải là dấu chấm phẩy, phía trước phải là 1 space
* Sử dụng dấu ngoặc kép thay vì ngoặc đơn, ví dụ đối với font name có nhiều hơn một từ thì cần phải có dấu ngoặc kép
* Đối với font-weight nên sử dụng số thay vì sử dụng các thuộc tính sẵn như `normal`, `bold`.

```css
/* Viết chuẩn */
.class {
    background-image: url(images/bg.png);
    font-family: "Helvetica Neue", sans-serif;
    font-weight: 700;
}

/* Không chuẩn */
.class {
    font-family: Times New Roman, serif; /* Cần dấu ngoặc kép */
    font-weight: bold; /* Tránh sử dụng name font weight */
    line-height: 1.4em;
}
```
### 0 and Units
Chúng ta k cần phải ghi đơn vị đằng sau value có giá trị là **0**, trừ khi bắt buộc
```css
flex: 0px; /* Cái này thì bắt buộc */
margin: 0;
padding: 0;
```
### Leading 0s
Đối với những giá trị nằm trong khoảng **-1** đến **1**, không cần thiết viết số **0** đằng trước.
```css
font-size: .6em;
```
### Hexadecimal Notation
Đối với kiểu `hex code color`, chúng ta có thể viết ngắn gọn lại mã màu từ 6 ký tự thành 3 ký tự với một số mã màu.
```css
color: #eebbcc;
```
thì viết thành
```css
color: #ebc;
```
That's OK.

# Kết luận
Trên đây là một vài cách mà mình nghĩ sẽ giúp ảnh các bạn tổ chức file CSS một cách tốt hơn. Nếu bài viết có gì sai xót mong mọi người comment góp ý. 

Nếu thấy hữu ích, tặng mình 1 upvote nhé.

Các bạn có thể xem tiếp phần 2 của bài tại 
[[Front-end Developer] Một vài mẹo để viết code CSS chuyên nghiệp hơn](https://viblo.asia/p/front-end-developer-mot-vai-meo-de-viet-code-css-chuyen-nghiep-hon-yMnKM2djZ7P)