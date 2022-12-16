Không biết anh em đã nghe đến cái tên varargs (variable arguments) hay sử dụng varargs trong Java chưa? Mình nghĩ cũng chưa nhiều anh em để ý đến nó đâu nhỉ!

![](https://images.viblo.asia/0ed837a4-b35b-4d78-96fa-d932ed0d83f5.png)

Thực tế varargs được giới thiệu từ Java 5 để giúp chúng ta giải quyết bài toán gọi là **arbitrary number of parameters**. Vậy bài toán đó là gì, varargs là gì, sử dụng nó ra sao, cần lưu ý những gì thì anh em cùng mình tìm hiểu trong bài viết hôm nay nhé!

Bài viết gốc được chia sẻ [**tại đây**](https://laptrinhb2a.com/)

# 1. Đặt vấn đề
Đầu tiên chúng ta trả lời câu hỏi **arbitrary number of parameters** là gì?

Nếu dịch ra thì có nghĩa là "số lượng tham số tùy ý". Mà tham số thì sẽ liên quan đến phương thức (methods). Như vậy bài toán bản chất là việc làm sao truyền số lượng giá trị tùy ý cho tham số của phương thức.

Hơi khó hiểu nhỉ, cùng mình xem ví dụ bên dưới anh em sẽ dễ hình dung hơn!

Giả sử mình có hàm `sum()` sử dụng để tính tổng các tham số truyền vào và mình có hai tham số a, b được truyền vào như sau:

``` JAVA
public int sum(int a, int b) {
    return a + b;
}
```

Okay, sẽ ra sao nếu mình muốn tính tổng của 3 số, 4 số hay thậm chí n số? Trước Java 5 chúng ta có hai giải pháp đó là:

**Solution 1**: Có bao nhiêu tham số phải overloading bấy nhiêu phương thức tương ứng:

```JAVA
public int sum(int a, int b) {
    return a + b;
}

public int sum(int a, int b, int c) {
    return a + b + c;
}

public int sum(int a, int b, int c, int d) {
    return a + b + c + d;
}
```

Tuy có thể sử dụng hàm `sum(int a, int b, int c, int d)` để tính tổng của 2 số hay 3 số nhưng rõ ràng khi đó code sẽ không trong sáng vì thừa tham số. 

Hai nữa, khó có thể biết có bao nhiêu số chúng ta muốn tính tổng dẫn đến việc phát sinh viết thêm phương thức bất cứ lúc nào.

**Solution 2**: Truyền vào tham số là một danh sách các giá trị

```JAVA
public int sum(int[] args) {
    int result = 0;
    for (int i=0; i<args.length; i++)
        result += args[i];
    return result;
}
```

Đây có lẽ là giải pháp chúng ta vẫn hay sử dụng cho bài toán này. Tất nhiên so với giải pháp đầu tiên thì giải pháp này linh hoạt hơn rất nhiều.

Nhưng có một vấn đề đó là tham số đầu vào phải rõ ràng và được khởi tạo trước khi gọi hàm. Nghĩa là khi chúng ta muốn sử dụng hàm `sum()` thì buộc phải có một array được khởi tạo trước và truyền vào khi gọi hàm. 

Đây cũng không phải là vấn đề quá lớn nhưng trong nhiều trường hợp việc yêu cầu phải có một danh sách khởi tạo trước như vậy sẽ gây phiền phức và code trở nên dài dòng hơn.

Cả hai giải pháp đều có vấn đề và đó cũng là lý do varargs được bổ sung từ Java 5 để giải quyết những vấn đề này. Cùng mình sang phần tiếp theo để xem varargs được sử dụng như nào nhé!

# 2. Sử dụng Varargs như nào?
Bản chất varargs cũng là một tham số được truyền vào phương thức với cú pháp: 

`<Data Types>... <Parameter's Name>`

Ví dụ mình có thể sử dụng varargs với hàm `sum()` như sau:

```JAVA
public int sum(int... args) {
    int result = 0;
    for (int i=0; i<args.length; i++)
        result += args[i];
    return result;
}
```

Lúc này có thể truyền tham số vào hàm` sum()` một cách linh hoạt hơn.

```JAVA
sum();             // 0
sum(1, 2);         // 3
sum(1, 2, 3);      // 6
```

Vậy là varargs giải quyết được hai vấn đề nêu ra ở phần 1. Chúng ta không cần phải overloading nhiều hàm cũng không phải khởi tạo một danh sách trước nữa.

Cách sử dụng varargs tương đối đơn giản nhưng có một vài lưu ý mình sẽ đề cập sau trong **phần 4**. Tiếp theo mình sẽ cùng anh em tìm hiểu cơ chế hoạt động của varargs.

# 3. Varargs hoạt động như thế nào?
Ban đầu khi biết về varargs mình cũng không hiểu nó là gì. Không phải là không hiểu cách dùng mà mình thấy nó lạ lạ, cú pháp khác khác, không biết nó là kiểu cấu trúc dữ liệu gì. 

Sau khi tìm hiểu mình mới biết bản chất của varargs chính là arrays hay nói chính xác hơn khi làm việc với varargs thì bản chất chúng ta đang làm việc với arrays.

Có thể anh em sẽ thắc mắc nếu giống với arrays thì hàm `sum(int[] args)` khác gì `sum(int... args)` ?

Câu trả lời nằm ở chỗ cơ chế khởi tạo! Vậy khác nhau như nào?

Trường hợp: `sum(int[] args)`

Nếu sử dụng tham số là array thì khi hàm` sum()` được gọi chúng ta phải truyền một array từ bên ngoài vào. Điều này dẫn đến việc phải có một array được khai báo và khởi tạo từ trước khi hàm `sum()` được sử dụng.

```JAVA
int[] params = {1, 2, 3, 4, 5};
sum(params); // 15
```

Trường hợp: `sum(int... args)`

Nếu sử dụng varargs thì thay vì phải khởi tạo trước một array trình biên dịch sẽ khởi tạo trong quá trình hàm `sum()` được gọi. Vậy trình biên dịch khởi tạo bằng cách nào?

+ Đầu tiên dựa vào số lượng giá trị truyền vào cho tham số trình biên dịch sẽ khởi tạo một array với kích thước chính là số lượng giá trị được truyền vào. 

+ Sau khi array được khởi tạo trình biên dịch sẽ thực hiện gán lại các giá trị chúng ta truyền vào cho array đó.

Một cách đơn giản anh em có thể hiểu chúng ta chỉ cần chuẩn bị giá trị cho tham số còn lại việc khai báo, khởi tạo cứ để trình biên dịch lo!

```JAVA
sum(1, 2, 3, 4, 5); // 15
```

**Note:** Nghe có vẻ tiện nhưng rõ ràng nếu chúng ta sử dụng varargs không đúng cách có thể dẫn đến vấn đề về hiệu năng. Mình sẽ cùng anh em tìm hiểu kỹ hơn ở **phần 5 **

# 4. Lưu ý những gì khi sử dụng varargs?
Việc sử dụng varargs có một vài lưu ý mà anh em nên nắm được để tránh bị lỗi.

### 4.1 - Varargs luôn phải là tham số cuối cùng
Phương thức có chứa tham số dạng varargs thì tham số đó phải là tham số cuối cùng (nếu anh em không để tham số varargs cuối cùng chương trình sẽ báo lỗi)

```JAVA
public int sum(int initValue, int extendValue, int... args) {
    int result = initValue;
    for (int i = 0; i < args.length; i++)
        result += args[i];
    return result + extendValue;
}
```

```JAVA
sum(10, 5, 1, 2, 3); // 21
```

Tham số args được mình để cuối cùng vì vậy khi gọi hàm `sum()` hai giá trị 10 và 5 lần lượt được gán cho hai tham số `initValue` và `extendValue`. Các giá trị còn lại được truyền cho tham số args.

### 4.2 - Một phương thức chỉ được phép có một tham số varargs
Vì lý do nào đó anh em muốn phương thức có nhiều hơn một tham số dạng varargs thì điều này là không thể. Thực ra lỗi này xuất phát từ lỗi đầu tiên - tham số dạng varargs phải là tham số cuối cùng.

Nếu anh em có hai tham số dạng varargs thì trình biên dịch sẽ không biết tham số nào là cuối cùng. Ví dụ như hàm sum() bên dưới sẽ báo lỗi ngay lập tức. 

```JAVA
public int sum(String option, int... oddNumbers, int... evenNumbers) {   // error
    int result = 0;

    switch (option){
        case "ODD":
            for (int i = 0; i < oddNumbers.length; i++)
                result += oddNumbers[i];
            break;
        case "EVEN":
            for (int i = 0; i < evenNumbers.length; i++)
                result += evenNumbers[i];
            break;
        default:
            throw new RuntimeException("Option is not present");
    }

    return result;
}
```

### 4.3 - Tránh Ambiguity Overloading
Thế nào là Ambiguity Overloading? 

Đầu tiên chắc anh em cũng nắm được thế nào là overloading rồi nhỉ! Overloading là việc chúng ta sử dụng các phương thức (methods) cùng tên trong một class nhưng phải đảm bảo 1 trong 3 điều kiện:

+ Khác nhau về số tham số truyền vào và các tham số có cùng kiểu dữ liệu

+ Có cùng số tham số truyền vào và các tham số không có cùng kiểu dữ liệu

+ Khác nhau trình tự kiểu dữ liệu của các tham số

Vậy ambiguity overloading là gì anh em cùng mình xem ví dụ sau:

```JAVA
public int sum(int... args) {
    int result = 0;
    for (int i = 0; i < args.length; i++)
        result += args[i];
    return result;
}
```

```JAVA
public int sum(int initValue, int... args) {
    int result = initValue;
    for (int i = 0; i < args.length; i++)
        result += args[i];
    return result;
}
```

Rõ ràng hai hàm này đều thỏa mãn điều kiện overloading nhưng nếu mình truyền tham số khi gọi hàm như bên dưới thì lại báo lỗi.

```JAVA
sum(5); // Ambiguous method call...
```

Nguyên nhân là giá trị chúng ta truyền vào khiến cho trình biên dịch không thể phân biệt được đó là giá trị của tham số `initValue` trong hàm `sum(int initValue, int... args)` hay đó là giá trị đầu tiên của tham số args trong hàm `sum(int... args)`

# 5. Sử dụng Varargs sao cho đúng?
Như mình đã trình bày trong các phần trước, sử dụng varargs đúng sẽ khiến cho code trở nên trong sáng, đơn giản và đạt hiệu năng cao hơn.

### 5.1 - Trường hợp yêu cầu một hoặc nhiều giá trị cho tham số
Tham số varargs có thể nhận vào 0 hoặc nhiều giá trị. Nhưng vấn đề là có những trường hợp chúng ta mong muốn phải nhận vào ít nhật một hoặc nhiều giá trị. 

Giả sử như hàm tìm giá trị min bên dưới:

```JAVA
public int min(int... args) {
    if (args.length == 0)
        throw new IllegalArgumentException("Too few arguments");
    int min = args[0];
    for (int i = 1; i < args.length; i++)
        if (args[i] < min)
            min = args[i];
    return min;
}
```

Có vấn đề gì với hàm này? 

+ Thứ nhất, đó là ở phía client khi gọi hàm này họ hoàn toàn có thể không truyền giá trị nào. Tuy điều này đã được kiểm tra và sẽ trả ra ngoại lệ nhưng chỉ ở quá trình runtime chúng ta mới biết được.

+ Hai nữa, việc thêm đoạn code để kiểm tra như vậy sẽ khiến hàm trở nên thiếu trong sáng vì logic hàm chỉ nên tập trung vào việc tìm giá trị nhỏ nhất. 

Khắc phục ra sao?

Đơn giản thôi, chúng ta sẽ thêm một tham số nữa cùng với tham số dạng varargs để client biết được cần truyền ít nhất một tham số cho hàm này đồng thời cũng khắc phục luôn được việc phải kiểm tra và trả ra ngoại lệ khi client không truyền giá trị nào.

```JAVA
public int min(int firstArg, int... remainingArgs) {
    int min = firstArg;
    for (int arg : remainingArgs)
        if (arg < min)
            min = arg;
    return min;
}
```

### 5.2 - Không nên lạm dụng varargs
Varargs mang đến cho chúng ta sự linh hoạt trong việc truyền giá trị cho tham số nhưng như mình đã phân tích ở phần 3 thì bản chất của varargs chính là array. Mà đã liên quan đến array thì sẽ liên quan đến vấn đề cấp phát bộ nhớ và hiệu năng.

Giả sử trong chương trình của mình hàm `sum()` được dùng khoảng 70% cho trường hợp tính tổng hai số, 20% cho trường hợp tính tổng 3 số còn 10% cho việc tính tổng n số.

Vậy mình có nên sử dụng duy nhất một hàm `sum(int... args)` cho cả 3 trường hợp không? Câu trả lời là không vì như thế sẽ ảnh hưởng tới hiệu năng. Khi đó thay vì dùng một mình hàm `sum(int... args)` thì mình có thể dùng cả 3 hàm như sau:

```JAVA
public int sum(int a, int b)  {             // tính tổng hai số
    return a + b;
}

public int sum(int a, int b, int c) {       // tính tổng 3 số
    return a + b + c;
}

public int sum(int... args) {               // tính tổng n số
    int result = 0;
    for (int i = 0; i < args.length; i++)
        result += args[i];
    return result;
}
```

# 6. Lời kết
Varargs không phải là một khái niệm mới vì nó xuất hiện từ phiên bản Java 5. Tuy nhiên varargs lại được ít lập trình viên biết đến và sử dụng. Cũng có thể trong thực tế không nhiều trường hợp chúng ta cần dùng đến tham số kiểu varargs

Nhưng tất nhiên, qua bài viết phần nào anh em cũng hình dung được varargs hữu dụng trong trường hợp nào cũng như làm sao để sử dụng varargs cho đúng cách.

Không tự nhiên người ta sinh ra một phương pháp ắt hẳn nó phải giải quyết bài toán nào đó và varargs cũng vậy. Hi vọng bài viết sẽ giúp anh em hiểu hơn và vận dụng varargs tốt hơn trong quá trình code.

**Tham khảo:**

Item 53 - Effective Java (Third Edition)

https://www.baeldung.com/java-varargs

https://www.programiz.com/java-programming/varargs

Hẹn gặp lại anh em trong các bài viết tiếp theo! Thanks all ❤️❤️❤️