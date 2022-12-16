![image.png](https://images.viblo.asia/f042c30f-4657-4559-b41d-eb233712deea.png)

## 1. Giới thiệu về console

Console là một bảng điều khiển dành cho việc debug của các nhà phát triển, nó được tích hợp vào trong trình duyệt từ thuở sơ khai. Thuở ban đầu, nó được biết như là một phương tiện để báo lỗi cho các nhà phát triển.

Tuy nhiên, với sự phát triển của công nghệ dẫn đến trình duyệt cũng được phát triển hơn so với trước kia thì khả năng của nó cũng dần tăng lên rất nhiều; chẳng hạn như tự động ghi lại nhật ký thông tin như: network requests, network responses, security errors hay warnings.

Dưới đây là ví dụ về phần network request và network responses của trang zingmp3, bao gồm các thông tin như: số lượng request, thời gian gửi, thời gian nhận, dung lượng transferred, ...

![image.png](https://images.viblo.asia/37e103e3-e37b-4423-a55a-ee1663b9b4a9.png)

Để xem được data mà một api trả về ta click vào một request api bất kỳ chọn tab Response hoặc Preview như hình, đây là phần data trả về của api keyword search.

![image.png](https://images.viblo.asia/6e58359a-e4df-4675-a1cd-5204d9fe82c9.png)

Có một số cách để JavaScript của một trang web kích hoạt được các câu lệnh khác nhau và hiển thị ra console dành cho việc debug. Các câu lệnh này đều được chứa trong một console object có sẵn trên hầu hết các trình duyệt.

Vậy các câu lệnh đó là câu lệnh nào? mời bạn đến với phần tiếp theo nhé ?

## 2. Một số câu lệnh console

Console object có khá nhiều phương thức, tuy nhiên mình chỉ sẽ giới thiệu cho bạn những phương thức mà được sử dụng nhiều thôi nhé ?.

(Những ví dụ minh họa trong hình đề được sử dụng trên cửa sổ lệnh console của trình duyệt chrome, để mở nó bạn sử dụng tổ hợp phím ctrl + shift + I và chọn vào tab console nhé).

![image.png](https://images.viblo.asia/e5d387e7-00ae-40dd-bef2-5228568f2c18.png)

### 2.1 console.log()

Đây là câu lệnh được sử dụng nhiều nhất, nó cũng giúp ích cho việc debug rất nhiều. Không một ai code JavaScript mà chưa từng sử dụng lệnh này.

Với lệnh console.log() nó sẽ in ra cửa sổ lệnh console các giá trị ở dạng string, number hay object mà ta truyền vào nó. Phương thức này rất có ích khi nó có thể giúp ta xem được kết quả trả về của một function hay một tính toán nào đó để giúp ta có biết được có đúng hay không, hoặc cũng có thể giúp ta xem được data trả về có những gì khi ta lấy data từ server, ...
Ví dụ:

![image.png](https://images.viblo.asia/1c0ac836-990d-4790-bd26-776b6f0500e2.png)

(Để xuống dòng trong cửa sổ console của trình duyệt thì bạn nhất tổ hợp phím shift + enter nhé ?)

Một cái hay của lệnh console.log() là ta có thể set CSS cho phần text mà ta muốn hiển thị ra, như hình bên dưới.

![image.png](https://images.viblo.asia/f5f0da0e-43e2-484e-b251-42653d5e738e.png)

Trông khá thú vị phải không nào ?. Facebook cũng dùng cách này để cảnh báo người dùng khi sử dụng công cụ devtool của trình duyệt đấy ?

![image.png](https://images.viblo.asia/0d0c95f9-888e-4d05-a6d9-cf2812723013.png)

### 2.2 console.info(), console.warn(), console.error()

Những câu lệnh này về cơ bản thì nó cũng không khác gì so với console.log(). Tuy nhiên với từng câu lệnh trên nó sẽ in ra các giá trị với từng màu sắc khác nhau cũng như các ký tự khác nhau như hình:

![image.png](https://images.viblo.asia/71db4724-091e-4243-97c8-f2bf47943e2c.png)

### 2.3 console assert()

Câu lệnh này khá giống với console.error(), tuy nhiên nó khác ở điểm console.assert() nó nhận 2 tham số đầu vào gồm một biểu thức boolean và một message được in ra nếu như biểu thức boolean đó trả về giá trị false

![image.png](https://images.viblo.asia/6ee57f31-4c17-4717-8e90-d169cc0d5358.png)

### 2.4 console.clear()

Câu lệnh này được sử dụng để clear (dọn dẹp) hết tất cả những nội dung có trên cửa sổ lệnh console.

code:

![image.png](https://images.viblo.asia/b0ae1703-957a-4f32-bd00-8e51efd53277.png)

Trước khi clear:

![image.png](https://images.viblo.asia/23055321-6334-49cb-a71a-7cfc5fb3f964.png)

Sau khi nhấn button Clear Console:

![image.png](https://images.viblo.asia/01290232-bbdb-41f9-bb0a-23c6c6942ec1.png)

### 2.5 console.dir()

Với lệnh này ta có thể in ra DOM, truyền các object bình thường thì nó cũng có thể in ra được như console.log(). Tuy nhiên nếu với DOM thì sẽ khác.

Với console.log() thì nó sẽ in DOM ra dưới dạng HTML như hình:

![image.png](https://images.viblo.asia/b6835efa-0a9b-4aa8-8d18-5c90dd0cabde.png)

Còn với lệnh console.dir(), nó sẽ in ra dưới dạng một object với các thuộc tính là các element nằm bên trong DOM.

![image.png](https://images.viblo.asia/e6ae3bbc-e643-4f30-a158-cce3fa6258dd.png)

### 2.6 console.group()

Câu lệnh này rất giúp ích cho việc debug, với console.log() nó sẽ in ra toàn bộ kết quả trên cửa sổ console, đôi khi chúng ta cảm thấy khá là rối mắt với những kết quả trả về rất nhiều.

Với console.group() nó sẽ in ra kết quả có tổ chức hơn bằng cách gom các kết quả thành các block một cách có tổ chức. Nó sẽ gom các câu lệnh sau nó cho đến khi gặp console.groupEnd() thì sẽ dừng lại mà back ra lại một level.

Bạn có thể xem ví dụ như hình dưới cho dễ hình dung nhé ?

![image.png](https://images.viblo.asia/b44ddf2d-a95e-488f-913c-8d0f52021af5.png)

### 2.7 console.table()

Nếu bạn vẫn thấy giá trị được in ra từ console.group() vẫn chưa đủ trực quan và đỡ rối mắt thì console.table() sẽ khắc phục được việc này. Như tên gọi, nó sẽ in kết quả ra cửa sổ console dưới dạng bảng. Ta có thể sử dụng nó để in các data ở dạng: object, array, array of object, array of arrays.

Một ví dụ về console.group() với data là một object:

![image.png](https://images.viblo.asia/685fce4a-d62c-4a09-becf-61be11b83d80.png)

Giờ nhìn khá là rõ ràng và tường minh hơn rồi nhỉ ?. Với các data có kiểu khác các bạn tự khám phá thêm nhé ?

### 2.8 console.time()

Để muốn biết thời gian chạy của một đoạn code bất kỳ mất bao lâu thì bạn có thể dùng lệnh này. Để chạy được thì bạn cần đặt đoạn code của mình ở giữa hai lệnh console.time() và console.timeEnd().

Ngoài ra nếu bạn muốn in ra thời gian chạy của một đoạn code bất kỳ mà bạn muốn nữa thì có thể dùng lệnh console.timeLog() bên trong cặp lệnh console.time() và console.timeEnd().

Bạn có thể xem ví dụ dưới để cho dễ hiểu hơn nhé ?

![image.png](https://images.viblo.asia/6fb808e7-1d59-4c7c-ad1c-11b97386fd92.png)

## 3. Tổng kết

Với các câu lệnh console mà mình giới thiệu ở bên trên hy vọng sẽ giúp ích cho các bạn trong việc debug ở hiện tại cũng như sau này. Trong bài này mình có sử dụng cửa sổ lệnh console trên trình duyệt một trong những feature của công cụ devtool của trình duyệt nói chung cũng như Chrome devtool nói riêng.

Trong bài sau, chúng ta cùng nhau tìm hiểu sâu hơn về công cụ này nhé ?. Cứ yên tâm, nó sẽ giúp ích rất nhiều cho bạn sau này nếu bạn trở thành một web developer đấy ?