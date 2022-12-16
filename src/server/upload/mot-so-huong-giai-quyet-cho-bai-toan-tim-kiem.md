Để giải quyết một bài toán trong lập trình, chúng ta có thể có nhiều cách, thuật toán để giải quyết. Tuy nhiên, không phải bài toán nào cũng có thể tối ưu trong 1 thuật toán nhất định. 
Trong bài viết này, chúng ta hãy cùng nhau nhìn qua các cách để giải quyết một bài toán tìm kiếm nho nhỏ và so sánh ưu nhược điểm giữa chúng nhé. 

### Bài toán 

Cho một dãy số gồm N số nguyên khác nhau đã sắp xếp và một giá trị T, viết hàm in ra số nguyên A, B trong mảng sao cho A + B = T.
Nếu không có 2 số nào thỏa mãn, in ra "NOT FOUND".

Ví dụ: 

INPUT: 
array = [1, 3, 5, 8, 12, 35, 167, 239] 


| Sum(T) | Result | 
| -------- | -------- |
| 40     | 5 35     |
| 165     | NOT FOUND     |



### Hướng giải quyết 1: Duyệt trâu bò - Brute Force 

Brute Force là một thuật toán vét cạn, thuật toán này sẽ chạy tất cả các trường hợp có thể có để giải quyết một vấn đề nào đó (Bao gồm cả trường hợp đúng và các trường hợp sai hay còn gọi là trường hợp dư thừa)
Riêng với bài toán của chúng ta, thì thuật toán được đưa ra như sau: 
- Duyệt 2 vòng lồng nhau các phần tử có trong dãy số để có được 2 số a, b 
- Kiểm tra xem, nếu a + b = T và a != b thì a, b là 2 số được chọn 

Trong Java, thuật toán sẽ được cài đặt như sau 
``` Java
void search(int[] array, int t) {
        for (int a : array) {
            for (int b : array) {
                if (a != b && a + b == t) {
                    System.out.println("" + a + " " + b);
                    return;
                }
            }
        }
        System.out.println("NOT FOUND");
}
```

Với cách sử dụng thuật toán này, độ phức tạp sẽ tính được là O(n2) 
* Ưu điểm:  Thuật toán đơn giản, cài đặt nhanh 
* Nhược điểm: Độ phức tạp lớn, tính toán trong khoảng thời gian lâu với n đủ lớn (1000 phần tử trở lên) 

Như vậy thuật toán này sẽ thích hợp sử dụng khi số phẩn tử trong dãy không quá nhiều 

### Hướng giải quyết 2: Tìm kiếm nhị phân - Binary Search 
Thuật toán tìm kiếm nhị phân hoạt động trên các mảng đã được sắp xếp. Hoạt động theo các trình tự:  
* So sánh một phần tử đứng chính giữa mảng với giá trị cần tìm. 
* Nếu bằng nhau, vị trí của nó trong mảng sẽ được trả về. Nếu giá trị cần tìm nhỏ hơn phần tử này, quá trình tìm kiếm tiếp tục ở nửa nhỏ hơn của mảng. 
* Nếu giá trị cần tìm lớn hơn phần tử ở giữa, quá trình tìm kiếm tiếp tục ở nửa lớn hơn của mảng. 
Bằng cách này, ở mỗi phép lặp thuật toán có thể loại bỏ nửa mảng mà giá trị cần tìm chắc chắn không xuất hiện

Khi áp dụng thuật toán tìm kiếm cho bài toán trên, ta có các bước như sau: 
- Duyệt các phần tử lần lượt từ đầu đến cuối dãy số đã cho 
- Với mỗi phần tử x trong mảng, sử dụng *tìm kiếm nhị phân* để tìm kiếm phần tử  y =  (T - x)
- Nếu x khác y   thì (x,y) là cặp số cần tìm 
- Nếu x = y thì (x,y) là 1 số, không phải số cần tìm 


Trong Java, thuật toán sẽ cài đặt như sau: 

``` Java
void search(int[] array, int t) {
        for (int i = 0; i < array.length; i++) {
            int position = binarySearch(array, 0, array.length, t - array[i]);
            if (position != -1 && position != i) {
                System.out.println("" + array[i] + " " + array[position]);
                return;
            }
        }
        System.out.println("NOT FOUND");
    }
```
Trong đó hàm tìm kiếm nhị phân sẽ được viết ra thành hàm khác như sau 
``` Java
int binarySearch(int array[], int left, int right, int target) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (array[mid] == target) return mid;
    if (array[mid] > target) return binarySearch(array, left, mid - 1, target);
    return binarySearch(array, mid + 1, right, target);
}
```

Với cách sử dụng thuật toán này, thời gian để duyệt lần lượt các phần tử là O(n), với mỗi phần tử, thực hiện tìm kiếm nhị phân có độ phức tạp là O(log(n)) 
Cho độ phức tạp thuật toán được tính ra là O(nlog(n))
* Ưu điểm:  Tìm kiếm nhanh, với độ phức tạp này, chúng ta có thể áp dụng với n ~50.000 - 100.000 để đảm bảo tốt hiệu suất. 
* Nhược điểm: Cài đặt phức tạp

Vậy đến đây, chúng ta đã có thể kết luận rằng thuật toán BinarySearch đã nhanh nhất với bài toán đưa ra chưa nhỉ? 

