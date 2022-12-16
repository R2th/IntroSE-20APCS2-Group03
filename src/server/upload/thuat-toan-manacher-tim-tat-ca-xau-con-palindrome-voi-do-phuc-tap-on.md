## Mô tả vấn đề

Cho một xâu $s$ có độ dài $n$. Tìm tất cả các cặp $(i,j)$ sao cho xâu $s[i...j]$ con là một palindrome. Xâu $t$ là một palindrome khi và chỉ khi $t = t_rev$ ($t_rev$ là xâu đảo ngược của xâu ban đầu).

Trong trường hợp xấu nhất, xâu có thể có tối đa $O(n^2)$ xâu con palindromic. Khi mới đầu quan sát, ta thấy có vẻ như không có thuật toán với độ phức tạp tuyến tính nào giải quyết vấn đề này.

Tuy nhiên thông tin về các palindromes có thể được lưu giữ một cách **ngắn gọn**: Đối với mỗi vị trí $i$, chúng ta sẽ tìm số lượng xâu palindromes lấy vị trí $i$ làm trung tâm.

Palindromes với trung tâm chung tạo thành một xâu liền kề, nghĩa là nếu chúng ta có palindrome độ dài $l$ ở giữa $i$, chúng ta cũng có palindromes có độ dài $i-2$, $i-4$, và cứ như vậy. Do đó, chúng ta sẽ thu thập thông tin về tất cả các xâu con palindromic theo cách này.

Palindromes có độ dài chẵn và lẻ được tính riêng biệt là $d_1[i]$ và $d_2[i]$. Đối với các palindromes có độ dài chẵn, chúng ta giả sử rằng chúng được căn giữa ở vị trí $i$ nếu hai ký tự trung tâm của chúng là $s [i]$ và $s [i-1]$.

Ví dụ, chuỗi $s = abababc$ có ba palindromes có độ dài lẻ với các tâm ở vị trí $s [3] = b$, hay $d_1 [3] = 3$:

