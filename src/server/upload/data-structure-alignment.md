# Giới thiệu
Hello xin chào các bạn, mình là Hiếu, hiện tại mình đang là một embedded developer, một công việc khá thú vị 😂. À mà thôi, đi thẳng vào vấn đề luôn nhé (☞ﾟヮﾟ)☞. Struct là một khái niệm đơn giản nhưng cũng rất quan trọng trong ngôn ngữ lập trình C. Nó được dùng nhằm mục đích tạo ra một kiểu dữ liệu mà bạn mong muốn bằng cách kết hợp các kiểu dữ liệu đã có sẵn, ví dụ như *int, char, double*.... Và khi tìm hiểu về struct, chắc hẳn các bạn đều nghe tới một khái niệm nghe khá là pro, đó là *Struct Alignment* phải không. Vậy thì *Struct Alignment* thực sự là gì ? Các bạn hãy cùng mình tìm hiểu bằng góc nhìn của mình qua bài viết dưới đây nhé!
# Đặt vấn đề
Trước tiên, chúng ta hãy tìm hiểu xem đoạn code dưới đây có gì hay ho.
```C
#include <stdio.h>
#include <stdint.h>

typedef struct example_struct
{
  uint8_t  member1;
  uint32_t member2;
} ExampleStruct_t;

int main(void) 
{
  printf("Size of example struct: %lu bytes\n", sizeof(ExampleStruct_t));
  
  return 0;
}
```
Trong chương trình trên, mình có khai báo một struct với hai phần tử, phần tử thứ nhất thuộc kiểu *uint8_t* (1 byte) và thứ hai thuộc kiểu *uint32_t* (4 bytes). Theo lý thuyết thì size của một biến thuộc kiểu struct trên phải bằng tổng của các member của nó, tức là 4 + 1 = 5 bytes. Nhưng khi chạy thử chương trình trên, hãy xem điều gì thú vị xảy ra.
>**Output**: *Size of example struct: 8 bytes*

