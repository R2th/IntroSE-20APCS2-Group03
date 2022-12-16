### Virtual function (hàm ảo)

Virtual function giống như một hàm quá tải, nhưng điều đặc biệt ở đây là: kiểu dữ liệu, số lượng và kiểu dữ liệu của các tham số của hàm ảo ở cả hai lớp cơ sở và dẫn xuất đều như nhau ! Hàm ảo là thành phần của một lớp, được khai báo trong lớp cơ sở rồi nhưng lại được khai báo lại trong lớp dẫn xuất với từ khoá “virtual” ở đằng trước. Không phải tự dưng người ta làm điều này vô ích, hàm ảo tạo nên tính đa hình trong c++ là bởi vì có thể nói một “giao diện” cho nhiều phương thức. Có nghĩa là với một thông điệp đó thôi mà  cho nhiều kết quả khác nhau khi con trỏ của lớp cơ sở trỏ đến đối tượng của một lớp nào đó (không nói đến con trỏ của lớp dẫn xuất vì nó không thể trỏ đến đối tượng của lớp cơ sở được !). 

Để khai báo hàm ảo, bạn thêm từ khóa virtual trước tên hàm. Hãy theo dõi ví dụ minh họa sau để hiểu hơn cách hàm ảo làm việc.

Ví dụ:

```
#include<iostream>
#include<conio.h>
using namespace std;
class sun
{
    public:
      virtual void showcty()
      {
                cout<<"\n  Hien thi sun:";
      }
      void display()
      {
              cout<<"\n  Trung bay sun:" ;
      }
};
 
class kethua:public sun
{
   public:
      void display()
      {
              cout<<"\n  Trung bay sun1:";
      }
      void showcty()
      {
              cout<<"\n  Hien thi sun1:";
      }
};
 
int main()
{
   
   sun obj1;
   sun *p;
   cout<<"\n P tro toi sun:\n"  ;
 
   p=&obj1;
   p->display();
   p->showcty();
 
   cout<<"\n\n P tro toi sun1:\n";
   kethua obj2;
   p=&obj2;
   p->display();
   p->showcty();
   return 0;
}

```

Kết quả:

```
P tro toi sun:
Trung bay sun:
Hien thi sun:
P tro toi sun1:
Trung bay sun:
Hien thi sun1:
```

Chú ý:

Còn một điều đáng chú ý nữa, hàm ảo này có thể không được định nghĩa trong lớp cơ sở mà chỉ được khai báo thôi! VD: virtual void setsun(int i)=0. Lúc này chúng ta gọi nó là “hàm ảo thuần tuý”.

Ví dụ tiếp theo:

```
#include <iostream>
using namespace std;
class Sun
{
public:
   ~Sun()
   {
      cout << "This is Sun*" << endl;
   }
};
class  Sun1 : public Sun
{
public :
   ~Sun1()
   {
      cout << "This is Sun1" << endl;
   }
};
int main()
{
   Sun* sun = new Sun1();
   delete sun;
   return 0;
}
```

Kết quả:

```
This is Sun*
```

Ở ví dụ trên hàm hủy của Sunclass không được định nghĩa là virtual nên khi ta hủy con trỏ sun hàm hủy của Sun1 không được gọi. Nên ta định nghĩa hàm hủy của Sun class là virtual.


### Override và final

Override là việc viết lại một phương thức (method) trong lớp dẫn xuất (derived class) mà ở lớp cơ sở (base class).

Như chúng ta đã biết để lớp dẫn suất override 1 virtual function của base class thì 2 hàm phải có cùng tên, cùng tham số và cùng kiểu dữ liệu trả về. Tuy nhiên trong nhiều trường hợp ta có thể xảy ra nhầm lẫn khi override 1 virtual function.

Ví dụ:

```
class Sun
{
public:
   virtual void Thongtin()
   {
      cout << "Day la ham thong tin cty SUN" << endl;
   }
};
class  CSun1 : public Sun
{
public:
   void Thongtin() const
   {
      cout << "Day la ham thong tin nhan vien Sun" << endl;
   }
};
```

Trong ví dụ trên hàm CSun1::Thongtin khong co override hàm Sun::Thongtin vì hàm CSun1::Thongtin là const còn hàm Sun::Thongtin thì không phải.

Trong phiên bản C++11 có hỗ trợ thêm một từ khóa là override, ý nghĩa của từ khóa này sẽ giúp ta kiểm soát việc một hàm có thật sự là override một phương thức của lớp mà nó đang kế thừa hay không, nếu không tồn tại phương thức mà nó đang "nghĩ" rằng nó đang override tại lớp mà nó kế thừa thì trình biên dịch sẽ báo lỗi khi biên dịch. Ta thêm từ khóa override vào cuối tên phương thức như sau.

```
class Sun
{
public:
	char* getThongtinsun(int sign)
	{
		if (sign > 0)
		{
			return "Sun";
		}
	}
};
 
class CSun1: public Sun
{
public:
	char* getThongtinsun(char sign) override
	{
		if (sign > 0)
		{
			return "CSun1";
		}
	}
};
```

Trong nhiều trường hợp ta không muốn lớp dẫn suất override 1 virtual function trong base class. C++ 11 cung cấp cho ta từ khóa final để thực hiện điều này. Virtual function được đánh dấu là final sẽ không cho phép override ở lớp dẫn suất. Nếu lớp dẫn suất vẫn override thì trình biên dịch sẽ báo lỗi.

Ví dụ :

```
class Sun
{
public:
   virtual void Thongtin() final
   {
      cout << "Day la ham thong tin cty Sun" << endl;
   }
};
class  CSun1 : public Sun
{
public:
   //Error
   void Thongtin() override
   {
      cout << "Day la ham thong tin nhan vien Sun" << endl;
   }
};
```

Trên đây là 1 số tìm hiểu của tôi về Virtual function, override và final cảm ơn các bạn đã đọc.

Link tham khảo: 

https://deepcpp.com/

https://kipalog.com/posts/Tu-khoa-virtual-trong-C--702eb516-7ea6-472c-a812-42c0733d6c33