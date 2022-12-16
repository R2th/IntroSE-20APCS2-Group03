# Object-fit
Thuộc tính CSS object-fit được sử dụng để chỉ định cách thay đổi kích thước của <img> hoặc <video> để phù hợp với vùng chứa của nó.
    
Thuộc tính này cho biết nội dung cần lấp đầy vùng chứa theo nhiều cách khác nhau; chẳng hạn như "giữ nguyên tỷ lệ khung hình đó" hoặc "mở rộng và chiếm nhiều dung lượng nhất có thể".
    
Nhìn vào hình ảnh sau gốc sau đây. Hình ảnh này rộng 400 pixel và cao 300 pixel:
![](https://images.viblo.asia/5ff0a212-2f36-4e7b-8875-6f61468f300f.jpg)
 
 Tuy nhiên, nếu chúng ta định kiểu hình ảnh ở trên bằng một nửa chiều rộng (200 pixel) và cùng chiều cao (300 pixel), nó sẽ trông như thế này:
   
 
![](https://images.viblo.asia/3c5afe61-79a7-4a40-b9ac-fe8d78701da6.PNG)
```
img {
    width : 200px;
    height : 300px;
 }
```
Như các bạn thấy thì tỉ lệ của ảnh đã bị phá vỡ để vừa với khung hình 200x300.

Vì vậy mà chúng ta có thuộc tính **Object-fit** để giải quyết vấn đề này.
 
 Các giá trị của thuộc tính **Object-fit** bao gồm : 
    
*  **cover** - Hình ảnh giữ nguyên tỷ lệ co và lấp đầy kích thước đã cho. Hình ảnh sẽ được cắt bớt để vừa.
    
 ![](https://images.viblo.asia/4b192fb9-fb32-404f-8e82-b1c3748d0062.PNG)
```
img {
    width : 200px;
    height : 300px;
    object-fit : cover;
 }
```
*  **fill** - Đây là giá trị mặc định. Hình ảnh được thay đổi kích thước để lấp đầy kích thước đã cho. Nếu cần, hình ảnh sẽ được kéo căng hoặc thu nhỏ để vừa  với khung hình.
    
   ![](https://images.viblo.asia/3c5afe61-79a7-4a40-b9ac-fe8d78701da6.PNG)
```
img {
    width : 200px;
    height : 300px;
    object-fit : fill;
 }
```
    
* **contain** - Hình ảnh giữ nguyên tỷ lệ co, nhưng được thay đổi kích thước để vừa với kích thước đã cho.
    
    ![](https://images.viblo.asia/5b78628a-1e9b-4c4f-b4b9-fa7ab7517193.PNG)
```
img {
    width : 200px;
    height : 300px;
    object-fit : fill;
 }
```

* **none** - Hình ảnh không được thay đổi kích thước.
    
    ![](https://images.viblo.asia/4b192fb9-fb32-404f-8e82-b1c3748d0062.PNG)
 ```
img {
    width : 200px;
    height : 300px;
    object-fit : none;
 }
```
   
    
Đi kèm với thuộc tính **Object-fit** chúng ta còn có thuộc tính **Object-position** dùng để định vị vị trí của <img> hoặc <video> trong vùng chứa của nó nhằm giúp chúng ta hiển thị các vị trí của ảnh mà chúng ta mong muốn.Các bạn có thể tham khảo nó ở đây https://www.w3schools.com/css/css3_object-position.asp.
    
**Tham khảo :**

    https://css-tricks.com/almanac/properties/o/object-fit/