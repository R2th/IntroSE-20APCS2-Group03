Trong Java, static là một từ khóa mà chúng ta rất hay thường gặp khi lập trình. 

Vậy static là gì? Sử dụng chúng trong trường hợp nào? Bài hôm nay mình sẽ giới thiệu với mọi người xung quanh từ khóa này. 

# Biến của lớp và phương thức của lớp 
Thông thường, mỗi một phương thức hay một thuộc tính nào đó đều gắn chặt với một đối tượng cụ thể. Muốn truy cập tới các biến hay phương thức của đối tượng, ta thường đều phải gọi cho các đối tượng cụ thể.

Tuy nhiên, trong một số trường hợp, ta muốn có dữ liệu nào đó của lớp được chia sẻ giữa tất cả các đối tượng thuộc một lớp, các phương thức của lớp hoạt động độc lập với các đối tượng của lớp đó, thì giải pháp là các biến lớp và phương thức lớp. 
## 1 - Biến của lớp(biến static)
Đôi khi, ta muốn một lớp có những biến dùng chung cho tất cả các đối tượng thuộc lớp đó. 
Ta gọi các biến dùng chung này là biến của lớp (class variable), hay gọi tắt là biến lớp. 
Chúng không gắn với bất cứ một đối tượng nào mà chỉ gắn với lớp đối tượng. 
Chúng được dùng chung cho tất cả các đối tượng trong lớp đó.

Để phân biệt giữa biến thực thể và biến lớp khi khai báo trong định nghĩa lớp, ta dùng từ khóa `static` cho các biến lớp. Vì từ khóa đó nên biến lớp thường được gọi là *biến static*.

Lấy ví dụ sau, bên cạnh biến thực thể `name`, lớp `Cow` còn có một biến lớp `numOfCows` với mục đích ghi lại số lượng các đối tượng `Cow` đã được tạo.

Mỗi đối tượng `Cow` có một biến `name` của riêng nó, nhưng `numOfCows` thì chỉ có đúng một bản dùng chung cho tất cả các đối tượng `Cow`. 

`numOfCows` được khởi tạo bằng 0, mỗi lần một đối tượng `Cow` được tạo, biến này được tăng thêm 1 (tại hàm khởi tạo dành cho đối tượng đó) để ghi nhận rằng vừa có thêm một thực thể mới của lớp `Cow`. 

