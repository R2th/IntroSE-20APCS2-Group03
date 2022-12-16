## String C++
### 1. Định nghĩa
- String là một lớp xác định các đối tượng được biểu diễn dưới dạng chuỗi các kí tự.
### 2. Các thao tác thực hiện với string
#### Thao tác với kí tự:
sử dụng string[index] để thao tác với các kí tự của string.
vd: 	string str = "aaa";
	str[2] = 'b';
	cout << str << endl; //aab
- Hàm empty() kiểm tra xem string có rỗng hay không. Trả về "true" nếu string rỗng, flase nếu string không rỗng.

- Hàm push_back(): thêm một kí tự và cuối string và pop_back(): xóa đi kí tự cuối cùng.
```
	string str = "aaa";
	str.push_back('c');
	cout << str << "	" << str.length() << endl; //aaac    4
	str.pop_back();
	cout << str << "	" << str.length() << endl; //aaa    3
```

- Chú ý: Vẫn có thể thao tác với các các index của string nằm ngoài length của string.	
```
    string str = "aaa";
	str[4] = 'b';
	cout << str[4] << endl; //'b'
```
Khuyến cáo: các thao tác với kí tự nằm ngoài string, sẽ không có ảnh hưởng tới string hay các thuộc tính của string, nhưng sẽ gây khó hiểu đối với người sử dụng, app và thậm trí gây crash app. Vì vậy cần phải tránh các thao với các kí tự nằm ngoài length của string.
Trong trường hợp này: để chắc chắn rằng không thao tác với kí tự nằm ngoài string, sử dụng hàm at().
string str = "aaa";
//str.at(4) = 'x'; //core dumped
str.at(2) = 'x';
cout << str << endl; //"aax"
#### - Tìm kiếm trong string
   find(string/char str, int pos); //tìm kiếm str từ vị trí pos đến hết string
	find(string/char str); //tìm kiếm str trong string từ vị trí đầu tiên
	rfind(string/char); //tìm kiếm str trong string từ vị trí cuối đến đầu tiên
	rfind(string/char, in pos);//tìm str từ vị trí pos đến đầu string
	
Chú ý: hàm find() và rfind() là 2 hàm tìm kiếm ngược nhau. Find() tìm kiếm theo chiều từ đầu chuỗi đến hết chuỗi -> trả về vị trí đầu tiên xuất hiện trong chuỗi. Rfind() tìm kiếm theo chiều từ cuối trở về đầu chuỗi -> trả về vị trí cuối cùng xuất hiện trong chuỗi.

```
string str = "01234567";
cout << str.find('1') << endl; 		//1
cout << str.find("1") << endl; 		//1
cout << str.find('1', 0) << endl; 	//1
cout << str.find("1", 0) << endl; 	//1
```

Chú ý: Nếu hàm find(), rfind() không tìm thấy vị trí thỏa mãn, sẽ trả về địa chỉ cuối cùng của bộ nhớ (2^64: FFFF FFFF FFFF FFFF). Nếu một ô nhớ nào đó có giá trị thỏa mãn nhưng không nằm trong length string, thì hàm cũng sẽ không trả về vị trí của giá trị đó.
	string str = "01234567";
	str[10] = 'a';
	cout << str.find('a') << endl; // 18446744073709551615
	
Vậy nên trong trường hợp xét điều kiện tìm kiếm trong string. Cần thêm điều kiện tìm kiếm trong chuỗi.
```
string str = "01234567";
if (str.find('a')) // Điều kiện này luôn đúng
if (str.find('a') != string::npos)
```
String::npos : (10):18446744073709551615 = (16):FFFF FFFF FFFF FFFF
#### - Xóa string
- Xóa toàn bộ string: clear()
```
	string str = "aaa";
	str.clear();
	cout << str << endl; //""
```
	
- Xóa kí tự: erase(int pos, int len); //xóa từ vị trí pos đi len kí tự
```
	string str = "01234";
	str.erase(1,2);
	cout << str << endl; //034
```
#### - Thay thế chuỗi
- replace(int pos, int len, string s) -> làm thay đổi chuỗi ban đầu.
```
	string str = "0125436";
	string s = "345";
	str.replace(3,3,s);
	cout << str << endl;//0123456
```
#### - Nối string
- insert(): chèn một string, ký tự vào string ban đầu:
	insert(int pos, string s) -> chèn chuỗi s vào vị trí pos
```
	string str = "012345";
	string s = "67";
	str.insert(5,s);
	cout << str << endl;//0123456
```
Lưu ý: nếu truyền pos lớn hơn str.length() trình biên dịch sẽ báo lỗi.

- append(): chèn một string hay kí tự vào cuối string ban đầu:
```
	string str = "012345";
	string s = "67";
	str.append(s);
	cout << str << endl;//0123456
```
#### - So sánh string
Hàm compare():
	str.compare(s);
	Trả về giá trị < 0 nếu chuỗi str < s
	Trả về giá trị > 0 nếu chuỗi str > s
	Trả về giá trị = 0 nếu hai chuỗi bằng nhau
	Giải thích: Hàm sẽ so sánh từng kí tự tương đương, dừng lại khi 2 kí tự khác nhau hoặc 2 chuỗi bằng nhau. Giá trị trả về của hàm bằng hiệu của 2 kí tự đầu tiên khác nhau: str[i] - s[i] (str[i], s[i]: hệ 10 của kí tự str[i] và s[i] trong bảng mã ASCII).
```
string str = "aaa";
string s = "aaa";
cout << str.compare(s) << endl; //0
```
#### - Giảm dung lượng của chuỗi
shrink_to_fit(): Hàm này làm giảm dung lượng của chuỗi, làm cho nó bằng với kích thước capacity của nó. -> tiết kiệm bộ nhớ.
#### - Hàm trả về kích thước được phân bổ cho chuỗi:
   capacity(): Trả về kích thước của không gian lưu trữ hiện được phân bổ cho chuỗi, đơn vị: byte.
	Lưu ý: Hàm capacity() trả về kích thước không gian lưu trữ nên không nhất nhiết kết quả về = với size của string.
```
	string str = "0123456";
	cout << str.capacity() << endl;
```
#### - Thay đổi kích thước chuỗi thành độ dài n ký tự
```
string str = "01234567";
str.resize(4);
cout << str << endl; //0123
```
### 3. Sử dụng string, sử dụng với hàm
- Tham trị: tương tự như với các biến thông thường, mọi thay đổi trong hàm đối với string sẽ không được lưu lại.
	- Tham chiếu: mọi thay đổi sẽ được thực hiện trực tiếp trên string truyền vào.
	String với const:
	- Nếu muốn truyền một const string vào hàm, cần khai báo const đối với tham số truyền vào hàm.
```
	void func(string &s);
	void func2(const string &s);
	int main(){
		const tring str = "111";
		func(str);//error
		func2(str);
}
```
### 4. Iterator string
- Iterator trong string: được sử dụng để trỏ đến từng phần tử trong string.
```
string str = "012345";
string::iterator it = str.begin();
cout << *it << endl; //0

string str = "0123456789";
string::iterator it = str.begin();
while(it != str.end()){
    cout << *it << endl;
    it++;
}
```