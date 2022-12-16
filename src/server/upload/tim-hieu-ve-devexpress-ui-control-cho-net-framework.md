![](https://images.viblo.asia/0d49eed1-15d5-4f22-bb50-00fd2e228c9a.png)

Ở trong bài viết này, chúng ta sẽ cùng tìm hiểu về DevExpress - một trong những bộ UI Control tốt nhất dành cho framework .NET.

## DevExpress là gì?
Đối với những lập trình viên .NET thì DevEpress là một công cụ hết sức hữu dụng, cung cấp rất nhiều control trong Visual Studio. DevExpress không chỉ giúp thiết kế winform hay website đẹp hơn mà còn giúp cho việc lập trình được dễ dàng hơn, ta có thể thấy rõ nhất là trong việc tương tác với cơ sở dữ liệu.

DevExpress được ra mắt lần đầu tiên vào năm 2011 và được đông đảo lập trình viên .NET sử dụng. Từ đó đến này đã trải qua rất nhiều phiên bản với nhiều nâng cấp đáng kể. Phiên bản mới nhấtt hiện nay là v18.2. Với DevExpress ta có thể tự tạo cho mình một bộ Office riêng chỉ trong vòng một vài tiếng

## Thành phần của DevExpress
*  WinForms Controls: Cung cấp các control cho WinForms.
*  ASP.NET Controls: Cung cấp các control cho WebForms.
*  WPF Controls: Cung cấp các control cho WPF. 
*  Silverlight Controls: Cung cấp các control cho Silverlight. 
*  XtraCharts: Control cung cấp các loại biểu đồ. 
*  XtraReports: Cung cấp các control tạo báo cáo. 
*  XPO: Cung cấp môi trường làm việc với database. 
*  XAF: Một công nghệ mới giúp việc phát triển phần mềm một cách nhanh chóng.

## Cài đặt
Yêu cầu hệ thống:  
+ Microsoft .NET Framework từ 2.0 trở lên
+ Microsoft Visual Studio
+ SQL Server

Việc cài đặt DevExpress rất đơn giản nên mình sẽ không nói chi tiết phần này ra, các bạn có thể tải trên trang chủ của DevExpress https://www.devexpress.com/. Bản trial 30 ngày cho phép chúng ta tải miễn phí. Để có được nhiều control hơn ta cần phải tải bản trả phí với mức giá từ 699 - 2199$ tùy từng option.

## Control của DevExpress

Sau khi cài đặt xong, ngay khi mở Visual Studio ra chúng ta đã nhìn thấy mục chọn Template DevExpress
![](https://images.viblo.asia/1003dc25-f6fa-4f38-91e2-79df1975532e.jpg)

Khi click vào, ta chọn được các mẫu UI Winform hay Web Application khác nhau cho project.
| ![](https://images.viblo.asia/1417eab8-b276-4e5c-92fd-ab3fcdeaafc6.jpg)   |![](https://images.viblo.asia/8aeb1d4e-9ca3-46c2-882a-a02f9bce83e1.jpg) | ![](https://images.viblo.asia/29544efe-27a1-46b0-807d-e96a0d296e8e.jpg) |
| -------- | -------- | -------- |
|  ![](https://images.viblo.asia/098e02e9-a041-4f99-baab-96b16ea186f4.jpg)  |   ![](https://images.viblo.asia/3da4ad89-91ec-4ee4-9a0e-8a7f5ca344dd.jpg)   | ![](https://images.viblo.asia/768cf216-f167-4ebe-9e96-52a008a2eff7.jpg)     |

Không những vậy, DevExpress còn cung cấp những bộ UI tương tự Microsoft Office gồm nhiều chức năng tương tự như bản gốc.
![](https://images.viblo.asia/704d7053-9319-4c8e-91f5-c327ebbd555d.jpg)

Ta nhận thấy Visual Studio có thêm rất nhiều Control mới thay thế hầu hết các Control mặc định. DevExpress cung cấp thêm rất nhiều Control hữu ích mà Visual Studio chưa có như: RatingControl, CameraControl, ImageSlider, Ribbon Control, GalleryControl,....... Ta có thể tùy chỉnh được properties nhiều hơn cho Control và còn có một kho Icon cung cấp cho các Button.

Điểm mà mà mình thích nhất ở DevExpress là SkinRibbon Gallery, với nó ta có thay đổi được rất nhiều skin đẹp, độc lạ mắt cho Winform.

## Export file trong DevExpress
```
private void ExportExcel_Click(object sender, EventArgs e)
{
    DevExpress.XtraGrid.Views.Grid.GridView View = nhanSuGridControl.MainView as DevExpress.XtraGrid.Views.Grid.GridView;
    if (View != null) {
        View.ExportToXlsx("MainViewData.xlsx");
        Process excelexport = new Process();
        excelexport.StartInfo.FileName = "EXCEL.exe";
        excelexport.StartInfo.Arguments = "MainViewData.xlsx";
        excelexport.Start();
    }
}

private void ExportPDF_Click(object sender, EventArgs e)
{
    DevExpress.XtraGrid.Views.Grid.GridView View = nhanSuGridControl.MainView as DevExpress.XtraGrid.Views.Grid.GridView;
    if (View != null) {
        View.ExportToPdf("MainViewData.pdf");
        Process pdfexport = new Process();
        pdfexport.StartInfo.FileName = "AcroRd32.exe";
        pdfexport.StartInfo.Arguments = "MainViewData.pdf";
        pdfexport.Start();
    }
}
```
Trong DevExpress, ta thường thấy GridControl được sử dụng rất nhiều bởi vì sự tiện dụng trong cách xử lí với chúng. Mình có có một bài riêng để nói rõ hơn về GridControl trong DevExpress sau.  Ở đây mình có 2 function thực hiện chức năng export data từ Grid sang file định dạng .xlsx và .pdf. Với những ai đã từng làm function export data từ DataGridView mặc định thì thấy các function đó khi viết tương đối dài dòng và phức tạp. Nhưng nhờ sự hỗ trợ của DevExpress mà việc thao tác export dữ liệu trở nên nhanh chóng, dễ dàng hơn.
## Đánh giá tổng quát
### *Ưu điểm
- Hạn chế xuất hiện nhiều form riêng lẻ
- Có thể tự co giãn form bên trong form chính theo kích thước của form chính thay đổi
- Cung cấp rất nhiều UI đẹp cho Winform, Web
- Hỗ trợ rất nhiều Control hữu dụng
- Giúp việc lập trình trở nên nhanh, dễ dàng hơn
- Dễ quản lý
- Có nhiều tài liệu hỗ trợ
### *Nhược điểm
- Giá bản quyền cao, phiên bản đầy đủ có giá 2199$/năm
- Cài đặt nặng
- Bộ thư viện khá nặng và tốn thời gian khi load chương trình lần đầu

Trong những bài sau mình sẽ nói chi tiết hơn về GridControl và xây dựng một chương trình đầu tiên với DevExpress.

Cảm ơn tất cả mọi người đã dành thời gian đọc!!!!:heart_eyes::heart_eyes:

## Tài liệu tham khảo
https://docs.devexpress.com/