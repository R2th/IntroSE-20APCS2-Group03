# Singleton Design pattern
## 1. Vấn đề
**- Ý tưởng:**
Tạo ra một một mẫu thiết kế và đảm bảo rằng một lớp chỉ có một thể hiện, đồng thời cung cấp một điểm truy cập toàn cục cho thể hiện này.
![](https://images.viblo.asia/9e7d32ca-cc13-4429-890f-3b2306212264.png)

**Singleton:**

1. - Đảm bảo rằng một lớp chỉ có một cá thể duy nhất . Tại sao mọi người lại muốn kiểm soát số lượng cá thể mà một lớp có? Lý do phổ biến nhất cho điều này là kiểm soát quyền truy cập vào một số tài nguyên được chia sẻ việc này liên quan đến smart-pointer.

Ví dụ: khi thao tác với cơ sở dữ liệu hoặc các file.
- Đây là cách nó hoạt động: hãy tưởng tượng rằng bạn đã tạo một đối tượng, nhưng sau một thời gian quyết định tạo một đối tượng mới. Thay vì nhận một đối tượng mới được tạo ra, bạn sẽ nhận được một đối tượng mà bạn đã tạo từ trước.

- Lưu ý rằng hành vi này không thể thực hiện với một phương thức khởi tạo thông thường vì lời gọi phương thức khởi tạo phải luôn trả về một đối tượng mới theo thiết kế.
![](https://images.viblo.asia/e9c43bcd-27f8-4ed4-b113-8f8ccdca62dc.png)

2. - Cung cấp một điểm truy cập toàn cầu cho phiên bản đó . Hãy nhớ những biến toàn cục mà bạn đã sử dụng để lưu trữ một số đối tượng thiết yếu? Mặc dù rất tiện dụng nhưng chúng cũng rất không an toàn vì bất kỳ mã nào cũng có khả năng ghi đè lên nội dung của các biến đó và làm hỏng ứng dụng.

- Cũng giống như một biến toàn cục, mẫu Singleton cho phép bạn truy cập một số đối tượng từ bất kỳ đâu trong chương trình. Tuy nhiên, nó cũng bảo vệ phiên bản đó không bị mã khác ghi đè.

- Có một mặt khác của vấn đề này: bạn không muốn mã giải quyết vấn đề số 1 bị phân tán khắp chương trình của mình. Tốt hơn nhiều nếu có nó trong một lớp, đặc biệt nếu phần còn lại của mã của bạn đã phụ thuộc vào nó.

--> Ngày nay, mô hình Singleton đã trở nên phổ biến đến mức mọi người có thể gọi một cái gì đó là singleton ngay cả khi nó chỉ giải quyết được một trong những vấn đề được liệt kê.

## 2. Giải pháp
Tất cả các triển khai của Singleton đều có hai bước chung sau:
- Đặt phương thức khởi tạo mặc định là riêng tư, để ngăn các đối tượng khác sử dụng newtoán tử với lớp Singleton.
- Tạo một phương thức tạo tĩnh hoạt động như một phương thức khởi tạo. Bên dưới, phương thức này gọi phương thức khởi tạo riêng để tạo một đối tượng và lưu nó trong một trường tĩnh. Tất cả các lệnh gọi sau đến phương thức này đều trả về đối tượng được lưu trong bộ nhớ cache.
- Nếu mã của bạn có quyền truy cập vào lớp Singleton, thì nó có thể gọi phương thức tĩnh của Singleton. Vì vậy, bất cứ khi nào phương thức đó được gọi, cùng một đối tượng luôn được trả về.
Vd: Một ví dụ đơn giản về design pattern singleton là các bộ máy quản lý của các công ty, mỗi công ty chỉ có duy nhất một bộ máy quản lý.
**- Mô hình:**
![](https://images.viblo.asia/e170a946-179e-40a5-bd2d-07046ec8e3be.png)

## 3. Demo
```
#include <iostream>
#include <string>
#include <stdlib.h>
using namespace std;

class Number
{
  public:
    // 2. Define a public static accessor func
    static Number *instance(); 
    static void setType(string t)
    {
      type = t;
      delete inst;
      inst = 0;
    }
    virtual void setValue(int in)
    {
      value = in;
    }
    virtual int getValue()
    {
      return value;
    }
  protected:
    int value;
    // 4. Define all ctors to be protected
    Number()
    {
        cout << ":ctor: ";
    } 
  // 1. Define a private static attribute
  private:
    static string type;
    static Number *inst; 
};

string Number::type = "decimal";
Number *Number::inst = 0;

class Octal: public Number
{
  // 6. Inheritance can be supported
  public:
    friend class Number;
    void setValue(int in)
    {
      char buf[10];
      sprintf(buf, "%o", in);
      sscanf(buf, "%d", &value);
    }
  protected:
    Octal(){}
};

Number *Number::instance()
{
  if (!inst)
    // 3. Do "lazy initialization" in the accessor function
    if (type == "octal")
      inst = new Octal();
    else
      inst = new Number();
  return inst;
}

int main()
{
  // Number  myInstance; - error: cannot access protected constructor
  // 5. Clients may only use the accessor function to manipulate the Singleton
  Number::instance()->setValue(42);
  cout << "value is " << Number::instance()->getValue() << endl;
  Number::setType("octal");
  Number::instance()->setValue(64);
  cout << "value is " << Number::instance()->getValue() << endl;
}
```
Output:
```
:ctor: value is 42
:ctor: value is 100
```
## 4. Sử dụng
- Sử dụng mẫu Singleton khi một lớp trong chương trình của bạn chỉ nên có một phiên bản duy nhất cho tất cả các máy khách; ví dụ, một đối tượng cơ sở dữ liệu duy nhất được chia sẻ bởi các phần khác nhau của chương trình.
- Mẫu Singleton vô hiệu hóa tất cả các phương thức tạo đối tượng khác của một lớp ngoại trừ phương thức tạo đặc biệt. Phương thức này tạo một đối tượng mới hoặc trả về một đối tượng hiện có nếu nó đã được tạo.
- Sử dụng mẫu Singleton khi bạn cần kiểm soát chặt chẽ hơn đối với các biến toàn cục.
- Không giống như các biến toàn cục, mẫu Singleton đảm bảo rằng chỉ có một thể hiện của một lớp. Không có gì, ngoại trừ chính lớp Singleton, có thể thay thế thể hiện được lưu trong bộ nhớ cache.
**- Lưu ý:** Bạn luôn có thể điều chỉnh giới hạn này và cho phép tạo bất kỳ số lượng cá thể Singleton nào. Đoạn mã duy nhất cần thay đổi là phần thân của getInstancephương thức.
## 5. Triển khai
1. Thêm một trường tĩnh riêng vào lớp để lưu trữ cá thể singleton.
2. Khai báo một phương thức tạo tĩnh công khai để nhận cá thể singleton.
3. Thực hiện “khởi tạo lười biếng” bên trong phương thức tĩnh. Nó sẽ tạo một đối tượng mới trong lần gọi đầu tiên và đưa nó vào trường tĩnh. Phương thức phải luôn trả về trường hợp đó trong tất cả các lần gọi tiếp theo.
4. Đặt hàm tạo của lớp ở chế độ riêng tư. Phương thức static của lớp sẽ vẫn có thể gọi hàm tạo, nhưng không thể gọi các đối tượng khác.
5. Xem qua mã máy khách và thay thế tất cả các lệnh gọi trực tiếp đến phương thức khởi tạo của singleton bằng các lệnh gọi đến phương thức tạo tĩnh của nó.

## 6. Ưu nhược điểm
**Ưu điểm:**
- Bạn có thể chắc chắn rằng một lớp chỉ có một cá thể duy nhất.
- Bạn có được một điểm truy cập toàn cầu vào phiên bản đó.
- Đối tượng singleton chỉ được khởi tạo khi nó được yêu cầu lần đầu tiên.
**Nhược điểm:**
- Ví dụ, mẫu Singleton có thể che giấu thiết kế xấu khi các thành phần của chương trình biết quá nhiều về nhau.
- Mẫu yêu cầu xử lý đặc biệt trong môi trường đa luồng để nhiều luồng sẽ không tạo ra một đối tượng singleton nhiều lần.
-Có thể khó kiểm tra đơn vị mã máy khách của Singleton vì nhiều khung công tác kiểm tra dựa vào tính kế thừa khi sản xuất các đối tượng giả. Vì phương thức khởi tạo của lớp singleton là private và việc ghi đè các phương thức tĩnh là không thể trong hầu hết các ngôn ngữ, bạn sẽ cần phải nghĩ ra một cách sáng tạo để bắt chước singleton. Hoặc chỉ không viết các bài kiểm tra. Hoặc không sử dụng mẫu Singleton.