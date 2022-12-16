# 3.11 Skip Lists


-----


Binary trees - Cây nhị phân có thể được sử dụng để biểu diễn các kiểu dữ liệu trừu tượng như từ điển và danh sách có thứ tự.\
Chúng hoạt động tốt khi các phần tử được chèn theo thứ tự ngẫu nhiên.\
Một số chuỗi hoạt động, chẳng hạn như chèn các phần tử theo thứ tự, tạo ra các cấu trúc dữ liệu suy thoái mang lại hiệu suất rất kém.\
Nếu có thể hoán vị ngẫu nhiên danh sách các mục được chèn, cây sẽ hoạt động tốt với xác suất cao cho bất kỳ chuỗi đầu vào nào.\
Trong hầu hết các trường hợp, các truy vấn phải được trả lời trực tuyến, vì vậy việc hoán vị đầu vào một cách ngẫu nhiên là không thực tế.\
Các thuật toán cây cân bằng sắp xếp lại cây khi các hoạt động được thực hiện để duy trì các điều kiện cân bằng nhất định và đảm bảo hiệu suất tốt.\
Skip list là một cấu trúc dữ liệu có thể được sử dụng thay thế cho balanced binary trees - cây nhị phân cân bằng

-----

Đoạn bên trên nói về cây nhị phân hiện tại đọc có lẽ sẽ hơi khó hiểu, tạm thời ta cứ bỏ qua, khi nào đến chương về Tree mình sẽ trình bày rõ và chi tiết hơn.

So với cây nhị phân, skip list cho phép tìm kiếm, chèn và xóa nhanh các phần tử.\
Điều này đạt được bằng cách sử dụng cân bằng xác suất thay vì thực thi nghiêm ngặt việc cân bằng như ở tree.\
Về cơ bản, nó là một danh sách được liên kết với các **con trỏ bổ sung** để có thể bỏ qua các nút trung gian.\
Nó sử dụng một trình tạo số ngẫu nhiên để đưa ra một số quyết định.\
Trong danh sách liên kết được sắp xếp thông thường, tìm kiếm, chèn và xóa nằm trong O (n) vì danh sách phải được quét từng nút từ phần đầu để tìm nút có liên quan.\
Nếu bằng cách nào đó, chúng tôi có thể quét danh sách theo các bước lớn hơn (bỏ qua, như vậy), chúng tôi sẽ giảm chi phí quét.\
Đây là ý tưởng cơ bản đằng sau Skip Lists.

**Skip Lists with One Level**

