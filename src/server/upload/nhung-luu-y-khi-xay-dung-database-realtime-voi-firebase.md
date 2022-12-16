## Những lưu ý khi xây dựng database realtime với Firebase:

### 1. Sử dụng Flatten data structures thay cho nesting data:

vd: cấu trúc nesting:

```js
{
  // This is a poorly nested data architecture, because iterating the children
  // of the "chats" node to get a list of conversation titles requires
  // potentially downloading hundreds of megabytes of messages
  "chats": {
    "one": {
      "title": "Historical Tech Pioneers",
      "messages": {
        "m1": { "sender": "ghopper", "message": "Relay malfunction found. Cause: moth." },
        "m2": { ... },
        // a very long list of messages
      }
    },
    "two": { ... }
  }
}
```

Phải chuyển thành : -> Flatten structure ( Denormalization)

```js
{
  // Chats contains only meta info about each conversation
  // stored under the chats's unique ID
  "chats": {
    "one": {
      "title": "Historical Tech Pioneers",
      "lastMessage": "ghopper: Relay malfunction found. Cause: moth.",
      "timestamp": 1459361875666
    },
    "two": { ... },
    "three": { ... }
  },

  // Conversation members are easily accessible
  // and stored by chat conversation ID
  "members": {
    // we'll talk about indices like this below
    "one": {
      "ghopper": true,
      "alovelace": true,
      "eclarke": true
    },
    "two": { ... },
    "three": { ... }
  },

  // Messages are separate from data we may want to iterate quickly
  // but still easily paginated and queried, and organized by chat
  // conversation ID
  "messages": {
    "one": {
      "m1": {
        "name": "eclarke",
        "message": "The relay seems to be malfunctioning.",
        "timestamp": 1459361875337
      },
      "m2": { ... },
      "m3": { ... }
    },
    "two": { ... },
    "three": { ... }
  }
}
```

### 2. Tạo cấu trúc data để có thể scales mà ko ảnh hưởng đến performance khi fetch data:

Ví dụ về group & user & mối quan hệ giữa chúng. Trường hợp có rất rất nhiều group & rất nhiều user, lúc đó việc query user thuộc về những group nào hoặc 1 group sẽ chứa những users nào sẽ trở nên rất tốn kém nếu như chúng ta ko sử dụng thủ thuật dưới đây. Index dữ liệu user & group để tìm kiếm nhanh hơn.

```js
// An index to track Ada's memberships
{
  "users": {
    "alovelace": {
      "name": "Ada Lovelace",
      // Index Ada's groups in her profile
      "groups": {
         // the value here doesn't matter, just that the key exists
         "techpioneers": true,
         "womentechmakers": true
      }
    },
    ...
  },
  "groups": {
    "techpioneers": {
      "name": "Historical Tech Pioneers",
      "members": {
        "alovelace": true,
        "ghopper": true,
        "eclarke": true
      }
    },
    ...
  }
}
```

Ở vd trên thì khi nhìn sơ qua thì ta thấy có 1 sự dư thừa dữ liệu : `alovelace` lại chứa group `techpionners` và group `techpionners` lại chứa user `alovelace`!!!
Đó là 1 sự dư thừa cần thiết để việc query dữ liệu được nhanh chóng, trong trường hợp chúng ta có hàng triệu group & hàng triệu user. Nếu dứng ở vị trí 1 user -> query ra được các group mà user đó tham gia với chi phí thấp. Hoặc đứng ở 1 group: chúng ta có thể query ra ngay những thành viên của group.

Lưu ý ở mục này: là khi sử thay đổi dữ liệu phải thay đổi 2 nơi, nên khi sử dụng trong code nên chú ý.

### 3. Cách để update dữ liệu nhiều nơi ( path) trong database với 1 lần gọi API:

