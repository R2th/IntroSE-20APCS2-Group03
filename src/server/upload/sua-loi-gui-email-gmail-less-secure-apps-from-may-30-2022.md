# 1. Vấn đề gặp phải
Hiện tại rất nhiều ứng dụng sử dụng nhỏ gmail để gửi mail. (vì nó miễn phí và dễ sử dụng). Để có thể gửi được email thì người dùng cần bật **Less secure apps**. 
Theo như [thông báo](https://support.google.com/accounts/answer/6010255?hl=en#zippy=%2Cif-less-secure-app-access-is-on-for-your-account%2Cupdate-your-app-or-operating-system%2Cuse-more-secure-apps%2Cuse-an-app-password) mới nhất từ phía google., chức năng này đã bị disabled. Nên các email service đang sử dụng sẽ không hoạt động được nữa.

![image.png](https://images.viblo.asia/336a5cbf-542a-4d0d-84ae-d626001bba90.png)

Mình đọc thì thấy google hướng dẫn sử dụng **App Password** 
![image.png](https://images.viblo.asia/bce5880e-8a63-410b-acb5-ae40a2c168e1.png)
# 2. Cách giải quyết
## 2.1 Tạo app password 
Theo như [hướng dẫn](https://support.google.com/accounts/answer/185833),  cần phải enable 2-Step-Verification. 
![image.png](https://images.viblo.asia/d9d237dd-b438-4538-83fb-6ecb0ab3c855.png)

Rồi tạo 1 password mới 
![image.png](https://images.viblo.asia/798782a9-7449-4088-80b6-6e8ab76a1e93.png)
Trong **select app** chọn Other (custom name) 
Sau đó generate tạo app mới có 16 ký tự 
![image.png](https://images.viblo.asia/728f8244-d555-4a49-a338-4820cc6d867b.png)

Sử dụng password này như các password thông thường. 

## 2.2 Ví dụ 
Mình có làm 1 [hướng dẫn](https://github.com/ledangtuanbk/tutorials/tree/master/SpringEmail) nhỏ dùng Spring Email. sử dụng password này.

Để dùng: Thay đổi các thông tin theo thông tin email của bạn

```
spring.mail.username={my-username}
spring.mail.password={my-app-password}

receiver.email=myemail@gmail.com
sender.email=non-reply@gmail.com
```

Khi start hệ ứng dụng, email sẽ được gửi thành công

```
public class SampleSpringEmailApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(SampleSpringEmailApplication.class, args);
    }

    @Autowired
    EmailService emailService;

    @Override
    public void run(String... args) throws Exception {
        emailService.sendEmail("title", "content");
    }
}
```

# 3. Kết luận
Đây là vấn đề cá nhân mình gặp phải, mục đích ghi chú cho bản thân và chia sẻ choi mọi người nếu cần thiết.
Nếu cần trao đổi, mọi người hãy bình luận bên dưới. Cảm ơn vì đã đọc bài của mình.