Đã bao giờ bạn gặp phải trường hợp ảnh không fit vừa layout hoặc width, height không như ý muốn? Dưới đây mình sẽ đưa ra một số tips để responsive images ^-^!<br>
### 1. Sử dụng thuộc tính "*background"*
Background thực sự hiệu quả với 2 thuộc tính: "*background-image*" và "*background-size*": <br>

![](https://images.viblo.asia/335d4db0-4df3-42de-8d5e-e9ecd7b6f992.PNG)
Note: Một chú ý ở đây là bạn chỉ nên dùng trong trường hợp ảnh không chứa nội dung hoặc nội dung là cố định.
### 2. Sử dụng thuộc tính *"object-fit"*
Trong trường hợp chúng ta muốn sử dụng phần tử <img> để hiển thị ảnh thì sao. Hèm hèm, "object-fit" sẽ là một trong những lựa chọn khá là hay mà bạn nên thử đó.

![](https://images.viblo.asia/590daba2-340a-49e6-8e0a-6890d9297ba2.PNG)

Nhưng có một chút rắc rối với thuộc tính này đó là nó không làm việc trên IE và một số phiên bản Safari cũ.
![](https://images.viblo.asia/2cfd0731-e64e-4f1f-9251-009e114ae74d.PNG)
{@embed: https://codepen.io/ThanhNhan96/pen/KKPbMmB}
### 3. Sử dụng một thẻ div bao ngoài
Một cách khá là đơn giản mà mình cũng khá ưa thích đó là sử dụng một thẻ <div> bao ngoài <img> của bạn.<br>
    
{@embed: https://codepen.io/ThanhNhan96/pen/KKPbMyG}
### Kết luận:<br>
Trên đây chỉ là một vài tip nhỏ để responsive image mà bạn có thể tham khảo.
### Tài liệu tham khảo:<br>
    https://medium.com/free-code-camp/time-saving-css-techniques-to-create-responsive-images-ebb1e84f90d5