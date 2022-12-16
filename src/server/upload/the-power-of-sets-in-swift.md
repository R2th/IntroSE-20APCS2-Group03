Mặc dù Set là một trong core data structure của hầu hết các ngôn ngữ lập trình. Nhưng đôi khi chúng ta rất hay bỏ qua không lựa chọn nó để lưu trữ collections mà chỉ toàn sử dụng Array (non-keyed objects) hay Dictionary (keyed objects).

Hôm nay mình sẽ giới thiệu các lợi ích mà Set mang lại để mọi người có thể dùng nó hiệu quả hơn trong những tình huống thích hợp chứ không phải mặc định lúc nào cũng dùng Array.
### Constant time
Một trong những đặc điểm chính của **Set** là nó lưu trữ members dựa trên hash value thay vì dựa trên index giống Array. Tức là, **Set** hy sinh việc đảm bảo thứ tự sắp xếp của members để đảm bảo thời gian tra cứu không đổi (O(1)).

Ví dụ: Khi bạn lưu một mảng lớn các giá trị không cần sắp xếp, giống như theo dõi tất cả IDs của bạn bè chẳng hạn.
```
struct User {
    var friendIDs = Set<UUID>()
}
```
Bằng cách sử dụng Set thay vì dùng Array chúng ta có thể tránh bất kỳ tắc nghẽn nào về hiệu suất khi số lượng friends lớn. 

Để kiểm tra user là friend của một user khác không chúng ta có thể sử dụng ***contains API*** 
- Đối với Array thì bắt buộc phải kiểm tra từng phần tử dẫn đến khi kích thước collections tăng thì sẽ ảnh hưởng đến tốc độ tra cứu.
- Trong khi tra cứu theo hash value đối với Set thì luôn nhanh và time tra cứu không đổi bất kể kích thước của collections.
### Indexing
Set rất tuyệt khi bạn không quan tâm thứ tự của collections. Tuy nhiên, khi có một collection đã được sắp xếp nó cũng rất hữu ích, nếu chúng ta có thể tối ưu hoá code để thể tận dụng được.

Ví dụ: Xây dựng một app cho phép user xếp hạng cho movie. Yêu cầu: List ra toàn bộ movie đã được xếp hạng theo thứ tự.

1. Lưu trữ ratings theo cách giữ nguyên thứ tự.
    ```
    class RatingsManager {
        private typealias Rating = (score: Int, movieID: UUID)

        private var ratings = [Rating]()
    }
    ```
  
  2. Kiểm tra movie đã được đánh rate hay chưa.

        ```
        extension RatingsManager {
            func containsRating(for movie: Movie) -> Bool {
                for rating in ratings {
                    if rating.movieID == movie.id {
                        return true
                    }
                }

                return false
            }
        }
        ```
==> Not good. Vì phải duyệt từng phần tử của mảng nếu mảng có size lớn thì phiền phức. :(

Mặc dù chúng ta không thể sử dụng Set để lưu trữ ratings (vì điều đó sẽ phá huỷ thứ tự) chúng ta có thể sử dụng 1 set như một index. Index là một kỹ thuật rất hay được sử dụng trong thiết kế database, nó cho phép tracking nhanh thông qua việc lưu trữ dưới dạng keys. Điều thú vị là chúng ta có thể dùng cùng một kỹ thuật để đảm bảo time tra cứu không đổi.
* Lưu ID của movies trong 1 Set.
    ```
    class RatingsManager {
        typealias Rating = (score: Int, movieID: UUID)

        private var ratings = [Rating]()
        private var movieIDs = Set<UUID>()
    }
    ```
* Insert rating trong array ratings và movieID trong movieIDs Set.
    ```
    extension RatingsManager {
        func insertRating(_ score: Int, for movie: Movie) {
            ratings.append((score, movie.id))
            movieIDs.insert(movie.id)
        }
    }
    ```
* Update lại hàm check movie đã được đánh rate hay chưa.
    ```
    extension RatingsManager {
        func containsRating(for movie: Movie) -> Bool {
            return movieIDs.contains(movie.id)
        }
    }
    ```
Như vậy trên đây là cách tốt nhất để sắp xếp data một cách nhanh chóng đồng thời đảm bảo time kiểm tra member tồn tại không đổi (constant time API).

### Comparing datasets
Swift's Set cung cấp nhiều APIs hữu ích để so sánh 2 datasets.

**Ví dụ:** 
1. Kiểm tra xem User có bất kỳ friend nào chung với User khác không?
    * Thông thường chúng ta sẽ viết vòng lặp:
    ```
    extension User {
        func hasFriendsInCommon(with otherUser: User) -> Bool {
            for id in friendIDs {
                if otherUser.friendIDs.contains(id) {
                    return true
                }
            }

            return false
        }
    }
    ```
    * Sử dụng isDisjoint API: code đơn giản hơn rất nhiều :)
    ```
    extension User {
        func hasFriendsInCommon(with otherUser: User) -> Bool {
            return !friendIDs.isDisjoint(with: otherUser.friendIDs)
        }
    }
    ```
2. Tương tự, để check tất cả friend có chung friend với user khác hay không?
    ```
    extension User {
        func hasAllFriendsInCommon(with otherUser: User) -> Bool {
            return friendIDs.isSubset(of: otherUser.friendIDs)
        }
    }
    ```
3. List ra tất cả friend chung của 2 User:
    ```
    extension User {
        func idsOfFriendsInCommon(with otherUser: User) -> Set<UUID> {
            return friendIDs.intersection(otherUser.friendIDs)
        }
    }
    ```
Ngoài ra còn có các APIs như union, superset, ... các bạn có thể tham khảo thêm tại [Set's official documentation](https://developer.apple.com/documentation/swift/set)

### Conclusion
Sets, arrays, dictionaries và các loại cấu trúc dữ liệu khác đều có ưu và nhược điểm riêng. Chúng tạo ra sự cân bằng khác nhau và được tối ưu hóa cho các trường hợp sử dụng khác nhau. Vì vậy, trong khi Array có lẽ sẽ là công cụ tốt nhất cho công việc trong nhiều tình huống, đôi khi sử dụng một Set lại có thể cho phép chúng tôi dễ dàng speed up code hoặc làm cho nó đơn giản hơn rất nhiều. Chính vì thế hãy nắm rõ các đặc điểm của từng loại để áp dụng một cách linh hoạt hơn nhé. Thanks!