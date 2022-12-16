Trong Java, từ khóa static được sử dụng chính để quản lý bộ nhớ. Chúng ta có thể áp dụng từ khóa static với các biến, các phương thức, các block hoặc các nested class. Hiểu một cách đơn giản, từ khóa static biến thành phần đó thuộc về lớp chứ không thuộc về instance (thể hiện) của lớp.

Trong java, static có thể là:
* Static property: Khai báo các thuộc tính tĩnh.
* Static method: Khai báo các phương thức tĩnh.
* Static block: Được sử dụng để khởi tạo thành viên dữ liệu static.

Kotlin tuy có tính tương thích ngược hoàn toàn với Java, tuy nhiên không phải cái gì của Java nó cũng giữ lại. Đơn cử ở đây là từ khoá `static`. Vậy thì vì lý do gì mà những nhà phát triển Kotlin lại muốn xoá bỏ từ khoá cực mạnh này ?

![](https://images.viblo.asia/7064bfde-cb0d-44e1-bff6-4d5d3cb5eaf4.png)

## Kotlin không bị hạn chế như Java

Trong Java, mọi thứ đều phải được khai báo bên trong một class. Thậm chí một class phải tương ứng với một tệp tin .java. Điều này phát sinh vấn đề khi ta muốn khai báo những thành phần tĩnh, không phụ thuộc vào thể hiện của các class và có thể dùng chung ở nhiều nơi. Chính vì việc phải đặt những thành phần tĩnh này bên trong các class nên ta cần có thêm từ khoá static để phân biệt thành phần ở cấp độ class với thành phần ở mức độ thể hiện (instance).

Nhưng Kotlin thì không như vậy, nó cho phép ta khai báo cả những thành phần bên ngoài các class như hằng số, các biến và các hàm bên ngoài các class. Các thành phần bên ngoài class sẽ được mặc định là static với tư cách là top-class level, ngang hàng với các class. Chính vì vậy, ta không cần phải khai báo các thành phần tĩnh bên trong các class nữa nên cũng chẳng cần từ khoá static làm gì.

## Static không tuân thủ phong cách OOP

Kotlin là một ngôn ngữ lập trình hướng đối tượng (OOP). Trong OOP, một cái gì đó không phải là một đối tượng là một sự khập khiễng lớn. Các class không phải là các đối tượng mà chỉ có các thể hiện của class là các đối tượng. Với Java ta sẽ có các đối tượng là các instance member, và các class với các thành phần tĩnh. Tại sao lại phải như vậy trong khi ta có thể chỉ cần các đối tượng là các thể hiện mà thôi ?

![](https://images.viblo.asia/796d86c3-86df-4170-a2f3-4be1dd9698e3.jpg)

Kotlin đưa ra `companion object` là các nest static class nằm trong các class chính. Khi class chính được gọi tới lần đầu, một thể hiện của lớp này được tạo ra chứa các thuộc tính và phương thức bên trong để các thể hiện của class chính có thể gọi tới. Việc sử dụng gần như giống với static trong Java nhưng rõ ràng đó là một đối tượng thực sự chứ không phải là class static member. Các nhà phát triển coi việc này tối ưu hơn so với cách sử dụng static member của Java.

Trong Java, các thành phần tĩnh được đối xử rất khác so với các thành phần đối tượng thông thường. Điều này có nghĩa là bạn không thể thực hiện những việc như triển khai interface hoặc đưa chúng vào Map hoặc chuyển nó làm tham số cho phương thức get. Trong khi đó `companion object` cho phép những điều này. Đó là cũng là một lợi thế.

Nếu muốn các thuộc tính, phương thức trong `companion object` là các thuộc tính, phương thức static để dùng với Java, ta có thể thêm annotation `@JvmStatic` vào phía trước để có thể gọi từ code Java như là các static member.

## Kotlin là một ngôn ngữ hướng Product

Việc để lẫn lộn các thành phần tĩnh và "động" trong cùng một class là một thứ không hề hay ho vì sẽ khiến class trở nên rất dài với đám static vô cùng lộn xộn được khai báo ở ngày trên cùng. Việc sử dụng Singleton thay cho static cũng là một phương án được ưu tiên hơn rất nhiều. Tuy nhiên trong Java việc khai báo một Singleton rất dài dòng.

Kotlin đã cung cấp tất cả những công cụ cho việc này để giúp quá trình phát triển sản phẩm trở nên nhanh chóng và hiệu quả hơn. Các từ khoá object, companion object, const được đưa ra nhằm giải quyết các vấn đề phức tạp đó.

Với object, ta có thể nhanh chóng khai báo một class Singleton, mọi tham số bên trong nó đều hoạt động như các thành phần static. Với companion object ta có thể gom các static class member vào một chỗ. Với const, ta có thể khai báo các hằng với kiểu dữ liệu nguyên thuỷ.

## Tổng kết
`Static` không phải là từ khoá nên sử dụng trong các ngôn ngữ lập trình hiện đại. Kotlin là một ngôn ngữ hiện đại và hướng tới mục đích phát triển sản phẩm phần mềm hiệu quả, nhanh chóng, cung cấp nhiều tính năng tiện ích nhằm thay thế hoàn toàn và hiệu quả, linh hoạt hơn nhiều so với `static` trong Java. Thông qua bài viết này hy vọng các bạn đã hiểu được vì sao Kotlin lại bỏ đi một trong những từ khoá quan trọng nhất trong Java như vậy. Nếu có bất kỳ sai sót nào rất mong nhận được sự góp ý từ các bạn để bài viết này được hoàn thiện hơn.