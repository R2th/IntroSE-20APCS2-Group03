![](https://images.viblo.asia/3a560c1c-e08d-4e57-8871-37672e6b3aa0.jpeg)

Giống như lập trình viên web, việc debug code là rất quan trọng. 

Khi chúng ta nghĩ đến `console`, điều đầu tiên xuất hiện trong đầu chính là `console.log` đúng không ?? Nhưng thật ra javascript còn vượt xa cả trí tưởng tượng của bạn. Và bây giờ chúng ta cùng đi tìm hiểu một vài bí mật của `console` nhé ~~.

## 1. What is the Console?

The Javascript console là một tính năng được xây dựng trong các trình duyệt ngày nay, nó đưa ra các công cụ giúp lập trình kiểm tra rõ ràng trên các giao diện. Nó cho phép lập trình viên:

- Nhìn thấy những lỗi (errors) hay cảnh báo (warnings) xảy ra trên một trang web.
- Tương tác với trang web sử dụng Javascript commands.
- Gỡ lỗi (Debug) ứng dụng web ngay trên trình duyệt của mình
- Kiểm tra và nghiên cứu các hoạt động của network

Đơn giản là nó trao quyền cho người dùng, lập trình viên thao tác với Javascript ngay trên trình duyệt.

## 2. Console.log, Console.error và Console.warn

Trên đây là các phương thức đựoc sử dụng nhiều nhất của `console`. Nó có thể xử lý với nhiều hơn một tham số truyền vào. 

![](https://images.viblo.asia/f3ed35f5-137e-4385-a5a2-3ff6c437a659.png)

## 3. Console.group

Phương thức này cho phép bạn gom nhóm lại các `console.log` con. 

Cú pháp của phương thức này cũng rất đơn giản: 
 - Đầu tiên phải đánh dấu bắt đầu của group,  thêm vào trên cùng `console.group()`. 
 - Tạo thật nhiều `console.log` bạn muốn gom nhóm lại. 
 - Và cuối cùng là đánh dấu kết thúc của group, thêm  `console.groupEnd()` vào cuối cùng của nhóm.

**Code:**

```
function doSomething(obj) {
  console.group('doSomething Profile');
  const _data = new Date()
  console.log('evauating data: ', _data);
  const _fullName = `${obj.firstName} ${obj.lastName}`
  console.log('fullName: ', _fullName);
  const _id = Math.random(1)
  console.log('id: ', _id);
  console.groupEnd()
}

doSomething({"firstName": "Riccardo", "lastName": "Canella"});
```

**Kết quả:**

![](https://images.viblo.asia/28b39a90-f448-4106-8fc7-64c4b3ad88e5.PNG)

Bạn thấy đấy, các kết quả đều được gom trong nhóm `doSomething Profile` rồi =)).

## 4. Console.table

Việc hiển thị một dữ liêu mảng JSON lớn thật là quá khó khăn. Từ khi t khám phá ra `console.table`, cuộc sống khó khăn của t đã thay đổi =)). `console.table` cho phép bạn trình bày cấu trúc bên trong dưới dạng bảng, nơi chúng ta có thể định danh lại tên các cột, trường

**Code:**

```
const typeOfConsole = [
  {name: 'log', type: 'standard'},
  {name: 'info', type: 'standard'},
  {name: 'table', type: 'wow'}
]

console.table(typeOfConsole)

const mySocial = {
  facebook: true,
  linkedin: true,
  flickr: true,
  instagram: true,
  VKontaktebadoo: false
}

console.table(mySocial, ["Socials", "I'v an account"])
```

**Kết quả:**

![](https://images.viblo.asia/482d3acf-d5f8-4c70-b997-9bb1b01e6957.PNG)

`console.table` làm chúng ta yêu việc check dữ liệu file JSON hơn =)).

## 5. Console.count, Console.time và Console.timeEnd

`console.count` đếm và output số lần `count()` được gọi trên cùng một dòng và cùng label. 

`console.time` bắt đầu đếm đồng hồ tính giờ khi được gọi và kết thúc khi gặp `console.timeEnd()`. Nó có thể chạy đến 10.000 đồng hồ đếm giờ đồng thời trên trang web đưa ra


**Code:**

```
console.time('total');
console.time('init arr');
const arr = new Array(20);
console.timeEnd('init arr');

for (var i = 0; i < arr.length; i++) {
  arr[i] = new Object();
  const _type = (i % 2 === 0) ? 'even' : 'odd'
  console.count(_type + 'added');
}

console.timeEnd('total')
```


**Kết quả:**

![](https://images.viblo.asia/52064e59-bd6a-4644-ac5e-5434416b0982.PNG)

Phương thức này thật sự hữu ích khi bạn muốn kiểm tra thời gian chạy của một hàm Javascript

## 6. Console.trace and Console.assert

`console.trace` đơn giản là in ra một chuối các dấu vết (trace) từ khi nó được gọi đến.

Hãy tưởng tượng là đang tạo ra một thư viện JS library, và muốn thông báo cho người dùng lỗi xuất hiện ở đâu.

`console.assert` cũng giống như `console.trace` nhưng nó sẽ in ra lỗi nếu không vượt qua được điều kiện đưa ra.

**Code:**

```
function lesserThan (a,b) {
  console.assert(a < b, {"message": "a is not lesser than b", "a": a, "b": b});
}
lesserThan(6,5);
console.trace("End")
```

**Kết quả: **

![](https://images.viblo.asia/e39dd52a-47bc-40a2-9b00-0ea237219ad9.PNG)

## Kết

Bên trên là một vài phương thức `console` mà mình đã tìm hiểu được, hi vọng sẽ giúp ích được cho các lập trình viên lập trình `Javascript` dễ dàng hơn.

Thank you and see ya later (bow)

## Tài liệu tham khảo
https://medium.freecodecamp.org/how-you-can-improve-your-workflow-using-the-javascript-console-bdd7823a9472