### Hướng giải quyết 3: Tìm kiếm bằng 2 con trỏ - Two Pointer

Thuật toán tìm kiếm bằng 2 con trỏ hoạt động bằng cách sử dụng 2 con trỏ để duyệt phần tử cùng một thời điểm, tăng hiệu suất tìm kiếm 

Cụ thể, với bài toán này, thuật toán được đưa ra như sau: 
- Đặt 1 con trỏ, bắt đầu duyệt từ phần tử đầu tiên trở đi 
- Đặt 1 con trỏ, bắt đầu duyệt từ phần tử cuối cùng trở về
- So sánh tổng giá trị của 2 phần tử tại vị trí hiện tại các con trỏ 
- Nếu tổng < giá trị tìm kiếm, dịch con trỏ đầu tiên lên 1 vị trí
- Nếu tổng > giá tị tìm kiếm, dịch con trỏ thứ 2 về 1 vị trí
- Làm như vậy đến khi tìm kiếm được giá trị hoặc là 2 con trỏ gặp nhau

Trong Java, thuật toán sẽ được cài đặt như sau 
``` Java
    void searchPointer(int[] array, int t) {
        int left = 0, right = array.length - 1;

        while (left < right) {
            int sum = array[left] + array[right];
            if (sum == t) {
                 System.out.println("" + array[left] + " " + array[right]);
                return;
            }
            if (sum < t) left++;
            else right--;
        }
        System.out.println("NOT FOUND");
    }
```

Với cách sử dụng thuật toán này, độ phức tạp sẽ tính được là O(n) 
* Ưu điểm:  Tìm kiếm nhanh, thuật toán không quá phức tạp
* Nhược điểm: Phạm vi áp dụng không rộng, chỉ áp dụng tốt với những dạng bài toán tìm kiếm 2 số trên mảng đã sắp xếp

### Hướng giải quyết 4: Sử  dụng cấu trúc dữ liệu bảng băm - Hash Set 

Để kiểm tra 1 phần tử trong trong 1 mảng đã sắp xếp hay không, bằng tìm kiếm nhị phân ta có thể tìm kiếm trong độ phức tạp O(logn). 
Có thể hiểu nôm na rằng như nếu mảng có n phần tử thì ta sẽ phải so sánh  khoảng log(n) lần.

Tuy nhiên với bảng băm, để kiểm tra phần tử có nằm trong bảng băm (Hash Set)  hay không, ta chỉ mất O(1). 
Hiểu nôm na thì sẽ là ta chỉ mất 1 đến một vài phép so sánh đơn giản.

Với lợi thế này, chúng ta có thể tối ưu hơn trong việc tìm kiếm bằng thuật toán Binary Search 

Khi áp dụng thuật toán tìm kiếm cho bài toán trên, ta có các bước như sau: 
- Lần lượt thêm các giá trị trong dãy số vào Hash Set 
- Duyệt các phần tử lần lượt từ đầu đến cuối dãy số đã cho 
- Với mỗi phần tử x trong mảng, sử dụng Hash set để kiểm tra phần tử  y =  (T - x) có trong Set hay không
- Nếu y tồn tại và x khác y  thì (x,y) là cặp số cần tìm 
- Ngược lại ta bỏ qua, duyệt đến phần tử tiếp theo. 

Trong Java, thuật toán sẽ được cài đặt như sau 
``` Java
 void searchByHashSet(int[] array, int t) {
        Set<Integer> set = new HashSet<>();

        for (int number : array) set.add(number);

        for (int x : array) {
            int y = t - x;
            if (x != y && set.contains(y)) {
                System.out.println("" + x + " " + y);
                return;
            }
        }
        System.out.println("NOT FOUND");
    }
```

Với cách sử dụng thuật toán này,
- Thời gian để thêm các phần tử vào trong bảng băm là O(n).
- Thời gian để duyệt lần lượt các phần tử là O(n), với mỗi phần tử, thực hiện tìm kiếm bằng bảng băm có độ phức tạp là O(1).


Như vậy,  tổng độ phức tạp của thuật toán này là O(2n) ~ O(n) 

* Ưu điểm:  

 - Tìm kiếm nhanh, với độ phức tạp này, chúng ta có thể áp dụng với n ~1.000.000 mà vẫn đảm bảo hiệu suất tốt
- Có thể áp dụng ngay cả khi dãy số không được sắp xếp
 
* Nhược điểm: Những ngôn ngữ lập trình cơ bản không có sẵn bảng băm, muốn sử dụng cần phải tự cài đặt bảng băm (vd: Pascal, C, ...) 

### Kết luận 
Trên thực tế, bài toán lập trình mà chúng ta cần giải quyết sẽ không phải lúc nào cũng rõ ràng và đơn giản như này. 

Đôi khi việc tìm kiếm 1 phần tử hay 2 phần tử chỉ là một bài toán con, một bước nhỏ trong bài toán lớn. Chính vì vậy, việc tối ưu các bước nhỏ này rất cần thiết. 

Mong rằng trong số các thuật toán trên sẽ giúp các bạn có nhiều lựa chọn hơn khi đối mặt với vấn đề của mình. 
Chúc mọi người code tốt.