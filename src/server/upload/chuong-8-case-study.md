**Lớp truy xuất dữ liệu**

Một trường hợp rất phổ biến trong các ứng dụng đó là lưu trữ một số lượng lớn dữ liệu. Dữ liệu này có thể là dữ liệu giao dịch, thông tin người dùng hoặc trạng thái của ứng dụng. Có nhiều cách để dữ liệu có thể được lưu trữ trong ứng dụng. Xác định cách phù hợp để lưu trữ dữ liệu có thể là một trong những quyết định quan trọng nhất mà một nhà phát triển cần thực hiện.

Như một kiến trúc sư chúng ta nên phân chia phần lưu trữ dữ liệu thật sự ra khỏi phần logic của ứng dụng. Việc này sẽ cho phép ứng dụng có thể thay đổi cách dữ liệu được lưu trữ trong tương lai mà không làm ảnh hưởng đến logic của ứng dụng. Việc này gọi làm data access layer (lớp truy xuất dữ liệu)

Điều quan trọng khi thiết kế một ứng dụng là thiết kế một lớp truy xuất dữ liệu tốt. Bởi vì có một lớp truy xuất dữ liệu tốt sẽ làm cho code trở nên dễ dàng bảo trì khi yêu cầu được thay đổi. Nếu chúng ta phân tách lớp truy xuất dữ liệu ra khỏi phần logic chính của ứng dụng, sau đó nếu phần lưu trữ dữ liệu bị thay đổi chỉ code bên trong lớp truy xuất dữ liệu bị thay đổi.

**Những yêu cầu:**
Lớp truy xuất dữ liệu của chúng ta sẽ có một số đòi hỏi như sau:
- Tất cả truy xuất tới phần lưu trữ dữ liệu nên thông qua dạng helper. Những dạng dữ liệu helper sẽ xử lý việc Create,Read,Update,Delete(CRUD) thêm, đọc ,cập nhật, xoá. 
- Code bên ngoài để lớp truy xuất dữ liệu sẽ không biết hoặc không cần quan tâm cách dữ liệu được lưu trữ
- Trong ví dụ của chúng ta, chúng ta sẽ cần tạo 2 kiểu: 1 là kiểu tên là player chứa thông tin về những cầu thủ chơi bóng, và 1 kiểu khác là team, chứa đựng thông tin về một nhóm chơi bóng. Mỗi cầu thủ sẽ chứa ID của team và thông tin về team mà họ chơi bóng
- Trong ví dụ của chúng ta , chúng ta sẽ lưu trữ dữ liệu trong một mảng, Tuy nhiên chúng ta sẽ cần khả năng để thay đổi cơ chế lưu trữ mà không ảnh hưởng đến logic của ứng dụng.

Trước khi đọc tiếp, dựa vào những yêu cầu, Bạn thử nghĩ xem kiểu thiết nào phù hợp. Khi bạn đã hoàn thành phần thiết kế của mình thì tiếp tục đọc tiếp và so sánh với thiết kế chúng tôi đưa ra trong phần này.

**Thiết kế**
Lớp truy xuất dữ liệu sẽ chứa đựng 3 lớp. Lớp thấp nhất được biết như là Data Helper Layer, nó sẽ chứa những kiểu sẽ được dùng để lưu trữ dữ liệu. Ví dụ dữ liệu sẽ được lưu trữ trong một mảng. Những kiểu dữ liệu sẽ có thể dễ dàng để được cập nhật để lưu trữ dữ liệu bởi bất cứ cách nào khác trong tương lai.

Lớp tiếp theo là Data Model Layer. Nó sẽ chứa bộ mô hình cách dữ liệu được lưu trữ trong lớp data helper. Những bộ này sẽ dùng như bộ nhớ tạm thời để đọc và ghi dữ liệu đến/đi nơi lưu dữ liệu. Một số người thích dùng struct ở lớp này. Nhưng tôi thấy rằng chúng làm việc khá tốt bởi vì những kiểu dữ liệu này không nên chứa bất cứ phần logic nào của ứng dụng.

