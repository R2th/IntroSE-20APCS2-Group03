![](https://images.viblo.asia/5c0ea105-1da9-48cb-82ab-85c4e0ffcf56.png)

> Đã bao giờ bạn gặp khó khăn khi phải suy nghĩ nên đặt tên biến/hàm như thế nào trong lúc code?

Nếu câu trả lời là No, hi vọng là vì bạn đã hiểu rõ và tự tin vào cách đặt tên của mình, còn nếu No vì bạn chả bao giờ quan tâm đến cách đặt tên, thì xin chia buồn, bạn đã gián tiếp tạo nghiệp cho anh em trong team khi phải review code, hoặc những hậu bối khi phải maintain code của bạn, bởi vì, họ ít nhiều đang ngồi rủa bạn 😅

Nếu câu trả lời là Yes, thì hoan nghênh bạn đến với bài tổng hợp các quy tắc đặt tên cho hàm/biến từ một repo cực kỳ hay ho mà mình tìm được trên Github: [**kettanaito/naming-cheatsheet**](https://github.com/kettanaito/naming-cheatsheet#naming-cheatsheet). Đa phần nội dung trong bài viết mình dựa trên repo đó, nhưng một số chỗ và ví dụ đã được mình chỉnh sửa cho đơn giản và dễ hiểu hơn. Lưu ý là tuy ngôn ngữ lập trình được sử dụng trong các ví dụ là JavaScript, nhưng các quy tắc này có thể được áp dụng cho bất kỳ ngôn ngữ nào.

# Dùng tiếng Anh
> Luôn sử dụng tiếng Anh để đặt tên hàm và biến.

Tiếng Anh là ngôn ngữ tất yếu trong lập trình, từ chính cú pháp được viết bằng tiếng Anh, đến các tài liệu nghiên cứu, giáo dục, hầu hết cũng bằng tiếng Anh. Nên khi bạn viết code bằng tiếng Anh, code của bạn và cú pháp sẽ liền mạch hẳn. Nếu như bạn cảm thấy khả năng tiếng Anh của mình chưa tốt thì lời khuyên chân thành là nên cố gắng trau dồi, ít nhất đạt được khả năng đọc viết ở mức ok.

```javascript
/* Bad */
const hoTen = "Trạng Tí"
const banBe = ["Sửu Ẹo", "Dần Béo", "Cả Mẹo"]

/* Good */
const fullName = "Trạng Tí"
const friends = ["Sửu Ẹo", "Dần Béo", "Cả Mẹo"]
```

# Quy ước đặt tên
> Quy ước nào cũng được, quan trọng là consistency (nhất quán).

Nếu team của bạn chọn quy ước đặt tên là `camelCase`, hãy sử dụng `camelCase` cho toàn bộ dự án, nếu bạn qua một team khác chuộng `snake_case` hơn, hãy tuân thủ nghiêm ngặt. Cho dù là quy ước nào thì điều quan trọng nhất chính là tính nhất quán.

```javascript
/* Bad */
const page_count = 5
const isUser = true

/* Good */
const pageCount = 5
const isUser = true

/* Good as well */
const page_count = 5
const is_user = true
```

# Nguyên tắc S-I-D
> Short, Intuitive, Descriptive.

* **Short** (ngắn gọn): tên không được dài, không phải mất thời gian để gõ và nhớ.
* **Intuitive** (tự nhiên): tên khi đọc lên phải cho cảm giác xuôi tai, gần gũi với văn nói.
* **Descriptive** (súc tích): tên phải mô tả được ý nghĩa, tác dụng của nó, bằng cách hiệu quả nhất.

```javascript
/* Bad */
const totalNumberOfPublishedArticles = 10 // tên quá dài
const a = 5 // "a" không mô tả được số 5 để làm gì
const isDisplayable = a > 5 // "isDisplayable" nghe không tự nhiên lắm

/* Good */
const totalArticles = 10
const postCount = 5
const shouldDisplay = postCount > 5
```

# Tránh viết tắt
> Không được sử dụng từ viết tắt.

Viết tắt không giúp ích gì mà chỉ làm code của bạn khó đọc hơn. Có thể bạn thấy từ viết tắt đó dễ hiểu đối với bạn, nhưng chắc gì người khác hiểu được. Có thể bạn khó nghĩ ra một cái tên vừa ngắn vừa súc tích, nhưng nên cố gắng nghĩ cho ra, không nên chọn giải pháp viết tắt.

```javascript
/* Bad */
function onItmClk(ev) { }

/* Good */
function onItemClick(event) { }
```

# Tránh lặp từ
> Tận dụng context để đặt tên không lặp từ.

Ví dụ về một context thường thấy là trường hợp khi khai báo hàm trong một class, nhiều bạn có xu hướng đặt tên hàm có chứa từ đã có trong class. Có thể lược bỏ các từ đó đi để tên hàm được gọn và dễ đọc hơn.

```javascript
class User {
    /* Bad */
    updateUserProfile() { }

    /* Good */
    updateProfile() { }
}
```

# Số ít, số nhiều
> Áp dụng ngữ pháp số nhiều của tiếng Anh.

Đối với mảng có chứa nhiều phần tử, chúng ta có thể sử dụng ngữ pháp số nhiều của tiếng Anh để đặt tên, vừa ngắn gọn, vừa đủ nghĩa. *Trong tiếng Anh, đối với danh từ đếm được, chúng ta chỉ cần thêm `s` ở cuối danh từ để biểu thị số nhiều.*

```javascript
/* Bad */
const friend = ["Sửu Ẹo", "Dần Béo", "Cả Mẹo"]

/* Good */
const friends = ["Sửu Ẹo", "Dần Béo", "Cả Mẹo"]
```

# Tên hàm kiểu A/HC/LC
Đối với tên hàm, có một kiểu đặt tên cực kỳ phổ biến mà có lẽ các bạn ít nhiều cũng đã từng gặp qua. Kiểu đó có dạng như sau:
```
prefix? + action (A) + high context (HC) + low context? (LC)
```

Ví dụ:
| Name | Prefix   | Action (A) | High context (HC) | Low context (LC) |
| ---------------------- | -------- | ---------- | ----------------- | ---------------- |
| `getUser`              |          | `get`      | `User`            |                  |
| `getUserMessages`      |          | `get`      | `User`            | `Messages`       |
| `handleClickOutside`   |  | `handle`   | `Click`           | `Outside`        |                
| `shouldDisplayMessage` |  `should` | `Display`  | `Message`         |                 |

Nhìn quen chứ? Chúng ta sẽ đi sâu vào từng phần để hiểu rõ hơn. Một lưu ý quan trọng là thứ tự của các chữ cũng có ảnh hưởng đến ý nghĩa của tên. Ví dụ như `shouldUpdateComponent` có nghĩa **bạn** là người sẽ update component, nhưng khi đảo thứ tự thành `shouldComponentUpdate`, nghĩa là **component** sẽ tự update, bạn chỉ kiểm soát khi nào nó được update thôi.

## Actions
> Động từ chỉ hành động của hàm

Đa số các hàm đều sẽ bắt đầu bằng action để diễn tả hàm này sẽ làm gì. Một số từ dùng làm action phổ biến:

**`get`**: Truy xuất/lấy dữ liệu.
```javascript
class User {
    getRole() {
        return this.role;
    }
}
user.getRole();
```

**`set`**: Gán giá trị cho biến.
```javascript
class User {
    setRole(newRole) {
        this.role = newRole;
    }
}
user.setRole("Admin");
```

**`reset`**: Đặt lại giá trị/trạng thái ban đầu.
```javascript
class User {
    resetRole() {
        this.role = "User";
    }
}
user.resetRole();
```

**`fetch`**: Gửi request để lấy dữ liệu.
```javascript
function fetchUsers() {
    return fetch("https://api.viblo.asia/users", {...});
}
```

**`remove`**: Loại bỏ một phần tử khỏi mảng, danh sách, hoặc tập hợp (cần lưu ý điểm khác biệt giữa `remove` và `delete`).
```javascript
function removeItem(name, items) {
    return items.filter((itemName) => itemName !== name);
}
const initialItems = ["Giày", "Dép", "Quần áo"];
removeItem("Dép", initialItems); // ["Giày", "Quần áo"]
```

**`delete`**: Xóa bỏ hoàn toàn sự tồn tại của một cá thể.
```javascript
function deletePost(id) {
    return database.find({ id }).delete();
}
```

**`create`**: Tạo dữ liệu mới.
```javascript
function createRole(roleInfo) {
    return database.create(roleInfo);
}
```

**`handle`**: Xử lý sự kiện hoặc callback (ngoài `handle` thì `on` cũng hay được sử dụng).
```javascript
function handleClick(event) {
    console.log(event.target);
}
button.addEventListener("click", handleClick);
```

## Context
> Bối cảnh xử lý của hàm

Hiểu đơn giản thì context là mục đích của hàm, hàm tồn tại để xử lý cái gì. Ví dụ:
```javascript
/* "Role" là context của hàm, hàm tồn tại để tạo role  */
function createRole(roleInfo) { }

/* "RecentPosts" là context của hàm, với "Recent" gọi là Low Context,
 và "Posts" gọi là High Context, hoặc có thể ngược lại */
function getRecentPosts(user) { }
```

Trong một số trường hợp, có thể bỏ qua không cần dùng context. Ví dụ như khi hàm được khai báo trong một class, hoặc khi hàm đó chuyên được dùng để xử lý một kiểu dữ liệu nào đó:

```javascript
/* Class Role đã là context của hàm */
class Role {
    create(roleInfo) { }
}

/* Sort chuyên được dùng để sắp xếp danh sách/mảng,
 không cần thiết phải thêm sortList hay sortArray */
function sort(condition, list) { }
```

## Prefixes
> Tiền tố giúp tăng ý nghĩa của hàm/biến

**`is`**: Mô tả đặc điểm hoặc trạng thái của context (thường là `boolean`).
```javascript
const color = "blue"
const isBlue = color === "blue" // đặc điểm
const isPresent = true // trạng thái

if(isBlue && isPresent) {
    console.log("Blue is present");
}
```

**`has`**: Xác định sự tồn tại hoặc trạng thái của context (thường là `boolean`).
```javascript
/* Bad */
const isProductsExist = productCount > 0 // sai ngữ pháp
const areProductsPresent = productCount > 0 // chưa gọn, đọc không xuôi tay lắm

/* Good */
const hasProducts = productCount > 0
```

**`should`**: Thể hiện điều kiện sẽ xảy ra của một hành động (thường là `boolean`).
```javascript
function shouldUpdateUrl(url, expectedUrl) {
    return url !== expectedUrl;
}
```

**`min`/`max`**: Mô tả giới hạn của context (thường là `numeric`).
```javascript
function getPosts(posts, minPosts, maxPosts) {
    return posts.slice(0, randomBetween(minPosts, maxPosts));
}
```

**`prev`/`next`**: Thể hiện sự chuyển từ trạng thái cũ sang trạng thái mới.
```javascript
function fetchPosts() {
    const prevPosts = this.state.posts;
    const fetchedPosts = fetch(...);
    const nextPosts = concat(prevPosts, fetchedPosts);
    this.setState({ posts: nextPosts });
}
```

----
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)