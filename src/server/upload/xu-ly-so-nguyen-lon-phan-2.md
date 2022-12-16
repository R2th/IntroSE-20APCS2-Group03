# IV. Các phép toán với số nguyên lớn (nhân - chia)

Phần trước mình đã giới thiệu tới các bạn các phép toán nhập xuất, so sánh và cộng trừ trên số nguyên lớn. Phần này mình sẽ hướng dẫn các bạn những nội dung khó hơn, đó là các phép toán liên 
quan tới nhân và chia trên số nguyên lớn!

## 1. Phép nhân một số lớn với một số nhỏ

Số nhỏ ở đây ta hiểu là số có thể biểu diễn được bằng các kiểu dữ liệu nguyên thủy. Phương pháp sử dụng chuỗi như sau:
- Bước $1$: Duyệt từ cuối chuỗi số lớn về đầu, lấy tích từng kí tự số của số lớn với số nhỏ, cộng thêm biến nhớ.
- Bước $2$: Điền chữ số cuối của kết quả bước $1$ vào bên trái của kết quả cuối.
- Bước $3$: Gán biến nhớ bằng phần nguyên của kết quả ở bước $1$ chia cho $10$.

***Cài đặt 1:*** Nhân một số lớn với một số nhỏ bằng chuỗi kí tự:

```cpp
bignum_str product(bignum_str a, long long b)
{
    int carry = 0;
    bignum_str res;
    for (int i = a.size() - 1; i >= 0; --i)
    {
        // Lấy tích chữ số và số nhỏ, cộng thêm biến nhớ từ hàng bên phải.
        long long s = (a[i] - '0') * b + carry; 
        carry = s / 10; // Giá trị nhớ đẩy sang hàng bên trái.
        res = (char)(s % 10 + '0') + res; 
    }
    
    // Nếu vẫn còn nhớ thì viết nốt nó sang bên trái kết quả.
    if (carry > 0)
        while (carry != 0)
        {
            res = (char)(carry % 10 + '0') + res;
            carry /= 10;
        }

    return res;
}
```

Với phương pháp bằng mảng, chỉ cần nhân từng chữ số của số lớn với số nhỏ, gán trực tiếp vào vị trí đó, cuối cùng dùng hàm `fix()` để xử lý lại số là được.

```cpp
bignum_vec operator * (bignum_vec a, long long b)
{
    for (int i = 0; i < a.size(); ++i)
        a[i] *= b;

    fix(a);

    return a;
}
```

## 2. Phép nhân hai số lớn

Đối với phép nhân hai số lớn, phương pháp sử dụng chuỗi sẽ không phù hợp vì thời gian chạy rất lâu và xử lý khó khăn. Do đó mình sẽ chỉ giới thiệu phương pháp sử dụng mảng. Thuật toán như sau: 
- Bước $1$: Duyệt qua tất cả các chữ số của hai số lớn, theo chiều từ phải qua trái (từ đầu vector tới cuối vector), thực hiện nhân hai chữ số ở cặp vị trí tương ứng.
- Bước $2$: Lưu kết quả $a_i * b_j$ vào vị trí $(i + j)$ của mảng kết quả cuối. Sau đó tính giá trị nhớ sang vị trí $(i + j + 1)$ của mảng kết quả.
- Bước $3$: Xử lý nhớ lần cuối bằng hàm `fix()`.

***Cài đặt:*** Nhân hai số lớn bằng mảng lưu chữ số:

```cpp
bignum_vec operator * (bignum_vec a, bignum_vec b)
{
    // Resize trước mảng kết quả. Kết quả của thương có thể đạt tới số chữ số bằng tổng độ 
    // dài của hai số ban đầu cộng lại và cộng thêm 1.
    bignum_vec product(a.size() + b.size() + 1, 0);

    for (int i = 0; i < a.size(); ++i)
        for (int j = 0; j < b.size(); ++j)
        {
            product[i + j] += (a[i] * b[j]);
            product[i + j + 1] += (product[i + j] / 10);
            product[i + j] %= 10;
        }

    fix(product);

    return product;
}
```

## 3. Phép chia lấy dư (mod) của một số lớn cho một số nhỏ

Trước tiên, các bạn cần lưu ý hai tính chất sau của phép chia lấy dư:
- $(a + b) \ \text{mod} \ c = (a \ \text{mod} \ c + b \ \text{mod} \ c) \ \text{mod} \ c$.
- $(a \times b) \ \text{mod} \ c = [(a \ \text{mod} \ c) \times (b \ \text{mod} \ c)] \ \text{mod} \ c$.

Dựa vào tính chất trên, chúng ta thiết kế được phép chia lấy dư của một số lớn cho một số nhỏ bằng chuỗi kí tự như sau:
- Bước $1$: Duyệt qua từng kí tự chữ số trong chuỗi số lớn theo chiều từ trái qua phải, đổi nó sang chữ số thông thường.
- Bước $2$: Lấy biến kết quả cuối hân với $10,$ cộng thêm chữ số vừa thu được ở bước $1$ và $\text{mod}$ tất cả cho $10$. 

