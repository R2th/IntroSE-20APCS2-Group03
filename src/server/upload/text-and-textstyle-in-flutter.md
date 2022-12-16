Hi all, hôm nay mình sẽ giới thiệu với các bạn 1 trong những Widget cơ bản nhất khi làm việc với Flutter. Đó là [Text Widget](https://docs.flutter.io/flutter/widgets/Text-class.html)

Như bạn vẫn thường biết Text dùng để hiển thị 1 chuỗi, hay 1 đoạn văn bản với 1 style duy nhất. Việc hiển thị này có thể trên 1 dòng, nhiều dòng tùy vào cách bạn định dạng style cho nó. Để định dạng style cho Text bạn sử dụng thuộc tính `style` của Text, đây là 1 thuộc tính optional. Nếu bạn không sử dụng style, mặc định Text sẽ được set style là [DefaultTextStyle](https://api.flutter.dev/flutter/widgets/DefaultTextStyle-class.html)

Để tạo 1 Text đơn giản nhất bạn chỉ cần khởi tạo nó với 1 chuỗi:

```java
Text("Hello World!")
```
![](https://images.viblo.asia/5f6674de-d10d-4cf9-a6a8-e1c49482afb5.png)

Đi sâu vào constructor của Text thì nó có khoảng 10 thuộc tính nữa, ở đây mình chỉ trình bày 5 thuộc tính hay được sử dụng nhất:
- textAlign
- overflow
- maxLines
- textScaleFactor
- style

### 1. textAlign
> Dùng để căn chỉnh text theo chiều ngang


| Giá trị | Ý nghĩa | Ví dụ |
| -------- | -------- | -------- | -------- |
| `TextAlign.left`     | căn chỉnh text về bên trái của container     |    ![](https://images.viblo.asia/efc878f0-ff1f-445e-931c-5ee51163db0f.png)|
| `TextAlign.right`    | căn chỉnh text về bên phải của container     |     ![](https://images.viblo.asia/30848975-fed4-4988-a14d-0d6088eee772.png) |
| `TextAlign.center`     | căn chỉnh text vào trung tâm của container     |      ![](https://images.viblo.asia/c4e11440-3507-4ca3-99c7-088f5477fc87.png)|
| `TextAlign.justify`     | dãn đều text trên 1 dòng     |     ![](https://images.viblo.asia/f809ebdb-228d-4e8c-815f-8126cf00b439.png) |
| `TextAlign.start`     | căn chỉnh text trên cạnh đầu của container, sử dụng kèm với TextDirection     |      |
| `TextAlign.end`     | căn chỉnh text trên cạnh đuôi của container, sử dụng kèm với TextDirection     |      |

### 2. overflow
> Dùng để xử lý hiển thị text khi bị tràn dòng



| Giá trị | Ý nghĩa | Ví dụ |
| -------- | -------- | -------- |
| `TextOverflow.clip`     | Chỉ hiển thị text trong khung container cho phép     | ![](https://images.viblo.asia/bd1c61c0-cd96-44ef-89bd-8769cc70520f.png)     |
| `TextOverflow.fade`     | Chỉ hiển thị text trong khung container cho phép và làm mờ text tràn ra trong suốt     | ![](https://images.viblo.asia/dad4e77b-01d9-4629-ab17-86769006b5c7.png)     |
| `TextOverflow.ellipsis`     | Sử dụng dấu ... để biểu thị text bị tràn     | ![](https://images.viblo.asia/abf3b897-04b6-4d09-af7a-1f9b39985b39.png)     |
| `TextOverflow.vísible`     | Hiển thị text tràn ra bên ngoài container     | ![](https://images.viblo.asia/17f60ab6-89cc-4d5d-8486-d009504c6fce.png)     |

### 3. maxLines
> Dùng để xác định số dòng hiển thị tối đa của text
Nếu số dòng text vượt quá maxLines thì nó sẽ bị cắt ngắn dựa theo thuộc tính overflow

### 4. textScaleFactor
> Dùng để tăng giảm tỉ lệ kích thước font của text


| Giá trị | Ví dụ  |
| -------- | -------- | -------- |
| `textScaleFactor: 1`     | ![](https://images.viblo.asia/eb8e36ab-0f0e-450d-b0c9-ac5a609239a3.png)     |
| `textScaleFactor: 1.5`     | ![](https://images.viblo.asia/ecad99f2-b38b-40dd-82b8-46e01ace1df3.png)     |
| `textScaleFactor: 2`     | ![](https://images.viblo.asia/cab81c0d-0ab0-4cfe-99ce-524b9f153dd3.png)     |

### 5. style
> Dùng để định nghĩa các style cho text như: màu chữ, màu nền, kích thước font, kiểu font, khoảng cách giữa các từ của text, khoảng cách giữa các ký tự của từ, ....
Style thì cũng có khá nhiều tùy biến, ở đây mình trình bày 1 số thuộc tính hay được sử dụng nhất:
- color
- backgroundColor
- fontSize
- fontWeight
- fontStyle
- letterSpacing
- wordSpacing
- fontFamily

#### 5.1. color
> Dùng để xác định màu cho text


| Giá trị | Ví dụ |
| -------- | -------- |
| `Color(0xFF0000FF)`     | ![](https://images.viblo.asia/af88dbaf-8baf-46e8-9db7-25937e560baf.png)     |
| `Colors.yellow`     | ![](https://images.viblo.asia/0b0ca3cf-ace6-43de-9125-4d781c77c2fb.png)     |
| `Color.fromARGB(255, 255, 0, 0)`     | ![](https://images.viblo.asia/aa4f740d-39ee-433a-8a09-bbfb5b498b5a.png)     |
| `Color.fromARGB(255, 255, 0, 0)`     | ![](https://images.viblo.asia/78c84fe5-a204-4733-86e6-63866fbd4cd9.png)     |

#### 5.2. fontSize
> Dùng để xác định kích thước font chữ cho text


| Giá trị | Ví dụ |
| -------- | -------- |
| `fontSize: 10.0`     | ![](https://images.viblo.asia/10818ee5-0709-4029-b8bb-728b130c3d6d.png)     |
| `fontSize: 20.0`     | ![](https://images.viblo.asia/9e204f8e-d85f-420d-b049-d59998af8341.png)     |

#### 5.3. fontWeight
> Dùng để định nghĩa độ dày nét chữ



| Giá trị | Ví dụ |
| -------- | -------- |
|   `w100`   |   ![](https://images.viblo.asia/5006db94-6091-42f9-860a-0cd5c31b68b3.png)   |
|   `w200`   |   ![](https://images.viblo.asia/5a0e5031-f0fa-4fb6-bf61-864102ebd851.png)   |
|   `w300`   |   ![](https://images.viblo.asia/49d5b365-ab8d-45fe-849b-05e8a753c287.png)   |
|   `w400`   |   ![](https://images.viblo.asia/aae64dea-1095-48c2-9c31-2ed88904a314.png)   |
|   `w500`   |  ![](https://images.viblo.asia/7c1f1790-cacb-4ebe-856f-a7cec167f279.png)    |
|   `w600`   |   ![](https://images.viblo.asia/75711a98-6749-4c53-95a4-7ccecb7134cd.png)   |
|   `w700`   |   ![](https://images.viblo.asia/2a3b57e6-34f4-4f93-a9b6-b2a6c125bd74.png)   |
|   w800   |   ![](https://images.viblo.asia/5c6928dc-a41d-4822-ad7a-77cd25cd3c51.png)   |
|   `w900`   |   ![](https://images.viblo.asia/4a0b481f-cefc-43cc-ba2a-5dc2f49fb608.png)   |
|   `bold`  = w400 |  ![](https://images.viblo.asia/aae64dea-1095-48c2-9c31-2ed88904a314.png)    |
|   `normal`  = w700 |   ![](https://images.viblo.asia/2a3b57e6-34f4-4f93-a9b6-b2a6c125bd74.png)   |

#### 5.4. fontStyle
> Dùng để định nghĩa các biến thể cho text

| Giá trị | Ý nghĩa | Ví dụ |
| -------- | -------- | -------- |
| `FontStyle.normal`     | kiểu chữ thẳng đứng     | ![](https://images.viblo.asia/6c0c0673-c32c-45cc-9293-a2d210504a1f.png)     |
| `FontStyle.italic`     | Kiểu chữ nghiêng     | ![](https://images.viblo.asia/de20f777-91b7-4245-a594-2684e6d8eb40.png)     |

#### 5.5. decoration
> Dùng để trang trí thêm cho text



| Giá trị | Ý nghĩa | Ví dụ |
| -------- | -------- | -------- |
| `TextDecoration.none`     | Không trang trí gì thêm cho text     | ![](https://images.viblo.asia/b61a78b9-b6a3-426c-a665-a6d748efe992.png)     |
| `TextDecoration.underline`     | Thêm gạch dưới cho text     | ![](https://images.viblo.asia/c4f8bfd5-9eef-40b2-912c-923c1d3f0760.png)     |
| `TextDecoration.overline`     | Thêm gạch trên cho text     | ![](https://images.viblo.asia/a48c51ac-4ed3-48af-82e5-332d97d56990.png)     |
| `TextDecoration.lineThrough`     | Thêm gạch vào giữa text     | ![](https://images.viblo.asia/faeedba9-446b-40d0-8bc9-f58e066dca9f.png)     |

#### 5.6. wordSpacing
> Dùng để định nghĩa khỏang cách giữa các từ trong text



| Giá trị | Ví dụ |
| -------- | -------- |
| `wordSpacing: 10`     | ![](https://images.viblo.asia/7d5918a7-dcee-41a3-8823-078936812fd3.png)     |
| `wordSpacing: 20`     | ![](https://images.viblo.asia/f533940e-e8d6-4443-992c-a399423fee64.png)     |

#### 5.7. letterSpacing
> Dùng để định nghĩa khoảng các giữa các ký tự của từ trong text



| Giá trị | Ý nghĩa |
| -------- | -------- |
| `letterSpacing: 5`     | ![](https://images.viblo.asia/2df146c6-b571-433b-a7de-83f085c787fb.png)     |
| `letterSpacing: 10`     | ![](https://images.viblo.asia/45d79bcc-a93f-4ec8-9980-22bf3ed7e255.png)     |

#### 5.8. fontFamily
> Dùng để định nghĩa kiểu font cho text



| Giá trị | Ví dụ |
| -------- | -------- |
| `fontFamily: "Roboto"`    | ![](https://images.viblo.asia/377f1c6c-c677-425f-bd10-12dc1427dcaf.png)     |
| `fontFamily: "Times New Roman"`     | ![](https://images.viblo.asia/fbb4549a-d87e-4da1-84e5-7c143b431ce8.png)     |
| `fontFamily: "DancingScript"`     | ![](https://images.viblo.asia/61f2a832-a86d-45c8-aab9-78351cef577b.png)     |

Mình nói thêm 1 chút về gía trị của thuộc tính fontFamily, chỉ những font nào có trong SDK thì bạn khai báo mới có tác dụng. Nếu bạn khai báo ngoài những font này, hệ thống sẽ tự đặt về font mặc định là `Roboto`. Ở ví dụ trên mình có sử dụng font `DancingScript`, không có sẵn trong SDK. Vậy làm sao để apply 1 font bên ngoài vào project? mình đã viết 1 bài về [Using costum fonts in Flutter](https://viblo.asia/p/using-custom-fonts-in-flutter-LzD5dXrz5jY), các bạn vào xem và làm theo nha.

Source code mình để [đây](https://gist.github.com/nvquangth/84d95d1cf03e60a2f6b954c271d8ea1e)

Trên đây là toàn bộ những gì mình muốn nói [Text Widget](https://docs.flutter.io/flutter/widgets/Text-class.html), 1 trong những widget cơ bản nhất mà ai học Flutter cũng đều phải trải qua. Hy vọng bài chia sẻ của mình đem lại sự hữu ích cho mọi người. Thanh all

Phần tiếp theo mình sẽ giới thiệu về Rich Kids, à nhầm chút [Rich Text](https://viblo.asia/p/richtext-in-flutter-djeZ1bpjlWz)

Tài liệu tham khảo:
* [Flutter.dev](https://flutter.dev/)
* [Text class](https://docs.flutter.io/flutter/widgets/Text-class.html)
* [TextStyle class](https://api.flutter.dev/flutter/painting/TextStyle-class.html)