CSV Data Set Config là một trong những element cấu hình quan trọng trong Jmeter. Nó được sử dụng trong việc tham số hóa trong Jmeter Test Plan. 
Trong bài này chúng ta sẽ cùng thảo luận về các điểm bên dưới nhé:

1) Tham số hóa là gì?

2) Tìm hiểu về các element khác nhau của CSV Data Set Config

3) Cấu hình CSV Data Set Config

## Tham số hóa trong Jmeter là gì?
Tham số hóa trong Jmeter là quá trình thực hiện Test Plan với nhiều bộ người dùng Input Data. 
Bằng cách thực hiện tham số hóa, chúng ta tổng quát thao tác nhập dữ liệu cho nhiều người dùng.

**Ví dụ:** bạn đã ghi lại tập lệnh Jmeter về Tìm kiếm sản phẩm cho trang web thương mại điện tử. 
Bây giờ tập lệnh được ghi lại với một sản phẩm và bạn muốn thực thi tập lệnh cho 50 người dùng với sản phẩm khác nhau cho từng người dùng chẳng hạn.
Chúng ta cần phải tham số hóa từ khóa tìm kiếm. 
Khi đó với mỗi người dùng sẽ sử dụng tên sản phẩm khác nhau để tìm kiếm.

## Tìm hiểu về các element khác nhau của CSV Data Set Config

Sử dụng CSV Data Set Config để đọc các giá trị từ file CSV, lưu trữ chúng vào các biến được định nghĩa và sử dụng trong suốt quá trình kiểm thử với vai trò như Test Data.

**FileName:** Tên tệp chính xác (có đuôi .csv) chứa dữ liệu kiểm thử để thực thi và được đặt ở cùng vị trí với Jmeter script.

**Variable Names:** danh sách tất cả các tên biến (được phân tách bằng dấu phẩy) theo cùng thứ tự như được mô tả trong file CSV. Giữ trường này trống và jmeter sẽ lấy hàng đầu tiên từ tệp csv làm tên biến cho mỗi cột.

**Delimiter:** được sử dụng để tách từng bản ghi trong tệp csv. Bạn cần đảm bảo xác định tên biến theo thứ tự chính xác khi bạn cung cấp giá trị trong file csv.

**Allow quoted data?:** Nếu được bật, thì các giá trị có thể được đặt trong ”- dấu ngoặc kép - cho phép các giá trị chứa dấu phân cách.

**Recycle on EOF?:** Nếu số lượng thread lớn hơn số lượng Test Data, bạn có muốn tiếp tục thực hiện kiểm thử bằng cách quay trở lại đọc từ đầu không?

**Stop thread on EOF?:** Nếu chọn “Set”, khi chạy đến EOF sẽ khiến cho thread bị dừng lại.

**Sharing mode:** Tại đây bạn có thể định nghĩa hành vi chia sẻ của file CSV. Mặc định sẽ chọn là "All threads"

**All threads:** Nếu trong script của bạn có nhiều hơn 1 element CSV Data Set Config cùng tham chiếu đến 1 file thì CSV Data Set Config kế tiếp sẽ tiếp tục đọc CSV File đã được mở từ CSV Data Set Config trước.

**– Current Thread Group :** Nếu trong script của bạn có nhiều hơn 1 element CSV Data Set Config cùng tham chiếu đến 1 file thì CSV Data Set Config kế tiếp sẽ mở lại csv file cho từng trhread group

**– Current Thread :**  Mỗi file csv được mở riêng biệt cho từng thread khi chọn option này.

Do đó, khi sử dụng nhiều CSV Data Set Config, hãy đảm bảo sử dụng kết hợp chính xác giữa Sharing Mode, Recycle on EOF & Stop Thread on EOF để nhận kết quả mong muốn.

## Cấu hình CSV Data Set Config
Trước khi bắt đầu tham số hóa trong Jmeter, ta cần ghi lại scenario. 
Hãy cùng làm ví dụ Kiểm thử Journals global search và ghi lại script mà ta sẽ tham số hóa với nhiều từ khóa tìm kiếm nhé.
Đầu tiên thì ta cần thêm tất cả các element cần thiết trước khi bắt đầu ghi nhé. Những tham số đó là:

**– Thread Group**

**– HTTP Request Defaults**

**– HTTP(S) Test Script Recorder**

**– CSV Data Set Config**

**– View Result Tree**

**– Summary Report**

Jmeter lúc này trông sẽ như hình dưới đây:

![](https://images.viblo.asia/eaa78801-568d-4865-a018-facdfda2b909.png)

Bước tiếp theo là ghi lại trong Jmeter. Ở đây mình giả sử bạn đã có kiến thức có bản về ghi lại trong Jmeter và sẽ không thảo luận chi biết về nó nhé.

Bên dưới là màn hình sau khi bạn hoàn thành ghi lại. Request được đánh dấu là chỗ ta cần thực hiện tham số hóa và truyền Search keyword.

**Chú ý:** Mình chỉ giữ lại 2 request để chỉ ra trường hợp tham số hóa cho các bạn xem thôi nhé

![](https://images.viblo.asia/f56eea90-87d0-4c2b-a976-143a896e7bb5.png)

Bây giờ ta bắt đầu cầu hình cho CSV Data Set Config nhé. Hãy làm theo các bước dưới đây:

- Mở thư mục bin từ đường dẫn cài đặt Jmeter. Tạo 1 file text và điền các giá trị search keyword trong file đó. Sau đó lưu file text lại với định dạng ‘.csv’

![](https://images.viblo.asia/b6ff0db4-ddbf-4ad3-99f8-38bb7a5a1180.png)

-  Mở Jmeter và chọn CSV Data Set Config bên dưới Test Plan.

**Chú ý:** Cần đảm bảo rằng Jmeter script và CSV file được đặt ở cùng 1 chỗ.

- Sau đó cung cấp tên CSV file giống với tên mình đã lưu và đặt trong thư mục bin.

- Cung cấp tên biến tùy ý.

- Delemiter: sẽ không được dùng trong trường hợp kiểm thử của chúng ta do trong file CSV chỉ có 1 loại giá trị là từ khóa tìm kiếm. Do vậy cứ để như giá trị mặc định của nó là “,”, sẽ không ảnh hưởng gì cả đâu. :)

– Recycle on EOF = True

– stop thread on EOF = False

– Sharing Mode = All threads

![](https://images.viblo.asia/e5544999-afba-4ab0-b849-262128e0275d.png)

Thật đơn giản phải không bạn. Tiếp theo bạn cần cung cấp từ khóa tìm kiếm vào request parameter để Jmeter có thể đọc giá trị từ fiel csv trong suốt quá trình thực hiện.

- Chọn HTTP request , nơi mà mình sẽ đưa giá trị search keyword, và thay đổi giá trị tham số từ 'Jmeter' thành '${search_keyword}'. search_keyword là tên tham số mình đã đặt ở CSV Data Set Config.

![](https://images.viblo.asia/b12052c3-8236-4192-9944-d1ccd6eb3b29.png)

- Giờ mình chỉ cần chạy script và xác nhận kết quả trả về. 
Do trong file csv mình định nghĩa 4 từ khóa tìm kiếm nên ở Thread Group bạn hãy set giá trị Thread count là 4 nhé.

![](https://images.viblo.asia/3c7059b1-c01f-40b8-8241-19826a197c8b.png)

Bên trên là ví dụ cơ bản nhất về sử dụng CSV Data Set Config.
<br>

Nguồn tham khảo :
http://www.testingjournals.com/csv-data-set-config/