***Cài đặt 1:*** Phép chia lấy dư của một số lớn cho một số nhỏ bằng chuỗi kí tự:

```cpp
long long big_mod(bignum_str a, long long b)
{
    long long res = 0;
    for (int i = 0; i < a.size(); ++i)
        res = (res * 10 + (a[i] - '0')) % b;
        
    return res;
}
```

***Cài đặt 2:*** Phương pháp sử dụng mảng ta làm hoàn toàn tương tự:

```cpp
int big_mod(bignum_vec a, long long b)
{
    long long res = 0;
    for (int a.size() - 1; i >= 0; --i)
        res = (res * 10 + a[i]) % b;
        
    return res;
}
```

## 4. Phép chia lấy thương nguyên của một số lớn cho một số nhỏ

Sử dụng chuỗi kí tự, chúng ta xây dựng được thuật toán lấy thương nguyên của một số lớn cho một số nhỏ như sau:
- Bước $1$: Duyệt qua từng chữ số của số lớn. Xây dựng dần số bị chia bằng cách nhân biến trung gian với $10$ rồi cộng thêm chữ số hiện tại.
- Bước $2$: Lấy biến trung gian chia cho số nhỏ, viết chữ số cuối của thương thu được vào bên phải kết quả cuối. Sau đó gán biến trung gian bằng số dư khi chia nó cho số nhỏ (là số chia).

***Cài đặt 1:*** Phép chia lấy thương nguyên của một số lớn cho một số nhỏ sử dụng chuỗi kí tự:

```cpp
bignum_str qoutient(bignum_str A, long long B)
{
    long long hold = 0, s = 0;
    bignum_str res;

    for (int i = 0; i < A.size(); ++i)
    {
        hold = hold * 10 + (A[i] - '0');
        s = hold / B;
        hold %= B;
        res = res + (char)(s + 48); // Thêm kết quả chia vào bên phải kết quả cuối.
    }
    
    // Xóa các chữ 0 vô nghĩa ở bên trái kết quả cuối.
    while (res.size() > 1 && res.front() == '0')
        res.erase(res.begin());

    return res;
}
```

***Cài đặt 2:*** Phương pháp sử dụng mảng chữ số ta làm hoàn toàn tương tự, lưu luôn kết quả vào mảng số lớn rồi dùng hàm `fix()` để xử lý các giá trị nhớ ở các hàng:

```cpp
bignum_vec operator / (bignum_vec a, long long b)
{
    long long r = 0;
    for (int i = a.size() - 1; i >= 0; --i)
    {
        r = r * 10 + a[i];
        a[i] = r / b;
        r %= b;
    }
    
    fix(a);
    
    return a;
}
```

Ngoài các phép toán trên, vẫn còn hai phép toán chia lấy thương nguyên của hai số lớn và chia lấy số dư của hai số lớn, tuy nhiên cực kỳ hiếm gặp trong lập trình, nên mình sẽ không đề cập tới ở đây. Các bạn có thể suy nghĩ thêm cách cài đặt dựa trên những gì mình đã viết ở trên nhé!

# V. So sánh tính hiệu quả của hai phương pháp biểu diễn số lớn

Trong các bài toán lập trình, phần lớn học sinh - sinh viên vẫn hay lựa chọn phương pháp biểu diễn số lớn bằng chuỗi kí tự, vì dù sao nó vẫn có cảm giác dễ hiểu hơn. Ngay cả trong sách giáo khoa chuyên Tin cũng sử dụng phương pháp này. Tuy nhiên, nó có một số nhược điểm như sau:
- Thứ nhất, trong một số phép tính toán với số nguyên lớn bằng chuỗi kí tự yêu cầu cân bằng độ dài hai chuỗi trước khi tính. Chúng ta làm thao tác này bằng cách thêm kí tự **'0'** vào bên trái chuỗi với câu lệnh: `number = '0' + number`. Tuy nhiên, toán tử `+` trong chuỗi kí tự sẽ tốn độ phức tạp $O(N)$ với $N$ là độ dài của chuỗi mới tạo thành. Nếu như đề bài là multi-testcases, chắc chắn các bạn sẽ bị chạy quá thời gian (TLE).
- Biểu diễn bằng chuỗi không phù hợp để thực hiện các phép toán nhân, chia với hai số lớn. Mặc dù mình không viết ra là thực hiện như thế nào, nhưng nó rất dài dòng và thời gian thực hiện cực kỳ tốn kém.
- Khi cộng hai chữ số của chuỗi, lại cần thêm thao tác chuyển đổi từ kí tự số sang số bình thường để tính toán, điều này cũng làm chương trình tốn thêm thời gian chạy.

