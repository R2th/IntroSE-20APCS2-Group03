Chào mọi người, chắc hẳn những bạn đang đọc bài viết này, ai cũng từng có lúc phải ngồi code 'chay' html hoặc css để tạo ra 1 trang web.<br>

Có những lúc bạn phải tạo ra vài chục cái thumbnail chứa chi tiết sản phẩm và bạn phải copy thumbnail đó vài chục lần.<br>

Hay đôi khi bạn cảm thấy đến 'nhũn não' vì phải tìm ra thẻ div nào đó mà mình quên thẻ đóng.<br>

Và bạn muốn html cũng có thể được ưu ái như css, có riêng các preprocessor để code 1 cách hiệu quả và đỡ nhàm chán hơn.<br>

Vậy thì còn ngần ngại gì mà không liếc sơ qua bài này và tìm hiểu về Pug - 1 template engine (công cụ giúp tách mã HTML thành các phần nhỏ hơn vả có thể sử dụng lại trên nhiều tập tin HTML).<br>

### **1. Cài Đặt**<br>
cú pháp rất đơn giản thôi:<br>
```$ npm install pug -g```

### **2 Từ .pug thành .html**<br>
vì bạn đã cài đặt pug nên dĩ nhiên giờ bạn sẽ viết vào file ``.pug`` <br>
và thử ``copy`` đoạn code sau vào thử nào<br>
```html
doctype html
html
  head
  body
    p hello Pug, you're a joke to me
```
Và làm sao để nó dịch ra html nhỉ? <br>
Mở terminal, điều hướng đến thư mục chứa file bạn muốn dịch ra ``html``, gõ với cú pháp như sau: <br>
Cách 1:<br>
```$ pug <tên file của bạn>.pug```

ex: <br>
```pug index.js```

Cách 2: <br>
```$ pug -w <đường dẫn tới file của bạn> -o <đường dẫn tới folder bạn muốn đặt file html>.pug```<br>

ex: <br>
```pug -w ./ -o ./html```

và sau khi dịch ra, bạn sẽ nhận được đoạn code html như sau:<br>
```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <p>hello Pug, you're a joke to me</p>
  </body>
</html>
```

### **3. Sử dụng** <br>
Không như html thay vì dùng thẻ đóng hoặc mở, pug sử dụng thụt đầu dòng để phân biệt tag nào lồng ở trong tag nào<br>
Điều đó làm cho code đỡ dài dòng hơn và rõ ràng hơn
ex: <br>
```html
div
    p Đây là thẻ <p> không có thẻ <b> ở trong
    p Đây là thẻ <p> 
        b có thẻ <b> ở trong
```
dịch ra html sẽ là:<br>
```html
<div>
    <p>Đây là thẻ <p> không có thẻ <b> ở trong</p>
    <p>Đây là thẻ <p><b> có thẻ <b> ở trong</b></p>
</div>
```
và khi bạn muốn viết nhiều dòng cho 1 thẻ p
```html
p.
    đây là thẻ p 
    có nhiều dòng
```
dịch ra là:
```html
<p>
    đây là thẻ p 
    có nhiều dòng
</p>
```

Thêm id và class như thế nào trong pug???<br>
Cũng khá là đơn giản, ví dụ thẻ p có class là blue và strong thì sẽ viết là ``p.blue.strong``<br>
hoặc ``p(class='blue strong')`` hoặc ``p.blue(class='strong')``. Và nếu là id thì sẽ là ``p#blue#strong``<br>

Thay đổi attribute của tag thì thế nào???<br>
Mình sẽ lấy 1 ví dụ về tag input<br>
```
input(type='checkbox' name='agreement' checked)
```
dịch ra html sẽ là <br>
```
<input type="checkbox" name="agreement" checked="checked" />
```


### **4. Áp dụng logic vào pug**<br>

Nếu  bạn muốn apply code của javascript vào trong pug thì trước tiên bạn phải có dấu - ở trước<br>
ex1 :
```
const user = {name: 'pug', id: '123456'}
```

ex2 :

```
 const user1 = {name: 'alaska', id: '123456'}
  const user2 = {name: 'husky', id: '123456'}
```

sử dụng **IF...ELSE**:<br>
```
.container
  if user !== {}
    h2.green= user.name
  else 
    h2.red Không có userdata
    p.description.
      cần user có thông tin
      Xin hãy đăng nhập
   ```
html:
```html
<div class="container">
  <h2 class="green">pug</h2>
</div>
```
sử dụng **SWITCH...CASE**<br>
```
case user.name
  when 'pug'
    p chó ngoan
  when 'alaska'
    p con ngáo
  default
    p chó hư
 ```
html:

```
<p>chó ngoan</p>
```

Sử dụng **FOR loop**<br>
```
const arr = [1,2,3,4,5]
  each val, i in arr
    p= val + ': index = ' + i
 ```
 html:<br>
 ```
 <p>1: index = 0</p>
 <p>2: index = 1</p> 
 <p>3: index = 2</p> 
 <p>4: index = 3</p> 
 <p>5: index = 4</p> 
 ```
### **5. mixins**

 Mixins:  là tính năng tiện ích nhất của Pug, giúp tạo ra các khối có thể sử dụng lại  (reusable block code).
 ex:
 ```
 //- Khai báo
mixin list(arr)
  ul
     each val in arr  
         li= val
//- Use
// order = ['first', 'second', 'third']
+list(order)
 ```
 html:<br>
 ```
 <ul>
      <li>first</li>
      <li>second</li>
      <li>third</li>
</ul>
```

### **6. Inheritance: extends and block**
Tính năng thừa kế template của pug được sử dụng với thông qua 2 từ khóa là extends và block<br>
Được sử dụng cụ thể như sau<br>
```
//- Bạn có 1 layout mẫu và muốn sử dụng nhiều chỗ
//- defaultLayout.pug
html
  head
    title My Site - #{title}
    block scripts
      script(src='/jquery.js')
  body
    block content
    block foot
      #footer
        p some footer content
  ```
  Để sử dụng lại `defaultLayout.pug` trong 1 layout khác, ví dụ như index.pug, ta dùng extends<br>
  ```
  //index.pug
  extends defaultLayout.pug

  //- thay block scripts của defaultLayout.pug bằng 1 block script khác
  block scripts
       script(src='/jquery.js')
      script(src='/pets.js')
  //- nếu ta không viết lại cho block scripts thì index.js sẽ dùng của defaultLayout.js như mặc định
  ```

  Mình vừa giới thiệu đến cho mọi người 1 số thành phần cơ bản của PUG- template engine. Bài viết cũng đã khá dài nên mình tạm thời dừng tại đây, nếu trong bài viết mình có thiếu sót gì mong các bạn góp ý để mình hoàn thiện hơn trong những bài viết tới <br>

Bài viêt có tham khảo https://pugjs.org/api/getting-started.html