Pseudo classes được sử dụng để nhắm mục tiêu các phần tử mà không phải thêm các lớp, thuộc tính hoặc ID bổ sung; đó là lý do tại sao nó được gọi theo cách đó, *pseudo-class* .
Và trong bài viết này, chúng ta sẽ đi qua cácpseudo-class CSS3. Hãy xem nào.

### :nth-child
:nth-child được sử dụng để nhắm mục tiêu các yếu tố theo thứ tự cụ thể của cha mẹ chúng. Peudo-class này ử dụng kết hợp với các thông số sau: a số (1, 2, 3, vv), một từ khóa ( lẻ / thậm chí ) hoặc một phương trình ( an, an+b, an-b, vv). Trong ví dụ sau, chúng ta có ba đoạn bên trong một thẻ div
```html
<div>
  <p><strong>Paragraph 1:</strong>Tiramisu gummi bears faworki dragee. Faworki faworki dessert sweet. Souffle powder biscuit lemon drops topping wypas.</p>
  <p><strong>Paragraph 2:</strong>Sweet icing applicake. Apple pie applicake bonbon cake danish cookie jujubes. Topping croissant tiramisu pie jelly-o pudding.</p>
  <p><strong>Paragraph 3:</strong> Oat cake pastry chocolate dessert brownie wafer candy. Caramels chocolate cake marzipan. Biscuit candy pudding dessert brownie dragee halvah donut gummi bears.</p>
<div>
```

Giả sử, chúng ta muốn thêm kiểu vào đoạn thứ hai , chúng ta có thể viết các quy tắc kiểu như sau.
```css
p:nth-child(2) {
  padding: 15px;
  background-color: #333;
  color: #fff;
}
```
Chúng ta cũng có thể sử dụng một phương trình để chọn. Giả sử, cho đoạn số 2, 4, 6 và các số sau trong chuỗi đó. Chúng ta có thể viết các quy tắc theo cách này. Như thế này có nghĩa là các thẻ p có số thứ tự là chẵn trong div này sẽ có những thuộc tính css dưới.
```css
li:nth-child(2n) {
  padding: 5px;
  background-color: #333;
  color: #fff;s
  margin: 10px 0; 
}
```
Số n ký hiệu trong phương trình trên đại diện cho số thứ tự (0, 1, 2, 3, vv). Trong ví dụ trên, 2 sẽ được nhân với n, kết quả là:

*  (0) = 0 (không chọn gì)
*  (1) = 2 (chọn phần tử con thứ 2)
*  (2) = 4 (chọn phần tử con thứ 4)
*  (3) = 6 (chọn phần tử con thứ 6)

Để xem nó hoạt động như thế nào trong một phương trình khác, bạn có thể sử dụng công cụ này, được gọi là trình kiểm tra thứ n .

Tuy nhiên, để *pseudo-class* này chọn chính xác các phần tử con, thứ tự các phần tử không được đi trước với các loại phần tử khác. Lấy ví dụ đánh dấu HTML sau đây:

```html
<div>
  <p><strong>Paragraph 1:</strong>Tiramisu gummi bears faworki dragee. Faworki faworki dessert sweet. Souffle powder biscuit lemon drops topping wypas.</p>
 
  <blockquote>
    <p><strong>Blockquote</strong> Oat cake sugar plum tiramisu jelly cupcake dragee powder. Caramels pastry pie danish fruitcake bonbon chocolate cake bear claw.</p>
  </blockquote>
   
  <p><strong>Paragraph 2:</strong>Sweet icing applicake. Apple pie applicake bonbon cake danish cookie jujubes. Topping croissant tiramisu pie jelly-o pudding.</p>
  <p><strong>Paragraph 3:</strong> Oat cake pastry chocolate dessert brownie wafer candy. Caramels chocolate cake marzipan. Biscuit candy pudding dessert brownie dragee halvah donut gummi bears.</p>
</div>
```
Bây giờ, nếu chúng ta chọn đoạn thứ hai với quy tắc kiểu sau.

```css
p:nth-child(2) {
  padding: 15px;
  background-color: #333;
  color: #fff;
}
```
Không có gì sẽ không được áp dụng, vì phần tử con thứ hai hiện được thay thế bằng  <blockquote>.

### : nth-last-child
Lớp :nth-last-child hoạt động giống như :nth-child, chỉ bây giờ, chuỗi bắt đầu từ phần tử cuối cùng

Vì vậy, khi i áp dụng phong cách này dưới đây:

```css
p:nth-last-child(1) {
  padding: 15px;
  background-color: #333;
  color: #fff;
}
 ```
Phần tử được áp dụng là phần tử đoạn cuối cùng của phần tử cha/mẹ của nó.
    
### : nth-last-of-type
**:nth-last-of-type** hoạt động theo cách tương tự như **:first-of-type**

Nó chọn phần tử con được chỉ định bất kể ngay cả khi chuỗi bị gián đoạn bởi các loại phần tử khác. Và tương tự như **:nth-last-child** chuỗi sẽ bắt đầu từ phần tử cuối cùng. Trong ví dụ dưới đây, chúng ta có thẻ p, blockquote và danh sách theo thứ tự được gói trong a  <div>.

