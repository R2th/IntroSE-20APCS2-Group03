# Const trong C++
## 1. Định nghĩa
- Const được sử dụng để định nghĩa một hằng số trong chương trình.
## 2. Cách sử dụng
### Cú pháp
- Trong chương trình, khi cần khai báo một biến với giá trị không đổi trong quá trình chạy chương trình.

- Cú pháp:
```
    const type name = value;
```
vd:
```
    const int age = 3;
```
-> Sử dụng từ khóa const với biến, coder sẽ không cần quan tâm tới việc thay đổi giá trị của biến nên sẽ rất dễ dàng trong việc sử dụng giá trị mà không cần quan tâm tại một vị trí nào đó, sẽ có người thay đổi giá trị của biến.
### Sử dụng const với con trỏ:
- Thông thường khi sử dụng con trỏ, có thể thay đổi giá trị của đối tượng thông qua con trỏ, hoặc thay đổi đối tượng mà nó trỏ đến. Tuy nhiên, trong nhiều trường hợp không cho phép điều này xảy ra. Từ khóa const cho phép người dùng định nghĩa một con trỏ mà không thể thay đổi giá trị của đối tượng thông qua con trỏ, và một con trỏ cố định (chỉ trỏ tới một đối tượng duy nhất).

	+ Định nghĩa con trỏ: trỏ tới đối tượng, giá trị của đối tượng sẽ không được thay đổi bởi con trỏ (trong trường hợp chỉ cho phép thay đổi giá trị của biến khi thao trực tiếp với biến):
```
    const int* pa = &a;
	// (*pa)++; -> error!
```
```
	int const *pa = &a;
	// (*pa)++; -> error!
```
```
    const string* pa = new string();
    string const *pa = new string();
```
+ Định nghĩa con trỏ: con trỏ này trỏ tới một đối tượng duy nhất (coder sẽ không cần quan tâm tới việc tại một vị trí nào đó khi trong chương trình, con trỏ sẽ thay đổi đối tượng mà nó trỏ đến).
```
    int* const pa = &a;
	// pa = &b; -> error!
```
```
string* const pa = new string();
```
Lưu ý: trong trường hợp này cần chỉ ra đối tượng mà  con trỏ trỏ đến lúc khai báo. Nến không, con trỏ sẽ trỏ đến vùng nhớ mà máy tính cấp phát, địa chỉ này sẽ không được thay đổi trong quá trình chạy chương trình. Nên giá trị của con trỏ sẽ là giá trị tại địa chỉ mà con trỏ được cấp phát -> không chủ động được giá trị cấp phát cho con trỏ.

+ Định nghĩa một con trỏ: con trỏ này trỏ tới một đối tượng duy nhất, giá trị của đối tượng này sẽ không bị thay đổi bởi con trỏ.
```
    const int * const pa = &a;
	// (*pa)++; -> error!
	// pa = &b; ->error!
```
-> Khi sử dụng const với con trỏ, người dùng sẽ có ít vấn đề hơn phải quan tâm (có không cần quan tâm tới việc thay đổi giá trị của con trỏ hay đối tượng mà con trỏ sẽ trỏ đến) việc này sẽ loại đi những nhiệm vụ không cần thiết của con trỏ -> sẽ rất thuận tiện cho việc code, bảo trì và sửa đổi code trong dự án.
### Sử dụng const với hàm:
### - Const với param của function:
Một hàm nếu muốn truyền tham chiếu đến một hằng const, khi khai báo param cần định nghĩa param được truyền vào là const:
```
	int sum(const int &a, int b){ return a+b; }
	int sum1(int &a, int b){ return a+b; }
	int main(){
		const int ca = 1;
		const int cb = 2;
		int a = 1, b = 2;
		cout << "sum: " << sum(a,b) << endl;
cout << "sum: " << sum(ca,cb) << endl;
cout << "sum: " << sum1(ca,b) << endl; //error!
return 0;		
	}
```
   Giải thích: khi một biến được khai báo là const, thì giá trị tại địa chỉ được khai báo là một hằng số. Trong khi ở hàm được khai báo là địa chỉ của một đối tượng có thể thay đổi được giá trị. -> không đúng tham số truyền vào hàm.
   
Lưu ý: Khi sử truyền một biến const vào một hàm:
    
+ Đối với các biến tham trị trong hàm, sẽ không cần khai báo const để truyền biến const vào hàm. Vì cơ bản biến tham trị sẽ không làm thay đổi giá trị của biến truyền vào.