Opps..... what happened ? Tại sao kích thước của struct là 8 bytes, trong khi đáng lẽ ra nó là 5 bytes ? Câu trả lời đó là do cơ chế *Struct Aligment* trong C/C++. Được rồi, cùng đào sâu hơn một chút nào. Let's go!
# Phân tích
*Struct Alignment* thực ra là cách sắp xếp và truy cập dữ liệu trong bộ nhớ. Các dòng vi xử lý hiện đại, như là ARM chẳng hạn, thực hiện các thao tác đọc ghi trong bộ nhớ nhanh hơn khi dữ liệu được *natually aligned*. Có nghĩa là địa chỉ của dữ liệu được đọc là bộ số của kích thước kiểu dữ liệu đó. Ví dụ, kiểu *uin32_t* có size là 4 bytes sẽ được thực hiện các thao tác đọc ghi nhanh hơn nếu như được lưu ở các địa chỉ là bội số của 4, như là 0, 4, 8 ....
![](https://images.viblo.asia/d9b9ffac-ee13-4b78-9360-8db21dea43b8.PNG)

Do đó, khi tạo một struct sẽ dẫn đến việc sẽ cần phải chèn một số vùng nhớ trống giữa các member để đảm bảo việc dữ liệu trong struct được *natually aligned*. Việc chèn thêm các vùng nhớ trống này được gọi là *padding*. Hãy thử với ví dụ minh họa phía trên nhé.
![](https://images.viblo.asia/cc620481-40c1-4593-92fb-f78af95e32af.PNG)

Ở hình bên trên, khi dữ liệu trong struct không được aligned, *member2* được lưu trữ tại địa chỉ *0x01*, không phải là bội số của 4. Điều này dẫn tới việc khi truy cập vào biến này trong chương trình, CPU sẽ cần phải thực hiện thêm một số câu lệnh nữa (mình sẽ minh họa bên dưới), vô tình làm tăng bộ nhớ cũng như làm giảm tốc độ của chương trình. Còn khi có *struct alignment*, chúng ta sẽ mất thêm 3 bytes dành cho việc padding, nhưng bù lại bộ nhớ chương trình giảm đi cũng như tốc độ được cải thiện. Hình trên cũng giải thích cho việc tại sao khi chạy chương trình ví dụ bên trên, output in là size của struct là 8 bytes chứ không phải 5 bytes. Vì chúng ta mất thêm 3 bytes dành cho việc padding.

Hầu hết trong các cuộc phỏng vấn vào các vị trí embedded developer, khi được hỏi về struct alignment, chúng ta chỉ cần hiểu đến đây là quá fine rồi. Nhưng khi tìm hiểu sâu thêm một chút, mình thấy có một số kiến thức khá hay ho, nên mình sẽ trình bày ở dưới đây. Nhưng trước hết hãy tìm hiểu một số khái niệm cơ bản đã nhé.

### Một số khái niệm cơ bản
* *Địa chỉ a* được gọi là ***n-bytes aligned*** khi *a* là bội số của *n*, tức *a = m * n*, trong đó *m* là số tự nhiên 0, 1, 2, 3..... Ví dụ địa chỉ *0x0400* là 4-bytes aligned.
* Một *memory access* được gọi là ***aligned access*** khi dữ liệu được truy cập có kích thước là *n-bytes* và địa chỉ của vùng nhớ chứa dữ liệu đó là *n-bytes aligned*. Khi một memory access không phải là aligned access, nó được gọi là ***misaligned access*** hoặc ***unaligned access***.

### Ví dụ, giải thích
Bất kể đối với dòng vi xử lý nào đều có một kiến trúc tập lệnh dành riêng cho nó, bao gồm các lệnh để điều khiển hoạt động của CPU (truy xuất bộ nhớ, tính toán ...). Các ngôn ngữ lập trình ở tầng trên như C/C++, sẽ được biên dịch chuyển thành các câu lệnh trong tập lệnh này để thực thi chương trình. Vậy thì việc truy cập bộ nhớ sẽ bị giới hạn bởi khả năng của những lệnh truy cập bộ nhớ - *memory access instructions* trong tập lệnh của vi xử lý. Trong kiến trúc ARM (ở đây mình đang lấy ví dụ về tập lệnh thumb-2 instuctions set của vi xử lý ARM-Cortex M4), có cung cấp một số lệnh để truy cập bộ nhớ, và chỉ một số ít trong đó hỗ trợ *unaligned access*. Tất cả các lệnh truy cập bộ nhớ, ngoại trừ các lệnh này sẽ tạo ra một *UsageFault* exception nếu nó thực hiện một *unaligned access*. Ngoài ra, kể cả khi thực hiện các *unaligned access*, việc truy cập bộ nhớ cũng tốn thời gian hơn nhiều so với *aligned access*. Vì vậy mà các compiler sẽ biên dịch ra các lệnh để lưu trữ các variable tại các địa chỉ *natually aligned* nhằm đảm bảo hiệu năng của chương trình. Các bạn có thể tham khảo *section 3.3, 3.4* trong tài liệu *Cortex-M4 Devices Generic User Guide* , link tại đây https://developer.arm.com/documentation/dui0553/a/.
![](https://images.viblo.asia/45897a60-e468-49fb-8ffe-3a26fb48fa54.JPG)

Trăm nghe không bằng một thấy, các bạn hãy cùng mình tham khảo ví dụ dưới đây. Lưu ý, ví dụ này được mình compile và chạy trên vi điều khiển STM32F411RE Cortex-M4, sử dụng STM32 Cube IDE.

Trong trường hợp đầu tiên, mình khai báo một struct như bình thường, khi này, mặc định struct sẽ được aligned.
```C
#include <stdint.h>
#include <stdio.h>

typedef struct example_struct
{
    uint8_t  member1;
    uint32_t member2;
} ExampleStruct_t;

int main(void)
{
    ExampleStruct_t data;
    data.member1 = 0x01U;
    data.member2 = 0x00FF00FFU;

    (void)data; /* just to bypass compiler warning about unused variable "data" */
}
```
Khi mình chạy đoạn code trên và sử dụng tính năng diassembly trên IDE, các lệnh truy xuất data thuộc srtuct chỉ tốn hai lượt truy cập bộ nhớ (load và strore) do dữ liệu trong struct được aligned.
![](https://images.viblo.asia/12c5b90a-6435-4411-8a70-175d2c8e6386.JPG)

Trường hợp thứ hai, mình thử khai báo một struct không aligned, sử dụng attribute ```__attribute__((packed))```. Việc này được gọi là *data structure packing*.
```C
#include <stdint.h>
#include <stdio.h>

typedef struct example_struct
{
    uint8_t  member1;
    uint32_t member2;
} __attribute__((packed)) ExampleStruct_t;

int main(void)
{
    ExampleStruct_t data;
    data.member1 = 0x01U;
    data.member2 = 0x00FF00FFU;

    (void)data; /* just to bypass compiler warning about unused variable "data" */
}
```
Nào hãy cùng xem code assembly tương ứng với đoạn code trên khi được compile sẽ như thế nào.
![](https://images.viblo.asia/3cac1f16-8395-476e-9612-83873ff2f6e0.JPG)

Như chúng ta thấy, khi data thuộc struct không được aligned, việc truy xuất sẽ tốn hơn rất nhiều lệnh so với việc truy xuất với data được aligned. Việc không aligned struct có thể giúp ta tiết kiệm được một vài bytes bộ nhớ nhưng sẽ là tăng bộ nhớ dành cho chương trình và tăng thời gian thực thi. Nói thế vậy cũng không có nghĩa việc aligned một struct sẽ luôn hiệu quả hơn so với việc không aligned. Trong một số trường hợp, khi dung lượng dành cho bộ nhớ RAM là cực nhỏ và bộ nhớ dành cho chương trình, FLASH chẳng hạn, là không giới hạn, đồng thời cũng không có bất kì ràng buộc nào về mặt thời gian, việc không dùng struct alignment lại tỏ ra hiệu quả hơn khi tiết kiệm được bộ nhớ RAM.
# Tổng kết
Nói chung, *struct alignment* là việc sắp xếp lại các member trong struct đó vào các địa chỉ *n-bytes aligned*, với n là kích thước của kiểu dữ liệu của member đó. Việc này làm tăng tốc độ truy cập cũng như giảm dung lượng bộ nhớ dùng cho chương trình, nhưng cũng đồng thời tốn thêm một lượng nhỏ bộ nhớ thực thi RAM dành cho việc lưu trữ biến thuộc kiểu struct đó. Và trong một số trường hợp đặc biệt, việc dùng unaligned struct lại tỏ ra hiệu quả hơn. Có một tips nhỏ để giảm thiểu tối đa bộ nhớ lãng phí khi dùng *struct alignment*, đó là trong trường hợp khi vấn đề thứ tự giữa các member trong struct là không quan trọng, hãy sắp xếp các member theo thứ tự từ cao đến thấp của size. Bài chia sẻ đến đây của mình kết thúc, chúc các bạn học vui 😁.