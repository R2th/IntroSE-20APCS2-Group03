Trong mẹo này, tôi thảo luận về TDD Class Generator Add-In của Eric Hexter cho Visual Studio. Add-In này cho phép bạn tạo một lớp, interface và lớp kiểm tra bằng cách nhập một phím tắt duy nhất.
Eric Hexter - người đã thực hiện công việc có giá trị trong dự án MvcContrib - đã đến thăm Microsoft vào tuần trước và cho tôi xem một trong những dự án hiện tại của anh ấy. Anh ấy đã bắt đầu một dự án xây dựng các Add-Ins cụ thể của ASP.NET MVC cho Visual Studio. Cụ thể, anh ta đã tạo ra một Bổ trợ để tạo các lớp có thể kiểm tra tự động.

Bạn có thể tìm hiểu thêm về dự án và tải xuống các tệp và mã nguồn từ trang web sau:

http://erichexter.googlecode.com/svn/trunk/TestFirstGenerator/

Bạn cũng có thể xem video hướng dẫn Add-In nhanh chóng tại:

http://erichexter.googlecode.com/svn/trunk/TestFirstGenerator/docs/ScreenCast.htmlm

Tải xuống tệp RecentVersion.zip và giải nén. Sau khi giải nén tệp lưu trữ, hãy đảm bảo rằng bạn nhấn chuột phải vào tệp, chọn Properties và bấm nút Unblock  (xem Hình 1). Nếu bạn quên Unblock kho lưu trữ, thì bạn sẽ gặp phải sự cố bảo mật khi cố gắng sử dụng Add-In.
Figure 1 – Unblocking the Archive
	![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NET.NETMVCSpecificVisualStudioAddIns_8D9D/clip_image002_thumb.jpg)

Sau khi bạn giải nén Add-In, bạn phải cài đặt Add-In trong Visual Studio. Tải xuống bao gồm tệp Install.cmd để cài đặt Add-In. Thật không may, trình cài đặt không hoạt động trên máy của tôi vì sự cố đường dẫn. Do đó, tôi đã làm theo các bước sau để cài đặt Add-In:

1. Tạo thư mục mới có tên AddIns trong thư mục Documents \ Visual Studio 2008.

2. Sao chép tất cả các tệp đã giải nén từ tải xuống vào thư mục AddIns mới

3. Sau khi khởi chạy Visual Studio, chọn tùy chọn menuTools, Add-In Manager và bật DD Class Generator Add-In (xem Hình 2).
Hình 2 - Kích hoạt TDD Class Generator Add-In
	![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NET.NETMVCSpecificVisualStudioAddIns_8D9D/clip_image004_thumb.jpg)

Phải thừa nhận rằng, rất nhiều dự án trong giai đoạn trẻ sơ khai. Đừng mong đợi một giao diện đột phá.

Trước khi bạn có thể sử dụng TDD Class Generator Add-In, trước tiên bạn phải tạo Ứng dụng web C # ASP.NET MVC mới. Hãy chắc chắn rằng bạn tạo một dự án thử nghiệm. Ngoài ra, bạn cần reference cho cả NUnit và Rhino Mocks vào dự án thử nghiệm của mình.

Sau khi bạn tạo một dự án mới, bạn sử dụng TDD Class Generator Add-In bằng cách chọn tùy chọn menu ools, Generate Class Under Test. Ngoài ra, bạn chỉ có thể nhập tổ hợp bàn phím Ctrl-Alt-Enter. Phương thức khởi chạy Add-In sẽ hiển thị hộp thoại trong Hình 4.

Hình 3 - Sử dụng TDD Class Generator
	![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NET.NETMVCSpecificVisualStudioAddIns_8D9D/clip_image006_thumb.jpg)

Hình 4 – TDD Class Generator Dialog    
    	![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NET.NETMVCSpecificVisualStudioAddIns_8D9D/clip_image008_thumb.jpg)
        
        Chọn tên của dự án ứng dụng của bạn và tên của dự án thử nghiệm của bạn từ danh sách thả xuống. Nếu bạn hoàn hộp thoại bằng cách nhập giá trị mô hình cho vị trí thư mục và Movie cho tên lớp và nhấp vào Tạo nút (tốt, Generat nút trên máy tính của tôi) sau đó các tập tin sau đây được tạo ra trong dự án ứng dụng tự động:

```
\Models\Impl\Movie.cs

\Models\IMovie.cs
```

Và, tệp sau đây được tạo tự động trong dự án thử nghiệm:

`\Models\MovieTester.cs`

Mục tiêu của tool là đưa bạn đi đúng hướng. Nó không chỉ tạo ra một lớp Movie . Thay vào đó, nó tạo ra một lớp Movie thực hiện một interface. Nó cũng giả định rằng bạn sẽ cần phải mock một lớp. Do đó,TDD Class Generator tự động thêm logic mô phỏng vào lớp MovieTester.cs.

Tôi nghĩ cách tiếp cận của Eric Hexter là một cách tiếp cận tuyệt vời để giúp xây dựng các ứng dụng ASP.NET MVC dễ dàng hơn. Ngay bây giờ, có rất nhiều tác vụ tạo tệp lặp đi lặp lại liên quan khi đưa ứng dụng ASP.NET MVC mới ra khỏi nền tảng (Đặc biệt nếu bạn muốn thực hiện mọi thứ đúng cách). Bằng cách xây dựng một thư viện các Add-Ins cụ thể của ASP.NET MVC, bạn có thể loại bỏ các tác vụ vô bổ, tẻ nhạt này.

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-27-create-asp-net-mvc-specific-visual-studio-add-ins