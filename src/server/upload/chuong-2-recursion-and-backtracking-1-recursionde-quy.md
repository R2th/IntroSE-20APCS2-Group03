### Lời nói đầu
Trong chương này, chúng ta sẽ xem xét một trong những chủ đề quan trọng Recursion(Đệ quy), sẽ được sử dụng ở hầu hết các chương, và một họ hàng của nó "Backtracking"(Quay lui).

### 2.1 Recusion là gì?
**Bất kỳ hàm nào gọi chính nó được gọi là recursive(đệ quy).**\
Phương pháp đệ quy giải quyết một vấn đề bằng cách gọi một bản sao của chính nó để giải quyết một vấn đề nhỏ hơn. Đây được gọi là bước đệ quy.\
Bước đệ quy có thể dẫn đến nhiều cuộc gọi đệ quy như vậy.\
**Điều quan trọng là đảm bảo rằng đệ quy kết thúc.**\
Mỗi lần hàm gọi chính nó với một phiên bản đơn giản hơn một chút của bài toán ban đầu.\
Chuỗi các bài toán nhỏ hơn cuối cùng phải hội tụ về trường hợp cơ sở(base case).

### 2.2 Why Recursion?
Đệ quy là một kỹ thuật hữu ích được vay mượn từ toán học.\
Mã đệ quy thường ngắn hơn và dễ viết hơn mã lặp(vòng for, while,..).
Nói chung, các vòng lặp được biến thành các hàm đệ quy khi chúng được biên dịch hoặc thông dịch.\
Đệ quy hữu ích nhất cho các nhiệm vụ có thể được xác định theo các nhiệm vụ con tương tự.\
Ví dụ, các bài toán sắp xếp, tìm kiếm và duyệt thường có các giải pháp đệ quy đơn giản.

### 2.3 Dạng của một hàm đệ quy
Một hàm đệ quy thực hiện một nhiệm vụ một phần bằng cách gọi chính nó để thực hiện các nhiệm vụ con.\
Tại một số điểm, **hàm gặp một nhiệm vụ con mà nó có thể thực hiện mà không cần gọi chính nó.**
Trường hợp này, trong đó hàm không lặp lại, được gọi là **base case(trường hợp cơ sở)**.\
Trường hợp hàm tự gọi để thực hiện một nhiệm vụ con, được gọi là recursive case.\
Chúng ta có thể viết tất cả các hàm đệ quy bằng cách sử dụng định dạng như sau:
```
    if(test for base case){
        return (some base case value)
    } else if(test for another base case){
        return (some other base case value)
    } else {
        return (some work and then a recursive call) // the recursive case
    }
```

Ví dụ: Hàm tính giai thừa của 1 số n. $n!$ là tích của tất cả các số nguyên từ n đến 1.\
Định nghĩa của giai thừa đệ quy trông giống như sau:\
$n! = 1$ if $n = 0$\
$n! = n*(n-1)!$ if $n > 0$\
Định nghĩa này có thể dễ dàng được chuyển đổi sang thực hiện đệ quy.\
Ở đây, vấn đề là xác định giá trị của $n !$, và bài toán con là xác định giá trị của $(n - 1) !$.\
Trong trường hợp đệ quy, khi n lớn hơn 1, hàm gọi chính nó để xác định giá trị của $(n - 1) !$ và nhân nó với n.\
Trong trường hợp cơ sở, khi n bằng 0 hoặc 1, hàm chỉ trả về 1.
Code sẽ trông giống như sau:
```
	public int Factorial(int n) {
		//base case
		if(n == 0) {
			return 1;
		} else {
			return n*Factorial(n-1);
		}
	}
```

