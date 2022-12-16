Khi bắt đầu học một framwork, mọi người có xu hướng tuân theo coding convention và cấu trúc dự án mà họ được tiếp xúc trong các bài tập ví dụ hoặc project demo nào đó mà họ lượm lặt được trên mạng, và áp dụng luôn vào dự án thực tế. Đa phần các ví dụ này đều có các cấu trúc khó có khả năng scaleable trong tương lai, chính vì vậy hôm nay tôi sẽ giới thiệu cho bạn cách cấu trúc dự án React Native như thế nào mới là đúng !!!
# Tôi thấy rằng hầu hết tất cả các ví dụ React Native đã được tạo bằng phương pháp Package by Layer (PBL). Trong PBL, các packages cấp cao nhất phản ánh các "layer"(lớp) khác nhau như các **components**, **actions**, **reducers**, vv... 
Thậm chí tôi còn thấy 1 vài superstar trong giới developer cũng áp dụng luôn cấu trúc này !!!. Điều này làm ảnh hưởng đến cơ số anh em dev chúng ta, hãy xem [TODO app ](https://www.freecodecamp.org/news/how-to-build-a-real-time-todo-app-with-react-native-19a1ce15b0b3/) hoặc [Facebook Messenger Clone](https://medium.com/@victorvarghese/building-facebook-messenger-clone-in-react-native-6d0f77bcd926)
# Mục đích chính của bài viết này để giới thiệu và tiếp cận cấu trúc thư mục Package by Feature
Hãy cùng phân tích điểm sai của PBL  trong dự án thực tế:
```
└── src
    ├── actions
    │   ├── favoritesActions.js
    │   ├── filterActions.js
    │   └── topPostsActions.js
    ├── api
    │   └── redditApi.js
    ├── components
    │   ├── favorites
    │   │   ├── Favorites.js
    │   │   └── styles.js
    │   ├── filter
    │   │   ├── Filter.js
    │   │   └── styles.js
    │   └── topposts
    │       ├── TopPosts.js
    │       └── styles.js
    ├── reducers
    │   ├── favoritesReducer.js
    │   ├── filterReducer.js
    │   └── topPostsReducer.js
    └── utils
        ├── formatter.js
        └── securityHelper.js
```
Mấy ông nhìn có quen không =)) , lại chả quen quá đi, chính tôi cũng đã từng mắc sai lầm khi sử dụng cấu trúc thư mục như thế này. Cùng phân tích nhé:
    PBL thiếu tính modun hóa, tính tách biệt rất mơ hồ, mỗi package chưa các item thường liên quan chặt chẽ đến nhau, vì thế nó gây ra nhiều sự liên kết giữa các package, như các ông đã biết, càng liên kết nhiều thì tính mở rộng, sửa đổi càng khó khăn. Trả lời giúp tôi mấy câu hỏi :
1. Nó có trình bày được hết tất cả tính năng khi một ông dev nào đó clone project về máy hay không ?
2. Liệu ông dev ấy muốn thêm/xóa/sửa tính năng nào đó có dễ dàng không ?
Thôi để tôi trả lời luôn cho nhé :
1. => Đương nhiên là không, ko thể thấy hết tính năng của project được, tất cả những gì ổng có thể nhìn là project này gồm nhữn thành phần gì, như cái ví dụ trên kia của tôi, các thành phần gồm api, component, reducers, utils....
2. => Chắc chắn là không nốt, ổng muốn sửa tính năng nào thì ổng phải vào lục lọi hết các thành phần để xem tính năng này cần sửa ở những đâu. Ví dụ như trên kia, tôi muốn sửa phần favorite, tôi phải vào tìm tận 3 thư mục : component/favorite/favorite.js , reducers/favoritesReducer.js, action/favoritesAction.js .... 

Đấy , phải duyệt 1 đống file trong thư mục, chưa kể project lớn, mỗi layer có tới vài chục file thì đi mà mò nhé.
Vậy hôm nay chúng ta phải làm gì đây (cac cac cac cac cac)
# Package by Feature sẽ giải quyết cho mấy ông 
PBF dùng package để chứa các tính năng, hay chưa. Nó làm tăng sự gắn kết trong cùng một mô-đun và có giảm thiểu phụ thuộc giữa các gói. Cách tiếp cận PBF cho phép duy trì cấu trúc đúng cách và cũng tăng khả năng đọc, sửacode. PDF có tính mô đun cao.

