# 1. Đề bài
.Emma đang chơi một tựa game di động mới có tên là nhảy qua những đám mây . Trong số những đám mây ta có hai loại đó chính là mây sấm và mây bình thường . Emma có thể nhảy lên bất cứ loại mây bình thường nào , nhưng không được động đến những mấy sấm.Mỗi lần nhảy Emma chỉ có thể nhay 1 hoặc 2 ô , không được nhảy xa hơn.Vậy bạn hãy viết một hàm , giúp Emma nhảy từ vị trí bắt đầu đến đám mây cuối cùng bằng số lần nhảy nhỏ nhất.

Đề sẽ cho bạn một mảng kiểu int gồm các phần tử chỉ 0 và 1. Quy ước 1 là những đám mây sấm , còn 0 là nhứng đám mây bình thường.
Sample Input 
```

    7
    0 0 1 0 0 1 0

```
Sample Output
```

    4
```
Với mảng có kích từ 2 đến 100.

Minh họa bằng hình ảnh.

![](https://images.viblo.asia/b5cdd04e-9016-4fdb-add4-05efbf66f7f2.png)

# 2. Hướng giải.
Để có thể đi một quãng đường bằng thời gian ngắn nhất thì ta phải chạy nhanh nhất có thể để hoàn thành quãng đường . Cũng như bài này , ta nhảy với độ dài dài nhất mà đề cho . Muốn nhảy với độ dài dài nhất phải thỏa hai điều kiện : ở đám mây đám xuống phải là đám mây bình thường và còn đủ hai đam mây để ta nhảy tiếp . Nếu không có đủ hai điều kiện ta kiểm tra xem đám mây phía trước mặt có phải mấy bình thường không . Nếu không kết thục lượt vì không thể nháy tiếp được nữa.
# 3.Code.
```
static int jumpingOnClouds(int[] c) {
        
        int count = 0;

        for (int i = 0 ; i < c.length - 1;)
        {
            // kiem tra dieu kien
            if (i+2 < c.length && c[i+2] == 0)
            {
                // nhay 2 buoc
                i = i + 2;
            }else{
                // kiem tra xem con nhay duoc khong
                if (c[i] == 1)
                    break;
                else
                    // nhay mot buoc
                    i++;
            }
            // dem so lan nhay
            count++;
        }
        return count;
    }
```