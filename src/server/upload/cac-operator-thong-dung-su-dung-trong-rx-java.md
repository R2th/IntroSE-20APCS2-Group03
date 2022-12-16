Như tìm hiểu ở phần 1 về Rx ở bài này mình sẽ tập trung vào các operator sử dụng trong Rx java
<br>
### -- Creating Observables
**1.just()**

Như tên gọi của hàm, toán tử chỉ phát ra các giá trị tương tự được cung cấp trong các đối số.
![](https://images.viblo.asia/a603bfcf-6810-42f8-a1a7-7a941fc72399.png)
<br>
VD : Observable.just(1, 2, 3, 4, 5)

Ở đây,observable với toán tử just của chúng ta đã được áp dụng. Vì vậy, observable sẽ phát ra từ 1 đến 5 số nguyên.
* Có một toán tử khác : from() lấy mảng của một đối tượng làm đầu vào và phát ra đối tượng lần lượt giống như toán tử just (). Dưới đây là các đoạn mã để tạo ra số nguyên từ 1 đến 5 bằng cách sử dụng toán tử from ().
Observable.from(new Integer[]{1, 2, 3, 4, 5});
<br>
### -- Filtering Operators:
* Các toán tử lọc sẽ lọc ra các đối tượng dòng dữ liệu dựa trên một số biểu thức và chỉ phát ra các đối tượng dữ liệu thỏa mãn biểu thức.
<br>
**1.filter() :**
<br>
Đôi khi chúng ta muốn tinh chỉnh sự kiện cụ thể chỉ được phát ra bởi observable. Giả sử chúng ta chỉ muốn chỉ phát ra các số lẻ trong số các phần tử được phát ra bởi Observable. Chúng ta có thể đạt được điều này bằng cách sử dụng một toán tử được gọi là filter ().

![](https://images.viblo.asia/16bc69b1-f1f8-42e9-9d27-dbf56c74ccb2.png)

Như tên gợi ý toán tử bộ lọc, lọc các mục được phát ra bởi một Observable. Sử dụng filter() chúng ta có thể quyết định phát ra đối tượng hay không dựa trên một số điều kiện.

 
![image.png](https://images.viblo.asia/1f468c99-044a-482f-8f03-613328eec45e.png)

**2. skip():**<br>
skip(n) sẽ loại bỏ n mục đầu tiên được phát ra bởi một Observable và phát ra dữ liệu sau n phần tử. Vì vậy, skip (2) sẽ bỏ qua phát 2 phần tử đầu tiên và bắt đầu từ phát ra phần tử thứ 3.

![](https://images.viblo.asia/794819a4-56cb-4fb4-836e-dc941cda7d32.png)
Vì vậy, ví dụ của chúng tôi, nếu chúng tôi áp dụng toán tử skip (2), nó sẽ chỉ phát ra 3, 4 và 5 số nguyên.
  
![image.png](https://images.viblo.asia/f789bd16-afe8-4112-8c16-d05b767470dd.png)

**3. take():**
take() là trái ngược với toán tử skip (). take (n) sẽ chỉ phát ra n phần tử dữ liệu đầu tiên và bỏ qua tất cả các phần tử dữ liệu sau n phần tử được phát ra.
![](https://images.viblo.asia/a5164357-154d-4e36-bc02-883e356dfa1e.png)
* takeLast() sẽ chỉ phát ra phần tử cuối cùng từ luồng dữ liệu.
* Trái ngược với takeLast() toán tử takeFirst () sẽ chỉ phát ra phần tử đầu tiên của luồng dữ liệu và bỏ qua các phần tử dữ liệu tiếp theo.

### -- Combining Operators:
* Các toán tử làm việc với nhiều observable để tạo một observable duy nhất

**1. merge():**<br>
Toán tử merge() kết hợp nhiều Observable thành một bằng cách hợp nhất các phần tử được phát ra bởi các Observable.Toán tử merge() có thể xen kẽ các kết quả đầu ra vì nó phát ra dữ liệu từ cả hai Observable được đồng thời ngay khi dữ liệu có sẵn để phát.

![](https://images.viblo.asia/44f91687-0412-44a9-84f7-9c1867d24ef9.png)

**2. zip():**<br>
zip()  kết hợp phát xạ của nhiều operator với nhau thông qua một chức năng được chỉ định và phát ra các mục đơn lẻ cho mỗi tổ hợp dựa trên kết quả của chức năng này.

![](https://images.viblo.asia/0c03d837-3be0-4afe-ab90-f2826d2d964d.png)

Đây là ví dụ mà bạn có thể kết hợp các chuỗi và luồng dữ liệu số nguyên thành một ZipObject (lớp tùy chỉnh) và phát ra chúng dưới dạng luồng dữ liệu cuối cùng.

![image.png](https://images.viblo.asia/953efc40-1b2f-4693-8d7b-7e0bee3d77fa.png)

### -- Mathematical and Aggregate Operators<br>
**1. concat():**
Toán tử Concat nối kết quả đầu ra của nhiều Observable để chúng hoạt động giống như một Observable duy nhất.

![image.png](https://images.viblo.asia/1492539a-60ed-490d-9e9c-1956c8159f8d.png)
Giả sử bạn có hai observable. Observable1 lần lượt phát ra từ số nguyên từ 1 đến 5 và một Observable2 phát ra số nguyên từ 6 đến 10. Nếu chúng ta kết hợp chúng, Observable1 sẽ phát ra từ 1 đến 5 và Observable2 sẽ phát ra dữ liệu từ 6 đến 10 đồng thời. Toán tử concat () sẽ hợp nhất cả luồng dữ liệu và phát ra dữ liệu từ Observable1 và sau đó sẽ phát ra dữ liệu từ Observable2. Dưới đây là sơ đồ  giải thích .

![](https://images.viblo.asia/25e63556-6c84-4bce-a993-e0928ddfe1ea.png)
**Tài liệu tham khảo**
- http://reactivex.io/documentation/operators.html
<br>
- https://medium.com/@kevalpatel2106/what-should-you-know-about-rx-operators-54716a16b310