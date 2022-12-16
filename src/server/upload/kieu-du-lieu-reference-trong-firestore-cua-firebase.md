Chào mọi người, đợt này mình đang có task liên quan đến việc lưu trữ database trên firestore của firebase. Trong khi nghiên cứu về cách design database trên Firestore mình tìm thấy một cái khá hay của database này nên muốn viết một bài chia sẽ ngắn. Bắt đầu thôi!!!

Đầu tiên, hãy cùng xem định nghĩa của Firestore, "flexible, scalable NoSQL cloud database to store and sync data for client- and server-side development". 

Từ định nghĩa, ta có thể thấy Firestore là một NoSQL database, tức là database không có quan hệ, tương tự như [MongoDB](https://www.mongodb.com/). Một bảng trong Firestore là một collection và một record là một document. Firebase cấu trúc database như là một file system, nên nếu bạn muốn xem document có id `doc` của collection `col` thì bạn chỉ cần nhập `/col/doc` vào console. 

Từ cách cấu trúc dữ liệu theo dạng file system, firebase sinh ra một kiểu dữ liệu - Reference. Kiểu dữ liệu này tác dụng khá giống với Foreign Key strong Relational Datatbase. Ví dụ bạn có bảng `League` lưu thông tin giải đấu và `Club` lưu thông tin của câu lạc bộ. Thông thường, ta sẽ lưu có trường `league_id` trong bảng club. Để biết câu lạc bộ có id `1` đang chơi ở giải nào thì bạn sẽ phải dùng 2 câu truy vấn.

``` javascript
const club = db.collection("clubs").doc('1').get().data();
const league = db.collection("leagues").doc(club.league_id).get().data();
```
 
Tuy nhiên, nếu thay vì lưu `league_id` để lưu thông tin của league mà club này đang thi đấu, ta sẽ lưu refernce của League đó với tên leagueRef, thì ta chỉ cần 1 câu truy vấn để lấy được League mà t cần.
    
``` javascript
 const league = db.collection("clubs").doc('1').get().data().leagueRef.get().data();
 ```
   
Đơn giản và tường minh hơn đúng k nào. 

Để insert kiểu dữ liệu reference vào cũng rất đơn giản,
``` javascript

const club = {
    name: "Chelsea",
    leagueRef: db.doc("league/1"); // league_id của Premier League là `1`
}
```

Cảm ơn các bạn đã đọc bài chia sẽ ngắn của mình, hi vọng nó sẽ giúp ích!
 Chúc các bạn một ngày làm việc vui vẻ.