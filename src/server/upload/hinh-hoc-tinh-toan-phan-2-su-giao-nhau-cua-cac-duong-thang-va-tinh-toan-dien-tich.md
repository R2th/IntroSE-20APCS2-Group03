Trong bài viết phần 1 về chủ đề Hình học tính toán, chúng ta đã cùng nghiên cứu về cách sử dụng vector trong các bài toán hình học. Còn trong bài viết này, tôi sẽ giới thiệu những vấn đề liên quan tới đường thẳng, giao điểm và sử dụng kiến thức về đại số tuyến tính để tính toán giao điểm, tính toán diện tích, qua đó áp dụng trong những bài toán hình học của lập trình thi đấu.

# I. Biểu diễn đường thẳng

Trong Toán học phổ thông, các bạn đã biết có nhiều cách để biểu diễn một đường thẳng, vì thế cũng có nhiều cách biểu diễn đường thẳng trong máy tính, mà tùy vào dữ kiện đề bài ta sẽ chọn cách biểu diễn phù hợp. Dưới đây là một số cách biểu diễn đường thẳng thường dùng trong các bài toán Tin học:

- Dạng $y = ax + b$: Mỗi đường thẳng được đặc trưng bởi một cặp hệ số $a$ và $b,$ tuy nhiên dạng biểu diễn này không thể hiện được các đường thẳng song song với trục $Oy$.
- Dạng tổng quát: $ax + by = c$. Mỗi đường thẳng có thể được biểu diễn bởi bộ ba hệ số $(a, b, c)$. Cách làm này gần gũi với đồ thị hàm số, nên nó thường xuyên được sử dụng nhất kể cả trong Toán học hay Tin học. Vector pháp tuyến $\vec{n}(a, b)$ có thể được dùng để viết một phương trình đường thẳng tương đương ngắn gọn hơn: $\vec{n}.\overrightarrow{OP} = (a, b).(x, y) = ax + by = c$ với mọi $P(x, y)$ nằm trên đường thẳng. Do đó, dạng tổng quát này còn được kí hiệu là $(\vec{n}, c)$.
- Dạng tham số: $(P, \vec{d});$ trong đó $P$ là một điểm trên đường thẳng còn $\vec{d}$ là một vector chỉ phương của đường thẳng với tọa độ là $(-b, a)$. Như vậy, một đường thẳng được xác định bởi bộ bốn số $(x_0, y_0, a, b);$ trong đó $(x_0, y_0)$ là tọa độ điểm $P$ còn $(-b, a)$ là tọa độ của vector chỉ phương $\vec{d}$. Biểu diễn này mang ý nghĩa: *Đường thẳng là tập các điểm có tọa độ chính là tọa độ của vector $\overrightarrow{OP} + s\vec{d}$ với mọi $S \in \mathbb{R}$.*

Khi cần chuyển đổi giữa các biểu diễn, ta thực hiện biến đổi tương đương đại số, kết hợp với công thức chuyển đổi giữa vector chỉ phương $\vec{d}(-b, a)$ và vector pháp tuyến $\vec{n}(a, b)$.

# II. Giao điểm giữa các đường thẳng và ứng dụng

## 1. Tìm giao điểm của hai đường thẳng

Đây là bài toán phổ biến nhất trong các bài toán về giao điểm, nhưng không phải ai cũng có thể thực hiện thành thạo.

Trong trường hợp lý tưởng, ta sẽ có được hai đường thẳng đều được biểu diễn ở dạng $Ax + By = C$ với $A, B, C$ là các hệ số xác định đường thẳng. Tuy nhiên, không phải lúc nào bài toán cũng tuyệt đẹp như vậy. Nhưng may mắn rằng, ta có thể dễ dàng tìm được biểu diễn tổng quát trên dựa vào hai điểm cho trước thuộc đường thẳng. Ví dụ có hai điểm phân biệt $(x_1,y_1)$ và $(x_2,y_2),$ và để tìm $A,B,C$ cho phương trình trên, ta có công thức:

