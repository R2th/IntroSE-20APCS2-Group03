Trong một ứng dụng iOS điển hình sử dụng MVC làm kiến trúc, View Controller  phải xử lý điều hướng giữa các View Controller xem khác. Điều đó có nghĩa là View Controller phải biết trước các View Controller khác mà nó sẽ điều hướng đến. Điều này tạo ra một khớp nối chặt chẽ giữa các View Controller mà chúng ta nên tránh bất cứ khi nào có thể.
  ```swift 
  
  class MovieListViewController: UICollectionViewController {
  
  //...
  override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
    guard let movieDetailVC = segue.destination as? MovieDetailViewController, let cell = sender as? UICollectionViewCell, let indexPath = collectionView.indexPath(for: cell)  else {
      fatalError("Unexpected View Controller")
     }

     let movie = movies[indexPath.item]
     movieDetailVC.movie = movie
  }
  
}
  
  ```
  
 ### Enter the Coordinator Pattern
 Trong những năm gần đây, có một mô hình mới xuất hiện để giải quyết vấn đề điều hướng này, đó là mô hình Coordinator pattern. Dưới đây là sự cố về cách thức hoạt động của nó:
 
  - View Controllercủa Coordinator pattern là xử lý tất cả logic để trình bày giữa các View Controllers.
  - View Controller sử dụng phân quyền để liên lạc lại với Coordinator khi muốn trình bày bộ điều khiển chế độ xem khác hoặc điều hướng trở lại
  -  Coordinator chấp nhận View Controller presenting (thường là Trình điều khiển điều hướng), sau đó thiết lập View Controller với tất cả các thuộc tính cần thiết để điều hướng và thực hiện điều hướng thực tế.

Đó là tổng quan về Coordinator,  hãy để di chuyển sang phần tiếp theo, nơi chúng tôi sẽ cấu trúc lại một ứng dụng sử dụng phân đoạn bảng phân cảnh tiêu chuẩn để điều hướng giữa view controller.

### What we will refactor

Ứng dụng có 2 màn hình riêng biệt, một là màn hình MovieList và một màn hình khác là màn hình MovieDetail. Bất cứ khi nào người dùng chạm vào MovieCell trong danh sách, nó sẽ thực hiện phân tách đến màn hình MovieDetail đi qua Phim trong chỉ mục đã chọn. Dưới đây là những điều  sẽ làm để tái cấu trúc điều hướng ứng dụng thành Coordinator pattern:


- Tạo Coordinator protocol, sau đó tạo các lớp coordinator cụ thể cho ứng dụng, danh sách phim vc và màn hình vc chi tiết phim.
- Khởi tạo ứng dụng  theo chương trình, set  initial coordinator và bắt đầu navigation từ AppDelegate
- Tạo delegate trong MovieListViewContaptor sẽ được sử dụng để liên lạc lại với MovieListCoordinator để thiết lập và điều hướng đến MovieDetailViewCont.

### Defining Coordinator Protocol
Để bắt đầu, hãy tạo ra một Giao thức mới với tên của Điều phối viên, giao thức này chỉ có một chức năng bắt đầu sẽ được gọi để thiết lập và thực hiện điều hướng trong lớp cụ thể.
 ```swift 
 protocol Coordinator {
     
    func start()
}

   ```
   
 ### Building MovieDetailCoordinator
 Tiếp theo, hãy để cùng nhau tạo coordinator cho MovieDetailViewControll, đó là MovieDetailCoordinator. Dưới đây là chi tiết thực hiện:
 
 - MovieDetailCoordinator có trình khởi tạo chấp nhận presenter view controller của người thuyết trình và đối tượng phim, sau đó nó lưu các thuộc tính dưới dạng một instance properties.
 ```swift 
 import UIKit

class MovieDetailCoordinator: Coordinator {
    
    private let presenter: UINavigationController
    private var movieDetailViewController: MovieDetailViewController?
    private let movie: Movie
    
    init(presenter: UINavigationController, movie: Movie) {
        self.presenter = presenter
        self.movie = movie
    }
    
    func start() {
        let movieDetailViewController = MovieDetailViewController()
        movieDetailViewController.movie = movie
        self.movieDetailViewController = movieDetailViewController
        
        presenter.pushViewController(movieDetailViewController, animated: true) 
    }
}
 ```

