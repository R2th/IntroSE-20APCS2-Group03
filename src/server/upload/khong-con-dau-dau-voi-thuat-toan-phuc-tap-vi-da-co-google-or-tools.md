![](https://images.viblo.asia/ee32f457-5c9f-426d-aaca-1efb9ee23e5a.png)

# Giới thiệu Google OR-Tools

OR-Tools là 1 phần mềm mã nguồn mở do Google phát triển, dùng để giải quyết các bài toán tối ưu hóa tổ hợp, nhằm tìm kiếm lời giải tốt nhất cho 1 bài toán trong số rất nhiều lời giải khả thi.

Dưới đây là 1 số bài toán mà OR-Tools giải quyết:

-   Lộ trình xe (Vehicle routing): Tìm đường đi tối ưu cho xe nhận và giao các đơn hàng có các ràng buộc nhất định

    -   Ví dụ: Tổng khối lượng hàng trên 1 xe không vượt quá 50kg, thời gian nhận và giao hàng không được vượt quá 3 giờ, ...
-   Lập lịch (Scheduling): Tìm lịch tối ưu cho 1 tập hợp các nhiệm vụ phức tạp, 1 số công việc cần được thực hiện trước những công việc khác, trên một tập hợp cố định các tài nguyên khác.

    -   Ví dụ: Bài toán lập lịch thứ tự các công việc cần thực hiện cho 1 số lượng máy nhất định, ...
-   Đóng thùng (Bin packing): Đóng gói các thùng hàng có kích thước khác nhau với số lượng càng nhiều càng tốt vào 1 thùng xe có sức chứa cố định

Trong hầu hết các trường hợp, các bài toán gần như có rất nhiều các giải pháp khả thi cũng như nhiều thuật toán để tìm kiếm các lời giải khả thi đó. Để giải quyết vấn đề này, OR-Tools sử dụng các thuật toán hiện đại để khoanh vùng, thu nhỏ tập hợp tìm kiếm để tìm ra lời giải tối ưu hoặc gần tối ưu.

OR-Tools bao gồm các bộ giải cho:

-   Constraint Programming - Tối ưu hóa ràng buộc

    -   Là một tập hợp các kỹ thuật để tìm giải pháp khả thi cho một vấn đề được thể hiện dưới dạng ràng buộc. CP dựa trên tính khả thi thay vì tối ưu và tìm ra các ràng buộc và biến thay vị chức năng khách quan

    -   Các bài toán cổ điển như N-queens và giải mã câu đố

-   Linear and Mixed-Integer Programming

-   Vehicle Routing

-   Graph Algorithms

# OR-Tools trong Python

Việc cài đặt OR-Tools trong Python rất đơn giản với câu lệnh sau đây, với điều kiện đã cài đặt Python và Pip:

```
pip install ortools

```

## Giải quyết vấn đề

### Một ví dụ về tối ưu hóa tuyến tính

Một trong những lĩnh vực tối ưu hóa cổ điển và được sử dụng rộng rãi nhất là tối ưu hóa tuyến tính (lập trình ràng buộc), hàm mục tiêu và ràng buộc được viết dưới dạng biểu thức tuyến tính.

Ví dụ: Tìm giá trị lớn nhất của biểu thức $3x + y$ thỏa mãn các ràng buộc sau:

-   $0 \leq x \leq 1$
-   $0 \leq y \leq 2$
-   $x + y \leq 2$

Hàm mục tiêu là $3x + y$. Cả hàm mục tiêu và các ràng buộc đều có biểu thức tuyến tính.

Biểu thức tuyến tính có dạng: $a_0x_0 + a_1x_1 + a_2x_2 + ... + a_nx_n$ với $i \in (0, n)$, $a_i$ là các đối số của biểu thức, $x_i$ là các biến của biểu thức.

### Các bước chính để giải quyết bài toán

Đối với mỗi ngôn ngữ, các bước cơ bản để thiết lập và giải quyết bài toán đều như nhau:

-   Import các thư viện cần thiết
-   Khai báo solver
-   Tạo các biến
-   Khai báo các ràng buộc
-   Khai báo hàm tối ưu
-   Gọi solver và hiển thị kết quả

Ta mô tả các bước để giải quyết bằng code Python như sau:

-   Import các thư viện cần thiết

```
from ortools.linear_solver import pywraplp

```

-   Khai báo solver

```
# Create the linear solver with the GLOP backend.
solver = pywraplp.Solver.CreateSolver('GLOP')

```

-   Tạo các biến x, y và khai báo khoảng giá trị tương ứng

```
# Create the variables x and y.
x = solver.NumVar(0, 1, 'x')
y = solver.NumVar(0, 2, 'y')

print('Number of variables =', solver.NumVariables())

```

-   Khai báo ràng buộc $x + y \leq 2$

```
# Create a linear constraint, 0 <= x + y <= 2.
ct = solver.Constraint(0, 2, 'ct')
ct.SetCoefficient(x, 1) # 1*x
ct.SetCoefficient(y, 1) # 1*y
# => ct = x + y
print('Number of constraints =', solver.NumConstraints())

```

Hàm `SetCoefficient` đặt các hệ số tương ứng cho x và y trong biểu thức ràng buộc

-   Khai báo hàm tối ưu

```
# Create the objective function, 3 * x + y.
objective = solver.Objective()
objective.SetCoefficient(x, 3)
objective.SetCoefficient(y, 1)
objective.SetMaximization()

```

Hàm `SetMaximization` để định nghĩa hàm tối ưu theo giá trị lớn nhất

-   Gọi solver và hiển thị kết quả

```
solver.Solve()
print('Solution:')
print('Objective value =', objective.Value())
print('x =', x.solution_value())
print('y =', y.solution_value())

```

### Khái quát các bước

Bên dưới là phần code hoàn chỉnh:

```
from ortools.linear_solver import pywraplp

def main():
    # Create the linear solver with the GLOP backend.
    solver = pywraplp.Solver.CreateSolver('GLOP')

    # Create the variables x and y.
    x = solver.NumVar(0, 1, 'x')
    y = solver.NumVar(0, 2, 'y')

    print('Number of variables =', solver.NumVariables())

    # Create a linear constraint, 0 <= x + y <= 2.
    ct = solver.Constraint(0, 2, 'ct')
    ct.SetCoefficient(x, 1)
    ct.SetCoefficient(y, 1)

    print('Number of constraints =', solver.NumConstraints())

    # Create the objective function, 3 * x + y.
    objective = solver.Objective()
    objective.SetCoefficient(x, 3)
    objective.SetCoefficient(y, 1)
    objective.SetMaximization()

    solver.Solve()

    print('Solution:')
    print('Objective value =', objective.Value())
    print('x =', x.solution_value())
    print('y =', y.solution_value())

if __name__ == '__main__':
    main()

```

Sau khi chạy phần code Python phía trên, ta nhận được lời giải như sau:

```
Solution:
x =  1.0
y =  1.0

```

## Các ví dụ khác trong Python

Có rất rất nhiều ví dụ khác mà OR-Tools giúp chúng ta giải quyết bài toán, mọi người có thể tìm hiểu thêm [ở đây](https://developers.google.com/optimization/examples)

# Bài toán phân công giảng dạy

## Phát biểu bài toán

-   Có $N$ lớp $0, 1, 2, ..., N - 1$ cần được phân cho $M$ giáo viên $0, 1, 2, ..., M - 1$
-   Lớp $i$ có số tín chỉ là $c(i)$
-   Mỗi giáo viên chỉ có thể dạy 1 số lớp nhất định tùy thuộc vào chuyên ngành của giáo viên và được thể hiện bởi cấu trúc $tc(i, j)$ trong đó $tc(i, j) = 1$ có nghĩa là giáo viên $i$ có thể được phần công dạy lớp $j$ và $tc(i, j) = 0$ thì ngược lại, với $i = 0, 1, ..., N - 1, j = 0, 1, ..., M - 1$
-   Vì các lý do mà nhiều lớp không thể phân cho cùng 1 giáo viên và được thể hiện bởi cấu trúc $f(i, j) = 1$ nghĩa là lớp ii và $j$ không thể cùng được dạy bởi 1 giáo viên, với $i, j = 0, 1, ..., N - 1$
-   Cần lập kế hoạch phân công giảng dạy sao cho tổng số tín chỉ lớn nhất của các lớp là nhỏ nhất có thể

Ví dụ về dữ liệu như sau:

| Lớp | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Số tiết | 3 | 3 | 4 | 3 | 4 | 3 | 3 | 3 | 4 | 3 | 3 | 4 | 4 |

| Giáo viên | Danh sách lớp học có thể dạy |
| --- | --- |
| 0 | 0, 2, 3, 4, 8, 10 |
| 1 | 0, 1, 3, 5, 6, 7, 8 |
| 2 | 1, 2, 3, 7, 9, 11, 12 |

Cặp lớp bị trùng tiết

| Lớp 1 | Lớp 2 |
| --- | --- |
| 0 | 2 |
| 0 | 4 |
| 0 | 8 |
| 1 | 4 |
| 1 | 10 |
| 3 | 7 |
| 3 | 9 |
| 5 | 11 |
| 5 | 12 |
| 6 | 8 |
| 6 | 12 |

## Mô hình hóa bài toán

Đối với bài toán này, chúng ta mô hình hóa theo quy hoạch nguyên tuyến tính

-   Biến:
    -   $x[0...N - 1, 0...M - 1]$: $x[i, j]$ là biến nhị phân $D(x[i]) = \{0, 1\}$ với ý nghĩa:
        -   $x[i, j] = 1$: Lớp $i$ được phân cho giáo viên $j$
        -   $x[i, j] = 0$: Lớp $i$ không được phân cho giáo viên $j$
    -   $y$ là tổng số tiết của các lớp phân cho giáo viên lớn nhất
-   Các ràng buộc:
    -   Với mọi cặp $i, j$ sao cho $tc(i, j) = 0$, đưa ra ràng buộc $x[i, j] = 0$
    -   Với mọi cặp 2 lớp $i, j$ sao cho $f(i, j)$, đưa ra ràng buộc $x[i, k] + x[j, k] <= 1$
    -   Với mọi $i$, mỗi lớp chỉ có 1 giáo viên được phân công, đưa ra ràng buộc $x[i, 0] + x[i, 1] + ... + x[i, m - 1] = 1$, với $\forall i = 0, ..., N - 1$
    -   Với mỗi $j$, $\sum_{i = 0...N-1} {c[i]*x[i, j]} \leq y$
-   Hàm mục tiêu: $y \to min$

## Lập trình

-   Đọc dữ liệu từ file txt:

    -   Ở đây mình có file dữ liệu đầu vào được lưu vào file txt có nội dung như sau:

    ```
    3 13
    3 3 4 3 4 3 3 3 4 3 3 4 4
    0 2 3 4 8 10
    0 1 3 5 6 7 8
    1 2 3 7 9 11 12
    10
    0 2
    0 4
    0 8
    1 4
    1 10
    3 7
    3 9
    5 11
    5 12
    6 8
    6 12

    ```

    -   Dòng đầu lần lượt là $M$ (số giáo viên), $N$ (số lớp)
    -   Dòng 2 là lần lượt số tín chỉ của $N$ lớp
    -   $M$ dòng tiếp theo, mỗi dòng liệt kê các lớp học mà giáo viên giảng dạy
    -   Dòng tiếp theo khai báo $K$ cặp lớp conflict
    -   $K$ dòng tiếp theo là các cặp lớp conflict
    -   Code phần đọc dữ liệu, cũng như tạo mảng $tc[i, j]$ như sau:

    ```
    def input(filename):
       global M, N, c, conflict, lines

       with open(filename) as f:
           M, N = list(map(lambda i: int(i), f.readline().split()))
           c = [int(i) for i in f.readline().split()]
           lines = []
           for i in range(M):
               lines.append([int(x) for x in f.readline().split()])
           K = int(f.readline())
           conflict = []
           for k in range(K):
               conflict.append([int(x) for x in f.readline().split()])
       return M, N, c, lines, conflict
    M, N, c, lines, conflict = input("input.txt")
    tc = [[0 for i in range(M)] for j in range(N)]
    for r, row in enumerate(lines):
       for col in row:
           tc[col][r] = 1

    ```

-   Import thư viện cần thiết và khai báo `solver`:

```
from ortools.linear_solver import pywraplp
from ortools.sat.python import cp_model

solver = pywraplp.Solver.CreateSolver('GLOP')

```

-   Khai báo biến:

```
x = [[solver.IntVar(0, 1, 'x({i}, {j})'.format(i=i, j=j)) for j in range(M)] for i in range(N)]
numCredits = sum(c)
y = solver.IntVar(0, numCredits, 'y')

```

-   Khai báo ràng buộc

    -   Ràng buộc 1:

    ```
    for i in range(N):
        for j in range(M):
            if tc[i][j] == 0:
                cstr = solver.Constraint(0, 0)
                cstr.SetCoefficient(x[i][j], 1)

    ```

    -   Ràng buộc 2:

    ```
    for conf in conflict:
        c1, c2 = conf
        for j in range(M):
            cstr = solver.Constraint(0, 1)
            cstr.SetCoefficient(x[c1][j], 1)
            cstr.SetCoefficient(x[c2][j], 1)

    ```

    -   Ràng buộc 3:

    ```
    for i in range(N):
        cstr = solver.Constraint(1, 1)
        for j in range(M):
            cstr.SetCoefficient(x[i][j], 1)

    ```

    -   Ràng buộc 4:

    ```
    for j in range(M):
        cstr = solver.Constraint(-solver.infinity(), 0)
        for i in range(N):
            cstr.SetCoefficient(x[i][j], c[i])
        cstr.SetCoefficient(y, -1)

    ```

-   Gọi solver và hiển thị kết quả:

```
result_status = solver.Solve()
assert result_status == pywraplp.Solver.OPTIMAL
print('objective = ', solver.Objective().Value())
for i in range(N):
    for j in range(M):
        if x[i][j].solution_value() > 0:
            print('Class {i} assigned to teacher {j}'.format(i=i, j=j))

```

-   Kết hợp và chạy tất cả code trong 1 file ta thu được kết quả như sau:

```
Class 0 assigned to teacher 1
Class 1 assigned to teacher 1
Class 1 assigned to teacher 2
Class 2 assigned to teacher 0
Class 2 assigned to teacher 2
Class 3 assigned to teacher 0
Class 4 assigned to teacher 0
Class 5 assigned to teacher 1
Class 6 assigned to teacher 1
Class 7 assigned to teacher 1
Class 8 assigned to teacher 0
Class 9 assigned to teacher 2
Class 10 assigned to teacher 0
Class 11 assigned to teacher 2
Class 12 assigned to teacher 2

```

# Kết luận

-   Như vậy, đối với nhiều bài toán phức tạp, thư viện OR-Tools đã giúp chúng ta giải quyết 1 cách nhanh chóng và tối ưu lời giải
-   Google OR-Tools sử dụng rất nhiều những thuật toán hiện đại để tìm lời giải tối ưu, nên chúng ta không cần phải đau đầu với những thuật toán tự khai báo nữa. Công việc duy nhất là định nghĩa biến và ràng buộc của biến, việc còn lại để thư viện lo.
-   Đối với bộ dữ liệu lớn, đồng nghĩa với việc OR-Tools phải mất nhiều thời gian chạy. Chúng ta có thể tìm nhiều thư viện khác hỗ trợ.

# Tham khảo

-   [Google OR-Tools](https://developers.google.com/optimization/)