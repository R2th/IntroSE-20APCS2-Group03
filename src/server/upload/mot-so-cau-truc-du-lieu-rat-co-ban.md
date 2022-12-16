Chào các bạn, chắc hẳn dân IT chúng mình không xa lạ gì với thuật toán/cấu trúc dữ liệu. Kiến thức về đó không được dùng hằng ngày trong việc code, nhưng nó giúp chúng ta viết code tối ưu hơn, xử lý nhanh hơn. Trong các cuộc phỏng vấn của các tập đoàn lớn hiện nay như Sam Sung, Google, Facebook, Fpt,... có phần phỏng vấn về thuật toán. Và hiện nay số lượng thuật toán, cấu trúc dữ liệu có rất rất nhiều, kể vài quyển sách chưa hết. Lập trình viên giỏi về thuật toán không chỉ giúp họ có tư duy logic giải quyết vấn đề mà còn giúp họ thăng tiến trong công việc. Trong bài viết này, mình sẽ chia sẻ một số cấu trúc dữ liệu cơ bản hay được sử dụng trong lập trình để giúp chúng ta biết cách áp dụng, hiểu sâu hơn về cáccấu trúc dữ liệu đó.



Trước khi đi vào nội dung chính, đầu tiên chúng ta đi tìm hiểu thế nào là độ phức tạp của thuật toán. Độ phức tạp của thuật toán (biểu diễn bằng Big-O Notation), là một biểu thức mô tả hành vi thuật toán (ví dụ, về mặt thời gian tính toán hoặc lượng bộ nhớ cần dùng) khi kích thước dữ liệu thay đổi. Nói đơn giản, Big O mô tả mối liên hệ giữa số lượng phần tử đầu vào và số lượng operation – thời gian chạy, hoặc số lượng bộ nhớ mà thuật toán cần sử dụng.
Ở trên chúng ta đã đi nói sơ qua về độ phức tạp thuật toán, trong phần này mình sẽ đi nói về các cấu trúc dữ liệu cơ bản:

**Array (Mảng) – Anh em thân thiết của coder**