```html
<div>
  <p><strong>Paragraph 1:</strong>Tiramisu gummi bears faworki dragee. Faworki faworki dessert sweet. Souffle powder biscuit lemon drops topping wypas.</p>
 
  <blockquote>
    <p><strong>Blockquote</strong> Oat cake sugar plum tiramisu jelly cupcake dragee powder. Caramels pastry pie danish fruitcake bonbon chocolate cake bear claw.</p>
  </blockquote>
 
  <p><strong>Paragraph 2:</strong>Sweet icing applicake. Apple pie applicake bonbon cake danish cookie jujubes. Topping croissant tiramisu pie jelly-o pudding.</p>
 
  <p><strong>Paragraph 3:</strong> Oat cake pastry chocolate dessert brownie wafer candy. Caramels chocolate cake marzipan. Biscuit candy pudding dessert brownie dragee halvah donut gummi bears.</p>
 
  <ul>
    <li><strong>List 1:</strong> Cotton candy apple pie topping.</li>
    <li><strong>List 2:</strong> Biscuit gummi bears sweet</li>
    <li><strong>List 3:</strong> Jujubes fruitcake bear claw chocolate bar.</li>
    <li><strong>List 4:</strong> Tart carrot cake cookie marzipan pastry toffee.</li>
    <li><strong>List 5:</strong> Wafer tiramisu marzipan tart.</li>
    <li><strong>List 6:</strong> Halvah chocolate bar.</li>
    <li><strong>List 7:</strong> Toffee sugar plum.</li>
    <li><strong>List 8:</strong> Caramels pastry pie.</li>
  </ul>
</div>
```
Để chọn đoạn thứ hai cuối cùng từ cấu trúc HTML ở trên, chúng ta có thể viết các quy tắc theo cách này.

```css
p:nth-last-of-type(2) {
  padding: 15px;
  background-color: #333;
  color: #fff;
}
```
Không giống **:nth-child** hoặc **:nth-last-child** chọn phần tử đúng theo trình tự của chúng,lớp **-of-type**  sẽ tìm thấy phần tử theo kiểu đã chỉ định của chúng cho dù ở giữa các phần tử có thẻ tag khác chèn vào.

### :only-child
 **:only-child** được sử dụng để chọn phần tử được chỉ định là con duy nhất của cha mẹ của nó. Hãy tưởng tượng, một phụ huynh chỉ có một đứa con trong gia đình. Tương tự, trong ví dụ sau, chúng ta chỉ có một đoạn trong một thẻ  <div>.
```html
<div>
  <p>Tiramisu gummi bears faworki dragee. Faworki faworki dessert sweet. Souffle powder biscuit lemon drops topping wypas.</p>
</div>
```
Để nhắm mục tiêu và thêm css cho đoạn này, chúng ta có thể viết:
```css
p:only-child {
  padding: 15px;
  background-color: #333;
  color: #fff;
}
```
Tuy nhiên, khi chúng ta có nhiều phần tử con thuộc bất kỳ loại nào bên trong, điều này làm cho **pseudo-class** này  không hoạt động, vì phần tử được chỉ định không còn là phần tử con duy nhất dưới cha mẹ của nó.

### : :only-of-type
**:only-of-type** lớp giả hoạt động tương tự như** :only-child**. Nhưng ngoài chuỗi, nó cũng sẽ tìm thấy phần tử từ loại của chúng.  Hãy tưởng tượng một phụ huynh có 3 đứa con gồm hai gái và một trai. Chúng ta có thể nhắm vào cậu bé với class này , vì cậu là cậu bé duy nhất trong gia đình.

Trong ví dụ sau, chúng ta có hai đoạn p và một blockquote.
```html
<p><strong>Paragraph 1:</strong>Sweet icing applicake. Apple pie applicake bonbon cake danish cookie jujubes. Topping croissant tiramisu pie jelly-o pudding.</p>
 
<blockquote><strong>Blockquote:</strong> Oat cake pastry chocolate dessert brownie wafer candy.</p></blockquote>
 
<p><strong>Paragraph 2:</strong>Sweet icing applicake. Apple pie applicake bonbon cake danish cookie jujubes. Topping croissant tiramisu pie jelly-o pudding.</p>
```
Để chọn <blockquote>phần tử trong số các đoạn này, chúng ta có thể viết nó theo cách này:
```css
blockquote:only-of-type {
  padding: 15px;
  background-color: #333;
  color: #fff;
}
```
 Cùng xem 2 ảnh dưới đây để hiểu hơn về class này:
  ![](https://images.viblo.asia/b5dc8b65-18e1-403a-83aa-2b66404e7606.png)
Ví dụ này sẽ rõ ràng hơn
    ![](https://images.viblo.asia/c7515a88-5adb-4727-afe2-7779c2d00c62.png)

### :empty
**:empty** chỉ định là trống rỗng. Nói cách khác, phần tử này không có nội dung hoặc phần tử con, nó không có gì, thậm chí không có khoảng trắng. Trong ví dụ sau, chúng ta có một đoạn trống trong một thẻ div <div>.
```html
<div>
  <p></p>
</div>
```
Để nhắm mục tiêu phần tử đoạn theo điều kiện này, chúng ta có thể viết:

```css
p:empty {
  padding: 15px;
  background-color: #333;
  color: #fff;  
}
```
Cái này khá là hay phải không nào?

  ### Kết luận
Mình đã đề cập đến một số  pseudo-class trong bài viết này. Mình hy vọng rằng đây sẽ là một tài liệu tham khảo tốt để bạn làm việc với css và nâng cao trình độ của bản thân. Còn rẩt nhiều pseudo-class nữa. Mình sẽ viết trong bài sau. Các bạn nhớ đón đọc nhé.
Happy hacking!