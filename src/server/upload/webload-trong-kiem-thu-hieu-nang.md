Trong những năm gần đây, WebLOAD nổi lên như một công cụ kiểm thử hiệu năng hiệu quả và được giới chuyên môn đánh giá cao và tin dùng.
Bằng cách thu thập lại nguồn tham khảo từ nhiều tài liệu khác nhau và thực hành theo, chuỗi bài viết này nhằm giới thiệu kiến thức cơ bản nhất mà QA cần nắm về WebLoad và bước đầu có thể áp dụng nó vào trong công việc kiểm thử của mình. 

# Cơ bản về WebLoad

WebLOAD là một công cụ kiểm thử độ chịu tải được phát triển bởi RadView. Một điều lưu ý rằng tên gọi WebLoad không đơn thuần chỉ là cung cấp các tính năng cho các hệ thống web cần test độ chịu tải, mà còn được dùng trong việc test nhiều hệ thống của các doanh nghiệp nữa (như Oracle, SAP, v.v...)

Trước tiên, bạn có thể tải bản dùng thử của WebLoad bằng cách cung cấp thông tin tại đây https://www.radview.com/webloaddownload/ . Bạn sẽ nhận được email có chứa link và chỉ việc nhấp vào link đó để tải WebLoad về. 

Trước khi cài đặt, bạn cần đảm bảo những điều sau:

1. Thực hiện cài đặt bằng cách nhấp chuột phải và chọn *Run as Administrator*.
2. Khuyến cáo người dùng nên để chọn các giá trị mặc định trong lúc cài đặt.
3. Hai port cần để mở thông qua Firewall cho TCP và UDP trên WebLoad Console là cổng 9000 và cổng 9100.

**Cài đặt WebLOAD**:

1. Nhấp phải vào tệp tin tải về có đuôi *.exe* và chọn **Run as Administrator**.
2. Nhấp chọn Đồng ý vời điều khoản thỏa thuận bản quyền, sau đó chỉ cần Next với các lựa chọn mặc định và hoàn thành việc cài đặt.

![](https://images.viblo.asia/9e67b32b-8b88-4e09-94c1-d9df473f4120.png)

Trước khi hoàn thành, WebLoad console sẽ mở lên tự động để chạy một số câu lệnh cần thiết. 

![](https://images.viblo.asia/0481c571-feca-47a6-a9c5-b59e172a1d4b.png)

Console sẽ tự động đóng và lúc này trên cửa sổ cài đặt, bạn chỉ việc nhấp **Finish** để hoàn tất việc cài đặt WebLOAD của mình.

3. WebLoad được khởi động lên ngay sau khi bạn hoàn thành việc cài đặt để tiếp tục cập nhật bản quyền cho WebLoad.

4. Sau khi việc cập nhật bản quyền thành công, bạn sẽ có 3 lựa chọn như trên hình: 

![](https://images.viblo.asia/c6ada1d6-0ae3-41f2-b01f-30fdc362f6e4.png)

**Một số tính năng nổi bật của WebLOAD bạn cần nắm**

#1. Thực hiện tạo test đơn giản: Bạn có thể khởi tạo và xem các load script của mình nhanh chóng nhờ vào chức năng ghi lưu cũng như các tùy chọn playback.

#2. Ngôn ngữ mã kịch bản Javascript thuần thích hợp cho các logic phức tạp hơn cũng như trong việc sử dụng các thư viện chức năng.

#3. Có hỗ trợ tích hợp Selenium và Perfecto Mobile để đo lường các  trải nghiệm người dùng thực tế. 

#4. Tạo test load trực tiếp tại doanh nghiệp hoặc trên cloud bằng cách sử dụng tích hợp AWS.

#5. Tích hợp với các công cụ APM trong việc xác định được nguyên nhân gốc của các vấn đề.

#6. Tích hợp plugin Jenkins trong  việc kết hợp kiểm thử chịu tải vào các quá trình delivery liên tục.

#7. Hỗ trợ nhiều công cụ phân tích tối ưu cũng như các báo cáo có khả năng tùy chỉnh.

#8. Dashboad dạng web giúp cho việc xem kết quả kiểm thử dễ dàng và trực quan hơn.

# Demo
1. Ở màn hình Welcome to WebLoad, nhấp chọn bước 1. Creating & Editing Scripts để mở WebLoad IDE lên. 
2. Chọn **Create a new project**. Như bạn thấy bên dưới, bằng cách sử dụng WebLoad IDE, bạn có thể ghi chép, khởi tạo và thực thi các test script dễ dàng. 
![](https://images.viblo.asia/a826a531-bcaf-4052-9e23-a4b283f14dd1.png)

3. Để ghi lưu lại, đơn giản bạn chỉ cần nhấp chọn button **Start** và nhập URL mà bạn cần ghi lưu và chọn trình duyệt bạn muốn như bên dưới và sau đó nhấp chọn **OK**.
![](https://images.viblo.asia/4f25ab64-e6be-4ce2-ab59-f37473f18c91.png)

Quay lại trang URL mà bạn đã nhập vào và thực hiện các bước, các hoạt động trên web bạn muốn ghi lưu lại. Nhấp chọn button **Stop** khi bạn muốn dừng lại và một dialog sẽ hiện ra cho bạn chọn lựa auto-correlate hay không.

Dưới đây là snapshot về việc ghi lưu lại các bước bạn làm ở chế độ HTTP Headers View. Ngoài ra bạn có thể chuyển đổi qua lại giữa các view, như từ Javascript đến Page hay HTML ....

![](https://images.viblo.asia/797981cb-938a-495a-a16f-7f459c78a773.png)

Ngoài ra, bạn có thể bổ sung thêm các bước như sleep, transaction, comment, sync bằng cách nhấp phải vào Agenda Tree như bên dưới. 

![](https://images.viblo.asia/d5a92fa1-815c-42f2-93cb-171cbf9cceee.png)

..............................................................

**Tài liệu tham khảo:** 
* https://www.radview.com/about-webload/features/webload-cloud/
* https://www.softwaretestinghelp.com/webload-load-testing-tool-review/