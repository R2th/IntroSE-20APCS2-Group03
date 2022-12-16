![](https://images.viblo.asia/74027cb6-c331-4043-9832-73847d582537.jpeg)

# 1. Giới thiệu
**Traits** là một khái niệm trong Rust, tương tự như **interface** ở các ngôn ngữ lập trình khác, mặc dù có số số điểm khác biệt. 

Mỗi kiểu dữ liệu sẽ có một số phương thức được định nghĩa và chỉ biến thuộc kiểu dữ liệu đó mới có thể gọi. Nếu muốn chia sẻ một phương thức mà nhiều kiểu có thể dùng chung, tùy biến lại theo từng kiểu thì chúng ta sẽ cần dùng đến **traits**.


Ở đây chúng ta có 2 struct là `NewArticle` và `Tweet` có các trường dữ liệu khác nhau, cả 2 kiểu này đều đang cần một phương thức `summarize` để tóm tắt dữ liệu.

```rust
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}
```


```rust
pub trait Summary {
    fn summarize(&self) -> String;
}
```

Chúng ta định nghĩa **traits** với từ khóa `trait`, theo sau là `Summary` (tên của trait).  Hàm `summarize`  trả về kiểu `String`. Cũng như các hàm trong **interface** ở 1 số ngôn ngữ khác, hàm trong **traits** kết thúc bởi dấu `;` và không có thân hàm. Bởi nó chỉ là nguyên mẫu để các kiểu dữ liệu khác implement mà thôi.

## 2. Implement Trait


### Implement trait với kiểu dữ liệu

Giờ là lúc chúng ta triển khai phương thức `summarize` trên 2 struct `NewsArticle` và `Tweet`.

```rust
// src/lib.rs
pub trait Summary {
    fn summarize(&self) -> String;
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
       // trả về chuỗi gồm 3 thông tin: headline, author và localtion
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
         // trả về chuỗi gồm 2 thông tin: username và content
        format!("{}: {}", self.username, self.content)
    }
}
```

Implement một **trait** cho một kiểu dữ liệu cũng tương tự như cách implement một method thông thường cho kiểu dữ liệu đó. Chỉ khác chút là sau từ khóa `impl` sẽ là tên của **trait** bạn muốn sử dụng rồi kèm theo từ khóa `for`.

Bây giờ thư viện đã triển khai đặc điểm Tóm tắt trên NewsArticle và Tweet, người dùng của thùng có thể gọi các phương thức đặc điểm trên các phiên bản NewsArticle và Tweet giống như cách chúng ta gọi các phương thức thông thường. Sự khác biệt duy nhất là người dùng phải đưa đặc điểm vào phạm vi cũng như các loại. Dưới đây là một ví dụ về cách thùng nhị phân có thể sử dụng thùng thư viện tổng hợp của chúng tôi:

Chúng ta vừa triển khai việc implement Summary **trait** cho 2 kiểu `NewsArticle` và `Tweet`. Bây giờ, chúng ta có thể gọi phương thức `summarize` từ các instance của `NewsArticle` hay `Tweet` như các phương thức thông thường. Tất nhiên là tùy theo instace đó thuộc kiểu `NewsArticle` hay `Tweet`  mà hàm `summarize` tương ứng sẽ được thực thi.

```rust
use aggregator::{Summary, Tweet};

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    };

    println!("1 new tweet: {}", tweet.summarize());
    // 1 new tweet: horse_books: of course, as you probably already know, people
}
```

### Implement mặc định (Default Implementations)


Đôi khi sẽ hữu ích khi có hành vi mặc định cho một số hoặc tất cả các phương thức trong một đặc điểm thay vì yêu cầu triển khai cho tất cả các phương thức trên mọi loại. Sau đó, khi chúng tôi triển khai đặc điểm trên một loại cụ thể, chúng tôi có thể giữ hoặc ghi đè hành vi mặc định của mỗi phương thức.

Đôi khi chúng ta sẽ cần một phương thức mặc định chung có các kiểu thay vì phải triển khai các phương thức trên từng kiểu khác nhau. Sau đó, nếu muốn thay đổi tùy theo kiểu dữ liệu, chúng ta có thể lựa chọn phương án ghi đè (override).

```rust
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

// Sử dụng phương thức summarize mặc định của trait Summary
impl Summary for NewsArticle {}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
   // Ghi đè phương thức summarize mặc định
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

```rust
use aggregator::{self, NewsArticle, Summary};

fn main() {
    let article = NewsArticle {
        headline: String::from("Penguins win the Stanley Cup Championship!"),
        location: String::from("Pittsburgh, PA, USA"),
        author: String::from("Iceburgh"),
        content: String::from(
            "The Pittsburgh Penguins once again are the best \
             hockey team in the NHL.",
        ),
    };

    println!("New article available! {}", article.summarize());
   // New article available! (Read more...)
}
```

Phương thức mặc định có thể gọi các phương thức khác cùng **trait** với nó, ngay cả khi phương thức đó chỉ ở dạng nguyên mẫu (prototype). Tính năng này sẽ cung cấp nhiều thứ hữu ích, chúng ta cùng xem qua ví dụ dưới đây:

```rust
pub trait Summary {
    fn summarize_author(&self) -> String;
    
    // phương thức summarize gọi phương thức summarize_author để in ra kết quả
    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    // Triển khai phương thức summarize_author in ra @ + tên tác giả
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}
```

```rust
use aggregator::{self, Summary, Tweet};

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    };

    println!("1 new tweet: {}", tweet.summarize());
    // 1 new tweet: (Read more from @horse_ebooks...)
}
```

Thay vì trả về 1 chuỗi cố định như ở ví dụ trước, thì phương thức `summarize` bằng cách gọi `summarize_author` đã tùy biến được tên tác giả Tweet trong kết quả trả về :D

### Trait làm tham số

Chúng ta đã biết cách xác định và triển khai **trait** ở phần trên. Ngoài ra, **trait** cũng có thể đóng vai trò làm tham số trong hàm khi được định nghĩa với từ khóa `impl` như sau:

```rust
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