```js
public class LeaderboardEntry {
    public string uid;
    public int score = 0;

    public LeaderboardEntry() {
    }

    public LeaderboardEntry(string uid, int score) {
        this.uid = uid;
        this.score = score;
    }

    public Dictionary<string, Object> ToDictionary() {
        Dictionary<string, Object> result = new Dictionary<string, Object>();
        result["uid"] = uid;
        result["score"] = score;

        return result;
    }
}

private void WriteNewScore(string userId, int score) {
    // Create new entry at /user-scores/$userid/$scoreid and at
    // /leaderboard/$scoreid simultaneously
    string key = mDatabase.Child("scores").Push().Key;
    LeaderBoardEntry entry = new LeaderBoardEntry(userId, score);
    Dictionary<string, Object> entryValues = entry.ToDictionary();

    Dictionary<string, Object> childUpdates = new Dictionary<string, Object>();
    childUpdates["/scores/" + key] = entryValues;
    childUpdates["/user-scores/" + userId + "/" + key] = entryValues;

    mDatabase.UpdateChildrenAsync(childUpdates);
}
```

Khi xóa cũng có thể sử dụng technical này với truyền tham số null & gọi UpdateChildrenAsync()

### 4. Những lưu ý về việc sử dụng database realtime để tiết kiệm money :D

- Việc tính tiền của database dựa vào dung lượng lưu trữ database & lưu lượng network traffic (all outbound network traffic ). Mỗi tháng $5 / 1 Gb, được tính từng ngày 1.
- Lưu lượng network outbound bao gồm chi phí kết nối và mã hóa từ tất cả các hoạt động cơ sở dữ liệu và data được download để đọc ở client .. tất cả các loại thứ kết nối ... đều phải trả tiền..

#### Ước tính tiền phải trả như thế nào ?

![](https://images.viblo.asia/d3729289-d35d-4056-892c-7c7f58b574dd.png)

#### Sử dụng usage tab:

- connections: số lượng kết nối đồng thời đến db
- Storage: dung lượng database lưu trữ, ko tính dữ liệu ở các firebase product khác ( chỉ db thôi)
- Downloads: Tổng bytes downloaded , bao gồm protocal & encryption overhead.
- Load: Cho biết lượng db đang được sử dụng.

#### Làm sao để tối ưu chi phí ?

Theo hướng dẫn của google thì có một số best practice như sau:

- Sử dụng SDK Native thay vì sử dụng REST API giảm thiểu chi phí SSL & có thể sử dụng cache local.
- Kiểm tra bugs liên tục: Kiểm tra việc  sync nhiều dữ liệu quá ? hoặc sync có thường xuyên quá -> gây lãng phí. Có chạy sync dưới background & việc sync đó có đúng với mong đợi ko?
- Giảm việc kết nối: tối ưu băng thông nếu có thể. Thường thì nhiều REST request có thể sẽ tốn nhiều chi phí hơn so với 1 kết nối bằng SDK native. Nếu dự án phải sử dụng REST API thì xem xét việc sử dụng HTTP keep-alive hoặc server-client events để giảm thiểu chi phí SSL handshakes.
- Index queries: xem cách index database [ở đây](https://firebase.google.com/docs/database/security/indexing-data). Việc này giảm được tổng lượng băng thông mà bạn dùng cho việc query. Công cụ để xác định dữ liệu nào chưa được index [ở đây](https://firebase.google.com/docs/database/usage/profile#unindexed_queries).
- Tối ưu sự kiện lắng nghe: Thêm truy vấn để giới hạn dữ liệu mà hoạt động nghe của bạn trả về và sử dụng việc lắng nghe chỉ tải xuống các bản cập nhật cho dữ liệu vd: sử dụng on() thay vì once().
- Tối ưu việc lưu trữ: gắn các tham số thêm vào bảng user và các bảng dữ liệu, sau đó chạy các cleanup jobs để dọn dẹp các dữ liệu tạm ...
- Sử dụng rule: Tránh những chi phí tiềm ẩn, hoạt động trái phép trên database. Ví dụ tránh việc hacker tải xuống liên tục các thành phần trong database -> sinh ra chi phí.