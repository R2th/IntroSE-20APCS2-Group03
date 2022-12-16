Giờ đây các thiết bị điện thoại và tablet ngày càng phổ biến, nhất là hệ điều hành iOS của Apple. Chính vì thế mà ngày càng có nhiều nhu cầu về responsive trên các trình duyệt mobile. Và từ đây chúng ta rất có thể sẽ bị vướng vào các thể loại rắc rối nảy sinh trong quá trình xây dựng giao diện trên mobile. Vậy nên bài viết này sẽ gợi ý một số cách để có thể debug trên mobile nhé! 

## Sử dụng Developer tool trên Chrome
Đây là một trong những cách dễ dàng và phổ biến nhất để chúng ta có thể tìm ra bug và fixbug một cách nhanh chóng.
- Bước 1: Click Inspect hoặc kiểm tra 
![](https://images.viblo.asia/4e0f335b-20b4-4648-b38b-639f644a11d9.png)

- Bước 2 : Click vào icon hình điện thoại phía trên cùng
Một sidebar sé hiện thị ra ở bên dưới hoặc phía bên tay phải của trình duyệt. Đây chính là nơi chúng ta có thể debug và fixbug. Click vào icon hình điện thoại phía trên cùng để mở ra phần hiển thị cho mobile
![](https://images.viblo.asia/5242cb8d-e305-4d88-9f06-cceebdf0823b.png)

- Bước 3: Chọn thiết bị mobile hoặc tablet mong muốn
Sau khi click vào icon hình điện thoại, một thanh bar trên cùng sẽ xuất hiện, bạn chỉ cần click vào phần responsive và chọn thiết bị mình mong muốn là xong .
![](https://images.viblo.asia/3ec92a0a-6702-4df4-8ab4-8772e0a6406f.png)

Ngoài ra bạn có thể ấn Edit để trình duyệt show full các thiết bị hoặc nếu thiết bị bạn mong muốn không có, bạn có thể 'Add custom device...' và điền các thông số vào là được.

## Sử dụng Xcode trong Mac
Đối với người dùng Mac thì đây là một lợi thế lớn vì sao ư vì chúng ta có thể dùng một công cụ khá hay ho trên hệ điều hành Mac OS đó là Xcode. Đây là công cụ giúp chúng ta có thể giả lập một thiết bị iOS bất kì ngay trên Mac một cách chính xác từng pixel và tất nhiên chúng ta cũng có thể debug ngay và luôn. 

Sau khi tải bản Xcode về thì các bạn hãy mở nó lên và làm theo hướng dẫn sau:
- Bước 1: Ở thanh tabbar chọn Open Developer Tool > Simulator
![](https://images.viblo.asia/769e7ae3-770c-430d-a79d-b71fa141b34c.png)

- Bước 2: Sau khi Simulator được kích hoạt, nó sẽ tự động mở một thiết bị bất kì, nếu đó không phải là thiết bị các bạn mong muốn thì có thể chọn thiết bị khác bằng cách sau. Vào thanh Hardware > Device > iOS > chọn thiết bị mong muốn
![](https://images.viblo.asia/d2d972e2-6c6c-4b59-8ed8-1ac753017f59.png)

- Bước 3: Thiết bị mà các bạn mong muốn sẽ xuất hiện như một thiết bị thật. Ở bước này hãy kiên nhẫn một chút nhé vì có thể chạy hơi lâu một chút ^^
![](https://images.viblo.asia/19f1ea41-665b-4335-8188-3327920971da.png)

- Bước 4: Bật trình duyệt Safari trên Mac lên. Vào thanh Develop > Simulator 
![](https://images.viblo.asia/ca4fd64a-4234-4559-a3e4-f8634ca898b4.png)

- Bước 5: Debug thôi ^^
![](https://images.viblo.asia/5c4aca7f-bb32-4cc7-bce2-8e3830a5ba3d.png)

## Sử dụng một phần mềm thứ 3
Ngoài 2 cách trên mình cũng giới thiệu cho các bạn thêm một cách nữa đó là sử dụng các ứng dụng bên thứ ba. Một trong những tool mạnh mẽ nhất đó là [Blisk](https://blisk.io/). Blisk hoạt động giống như Simulator của Xcode, nhưng đa dạng mọi thiết bị từ Android đến iOS. Cách dùng cũng dễ dàng và thuận tiện. 
Ngoài ra cũng có những trình duyệt khác mà có thể bạn cũng sẽ muốn sử dụng như [Viewport Resizer](http://lab.maltewassermann.com/viewport-resizer/), [responsinator](https://www.responsinator.com/),...

Bài viết trên đây đã giới thiệu cho các bạn các cách có thể debug trên các thiết bị mobile và tablet. Giờ đây không chỉ các Dev mà ngay cả QA, BA, PM hay bất cứ ai cũng có thể debug một cách dễ dàng. Nếu bạn có thêm những trình duyệt gì nữa đừng quên chia sẻ dưới phần comment nhé! Cảm ơn các bạn đã đọc bài!