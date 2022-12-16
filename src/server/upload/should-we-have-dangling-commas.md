# `1. Giới thiệu`
Có nhiều ý kiến khác nhau về phong cách viết code sẽ như thế nào. Hầu hết trong quá trình viết code, vấn đề chủ yếu gặp phải là phải viết như thế nào cho rõ ràng, rành mạch và tạo thành một good behavior. Khi nói đến những dấu phảy lơ lửng hay là Dangling Commas, hầu hết mọi người không thích chúng cho đến khi họ hiểu được lợi ích. Bài viết này sẽ làm rõ vấn đề tại sao nên dùng chúng và chúng mang lại những lợi ích như thế nào

![](https://images.viblo.asia/f173cd36-70e6-4987-901d-d7be4698c192.jpg)

Trước hết, thử vớ một đoạn code không có `dangling commas`
```
const fruits = [
  'apples',
  'banana' // <- no comma before the closing bracket
];
const godzilla = {
  teeth: 213,
  kind: 'giant monster' // <- no comma before the closing brace
};
```
Còn khi với `dangling commas` thì sao?
```
const fruits = [
  'apples',
  'banana', // <- comma before the closing bracket
];
const godzilla = {
  teeth: 213,
  kind: 'giant monster', // <- comma before the closing brace
};
```
Không có quá nhiều khác biệt, nhưng tại sao nó lại là một good behavior?

# `2. Lợi ích`
1. `Sạch sẽ`: Một nhóm developer luôn cần sự sạch sẽ trong code. Đặc biệt trong khi xem xét các pull request của mỗi thành viên. Khi có một dòng code thay đổi trong object trên, sự thay đổi duy nhất trên git pull request chỉ là dòng đó. Không hề có trường hợp dự dưng dòng trên lại bị báo đỏ bị vừa bị thêm một dấu phẩy
```
const fruits = [
  'apples',
  'banana' // <- no comma before the closing bracket
];
const godzilla = {
  teeth: 213,
  kind: 'giant monster' // <- no comma before the closing brace
};
```
![](https://images.viblo.asia/30749c93-ece9-4fc4-b469-733d531154c8.png)
![](https://images.viblo.asia/be2d99c3-5484-499f-b5e3-ae4d885598f8.png)

2. Dễ dàng thay đổi code
Không bao giờ có chuyển khi copy một dòng từ object chỗ này sang chõ khác lại phải thêm dấu phẩy, hay xóa dầu phấy đi nữa. Việc này cũng giảm kha khá các confic khi team có nhiều người cùng tham gia code 1 đoạn. Đôi khi conflic xảy ra khi người thứ nhất và người thứ hai cùng thêm 1 dòng cuối cùng của một object
```
const fruits = [
  'apples',
  'banana',
  'person one', // <- new line
];
const fruits = [
  'apples',
  'banana',
  'person two', // <- new line
];
```


# `3. Kết luận`
Phong cách luôn là cách mà mỗi người thể hiện. Không thể bắt ép một người khác theo phong cách của mình nếu như không chứng minh cho thấy rằng những lợi ích của việc thay đổi đó. Hãy cởi mở mà thể hiện những sự khác biệt nhỏ bé này nhưng làm sạch sẽ và gọn gàng code của bạn.