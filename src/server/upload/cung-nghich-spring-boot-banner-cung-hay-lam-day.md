![](https://images.viblo.asia/e6b42025-9e2e-4973-966a-7f2d499a7a7e.png)

Bạn đã quá quen với hình ảnh này. Mỗi khi khởi động một ứng dụng với Spring Boot bạn đều bắt gặp nó. Thật chẳng có gì lạ khi một sản phẩm do bạn làm ra nhưng lại có chút dấu ấn của Spring Boot trong đó.

Vậy sao bạn không thử để lại dấu ấn riêng trong sản phẩm của mình? Tại sao không thay đổi hình ảnh đã quá ư nhàm chán kia thành một bức vẽ lộng lẫy hơn, mà biết đâu niềm vui trong công việc sẽ dâng trào :D

Vâng! Chúng ta sẽ cùng nghịch xem hình ảnh này được tạo ra thế nào và có thể thay đổi ra sao nhé :clown_face:

## Khái quát một tý về ảnh trên
Như bạn thấy đó, mỗi khi khởi động một ứng dụng Spring Boot, hình ảnh trên sẽ hiển thị ra đầu tiên trên command-line. Với cái này thì Spring Boot gọi là banner. Bạn có thể search thêm về "**Spring Boot Banner**" để tìm hiểu thêm nhiều thủ thuật về nó nhé.

Banner này có thể được thay đổi và bản thân Spring Boot cũng cho phép bạn thay đổi banner mặc định này thông qua các cài đặt mà nó cung cấp (dĩ nhiên khi thay đổi sẽ không phạm pháp hay vi phạm bản quyền gì đâu)

## Thử thay đổi banner mặc định
Thử mần theo mình nhé
1. Tại thư mục resources (../spring-boot-test/src/main/resources) tạo ngay cho mình 1 file: **banner.txt**
2. Viết vào đó vài chữ:
> -- I Love Spring --
> 
> (^^)
3. Chạy thử ứng dụng tức khắc sẽ thấy

![](https://images.viblo.asia/ed8d3b0f-4675-442e-b049-ba6962be9940.png)

Ôi chu choa mạ ơi. Mới "1 phút" thôi đã ra mất rồi :joy:

## Đi sâu hơn tý
Ngoài cách tạo một file txt đơn giản trên, bạn có thể chuyển một ảnh dạng png, jpg, gif,... tự động về dạng ASCII text và in ra ngay trên command-line. Làm thế nào ư? Trong **applicaton.properties**, chỉ cần thêm config: **spring.banner.image.location=path/fileảnh.đuôifile** (Bạn phải copy file ảnh vào **resources** trước nhé)


##### Một vài thứ hay ho khác:
+ Thay vì tạo file có tên ***banner.txt***, bạn có thể tạo một file có tên khác: ***i-love-you.txt*** trong **resources** và đừng quên thêm config: **spring.banner.location=i-love-you.txt** vào **applicaton.properties** để mới có thể in ra banner nhé.
+ Bạn có thể sử dụng một số biến trong file banner.txt: 
    + **${application.version}**: Version ứng dụng được khai báo trong MANIFEST.MF.
    + **${application.formatted-version}**: Version ứng dụng được khai báo trong MANIFEST.MF và định đạng cho hiển thị.
    + **${spring-boot.version}**: Hiển thị Spring Boot version.
    + **${spring-boot.formatted-version}**: Hiển thị Spring Boot version với định dạng cho hiển thị.
    + **${application.title}**: Tiêu đề của ứng dụng được khai báo trong MANIFEST.MF.
    + ${AnsiColor.NAME} và ${AnsiBackground.NAME}: Sử dụng để thay đổi màu nền console và màu chữ. Ở đây **NAME** là ANSI escape code.
+ Bạn có thể tắt banner bằng cách thêm config: springmain.banner-mode=off hoặc mần đoạn code sau với **SpringApplication.setBannerMode(Mode.OFF)**
```
@SpringBootApplication
public class SpringBootTestApplication {
  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(MainApp.class);
    app.setBannerMode(Mode.OFF); // Disable banner
    app.run(args);
  }
}
```

## Và đây là Nyan Cat huyền thoại
![](https://images.viblo.asia/a3851ace-af3b-4abd-8e90-6b384997cafd.png)

Và thuốc đây bạn nhé
> banner.txt
```
${AnsiColor.BRIGHT_BLUE}████████████████████████████████████████████████████████████████████████████████
${AnsiColor.BRIGHT_BLUE}████████████████████████████████████████████████████████████████████████████████
${AnsiColor.RED}██████████████████${AnsiColor.BRIGHT_BLUE}████████████████${AnsiColor.BLACK}██████████████████████████████${AnsiColor.BRIGHT_BLUE}████████████████
${AnsiColor.RED}████████████████████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████████████████████████████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}██████████████
${AnsiColor.BRIGHT_RED}████${AnsiColor.RED}██████████████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████${AnsiColor.MAGENTA}██████████████████████${AnsiColor.WHITE}██████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}████████████
${AnsiColor.BRIGHT_RED}██████████████████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}████${AnsiColor.MAGENTA}████████████████${AnsiColor.BLACK}████${AnsiColor.MAGENTA}██████${AnsiColor.WHITE}████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}██${AnsiColor.BLACK}████${AnsiColor.BRIGHT_BLUE}██████
${AnsiColor.BRIGHT_RED}██████████████████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██${AnsiColor.MAGENTA}████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}████${AnsiColor.BLACK}██${AnsiColor.MAGENTA}██████${AnsiColor.WHITE}██${AnsiColor.BLACK}████${AnsiColor.WHITE}████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}████
${AnsiColor.BRIGHT_YELLOW}██████████████████${AnsiColor.BRIGHT_RED}████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██${AnsiColor.MAGENTA}████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████${AnsiColor.MAGENTA}██████${AnsiColor.WHITE}██${AnsiColor.BLACK}██${AnsiColor.WHITE}██████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}████
${AnsiColor.BRIGHT_YELLOW}██████████████████████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_YELLOW}██████${AnsiColor.BLACK}██${AnsiColor.WHITE}██${AnsiColor.MAGENTA}████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████${AnsiColor.BLACK}████████${AnsiColor.WHITE}████████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}████
${AnsiColor.BRIGHT_YELLOW}████████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██${AnsiColor.BLACK}██${AnsiColor.BRIGHT_YELLOW}████${AnsiColor.BLACK}██${AnsiColor.WHITE}██${AnsiColor.MAGENTA}████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████████████████████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}████
${AnsiColor.BRIGHT_GREEN}██████████████████${AnsiColor.BRIGHT_YELLOW}██${AnsiColor.BLACK}██${AnsiColor.WHITE}██${AnsiColor.BLACK}████████${AnsiColor.WHITE}██${AnsiColor.MAGENTA}██████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████████████████████████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}██
${AnsiColor.BRIGHT_GREEN}██████████████████████${AnsiColor.WHITE}████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██${AnsiColor.MAGENTA}██████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████${AnsiColor.BRIGHT_YELLOW}██${AnsiColor.WHITE}██████████${AnsiColor.BRIGHT_YELLOW}██${AnsiColor.BLACK}██${AnsiColor.WHITE}████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}██
${AnsiColor.BRIGHT_GREEN}██████████████████████${AnsiColor.BLACK}████${AnsiColor.WHITE}████${AnsiColor.BLACK}██${AnsiColor.WHITE}██${AnsiColor.MAGENTA}██████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████${AnsiColor.BLACK}██${AnsiColor.WHITE}██${AnsiColor.BLACK}████${AnsiColor.WHITE}████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}██
${AnsiColor.BLUE}██████████████████${AnsiColor.BRIGHT_GREEN}████████${AnsiColor.BLACK}██████${AnsiColor.WHITE}██${AnsiColor.MAGENTA}██████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██${AnsiColor.MAGENTA}████${AnsiColor.WHITE}████████████████${AnsiColor.MAGENTA}████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}██
${AnsiColor.BLUE}██████████████████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}████${AnsiColor.MAGENTA}██████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████${AnsiColor.BLACK}████████████${AnsiColor.WHITE}████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}████
${AnsiColor.BRIGHT_BLUE}██████████████████${AnsiColor.BLUE}████${AnsiColor.BLUE}██████${AnsiColor.BLACK}████${AnsiColor.WHITE}██████${AnsiColor.MAGENTA}██████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████████████████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}██████
${AnsiColor.BRIGHT_BLUE}██████████████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██${AnsiColor.BLACK}████${AnsiColor.WHITE}████████████████████${AnsiColor.BLACK}██████████████████${AnsiColor.BRIGHT_BLUE}████████
${AnsiColor.BRIGHT_BLUE}████████████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}██████${AnsiColor.BLACK}████████████████████████████████${AnsiColor.WHITE}██${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}████████████
${AnsiColor.BRIGHT_BLUE}████████████████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}██${AnsiColor.BLACK}██${AnsiColor.WHITE}████${AnsiColor.BRIGHT_BLUE}████████████${AnsiColor.BLACK}██${AnsiColor.WHITE}████${AnsiColor.BLACK}████${AnsiColor.WHITE}████${AnsiColor.BLACK}██${AnsiColor.BRIGHT_BLUE}████████████
${AnsiColor.BRIGHT_BLUE}████████████████████████${AnsiColor.BLACK}██████${AnsiColor.BRIGHT_BLUE}████${AnsiColor.BLACK}██████${AnsiColor.BRIGHT_BLUE}████████████${AnsiColor.BLACK}██████${AnsiColor.BRIGHT_BLUE}████${AnsiColor.BLACK}██████${AnsiColor.BRIGHT_BLUE}████████████
████████████████████████████████████████████████████████████████████████████████
${AnsiColor.BRIGHT_BLUE}:: Meo Meo Nyan Cat :: Running Spring Boot ${spring-boot.version} :: \ö/${AnsiColor.BLACK}
```

Đẹp, hay thì cho em mèo Nyan Cat một vote lấy động lực ạ :kissing_heart:

![](https://images.viblo.asia/155f3206-e244-4c94-bcce-31cd4b81aac9.gif)

Hẹn gặp lại ở bài viết tới :)))