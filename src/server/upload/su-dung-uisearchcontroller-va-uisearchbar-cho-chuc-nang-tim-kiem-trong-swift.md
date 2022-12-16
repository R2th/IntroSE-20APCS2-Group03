UISearchBar và UISearchControll là những yếu tố chính trong phát triển ứng dụng iOS. Nhưng trong khi UISearchBar đã nhận được các thay đổi định kỳ kể từ khi được giới thiệu trong iOS 2, thì UISearchControll đã khá yên tĩnh kể từ khi Apple giới thiệu nó trong iOS 8. Trong iOS 13, Apple đã cập nhật cả hai.
Apple cũng giới thiệu UISearchToken, cung cấp sự hỗ trợ rất cần thiết cho UISearchControll.  Bạn có thể cho phép người dùng của mình thực hiện các truy vấn tìm kiếm phức tạp bên cạnh các tìm kiếm dựa trên văn bản mà họ đã sử dụng. 

Tải code sample ở [đây](https://docs-assets.developer.apple.com/published/bbb8726fef/DisplayingSearchableContentByUsingASearchController.zip)
**Sử dụng  Search Result Controller **

Tạo bộ điều khiển tìm kiếm Sử dụng MainTableViewController, một lớp con của UITableViewControll, để tạo bộ điều khiển tìm kiếm. Trình điều khiển tìm kiếm và lọc một tập hợp các đối tượng Sản phẩm và hiển thị chúng trong một bảng có tên là resultsTableController. Bộ điều khiển bảng này được hiển thị khi người dùng nhập chuỗi tìm kiếm và bị loại bỏ khi tìm kiếm hoàn tất.

```
override func viewDidLoad() {
    super.viewDidLoad()

    let nib = UINib(nibName: "TableCell", bundle: nil)
    tableView.register(nib, forCellReuseIdentifier: tableViewCellIdentifier)
    
    resultsTableController =
        self.storyboard?.instantiateViewController(withIdentifier: "ResultsTableController") as? ResultsTableController
    // This view controller is interested in table view row selections.
    resultsTableController.tableView.delegate = self
    
    searchController = UISearchController(searchResultsController: resultsTableController)
    searchController.delegate = self
    searchController.searchResultsUpdater = self
    searchController.searchBar.autocapitalizationType = .none
    searchController.dimsBackgroundDuringPresentation = false
    searchController.searchBar.delegate = self // Monitor when the search button is tapped.
    
    searchController.searchBar.scopeButtonTitles = [Product.productTypeName(forType: .all),
                                                    Product.productTypeName(forType: .birthdays),
                                                    Product.productTypeName(forType: .weddings),
                                                    Product.productTypeName(forType: .funerals)]

    // Place the search bar in the navigation bar.
    navigationItem.searchController = searchController
    
    // Make the search bar always visible.
    navigationItem.hidesSearchBarWhenScrolling = false
    
    /** Search presents a view controller by applying normal view controller presentation semantics.
        This means that the presentation moves up the view controller hierarchy until it finds the root
        view controller or one that defines a presentation context.
    */
    
    /** Specify that this view controller determines how the search controller is presented.
        The search controller should be presented modally and match the physical size of this view controller.
    */
    definesPresentationContext = true
    
    setupDataSource()
}
```

**Cập nhật Search Result **

 Trong ví dụ này ta sử dụng giao thức UISearchResultsUpdating, cùng với NSComparisonPredicate, để lọc kết quả tìm kiếm từ nhóm các sản phẩm có sẵn. NSComparisonPredicate là một lớp nền tảng chỉ định cách dữ liệu nên được tìm nạp hoặc lọc bằng các tiêu chí tìm kiếm. Tiêu chí tìm kiếm dựa trên những gì người dùng nhập vào thanh tìm kiếm, có thể là sự kết hợp của tiêu đề sản phẩm, năm giới thiệu và giá cả. Để chuẩn bị cho tìm kiếm, nội dung trên thanh tìm kiếm được cắt bớt tất cả các ký tự khoảng trắng ở đầu và cuối. Sau đó, chuỗi tìm kiếm được chuyển đến hàm findMatches, trả về NSComparisonPredicate được sử dụng trong tìm kiếm. Kết quả danh sách sản phẩm được áp dụng cho bảng kết quả tìm kiếm dưới dạng danh sách được lọc
 
```
func updateSearchResults(for searchController: UISearchController) {
       // Update the filtered array based on the search text.
       let searchResults = products

       // Strip out all the leading and trailing spaces.
       let whitespaceCharacterSet = CharacterSet.whitespaces
       let strippedString =
           searchController.searchBar.text!.trimmingCharacters(in: whitespaceCharacterSet)
       let searchItems = strippedString.components(separatedBy: " ") as [String]

       // Build all the "AND" expressions for each value in searchString.
       let andMatchPredicates: [NSPredicate] = searchItems.map { searchString in
           findMatches(searchString: searchString)
       }

       // Match up the fields of the Product object.
       let finalCompoundPredicate =
           NSCompoundPredicate(andPredicateWithSubpredicates: andMatchPredicates)

       let filteredResults = searchResults.filter { finalCompoundPredicate.evaluate(with: $0) }

       // Apply the filtered results to the search results table.
       if let resultsController = searchController.searchResultsController as? ResultsTableController {
           resultsController.filteredProducts = filteredResults
           resultsController.tableView.reloadData()

           resultsController.resultsLabel.text = resultsController.filteredProducts.isEmpty ?
               NSLocalizedString("NoItemsFoundTitle", comment: "") :
               String(format: NSLocalizedString("Items found: %ld", comment: ""),
                      resultsController.filteredProducts.count)
       }
   }
```