Thay vì định nghĩa kiểu dữ liệu struct cần truyền vào `NewArticle` hay `Tweet` chẳng hạn, ta sẽ thay bằng `&impl`. Tham số đầu vào của hàm lúc đó sẽ nhận tất cả kiểu dữ liệu đã implement **trait** Summary. Nếu truyền vào 1 kiểu dữ liệu chưa implement **trait**, trình biên dịch sẽ báo lỗi.

```russ
pub trait Summary {
    fn summarize(&self) -> String;
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}

pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

fn main() {
    let tweet = Tweet {
        username: String::from("Pool and Billiards for Dummies"),
        content: String::from(
            "Billards Pool",
        ),
        reply: false,
        retweet: false,
    };
    
     let article = NewsArticle {
        headline: String::from("Penguins win the Stanley Cup Championship!"),
        location: String::from("Pittsburgh, PA, USA"),
        author: String::from("Iceburgh"),
        content: String::from(
            "The Pittsburgh Penguins once again are the best \
             hockey team in the NHL.",
        ),
    };
    
    notify(&tweet);
    // Breaking news! Pool and Billiards for Dummies: Billards Pool
    
    notify(&article);
    // Breaking news! Penguins win the Stanley Cup Championship!, by Iceburgh (Pittsburgh, PA, USA)
}
```

### Trait Bound Syntax

Ngày cách định nghĩa **trait** là tham số của hàm như trên, chúng ta có thể sử dụng cú pháp theo kiểu **generic** như sau:

```rust
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
```

Trong trường hợp hàm có nhiều tham số **trait**, các này sẽ giống code trông ngắn gọn hơn hẳn :D

```rust
pub fn notify(item1: &impl Summary, item2: &impl Summary) {

}

pub fn notify<T: Summary>(item1: &T, item2: &T) {

}
```

`<T: Summary>` ám chỉ rằng **T** chỉ nhận các kiểu dữ liệu cho implement trait `Summary`

#### Sử dụng toán tử +

Khi muốn tham số đầu vào là 1 kiểu dữ liệu implement cùng lúc nhiều **trait** thì sao nhỉ 🤔 ? Chúng ta sẽ sử dụng đến phép toán **+** :D


```rust
pub fn notify(item: &(impl Summary + Display)) {

}

// hoặc

pub fn notify<T: Summary + Display>(item: &T) {

}
```

Kiểu dữ liệu truyền vào yêu cầu phải implement cả 2 **trait**

#### Sử dụng từ khóa where

Khi định nghĩa nhiều kiểu dữ liệu **generic** cộng với mỗi kiểu lại cần implement nhiều **trait** thì cú pháp định nghĩa sử dụng dấu **+** có phần khá cồng kềnh khi kéo dài lình thình dòng định nghĩa hàm.


```rust
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {
```

Thay vào đó, chúng ta có thể sử dụng từ khóa **where**, phần định nghĩa các **trait** cần thiết sẽ được đưa xuống dòng thứ 2, giúp code trông tường mình, gọn gàng hơn ở ví dụ trên.

```rust
fn some_function<T, U>(t: &T, u: &U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{
```

## 3. Trả về kiểu trait

**Trait** có thể được định nghĩa là kiểu trả về trong 1 hàm, chúng ta cùng xem ví dụ dưới đây.

```rust
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    }
}
```

Tất nhiên kiểu dữ liệu trả về cần phải implement trait `Summary` :D


Tuy nhiên, bạn chỉ có thể sử dụng Impl Trait nếu bạn đang trả lại một kiểu duy nhất. Ví dụ dưới đây trả về `NewsArticle` hoặc `Tweet` sẽ bị báo lỗi :/

```rust
fn returns_summarizable(switch: bool) -> impl Summary {
    if switch {
        NewsArticle {
            headline: String::from(
                "Penguins win the Stanley Cup Championship!",
            ),
            location: String::from("Pittsburgh, PA, USA"),
            author: String::from("Iceburgh"),
            content: String::from(
                "The Pittsburgh Penguins once again are the best \
                 hockey team in the NHL.",
            ),
        }
    } else {
        Tweet {
            username: String::from("horse_ebooks"),
            content: String::from(
                "of course, as you probably already know, people",
            ),
            reply: false,
            retweet: false,
        }
    }
}
```


## Tài liệu tham khảo

[Traits: Defining Shared Behavior](https://doc.rust-lang.org/book/ch10-02-traits.html)