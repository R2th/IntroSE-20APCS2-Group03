Chào các bạn, tui rất chào các bạn, hỡi những con người thường xuyên lôi tui ra để fix bug, fix từ cái bug chút éc đến cái bug siêu to siêu khổng lồ. Có phải tui chiều các bạn quá, nên các bạn hư đúng không? Cơ mà tui thích cực ý =)). Tui biết, đối với các bạn, tui rất “toẹt zời” =)). Nhưng không chỉ mình tui đâu nha, mà các thành viên (method) khác trong dòng họ console của tui cũng rất rất là “toẹt zời” đấy, đỉnh của chóp đấy, thử đi. Dưới đây, tui sẽ trình làng cho các bạn biết và hiểu rõ hơn về các thành viên trong dòng họ tui. Cuộn màn hình xuống dưới một tí nào.
## TẠI SAO DÒNG HỌ CONSOLE CỦA TUI LẠI TRỞ NÊN PHỔ BIẾN? (CONSOLE OBJECT)
Đầu tiên, tui xin PR tí xíu về dòng họ của tui (Console Object). Dòng họ tui là một thành viên trong gia tộc JavaScript (ghê ghê chưa). Có nhiệm vụ cung cấp quyền truy cập vào bảng điều khiển gỡ lỗi của trình duyệt (Browser), nơi các bạn có thể in ra các giá trị của các biến mà các bạn đã sử dụng trong mã của mình (nói chung là trong quá trình code, các bạn có tạo biến để lưu giá trị. Thì nếu muốn biết giá trị của các biến đó nó như thế nào, thay đổi ra sao, có lỗi gì, có cảnh báo gì không, bla bla,... thì alo một cái. Nguyên dòng họ nhà tui sẵn sàng giúp đỡ các bạn).

Tui chắc chắn 99,99% các bạn thường xuyên gọi tui ra để in các giá trị trong bảng điều khiển trình duyệt, nhưng tui chỉ là một thành viên nhỏ bé trong dòng họ nhà tui thôi, các thành viên khác cũng rất là “pro” đấy, cứ gọi ra đi, tui thấy các thành viên còn lại toàn ở nhà ngủ không hà, cho người ta hoạt động tí đi. Cuộn màn hình xuống dưới một tí nữa nè, vào phần chính đây.

-----

## GIỚI THIỆU DÒNG HỌ
### 1. console.log() (là tui đóa, em Út).

-----

Nhiệm vụ chủ yếu của tui là in ra giá trị được chuyển tới bảng điều khiển. Bất kỳ kiểu nào cũng có thể truyền vào bên trong log() của tui như: string, array, object, boolean, v.v,... tui biết tuốt á.

***Ví dụ:***

Các bạn truyền cho tui các giá trị như sau:
```javascript
console.log('JavaScript');
console.log(7);
console.log(true);
console.log(null);
console.log(undefined);
console.log([1, 2, 3]);
console.log({a: 1, b: 2, c: 3});
```
Tui sẽ trả về kết quả cho các bạn như hình dưới nè:
![image.png](https://images.viblo.asia/e458ef99-015a-4d3b-aa50-fc9c70e796dc.png)
Thấy tui vi diệu chưa.

### 2. console.error() (anh Hai tui).

-----

Anh Hai của tui rất thích chửi và cực thích màu đỏ, nếu mã của các bạn có lỗi là ổng chửi ngay và trang trí lên đoạn văn ổng chửi với màu sắc yêu thích của ổng. Mà bạn đừng quá lo lắng, ổng đang giúp các bạn đó, vì ổng chửi đúng mà =)).

***Ví dụ:***

Truyền cho ổng cái lỗi “Error found”: `console.error('Error found');`

Ổng chửi nè:
![image.png](https://images.viblo.asia/60f280f7-e039-4132-9ff2-9338cc8d7576.png)
Sợ hông. Anh Hai tui hiền khô hà.

### 3. console.warn() (anh Ba tui).

-----

Anh Ba tui thì sẽ không chửi như anh Hai đâu, cực tốt bụng và thích màu vàng. Ổng sẽ cảnh báo cho các bạn biết về một điều gì đó có thể sẽ xảy ra với mã code của các bạn và trang trí dòng cảnh báo của ổng bằng màu sắc mà ổng thích. Những lời cảnh báo của ổng cực kỳ có giá trị đấy.

***Ví dụ:***

Truyền cho ổng dòng cảnh báo “Warning!”: `console.warn('Warning!');`

Và ổng sẽ đưa cảnh báo này lên bảng điều khiển cho các bạn:
![image.png](https://images.viblo.asia/e741977f-c56c-4877-ac00-d2817ec780eb.png)
Thấy anh Ba tui ghê hôn =)).

### 4. console.clear() (anh Tư tui).

-----