Cuối cùng là Bridge layer. Sẽ chuyển đổi dữ liệu từ logic của ứng dụng tới tầng truy xuất dữ liệu. Bridge layer là tầng phân tách logic ứng dụng khỏi tầng truy xuất dữ liệu. Tầng này sẽ chứa những kiểu dữ liệu mà phần logic của ứng dụng sẽ dùng để truy xuất tới dữ liệu, và sẽ chứa kiểu bắt cầu để chuyển đổi kiểu dữ liệu được dùng trong tầng truy xuất logic ứng dụng tới kiểu dữ liệu được dùng trong tầng truy xuất tới dữ liệu.

Trong ví dụ này. sẽ có 2 loại dữ liệu được lưu trữ trong 2 bảng. Có tên là Teams và Players. Từ phần diễn tả phía trước, có nghĩa là có lớp helper TeamDataHelper và PlayerDataHelper với 2 bộ là Team và Player. Nó sẽ trong như sau:

![](https://images.viblo.asia/ea2dec80-dfed-4a1f-9902-c35a80d709ed.png)


Cùng bắt đầu xem ở tầng Data Model vì nó sẽ kết nối giữa tầng Bridge và data helper.

**Data Model Layer**
Có 2 kiểu được định nghĩa trong data model layer. Những kiểu này được dùng để chuyển đổi giữa dữ liệu data helper và Bridge layer. Bởi vì những kiểu này nên được dùng để chuyển đổi dữ liệu, nên dùng kiểu tham trị. Nhớ trong đầu là chúng ta muốn tránh việc dính quá chặc giữa phần logic của ứng dụng và lớp truy xuất dữ liệu, Do đó những kiểu này không được dùng bên ngoài lớp truy xuất dữ liệu. Nếu chúng ta tránh được việc này chúng ta sẽ có khả năng để thay đổi những thành phần độc lập với những phần khác. 
```
typealias TeamData = (teamId: Int64?, city: String?, nickName: String?, abbreviation: String?)

typealias PlayerData = (playerId: Int64?, firstName: String?, lastName:String?,number: Int?, temaId:Int64?, position: Positions?)
```
Chúng ta sẽ có một phần bắt cầu để chuyển đổi từ những kiểu dữ liệu này thành struct dùng cho những logic của ứng dụng. Chúng ta sẽ thực hiện những việc bắt cầu này sau trong chương này
Trong tuple Player có một phần tử kiểu Position. Kiểu này là một enumeration chứa đựng tất cả những vị trí tồn tại có thể được chơi.
```
enum Positions: String {
    case pitcher = "Pitcher"
    case catcher = "Catcher"
    case firstBase = "First Base"
    case secondBase = "Second Base"
    case thirdBase = "Third Base"
    case shortstop = "Shortstop"
    case leftField = "Left Field"
    case centerField = "Center Field"
    case rightField = "Right field"
    case designatedHitter = "Designated Hitter"
}
```
**Tiếp theo là Data Helper layer**
Trong một thiết kế có một nhu cầu kiểm tra lỗi, việc này sẽ cho phép code bên trong biết được khi có việc gì không tốt xảy ra. Do đó chúng ta sẽ bắt đầu với data helper bằng việc định nghĩa những lỗi. Swift error sẽ được dùng. do đó lỗi sẽ được định nghĩa như sau:
```
enum DataAccessError: Error {
    case datastoreConnectionError
    case insertError
    case deleteError
    case searchError
    case nilInData
}
```
Chúng ta sẽ thấy những lỗi được quăng ra trong code. Phụ thuộc vào những kiểu lưu trữ được dùng, Những kiểu lỗi có thể thay đổi để đưa ra chi tiết thật sự về lỗi đó.

Tầng helper sẽ được dùng để lưu trữ dữ liệu. Tầng này sẽ thay đổi khi cơ chế lưu trữ thay đổi. Trong ví dụ này dữ liệu sẽ được lưu trữ trong một mảng; Tuy nhiên những kiểu này trong tầng này sẽ có khả năng để thay đổi tới những cơ chế lưu trữ khác trong tương lai. Tầng này sẽ chứa một kiểu cho mỗi loại dữ liệu trong tầng mô hình dữ liệu. Những kiểu này sẽ được dùng để đọc và viết dữ liệu.

Chúng ta sẽ bắt đầu bằng việc tạo một DataHelper protocol để định nghĩa tập những phương thức cho Mỗi loại dữ liệu mà các helper cần thực thi. DataHelper protocol trong như sau:
```
protocol DataHelper {
    associatedtype T
    static func insert(_ item: T) throws -> Int64
    static func delete(_ item: T) throws -> Void
    static func findAll() throws -> [T]?
}
```
Trong protocol này chúng ta định nghĩa 3 phương thức như sau:
- insert: Thêm một dòng vào trong bảng
- delete: xoá một dòng từ bảng
- findAll: trả ra tất cả các dòng trong bảng

Có một phương thức định nghĩa để truy vấn dữ liệu. Việc này hoàn thành bởi vì những phương thức để truy vấn Mỗi kiểu dữ liệu và tuỳ thuộc vào loại dữ liệu do đó những phương thức này cần những kiểu dữ liệu khác này. Chúng ta cần đánh giá những phương thức truy vấn cho Mỗi loại dữ liệu một cách riêng biệt.

Bây giờ cùng xây dựng TeamDataHelper sẽ thoã mãn DataHelper protocol. Đây là kiểu dữ liệu để lữu trữ team. trong đó kiểu T sẽ là TeamData
```
struct TeamDataHelper: DataHelper {
    typealias T = TeamData
    static var teamData: [T] = []
}
```
Mảng teamData được định nghĩa tĩnh, vì vậy sẽ có một và chỉ một thực thể của mảng này trong code. Bây giờ cùng xem cách chúng ta thực hiện 3 phương thức được định  nghĩa trong protocol. Chúng ta sẽ không thảo luận chi tiết về phần thực thi vì chúng ta lo lắng nhiều về phần thiết kế hơn là cách lưu trữ hay tìm kiếm trong một mảng

Phương thức đầu tiên chúng ta sẽ thực thi là insert() để thêm một phần tử vào trong mảng. Phương thức này trả về một giá trị Int64 thể hiện một giá trị duy nhất của phần tử nếu mọi thứ được lưu trữ thành công. Phương thức này sẽ trả ra lỗi nếu có vấn đề trong lúc thêm dữ liệu. Nếu có một chế lưu trữ khác được dùng, phương thức này có thể cần quăng lỗi ra như sau:
```
static func insert(_ item: TeamData) throws -> Int64 {
        guard item.teamId != nil , item.city != nil, item.nickName != nil, item.abbreviation != nil else {
            throw DataAccessError.nilInData
        }
        
        teamData.append(item)
        return item.teamId!
    }
```
Bây giờ cùng xem hàm delete() để loại bỏ một phần tử từ mảng. Phương thức sẽ quăng lỗi nếu phần tử đó không tồn tại trong mảng hoặc teamId là nil.
```
    static func delete(_ item: TeamData) throws {
        guard let id = item.teamId else {
            throw DataAccessError.nilInData
        }
        
        let teamArray = teamData
        for(index, team) in teamArray.enumerated() where team.teamId == id {
            teamData.remove(at: index)
            return
        }
        throw DataAccessError.deleteError
    }
```
Bây giờ cùng xem phương thức findAll(), cái sẽ trả về tất cả các phần tử trong mảng. Phương thức này có thể quăng lỗi nhưng đó là việc của tương lai.
```
static func findAll() throws -> [TeamData]? {
        return teamData
    }
```
Cuối cùng là phương thức find() để tìm kiếm và trả ra một phần tử duy nhất từ mảng. Chúng ta có thể cần thêm phương thức find() tuỳ theo nhu cầu. Nhưng phương thức này sẽ trả về team với teamId. Phương thức này cũng sẽ quăng ra lỗi nhưng nó cũng là nhu cầu sau này. Nếu teamId không tìm thấy trong mảng, nó sẽ trả ra một giá trị nil.
```
static func find(_ id: Int64) throws -> T? {
        for team in teamData where team.teamId == id {
            return team
        }
        return nil
    }
```
Tiếp theo là PlayerDataHelper được thực thi gần giống với TeamDataHelper. 
```
struct PlayerDataHelper: DataHelper {
    typealias T = PlayerData
    static var playerData: [T] = []
    
    static func insert(_ item: T) throws -> Int64 {
        guard item.playerId != nil && item.firstName != nil && item.lastName != nil && item.teamId != nil && item.position != nil else {
            throw DataAccessError.nilInData
        }
        playerData.append(item)
        return item.playerId!
    }
    static func delete (_ item: T) throws -> Void {
        guard let id = item.playerId else {
            throw DataAccessError.deleteError
        }
        let playerArray = playerData
        for (index, player) in playerArray.enumerated() where player.playerId == id {
            playerData.remove(at: index)
        }
    }
    
    static func findAll() throws -> [T]? {
        return playerData
    }
    static func find(_ id: Int64) throws -> T? {
        for player in playerData where player.playerId == id {
            return player
        }
        return nil
    }
    
}
```
Ý tưởng về tầng truy xuất dữ liệu, dữ liệu (PlayerData và TeamData) và data helper (PlayerDataHelper và TeamDataHelper) những kiểu này là cặp từ trong logic của ứng dụng. Nếu bạn xem qua phần mẫu thiết kế chúng ta đã thảo luận ở chương trước. Chúng ta sẽ thấy mẫu Bridge có thể dùng được ở đây. Cùng xem cách chúng ta sẽ dùng mẫu bridge để tạo ra một sự phân lớp tốt giữa tầng truy xuất dữ liệu và code của ứng dụng.

Chúng ta sẽ muốn bắt đầu định nghĩa cách để mô hình hoá dữ liệu trong ứng dụng của mình. Dữ liệu có thể được mô hình chính xác giống như những model trong tầng truy xuất dữ liệu hoặc nó có thể được thiết kế khác cũng không sao.

Chú ý: Tôi thường thấy rằng dữ liệu của tôi thường khác với những gì tôi lưu trữ và cách tôi dùng nó trong ứng dụng của mình. Bằng cách phân chia tầng truy xuất dữ liệu ra khởi code của ứng dụng, chúng ta cũng có thể mô hình hoá dữ liệu của mình khác nhau giữa 2 tầng này.

Tiếp theo cùng xem cách chúng ta dùng mẫu Bridge vào trong ví dụ này:

**Tầng Bridge**
Trong ví dụ này, dữ liệu trong tầng truy xuất dữ liệu và trong ứng dụng sẽ chỉ có một chút khác biệt. Sự khác biệt này là khi một cầu thủ được nhận, thông tin về đội của cầu thủ đó cũng sẽ được nhận về bên trong nó và nó sẽ là một phần trong cấu trúc dữ liệu của cầu thủ đó. Cùng xem cách để định nghĩa team và player trong tầng Bridge. Cùng bắt đầu định nghĩa kiểu Team và nó sẽ nằm trong kiểu Player.
```
struct Team {
    var teamId: Int64?
    var city: String?
    var nickName: String?
    var abbreviation:String?
}
```
Kiểu tham trị được dùng cho cấu trúc dữ liệu trong ví dụ này. Khi chúng ta dùng kiểu tham trị chúng ta cần nhớ rằng việc thay đổi tới những kiểu này chỉ được lưu trữ trong phạm vi của sự thay đổi đó thoi. Nếu bạn cần lưu trữ sự thay đổi bên ngoài phạm vi của sự thay đổi, chúng ta cần phải dùng từ khoá inout. Quyết định chọn loại kiểu tham trị hay kiểu tham chiếu là do bạn, vấn đề quan trong là phải nhất quán và kiểu tài liệu được dùng.

Trong ví dụ này struct Team được thiết kế để ánh xạ tương ứng với TeamData cái dùng để thể hiện cho một team trong tầng helper data. Bây giờ cùng xem cấu trúc của Player
```
struct Player {
    var playerId: Int64?
    var firstName: String?
    var lastName: String?
    var number: Int?
    var teamId: Int64? {
        didSet {
            if let t = try? TeamBridge.retrieve(teamId!) {
                team = t
            }
        }
    }
    var position: Positions?
    var team: Team?
    init(playerId: Int64?, firstName: String?, lastName:String?, number:Int?, teamId: Int64?, position: Positions) {
        self.playerId = playerId
        self.firstName = firstName
        self.lastName = lastName
        self.number = number
        self.teamId = teamId
        if let id = self.teamId {
            if let t = try? TeamBridge.retrieve(id) {
                team = t
            }
        }
    }
}
```
Cấu trúc Player thì tương tự với PlayerData, ngoại trừ thêm một số thuộc tính như Team. Thuộc tính này sẽ nắm giữ thông tin về đội mà mội người chơi tham gia. Chúng ta dùng một thuộc tính quan sát để tải thông tin về đội từ nơi lưu trữ dữ liệu bất cứ khi nào thuộc tính teamId được thiết lập. Chúng ta cũng tải thông tin về đội khi khởi tạo một thực thể người chơi. Nhớ rằng thuộc tính quan sát không được gọi trong quá trình khởi tạo của kiểu dữ liệu. Do đó didSet sẽ không được gọi khi chúng ta thiết lập teamId trong quá trình khởi tạo.

Bây giờ cùng xem về kiểu Bridge, nó sẽ được dùng như là cầu nối giữ dữ liệu trong tầng truy xuất dữ liệu và code trong ứng dụng của chúng ta. Chúng ta sẽ bắt đầu với struct TeamBridge
```
struct TeamBridge {
    static func save(_ team: inout Team) throws {
        let teamData = toTeamData(team)
        let id = try TeamDataHelper.insert(teamData)
        team.teamId = id
    }
    
    static func delete(_ team: Team) throws {
        let teamData = toTeamData(team)
        try TeamDataHelper.delete(teamData)
    }
    
    static func retrieve(_ id: Int64) throws -> Team? {
        if let t = try TeamDataHelper.find(id) {
            return toTeam(t)
        }
        return nil
    }
    
    static func toTeamData(_ team: Team) -> TeamData {
        return TeamData(teamId: team.teamId, city: team.city, nickName: team.nickName, abbreviation: team.abbreviation)
    }
    
    static func toTeam(_ teamData: TeamData) -> Team {
        return Team(teamId: teamData.teamId, city: teamData.city, nickName: teamData.nickName, abbreviation: teamData.abbreviation)
    }
}
```
struct TeamBridge có 5 phương thức. Ba phương thức đầu dùng tính năng của TeamDataHelper để thêm, xoá và nhận dữ liệu từ tầng truy xuất dữ liệu. Chú ý phương thức save() có một tham số truyền vào với từ khoá inout bởi vì chúng ta sẽ thực hiện việc thay đổi giá trị của tham số team cái mà chúng ta muốn bên ngoài phần lưu trữ có thể dùng được. 2 phương thức cuối dùng để chuyển đổi dữ liệu giữa TeamData trong tầng truy xuất dữ liệu và Team dùng trong ứng dụng. Bây giờ nếu có sự thay đổi yêu cầu chúng ta có thể thay đổi tầng truy xuất dữ liệu hoặc tầng ứng dụng một cách độc lập nhau. Struct Bridge có thể cần thay đổi khi tầng truy xuất dữ liệu hay tầng ứng dụng có sự thay đổi. Nhưng có nhiều sự dễ dàng khi thay đổi trong kiểu Bridge hơn là phải tái cấu trúc toàn bộ code trong ứng dụng.

**Bây giờ cùng xem PlayerBridge**
```
struct PlayerBridge {
    static func save(_ player: inout Player) throws {
        let playerData = toPlayerData(player)
        let id = try PlayerDataHelper.insert(playerData)
        player.playerId = id
    }
    
    static func delete(_ player: Player) throws {
        let playerData = toPlayerData(player)
        try PlayerDataHelper.delete(playerData)
    }
    
    static func retrieve(_ id: Int64) throws -> Player? {
        if let p = try PlayerDataHelper.find(id) {
            return toPlayer(p)
        }
        return nil
    }
    
    static func toPlayerData(_ player: Player) -> PlayerData {
        return PlayerData(playerId: player.playerId, firstName: player.firstName, lastName: player.lastName, number:player.number, teamId: player.teamId, position: player.position)
        
    }
    
    static func toPlayer(_ playerData: PlayerData) -> Player {
        return Player(playerId: playerData.playerId, firstName: playerData.firstName, lastName: playerData.lastName, number: playerData.number, teamId: playerData.teamId, position: playerData.position)
    }
}
```
PlayerBridge cũng tương tự với TeamBridge ngoại trừ việc chuyển đổi giữ PlayerData và Player. Một lần nữa việc này cho phép chúng ta thay đổi tầng truy xuất dữ liệu hoặc tầng ứng dụng một cách độc lập nhau.

Cách dùng Tầng truy xuất dữ liệu.
Bây giờ cùng xem cách để dùng tầng truy xuất dữ liêu bằng cách tạo một team và một player
```
var bos = Team(teamId: 0, city: "Boston", nickName: "Red Sox", abbreviation: "BOS")

try? TeamBridge.save(&bos)

var ortiz = Player(playerId: 0, firstName: "David", lastName: "Ortiz", number: 34, teamId: bos.teamId, position: Positions.designatedHitter)

try? PlayerBridge.save(&ortiz)
```
Trong đoạn code trên, chúng ta tạo một đội bóng tên là Boston Red Sox và một cầu thủ, David Ortiz. Chúng ta cũng để cho David Ortiz vào trong đội Boston Red Sox, bằng cách gán giá trị teamId cho cầu thủ. Đây là thông tin có thể nhận về và được trình bày như sau:
```
if let team = try? TeamBridge.retrieve(0) {
    print("--- \(team.city)")
}

if let player = try? PlayerBridge.retrieve(0) {
    print(“—— \(player.firstName) \(player.lastName) plays for \(player.team?.city)")
}
```
Code sẽ được in ra như sau:
--- Optional("Boston")")
---- Optional("David")") Optional("Ortiz")") plays for Optional("Boston")")

