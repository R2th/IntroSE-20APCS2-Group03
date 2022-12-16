Trong bài viết lần này tôi sẽ hướng dẫn các bạn tạo UITableView cuộn vô hạn trong ứng dụng iOS Swift

Tính năng cuộn vô hạn cho phép người dùng tải nội dung liên tục, loại bỏ nhu cầu phân trang. Ứng dụng tải một số dữ liệu ban đầu và sau đó thêm phần còn lại của thông tin khi người dùng đến cuối nội dung hiển thị.

Các công ty truyền thông xã hội như Twitter và Facebook đã làm cho kỹ thuật này trở nên phổ biến trong những năm qua. Nếu bạn nhìn vào các ứng dụng di động của họ, bạn có thể thấy thao tác cuộn vô hạn.

Trong hướng dẫn này, bạn sẽ học cách thêm tính năng cuộn vô hạn vào ứng dụng iOS tìm nạp dữ liệu từ API REST. Đặc biệt, bạn sẽ tích hợp API REST của Stack Exchange để hiển thị danh sách người kiểm duyệt cho một trang web cụ thể, như Stack Overflow hoặc Mathematics.

Để cải thiện trải nghiệm ứng dụng, bạn sẽ sử dụng API tìm nạp trước được Apple giới thiệu trong iOS 10 cho cả UITableView và UICollectionView. Đây là một công nghệ thích ứng thực hiện các tối ưu hóa được nhắm mục tiêu để cải thiện hiệu suất cuộn. Tìm nạp trước nguồn dữ liệu cung cấp một cơ chế để chuẩn bị dữ liệu trước khi bạn cần hiển thị nó. Đối với các nguồn dữ liệu lớn, nơi việc tìm nạp thông tin mất nhiều thời gian, việc triển khai công nghệ này có thể có tác động đáng kể đến trải nghiệm người dùng.

