Chào các bạn!

Đã bao giờ các bạn phải tạo 1 box mà có nhiều border chưa? Thực ra vấn đề này không khó. Bạn có thể dùng phương pháp truyền thống đó là tạo nhiều element con bên trong rồi thêm border cho các element đó. Như vậy có nghĩa là 1 box có bao nhiều border thì cần tạo bấy nhiều element con. Phương pháp này không sai tuy nhiên nó hơi lạm dụng việc tạo element con. Tốn dung lượng, tốn bộ nhớ và có khi làm ảnh hưởng tới performance. 

Có 1 cách cực kỳ đơn giản mà bạn chỉ cần 1 sử dụng duy nhất 1 element nhưng vẫn có thể tạo ra nhiều border cho element đó. Tạo như thế nào thì hiện tại cùng mình đi vào chi tiết nhé.

## 1. Sử dụng pseudo element(s)

*Ở đây không biết có bạn nào còn chưa hiểu về khái niệm pseudo element hoặc pseudo class không? Nếu chưa hiểu thì hãy comment bên dưới để bài sau mình viết bài về 2 khái niệm này nhé. Trước tiên, tạm bỏ qua khái niệm và cùng đi vào cách sử dụng nó coi sao.*

Các bạn có thể sử dụng pseudo element **:before** hoặc **:after** của element đó, tạo border cho 2 pseudo element này sao cho chúng lớn hơn để bao ngoài hoặc nhỏ hơn để nằm bên trong element. Tất nhiên phải bảo đảm được nội dung phải luôn được ưu tiên hiển thị ở trên cùng.

Ở đây mình lấy ví dụ đơn giản như thế này.

```
.module {
  width: 200px;
  height: 200px;
  background: #f06d06;
  position: relative;
  border: 5px solid blue;  
  margin: 20px;
}
```

Element này tạm thời đang có bordder màu **blue** và được gán **position: relative**.  Bây giờ mình sẽ sử dụng pseudo element **:after** để tạo thêm 1 border bao ngoài element **.module** này.

```
.module:after {
  content: '';
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: red;
  z-index: -1;
}
```

Ở đây mình đã set  **position: absolute** cho pseudo element **:after**. Điều kiện đầu tiên để hiển thị được :after này bắt buộc phải có thuộc tính **content: ''**. Cùng với đó, bạn có thể set các thuộc tính về vị trí top/left/bottom/right cho nó. Như vậy là đã tạo được border cho phần :after. Tuy nhiên, làm sao để cho phần :after này luôn nằm dưới phần content của element thì phải sử dụng thuộc tính z-index bằng cách cho z-index giá trị âm.

Kết quả hiển thị như sau:

{@embed: https://codepen.io/chriscoyier/pen/gbgRqZ}

Như vậy là element của bạn đang có 2 border: blue bên trong và red bên ngoài. Tất nhiên, bạn cũng có thể làm tương tự với pseudo element **:before**

Lưu ý 1 điều: ở trên Firefox 3 (3.6 trở về trước) vẫn hỗ trợ :after và :before. Tuy nhiên lại không cho phép áp dụng thuộc tính position: absolute lên chúng. Vậy nên khi áp dụng cách này bạn cần cân nhắc kỹ.

## 2. Sử dụng Outline

Chắc các bạn cũng không lạ gì với thuộc tính **outline** này nữa rồi nhỉ. Thuộc tính này nó hơi khác 1 chút so với thuộc tính **border**.
Nếu như **border** có thể dùng theo từng cạnh hoặc 2 cạnh hoặc 3 cạnh hoặc toàn bộ thì outline chỉ có thể sử dụng 1 cách duy nhất đó là toàn bộ 4 mặt của 1 element. Vì vậy, cách này chỉ sử dụng được khi element của các bạn cần hiển thị ở cả 4 phía nhé.

```
.borders{
  border: 5px solid blue; 
  outline: 5px solid red;
  width: 200px;
  height: 200px;
  background: pink;
  position: relative;
}
```

Hãy copy đoạn css trên để hiện thị demo nhé. Tất nhiên, nhớ tạo 1 element có class **.borders**  đó.

## 3. Sử dụng box-shadow

Đây cũng là 1 cách khá thông dụng. Sử dụng box-shadow bằng cách như sau:  tạo shadow off và có blur là 0. Ngoài ra, hãy phân tách các giá trị bằng dấu phẩy ",", bạn sẽ có nhiều borders như mong muốn.

```
.module {
  width: 200px;
  height: 200px;
  background: #f06d06;
  position: relative;
  margin: 20px;
  box-shadow: 
    0 0 0 10px hsl(0, 0%, 50%),
    0 0 0 15px hsl(0, 0%, 60%),
    0 0 0 20px hsl(0, 0%, 70%),
    0 0 0 25px hsl(0, 0%, 80%),
    0 0 0 30px hsl(0, 0%, 90%);
}
```

{@embed: https://codepen.io/chriscoyier/pen/xbgreX}

## 4. Sử dụng clipped background

Bằng cách sử dụng padding cho element, sau đó sử dụng thuộc tính **background-clip: content-box;** là border bình thường của element trông giống như có 2 borders vậy.

```
input {
  border: solid 1px #f06d06;
  padding: 5px;
  height: 1.5em; // because IE
  border-radius: 4px; // support: IE9+ ;)
  background-clip: content-box; // support: IE9+
  background-color: white;
  line-height: 1.5;
  font-size: 20px;
  text-indent: 0.5rem;
}
```

{@embed: https://codepen.io/chriscoyier/pen/zxNzQw}

Demo sử dụng input nhưng bạn hoàn toàn có thể sử dụng cho div như bình thường nhé.

## 5. Sử dụng giá trị double của border

Khi sử dụng border-style, ngoài các giá trị như solid, dotted, dash thì còn 1 giá trị có thể khiến border double lên. Đó chính là **border-style: double**

```
.module {
  width: 200px;
  height: 200px;
  background: #f06d06;
  position: relative;
  margin: 20px;
  border: 4px double blue;
}
```

Để hiển thị được 2 border khi sử dụng **border-style: double** thì cái **border-width** phải có giá trị min = 4. Như vậy mới hiển thị rõ ràng được. Không tin các bạn có thể copy đoạn code css trên và thay đổi các giá trị xem sao nhé.

Như vậy, bài này mình đã giới thiệu cho các bạn một số cách tạo multiple borders cho 1 element. Hi vọng bài viết này giúp ích cho các bạn được ít nhiều. 

Link tham khảo
https://css-tricks.com/snippets/css/multiple-borders/