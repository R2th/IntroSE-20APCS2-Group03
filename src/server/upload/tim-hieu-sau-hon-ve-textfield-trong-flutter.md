TextField là một trong những thành phần hết  sức quen thuộc cho các lập trình viên mobile. 
Trong bài viết này, chúng ta đi sâu vào tiện ích Flutter TextField một cách toàn diện và tìm hiểu các tính năng và các tùy chỉnh có thể có của nó.

## Giới thiệu về TextField
Một widget TextField cho phép thu thập thông tin từ người dùng. Code cho TextField cơ bản đơn giản như:
```dart
TextField()
```

Điều này tạo ra một TextField cơ bản:

![](https://images.viblo.asia/74e336b6-b43c-4391-94a0-dba7b32be57c.png)

## Lấy thông tin từ TextField
Vì TextField không có ID như trong Android, văn bản không thể được truy xuất theo yêu cầu và thay vào đó phải được lưu trữ trong một biến khi thay đổi hoặc sử dụng bộ điều khiển.
1. Cách dễ nhất để làm điều này là sử dụng phương thức onChanged và lưu trữ giá trị hiện tại trong một biến đơn giản. Đây là mã mẫu cho nó:
```dart
String value = "";
TextField(
  onChanged: (text) {
    value = text;
  },
)
```
2. Cách thứ hai để làm điều này là sử dụng `TextEditingController`. Bộ điều khiển được gắn vào TextField và cũng cho phép chúng tôi nghe và điều khiển văn bản của TextField.
```dart
TextEditingController controller = TextEditingController();
TextField(
  controller: controller,
)
```

Và chúng ta có thể lắng nghe những thay đổi bằng cách sử dụng
```dart
controller.addListener(() {
  // Do something here
});
```

Và nhận hoặc đặt giá trị bằng cách sử dụng
```dart
print(controller.text); // Print current value
controller.text = "Demo Text"; // Set new value
```

## Các Callback khác từ TextField

Tiện ích TextField cũng cung cấp các callback khác như
1. onEditingCompleted
2. onSubmitted

```dart
onEditingComplete: () {},
onSubmitted: (value) {},
```

> Đây là các callback được gọi trên các hành động như khi người dùng nhấp vào nút "Done" button trên bàn phím iOS.

## Làm việc với focus trong TextFields

Có một TextField được `focus` có nghĩa là có một TextField hoạt động và mọi đầu vào từ bàn phím sẽ dẫn đến dữ liệu được nhập vào TextField đã `focus` đó.
### 1. Làm việc với autofocus
Để `autofocus` trên TextField khi tiện ích được tạo, hãy đặt trường `autofocus` thành `true`.
```dart
TextField(
  autofocus: true,
),
```

Điều này đặt focus vào TextField theo mặc định.

![](https://images.viblo.asia/4815dfa1-1973-4433-a529-ae4ab20161a4.gif)

### 2. Làm việc với các thay đổi focus tùy chỉnh

Điều gì sẽ xảy ra nếu chúng ta muốn thay đổi `focus` theo nhu cầu và không chỉ `autofocus`? Vì chúng ta cần một số cách để `focus` TextField  tiếp theo mà chúng ta muốn, chúng ta đính kèm `FocusNode` vào TextField và sử dụng nó để chuyển `focus`.

```dart
// Initialise outside the build method
FocusNode nodeOne = FocusNode();
FocusNode nodeTwo = FocusNode();
// Do this inside the build method
TextField(
  focusNode: nodeOne,
),
TextField(
  focusNode: nodeTwo,
),
RaisedButton(
  onPressed: () {
    FocusScope.of(context).requestFocus(nodeTwo);
  },
  child: Text("Next Field"),
),
```

Chúng ta tạo hai nút `focus` và đính kèm chúng vào TextFields. Khi nhấn nút, chúng tôi sử dụng `FocusScope` để yêu cầu `focus` cho TextField tiếp theo.

![](https://images.viblo.asia/c705d937-0442-421d-a69b-04eca2ef9745.gif)

## Thay đổi thuộc tính bàn phím cho TextFields
TextField trong Flutter cũng cho phép bạn tùy chỉnh các thuộc tính liên quan đến bàn phím.
### 1. Loại Keyboard
TextField cho phép bạn tùy chỉnh loại bàn phím hiển thị khi TextField được đưa vào tiêu điểm. Chúng tôi thay đổi thuộc tính keyboardType cho điều này.
```dart
TextField(
  keyboardType: TextInputType.number,
),
```

Các loại là:
1. **TextInputType.text** (Normal complete keyboard)
2. **TextInputType.number** (A numerical keyboard)
3. **TextInputType.emailAddress** (Normal keyboard with an “@”)
4. **TextInputType.datetime** (Numerical keyboard with a “/” and “:”)
5. **TextInputType.numberWithOptions** (Numerical keyboard with options to enabled signed and decimal mode)
6. **TextInputType.multiline** (Optimises for multi-line information)

### 2. TextInputAction

Thay đổi `textInputAction` của TextField cho phép bạn thay đổi nút hành động của chính bàn phím.
Ví dụ:
```dart
TextField(
  textInputAction: TextInputAction.continueAction,
),
```

Trường hợp này nút "Done" được thay thế bằng nút "Continue".

![](https://images.viblo.asia/ced2f306-8739-4c28-bca2-f75936ef7930.png)

hoặc:

```dart
TextField(
  textInputAction: TextInputAction.send,
),
```

kết quả: 

![](https://images.viblo.asia/a6653fad-ea5c-4b3a-98e3-fa0efcabc841.png)

### 3. Autocorrect
Bật hoặc tắt tự động sửa cho TextField cụ thể. Sử dụng trường tự động sửa để đặt cái này.

```dart
TextField(
  autocorrect: false,
),
```
Điều này cũng sẽ vô hiệu hóa các đề xuất.

### 4. Text Capitalization
TextField cung cấp một vài tùy chọn về cách viết hoa chữ cái trong đầu vào từ người dùng.

```dart
TextField(
  textCapitalization: TextCapitalization.sentences,
),
```

Các loại là:

**1. TextCapitalization.sentences**

Đây là loại viết hoa bình thường mà chúng tôi mong đợi, chữ cái đầu tiên của mỗi câu được viết hoa.

![](https://images.viblo.asia/e96377fa-75d6-41a4-8009-a824b170501c.png)

**2. TextCapitalization.characters**

Viết hoa tất cả các ký tự trong câu.

![](https://images.viblo.asia/47040ba0-96d9-4225-8a51-bc50525861e4.png)

**3. TextCapitalization.words**

Viết hoa chữ cái đầu tiên của mỗi từ.

![](https://images.viblo.asia/74a58a6a-ef7b-4236-9f17-957c7b3b4ee2.png)

## Tùy chọn kiểu văn bản, căn chỉnh và con trỏ

Flutter cho phép tùy chỉnh liên quan đến kiểu dáng và căn chỉnh văn bản bên trong TextField cũng như con trỏ bên trong TextField.

### Căn chỉnh text bên trong TextField

Sử dụng thuộc tính `textAlign` để điều chỉnh vị trí con trỏ bên trong TextField.
```dart
TextField(
  textAlign: TextAlign.center,
),
```
Điều này khiến con trỏ và văn bản bắt đầu ở giữa TextField.

![](https://images.viblo.asia/4e866973-2996-4956-b00e-b9125c8623f0.png)

Điều này có các thuộc tính căn chỉnh thông thường: **start, end, left, right, center, justify.**

### Tạo kiểu văn bản bên trong TextField

Chúng ta sử dụng thuộc tính kiểu để thay đổi cách văn bản bên trong TextField. Sử dụng nó để thay đổi màu sắc, kích thước phông chữ, v.v ... Điều này tương tự với thuộc tính kiểu trong tiện ích Văn bản, vì vậy chúng tôi sẽ không mất quá nhiều thời gian để khám phá nó.

```dart
TextField(
  style: TextStyle(color: Colors.red, fontWeight: FontWeight.w300),
),
```

![](https://images.viblo.asia/73310563-1600-4337-93a3-092673c06bc7.png)

### Thay đổi con trỏ trong TextField

Con trỏ được tùy chỉnh trực tiếp từ tiện ích TextField.

Bạn được phép thay đổi màu con trỏ, chiều rộng và bán kính của các góc. Ví dụ, ở đây tôi tạo một con trỏ màu đỏ hình tròn mà không có lý do rõ ràng.

```dart
TextField(
  cursorColor: Colors.red,
  cursorRadius: Radius.circular(16.0),
  cursorWidth: 16.0,
),
```

![](https://images.viblo.asia/c102ae0a-3824-4ed6-9d5a-1ebccf5b45ba.png)

## Kiểm soát kích thước và độ dài tối đa trong TextField

TextFields có thể kiểm soát số lượng ký tự tối đa được viết bên trong nó, số lượng dòng tối đa và mở rộng khi văn bản được nhập.

### Kiểm soát ký tự tối đa

```dart
TextField(
  maxLength: 4,
),
```

![](https://images.viblo.asia/b9cc52ff-4e13-471e-a02c-e27218c6e397.png)

Bằng cách đặt thuộc tính maxLạng, độ dài tối đa được thi hành và bộ đếm được thêm theo mặc định vào TextField.

### Tạo một TextField có thể mở rộng

Đôi khi, chúng ta cần một TextField mở rộng khi một dòng kết thúc. Trong Flutter, nó hơi kỳ lạ (nhưng dễ) để làm. Để làm điều này, chúng tôi đặt `maxLines` thành `null`, theo mặc định là 1. Cài đặt thành `null` không phải là điều mà chúng tôi rất quen thuộc nhưng tuy nhiên nó rất dễ thực hiện.

![](https://images.viblo.asia/0e714083-95e5-4401-ac10-ab654e7f153f.png)

> Lưu ý: Đặt maxLines thành giá trị trực tiếp sẽ mở rộng nó thành số dòng đó theo mặc định.

![](https://images.viblo.asia/6ea103aa-7359-4b5b-b86c-981b53e26020.png)

## Văn bản che khuất

Để che khuất văn bản trong TextField, hãy đặt `obscureText` thành `true`. Thuộc tính này dùng cho các TextField nhập password

![](https://images.viblo.asia/e2e33f76-f38c-403e-8c2e-bedfee6c3da3.png)

## Và cuối cùng, trang trí TextField

Cho đến bây giờ chúng ta tập trung vào các tính năng Flutter cung cấp cho đầu vào. Bây giờ chúng ta sẽ chuyển sang thực sự thiết kế một TextField ưa thích và không nói không với nhà thiết kế của bạn. Để trang trí TextField, chúng ta sử dụng thuộc tính trang trí cần lấy InputDecoration. Vì lớp `InputDecoration` là rất lớn, chúng ta sẽ cố gắng nhanh chóng vượt qua hầu hết các thuộc tính quan trọng.

### Sử dụng các thuộc tính gợi ý và nhãn để cung cấp thông tin cho người dùng

Cả gợi ý và nhãn là các chuỗi giúp người dùng hiểu thông tin được nhập vào TextField. Sự khác biệt là một gợi ý sẽ biến mất khi người dùng bắt đầu nhập trong khi nhãn nổi trên TextField.

![](https://images.viblo.asia/6fd53de5-1536-4915-a552-e9611cc3c990.png)
<p align="center">Hint</p>

![](https://images.viblo.asia/06640c3c-8037-4e84-a9a3-71a7921a1a36.png) 
<p align="center">Label</p>

### Bạn có thể thêm các “icon”, “prefixIcon” and “suffixIcon”

Bạn có thể thêm các biểu tượng trực tiếp vào TextFields. Bạn cũng có thể sử dụng `prefixText` và hậu tố cho văn bản thay thế.

```dart
TextField(
  decoration: InputDecoration(
    icon: Icon(Icons.print)
  ),
),
```

![](https://images.viblo.asia/44be28f5-ff58-42c7-bc22-55bbcf73f43b.png)
<p align="center">Icon using the icon property</p>

```dart
TextField(
  decoration: InputDecoration(
    prefixIcon: Icon(Icons.print)
  ),
),
```

![](https://images.viblo.asia/3126e07b-faa4-4f8d-bca5-09918cd58dd6.png)
<p align="center" >Icon using the prefixIcon property</p>


### Tương tự cho bất kỳ widget nào khác, dùng “prefix” thay thế cho “prefixIcon”

Để sử dụng tiện ích chung thay vì biểu tượng, hãy sử dụng trường tiền tố. Một lần nữa, không có lý do rõ ràng, hãy để Thêm một chỉ báo tiến trình vòng tròn trong TextField.


```dart
TextField(
  decoration: InputDecoration(
    prefix: CircularProgressIndicator(),
  ),
), 
```

![](https://images.viblo.asia/521e5a3a-50bc-48f3-893f-4c3b5d20dd23.png)

### Mỗi thuộc tính như gợi ý, nhãn, v.v đều có các trường kiểu tương ứng

Để tạo kiểu cho một gợi ý, hãy sử dụng một gợi ý. Để tạo kiểu cho nhãn, hãy sử dụng nhãnStyle.

```dart
TextField(
  decoration: InputDecoration(
    hintText: "Demo Text",
    hintStyle: TextStyle(fontWeight: FontWeight.w300, color: Colors.red)
  ),
),
```

![](https://images.viblo.asia/29c619d9-a9d9-405f-94cc-acb1c869a3ff.png)

> Lưu ý: Mặc dù tôi đã thực hiện nó trong ví dụ này, nhưng nhìn chung không thay đổi màu gợi ý vì nó gây nhầm lẫn cho người dùng.

#### Sử dụng helperText của người dùng nếu bạn không muốn có nhãn nhưng bạn muốn có một thông điệp bền bỉ cho người dùng.

```dart
TextField(
  decoration: InputDecoration(
    helperText: "Hello"
  ),
),
```

![](https://images.viblo.asia/9263f2a4-a58b-4ef4-9e41-7f574b27dce3.png)

#### Sử dụng “decoration: null” hoặc InputDecoration.collapsed để loại bỏ underline mặc định của TextField

Sử dụng chúng để xóa phần gạch chân mặc định trên TextField.

```dart
TextField(
  decoration: InputDecoration.collapsed(hintText: "")
),
```

![](https://images.viblo.asia/8685be75-d68a-4bda-8ac6-7a79052c6724.png)

#### Thêm border vào TextField

```dart
TextField(
  decoration: InputDecoration(
    border: OutlineInputBorder()
  )
),
```

![](https://images.viblo.asia/1a773677-317c-421e-81f2-07ee5b812acf.png)

Có một số lượng lớn trang trí bạn có thể làm hơn nữa, nhưng chúng ta có thể đi sâu vào mọi thứ trong một bài viết. Nhưng tôi hy vọng điều này làm cho nó rõ ràng để hiểu cách dễ dàng tùy chỉnh Flutter TextFields.

Thank for reading!

[source](https://medium.com/flutter-community/a-deep-dive-into-flutter-textfields-f0e676aaab7a)