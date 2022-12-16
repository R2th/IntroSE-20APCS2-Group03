# Adapter
**Tên gọi khác: **Wrapper

## Ý đồ
Adapter là một structural design pattern cho phép các interface không tương thích với nhau có thể tương tác với nhau.
![](https://images.viblo.asia/8369df35-1205-4aa9-9d94-fd1101ad83fc.png)

## Vấn đề
Hãy tưởng tượng rằng bạn đang tạo một ứng dụng theo dõi thị trường chứng khoán. Ứng dụng tải dữ liệu chứng khoán từ nhiều nguồn ở định dạng XML và sau đó hiển thị các sơ đồ bảng biểu ra cho người dùng.
Tại một thời điểm nào đấy, bạn quyết định cải thiện ứng dụng bằng cách tích hợp thư viện phân tích thông minh từ bên thứ 3. Nhưng có một vấn đề: Thư viện này chỉ hoạt động với dữ liệu ở định dạng JSON.

![](https://images.viblo.asia/c1aaa67f-1ccf-430a-a536-f7e10fed1bbe.png)
*Bạn không thể cứ thế lắp thư viện vào vì nó yêu cầu dữ liệu ở định dạng không tương thích với ứng dụng của bạn.*

Bạn có thể sửa thư viện để nó có thể xử lý XML. Tuy nhiên, điều này có thể phá vỡ một số code hiện có đang phụ thuộc vào thư viện. Và chưa kể đến là có thể ngay từ đầu bạn đã không có quyền truy cập vào mã nguồn của thư viện, khiến cho cách tiếp cận này không thể triển khai được.

## Giải pháp
Bạn có thể tạo một Adapter. Đây là một đối tượng đặc biệt chuyển đổi giao diện của một đối tượng để đối tượng khác có thể hiểu được nó.

Adapter bao bọc một trong các đối tượng để giấu đi quá trình chuyển đổi phức tạp diễn ra ở hậu trường. Đối tượng được bọc thậm chí không biết về adapter. Ví dụ, bạn có thể wrap một đối tượng hoạt động trên đơn vị mét và kilômét trong một adapter chuyển đổi tất cả các dữ liệu sang đơn vị foot và mile (dặm).

Adapter không chỉ có thể chuyển đổi dữ liệu thành nhiều định dạng khác nhau mà còn có thể giúp các đối tượng có giao diện khác nhau tương tác với nhau. Cách hoạt động nhau sau:

1. Adapter get một giao diện tương thích với một trong các đối tượng hiện có.
2. Sử dụng giao diện này, đối tượng hiện có có thể gọi các phương thức của adapter một cách an toàn.
3. Khi được gọi, adapter sẽ chuyển yêu cầu đến đối tượng thứ hai, nhưng theo định dạng và thứ tự mà đối tượng thứ hai mong đợi.
Đôi khi, chúng ta thậm chí có thể tạo một adapter hai chiều để chuyển đổi các lệnh gọi theo cả hai hướng.

![](https://images.viblo.asia/005ec52b-4f0e-45b3-94c7-b19c9d0e0ae3.png)

Hãy quay lại ứng dụng thị trường chứng khoán của chúng ta. Để giải quyết vấn đề nan giải về các định dạng không tương thích, bạn có thể tạo adapter XML sang JSON cho mọi class của thư viện mà code của bạn làm việc trực tiếp. Sau đó, bạn sửa code của mình để chỉ giao tiếp với thư viện thông qua các adapter này. Khi một adapter nhận được lệnh gọi, nó sẽ dịch dữ liệu XML nhận được sang cấu trúc JSON và chuyển lệnh gọi đến các phương thức thích hợp của một đối tượng được bọc.

## Cấu trúc
**Đối tượng adapter** 
Cách implement này sử dụng nguyên tắc cấu thành đối tượng: Adapter implement giao diện của một đối tượng và bao bọc đối tượng kia. Cách này có thể viết được trong tất cả các ngôn ngữ lập trình phổ biến.

Cấu trúc của adapter DP (đối tượng adapter)
1. **Client** là một class chứa logic nghiệp vụ hiện có của chương trình.
2. **Client interface** mô tả một giao thức mà các class khác phải tuân theo để có thể tương tác với client code.
3. **Service** là một số class mà ta cần để thực hiện một mục đấy nào đó (thường là bên thứ 3 hoặc legacy). Client không thể sử dụng trực tiếp class này vì nó có giao diện không tương thích.
4. **Adapter** là một lớp có thể hoạt động với client và service: nó triển khai client interface và đồng thời wrap đối tượng service. Adapter nhận các lệnh gọi từ client thông qua giao diện adapter và chuyển chúng thành các lệnh gọi tới đối tượng service được bọc theo định dạng mà nó có thể hiểu được.
5. Client code không bị coupled với class adapter cụ thể, miễn là nó hoạt động với adapter thông qua client interface. Nhờ đó, bạn có thể đưa các loại adapter mới vào chương trình mà không phá vỡ client code hiện có. Điều này có thể hữu ích khi giao diện của class service bị thay đổi hoặc thay thế, vì lúc đó bạn chỉ phải tạo một class adapter mới mà không cần thay đổi client code.

**Class adapter** 
Cách implement này sử dụng tính kế thừa: adapter kế thừa các giao diện từ cả hai đối tượng cùng một lúc. Lưu ý rằng phương pháp này chỉ có thể được thực hiện trong các ngôn ngữ lập trình hỗ trợ đa kế thừa, chẳng hạn như C ++.
![](https://images.viblo.asia/4a8a7d81-384a-4d6c-bf59-b7ba6a269c31.png)

1. Class adapter không cần phải bọc bất kỳ đối tượng nào vì nó kế thừa các hành vi từ client và service. Việc điều chỉnh xảy ra trong các phương thức bị override. Adapter kết quả có thể được sử dụng thay cho client class hiện có.

##  Giả mã
Ví dụ sau đây về Adapter DP  được xây dựng dựa trên mối quan hệ xung đột kinh điển giữa "cái cục vuông" và "cái lỗ tròn".
![](https://images.viblo.asia/befdd8c9-f6fd-4eaf-85a6-027cd9460fa6.png)

Adapter giả vờ là một "cục tròn", có bán kính bằng một nửa đường kính của cục vuông (nói cách khác, bán kính của hình tròn nhỏ nhất có thể chứa cục hình vuông).

```
// Say you have two classes with compatible interfaces:
// RoundHole and RoundPeg.
class RoundHole is
    constructor RoundHole(radius) { ... }

    method getRadius() is
        // Return the radius of the hole.

    method fits(peg: RoundPeg) is
        return this.getRadius() >= peg.getRadius()

class RoundPeg is
    constructor RoundPeg(radius) { ... }

    method getRadius() is
        // Return the radius of the peg.


// But there's an incompatible class: SquarePeg.
class SquarePeg is
    constructor SquarePeg(width) { ... }

    method getWidth() is
        // Return the square peg width.


// An adapter class lets you fit square pegs into round holes.
// It extends the RoundPeg class to let the adapter objects act
// as round pegs.
class SquarePegAdapter extends RoundPeg is
    // In reality, the adapter contains an instance of the
    // SquarePeg class.
    private field peg: SquarePeg

    constructor SquarePegAdapter(peg: SquarePeg) is
        this.peg = peg

    method getRadius() is
        // The adapter pretends that it's a round peg with a
        // radius that could fit the square peg that the adapter
        // actually wraps.
        return peg.getWidth() * Math.sqrt(2) / 2


// Somewhere in client code.
hole = new RoundHole(5)
rpeg = new RoundPeg(5)
hole.fits(rpeg) // true

small_sqpeg = new SquarePeg(5)
large_sqpeg = new SquarePeg(10)
hole.fits(small_sqpeg) // this won't compile (incompatible types)

small_sqpeg_adapter = new SquarePegAdapter(small_sqpeg)
large_sqpeg_adapter = new SquarePegAdapter(large_sqpeg)
hole.fits(small_sqpeg_adapter) // true
hole.fits(large_sqpeg_adapter) // false
```

##  Tính ứng dụng
1. **Sử dụng class adapter khi bạn muốn sử dụng một số class hiện có, nhưng giao diện của nó không tương thích với phần còn lại của code của bạn.**
Mẫu adapter cho phép bạn tạo một lớp trung gian đóng vai trò là người dịch giữa code của bạn và class kế thừa, class của bên thứ 3 hoặc bất kỳ class nào khác có giao diện kỳ quặc.

2. **Sử dụng DP này khi bạn muốn sử dụng lại một số class con hiện có đang thiếu một số chức năng phổ biến, nhưng không thể thêm vào class cha.**
Bạn có thể mở rộng từng class con và đưa chức năng còn thiếu vào các class con mới. Tuy nhiên, bạn sẽ cần phải duplicate code trên tất cả các class mới này, và đây là **code rất thối**.

Giải pháp thanh lịch hơn nhiều sẽ là đưa chức năng còn thiếu vào một lớp adapter. Sau đó, bạn sẽ wrap các đối tượng có các tính năng bị thiếu bên trong adapter, lấy các tính năng cần thiết một cách động. Để điều này hoạt động, các class đích phải có một giao diện chung và các field của adapter phải tuân theo giao diện đó. Cách tiếp cận này rất giống với Decorator DP.

## Cách triển khai
1. Đảm bảo rằng bạn có ít nhất hai class có giao diện không tương thích:
    Một class service mà bạn không thể thay đổi (thường là của bên thứ 3, legacy, hoặc có rất nhiều dependencies)
    Một hoặc một số class client sẽ được hưởng lợi từ việc sử dụng class service.
2. Khai báo giao diện client và mô tả cách client giao tiếp với service.
3. Tạo class adapter và làm cho nó tuân theo giao diện client. Ở bước này, tạm thời để trống tất cả các phương thức.
4. Thêm một trường vào class adapter để lưu trữ một tham chiếu đến đối tượng service. Practice phổ biến là khởi tạo trường này thông qua phương thức khởi tạo, nhưng đôi khi sẽ thuận tiện hơn nếu làm theo kiểu pass nó cho adapter khi gọi các phương thức của nó.
5. Implement tất cả các phương thức của giao diện client trong class adapter. Adapter nên ủy thác hầu hết công việc thực tế cho đối tượng service, và chỉ xử lý chuyển đổi giao diện hoặc định dạng dữ liệu.
6. Client nên sử dụng adapter thông qua giao diện client. Điều này sẽ cho phép bạn thay đổi hoặc mở rộng adapter mà không ảnh hưởng đến code client.


##  Ưu và nhược điểm
**Ưu điểm:** 
1. Single Responsibility Principle. Bạn có thể tách giao diện hoặc mã chuyển đổi dữ liệu khỏi logic nghiệp vụ chính của chương trình.
2. Open/Closed Principle. Bạn có thể đưa các loại adapter mới vào chương trình mà không vi phạm code client hiện có, miễn là chúng hoạt động với adapter thông qua giao diện client.

**Nhược điểm:** 
Độ phức tạp tổng thể của code tăng lên vì bạn cần viết một tập hợp các giao diện và class mới. Đôi khi, bạn chỉ cần làm đơn giản là thay đổi class service để nó có thể hoạt động với phần còn lại của code của bạn.


## Mối quan hệ với các design pattern khác
**Bridge** thường được thiết kế từ trước, cho phép bạn phát triển các phần của ứng dụng một cách độc lập với nhau. Mặt khác, adapter thường được sử dụng với một ứng dụng hiện có để làm cho một số class không tương thích với nhau có thể hoạt động với nhau.
**Adapter** thay đổi giao diện của một đối tượng hiện có, trong khi Decorator nâng cấp một đối tượng mà không thay đổi giao diện của nó. Ngoài ra, Decorator hỗ trợ recursive composition, điều này không thể thực hiện được khi bạn sử dụng adapter .
**Adapter** cung cấp một giao diện khác cho đối tượng được bao bọc, Proxy cung cấp cho nó cùng một giao diện và Decorator cung cấp cho nó một giao diện nâng cao.
**Facade** định nghĩa một giao diện mới cho các đối tượng hiện có, trong khi Adapter cố gắng làm cho giao diện hiện có có thể sử dụng được. Adapter thường chỉ bao bọc một đối tượng, trong khi Facade hoạt động với toàn bộ hệ thống con của các đối tượng.
**Bridge , State , Strategy** (và ở một mức độ nào đó là **Adapter**) có cấu trúc rất giống nhau. Thật vậy, tất cả các mẫu này đều dựa trên composition, tức là ủy thác công việc cho các đối tượng khác. Tuy nhiên, chúng  giải quyết các vấn đề khác nhau. Một DP không chỉ là một công thức để cấu trúc code của bạn, mà còn là một cách thức để bạn giao tiếp với các dev khác về vấn đề bạn muốn giải quyết bằng cách sử dụng DP ấy.