# Lời Nói Đầu : 
[*] Như đã hứa mình sẽ làm 1 bài viết để cách xây dựng SCSS trong 1 dự án php/html hay trong 1 dự án sử dụng ReactJs + VueJS 

# Bắt Đầu Thôi !!
-----
1. Mục tiêu đề ra ?
2. Xây dựng 1 bộ SCSS có thể tái sử dụng ở mọi dự án
3. Các sự dụng Prepros để biên dịch SCSS to CSS
----

## 1. Mục tiêu đề ra : 
[*] Mục tiêu của bài viết này chúng ta sẽ cùng nhau tìm hiểu chức năng của những folder bên trong scss và cùng xay dựng 1 bộ github tempalte có thể tái sử dụng sau này 

Link github : https://github.com/letuankiet212/basecodeHTML ( Nếu bạn thấy hay hãy kéo nó về và sử dụng cũng như góp ý cho mình nhé , ko có gì vui hơn khi code mình được các bạn sử dụng .Nếu có thời gian mình sẽ tích hợp thêm 1 số function bên trong để các bạn có thể xem)

## 2. Xây dựng : 
Cấu trúc scss cơ bản : 

- Folder **`abstracts`**: đây là folder sẽ chứa những các biến hay những functions dùng để sử dụng cho toàn bộ hệ thông scss ,thường sẽ gồm các file mixins , variable
 
- Folder **`base`** : Đây là folder sẽ chứa các style lại các tag 1 cách cơ bản như html,h1,p,span sẽ gồm các file global,normalize,reset,transitions

- Folder **`components`** : Đây là folder dùng để chứa các style đặc thù cho các phần tuỳ vào style từ design mà chúng ta sẽ thêm vào đây , ví dụ như bạn custom style của 1 input , select sẽ được thêm vào đây


- File Main : Đầy là file dùng để nối các file bên trong các folder lại với nhau 

=> Đây là những folder mình nghĩ nó cần thiết khi bắt đầu và start 1 dự án . Có thể bạn sẽ thấy nó cùi bắp nhưng bạn nên biết cái gì **vừa đủ mới là tốt** đừng dùng "***dao mổ trâu để giết gà***" làm cho hệ thống xuất hiện nhiều code rác ko dùng cũng thêm vào nhìn cùi bắp lắm 

Đây là bộ hệ thống mình đã dựng xong , nhưng chưa work được vì ở file index.html chúng ta import file `main.css` chứ ko phải SCSS

![image.png](https://images.viblo.asia/24a01de6-89f7-4498-9e77-8dab207889ff.png)
![image.png](https://images.viblo.asia/ff9b7e95-3c1e-43e4-b349-f9a57d7ccd6e.png)

## 3. Sử dụng : 

Prepros bạn có thể dùng ở mọi dự án html/php/reactjs/vuejs đều dùng oke (2 tk Reactjs / Vuejs thì có thư viện rồi nên ít sử dụng ) 

Chỗ bên dịch từ SCSS qua CSS mình sẽ dùng Prepros để biên dịch ( mình sẽ ko giới thiệu nên dùng gì để tránh gây loãng bài)

[*]Link Tải : https://prepros.io/downloads

[*] Setup cơ bản : 

B1: Mở phần mềm Prepros , và kéo dự án vào phần mêm để import dự án vào 
![image.png](https://images.viblo.asia/79abb157-c184-42e3-aac7-77fad7fe27b8.png)

B2: Kiểm tra nơi nơi muốn lưu file css sau khi đã biên dịch . 
![image.png](https://images.viblo.asia/83ff3365-7aef-4c01-9c1c-54f28e689634.png)
![image.png](https://images.viblo.asia/0dfa0417-9ea6-4b11-8578-990606524957.png)

B3: Bấm nút Process File or bấm lưu bên chỗ file scss là nó đã tự dịch ra , kiểm tra xem thử đã  dịch thành công chưa nhé 
![image.png](https://images.viblo.asia/bf44b419-3914-4130-ae49-6e7339e2aac4.png)

Tận hưởng thành quả thôi 
![image.png](https://images.viblo.asia/1cea906e-eb5f-434d-9d92-ce8c85e08f51.png)

Bài viết này mình chỉ giới thiệu cách dựng 1 bộ SCSS vjp pro và cách làm quen với Prepros 


Vậy là chúng ta đã giới thiệu xong 1 thành phần quan trọng trong 1 hệ sinh thái ở bài tiếp theo mình sẽ giới thiệu về  **Axios cách tương tác giữa backend và frontend**