![image.png](https://images.viblo.asia/3493fd6f-a639-4b0b-baba-42346f0bdc86.png)

**Skip Lists with Two Level**

![image.png](https://images.viblo.asia/03e2325b-45c4-48a5-89e4-fcdcaaa443e9.png)

**Skip Lists with Three Levels**

![image.png](https://images.viblo.asia/7154d010-35f9-4168-a3a8-138771724101.png)

## Algorithms
Phần này đưa ra các thuật toán để tìm kiếm, chèn và xóa các phần tử trong dictionary hoặc symbol table.\
Thao tác Tìm kiếm trả về nội dung của giá trị được liên kết với desired key hoặc lỗi nếu key không có.\
Thao tác Chèn liên kết một key được chỉ định với một giá trị mới (chèn key nếu nó chưa có).\
Thao tác Xóa sẽ xóa key được chỉ định.\
Dễ dàng hỗ trợ các thao tác bổ sung như “tìm minimum key” hoặc “tìm next key”.\
Mỗi phần tử được đại diện bởi một nút, mức của nút này được chọn ngẫu nhiên khi nút được chèn vào mà không quan tâm đến số lượng phần tử trong cấu trúc dữ liệu.\
Một node level i có i con trỏ chuyển tiếp, được đánh số từ 1 đến i.\
Chúng ta không cần lưu trữ level của một node trong node.\
Các mức được giới hạn ở một số thích hợp MaxLevel không đổi.\
Level của danh sách là maximum level hiện có trong danh sách (hoặc 1 nếu danh sách trống).\
Header của một danh sách có các con trỏ chuyển tiếp từ level một đến MaxLevel.\
Con trỏ chuyển tiếp của header ở mức cao hơn maximum level hiện tại của danh sách trỏ tới NULL.

### Khởi tạo
Một phần tử **NIL** được cấp phát và cấp một khóa lớn hơn bất kỳ khóa hợp lệ nào.\
Tất cả các cấp của tất cả danh sách bỏ qua đều được **kết thúc bằng NIL**.\
Một danh sách mới được khởi tạo để level của danh sách bằng 1 và tất cả các con trỏ chuyển tiếp của header của list đều trỏ tới NIL.

### Tìm kiếm một phần tử
Chúng tôi tìm kiếm một phần tử bằng cách duyệt qua các con trỏ chuyển tiếp không vượt quá nút có chứa phần tử đang được tìm kiếm.\
Khi không thể thực hiện thêm tiến trình nào ở cấp hiện tại của con trỏ chuyển tiếp, tìm kiếm sẽ chuyển xuống cấp tiếp theo.\
Khi chúng ta không thể xử lý thêm ở cấp độ 1, nghĩa là ta phải ở ngay trước nút có chứa phần tử mong muốn (nếu nó nằm trong danh sách).



### Insertion and Deletion Algorithms
Để chèn hoặc xóa một nút, chúng tôi chỉ cần tìm kiếm và nối.\
Vector update được duy trì để khi tìm kiếm hoàn tất (và chúng tôi đã sẵn sàng thực hiện mối nối), update[i] chứa một con trỏ đến nút ngoài cùng bên phải của cấp i hoặc cao hơn nằm ở bên trái của vị trí chèn / xóa.\
Nếu việc chèn tạo ra một nút có level lớn hơn max level trước đó của danh sách, chúng ta cập nhật max level của danh sách và khởi tạo các phần thích hợp của vectơ cập nhật.\
Sau mỗi lần xóa, chúng tôi kiểm tra xem chúng tôi đã xóa phần tử tối đa của danh sách hay chưa và nếu có, hãy giảm mức tối đa của danh sách.

### Chọn level ngẫu nhiên
Ban đầu, chúng ta đã thảo luận về phân bổ xác suất trong đó một nửa số nút có con trỏ cấp $i$ cũng có con trỏ cấp $i + 1$.\
Để loại bỏ các hằng số ma thuật, chúng ta nói rằng một phần p của các nút có con trỏ cấp $i$ cũng có con trỏ cấp $i + 1$.
(đối với cuộc thảo luận ban đầu của chúng ta, p = 1/2).\
Các cấp độ được tạo ngẫu nhiên bởi một thuật toán.\
Các mức được tạo mà không cần tham chiếu đến số phần tử trong danh sách

### Performance
Trong một danh sách liên kết đơn bao gồm n phần tử, để thực hiện tìm kiếm, cần có n phép so sánh trong trường hợp xấu nhất.\
Nếu một con trỏ thứ hai trỏ hai nút phía trước được thêm vào mỗi nút, số phép so sánh sẽ giảm xuống $n / 2 + 1$ trong trường hợp xấu nhất.\
Thêm một con trỏ nữa vào mỗi nút thứ tư và làm cho chúng trỏ đến nút thứ tư phía trước làm giảm số lượng so sánh xuống $⌈n / 4⌉ + 2$.\
Nếu chiến lược này được tiếp tục để mọi nút có con trỏ trỏ đến $2 * i - 1$ nút phía trước, hiệu suất O (logn) sẽ đạt được và số lượng con trỏ chỉ tăng gấp đôi $(n + n / 2 + n / 4 + n / 8 + n / 16 +….= 2n)$.

Các hoạt động tìm, chèn và loại bỏ trên cây tìm kiếm nhị phân thông thường là hiệu quả, $O (logn)$, khi dữ liệu đầu vào là ngẫu nhiên; nhưng kém hiệu quả hơn, $O (n)$, khi dữ liệu đầu vào được sắp xếp theo thứ tự.\
Skip List performance đối với các hoạt động tương tự này và đối với bất kỳ tập dữ liệu nào cũng tốt như của cây tìm kiếm nhị phân được xây dựng ngẫu nhiên cụ thể là $O (logn)$.

## Sự khác biệt của Skip Lists 
Nói một cách dễ hiểu, Skip Lists là danh sách liên kết được sắp xếp với hai điểm khác biệt:
* Các nút trong danh sách bình thường chỉ có một tham chiếu đến nút tiếp theo. Các nút trong Skip List có nhiều tham chiếu tiếp theo (còn được gọi là tham chiếu chuyển tiếp).
* Số lượng tham chiếu chuyển tiếp cho một nút nhất định được xác định theo xác suất.

Chúng ta nói về một nút trong Skip List có các level, một level cho mỗi tham chiếu chuyển tiếp. Số level trong một nút được gọi là kích thước của nút.\
Trong một danh sách được sắp xếp thông thường, các thao tác chèn, loại bỏ và tìm yêu cầu duyệt tuần tự toàn bộ danh sách.\
Điều này dẫn đến hiệu suất $O (n)$ trên mỗi hoạt động.\
Skip Lists cho phép các nút trung gian trong danh sách được bỏ qua trong quá trình duyệt dẫn đến hiệu suất dự kiến là $O (logn)$ cho mỗi hoạt động.

## Implementation
```
import java.util.Random;

public class SkipList<T extends Comparable<T>, U> {
	private class Node{
		public T key;
		public U value;
		public long level;
		public Node next;
		public Node down;
		public Node(T key, U value, long level, Node next, Node down) {
			this.key = key;
			this.value = value;
			this.level = level;
			this.next = next;
			this.down = down;
		}
	}
	
	private Node head;
	private Random _random;
	private long size;
	private double _p;
	
	private long level() {
		long level = 0;
		while(level <= size && _random.nextDouble() < _p) {
			level++;
		}
		return level;
	}
	
	public SkipList() {
		head = new Node(null, null, 0, null, null);
		_random = new Random();
		size = 0;
		_p = 0.5;
	}
	
	public void add(T key, U value) {
		long level = level();
		if(level > head.level) {
			head = new Node(null, null, level, null, head);
		}
		Node cur = head;
		Node last = null;
		while(cur != null) {
			if(cur.next == null || cur.next.key.compareTo(key) > 0) {
				if(level >= cur.level) {
					Node n = new Node(key, value, cur.level, cur.next, null);
					if(last != null) {
						last.down = n;
					}
					cur.next = n;
					last = n;
				}
				cur = cur.down;
				continue;
			} else if(cur.next.key.equals(key)) {
				cur.next.value = value;
				return;
			}
			cur = cur.next;
		}
		size++;
	}
	
	public boolean containsKey(T key) {
		return get(key) != null;
	}
	
	public U remove(T key) {
		U value = null;
		Node cur = head;
		while(cur != null) {
			if(cur.next == null || cur.next.key.compareTo(key) >= 0) {
				if(cur.next != null && cur.next.key.equals(key)) {
					value = cur.next.value;
					cur.next = cur.next.next;
				}
				cur = cur.down;
				continue;
			}
			cur = cur.next;
		}
		size--;
		return value;
	}
	
	public U get(T key) {
		Node cur = head;
		while(cur != null) {
			if(cur.next == null || cur.next.key.compareTo(key) > 0) {
				cur = cur.down;
				continue;
			} else if(cur.next.key.equals(key)) {
				return cur.next.value;
			}
			cur = cur.next;
		}
		return null;
	}
	
	public static void main(String[] args) {
		SkipList s = new SkipList<>();
		s.add(1, 100);
		System.out.println(s.get(1));
	} 
}
```