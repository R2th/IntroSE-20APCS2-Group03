![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/08/girl-4181395_1280.jpeg)

Tìm [kiếm nhị phân(binary search)](https://vi.wikipedia.org/wiki/T%C3%ACm_ki%E1%BA%BFm_nh%E1%BB%8B_ph%C3%A2n) là một thuật toán tìm kiếm xác định vị trí của một giá trị cần tìm trong một mảng đã được sắp xếp.

Thuật toán sẽ tiến hành so sánh giá trị cần tìm với phần tử đứng giữa của mảng. Nếu hai giá trị không bằng nhau, thì một nửa mảng không chứa giá trị cần tìm sẽ được bỏ qua, và tiếp tục tìm kiếm trên nửa còn lại. Một lần nữa, lấy phần tử ở giữa so sánh với giá trị cần tìm, cứ thế lặp lại cho đến khi tìm thấy giá trị đó. Nếu phép tìm kiếm kết thúc mà vẫn chưa có giá trị cần tìm tức là nó không có trong mảng.

Binary search chạy theo giời gian logarit trong trường hợp tệ nhất, thực hiện O(logn) bước so sánh, với n là số phần tử của mảng. Thuật toán này sẽ nhanh hơn thuật toán tìm kiếm tuyến tính thông thường(lặp qua toàn mảng) là `O(n)`

---

Một số vấn đề thường gặp/cần suy nghĩ khi giải bài toán binary search:

– Khi nào thì sẽ thoát ra khỏi vòng lặp? 

  Nên dùng left < right hay left ≤ right làm điều kiện lặp

– Làm sao để khởi tạo và cập nhật biên bên trái(left), biên bên phải(right)? 

  Nên chọn left = mid hay left = mid + 1 hay right = mid, right = mid – 1?

Vì thế, một bản mẫu tổng quát về cách giải binary search sẽ giúp bạn hình dung về cách giải bài toán này dễ dàng hơn.

## Cách giải tổng quát

Đề bài: Giả sử có một không gian tìm kiếm, có thể là một mảng, một phạm vi, … Thông thường, nó được sắp xếp theo thứ tự tăng dần.

Tìm k thỏa điều kiện với condition sao cho tối ưu nhất:

> Minimize k, s.t. condition(k) is True

**Cách giải tổng quát:**

```python
def binary_search(array) -> int:
    def condition(value) -> bool:
	pass
	
left, right = 0, len(array)

while left < right:
    mid = left + (right + left) // 2

    if condition(mid):
	right = mid
    else:
	left = mid + 1

return left
```

Đối với từng đề bài, bạn chỉ cẩn sửa đổi 3 phần sau:

1. Khởi tạo biên left, right sao cho bao gồm tất cả các phần tử có thể

2. Quyết định giá trị trả về

3. Thiết kế điều kiện kiểm tra(condition) – đây chính là phần thú vị nhất và cũng là khó nhất.

## Vì sao mid = left + (right - left) // 2 mà không là (left + right) // 2

Lúc xem template này mình đã có câu hỏi như vậy. Chỉ là lấy số ở giữa, thì cộng hai bên chia đôi lấy nguyên tức là mid = (left + right) // 2 chứ sao lại có công thức mid = left + (right – left) // 2 ?

Khi mid = (left + right) // 2, với left, right là các số rất lớn, gần bằng 2^31 – 1 chẳng hạn, thì tổng của left + right sẽ lớn hơn 2^31 – 1(số nguyên lớn nhất) và gây tràn số.

Có nhiều cách giải quyết vấn đề này, một trong số đó là left + (right – left) // 2

Bạn có thể đọc thêm ở [đây](https://ai.googleblog.com/2006/06/extra-extra-read-all-about-it-nearly.html)

## Bài toán: First Bad Version
[LeetCode link First Bad Version.](https://leetcode.com/problems/first-bad-version/)

You are a product manager and currently leading a team to develop a new product. Since each version is developed based on the previous version, all the versions after a bad version are also bad. Suppose you have n versions [1, 2, …, n] and you want to find out the first bad one, which causes all the following ones to be bad. You are given an API bool isBadVersion(version) which will return whether version is bad.

Example:

```python
Given n = 5, and version = 4 is the first bad version.

call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true

Then 4 is the first bad version.
```

Giải: 

Không gian tìm kiểm ở đây là từ 1 đến n, sắp xếp theo thứ tự version này release rồi mới đến version khác. 

Vì nếu version nào fail sẽ dẫn đến tất cả những version tiếp theo fail, nên biên của right sẽ thu hẹp dần về left cho đến khi nào tìm được version fail đầu tiên thì thôi.

Áp dụng công thức ở trên vào bài toán này:

1. left bắt đầu từ 0, right bắt đầu từ n

2. giá trị trả về sẽ là left 

3. điều kiện được cho sẵn là hàm isBadVersion() nên sẽ không cần định nghĩa điều kiện. 


```python
def firstBadVersion(self, n):
    left, right = 1, n

    while left < right:

        mid = left + (right - left) // 2

        if isBadVersion(mid):
            right = mid
        else:
            left = mid + 1

    return left
```

## Bài toán: sqrt(x)

[LeetCodeLinkSqrtX](https://leetcode.com/problems/sqrtx/)

Cho một số nguyên x, tìm căn bậc hai của x.

Example 1: Input: x = 4. Output: 2

Giải:

Gọi căn bậc hai của x là k, ta có: x = k * k. Bài toán đưa về tìm số k sao cho k bình phương là x. 

Phạm vi tìm kiếm sẽ là từ 0 tới x, điều kiện là k * k bằng hoặc gần bằng x nhất

```python
def mySqrt(self, x):
    if x == 0:
        return 0
    if x == 1:
        return 1

    left, right = 0, x

    while left < right:
        mid = left + (right - left) // 2

        if round(mid * mid, 2) <= x:
            left = mid + 1
        else:
            right = mid
        
        return left - 1
```

Thêm các bài toán khó hơn nữa mời bạn ghé đọc bài viết của tác giả đóng góp trên LeetCode ở [đây](https://leetcode.com/problems/first-bad-version/discuss/769685/Python-Clear-explanation-Powerful-Ultimate-Binary-Search-Template.-Solved-many-problems) nhé

[Bài viết gốc](https://beautyoncode.com/tim-kiem-nhi-phanbinary-search/) nằm ở blog cá nhân của mình, mời các bạn ghé chơi nhé.

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