![Imgur](https://imgur.com/kAbEVdY.png)

Chuỗi $s = cbaabd$ có hai palindromes có độ dài chẵn với tâm ở vị trí $s [3] = a$, hay $d_2 [3] = 2$:

![Imgur](https://imgur.com/9BWZM4S.png)

## Giải pháp

Nói chung, vấn đề này có nhiều giải pháp: với String Hashing, vấn đề có thể được giải quyết trong $O (n⋅log⁡n)$, và với Suffix Trees và fast LCA, vấn đề này có thể được giải quyết trong $O (n)$.

Nhưng phương pháp được mô tả ở đây đơn giản hơn và có ít hằng số ẩn về thời gian và độ phức tạp của bộ nhớ. Thuật toán này được phát hiện bởi Glenn K. Manacher vào năm 1975.

Một cách hiện đại khác để giải quyết vấn đề này và các vấn đề palindromes nói chung là sử dụng cây palindromic, hay eertree.

## Thuật toán ngây thơ

Trong thuật toán "ngây thơ", đối với mỗi vị trí trung tâm $i$, thuật toán cố gắng tăng câu trả lời lên $1$ nếu có thể, mỗi lần so sánh một cặp ký tự tương ứng.

Thuật toán như vậy rất chậm, nó có thể tính toán câu trả lời với độ phức tạp $O(n^2)$.

Việc triển khai thuật toán như sau:

```cpp
vector<int> manacher_odd(string s) {
    int n = s.size();
    s = "$" + s + "^";
    vector<int> p(n + 2);
    for(int i = 1; i <= n; i++) {
        while(s[i - p[i]] == s[i + p[i]]) {
            p[i]++;
        }
    }
    return vector<int>(begin(p) + 1, end(p) - 1);
}
```

Hai ký tự đầu cuối `$` và `^` được sử dụng để tránh xử lý các phần đầu và cuối của chuỗi một cách riêng biệt.

## Thuật toán Manacher

chúng ta mô tả thuật toán để tìm tất cả các palindromes con có độ dài lẻ, hay để tính $d_1 []$.

Để tính toán nhanh, chúng ta sẽ duy trì các **đường viền** $(l, r)$ của palindrome con ở ngoài cùng bên phải (đó là Palindrome $s [l + 1] s [l + 2]… s [r − 1]$). Ban đầu ta đặt $l = 0$, $r = 1$, tương ứng với chuỗi rỗng.

Do vậy, chúng ta muốn tính $d_1[i]$ cho $i$ tiếp theo và tất cả các giá trị trước đó trong $d_1 []$ đã được tính toán. Chúng ta làm như sau:

- Nếu $i$ nằm ngoài palindrome hiện tại, hay $i≥r$, chúng ta sẽ chỉ khởi chạy thuật toán tầm thường. Vì vậy, chúng ta sẽ tăng $d_1[i]$ liên tục và kiểm tra mỗi lần xem chuỗi con ngoài cùng bên phải hiện tại $[i-d_1[i]… i + d_1[i]]$ có phải là palindrome hay không. Khi chúng ta tìm thấy điểm không khớp đầu tiên hoặc gặp các ranh giới của $s$, chúng ta sẽ dừng lại. Trong trường hợp này, cuối cùng chúng ta đã tính được $d_1[i]$. Sau đó, chúng ta cập nhật $(l, r)$. $r$ phải được cập nhật theo cách mà nó đại diện cho chỉ mục cuối cùng của palindrome con ngoài cùng bên phải hiện tại.

- Bây giờ hãy xem xét trường hợp khi $i≤r$. Chúng ta sẽ cố gắng trích xuất một số thông tin từ các giá trị đã được tính toán trong $d_1 []$. Do đó, hãy tìm vị trí "nhân bản" của $i$ trong palindrome con $(l, r)$, tức là chúng ta sẽ nhận được vị trí $j = l + (r − i)$, và kiểm tra giá trị của $d_1 [j]$. Vì $j$ là vị trí đối xứng với $i$ nên hầu như chúng ta luôn có thể gán $d_1[i] = d_1 [j]$. Ảnh dưới minh họa về điều này (palindrome xung quanh $j$ thực sự được "sao chép" vào palindrome xung quanh $i$):

![Imgur](https://imgur.com/Qh8jZih.png)

Nhưng có một trường hợp phức tạp cần được xử lý chính xác: Khi palindrome "bên trong" đạt đến biên giới của "bên ngoài", hay $j − d1 [j] ≤l$ (hoặc, tương tự, $i + d1 [j] ≥r$). Vì tính đối xứng bên ngoài của palindrome "bên ngoài" không được đảm bảo, chỉ cần gán $d_1 [i] = d_1 [j]$ sẽ không chính xác: Chúng ta không có đủ dữ liệu để nói rằng palindrome ở vị trí $i$ có cùng độ dài.

Trên thực tế, chúng ta nên hạn chế độ dài của palindrome ngay bây giờ, đó là gán $d_1 [i] = r − i$, để xử lý các tình huống như vậy một cách chính xác. Sau đó, chúng ta sẽ chạy thuật toán tầm thường để cố gắng tăng $d_1 [i]$ nếu có thể. Hình minh họa của trường hợp này (palindrome với trung tâm $j$ bị hạn chế để phù hợp với palindrome "bên ngoài"):

![Imgur](https://imgur.com/TUE5ev0.png)

Trong hình minh họa cho thấy rằng mặc dù palindrome với trung tâm $j$ có thể lớn hơn và nằm ngoài palindrome "bên ngoài", nhưng với $i$ là trung tâm, chúng ta chỉ có thể sử dụng phần hoàn toàn phù hợp với palindrome "bên ngoài". Nhưng câu trả lời cho vị trí $i$ $(d_1 [i])$ có thể lớn hơn nhiều so với phần này, vì vậy tiếp theo chúng ta sẽ chạy thuật toán tầm thường để cố gắng phát triển nó bên ngoài palindrome "bên ngoài", ví dụ đến khu vực "try moving here".

Cuối cùng, đừng quên quên cập nhật các giá trị $(l, r)$ sau khi tính toán mỗi $d_1 [i]$.

## Độ phức tạp của thuật toán Manacher

Thoạt nhìn, không rõ là thuật toán này có độ phức tạp theo thời gian tuyến tính, bởi vì chúng ta thường chạy thuật toán ngây thơ khi tìm kiếm câu trả lời cho một vị trí cụ thể.

Tuy nhiên, một phân tích cẩn thận hơn cho thấy rằng thuật toán là tuyến tính. Trên thực tế, thuật toán xây dựng Z-function, trông tương tự như thuật toán này, cũng hoạt động theo thời gian tuyến tính.

Chúng ta có thể nhận thấy rằng mỗi lần lặp lại thuật toán tầm thường sẽ tăng $r$ lên $1$. Đồng thời $r$ không giảm trong suốt quá trình chạy thuật toán. Vì vậy, thuật toán tầm thường sẽ thực hiện tổng cộng $O (n)$ lần lặp.

Các phần khác của thuật toán Manacher rõ ràng hoạt động theo thời gian tuyến tính. Do đó, chúng ta nhận được độ phức tạp thời gian $O (n)$.

## Cài đặt thuật toán Manacher

Để tính toán $d_1 []$, chúng ta xây dựng đoạn mã sau. Những điều cần lưu ý:

- $i$ là chỉ số của chữ cái trung tâm của palindrome hiện tại.
- Nếu $i$ vượt quá $r$, thì $d_1 [i]$ được khởi tạo bằng $0$.
- Nếu $i$ không vượt quá $r$, thì $d_1 [i]$ hoặc được khởi tạo thành $d_1 [j]$, trong đó $j$ là vị trí phản chiếu (mirror) của $i$ trong $(l, r)$, hoặc $d_1 [i]$ bị giới hạn ở kích thước của "bên ngoài "palindrome."
- Vòng lặp while biểu thị thuật toán tầm thường. Chúng tôi khởi chạy nó bất kể giá trị của $k$.
- Nếu kích thước của palindrome với trung tâm tại $i$ là $x$, thì $d_1 [i]$ lưu trữ $(x + 1)/2$.

```cpp
vector<int> manacher_odd(string s) {
    int n = s.size();
    s = "$" + s + "^";
    vector<int> p(n + 2);
    int l = 0, r = -1;
    for(int i = 1; i <= n; i++) {
        p[i] = max(0, min(r - i, p[l + (r - i)]));
        while(s[i - p[i]] == s[i + p[i]]) {
            p[i]++;
        }
        if(i + p[i] > r) {
            l = i - p[i], r = i + p[i];
        }
    }
    return vector<int>(begin(p) + 1, end(p) - 1);
}
```

## Tài liệu tham khảo

1. Nội dung được dịch từ [cp-algorithms](https://cp-algorithms.com/string/manacher.html)
2. Handbook Competitive Programming - Antti Laaksonen
3. Competitve programming 3 - Steven Halim, Felix Halim