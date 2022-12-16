Một trong số những nguyên lý quan trọng của lập trình `module` mà sau này được mô hình lập trình hướng đối tượng `OOP` kế thừa lại và mở rộng, đó là tính năng đóng gói `Encapsulation`. Tính năng này được hỗ trợ bởi `Ada` từ rất sớm và hoạt động ở cấp độ `package`, giúp chúng ta ẩn đi những yếu tố hỗ trợ không cần cung cấp cho code bên ngoài sử dụng - ví dụ như các `sub-program` tiện ích hỗ trợ cho các `sub-program` chính để mở chia sẻ cho code bên ngoài.

## Private Area

Để ẩn đi các yếu tố tiện ích hỗ trợ cho các yếu tố chính xuất hiện trong giao diện lập trình `API` mà một `package` cung cấp ra bên ngoài, chúng ta sử dụng từ khóa `private` để chia code định nghĩa của `package` thành 2 phần riêng biệt:

- `Public` - Các thành phần được định nghĩa `trước` chỉ dẫn `private` sẽ có thể được tham chiếu bởi code sử dụng `package` từ bên ngoài.
- `Private` - Các thành phần được định nghĩa `sau` chỉ dẫn `private` sẽ chỉ có thể được tham chiếu bởi code sử dụng bên trong chính `package` đó hoặc các `child package`.

```encapsulation.ads
package Encapsulation is

   procedure Public_Put;

private

   procedure Private_Put;

end Encapsulation;
```

Và với code định nghĩa trong tệp cấu hình `Encapsulation.ads` như trên thì chúng ta sẽ không thể gọi `procedure Private_Put` trong tệp khởi chạy `main.adb`.

## Type Encapsulation

Riêng đối với code định nghĩa các kiểu dữ liệu, chúng ta sẽ có thêm lựa chọn khai báo trừu tượng ngắn gọn về các kiểu dữ liệu ở khu vực `public` và trỏ tới định nghĩa chi tiết được ẩn đi ở khu vực `private`. Như vậy code sử dụng ở phía bên ngoài `package` sẽ chỉ có được tên định danh và một số thông tin phụ trợ khác như nhãn `tagged` hay kế thừa từ kiểu nào `new Super_Type`, còn các thông tin chi tiết như định kiểu và tên của các trường dữ liệu sẽ được ẩn đi.

```src/humanity/humanity.ads
package Humanity is

   type Person is tagged private;
   procedure Put_Info (Self : in Person);

   type Craft is new Person with private;
   overriding procedure Put_Info (Self : in Crafter);

private

   type Person is tagged record
      Name : String (1 .. 12);
      Age : Integer;
   end record;

   procedure Put_Name (Self : in Person);
   procedure Put_Age (Self : in Person);

   type Crafter is new Person with record
      Level : Integer;
   end record;

   procedure Put_Level (Self : in Crafter);

end Humanity;
```

Hiển nhiên, nếu sử dụng tính năng này thì chúng ta sẽ phải cung cấp thêm các `sub-program` như trình khởi tạo `record`, hay các trình tiện ích như `Get` và `Set` để thực hiện các thao tác truy xuất và thiết lập giá trị tương ứng với các trường dữ liệu. Tính năng đóng gói ở cấp độ `record level` này được bổ sung ở phiên bản `Ada 95` cùng với `tagged type` và theo ý kiến chủ quan của mình thì có phần không hẳn phù hợp với mô thức tư duy đơn giản của `Procedural Programming`.

Vì vậy nên ở đây mình chỉ thực hiện giới thiệu sơ lược cú pháp mang tính chất tham khảo và sẽ không sử dụng `Type Encapsulation` trong các bài viết theo của Sub-Series này. Và có lẽ chúng ta không cần phải bổ sung code ví dụ cho các `sub-program` hỗ trợ cho code ví dụ ở trên, mà thay vào đó thì sẽ để dành sự tập trung cho các tính năng khác.

Bên cạnh các công cụ hỗ trợ tư duy `OOP` mà chúng ta đã điểm qua thì phiên bản cập nhật ngay sau `Ada 95` còn cung cấp thêm bộ đôi `Abstract Records & Interfaces`. Tuy nhiên để duy trì trọng tâm của Sub-Series `Procedural` này thì chúng ta sẽ không cần tìm hiểu thêm về các công cụ `OOP`.

Có lẽ công cụ quan trọng duy nhất vay mượn từ `OOP` mà chúng ta có thể cần tận dụng là `tagged type` và khả năng mở rộng. Bởi lúc này `Type'Class` đối với góc nhìn `Procedural` sẽ có phần giống với hợp kiểu `union` dành riêng cho các `record`. Công cụ này có thể thay thế cho khái niệm `variant record` đã có mặt trong các phiên bản trước `Ada 95` với cú pháp định nghĩa tách bạch và dễ đọc hơn.

Và trong bài viết tiếp theo, chúng ta sẽ chuyển sang một tính năng khác không thuộc về nhóm công cụ đặc trưng hỗ trợ `OOP`.

[[Procedural Programming + Ada] Bài 12 - Overloading Sub-programs & Generic Types](https://viblo.asia/p/y3RL1DjvJao)