*Kỹ thuật viết mã nguồn hiệu quả? Hôm nay bài viết này mình không đề cập tới thuật toán, hãy coi như rằng chúng ta đã có thuật toán tốt nhất có thể và bây giờ chúng ta phải làm gì để có thể tăng tính hiệu quả của code. Bài viết này mình sẽ lấy ngôn ngữ lập trình C/C++ để minh họa về các hàm, các thao tác. Trên các ngôn ngữ khác cũng sẽ gần như tương tự.*

***Xem thêm*** : [***Tài liệu môn kỹ thuật lập trình - trường đại học Bách Khoa Hà Nội***](https://www.tailieubkhn.com/2021/01/ky-thuat-lap-trinh.html) 

### Tính toán trước các giá trị
Đối với những giá trị nào mà được sử dụng đi sử dụng lại nhiều lần thì nên tính toán trước để khi cần ta sẽ có ngay mà không phải tính toán lại từ đầu nhất là với các hàm như sin, cos, e^x hay các hàm tự định nghĩa,... máy tính sẽ mất thêm thời gian để tính toán lại chúng.

### Hàm nội tuyến ( inline functions)
Khi một hàm được gọi CPU sẽ lưu địa chỉ bộ nhớ của dòng lệnh hiện tại mà nó đang thực thi ( để biết nơi quay lại sau lời gọi hàm), sao chép các đối số của hàm trên ngăn xếp và cuối cùng chuyển hướng điều khiển sang hàm đã chỉ định. CPU sau đó thực thi mã bên trong hàm, lưu trữ giá trị trả về của hàm trong một vùng nhớ/thanh ghi và trả lại quyền điều khiển cho vị trí lời gọi hàm, điều này gây ra tốn một lượng chi phí nhất định so với việc thực thi mã trực tiếp ( không sử dụng hàm).  Ta gọi thao tác này là thao tác chuyển ngữ cảnh để thực thi hàm.<br />
Dĩ nhiên, với những hàm lớn hoặc các tác vụ phức tạp thì chi phí này chả đáng là bao đối với thời gian mà các hàm này chạy. Nhưng đối với các hàm nhỏ, thường xuyên được sử dụng thì việc thực hiện lệnh gọi hàm thường nhiều hơn rất nhiều so với thời gian cần thiết để thực thi mã của hàm.

Giải pháp đưa ra là sử dụng hàm nội tuyến, trong C++ ta sử dụng từ khóa **inline** trước mỗi hàm để đề nghị trình biên dịch thực hiện **inline expansion** ( khai triển nội tuyến) với hàm này hay nói cách khác là trình biên dịch sẽ không phải chuyển ngữ cảnh để thực thi hàm mà sẽ chèn trực tiếp đoạn code trong hàm vào nơi mà nó được gọi. Việc này sẽ giúp tiết kiệm thời gian phải chuyển ngữ cảnh để thực thi hàm nhưng sẽ làm cho file thực thi được biên dịch ra nặng hơn, vì vậy trong các trường hợp phải cân nhắc để sử dụng cái nào. 

Ví dụ : 
```
#include<iostream>
using namespace std;
inline int max(int a, int b){
    return a > b? a : b;
}
int main(){
    cout << max (3, 6) << '\n';
    cout << max (6, 3) << '\n';
    return 0;
}
```

Chương trình có thể không thực hiện nội tuyến trong các trường hợp : 
* Hàm chứa vòng lặp ( for, while, ...)
* Hàm chứa các biến tĩnh
* Hàm đệ quy
* Hàm chứa câu lệnh switch hoặc goto

### Biến tĩnh ( static variable)
Chúng ta đều biết, khi có lời gọi tới chương trình con thì các biến trong chương trình con sẽ được cấp phát bộ nhớ khi chương trình con được gọi và sẽ bị loại bỏ khi kết thúc chương trình con. Nhưng nếu bạn cần gọi hàm đó nhiều lần mà vẫn muốn 1 giá trị trong chương trình con được lưu lại cho tới khi kết thúc toàn bộ chương trình, bạn chỉ cần khai báo biến cục bộ của chương trình con là static và khởi tạo cho nó 1 giá trị. Việc khởi tạo sẽ chỉ thực hiện lần đầu tiên và giá trị biến đổi sẽ được lưu cho lần gọi sau, bằng cách này chương trình con có thể nhớ 1 vài mẩu tin cho các lần gọi sau đó giúp tiết kiệm  chút ít thời gian. 

### Sử dụng các biến đổi số học
Trình biên dịch sẽ xử lý các phép cộng, trừ tốt hơn nhân, chia và xử lý  phép nhân, chia tốt hơn các phép căn bậc 2, căn bậc 3,... Vì thế hãy chuyển các biểu thức về đơn giản nhất có thể để trình biên dịch không mất nhiều thời gian.

Ví dụ : 
```
if(a > sqrt(b))
    x = a * a + 3 * a + 2;
```

ta có thể viết lại thành 

```
if( a * a > b) 
    x = (a + 1) * (a + 2);
```

### Dùng lính canh để tránh những kiểm tra không cần thiết
Ví dụ về thuật toán tìm xem từ  **key** xuất hiện trong chuỗi **s** hay không : 
```
size = strlen(s);
pos = 0;
while( (pos < size) && s[pos] != key)
    pos++;
if(pos >= size) return false;
reuturn true;
```

Ta hoàn toàn có thể bớt đi 1 kiểm tra `pos < size` không cần thiết ở trong vòng while bằng việc đặt giá trị cần tìm vào cuối xâu, mã nguồn được sửa lại như sau : 
```
size = strlen(s);
strcat(s, key);
pos = 0;
while( s[pos] != key)
    pos++;
if(pos >= size) return false;
return true
```

### Không dùng các vòng lặp ngắn
Ví dụ đoạn code sau : 
```
for(int i=j; i<=j+3; i++)
    sum += 23 * i;
```
ta sẽ thay thành : 
```
i = j;
sum += 23 * i;
i++;
sum += 23 * i;
i++;
sum += 23 * i;
```

Nhìn thì có vẻ hơi cồng kềnh và khá buồn cười, nhưng việc chạy vòng lặp for thì khi biên dịch cũng sẽ phải chuyển ngữ cảnh để thực thi khối lệnh phía trong vòng for, điều này cũng sẽ tốn chút ít chi phí thực hiện.

### Caching dữ liệu
Nguyên tắc : dữ liệu thường xuyên được dùng phải luôn hiện hữu và dễ tiếp cận nhất. Chúng ta có thể tính toán trước nó và lưu lại ở đâu đó để khi cần dùng có thể gọi ra ngay.

### Nếu dùng mảng, hãy đặt kích thước của mảng bằng bội của 2
Với mảng, khi tạo chỉ số, trình dịch thực hiện phép nhân. Vì vậy, hãy đặt kích thước của mảng bằng bội số của 2 để phép nhân có thể được chuyển thành phép toán dịch bit và thực hiện một cách nhanh hơn.

### Dùng các phép toán khác, bằng thay cho lớn hơn, nhỏ hơn
Các phép toán >, < sẽ tốn thời gian để thực hiện hơn các phép toán !=, == ( một mẹo nhỏ vui vui mà mình biết được).

Tham khảo : bài giảng kỹ thuật lập trình ĐHBKHN, [https://www.tailieubkhn.com/](https://tailieu-bkhn.blogspot.com/)