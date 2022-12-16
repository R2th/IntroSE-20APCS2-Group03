# Mở đầu 
Trước kia khi muốn dàn trang trong css  chúng ta thường dùng các thuộc  tính float  nhưng float có một hạn chế  đó là  sập độ cao, và chúng ta cần thêm 1 bước để giải quyết vấn đề này là sử dựng thuộc tính clear: both được định nghĩa trong class .clearfix. Để cải thiện nhược điểm trên thì Css3 đã  có thêm thuộc tính  **Flexbox** giúp dàn trang link hoạt hơn. Ở bài viết này mình sẽ đi vào các thuộc tính  của  **Flexbox** để các bạn có thể lắm bắt được vậy thì bắt đầu nào :)
# Chuẩn bị

để sử dụng thuộc tính flex box đầu tiên bạn phải có 1 thẻ div bao ngoài. ở đây mình có 1 thẻ div có class là container và các thẻ div con bên trong nó như sau 
```php

                        <div class="container">
                            <div class="item item-a"></div>
                            <div class="item item-b"></div>
                            <div class="item item-c"></div>
                        </div>
```
và một chút css ban đầu để xác định kích thước, màu sắc của chúng  
```php
                    <style type="text/css">
                        .container {
                        width: 500px;
                        height: 250px;
                        border: 1px solid;
                        margin-left: 400px;
                        margin-top: 150px;
                        background-color: #0b7cde;
                        line-height: 60px;
                        }	
                        .item {
                        width: 60px;
                        height: 60px;
                        background-color: antiquewhite;
                        margin: 10px;
                        text-align: center;
                        }
                    </style>
```