Bằng cách dùng kiểu TeamBridge và PlayerBridge chúng ta không cần phải lo lắng về cách dữ liệu được lưu trữ như thế nào phía sau. Nó có thể dùng SQLite, một mảng, hoặc thậm chí là lưu trong file. Chúng ta cũng có thể thay đổi nơi lưu trữ dữ liệu độc lập với phần code chính của ứng dụng. Việc này sẽ cho phép chúng ta thay đổi nơi lưu trữ phù hợp với những yêu cầu mới mà chúng ta có thể sẽ gặp trong tương lai mà không phải tái cấu trúc lại code của toàn bộ dự án.

**Kết luận.**
Tạo những lớp tách rời nhau, như đã trình bày trong chương này, có thể tốn một ít thời gian khi chúng ta bắt đầu xây dựng ứng dụng của mình, nhưng nó sẽ tiết kiệm thời gian trong 1 thời gian dài bởi vì những yêu cầu sẽ thay đổi và tính năng mới sẽ được thêm vào, do đó code của chúng ta cần phải dễ dàng thay đổi để phù hợp với những yêu cầu đó. Việc tạo những lớp tách rời nhau và dùng mẫu Bridge để kết nối những lớp này cho phép chúng ta có khả năng để thay đổi Mỗi lớp một cách dễ dàng và độc lập với nhau.

