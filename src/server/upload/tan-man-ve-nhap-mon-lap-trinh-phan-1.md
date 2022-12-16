Mở đầu series sẽ là môn học đầu tiên mà bất cứ sinh viên CNTT nào cũng sẽ học ở năm nhất đại học.

# Nhập Môn Lập Trình
## Ngôn ngữ sử dụng: tiếng Anh, tiếng Việt, tiếng C/C++.
***
## Nội dung môn học:
* Giới thiệu tổng quan về lập trình.
* Cấu trúc một chương trình.
* Nhập, xuất cơ bản trong C/C++.
* Biến, hằng, kiểu dữ liệu.
* Công cụ mô tả bài toán(mã giả, lưu đồ).
* Cấu trúc điều khiển, câu lệnh rẽ nhánh (if-else, switch case).
* Vòng lặp (loop).
* Dữ liệu có cấu trúc (struct) và mảng (array).
* Hàm.
* Làm việc với tập tin (file).
## Mục tiêu môn học: 
###### Đúng với tên gọi của nó, đây sẽ là môn học đưa bạn vào thế giới lập trình (thế giới mà giang hồ đồn sẽ toàn màu hồng, là vua các nghề, việc nhẹ, lương cao,... nhưng với tư cách là một người trong cuộc thì mình không chắc :v). Sau khi học xong môn học này bạn có thể tạo ra một số chương trình đơn giản, có nền tảng để tiếp tục học ở các môn tiếp theo.
***
## 1. Lập trình (programming) là gì?
![](https://images.viblo.asia/497cce74-9d5a-49b6-8d72-8a1ef97afef6.jpeg)



Có khá nhiều định nghĩa về thuật ngữ này, nhưng với mình đây có lẽ là định nghĩa ngắn gọn, đầy đủ và dễ hiểu nhất:
> “Programming is how you get computers to solve problems.” - "Lập trình là việc hướng dẫn máy tính xử lí vấn đề."
## 2. Cấu trúc một chương trình:
```c
#include<stdio.h> //Khai báo thư viện

int main() // Hàm main - hiểu đơn giản thì đây là nơi các bạn viết code để thực thi chương trình.
{
    printf("Hello, world!"); // Thân hàm, chứa các đoạn code cần thực thi của hàm.

    return 0; // Kết quả trả về của hàm - sẽ nói kỹ hơn ở mục Hàm (Function).
}
```

Cài 1 IDE (IDE là gì thì các bạn có thể đọc ở đây: https://www.redhat.com/en/topics/middleware/what-is-ide) và chạy thử đoạn chương trình này nhé! 

Bạn làm được đúng không? Bạn vừa gửi lời chào đến thế giới lập trình đấy! Chào mừng bạn đến với thế giới "đầy màu sắc" này. 
![](https://images.viblo.asia/b1110179-c74e-49a7-9777-ab1dd2de05b2.jpg)


![Chào mừng bạn đến với thế giới lập trình](./img/Introduce.jpg)

> ⚡ À bạn thấy kí hiệu `//` trong đoạn chương trình ở trên chứ? Thử đoán công dụng của nó nhé.
## 3. Nhập, xuất cơ bản trong C/C++.

Bạn nhớ lệnh `printf("Hello, world!")` ban nãy không? Chắc hẳn bạn cũng đoán được phần nào lệnh này để làm gì rồi nhỉ. Đúng vậy, đây là câu lệnh để xuất ra màn hình, những gì được ghi trong cặp `" "` sẽ được in ra màn hình. 

> ⚡Thử viết ra một đoạn chương trình in ra hình này xem nhé:
```c
*
**
***
****
*****
```
Song song với đó, đã có lệnh xuất chắc bạn cũng đoán được đi đôi với xuất là gì đúng không, để lấy được dữ liệu ta cần phải có thêm lệnh nhập. Lệnh nhập cơ bản nhất là nhập từ bàn phím, C hỗ trợ nhập từ bàn phím thông qua lệnh `scanf()`. Nghe tới đây, chắc hẳn bạn sẽ tự hỏi sau khi nhập thì dữ liệu sẽ lưu ở đâu đúng không? Đừng nóng vội, chúng ta sẽ có ngay câu trả lời ở phần tiếp theo thôi!


> ⚡Chạy thử đoạn chương trình dưới và cho biết kết quả thu được là gì nhé!
```c
#include <stdio.h>

int main() {
	char name[50]; // ??????????????
	printf("Please enter your name: ");
	scanf("%s", name);
	printf("Welcome %s to Programming!", name);

	return 0;
}
```

Để đọc thêm về nhập xuất trong C, về cú pháp, cách sử dụng, thư viện cần khai báo các bạn có thể xem rõ hơn ở đây https://www.programiz.com/c-programming/c-input-output

> ⚡Thử tự tìm hiểu các lệnh nhập/xuất trong C++ và viết lại các đoạn chương trình nãy giờ bằng C++ nhé. Mình tin là các bạn làm được!
## 4. Biến, Hằng, Kiểu dữ liệu:
### **a. Biến:**


*Biến là nơi để chứa dữ liệu.* Bạn nhớ câu hỏi dữ liệu được lưu ở đâu khi nhập vào không? Đây là câu trả lời đấy!


![](https://images.viblo.asia/3f6e5324-3d52-4a1d-8cbc-0f9cbde6a40e.jpg)


Theo ví dụ trên thì biến (*varible*) sẽ như một chiếc ly, chiếc ly này có thể chứa các loại nước khác nhau (nước cam, nước chanh, nước lọc,...), tương tự thế biến cũng là nơi để chứa dữ liệu (*data*).
### **b. Hằng:**


Như ví dụ trên thì hằng cũng là một chiếc ly, nhưng chiếc ly này đặc biệt ở chỗ bạn chỉ có thể chứa một loại nước nhất định, điểu đó có nghĩa là bạn không thể thay ly nước lọc thành ly nước cam được. Tương tự thì giá trị của hằng trong lập trình cũng không thể thay đổi được.
### **c. Kiểu dữ liệu:**


Quay trở lại với ví dụ chiếc ly. Với các nhu cầu sử dụng khác nhau chúng ta sẽ dùng những chiếc ly khác nhau. 


![](https://images.viblo.asia/e77630e1-03c3-42fb-86a2-ab3ec2d5c9d1.png)



Khái niệm kiểu dữ liệu cho biết miền giá trị mà một biến có thể chứa. Mỗi biến sẽ có một kiểu dữ liệu khác nhau. Về phạm vi, kích thước các kiểu dữ liệu trong C các bạn có thể xem ở: https://www.geeksforgeeks.org/data-types-in-c/

## 5. Công cụ mô tả bài toán(mã giả, lưu đồ):
### **a. Mã giả (Pseudocode):**
![](https://images.viblo.asia/716ab946-2ca6-42f9-8c9c-1480bbcb350f.png)

* Mã giả là công cụ giúp bạn mô tả bài toán cần giải quyết gần gũi với ngôn ngữ thường ngày hơn, trước khi chuyển nó thành code. 
* Mã giả **KHÔNG** phải là một ngôn ngữ lập trình.
* Cụ thể hơn về cú pháp và cách sử dụng các bạn có thể đọc ở đây: https://quantrimang.com/pseudocode-la-gi-169796
### **b. Lưu đồ thuật toán (Flowchart):**
* Flowchart là một dạng biểu đồ, qua nó bạn có thể dễ dàng biểu diễn được luồng chạy, các bước mà chương trình sẽ thực thi.
![](https://images.viblo.asia/bdc37b1b-78bc-4dc5-96ee-cb2e92f613d2.jpeg)

   <div align="center"></div> (#J4F, nếu mọi thứ chỉ đơn giản là thế thì anh em dev chúng ta đã không phải đau đầu :v)
* Các kí hiệu để biểu diễn flowchart:
![](https://images.viblo.asia/3f6f5522-990e-4da8-ad26-85067d7c1ef0.png)

* Để đọc thêm về flowchart, các bạn có thể xem ở đây: https://www.edrawsoft.com/flowchart/program-flowchart-definition.html#:~:text=The%20program%20flowchart%20is%20a,the%20code%20of%20the%20programming
>⚡Sau khi có kiến thức về flowchart, thử xem hình vẽ sau đây thể hiện flowchart để thực hiện công việc gì nhé!
![](https://images.viblo.asia/48940838-949d-4114-92e7-93c39fcce338.jpg)

⚡Hãy tập thói quen viết mã giả, vẽ flowchart trước khi code một chương trình nhé! Điều này sẽ giúp bạn có thể hình dung được rõ ràng chương trình mình sẽ làm gì sau khi code hoàn thành. Nhờ đó mà bạn có thể hiểu được sâu sắc vấn đề, và giảm được các lỗi không đáng có trong quá trình code đấy! ⚡
## 6. Cấu trúc điều khiển, câu lệnh rẽ nhánh (if-else, switch case):
### **a. if-else:**


Chung quy lại thì lập trình cũng chỉ là sử dụng máy tính để giải quyết các vấn đề trong cuộc sống, chính vì vậy chúng ta cần phải mô tả những vấn đề đó dưới dạng ngôn ngữ lập trình. Một trong những mẫu câu mà chúng ta thường phải giải quyết trong cuộc sống đó là *nếu... thì...ngược lại...*(ví dụ *nếu* chăm chỉ học *thì* bạn sẽ qua môn *ngược lại* bạn sẽ rớt môn)

![](https://images.viblo.asia/9683d321-b3ec-4283-abe5-88f92a852738.png)


Trong C/C++, mẫu câu này sẽ có cấu trúc như sau:

![](https://images.viblo.asia/898042e7-9389-4c11-a31f-f05be68fe161.png)


Chi tiết về if-else trong C/C++ các bạn có thể xem ở đây: https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/


⚡Đến đây thì mình có một thử thách nhỏ cho các bạn đây: Hãy tạo ra một game kéo búa bao với các yêu cầu cụ thể sau:
```c
- Game được chơi trên giao diện console.
- Game cho phép người chơi nhập vào ba giá trị (kéo, búa, bao, chấp nhận người dùng chỉ nhập 3 giá trị này, chưa xử lí các trường hợp người dùng nhập vào các giá trị không hợp lệ).
- Máy sẽ được random giá trị (kéo, búa, bao). Về cách thức random, các bạn có thể search google với từ khóa 'generate random number C'.
- Kết quả xuất ra màn hình là thông báo người dùng thắng hoặc thua máy.
```
### **b. switch-case:**

Một cách khác để biễu diễn câu lệnh rẽ nhánh đó là sử dụng `switch-case`

![](https://images.viblo.asia/8f754353-e93b-4ed3-9b06-04326505e28f.jpeg)


Cụ thể về switch-case bạn có thể xem ở đây: https://www.programiz.com/c-programming/c-switch-case-statement

>⚡ Thử viết một chương trình cho phép người dùng nhập vào năm, tháng và xuất ra mà hình số ngày của tháng đó nhé.

## 7. Vòng lặp (loop):


Thử tưởng tượng bạn được cho 1 đề bài như sau: 
> In ra các số từ 1 đến 10


Công việc có vẻ đơn giản đúng không, bạn hoàn toàn có thể code như sau:
```c
#include<stdio.h>
int main()
{
    printf("1\n"); 
    printf("2\n");
    printf("3\n");
    printf("4\n");
    printf("5\n");
    printf("6\n");
    printf("7\n");
    printf("8\n");
    printf("9\n");
    printf("10\n");

    return 0; 
}
```


Nhưng thử tưởng tượng xem nếu việc cần làm là in ra từ 1 đến 1.000, 10.000,... bạn sẽ làm thế nào? Viết 1.000, 10.000,... lần lệnh `printf()` chăng? Đây là lúc vòng lặp giải quyết vấn đề đó. Đúng với tên gọi của nó, vòng lặp sinh ra để xử lí các vấn đề được lặp đi, lặp lại nhiều lần giống nhau.

### **a. Vòng lặp for:**
![](https://images.viblo.asia/4da7f99b-27ff-4eb8-a090-b55d330a4ff5.png)

for thường được dùng để thực hiện các lệnh lặp mà số lần lặp là một số biết trước.


Cấu trúc của for như sau:

![](https://images.viblo.asia/9451524a-b631-404c-a2d4-f5bbd14757a3.png)



Áp dụng cấu trúc trên, đoạn chương trình để in từ 1 đến 1000 có thể viết lại như sau:
```c
#include<stdio.h>
int main()
{
    for(int i = 1; i <= 1000; i++)
    {
        printf("i\n"); 
    }
        
    return 0; 
}
```
> ⚡Áp dụng vòng lặp for, bạn hãy thử in ra các số chẵn từ 1 đến 1000 nhé.
### **b. Vòng lặp while:**
![](https://images.viblo.asia/dd146f81-24c9-4b84-b604-1ade10581920.jpg)


while thường được dùng để thực hiện các lệnh lặp với số lần lặp là một số chưa biết trước.
> ⚡Thử sử dụng vòng lặp while để in ra các số từ 1 đến 1000 nhé.
### **c. Vòng lặp do-while:**

Cũng tương tự như `while`, tuy nhiên khác với while sẽ kiểm tra điểu kiện lặp ngay lần đầu tiên, `do-while` sẽ thực hiện khối lệnh cần lặp ít nhất 1 lần trước khi kiểm tra điều kiện lặp.

![](https://images.viblo.asia/1f9291c8-66e8-44db-87a3-30506fb43e68.jpg)

<br>

***Lưu ý khi sử dụng vòng lặp:***

![](https://images.viblo.asia/eea35bb7-9684-47bd-b617-abc532bcde3b.jpg)


Hãy để ý đến điều kiện dừng của vòng lặp, hãy chắc chắn rằng vòng lặp của bạn không phải là một vòng lặp vô tận.
Xét thử vòng lặp này và cho biết liệu nó có kết thúc được không nhé.
```c
for(int i = 0; i < 0; i++)
{
    print("i\n")
}
```

```
⚡Sau khi có kiến thức về vòng lặp, bạn hãy thử cải tiến trò chơi kéo, búa, bao nhé. Các cải tiến bao gồm:
- Khi người dùng nhập sai giá trị đầu vào (khác kéo, búa, bao), hiện ra thông báo cho biết người dùng đã nhập sai định dạng đầu vào và yêu cầu người dùng nhập lại.
- Sau khi kết thúc trò chơi, hiện ra thông báo cho phép người dùng tiếp tục 1 phiên trò chơi mới hoặc kết thúc trò chơi.
```
## Tạm kết:
Trên đây là phần 1 của bài viết, qua phần 1 này bạn cũng đã nắm được kha khá kiến thức về lập trình và có thể tự vọc vạch code rồi đấy. Cảm ơn các bạn đã dành thời gian đọc bài viết, chúc các bạn học tốt! Và sau cùng, nếu bài viết có sai sót hoặc có gì đó nhầm lẫn, mình hi vọng nhận được các ý kiến đóng góp từ các bạn. Hẹn gặp lại các bạn ở phần 2 bài viết.