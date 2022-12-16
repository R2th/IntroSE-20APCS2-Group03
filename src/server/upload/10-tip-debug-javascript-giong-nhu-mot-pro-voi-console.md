![](https://images.viblo.asia/0363cced-c315-48a8-a975-eb5cd59565b3.png)
Hy vọng bây giờ tôi có thể cung cấp cho bạn một số mẹo đã không biết trước đây và điều này sẽ iên bạn trở thành một pro trong `debugger`.

## Tip1 console.trace()
  Nếu bạn muốn biết những nhật ký  được nhắc đến đang ở đâu thì ta dùng `console.trace()` nó sẽ lấy ra nhật ký data được ghi vào ngăn xếp.
  
  ![](https://images.viblo.asia/42a00e6b-553b-472a-8a3f-f41c519c9695.png)


## Tip #2 console.time() && console.timeEnd()

Nếu bạn muốn tìm một vấn đề nào đó đang chạy mà bạn không biết làm hiệu năng giảm thì bạn có thể dùng `console.time()` hoặc  `console.timeEnd()`.
![](https://images.viblo.asia/fbc01623-1d75-4b44-bf6c-c7f692c6999b.png)

## Tip #3 console.memory

Nếu vấn đề hiệu suất của bạn còn phức tạp hơn nữa  và bạn đang rò xem vùng nhớ  bị sử dụng mà không phải mong muốn của mình bạn có thể sử dụng: `console.memory` (thuộc tính , không phải chức năng ) để kiểm tra trạng thái vùng nhớ HEAP. 
![](https://images.viblo.asia/27999510-0d8d-485f-a31b-ca2576c9ab29.png)


## Tip #4 console.profile(‘profileName’) & console.profileEnd(‘profileName’)

Đây không phải là một tiêu chuẩn mà nó được sử dụng khá rộng rãi. Bạn có thể start và end  một công cụ  hiệu suất trình duyệt -- thông tin hiệu suất từ mã code sử dụng `console.profile(‘profileName’)` sau đó `console.profileEnd(‘profileName’)`. Điêu này giúp bạn thiết lập trính xác những gì bạn muốn và ngăn bạn bởi những cuộc click chuột tốn thời gian

## Tip #5 console.count(“STUFF I COUNT”)
 Trong trường hợp bạn muốn đọc hay ghi số lần gọi hàm bạn có thể sử dụng 
 
 ![](https://images.viblo.asia/0a1a2f7b-a625-470c-91a6-29bbccbf02e5.png)
 
## Tip #6 console.assert(false, “Log me!”)

Bạn có thể sử dụng `console.assert(điều , msg)`  để log cái gì đó khi ddieujf kiệ là gỉa.

## Tip #7 console.group(‘group’) & console.groupEnd(‘group’)

Sau khi bạn đã viết khá nhiều log và bạn muốn tổ chức lại chúng.  Một công cụ tuy nhỏ nhưng mà nó rất hữu ích `console.group() & console.groupEnd()` sử dụng `console.group()`, `console.log()` để nhóm tất cả  chúng lại . Trong khi mội nhóm lại tạo ra hệ thống  phân cấp.  Khi sử dụng  `groupEnd()` để giảm đi một.

![](https://images.viblo.asia/9315cd9e-feab-43fa-b045-0b264fb189a6.png)


## Tip #8 String substitutions

Khi loging bạn có thể dùng biến để thay thế string. ví dụ  (%s = string, %i = integer, %o = object, %f = float).

![](https://images.viblo.asia/e5e8a0aa-048c-433d-a111-04fdcceb6e03.png)


## Tip #9 console.clear()

Chà từ đâu viết nhiều log quá rồi đến lúc xoa thôi 

![](https://images.viblo.asia/129f29ba-0d96-4245-84eb-87a877e15e23.png)


## Tip #10 console.table()

Tôi đã để tip này đến  tận cuối mới giới thiệu. Bạn thực sử có thể in bảng  đẹp với người dùng đăng nhập với `console.table()`

![](https://images.viblo.asia/c0465767-9ff5-4999-be42-f43230f489a9.png)


Cuối cùng hy vọng với nhưng tip như thế này sẽ khiên  viêc debug sẽ hiệu quả hơn và thú vị hơn phải không ?


Link tham khảo: https://medium.com/appsflyer/10-tips-for-javascript-debugging-like-a-pro-with-console-7140027eb5f6