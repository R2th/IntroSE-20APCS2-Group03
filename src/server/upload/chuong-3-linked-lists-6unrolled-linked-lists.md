# 3.10 Unrolled Linked Lists
Một trong những ưu điểm lớn nhất của danh sách liên kết so với mảng là việc chèn một phần tử ở bất kỳ vị trí nào chỉ mất $O (1)$ thời gian.\
Tuy nhiên, phải mất $O (n)$ để tìm kiếm một phần tử trong danh sách liên kết.\
Có một biến thể đơn giản của danh sách được liên kết đơn được gọi là **unrolled linked lists** - danh sách liên kết mở rộng.\
Một unrolled linked lists lưu trữ nhiều phần tử trong mỗi nút (chúng ta hãy gọi nó là một block - khối cho thuận tiện).\
Trong mỗi khối, một **circular linked list** - danh sách liên kết vòng được sử dụng để kết nối tất cả các nút.\

![image.png](https://images.viblo.asia/e0352dd7-a450-4a7b-bb17-7a2648402e30.png)

Giả sử rằng sẽ có không quá n phần tử trong unrolled linked list vào bất kỳ thời điểm nào.\
Để đơn giản hóa vấn đề này, tất cả các khối, ngoại trừ khối cuối cùng, phải chứa chính xác $\sqrt { n }$ các phần tử.\
Vì vậy, sẽ không có nhiều hơn $\sqrt { n }$ khối ở bất kỳ thời điểm nào.

## Tìm kiếm 1 phần tử trong Unrolled Linked Lists
Trong unrolled linked lists, chúng ta có thể tìm thấy phần tử thứ k trong $O (\sqrt { n })$:
1. Duyệt qua các khối của list đến khối chứa nút thứ k là khối thứ $[\frac { k } { \sqrt { n } }]$ (Giá trị sẽ được làm tròn lên).\
Nó yêu cầu $O (\sqrt { n })$ vì chúng ta phải tìm nó bằng cách không đi qua quá $\sqrt { n }$ khối.
2.  Tính k mod $[\sqrt { n }]$ (căn của n sẽ được làm tròn lên, mod: phép chia lấy dư). Nó yêu cầu $O (\sqrt { n })$ vì chúng ta phải tìm nó bằng cách không đi qua quá $\sqrt { n }$ node trong khối.

![image.png](https://images.viblo.asia/63446f13-8c8f-40ac-b7eb-4167c53f4192.png)

## Thêm 1 phần tử trong Unrolled Linked Lists
![image.png](https://images.viblo.asia/8c0d307d-f3c2-4f11-8c98-0cf4b0c3dc42.png)

Khi chèn một nút, chúng ta phải sắp xếp lại các nút trong unrolled linked lists để duy trì các thuộc tính đã đề cập trước đó, rằng mỗi khối chứa $\sqrt { n }$ các nút.\
Giả sử rằng chúng ta chèn một nút x sau nút thứ i, và x nên được đặt trong khối thứ j.\
Các nút trong khối thứ j và trong các khối sau khối thứ j phải được dịch chuyển về phía đuôi của danh sách để mỗi khối vẫn có $\sqrt { n }$ các nút.\
Ngoài ra, một khối mới cần được thêm vào đuôi nếu khối cuối cùng của danh sách hết dung lượng, tức là nó có nhiều hơn $\sqrt { n }$ các nút.

## Performing Shift Operation
Cái này dịch sang tiếng việt hơi khó, mình cũng không biết nên dùng từ gì 😅 Hiểu đơn giản nó sẽ là việc xử lý về các phép dịch chuyển các node trong list này.

Lưu ý rằng mỗi thao tác shift, bao gồm việc loại bỏ một nút khỏi phần đuôi của danh sách liên kết vòng trong một khối và chèn một nút vào đầu danh sách liên kết vòng trong khối phía sau, chỉ mất $O (1)$.\
Do đó, tổng độ phức tạp về thời gian của một thao tác chèn cho các unrolled linked list là $O (\sqrt { n })$; có nhiều nhất là $\sqrt { n }$ khối và do đó có nhiều nhất là $O (\sqrt { n })$ hoạt động dịch chuyển.
1. Một temp pointer để lưu trữ node đuôi của khối A.

![image.png](https://images.viblo.asia/dfaf6ad9-7705-44bb-967f-5b4dfa45b4e5.png)
2. Trong khối A, di chuyển con trỏ next của nút đầu trỏ đến nút phía trước nút cuối cùng, sau đó có thể loại bỏ nút đuôi của A.

![image.png](https://images.viblo.asia/73a5309b-9808-4ee0-aafd-c9d5e20775fe.png)
3. Con trỏ next của node tạm thời temp trỏ tới nút đuôi của khối B

![image.png](https://images.viblo.asia/84fa1dc6-7737-4f4c-ba7b-aaa811ea79f7.png)
4. Head node của B trỏ tới node temp.

![image.png](https://images.viblo.asia/2b14c07a-599f-4405-8796-cb63606b0f8b.png)
5. Cuối cùng, set head pointer node  trỏ tới temp, temp trở thành node đầu của khối B.

![image.png](https://images.viblo.asia/b052bd90-9588-4a20-95ce-469c8b776dde.png)
6. Temp pointer tới đây có thể hủy bỏ. Chúng ta đã hoàn thành thao tác dịch chuyển để di chuyển nút đuôi ban đầu của A trở thành nút đầu mới của B.

![image.png](https://images.viblo.asia/27351e1d-c7b3-45dc-8acc-cfc8f5d33821.png)

## Performance
Với unrolled linked lists, có một số lợi thế, một về tốc độ và một về không gian.\
Đầu tiên, nếu số lượng phần tử trong mỗi khối có kích thước thích hợp (ví dụ: tối đa là kích thước của một dòng bộ nhớ cache), chúng ta sẽ nhận được hiệu suất bộ nhớ cache tốt hơn đáng kể từ vị trí bộ nhớ được cải thiện.\
Thứ hai, vì chúng ta có $O (n / m)$ liên kết , trong đó n là số phần tử trong unrolled linked lists và m là số phần tử chúng ta có thể lưu trữ trong bất kỳ khối nào, chúng ta cũng có thể tiết kiệm một lượng không gian đáng kể, đặc biệt đáng chú ý nếu mỗi phần tử nhỏ.

## So sánh giữa Doubly Linked Lists và Unrolled Linked Lists
Để so sánh chi phí cho một unrolled list, các phần tử trong triển khai danh sách được liên kết kép bao gồm dữ liệu, một con trỏ đến nút tiếp theo và một con trỏ đến nút trước đó trong danh sách, như ví dụ sau đây.\
Giả sử chúng ta có con trỏ 4 byte, mỗi nút sẽ chiếm 8 byte(2 con trỏ next và prev).\
Bộ nhớ được cấp phát cho 1 nút để chứa data có thể trong khoảng 8 bytes đến 16 bytes. Ta xem xét trường hợp tốt nhất, nó chiếm 8 bytes bộ nhớ.\
Vậy tổng 1 node sẽ mất 16 bytes, 1000 node ta sẽ mất 16kb bộ nhớ.

Bây giờ tính toán cho unrolled linked list(có thể gọi nó là LinkedBlock). Nó sẽ trông giống như thế này:\
Một block được cấp phát 12 bytes + 8 bytes và chứa một mảng 100 phần tử mất chi phí 400 bytes + 8 bytes chi phí => Tổng sẽ tốn 428 bytes hay 4.28 bytes cho mỗi phần tử. \
So sánh với 1K phần tử ở trên thì ta sẽ cần 4.2KB chi phí, nghĩa là vẫn tốt hơn 4 lần so với danh sách được liên kết kép.\
Ngay cả khi danh sách trở nên phân mảnh nghiêm trọng và các mảng mục chỉ đầy 1/2 trung bình, đây vẫn là một cải tiến.\
Ngoài ra, hãy lưu ý rằng chúng ta có thể điều chỉnh kích thước mảng thành bất kỳ giúp chúng ta có chi phí tốt nhất cho ứng dụng của mình.

![image.png](https://images.viblo.asia/a96a0251-a4e7-4b4e-94a4-67899a62424f.png)

Ảnh trên là bản gốc mà tác giả viết, mình không chắc tác giả đang sử dụng ngôn ngữ hay hệ thống nào để cấp phát bộ nhớ, mảng 100 phần tử thì chỉ cần 4 bytes mỗi phần tử, 1 block - single node thì cần 12 bytes + 8 bytes chi tiết cho những gì, mính đoán là 1 biến int lưu số phần tử trong node 8 bytes, 1 con trỏ tới node tiếp theo 4 bytes, 1 biến lưu địa chỉ tới mảng 8 bytes.\
Nếu ở đây mình có hiểu và dịch gì ý nào chưa đúng, các bạn comment giúp để mình sửa lại nhé.

### Implementation
Một implement cơ bản của Unrolled Linked List mình tham khảo [ở đây](https://www.geeksforgeeks.org/unrolled-linked-list-set-1-introduction/)
```
// Java program to implement unrolled
// linked list and traversing it.
import java.util.*;
 
class GFG{
     
static final int maxElements = 4;
 
// Unrolled Linked List Node
static class Node
{
    int numElements;
    int []array = new int[maxElements];
    Node next;
};
 
// Function to traverse an unrolled
// linked list  and print all the elements
static void printUnrolledList(Node n)
{
    while (n != null)
    {
       
        // Print elements in current node
        for(int i = 0; i < n.numElements; i++)
            System.out.print(n.array[i] + " ");
 
        // Move to next node
        n = n.next;
    }
}
 
// Program to create an unrolled linked list
// with 3 Nodes
public static void main(String[] args)
{
    Node head = null;
    Node second = null;
    Node third = null;
 
    // Allocate 3 Nodes
    head = new Node();
    second = new Node();
    third = new Node();
 
    // Let us put some values in second
    // node (Number of values must be
    // less than or equal to maxElement)
    head.numElements = 3;
    head.array[0] = 1;
    head.array[1] = 2;
    head.array[2] = 3;
 
    // Link first Node with the
    // second Node
    head.next = second;
 
    // Let us put some values in
    // second node (Number of values
    // must be less than or equal to
    // maxElement)
    second.numElements = 3;
    second.array[0] = 4;
    second.array[1] = 5;
    second.array[2] = 6;
 
    // Link second Node with the third Node
    second.next = third;
 
    // Let us put some values in third
    // node (Number of values must be
    // less than or equal to maxElement)
    third.numElements = 3;
    third.array[0] = 7;
    third.array[1] = 8;
    third.array[2] = 9;
    third.next = null;
 
    printUnrolledList(head);
}
}
```

Thêm phần tử vào [Unrolled Linked List](https://www.geeksforgeeks.org/insertion-unrolled-linked-list/)
```
/* Java program to show the insertion operation
* of Unrolled Linked List */
import java.util.Scanner;
import java.util.Random;
 
// class for each node
class UnrollNode {
    UnrollNode next;
    int num_elements;
    int array[];
 
    // Constructor
    public UnrollNode(int n)
    {
        next = null;
        num_elements = 0;
        array = new int[n];
    }
}
 
// Operation of Unrolled Function
class UnrollLinkList {
 
    private UnrollNode start_pos;
    private UnrollNode end_pos;
 
    int size_node;
    int nNode;
 
    // Parameterized Constructor
    UnrollLinkList(int capacity)
    {
        start_pos = null;
        end_pos = null;
        nNode = 0;
        size_node = capacity + 1;
    }
 
    // Insertion operation
    void Insert(int num)
    {
        nNode++;
 
        // Check if the list starts from NULL
        if (start_pos == null) {
            start_pos = new UnrollNode(size_node);
            start_pos.array[0] = num;
            start_pos.num_elements++;
            end_pos = start_pos;
            return;
        }
 
        // Attaching the elements into nodes
        if (end_pos.num_elements + 1 < size_node) {
            end_pos.array[end_pos.num_elements] = num;
            end_pos.num_elements++;
        }
 
        // Creation of new Node
        else {
            UnrollNode node_pointer = new UnrollNode(size_node);
            int j = 0;
            for (int i = end_pos.num_elements / 2 + 1;
                 i < end_pos.num_elements; i++)
                node_pointer.array[j++] = end_pos.array[i];
 
            node_pointer.array[j++] = num;
            node_pointer.num_elements = j;
            end_pos.num_elements = end_pos.num_elements / 2 + 1;
            end_pos.next = node_pointer;
            end_pos = node_pointer;
        }
    }
 
    // Display the Linked List
    void display()
    {
        System.out.print("\nUnrolled Linked List = ");
        System.out.println();
        UnrollNode pointer = start_pos;
        while (pointer != null) {
            for (int i = 0; i < pointer.num_elements; i++)
                System.out.print(pointer.array[i] + " ");
            System.out.println();
            pointer = pointer.next;
        }
        System.out.println();
    }
}
 
/* Main Class */
class UnrolledLinkedList_Check {
 
    // Driver code
    public static void main(String args[])
    {
        Scanner sc = new Scanner(System.in);
 
        // create instance of Random class
        Random rand = new Random();
 
        UnrollLinkList ull = new UnrollLinkList(5);
 
        // Perform Insertion Operation
        for (int i = 0; i < 12; i++) {
 
            // Generate random integers in range 0 to 99
            int rand_int1 = rand.nextInt(100);
            System.out.println("Entered Element is " + rand_int1);
            ull.Insert(rand_int1);
            ull.display();
        }
    }
}

```