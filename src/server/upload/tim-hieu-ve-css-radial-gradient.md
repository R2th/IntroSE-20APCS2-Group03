# Radial gradient là gì?

Chào mọi người, hẳn là trong số chúng ta đã quá quen thuộc với chế độ màu gradient, nó là một bộ các màu được sắp xếp theo thứ tự tuyến tính, nó chỉ định các màu phụ thuộc vào vị trí, thường được sử dụng để làm background các element trong trong trang web hoặc một header, thay thế cho những header một màu nhàm chán. Các màu sắc được tạo ra bởi gradient khác nhau liên tục với từng vị trí, tạo ra sự chuyển tiếp màu trơn tru, loại gradient này được gọi là `linear-gradient`. Vậy bạn đã nghe qua `radial-gradient` chưa? Khác với `linear-gradient`, `radial-gradient` bắt đầu từ một điểm và chuyển tiếp dần ra bên ngoài. Mặc định màu đầu tiên sẽ nằm ở trung tâm của element và mờ dần ra bên ngoài như màu đỏ ở hình dưới.

![](https://images.viblo.asia/531a4323-91a3-4907-9e7e-1b748537be64.png)

# Cách sử sụng

Cú pháp chung của radial-gradient như sau:

```
<radial-gradient> = radial-gradient(
  [ [ <shape> || <size> ] [ at <position> ]? , |
    at <position>, 
  ]?
  <color-stop> [ , <color-stop> ]+
)
```

`shape`: hình dáng của gradient khi chuyển tiếp màu từ điểm giữa ra ngoài, và vì tính chất của radial-gradient nên hình dáng sẽ bị giới hạn là `circle` hoặc `eclipse`.

`size`:  xác định điểm cuối của gradient dựa vào điểm chính giữa của `shape`, như tâm của hình tròn, tâm hình eclipse. Giá trị này có thể đặt tên các tham số hoặc các giá trị cụ thể:
* closest-side: Gradient kết thúc khi shape chạm với cạnh gần nhất so với tâm của đường tròn hoặc cả `vertical` và `horizontal` của eclipse.
* farthest-side: Ngược lại với `closest-side`, gradient kết thúc khi shape chạm tới các cạnh xa nhất của nó.
* closest-corner: Gradient kết thúc khi shape của gradient chạm tới các góc gần nhất kể từ tâm của shape.
* farthest-corner: ngược lại với `closest-corner`, gradient kết thúc khi shape của nó chạm tới các góc xa nhất kể từ tâm shape và đây là giá trị mặc định.

`position`: vị trí của gradient, nó giống với thuộc tính `background-position`, ta có thể khai báo với các cặp giá trị như `top left`, `bottom right` hoặc các giá trị phần trăm.

`color-stop`: cái này thì dễ hiểu rồi :grinning: ta xác định 2 màu của gradient, màu đầu tiên là màu tại tâm của gradient.


Ta thử làm trường hợp cơ bản nhất khi ta không khai báo `shape`, `size`

{@embed: https://codepen.io/t-n-phm-the-scripter/pen/qBWaVpE}

ta thấy nó là một `eclipse` vì bao ngoài của gradient không phải là một hình tròn, bây giờ ta thử với `circle` và `closest-side` 

{@embed: https://codepen.io/t-n-phm-the-scripter/pen/dybpZeM}

Tiếp tục, ta thử khai báo `position` với cặp `top left`

{@embed: https://codepen.io/t-n-phm-the-scripter/pen/rNBMYvg}


# Browser support

![](https://images.viblo.asia/07d0f585-6a94-4a63-8a13-cf3cc606e102.png)



Sau bài viết này hi vọng các bạn hiểu và áp dụng được radial-gradient để làm trang web của mình trông modern-look hơn :D cảm ơn bạn đã theo dõi bài viết.

*Tham khảo:* https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient