### I. Mở đầu
GraphQL là ngôn ngữ trung gian kết nối giữa Client và Server. Nó không phải là RESTful API và chỉ có 1 endpoint duy nhất. Có thể tùy biến được dữ liệu trả về cho client. Được phát triển bởi Facebook
### II. Vấn đề của RESTful API
* Ta có một bài toán như sau: Có một danh sách post, mỗi post có một danh sách like, trong đó like gồm name và avatar, post  thì gồm title, description, ... Ta đã có sẵn API post, chỉ còn thiếu danh sách like trong post
* Giải quyết bài toán: Trong API của post, ta thêm like vào
* Vấn đề gặp phải: Nếu màn hình phía client chỉ cần thông tin của post như vậy dữ liệu like trả về ở đây sẽ dư thừa, gây ra ảnh hưởng lớn tới performance nếu dữ liệu nhiều
### III. RESTful với GraphQL
![](https://images.viblo.asia/e2c3b1db-44ce-4a95-94df-4d39a4eb5402.png)
* Như hình trên, khi sử dụng RESTful API truyền thống, thì ta sẽ tạo ra nhiều endpoint để truy vấn
* Nhưng sử dụng GraphQL thì ta chỉ cần một endpoint duy nhất
### IV. Một số thuộc tính của GraphQL (đối với client)
1. **Fields:** hiểu đơn giản là các trường ta muốn trả về
```
{
  hero { // đây là field
    name // đây là field
  }
}
```
2. **Argument:** là đối số truyền vào
```
{
  human(id: "1000") { // id: "1000" chính là đối số truyền vào
    name
    height
  }
}
```
3. **Aliases:** Gán một biệt danh khi bạn muốn phân biệt những giá trị trả về từ cùng một API
```
{
// Ta có api hero nhưng đối số truyền vào khác nhau nên giá trị trả về khác nhau
// Ta muốn phân biệt giá trị trả về nào của empireHero, giá trị nào của jediHero
// empireHero và jediHero là aliases
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```
4. **Fragments:** khi ta có quá nhiều câu truy vấn có cùng trường trả về, thì ta tạo fragment. Nó giống như một tệp đóng gói, ta sẽ đem tệp này sử dụng ở nhiều nơi
```
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```
5. **Sử dụng variables**
```
query HeroComparison($first: Int = 3) { // $first là variable được gán kiểu Int có giá trị default 3
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) { // $first được sử dụng trong trường này
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```
Trong playground của graphQL, ta có một khi vực là variables, đấy là nơi ta sẽ khai báo giá trị cho variables
6. **Directives:** ta có 2 loại directives là `@include` và `@skip`, như tên gọi, tùy vào trường hợp mà ta sử lý thế nào cho hợp lý
```
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
    girlFriends @skip(if: $withFriends) {
      name
    }
  }
}
```
7. **Query và Mutation**
* Query: được dùng khi chúng ta muốn hiển thị gì đấy, như show list hay show detail của post
* Mutation: được dùng khi chúng ta muốn tạo mới, chỉnh sửa hay xóa record thì mutation sẽ được sử dụng
* Có thể dùng ngược lại vì việc defined xem, tạo, xóa, sửa sẽ do phía Back-end xử lý. Nhưng khuyên mọi người đừng có làm như thế =))
### V. Tham khảo
https://graphql.org/learn