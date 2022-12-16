Giả dụ chúng ta đang có một dữ liệu JSON trả về chứa nhiều định dạng ngày tháng (date format), thì bạn sẽ decode JSON đó như thế nào?. Đáp án đầu tiên đó là sử dụng dateDecodingStrategy, tuy nhiên nó chỉ hỗ trợ ở mức hạn chế cho định dạng .iso8601 và chúng ta cũng chỉ được set một strategy tại cùng thời điểm, vì vậy bài viết này sẽ giới thiệu cách sử dụng Codeable để xử lý bài toàn JSON có nhiều định dạng Date khác nhau. 

Ở đây tôi sử dụng iTunes RSS Feed Generator để làm ví dụ mẫu. Phía dưới là dữ liệu JSON trả về top 3 podcast:

```
// https://rss.itunes.apple.com/api/v1/gb/podcasts/top-podcasts/all/3/explicit.json
let json = """
{
  "feed": {
    "title":"Top Audio Podcasts",
    "country":"gb",
    "updated":"2017-11-16T02:02:55.000-08:00",
    "results":[
      {
      "artistName":"BBC Radio",
      "name":"Blue Planet II: The Podcast",
      "releaseDate":"2017-11-12",
      "url":"https://itunes.apple.com/gb/podcast/blue-planet-ii-the-podcast/id1296222557?mt=2"
    },
    {
      "artistName":"Audible",
      "name":"The Butterfly Effect with Jon Ronson",
      "releaseDate":"2017-11-03",
      "url":"https://itunes.apple.com/gb/podcast/the-butterfly-effect-with-jon-ronson/id1258779354?mt=2"
    },
    {
      "artistName":"TED",
      "name":"TED Talks Daily",
      "releaseDate":"2017-11-16",
      "url":"https://itunes.apple.com/gb/podcast/ted-talks-daily/id160904630?mt=2"
    }
    ]
  }
}
"""
```

Ở đây chúng ta có hai kiểu date format, đầu tiên là kiểu iso8601 ở trường "updated":

```
"updated":"2017-11-16T02:02:55.000-08:00",
```

Tiếp đến là format yyyy-MM-dd ở trường "releaseDate"

```
"releaseDate":"2017-11-12",
```

Swift Codable
Swift 4 cung cấp cho chúng ta một công cụ rất tiện lợi cho việc encode/decode JSON, đó là protocol Codable. Các kiểu phổ biến như String, URL và Date đều đã adopt protocol này, do đó chúng ta có thể build một kiểu Codabletype cho dữ liệu podcast và feed ở khối JSON trên.

```
import Foundation

struct RSSFeed: Codable {
  struct Feed: Codable {
    struct Podcast: Codable {
      let name: String
      let artistName: String
      let url: URL
      let releaseDate: Date
    }

    let title: String
    let country: String
    let updated: Date
    let podcasts: [Podcast]

    private enum CodingKeys: String, CodingKey {
      case title
      case country
      case updated
      case podcasts = "results"
    }
  }

  let feed: Feed
}

typealias Feed = RSSFeed.Feed
typealias Podcast = Feed.Podcast
```
Để decode JSON thì chúng ta sẽ convernt nó thành kiểu Data và đưa vào trong JSONDecoder:

```

let data = Data(json.utf8)
let decoder = JSONDecoder()
let rssFeed = try! decoder.decode(RSSFeed.self, from: data)
```

Và hiển nhiên là chúng ta sẽ gặp lỗi không thể decode hai kiểu Date. Do đó bạn cần phải thay đổi cashc mà JSON decode xử lý kiểu Date bằng cách thiết lập date decoding strategy như sau:

```
let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .iso8601
```

Không may là nó vẫn không chạy được, có vẻ như là thư viên Foundation không hỗ trợ xử lý định dạng iso8601 cho đến mili giây. Tuy nhiên đó không phải là vấn đề lớn, chúng ta có thể tự tạo ra một custom date formatter để xử lý toàn bộ format trên:

```
extension DateFormatter {
  static let iso8601Full: DateFormatter = {
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZZZZZ"
    formatter.calendar = Calendar(identifier: .iso8601)
    formatter.timeZone = TimeZone(secondsFromGMT: 0)
    formatter.locale = Locale(identifier: "en_US_POSIX")
    return formatter
  }()
}
```
Note the .SSS in the date format. To use this custom data formatter when decoding our JSON data:

```
let data = Data(json.utf8)
let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .formatted(DateFormatter.iso8601Full)
let rssFeed = try! decoder.decode(RSSFeed.self, from: data)
```
Như vậy là chúng ta đã xử lý xong trường "updated", tiếp theo là đến trường "releaseDate". Đầu tiên chúng ta cần một tạo một date formatter để xử lý định dạng yyyy-MM-dd:

```
extension DateFormatter {    
  static let yyyyMMdd: DateFormatter = {
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd"
    formatter.calendar = Calendar(identifier: .iso8601)
    formatter.timeZone = TimeZone(secondsFromGMT: 0)
    formatter.locale = Locale(identifier: "en_US_POSIX")
    return formatter
  }()
}
```

Tiếp đến là extend Podcast với hàm init(from: Decoder) có vai trò xử lý date format:

```
extension Podcast {
  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    name = try container.decode(String.self, forKey: .name)
    artistName = try container.decode(String.self, forKey: .artistName)
    url = try container.decode(URL.self, forKey: .url)

    let dateString = try container.decode(String.self, forKey: .releaseDate)
    let formatter = DateFormatter.yyyyMMdd
    if let date = formatter.date(from: dateString) {
        releaseDate = date
    } else {
        throw DecodingError.dataCorruptedError(forKey: .releaseDate,
              in: container,
              debugDescription: "Date string does not match format expected by formatter.")
    }
  }
}
```

Đoạn code trên decode một dictionary chứa key cho từng property trong struct Podcast bằng cách sử dụng enum CodingKeys. Đầu tiên chúng ta thử decode trường .releaseDate thành một chuỗi String và sử dụng data formatter để parse thành kiểu Date, hoặc nếu có lỗi thì sẽ throw ra case .dataCorruptedError. Ghép tât cả lại thì chúng ta đã có thể decode toàn bộ khối JSON rồi.

```
let data = Data(json.utf8)
let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .formatted(DateFormatter.iso8601Full)
let rssFeed = try! decoder.decode(RSSFeed.self, from: data)

let feed = rssFeed.feed
print(feed.title, feed.country, feed.updated)

feed.podcasts.forEach {
  print($0.name)
}

Top Audio Podcasts gb 2017-11-16 10:02:55 +0000
Blue Planet II: The Podcast
The Butterfly Effect with Jon Ronson
TED Talks Daily
```

Như vậy với Codeable trong Swift 4, thì chúng ta đã có thể decode và parse ra các format Date khác nhau, từ đó giúp cho code trở nên gọn gàng và dễ bảo trì hơn rất nhiều.