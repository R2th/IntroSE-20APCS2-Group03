Bài viết này dành cho các bạn newbiew, chưa có nhiều kinh nghiệm về debug và đọc log exception

## 1 Debug là gì và khi nào thì cần debug
Debug là gì? Debug là việc dev tìm kiếm các vị trí gây lỗi nhằm hướng tới hiểu được nguyên nhân lỗi và đưa ra hướng giải quyết.
Việc debug thường xảy ra ở các case sau:
- Có lỗi gây exception
- Lỗi gây ra dữ liệu sai (Không có exception)

## 2 Áp dụng chiến thuật
### 1. Case Exception
Case này thì dễ rồi, toàn bộ nội dung exception được show ra console/log file. Các bạn chỉ cần đọc log và tìm vị trí dòng code xảy ra lỗi.
Ví dụ viết 1 hàm chia cho 0 và xem exception ra sao
```
def demo_exception(a):
    print(100 / a)

demo_exception(10)
```
và lỗi nhận được sau khi run
```
10.0
Traceback (most recent call last):
  File "test.py", line 5, in <module>
    demo_exception(0)
  File "test.py", line 2, in demo_exception
    print(100 / a)
ZeroDivisionError: division by zero
```
Đọc những dòng lỗi trên là có thể thấy rõ log exception đã chỉ ra, lỗi tại file `test.py` dòng số 2. Ez chưa. Kinh hơn nữa là những dòng show lỗi dài dằng dặc được raise từ thư viện, chịu khó kéo chuột và đọc kỹ từng dòng, xem file nào thuộc project của và có thể đó chính là file gây lỗi (ở đó nó print cả dòng gây lỗi đấy). Bản thân mỗi exception show ra thì dòng cuối cùng nó cũng detail và chi tiết nhất về exception thuộc loại gì và nội dung message lỗi là gì.
Có những exception nó không show ra vị trí file gây lỗi nằm trong project thì dựa vào exception type và detail message chi tiết + hiểu về nghiệp vụ dự án mà phán đoán và có thể sử dụng xử lý như case số 2 dưới đây

### 2. Case gây lỗi dữ liệu nhưng không có exception
Có exception nhưng không cụ thể giống như case 1 (Không chỉ ra file trong project bị lỗi) hoặc chỉ gây lỗi dữ liệu. Trước đây, với những case này mình mò mãi k ra thì toàn nghĩ là do thư viện nào đó lỗi và report đổ lỗi cho thư viện, nhưng thực ra là do code của mình, chỉ là chưa tìm và đọc kỹ tới. Với case như này thì lúc này sẽ cần dùng các tool debug để chặn khoảng. Điều kiện để tìm ra nhanh là nắm rõ kiến trúc project, nắm được luồng xử lý.

Chiến thuật chỗ này cũng đơn giản thôi. Dựa vào nắm vững kiến trúc và luồng hoạt động để phán đoán các điểm có thể code sai gây lỗi data. Nếu có nhiều vị trí quá thì đặt các khoảng debug để chặn và kiểm tra. Sau khi tìm ra được khoảng gây lỗi (Khoảng gây lỗi là khoảng nằm giữa 2 vị trí debug mà excepted ở 2 điểm đó 1 thỏa mãn, 1 không). Từ đó thì debug nhỏ hơn tiếp trong khoảng đó cho tới dòng khi tòi ra dòng lỗi thì thôi, hoặc đọc từng dòng code cũng được :v: 

Nói chay thế này thôi chứ để áp dụng vào cũng phải kinh qua vài ba bug thì mới hiểu đc :D

## 3 Kết luận
Chia sẻ có vậy thôi đấy. Nhiều hệ thống yêu cầu không bị crash cho mọi exception nên các bạn hay code kiểu try ... except Exception. Exception trong python mà cái to nhất và chung nhất nên các bạn code xử lý chỗ này nên cho nó thêm một dòng print ra exception thực tế hiện tại là cái gì và dựa vào đó mà hiểu được thực sự exception mình đang gặp là gì giống như nầy
```
import traceback

try:
    ....
exception Exception as e:
    traceback.print_exc()
```