# Bắt đầu
Đầu tiên bạn hãy tải project sample tại [đây](https://koenig-media.raywenderlich.com/uploads/2018/06/ModeratorsExplorer.zip)
Mở Main.storyboard bạn sẽ thấy các view controller

![](https://images.viblo.asia/a213dbc4-3553-4e56-918c-2df76eff9c33.png)

View controller ở bên trái là VC gốc của ứng dụng. Trong đó bạn có:

- ModeratorSearchViewController: Phần này chứa một trường văn bản để bạn có thể tìm kiếm một trang web. Nó cũng chứa một nút đưa bạn đến chế độ xem tiếp theo.
- ModeratorListViewController: Bảng này bao gồm một bảng liệt kê những người kiểm duyệt cho một trang nhất định. Mỗi ô trong bảng, thuộc loại ModeratorTableViewCell, bao gồm hai nhãn: một để hiển thị tên của người kiểm duyệt và một cho danh tiếng. Ngoài ra còn có một chỉ báo bận quay khi nội dung mới được yêu cầu.

Build và chạy ứng dụng và bạn sẽ thấy màn hình ban đầu:

![](https://images.viblo.asia/d693ab5c-1f3f-437e-a725-ec1e75ab2c0a.png)

Lúc này khi tap vào button Find Moderators! bạn sẽ thấy một spinner xoay mãi. Nhiệm vụ của bạn bây giờ là ẩn spinner ấy đi khi load xong data.

# Làm quen với Stack Exchange API

API Stack Exchange cung cấp cơ chế truy vấn các mục từ mạng Stack Exchange.

Đối với hướng dẫn này, bạn sẽ sử dụng API / người dùng / người kiểm duyệt. Như tên của nó, nó trả về danh sách những người kiểm duyệt cho một trang web cụ thể.

Phản hồi API được phân trang; lần đầu tiên bạn yêu cầu danh sách người kiểm duyệt, bạn sẽ không nhận được toàn bộ danh sách. Thay vào đó, bạn sẽ nhận được danh sách với số lượng người kiểm duyệt giới hạn (một trang) và một con số cho biết tổng số người kiểm duyệt trong hệ thống của họ.

Phân trang là một kỹ thuật phổ biến cho nhiều API công khai. Thay vì gửi cho bạn tất cả dữ liệu họ có, họ gửi một số lượng hạn chế; khi bạn cần thêm, bạn đưa ra yêu cầu khác. Điều này giúp tiết kiệm tài nguyên máy chủ và cung cấp phản hồi nhanh hơn.

Đây là phản hồi JSON (để rõ ràng, nó chỉ hiển thị các trường liên quan đến phân trang):

```
{

  "has_more": true,
  "page": 1,
  "total": 84,
  "items": [
 
    ...
    ...
  ]
}
```

# Hiển thị các Moderator
Bắt đầu bằng cách tải trang đầu tiên của các moderator từ API.

Trong Mạng, hãy mở StackExchangeClient.swift và tìm fetchModerator (với: page: complete :). Thay thế phương thức này bằng:

```
func fetchModerators(with request: ModeratorRequest, page: Int, 
     completion: @escaping (Result<PagedModeratorResponse, DataResponseError>) -> Void) {
  // 1
  let urlRequest = URLRequest(url: baseURL.appendingPathComponent(request.path))
  // 2
  let parameters = ["page": "\(page)"].merging(request.parameters, uniquingKeysWith: +)
  // 3
  let encodedURLRequest = urlRequest.encode(with: parameters)
  
  session.dataTask(with: encodedURLRequest, completionHandler: { data, response, error in
    // 4
    guard 
      let httpResponse = response as? HTTPURLResponse,
      httpResponse.hasSuccessStatusCode,
      let data = data 
    else {
        completion(Result.failure(DataResponseError.network))
        return
    }
    
    // 5
    guard let decodedResponse = try? JSONDecoder().decode(PagedModeratorResponse.self, from: data) else {
      completion(Result.failure(DataResponseError.decoding))
      return
    }
    
    // 6
    completion(Result.success(decodedResponse))
  }).resume()
}
```

Giải thích:

1. Tạo một yêu cầu bằng cách sử dụng trình khởi tạo URLRequest. Thêm URL cơ sở vào đường dẫn cần thiết để lấy moderator. Sau khi giải quyết xong, đường dẫn sẽ như thế này:
http://api.stackexchange.com/2.2/users/moderators.
2. Tạo một tham số truy vấn cho số trang mong muốn và hợp nhất nó với các tham số mặc định được xác định trong Object ModeratorRequest - ngoại trừ trang và trang web; cái trước được tính toán tự động mỗi khi bạn thực hiện một yêu cầu và cái sau được đọc từ UITextField trong ModeratorsSearchViewController.
3. Mã hóa URL với các tham số đã tạo ở bước trước. Sau khi hoàn tất, URL cuối cùng cho một yêu cầu sẽ có dạng như sau: http://api.stackexchange.com/2.2/users/moderators?site=stackoverflow&amp;page=1&amp;filter=!-jbN0CeyJHb&amp;sort=reputation&amp;order=desc. Tạo một URLSessionDataTask với yêu cầu đó.
4. Xác thực phản hồi do tác vụ dữ liệu URLSession trả về. Nếu nó không hợp lệ, hãy gọi trình xử lý hoàn thành và trả về lỗi mạng kết quả.
5. Nếu phản hồi hợp lệ, hãy giải mã JSON thành một đối tượng PagedModeratorResponse bằng cách sử dụng Swift Codable API. Nếu nó tìm thấy bất kỳ lỗi nào, hãy gọi trình xử lý hoàn thành với kết quả lỗi giải mã.
6. Cuối cùng, nếu mọi thứ đều ổn, hãy gọi trình xử lý hoàn thành để thông báo cho giao diện người dùng rằng có nội dung mới.
 Bây giờ đã đến lúc làm việc trên danh sách moderator. Trong ViewModels, hãy mở ModeratorViewModel.swift và thay thế định nghĩa hiện có của fetchModerator bằng định nghĩa này:
 
```
func fetchModerators() {
  // 1
  guard !isFetchInProgress else {
    return
  }
  
  // 2
  isFetchInProgress = true
  
  client.fetchModerators(with: request, page: currentPage) { result in
    switch result {
    // 3
    case .failure(let error):
      DispatchQueue.main.async {
        self.isFetchInProgress = false
        self.delegate?.onFetchFailed(with: error.reason)
      }
    // 4
    case .success(let response):
      DispatchQueue.main.async {
        self.isFetchInProgress = false
        self.moderators.append(contentsOf: response.moderators)          
        self.delegate?.onFetchCompleted(with: .none)
      }
    }
  }
}
```

Đây là những gì đang xảy ra với mã bạn vừa thêm:

1. Đảm bảo nếu yêu cầu tìm nạp đang được tiến hành. Điều này ngăn nhiều yêu cầu xảy ra. Thêm về điều đó sau.
2. Nếu yêu cầu tìm nạp không được thực hiện, hãy đặt isFetchInProgress thành true và gửi yêu cầu.
3. Nếu yêu cầu không thành công, hãy thông báo cho người được ủy quyền về lý do của lỗi đó và hiển thị cho người dùng một cảnh báo cụ thể.
4. Nếu thành công, hãy thêm các mục mới vào danh sách moderator  và thông báo cho delegate rằng có sẵn dữ liệu.

Chạy code lại và ta sẽ thấy đã có data xuất hiện.
Tuy nhiên khi cuộn đến cuối list, phần data còn lại vẫn chưa xuất hiện. Chúng ta sẽ làm điều đó ở phần tiếp theo 

# Request phần data tiếp theo 
Bạn cần sửa đổi View model để yêu cầu các trang tiếp theo của API. Dưới đây là tổng quan về những gì bạn cần làm:

1. Theo dõi trang cuối cùng nhận được để bạn biết trang nào là cần thiết tiếp theo khi giao diện người dùng gọi phương thức yêu cầu
2. Xây dựng danh sách đầy đủ moderator. Khi bạn nhận được một trang mới từ API, bạn phải thêm nó vào danh sách của moderator (thay vì thay thế nó như bạn đã làm trước đây). 
Mở ModeratorViewModel.swift và thêm phương thức sau vào bên dưới fetchModerators ():
```
private func calculateIndexPathsToReload(from newModerators: [Moderator]) -> [IndexPath] {
  let startIndex = moderators.count - newModerators.count
  let endIndex = startIndex + newModerators.count
  return (startIndex..<endIndex).map { IndexPath(row: $0, section: 0) }
}
```

Giờ sửa ở trong function fetchModerators() ở case success:
```
DispatchQueue.main.async {
  // 1
  self.currentPage += 1
  self.isFetchInProgress = false
  // 2
  self.total = response.total
  self.moderators.append(contentsOf: response.moderators)
  
  // 3
  if response.page > 1 {
    let indexPathsToReload = self.calculateIndexPathsToReload(from: response.moderators)
    self.delegate?.onFetchCompleted(with: indexPathsToReload)
  } else {
    self.delegate?.onFetchCompleted(with: .none)
  }
}
```

# Xây dựng cuộn vô hạn
Để thực hiện được cuộn vô hạn, bạn cần cho UITableView biết được rằng số cell là tổng số tất cả moderator, chứ không phải số moderator bạn đã load được.
Để làm được điều này bạn cần sử dụng function delegate `UITableViewDataSourcePrefetching`
- tableView (: prefetchRowsAt :): Phương thức này nhận các đường dẫn chỉ mục cho các ô để tìm nạp trước dựa trên hướng và tốc độ cuộn hiện tại. Thông thường, bạn sẽ viết mã để bắt đầu hoạt động dữ liệu cho các mục được đề cập ở đây.
- tableView (: cancelPrefetchingForRowsAt :): Một phương thức tùy chọn kích hoạt khi bạn nên hủy các hoạt động tìm nạp trước. Nó nhận một mảng các đường dẫn chỉ mục cho các mục mà chế độ xem bảng đã từng đoán trước nhưng không cần nữa. Điều này có thể xảy ra nếu người dùng thay đổi hướng cuộn.

Trong trường hợp ta sử dụng function đầu tiên 
Mở ModeratorListViewController.swift và xem nhanh. Bộ điều khiển này thực hiện nguồn dữ liệu cho UITableView và gọi fetchModerators () trong viewDidLoad () để tải trang đầu tiên của moderator. Nhưng nó không làm được gì khi người dùng cuộn xuống danh sách. Đây là lúc API tìm nạp trước giải cứu.

Đầu tiên, bạn phải cho chế độ xem bảng biết rằng bạn muốn sử dụng Tìm nạp trước. Tìm viewDidLoad () và chèn dòng sau ngay dưới dòng nơi bạn đặt nguồn dữ liệu cho chế độ xem bảng:
```
tableView.prefetchDataSource = self
```

và thêm đoạn code sau vào cuối controller: 
```
func tableView(_ tableView: UITableView, prefetchRowsAt indexPaths: [IndexPath]) {
  if indexPaths.contains(where: isLoadingCell) {
    viewModel.fetchModerators()      
  }
}

private extension ModeratorsListViewController {
  func isLoadingCell(for indexPath: IndexPath) -> Bool {
    return indexPath.row >= viewModel.currentCount
  }

  func visibleIndexPathsToReload(intersecting indexPaths: [IndexPath]) -> [IndexPath] {
    let indexPathsForVisibleRows = tableView.indexPathsForVisibleRows ?? []
    let indexPathsIntersection = Set(indexPathsForVisibleRows).intersection(indexPaths)
    return Array(indexPathsIntersection)
  }
}
```

Giờ hãy thực hiện thay đổi datasource của tableView: 
```
extension ModeratorsListViewController: UITableViewDataSource {
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    // 1
    return viewModel.totalCount
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: CellIdentifiers.list, 
               for: indexPath) as! ModeratorTableViewCell
    // 2
    if isLoadingCell(for: indexPath) {
      cell.configure(with: .none)
    } else {
      cell.configure(with: viewModel.moderator(at: indexPath.row))
    }
    return cell
  }
}
```

Vẫn trong ModeratorListViewController.swift, tìm onFetchCompleted (with :) và thay thế nó bằng:

```
func onFetchCompleted(with newIndexPathsToReload: [IndexPath]?) {
  // 1
  guard let newIndexPathsToReload = newIndexPathsToReload else {
    indicatorView.stopAnimating()
    tableView.isHidden = false
    tableView.reloadData()
    return
  }
  // 2
  let indexPathsToReload = visibleIndexPathsToReload(intersecting: newIndexPathsToReload)
  tableView.reloadRows(at: indexPathsToReload, with: .automatic)
}
```


Chạy lại app và bạn sẽ thấy Scroll vô hạn đã thành công.
Chúc bạn ứng dụng thành công tính năng này vào ứng dụng của mình!