Chào các bạn! Như các bạn cũng đã biết, ARcore đã được google giới thiệu một thời gian, với những khả năng vượt trội giúp nó được cộng đồng lập trình viên đón nhận tích cực, tuy nhiên thời gian đầu nó chỉ hỗ trợ điện thoại galaxy s8 và google pixel, điều này khiến khả năng tiếp cận thị trường của nó bị giới hạn khá nhiều!

Tuy nhiên, thời điểm hiện tại nó đã hỗ trợ nhiều thiết bị hơn, và đó chính là lúc chúng ta có thể tiếp cận nó và phát triển cho sản phẩm của mình!

Ở bài viết này, mình sẽ hướng dẫn các bạn tích hợp ARcore vào Unity, phải nói mình thật sự ấn tượng với khả năng detect mặt phẳng của nó đấy ;)

Bắt đầu thôi nào!

* Bước 1: Chuẩn bị phần mềm:
    + Android SDK version 7.0 trở lên.
    + Unity bản 2017.3.0f2 trở lên.
    + Và cuối cùng là plugin ARcore SDK for Unity ([Link](https://github.com/google-ar/arcore-unity-sdk/releases/download/v1.1.0/arcore-unity-sdk-v1.1.0.unitypackage))

    ![](https://images.viblo.asia/174312fb-3199-45c7-8d66-0fccc1e5e62e.jpg)
    
* Bước 2: Chuẩn bị phần cứng:

    ![](https://images.viblo.asia/3acf8e94-9c06-4b52-845f-11b6077abe3f.jpg)
    
P/s: Ở thời điểm mình viết bài này thì số lượng thiết bị được hỗ trợ đã khá nhiều, vì vậy ae có thể dễ dàng kiếm được máy test nhé ;)
* Bước 3: Đưa ARcore vào trong dự án Unity:

    ![](https://images.viblo.asia/c4260bc3-0d4c-4f37-96a2-1097def50f0e.jpg)
    
    ![](https://images.viblo.asia/8b350abc-c742-49fe-893e-236c7fc6a1be.jpg)

* Bước 4: Cấu hình cài đặt build:
    
    ![](https://images.viblo.asia/43d45ce0-cbc6-4770-a7dc-2448f87bf883.jpg)
    
    ![](https://images.viblo.asia/6df8d74c-c75b-44bf-8c23-1ea90ae6f886.jpg)
    
    ![](https://images.viblo.asia/be56b1fc-7715-4b6a-97a5-640e6aabbbb7.jpg)
    
* Bước 5: Thêm scene vào để build:
    
    ![](https://images.viblo.asia/da2f1352-fe7d-4faf-a2db-52ef405e59e0.jpg)
    
* Bước 6: Build ra và tận hưởng thôi  ;)

    ![](https://images.viblo.asia/d234076a-41e6-4c22-93fb-d4f88881ca5e.jpg)
    
Như các bạn cũng thấy, việc tích hợp ARCore vào trong Unity thật sự rất đơn giản đúng không nào? rào cản lớn nhất của ARcore có lẽ là việc nó yêu cầu phiên bản android khá cao, và phấn cứng cũng yêu cầu phức tạp hơn, có lẽ nó cần thêm thơi gian để đạt được mức độ phổ biến như Vuforia.

Nhưng mình tin rằng với sức mạnh của ARCore, với việc phát triển trực tiếp bởi google thì ARCore sẽ không chỉ là những màn phô diễn kĩ thuật, mà sẽ sớm được đưa vào đời sống nhiều hơn, từ những trò chơi giải trí, cho tới những công cụ hỗ trợ cuộc sống hết sức ý nghĩa!

Một số tính năng mà ARCore có:
    
- Theo dõi chuyển động:

![](https://images.viblo.asia/59e99802-6bc0-4044-8340-8e4f651177d7.jpg)
    
- Hiểu về môi trường:

![](https://images.viblo.asia/145842cb-c3cf-4fda-82b1-d9b3f73777fe.jpg)
    
- Đánh giá mức độ ánh sáng:

![](https://images.viblo.asia/d361a8c6-ccf5-432a-bc52-0fb06b80345f.jpg)

   + Tương tác với người dùng: giúp bạn có thể tương tác với các đồ vật trong thế giới thực tế ảo bằng cách tương tác trên màn hình điện thoại!
   + Điểm định hướng: ARCore sẽ tìm ra các điểm đặc trưng của mỗi mặt phẳng, dựa vào các điểm đặc trưng đó nó sẽ kết nối với nhau và tính toán các góc nghiêng, từ đó tạo ra các bề mặt giúp bạn sử dụng nó trong game hoặc ứng dụng!
   P/s: đôi khi những mặt phẳng không có điểm đặc trưng sẽ khiến ARCore không nhận ra nó, ví dụ như một bức tường hoàn toàn trắng...
   + Neo và theo dõi: Bạn sẽ có thể gắn một vật thể trong thế thời thực tế ảo rồi quên nó đi, 1 lúc sau bạn quay lại vị trí đó và nó vẫn đang hoạt động 1 cách hết sức logic ở đó! ví dụ 1 cái máy bay sẽ bay đúng hướng dù bạn có ko đang hướng camera về phía nó!

Qua bài viết này hi vọng các bạn có sẽ có cái nhìn sơ bộ về ARCore cũng như cách tích hợp nó vào trong game, chúc các bạn sẽ sớm có những sản phẩm sử dụng công nghệ của ARCore thành công nhé ^_^