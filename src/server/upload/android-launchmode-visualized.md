![](https://lh5.googleusercontent.com/proxy/PTUoiFatUZ4cMEjkANuSRAdfPDJgPcpcAApzlXnhZohN5edGLT4d6-yK8dF2zCThHSxcYAz9WrFWPHKB795rsHcfPrWTwO1ObDTf18CU0pt431BQilDK)

Android launchMode là điều quan trọng và tất cả các nhà phát triển Android nên biết cách launchMode hoạt động. Hầu hết các nhà phát triển (bao gồm cả tôi) nghĩ rằng chúng tôi biết tại sao nó được sử dụng. Nhưng chúng tôi đã sai. Nó không chỉ là về việc tạo hoạt động SingleTask để ngăn chặn trường hợp trùng lặp. OK bạn đúng rồi. Nó giải quyết vấn đề của chúng ta nhưng chúng ta có thực sự biết điều gì xảy ra với các hoạt động khác trong ngăn xếp khi chúng ta thực hiện hoạt động SingleTask không?

Trước hết tôi muốn cung cấp cho bạn hai hình ảnh để làm cho nó dễ hiểu hơn.
![](https://miro.medium.com/max/1818/1*FtuPsJpB05gPWY9lOLPErQ.png)
Màu xanh lá cây có nghĩa là hoạt động mới. Màu vàng có nghĩa là một thể hiện hoạt động tương tự nhưng phương thức onNewInten () được gọi.

### 1 — launchMode = “singleTop” in Activity D
#
![](https://miro.medium.com/max/2558/1*4B06eN1SBWd24tKzxQFCDA.png)
1. ví dụ Nếu bạn định nghĩa Hoạt động D là singleTop trong AndroidManifest.xml. D sử dụng cùng thể hiện và phương thức onNewIntent () được gọi trong Activity D.
#
![](https://miro.medium.com/max/2558/1*XgiBG79DUEa72kFuehneOw.png)
2.example Nếu bạn định nghĩa Activity D là singleTop trong AndroidManifest.xml. Hoạt động mới được tạo ra.
#
![](https://miro.medium.com/max/2578/1*OGnZgLmpGB_siARD7ZZ-XA.png)
3. ví dụ Nếu bạn xác định Activity D là singleTop trong AndroidManifest.xml. D sử dụng cùng thể hiện và phương thức onNewIntent () khi và chỉ khi nó đã ở trên cùng của nhiệm vụ. Nếu nó không nằm trên nhiệm vụ, thì thể hiện Activity D mới sẽ được tạo.


#
### 2 — launchMode = “singleTask” in Activity C
#
![](https://miro.medium.com/max/2556/1*bnVZYNK7zT8o4V0HhnBMWQ.png)
Bạn thấy rằng Hoạt động D bị phá hủy? và phương thức onNewIntent () được sử dụng trong Hoạt động C.
#
![](https://miro.medium.com/max/2556/1*bFD6-tWnDcIskrvzirewTw.png)
Hoạt động mới C được đưa ra.
# 
### 3 — launchMode = “singleInstance” in Activity E
#

![](https://miro.medium.com/max/2794/1*2GQcJ-S9WEUyMOo9H4bHJA.png)
Ái chà!? Đúng. A, B, C, D nằm trong một nhiệm vụ. E sẽ được tạo trong một nhiệm vụ khác.

Đúng. Hoạt động E được tạo ra trong nhiệm vụ mới. Nếu chúng ta muốn khởi chạy Hoạt động F từ Hoạt động D thì sao? Đây là kết quả;
#
![](https://miro.medium.com/max/2864/1*_qbtv10vXoQgPvjEx0bq6w.png)
E vẫn đang trong một nhiệm vụ khác. a, b, c, d và f nằm trong một nhiệm vụ khác.
#
![](https://miro.medium.com/max/2840/1*_AE6C9wyzPcWoIyscIswzw.png)
Hoạt động E vẫn đang trong một nhiệm vụ khác. Và nếu chúng ta bắt đầu lại, phương thức onNewIntent () được gọi thay vì tạo hoạt động mới.

#
### 4 — launchMode = “standard” in Activity B
#
![](https://miro.medium.com/max/2558/1*MqDSkI4BO-9x-I2jl_oEwQ.png)
Tạo ra hoạt động mới B. Và vâng tôi biết chúng ta đã có một B trong ngăn xếp. Nhưng nó không sử dụng cái đó.

Happy coding.


##### [Link reference](https://medium.com/@iammert/android-launchmode-visualized-8843fc833dbe)