![](https://i.imgur.com/RQiiMbt.png)

Đường thẳng dù ở dạng nào, ta cũng có thể chọn được hai điểm phân biệt thuộc đường thẳng và dùng công thức trên để tính $A, B, C$.

Giờ, coi như ta đã thu được hai đường thẳng được cho bởi hai phương trình:

$$\begin{cases}A_1x + B_1y = C_1 \ (1) \\ A_2x + B_2y = C_2 \ (2) \end{cases}$$

Để tìm giao điểm của hai đường thẳng, ta chỉ cần giải hệ phương trình hai ẩn $x, y$. Cách làm như sau:
- Nhân phương trình $(1)$ với $B_2$ và nhân phương trình $(2)$ với $B_1$:
    $$\begin{cases}A_1B_2x + B_1B_2y = B_2C_1 \\ A_2B_1x + B_1B_2y = B_1C_2 \end{cases}$$
- Lấy phương trình thứ nhất trừ hai vế cho phương trình thứ hai, ta được:
    $$A_1B_2x + A_2B_1x = B_2C_1 - B_1C_2$$
- Cuối cùng, chia cả hai vế cho $A_1B_2 - A_2B_1,$ ta sẽ có phương trình giải ẩn $x$:
    $$x = \frac{B_2C_1 - B_1C_2}{A_1B_2 - A_2B_1}$$
- Phương trình giải ẩn $y$ cũng thu được theo cách biến đổi tương tự:
    $$y = \frac{A_1C_2 - A_2C_1}{A_1B_2 - A_2B_1}$$
	
Như vậy, ta thu được giao điểm của hai đường thẳng đã cho.

### Cài đặt

```cpp
struct Line
{
    double A, B, C;
};

// Trả về giao điểm hai đường thẳng.
// Riêng hai trường hợp song song hoặc trùng nhau thì ném ngoại lệ.
pair < int, int > find_line_intersection(Line line1, Line line2)
{
    double det = line1.A * line2.B - line2.A * line1.B;
    // Hai đường thẳng song song hoặc trùng nhau.
    if (det == 0)
    {
        if (line1.A * line2.C == line2.A * line1.C)
        {
            throw "Coincident lines";
        }
        else
        {
            throw "Parallel lines";
        }
    }
    else
    {
        double x = line2.B * line1.C - line1.B * line2.C / det;
        double y = line1.A * line2.C - line2.A * line1.C / det;
		
        return {x, y};
    }
}
```

## 2. Tìm giao điểm của hai đoạn thẳng

Bài toán tiếp theo là cho bốn điểm $A, B, C, D$ trên mặt phẳng, cần xác định xem hai đoạn thẳng $AB$ và $CD$ có giao điểm duy nhất hay không, nếu có thì đưa ra tọa độ của giao điểm đó.

Sử dụng những kiến thức về tích có hướng, ta có thể thực hiện công việc này không mấy khó khăn. Tuy nhiên, trước tiên cần phải xem xét liệu trong số bốn điểm đã cho, có tồn tại ba điểm nào thẳng hàng hay không.

### Nhắc lại về hàm CW và CCW

Kiến thức các bạn cần lưu ý ở đây là: Với góc $α$ thỏa mãn $0°<α<180°$ thì $\sin(α)>0$ nên nếu góc ngược chiều kim đồng hồ $θ<180°$ thì tích có hướng dương, ngược lại tích có hướng âm (đã đề cập ở bài viết trước).

![](https://i.imgur.com/b4bZ5Wx.png)

Xét ba điểm $A, B, C;$ Giả sử ta đi từ điểm $A$ sang điểm $B$ theo đường thằng và đi tiếp sang điểm $C$ theo đường thẳng, khi đó:
- Tích có hướng $\overrightarrow{AB} \times \overrightarrow{BC}$ sẽ là số dương nếu như chỗ rẽ tại $B$ là "rẽ trái" (bẻ góc ngược chiều kim đồng hồ). Đây gọi là công thức CCW.
- Tích có hướng $\overrightarrow{AB} \times \overrightarrow{BC}$ sẽ là số âm nếu như chỗ rẽ tại $B$ là "rẽ phải" (bẻ góc ngược thuận kim đồng hồ). Đây gọi là công thức CW.
- Tích có hướng $\overrightarrow{AB} \times \overrightarrow{BC}$ sẽ bằng $0$ nếu như ba điểm $A, B, C$ thẳng hàng.

### Kiểm tra giao điểm của hai đoạn thẳng

#### Trường hợp tồn tại ba điểm thẳng hàng

Nếu tồn tại $3$ trong $4$ điểm đầu mút thẳng hàng, ta kiểm tra xem có tồn tại đầu mút của đoạn thẳng này thuộc đoạn thẳng kia hay không:
- Nếu có thì rõ ràng là $2$ đoạn thẳng giao nhau tại ít nhất $1$ điểm (tại đầu mút vừa xét):

	![](https://i.imgur.com/DrtxfuE.png)

- Nếu không thì rõ ràng là 2 đoạn thẳng không thể giao nhau:

	![](https://i.imgur.com/bVyDhdN.png)
	
#### Trường hợp không tồn tại ba điểm thẳng hàng

Nếu không tồn tại $3$ trong $4$ điểm đầu mút thẳng hàng thì $2$ đoạn thẳng $AB$ và $CD$ giao nhau khi:
- $C$ và $D$ nằm khác phía đối với đường thẳng $AB$ *và*
- $A$ và $B$ nằm khác phía đối với đường thẳng $CD$.

Để $C$ và $D$ nằm khác phía đối với đường thẳng AB thì:
- $A,B,C$ ngược chiều kim đồng hồ và $A,B,D$ cùng chiều kim đồng hồ *hoặc*
- $A,B,C$ cùng chiều kim đồng hồ và $A,B,D$ ngược chiều kim đồng hồ.
$⟹(\overrightarrow{AB} \times \overrightarrow{AC}) \cdot (\overrightarrow{AB} \times \overrightarrow{AD}) < 0$

Từ đó, ta có hệ sau:

![](https://i.imgur.com/51ppfvE.png)

*Hình minh họa:*

![](https://i.imgur.com/2cAN9LR.png)

### Cài đặt

```cpp
const double eps = 1e-9;

// Xác định dấu của tích có hướng.
int sign(double x) 
{
    if (x > eps) 
        return 1;
		
    if (x < -eps) 
        return -1;
		
    return 0;
}

double cross(Vec AB, Vec AC) 
{
    return AB.x * AC.y - AC.x * AB.y;
}

double dot(Vec AB, Vec AC) 
{
    return AB.x * AC.x + AB.y * AC.y;
}

bool intersect(Point A, Point B, Point C, Point D) 
{
    int ABxAC = sign(cross(B - A, C - A));
    int ABxAD = sign(cross(B - A, D - A));
    int CDxCA = sign(cross(D - C, A - C));
    int CDxCB = sign(cross(D - C, B - C));
	
    if (ABxAC == 0 || ABxAD == 0 || CDxCA == 0 || CDxCB == 0) 
    {
        // C on segment AB if ABxAC = 0 and CA.CB <= 0.
        if (ABxAC == 0 && sign(dot(A - C, B - C)) <= 0) 
            return true;
			
        if (ABxAD == 0 && sign(dot(A - D, B - D)) <= 0)
            return true;
			
        if (CDxCA == 0 && sign(dot(C - A, D - A)) <= 0) 
            return true;
			
        if (CDxCB == 0 && sign(dot(C - B, D - B)) <= 0) 
            return true;
		
        return false;
    }
	
    return (ABxAC * ABxAD < 0 && CDxCA * CDxCB < 0);
}
```

## 3. Tìm đường tròn đi qua ba điểm

Ta biết rằng, từ ba điểm không thẳng hàng, luôn luôn tồn tại duy nhất một đường tròn đi qua ba điểm đó. Để tìm được tâm của đường tròn này, ta ứng dụng chính bài toán xác định giao điểm đường thẳng.

Quan sát hình vẽ dưới đây:

![](https://i.imgur.com/xsMLK5u.png)

Giả sử ba điểm cho trước là $X, Y, Z;$ ta sẽ tìm ***đường trung trực*** của hai đoạn $XY$ và $YZ,$ sau đó tìm giao điểm của hai đường trung trực này, đó sẽ chính là tâm của đường tròn đi qua ba điểm $X, Y, Z$.

***Đường trung trực*** của một đoạn thẳng chính là đường thẳng vuông góc với đoạn thẳng tại trung điểm của nó. Để tìm đường trung trực của đoạn thẳng $XY,$ ta làm như sau:
- **Bước 1:** Viết phương trình đường thẳng $XY,$ giả sử nó là $Ax + By = C$.
- **Bước 2:** Tìm trung điểm $M$ của đoạn $XY$ bằng cách lấy trung bình cộng của $2$ hoành độ và trung bình cộng của $2$ tung độ.
- **Bước 3:** Viết phương trình đường thẳng của đường thẳng vuông góc với đường thẳng $XY$ có dạng là $−Bx+Ay=D$ (xem hình vẽ). 

	![](https://i.imgur.com/Yas8S2F.png)

- **Bước 4:** Thay tọa độ của trung điểm $M$ vào phương trình đường thẳng ở bước $3$ để tìm $D$ và xác định đường trung trực.
	
### Ví dụ

Với $2$ điểm $X(2,−3)$ và $Y(1,0);$ để tìm đường trung trực của đoạn $XY,$ ta thực hiện như sau:
- **Bước 1:** Viết phương trình đường thẳng $XY$ theo đúng công thức: 
    $$\begin{cases}A = y_Y - y_X = 0 - (-3) = 3 \\ B = x_X - x_Y = 2 - 1 = 1 \\ C = Ax_X + By_X = 3.2 + 1.(-3) = 2 \end{cases}$$ Vậy phương trình đường thẳng $XY$ có dạng: $3x + y = 3$.
- **Bước 2:** Đặt $M$ là trung điểm đoạn thẳng $XY,$ ta có:
    $$\begin{cases}x_M = \frac{x_X + x_Y}{2} = \frac{2 + 1}{2} = 1.5 \\ y_M = \frac{y_X + y_Y}{2} = \frac{-3 + 0}{2} = -1.5\end{cases}$$
- **Bước 3:** Phương trình đường thẳng của đường thẳng vuông góc với đường thằng $XY$ có dạng: $-x + 3y = D$.
- **Bước 4:** Thay tọa độ của điểm $M$ vào phương trình $-x + 3y = D$:
    $$-1.5 + 3.(-1.5) = D \Leftrightarrow D = -6$$
	
Vậy phương trình đường trung trực của đoạn thẳng $XY$ là: $-x + 3y = -6$.

Làm tương tự với đoạn thẳng $YZ,$ ta sẽ có hai phương trình của hai đường trung trực, và có thể tìm giao điểm của chúng như đã đề cập ở trên.

### Cài đặt

```cpp
struct Point 
{
    double x, y;
    Point() { x = y = 0.0; }
    Point(double x, double y) : x(x), y(y) {}

    Point operator + (const Point &a) const { return Point(x + a.x, y + a.y); }
    Point operator - (const Point &a) const { return Point(x - a.x, y - a.y); }
    Point operator * (double k) const { return Point(x * k, y * k); }
    Point operator / (double k) const { return Point(x / k, y / k); }
};

// Ax + By = C.
struct Line 
{ 
    double a, b, c;
    Line(double a = 0, double b = 0, double c = 0) : a(a), b(b), c(c) {}
	
    Line(Point A, Point B) 
    {
        a = B.y - A.y;
        b = A.x - B.x;
        c = a * A.x + b * A.y;
    }
};

Line perpendicular_bisector(Point A, Point B) 
{
    Point M = (A + B) / 2;
    Line d = Line(A, B);
    // the equation of a perpendicular line has the form: -Bx + Ay = D
    double D = -d.b * M.x + d.a * M.y;
	
    return Line(-d.b, d.a, D);
}
```

# III. Tính toán diện tích

## 1. Diện tích tam giác

![](https://i.imgur.com/jnHlpuV.png)

Có khá nhiều công thức giải tích để tính diện tích tam giác, tùy vào dữ kiện đề bài cho mà ta có thể lựa chọn cách tính phù hợp. Dưới đây là một số cách thường dùng:
- Nếu biết độ dài một cạnh của tam giác là $a$ và chiều cao tương ứng với cạnh đó là $h$ thì diện tích tam giác tính bởi công thức:
    $$S = \frac{a + h}{2}$$
- Nếu biết độ dài hai cạnh của tam giác là $a$ và $b,$ đồng thời góc xen giữa hai cạnh đó có số đo là $\alpha$ thì diện tích tam giác tính bởi công thức:
    $$S = \frac{ab \times \sin \alpha}{2}$$
- Nếu biết độ dài của ba cạnh tam giác lần lượt là $a, b, c$ thì diện tích tam giác có thể tính bởi công thức Heron:
    $$S = \sqrt{p(p - a)(p - b)(p - c)}$$<center>trong đó $p$ là nửa chu vi của tam giác</center>.
- Nếu biết hai vector $\overrightarrow{AB}$ và $\overrightarrow{AC}$ thì diện tích tam giác có thể tính bằng công thức tích chéo:
    $$S = \left|\frac{\overrightarrow{AB} \times \overrightarrow{AC}}{2}\right|$$ Tuy nhiên, trên máy tính thì ta cần biết trước tọa độ ba điểm $A = (x_A, y_A), B = (x_B, y_B), C = (x_C, y_C)$ để tính tích chéo (tích có hướng); khi đó công thức trên có thể biến đổi như sau:
	$$S = \left|\frac{(x_B - x_A)(y_C - y_A) - (x_C - x_A)(y_B - y_A)}{2}\right|$$

### Cài đặt 

```cpp=

```

## 2. Diện tích đa giác

Ta đã biết rằng, đa giác là một đường gấp khúc khép kín. Trong lập trình, một đa giác sẽ được biểu diễn bằng một dãy các đỉnh liên tiếp nhau $A_1, A_2, A_3, \dots, A_n$ với tọa độ xác định trên hệ tọa độ Descartes.

Khi đó, ***diện tích đại số*** (có thể âm hoặc dương) của một đa giác không tự cắt được tính bằng công thức:

$$S = \frac{(x_1 - x_2)(y_1 + y_2) + (x_2 - x_3)(y_2 + y_3) + \cdots + (x_n - x_1)(y_n + y_1)}{2}$$

Và diện tích của đa giác sẽ chính bằng giá trị $|S|$.

Việc xét diện tích đại số của đa giác có thể giúp chúng ta xác định được các đỉnh của đa giác này đang được liệt kê theo chiều nào. Nếu diện tích đại số là số dương ($S > 0$) thì dãy các đỉnh được liệt kê theo chiều ngược chiều kim đồng hồ (và ngược lại).

### Cài đặt

```cpp
// Tính diện tích đa giác với dãy đỉnh truyền vào bởi một vector kiểu pair.
double polygon_area(vector < pair < double, double > > vertices)
{
    // Thêm đỉnh đầu tiên vào cuối vector để xét tích cuối cùng trên tử số.
    vertices.push_back(vertices[0]);
	
    int n = vertices.size() - 1;
    double area = 0;
    for (int i = 0; i <= n; ++i)
        area += (vertices[i].first - vertices[i + 1].first) 
		 * (vertices[i].second + vertices[i + 1].second);
		 
    return abs(area) / 2.0;
}
```

# IV. Một số công thức biến đổi tọa độ

## 1. Phép tịnh tiến

Xét một phép tịnh tiến theo vector $(a, b)$. Phép tịnh tiến này sẽ biến một điểm $O(0, 0)$ thành điểm $O'(a, b),$ điểm $I(1, 0)$ sẽ biến thành điểm $I'(a + 1, b)$ và điểm $J(0, 1)$ sẽ biến thành điểm $J'(a, b + 1)$. 

Tổng quát, phép tịnh tiến theo vector $(a, b)$ sẽ biến điểm $(x, y)$ thành điểm $(\overline{x}, \overline{y});$ trong đó:

$$\begin{cases}\overline{x} = x + a \\ \overline{y} = y + b \end{cases}$$

## 2. Phép quay

Cho trước điểm $A(x, y);$ để quay điểm $A$ ngược chiều kim đồng hồ một góc $\alpha$ quanh gốc tọa độ, ta sử dụng công thức:

$$\begin{cases}x' = x \cos \alpha - y \sin \alpha \\ y' = y \sin \alpha + y \cos \alpha\end{cases}$$

Tuy nhiên, cần lưu ý trong các ngôn ngữ lập trình, số đo góc sử dụng trong các hàm lượng giác sẽ là radian (rad) chứ không phải độ, do đó các bạn cần lưu ý công thức chuyển đổi giữa hai đơn vị này:

$$\pi \ rad = 180° \Rightarrow \begin{cases} rad = \frac{\text{độ} \times \pi}{180} \\ \text{độ} = \frac{rad \times 180}{\pi} \end{cases} $$

Ngoài ra, chúng ta cũng có thể xây dựng công thức quay một điểm $A$ quanh một điểm $C$ bất kì khác gốc tọa độ, bằng cách tịnh tiến hệ tọa độ sao cho điểm $C$ trùng với gốc tọa độ, rồi lại thực hiện phép quay như đã nêu ở trên.

### Ví dụ

Cho $2$ điểm $A(1,4)$ và $C(2,2),$ để quay $A$ ngược chiều kim đồng hồ một góc $45°$ quanh $C,$ ta thực hiện như sau:
- **Bước 1:** Tịnh tiến hệ tọa độ sao cho $C$ trùng với gốc tọa độ. Lúc này, điểm $A$ có tọa độ mới là $A′=(1−2,4−2)=(−1,2)$.
- **Bước 2:** Quay $A′$ ngược chiều kim đồng hồ một góc $45°$ quanh gốc tọa độ được điểm $B′$:
    $$\begin{cases} x_{B'} = -1.\cos 45° - 2.\sin 45° = -\frac{3\sqrt{2}}{2} \\ y_{B'} = -1.\sin 45° + 2.\cos 45° = \frac{\sqrt{2}}{2}\end{cases}$$
- **Bước 3:** tịnh tiến hệ tọa độ về vị trí ban đầu. Điểm $B′$ có tọa độ mới là:
$B=(−32–\sqrt{2}+2,2–\sqrt{2}+2)$.

Vậy quay $A(1,4)$ ngược chiều kim đồng hồ một góc $45°$ quanh $C(2,2),$ ta được điểm $B(−32–\sqrt{2}+2,2–\sqrt{2}+2)$.

![](https://i.imgur.com/HmMSGlS.png)

### Cài đặt

```cpp
struct Point 
{
    double x, y;
    Point() { x = y = 0.0; }
    Point(double x, double y) : x(x), y(y) {}

    Point operator + (const Point &a) const { return Point(x + a.x, y + a.y); }
    Point operator - (const Point &a) const { return Point(x - a.x, y - a.y); }
    Point operator * (double k) const { return Point(x * k, y * k); }
    Point operator / (double k) const { return Point(x / k, y / k); }
};

Point rotations(Point A, Point C, double rad) 
{
    Point A2 = A - C;
    Point B2 = Point(A2.x * cos(rad) - A2.y * sin(rad), A2.x * sin(rad) + A2.y * cos(rad));
    Point B = B2 + C;
	
    return B;
}
```

## 3. Phép đối xứng

Để lấy đối xứng một điểm $X$ qua một đường thẳng (trục đối xứng), ta tìm giao điểm $Y$ của trục đối xứng và đường thẳng vuông góc với trục đối xứng đi qua $X,$ sau đó lấy $X′$ đối xứng với X qua $Y$.

### Ví dụ

Cho điểm $X(1, -3)$ và đường thẳng $(d): 4x - 3y = -5;$ để tìm điểm $X'$ đối xứng với $X$ qua $(d),$ ta thực hiện như sau:
- **Bước 1:** Gọi đường thẳng đi qua $X$ và vuông góc với trục đối xứng có dạng $(d'): 3x + 4y = D$.
- **Bước 2:** Để tìm $D,$ ta thay tọa độ của $X$ vào phương trình: 
    $$3.1 + 4.(-3) = D \Leftrightarrow D = -9 \Leftrightarrow (d'): 3xx + 4y = -9$$
- **Bước 3:** Xác định giao điểm $Y$ của hai đường thẳng $(d)$ và $(d')$:
    $$\begin{cases}x_Y = \frac{B_2C_1 - B_1C_2}{A_1B_2 - A_2B_1} = \frac{4.(-5) - (-3).(-9)}{4.4 - 3.(-3)} = \frac{-47}{25} = -1.88 \\ y_Y = \frac{A_1C_2 - A_2C_1}{A_1B_2 - A_2B_1} = \frac{4.(-9) - 3.(-5)}{4.4 - 3.(-3)} = \frac{-21}{25} = -0.84 \end{cases}$$
- **Bước 4:** Xác định $X'$ đối xứng với $X$ qua $(d)$ bằng công thức: $X' = 2Y - X$ (bởi vì $Y$ là trung điểm của đoạn nối $XX'$ nên $X + X' = 2Y$):
    $$\begin{cases}x_{X'} = 2x_Y - x_X = 2.(-1.88) - 1 = -4.76 \\ y_{X'} = 2y_Y - y_X = 2.(-0.84) - (-3) = 1.32\end{cases}$$
	
*Hình minh họa:*

![](https://i.imgur.com/jBB9Aw5.png)

### Cài đặt

```cpp
struct Point 
{
    double x, y;
    Point() { x = y = 0.0; }
    Point(double x, double y) : x(x), y(y) {}

    Point operator + (const Point &a) const { return Point(x + a.x, y + a.y); }
    Point operator - (const Point &a) const { return Point(x - a.x, y - a.y); }
    Point operator * (double k) const { return Point(x * k, y * k); }
    Point operator / (double k) const { return Point(x / k, y / k); }
};

// Ax + By = C.
struct Line 
{ 
    double a, b, c;
    Line(double a = 0, double b = 0, double c = 0) : a(a), b(b), c(c) {}
};

Point intersect(Line d1, Line d2) 
{
    double det = d1.a * d2.b - d2.a * d1.b;
    // det != 0 because d1 is perpendicular to d2
    return Point((d2.b * d1.c - d1.b * d2.c) / det, (d1.a * d2.c - d2.a * d1.c) / det);
}

Point symmetry(Point X, Line d) 
{
    // the equation of a perpendicular line has the form: -Bx + Ay = D.
    double D = -d.b * X.x + d.a * X.y;
    Line d2 = Line(-d.b, d.a, D);
    Point Y = intersect(d, d2);
    Point X2 = Point(2 * Y.x - X.x, 2 * Y.y - X.y);
	
    return X2;
}
```

# V. Tài liệu tham khảo

- Tài liệu giáo khoa chuyên Tin quyển 2 - Thầy Hồ Sĩ Đàm.
- https://en.wikipedia.org/wiki/Computational_geometry
- https://vnoi.info/wiki/algo/geometry/basic-geometry-2.md