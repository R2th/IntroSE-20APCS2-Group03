Với những thuộc tính mới của mình, CSS ngày càng tiện ích và dễ sử dụng hơn cho các nhà phát triển.  Trước đây để khi reponsive cho thiết bị là mobile ta dùng `@media (max-width) {...}`, tuy nhiên khi sử dụng có thể nhiều thiết bị mobile không nhận, hoặc ảnh có những ảnh hưởng khác trên PC mà chúng ta không ngờ tới. Nhưng  với 2 thuộc tính:  hover và pointer ta có thể viết css dành riêng cho mobile
## Tính năng tương tác phương tiện: hover
> Thuộc tính hover dược sử dụng để truy vấn khả năng của người dùng để di chuột qua các thành phần trên trang web với thiết bị trỏ chính. Nếu có nhiều thiết bị trỏ, tính năng phương tiện con trỏ phải phản ánh các đặc điểm của thiết bị trỏ điểm chính, được xác nhận bởi tác nhân người dùng.
W3C đang chuẩn hóa , tính năng phương tiện tương tác  `hover` có 2 giá trị khác nhau
*  Nếu có thể dễ dàng di chuột qua các thành phần trên trang thì ta sử dụng `hover`

    `@media (hover: hover) {
        /*...*/
    }`
* Ngược lại, nếu khó khăn trong việc di chuyển chuột hoặc không thể di chuyển chuột thì chúng ta sử dụng `none hover` 

    `@media (hover: none) {
        /*....*/
    }`
    
## Tính năng tương tác phương tiện: Pointer
> Tính năng đa phương tiện con trỏ chuột được sử dụng để truy vấn sự hiện diện chính xác của một thiết bị trỏ như một con chuột. Nếu có nhiều thiết bị trỏ, tính năng phương tiện con trỏ phải phản ánh các đặc điểm của thiết bị trỏ chính, được xác định bởi tác nhân là người dùng.

W3 đang chuẩn hóa tính năng pointer có 3 giá trị khác nhau
* Nếu đầu vào chính của thiết bị có thiết bị trỏ chuột với độ chính xác hạn chế thì ta sử dụng `coarse`

    `@media (pointer: coarse) {
        /*...*/
      }`
* Nếu cơ chế đầu vào chính của thiết bị bào gồm một thiết bị trỏ có độ chính cao thì ta sử dụng `fine`

    `@media (pointer: fine) {
        /*...*/
  }`
* Nếu cơ chế đầu vào chính của thiết bị không bao gồm thiết bị trỏ chuột, thì ta sử dụng `none`

    `@media (pointer: none) {
            /*...*/
      }`
##  CSS phù hợp thiết bị hiện có

```
        / * điện thoại thông minh, màn hình cảm ứng * /
         @media (hover: none) và (con trỏ: thô) { 
            / * ... * / 
        } 
        / * màn hình dựa trên bút stylus * /
         @media (hover: none) và (con trỏ: tốt) { 
            / * ... * / 
        } 
        / * Bộ điều khiển Nintendo Wii, Microsoft Kinect * /
         @media (hover: hover) và (con trỏ: thô) { 
            / * ... * / 
        } 
        / * chuột, bàn phím cảm ứng * /
         @ media (hover: hover) và (con trỏ: fine) { 
            / * ... * / 
        }
```

## Truy vấn đầu vào tất cả các thiết bị
Sử dụng `any-hover`hay `any-pointer` để truy vấn thiết bị đầu vào
> `any-pointer` được sử dụng để truy vấn sự hiện diện và độ chính xác của thiết bị. Nó không tính đến bất kỳ đầu vào thiết bị non-pointing và không thể sử dụng để kiểm tra sự hiện diện của các cơ chế đầu vào khác, chẳng hạn như bộ điều khiển bàn phím, nhưng thứ mà không di chuyển con trỏ trên màn hình. `any-pointer: none` sẽ có kết quả đúng nếu k có thiết bị trỏ nào cả.
```
/ * ít nhất một cơ chế đầu vào của thiết bị bao gồm một thiết bị trỏ có độ chính xác hạn chế. * /
 @media (any-pointer: coarse) { 
    / * ... * / 
} 
/ * ít nhất một cơ chế nhập liệu của thiết bị bao gồm một thiết bị trỏ chính xác. * /
 @media (any-pointer: fine) { 
    / * ... * / 
} 
/ * thiết bị không bao gồm bất kỳ thiết bị trỏ nào. * /
 @media (any-pointer: none) { 
    / * ... * / 
}
```

> `any-hover: none` có giá trị là đúng nếu không có thiết bị trỏ hoặc nếu tất cả các thiết bị trỏ hiện thiếu khả năng di chuột. Do đó, nó nên được hiểu là một truy vấn để kiểm tra xem có bất kỳ thiết bị trỏ nào có khả năng di chuột hay không, thay vì có hay không bất kỳ thiết bị trỏ nào không có khả năng di chuột. Kịch bản thứ hai hiện không thể xác định bằng cách sử dụng `any-hover` hoặc bất kỳ tính năng phương tiện tương tác nào khác. Ngoài ra, nó không tính đến bất kỳ đầu vào thiết bị none-pointing, như bộ điều khiển bàn phím, mà khả năng của chúng cũng không có khả năng di chuột.

```
/ * một hoặc nhiều cơ chế đầu vào khả dụng có thể di chuột qua các phần tử một cách dễ dàng * /
 @media (any-hover: hover) { 
    / * ... * / 
} 
/ * một hoặc nhiều cơ chế đầu vào khả dụng có thể di chuột , nhưng không dễ dàng (ví dụ: mô phỏng di chuột khi thực hiện một cú chạm dài) * /
 @media (any-hover: on-demand) { 
    / * ... * / 
} 
/ * một hoặc nhiều cơ chế nhập liệu khả dụng không thể di chuột hoặc không có cơ chế nhập liệu trỏ * /
 @media (any-hover: none) { 
    / * ... * / 
}
```

## Kết luận
Hãy nhớ chỉ sử dụng các tính năng này nếu bạn chắc chắn rằng hệ thống của bạn được sử dụng bởi một số loại trình duyệt nhất định.
![](https://images.viblo.asia/dde96d53-8d59-4122-8e4e-73fdee6838e3.png)
Để có giải pháp đa trình duyệt hỗ trợ, bạn nên tham khảo một số giải pháp sử dụng JS nhé.