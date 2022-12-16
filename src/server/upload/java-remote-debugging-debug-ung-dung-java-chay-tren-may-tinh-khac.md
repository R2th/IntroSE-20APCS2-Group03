**Bài viết này dành cho các bạn đang sử dụng IntelliJ**

# 1. Đặt vấn đề
Trong một số trường hợp, ứng dụng của bạn chạy trên máy local, nhưng gặp lỗi trên môi trường khác (test, production). 
Thông thường mình sẽ làm như sau: 
* Thêm Log vào các khu vực nghi ngờ để kiểm tra, rồi check log (cách thông dụng)
* Lấy code nhánh bị lỗi, cố gắng chạy local để kiểm tra (Khó thực hiện, có thể bị hạn chế với network policy, các biến môi trường có thể khác, đôi khi không chính xác 100%). 

Mình sẽ đưa ra thêm một cách nữa (**Remote Debugging in IntelliJ**) giúp chúng ta có thể debug được ứng dụng đang chạy. 
# 2. Giải pháp
## 2.1 Run ứng dụng ở chế độ debug
Mình có tạo 1 [simple service ](https://github.com/ledangtuanbk/tutorials/tree/master/RemoteDebuggingIntelliJ)
Khi chạy nó sẽ export 1 api /test/get
```
@RequestMapping("/test")
public class TestController {
    @GetMapping("/get")
    public String getData(){
        LocalDateTime localDateTime = LocalDateTime.now();
        return localDateTime.toString();
    }
}
```

Bước 1 clone project về. 
Vào thư mục, build jar file 
```
cd RemoteDebuggingIntelliJ
mvn clean package 
```

Kết quả được file Jar ở thư mục 
```
target/RemoteDebuggingIntelliJ-0.0.1-SNAPSHOT.jar
```

Bạn có thể chạy file jar ở 1 máy khác trên mạng internet, mạng lan hay chính localhost. 
Để cho phép debug, chúng ta sẽ phải thêm vài option vào để chạy. 
với java 5-8
```
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005
```

JDK 9 and later
```
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005
```

**Port 5005 có thể thay bằng port khác**

Trong trường hợp này mình sử dụng java 11. 
câu lệnh của mình sẽ là 

```
java -jar -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 RemoteDebuggingIntelliJ-0.0.1-SNAPSHOT.jar 
```
Ứng dụng được start và listen socker ở port 5005

![image.png](https://images.viblo.asia/88430b8e-b200-4223-bc85-435768a81d75.png)


## 2.2 Run IntelliJ để debug ứng dụng

Mở project trên IntelliJ, chọn Edit Configuration 
![image.png](https://images.viblo.asia/34272bc0-0745-4b23-9f2c-7ea428162512.png)

Add new configuration, chọn Remote JVM Debug 
![image.png](https://images.viblo.asia/d1434121-3ad8-4dbb-8450-6d3c1fce6bc8.png)

Configure Host (Server chạy ứng dụng ) Port 5005 ở trên -> Apply  
![image.png](https://images.viblo.asia/bc94d723-f82d-401e-90d1-ad24647f37a6.png)

Sau khi start ứng dụng, nếu thành công sẽ có message kiểu này (34.124.158.186 là server mình chạy ứng dụng). 
`Connected to the target VM, address: '34.124.158.186:5005', transport: 'socket'`
![image.png](https://images.viblo.asia/70630035-7b87-4eeb-8775-bcec3cad0d64.png)

Đặt break point và call api thử tới service mình đang chạy. (của mình sẽ call đến http://34.124.158.186:8080/test/get) Tùy vào server các bạn public ra, sẽ thay url khác nhau 

Thấy Break Point is hit. 
![image.png](https://images.viblo.asia/f255ad4c-bc54-4d53-abf9-32a0329eb55f.png)

## 2.3 Source code

Toàn bộ source code mình có chia sẻ trên [github](https://github.com/ledangtuanbk/tutorials/tree/master/RemoteDebuggingIntelliJ). 

# 3. Kết luận
Mình đưa ra thêm 1 cách để các bạn có thể giải quyết khi gặp vấn đề, tùy từng bài toán sẽ chọn cách phù hợp. Không có cách nào là tốt nhất. 
Nếu cần trao đổi, mọi người hãy bình luận bên dưới. 
Cảm ơn vì đã đọc bài của mình.
# 4. Tài liệu tham khảo
* https://www.jetbrains.com/help/idea/tutorial-remote-debug.html
* https://www.baeldung.com/intellij-remote-debugging