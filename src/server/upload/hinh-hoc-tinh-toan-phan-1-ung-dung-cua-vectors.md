# I. Lời nói đầu

Như các bạn đã biết, trong chương trình Toán phổ thông, chúng ta đã được nghiên cứu khá nhiều về các bài toán liên quan tới chủ đề Hình học. Tuy nhiên, không chỉ trong môn Toán, mà trong môn Tin học, các bài toán Hình học cũng là một chủ đề khá quen thuộc, thậm chí còn "khó nhai" trong các kì thi lập trình. Hình học tính toán (Computational Geometry) là một nhánh của ngành Khoa học máy tính, chuyên nghiên cứu về thuật toán giải quyết các bài toán liên quan tới đối tượng hình học. Trong Toán học và Công nghệ hiện đại, hình học tính toán có ứng dụng rất rộng rãi trong nhiều lĩnh vực như đồ họa máy tính, thiết kế, mô phỏng,...

Chính vì tầm quan trọng của chủ đề này, mà trong series bài viết sau đây, tôi sẽ giới thiệu tới các bạn những khái niệm từ cơ bản tới nâng cao về hình học tính toán thường xuất hiện trong các kì thi lập trình, sau đó khảo sát một số bài toán và thuật toán căn bản. Những công thức hình học thường được thừa nhận không chứng minh, để giúp cho người đọc nhanh chóng nắm bắt ý tưởng (và thực ra việc chứng minh cũng không quá cần thiết trong lập trình :3).

# II. Các khái niệm cơ bản thường dùng

## 1. Vector

Vector là một đối tượng có cả độ lớn và hướng. Hướng của vector là hướng từ điểm đầu đến điểm cuối của nó.

