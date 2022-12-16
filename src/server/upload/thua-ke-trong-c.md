## Inheritance trong C++
### 1. Định nghĩa
- Inheritance (thừa kế) là một trong những tính năng quan trọng của C++. Inheritance cho phép một lớp sử dụng lại các thuộc tính và đặc trưng từ một lớp khác.
### 2. Inheritance trong C++
- Giả sử: cần xây dựng các đối tượng: chó, mèo, chuột. Có các thuộc tính: lông  mao, 4 chân.
obj: Chó
obj: Mèo
obj: Chuột
![](https://images.viblo.asia/e11e6dfc-d82a-4725-b96d-113e72a0a88f.png)

- Thay vì mỗi đối tượng cần định nghĩa lại tất cả các thuộc tính, có thể sử dụng một đối tượng mà có các thuộc tính chung để các đối tượng con có thể sử dụng.
![](https://images.viblo.asia/5fb140ec-8d26-4fbd-951d-e2d4e13a9471.png)
- Với cách khai báo này: Các đối tượng chó, mèo, chuột  sẽ được thừa kế thuộc tính lông mao, 4 chân từ lớp cha (lớp động vật).
Vd:
 ```
    class Animal{
    Private:
        int foot;
        string hair;
    Public:
        Animal(){
            foot = 4; hair = "Long mao";
    }
    int getFoot(){ return foot;}
    string getHair(){ return hair;}
    };
    Class dog : public Animal {
    };
    Class cat : public Animal {
    };
    Class mouse : public Animal {
    };

    int main(){
        dog d;
        cout << "Dog: " << d.getFoot() << " foots." << endl;
        return 0;
    }
```

Vd2:

```
    class classBase{
    private: int count;
    Public:
        classBase(int a){ count = a;}
        int getCount(){return count;}
    };
    class classDerived{
    private: int count;
    Public:
        classDerived(int a) : classBase(2){
            count = a;
    }
    };
```


### 3. Mức truy cập trong thừa kế
- Quyền truy cập:  Là từ khóa để định nghĩa các đối tượng được phép truy cập vào member, phương thức của class được định nghĩa. Quyền truy cập mặc định trong class là private.

#### Các mức truy cập:
- Private:  Chỉ cho phép chính class khai báo và friend function sử dụng.
- Protected:  Cho phép class khai báo, friend function, class thừa kế sử dụng.
- Public: Cho phép gọi ở bất kì vị trí nào trong chương trình thông qua class.

    **Chú ý:**  Các mức truy cập cũng được sử dụng ở trong struct, từ c++11 hỗ trợ việc này.

####  Kiểu kế thừa trong C++
- Trong kế thừa, các từ khóa định nghĩa mức truy cập cũng được sử dụng để kiểm soát các đối tượng khác truy cập đến các đối tượng, phương thức của lớp cha.
- Kiểu public: Các thuộc tính mức truy cập của lớp cha sẽ được giữ nguyên trong lớp con.
- Kiểu protected: Các thuộc tính truy cập public ở lớp con được thừa kết từ lớp cha sẽ được chuyển thành protected ở trong lớp con.
- Kiểu private: Các thuông tính truy cập public và protected ở lớp con được thừa kế từ lớp cha sẽ được chuyển thành thuộc tính private.
### 4. Đa kế thừa
- Một lớp có thể được kế thừa từ nhiều lớp khác nhau. Các tính chất giống như thừa kết một lớp.
![](https://images.viblo.asia/064bc5a3-f141-4f17-8255-fb2efe2f4622.png)

    -> Class A sẽ có các thuộc tính của cả 2 class base là B, C.

   **Chú ý**: khi class A kế thừa từ hai class B, C thì trong 2 class B, C không được có các phương thức, member trùng nhau.
   
### 5. Thừa kế phân cấp
- Một class có thể kế thừa từ nhiều class và ngược lại một class cũng sẽ được nhiều class khác kế thừa. 
- Kế thừa đa cấp là class kế thừa các thuộc tính từ một class mà nó không trực tiếp kế thừa.

![](https://images.viblo.asia/5db87b85-ece8-4992-bdcb-e4b20d2d0364.png)

- Kế thừa phân cấp: có nhiều hơn 1 lớp con kế thừa từ một lớp cha. Và các class con được kế thừa các thuộc tính của class mà class cha được kế thừa.

![](https://images.viblo.asia/557fd363-1bc9-4923-91a9-0dc8f71c5fe4.png)

### 6. Kế thừa lai
- Là loại kế thừa kế hợp nhiều loại kế thừa với nhau.

    vd: Kế thừa phân cấp vs đa kế thừa:

![](https://images.viblo.asia/58f50260-911a-4aa1-bedc-db86d8f4a133.png)