## Giới thiệu
Console chắc hẳn các bạn cũng không lạ gì với các bạn code javascript nữa rồi nhỉ? Nhưng các bạn đã tận dụng được hết những gì nó có chưa? Hay chỉ mới console.log(),... Bài viết này mình sẽ giới thiệu đến các bạn một số hàm hữu dụng trong đối tượng console giúp cho việc debug nhanh và hiệu quả. Giúp bạn không bị nhàm chán khi debug :).

## 1. console.trace()
Hàm này cho phép bạn biết đối tượng được khởi tạo, thực hiện ở những chỗ nào.

![](https://images.viblo.asia/f7c01860-0799-4cc5-9644-0d29b66fef89.JPG)

## 2. console.time() và console.timeEnd()
Nếu như bạn muốn kiểm tra perfomance code của bạn thì 2 phương thức console.time() và console.timeEnd() quả là một hiệu quả nhất.
```
const fruits = ['apple', 'banana', 'lemon', 'watermelon'];
console.time();
fruits.forEach((f) => {  });
console.timeEnd();

console.time();
for(i=0; i < fruits.length; i++) { }
console.timeEnd();


>>>>>> default: 0.03515625ms
>>>>>> default: 0.03271484375ms
```
Bạn có thể nhìn vào thời gian ở trên để so sánh code nào tối ưu hơn.

## 3. console.memory
Dùng để kiểm tra chương trình đang chạy sử dụng ram như thế nào thì hãy sử dụng:

![](https://images.viblo.asia/fd5fe001-4b03-4d82-8fa8-e05a2197ca78.JPG)

## 4. console.count()
Hàm này dùng để đếm xem số lần object thực thi trong quá trình chạy.
```
const fruits = ['apple', 'banana', 'lemon', 'watermelon'];
fruits.forEach((f) => { console.count('SO LAN') });

>>>>> SO LAN: 1
>>>>> SO LAN: 2
>>>>> SO LAN: 3
>>>>> SO LAN: 4
```

## 5. console.assert()
Hàm này sẽ log ra với điều kiện được truyền vào. Nếu điều kiện truyền vào false thì nó sẽ log ra.

![](https://images.viblo.asia/1cf59c75-65c7-4886-b603-9ab1595af650.JPG)

## 6. console.group() và console.groupEnd()
Sau khi bạn viết rất nhiều log, bạn có thể muốn tổ chức chúng. Thì console.group () và console.groupEnd () rất hữu ích để làm việc này . 
Nó giúp chúng ta nhóm và phân cấp các log được in ra. Giúp chúng ta dễ dàng đọc các log hơn.

![](https://images.viblo.asia/83b25178-f195-48f9-a6e4-87a1f9823828.JPG)

## 7.  console.log với các tham số
Thay vì cộng chuỗi để in ra chúng ta có thể dùng console.log với string format để in ra một cách dễ dàng.

![](https://images.viblo.asia/c9021a60-4c80-4da2-932b-56c6d0db02a2.JPG)

## 8. console.clear()
Thậ tuyệt vời, nãy giờ bạn đã viết rất nhiều log và bảng console của bạn trông rất lộn xộn và khó nhìn. Thì console.clear() sẽ là hàm rất hữu ích cho bạn để dọn dẹp nó. 

![](https://images.viblo.asia/d8599d10-a9d4-476e-b654-7b99d868b244.png)

## 9. console.table()
Đây là là một hàm giúp chúng ta in dữ liệu theo kiểu bảng. Mình cảm thấy rất đẹp và dễ nhìn.
Thay vì console.log() như cũ 
![](https://images.viblo.asia/ef176289-b6ce-47bb-918c-74463630e821.JPG)

Thì console.table rất dễ nhìn đúng không :)
![](https://images.viblo.asia/424a43a7-6705-4573-b27b-50481aacd25f.JPG)

## Kết luận
Mình thực sự hy vọng những mẹo này làm cho việc debug của bạn hiệu quả hơn, thú vị hơn một chút:))