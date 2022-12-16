# 1) Chia để trị là gì?
Giải thuật chia để trị (Divide and Conquer) là một phương pháp quan trọng trong việc thiết kế các giải thuật. Ý tưởng của phương pháp này khá đơn giản và rất dễ hiểu: Khi cần giải quyết một bài toán, ta sẽ tiến hành chia bài toán đó thành các bài toán con nhỏ hơn. 
Tiếp tục chia cho đến khi các bài toán nhỏ này không thể chia thêm nữa, khi đó ta sẽ giải quyết các bài toán nhỏ nhất này và cuối cùng kết hợp giải pháp của tất cả các bài toán nhỏ để tìm ra giải pháp của bài toán ban đầu.

Nói chung, bạn có thể hiểu giải thuật chia để trị (Divide and Conquer) qua 3 bước sau:

**- Bước 1: Chia (Divide)**

Trong bước này, chúng ta chia bài toán ban đầu thành các bài toán con. Mỗi bài toán con nên là một phần của bài toán ban đầu. Nói chung, bước này sử dụng phương pháp đệ qui để chia nhỏ các bài toán cho đến khi không thể chia thêm nữa. Khi đó, các bài toán con được gọi là "atomic – nguyên tử", nhưng chúng vẫn biểu diễn một phần nào đó của bài toán ban đầu.

**- Bước 2: Giải bài toán con (Conquer)**

Giải quyết các bài toán con đã được chia bên trên

**- Bước 3: Kết hợp các bài toán con để đưa ra đáp án của bài toán ban đầu**

# 2) Một vài ví dụ áp dụng

### a) Tìm kiếm nhị phân

- Một bài toán tương đối quen thuộc khi học về thuật toán: Cho 1 mảng đã được sắp xếp, tìm vị trí của số k trong mảng.

ex: Mảng 1, 2, 4, 7, 9

Tìm vị trí của số 4 => vị trí 3

*Input:*

*- Dòng đầu chứa 2 số tự nhiên n (số phần tử của mảng) và k (vị trí cần tìm)*

*- Dòng 2 chứa n số tự nhiên tăng dần*

*Output: số thứ k trong dãy*
   
   Hướng giải: Chúng ta có thể duyệt từ đầu mảng đến cuối mảng nếu phần tử nào bằng giá trị thì trả về phần tử đó. Nhưng cách này có độ phức tạp là O(n) => chỉ nên sử dụng khi số lượng nhỏ
   
   Còn nếu chúng ta áp dụng chia để trị thì sao?
   
   Điểm đặc biệt ở đây là mảng đã được sắp xếp nên chúng ta có thể làm như sau:
   
```
    private static int find(int[] array, int k, int left, int right) {
        if (left <= right) {
            int middle = (left + right) / 2;
            if (k == array[middle]) {
                return middle + 1;
            }
            if (k > middle) {
                return find(array, k, middle + 1, right);
            }

            if (k < middle) {
                return find(array, k, left, middle - 1);
            }
        }
        return -1;
    }
```
   
   Như vậy độ phức tạp sẽ còn O(log(n)) giảm đi đáng kể đấy chứ.

### b) Dãy xâu Fibonaci

- Vẫn là bài toán Fibonaci quen thuộc nhưng biến đổi một chút:

Dãy xâu fibonaci được định nghĩa như sau:
```
f[1] = "A"
f[2] = "B"

f[n] = f[n - 2] + f[n - 1]
```

Tìm ký tự thứ k của dãy xâu fibonaci thứ n

*Input: 2 số tự nhiên n (thứ tự fibonaci theo định nghĩa) và k (vị trí cần tìm)*

*Output: In ra ký tự thứ k của dãy fibonaci thứ n*

