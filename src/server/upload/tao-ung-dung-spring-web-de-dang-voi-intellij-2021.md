Chào các bạn, trong những bài viết trước chúng ta đã tạo dự án springweb với Eclipse. Hôm nay mình sẽ hướng dẫn các bạn thực hiện trên intellij nhé  
> phiên bản mình sử dụng là intellij ultimate 2021. Các bạn có thể tải về và dùng bình thường


-----


Đầu tiên, mình tạo mới project. Chọn file > new > project    
![1.png](https://images.viblo.asia/a6bff0c6-1cf9-42e4-b173-baf357324a2c.png)  

Sau đó mình chọn spring và cài đặt như sau và nhấn next  
![2.PNG](https://images.viblo.asia/9e47503b-12b6-4b21-938d-1522878620ee.PNG)  
*các bạn có thể chọn JDK bao nhiêu cũng được nhưng phải ver8 trở lên nhé*  

Tìm đến web và chọn vào springweb. sau đó nhấn finish  
![3.PNG](https://images.viblo.asia/167d9ce5-f913-4e4a-8514-3a52770f61cc.PNG)  

Sau đó, tìm đến file EmHocSpringWebApplication tại EmHocSpringWeb > src > main > java > EmHocSpringWebApplication  
![4.PNG](https://images.viblo.asia/38fd3e6b-14b5-4dcd-88ec-7a5438155a6d.PNG)  

Viết phương thức sayHello như sau rồi bấm run  
![6.PNG](https://images.viblo.asia/12032ae4-ce78-443b-a370-5a0aede67876.PNG)
```java
package com.example.emhocspringweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class EmHocSpringWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmHocSpringWebApplication.class, args);
    }

    @GetMapping("/hello")
    public String sayHello(){
        return "Hello world, hello spring";
    }
}
```
Chờ khoảng 2s, màn hình console hiện ra **đã bắt đầu chạy ứng dụng springweb**  
![7.PNG](https://images.viblo.asia/4e6be547-2486-4af5-9ac4-e8073e0c7c14.PNG)

Bây giờ, hãy mở trình duyệt web của bạn lên (của mình là google chrome) và gõ vào thanh URL :   **localhost:8080/hello**  . Kết quả nhận được trên trang web là:  
![8.PNG](https://images.viblo.asia/a48d84cb-0bdb-4fa2-b559-23b291e878a5.PNG)

Vậy là xong rồi. Chúc bạn thành công nhé 😘