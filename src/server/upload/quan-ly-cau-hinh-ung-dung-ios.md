Trong phát triển sản phẩm chúng ta thường phải chạy ứng dụng trên rất nhiều môi trường như môi trường phát triển (develop), môi trường kiểm thử (staging), môi trường sản phẩm (production),..., tuỳ vào mỗi dự án có thể yêu cầu ít hay nhiều môi trường khác nhau nhưng chắc chắn rằng việc phát triển các phần mềm chuyên nghiệp các bạn sẽ phải chạy trên nhiều hơn một môi trường.

Đối với mỗi môi trường lại có những cấu hình khác nhau : server url, biến, tham số, file,...

Vậy việc gì xảy ra nếu mỗi lần chuyển đổi môi trường mà chúng ta lại phải cấu hình mọi thứ một cách thủ công ?
- Tốn thời gian
- Có thể quên một số thứ dẫn đến sai sót không đáng có.

Quá nhiều rủi ro có thể xảy ra, đó chính là lý do tại sao chúng ta cần một công cụ để có thể tránh được những phiền phức trên.

Trong bài viết này, mình sẽ nói về cách sử dụng Scheme và Configurations để có thể quản lý các tham số cấu hình trên các môi trường khác nhau.

## Step1 :  Tạo Configurations

Đầu tiên chúng ta sẽ tạo một project **HelloWorld**

Sau khi tạo xong, chọn **Project Navigator -> Info** chúng ta thấy rằng Xcode tạo sẵn 2 cấu hình là **Debug** và **Release**

![](https://images.viblo.asia/c7811d30-f8ae-49eb-8eb2-af13676efc67.png)

Để tạo một cấu configurations riêng chúng ta có thể đổi tên và chỉnh sửa các configurations hiện tại hoặc chọn **+** để thêm configurations. Khi chọn + chúng ta sẽ thấy yêu cầu duplicate 1 trong configurations hiện tại 

![](https://images.viblo.asia/b88efa19-08ef-4763-ba75-f5086540bb98.png)

Okay giờ chúng ta sẽ tạo một configurations là **Debug_Stg** dùng cho môi trường staging.

![](https://images.viblo.asia/32bd5c26-e847-4ef5-b419-c1a6969c7217.png)

## Step2 :  Tạo Scheme

Cũng giống như configurations, khi chúng ta tạo ứng dụng Xcode cũng tự động sinh ra một schema mặc định cùng tên với project luôn. Ở đây scheme mặc định chính là Hellowrld

![](https://images.viblo.asia/8c9eba97-891b-4aba-adf7-d58dcfc3ee50.png)

Xem một chút xem scheme này có gì nhé. Chọn **Edit Scheme**

![](https://images.viblo.asia/7c58e25d-15ce-47cf-b8d1-962b31bd412d.png)

Để ý chúng ta thấy rằng Scheme này đã được setup để sử dụng 2 configurations mặc định đó là **Debug** và **Release**

Well, giờ thì công việc của chúng ta chỉ đơn giản là tạo ra 1 scheme mới và dùng configurations vừa tạo thôi, rất đơn giản đúng không nào.

Okay giờ chúng ta sẽ tạo ra một scheme tên là HelloWorl_Stg luôn cho đồng bộ nhé. Chọn **New Scheme**

![](https://images.viblo.asia/11b7a01a-da4d-40e6-a3bb-fc698ade2025.png)

Xong rồi giờ chúng ta đi cấu hình cho scheme thôi,. Open scheme và chọn scheme vừa tạo 

![](https://images.viblo.asia/33c4429d-d641-4094-9f88-30a9712f8390.png)

Chúng ta sẽ được thành quả như thế này

![](https://images.viblo.asia/3de84981-1f78-460a-9c4b-f1d4b2427efa.png)

Sau đó chọn **Edit Scheme**, và chúng ta sẽ chỉnh sửa scheme ở đây, như hình này thì mình đã thấy Debug_Stg của mình xuất hiện rồi đây. Nếu các bạn mà còn chưa làm được thì làm lại từ đầu nhé :v

![](https://images.viblo.asia/ccba93dc-2a49-466e-abef-619ae28af016.png)


## Step2 :  Run

Okay Configurations và Scheme thì cũng đã tạo xong rồi , giờ chúng ta xem có thể cấu hình những gì nhé . 
Chọn **Targets -> Build Settings** và search **Debug**, chúng ta sẽ thấy rất nhiều thứ liên quan tới setting ở đây

![](https://images.viblo.asia/75603454-d542-4078-8368-60284e93aec3.png)

Mình thử làm một phần nhỏ xem thế nào nhé, bây giơ mình sẽ thay đổi flag. Search **Other Swift Flags** và thêm 2 flag là -DDEV và -DSTG 

![](https://images.viblo.asia/7685d31f-aa0c-45ab-95fd-af230a3707cd.png)
```
struct Server {
        #if DEV
        static let domainName = "https://dev.com"
        #elseif STG 
        static let domainName = "http://stg.com"
        #else
        static let domainName = "https://pro.com"
        #endif
    } 
```

Rồi chọn scheme và chạy thử xem nhé :v:

## Kết

Ok vậy là không còn nỗi sợ các bugs phát sinh khi chuyển đổi môi trường nữa. Hi vọng bài viết hữu ích !

Thanhks for watching.