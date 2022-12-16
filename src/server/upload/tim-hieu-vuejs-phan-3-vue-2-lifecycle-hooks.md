## Tổng quan 
![](https://images.viblo.asia/663b77e0-dda5-4211-9de9-e9e06e562751.png)


Hình trên là tổng quan vòng đời của một thể hiện của vue. 

Hãy cố gắng để hiểu được, tại sao khi tính toán một thuộc tính (sử dụng computed), hay khi bắt đầu, các thể hiện của vue, dữ liệu của nó được định nghĩa như nào...etc., nó thông qua vòng đời của nó cả.

Về mặt cơ bản, hãy chú ý đến các hàm: **beforeCreate**, **created**, **beforeMount**, **mounted**, **beforeUpdate**, **updated**, **beforeDestroy**, **destroyed**.

Đây cũng là những hàm chức năng trong vue, chúng ta sẽ tìm hiểu trong ngày hôm nay. Khi hiểu life-cycle, thì chúng ta có thể sử dụng những hàm này, để xử lý một cái gì đó vào thời điểm thích hợp của một thể hiện của vue.

Cũng giống như việc, bạn sẽ check, khi 15 tuổi thì đi làm chứng minh thư nhân dân, hay khi 18 tuổi, bạn phạm tội là rất dễ đi tù chẳng hạn. :funeral_urn:

### beforeCreate 
- Type: Function 
- Chi tiết:  Được gọi ngay sau khi thể hiện vue được  khởi tạo và trước khi đẩy vào data và các event/watcher được thêm vào. 
Xem thêm ở hình life cycle 

### created 
- Type: Function
- Chi tiết: Được gọi ngay khi một thể hiện của vue được tạo ra. Ở trạng thái này, thể hiện vue đã hoàn thành, bao gồm việc tính dữ liệu data, các thuộc tính tính toán trong computed, các phương thức viết trong **methods**, các event/watch. Tuy nhiên **mounting** chưa bắt đầu, và biến đặc biệt **$el** chưa khả dụng. 
Xem thêm ở hình life cycle 

### beforeMount 
- Type: Function 
- Chi tiết: 
Được gọi ngay trước khi quá trình **mounting** được bắt đầu. function này chỉ được gọi đến môt lần trong quá trình render. 

### mounted
- Type: Function 
- Được gọi khi một thể hiện trong quá trình **mounted**, khi biến đặc biệt **el** vừa được tạo mới. nếu nó là root-instance, thì function **function vm.$el** cũng được gọi khi hàm mounted được gọi.
- Chú ý rằng, **mounted** sẽ không đảm bảo rằng mọi component con sẽ được **mounted**, và để đợi một thành phần nào nó render xong, thì chúng ta sẽ có thể sử dụng **vm.$nextTick**.
```js
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
```

### beforeUpdate 
-Type: Function
- Chi tiết 
Được gọ ngay khi dữ liệu dược thay đổi, trước khi DOM được cập nhật. Có thể truy cập đến trạng thái trước khi cập nhật của DOM. 

### updated 
- Type: Function
- Chi tiết: Được gọi khi dữ liệu được thay đổi và DOM sẽ được render lại và cập nhật lại. 
- DOM của component sẽ được cập nhật khi hook này được gọi, và các thành phần DOM liên quan cũng dược cập nhật. Nhưng trong hầu hết các trường hợp, họ thường tránh thay đổi trạng thái của DOM trong hook này, thay vì đó có thể sử dụng **computed property** hoặc **watcher**.
- Cũng chú ý rằng giống với **mounted**, khi mà **updated** cũng không đảm bảo thực hiện hoàn tất ở các component con, do đó có thể sử dụng **vm.$nextTick**

### activated 
- Type: Function
- Chi tiết: Gọi để component tiếp tục active 

### deactivated 
- Type: Fucntion
- Chi tiết: Gọi để deactivated component

### beforeDestroy
- Type: Function 
- Chi tiết: Gọi ngay trước khi thể hiện Vue được hủy. 

### destroyed 
- Type: Function
- Chi tiết: Gọi sau khi đã phá hủy thể hiện Vue. khi hook  này được gọi, mọi directive, methods, listener...etc đều bị phá hủy.