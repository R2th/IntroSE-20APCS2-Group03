Sắp xếp nổi bọt là một giải thuật sắp xếp đơn giản. Giải thuật sắp xếp này được tiến hành dựa trên việc so sánh cặp phần tử liền kề nhau và tráo đổi thứ tự nếu chúng không theo thứ tự.

Giải thuật này không thích hợp sử dụng với các tập dữ liệu lớn khi mà độ phức tạp trường hợp xấu nhất và trường hợp trung bình là Ο(n2) với n là số phần tử.

Giải thuật sắp xếp nổi bọt là giải thuật chậm nhất trong số các giải thuật sắp xếp cơ bản. Giải thuật này còn chậm hơn giải thuật đổi chỗ trực tiếp mặc dù số lần so sánh bằng nhau, nhưng do đổi chỗ hai phần tử kề nhau nên số lần đổi chỗ nhiều hơn.

**Ý tưởng thuật toán**:  Xuất phát từ phần tử cuối danh sách ta tiến hành so sánh với phần tử bên trái của nó. Nếu phần tử  đang xét có khóa nhỏ hơn  phần tử bên trái của nó  ta tiến đưa nó về bên trái của dãy bằng cách hoán vị với phần tử bên trái của nó. Tiếp tục thực hiện như thế đối với bài toán có n phần tử thì sau  n  –1 bước ta thu được danh sách tăng dần. 

**Giải thuật**

Bước 1: i=0; //Phần tử đầu tiên

Bước 2:Lần lượt so sánh và đổi chổ (nếu cần) từ phải sang trái đối với các phần từ từ a[n] đến a[i]. với biến gán j=n-i. và lặp lại khi j>i.

Bước 3: i=i+1

Bước 4: 

Nếu i < n, quay lại Bước 2.

Ngược lại, dừng, dãy đã cho đã sắp xếp đúng vị trí.

Ví dụ

Cho dãy A gồm các phần tử: 4 5 0 11 8 6 9. Hãy dùng giải thuật sắp xếp nổi bọt để sắp xếp lại dãy đã cho.

Đầu tiên i=0 và j= 6.

Xét aj-1 và aj tức là a6 và a5 . Do 6<9 nên không đổi chỗ và j=j-1;

Xét tiếp a5 và a5 . Do 8>6 nên đổi chỗ 6 và 8 được dãy 4 5 0 11 6 8 9. Sau đó j=j-1;

Xét tiếp a4 và a3 . Do 11>6 nên đổi chỗ 11 và 6 được dãy 4 5 0 6 11 8 9. Sau đó tiếp tục giảm j=j-1;

Xét tiếp a3 và a2 . Do 0<6 nên không đổi chỗ và Sau đó  giảm j=j-1;

Xét tiếp a2 và a1 . Do 5>0 nên đổi chỗ 5 và 0 được dãy 4 0 5 6 11 8 9. Sau đó tiếp tục giảm j=j-1;

Xét tiếp a1 và a0 . Do 4>0 nên đổi chỗ 4 và 0 được dãy 0 4 5 6 11 8 9. Sau đó tiếp tục giảm j=j-1;

Do j=i=0 nên tăng biến i lên i=i+1=1;

j=6.

Xét a6 và a5 . Do 9>8 nên không đổi chỗ và giữ nguyên dãy 0 4 5 6 11 8 9. Sau đó giảm j=j-1;

Xét a5 và a4 . Do 11>8 nên đổi chỗ 11 và 8 được dãy 0 4 5 6 8 11 9. Sau đó tiếp tục giảm j=j-1;

Tương tự như trên, giảm j dần về 1. Dãy vẫn giữ nguyên như vậy. Sau đó tăng i lên ;

j=6.

Xét a6 và a5 . Do 11>9 nên đổi chỗ 11 và 9 được dãy  0 4 5 6  8 9 11. Sau đó giảm j=j-1;

Do lúc này i>n nên dừng giải thuật và nhận dãy 0 4 5 6 8 9 11.

**Code C/C++**

Hàm sắp xếp theo giải thuật 2 vòng lập
```
void Sapxep(int a[], int n)
{
    int i, j;
    for (int i = 0; i<n - 2; i++){
        for (int j = n - 1; j>i; j--){
            if (a[j] < a[j - 1]){
                swap(a[j], a[j - 1]);
            }
        }
    }
}
```

```
void swap(int &a, int &b)
{
    int c = a;
    a = b;
    b = c;
}
```