vậy là mình đã chuẩn bị xong, mình mở trình duyệt lên để xem các phần tử đang hiển thi như thế nào, và đây là  kết quả:
![](https://images.viblo.asia/035db05d-7d8c-49a7-9a2d-e423fbe73066.PNG)

Tiếp theo mình sẽ giới thiệu các thuộc tính của **Flexbox**
# Các Thuộc tính 
   Đầu tiên chúng ta sẽ thêm thuộc tính ` display: flex; ` trong class ` container ` như các bạn thấy các item đã được sắp xếp trên cùng 1 hàng theo chiều ngang 
   
   ![](https://images.viblo.asia/7a5dda1e-0852-408a-adf5-f01ea088c6ec.PNG)
   
   ####  1 flex-direction :
   
  Thuộc  tính `flex-direction ` quy đinh hướng sắp xếp của cái item nằm trong container
  
  * row : các item được sắp xếp theo chiều ngang thứ tự từ trái sang phải, và nó là  giá trị mặc định của `flex-direction`

![](https://images.viblo.asia/5ec40d4c-55ed-4279-b863-02f5c7a455c6.PNG)

* row-reverse : tương tự như `row` nhưng thứ tự các item bị đảo ngược từ phải sang trái 

![](https://images.viblo.asia/7355e848-14d3-439a-825c-0a957f911d74.PNG)


* column : các item được sắp xếp theo chiều dọc thứ tự từ trên xuống dưới 

![](https://images.viblo.asia/45f00bcc-f8a7-486e-81a3-ed94abea163d.PNG)
 
 * column-reverse : tương tự như `column` nhưng thứ tự các item bị đảo ngược từ dưới lên trên 

![](https://images.viblo.asia/98e7fe63-5930-4041-b343-47c7a93d36a6.PNG)

   ####  2 flex-wrap :
   Thuộc tính `flex-wrap`  xác định xem các item có bị ép vào một dòng đơn hay có thể được rớt dòng thành nhiều dòng khi chiều rộng của các item lớn hơn chiều rộng của container.
  
   * nowrap : quy định các item phải nằm trên cùng 1 dòng, việc này có thể khiến các item tràn ra ngoài container, giá trị mặc định của  `flex-wrap` là `nowrap`
 Ở đây mình sẽ thêm một số item để cho tổng chiều rộng các item lớn hơn chiều rộng container 
 
 ![](https://images.viblo.asia/1db0c49c-8f6c-493f-8269-2995e2feb3e4.PNG)

* wrap : Những item được  tách thành hai dòng nếu như tổng chiều rộng của các item lớn hơn chiều rộng của container

    ![](https://images.viblo.asia/13166097-d278-4a40-b8ee-1e9c0a428a92.PNG)

* wrap-reverse : tương tự như wrap nhưng nó đảo ngược giá trị của các hàng hoặc cột tùy theo giá trị của `flex-direction`. Ở đây mình đang lm ví dụ  với giá trị  `flex-direction` là  `row` các bạn có thể thực hành tương tự với giá trị `column` 

![](https://images.viblo.asia/0a15e848-41e6-4008-8494-46d3468a4ae0.PNG)

   ####  3 justify-content :
   Thuộc tính `justify-content` dùng để  xác định cách sắp xếp cái item bên trong container khi mà tổng độ rộng của các item nhỏ hơn độ rộng của container
   
   * flex-start : Giá trị này căn các item về phía đầu của container, và nó là giá trị mặc định của  `justify-content`   
   
   ![](https://images.viblo.asia/7a5dda1e-0852-408a-adf5-f01ea088c6ec.PNG)

  * center : Giá trị này sẽ căn các item ra giữa  

![](https://images.viblo.asia/ca49f857-92ad-4b88-93a1-c397b28869c5.PNG)

* flex-end : Giá trị này căn các item về phía cuối  của container 

 ![](https://images.viblo.asia/edfae949-ecb0-43cf-bb32-fed9ce6c8c99.PNG)
 
 * space-around : Giá trị này sẽ chia đều khoảng cách giữa các item và gấp 2 lần khoảng cách của item đến điểm đầu và cuối của container 
 
  ![](https://images.viblo.asia/817ebf74-468a-4420-b9c6-35bfd2e6eb7e.PNG)
  
  * space-between : Giá trị này sẽ chia  đều khoảng cách giữa các item và **không** có khoảng cách giữa item đến điểm đầu và cuối của container 

![](https://images.viblo.asia/f45e0f9a-926f-46b3-8d6e-db1a46a62b5c.PNG)

* space-evenly : Giá trị này sẽ chia  đều khoảng cách giữa các item và khoảng cách giữa item đến điểm đầu và cuối của container 

![](https://images.viblo.asia/27df23e3-ec52-47e3-8d10-22500747e014.PNG)


**lưu ý:**  ở các ví dụ trên mình đang để `flex-direction: row; `, còn  `column`thì các bạn thử làm xem nhé :D

   ####  4 align-items : 
   Thuộc tính này cũng tương tự nhưng  `justify-content` nhưng n sẽ căn chỉnh các item theo chục **vuông góc** với chục của `justufy-content`. Mình sẽ tạm gọi là `chục vuông góc` nhé, còn trục theo  `flex-direction` mình sẽ gọi là `trục chính` :D
   
   * stretch : Nếu các item không được đặt độ cao thì các item sẽ bị kéo dãn ra bằng chiều dài của container , nó cũng là giá trị mặc định của `align-items`

![](https://images.viblo.asia/86c5d6f6-047d-43de-9752-b5416284ed50.PNG)


* center : căn các item ra giữa của `trục vuông góc` 

![](https://images.viblo.asia/2e6f8fb3-0549-4e6f-bf13-2351554caed7.PNG)

* flex-start : căn các item ra đầu của `trục vuông góc`  

![](https://images.viblo.asia/6a879c5b-16b3-4258-9d03-2c234a2e23b4.PNG)

* flex-end : căn các item ra cuối của `trục vuông góc`

![](https://images.viblo.asia/ce713910-e207-4375-a850-34d1d80ea4aa.PNG)

**lưu ý**: ở đây ví dụ về phần `align-items` này mình đang để giá trị của của `flex-direction` = `row` nên `trục vuông góc` sẽ là trục dọc, các bạn cũng làm tương tự với `flex-direction` = `column` để xem kết quả nhé 

#### 5 align-content : 
Thuộc tính này xác định vị trí của các item con so với trục chính của nó trong container khi và chỉ khi container có thuộc tính là `flex-wrap: wrap`

* stretch : khi các item **không** được xét chiều cao và container cha có thuộc tính `flex-wrap: wrap` thì chiều cao của các item sẽ được kéo dài ra bằng chiều cao của container. Và ` stretch` cũng là giá trị **mặc đinh** của `align-content` 

![](https://images.viblo.asia/b92cbe32-b5c1-488b-80a8-6f2e0b7d0c8f.PNG)

* center : các item sẽ được căn chính giữa container cha theo trục chính

![](https://images.viblo.asia/59cee5a3-fc23-4524-8207-a078c845ab9d.PNG)

* flex-start : các item sẽ được căn lên đầu của container theo trục chính 

![](https://images.viblo.asia/c5826c87-eb14-4c3a-8651-d54f2ac6c9cb.PNG)

* flex-end : các item sẽ được căn xuống cuối container theo trục chính 

![](https://images.viblo.asia/765f28ed-6de4-4c2d-8138-c4c2de30beca.PNG)

* space-around : Giá trị này sẽ chia đều khoảng cách giữa các hàng chứa item và gấp 2 lần khoảng cách của hàng đầu và cuối đến điểm đầu và cuối của container

![](https://images.viblo.asia/c4ce61a0-0265-4ebf-b436-5645aeb291ce.PNG)


*  space-between : Giá trị này sẽ chia  đều khoảng cách giữa các hàng chứa item và **không** có khoảng cách giữa hàng đầu và cuối đến điểm đầu và cuối của container 

![](https://images.viblo.asia/9425ad49-c210-46be-a503-9cf0a51ed13d.PNG)

 
 *  space-evenly : Giá trị này sẽ chia  **đều** khoảng cách giữa các hàng chứa  item và khoảng cách giữa hàng đầu và cuối  đến điểm đầu và cuối của container 

![](https://images.viblo.asia/5649f19b-c02c-41e7-8004-850f185dcad3.PNG)

**lưu ý**: ở đây ví dụ về phần ` align-content` này mình đang để giá trị của của `flex-direction` = `row` còn với `flex-direction` = `column` thì các bạn làm thử xem nhé ;)
# Kết luận
Như vậy mình và các bạn đã cùng tìm hiểu các thuộc tính của Flexbox Trong quá trình viết bài còn nhiều thiếu xót các bạn thấy chỗ nào chưa đúng hay chưa hiểu có thể comment xuống bên dưới để mình được biết nhé, cảm ơn các bạn đã đón đọc.

Tài liệu tham khảo:  https://www.w3schools.com/css/css3_flexbox.asp