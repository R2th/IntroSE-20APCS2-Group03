## Single Responsibility Principle là gì ?

**Single Responsibility Principle** được hiểu là **nguyên tắc Đơn Trách Nhiệm**. Tức là mỗi thành phần của hướng đối tượng đều chỉ nên giữ một trách nhiệm duy nhất, làm đúng trách nhiệm đó, và làm tốt. Một số blog lập trình tiếng Việt phát biểu đầy đủ nguyên lý này như sau:
> ### **MỖI CLASS chỉ nên giữ MỘT TRÁCH NHIỆM duy nhất (và do đó chỉ có một lý do duy nhất để thay đổi)**
> (Classes should have a single responsibility and thus only a single reason to change)

![](https://images.viblo.asia/226c63f4-5caa-4c8a-acb0-97c95d63c586.jpeg)


## Giải thích nguyên lý này

Thay vì tạo ra một chiếc Smartphone với đủ các tính năng nhưng chẳng tính năng nào thật sự tốt, ta nên tạo ra một chiếc điện thoại Nokia cục gạch thần thánh với **chức năng duy nhất** là nghe gọi, và nó **làm tốt** việc nghe gọi.

Một chiếc điện thoại chỉ có thể nghe gọi sẽ:
- Dễ sản xuất hơn
- Dễ làm chủ hơn
- Dễ sửa chữa hơn

Một chiếc điện thoại quá xịn, quá nhiều tính năng thì ngược lại. Khó sản xuất, khó làm chủ, khó sửa chữa. Bởi vì nó quá phức tạp.

![](https://images.viblo.asia/4502a170-78dc-4bdb-9c49-49aee0263d55.jpeg)

Bạn sẽ làm việc tập trung và hiệu quả nhất khi chỉ tập trung làm từng việc một hay làm nhiều việc cùng lúc ?

Trong lập trình hướng đối tượng, các class cũng không nên quá phức tạp mà cần đơn giản nhất có thể. Ta không cần phải mất cả ngày để hiểu một class có cấu tạo ra sao và sẽ đảm nhiệm những gì. Chỉ cần nhìn tên là có thể hình dung được chức năng và vai trò của nó.

## Áp dụng nguyên lý này cho các class

Chẳng hạn với một class `ConBò`, ta không cần thêm thuộc tính `năng_suất_sữa` cho nó, hoặc phương thức `kéo_cày()`. Vì không phải con bò nào cũng đều cho sữa và cần thuộc tính `năng_suất_sữa` (chẳng hạn như bò đực), ta chỉ cần cung cấp cho nó các thuộc tính cơ bản của một con bò như `khối_lượng`, `tốc_độ_di_chuyển`... cũng như các phương thức (hành động) cơ bản như `ăn()`, `ngủ()`...

Nếu ta cần một con bò có thể lấy sữa, ta tạo thêm class `BòSữa` kế thừa lớp `ConBò` kể trên. Sau đó cung cấp cho nó thuộc tính `năng_suất_sữa`. Và nhớ đừng cho nó có thêm hành động `kéo_cày()`. Việc này là của riêng class `BòCày`.

![](https://images.viblo.asia/6c61ede2-2c2d-4964-b91d-cc9a05ce3297.jpg)

Mặc dù theo tư duy thông thường, một `ConBò` cứ làm được tất cả mọi việc từ cho sữa đến kéo cày có thể là cái gì đó rất ngầu. Nhưng ta không nên bắt nó sở hữu những thuộc tính, phương thức chẳng bao giờ dùng đến. Hãy nghĩ con bò là một con bò, một con vật bình thường và có những đặc điểm của một con bò bình thường.

## Không chỉ class mới cần áp dụng nguyên lý này

`ConBò` có khả năng ỉa. Và bởi vì bạn biết rằng sau khi con bò ỉa xong, nó luôn đái. Thế là bạn thực hiện thêm lệnh `đái()` bên trong phương thức `ỉa()`. Bạn đã viết xong hàm này và cảm thấy mình thật awesome vì hiểu rõ bản chất việc sinh hoạt của loài bò. Nhưng điều này rõ ràng vi phạm nguyên tắc **Đơn Trách Nhiệm**.

**Điều này gây hại gì ???**

Khi nghe đến phương thức `ỉa()`, người ta chỉ nghĩ đến việc sẽ có **một bãi phân bò** được tạo ra và chỉ nghĩ đến việc sau khi con bò thực hiện việc **ỉa**, sẽ hót phân cho nó. Nhưng thực tế sau khi con bò **ỉa** nó còn  **đái** nữa (vì bạn cài đặt như thế), cho nên sau khi con bò ỉa, người dùng sẽ há hốc mồm với câu hỏi: "Bãi nước đái này ở đâu ra đây ???".

Hơn thế nữa. Bạn hãy thử hình dung một ngày con bò không uống nước. Nó sẽ chỉ ỉa ra một bãi phân khô, không đái. Như vậy việc luôn đái sau khi ỉa có còn đúng logic hay không ?

![](https://images.viblo.asia/bcdf28b5-efa7-4e84-9c53-ff69a2f32d83.png)

Thành thử, bạn nên tách riêng việc **ỉa** và **đái** của con bò ra. Mọi thứ sẽ tường minh hơn. Gọi lệnh ỉa, con bò sẽ cho ra một bãi phân, gọi lệnh đái, con bò sẽ cho ra một bãi nước.

Cũng đừng cố viết thêm phương thức `ỉa(boolean có_đái_không)` để khiến mọi thứ thêm rắc rối. Vì sao rối ? Chẳng ai hiểu `ỉa(true)` hay `ỉa(false)` là cái gì. Truyền vào false nghĩa là không ỉa ???

Vốn dĩ trong phương thức `ỉa(boolean có_đái_không)`, bạn đã phải kiểm tra điều kiện `có_đái_không` để xem có thực hiện lệnh đái hay không.

```Java
public void ỉa(boolean có_đái_không) {
    throw(phân); // =))
    if(có_đái_không) {
        throw(nước tiểu);
    }
}
```

Nhưng khi dùng phương thức này, bạn cũng lại phải kiểm tra điều kiện tiếp. Rắc rối chưa nào ?

```Java
if(bò_đã_uống_nước) {
    bò.ỉa(true)
} else {
    bò.ỉa(false)
}
```

Đoạn code trên nếu cứ đơn giản thì chỉ nên thế này:

```Java
bò.ỉa()
if(bò_đã_uống_nước) {
    bò.đái()
}
```

Bạn có thể viết phương thức `ỉa_sau_đó_đái()`. Không quá dài hơn nhưng người khác đọc là có thể hiểu luôn.

```Java
if(bò_đã_uống_nước) {
    bò.ỉa_sau_đó_đái()
} else {
    bò.ỉa()
}
```

## Áp dụng trong thực tế

Giả sử tôi lập trình Android và có một class là `StudentsActivity` dùng để xem danh sách các sinh viên trong trường. Với quyền User bình thường tôi có thể xem được danh sách các sinh viên. Còn với quyền Admin, tôi được phép thêm, xoá các sinh viên này ngay trên giao diện danh sách sinh viên này.

![](https://images.viblo.asia/629cbbf9-b4cd-43b3-a050-778b14310c48.png)

Nếu tôi không áp dụng **nguyên tắc Đơn Trách Nhiệm**, tôi sẽ cố gắng tích hợp cả việc xử lý thêm xoá sinh viên vào trong tính năng của Activity này để giảm bớt số lượng class được định nghĩa. Ngoài ra còn là để chứng tỏ khả năng xử lý logic tuyệt vời, khả năng code một lần chạy được mọi tính năng. Class của tôi phải gọi là **đệ nhất class đa dụng vũ trụ Trần Dần, cố vấn tối cao...** à mà thôi. =))

Để đáp ứng điều đó, tôi sẽ phải kiểm tra quyền, sau đó tuỳ theo quyền mà tôi hiển thị UI cho phù hợp và cung cấp sẵn các phương thức xử lý dữ liệu cho Admin và ở mỗi phương thức này tôi phải kiểm tra quyền Admin một lần nữa để đảm bảo nếu User có gọi vào các phương thức này thì cũng không thao tác được gì với danh sách sinh viên hiện có.

Việc xử lý logic như vậy vô cùng phức tạp và mất công, thế nhưng chưa chắc đã có thể đảm bảo mọi thứ sẽ hoạt động đúng logic.

Còn nếu tôi hiểu về nguyên tắc Đơn Trách Nhiệm, tôi sẽ chỉ cần viết một class mới kế thừa class `StudentsActivity`, ví dụ như `ManageStudentsActivity`, với class này tôi sẽ chỉ cần kiểm tra User có phải Admin không nếu không sẽ không cho khởi chạy Activity này. Mọi thứ sẽ đảm bảo, tôi có thể kế thừa lại giao diện và các tính năng sẵn có trên `StudentsActivity`, thêm các phương thức dành riêng cho Admin và chỉ cần kiểm tra logic một lần.

Sự đau đầu khi fix bug về cơ bản nếu áp dụng đúng là không có. Code có thể dài hơn, nhưng không nhiều, hoặc ít nhất, nó dễ đọc nên nhanh hiểu.

## Tổng kết

Các cụ đã có câu:
- Một nghề thì sống, đống nghề thì chết.
- Một nghề cho chín còn hơn chín nghề.
- Nhất nghệ tinh, nhất thân vinh.

Ngay cả các cụ ta từ xa xưa đã hiểu rõ về điều này, chẳng thứ gì đảm nhiệm quá nhiều việc mà lại làm tốt hết được cả. Hãy hiểu rõ ý nghĩa của chữ S trong SOLID và áp dụng nó khi xây dựng phần mềm.
> **Một class chỉ nên giữ một trách nhiệm duy nhất.**



-----


- Series: [Làm chủ SOLID [Full series]](https://viblo.asia/s/lam-chu-solid-full-series-bq5QL7dmlD8)
- My Blog: https://phucynwa.wordpress.com/2019/09/10/lam-chu-solid-single-responsibility-principle-phan-1/