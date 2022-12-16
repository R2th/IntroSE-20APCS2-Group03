# 1. Giới thiệu:
   - Là công nghệ bảo mật sinh trắc học mới được Apple giới thiệu lần đầu trên Iphone X , Face ID dùng để nhận diện khuôn mặt người thay thế hoàn toàn cho Touch ID nhằm mục đích xác thực bảo mật. Với FaceId người dùng có thể mở khoá iphone, hay xác thực các giao dịch một cách nhanh chóng, tiện lợi và bảo mật hơn
   - Hôm nay tôi sẽ hướng dẫn các bạn sử dụng FaceID để xác thực cho ứng dụng IOS


# 2. Yêu cầu:
   - Các thiết bị hỗ trợ Face ID
    - IOS 10 trở lên


# 3. Bắt đầu:
   - Tạo project mới có một button AutheticationWithFaceID:
![](https://images.viblo.asia/f2ddb05d-5acc-47f2-83b7-238672036ea7.png)
    - Import thư viện LocalAuthentication:
        - thư viện này giúp ta có thể sử dụng các chức năng xác thực sinh trắc học của iphone.
         ![](https://images.viblo.asia/1a1be92b-f991-414a-b44e-a17cb7bffc46.png)
    - Tạo context LA và error :
        - Class LAContext() giúp ta thực hiện các chức năng liên quan đến xác thực sinh trăc học như touchid hay faceID.
        - Biến error giúp hiển thị lỗi trong qua trình sử dụng xác thực. 
            ![](https://images.viblo.asia/1ed6eca1-5493-4d51-87fc-52a9b5f603ac.png)
            
    - Đoạn code dưới đây giúp chúng ta kiểm tra xem thiết bị có hỗ trợ xác thực bằng FaceID hay không :
        ![](https://images.viblo.asia/e0d8a0c3-a2c1-4198-bebe-0a12b5c981b9.png)
        
    - Tiếp theo nếu thiết bị được hỗ trợ , thực hiện xác thực bằng FaceID :
                             ![](https://images.viblo.asia/3f9be902-b333-45a3-bb92-3d91485ea40f.png)
    - Ta cấp quyền sử dụng FaceID cho ứng dụng trong file info.plist :
        ![](https://images.viblo.asia/47725262-07bf-4a5f-b413-8d0d49077f11.png)
    
#      4.Chạy thử ứng dụng :
 
 ![](https://images.viblo.asia/c3503e33-65cd-4a59-99c7-c2132c124772.png)
 - Chọn Matching Face để giả định xác thực gương mặt thành công.
 
    ![](https://images.viblo.asia/cfdbcb61-3695-48e2-8cec-9d4621d7659b.png)
    
     ![](https://images.viblo.asia/ab31e776-7065-4120-b1e4-8fe19b3ab100.png) 
 - Chọn Non Matching để giả định xác thực gương mặt không thành công.

![](https://images.viblo.asia/385be41b-5ed0-4c47-8871-c699c74c826b.png)

![](https://images.viblo.asia/33333746-a2fc-40f7-8544-3eb2b6a89fd8.png)

![](https://images.viblo.asia/471e3463-4654-4c72-ba9f-68930912eccb.png)

Mong bài viết này sẽ giúp các bạn có thể sử dụng FaceID để xác thực cho ứng dụng của mình 


References: https://www.hackingwithswift.com/read/28/4/touch-to-activate-touch-id-face-id-and-localauthentication