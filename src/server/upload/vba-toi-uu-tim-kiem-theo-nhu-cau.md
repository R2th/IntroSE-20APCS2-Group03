Chào các bạn, nay mình sẽ làm cái gì đó mới mẻ hơn ngoài Unity, mình cũng mới có cơ hội tìm hiểu về mấy cái này, thấy cũng khá thú vị, vì vậy xin chia sẻ ở góc độ cá nhân để chúng ta cùng bàn luận nhé! ;)

Bài toán của mình là: với khối lượng dữ liệu lớn, mình cần đưa ra 1 dialog để user có thể tìm thấy dữ liệu cần thiết 1 cách đầy đủ và trực quan.

Việc tìm kiếm về mặt cơ bản thì trong các công cụ tìm kiếm của Office anh Mic đã làm khá ổn rồi, nhanh và tiện lợi, tuy nhiên nó đôi khi khó theo dõi với dữ liệu nhiều hoặc có sự "gần gần giống nhau của dữ liệu".

Vậy mình có thể làm gì để nó tốt hơn?

Thay vì tìm kiếm 1 giá trị, rồi nó trỏ tới Cells đó, sau đó tra ngang ra để lấy các giá trị cùng tập dữ liệu với giá trị cần tìm, thì giờ mình sẽ show tất cả chỉ sau 1 cú click nhé ;)

Ok, nói nhiều rồi, xem hình trên chắc các bạn cũng phần nào tưởng tượng ra rồi, giờ mình vào việc nhé ;)

![](https://images.viblo.asia/5a30e887-e227-4e1f-ab0d-77aa6fbd0260.PNG)

Bước chuẩn bị: Các bạn tạo 1 dữ liệu giả giống mình để tiện debug nhé!
- Các bạn chú ý bỏ qua row 1 để chúng ta làm công cụ search nhé!

![](https://images.viblo.asia/1d71c589-5346-4ae1-b3a0-ea55372f13e7.PNG)

Bước 1: Bật chế tab Developer.
- Vì nếu không bật chế độ này, chúng ta sẽ không thể custom theo ý muốn mà chỉ có thể dùng những gì có sẵn do mic làm ra, vì vậy cần bật nó lên đầu tiên nhé ;)
- File -> Options -> Customize Ribbon -> Main tabs -> check vào Developer -> OK

![](https://images.viblo.asia/e158883b-b789-4cfb-96a4-100fd823042c.PNG)

Bước 2: Tạo Ô Search và Button Search.
- Các bạn ghép 1 vài cells và để tạo ô Search cho nó đẹp nhé, ko muốn thì dùng 1 ô cũng được, nhưng dữ liệu search dài nhìn nó sẽ ko còn đẹp nữa ;)

![](https://images.viblo.asia/ffe69de5-6c12-46e5-9110-9d813645ea4c.PNG)

- Tại tab Developer các bạn ấn vào Insert -> Button (Form Control) -> click vào vị trí trong file bạn muốn đặt nút.

![](https://images.viblo.asia/a86cd755-6e42-4d83-8d1f-82e6fad39dd6.PNG)

- Sửa tên nút thành "Search"

![](https://images.viblo.asia/b18509dc-ff5b-492c-8ce6-9952a1adedab.PNG)

Bước 3: Code cho phần search.
- Tại tab Developer các bạn ấn vào nút Visual Basic

![](https://images.viblo.asia/75dffd2d-f393-48ca-bf87-5df58f024177.PNG)

- Các bạn chuột phải vào VBAProject rồi chọn Insert chọn Module

![](https://images.viblo.asia/8500d696-6866-4fed-87b8-c238fae10cca.PNG)

- Double click vào Module vừa tạo để có thể code.

![](https://images.viblo.asia/33aa87a6-1a23-4606-8b10-898cbd155160.PNG)

- Các bạn code giống như đoạn code dưới của mình:

![](https://images.viblo.asia/7135b5c3-4247-450b-9071-b74775f6897f.PNG)

- Giải thích sơ bộ thuật toán của mình như sau:
    + Mình tạo ra 2 biến là dòng và cột để lưu vị trí tìm thấy đối tượng khớp với giá trị cần tìm kiếm.
    + Mình duyệt qua danh sách các cells thuộc range có thể tìm kiếm để tìm ra giá trị khớp với ô tìm kiếm.
    + Nếu khớp thì tiếp theo mình gán index của dòng và cột đó cho biến dòng và cột tạo ở trên.
    + Với trường hợp tìm thấy mình sẽ bắt đầu tạo content cho MsgBox mình sẽ show ra.
    + Với trường hợp không tìm thấy thì cũng sẽ có MsgBox show ra với nội dung là không tìm thấy.

Bước 4: Ghép nút Search và hàm Search() vừa viết xong.
- Các bạn chuột phải vào nút Search vừa tạo ở bước 2, sau đó chọn  Assign Macro...

![](https://images.viblo.asia/93557b37-f051-43ec-a0f2-398ad5f2f4d5.PNG)

- Chọn Macro Search mà chúng ta vừa viết ở trên rồi ấn OK.

![](https://images.viblo.asia/e440040e-1187-4dcb-80e2-58c7b76f4193.PNG)

Bước 5: Test
- Các bạn thử nhập tên 1 người cần tìm kiếm vào ô tìm kiếm, sau đó ấn nút Search xem có đúng không nhé!
- Các bạn cũng thử nhập sai xem kết quả sao nhé ;)

Công cụ này mình chưa có kế hoạch hoàn thiện 100% vì chưa có nhu cầu sử dụng, vì vậy phần engine search còn sơ sài, nếu có nhu cầu tối ưu các bạn có thể custom thêm theo hướng search all, search by, ...

Chúc các bạn thành công ^_^