![](https://duythanhcse.files.wordpress.com/2017/05/kotlin_19_h1.png) 

Hình 1: Array

**Độ phức tạp**

Về bản chất, 1 array là 1 vùng nhớ, gồm nhiều phần tử nằm liền kề nhau.
Dựa vào index i và địa chỉ của phần tử đầu tiên, ta có thể dễ dàng tính ra địa chỉ của phần thử thứ i. Do vậy, ta có thể truy xuất dữ liệu tại vị trí thứ (i) trong array với độ phức tạp (time complexity) là O(1).
Khi array còn chỗ trống, ta cũng có thể dễ dàng thêm phần tử vào array. Thế nhưng, khi array đã đầy, ta không thể thêm phần tử mới. Muốn thêm, ta phải tìm 1 vùng nhớ lớn có thể chứa toàn bộ phần tử, copy toàn array cũ, cộng thêm phần tử mới qua vùng nhớ đó.
Do vậy, thao tác thêm khi array đã đầy sẽ có time complexity và space complexity là O(n). Khi muốn xoá cũng vậy, ta phải bỏ phần tử đó, dồn các phần tử phía sau lên 1 vị trí nên cũng tốn O(n) luôn.

**Ứng dụng**

Array là một cấu trúc dữ liệu cực kì quen thuộc, học từ trước cả môn cấu trúc dữ liệu. Array được dùng hàng ngày trong công việc, khi ta muốn lưu trữ 1 danh sách nhiều phần tử. Các thuật toán cơ bản như tìm kiếm, sắp xếp đều sử dụng trên array cả.
Note nhẹ: Trong C#, class List cũng sử dụng Array để lưu trữ. Khi array bị đầy, nó sẽ tạo 1 array khác có dung tích gấp đôi array hiện tại, để hạn chế số lần cần tạo array mới.

**Một số bài toán hay gặp:**

Các bài toán liên quan đến sắp xếp và tìm kiếm: implement binary search, implement quick sort/merge sort,….
Tìm tổng toàn bộ các phần tử trong array (các phần tử chẵn, lẻ v…v)
Đếm số lần xuất hiện của các phần tử, tìm phần tử xuất hiện nhiều nhất
https://leetcode.com/tag/array
https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=arrays

**Linked List (Danh sách liên kết)**

![](https://miro.medium.com/max/1050/0*0XVK02Guco9xJMJL.png) 

Hình 2: Linked List

**Độ phức tạp**

Như đã nói ở phần trên, nhược điểm của array là thêm phần tử mới khá lâu. Do vậy, người ta sáng tạo ra Linked List.
Mỗi phần tử trong Linked List sẽ có 1 con trỏ, trỏ tới phần tử phía sau nó, khi muốn thêm phần tử ta chỉ việc cho phần tử cuối (tail) trỏ tới phần tử mới là được, khi muốn xoá cũng vậy. Do vậy độ phức tạp chỉ là O(1).
Bù lại, việc truy cập sẽ tốn thời gian hơn. Do ta không biết phần tử thử (n) nằm ở đâu, ta phải duyệt qua n phần tử để tìm phần tử đó, time complexity là O(n).

**Ứng dụng**

LinkedList được dùng khi lưu trữ một danh sách có số lượng phần tử không cố định (dynamic), cần thêm và xoá phần tử. Nếu biết trước số lượng phần tử là cố định, không cần xoá thì cứ dùng array sẽ nhanh hơn.
Linked List có 2 biến thể là Single-linked list và Double-linked list. Với Double-linked list thì 1 phần tử sẽ lưu 2 con trỏ, trỏ về phía trước và phía sau. Tuy tốn bộ nhớ hơn nhưng truy cập tiện hơn.

**Một số bài toán hay gặp:**

Đảo ngược 1 linked-list (Không dùng thêm bộ nhớ)
Xác định linked-list có vòng lặp hay không
Tìm phần tử nằm giữa linked-list (Chỉ loop 1 lần)
https://leetcode.com/tag/linked-list

**Cặp bài trùng Stack (Ngăn xếp) và Queue (Hàng đợi)**

![](https://alldifferences.net/wp-content/uploads/2020/11/Difference-Between-Stack-and-Queue-394x308.png) 

Hình 3: Stack and Queue

**Độ phức tạp**

Stack cho phép ta thêm 1 phần tử lên đầu stack (push), lấy phần tử trên đầu stack ra (pop). Các phần tử nào vào sau sẽ được ra trước, nên gọi là Last In First Out (LIFO)
Queue thì ngược lại, cho phép ta thêm 1 phần tử vào queue (enqueue), lấy 1 phần tử ra khỏi queue (dequeue). Các phần tử nào vào trước sẽ được ra trước, nên gọi là First In First Out (FIFO)
Hai cấu trúc dữ liệu này cho phép ta thêm/xoá các phần tử dựa theo thứ tự đưa vào, mà không cần phải lưu trữ thời gian. Độ phức tạp của việc đưa vào/lấy ra đều là O(1).

**Ứng dụng**

Stack được dùng để implement chức năng Undo/Redo, chức năng Go Back/ Go Next các bạn thấy trên trình duyệt
Queue được dùng để implement messsage queue, cho phép các thành phần trong 1 hệ thống trao đổi thông tin
Queue cũng có 1 số biến thể khác như priority queue hoặc double-ended queue, circular queue

**Một số bài toán hay gặp**

Implement queue/stack bằng array hoặc linked list
Dùng 2 stack để implement 1 queue (và ngược lại)
Duyệt các phần tử trong 1 tree (cây) bằng cách dùng stack hoặc queue
Kiểm tra xem 1 chuỗi có đóng mở ngoặc ({[]}) hợp lý hay không – dùng stack

**HashTable (Bảng băm) – CTDL bá đạo diệu kì**


![](https://media.geeksforgeeks.org/wp-content/uploads/20210108180437/Chaining2.jpg) 

Hình 4: HashTable

**Độ phức tạp**

Khi đưa 1 phần tử vào HashTable, ta phải chỉ định 1 key (ví dụ lưu sinh viên thì key là mã số sinh viên). Khi cần truy cập 1 phần tử từ HashTable dựa theo key, độ phức tạp của việc tìm 1 phần tử là O(1). Đây là thứ tạo nên sự bá đạo của HashTable.
Khi lưu 1 phần tử vào HashTable, ta sẽ đưa key vào hash function (hàm băm). Hash function này sẽ tính ra một index để lưu phần tử đó vào. Khi cần tìm phần tử đó, ta cũng dựa vào key để tính ra index.
Dù hashtable có 1000 hay 1 triệu phần tử thì hàm băm cũng chỉ chạy 1 lần, khi đã có index thì thời gian truy cập chỉ là O(1)
Độ phức tạp (nâng cao)
Tất nhiên, sẽ có trường hợp hash collision, tức là 2 key khác nhau, nhưng hash function lại tính ra index giống nhau. Lúc này, ta phải lưu nhiều phần tử có chung index vào bucket, sau đó check từng phần tử một.
Do vậy, nếu để ý, các bạn sẽ thấy worse case vẫn là O(n), nếu toàn bộ phần tử của hashtable được lưu hết vào chung 1 bucket.
Trên thực tế, việc implement hashtable khá phức tạp (thuật toán hash ra sao, làm sao để các phần tử phân bố cân bằng vào bucket). Nhiều nơi tuyển senior họ sẽ hỏi sâu hơn, các bạn nên tìm hiểu thêm nhé! 

**Ứng dụng**

Do độ phức tạp của insert/access/delete là O(1), HashTable được sử dụng rất nhiều khi ta cần optimize tốc độ truy cập. Một số key-value cache server cũng được design dựa theo cấu trúc dữ liệu này: đưa vào 1 key, cache server sẽ trả lại dữ liệu đã được lưu.
Các ngôn ngữ phổ biến như Java, C# đều có class Hashtable (hoặc tên khác là HashMap, Dictionary). JavaScript thì gần đây mới có Map, trước toàn phải dùng object.

**Một số bài toán hay gặp**

Các bài toán sử dụng vòng lặp, đếm số phần tử xuất hiện trong 1 mảng
Tìm các phần tử giống nhau giữa 2 array
Tự implment 1 hashtable (chọn thuật toán hash và gỉải thích)
https://leetcode.com/tag/hash-table

**Set – Nơi các phần tử không đụng hàng**

Set là một tập hợp chức nhiều phần tử không theo thứ tự, mà mỗi phần tử trong đó không được trùng nhau.

**Độ phức tạp và ứng dụng**

Set thật ra không phải là một cấu trúc dữ liệu, mà nó chỉ là abstract data type. Có rất nhiều  cách để implement 1 set như dùng HashYable, Linked List, Tree v…v, mỗi cách sẽ có độ phức tạp riêng.
Do đặc tính lưu các phần tử không trùng nhau của mình, set thường được dùng để lưu trữ các IP/các trang web đã truy cập. Do tìm kiếm 1 phần tử trong Set chỉ có độ phức tạp O(n) nên ta có thể dùng để blacklist/whitelist IP dựa theo danh sách có sẵn luôn.

**Một số bài toán hay gặp**

Loại bỏ các phần tử bị trùng trong 1 mảng
Gộp 2 array lại với nhau, loại các phần tử trùng lặp
Tìm các phần tử giống nhau/khác nhau giữa 2 array

**Graph – Đồ thị không kì dị**

![](https://niithanoi.edu.vn/pic/News/images/tin-tuc-cong-nghe-va-lap-trinh/vi-du-cau-truc-du-lieu-graphs.jpg) 


Hình 5: Graph

Đồ thị là một cấu trúc dữ liệu khá phức tạp, nhiều nơi tách hẳn ra 1 môn môn “Lý thuyết đồ thị” luôn! Nói đơn giản, một đồ thị là một tập hợp gồm nhiều điểm (vertical), các điểm này nối với nhau bằng các cạnh (edge).

**Ứng dụng**

Mình làm về mảng web, nên đi làm hơn 6 năm tới giờ mình chưa cần dùng tới đồ thị để giải quyết bất cứ chuyện gì. Đi phỏng vấn cũng chưa bị hỏi thuật toán về đồ thị, chắc ở tầm Amazon/Facebook/Google họ mới hỏi.
Minh hoạ Graph và Tree. Nguồn youtube.com/watch?v=YYta5uWViJc
Tuy vậy, ở những mảng khác, đồ thị được dùng để giải quyết rất rất nhiều vấn đề hay ho:
Tìm đường đi ngắn nhất từ điểm A tới B (ứng dụng bản đồ, truyền gói tin)
Tìm bạn bè chung, người quen trên mạng xã hội
Tìm quan hệ giữa các trang web để đánh giá độ tin cậy (Thuật toán PageRank của Google)

**Một số bài toán hay gặp**

Tìm đường đi ngắn nhất/qua ít node nhất từ điểm A tới B
Duyệt qua toàn bộ các điểm của đồ thị (Dùng Deep First Search/Breath First Search)
https://leetcode.com/tag/graph

**Tree – Cây gì không lá không quả, nhưng vẫn hữu dụng**


![](https://gochocit.com/wp-content/uploads/2021/11/minh-hoa-tree.webp) 

Hình 6: Tree

Tree (Cây) cũng là một dạng đồ thị:
Một cây sẽ có 1 node gốc (root).
Mỗi node sẽ có 1 hoặc nhiều node con.
Những node nào không có node con được gọi là leaf note
Một cây sẽ bao gồm nhiều cây con (subtree). Mỗi cây con sẽ gồm 1 node gốc và các node con của nó.
Tree có 2 biến thể phổ biến và được dùng nhiều nhất:
Binary Tree: Mỗi node sẽ có tối đa 2 con, lần lượt gọi tên là node trái và node phải
Binary Search Tree: Biến thể của Binary Tree. Các phần tử trong subtree bên trái phải nhỏ hơn node giữa, bên phải phải lớn hơn node giữa. Mỗi cây con của cây phải là Binary Search Tree
Các phần tử trong subtree bên trái phải bé hơn 8, bên phải phải lớn hơn 8
 Ngoài ra, Tree cũng còn có khá nhiều biến thể như Trie, Red-Black Tree,… mình cũng chỉ nghe nói chứ chưa dùng bao giờ.
Tree có rất nhiều biến thể

**Ứng dụng**

Tree được ứng dụng rất rất nhiều trong ngành lập trình:
Parse source code của các ngôn ngữ ra thành syntax tree để xử lý
Cây DOM của HTML cũng là 1 tree, với 1 node cha và nhiều node con
Sử dụng binary search tree để lưu trữ dữ liệu, tìm kiếm với độ phức tạp O(logn)
Cá nhân mình đi làm cũng không cần phải implement Tree. Tuy vậy, trong quá trình phỏng vấn thì gặp những câu hỏi bắt sử dụng Tree khá nhiều. Do vậy các bạn cũng nên ôn nhé!

**Một số bài toán hay gặp**

Duyệt các phần tử của cây (Dùng DFS/BFS)
Kiểm tra 1 cây có phải là cây nhị phân, cây cân bằng hay không? Viết code cân bằng cây
Tạo 1 array từ cây. Biến 1 array đã sort thành binary search tree
https://leetcode.com/tag/tree

**Tổng kết:**

Trên đây là bài viết ngắn gọn của mình nhằm giới thiệu về các cấu trúc dữ liệu thường gặp trong quá trình làm việc.

Hi vọng bài viết sẽ có thể mang lại cho bạn một chút kiến thức bổ ích.

Ngoài ra mình giới thiệu cho các bạn một số trang youtube học về cấu trúc dữ liệu hay: 

+ https://www.youtube.com/watch?v=hto2TVEhNkA&list=PLE1qPKuGSJaArNwmDM3BNPrfR68uerUZ7
+ https://www.youtube.com/watch?v=YYta5uWViJc
+ https://www.youtube.com/watch?v=z0NzorviKXU&list=PLqLksqdSk4b2ely12ZuwQcujGOYAUlPKz
+ https://www.youtube.com/watch?v=q36eV65TRGg&list=PLjzUB93NObY4DramORoDGR713QNDyClq1

Cảm ơn vì đã dành thời gian đọc bài viết của mình. Nếu có gì góp ý hãy comment phía dưới nhé.

Tham khảo: https://toidicodedao.com/tag/thuat-toan/