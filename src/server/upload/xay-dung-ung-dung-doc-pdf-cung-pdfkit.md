## Lý thuyết
### PDF là gì?
**PDF** là tài liệu sử dụng định dạng *Adobe Corporation’s Portable Document*, tài liệu dạng **pdf** có thể bao gồm text, image. Nhờ nhiều ưu điểm của mình, **pdf** hiện nay được sử dụng vô cùng phổ biến.

### PDFKit
**PDF kit** xuất hiện từ *iOS 11*, được Apple xây dựng giúp chúng ta có thể dễ dàng hiển thị các file **pdf** và xử lý các tác vụ liên quan đến **pdf**.

Các thành phần chính của **PDF Kit**: **PDFView**, **PDFSelection**, **PDFDestination**. Trong đó chúng ta sẽ chủ yếu làm việc với** PDFView** Class và **PDFDocument** Class
* **PDFView** Class:
	**PDFView** Class là một sub class của **UIView** . Chúng có tác dụng hiển thị dữ liệu của file **pdf**, bắt các action từ người dùng như select *content*, *zoom*.. Thậm chí user còn có thể sử dụng *drag-and-drop* file **pdf** vào để đọc.
* **PDFDocument**: 
	Thể hiện dữ liệu của các file **pdf**. **PDFDocument** có thể được khởi tạo từ *url* của file **pdf** hoặc trực tiếp từ *data* . **PDFView** sẽ lấy dữ liệu từ đây để hiển thị
## Xây dựng ứng dụng
Trước hết chúng ta cần import **PDFKit** tạo **PDFView** như **UIVIew** thông thường:
```swift
        let pdfView = PDFView(frame: view.frame)
        view.addSubview(pdfView)
```
Lớp **PDFView** bao gồm nhiều biến và *func* khác nhau, nhưng quan trọng nhất đó chính là biến *document* thuộc kiểu **PDFDocument**, biến này sẽ thể hiện cho tài liệu **pdf** mà chúng ta hiển thị:
```swift
 // -------- document
    
    // Methods for associating a PDFDocument with a PDFView.
    open var document: PDFDocument?
```
Việc tiếp theo cần làm là tạo **PDFDocument** và gán vào biến document của *pdfView*, như mình đã nói ở trên **PDFDocument** có thể khởi tạo từ *url* của **pdf** file hoặc từ *data* của nó. Ở đây mình sẽ khởi tạo từ *url*:

```swift
let url = Bundle.main.url(forResource: "KeSiTinh", withExtension: "pdf")
let pdfDocument = PDFDocument(url: url!)
```
Tới đây chúng ta cùng chạy app, app đã có thể hiện thị file pdf tuy nhiên màn hình không thể hiện thị hết 1 trang :

![](https://images.viblo.asia/4d74e5dc-48e5-48ee-8cc1-57a45456c606.png)

để khác phục điều này **PDFView** có một thuộc tính: *autoScales*:
```swift
pdfView.autoScales = true
```

![](https://images.viblo.asia/2ab1e726-421c-4930-83f8-676895bca635.png)

Chúng ta cũng có thể custom thêm thông qua nhiều thuộc tính khác như *displayMode*, *displayDirection*, *interpolationQuality* ...
Ngoài ra **PDF kit** cũng cung cấp rất nhiều các *func* trong *notificaiton*, *delegate* giúp chúng ta có thể dễ dàng sử lý các vấn đề login liên quan:
![](https://images.viblo.asia/f075b018-1930-49b0-9941-876fdf8c16f2.png)
![](https://images.viblo.asia/c089b357-cda4-45d9-9385-ae1e282f1535.png)

Đến đây các bạn đã có thể tạo được một ứng dụng có tính năng đọc **pdf** rồi. Bài viết của mình xin được kết thúc tại đây, cảm ơn các bạn đã theo dõi!