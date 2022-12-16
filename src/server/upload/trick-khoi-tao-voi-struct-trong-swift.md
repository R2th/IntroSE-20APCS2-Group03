Hôm nay chúng ta thấy một ví dụ rất ngắn về trình khởi tạo trong Swift.
Struct tự động nhận hàm khởi tạo các thuộc tính nếu chúng không xác định bất kỳ hàm khởi tạo tùy chỉnh nào.
Không giống hàm khởi tạo mặc định, Struct nhận được hàm khởi tạo thành viên ngay cả khi nó có các thuộc tính được lưu trữ không có giá trị khởi tạo.

## Vấn đề
*Bạn muốn giữ hàm khởi tạo mặc định trong Struct của mình và bạn cũng muốn có hàm khởi tạo tùy chỉnh.*

Để minh họa vấn đề, hãy xem đoạn code dưới đây:

``` swift
struct Human {
    let name: String
    let height: Double
}
``` 

Bây giờ bạn có thể cố gắng tạo cho bạn Human và ...

![image.png](https://images.viblo.asia/6c2f8da2-1d96-4af8-bdd5-46f7786b3ebf.png)

 Thật tuyệt vời! Swift đã tự động làm hàm khởi tạo cho chúng ta. 
 Nhưng điều gì sẽ xảy ra nếu đối với bạn, chiều cao của Con người không liên quan và bạn chỉ muốn đặt tên. 
 Bạn có thể làm điều đó chỉ cần thêm một hàm khởi tạo tùy chỉnh vào Human Struct như sau:
 
 ``` swift
 struct Human {
    let name: String
    let height: Double

    init(name: String) {
        self.name = name
        height = 0
    }
}
 ```
 
Có một điều không ổn đã xảy ra, vì bây giờ chúng ta đã mất khả năng tạo ra một Human có chiều cao khác với chiều cao mặc định:
![image.png](https://images.viblo.asia/1ca4b57c-c7db-4b32-bf44-51dc405e40df.png)

Như bạn có thể thấy, Human Struct đã mất hàm khởi tạo mặc định vào thời điểm chúng tôi xác định hàm khởi tạo tùy chỉnh cho nó. 
Bây giờ chúng ta hãy kiểm tra xem chúng ta có thể khôi phục lại hàm khởi tạo mặc định như thế nào.

## Giải pháp
Giải pháp là một thủ thuật đơn giản. Nếu chúng tôi di chuyển trình khởi tạo tùy chỉnh sang một phần mở rộng của struct Human, chúng tôi vẫn nhận được cả hai hàm khởi tạo.

 ``` swift
struct Human {
    let name: String
    let height: Double
}

extension Human {
    init(name: String) {
        self.name = name
        height = 0
    }
}
 ```
 
  Kết quả là:
  ![image.png](https://images.viblo.asia/1d79e7ee-2f3b-487b-a29f-6cc9c2e28c6a.png)
  
  Bạn đã đạt được điều mình mong muốn :))
  
  ### Nguồn: 
  https://holyswift.app/a-trick-to-keep-the-structs-default-memberwise-initializer-in-swift