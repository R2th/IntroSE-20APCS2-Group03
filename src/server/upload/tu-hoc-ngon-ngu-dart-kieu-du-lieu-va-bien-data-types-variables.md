![image.png](https://images.viblo.asia/39c566c5-1de1-4f99-ac61-7fd736df0f68.png)

Bạn có thể xem thêm bài viết tại đây: [series tự học ngôn ngữ Dart](https://200lab.io/blog/tu-hoc-ngon-dart-nhung-dieu-can-biet-truoc-khi-bat-dau/)

## 1. Đối tượng (Objects) là gì?
Trong phần này bạn sẽ được giới thiệu một cách ngắn gọn và dễ hiểu về đối tượng

### Đối tượng trong thực tế

![image.png](https://images.viblo.asia/deb720e0-f50e-499c-84af-5f4695b18b86.png)

Hãy quan sát một chút nhé, bạn có thể thấy đối tượng có ở khắp xung quanh chúng ta. Từ thức ăn mà chúng ta ăn cho đến thú cưng mà chúng ta nuôi. Tất cả mọi thứ đều là đối tượng.

Mỗi đối tượng đều có nét đặc trưng và hành vi riêng. Ví dụ, một người sẽ có những nét đặc trưng như là: tên, tuổi và chiều cao. Và người đó cũng có thể có những hành vi như đi bộ, ăn và ngủ. Những nét đặc trưng và hành vi này khi kết hợp lại sẽ quyết định người đó là ai.

### Đối tượng trong ngôn ngữ Dart

Tương tự như vậy, mọi thứ trong Dart đều là đối tượng. Đối tượng trong ngôn ngữ lập trình cũng có những nét đặc trưng được biết như là **thuộc tính (properties)** và cũng thực hiện những hành vi gọi là **phương thức (methods)**. Thuộc tính đại diện cho những gì mà đối tượng biết và phương thức đại diện cho những gì đối tượng có thể làm được.

## 2. Biến là gì?

Biến được sử dụng để chứa các thông tin. Các thông tin này sẽ được chương trình máy tính sử dụng sau này. Hãy nhìn khái niệm này ở một góc độ khác.

Hãy tưởng tượng bạn đang xây dựng một kệ sách bằng gỗ. Bạn cần những ván gỗ, đinh, và những công cụ khác để hoàn thành kệ sách. Để sắp xếp vật liệu tốt hơn, bạn quyết định nhóm những thứ tương tự nhau vào trong một hộp. Việc này giúp bạn dễ tìm vật liệu hơn khi cần và tiết kiệm được rất nhiều thời gian. Bạn sẽ có một hộp dành cho ván gỗ, một hộp dành cho đinh và một hộp dành cho các dụng cụ.

Tuy nhiên, ở đây lại phát sinh ra một vấn đề khác. Ván gỗ có nhiều loại, loại dài, loại ngắn,... đinh và công cụ cũng vậy. Tới đây thì ta phải tiếp tục chia các vật liệu vào những hộp riêng biệt hơn. Một hộp cho một loại. Bây giờ thì chúng ta loại có quá nhiều hộp cho nên cần gắn nhãn để dễ phân biệt và tìm kiếm chúng. Tới đây thì bạn đã có một cách sắp xếp các vật liệu hiệu quả và có thể dễ dàng tìm chúng mỗi khi bạn cần.

![image.png](https://images.viblo.asia/5ccd1e7b-9c07-4362-bf6a-21ac9a9411fc.png)

Tương tự như vậy, một biến là một hộp nhỏ dùng để chứa dữ liệu. Khi chúng ta gán một giá trị cho một biến thì cũng giống như việc chúng ta đặt vật liệu vào một cái hộp. Khi chúng ta khai báo biến chính là hành động gắn nhãn vào hộp đó và cho nó một cái tên riêng hay là một nhận dạng, xác định kiểu dữ liệu nó có thể chứa và thiết lập giá trị ban đầu của nó.

Quay lại với ngôn ngữ Dart và xem thử cách mà chúng ta sẽ khai báo một biến.

### 2.1 Khai báo biến trong ngôn ngữ Dart

Hãy nhìn vào syntax khai báo biến trong ngôn ngữ Dart.

> Mỗi ngôn ngữ mà chúng ta nói thông thường đều có một bộ quy luật cách cấu trúc từ và câu. Những quy tắc này được gọi chúng là cú pháp của ngôn ngữ. Trong ngôn ngữ lập trình máy tính, những cú pháp (syntax) cũng phục vụ chung mục đích như vậy.

![image.png](https://images.viblo.asia/5f7b6616-66fa-4ef9-8fb0-8470e50bb1e9.png)

Chúng ta khai báo bằng cách đề cập đến kiểu dữ liệu mà biến của chúng ta sẽ chứa, chẳng hạn như số nguyên. Sau đó là tên riêng của biến, tiếp theo là dấu bằng (`=`) và giá trị ban đầu. Đừng quên dấu chấm phẩy ở cuối nhé.

> Một kiểu quy ước đặt tên trong Dart đó là viết hoa chữ cái đầu của mỗi từ ngoại trừ từ đầu tiên và các từ đều viết liền với nhau và không sử dụng dấu phân cách. Ví dụ: lowerCamelCase.
Hãy xem cách khai báo biến thực tế trong ngôn ngữ Dart sẽ như thế nào nhé:

```
main() {
  int myFirstDartVariable = 5;
}
```

Trong đoạn code ở trên chúng ta khai báo biến với tên `myFirstDartVariable. myFirstDartVariable` có thể chứa kiểu dữ liệu là `int` (integer - số nguyên) và được gán giá trị ban đầu là `5`.

### 2.2 Printing Variables

Syntax cơ bản của câu lệnh print như sau:

![image.png](https://images.viblo.asia/e725eaec-63b6-451e-bb7a-33c9f803f0ca.png)

Bạn đã học cách khai báo biến `myFirstDartVariable` bây giờ hãy thử học cách in nó xem sao nhé:

```
main() {
  int myFirstDartVariable = 5;
  print(myFirstDartVariable);
}
```

Output: `5`

Trong đoạn mã ở trên, chúng ta chỉ cần chuyển tên biến vào câu lệnh `print` và chương trình sẽ trả lại giá trị được gán cho biến, tức là số `5`.

## 3. Kiểu dữ liệu là gì?

![image.png](https://images.viblo.asia/dd00b885-97b6-436d-9dbc-63aefe9908f3.png)

Kiểu dữ liệu của một phần tử hay một biến là một thuộc tính cho chúng ta biết loại dữ liệu nào mà biến có thể chứa được. Điều này tương tự với việc chúng ta chọn loại vật liệu nào để có thể bỏ vào hộp ở ví dụ trên.

Kiểu dữ liệu có thể là những thứ mà chúng ta đã gặp hằng ngày như là các con số, chữ cái hay những ký tự được phân loại dựa trên những thuộc tính tương tự của chúng.

### 3.1 Những kiểu dữ liệu được tính hợp sẵn trong ngôn ngữ Dart

> Numbers, Strings, Booleans, Lists, Sets, Maps, Runes, Symbols

Trong series bài viết này chúng ta sẽ tập trung vào những kiểu dữ liệu sau: **numbers, strings, booleans, lists, sets,** và **maps**. Còn runes và symbols sẽ không được đề cập đến.

Trước khi tìm hiểu chi tiết vào từng kiểu dữ liệu, có hai khái niệm mà bạn cần phải làm quen trước.

### 3.2 Tham trị (values) và tham chiếu (references)

Kiểu dữ liệu có thể chia thành hai loại:

1.  Kiểu tham chiếu (Reference type)
2.  Kiểu tham trị (Value type)

Những thông tin được cung cấp bởi kiểu tham trị thì chính những thông tin đó là giá trị luôn. Còn đối với kiểu tham chiếu, những thông tin nó cung cấp là một tham chiếu đến một vài đối tượng, tức là địa chỉ bộ nhớ nơi mà đối tượng đó được lưu trữ.  Để làm rõ hơn, hãy nhìn vào những đối tượng vật lý dưới đây.

Tưởng tượng bạn có một mẩu giấy. Bạn muốn mẫu giấy đó chứa một vài thông tin, như là tên của bạn. Bạn viết tên của mình lên mẫu giấy, do đó giá trị của mẫu giấy cũng chính là thông tin mà nó cung cấp. Đây là một ví dụ của kiểu tham trị. Nếu ai đó muốn biết tên của bạn, họ chỉ đơn giản là đọc tờ giấy đó.

Bây giờ hãy tưởng tượng tiếp nhé, nếu bạn muốn tớ giấy đó chứa nhà của bạn thì sao? Điều đó hoàn toàn phi thực tế phải không? Do đó, bạn sẽ viết địa chỉ nhà của bạn lên tờ giấy, vì vậy giá trị của tờ giấy là một tham chiếu đến thông tin được yêu cầu. Đây là một ví dụ của kiểu tham chiếu. Nếu một người muốn đi đến nhà của bạn, đầu tiên họ phải đọc thông tin trên tờ giấy rồi sau đó tìm đường để đi đến.

Tương tự như vậy, kiểu tham chiếu chứa vị trí địa chỉ bộ nhớ của dữ liệu, trong khi kiểu tham trị thì chứa chính thông tin giá trị đó luôn.

### 3.3 Kiểu dữ liệu là đối tượng

Trong hầu hết các ngôn ngữ, kiểu dữ liệu gốc là kiểu tham trị, nhưng trong ngôn ngữ Dart, tất cả kiểu dữ liệu đều là đối tượng. Điều này có nghĩa là kiểu dữ liệu gốc trong ngôn ngữ Dart là kiểu tham chiếu. Do đó, chúng ta có thể nói rằng, trong ngôn ngữ Dart tất cả các biến đều chứa tham chiếu và đang tham chiếu đến các đối tượng.

### 3.4 Giá trị mặc định

Các biến chưa được gán giá trị đều có một giá trị ban đầu của `null`. Ngay cả các biến với kiểu số đều là `null` ban đầu. Bởi vì số (numbers) - giống như hầu hết các thứ khác trong ngôn ngữ Dart - đều là đối tượng. `null` đơn giản có nghĩa là một biến không tham chiếu đến một đối tượng, nó cũng không tham chiếu đến bất kỳ thứ gì khác.

## 4. Khai báo literal

Chúng ta sẽ sử dụng từ “Khai báo literal” xuyên suốt series bài viết này.  Khai báo literal là việc khai báo trực tiếp các giá trị cố định khi chúng xuất hiện trong source code. Ví dụ: việc khai báo "Hello World", 5 và ‘A 'đều là khai báo literal.

Qua bài viết này bạn đã có thêm kiến thức về kiểu dữ liệu và biến. Chúng ta hãy tìm hiểu chi tiết hơn về những kiểu dữ liệu trong ngôn ngữ Dart ở bài viết tiếp theo nhé.