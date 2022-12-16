# IV. Phép nhân Ấn Độ

## 1. Đặt vấn đề

Xét một bài toán đơn giản như sau: Cho hai số $a, b\text{ }(a, b \le 10^{18})$. Tính giá trị biểu thức $(a\times b) \text{ }\%\text{ } 10^9$.

Bài toán trên có thể dễ dàng giải quyết bằng tính chất phân phối của phép nhân đối với phép đồng dư thức: 
$$(a\times b) \text{ }\%\text{ } 10^9=[(a\text{ }\%\text{ }10^9)\times(b\text{ }\%\text{ }10^9)]\text{ }\%\text{ }10^9$$ 

Tuy nhiên, nếu như ta cần lấy số dư cho $10^{18}$ thì sao? Phép toán bằng tính chất phân phối bây giờ sẽ không thể thực hiện được, vì $[(a\text{ }\%\text{ }10^{18})\times(b\text{ }\%\text{ }10^{18})]\le10^{36},$ dẫn đến kết quả của bước này sẽ bị vượt quá khả năng biểu diễn của kiểu số nguyên $64$ bit.

Phép nhân Ấn Độ sử dụng để tính $(a\times b)\text{ }\%\text{ }M$ trong trường hợp tính chất phân phối với phép đồng dư thức không thể áp dụng được vì lí do tràn số. 

## 2. Phép nhân Ấn Độ với đồng dư thức

Nguyên lí phép nhân Ấn Độ rất đơn giản như sau:
![image.png](https://images.viblo.asia/ed58758c-cef4-4c9e-9bb6-dcb128a1283e.png)

Dựa trên lý thuyết này, ta sẽ kết hợp phép nhân Ấn Độ với tính chất phân phối của phép nhân với phép đồng dư thức để tính được $(a \times b) \text{ }\%M$, với $M \le 10^{18}$ mà không bị tràn số. Dưới đây là cài đặt sử dụng giải thuật chia để trị, áp dụng đệ quy:

```cpp
long long multiply_modulo(long long A, long long B, long long M)
{
    if (B == 0)
        return 0;

    long long T = multiply_modulo(A, B / 2, M) % M;

    if (B & 1)
        return ((T + T) % M + A % M) % M;
    else
        return (T + T) % M;
}

int main()
{
    int A, B, M;
    cin >> A >> B >> M;

    cout << multiply_modulo(A, B, M);
}
```   

Đánh giá độ phức tạp: Ở mỗi lần gọi đệ quy, $B$ giảm đi một nửa, nên độ phức tạp của giải thuật là $O(\log_2(B))$.

# V. Lũy thừa Modulo

## 1. Giải thuật chia để trị

Dựa trên tư tưởng phép nhân Ấn Độ, ta có thể điều chỉnh công thức một chút để tính được lũy thừa $a^b \ \%M,$ với $a, b, M \le 10^9$. Công thức đơn giản như sau:
![image.png](https://images.viblo.asia/1555cec3-1b4d-4d13-a9aa-473d3a63873f.png)

***Cài đặt:***

```cpp
int power_modulo(int A, int B, int M) // Tính A^B % M, 
{
    if (B == 0)
        return 1LL;

    int half = power_modulo(A, B / 2, M) % M;

    if (B & 1)
        return (half * half * A) % M;
    else
        return (half * half) % M;
}
```

Đánh giá độ phức tạp: Ở mỗi lần gọi đệ quy, $B$ giảm đi một nửa, nên độ phức tạp của giải thuật là $O(\log_2(B))$.

## 2. Tính $A^B\text{ }\%\text{ }M$ với $M \le 10^{18}$

Trong trường hợp $M \le 10^{18}$, dựa trên những gì đã phân tích ở phần I, phép nhân thông thường sẽ không thể áp dụng vì lí do xảy ra tràn số. Vì vậy, ta sẽ kết hợp thêm phép nhân Ấn Độ trong trường hợp này. Độ phức tạp sẽ trở thành $O(\log_2(B)^2)$

***Cài đặt:***

```cpp
long long power_modulo(long long A, long long B, long long M)  
{
    if (B == 0)
        return 1LL;

    int half = power_modulo(A, B / 2LL, M) % M;
    half = multiply_modulo(half, half, M);

    if (B & 1)
        return multiply_modulo(half, A, M);
    else
        return half;
}
```

## 3. Tính $A^B \ \% \ M$ trong trường hợp $B$ là số lớn và $M$ là số nguyên tố:

Đối với các trường hợp $B$ là số lớn - hiểu là các số nằm ngoài khả năng lưu trữ của kiểu số trong C++ và phải lưu bằng kiểu chuỗi - khi đó giải thuật tính $A^B \ \% \ M$ sẽ trở nên hơi phức tạp nếu như chúng ta cài đặt bằng các phép toán số lớn. Tuy nhiên, trong trường hợp $M$ là một số nguyên tố, dựa vào một số tính chất số học, ta có thể thu gọn được việc tính toán như sau:
- Thứ nhất, ta biết định lý nhỏ Fermat được phát biểu như sau: Nếu $M$ là một số nguyên tố thì:
![image.png](https://images.viblo.asia/e7147db3-51cf-403b-bf02-2dd883fd23e4.png)
    
- Lại có: $A^B \ \% \ M = (A^{M-1}.A^{M-1}...A^{M-1}.A^X) \ \% \ M,$ với $A^{M-1}$ lặp lại $\left \lfloor{\frac{B}{M-1}} \right \rfloor$ lần và $X = B \ \% \ (M-1)$. Từ đây suy ra:
![image.png](https://images.viblo.asia/6f881a18-d2ef-4dc6-aea7-e5df5a2570f8.png)

Tới đây chúng ta có thể áp dụng lũy thừa modulo một cách bình thường mà không sợ bị tràn số. Tất nhiên vẫn sẽ cần lưu ý về giới hạn của $M$ để lựa chọn phép nhân thông thường hay phép nhân Ấn Độ. Việc cài đặt xin dành lại cho bạn đọc.

# Tài liệu tham khảo:

- [https://cowboycoder.tech/article/phep-nhan-an-do-va-phep-tinh-luy-thua](https://)
- [https://vnoi.info/wiki/translate/he/Number-Theory-3.md](https://)