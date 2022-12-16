## **Mở đầu**
Các trang web chủ yếu là các hình khối hình chữ nhật. Tuy nhiên hiện nay chúng ta đang có xu hướng đa dạng hơn về hình dạng. Một trong nhiều lý do khiến chúng ta không tạo ra các khối hình khác nhau là do chúng ta thiếu công cụ thích hợp để tạo ra chúng. 
Vì vậy, hôm nay tôi sẽ giới thiệu cho các bạn **clip-path**, một thuộc tính cho phép bạn tạo ra các dạng hình khối khác nhau được điều chỉnh bởi các giá trị bạn cung cấp.


## **Cú pháp và cách sử dụng**
```
clip-path: <clip-source> | [ <basic-shape> || <geometry-box> ] | none
```
Thuốc tính này có rất nhiều công dụng thú vị. Đầu tiên là nó cải thiện nội dung văn bản mà bạn muốn thể hiện. Phần nền của tiêu đề và đoạn giới thiệu đã được tạo nên một cách đơn giản bằng `clip-path` 

![](https://images.viblo.asia/81f4f453-673b-47c2-ae8d-e2fdae2c4cb1.PNG)

Bạn có thể dễ dàng tạo nền có đường chéo như phần nền của tiêu đề, tuy nhiên để tạo nền như một message của phần giới thiệu trên sẽ khó hơn nhiều nếu như không có sự hỗ trợ của `clip-path`. Để có kết quả như vậy, bạn chỉ cần một dòng CSS duy nhất:

```
.p-message {
  clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 85%, 75% 100%, 50% 80%, 0% 75%);
}
```

{@embed: https://codepen.io/nhungpt6/pen/LwVdeb}


Tiếp theo, chắc hẳn chúng ta không nghĩ rằng tạo ra các hình đa giác lại có thể đơn giản đến thế, khi chỉ với một dòng code CSS sử dụng `clip-path`, thật thú vị phải không, hãy thỏa sức sáng tạo các hình dạng mà chúng ta yêu thích nhé. Hãy thử một vài hình cơ bản xem nhé..

```
/* Triangle */
.polygon1 {
  -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
/* X */
.polygon2 {
  -webkit-clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
}
/* Star */
.polygon3 {
  -webkit-clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}
```

{@embed: https://codepen.io/nhungpt6/pen/xvGWNg?editors=1100}


Ngoài ra còn có rất nhiều các khối hình khác nhau mà chúng ra có thể tạo ra chỉ bằng một dòng code `clip-path`. Hãy truy cập vào link https://bennettfeely.com/clippy/ để tự mình tùy chỉnh các giá trị và cho mình những khối hình yêu thích nhé ^^

## **Thêm Animation**
Thêm nữa, chúng ta có thể kết hợp `clip-path` và animations để tạo ra các chuyển động thú vị. 

{@embed: https://codepen.io/nhungpt6/pen/xvGjRL?editors=1100}


{@embed: https://codepen.io/nhungpt6/pen/jgPxwP?editors=1100}


## **Hỗ trợ trình duyệt**
Tuy nhiên khi sử dụng chúng ta cũng nên chú ý đến việc nó hỗ trợ những trình duyệt nào nhé.

![](https://images.viblo.asia/5e8d4f81-0bfa-4f44-a1c8-308910fa61b5.PNG)


## **Kết luận**
Những giới thiệu trên về `clip-path` bao gồm những điều cơ bản để bạn có thể bắt đầu. Không khó để bạn có thể tìm hiểu và sử dụng chúng, tuy nhiên hãy thử và sáng tạo chúng thật nhiều nữa nhé. Và đừng quên chúng ta có công cụ hỗ trợ -clippy của Bennett Feely để chúng ta theo tác với các hình đa giác khác nhau.

Bạn tạo ra điều gì thú vị với `clip-path` hãy chia sẻ dưới comment nhé ^^ 

Chúc các bạn thành công!