Đây là ví dụ cho các ông dễ hiểu :

```
└── src
    ├── api
    │   └── redditApi.js
    ├── features
    │   ├── favorites
    │   │   ├── Favorites.js
    │   │   ├── favoritesActions.js
    │   │   ├── favoritesReducer.js
    │   │   └── styles.js
    │   ├── filter
    │   │   ├── Filter.js
    │   │   ├── filterActions.js
    │   │   ├── filterReducer.js
    │   │   └── styles.js
    │   ├── shared
    │   │   └── utils
    │   │       └── formatter.js
    │   └── topposts
    │       ├── TopPosts.js
    │       ├── styles.js
    │       ├── topPostsActions.js
    │       └── topPostsReducer.js
    └── shared
        └── utils
            └── securityHelper.js
```
Tôi không đi vào chi tiết cách cấu trúc của PBF nữa , mấy ông tham khảo [ở đây ](https://medium.freecodecamp.org/how-to-structure-your-project-and-manage-static-resources-in-react-native-6f4cfc947d92).
Khen mãi rồi, cũng phải chê chút, nói về nhược điểm nhé:
 - Đôi khi, chúng ta sẽ gặp phải khó khăn khi sắp xếp và đặt tên các package như thế nào cho hiệu quả  .
 - Khi có số lượng file/class ngày càng tăng trong một package, nó sẽ rất hỗn độn. Mấy ông có thể giải quyết vấn đề như vậy bằng cách xác lại các tính năng trong package và mở rộng tính năng đó ra vào 1 package khác, đừng để quá nhiều tính năng phụ vào tính năng chính. 
Một vài lời khuyên nếu đi theo cách tiếp cận này: hãy kiểm tra thật kỹ các sự phụ thuộc của package và đặc biệt tránh sự phụ thuộc "vòng tròn" (A phụ thuộc B, và B phụ thuộc lại A)  giữa các package. Một thiết kế tốt sẽ trông giống như một cái cây - với các chức năng lớn phụ thuộc vào một tập hợp các chức năng/dịch vụ nhỏ hơn , v.v.
Ngoài lề
Chính thằng Android trước đây cũng đã có 1 cuộc cách mạng tẩy chay cấu trúc PBL, và giờ đây , google đã nhảy vào tạo ra Google Architecture Samples , đương nhiên được cấu trúc theo PBF, hãy xem ví dụ  ngày xưa :
```
└── src
    └── com
        └── example
            ├── activities
            │   ├── FavoritesActivity.java
            │   ├── FilterActivity.java
            │   └── TopPostsActivity.java
            ├── api
            │   └── RedditAPI.java
            ├── fragments
            │   ├── FavoritesFragment.java
            │   ├── FilterFragment.java
            │   └── TopPostsFragment.java
            └── utils
                ├── Formatter.java
                └── SecurityHelper.java
```
Và bây giờ :
```
└── src
    └── com
        └── example
            ├── api
            │   └── RedditAPI.java
            ├── features
            │   ├── favorites
            │   │   ├── FavoritesActivity.java
            │   │   └── FavoritesFragment.java
            │   ├── filter
            │   │   ├── FilterActivity.java
            │   │   └── FilterFragment.java
            │   ├── topposts
            │   │   ├── TopPostsActivity.java
            │   │   └── TopPostsFragment.java    
            │   └── shared
            │       └── utils
            │           └── Formatter.java
            └── shared
                └── utils
                    └── SecurityHelper.java
```

Đấy, đến mấy anh Gồ còn sử dụng PBF thì tại sao mấy ông còn dùng PBL làm gì, chuyển hết qua PBF đê

# Kết luận:
PBL giúp dễ dàng hơn trong việc học tích hợp thư viện vì tất cả các mã liên quan được giữ ở cùng một nơi. Nhưng phương pháp PBF giúp dự án dễ đọc hơn về mặt hiểu biết về cách các tính năng hoạt động và mối quan hệ giữa chúng. Các nhà phát triển (iOS, Android) đã sử dụng cấu trúc này cho các demo và trong dự án thật.
Hãy viết các dự án với cấu trúc PBF trên React Native và mọi người sẽ hiểu nhiều hơn về code của bạn so với phương pháp PBL.