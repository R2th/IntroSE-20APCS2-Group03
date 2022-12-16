Xin chào mọi người, lại là mình đây. Hôm nay sẽ là phần 3 của loạt bài về một số câu hỏi có thể gặp khi phỏng vấn Frontend Developer. Hi vọng bài viết thứ 3 về chủ đề này của mình sẽ giúp ích được phần nào cho các bạn vào dịp cuối năm.
Bây giờ, chúng ta sẽ bắt đầu với những câu hỏi thú vị của phần này

Các bạn có thể xem nhưng phần trước của mình tại: 
 - phần 1 tại [đây](https://viblo.asia/p/mot-so-cau-hoi-meo-co-the-gap-khi-phong-van-frontend-developer-phan-1-RQqKLvPpl7z)
 - phần 2 tại [đây](https://viblo.asia/p/mot-so-cau-hoi-meo-co-the-gap-khi-phong-van-frontend-developer-phan-2-07LKXzBrlV4)

# 1. BEM là gì? Tại sao lại dùng BEM

BEM có thể được định nghĩa đơn giản như sau:
- BEM ( viết tắt của *Block, Element, Modifier* ) là một phương thức để viết HTML và CSS được tạo ra để viết HTML theo hướng module, cùng với đó giúp cho viêc viết CSS có tổ chức và hiệu quả hơn

Tại sao lại dùng BEM: 
- Ví dụ, chúng ta có một class là `.button`. Giả sử có một item con của block này có class là `.element`. Nếu viết theo cách viết này, khi nhìn vào ta sẽ không thể biết ngay được item có class `.element` thuộc còn block con của block nào. Nhưng nếu ta thay đổi cách viết theo BEM, class sẽ là `.button__element` . Chúng ta sẽ hiểu ngay được đây là item con của block có class là `.button`.
- Không phải lồng nhiều cấp selector khi viết CSS:


```
.button {...}

.button__element {....}
```

  
  thay vì 
  
   ```
    .button {...}
    
    .button .element {....}
  ```
  
  # 2. Phân biệt các giá trị `inline, block, inline-block` của thuộc tính `display`
   - inline : Thành phần sẽ hiển thị như một nội tuyến (inline, không ngắt dòng), đây là dạng mặc định.
   - block: Thành phần hiển thị như một khối, khi sử dụng giá trị block thành phần sẽ đứng một hàng độc lập so với thành phần trước và sau nó.
   - inline-block: Thành phần sẽ hiển thị như một khối, nhưng là một khối nội tuyến.

# 3. Một số câu hỏi về code
### Làm thế nào để hàm dưới đây có thể chạy?

```
  duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]
```

Trả lời: 

```
function duplicate(array) {
  return array.concat(array);
}

console.log(duplicate([1,2,3,4,5]));  // [1,2,3,4,5,1,2,3,4,5]
```

###  Đoạn code dưới đây sẽ in ra giá trị gì?

 ```
   for (let i = 0; i < 5; i++) {
      setTimeout(function() { console.log(i); }, i * 1000 );
    }
 ```
 
 Trả lời:
 
 GIá trị trả về sẽ là `0, 1, 2, 3, 4`. Bởi vì ta sử dụng `let` thay vì `var` ở đây. Biến `i` chỉ được nhìn thấy trong phạm vi khối của vòng lặp `for`.
 
### Đoạn code dưới đây sẽ in ra giá trị gì? 

```
console.log(typeof typeof 1);
```

Trả lời:
- Giá in ra sẽ là `string`. Vì:
   - `typeof 1` sẽ return ra `"number"`, `typeof "number"` sẽ return ra `string

# 4. Phân biệt `.call` ,  `.apply` và `.bind`

### call

  Gọi hàm và cho phép bạn truyền vào một object và các đối số phân cách nhau bởi dấu phẩy
  
  ```
    function.call(thisArg, arg1, arg2, ...)
  ```
  
### apply

  Gọi hàm và cho phép bạn truyền vào một object và các đối số thông qua mảng
  
  ```
    function.apply(thisArg, [argsArray])
  ```
  
### bind

Trả về một hàm số mới, cho phép bạn truyền vào một object và các đối số phân cách nhau bởi dấu phẩy.

```
  var newFunction = function.bind(thisArg[, arg1[, arg2[, ...]]])
```

# 5. Lời kết
Chúng ta đã đi hết phần 3 của loạt bài về những câu hỏi có thể gặp khi phỏng vấn Frontend Developer. Hi vọng bài viết trên của mình sẽ giúp ích phần nào cho các trong việc chinh chiến với các nhà tuyển dung trong thời gian tới.

Tham khảo: https://github.com/h5bp/Front-end-Developer-Interview-Questions/tree/master/