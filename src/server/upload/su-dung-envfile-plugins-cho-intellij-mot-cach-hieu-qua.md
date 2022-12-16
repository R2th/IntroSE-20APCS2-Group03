**Bài viết này dành cho các bạn đang sử dụng IntelliJ **

# 1. Đặt vấn đề
Trong quá trình phát triển các project Java, để có thể truyền biến môi trường, thông thường khi debug chúng ta sẽ phải sửa Runtime Configuration, thêm từng cặp Key-Value vào. 
![image.png](https://images.viblo.asia/fcf20ee4-c8b1-484a-a777-2a47fa2e9638.png)

Nếu chúng ta chỉ có 1 vài biến thì sửa rất nhanh, nhưng nếu chúng ta nó nhiều module, mỗi module có mấy chục biến
- Rất dễ nhầm
- Tốn thời gian
- Mỗi lần sửa lại phải báo cả team vào config để sửa. 
# 2. Giải pháp
## 2.1 Sửa dụng EnvFile Plugins 
EnvFile plugins ra đời cho phép chúng ta import cả file chứa tất cả các cặp Key-Value vào. 
![image.png](https://images.viblo.asia/308d92bb-30a7-4427-ac87-4abfdda71c21.png)

Sau khi cài xong plugins, restart lại IDE, vào configuration config
![image.png](https://images.viblo.asia/11248576-3eee-4674-87a4-5566f6e30d73.png)

Ví dụ: trong applcation.properties có tham số 
```
my.data=${MY_SYSTEM_PROPERTY:default_value}
```

mình sẽ tạo 1 file **en.test.env**

```
MY_DATA=this is my data value
```

Quá dễ dàng và thuận tiện.

Tuy nhiên, nếu bận nào đã từng có kinh nghiệm về Java thì sẽ thấy có vấn đề:
-> Đây là plugin cho IDE, nó sẽ chạy tốt trong môi trường IDE, khi chạy ứng dụng (run .jar file), bằng cách nào đó, chúng ta sẽ phải truyền các giá trị này lúc runtime. 

## 2.2. Run jar file 
Chúng ta sẽ phải truyền vào system property. 
```
java -jar -DMY_SYSTEM_PROPERTY=tuan target/*.jar
```
Cách này khá thủ công, mình chưa tìm được giải pháp nào có thể truyền cả file environment vào. 
Nếu bạn nào có giải pháp thì comment bên dưới giúp mình. Thông thường mình sẽ dùng docker để chạy. Nó cho phép truyền biến môi trường vào.

## 2.3. Run docker image with file environment. 
Mình sẽ build ra 1 image 
```
mvn clean package && docker build -t java_app .
```

sau đó run docker image, truyền thêm file biến môi trường vào. Trong ví dụ mình để file biến môi trường ở thư mục **~/Documents/en.test.env**

```
docker run -it --name my_app --env-file ~/Documents/en.test.env java_app
```

Sau khi run, ta thấy giá trị trong file biến môi trường được load lúc runtime. 
```
    @Value("${my.data}")
    String myData;

    @Bean
    CommandLineRunner commandLineRunner(){
        return args -> {
            System.out.println("myData = " + myData);
        };
    }
```

khi start ứng dụng
```
myData = cong hoa xa hoi chu nghia viet nam
```

## 2.4. Run with docker-compose 

Tạo file docker-compose.yml với nội dung như bên dưới.

```
version: '3'
services:
  test:
    container_name: my_app
    env_file:
    - ~/Documents/en.test.env
    image: java_app
```

Tương tự bạn có thể chạy với file docker-compose.yml, cách làm tương tự.

## 2.5 Source code

Toàn bộ source code mình có chia sẻ trên [github](https://github.com/ledangtuanbk/tutorials/tree/master/EnvironmentVariables). 

# 3. Kết luận
Đây là vấn đề cá nhân mình gặp phải, mục đích ghi chú cho bản thân và chia sẻ choi mọi người nếu cần thiết. 
Nếu cần trao đổi, mọi người hãy bình luận bên dưới. 
Cảm ơn vì đã đọc bài của mình.