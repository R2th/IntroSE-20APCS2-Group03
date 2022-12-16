Angular cung cấp các móc vòng đời (lifecycle hooks), chúng cho phép chèn thêm những tác vụ cần thiết trong những khoảnh khắc quan trọng trong quá trình khởi tạo cho đến khi phá hủy các component.
Chúng ta có thể khai thác những khoảnh khắc quan trọng trong vòng đời đó bằng cách triển khai một hoặc nhiều interfaces trong thư viện lõi Angular.

Mỗi giao diện có một phương thức hook duy nhất có tên là tên interface có thêm tiền tố ng. Ví dụ: interface `OnInit` có một phương thức hook có tên `ngOnInit()` mà Angular gọi ngay sau khi tạo component:

```
export class Foo implements OnInit {
  constructor(private logger: LoggerService) { }

  // implement OnInit's `ngOnInit` method
  ngOnInit() { this.logIt(`OnInit`); }

  logIt(msg: string) {
    this.logger.log(`#${nextId++} ${msg}`);
  }
}
```

## Trình tự vòng đời

![](https://images.viblo.asia/4a2dc72f-f6f7-458b-95e6-9c1ec72a337c.png)

Sau khi khởi tạo một component / directive bằng cách gọi hàm `constructor` của nó, Angular gọi các phương thức hook theo trình tự sau tại các thời điểm cụ thể:

| Hook | Mục đích & thời điểm |
| -------- | -------- |
| `ngOnChanges()`     | Thự thi khi Angular thiết lập các thuộc tính đầu vào ràng buộc dữ liệu. Được gọi trước `ngOnInit()` và bất cứ khi nào một hoặc nhiều thuộc tính đầu vào ràng buộc dữ liệu thay đổi.     |
| `ngOnInit()`     | Khởi tạo directive / component sau khi Angular hiển thị các thuộc tính ràng buộc dữ liệu và đặt các thuộc tính đầu vào của directive / component. Được gọi một lần, sau `ngOnChanges()` đầu tiên. |
| `ngDoCheck()`     |Phát hiện và hành động theo những thay đổi mà Angular không thể hoặc sẽ không tự mình phát hiện. Được gọi trong mỗi lần chạy phát hiện thay đổi, ngay sau `ngOnChanges()` và `ngOnInit()`. |
| `ngAfterContentInit()`     |Thự thi sau khi Angular thêm nội dung bên ngoài vào view của component / view mà directive được đưa vào. Được gọi một lần sau `ngDoCheck()` đầu tiên.|
| `ngAfterContentChecked()`     |Thự thi sau khi Angular đã kiểm tra nội dung bên ngoài đã được đưa vào view của component. Được gọi sau `ngAfterContentInit()` và mọi `ngDoCheck()` tiếp theo.|
| `ngAfterViewInit()`     |Thự thi sau khi Angular khởi tạo các view của component và các view con / view mà directive được đưa vào. Được gọi một lần sau `ngAfterContentChecked()` đầu tiên.|
| `ngAfterViewChecked()`     |Thực thi sau khi Angular kiểm tra các view của component và các view con /view mà directive được đưa vào. Được gọi sau `ngAfterViewInit()` và mọi `ngAfterContentChecked()` tiếp theo.|
| `ngOnDestroy()`     |Dọn dẹp ngay trước khi Angular phá hủy directive / component. Hủy đăng ký Observables và tách trình xử lý sự kiện để tránh rò rỉ bộ nhớ. Được gọi ngay trước khi Angular phá hủy directive / component.|