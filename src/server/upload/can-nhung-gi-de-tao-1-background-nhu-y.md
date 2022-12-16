# Mở đầu 
Xin chào các bạn lại là mình đây :D hôm nay mình sẽ cùng các bạn tìm hiểu một số thuộc tính css cơ bản để tạo `background `như ý nhé. Mình sẽ chia là 2 phần đó là `Background color` và `Background image`, bắt đầu luôn nhé
# Background Color
`Background Color` xác đinh màu nền cho cho một hay nhiều thẻ html

   ####    background-color: color
   Mình có một đoạn html và css như sau: 
   
   html:
   ```php

                        <div class="container">
                            <div class="item">background 1</div>
                            <div class="item">background 2</div>
                            <div class="item">background 3</div>
                        </div>

```


css: 
   ```php

                            .container {
                            display: flex;
                            flex-direction: column;
                            padding: 30px;
                            }
                            .item {
                            margin-bottom: 10px;
                            width: 100%;
                            height: 40px;
                            text-align: center;
                            padding-top: 25px;
                            }

```
Mình thêm thuộc tính  `background-color: #41efb4;` kết quả sẽ được :
![](https://images.viblo.asia/57c0918d-3ac5-4e3b-b8d3-c4d365e1aa4f.PNG)


**Lưu ý** : `#41efb4` bạn có thể thay bằng màu bất kì 
   ####        background-color: transparent
   màu nền trong trong suốt để thấy rõ hơn thì mình sẽ lấy ví dụ. mình thêm màu nền cho class `container` là `background-color: #c9dde8;` và xét cho `background 1` có thuộc tính là `background-color: transparent;`. Đây là kết quả 
   
  ![](https://images.viblo.asia/e02c235d-bbe0-4921-a922-a215365ff052.PNG)
như  các bạn thấy thì màu nền của  `background 1` là trong suốt (trùng với màu nền của `container`)
   ####        background-color: transparent
   Cái này khá hay, Mình hay vào trang  [này](https://cssgradient.io/)  để tạo background. bạn chỉ cần việc chọn màu bắt đầu, màu kết thúc ở đây 
   ![](https://images.viblo.asia/714ae6eb-899d-471a-8803-c0def54738cb.PNG)

   rồi cóp đoạn css này vứt vào bài của mình là được.
   ![](https://images.viblo.asia/d657f21d-dda3-4fe9-9a7d-5cae9eabb5a1.PNG)

Ở đây mình xét ` background-color: transparent` cho`background 1`. Đây là kết quả ![](https://images.viblo.asia/85c7e97d-c304-46fc-9327-b79bc24ce593.PNG)
Khá đẹp đúng k :v .
# Background Image
`Background-image` : xác định hình ảnh nền cho thành phần.Với url là đường dẫn tới hình được sử dụng làm hình nền. Nó có 1 số thuộc tính cơ bản mình hay sử dụng  như sau : 

* background-repeat
* background-size
* background-position
* background-attachment

Đầu tiên mình lên mạng và  download 1 bức ảnh về rồi thêm thuộc tính `background-image: url("vector.jpg");` cho `background 2`, ở đây `vector.jpg` là tên của ảnh. Kết quả ![](https://images.viblo.asia/8bdc2581-d288-4f5b-a507-a552fc91fe2b.PNG)

#### background-repeat
quy định ảnh có được lặp lại không khi mà kích thước ảnh nhỏ hơn kích thước của background. giá trị mặc định lẽ là `background-repeat: repeat;` nghĩa là được lặp lại theo cả 2 chiều ngang và dọc. ngoài ra còn có 1 số thuộc tính như là 

*    background-repeat: no-repeat: 

        ảnh sẽ không được lặp lại
        ![](https://images.viblo.asia/c7cfdb4b-14bb-4dc9-97f7-51b02e353618.PNG)
* background-repeat: repeat-x: 

     ![](https://images.viblo.asia/b31aad18-1dae-4d4c-9536-c888be473917.PNG)
ảnh được lặp theo trục ngang 

* background-repeat: repeat-y: 

     ![](https://images.viblo.asia/b31aad18-1dae-4d4c-9536-c888be473917.PNG)
ảnh được lặp theo trục dọc
![](https://images.viblo.asia/de40b771-5631-4aee-ad8a-ca54684261c7.PNG)

####  background-size 
quy đinh  kích thước hiển thị của ảnh 

* background-size: contain: 

     thu nhỏ ảnh lại làm sao để ảnh có thể hiển thị 100% trên khung background 
     ![](https://images.viblo.asia/8d0ed9d4-928a-4666-9061-d9d09b967025.PNG)


* background-size: cover:
làm cho ảnh bao trọn khung background với kích thước là nhỏ nhất. Mình kết hợp với thuộc tính ` background-position` để có thể chỉnh được background hiển thị theo ý muốn. Với thuộc tính `background-position` có một số giá trị thường dùng như sau: 

    * center: khung hiển thị background sẽ nằm ở giữa ảnh 
    * top:  khung hiển thị background sẽ nằm ở phần trên của ảnh 
    * bottom :  khung hiển thị background sẽ nằm ở phần dưới của ảnh 
    Ngoài ra chúng ta còn có thể chỉnh bằng cách: `	background-position: 20px -300px;` tương ứng với dịch sang phải 20px, và dịch lên trên 300px.
    
  Ở đây mình kết hợp giữa `background-size` và `background-position` với đoạn css như sau:
   ```php

                        <div class="container">
                            <div class="item">background 1</div>
                            <div class="item">background 2</div>
                            <div class="item">background 3</div>
                        </div>

![](https://images.viblo.asia/c2a52cfd-0d77-4f3b-9333-064eed9e0dd5.PNG)

####  background-attachment
Quy định background sẽ được cuộn theo scroll hay cố định theo thành phần. Có các giá trị như: 

   * scroll: Nền cuộn theo thành phần. Nó cũng là giá trị mặc định của ` background-attachment`
   ![](https://images.viblo.asia/384755d4-2902-43e6-b52a-6b151a4488eb.gif)

   * fixed:  Nền được cố định với khung hình.
   ![](https://images.viblo.asia/5f13233f-ff6e-41ba-a857-89d066a9b32f.gif)

   * local : Mình thấy n tương tự như `scroll` nếu bạn nào biết `local` khác `scroll` ở điểm nào thì `comment` xuống dưới để mình được biết và bổ sung để hoàn thiện bài viết hơn nhé :D
# Kết luận
Trên đây mình đã trình bày những thứ cần thiết để tạo được một `Background` theo ý muốn. Bài viết mang tính cá nhân là những gì mình biết và mình thấy cần thiết vì thế còn thiếu sót gì rất mong các bạn comment xuống dưới để mình có thể bổ xung và hoàn thiện bài viết hơn. Cảm ơn các bạn đã đọc :D