+ Đối với các biến tham chiếu, khi muốn truyền biến const vào hàm, cần khai báo const cho biến đó. 

- Trường hợp cần truyền một const vào một biến tham chiếu của hàm. Nhưng biến không được khai báo const. Sử dụng từ khóa const_cast:
```
	int func(int &a){return (number += 100);}
	int main(){
		const int a = 5;
		int x = func(a); //-> error!
		int y = func(const_cast<int &>(x));
	}
```
-> Lưu ý: từ khóa const_cast cho phép truyền một biến const vào hàm giống như một biến thông thường và giá trị của const sẽ được thay đổi như biến bình thường. Nhưng khi kết thúc hàm lời gọi hàm, giá trị của const lại được trả về như cũ. Cần lưu ý đến việc sử dụng giá trị của biến const trong thân hàm.
### - Const với giá trị trả về của hàm
- Khi khai báo const giá trị trả về của hàm.
```
const int func(){return count;}
…
int a = func();
```
   -> Trong trường hợp này, hằng số const không có tác dụng vì, hàm trả về một giá trị không đổi, trong khi biến a chỉ nhận giá của hàm. Giống như việc gán giá trị của một hằng cho một biến.
```
	const int a = 8;
	int b = 8; //giá trị của b vẫn có thể thay đổi.
```
- Khi cần trả về một giá trị là hằng con trỏ:
```
const int* const func();
```
-> Thường được sử dụng trong class, khi giá trị trả về của con trỏ là hằng số.

Lưu ý: Trong trường hợp const ở sau dấu *:
    
+ Từ khóa const đặt ở sau dấu * để đảm bảo rằng con trỏ được trả về sẽ chỉ trỏ tới 1 địa chỉ duy nhất.

+ Khi kết thúc lời gọi hàm, con trỏ này sẽ bị hủy, trong khi giá trị trả về của hàm là địa chỉ ô nhớ mà con trỏ trỏ đến.

-> Việc đặt const ở sau * trong trường hợp này là vô nghĩa.

### Sử dụng const với class:
- Khi khai báo một class const: các giá trị của class tại thời điểm khai báo sẽ không bị thay đổi trong quá trình chạy trương trình.
```
	class test{
		private:
			int a;
		public:	
			void count(){ a++};	
	};
	int main{
		const test* t = new test();
		t->count(); //->error!
    }
```
- Trong trường hợp muốn tạo class kiểu const, nhưng vẫn muốn một số giá trị có thể thay đổi, trong trường hợp này có thể sử dụng từ khóa "mutable".

+ mutable là từ khóa được sử dụng để định nghĩa một biến mà có thể thay đổi gián trị của biến này ngay cả khi class được khai báo const.
```
	class test{
		private:
			mutable int a;
		public:	
			void count(){ a++};	
	};
	int main{
		const test* t = new test();
		t->count();
    }
```
Lưu ý: Từ khóa mutable có thể được sử dụng trong class, vì vậy khi khai báo class const, cần kiểm tra xem các biến được khai báo mutable để có thể sử dụng chúng một cách hợp lý.

- Sử dụng "const" với hàm trong class: Khi một hàm được khai báo const tại vị trí sau khi định nghĩa hàm, nó có thể được gọi trên bất kỳ loại đối tượng nào. Các hàm không phải const chỉ có thể được gọi bởi các đối tượng không phải const.
Vd:
```
#include<iostream>
using namespace std;

class Test {
int value;
public:
    	Test(int v = 0) {value = v;}

    	int get1() const {return value;}  
int get2(){ return value;}
};

int main() {
Test t1(20);
cout << t1.get1() << endl;
 	cout << t1.get2() << endl;

    	const Test t2(20);
    	cout << t2.get1() << endl;
	cout << t2.get2() << endl; // compile error!

    	return 0;
}
```
Giải thích: class được khai báo const, giá trị của đối tượng của class sẽ không bị thay đổi. Vì thế không thể gọi đến một hàm không phải hàm hàm hằng, vì trong trường hợp này có thể sẽ làm thay đổi giá trị của các đối tượng trong class.

- Chú ý: Khi khai báo class const thì các biến trong class vẫn được gọi như đối các class không được khai báo const.

- Sử dụng từ khóa const để các biến thành viên của class được sử dụng trong hàm không bị thay đổi.
```
#include<iostream>

using namespace std;

class test{
	Private:
		int a = 5;
	Public:
		void countUp() const {
			a++; //->error!
		}
};
```
## Tổng quát về const
###                  const type (*/&) const name value;