![](https://images.viblo.asia/66f40cfa-d860-4290-9ebd-e1d4a448d9c9.png)

Từ bên ngoài lớp, ta có thể dùng tên lớp để truy nhập biến `static`. Chẳng hạn, dùng `Cow.numOfCows` để truy nhập `numOfCows`:

![](https://images.viblo.asia/79f09dd0-e76d-4bf3-bd7a-9c2cad6f4fb7.png)

## 2 - Phương thức của lớp(hàm static)
Lại xét ví dụ trong phần 1, giả sử ta muốn `numOfCows` là biến `private` để không cho phép ai đó sửa từ bên ngoài lớp `Cow`. 

Nhưng ta vẫn muốn cho phép đọc giá trị của biến này từ bên ngoài, nên ta sẽ bổ sung một phương thức, chẳng hạn `getCount()`, để trả về giá trị của biến đó.
``` Java
public int getCount() {
 return numOfCows;
}
```
Như các phương thức mà ta đã quen dùng, để gọi `getCount()`, người ta sẽ cần đến một tham chiếu kiểu `Cow` và kích hoạt phương thức đó cho một đối tượng `Cow`.

Tuy nhiên, sẽ có những vấn đề xảy ra như sau: 
* Cần đến một con bò để biết được có tất cả bao nhiêu con bò? Nghe có vẻ không được tự nhiên lắm. 
* `getCount()` không dùng đến một đặc điểm hay dữ liệu đặc thù nào của mỗi đối tượng `Cow`
* Khi còn chưa có một đối tượng `Cow` nào được tạo thì không thể gọi được `getCount()`

Phương thức `getCount() `không nên bị phụ thuộc vào các đối tượng `Cow` cụ thể như vậy. 

Để giải quyết vấn đề này, ta có thể cho `getCount()` làm một phương thức của lớp (class method), thường gọi tắt là phương thức lớp – hay phương thức static - để nó có thể tồn tại độc lập với các đối tượng và có thể được gọi thẳng từ lớp mà không cần đến một tham chiếu đối tượng nào. 

Ta dùng từ khóa `static` khi khai báo phương thức lớp:

![](https://images.viblo.asia/0a481bcf-2076-483b-86af-cac7eba60a15.png)

Đặc điểm độc lập đối với các đối tượng của phương thức static chính là lí do ta đã luôn luôn phải khai báo phương thức `main()` với từ khóa `static`.

`main()` được kích hoạt để khởi động chương trình - khi chưa có bất cứ đối tượng nào được tạo – nên nó phải được phép chạy mà không gắn với bất cứ đối tượng nào.

## 3 - Giới hạn của phương thức lớp

Đặc điểm về tính độc lập đó vừa là ưu điểm vừa là giới hạn cho hoạt động của các phương thức lớp.

Không được gắn với một đối tượng nào, nên các phương thức static của một lớp chạy mà không biết một chút gì về bất cứ đối tượng cụ thể nào của lớp đó.

Như đã thấy trong ví dụ phần 2, `getCount()` chạy ngay cả khi không tồn tại bất cứ đối tượng `Cow` nào. 

Kể cả khi gọi `getCount()` từ một đối tượng cụ thể thì `getCount()` cũng vẫn không biết gì về đối tượng `Cow` của đối tượng đó. 

Vì khi đó, trình biên dịch chỉ dùng kiểu khai báo `Cow` để xác định nên chạy `getCount()` của lớp nào, nó không quan tâm tới đối tượng nào. 

Nếu một biến thực thể được dùng đến trong một phương thức lớp, trình biên dịch sẽ không hiểu ta đang nói đến biến thực thể của đối tượng nào, bất kể trong `heap` đang có 10 hay chỉ có duy nhất một đối tượng thuộc lớp đó. 
Tương tự khi gọi các phương thức của thực thể trong các phương thức static

![](https://images.viblo.asia/08233ac5-1af6-452b-9cf3-dbd783df1402.png)
![](https://images.viblo.asia/32f016e8-cced-4ec0-946d-7f57e0db75bb.png)

## 4 - Khởi tạo biến của lớp
Các biến static được khởi tạo khi lớp được nạp vào bộ nhớ. Một lớp được nạp khi máy ảo Java quyết định đến lúc cần nạp, chẳng hạn như khi ai đó định tạo thực thể đầu tiên của lớp đó, hoặc dùng biến static hoặc phương thức static của lớp đó.

Có hai đảm bảo về việc khởi tạo các biến static: 
* Các biến `static` trong một lớp được khởi tạo trước khi bất cứ đối tượng nào của lớp đó có thể được tạo
* Các biến `static` trong một lớp được khởi tạo trước khi bất cứ phương thức static nào của lớp đó có thể chạy

Ta có hai cách để khởi tạo biến static. 
Thứ nhất, khởi tạo ngay tại dòng khai báo biến
``` Java 
private static int numOfCows = 0;
```

Cách thứ hai: Java cung cấp một cú pháp đặc biệt là khối khởi tạo static (static initialization block) – một khối mã được bọc trong cặp ngoặc { } và có tiêu đề là từ khóa static.
``` Java
static {
 numOfCows = 0;
}
```
Một lớp có thể có vài khối khởi tạo static đặt ở bất cứ đâu trong định nghĩa lớp. Chúng được đảm bảo sẽ được kích hoạt theo đúng thứ tự xuất hiện trong mã. 

Và quan trọng bậc nhất là chúng được đảm bảo sẽ chạy trước khi bất gì biến thành viên nào được truy nhập hay phương thức static nào được chạy.

## 5 - Tổng kết 
Có một vài điểm cần lưu ý mà mình mong muốn các bạn cần nhớ được như sau: 
*  Phương thức lớp hay còn gọi là phương thức static không được gắn với một đối tượng cụ thể nào và không phụ thuộc đối tượng nào, nó chỉ được gắn với lớp
*  Nên gọi phương thức static từ tên lớp.
*  Phương thức static có thể được gọi mà không cần có đối tượng nào của lớp đó đang ở trong heap.
*  Do không được gắn với một đối tượng nào, phương thức static không thể truy nhập biến thực thể hay các phương thức thực thể.
*  Biến lớp hay còn gọi là biến static là biến dùng chung cho tất cả các đối tượng của lớp. Chỉ có duy nhất một bản cho cả lớp, chứ không phải mỗi đối tượng có một bản.
*  Phương thức static có thể truy nhập biến static.

# Nguồn tham khảo
Giáo trình Lập trình hướng đối tượng với Java (2010) Trường Đại học Công nghệ - ĐHQGHN