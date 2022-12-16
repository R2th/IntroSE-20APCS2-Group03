# I. Cây

## 1. Định nghĩa cây và các khái niệm quan trọng

Trong chuyên đề này, cấu trúc dữ liệu mà chúng ta quan tâm đến là ***Cấu trúc cây***. Thực tế, các bài toán dùng trực tiếp cây có rất ít, kèm theo sự phát triển của các ngôn ngữ lập trình khiến cho việc cài đặt thủ công những cấu trúc dữ liệu theo mô hình cây không còn cần thiết nữa. Vì vậy, mục tiêu của tôi là giới thiệu tới các bạn những khái niệm căn bản về cây, chủ yếu là để phục vụ cho các cấu trúc dữ liệu phức tạp hơn sau này mà dựa trên mô hình cây (chẳng hạn như Interval Tree hay Binary Indexed Tree,...).

Cây là một cấu trúc dữ liệu gồm một tập hữu hạn các ***nút (nodes),*** giữa các nút có một quan hệ phân cấp gọi là quan hệ "cha - con". Có một nút đặc biệt trên cây gọi là ***nút gốc (root).***

Cây cũng là một đối tượng có thể định nghĩa đệ quy:

- Mỗi nút là một cây, nút đó cũng là gốc của cây ấy.
- Nếu $n$ là một nút và $n_1, n_2, \dots, n_k$ lần lượt là gốc của các cây $T_1, T_2, \dots, T_k$ sao cho các cây này đôi một không có nút chung. Thì nếu cho nút $n$ trở thành nút cha của các nút $n_1, n_2, \dots, n_k$ ta sẽ thu được một cây mới $T$. Cây này có nút gốc là $n,$ còn các cây $T_1, T_2, \dots, T_k$ trở thành các ***cây con (subtree)*** của gốc.

Ngoài ra, người ta còn quy ước có tồn tại cây không có nút nào, gọi là ***cây rỗng (null tree).***

Hình vẽ dưới đây minh họa một cây:

![](https://cdn.ucode.vn/uploads/2247/upload/eOgPsQvc.png)

Trên cây này, chúng ta có một số khái niệm sau:

- Nút $A$ là cha của các nút $B, C, D;$ còn $G, H, I$ là các nút con của nút $D$.
- Số các con của một nút được gọi là ***cấp của nút*** đó. chẳng hạn, cấp của nút $A$ là $3,$ cấp của nút $B$ là $2, \dots$
- Nút có cấp bằng $0$ được gọi là ***nút lá (hay nút tận cùng).*** Những nút không phải lá được gọi là các ***nút nhánh.*** Trong cây trên, các nút $E, F, C, G, J, K, I$ là các nút lá, còn lại là nút nhánh.
- Cấp cao nhất của một nút trên cây gọi là ***cấp của cây*** đó. Cây ở hình trên có cấp bằng $3$.
- Các nút trên cây được chia thành nhiều ***mức***, mỗi nút sẽ được gán một số nguyên gọi là ***mức của nút***. Nút gốc của cây có quy ước mức bằng $1,$ sau đó nếu nút cha có mức là $i$ thì nút con sẽ có mức là $i + 1$. Chẳng hạn, nút $A$ có mức là $1;$ các nút $B, C, D$ có mức là $2;\dots$
- ***Chiều cao (hay chiều sâu)*** của cây là số mức lớn nhất của nút trên cây đó. Cây trên có chiều cao là $4$.
- Một tập hợp các cây phân biệt được gọi là ***rừng***. Một cây nếu bỏ đi nút gốc thì sẽ tạo ra một rừng các cây con.

## 2. Cây nhị phân

### 2.1. Định nghĩa và tính chất của cây nhị phân

Cây nhị phân là một dạng quan trọng của cấu trúc cây. Rất nhiều cấu trúc dữ liệu được thiết kế dựa trên mô hình cây nhị phân như Heap, Interval Tree hay Binary Indexed Tree,...Đặc điểm của cây nhị phân là mọi nút trên cây chỉ có tối đa hai nhánh con, phân ra làm nhánh con trái và nhánh con phải. 

![](https://cdn.ucode.vn/uploads/2247/upload/FuYfKCJc.png)

Cây nhị phân có một số dạng đặc biệt cần lưu ý:

- ***Cây nhị phân suy biến (degenerate binary tree):*** Các nút không phải là lá chỉ có một nhánh con. Có thể có ba dạng của cây nhị phân suy biến: ***Cây lệch trái (a), cây lệch phải (b)*** và ***cây ziczac (c).***

    ![](https://cdn.ucode.vn/uploads/2247/upload/vSHnNgTg.png)

- ***Cây nhị phân hoàn chỉnh (complete binary tree):*** Xét cây có chiều cao là $h,$ nếu mọi nút có mức nhỏ hơn $h - 1$ đều có đúng hai nút con thì đó là một cây nhị phân hoàn chỉnh.

    ![](https://cdn.ucode.vn/uploads/2247/upload/yoZYbKGm.png)

- ***Cây nhị phân đầy đủ (full binary tree):*** Mọi nút có mức nhỏ hơn hoặc bằng $h - 1$ đều có đúng $2$ nút con. Đây có thể xem là trường hợp đặc biệt của cây nhị phân hoàn chỉnh.

    ![](https://cdn.ucode.vn/uploads/2247/upload/RhqpmRlW.png)

Cây nhị phân có một số tính chất sau đây:

- Trong các cây nhị phân có cùng số lượng nút như nhau thì cây nhị phân suy biến có chiều cao lớn nhất, còn cây nhị phân hoàn chỉnh có chiều cao nhỏ nhất.
- Số lượng nút tối đa trên mức $i$ của cây nhị phân là $2^{i - 1},$ tối thiểu là $1 \ (i \ge 1)$.
- Số lượng nút tối đa trên một cây nhị phân có chiều cao $h$ là $2^h - 1,$ tối thiểu là $h \ (h \ge 1)$. 
- Cây nhị phân hoàn chỉnh có $n$ nút thì chiều cao của nó là $h = \left\lfloor{\log_2(n)}\right\rfloor + 1$.

### 2.2. Biểu diễn cây nhị phân

Để biểu diễn cây nhị phân, cách phổ biến nhất là sử dụng mảng.

Đối với một cây nhị phân đầy đủ, ta có thể đánh số cho các nút của cây theo thứ tự lần lượt từ mức $1,$ hết mức này tới mức khác và từ trái qua phải đối với các nút ở mỗi mức:

![](https://cdn.ucode.vn/uploads/2247/upload/fnNLPnIj.png)

<div align="center">
    
*Hình 1: Đánh số các nút trên cây*
</div>

Đánh số theo cách này thì con của nút thứ $i$ sẽ là các nút thứ $2i$ và $2i + 1;$ cha của nút thứ $i$ là nút thứ $\left\lfloor{\frac{i}{2}}\right\rfloor$. Như vậy ta có thể sử dụng một mảng $\text{tree}$ để biểu diễn cây, nút thứ $i$ của cây được lưu trữ bằng phần tử $\text{tree}[i]$.

Chẳng hạn với cây ở hình bên trên, thì mảng $\text{tree}$ sẽ như sau:

![](https://cdn.ucode.vn/uploads/2247/upload/jGSHyrWx.png)

Tuy nhiên, cách lưu trữ này có một nhược điểm là trong trường hợp cây nhị phân không đầy đủ, thì trên mảng sẽ tồn tại rất nhiều vị trí trống, gây lãng phí bộ nhớ. Nhưng với khả năng lưu trữ của máy tính hiện nay thì vấn đề này không quá quan trọng, nên cách sử dụng mảng vẫn rất được ưu tiên trong các bài toán lập trình sử dụng cây.

### 2.3. Các phép duyệt cây nhị phân

Phép thăm (visit) các nút trên cây theo một hệ thống sao cho mỗi nút chỉ được thăm một lần gọi là ***phép duyệt cây.*** Coi rằng một nút nếu như không có nút con trái hoặc nút con phải thì ta sẽ tạo một nút giả là con của nó, nếu một cây rỗng thì ta cũng tạo một nút giả làm gốc của nó. Khi đó, có ba cách duyệt cây thường được sử dụng:

#### Duyệt theo thứ tự trước (preorder traversal)

Khi duyệt cây theo thứ tự trước, thì một nút bất kì sẽ luôn được thăm trước hai nút con của nó. Mã giả có thể mô tả như sau:

```python=
# Duyệt nhánh cây có n là nút gốc của nhánh.
def visit(n):
    # Nếu n không phải một nút rỗng thì thăm con của nó.
    if not empty(n):
        {In_ra_giá_trị_nút_n} 
        visit({Nút_con_trái_của_n})
        visit({Nút_con_phải_của_n})
```

Quá trình thăm cây sẽ bắt đầu bằng việc gọi `visit({Nút_gốc_cây})`. Xét cây ở hình $1,$ các nút trên cây sẽ được thăm theo thứ tự:

<div align="center">
    
$A, B, C, D, E, F, G$
</div>

#### Duyệt theo thứ tự giữa (inorder traversal)

Khi duyệt cây theo thứ tự giữa, thì một nút bất kỳ sẽ được thăm sau nút con trái và thăm trước nút con phải của nó. Mã giả có thể mô tả như sau:

```python=
# Duyệt nhánh cây có n là nút gốc của nhánh.
def visit(n):
    # Nếu n không phải một nút rỗng thì thăm con của nó.
    if not empty(n):
        visit({Nút_con_trái_của_n})
        {In_ra_giá_trị_nút_n} 
        visit({Nút_con_phải_của_n})
```

Quá trình thăm cây sẽ bắt đầu bằng việc gọi `visit({Nút_gốc_cây})`. Xét cây ở hình $1,$ các nút trên cây sẽ được thăm theo thứ tự:

<div align="center">
    
$C, B, D, A, F, E, G$
</div>

#### Duyệt theo thứ tự sau (postorder traversal)

Khi duyệt cây theo thứ tự sau, thì một nút bất kì sẽ được thăm sau hai nút con của nó. Mã giả có thể mô tả như sau:

```python=
# Duyệt nhánh cây có n là nút gốc của nhánh.
def visit(n):
    # Nếu n không phải một nút rỗng thì thăm con của nó.
    if not empty(n):
        visit({Nút_con_trái_của_n})
        visit({Nút_con_phải_của_n})
        {In_ra_giá_trị_nút_n} 
```

Quá trình thăm cây sẽ bắt đầu bằng việc gọi `visit({Nút_gốc_cây})`. Xét cây ở hình $1,$ các nút trên cây sẽ được thăm theo thứ tự:

<div align="center">
    
$C, D, B, F, G, E, A$
</div>

# II. Biểu diễn biểu thức số học bằng cây nhị phân

Có rất rất nhiều những ứng dụng khác nhau của cấu trúc cây trong cuộc sống cũng như trong Tin học. Chẳng hạn như mục lục của các cuốn sách, tổ chức thư mục trên máy tính,...Trong phần này, tôi sẽ giới thiệu tới các bạn một ứng dụng rất quan trọng của cây trong các bài toán Tin học, đó là biểu diễn các biểu thức số học.

## 1. Kí pháp trung tố, tiền tố và hậu tố

Một biểu thức số học gồm các phép toán hai ngôi bằng một cây nhị phân, trong đó các nút lá biểu thị các hằng hoặc biến (toán hạng), còn các nút không phải lá biểu thị các toán tử hai ngôi (những phép toán như cộng, trừ, nhân, chia, đồng dư, lũy thừa,...phải có hai toán hạng thì gọi chung là phép toán hai ngôi). Mỗi phép toán trong một nút sẽ tác động lên hai biểu thức con nằm ở cây con bên trái và cây con bên phải của nó. 

Chẳng hạn, biểu thức $(6 + 5) \times (7 \div 2 - 4)$ có thể được biểu diễn bằng cây nhị phân dưới đây:

![](https://cdn.ucode.vn/uploads/2247/upload/EMWcfUUZ.png)

Trong cuộc sống hàng ngày, chúng ta vẫn thường viết các biểu thức số học theo dạng toán tử ở giữa hai toán hạng. Nhưng thực tế, có tới ba dạng kí pháp được sử dụng để biểu diễn các biểu thức số học. Với cây nhị phân biểu diễn biểu thức trong hình trên, ta có:

- Nếu duyệt cây theo thứ tự trước, ta sẽ thu được biểu thức $\times + 6 \ 5 - \div 7 \ 2 \ 4$. Đây là ***dạng tiền tố (prefix)*** của biểu thức, hay còn gọi là ***kí pháp Ba Lan.*** Trong dạng này, toán tử được viết trước hai toán hạng tương ứng.
- Nếu duyệt cây theo thứ tự giữa, ta sẽ thu được biểu thức $6 + 5 \times 7 \div 2 - 4$. Kí pháp này sẽ chưa đúng với biểu thức ban đầu do thiếu các dấu ngoặc. Đây gọi là ***dạng trung tố (infix)*** của biểu thức. Ở dạng này, nếu như thêm vào quá trình duyệt việc bổ sung các cặp dấu ngoặc vào mỗi biểu thức con, thì ta sẽ thu được biểu thức đầy đủ là $((6 + 5) \times ((7 \div 2) - 4))),$ nhưng thực ra chỉ cần thêm đủ dấu ngoặc để biểu thức chính xác là được.
- Nếu duyệt cây theo thứ tự sau, ta sẽ thu được biểu thức $6 \ 5 + 7 \ 2 \div 4 - \times$. Đây là ***dạng hậu tố (postfix)*** của biểu thức, còn gọi là ***kí pháp nghịch đảo Ba Lan (RPN)***. Trong kí pháp này, toán tử được viết sau hai toán hạng tương ứng. 

Nếu sử dụng kí pháp tiền tố và hậu tố thì biểu thức không cần có các dấu ngoặc vẫn có thể tính toán bình thường, trong khi kí pháp trung tố buộc phải có dấu ngoặc thì mới tránh được sự mập mờ.

## 2. Chuyển biểu thức từ dạng trung tố sang hậu tố

Đối với máy tính, việc tính toán bằng kí pháp hậu tố sẽ là khoa học hơn, và đơn giản hơn sử dụng kí pháp trung tố (việc không cần sử dụng các dấu ngoặc đã giảm một lượng lớn phép xử lý). Chính vì thế, trên các ngôn ngữ lập trình chúng ta vẫn có thể viết biểu thức dạng trung tố, nhưng trước khi chương trình dịch dịch nó ra mã máy, thì các biểu thức đều sẽ được chuyển về dạng hậu tố. 

Một thuật toán rất hiệu quả để chuyển biểu thức dạng trung tố sang hậu tố là sử dụng ngăn xếp. Dưới đây tôi sẽ trình bày giải thuật đó.

### Ý tưởng

Trước hết ta sẽ phân chia các toán tử theo độ ưu tiên. Trong bài viết này tôi sẽ chỉ xét $5$ loại toán tử: 

- Các toán tử `*` và `/` có độ ưu tiên cao nhất bằng $2$.
- Các toán tử `+` và `-` có độ ưu tiên cao thứ ba bằng $1$.
- Toán tử `(` có độ ưu tiên nhỏ nhất bằng $0$.

Ngoài ra vẫn còn các toán tử `^` (lũy thừa) và `%` (đồng dư), nếu như có những toán tử này trong biểu thức thì các bạn chỉ cần xử lý tương tự.

Tiếp theo, ta sẽ duyệt tuần tự từng phần tử $x$ trong biểu thức trung tố, rồi xử lý như sau:

- Nếu $x$ là dấu ngoặc mở `(` thì đẩy nó vào ngăn xếp.
- Nếu $x$ là dấu ngoặc đóng thì lấy ra các phần tử trong ngăn xếp và đưa nó vào biểu thức hậu tố, cho tới khi lấy ra tới phần tử `(` thì dừng lại.
- Nếu $x$ là các toán tử thì lấy ra các phần tử trong ngăn xếp có độ ưu tiên lớn hơn hoặc bằng $x,$ nối vào biểu thức hậu tố tới khi phần tử ở đỉnh ngăn xếp có độ ưu tiên nhỏ hơn $x$ hoặc ngăn xếp rỗng.
- Nếu $x$ là toán hạng thì nối nó vào biểu thức hậu tố.

Sau khi duyệt xong toàn bộ biểu thức, nếu ngăn xếp vẫn chưa rỗng thì lấy ra các phần tử trong ngăn xếp và đưa vào biểu thức hậu tố.

### Cài đặt

***Ngôn ngữ C++:***

```cpp
// Xét độ ưu tiên của kí tự x.
int priority(char x)
{
    if (x == '*' || x == '/')
        return 2;
    else if (x == '+' || x == '-')
        return 1;
    else if (x == '(')
        return 0;
}

// Chuyển đổi biểu thức trung tố s sang dạng hậu tố.
vector < string > change_to_postfix(string s)
{
    stack < char > st;
    vector < string > postfix;

    int i = 0, n = s.size();
    while (i < n)
    {
        // Nếu s[i] là kí tự ngoặc mở thì đẩy vào ngăn xếp.
        if (s[i] == '(')
        {
            st.push(s[i]);
            ++i;
        }
        // Nếu s[i] là ngoặc đóng thì pop từ stack ra, thêm vào biểu thức hậu tố 
        // tới khi gặp kí tự ngoặc mở. Lưu ý pop cả ngoặc mở ra.
        else if (s[i] == ')')
        {
            while (st.top() != '(')
            {
                postfix.push_back(st.top());   
                st.pop();
            }

            st.pop();   
        }
        // Nếu s[i] là chữ số đầu của một toán hạng thì xử lý để lấy toàn bộ số đó.
        else if (s[i] >= '0' && s[i] <= '9')
        {
            string number;

            while (i < n && s[i] >= '0' && s[i] <= '9')
            {
                number += s[i];
                ++i;
            }

            postfix.push_back(number);
        }
        // Nếu s[i] là toán tử thì xử lý dựa trên độ ưu tiên.
        else
        {
            while (!st.empty() && priority(st.top()) >= priority(s[i]))
            {
                postfix.push_back(st.top());
                st.pop();
            }

            st.push(s[i]);
            ++i;
        }
    }

    // Nếu ngăn xếp vẫn chưa rỗng thì lấy nốt các phần tử ra cho vào biểu thức hậu tố.
    while (!st.empty())
    {
        postfix.push_back(st.top());
        st.pop();
    }

    return postfix;
}
```

***Ngôn ngữ Python:***

```python
# Xét độ ưu tiên của kí tự x.
def priority(x):
    if x == '*' or x == '/':
        return 2
    elif x == '+' or x == '-':
        return 1
    elif x == '(':
        return 0


# Chuyển đổi biểu thức trung tố s sang dạng hậu tố.
def change_to_postfix(s):
    st, postfix = [], []

    i = 0
    while i < len(s):
        # Nếu s[i] là kí tự ngoặc mở thì đẩy vào ngăn xếp.
        if s[i] == '(':
            st.append(s[i])
            i += 1
        # Nếu s[i] là ngoặc đóng thì pop từ stack ra, thêm vào biểu thức hậu tố 
        # tới khi gặp kí tự ngoặc mở. Lưu ý pop cả ngoặc mở ra.
        elif s[i] == ')':
            while st[-1] != '(':
                postfix.append(st[-1])
                st.pop()

            st.pop()
        # Nếu s[i] là chữ số đầu của một toán hạng thì xử lý để lấy toàn bộ số đó.
        elif '0' <= s[i] <= '9':
            number = 0
            while i < len(s) and 0 <= s[i] <= 9:
                number = number * 10 + int(s[i])
                i += 1
            
            postfix.append(number)
        # Nếu s[i] là toán tử thì xử lý dựa trên độ ưu tiên.
        else:
            while len(st) > 0 and priority(st[-1]) >= priority(s[i]):
                postfix.append(st[-1])
                st.pop()

            st.append(s[i])
            i += 1

    # Nếu ngăn xếp vẫn chưa rỗng thì lấy nốt các phần tử ra 
    # rồi cho vào biểu thức hậu tố.
    while len(st) > 0:
        postfix.append(st[-1])
        st.pop()

    return postfix
```

## 3. Tính toán giá trị biểu thức

Khi biểu diễn một biểu thức số học bằng cây nhị phân, thì khi tính toán, máy tính sẽ tính giá trị của biểu thức ở hai nhánh con, rồi mới gộp giá trị của chúng dựa trên toán tử ở nút gốc. Điều này khiến cho việc tính toán bằng cách duyệt cây theo thứ tự sau để tạo ra kí pháp hậu tố trở nên rất hợp lí.

Giữa thế kỉ XX, nhà logic học người Ba Lan Jan Lukasiewicz đã chứng minh được rằng, biểu thức hậu tố không cần phải có dấu ngoặc vẫn có thể tính được đúng đắn bằng cách đọc lần lượt biểu thức từ trái qua phải, và dùng một ngăn xếp để lưu các kết quả trung gian. Dưới đây tôi sẽ trình bày lại thuật toán này.

### Ý tưởng

Trước tiên, chuyển biểu thức trung tố cần tính toán sang dạng hậu tố bằng thuật toán đã nêu ở phần $2$.

Sau đó, duy trì một ngăn xếp để lưu trữ các kết quả trung gian. Ban đầu khởi tạo ngăn xếp rỗng.

Tuần tự đọc biểu thức hậu tố đã chuyển đổi từ trái qua phải. Với mỗi phần tử, ta kiểm tra:

- Nếu phần tử này là một toán hạng thì đẩy nó vào ngăn xếp.
- Nếu phần tử này là một toán tử `x`, thì ta lấy từ ngăn xếp ra hai giá trị $v_1$ và $v_2,$ rồi đẩy giá trị $v_2$ `x` $v_1$ vào lại ngăn xếp (áp dụng toán tử `x` với hai giá trị lấy ra).

Sau khi kết thúc quá trình trên, toàn bộ biểu thức đã được đọc xong. Lúc này trong ngăn xếp chỉ còn lại một giá trị duy nhất, đó chính là giá trị của biểu thức.

### Cài đặt

***Ngôn ngữ C++:***

```cpp=
double get_expression_value(string s)
{
    vector < string > postfix = change_to_postfix(s);
    
    // Stack lưu các toán hạng, kiểu dữ liệu double vì
    // phép chia có thể tạo ra kết quả số thực.
    stack < double > st; 
    for (string e: postfix)
        // Lưu ý: Do các phần tử trong mảng postfix có kiểu dữ liệu là string, 
        // nên khi xử lý các phần tử ta cần phải đặt chúng trong cặp dấu nháy 
        // kép "" thay vì cặp nháy đơn '', nếu không chương trình sẽ bị lỗi.
        if (e == "+" || e== "-" || e== "*" || e== "/" || e == '%')
        {
            double v1 = st.top(); 
            st.pop();
            double v2 = st.top(); 
            st.pop();

            if (e == "+")
                st.push(v2 + v1);
            else if (e == "-")
                st.push(v2 - v1);
            else if (e == "*")
                st.push(v2 * v1);
            else if (e == "/")
                st.push(v2 / v1);
        }
        // Nếu phần tử này là toán hạng, chuyển toàn bộ nó sang số và đưa vào stack.
        else 
        {
            double number = 0;
            for (int j = 0; j < e.size(); ++j)
                number = number * 10 + (e[j] - '0');

            st.push(number);
        }
    }

    // Trả ra kết quả của biểu thức.
    return st.top();
}
```

***Ngôn ngữ Python:***

```python=
def get_expression_value(s):
    postfix = change_to_postfix(s)

    st = []
    for e in postfix:
        # Nếu phần tử này là toán tử thì sử dụng nó với hai toán hạng ở đỉnh stack.
        if e == '+' or e == '-' or e == '*' or e == '/':
            v1 = float(st[-1])
            st.pop()
            v2 = float(st[-1])
            st.pop()

            if e == '+':
                st.append(v2 + v1)
            elif e == '-':
                st.append(v2 - v1)
            elif e == '*':
                st.append(v2 * v1)
            elif e == '/':
                st.append(v2 / v1)
        # Nếu phần tử này là toán hạng thì đẩy nó vào stack.
        else:
            st.append(float(e))

    return st[-1]
```

# III. Tài liệu tham khảo

- <a href="https://cuongquach.com/ebook-giai-thuat-va-lap-trinh-lmh-pdf.html">Sách Giải thuật và Lập trình - thầy Lê Minh Hoàng</a>.
- <a href="https://downloadsachmienphi.com/tai-lieu-giao-khoa-chuyen-tin-quyen-2/">Tài liệu giáo khoa chuyên Tin quyển 2 - thầy Hồ Sĩ Đàm</a>.