### 2.4 Đệ quy và bộ nhớ(Trực quan hóa)
Mỗi cuộc gọi đệ quy tạo một bản sao mới của phương thức đó (thực ra chỉ là các biến) trong bộ nhớ.\
Khi một phương thức kết thúc (nghĩa là trả về một số dữ liệu), bản sao của phương thức trả về đó sẽ bị xóa khỏi bộ nhớ.\
Các giải pháp đệ quy trông đơn giản nhưng việc hình dung và truy tìm cần có thời gian.\
Để hiểu rõ hơn, chúng ta hãy xem xét ví dụ sau:
```
	public int Print(int n) {
		//base case
		if(n == 0) {
			return 0;
		} else {
            System.out.println(n);
			return Print(n-1); //Đệ quy gọi lại chính nó
		}
	}
```

Đối với ví dụ này, nếu chúng ta gọi hàm in với n = 4, trực quan các phép gán bộ nhớ của chúng ta có thể trông giống như sau:
![image.png](https://images.viblo.asia/c7ff0b69-e23d-4456-8033-8d467a5b8acc.png)

Bây giờ, chúng ta hãy xem xét hàm giai thừa ở phía trên. Hình dung của hàm giai thừa với n = 4 sẽ giống như sau:
![image.png](https://images.viblo.asia/c7268bc9-860e-4923-8db7-182b2ae53b9a.png)

### 2.5 Đệ quy Vs Vòng lặp
Trong khi thảo luận về đệ quy, câu hỏi cơ bản xuất hiện trong đầu là: **cách nào tốt hơn? - Vòng lặp hay đệ quy?**\
Câu trả lời cho câu hỏi này **phụ thuộc vào những gì chúng ta đang cố gắng làm**.

Cách tiếp cận đệ quy phản ánh vấn đề mà chúng tôi đang cố gắng giải quyết.\
Cách tiếp cận đệ quy làm cho việc giải quyết đơn giản hơn cho một vấn đề có thể không có câu trả lời rõ ràng.(Chia bài toán con với vấn đề nhỏ hơn).\
Tuy nhiên, đệ quy thêm chi phí cho mỗi lần gọi đệ quy (chi phí về space trên bộ nhớ stack).



| <div align="center">Đệ quy</div> | <div align="center">Vòng lặp</div> |
| -------- | -------- | 
| Kết thúc khi đạt được trường hợp base case.     | Kết thúc khi một điều kiện lặp được chứng minh là sai.     | 
| Mỗi cuộc gọi đệ quy yêu cầu thêm không gian trên bộ nhớ stack.     | Mỗi lần lặp không yêu cầu thêm space trong bộ nhớ.     | 
| Nếu chúng ta nhận được đệ quy vô hạn, chương trình có thể hết bộ nhớ và dẫn đến tràn bộ nhớ stack.     | Một vòng lặp vô hạn có thể lặp lại mãi mãi vì không có bộ nhớ bổ sung nào được tạo.     | 
| Giải pháp cho một số vấn đề dễ dàng hơn để hình thành một cách đệ quy.   | Các giải pháp lặp lại cho một vấn đề có thể không phải lúc nào cũng rõ ràng như một giải pháp đệ quy.     | 

### 2.6 Một vài lưu ý về đệ quy
* Thuật toán đệ quy có hai loại trường hợp, recursive cases và base cases.
* Mọi trường hợp hàm đệ quy phải kết thúc tại một trường hợp cơ sở.
* Nói chung, các giải pháp vòng lặp hiệu quả hơn các giải pháp đệ quy [do chi phí gọi hàm].
* Thuật toán đệ quy có thể được triển khai mà không cần gọi hàm đệ quy bằng cách sử dụng stack, nhưng nó thường rắc rối hơn giá trị mà nó mang lại. Điều đó có nghĩa là bất kỳ vấn đề nào có thể được giải quyết một cách đệ quy cũng có thể được giải quyết lặp đi lặp lại.
* Đối với một số vấn đề, không có thuật toán lặp lại rõ ràng.
* Một số vấn đề phù hợp nhất với các giải pháp đệ quy trong khi những vấn đề khác thì không.


### 2.7 Các ví dụ về thuật toán sử dụng đệ quy
* Fibonacci Series, Factorial Finding
* Merge Sort, Quick Sort
* Binary Search
* Tree Traversals and many Tree Problems: InOrder, PreOrder PostOrder
* Graph Traversals: DFS [Depth First Search] and BFS [Breadth First Search]
* Dynamic Programming Examples
* Divide and Conquer Algorithms
* Towers of Hanoi
* Backtracking Algorithms(Chúng ta sẽ thảo luận ở bài viết sau)


-----


Trong chương này, chúng ta sẽ đề cập đến một số vấn đề với đệ quy và phần còn lại sẽ được thảo luận trong các chương khác.
Vào thời điểm bạn hoàn thành việc đọc toàn bộ series, bạn sẽ gặp nhiều vấn đề về đệ quy.

### Problem-1
Bài toán tháp Hà Nội. \
Tháp Hà Nội là một câu đố toán học.\
Nó bao gồm ba thanh dọc (hoặc chốt hoặc tháp) và một số đĩa có kích thước khác nhau có thể trượt lên bất kỳ thanh nào.\
Câu đố bắt đầu với các đĩa trên một thanh theo thứ tự tăng dần về kích thước, nhỏ nhất ở trên cùng, do đó tạo thành hình nón.\
![image.png](https://images.viblo.asia/566a5f75-a1b2-4cec-b531-9605d4f3118c.png)

Mục tiêu của câu đố là di chuyển toàn bộ ngăn xếp sang một thanh khác, thỏa mãn các quy tắc sau:
* Mỗi lần chỉ có thể di chuyển một đĩa.
* Mỗi bước di chuyển bao gồm việc lấy đĩa trên từ một trong các thanh và đặt nó lên một thanh khác, lên trên các đĩa khác có thể đã có trên thanh đó.
* Không có đĩa nào có thể được đặt trên đĩa nhỏ hơn.

**Solution**:\
Algorithm
* Di chuyển n - 1 đĩa trên cùng từ Nguồn đến tháp Phụ 
* Di chuyển đĩa thứ n từ Nguồn đến tháp Đích 
* Di chuyển n - 1 đĩa từ tháp Phụ đến tháp Đích.
* Việc chuyển n-1 đĩa trên cùng từ Nguồn sang Tháp phụ một lần nữa có thể được coi là một vấn đề mới và có thể được giải quyết theo cách tương tự. Khi chúng ta giải được Towers of Hanoi bằng ba đĩa, chúng ta có thể giải nó với bất kỳ số đĩa nào bằng thuật toán trên.

```
	public void TowersOfHanoi(int n, char fromPeg, char topeg, char auxpeg) {
		//Nếu chỉ có 1 đĩa, thực hiện di chuyển và return
		if(n == 1) {
			System.out.println("Di chuyển disk 1 từ cọc " + fromPeg + " tới cọc: " + topeg);
			return;
		}
		//Di chuyển n-1 đĩa đầu từ cọc A sang B, sử dụng C là phụ trợ
		TowersOfHanoi(n-1, fromPeg, auxpeg, topeg);
		
		//Di chuyển đĩa còn lại từ A tới C
		System.out.println("Di chuyển disk từ cọc " + fromPeg + " tới cọc: " + topeg);
		
		//Di chuyển n-1 đĩa từ B tới C sử dụng A là phụ trợ
		TowersOfHanoi(n-1, auxpeg, topeg, fromPeg);
	}
```

### Problem-2
Cho một mảng, hãy kiểm tra xem mảng có được sắp xếp theo thứ tự hay không sử dụng đệ quy.\
**Solution**:
```
	public int arraySortedOrNot(int arr[], int n)
    {
        // Mảng có một hoặc không có phần tử nào hoặc phần còn lại đã được kiểm tra và phê duyệt.
        if (n == 1 || n == 0)
            return 1;
 
        // Kiểm tra từng cặp (Cho phép các giá trị bằng nhau)
        if (arr[n - 1] < arr[n - 2])
            return 0;
 
        // Last pair was sorted
        // Tiếp tục kiểm tra
        return arraySortedOrNot(arr, n - 1);
    }
```

Time Complexity: $O(n)$. Space Complexity: $O(n)$