Chi tiết hơn về bài toán bạn có thể xem ở [đây](http://laptrinhonline.club/problem/cotyey024)

**Cách 1: Giải theo cách là cứ gen ra các chuỗi đến chuỗi cần tìm và lấy vị trí thứ k**
```java
   public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int k = scanner.nextInt();
        List<String> list = new ArrayList<>();
        list.add("A");
        list.add("B");
        for (int i = 2; i <= n; i++) {
            list.add(list.get(i - 2) + list.get(i - 1));
        }
            System.out.println(list.get(n).charAt(k - 1));
    }
```

Nhưng với bài toán trên có điều kiện n < 93. tức là ở chuỗi thứ 92 độ dài của chuỗi sẽ ~ 7 500 000 000 000 000 000 ( đọc là 7,5 tỉ tỉ :v ) và việc lưu 1 chuỗi như vậy, trình biên dịch sẽ phản hồi lại rằng ![](https://images.viblo.asia/f164f79f-e9b9-4fd7-a68e-19327473bf5e.gif)

**Cách 2: Áp dụng chia để trị**

Phân tích: gọi `length[]` là mảng chứa độ dài các dãy từ $1 -> n$

Để tìm được vị trí thứ k trong dãy fibonaci thứ $n$. chúng ta hãy đi tìm vị trí $k$ trong dãy n - 2 nếu $k <= length[n-2]$ và vị trí $k - length[n - 2]$ nếu ngược lại. Lặp lại cho đến khi $k = 1$ thì return "A" và k = 2 thì return "B"

```java
public class XauFibonaci {
    public static void main(String[] args) {
        long length[] = new long[93];

        length[1] = 1;
        length[2] = 1;

        for (int i = 3; i < 93; i++) {
            length[i] = length[i - 2] + length[i - 1];
        }

        Scanner scanner = new Scanner(System.in);
        int test = scanner.nextInt();
        for (int t = 0; t < test; t++) {

            int n = scanner.nextInt();

            long k = scanner.nextLong();

            System.out.print(check(n, k, length));
            if (t != test - 1) {
                System.out.println();
            }
        }
    }

    private static String check(int n, long k, long[] length) {
        if (n == 1) {
            return "A";
        }

        if (n == 2) {
            return "B";
        }

        if (k > length[n - 2]) {
            return check(n - 1, k - length[n - 2], length);
        }

        return check(n - 2, k, length);
    }
}
```

### c) Gấp đôi dãy số

Một dãy số tự nhiên bắt đầu bởi con số 1 và được thực hiện N-1 phép biến đổi “gấp đôi” dãy số như sau:  Với dãy số A hiện tại, dãy số mới có dạng A, x, A trong đó x là số tự nhiên bé nhất chưa xuất hiện trong A. Ví dụ với 2 bước biến đổi.

ta có $[1] ->  [1 2 1] -> [1 2 1 3 1 2 1]$. Các bạn hãy xác định số thứ K trong dãy số cuối cùng là bao nhiêu?

*Input: 2 số tự nhiên n (thứ tự fibonaci theo định nghĩa) và k (vị trí cần tìm)*

*Output: In ra ký tự thứ k của dãy số sau n - 1 phép biến đổi*

Phân tích: Sau $n - 1$ phép biến đổi thì độ dài của số sẽ là $2 ^ n - 1$. 

Để tìm vị trí thứ k trong dãy n. ta sẽ đi tìm phần tử thứ k trong dãy $n - 1$ nếu k nhỏ hơn vị trí phần tử chính giữa của dãy và vị trí $k - n - 1$ nếu k lớn hơn vị trí chính giữa của dãy

lặp lại cho đến khi  k là phần tử chính giữa của dãy hiện tại thì kết quả sẽ là n

```java
   private static long calculate(int n, long k) {
        if (k == Math.pow(2, n - 1)) {
            return n;
        }

        if (k > Math.pow(2, n - 1) + 1) {
            return calculate(n - 1, k - n - 1);
        }
        return calculate(n - 1, k);
    }
```
# 3) Nhược điểm của chia để trị

Nhìn thì có vẻ nguy hiểm nhưng cái gì cũng có nhược điểm của nó và thuật toán chia để trị cũng vậy.

Vấn đề lớn nhất là làm sao để chia bài toán lớn thành các bài toán nhỏ và các bài toán nhỏ phải có cùng cách giải nếu không sự phức tạp sẽ tăng lên gấp bội

Bài viết này mình đã giới thiệu cho các bạn về thuật toán chia để trị và ví dụ. Hi vọng bạn có thể sử dụng người đúng thời điểm" nhé :v