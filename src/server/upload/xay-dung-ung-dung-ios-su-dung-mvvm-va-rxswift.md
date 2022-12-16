# Giới thiệu
Trong phạm vi bài viết này, chúng ta sẽ từng bước xây dựng một ứng dụng iOS đơn giản sử dụng mô hình MVVM và thư viện RxSwift.
![](https://images.viblo.asia/2110aa0b-9ae7-4b97-b868-c983813de1c0.jpeg)

Chúng ta sẽ xây dựng một một ứng dụng cho phép tìm kiếm trên GitHub.

# Thiết lập ứng dụng
Tạo một ứng dụng Single View gồm một TableView với một thanh tìm kiếm chính là header của TableView.
Thanh tìm kiếm sẽ request tới GitHub API để lấy về thông tin Repository theo GitHub ID qua URL sau:
https://api.github.com/users/GitHubID/repos

```
func configureSearchController() {
        searchController.obscuresBackgroundDuringPresentation = false
        searchBar.showsCancelButton = true
        searchBar.text = "oLeThiVanAnh"
        searchBar.placeholder = "Enter GitHub ID, e.g., \"oLeThiVanAnh\""
        tableView.tableHeaderView = searchController.searchBar
        definesPresentationContext = true
    }
```

Kêt nối Data sequence của viewModel với tableView như đoạn code dưới đây:

```
viewModel.data
    .drive(tableView.rx.items(cellIdentifier: "Cell")) { _, repository, cell in
        cell.textLabel?.text = repository.name
        cell.detailTextLabel?.text = repository.url
    }
    .addDisposableTo(disposeBag)
```

Sử dụng struct Repository để lưu thông tin của một Repository gồm các thông tin repoName, repoUrl
```
struct Repository {
    
    let repoName: String
    let repoURL: String
}
```

Đối tượng ViewModel sẽ có cấu trúc như sau:
```
class ViewModel {
    
    let searchText = Variable("")
    
    lazy var data: Driver<[Repository]> = {
        
        return Observable.of([Repository]()).asDriver(onErrorJustReturn: [])
    }()
}
```

# Thực thi các hàm chức năng
Chúng ta sẽ thực thi chức năng  **repositoriesBy()** cho phép tìm kiếm các repo theo GitHub ID, với tham số đầu vào là GitHub ID và kết quả trả về là Observable một list các Repository.
```
static func repositoriesBy(_ githubID: String) -> Observable<[Repository]> {
        guard !githubID.isEmpty,
            let url = URL(string: "https://api.github.com/users/\(githubID)/repos") else {
            return Observable.just([])
         }
    }
```

## Lấy và phân tích dữ liệu
Ta sẽ sử dụng **rx.json** của URLSession để phân tích dữ liệu lấy từ URL.
```
guard !githubID.isEmpty,
    let url = URL(string: "https://api.github.com/users/\(githubID)/repos") else {
    return Observable.just([])
 }

return URLSession.shared.rx.json(url: url)
```

rx.json sẽ trả về Observerable kết quả request dưới dạng JSON. Để tránh lỗi phát sinh khi gửi request tới URL, ta có thể sử dụng đoạn code dưới đây cho phép gửi lại request khi có lỗi:
```
return URLSession.shared.rx.json(url: url)
  .retry(3)
  .catchErrorJustReturn([])
```

Sử dụng đoạn code dưới đây để phân tích dữ liệu về dạng mảng
```
static func parse(json: Any) -> [Repository] {
        guard let items = json as? [[String: Any]]  else {
            return []
        }
    }
```

Phân tích để lấy thông tin của Repository và lưu vào struct Repository.
```
guard let items = json as? [[String: Any]]  else {
            return []
        }
        
        var repositories = [Repository]()
        
        items.forEach{
            guard let repoName = $0["name"] as? String,
                let repoURL = $0["html_url"] as? String else {
                    return
            }
        }
```

Tổng hợp và lưu vào một mảng:
```
static func repositoriesBy(_ githubID: String) -> Observable<[Repository]> {
        guard !githubID.isEmpty,
            let url = URL(string: "https://api.github.com/users/\(githubID)/repos") else {
            return Observable.just([])
         }
        
        return URLSession.shared.rx.json(url: url)
        .retry(3)
        //.catchErrorJustReturn([])
        .map(parse)
    }
```

Chúng ta sẽ chỉ xử lý để lấy dữ liệu từ URL ở bước này.

```
static func repositoriesBy(_ githubID: String) -> Observable<[Repository]> {
        guard !githubID.isEmpty,
            let url = URL(string: "https://api.github.com/users/\(githubID)/repos") else {
            return Observable.just([])
         }
        
        return URLSession.shared.rx.json(url: url)
        .retry(3)
        //.catchErrorJustReturn([])
        .map(parse)
    }
```

## Kết nối dữ liệu đã phân tích với View element
Do giới hạn của GitHub API chỉ giới hạn gửi 10 request trong một phút. Chúng ta sẽ sử dụng phép xử lý **throttle** để chỉ lấy dữ liệu mới nhất sau một khoảng thời gian nhất định, và tránh việc gửi quá nhiều request tới GitHub. Và sử dụng phép xử lý **distinctUntilChanged** để lấy các giá trị không lặp liền kề nhau.
```
lazy var data: Driver<[Repository]> = {
        
        return self.searchText.asObservable()
        .throttle(0.3, scheduler: MainScheduler.instance)
        .distinctUntilChanged()
    }()
```

Ta sẽ sử dụng phép xử lý **flatMapLatest** để chuyển sang Observable sequence mới nhất và thực hiện các phép biển đổi tới các thành phần trong kết quả tìm kiếm thực hiện qua hàm **ViewModel.repositoryBy()**.

```
lazy var data: Driver<[Repository]> = {
        
        return self.searchText.asObservable()
        .throttle(0.3, scheduler: MainScheduler.instance)
        .distinctUntilChanged()
        .flatMapLatest(ViewModel.repositoriesBy)
            .asDriver(onErrorJustReturn: [])
    }()
```

Trong ViewController, ta sẽ kết nối **rx.text** của **searchBar** với **searchText** sequence of **ViewModel**
```
viewModel.data
        .drive(tableView.rx.items(cellIdentifier: "Cell")) { _, repository, cell in
            cell.textLabel?.text = repository.name
            cell.detailTextLabel?.text = repository.url
        }
        .addDisposableTo(disposeBag)

    searchBar.rx.text.orEmpty
    .bind(to: viewModel.searchText)
    .disposed(by: disposeBag)
```

Lúc này mỗi khi searchField thay đổi sẽ được đẩy vào searchText sequence của ViewModel, và gửi request để lấy dữ liệu
Ta sẽ sử dụng data sequence của ViewModel để cập nhật tiêu đề của navigationItem bằng cách sử dụng rx.title.

```
searchBar.rx.text.orEmpty
            .bind(to: viewModel.searchText)
            .disposed(by: disposeBag)
        
viewModel.data.asDriver()
            .map { "\($0.count) Repositories" }
            .drive(navigationItem.rx.title)
            .disposed(by: disposeBag)
```

# Build và chạy thử ứng dụng
Giờ ta có thể chạy thử ứng dụng sau những bước trên, và sẽ có giao diện như hình dưới đây
![](https://images.viblo.asia/efd72c3b-1506-47d3-834d-c3a36caf7dc4.PNG)

# Kết luận
Sau bài viết này mong rằng mọi người sẽ quen thuộc hơn với mô hình MVVM, và các phép xử lý trong RxSwift

Nguồn tham khảo: https://medium.com/@navdeepsingh_2336/creating-an-ios-app-with-mvvm-and-rxswift-in-minutes-b8800633d2e8

Mã nguồn chương trình: https://github.com/oLeThiVanAnh/R1_2019