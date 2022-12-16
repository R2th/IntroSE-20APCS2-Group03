Hồi trước khi mới code mình sử dụng DataTable theo các project có sẵn. Sau này cảm thấy DataTable có vài điểm bất lợi nên đã tìm cách khác để tối ưu hơn. Một nguyên nhân nữa là mình thường xử lý các Form nhập liệu dạng lưới. Để tăng tốc quá trình tạo Form thì cần thiết kế code sao cho dễ copy paste và chỉnh sửa (chỉ thay đổi name, type các trường dữ liệu), không phải tốn thời gian Design giao diện. Sau đây mình sẽ nêu lý do và cách giải quyết những vấn đề mà mình gặp phải. Nếu anh em có cách nào hay xin nhờ góp ý.

Để ví dụ mình có 1 BindingList và 1 DataTable 

![](https://images.viblo.asia/79d43ebc-0657-4174-b7c7-467d1b320213.png)

### 1) Dùng Linq dễ hơn

![](https://images.viblo.asia/b32f06cc-c8b8-4039-9c22-db59d0f14ef2.png)


### 2) Hạn chế lỗi chính tả khi truyền chuỗi string FieldName

![](https://images.viblo.asia/26a1402e-9678-40e4-b65a-5fb0ed5ef24a.png)

- Mình sử dụng tạo cột động của gridView khi gán DataSource. Cho nên trong trường hợp cần truy xuất 1 Cell bất kỳ của lưới sẽ sử dụng method **nameof()** của C# 6.0. Ví dụ:

![](https://images.viblo.asia/588aa5de-64a0-4d8b-960c-0521db918a75.png)

- Ngoài ra khi cần thay đổi tên 1 Column trên Database, trên Code cũng cần thay đổi theo 
=> Nếu sử dụng truyền string FieldName vào thì việc Find and Replace khá bất tiện. Ngược lại nếu dùng List thì chỉ cần vào class Model đổi tên và để Visual Studio refactor những thằng liên quan

### 3) Sử dụng Data Annotation để setting cột 
 - Không cần phải mở design trên giao diện hoặc viết code. Sử dụng DataAnnotation sẽ giúp chúng ta giải quyết nhanh những vấn đề Format trên lưới
 
![](https://images.viblo.asia/ef818fc6-c714-45e3-9a56-caea5f465951.png)

### 4) Binding 2 chiều với INotifyPropertyChanged và thư viện PropertyChanged.Fody

- Khi chúng ta muốn thay đổi 1 Cell nào trên lưới thì thường phải dùng: 
    
```
gridView.SetRowCellValue(gridView.FocusedRowHandle, nameof(Sample.Date), dummyDate);
```

- Vậy khi thay đổi dưới DataSource BindingList<Sample> thì dữ liệu trên lưới sẽ thay đổi thế nào?
    
```
int index =  gridView.GetDataSourceRowIndex(gridView.FocusedRowHandle);
    
listSample[index].Date = dummyDate;
```
    
- Tuy DataSource đã thay đổi nhưng dữ liệu trên lưới vẫn như cũ. Nếu muốn lưới cập nhật thì phải dùng:
    
```
gridView1.RefreshRowCell()
```
    
```
gridView.RefreshRow() 
```

- Mình muốn khi có thay đổi dưới DataSource thì trên lưới thay đổi luôn chứ không phải mất công refresh data => Sử dụng INotifyPropertyChanged và PropertyChanged.Fody

![](https://images.viblo.asia/3ede12ce-a7b3-44a9-9da7-e6d370e2c941.png)

- Thư viện Fody tự động add property notification cho tất cả các class thực thi INotifyPropertyChanged => Khi có bất cứ thay đổi trên BindingList<Sample> thì gridControl sẽ nhận được thông báo và tự động cập nhật dữ liệu mới thấy đổi trên lưới

### 5) Sử dụng mô hình MVP 
Trên Presenter, việc xử lý logic, tính toán sẽ dễ hơn khi sử dụng object class. Việc viết Unit Test cũng dễ dàng hơn