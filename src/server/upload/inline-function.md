### 1. Định nghĩa
- Inline function là một chức năng trong ngôn ngữ lập trình C++. Hàm inline là hàm được định nghĩa bằng từ khóa inline. Hàm inline được sử dụng để yêu cầu trình biên dịch (compiler) thay thế lời gọi hàm bằng toàn bộ mã code của hàm nhằm mục đích giảm thời gian chạy chương trình.
- Quá trình biên dịch một chương trình:
![](https://images.viblo.asia/3201b532-4087-4cfc-bc2e-a0d07858beca.png)

   Hình 1: Quá trình biên dịch một chương trình
- Hàm inline sẽ được trình biên dịch thực hiện thay thế vị trí gọi hàm bằng nội dung hàm inline (step 4).
- Tại sao cần sử dụng hàm inline:
	Thông thường xử lý khi gặp hàm trong khi chạy chương trình, chương trình sẽ lưu địa chỉ bộ nhớ của các lệnh ngay sau khi câu lệnh gọi hàm, tải hàm được gọi vào bộ nhớ, sao chép giá trị đối số, nhảy đến vị trí bộ nhớ của hàm được gọi, thực thi mã chức năng, lưu giá trị trả về, trở lại địa chỉ của lệnh đã được lưu ngay trước khi thực hiện hàm được gọi.
    → Việc này sẽ gây lãng phí tài nguyên đối khi chạy chương trình với các hàm ngắn chỉ gồm 1 vài câu lệnh (vì thời gian gọi hàm lớn hơn nhiều so với thời gian thực hiện mã hàm). Vì vậy cần sử hàm inline sẽ tiết kiệm nhiều tài nguyên trong quá trình chạy chương trình.
### 2. Cách sử dụng
- Để định nghĩa một hàm inline: đặt từ khóa “inline” ở phần đầu tiên của hàm.
	Cú pháp:
```
	inline return_type function_name(param){
		…
	}
```
vd 
```
#include <iostream>
 
using namespace std;
 
inline void hello() 	//declare inline function
{
 	cout<<"hello";
}
int main()
{
 	hello(); //Call it like a normal function...
 	cin.get();
}
```
#### - Hàm inline được sử dụng khi:
   + Trong chương trình, khi cần thời gian thực hiện ngắn (ưu tiên hiệu suất), và chắc chắn rằng việc sử dụng sẽ mang lại hiệu suất.
   + Các hàm có nội dung rất nhỏ và được gọi rất thường xuyên.
   + Sử dụng hàm inline trong class, nên sử dụng từ khóa inline bên ngoài lớp với định nghĩa hàm.
Vd:
```
class classX{
	private:
	 string name;
	public:
	 string getName();
};
inline string classX::getName(){
	return name;	
}
```
#### - Trường hợp không nên sử dụng hàm inline:
   + Do quá trình compiler thay thế các vị trí gọi hàm bằng nôi dung hàm nên các trường hợp hàm lớn, phức tạp, nếu sử dụng hàm inline sẽ dẫn tới tệp thực thi lớn và sẽ tốn tài nguyên để lưu các biến trong hàm inline.
   + Hàm khởi tạo và hàm hủy.
   + Hàm ảo hầu như sẽ không được là hàm inline.
		-> Hàm ảo khi được gọi bằng tham chiếu của lớp cơ sở hoặc con trỏ, thì không thể là inline_function (vì lời gọi sẽ được giải quyết trong thời gian chạy chương trình). Nhưng khi được gọi bằng cách sử dụng đối tượng (không có tham chiếu hoặc con trỏ) của lớp đó, có thể là inline_function vì trình biên dịch biết chính xác lớp của đối tượng trong thời gian biên dịch chương trình.
Vd:
```
#include <iostream>
using namespace std;
class Base
{
public:
    virtual void who()
    {
        cout << "I am Base\n";
    }
};
class Derived: public Base
{
public:
    void who()
    { 
        cout << "I am Derived\n";
    }
};
  
int main()
{
    Base b;
    b.who();//-> it can be inline
  
    Base *ptr = new Derived();
    ptr->who();  //-> it cannot be inline
  
    return 0;
}
```
#### - Lưu ý:
Từ khóa inline thực hiện một yêu cầu đến compiler(không phải là một lệnh). Vì vậy trong một số trường hợp, trình biên dịch sẽ bỏ qua từ khóa “inline” để biên dịch như một hàm thông thường:
   + Trong hàm inline chứa vòng lặp
```
        inline void loop(int a, int c){
			for(int i = 0; i < a; i++)
				count++;
		}
```
   + Trong hàm chứa các biến tĩnh
```
        static int a = 4;
 ```
   + Hàm đệ quy
```
	inline int demo_inline(a){
			if( a < 3 )
				a++;
			else
                retrurn a;
			return demo_inline();
		}
```
   + Trong hàm có chức năng chứa lệnh switch hoặc go to
```
static int c = 3;
		bool check = false;
		prin: cout << "Trainning C++!" << endl;
		if(check == true)
			goto prin;
```

   + Kiểu trả về của hàm khác void nhưng không có lệnh return.
```
inline sum(int a, int b){
			int sum;
			sum = a + b;		
		}
```
### 3. Ưu nhược điểm
#### - Ưu điểm:
   + Nó không yêu cầu chức năng gọi overhead.
   + Tiết kiệm chi phí gọi hàm, thực hiện chương trình nhanh.
#### - Nhược điểm:
   + Sử dụng hàm inline sẽ tiêu thụ các thanh ghi bổ xung cho việc lưu biến (các biến được định nghĩa trong hàm inline sẽ được lưu lại vào các thanh ghi bổ xung). Vì thế nếu sử dụng hàm inline có nhiều biến tại nhiều vị trí sẽ dẫn đến việc tiên tốn tài nguyên để lưu trữ biến.
   + Sử dụng quá nhiều hàm inline sẽ dẫn tới việc tăng kích thước của file nhị phân, do sự trùng lặp của mã code.
   + Sử dụng nhiều hàm inline sẽ dẫn tới việc làm giảm tốc độ truy cập từ bộ nhớ đệm tới bộ nhớ chính.
   + Các hàm inline thường không hữu ích trong các hệ thống yêu cầu về kích thước file. vd như trong các hệ thống nhúng.
#### Nguồn: 
   https://www.geeksforgeeks.org/inline-functions-cpp/
   
   https://tapit.vn/qua-trinh-bien-dich-mot-chuong-trinh-cc/
   
   http://www.cplusplus.com/articles/2LywvCM9/
   
   http://www.cplusplus.com/articles/G3wTURfi/