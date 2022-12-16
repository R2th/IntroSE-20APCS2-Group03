Trong bài viết này, tôi sẽ cung cấp cho bạn một số mẹo vặt để debug javascript sử dụng console.
Vâng, chúng ta đều biết một số thứ cơ bản như sau:
```
console.log(‘Hello World!’); //log a message or an object to console
console.info(‘Something happened…’); //same as console log
console.warn(‘Something strange happened…’); //same as console log but outputs a warning
console.error(‘Something horrible happened…’); //same as console log but outputs an error
```

Vì vậy, hy vọng tôi sẽ cung cấp cho bạn một số mẹo mà bạn có thể chưa biết tới trước đây và điều này sẽ khiến bạn debug pro hơn :))

## 1. console.trace()
Vì Javascript không phải là một ngôn ngữ có cấu trúc chặt chẽ nên đôi khi rất khó để có một cái nhìn tổng quan về những gì đã xảy ra và xảy ra khi nào trong ứng dụng. Đặc biệt là khi bạn đọc code của người khác. Đây là lúc console.trace phát huy tác dụng, nó giúp chúng ta truy vết luồng chạy để có thể hiểu code dễ hơn.
Dưới đây có một ví dụ, hãy tưởng tượng bạn muốn xem toàn bộ dấu vết ngăn xếp của hàm funcZ trong instance car:
```
var car;
var func1 = function() {
  func2();
}
var func2 = function() {
  func4();
}
var func3 = function() {

}
var func4 = function() {
  car = new Car();
  car.funcX();
}
var Car = function() {
  this.brand = ‘volvo’;
  this.color = ‘red’;
  this.funcX = function() {
  this.funcY();
}
this.funcY = function() {
  this.funcZ();
}
this.funcZ = function() {
  console.trace(‘trace car’)
  }
}
func1();
```
![](https://images.viblo.asia/ba31469d-4b99-40a2-8738-a2bda8841556.png)

## 2. Make logs easy to read, easy to find
Khi mà bạn muốn log ra nhiều thứ hơn, trên console có rất nhiều dòng log. Một điều mà bạn có thể làm để cấu trúc log dễ nhìn hơn là phân loại các log, sử dụng một số thứ cơ bản đã nhắc đến ngay đầu bài viết như: console.log, console.debug, console.warn, console.info ... Sau đó, bạn có thể lọc chúng theo từng loại.
Nhưng đôi khi điều này không thực sự là những gì bạn muốn khi bạn cần debug javascript. Giờ đây bạn có thể sáng tạo và tạo ra kiểu riêng cho log của mình. Sử dụng CSS và tạo các bảng điều khiển có cấu trúc riêng khi debug:
```
console.todo = function(msg) {
  console.log(‘ % c % s % s % s‘, ‘color: yellow; background - color: black;’, ‘–‘, msg, ‘–‘);
}
console.important = function(msg) {
  console.log(‘ % c % s % s % s’, ‘color: brown; font - weight: bold; text - decoration: underline;’,     ‘–‘, msg, ‘–‘);
}
console.todo(“This is something that’ s need to be fixed”);
console.important(‘This is an important message’);
```
![](https://images.viblo.asia/0ea3a6e8-5206-4c68-bbe3-af4095df766f.png)

## 3. console.table()
Một nỗ lực khác để làm cho log dễ đọc hơn. Đôi khi bạn cần nhìn xem dữ liệu của một object thế nào. Sẽ dễ dàng để nhận biết khi ta đưa nó vào bảng với console.table()
![](https://images.viblo.asia/a1f116a0-d5eb-48ae-bd45-f07b57dd83db.png)

## 4. console.count()
Trong trường hợp có các hàm chạy định kỳ, bạn có thể sử dung console.count("?") để đếm xem code của bạn được đọc bao nhiêu lần

![](https://images.viblo.asia/49837ea0-196e-42d8-b462-ac28c482a184.png)

## 5. console.time() and console.timeEnd()
Nó có thể rất hữu ích để biết chính xác một cái gì đó được thực hiện trong bao lâu, đặc biệt là khi deblug các vòng lặp chậm. Bạn thậm chí có thể thiết lập nhiều bộ tính giờ bằng cách cung cấp label cho các phương thức. Hãy xem 1 ví dụ:
```
console.time('Timer1');
var items = [];
for(var i = 0; i < 100000; i++){
   items.push({index: i});
}
console.timeEnd('Timer1');
```

Nó sẽ tạo ra kết quả như sau:
![](https://images.viblo.asia/e86cb050-bfee-4d8d-a0fa-21bd805a83c8.png)

Trên đấy là 1 vài tips có thể sẽ hữu ích với bạn trong quá trình debug javascript, hy vọng sẽ giúp được bạn trở nên pro hơn :)