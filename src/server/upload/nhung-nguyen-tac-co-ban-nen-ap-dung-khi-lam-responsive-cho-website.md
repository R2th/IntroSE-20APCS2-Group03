![](https://images.viblo.asia/09eac3b5-5283-4c4d-80fd-7b949943b290.jpeg)

**Trước đây, mình đã có 1 series bài viết về Responsive Web Design, các định nghĩa cũng như các bước thực hiện, các bạn quan tâm thì có thể xem ở [đây](https://viblo.asia/p/tu-can-ban-den-nang-cao-ve-responsive-web-design-rwd-phan-1-Eb85oJ8Ol2G)** 

Và trong bài viết này, mình xin trình bày một số lưu ý cần phải lưu ý khi làm resposive sao cho đúng nguyên tắc và tối ưu nhất cho mọi thiết bị. 

#### Nguyên tắc 1: Hãy đặt mình vào vị trí của end-user
Nguyên tắc đầu tiên là hãy đặt mình vào vị trí của người dùng, họ sẽ thực hiện những thao tác gì, họ có thể xem được gì khi nhìn vào và sử dụng, thao tác trên trang web của bạn. Ở thời điểm hiện tại, UI/UX rất được coi trọng trong việc thiết kế và phát triển web, vì xu hướng người dùng càng ngày càng sử dụng các thiết bị di dộng nhiều hơn. Vậy nên, khi làm responsive cho web thì hãy tối ưu hóa nội dung hiển thị và trải nghiệm người dùng tốt nhất có thể, tránh việc hiển thị thiếu thông tin và gây khó khăn cho người dùng.
#### Nguyên tắc 2: Luôn luôn là Mobile First
Mobile First có nghĩa là thực hiện layout cho điện thoại di động trước khi hiển thị cho máy tính để bàn hoặc bất kỳ thiết bị nào khác (Điều này sẽ làm cho trang web hiển thị nhanh hơn trên các thiết bị nhỏ hơn). Đây cũng là nguyên tắc thực hiện responsive của các CSS Library phổ biến như Bootstrap, Foundation...

Vì mục đích của khi làm responsive là hướng đến người dùng các thiết bị di động, mà các thiết bị này như chúng ta biết thì ngoài cấu hình yếu hơn PC/laptop, chúng còn có màn hình nhỏ hơn. Vậy nên một khi đã làm responsive cho website, hãy ưu tiên tối ưu hiệu suất và hiển thị cho các thiết bị này trước.

Hãy xem đoạn code CSS ví dụ dưới đây để hiểu rõ hơn.
```
/* For mobile phones: */
[class*="col-"] {
    width: 100%;
}
@media only screen and (min-width: 768px) {
    /* For desktop: */
    .col-1 {width: 8.33%;}
    .col-2 {width: 16.66%;}
    .col-3 {width: 25%;}
    .col-4 {width: 33.33%;}
    .col-5 {width: 41.66%;}
    .col-6 {width: 50%;}
    .col-7 {width: 58.33%;}
    .col-8 {width: 66.66%;}
    .col-9 {width: 75%;}
    .col-10 {width: 83.33%;}
    .col-11 {width: 91.66%;}
    .col-12 {width: 100%;}
}
```

Ở đoạn code trên, trình duyệt sẽ ưu tiên chạy qua đoạn tất cả các thẻ có class có prefix là `col-`  và set `width: 100%` cho các thẻ này, sau đó mới chạy qua đoạn `@media only screen and (min-width: 768px) {...}`. Nghĩa là cứ set CSS cho các devices nhỏ hơn 768px trước, các devices còn lại để sau. 

#### Nguyên tắc 3: Hiển thị nội dung kiểu dòng chảy
Từ gốc của các tài liệu tiếng Anh là `The flow`. Cho dù một mẫu điện thoại có màn hình lớn đi chăng nữa thì dĩ nhiên nó vẫn khá nhỏ so với PC. 

Nguyên tắc này có nghĩa là nội dung chỉ nên hiển thị trên 1 dòng từ trên xuống dưới, tránh tuyệt đối việc để người dùng phải vuốt ngang để có thể xem được nội dung, họ sẽ rời bỏ trang web của bạn ngay lập tức.

#### Nguyên tắc 4: Sử dụng các breakpoints hợp lý
Hãy liệt kê ra tất cả các breakpoints tương ứng với kích thước của các thiết bị di động phổ biến hiện nay và chọn ra những breakpoints phổ biến nhất để thực hiện việc responsive cho các devices này. 

Tất nhiên không phải là bỏ qua các breakpoints còn lại, chỉ là chia ra các breakpoints hợp lý để nhóm các thiết bị có các kích thước giống nhau lại với nhau để giảm thiểu thời gian và số lượng code CSS. 

Ví dụ, các thiết bị tablets có độ phân giải chiều rộng tối đa thường là 992px, thì khi làm responsive ta chỉ lấy breakpoints này làm mốc và viết CSS trong đó. Giả sử, ta muốn viết CSS chỉ dành riêng cho các thiết bị tablets, ta thường viết trong đoạn CSS sau:

```
@media only screen and (min-width: 992px) {
    CSS code here
}
```

chứ không nên viết thế này
```
@media only screen and (min-width: 995px) {
    CSS code here
}
```

Vì trong đoạn từ 992px - 995px, nó không có tác dụng gì cho tablets cả.

#### Nguyên tắc 5: Sử dụng các giá trị tương đối thay vì giá trị tuyệt đối
Nguyên tắc thứ 5 là nên sử dụng các giá trị tương đối cho việc set width hoặc height cho các phần tử hiển thị trên mobile, mà cụ thể ở đây là `%`, hạn chế việc sử dụng các giá trị tuyệt đối như `px`. Các giá trị tuyệt đối sẽ không thể tự resize theo chiều rộng/ngang của devices được.
Ví dụ:
```
@media only screen and (min-width: 992px) {
    .image {
        width: 100%;
    }
}
```

thay vì
```
@media only screen and (min-width: 995px) {
    .image {
        width: 500px;
    }
}
```

#### Nguyên tắc 6: Hạn chế khoảng trống, giảm độ lớn font chữ và lược bỏ quảng cáo
Thường thì Khoảng cách giữa các phần tử, font chữ trên desktop khi hiển thị sẽ có khoảng cách và độ lớn khá lớn để tạo không gian thoải mái cho người dùng, nhưng nó sẽ không phù hợp trên các thiết bị di động nữa, khoảng trống và font chữ quá lớn sẽ gây khó chịu cho người dùng rất nhiều, vì thế hãy điều chỉnh sao cho phù hợp với từng kích thước màn hình.

Và các thiết bị di động có kích thước khá nhỏ, vì thế nên việc người dùng cần hiển thị đầy đủ thông tin hơn là xem các banner quảng cáo nhảy nhót khắp nơi. Có thể bạn làm ra website và bạn cần phải có tiền từ quảng cáo để duy trì web site, duy trì cuộc sống. Nhưng hãy đừng lạm dụng quá mức mà đánh mất đi số lượng lớn người dùng và nội dung hay trên trang web vì những banner quảng cáo. Hãy cố gắng hiển thị quảng cáo trên các thiết bị di động 1 cách tinh tế và hiệu quả nhất.


Trên đây là những nguyên tắc mình đúc rút ra qua nhiều năm làm responsive cho webiste, hy vọng là nó có thể giúp ích được cho các bạn trong học tập cũng như trong công việc. Xin cảm ơn và hẹn gặp lại.