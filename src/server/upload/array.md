![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/10/flight-g7935d4975_1280.jpeg?w=1280&ssl=1)

## Array là gì?
**Mảng (array)** là kiểu dữ liệu phổ biến nhất, câu hỏi về mảng thường là quan trọng trong các cuộc phỏng vấn về kỹ thuật dành cho lập trình viên.

### Ưu điểm:

Mảng (array) cho phép:

– lưu nhiều phần tử vào một biến duy nhất.

– truy cập các phần tử trong mảng với index (chỉ mục).

### Nhược điểm:

– thay đổi các phần tử trong mảng diễn ra chậm hơn linked list khi thay đổi các phần tử giữa mảng vì các phần tử còn lại sẽ phải di chuyển để phù hợp với vị trí mới sau khi đã thêm / xóa.

– một số ngôn ngữ yêu cầu kích thước mảng cần khai báo trước và không thể thay đổi sau khi đã khởi tạo. Nếu phần tử được thêm vào vượt quá kích thước mảng thì việc sao chép lại mảng cũ và thêm mảng mới làm tốn thời gian là O(n).

## Một số nguồn học về mảng

– [Leetcode – “Array 101”](https://leetcode.com/explore/learn/card/fun-with-arrays/)

– [Course “array data structure” – Guru99](https://www.guru99.com/array-data-structure.html)

– [Video “Arrays” – University of California San Diego](https://www.coursera.org/lecture/data-structures/arrays-OsBSF)

## Một số khái niệm liên quan đến mảng

– **“Subarray”** là mảng con chứa các phần tử giữ nguyên vị trí liền kề trong mảng.

– **“Subsequence”** là một dãy các phần tử tạo ra bằng cách xóa một hay nhiều các phần tử khác nhưng vẫn giữ nguyên thứ tự trong mảng.

Ví dụ: `arr = [1, 2, 3, 4, 5, 6]`

– thì `[1, 2, 3]` là subarray, nhưng `[1, 4, 5]` không phải là subarray

– thì `[1, 4, 5]` là subsequence, nhưng `[1, 4, 3]` không phải là subsequence

## Độ phức tạp của một số thao tác trên mảng

– truy cập một phần tử – `O(1)`

– tìm kiếm trên mảng – `O(n)`

– tìm kiếm trên mảng đã được sắp xếp – `O(log(n))`

– chèn / xóa một phần tử vào mảng (ví trí đầu, cuối) – `O(1)`

– chèn / xóa một phần tử vào mảng (ví trí giữa) – `O(n)`

## Một số lưu ý khi phân tích bài toán về mảng

– Làm rõ nếu cho phép các phần tử được phép trùng nhau

– Cẩn thận khi sử dụng index, vì nếu index vượt quá độ dài của mảng sẽ gây lỗi

– Cắt / nối mảng sẽ có thời gian O(n)

– Một số trường hợp đặc biệt:

   – Mảng rỗng

   – Mảng / subarray / subsequence chỉ có 1, 2 phần tử

   – Mảng có các phần tử trùng nhau

## Các kỹ thuật giải bài toán với mảng

### Sliding window
Kỹ thuật này thường sử dụng hai con trỏ (two pointers) trượt cùng hướng và không bao giờ vượt nhau. Điều này đảm bảo mỗi giá trị được truy cập nhiều nhất 2 lần, và có độ phức tạp O(n) 

**Luyện tập: **

– [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

– [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)

– [Minimum Window Substring](https://leetcode.com/problems/minimum-size-subarray-sum/)

### Two pointers
Hai con trỏ là kỹ thuật tổng quát hơn của “Sliding window”, với hai con trỏ và có thể cắt nhau hay có thể nằm trên hai mảng khác nhau. 

**Luyện tập: **

– [Sort Colors ](https://leetcode.com/problems/sort-colors/)

– [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

– [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

### Traversing from the right
Đôi khi cần duyệt mảng từ bên phải để giải quyết bài toán 

**Luyện tập: **

– [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

– [Number of Visible People in a Queue](https://leetcode.com/problems/number-of-visible-people-in-a-queue/)

### Sorting the array
Đôi khi việc sắp xếp mảng theo một thứ tự nhất định giúp giải quyết vấn đề nhanh hơn. Nếu một mảng đã sắp xếp, hay một phần mảng đã sắp xếp có thể áp dụng binary search (tìm kiếm nhị phân) để giải quyết bài toán với thời gian nhỏ hơn O(n) 

**Luyện tập: **

– [Merge Intervals](https://leetcode.com/problems/merge-intervals/)

– [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

### Precomputation
Với các bài toán cần tính toán (tổng, nhân, …) thì việc tính toán trước (có thể với các subarray hay subsequence) sẽ giúp giải bài toán dễ dàng hơn. 

**Luyện tập: **

– [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

– [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)

– [LeetCode questions tagged “prefix-sum”](https://leetcode.com/tag/prefix-sum/)

### Index as a hash key
Nếu bạn được giao một mảng nhưng yêu cầu thời gian O(1), bạn có thể sử dụng chính mảng đó như một mảng băm (khóa băm) để giải. 

**Luyện tập: **

– [First Missing Positive](https://leetcode.com/problems/first-missing-positive/)

– [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

### Traversing the array more than once
Đôi khi bạn cần duyệt qua mảng với một số lần nhất định để giải quyết bài toán. Và việc duyệt qua mảng với một số lần nhất định thì thuật toán của bạn vẫn có độ phức tạp là O(n).

## Một số bài toán

### Cơ bản
– [Two Sum](https://leetcode.com/problems/two-sum/)

– [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

– [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

– [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)

### Nâng cao
– [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

– [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)

– [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

– [3Sum](https://leetcode.com/problems/3sum/)

– [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

– [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)

---

Trên đây là các nội dung giúp các bạn học về kiểu cấu trúc dữ liệu mảng.

Hi vọng bạn sẽ hiểu thêm mảng, rất quen thuộc và cũng rất thú vị.

À, mình có [một repo nơi giải leetcode hàng tuần](https://github.com/GraphicDThanh/learn-algorithms-together), bạn thích thì có thể tham gia nhé.

[Bài viết gốc](https://beautyoncode.com/array/) nằm ở blog cá nhân của mình, mời bạn ghé chơi.

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!