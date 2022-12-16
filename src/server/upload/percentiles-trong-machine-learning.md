Hello các bạn, hôm nay mình muốn giới thiệu đến các bạn thế nào là Percentile trong Machine Learning để các bạn có thể hiểu rõ hơn các khái niệm này và ứng dụng nó tốt hơn trong thực tế =)) Mình nghĩ ghi mở đầu cũng được kha khá chữ rồi. À do mình kiệm lời nên không thích viết nhiều =)) Giờ bắt đầu thôi. Let's go!!  

### **1. Percentiles là gì ?**

Percentiles là một số mô tả giá trị phần trăm nhất định của các giá trị thấp hơn nó. 

Đọc định nghĩa có lẽ nhiều bạn còn hoang mang? Bây giờ đi trực tiếp vào ví dụ để dễ hiểu hơn nhé! :)

Example 1: Giả sử chúng ta có một loạt số lượng bánh của tất cả 21 cửa hàng bán ra trong một ngày tại một quận
```
#Sử dụng phương pháp NumPy percentile()để tìm các phân vị:
import numpy

#Danh sách số lượng bánh bán ra trong 1 ngày của 21 cửa hàng trong 1 quận
cakes = [5,31,43,48,50,41,7,11,15,39,80,82,32,2,8,6,25,36,27,61,31]

x = numpy.percentile(cakes, 75)
print(x)
```

>  Kết quả: 
>  43.0

Kết quả trên cho ta biết rằng 75% cửa hàng có số lượng bánh bán ra trong một ngày nhỏ hơn 43 bánh hay nói cách khác là số 43 lớn hơn 75% giá trị có chứa trong danh sách số lượng bánh bán ra trong 1 ngày của 21 cửa hàng.

Ghi đến đây không biết các bạn hiểu được chưa nữa =)) Bạn nào chưa hiểu thì làm tiếp Ví dụ 2 bên dưới nha. Cũng tương tự Ví dụ 1 nhưng mình ghi theo một cách diễn đạt khác.

Example 2: Tương tự ví dụ 1, Ta muốn tìm giá trị mà tại đó nó lớn hơn 85% cửa hàng có số lượng bánh bán ra trong 1 ngày
```
import numpy

cakes = [5,31,43,48,50,41,7,11,15,39,80,82,32,2,8,6,25,36,27,61,31]
x = numpy.percentile(cakes, 85)
print(x)
```

>  Kết quả: 
>  50.0

Xong gòi đó :) Bye, hẹn gặp lại các bạn!