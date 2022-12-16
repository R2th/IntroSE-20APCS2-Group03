![](https://images.viblo.asia/69c00ed2-172c-4132-86c8-04b0e22c799c.jpg)

Như các bạn đã biết thì `javascript` là một trong những ngôn ngữ được sử dụng rộng rãi nhất trong lập trình với website. Rất dễ để bắt đầu. Nhưng khi chúng ta bắt đầu với `javascript` sẽ có một số người sẽ bị bối rối vì cách `javascript` hoạt động :satisfied:. Một số khác thì có cảm giác tuyệt vời khi làm việc với `javascript`(kiểu cá gặp nước :scream:). Thì hôm nay xin chia sẻ một số mẹo hay trong `javascript` và cũng có một số chia sẻ của mình nữa! Không luyên thuyên nữa hãy bắt đầu thôi!

# 1. Những mẹo hay trong javascript, hãy áp dụng ngay bây giờ.
## Tránh việc thay đổi global scope.
Scope là một trong những điều gây bối rối nhất đối với chúng ta khi học javascript. Việc hiểu sai hoặc chưa đúng về scope dẫn đến phải debug và test rất nhiều để fix những issue về scope này.

Để tránh việc này thì khi khai báo một biến trong lần đầu tiên hãy sử dụng từ khoá dùng để khai báo như `var` chẳng hạn. Tại phiên bản es6 của javascript thì các bạn có thể sử dụng `let` hoặc `const`.

## Hãy làm quen và hiểu nhiều hơn về `this`.
![](https://images.viblo.asia/bb62a1f7-9f38-4366-bc17-d5169f999390.jpg)

Từ khoá `this` thì có lẽ chúng ta đã biết rất nhiều trong các ngôn ngữ lập trình khác nhau. Với mỗi ngôn ngữ đó sẽ có những giải thích tương ứng và khác nhau về `this`. Javascript cũng vậy nếu chúng ta cứ mang những kiến thức về `this` của những ngôn ngữ lập trình khác và áp dụng vào javascript thì sẽ có nhiều vấn đề nảy sinh.

Riêng mình thì mình thấy việc hiểu `this` là một trong những core của javascript. Nó giúp ích rất nhiều trong quá trình làm việc với javascipt. Các bạn có thể tham khảo link [này](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this). 

```javascript
function foo() {
  console.log(this.text) // Giá trị trả về ở đây là gì? Và làm sao thay đổi được giá trị của nó khi call function foo này?
}
```

## Sử dụng OR, AND, falsy values để xử lý gọn hơn.
![](https://images.viblo.asia/b1816c1c-eacf-49c1-863d-7502c8551f47.png)

Hãy sử dụng OR, AND để thay thế cho các xử lý điều kiện, falsy values để xử lý gọn hơn và kiểm soát được các trường hợp value nằm trong những giá trị sau undefined, null, 0, false, NaN, '' (empty string).
```javascript
if (2 - 1 === 0) { // 2 - 1 !== 0 && console.log('true')
    console.log('Is it true??')
}

if (2 - 1 !== 0) { // 2 - 1 === 0 || console.log('false')
    console.log('Is it true??')
}

const condition = 2 - 1 === 0
condition || console.log('false')
!condition && console.log('true')
```

## Thay đổi length của array để truncate array, đừng sử dụng  `delete` để xoá phần tử trong mảng.
Bạn có thể gán lại length cho array để truncate array. Chú ý là chỉ trong trường hợp length được gán lại phải nhỏ hơn length cũ, ngược lại thì những giá trị `undefined`.
```javascript
var foo = [1, 2, 3, 4, 5]
foo.length = 3 // [1, 2, 3]
foo.length = 4 // [1, 2, 3] and foo[foo.length - 1] = undefined
```

Và khi xoá một phần tử trong array thì thay vì sử dụng `delete` hãy sử dụng `splice`.  `delete` nên dùng để xoá property của object.
```javascript
var foo = [1, 2, 3, 4, 5]
foo.length; // 5
foo.splice(3, 1) // [1, 2, 3, 5]
foo.length; // 4
```

# 2. Một số chia sẻ về javascript
Bên trên thì mình có chia sẻ một số mẹo. Có thể có nhiều người đã biết rồi và cũng có người chưa biết, thì mong rằng bài chia sẻ này của mình sẽ giúp những người đã biết có thể nhớ lại(nhắc nhiều thì nhớ càng nhiều :rofl:, những người chưa biết thì có thêm một số kiến thức để sử dụng trong quá trình làm việc với javascript.

Thì bây giờ mình sẽ giới thiệu một số website hay mọi người có thể vào và đọc để có thêm nhiều kiến thức hơn nữa về javascript :smiley::

 + [MDN Web Docs](https://developer.mozilla.org/en-US/)
 + [Javascipt](https://www.javascript.com/)
 + [feeCodeCamp](https://www.freecodecamp.org/)
 + [JS: The Right Way](https://jstherightway.org/)

Trên đây là mốt số trang web là mình vào để tham khảo và học hỏi về javascript. Mong rằng chia sẻ này sẽ có ích cho các bạn. Cảm ơn các bạn đã đọc bài chia sẻ này, chúc các bạn có những khoảng khắc vui vẻ khi làm việc với javascript, hẹn gặp lại trong bài chia sẻ tiếp theo :triumph:.