Anh Tư tui rất ưa sạch sẽ và sẵn sàng đá bay mọi rối ren như thông báo lỗi, cảnh báo, các kết quả: string, array, object,v.v,.., một nùi trên bảng điều khiển (bế tắc á, đau mắt á). Alo ổng, ổng dọn sạch hết cho.

***Ví dụ:***

Các bạn chỉ cần gọi ổng ra như này: `console.clear()`

Ổng sẽ làm hết cho các bạn, và ổng sẽ trả lời cho các bạn sau khi dọn dẹp xong “Console was cleared”:

![image.png](https://images.viblo.asia/7780fe97-fba5-48be-858c-2d4dffcbac82.png)

*“Em chỉ cần ngồi đó, cả thế giới cứ để anh lo.”*

### 5. console.time() & console.timeEnd() (anh Năm chị Năm tui).

-----

Hai vợ chồng anh Năm chị Năm tui là một cặp trời sinh. Kết hợp với nhau rất chi là ăn ý đó. Bất cứ khi nào các bạn muốn biết lượng thời gian dành cho một khối hoặc một hàm là bao nhiêu, các bạn hãy alo anh Năm chị Năm tui ra và truyền vào bên trong time() của anh Năm tui một label, truyền vào bên trong timeEnd() của chị Năm tui một label, mà nhớ là label truyền vào cho anh Năm chị Năm tui phải giống nhau nha, không giống nhau thì hai người họ lạc mất nhau thì khổ lắm. Theo thứ tự như sau: Anh nằm trên, chị nằm dưới, và ở giữa sẽ là đoạn mã code mà các bạn muốn đo thời gian nhá (nghiêm cấm nghĩ bậy bạ ở đây, tập trung chuyên môn đê bạn ei).

***Ví dụ:*** 

Đọc code hiểu ngay nè:
```javascript
console.time('timer');

const hello =  function(){
 console.log('Hello Console!');
}

const bye = function(){
 console.log('Bye Console!');
}

hello(); // calling hello();
bye(); // calling bye();

console.timeEnd('timer');
```

Khi anh Năm chị Năm tui gặp nhau, họ sẽ cho bạn biết đoạn mã bên trong đã thực hiện trong bao nhiêu lâu:

![image.png](https://images.viblo.asia/b7c10959-8503-4c54-ab8f-c4defbe99375.png)

Hạnh phúc ghê chưa, thả tym cho họ đi <3

### 6. console.table() (anh Sáu tui).

-----

Anh Sáu tui chỉnh chu cực kỳ, thay vì các bạn phải đọc một giá trị trả về là array hay một object nào đó một cách khô khan và rập khuôn .Thì chính anh Sáu, anh Sáu tui sẽ vẽ cho các bạn một cái bảng trên bảng điểu khiển luôn, ảnh sẽ cố gắng làm sao cho nó chỉnh chu và dễ đọc nhất cho các bạn. Nhưng ảnh chỉ vẽ cho các giá trị là array hoặc object thôi nha, nhìn vậy thôi mà cũng biết lựa lắm.

***Ví dụ:*** 

Các bạn đưa cho ảnh một object như đoạn code dưới:

`console.table({a: 1, b: 2, c: 3}); `

Coi anh Sáu tui vẽ nè:
![image.png](https://images.viblo.asia/6578301e-13b2-4243-bbc1-e7b0dd2637ca.png)
Thấy sao, ổn hơm, thích rồi chứ gì =)).

### 7. console.count() (anh Bảy tui).

-----

Đếm, là nghề của anh Bảy tui. Khi gọi anh Bảy tui ra, các bạn truyền cho anh Bảy tui một label, ví dụ như: một chuỗi ký tự nào đó, một biến “i” trong vòng lặp, bla bla,... thì anh Bảy tui sẽ đếm và cho bạn biết số lần anh Bảy tui được gọi với label mà các bạn đưa cho ảnh. Không truyền cũng được, anh Bảy không buồn đâu, anh Bảy sẽ mặc định lấy default để làm label, không buồn gì mấy.

***Ví dụ:***

Trong vòng lặp nè:
```c
for(let i=0; i<3; i++){
 console.count(i);
}
```

Anh Bảy sẽ đếm và xuất ra kết quả, label ở đây sẽ là biến “i”:
![image.png](https://images.viblo.asia/05b02816-47bc-4589-9dac-c6491c6f0325.png)
Ví dụ trên là vòng lặp, “i” tăng dần từ 0 đến 2, nên anh Bảy chỉ đếm được 1 lần cho mỗi giá trị “i” thôi.

***Thêm 1 ví dụ nữa nè:***
```swift
function sayHello(name) {
  console.count()
  console.log(name)
}
sayHello("Indrek")
sayHello("William")
sayHello("Kelly") 
```

Lần này không truyền label cho anh Bảy, coi anh Bảy đếm nè:
![image.png](https://images.viblo.asia/7867af16-4a89-4a75-a3d2-d609a7ca7397.png)
Anh Bảy sử dụng default để đếm khi các bạn không truyền gì cho ảnh hết, thấy cô đơn chưa.

*“Cuộc vui nào cũng đến lúc phải tàn”.*

### 8. console.group() & console.groupEnd() (anh Tám chị Tám tui).

-----

Đây đây, lại thêm một cặp vợ chồng ăn ý khít khìn khịt với nhau nữa đây, anh Tám chị Tám. Khi các bạn làm việc với các tập hợp hoặc dữ liệu được liên kết, hãy alo cho anh Tám chị Tám tui, anh Tám chị Tám tui sẽ giúp các bạn tổ chức đầu ra bằng cách liên kết trực quan các thông báo liên quan với nhau. Có thể đặt tên cho group để dễ phân biệt group này với group kia bằng cách truyền cho anh Tám tui một label (thường là chuỗi) cho tường minh hơn, hoặc không truyền cũng được. Vì sẽ có một vài trường hợp các bạn sẽ tạo ra khá nhiều nhóm để quản lý nên cần đặt tên vậy thôi. Và cũng giống như anh Năm chị Năm tui: Anh nằm trên, chị nằm dưới, và ở giữa sẽ là đoạn mã code mà các bạn muốn gom nhóm nhá. Hữu ích khi làm việc với dữ liệu dựa trên mối quan hệ. 

***Ví dụ:***

Ví dụ này có truyền cho anh Tám một label “group1 nè”:
```php
console.group('group1');
console.warn('warning');
console.error('error');
console.log('I belong to a group');
console.groupEnd();
console.log('I dont belong to any group');
```

Kết quả anh Tám chị Tám tui trả về nè:
![image.png](https://images.viblo.asia/55ca3134-096b-4cbb-bf52-837970616c92.png)

***Thêm một ví dụ nữa cho nó máu nè:***

Không thèm truyền label luôn:
```php
console.log("This is the first level");
console.group();
console.log("Level 2");
console.group();
console.log("Level 3");
console.warn("More of level 3");
console.groupEnd();
console.log("Back to level 2");
console.groupEnd();
console.log("Back to the first level");
```

Và đây là kết quả:
![image.png](https://images.viblo.asia/b3aac0d5-bb5a-4f11-ba5a-2a78b8e222c3.png)
Đỉnh chưa, thụt đầu dòng cho từng group con bên trong luôn kìa. Nhìn đã chưa =)).

Và, tui xin cám ơn các bạn đã dành thời gian để đọc, và lắng nghe tui kể về cuộc đời và dòng họ nhà tui. Để đáp lại tình cảm đó, tui bonus thêm nè =)). Cuộn màn hình xuống xíu đê.

-----

## BONUS: TẠO KIỂU CHO VALUE TRÊN BẢNG ĐIỀU KHIỂN.
Khoái liền chứ gì =)). 

