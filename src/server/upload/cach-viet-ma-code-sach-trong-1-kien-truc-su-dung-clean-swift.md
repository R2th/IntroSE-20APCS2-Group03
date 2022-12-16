[Link bài viết gốc](https://clean-swift.com/how-to-write-clean-code-in-a-component-architecture-using-clean-swift/)

Bài viết này là 1 phần của chuỗi các email tôi viết cho các bạn đăng ký để hướng dẫn họ cách viết lại mã code hiện có. Nếu bạn muốn tham gia cùng chúng tôi vào workshop tiếp theo, hãy [đăng ký](https://clean-swift.com/) .

1. [Có gì sai với phương thức viewDidLoad() ?](https://clean-swift.com/wrong-viewdidload-method/)
2. [Đừng lãng phí thời gian để viết các bài test cho đoạn mã không thể kiểm chứng](https://clean-swift.com/dont-waste-time-writing-tests-for-untestable-code/)
3. [Chia nhỏ 1 hàm thành các hàm ngắn hơn với nhiệm vụ đơn lẻ](https://clean-swift.com/breaking-up-a-method-into-shorter-methods-with-single-responsibilities/)
4. Cách viết mã code sạch trong 1 kiến trúc sử dụng Clean Swift

Giờ bạn đã thấy lợi ích của việc chia nhỏ 1 hàm lớn thành các hàm ngắn hơn. Bạn cũng đã thấy các hàm ngắn này trông như thế nào. 
Tuy nhiên, hàm điều hướng vẫn còn trông rối rắm.
Hôm nay, chúng ta sẽ xem cách các thành phần VIP trong cấu trúc Clean Swift có thể hoạt động cùng nhau để giải quyết vấn đề hàm điều hướng như thế nào.
Trong kiến trúc Clean Swift, bạn có thể chia mã của mình thành componet và method.
Bạn có thể coi code thành mô hình mảng 2 chiều với thành phần là
```
[component, method].
```
Bạn có thể hiểu theo 1 chiều, logic và controller đi cùng nhau và nó đơn giản để sử dụng.
Tuy nhiên bạn có thể hiểu theo 2 chiều để phân tách giữa component rồi tới method.
Bạn có thể chuyển các hàm displayFollowerPosts() và updateFollowerPosts() thành các hàm trách nhiệm duy nhất trong controller, interactor và presenter.

Interactor xử lý các logic công việc. Presenter xử lý logic cách chuyển màn hình. ViewController xử lý hiển thị chi tiết màn hình. 

Mỗi phương thức được đặt trong viewDidLoad() rất quan trọng và chúng chỉ chạy 1 lần khi chạy màn hình và 1 công việc duy nhất.

ListPostViewController.swift:

``` swift
protocol ListPostsViewControllerInput
{
  func displayFetchFollowerPosts(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
  func displayFetchFollowerPostsFetchError(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
  func displayFetchFollowerPostsLoginError(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
}
 
protocol ListPostsViewControllerOutput
{
  func fetchFollowerPosts(request: ListPosts_FetchFollowerPosts_Request)
}
 
class ListPostsViewController: UIViewController, ListPostsViewControllerInput, UITableViewDataSource
{
  var output: ListPostsViewControllerOutput!
  var router: ListPostsRouter!
 
  @IBOutlet weak var loginButton: UIButton!
  @IBOutlet weak var tableView: UITableView!
 
  var posts: [ListPosts_FetchFollowerPosts_ViewModel.Post] = []
 
  // MARK: Object lifecycle
 
  override func awakeFromNib()
  {
    super.awakeFromNib()
    ListPostsConfigurator.sharedInstance.configure(self)
  }
 
  // MARK: View lifecycle
 
  override func viewDidLoad()
  {
    super.viewDidLoad()
    fetchFollowerPostsOnLoad()
  }
 
  // MARK: Fetch follower Posts
 
  private func fetchFollowerPostsOnLoad()
  {
    let request = ListPosts_FetchFollowerPosts_Request()
    output.fetchFollowerPosts(request)
  }
 
  // MARK: Display fetch follower posts or errors
 
  func displayFetchFollowerPosts(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
  {
    if let posts = viewModel.posts {
      refreshFollowerPosts(posts)
      hideLoginButton()
    }
  }
 
  func displayFetchFollowerPostsFetchError(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
  {
    if let error = viewModel.error {
      clearFollowerPosts()
      hideLoginButton()
      showAlert(error)
    }
  }
 
  func displayFetchFollowerPostsLoginError(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
  {
    if let _ = viewModel.error {
      showLoginButton()
    }
  }
 
  // MARK: Show/clear posts in table view
 
  private func refreshFollowerPosts(posts: [ListPosts_FetchFollowerPosts_ViewModel.Post])
  {
    self.posts = posts
    tableView.reloadData()
  }
 
  private func clearFollowerPosts()
  {
    self.posts = []
    tableView.reloadData()
  }
 
  // MARK: Show fetch error
 
  private func showAlert(error: String)
  {
    // ...
  }
 
  // MAARK: Show/hide login button
 
  private func showLoginButton()
  {
    loginButton.hidden = false
  }
 
  private func hideLoginButton()
  {
    loginButton.hidden = true
  }
 
  // MARK: Table view
 
  func numberOfSectionsInTableView(tableView: UITableView) -> Int
  {
    return 1
  }
 
  func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int
  {
    return posts.count
  }
 
  func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell
  {
    let post = posts[indexPath.row]
    let cell = tableView.dequeueReusableCellWithIdentifier("PostCell")!
    cell.textLabel?.text = post.title
    cell.detailTextLabel?.text = post.publishedOn
    return cell
  }
}
```

ListPostsInteractor.swift:
``` swift
protocol ListPostsInteractorInput
{
  func fetchFollowerPosts(request: ListPosts_FetchFollowerPosts_Request)
}
 
protocol ListPostsInteractorOutput
{
  func presentFetchFollowerPosts(response: ListPosts_FetchFollowerPosts_Response)
}
 
class ListPostsInteractor: ListPostsInteractorInput
{
  var output: ListPostsInteractorOutput!
  var worker = ListPostsWorker()
 
  let userManager = UserManager()
 
  var recentPosts = [Post]()
 
  // MARK: Follower Posts
 
  func fetchFollowerPosts(request: ListPosts_FetchFollowerPosts_Request)
  {
    if let currentUser = userManager.loggedInUser() {
      let followers = userManager.followersForUser(currentUser)
      worker.fetchPostsByAllFollowers(followers, completionHandler: { (posts: [Post]?, error: PostManagerError?) -> () in
        if let error = error {
          self.handleFetchPostsByAllFollowersFailure(error)
        } else if let posts = posts {
          self.handleFetchPostsByAllFollowersSuccess(posts)
        }
      })
    } else {
      handleLoggedInUserNotExist()
    }
  }
 
  private func handleFetchPostsByAllFollowersSuccess(posts: [Post])
  {
    let posts = Array(posts.sort { $0 > $1 }.prefix(5))
    let response = ListPosts_FetchFollowerPosts_Response(posts: posts, error: nil)
    output.presentFetchFollowerPosts(response)
  }
 
  private func handleFetchPostsByAllFollowersFailure(err: PostManagerError)
  {
    let error: ListPosts_FetchFollowerPosts_Error
    switch err {
    case .CannotFetch(let msg):
      error = ListPosts_FetchFollowerPosts_Error.CannotFetch(msg: msg)
    }
    let response = ListPosts_FetchFollowerPosts_Response(posts: nil, error: error)
    output.presentFetchFollowerPosts(response)
  }
 
  private func handleLoggedInUserNotExist()
  {
    let error = ListPosts_FetchFollowerPosts_Error.NotLoggedIn(msg: "User is not logged in")
    let response = ListPosts_FetchFollowerPosts_Response(posts: nil, error: error)
    output.presentFetchFollowerPosts(response)
  }
}
 
ListPostsPresenter.swift:

Swift
protocol ListPostsPresenterInput
{
  func presentFetchFollowerPosts(response: ListPosts_FetchFollowerPosts_Response)
}

protocol ListPostsPresenterOutput: class
{
  func displayFetchFollowerPosts(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
  func displayFetchFollowerPostsFetchError(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
  func displayFetchFollowerPostsLoginError(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
}

class ListPostsPresenter: ListPostsPresenterInput
{
  weak var output: ListPostsPresenterOutput!

  var dateFormatter: NSDateFormatter {
    let df = NSDateFormatter()
    df.dateStyle = .MediumStyle
    df.timeStyle = .MediumStyle
    return df
  }

  // MARK: Follower Posts

  func presentFetchFollowerPosts(response: ListPosts_FetchFollowerPosts_Response)
  {
    if let posts = response.posts {
      if !posts.isEmpty {
        handlePresentFetchFollowerPostsSuccess(response.posts!)
      }
    } else if let error = response.error {
      switch error {
      case .CannotFetch:
        handlePresentFetchFollowerPostsFailure(error)
      case .NotLoggedIn:
        handlePresentFetchFollowerPostsLoginError(error)
      }
    }
  }

  private func handlePresentFetchFollowerPostsSuccess(followerPosts: [Post])
  {
    let posts = formatFetchFollowerPosts(followerPosts)
    let viewModel = ListPosts_FetchFollowerPosts_ViewModel(posts: posts, error: nil)
    output.displayFetchFollowerPosts(viewModel)
  }

  private func handlePresentFetchFollowerPostsFailure(error: ListPosts_FetchFollowerPosts_Error)
  {
    let errorMsg = formatFetchFollowerPostsError(error)
    let viewModel = ListPosts_FetchFollowerPosts_ViewModel(posts: [], error: errorMsg)
    output.displayFetchFollowerPostsFetchError(viewModel)
  }

  private func handlePresentFetchFollowerPostsLoginError(error: ListPosts_FetchFollowerPosts_Error)
  {
    let errorMsg = formatFetchFollowerPostsError(error)
    let viewModel = ListPosts_FetchFollowerPosts_ViewModel(posts: [], error: errorMsg)
    output.displayFetchFollowerPostsLoginError(viewModel)
  }

  // MARK: Formatting

  private func formatFetchFollowerPosts(posts: [Post]?) -> [ListPosts_FetchFollowerPosts_ViewModel.Post]
  {
    var recentPosts: [ListPosts_FetchFollowerPosts_ViewModel.Post] = []
    if let posts = posts {
      for post in posts {
        let title = post.title
        let author = "\(post.user.firstName) \(post.user.lastName)"
        let publishedOn = dateFormatter.stringFromDate(post.timestamp)
        let recentPost = ListPosts_FetchFollowerPosts_ViewModel.Post(title: title, author: author, publishedOn: publishedOn)
        recentPosts.append(recentPost)
      }
    }
    return recentPosts
  }

  private func formatFetchFollowerPostsError(error: ListPosts_FetchFollowerPosts_Error?) -> String?
  {
    var errorMsg: String?
    if let error = error {
      switch error {
      case .CannotFetch(let msg):
        errorMsg = "ERROR: Cannot fetch - \(msg)"
      case .NotLoggedIn(let msg):
        errorMsg = "ERROR: Cannot login - \(msg)"
      }
    }
    return errorMsg
  }
}

protocol ListPostsPresenterInput
{
  func presentFetchFollowerPosts(response: ListPosts_FetchFollowerPosts_Response)
}
 
protocol ListPostsPresenterOutput: class
{
  func displayFetchFollowerPosts(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
  func displayFetchFollowerPostsFetchError(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
  func displayFetchFollowerPostsLoginError(viewModel: ListPosts_FetchFollowerPosts_ViewModel)
}

```

ListPostsPresenter.swift:
 
 ``` swift
class ListPostsPresenter: ListPostsPresenterInput
{
  weak var output: ListPostsPresenterOutput!
 
  var dateFormatter: NSDateFormatter {
    let df = NSDateFormatter()
    df.dateStyle = .MediumStyle
    df.timeStyle = .MediumStyle
    return df
  }
 
  // MARK: Follower Posts
 
  func presentFetchFollowerPosts(response: ListPosts_FetchFollowerPosts_Response)
  {
    if let posts = response.posts {
      if !posts.isEmpty {
        handlePresentFetchFollowerPostsSuccess(response.posts!)
      }
    } else if let error = response.error {
      switch error {
      case .CannotFetch:
        handlePresentFetchFollowerPostsFailure(error)
      case .NotLoggedIn:
        handlePresentFetchFollowerPostsLoginError(error)
      }
    }
  }
 
  private func handlePresentFetchFollowerPostsSuccess(followerPosts: [Post])
  {
    let posts = formatFetchFollowerPosts(followerPosts)
    let viewModel = ListPosts_FetchFollowerPosts_ViewModel(posts: posts, error: nil)
    output.displayFetchFollowerPosts(viewModel)
  }
 
  private func handlePresentFetchFollowerPostsFailure(error: ListPosts_FetchFollowerPosts_Error)
  {
    let errorMsg = formatFetchFollowerPostsError(error)
    let viewModel = ListPosts_FetchFollowerPosts_ViewModel(posts: [], error: errorMsg)
    output.displayFetchFollowerPostsFetchError(viewModel)
  }
 
  private func handlePresentFetchFollowerPostsLoginError(error: ListPosts_FetchFollowerPosts_Error)
  {
    let errorMsg = formatFetchFollowerPostsError(error)
    let viewModel = ListPosts_FetchFollowerPosts_ViewModel(posts: [], error: errorMsg)
    output.displayFetchFollowerPostsLoginError(viewModel)
  }
 
  // MARK: Formatting
 
  private func formatFetchFollowerPosts(posts: [Post]?) -> [ListPosts_FetchFollowerPosts_ViewModel.Post]
  {
    var recentPosts: [ListPosts_FetchFollowerPosts_ViewModel.Post] = []
    if let posts = posts {
      for post in posts {
        let title = post.title
        let author = "\(post.user.firstName) \(post.user.lastName)"
        let publishedOn = dateFormatter.stringFromDate(post.timestamp)
        let recentPost = ListPosts_FetchFollowerPosts_ViewModel.Post(title: title, author: author, publishedOn: publishedOn)
        recentPosts.append(recentPost)
      }
    }
    return recentPosts
  }
 
  private func formatFetchFollowerPostsError(error: ListPosts_FetchFollowerPosts_Error?) -> String?
  {
    var errorMsg: String?
    if let error = error {
      switch error {
      case .CannotFetch(let msg):
        errorMsg = "ERROR: Cannot fetch - \(msg)"
      case .NotLoggedIn(let msg):
        errorMsg = "ERROR: Cannot login - \(msg)"
      }
    }
    return errorMsg
  }
}
```

ListPostsWorker.swift:
``` swift
class ListPostsWorker
{
  let postManager = PostManager()
 
  // MARK: Business Logic
 
  func fetchPostsByAllFollowers(followers: [User], completionHandler: (posts: [Post]?, error: PostManagerError?) -> ())
  {
    var allFollowerPosts = [User: [Post]]()
    for follower in followers {
      fetchPostsByFollower(follower) { (posts: [Post]?, error: PostManagerError?) -> () in
        if let error = error {
          completionHandler(posts: nil, error: error)
        } else if let posts = posts {
          allFollowerPosts[follower] = posts
          if allFollowerPosts.count == followers.count {
            completionHandler(posts: Array(allFollowerPosts.values.flatten()), error: nil)
          }
        }
      }
    }
  }
 
  func fetchPostsByFollower(follower: User, completionHandler: (posts: [Post]?, error: PostManagerError?) -> ())
  {
    postManager.fetchPostsForUser(follower) { (posts: [Post]?, error: PostManagerError?) -> () in
      if let error = error {
        completionHandler(posts: nil, error: error)
      } else if let posts = posts {
        completionHandler(posts: posts, error: nil)
      }
    }
  }
}
```

Bạn có thể tìm link dự án tại [Github](https://github.com/Clean-Swift/Posts)

Giờ code đã trông rất khác so với hàm viewDidLoad() ban đầu. Chúng ta tốn rất nhiều công sức để thay đổi nó và liệu điều đó có xứng đáng?
Điều gì sẽ xảy ra nếu tôi nói với bạn rằng bạn tốn ít công sức hơn để viết phiên bản tốt hơn so với phiên bản ban đầu.
Làm sao vậy? Có nhiều mã code chắc chắn hơn.
Đúng vậy, code nhiều hơn nhưng viết nhanh hơn. Nghĩ ít, năng suất cao. Và hạnh phúc hơn ;) 
Nếu bạn tuân theo cấu trúc Clean Swift từ đầu, bạn sẽ có thể viết các hàm nhỏ, đơn lẻ. Code của bạn sẽ đúng vị trí từ đầu mà bạn không cần mất thời gian tái cấu trúc nó. Bạn sẽ thấy thoải mái hơn trong việc viết  và kiểm tra code bởi nó rõ ràng. Bạn sẽ đánh giá cao sự đơn giản của cấu trúc clean đem lại.
Nếu bạn muốn xem cách tôi áp dụng Clean Swift cho cùng hàm viewDidLoad() từ đầu, thì tôi sẽ có 1 buổi workshop LIVE vào tuần tiếp theo. Thông tin chi tiết thêm về ngày giờ hãy chờ đợi email tiếp theo của tôi