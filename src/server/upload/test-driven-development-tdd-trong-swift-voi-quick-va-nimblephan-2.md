Ở phần trước chúng ta đã hoàn tất việc cài đặt framework và những thành phần cần thiết để bắt đầu quá trình thực hiện viết test và code.

# Viết test lần đầu

Theo đúng như định nghĩa về TDD, thì muốn viết code thì ta phải viết phần unit test trước, chúng ta biết là phải làm một danh sách chứa dữ liệu của những bộ phim. Vậy câu hỏi đặt ra ở đây là làm sao để biết được rằng danh sách phim đó hiển thị đúng được số lượng phim. Đúng vậy, chúng ta cần phải đảm bảo rằng số dòng ở trong table phải chính xác với số bộ phim. Đó là bài test đầu tiên chúng ta cần làm. Cho nên hãy bắt đầu với "MyMoviesTests" của chúng ta và bỏ phần XCTest có sẵn đi và đưa vào Quick và Nimble để thực hiện test.

Chúng ta phải đảm bảo rằng class test phải là con của "QuickSpec" mà nguồn gốc của nó vẫn chính là "XCTestCase". "Quick và Nimble" thực chất nguồn gốc vẫn là từ XCTest mà ra. Việc cuối cùng phải làm là override lại hàm spec().

```swift
import Quick
import Nimble
 
@testable import MyMovies
 
class MyMoviesTests: QuickSpec {
    override func spec() {
    }
}
```

Ở thời điểm này, bạn sẽ dùng những từ khóa "it", "describe" và "context" để viết test. "describe" và "context" là dạng một dạng logic của "it".

## Test 1: Đảm bảo rằng số Row trong Table view bằng với số Movie

Đầu tiên, hãy đưa vào "subject" chính là view controller

```swift
import Quick
import Nimble
 
@testable import MyMovies
 
class MyMoviesTests: QuickSpec {
    override func spec() {
        var subject: MoviesTableViewController!
        
        describe("MoviesTableViewControllerSpec") {
            beforeEach {
                subject = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "MoviesTableViewController") as! MoviesTableViewController
                
                _ = subject.view
            }
        }
    }
}
```

Chú ý rằng chúng ta có "@testable" nằm trong "MyMovies", dòng này đơn giản định nghĩa project mà chúng ta sẽ test, cho phép chúng ta thêm các class từ đó. Vì chúng ta sẽ test việc hiển thị của table view controller, chúng ta phải lấy một instance từ storyboard.

"describe" sẽ kích họat một nhóm các test case đầu tiên được viết cho "MoviesTableViewController".

"beforeEach" sẽ chạy trước khi mỗi ví dụ được thực thi trong "describe".

"_ = subject.view" đưa view controller vào trong memory, nó như là "viewDidLoad".

Cuối cùng, chúng ta có thể đưa các phép so sánh test vào sau "beforeEach {}" như sau :

```swift
context("when view is loaded") {
    it("should have 8 movies loaded") {
        expect(subject.tableView.numberOfRows(inSection: 0)).to(equal(8))
   }
}
```

Hãy bổ đoạn code này ra một chút, chúng ta có "context" là một nhóm được định nghĩa là "khi view được load", và sau đó được mang theo bởi ý chính là "nó nên có 8 movies được load". Sau đó chúng ta dự đoán số Row trong table view là 8. Bây giờ hãy ấn CMD+U để test nào. Và đây là kết quả:

```swift
MoviesTableViewController__when_view_is_loaded__should_have_8_movies_loaded] : expected to equal <8>, got <0>
 
Test Case '-[MyMoviesTests.MoviesTableViewControllerSpec MoviesTableViewController__when_view_is_loaded__should_have_8_movies_loaded]' failed (0.009 seconds).
```

Bạn đã viết một đoạn test bị fail và cần phải fix, hãy bắt đầu TDD nào.

## Sửa Test 1

Hãy quay lại "MoviesTableViewController" và đưa vào dữ liệu movie. Hãy chạy lại test và thêm vào đoạn sau : 

```swift
override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return MoviesDataHelper.getMovies().count
}
 
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "MovieCell")
    return cell!
}
```

Hãy tóm tắt lại nào, chỉ với 3 line code bạn đã làm cho test case này được pass. Đây chính là TDD. Một con đường đảm bảo về chất lượng và yêu cầu khi viết code.

## Test 2

Vào công việc chính là phải có được dữ liệu của movie, chúng ta dễ dàng nhìn thấy rằng chúng ta đã đặt "title" và "subtitle" khắp mọi nơi. 

Hãy đặt một "context" mới tên là "Table View". Lấy cell đầu tiên trong table view và đưa dữ liệu vào trong nó.

```swift
context("Table View") {
    var cell: UITableViewCell!
    
    beforeEach {
            cell = subject.tableView(subject.tableView, cellForRowAt: IndexPath(row: 0, section: 0))
    }
        
    it("should show movie title and genre") {
        expect(cell.textLabel?.text).to(equal("The Emoji Movie"))
        expect(cell.detailTextLabel?.text).to(equal("Animation"))
     }
}
```

Bây giờ hãy chạy test và xem nó fail như thế nào.

```swift
MoviesTableViewController__Table_View__should_show_movie_title_and_genre] : expected to equal <Animation>, got <Subtitle>
```

Lại một lần nữa, chúng ta cần phải sửa test này. Chúng ta cần sửa label trên cell và đúng với dữ liệu.

## Sửa Test 2

Ở đây chúng ta cần định nghĩa một loại enum cho chủng loại phim. Vì vậy đây là một nâng cấp cho class "Movie"

```swift
struct Movie {
    var title: String
    var genre: Genre
    
    func genreString() -> String {
        switch genre {
        case .Action:
            return "Action"
        case .Animation:
            return "Animation"
        default:
            return "None"
        }
    }
}
```

và đây là code phần "cellForRow"

```swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "MovieCell")
    
    let movie = MoviesDataHelper.getMovies()[indexPath.row]
    cell?.textLabel?.text = movie.title
    cell?.detailTextLabel?.text = movie.genreString()
    
    return cell!
}
```

Bạn đã pass qua được test thứ hai, ở thời điểm này, chúng ta có thể nhìn vào những cái gì chúng ta đã sửa đổi và làm cho code sạch sẽ hơn, nhưng vẫn chưa pass hết mọi test. Hãy xóa những hàm trống đi và khai báo hàm "getMovies()" để khởi tạo giá trị.

```swift
class MoviesTableViewController: UITableViewController {
 
    var movies: [Movie] {
        return MoviesDataHelper.getMovies()
    }
    
    // MARK: - Table view data source
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return movies.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "MovieCell")
        
        let movie = movies[indexPath.row]
        cell?.textLabel?.text = movie.title
        cell?.detailTextLabel?.text = movie.genreString()
        
        return cell!
    }
}
```

Nếu bạn chạy lại test thì sẽ thấy nó vẫn pass qua bình thường.

Đây là hướng dẫn đơn giản về TDD và ý nghĩa của nó. Bạn hãy tiếp tục tạo thêm nhiều test case nữa để test và để trải nghiệm nó nhiều hơn nhé. Cảm ơn các bạn đã đón xem.

REF:  https://www.appcoda.com/tdd-quick-nimble/