![](https://i.imgur.com/cnYcsXy.png)

Một vector thường được biểu diễn bằng một tia (một đoạn thẳng có hướng), hoặc bằng đồ thị dưới dạng một mũi tên nối từ điểm đầu $A$ tới điểm cuối $B,$ và được ký hiệu là $\overrightarrow{AB}$.

![](https://i.imgur.com/3irzdE9.png)

## 2. Hệ tọa độ Descartes

Đây là khái niệm rất căn bản, thường được biết đến với tên gọi quen thuộc là hệ trục tọa độ $Oxy,$ hệ tọa độ hai chiều,...

Trong mặt phẳng, ta chọn một điểm $O$ và hai vector đơn vị (vector có độ dài) là $\vec{i}$ và $\vec{j}$ vuông góc với nhau. Khi đó, bộ ba $(O, \vec{i}, \vec{j})$ được gọi là ***Hệ tọa độ Descartes*** vuông góc, hay còn gọi là một mục tiêu Euclid hai chiều, một mục tiêu trực chuẩn.

Ta kí hiệu mục tiêu đó là $Oxy$ với $Ox$ và $Oy$ là hai tia gốc $O$ có vector chỉ phương lần lượt là $\vec{i}$ và $\vec{j}$.

![](https://i.imgur.com/KntxosL.png)

<div align="center">
    
*Mục tiêu Euclid*
</div>

Điểm $O$ được gọi là gốc tọa độ, đường thẳng $Ox$ được gọi là ***trục hoành*** và $Oy$ được gọi là ***trục tung.***

Ngoài ra, hệ tọa độ Descartes cũng có thể được phát triển trên không gian ba chiều, bằng cách sử dụng thêm một vector đơn vị $\vec{k}$ có chiều hướng từ dưới lên trên, sau đó dùng một tia $Oz$ có vector chỉ phương chính là $\vec{k}$.

![](https://i.imgur.com/F60KRvZ.png)

<div align="center">
    
*Hệ trục tọa độ Descartes trong không gian 3 chiều*
</div>

## 3. Tọa độ 

### Tọa độ của vector 

Xét mặt phẳng trực chuẩn $(O, \vec{i}, \vec{j}),$ với một vector $\vec{v}$ bất kì của mặt phẳng, thì sẽ tồn tại duy nhất một cặp số thực $(x, y)$ sao cho $\vec{v} = x.\vec{i} + y.\vec{j}$. Cặp số $(x, y)$ khi đó được gọi là tọa độ của vector $\vec{v}$ trong mặt phẳng trực chuẩn, kí hiệu là $\vec{v} = (x, y)$ hoặc $\vec{v}(x, y)$.

### Tọa độ của điểm

Xét mặt phẳng trực chuẩn $(O, \vec{i}, \vec{j}),$ ta lấy một điểm $M$. Khi đó tọa độ $(x, y)$ của vector $\overrightarrow{OM}$ được gọi là tọa độ của điểm $M,$ kí hiệu $M = (x, y)$ hoặc $M(x, y)$.

Để tìm tọa độ của điểm trong hệ trục tọa độ không gian ba chiều, ta cũng làm theo cách hoàn toàn tương tự, chỉ cần bổ sung thêm cao độ của điểm $M$ theo trục $Oz$.

### Liên hệ giữa tọa độ của vector và tọa độ của điểm

Trong hình học phẳng, vector $\overrightarrow{AB}$ có thể được biểu diễn bằng một cặp số $(x,y)$ cho biết tọa độ của vector, được xác định bằng hiệu các tọa độ tương ứng của điểm cuối $B$ với điểm đầu $A$:

$$\begin{cases}x = x_B - x_A \\ y = y_B - y_A \end{cases}$$

Lấy ví dụ, một vector từ $A(3,1)$ đến $B(2,3)$ có thể được biểu diễn bởi $\vec{u}=(−1,2)$.

![](https://i.imgur.com/5ddR4P4.gif)

## 4. Một số phép toán với vector

### 3.1. Độ lớn của vector

Độ lớn của một vector được xác định bằng khoảng cách giữa điểm đầu và điểm cuối của nó. Giả sử ta có vector $\overrightarrow{AB} = (x, y)$ trong mặt phẳng tọa độ hai chiều, thì độ lớn của nó, kí hiệu là $|\overrightarrow{AB}|$ sẽ được xác định dựa trên định lý Pythagoras như sau:

![](https://i.imgur.com/qiJCpuL.png)

### 3.2. Phép cộng hai vector

Với hai vector $\vec{u} = (x_1, y_1)$ và $\vec{v} = (x_2, y_2),$ tổng của $\vec{u}$ và $\vec{v}$ được tính bằng công thức:

$$\vec{u} + \vec{v} = (x_1 + x_2, y_1 + y_2)$$

![](https://i.imgur.com/PYkqiVG.gif)

Phép cộng vector cũng có tính chất giao hoán. Nếu như biểu diễn hình học, thì vector tổng của $\vec{u}$ và $\vec{v}$ chính là đường chéo của hình bình hành dựng từ hai vector ban đầu trên mặt phẳng tọa độ. Do đó quy tắc tính tổng hai vector còn gọi là quy tắc hình bình hành.

![](https://i.imgur.com/oeDvePV.png)

### 3.3. Phép trừ hai vector

#### Vector đối

Trước tiên, ta cùng tìm hiểu khái niệm về ***vector đối.***

Cho vector $\vec{a},$ một vector có cùng độ lớn nhưng ngược hướng với $\vec{a}$ được gọi là vector đối của $\vec{a},$ kí hiệu là $-\vec{a}$. Mỗi vector đều có vector đối, chẳng hạn vector đối của $\overrightarrow{AB}$ là $\overrightarrow{BA},$ nghĩa là $-\overrightarrow{AB} = \overrightarrow{BA}$.

![](https://i.imgur.com/kbOM1LZ.png)

Tọa độ của vector đối sẽ bằng số đối của tọa độ vector ban đầu.

#### Hiệu hai vector

Sử dụng khái niệm về vector đối, ta có hiệu của hai vector $\vec{u}$ và $\vec{v}$ chính là tổng của $\vec{u}$ và $-\vec{v}$.

![](https://i.imgur.com/8wD94pq.png)

Nếu 2 vector có chung điểm đầu thì vector hiệu có hướng từ điểm cuối của $\vec{v}$ đến điểm cuối của $\vec{u}$. Ví dụ: $\overrightarrow{OA} − \overrightarrow{OB} = \overrightarrow{BA}$. Nếu hai vector có chung điểm cuối thì vector hiệu có hướng từ điểm đầu của $\vec{u}$ đến điểm đầu của $\vec{v}$. Ví dụ: $\overrightarrow{AO}−\overrightarrow{BO} =\overrightarrow{AB}$.

![](https://i.imgur.com/13Gscpn.png)

### 3.4. Tích vô hướng (dot product)

Hai phép toán khá đặc biệt đối với vector là ***tích vô hướng*** và ***tích có hướng.*** Không giống như cộng và trừ, hai phép toán này hơi khó để tưởng tượng.

***Tích vô hướng*** (còn gọi là ***tích chấm***) có thể biểu diễn bằng cả đại số lẫn hình học. Hai cách biểu diễn này đều tương đương trong hệ tọa độ Descartes.

Theo đại số, tích vô hướng của hai vector là tổng các tích tọa độ tương ứng giữa chúng. Ví dụ, hai vector $\vec{u}(x_1, y_1)$ và $\vec{v}(x_2, y_2)$ có tích vô hướng là: 

$$\vec{u} \cdot \vec{v} = x_1x_2 + y_1y_2$$

Còn theo hình học, tích vô hướng là tích giữa độ lớn của hai vector và $\cos$ của góc hợp giữa chúng. hai vector $\vec{u}(x_1, y_1)$ và $\vec{v}(x_2, y_2)$ có tích vô hướng là: 

$$\vec{u} \cdot \vec{v} = |\vec{u}| \times |\vec{v}| \times \cos{(\theta)}$$

<div align="center">
    
*với $\theta$ là góc hợp bởi $\vec{u}$ và $\vec{v}$*
</div>

![](https://i.imgur.com/5evL5LZ.png)

***Ví dụ:*** Tính tích vô hướng giữa hai vector $\vec{u}(5, 12)$ và $\vec{v}(-6, 8)$:

![](https://i.imgur.com/7p5uvv7.png)

*Tính theo đại số:*

![](https://i.imgur.com/gAdD35A.png)

*Tính theo hình học:*

![](https://i.imgur.com/xfxl0XZ.png)

Từ các định nghĩa về tích vô hướng, ta cũng có thể tính được góc $\theta$ hợp bởi $\vec{u}$ và $\vec{v}$ theo công thức:

![](https://i.imgur.com/MpFUPWX.png)

Ngoài ra, công thức trên không chỉ đúng trong hình học phẳng, mà ta có thể áp dụng tích vô hướng cho các vector có số chiều tùy ý, đẳng thức trên vẫn hoàn toàn chính xác!

### 3.5. Tích có hướng (cross product)

#### Trong không gian ba chiều

***Tích có hướng*** là một phép nhân vector trong không gian ba chiều. Nó khác với tích vô hướng ở chỗ, kết quả thu được sẽ là một vector, nghĩa là đại lượng có hướng. Vector này sẽ vuông góc với mặt phẳng chứa hai vector đầu vào của phép nhân.

Định nghĩa tích có hướng như sau:

$$\vec{a} \times \vec{b} = \vec{n} \cdot |\vec{a}| \cdot |\vec{b}| \cdot \sin(\theta)$$

Trong đó:
- $\theta$ là góc giữa $\vec{a}$ và $\vec{b} \ (0^{\circ} \le \theta \le 180^{\circ})$.
- $\vec{n}$ là vector đơn vị vuông góc với $\vec{a}$ và $\vec{b}$. Thực tế, có tới hai vector thỏa mãn điều kiện vuông góc là $\vec{n}$ và $-\vec{n},$ do đó hướng của $\vec{n}$ phụ thuộc vào quy tắc bàn tay phải, được mô tả như hình vẽ dưới đây:
    ![](https://i.imgur.com/eF2jZfC.png)
    
#### Trong không gian hai chiều

Nếu xét trong hình học phẳng thì vector kết quả lúc này vuông góc và có hướng đi vào/ra mặt phẳng đang xét, do đó ta có thể bỏ qua đặc điểm về hướng, và sử dụng tích có hướng như là một đại lượng vô hướng.

Tương tự tích vô hướng, tích có hướng trong không gian hai chiều cũng có thể được định nghĩa bằng hai cách:
- Theo đại số, tích có hướng giữa hai vector $\vec{u}(x_1, y_1)$ và $\vec{v}(x_2, y_2)$ được định nghĩa bằng công thức:

	![](https://i.imgur.com/E24tRYu.png)

- Theo hình học, tích có hướng giữa hai vector $\vec{u}(x_1, y_1)$ và $\vec{v}(x_2, y_2)$ được định nghĩa bằng công thức: $\vec{u} \times \vec{v} = |\vec{u}| \cdot |\vec{v}| \cdot \sin(\theta);$ với $\theta$ là góc hợp bởi hai vector tính từ $\vec{u}$ tới $\vec{v}$ và ***ngược chiều kim đồng hồ*** (góc này được gọi là ***góc định hướng***). Ta lại biết rằng, với một góc $\alpha$ thỏa mãn $0^{\circ} < \alpha < 180^{\circ}$ thì $\sin(\alpha) > 0$ nên nếu $\theta < 180^{\circ}$ thì tích có hướng dương, ngược lại tích có hướng âm (hoặc có thể xét theo quy tắc: Nếu góc định hướng có chiều ngược kim đồng hồ thì nó mang dấu dương, ngược lại mang dấu âm).

	![](https://i.imgur.com/o4BtQ1X.png)

    Ta cũng suy ra được công thức tính $\sin$ của góc định hướng giữa hai vector $\vec{u}(x_1, y_1)$ và $\vec{v}(x_2, y_2)$ như sau:
	$$\sin{\theta} = \frac{\vec{u} \times \vec{v}}{|\vec{u}|\cdot\vec{v}} = \frac{x_1y_1 - x_2y_2}{\sqrt{(x_1^2 + y_1^2)(x_2^2 + y_2^2)}}$$
	
***Ví dụ:*** Tính tích có hướng của hai vector $\vec{u}(5, 12)$ và $\vec{v}(-6, 8)$:

![](https://i.imgur.com/2fLSFOG.png)

*Tính bằng đại số:*

![](https://i.imgur.com/WwWnWjQ.png)

*Tính bằng hình học:*

![](https://i.imgur.com/NWid6Ps.png)

Ứng dụng quan trọng thứ nhất của tích có hướng trong hình học phẳng là $\vec{a} \times \vec{b} \times \sin(\theta)$ bằng với diện tích của hình bình hành có hai cạnh bên là $\vec{a}$ và $\vec{b}$:

![](https://i.imgur.com/agEB5kl.png)

Do đó, ***diện tích của một tam giác*** còn bằng một nửa giá trị tuyệt đối của tích có hướng với hai vector thành phần là hai cạnh của tam giác (*).

> Một ứng dụng khác của tích có hướng là ***khảo sát chiều:*** Giả sử ta đi từ điểm $A$ sang điểm $B$ theo đường thằng và đi tiếp sang điểm $C$ theo đường thẳng, khi đó:
> - Tích có hướng $\overrightarrow{AB} \times \overrightarrow{BC}$ sẽ là số dương nếu như chỗ rẽ tại $B$ là "rẽ trái" (bẻ góc ngược chiều kim đồng hồ). Đây gọi là công thức CCW.
> - Tích có hướng $\overrightarrow{AB} \times \overrightarrow{BC}$ sẽ là số âm nếu như chỗ rẽ tại $B$ là "rẽ phải" (bẻ góc ngược thuận kim đồng hồ). Đây gọi là công thức CW.
> - Tích có hướng $\overrightarrow{AB} \times \overrightarrow{BC}$ sẽ bằng $0$ nếu như ba điểm $A, B, C$ thẳng hàng. 
> 
> <center>
> 
> ![](https://i.imgur.com/rVdlkxg.png)
> 
> *Rẽ trái và rẽ phải*
> </center>
> 
> Các công thức nói trên tưởng chừng như vô dụng, nhưng chúng sẽ rất có ý nghĩa trong một số thuật toán cụ thể, chẳng hạn như thuật toán tìm Bao lồi (sẽ nói tới ở một chuyên đề khác).

## 5. Khoảng cách giữa các điểm và đường thẳng

### Tìm khoảng cách giữa hai điểm trên mặt phẳng hai chiều

Đây là công thức rất quan trọng, thường xuyên xuất hiện trong các bài toán về hình học. Để tính khoảng cách giữa hai điểm $A(x_1, y_1)$ và $B(x_2, y_2)$ trên mặt phẳng tọa độ, ta sử dụng công thức sau:

$$d(A, B) = \sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}$$

Công thức trên còn được gọi là ***công thức khoảng cách Euclid,*** để phân biệt với ***công thức khoảng cách Mahattan.***

### Tìm khoảng cách giữa một điểm và một đường thẳng trên mặt phẳng hai chiều

Tìm khoảng cách giữa điểm và đường thẳng cũng là một vấn đề rất thường gặp trong các bài toán hình học.

![](https://i.imgur.com/feGGg52.png)

<div align="center">
    
*Hình 1: Khoảng cách giữa điểm và đường thẳng*
</div>

Lấy ví dụ, ta có ba điểm $A, B, C$ và cần tìm khoảng cách từ $C$ đến đường thẳng đi qua $A$ và $B$. Bước đầu tiên, các bạn hãy tính hai vector $\overrightarrow{AB}$ và $\overrightarrow{AC}$. Sau đó, ta tính tích có hướng $\overrightarrow{AB} \times \overrightarrow{AC},$ lấy giá trị tuyệt đối của kết quả rồi chia cho $AB$. Kết quả thu được chính là khoảng cách cần tìm.

> ***Chứng minh:*** 
> Xét $\Delta ABC,$ đặt $h$ là đường cao kẻ từ $C$ (khoảng cách từ $C$ tới $AB$) và đáy tương ứng là $AB$. Ta có công thức:
> $$S_{\Delta ABC} = \frac{h.AB}{2} \Leftrightarrow 2S_{\Delta ABC} = h.AB (1)$$
> Mà theo nhận định (*) ở mục 3.5, thì diện tích một tam giác bằng một nửa giá trị tuyệt đối của tích có hướng với hai vector thành phần là hai cạnh của tam giác, tức là: 
> $$2S_{\Delta ABC} = |\overrightarrow{AB} \times \overrightarrow{AC}| \ (2)$$
> Từ $(1)$ và $(2)$ suy ra:
> $$h = \frac{|\overrightarrow{AB} \times \overrightarrow{AC}|}{AB}$$

Nhưng nếu ta chỉ muốn tìm khoảng cách từ ***đoạn thẳng*** $AB$ tới điểm $C$ thay vì cả đường thẳng thì sao? Trong trường hợp này, ta cần tìm khoảng cách từ $C$ tới điểm gần nó nhất trên đoạn thẳng $AB,$ mà điểm gần nhất có thể là một trong hai đầu mút của đoạn thẳng thay vì là một điểm nào đó trên đường thẳng. Trong hình 1 ở trên, điểm gần $C$ nhất trên đường thẳng $AB$ không nằm giữa $A$ và $B$ mà là nằm tại $B$.

Có vài cách khác nhau để xử lý trường hợp này, một trong số đó là tích vô hướng. Đầu tiên, kiểm tra xem điểm gần nhất trên đường thẳng $AB$ có ra khỏi $B$ hay không bằng cách tính $\overrightarrow{BA} \cdot \overrightarrow{BC}$. Nếu tích này âm, nghĩa là góc giữa $\overrightarrow{BA}$ và $\overrightarrow{BC}$ là góc tù (do với góc $\alpha$ thỏa mãn $90°< \alpha <270°$ thì $\cos(α)<0$), do đó điểm gần $C$ nhất trên đoạn $AB$ sẽ là $B$.

Tương tự, nếu $\overrightarrow{AB} \cdot \overrightarrow{AC}$, điểm gần $C$ nhất là $A$. Nếu cả hai tích vô hướng đều lớn hơn hoặc bằng $0,$ thì điểm gần $C$ nhất sẽ nằm giữa $A$ và $B$.

#### Cài đặt

```cpp
// Struct lưu vector và định nghĩa một số phép toán: Tích chấm, tích chéo, độ dài.
struct Vector
{
    double x, y;
    
    Vector(double _x, double _y)
    {
        x = _x;
        y = _y;
    }
	
    double dot_product(const Vector &other)
    {
        return x * other.x + y * other.y;
    }
	
    double cross_product(const Vector &other)
    {
        return x * other.y - y * other.x;
    }
	
    double length() const
    {
        return sqrt(x * x + y * y);
    }
}

typedef Vector Point;

// Tính vector AB = B - A.
Vector operator - (const Point &B, const Point &A) 
{ 
    return Vector(B.x - A.x, B.y - A.y);
}

// Nếu is_segment = true tức là AB là một đoạn thẳng thay vì đường thẳng.
double line_point_dist(const Point &A, const Point &B, const Point &C, bool is_segment) 
{
    double dist = abs((B - A).cross_product(C - A)) / (A - B).length();
	
    if (is_segment) 
    {
        double dot1 = (A - B).dot_product(C - B);
        if (dot1 < 0) 
            return (B - C).length();
			
        double dot2 = (B - A).dot_product(C - A);
        if (dot2 < 0) 
            return (A - C).length();
    }
	
    return dist;
}
```

# III. Luyện tập

Các bạn có thể tham khảo contest <a href="https://codeforces.com/gym/100168">Codeforces Gym 100168</a>, một contest gồm toàn các bài tập liên quan tới hình học (mặc dù tiếng Nga nhưng rất ngắn gọn nên có thể dùng Google Dịch được ngay).

Một số bài tập có liên quan đến nội dung bài viết này có thể tóm tắt như sau:
- Codeforces Gym - 100168L: Tính độ dài (độ lớn) vector.
- Codeforces Gym - 100168D: Tính diện tích tam giác.
- CSES - Polygon Area: tính diện tích đa giác
Codeforces Gym - 100168F: Tính khoảng cách từ 1 điểm đến một đường thẳng có dạng $ax+by+c=0$.
- Codeforces Gym - 100168G: Tính khoảng cách từ một điểm đến một đường thẳng đi qua hai điểm
- Codeforces Gym - 100168H: Tính khoảng cách từ một điểm đến một tia.
- Codeforces Gym - 100168I: Tính khoảng cách từ một điểm đến một đoạn thẳng.

# IV. Tài liệu tham khảo

- https://vnoi.info/wiki/algo/geometry/basic-geometry-1.md#trong-kh%C3%B4ng-gian-2-chi%E1%BB%81u-m%E1%BA%B7t-ph%E1%BA%B3ng
- Tài liệu giáo khoa chuyên Tin quyển 2 - Thầy Hồ Sĩ Đàm.
- https://en.wikipedia.org/wiki/Computational_geometry