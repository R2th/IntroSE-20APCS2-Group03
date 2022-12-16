### Giới thiệu
`Armadillo` là một thư viện đại số tuyến tính với rất nhiều hàm xử lý vector, ma trận. Nó có syntax rất đơn giản, sử dụng như là trong Matlab. 
Để cài đặt, ta vào [trang chủ](http://arma.sourceforge.net/) của `Armadillo` để tải về.

### Các lệnh cơ bản
Để sử dụng thư viện, ta phải `#include <armadillo>`:
```
// main.cpp
#include <iostream>
#include <armadillo>

int main(int argc, const char** argv) {
    arma::mat X = {{1, 2}, {3, 4}};
    arma::vec y = {1, 2};
    std::cout << X << std::endl << y;
    return 0;
}
```
Để chạy được, ta phải biên dịch với thư viện `armadillo`:
```
$ g++ --std=c++17 -o main main.cpp -larmadillo
$ ./main
   1.0000   2.0000
   3.0000   4.0000

   1.0000
   2.0000
```
### Các phép toán trên ma trận
**1. Khởi tạo ma trận**

Để khởi tạo ma trận `0` kích thước `m x n`, ta dùng `.zeros(m, n)`:
```
arma::mat X;
X.zeros(m, n);
```

Để khởi tạo ma trận toàn số `1` kích thước `m x n`, ta dùng `.ones(m, n)`

Để gán tất cả các phần tử của một ma trận về cùng số `x`, ta dùng `.fill(x)`

**2. Reshape**

Để `reshape` ma trận, ta dùng `.reshape(m, n)`:
```
arma::mat X;
X.zeros(5, 4);
X.reshape(10, 2);
X.reshape(20, 1);
```

Các phần tử được lấy thứ tự ưu tiên từ trên xuống dưới, từ trái qua phải.

**3. Kích thước ma trận**

Kích thước ma trận `X` sẽ là `X.n_rows` nhân `X.n_cols`. Ngoài ra ta có thể dùng `arma::size(X)` để kấy kích thước và sử dụng `.n_rows/.n_cols` để lấy các chiều.

**4. Truy cập vào một ô**

Để truy cập vào ô `(i, j)`, ta dùng `.at(i, j)`
```
arma::mat X;
X.at(i, j);
```

**5. Truy cập vào cột/hàng**

Để truy cập vào cột/hàng thứ `i`, ta dùng `.col(i)/.row(i)`
```
arma::mat X;
X.col(i) = arma::vec({...});
X.row(i) = arma::vec({...});
```
Để truy cập từ cột/hàng `i` đến cột/hàng `j`, ta dùng `.cols(i, j)/.rows(i, j)`:
```
arma::mat X;
X.cols(i, j) = arma::mat({...});
X.rows(i, j) = arma::mat({...});
```

**6. Lấy giá trị lớn nhất/nhỏ nhất theo chiều**

Để lấy giá trị lớn nhất/nhỏ nhất của từng cột của ma trận `X`, ta dùng `arma::max(X, 0)/arma::min(X, 0)`

Để lấy giá trị lớn nhất/nhỏ nhất của từng hàng của ma trận `X`, ta dùng `arma::max(X, 1)/arma::min(X, 1)`

**7. Lấy tổng các phần tử theo chiều**

Để lấy tổng các phần tử của từng cột của ma trận `X`, ta dùng `arma::sum(X, 0)`

Để lấy tổng các phần tử của từng hàng của ma trận `X`, ta dùng `arma::sum(X, 1)`

**8. Phép cộng/trừ**

Để cộng/trừ hai ma trận, đơn giản là ta dùng toán tử `+/-`:
```
arma::mat X, Y;
arma::mat XplusY = X + Y;
arma::mat XminusY = X - Y;
```

**9. Nhân ma trận với một hằng số**

Ta sử dụng phép nhân như bình thường với toán tử `*`:
```
arma::mat X;
arma::mat Y = 2 * X; // = X * 2
```

**10. Dot produt**

Để lấy `dot product` của hai ma trận, ta dùng toán tử `*`:
```
arma::mat X, Y;
arma::vec y;
arma::mat XdotY = X * Y;
arma::mat Xdoty = X * y;
arma::vec Xdoty_vec = X * y;
```

**11. Element-wise product**

Để lấy `element-wise product` của hai ma trận cùng kích thước, ta sử dụng toán tử `%`:
```
arma::mat X, Y;
arma::mat XmulY = X % Y;
```
**12. Vết của ma trận**

Hàm `arma::trace(X)` sẽ trả về vết của ma trận `X`

**13. Hạng của ma trận**

Hàm `arma::rank(X)` sẽ trả về hạng của ma trận `X`

**14. Định thức của ma trận**

Hàm `arma::det(X)` sẽ trả về định thức của `X`

**15. Chuyển vị ma trận**

Hàm `arma::trans(X)` sẽ trả về chuyển vị của ma trận `X`

**16. Nghịch đảo ma trận**

Hàm `arma::inv(X)` sẽ trả về nghịch đảo của ma trận `X`

**17. Giả ngịch đảo ma trận**

Hàm `arma::pinv(X)` sẽ trả về nghịch đảo của ma trận `X`

**18. Lấy trị riêng của ma trận**

Hàm `arma::arma::eig_gen` trả về các trị riêng và vector riêng của ma trận `X`:
```
arma::mat X;
arma::cx_mat eigen_vectors;
arma::cx_vec eigen_values;

arma::eig_gen(eigen_values, eigen_vectors, X);
```

**19. Singular value decomposition**

Hàm `arma::svd` lấy `SVD` của ma trận `X`:
```
arma::mat X;
arma::mat U;
arma::vec s;
arma::mat V;

arma::svd(U, s, V, X);
```

**20. So sánh ma trận**

Khi so sánh ma trận với một số hoặc với một ma trận cùng kích thước, sẽ so sánh từng phần tử tương ứng, trả về `1` nếu so sánh đúng và `0` nếu so sánh sai:
```
arma::mat X = {{-1, 2, 4}, {3, -4, -7}};
std::cout << (X >= 0);
```
Kết quả:
```
        0        1        1
        1        0        0
```

```
arma::mat X = {{-1, 2, 4}, {3, -4, -7}};
arma::mat Y = {{1, 2, 3}, {4, 5, 6}};
std::cout << (X < Y);
```
Kết quả:
```
        1        0        0
        1        1        1
```

**21. Ánh xạ một hàm lên ma trận**

Khi ánh xạ các hàm trong `arma` như `sin, cos, exp, log, ...` vào một ma trận, nó sẽ ánh xạ từng phần tử của ma trận đó.

Ngoài ra ta cũng có thể viết các hàm có chức năng tương tự, ví dụ hàm sau sẽ ánh xạ hàm `sigmon` cho từng phần tử của ma trận `x`:
```
arma::mat sigmon(arma::mat x) {
    return 1/(arma::exp(-x) + 1);
}
```
Tương tự hàm sau sẽ ánh xạ hàm `ReLU` cho từng phần tử của ma trận `x`:
```
arma::mat ReLU(arma::mat x) {
    return x % (x > 0);
}
```
Hoặc hàm `Leaky ReLUs`:
```
arma:mat LeakyReLUs(arma::mat x) {
    return x % (x > 0) + 0.01 * x % (x <= 0);
}
```
Hàm Sortmax:
```
arma::mat Sortmax(arma::mat x) {
    arma::mat temp = arma::exp(x);
    return temp/arma::mat(arma::sum(temp, 0)).at(0);
}
```

**22. Lưu ma trận, đọc ma trận từ file**

Để lưu một ma trận `X`, ta dùng `X.save(path)`, để đọc một file ma trận đã lưu vào ma trận `X`, ta dùng `X.load(path)`

**OpenCV**

Để lấy dữ liệu từ `cv::Mat` ta sẽ làm như sau:
```
cv::Mat opencv_mat;
arma::Mat<type> armadillo_mat(reinterpret_cast<type*>opencv_mat.data, opencv_mat.rows, opencv_mat.cols);
```
Để chuyển ngược lại, ta dùng:
```
arma::Mat<type> armadillo_mat;
cv::Mat opencv_mat(armadillo_mat.n_rows, armadillo_mat.n_cols, CV_Type, armadillo_mat.memptr());
```

### Tài liệu tham khảo
[API Documentation for Armadillo 9.300 ](http://arma.sourceforge.net/docs.html)