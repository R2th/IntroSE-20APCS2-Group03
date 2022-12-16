# Matplotlib
Để thực hiện các suy luận thống kê cần thiết, cần phải trực quan hóa dữ liệu của bạn và Matplotlib là một trong những giải pháp như vậy cho người dùng Python. Nó là một thư viện vẽ đồ thị rất mạnh mẽ hữu ích cho những người làm việc với Python và NumPy. Module được sử dụng nhiều nhất của Matplotib là Pyplot cung cấp giao diện như MATLAB nhưng thay vào đó, nó sử dụng Python và nó là nguồn mở.

Để cài đặt Matplotlib nếu bạn có Anaconda chỉ cần gõ `conda install matplotlib` hoặc sử dụng tools pip `pip install matplotlib`
## Khái niệm chung
Một Matplotlib figure có thể được phân loại thành nhiều phần như dưới đây:
* **Figure:** Như một cái cửa sổ chứa tất cả những gì bạn sẽ vẽ trên đó.
* **Axes:** Thành phần chính của một figure là các axes (những khung nhỏ hơn để vẽ hình lên đó). Một figure có thể chứa một hoặc nhiều axes. Nói cách khác, figure chỉ là khung chứa, chính các axes mới thật sự là nơi các hình vẽ được vẽ lên.
* **Axis:** Chúng là dòng số giống như các đối tượng và đảm nhiệm việc tạo các giới hạn biểu đồ.
* **Artist:** Mọi thứ mà bạn có thể nhìn thấy trên figure là một artist như `Text` objects, `Line2D` objects, `collection` objects. Hầu hết các Artists được gắn với Axes.
## Bắt đầu với Pyplot
Pyplot là một module của Matplotlib cung cấp các hàm đơn giản để thêm các thành phần plot như lines, images, text, v.v. vào các axes trong figure.
### Tạo một biểu đồ đơn giản
```
import matplotlib.pyplot as plt
import numpy as np
```
Ở đây chúng ta import Matplotlib’s Pyplot module và thư viện Numpy vì hầu hết các dữ liệu mà ta sẽ làm việc sẽ chỉ ở dạng mảng.
![](https://images.viblo.asia/acdd04cc-808d-4639-8d43-b0f980055f1f.png)

Chúng ta chuyển hai mảng làm đối số đầu vào cho phương thức `plot()` và sử dụng phương thức `show()` để gọi biểu đồ được yêu cầu. Ở đây lưu ý rằng mảng đầu tiên xuất hiện trên trục x và mảng thứ hai xuất hiện trên trục y của biểu đồ. Bây giờ, biểu đồ đầu tiên của chúng ta đã sẵn sàng, chúng ta hãy thêm tiêu đề và đặt tên trục x và trục y bằng cách sử dụng các phương thức `title()`, `xlabel()` và `ylabel()`.

![](https://images.viblo.asia/d760de75-78c9-42f1-a78f-31e97d6dd8db.png)

Chúng ta cũng có thể chỉ định kích thước của hình bằng cách sử dụng phương thức `figure()` và truyền các giá trị dưới dạng một tuple về độ dài của các hàng và cột cho đối số `figsize`

![](https://images.viblo.asia/80e0f8a2-109f-492a-ad4a-da089ded23bd.png)

Với mỗi đối số X và Y, bạn cũng có thể chuyển một đối số thứ ba tùy chọn dưới dạng một chuỗi cho biết màu sắc và loại đường của biểu đồ. Định dạng mặc định là **b-** có nghĩa là một đường màu xanh lam đặc. Trong hình dưới đây, mình sử dụng **go** có nghĩa là vòng tròn màu xanh lá cây. Tương tự như vậy, chúng ta có thể thực hiện nhiều kết hợp như vậy để định dạng biểu đồ của mình.

![](https://images.viblo.asia/b2b66c37-8965-4c41-9fb4-b353ed2d4b31.png)

Chúng ta cũng có thể vẽ nhiều bộ dữ liệu bằng cách chuyển vào nhiều bộ đối số của trục X và Y trong phương thức `plot()` như bên dưới.

![](https://images.viblo.asia/556b745d-29c3-45f9-96a6-6d5017b79bec.png)
### Nhiều biểu đồ trong 1 figure
Chúng ta có thể sử dụng phương thức `subplot()` để thêm nhiều plots trong một hình. Trong hình ảnh bên dưới, mình đã sử dụng phương pháp này để phân tách hai biểu đồ mà đã vẽ trên cùng một trục trong ví dụ trước. Phương thức `subplot()` có ba đối số: `nrows`, `ncols` và `index`. Chúng chỉ ra số lượng hàng, số cột và số index của sub-plot. Ví dụ, mình muốn tạo hai sub-plot trong một hình sao cho nó nằm trên một hàng và trên hai cột và do đó ta chuyển các đối số (1,2,1) và (1,2,2) trong phương thức `subplot()`. Lưu ý rằng ta đã sử dụng riêng phương thức `title()` cho cả các subplots. Ta sử dụng phương thức `suptitle()` để tạo một tiêu đề tập trung cho hình.

![](https://images.viblo.asia/ed0f87cf-f4e0-40bb-96e3-076b565a0825.png)

Nếu ta muốn các sub-plots thành hai hàng và một cột, chúng ta có thể truyền các đối số (2,1,1) và (2,1,2)

![](https://images.viblo.asia/8b4ac7c3-d9ba-46c8-b5cf-cf6468a52a87.png)

Cách tạo ra subplots  trên đây trở nên hơi tẻ nhạt khi chúng ta muốn có nhiều subplots  trong hình. Một cách thuận tiện hơn là sử dụng phương thức `subpltots()`. Lưu ý sự khác biệt của các giá trị trong cả hai phương thức. Phương thức này lấy hai đối số `nrows` và `ncols` làm số lượng hàng và số cột tương ứng. Phương thức này tạo ra hai đối tượng: `figure` và `axes` mà chúng ta lưu trữ trong các biến fig và ax có thể được sử dụng để thay đổi các thuộc tính mức figure và axes tương ứng. Lưu ý rằng các tên biến này được chọn tùy ý.

![](https://images.viblo.asia/b9ee1eb8-b5b3-465f-88c2-79dd56185837.png)

### Tạo các loại biểu đồ khác nhau với Pyplot
**1. Biểu đồ thanh**

Biểu đồ thanh là một trong những loại biểu đồ phổ biến nhất và được sử dụng để hiển thị dữ liệu được liên kết với các biến phân loại. Pyplot cung cấp một phương thức `bar()` để tạo các biểu đồ thanh có các đối số: biến phân loại, giá trị và màu sắc của chúng (nếu bạn muốn chỉ định bất kỳ)

![](https://images.viblo.asia/be3fa8ce-c219-4554-bcd8-8380e96cdb8c.png)

Để tạo biểu đồ thanh ngang sử dụng phương thức `barh()` Ngoài ra, chúng ta có thể truyền đối số (với giá trị của nó) `xerr` or `yerr` (trong trường hợp biểu đồ thanh dọc ở trên) để mô tả phương sai trong dữ liệu của chúng ta như sau:

![](https://images.viblo.asia/5b49f08d-b5ec-4a89-861f-3df90f48b718.png)

Để tạo các biểu đồ thanh xếp chồng theo chiều ngang, ta sử dụng phương thức `bar()` hai lần và chuyển các đối số trong đó ta đề cập đến index và width của biểu đồ thanh để xếp chúng theo chiều ngang. Ngoài ra, chú ý việc sử dụng hai phương thức `legend()` được sử dụng để hiển thị chú giải của biểu đồ và `xticks()` để gắn nhãn trục x dựa trên vị trí của các thanh.

![](https://images.viblo.asia/09468614-bc33-46ff-86c9-e3eef4aa952d.png)

Tương tự, để xếp theo chiều dọc các biểu đồ thanh với nhau, chúng ta có thể sử dụng đối số `bottom` và đề cập đến biểu đồ thanh mà chúng ta muốn xếp chồng bên dưới làm giá trị của nó.

![](https://images.viblo.asia/79a464ee-01a1-435a-a82c-1a6fc5ee5d86.png)

**2. Biểu đồ tròn**

Một loại biểu đồ cơ bản nữa là biểu đồ Pie có thể được tạo bằng phương thức `pie()` Chúng ta cũng có thể chuyển các đối số để tùy chỉnh biểu đồ Pie của mình để hiển thị shadow, explode một phần của nó, nghiêng nó theo một góc như sau:

![](https://images.viblo.asia/b8d6c47b-d065-41df-a5dd-1fea763b322c.png)

**3. Histogram**
Histogram là một loại biểu đồ rất phổ biến khi chúng ta xem xét dữ liệu như chiều cao và cân nặng, giá cổ phiếu, thời gian chờ đợi của một khách hàng, v.v ... liên tục trong tự nhiên. Histogram's data được vẽ trong một phạm vi so với tần số của nó. Histograms là các biểu đồ xuất hiện rất phổ biến trong xác suất và thống kê và tạo cơ sở cho các distributions khác nhau như normal -distribution, t-distribution, v.v. Trong ví dụ sau, chúng ta tạo dữ liệu liên tục ngẫu nhiên gồm 1000 entries  và vẽ biểu đồ theo tần số của nó với dữ liệu chia thành 10 tầng bằng nhau. Mình đã sử dụng phương thức `random.randn()` của NumPy's để tạo dữ liệu với các thuộc tính của standard normal distribution, nghĩa là = 0 và độ lệch chuẩn = 1 và do đó biểu đồ trông giống như một đường cong normal distribution.

![](https://images.viblo.asia/665a41e5-b867-4172-8b68-a7f1449e8bf4.png)

**4. Sơ đồ phân tán và 3 chiều**

Các biểu đồ phân tán là các biểu đồ được sử dụng rộng rãi, đặc biệt là chúng có ích trong việc hình dung một vấn đề về hồi quy. Trong ví dụ sau, cung cấp dữ liệu được tạo tùy ý về chiều cao và cân nặng và vẽ chúng với nhau. Mình đã sử dụng các phương thức `xlim()` và `ylim()` để đặt giới hạn của trục X và trục Y tương ứng.

![](https://images.viblo.asia/2ad669bc-8f39-4c3b-91c6-c95b3ac474c1.png)

Sự phân tán ở trên cũng có thể được hình dung trong ba chiều. Để sử dụng chức năng này, trước tiên ta cần import module `mplot3d` như sau:

`from mpl_toolkits import mplot3d`

Khi module được nhập, một trục ba chiều được tạo bằng cách chuyển từ khóa `projection='3d'` sang phương thức `axes()`của module Pyplot. Khi đối tượng được tạo, chúng ta chuyển chiều cao và trọng số của đối số cho phương thức `scatter3D()`.

![](https://images.viblo.asia/59b38721-27c1-40be-adc4-1a6fa165cbed.png)

Chúng ta cũng có thể tạo các biểu đồ 3 chiều của các loại khác như biểu đồ đường, bề mặt, khung lưới, đường viền, v.v. Ví dụ trên ở dạng biểu đồ đường đơn giản như sau: Ở đây thay vì `scatter3D()` chúng ta sử dụng phương thức `plot3D()`

![](https://images.viblo.asia/105a1f9b-209f-4d25-9391-93caa338c800.png)

# Kết luận:
Hy vọng bài viết này hữu ích cho bạn. Trước khi mình kết thúc bài viết ở đây là danh sách tất cả các phương thức mà chúng đã xuất hiên.
* plot(x-axis values, y-axis values) —đồ thị đường đơn giản với các giá trị trục x so với giá trị trục y.
* show() - hiển thị biểu đồ
* title(“string”) - đặt tiêu đề
* xlabel(“string”) - đặt nhãn cho trục x
* ylabel(“string”) - đặt nhãn cho trục y
* figure() - dùng để control các thuộc tính của mức hình
* subplot(nrows, ncols, index) - thêm một subplot vào figure hiện tại
* suptitle(“string”) - thêm một tiêu đề chung vào hình
* subplots(nrows, ncols, figsize) - một cách thuận tiện để tạo các subplots. Nó trả về một tuple của figure và số lượng axes
* set_title(“string”) - dùng để đặt tiêu đề cho các ô con
* bar(categorical variables, values, color) - được sử dụng để tạo đồ thị thanh dọc
* barh(categorical variables, values, color) - dùng để tạo biểu đồ thanh ngang
* legend(loc) - dùng để tạo chú thích của đồ thị
* xticks(index, categorical variables) - get hoặc set vị trí đánh dấu hiện tại và nhãn của trục x
* pie(value, categorical variables) - dùng để tạo biểu đồ hình tròn
* hist(values, number of bins) - được sử dụng để tạo histogram
* xlim(start value, end value) - được sử dụng để đặt giới hạn giá trị của trục x
* ylim(start value, end value) - được sử dụng để đặt giới hạn giá trị của trục y
* scatter(x-axis values, y-axis values) - vẽ sơ đồ phân tán với các giá trị trục x so với giá trị trục y
* axes() - thêm một axes vào hình hiện tại
* set_xlabel(“string”) - được sử dụng đễ set nhãn x cho plot được chỉ định
* set_ylabel(“string”) - được sử dụng đễ set nhãn y cho plot được chỉ định
* scatter3D(x-axis values, y-axis values) - vẽ sơ đồ phân tán ba chiều với các giá trị trục x so với giá trị trục y
* plot3D(x-axis values, y-axis values) - vẽ đồ thị đường ba chiều với các giá trị trục x so với giá trị trục y
# Tài liệu tham khảo
Bài viết được dịch từ nguồn: [Matplotlib Tutorial](https://towardsdatascience.com/matplotlib-tutorial-learn-basics-of-pythons-powerful-plotting-library-b5d1b8f67596)