**Tổng kết.**
Trong chương này, chúng ta đã thấy các trường hợp mà chúng ta dùng swift với mô hình lập trình hướng protocol và cách để dùng với mẫu thiết kế để tạo ra sự dễ dàng trong bảo trì và linh hoạt cho ứng dụng. Nếu bạn làm việc với những phần thiết kết của chính mình và phần thiết kế của bạn khác với một trong những phần trình bày ở đây, mọi thứ vẫn ổn. Có nhiều câu trả lời đúng cho mỗi vấn đề. Điều quan trọng là đảm bảo được ứng dụng của bạn được thiết kế để dễ dàng bảo trì và rất linh hoạt.

Như một nhà kiến trúc, sự tập trung của bạn không nên chỉ thoã những yêu cầu của framework hoặc ứng dụng nó cũng nên tạo ra một phần code nền tảng để dễ dàng bảo trì và mở rộng trong trường hợp những yêu cầu bị thay đổi trong tương lai. Dùng một mộ hình lập trình như lập trình hướng Protocol và sự nhấn mạnh vào việc dùng các mẫu thiết kế trong việc thiết kế ứng dụng của bạn có thể giúp cho việc đáp ứng được những nhu cầu này.

***Trong phần này có 2 ví dụ nhưng mình chỉ trình bày 1 ví dụ. Vậy là kết thúc cuốn sách về "Swift Protocol oriented Programming". Hẹn gặp lại mn ở cuốn sách về xử lý đồng thời với Swift (Swift Concurrency)***