Dễ ợt hà. Bạn chỉ cần viết một chuỗi css, lưu chuỗi đó vào một biến và truyền biến đó vào vị trí của tham số thứ 2 cho tui là được.

***Ví dụ nè:***
```css
const spacing = '10px';
const styles =  `padding: ${spacing}; background-color: white; color: red; font-style: italic; border: 1px solid black; font-size: 2em;`;
console.log('%cI am a styled log', styles);
```

Và đây là kết quả:
![image.png](https://images.viblo.asia/e060c035-6fd9-412e-a9a6-ec3095f74654.png)
Tèn ten, thấy dòng chữ “I am a styled log” không, khứa nào style xấu quá vậy. Cơ mà nhìn bảng điều khiển của mình so với các bạn thì mình xịn xò hẳn ra nhỉ =)).

-----

## TỔNG KẾT
Các bạn thấy không, dòng họ nhà console của tui ai ai cũng “pro” hết á. Có thể giúp cho các bạn rất nhiều trong việc gỡ lỗi mã. Hãy lưu bài này lại và bắt đầu gọi đến từng nhà anh chị tui để gỡ lỗi và trang trí cho bảng điều khiển trình duyệt nhà mình sinh động hơn nhé. Tui hy vọng những chia sẻ của tui là hữu ích cho các bạn.

Hạn chế gọi tui lại đi, tui ốm lắm rồi. Anh chị nhà tui ăn Tết dài hạn + nghĩ địch covid mập ú nu rồi kìa =)).

-----

Tài liệu tham khảo: 

https://js.plainenglish.io/stop-using-console-log-in-javascript-d29d6c24dc26
https://viblo.asia/p/console-tricks-in-javascript-co-the-ban-chua-biet-L4x5xGjalBM