# I. Toán tử và Toán hạng

Toán tử là các biểu tượng, các kí hiệu mà chỉ cho chương trình dịch biết rằng nó cần thực hiện thao tác toán học hay logic nào. C++ cung cấp rất nhiều toán tử có sẵn, cụ thể được chia làm $6$ loại:

- ***Toán tử số học***.
- ***Toán tử quan hệ***.
- ***Toán tử logic***. 
- ***Toán tử gán***.
- ***Toán tử so sánh bit***.
- ***Toán tử hỗn hợp***.

## 1. Toán tử số học và Toán hạng

Toán tử số học là các toán tử thực hiện các tính toán số học, còn toán hạng đơn giản chỉ là đối tượng thực hiện tính toán số học. Kết quả của phép toán sẽ được tự động gán theo kiểu dữ liệu của các toán hạng. Giả sử ta có hai số kiểu thực $\text{a} = 5.0, \text{b} = 10.0$ (gọi là các toán hạng), các toán tử số học sẽ tính toán chúng theo bảng dưới đây:

	
<img width="650" src="https://i.imgur.com/5aLvNrZ.png"><br>


Lưu ý, đối với toán tử tăng `++` và toán tử giảm`--`, có sự khác biệt khi ta đặt chúng đằng trước hay đằng sau toán hạng: 
- Đặt đằng trước (dạng prefix): Việc tăng/giảm toán hạng sẽ được thực hiện trước câu lệnh.
- Đặt đằng sau (dạng postfix): Việt tăng/giảm toán hạng sẽ được thực hiện sau câu lệnh.

Ví dụ dưới đây sẽ phân tích điểm khác nhau giữa dạng prefix và dạng postfix:

```cpp
int main()
{
    int a = 20;
        
    cout << ++a << endl; // a tăng lên 21 trước rồi mới in ra.
        
    cout << a++;  // in ra a trước, sau đó tăng a lên 22.
    cout << a; // a lúc này mới mang giá trị 22.

    return 0;
}
```

Chạy chương trình trên sẽ cho ra kết quả:

```
21
21
22
```

## 2. Các loại toán tử khác

Ngoài toán tử số học, trong C++ còn có nhiều loại toán tử khác. Tuy nhiên, do phạm vi kiến thức của bài học này nên mình sẽ chỉ giới thiệu sơ qua các loại toán tử cùng với một số ví dụ rất đơn giản. Cách sử dụng chi tiết của các loại toán tử này sẽ được đề cập đến trong những bài học khác chuyên sâu hơn.

### 2.1. Toán tử quan hệ

Các loại toán tử quan hệ sẽ xác định quan hệ giữa các toán hạng, và trả ra kết quả là quan hệ đó đúng (`true`) hay không đúng (`false`). Bảng dưới đây thể hiện các quan hệ giữa hai toán hạng $a=5, b=10$:


	
<img  width="650" src="https://i.imgur.com/0LTYN93.png">


### 2.2. Toán tử logic

Các toán tử logic sẽ xác định quan hệ về mặt đúng/sai giữa các toán hạng logic. Giả sử ta có hai toán hạng logic $A=\text{true}$ và $B=\text{false}$, bảng dưới đây thể hiện quan hệ logic giữa chúng:


	
<img width="650" src="https://i.imgur.com/mW3kz47.png">


### 2.3. Toán tử so sánh bit

Dữ liệu trong máy tính đều được mã hóa sang dạng các bit nhị phân $0 - 1$. Các toán tử so sánh bit sẽ làm việc trên các bit nhị phân. Bảng dưới đây thể hiện ý nghĩa của các toán tử so sánh bit với các cặp bit $0-1$:


	
<img width = "650" src="https://i.imgur.com/DsgYMBP.png"><br>


Giả sử ta có hai toán hạng $a$ và $b$, toán tử so sánh bit sẽ đổi $a$ và $b$ sang hệ nhị phân và tiến hành so sánh từng bit với nhau, sau đó gộp kết quả lại và trả ra kết quả ứng với kiểu dữ liệu của $a$ và $b$. Lấy ví dụ với $a = 60, b=13$, ta có:
- $a = 0011 0100_2$
- $b = 0000 1101_2$

Bảng dưới đây thể hiện kết quả so sánh bit giữa $a$ và $b$:
 

<img style="margin-left:7.5%" width="650" src="https://i.imgur.com/qLotghF.png">


### 2.4. Toán tử gán

Toán tử gán cho phép gán một biến bằng một biểu thức nào đó. Các toán tử gán được thể hiện trong bảng dưới đây:


<img width="650" src="https://i.imgur.com/OhQlQ1e.png">


### 2.5. Toán tử hỗn hợp

Ngoài $5$ loại toán tử kể trên, còn có một số toán tử hỗn hợp được hỗ trợ trong C++. Dưới đây là bảng liệt kê các toán tử hỗn hợp quan trọng, chi tiết về cách hoạt động của chúng sẽ được đề cập trong các bài học cụ thể:


	
<img width="450" src="https://i.imgur.com/D0uqQjy.png">


# II. Thứ tự ưu tiên toán tử và trật tự kết hợp

Thứ tự ưu tiên toán tử xác định cách mà biểu thức được tính toán. Những toán tử có độ ưu tiên cao hơn sẽ phải được thực hiện trước trong quá trình chạy chương trình. Bảng dưới đây liệt kê thứ tự ưu tiên của các toán tử trong cùng nhóm, và giữa các nhóm với nhau. Nhóm toán tử với quyền ưu tiên cao hơn sẽ xuất hiện ở phía trên của bảng:

	
<img width="650" src="https://i.imgur.com/eTSccce.png">


# III. Tài liệu tham khảo

- https://quantrimang.com/toan-tu-trong-cplusplus-156183
- https://vi.wikipedia.org/wiki/To%C3%A1n_t%E1%BB%AD
- https://vi.wikipedia.org/wiki/To%C3%A1n_h%E1%BA%A1ng