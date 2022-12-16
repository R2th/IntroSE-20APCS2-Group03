## Introduction
![](https://images.viblo.asia/2936dd04-abff-418d-a880-45537baf7b41.png)

**Ag-grid** là một thư viện js được dùng hỗ trợ việc hiển thị dữ liệu dưới dạng table trong javascript và các framework của nó. Đồng thời nó cũng cung cấp các chức năng tiện lợi trong việc thao tác với table như sắp xếp, lọc, lấy dữ liệu của hàng đã chọn, cập nhật thông tin, export CSV... 

Trong bài viết này chúng ta sẽ tìm hiểu về Client-side và Server-side Row Model trong Ag-grid.
## Client-side Row Model
Một trong những **Row Model** dễ sử dụng nhất là **Client Side Row Model**, Row model này sẽ lấy tất cả dữ liệu để hiển thị ra view, kèm theo đó là các tính năng rất hữu dụng:
* Filtering
* Sorting
* Grouping
* Aggregation
* Pivoting

**Client Side Row Model** là row model mặc định trong Ag-grid và được sử dụng hầu hết trong các trường hợp và chịu trách nhiệm hiển thị các rows trong grid. Cấu trúc dữ liệu của nó khá phức tạp, biểu diễn dữ liệu dưới nhiều trạng thái (state) khác nhau:

### State 1: Row Data
Dữ liệu được cung cấp bởi application. Grid không bao giờ chỉnh sửa cấu trúc của các data này mà đơn thuần chỉ lấy ra các `rowData` items của nó:

![](https://images.viblo.asia/5bdb215c-19b1-4879-aff2-8669e396cc87.jpg)

### State 2: All Rows
`allRows` gần giống với `rowData` ngoại trừ việc nó sẽ tạo ra một Array mới chứa các `row nodes`, mỗi node sẽ trỏ chính xác đến data item. Độ dài của `allRows` array giống với `rowData` array.

![](https://images.viblo.asia/4194a0f8-6ab9-47f0-8c3b-e18697ae0a21.jpg)

### State 3: Rows After Group
Đúng như tên gọi, `rowsAfterGroup` sẽ lấy `allRows` và group lại data nếu cần, trong trường hợp không có group nào, `rowsAfterGroup` sẽ trở thành giống như `allRows`. Vd dưới đây chỉ ra việc grouping các màu lại với nhau, tạo ra 2 group:

![](https://images.viblo.asia/cb3b6c50-dcb9-46c6-8cf2-c5eb64ff074e.jpg)

**API**: Khác với các state khác, để sử dụng được state này thì chúng ta sẽ phải gọi đến `api.forEachNode()`

### State 4: Rows After Filter
`rowsAfterFilter` sẽ đi sâu vào `rowsAfterGroup` để filter data. Vd ở dưới chỉ ra filter màu đen (bằng việc loại bỏ nhóm red)

![](https://images.viblo.asia/c628c076-5410-4ca1-b393-3024aaf03816.jpg)

**API**: Sử dụng `api.forEachNodeAfterFilter()` để dùng state này

### State 5: Rows After Sort
`rowsAfterSort` sẽ đi sâu vào `rowsAfterFilter` để sort data: 

![](https://images.viblo.asia/cc120f7e-4c02-4d3f-a1e2-63268ff5296e.jpg)

**API**: sử dụng `api.forEachNodeAfterFilterAndSort()` để dùng state này.

### State 6: Rows After Map
`rowsAfterMap` maps data thành những dạng theo ý muốn ở bên trong grid, vd như các node đang open và close:

![](https://images.viblo.asia/f2883950-a461-4f85-a272-ece18b031d7d.jpg)
![](https://images.viblo.asia/9c1850f0-0895-41f1-9421-3f5f005cae36.jpg)

**API**: sử dụng `api.getModel()` sau đó `model.getVirtualRowCount()` và `getVirtualRow()` để lấy ra các nodes.

## Server Side Data
Tùy thuộc vào những gì chúng ta cần, Grid có thể config theo các row models khác nhau. Các row models khác nhau theo cách mà data được load, chúng ta có thể load ra toàn bộ data và để tất cả cho Grid xử lý như **Client-side Row Model**, hoặc có thể giữ lại phần lớn data trên server và dùng lazy-load để xử lý data còn lại đang hiển thị phía user (Infinite, Viewport và **Server-side Row Model**)

Dưới đây là tổng hợp sự khác nhau giữa các row models:

| Row Model| Description |
| -------- | -------- |
|  Client-side  | là row model mặc định, Grid sẽ load tất cả data trong 1 lần request, sau đó thực hiện việc filter, sort, group, pivoting và aggregation  |
|Infinite |hiển thị dữ liệu cho user và load thêm data tương ứng với mỗi lần scrolls down, thường được sử dụng trong trường hợp số lượng lớn data |
|Server-side |được xây dựng dựa trên Infinite, cho phép lazy-load khi user scroll down, nhưng thêm vào đó là nó cho phép lazy load cả các data đã được group lại với server-side grouping và aggregatión |
|Viewport | Grid sẽ thông báo cho server chính xác những data nào đang được hiển thị (row đầu tiên và cuối cùng) và server sẽ chỉ cung cấp data tương ứng với các rows đó. Viewport thường được sử dụng trong trường hợp chúng ta muốn server hiểu được chính xác user đang thấy những gì, nó rất hữu dụng trong trường hợp update lượng lớn data-streams khi server chỉ cần update các user tương tác với các row mong muốn. |

Grid cũng hoạt động dựa trên mô hình MVC, mỗi data items được gói gọn vào trong các **Row node** và được lưu trữ ở **Row model**. Cơ chế rendering của Grid được gọi là **Row Renderer** và chúng đóng vai trò quan sát sự thay đổi của các row models và cập nhật DOM tương ứng.

Dưới đây là sơ đồ đơn giản của mối quan hệ giữa các class chính liên quan đến row model:

![](https://images.viblo.asia/199f819b-9ee5-4807-8fe7-d09fd82983ff.PNG)

Luồng hoạt động của sơ đồ có thể tóm tắt lại như sau:
* Grid chỉ có duy nhất một `RowRenderer` instance. `RowRenderer` bao gồm các liên kết đến PaginationProxy để đảm bảo việc render 1 row tại từng thời điểm.
* Grid chỉ có duy nhất một `PaginationProxy` instance. `PaginationProxy` sẽ không làm gì nếu phân trang không được kích hoạt và chỉ chuyển tiếp tất cả requests đến row model hoặc thực hiện phân trang nếu phân trang được kích hoạt. `PaginationProxy` chỉ có duy nhất 1 `RowModel instance`.
* Chúng ta có thể config Grid để sử dụng bất cứ row model nào có sẵn. Một `RowModel` bao gồm list của các RowNodes hoặc DataSource có thể lazy-load được các `RowNodes`
* Một `RowNode` có một liên kết đến một `RowData` item (được cung cấp bởi client application). `RowNodes` có thông tin trạng thái về row item, vd như khi nào nó được select hoặc chiều dài..
* Khi có sự thay đổi về state trong `RowNodes`, `RowModel` sẽ gọi đến **modelUpdated** event để refresh `RowRenderer`, chẳng hạn như khi data được sort, filter, group...

## Summary
Bài viết nhằm giới thiệu về Client Side Data và Server Side Data của thư viện **Ag-grid**. Bài viết còn nhiều hạn chế, cảm ơn các bạn đã dành thời gian theo dõi.

Nguồn:
* https://www.ag-grid.com/javascript-grid-client-side-model/
* https://www.ag-grid.com/javascript-grid-row-models/