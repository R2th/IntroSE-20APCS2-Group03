# 1. Mở đầu
Trong bài viết này mình sẽ trình bày một ví dụ khác phức tạp hơn sử dụng phương pháp FAST để làm bài toán quy hoạch động. Nếu chưa đọc phần 1 trong seri này về phương pháp FAST, bạn có thể đọc bài viết đó tại link này: [Giải quyết quy hoạch động bằng phương pháp FAST.](https://viblo.asia/p/ap-dung-phuong-phap-fast-de-giai-quyet-cac-bai-toan-quy-hoach-dong-4dbZNoVvlYM)<br>
Bài toán ví dụ Knapsack điển hình:<br>
Giả sử có một cái túi chỉ chứa được tối đa M(đơn vị khối lượng), có một đống gold mỗi cục có khối lượng là w và giá trị là v. Nhiệm vụ là chọn cục nào để tổng giá trị là lớn nhất nhưng tổng khối lượng phải nhỏ hơn hoặc bằng M.<br>
VD:<br>
input:<br>
cục 1 (w:2, v:6), cục 2 (w:2, v:10), cục 3 (w:3, v:12)}
M = 5 <br>
output: <br>
22<br>
Giải thích:
Ta sẽ chọn cục 2 và 3 có tổng khối lượng là 5 <= M và tổng giá trị là lớn nhất = 22 <br>
# 2. Các bước giải quyết
## 2.1 First solution
Như thường lệ ta sẽ giải quyết bài toán này bằng phương pháp “ngây thơ” trước bằng đệ quy :D Thay vì lặp tất cả các trường hợp, ta có thể giới hạn dựa vào khối lượng M của túi. <br>
Nếu cục vàng được thêm vào không làm cho tổng khối lượng của túi lớn hơn M, ta sẽ tính toán max của giá trị trong 2 trường hợp là thêm cục vàng này và bỏ qua cục vàng. Ngược lại, nếu cục vàng thêm vào làm khối lượng túi lớn hơn M, ta chỉ có một trường hợp là bỏ qua cục vàng này và xét đến cục vàng tiếp theo.
``` java
// khởi tạo class đại diện cho các item
public class Item {
  int weight; // khối lượng item
  int value; // giá trị của item
}
// giải quyết bằng phương pháp "trâu bò"
public int knapsack(Item[] items, int W) {
  return knapsack(items, W, 0);
}
private int knapsack(Item[] items, int W, int i) {
  // Nếu xét hết các item thì return
  if (i == items.length) return 0;
  // Nếu item quá lớn thì bỏ qua và xét đến item tiếp theo
  if (W - items[i].weight < 0)
    return knapsack(items, W, i+1);
  // Tìm max trong cả 2 trường hợp đã nêu
  return Math.max(
  knapsack(items, W - items[i].weight, i+1)+ items[i].value,
  knapsack(items, W, i+1));
}
```
## 2.2 Analyze the first solution
Đoạn code chúng ta viết ở trên không được tối ưu. Phân tích ta thấy: mỗi item có thể được cho vào túi hoặc không được cho vào dẫn đến phải lặp đệ quy ở 2 nhánh khác nhau<br>
Giống như bài Fibonacci đã phân tích, ta có số lần phải lặp: 2 * 2 * ...  * 2 = 2^n với n trong bài này là số lượng các item. Do đó độ phức tạp của phương pháp đầu là o(2^n). <br>
Ta sẽ tối ưu bài toán bằng cách tìm các đoạn lặp và đưa về dạng quy hoạch động
## 2.3 Find the subproblems
Với bài toán này thì việc tìm ra subproblem sẽ phức tạp hơn một chút so với bài Fibonacci, ta sẽ nhìn vào phương thức đệ quy trên để hiểu rõ hơn. Phương thức chúng ta tạo ra sẽ truyền vào một tập các item và các item này không thay đổi. Do đó, ta biết rằng các subproblem sẽ chỉ phụ thuộc vào M và chỉ số của các item. Ta đặt ra câu hỏi: Giá trị lớn nhất đạt được từ item thứ i đến items.length thỏa mãn khối lượng không lớn hơn M là bao nhiêu? Với mỗi lần gọi sẽ hoặc là cho cục vàng vào túi hoặc là bỏ qua nó để xét đến cục tiếp theo. Giống như bài Fibonacci chúng ta cũng sẽ sử dụng cấu trúc dữ liệu để cache kết quả khi xét đến item thứ i và khối lượng còn lại của túi có thể đựng được. Mình sẽ sử dụng HashMap với key là chỉ số của item, value là một HashMap khác với key là khối lượng còn lại của túi khi có item và giá trị lớn nhất của túi khi đó. <br>
``` java
public int knapsack(Item[] items, int W) {
  Map<Integer, Map<Integer, Integer>> cache =
  new HashMap<Integer,
  Map<Integer, Integer>>();
  return knapsack(items, W, 0, cache);
}
// Hàm đệ quy có sử dụng HashMap để cache
private int knapsack(Item[] items, int W, int
i, Map<Integer, Map<Integer, Integer>> cache)
{
  if (i == items.length) return 0;
  // Kiểm tra chỉ số của item đã có trong cache
  if (!cache.containsKey(i)) // nếu chưa có
    cache.put(i,new HashMap<Integer,Integer>()); // thêm vào cache
  Integer cached = cache.get(i).get(W);  // lấy ra từ cache giá trị khi xét item thứ i và khối lượng đang xét
  if (cached != null) return cached; // nếu khác null return luôn giá trị
  // Nếu không thì phải tính toán cho item thứ i này và lưu vào cache
  int toReturn;
  if (W - items[i].weight < 0) {
    toReturn = knapsack(items, W, i+1, cache);
  } else {
    toReturn =
    Math.max(knapsack(items, W - items[i].weight, i+1, cache) + items[i].value,
    knapsack(items, W, i+1, cache));
  }
  cache.get(i).put(W, toReturn);
  return toReturn;
}
```
## 2.4 Turn around the solution
Sau khi đã hoàn thành xong bước 3, ta có thể chuyển về dạng của quy hoạch động. Có thể thay hash ở bước 3 bằng mảng 2 chiều cache[i][w] là giá trị lớn nhất có thể đạt được khi xét đến item thứ i và với khối lượng của túi có thể chứa được là w. Ta có thể suy ra công thức quy hoạch động: <br>
cache[i][w] là max trong 2 giá trị cache[i-1][w] (trường hợp không cho item i vào túi) và cache[i-1][w-khối lượng của item i] + giá trị của item i (trường hợp có cho item i vào túi).
``` java
public int knapsack(Item[] items, int W) {
  // khai báo cache là mảng 2 chiều
  int[][] cache = new int[items.length + 1][W + 1];
  // với mỗi item tính toán giá trị lớn nhất có thể đạt được cho mỗi khối lượng 
  for (int i = 1; i <= items.length; i++) {
    for (int j = 0; j <= W; j++) {
    if (items[i-1].weight > j) {
      cache[i][j] = cache[i-1][j];
    } else {
      cache[i][j] = Math.max(cache[i-1][j], cache[i-1][j-items[i-1].weight] + items[i-1].value);
    }
  }
}
  return cache[items.length][W];  // trả về kết quả cuối cùng
}

```
# 3. Kết luận
Như vậy từ bài toán knapsack điển hình thông qua các bước của phương pháp FAST trên ta đã chuyển về dạng bài của quy hoạch động.Mặc dù có thể lời giải trên chưa phải là tối ưu nhất nhưng nó thể hiện rõ ràng các bước thực hiện phương pháp này. Rất nhiều bài sẽ áp dụng tư tưởng của bài toán knapsack này để suy ra kết quả. Hy vọng bài viết sẽ giúp các bạn hiểu thêm về phương pháp này và các bước để giải quyết bài toán. Nếu có gì cần đóng góp hay thảo luận hãy để lại bình luận của bạn xuống dưới và đừng quên upvote để mình có động lực viết thêm các bài viết chất lượng hơn * ahihi * :D. Cảm ơn đã đọc!