### Building MovieListCoordinator

Tiếp theo, hãy để di chuyển đến bộ chuyển đổi MovieListViewControll. Đầu tiên, chúng ta phải đặt cách MovieListViewControll sẽ giao tiếp với coordinator. Chúng ta sẽ sử dụng một delegate cho việc này. Vì vậy, hãy khai báo MovieListViewControllDelegate như vậy.
 ```swift 
 protocol MovieListViewControllerDelegate: class {
    
    func movieListViewController(_ controller: MovieListViewController, didSelect movie: Movie)
    
}
  ```
Điều hướng đến khai báo MovieListViewControll để thêm một biến yếu mới với loại MovieListViewControllDelegate. Đồng thời xóa phương thức readyForSegue và cập nhật phương thức CollectionView (_didSelectItemAtIndexPath :) như mã dưới đây để gọi đại biểu và chuyển phim người dùng đã chọn.

 ```swift 
 class MovieListViewController: UICollectionViewController {
    
    weak var delegate: MovieListViewControllerDelegate?
    //.....
  
    override func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let movie = movies[indexPath.item]
        delegate?.movieListViewController(self, didSelect: movie)
    }
  
}
 ```
 Tiếp theo, hãy để cùng nhau tạo lớp MovieListCoordinator cho MovieListViewControll. Dưới đây là bảng phân tích về cách chúng tôi sẽ triển khai mẫu Điều phối viên cho lớp này:
 
 - MovieListCoordinator chấp nhận bộ điều khiển điều hướng và mảng phim như đối với tham số khởi tạo. Nó lưu trữ những tài sản như thể.
 - Nó cũng có một thuộc tính tùy chọn cho MovieListViewControll sẽ được đặt trong phương thức start và MovieDetailCoordinator trong việc triển khai MovieListViewControllDelegate cho điều phối viên
 - Trong phương thức bắt đầu, MovieListViewControll được khởi tạo, sau đó mảng phim được gán cho VC. Cuối cùng, bộ điều khiển điều hướng của người thuyết trình sẽ đẩy VC đến ngăn xếp điều hướng của nó.
 - Trong phương thức movieListViewControll (didSelectMovie :), MovieDetailCoordinator được khởi tạo thông qua đối tượng Movie đã chọn. Cuối cùng, phương thức khởi động của điều phối viên được gọi để điều hướng đến MovieDetailViewCont

```swift 
import UIKit

class MovieListCoordinator: Coordinator {
    
    private var presenter: UINavigationController
    private var movieDetailCoordinator: MovieDetailCoordinator?
    private var movieListViewController: MovieListViewController?
    private var movies: [Movie]
    
    init(presenter: UINavigationController, movies: [Movie]) {
        self.presenter = presenter
        self.movies = movies
    }
    
    func start() {
        let movieListViewController = MovieListViewController()
        movieListViewController.movies = movies
        movieListViewController.delegate = self
        
        self.movieListViewController = movieListViewController
        presenter.pushViewController(movieListViewController, animated: true)
    }
    
}

extension MovieListCoordinator: MovieListViewControllerDelegate {
    
    func movieListViewController(_ controller: MovieListViewController, didSelect movie: Movie) {
        let movieDetailCoordinator = MovieDetailCoordinator(presenter: presenter, movie: movie)
        
        self.movieDetailCoordinator = movieDetailCoordinator
        movieDetailCoordinator.start()
    }
    
}

 ```
 
 ### Conclusion
 
 Vậy là xong !, chúng ta đã thành công tách tất cả các logic chuyển hướng bên trong Xem Bộ xử lý bằng cách sử dụng Coordinator pattern. Nó giảm trách nhiệm của View Controllers để điều hướng đến một đối tượng điều phối riêng. Sử dụng mẫu này giúp chúng ta viết một bản tóm tắt tốt hơn nhiều và tách biệt trách nhiệm giữa các lớp. Hãy để ngôn ngữ học tập suốt đời tiếp tục và tiếp tục xây dựng với Swift.