Ngược lại, phương pháp biểu diễn bằng mảng lưu các chữ số rất tiết kiệm thời gian, lại không cần phải cân bằng độ dài của hai số lớn trong phép cộng hoặc trừ. Một ưu điểm nữa của phương pháp biểu diễn này là chúng ta có thể nạp chồng luôn các toán tử đối với kiểu `vector < int >`, khi sử dụng thì không cần gọi hàm mà cứ dùng trực tiếp toán tử là được. Vì vậy, mình khuyên rằng các bạn nên sử dụng phương pháp biểu diễn bằng mảng lưu các chữ số khi thao tác trên số nguyên lớn.

# VI. Một số bài toán minh họa sử dụng kĩ thuật biểu diễn số nguyên lớn

## 1. Số Fibonaci thứ N

Dãy số Fibonaci được định nghĩa theo công thức:
$$\begin{cases}f_0 = 0, f_1 = 1.\\ f_i = f_{i - 1} + f_{i - 2}, &\forall i: i \ge 2\end{cases}$$

Bài toán đặt ra là tìm số fibonaci thứ $N,$ với $0 \le N \le 10^6$. Chắc chắn số fibonaci thứ $N$ có thể sẽ vượt khỏi kiểu dữ liệu `long long`, lúc này chúng ta cần sử dụng tới kiểu số lớn.

***Cài đặt:*** Dưới đây mình thử cài đặt bằng phương pháp sử dụng chuỗi kí tự:

```cpp
bignum_str fibonaci(int N)
{
    if (N == 0)
        return "0";
    
    if (N == 1)
        return "1";
        
    bignum_str f0 = "0", f1 = "1", fN;
    for (int i = 2; i <= N; ++i)
    {
        fN = add(f0, f1);
        f0 = f1;
        f1 = fN;
    }
    
    return fN;
}
```

Giải thuật có độ phức tạp $O(N.M),$ với $M$ là độ dài của số fibonaci dài nhất.

## 2. Tính $N!$

Bài toán tính $N!$ với $N \le 10^6$ có thể giải quyết dễ bằng phép nhân số lớn cho số nhỏ. Thuật toán như sau: Ban đầu đặt một biến $\text{factorial}$ là kết quả cuối, khởi tạo giá trị $1$ cho nó. Tiếp theo duyệt lần lượt các số $i$ từ $2$ tới $N$ rồi nhân $\text{factorial}$ với $i$.

***Cài đặt:*** Dưới đây mình thử sử dụng phép nhân số lớn với số nhỏ bằng phương pháp mảng lưu chữ số, toán tử `*` đã được nạp chồng ở phía trên. Ban đầu kết quả $\text{factorial}$ có giá trị là $1,$ nhưng vì nó là số lớn nên chúng ta cần viết thêm một hàm để chuyển nó qua số lớn kiểu `vector` trước:

```cpp
// Chuyển số N sang dạng bignum_vec bằng cách trả về vector có một phần tử là chính N.
bignum_vec to_bignum_vec(int N)
{
    return bignum_vec(1, N);
}

bignum_vec factorial_N(int N)
{
    bignum_vec factorial = to_bignum_vec(1);
    for (int i = 2; i <= N; ++i)
        factorial = factorial * i;
}
```

Như vậy mình đã hướng dẫn các bạn chi tiết về các thao tác trên các số nguyên lớn trong C++. Nếu còn thắc mắc, các bạn có thể đọc thêm tài liệu ở các đường link mà mình đính kèm dưới mục **Tài liệu tham khảo** nhé! Nhìn chung, các bài toán liên quan tới số nguyên lớn thường là các bài toán không khó, số lớn được lồng ghép vào chỉ để làm tăng tính đánh đố của bài, nên các bạn chỉ cần ghi nhớ một trong hai phương pháp cài đặt là được rồi. Lời khuyên của mình là các bạn hãy viết sẵn một template liên quan tới các phép toán trên số lớn, lưu riêng ra rồi tới khi cần chỉ lấy ra sử dụng thôi. Còn đối với những bạn có mục tiêu tham gia các kỳ thi Học sinh giỏi Tin học thì không có cách nào ngoài ghi nhớ code cả! 

# VII. Tài liệu tham khảo

- https://sites.google.com/site/kc97ble/container/bignum-voi-cac-phep-toan
- https://nguyenvanhieu.vn/cong-tru-nhan-chia-2-so-nguyen-lon/#43-mot-so-phep-toan-voi-so-nguyen-lon-khac
- https://123docz.net/document/6634871-chuyen-de-xu-li-so-nguyen-lon-trong-c.htm
- <a href="https://downloadsachmienphi.com/tai-lieu-giao-khoa-chuyen-tin-quyen-1/">Tài liệu giáo khoa chuyên Tin quyển $1$ - thầy Hồ Sĩ Đàm</a>.