# I. Giới thiệu:

-----


**Memento** là một **Design Pattern** thuộc loại **Behavior**. Nó cho phép chúng ta lưu trữ và khôi phục **trạng thái** của một đối tượng mà không tiết lộ chi tiết bên trong của nó.
**Memento Pattern** gồm các thành phần chính như sau:

![](https://images.viblo.asia/6f5ad7fc-a5ee-4ece-8245-a32d31ab82a6.png)
- **Originator**: là Object có trạng thái được lưu trữ hoặc khôi phục.
- **Mementor**: là trạng thái (**State**) của Object khi đang được lưu trữ.
- **CareTaker**: đóng vai trò lưu trữ và cấp phát các **Memento**. Nó có trách nghiệm lưu trữ các **State** ở dạng **Memento** và cấp phát các **State** cho các Object khi cần.

# II. Cách thức hoạt động:

-----


**Memento Pattern** sẽ cấu trúc các dữ liệu cần lưu của một Object thành một **State**, sau đó sẽ lưu lại **State** này. Các **State** sau khi được lưu lại sẽ được gọi là các **Memento**. **CareTaker** sẽ đóng vai trò lưu trữ các **State** thành **Memento** và xuất các **Memento** thành **State** để có thể sử dụng. Do trạng thái của các Object đều được lưu trữ trong **State** nên khi **State** này được truyền qua các Object khác nhau thì sẽ không để lộ các implement chi tiết của các Object đó.

![](https://images.viblo.asia/13513633-dd4b-41d3-bc4d-3ffc36748caa.png)

# III. Memento Pattern được sử dụng khi nào?

-----


**Memento Pattern** được sử dụng bất cứ khi nào chúng ta muốn lưu và sau đó khôi phục trạng thái của một Object. Ví dụ như khi chúng ta chơi game, chúng ta muốn lưu lại tất cả những trạng thái chúng ta đã chơi trước đó để sau khi quit game và mở lại thì chúng ta có thể tiếp tục chơi, khi đó ta có thể áp dụng **Memento Pattern** để giải quyết bài toán này.

# IV. Ví dụ:

-----


Trong ví dụ, chúng ta sẽ sử dụng `class Game` với vai trò của `Originator`. Bên trong `class Game` sẽ chứa một `State` để lưu lại các trạng thái của nó. Trạng thái của `Game` sẽ được lưu vào trong `UserDefault`, vì vậy chúng ta cần adopt `Codable` protocol.
```swift
// MARK: - Originator
public class Game: Codable {
  
  public class State: Codable {
    public var attemptsRemaining: Int = 3
    public var level: Int = 1
    public var score: Int = 0
  }
  public var state = State()
  
  public func rackUpMassivePoints() {
    state.score += 9002
  }
  
  public func monstersEatPlayer() {
    state.attemptsRemaining -= 1
  }
}
```

Object `Game` sẽ được lưu vào `UserDefault` ở dạng `Data`. Do vậy, `Data` trong Swift ở ví dụ này sẽ đóng vai trò là Memento.
```swift
// MARK: - Memento
typealias GameMemento = Data
```

Để quản lý việc lưu trữ các Memento, chúng ta sẽ cần tới CareTaker. `GameSystem` đóng vai trò là CareTaker. Class này sẽ có trách nghiệm lưu trữ hoặc lấy các Memento khi cần thiết.
```swift
// MARK: - CareTaker
public class GameSystem {
  
  private let decoder = JSONDecoder()
  private let encoder = JSONEncoder()
  private let userDefaults = UserDefaults.standard
  
  public func save(_ game: Game, title: String) throws {
    let data = try encoder.encode(game)
    userDefaults.set(data, forKey: title)
  }
  
  public func load(title: String) throws -> Game {
    guard let data = userDefaults.data(forKey: title),
      let game = try? decoder.decode(Game.self, from: data)
      else {
        throw Error.gameNotFound
    }
    return game
  }
  
  public enum Error: String, Swift.Error {
    case gameNotFound
  }
}
```

Sử dụng:
```swift
var game = Game()
game.monstersEatPlayer()
game.rackUpMassivePoints()

// Save Game
let gameSystem = GameSystem()
try gameSystem.save(game, title: "Best Game Ever")

// New Game
game = Game()
print("New Game Score: \(game.state.score)")

// Load Game
game = try? gameSystem.load(title: "Best Game Ever")
print("Loaded Game Score: \(game?.state.score)")
```

# V. Tài liệu tham khảo:

-----


- Design Pattern by Tutorials - Raywenderlich
- Memento Pattern by [refactoring.guru](https://refactoring.guru/design-patterns/memento)