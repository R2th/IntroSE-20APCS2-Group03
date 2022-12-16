Chắc hẳn bạn đã quá quen thuộc viết CSS cho trang web bằng việc viết CSS ra một file index.css rồi import vào trang. Nhưng giờ đây đã có một cách thức hoàn toàn mới, vừa dễ dàng và tiện lợi khi style cho trang web. Đó chính là Styled-component. Nào hãy cùng tìm hiểu xem có gì thú vị nhé!!!<br>
## 1. Phương pháp CSS truyền thống<br>
Trước khi nói về styled-component chúng ta hãy nói đến cách style truyền thống nhé!<br> 
Việc CSS lần lượt với các bước như sau: <br>
* Xây dựng các phần tử với HTML:<br><br>
    ![](https://images.viblo.asia/8598eeaa-d765-4e33-aee9-6fb757e7ca8f.PNG)
* Sử dụng selector(class hoặc id) để style cho các phần tử:<br><br>
    ![](https://images.viblo.asia/aab133ff-d161-40a9-a9d8-4ae9bfe51d01.PNG)<br>

Cách trên khá là đơn giản phải không nào. Tuy nhiên khi kết hợp với React thì lại không còn phù hợp nữa vì những nhược điểm sau:<br>
* **Rất dễ conflict tên class, id:** Khi tên class và id được dùng chung cho cả trang web, một số lượng lớn tên class và id được đặt rất khó kiểm soát và việc conflict rất dễ xảy ra.(có thể giải quyết bằng BEM)
* **Việc thay đổi style, animation dựa trên đầu vào và trạng thái của element khá rắc rối và không tự nhiên**
* **...**<br>

## 2. Styled-component<br>
Khi chuyển sang Styled-component bạn sẽ không còn dùng selector để làm đẹp cho trang web nữa mà thay vào đó chúng ta sẽ định nghĩa component với style chỉ dành riêng cho bản thân nó mà thôi. Tada cùng xem ví dụ dưới đây nhé:<br><br>
            ![](https://images.viblo.asia/ba97713f-fc2c-4a22-9b23-7ea7d5f876df.PNG)<br>
            
Chúng ta định nghĩa component là một thẻ div và dùng dấu (``) để định nghĩa CSS cho nó.<br>
## 3. Một số tính năng không thế bỏ qua<br>
### 3.1. Truyền props<br>
Chúng ta sẽ có 2 button. Một ở trạng thái normal: chữ hồng viền hồng. Hai ở trạng thái primary chữ trắng và có background màu hồng.<br>
    ![](https://images.viblo.asia/a66e766e-14dd-423b-a724-2f08e5f46ac8.PNG)
* Cách thông thường:<br>
    * component:<br><br>
    ![](https://images.viblo.asia/a2843811-7d84-4973-a8e5-0cf22491df24.PNG)<br>
    * css:<br><br>
    ![](https://images.viblo.asia/fe1a59ae-e07c-4399-9067-d638f10da9ab.PNG)
* Với styled-component:<br><br>
    ![](https://images.viblo.asia/fd2aa83d-65f0-4ac6-a3a2-c62d4ea24a16.PNG)<br>
   
### 3.2. Kế thừa style:<br>
Có những component có style giống nhau hoặc gần giống nhau, thay vì việc cứ phải viết đi viết lại css vừa tăng số lượng code vừa không tối ưu. Giờ đây với styled-component chúng ta có thể hoàn toàn giải quyết được vấn đề này:<br><br>
![](https://images.viblo.asia/6951c7ba-913b-4a4f-9c7e-eae775cd053a.PNG)<br>
### 3.3. Pseudo-elements, pseudo-class:<br>
Gần giống với cú pháp của SCSS, styled-component cũng hỗ trợ style dễ dàng với các pseudo-element và pseudo-class nhé:<br><br>
![](https://images.viblo.asia/a1517a68-f731-4ab7-81ef-e63dc29fd303.PNG)<br>
### 3.4. Styled-component tự động sinh ra prefixed<br>
Vâng, thât là tuyệt vời. Chúng ta không phải lo lắng về việc thêm tiền tố vào bất kỳ thẻ CSS nào. Việc đó đã có styled-component lo.<br>
## 4. Kết luận:<br>
Styled-component khá còn non trẻ nên chưa được kiểm duyệt tính scale trong các project lớn và sinh ra những class ngầu nhiên gây khó khăn cho những người đã quen việc debug CSS bằng tên class. Tuy nhiên, với những lợi ích tuyệt vời mà nó đem lại thì tại sao bạn không thử chuyển sang dùng styled-component nhỉ. Bạn sẽ thích nó ngay đấy!!!

### Tài liệu tham khảo:
* https://www.styled-components.com/docs/basics
* https://blog.cloudboost.io/getting-the-most-out-of-styled-components-7-must-know-features-acba3cc15b5