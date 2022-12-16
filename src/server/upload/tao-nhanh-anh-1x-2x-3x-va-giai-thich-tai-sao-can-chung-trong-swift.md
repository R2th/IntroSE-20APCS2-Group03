# Đặt vấn đề
![](https://images.viblo.asia/1f2e4079-a711-4e42-8cd2-3d121161f852.png)
Khi bạn mở Asset Catalog trong Xcode, bạn chắc chắn sẽ nhìn thấy yêu cầu hình ảnh 1x, 2x, 3x. Điều đó có ý nghĩa gì? Các mẫu đời Iphone và Ipad có độ phân giải màn hình và kích thước màn hình khác nhau, thế UI được render ra có bị ảnh hướng gì không? 

Ở bài viết này, các bạn sẽ được tìm hiểu :
1. Sự khác biết giữa **points** và **pixels**
2. Khi nào dùng tỉ lệ ảnh 1x, 2x, 3x
3. Cách đặt tên với @2x, @3x
4. Cách giữ chất lượng hình ảnh với các màn hình kích thước và độ phân giải khác nhau
5. Recommended tools tạo nhanh ảnh 1x, 2x, 3x
-----


# Pixcels and Points
``Các đời Iphone khác nhau sẽ có kích thước và độ phân giải màn hình khác nhau`` 

So sánh Iphone 11 (6.1" - 828 x 1792)  và IPhone 11 Pro Max (6.5" - 1242 x 2688). Chả cần có kiến thức gì thì nhìn bằng mắt, bạn có thể thấy màn hình Iphone 11 Pro max cho hình ảnh chi tiết và sắc nét hơn. Lí do vì 2 màn hình này đều có tỉ lệ height/width bằng nhau nhưng tỉ  6.1/6.5 lớn hơn hiều so với 828/1242. Chứng tỏ trên cùng một không gian, các màn hình khác nhau có số lượng pixel là khác nhau hay pixels-per-inch (PPI) khác nhau

1. **Points**: Kích thước các **points** là bằng nhau, màn hình lớn hơn thì nhiều point hơn
2. **Pixcels**: Mỗi **point** sẽ chứa số lượng pixcels khác nhau, càng nhiều pixcels trong 1 point thì chi tiết càng rõ và nét hơn. Mỗi đời Iphone sẽ có **point** ứng với 1x1, 2x2, 3x3 **pixels**

**Bạn chỉ cần cung cấp độ phân giải khác nhau của 1 bức ảnh, iOS sẽ tự động chọn lựa ảnh phù hợp với độ phân giải của từng màn hình**
# Tỉ lệ ảnh 1x, 2x và 3x
Trăm nghe không bằng mắt thấy :v 
![](https://images.viblo.asia/e12db372-bb8c-44bb-9326-27fb069092ad.jpeg)
* Hàng trên: Khi chỉ dùng **pixel** để nói về độ phân giải, đây là **pixels tuyệt đối,** mỗi **pixel** có kích thước bằng nhau, nhiều pixels hơn thì ảnh lớn hơn.
* Hàng dưới: Khi dùng **points** và **pixels**. Với kích thước ảnh bằng nhau, nhưng **point** từ trái qua phải chứa số lượng **pixels** tăng dần, từ đó cho chất lượng hình ảnh rõ nét và chi tiết hơn. 1x, 2x và 3x ra đời từ đây, lần lượt ứng với 1x1, 2x2, 3x3 **pixels**

Thêm 1 VD thực tế nữa nhé (^.=)

Thể hiện cùng 1 tấm ảnh cùng kích thước trên iphone5 , iphone 11 và iphone 12
* IPhone 5 sử dụng ảnh 1x - 75x75 **pixels**
* Iphone 11 sử dụng ảnh 2x - 150x150 **pixels**
* Iphone 12 sử dụng ảnh 225x225 **pixels**
* Nhưng cả 3 ảnh trên đều cùng 1 kích thước là 75x75 **points**

``Again: Bạn chỉ cần cung cấp độ phân giải khác nhau của 1 bức ảnh, iOS sẽ tự động chọn lựa ảnh phù hợp với độ phân giải của từng màn hình``

Cách đặt tên để nhận biết 1x, 2x, 3x:
![](https://images.viblo.asia/050f2f2f-3bfb-4d15-b937-f26b21e5d78c.jpeg)
* `filename`.png (jpg,...v...v) mặc định là **@1X**
* `filename`@2x.png (jpg,...v...v) cho ảnh **@2X**
* `filename`@3x.png (jpg,...v...v) cho ảnh **@3x**
# Recommended tool tạo nhanh @2x, @3x và kích thước, tỉ lệ màn hình Iphone 
* Recommended để tạo nhanh 1x, 2x và 3x cho ảnh: https://hotpot.ai/blog/ios-1x-2x-3x-generator
* Kích thước các đời iPhone: https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions
* Tài liệu tham khảo: 
    * https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/image-size-and-resolution/
    * https://learnappmaking.com/image-scaling-ios-how-to/
-----

  # Tổng kết
  Awesome, tổng kết lại bài học hôm nay:
*   Sụ khác biệt giữa **points** và **pixels**
*   Khi nào và tại sao sử dụng 1x, 2x, 3x
*   Cách đặt tên cho file @2x, @3x
*   Cách render UI trên các màn hình có độ phân giải và kích thước khác nhau
*   Recommend tools tạo nhanh ảnh @1x, 2x và 4x'