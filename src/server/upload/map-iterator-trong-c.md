### Map, Iterator  trong C++

#### I. Iterator:
##### 1. Iterator là gì???
Iterator là một con trỏ được sử dụng để đại diện cho một phần tử nào đó.
```
    map<int, string>::iterator it;
    vector<int>::iterator it; 
 ```
 
Được sử dụng đại diện cho các biến được trỏ đến để thực hiện các thao tác thêm, sửa, xóa, ..
``` 
	vector<int> vInt;
	vInt.push_back( 1 );
	vector<int>::iterator it = vInt.begin();
```
Trong trường hợp này con trỏ iterator it đã trỏ đến phần tử đầu tiên của vector vInt. Mọi thay đổi trên con trỏ it cũng sẽ được thay đổi trên phần tử đầu tiên của vector vInt.
```
    *it = 2;
    cout << vInt[0] << endl;
```
kết quả trả về: ``` 2 ```

Chuyến đến phần tử tiếp theo.
```
it++;
```
#### II. Map:
##### 1. Map là gì??
Giống như cái tên của nó map có dữ liệu kiểu cấu trúc liên kết. Mỗi phần tử của map là sự kết hợp của khóa (key value) và ánh xạ của nó (mapped value). Dữ liệu trong map không chứa các khóa giống nhau.

Trong cấu trúc map các dữ liệu đã được sắp xếp theo trình tự (anpha b) theo tên của key.

Trong map các phần tử key được sử dụng để xác định giá trị của các phần tử. Kiểu của khóa và ánh xạ có thể giống hoặc khác nhau.

Add thư viện: ``` #include <map> ```
    
Kiểu cấu trúc dữ liệu: Associative Containers (Cấu trúc liên kết)

##### 2. Khai báo
map<(Kiểu dữ liệu 1), (Kiểu dữ liệu 2)> (Tên map);
eg;
map<int,  string> mStr;
map<int, int> mInt;
 
3. Hàm thành viên

	```
        map<int,string> mStr;
    ```

	size() : Trả về kích thước hiện tại của map.
	```
        int size = mStr.size();
    ```
    empty(): Trả về true nếu map rỗng.
    ```
        bool check = mStr.empty();
    ```
    insert(): Chèn phần tử vào map.
    ```
    mStr.insert ( std::pair<int,string>(1,”Nguyen Van A”) );
    ```

    erase(): xóa phần tử khỏi map (không làm thay đổi size).
    ```
        map<int,string>::iterator it;
        map.erase(it);
        map[1] = “Nguyen Van A”;
        map.erase(1);
    ```

    clear(): xóa tất cả các phần tử của map (có làm thay đổi size).
	```
        mStr.clear();
    ```
	
	swap(): hoán đổi giá trị của hai map với nhau.
	```
        map<int,string> mStr2;
	    mStr.swap(mStr2);
    ```

	find(): Trả về itarator trỏ đến phần tử cần tìm kiếm. Nếu không tìm thấy thì trỏ về end của map.
    ```
        string str = mStr.find(1).second;
        map<int, string> mapa;
        map<int, string>::iterator it;
        it = mapa.find(1);
    ```
	upper_bound(): Trả về iterator đến vị trí phần tử bé nhất mà lớn hơn khóa, nếu không tìm thấy trả về vị trí "end" của map.
    
    Count(): Trả về số lần xuất hiện của khóa trong multiset.

```
#include <iostream>
#include <map>

using namespace std;

int main(){
  map<int, string> mapa;
  map<int, string>::iterator it;
  mapa.insert(pair<int, string> (0,"Viet Nam 0"));
  mapa.insert(pair<int, string> (1,"Viet Nam 1"));
  mapa.insert(pair<int, string> (2,"Viet Nam 2"));
  mapa.insert(pair<int, string> (3,"Viet Nam 3"));
  mapa.insert(pair<int, string> (4,"Viet Nam 4"));
  mapa.insert(pair<int, string> (5,"Viet Nam 5"));

  for(map<int,string>::iterator i = mapa.begin();i!=mapa.end();i++){
      cout << i->first << ": " << i->second << endl;
  }
  return 0;
}
```

Kết quả trả về:
```
0: Viet Nam 0
1: Viet Nam 1
2: Viet Nam 2
3: Viet Nam 3
```