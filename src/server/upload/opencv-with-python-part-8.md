Ở bài trước mình đã hướng dẩn các bạn về ngưỡng , ngưỡng là gì thì các bạn củng có một khái niệm khá đầy đủ rồi nhé. 
Và ở bài viết tiếp theo này mình sẽ hướng dẩn về cách lọc màu ( Color Filtering ) Trong OpenCV với Python  như thế nào nhé.
# I. Giới thiệu.
Trong OpenCV với ngôn ngử Python, chúng ta sẽ giới thiệu cách tạo một bộ lọc, xem lại các hoạt động bitwise, ở đây chúng ta sẽ lọc cho một số màu cụ thể, cố gắng chỉ hiển thị nó. Ngoài ra, bạn cũng có thể lọc ra một màu cụ thể, sau đó thay thế nó bằng một màu như chúng ta mong muốn, giống như những gì đã làm với việc thay thế ROI (vùng hình ảnh) bằng một thứ khác.
# II. Các thao tác về hình ảnh.
## 1. Hướng dẫn.
Để lọc như thế này bạn có một vài lựa chọn. Nói chung, có thể bạn sẽ chuyển đổi màu sắc của mình sang [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV), đó là "Hue Saturation Value". Điều này có thể giúp bạn thực sự xác định được một màu cụ thể hơn, dựa trên các màu sắc và các dải bão hòa, với một sự khác biệt về giá trị, ví dụ. 

Nếu bạn muốn, bạn có thể thực sự sản xuất các bộ lọc dựa trên giá trị BGR, nhưng điều này sẽ là một chút khó khăn hơn. 
Nếu bạn gặp khó khăn trong việc hình dung HSV, đừng cảm thấy ngớ ngẩn hay bất lực, hãy kiểm tra trang Wikipedia trên HSV, có một đồ họa rất hữu ích cho bạn để hình dung nó. Hue cho màu sắc, độ bão hòa cho ảnh hưởng đến độ mạnh và tính chất của màu sắc, và giá trị cho ánh sáng là làm thế nào tôi sẽ mô tả tốt nhất nó có thể. Bây giờ chúng ta hãy bắt đầu với những đoạn code đầu tiên nào.
```
import cv2
import numpy as np

cap = cv2.VideoCapture(0)

while(1):
    _, frame = cap.read()
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    lower_red = np.array([30,150,50])
    upper_red = np.array([255,255,180])
    
    mask = cv2.inRange(hsv, lower_red, upper_red)
    res = cv2.bitwise_and(frame,frame, mask= mask)

    cv2.imshow('frame',frame)
    cv2.imshow('mask',mask)
    cv2.imshow('res',res)
    
    k = cv2.waitKey(5) & 0xFF
    if k == 27:
        break

cv2.destroyAllWindows()
cap.release()
```


Đây chỉ là một ví dụ, với màu đỏ là mục tiêu. Cách hoạt động này là những gì mà ta thấy sẽ là bao gồm bất cứ thứ gì nằm giữa các phạm vi của chúng ta ở đây, về cơ bản 30-255, 150-255, và 50-180. 

Đây là một ví dụ cho màu đỏ, nhưng hãy thử tìm màu của riêng bạn. Lý do tại sao HSV hoạt động tốt nhất ở đây là vì chúng ta muốn có một loạt các màu sắc, và chúng ta thường muốn có cùng một màu sắc trong trường hợp này. Đây là một màu đỏ điển hình nhưng sẽ vẫn có màu xanh lá cây và xanh khác, vì vậy chúng ta phải cho phép một số màu xanh lá cây và một số màu xanh, nhưng sau đó chúng ta muốn màu đỏ đầy đủ. Điều này có nghĩa là chúng ta sẽ có được hỗn hợp ánh sáng thấp hơn của tất cả các màu sắc vẫn còn tại thời điểm này. Để xem xét phạm vi HSV, tôi tin rằng phương pháp tốt nhất là chỉ cần thử và sai. Có được xây dựng trong các phương pháp để OpenCV để chuyển đổi BGR để HSV. Nếu bạn muốn chọn chỉ một màu duy nhất, sau đó BGR để HSV sẽ là tuyệt vời để sử dụng. Vì lợi ích của việc giảng dạy, dưới đây là một ví dụ về mã lệnh trong công việc:

```
dark_red  = np.uint8([[[12,22,121]]])
    dark_red = cv2.cvtColor(dark_red,cv2.COLOR_BGR2HSV)
```



## 2. Kết quả.

![](https://images.viblo.asia/7db574d8-c691-448f-9ac1-16d50febf3b1.png)




Kết quả ở đây sẽ là một giá trị HSV giống với giá trị dark_red. Điều này là tuyệt vời ... nhưng một lần nữa ... bạn vẫn soay quanh vào vấn đề cơ bản với các phạm vi trong màu sắc vs phạm vi trong HSV. Chúng về cơ bản là khác nhau. Bạn có thể sử dụng chúng cho các phạm vi BGR, chúng vẫn sẽ hoạt động, nhưng để phát hiện ra một "màu", nó sẽ không hoạt động tốt. Trở lại mã chính trước tiên chúng ta chuyển đổi khung sang HSV. Không có gì quá đặc biệt ở đó. Tiếp theo, chúng ta chỉ định một số giá trị HSV cho màu đỏ. Chúng tôi tạo một mặt nạ, sử dụng câu lệnh "inRange" cho phạm vi cụ thể của chúng tôi. Điều này đúng hoặc sai, đen hoặc trắng. Tiếp theo, chúng ta "phục hồi" màu đỏ của chúng ta-ness bằng cách chạy một hoạt động bitwise. 

Về cơ bản, chúng tôi hiển thị màu sắc ở đó cho khung và mặt nạ. Phần trắng của mặt nạ sẽ có màu đỏ, được chuyển thành màu trắng tinh khiết, trong khi mọi thứ trở nên đen.

Cuối cùng chúng tôi hiển thị tất cả. Tôi đã chọn để hiển thị khung gốc, mặt nạ, và kết quả cuối cùng ở trên, vì vậy bạn có thể có được một ý tưởng tốt hơn về những gì đang xảy ra. 

Trong hướng dẫn tiếp theo, chúng tôi sẽ xây dựng một chút về chủ đề này. Như bạn có thể thấy, chúng ta vẫn có một chút "hổn tạp" ở đây. Mọi thứ đều nho nhỏ, nhiều chấm đen trong màu đỏ, và rất nhiều màu sắc nhỏ khác nằm rải rác. Có một vài điều chúng tôi có thể làm để giảm thiểu tình trạng này bằng làm mờ và làm mịn màng, đó là những gì chúng tôi sẽ thảo luận tiếp theo.
III. Tài liệu tham khảo.
http://docs.opencv.org/ https://techmaster.vn/ https://pythonprogramming.net/