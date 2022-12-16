Trong bài trước mình đã xây dựng một [UITableView design pattern](https://viblo.asia/p/uitableview-design-pattern-E375zRL15GW). Trong bài này mình sẽ hướng dẫn các bạn implement loadmore cho nó. 

Bài toán đơn giản như sau:

Thực hiện get data từ server thông qua API. Mỗi lần request server sẽ trả về một mảng 20 item. 
param:
start:int - index của item bắt đầu.
limit:int - số lượng item sẽ lấy về.

Mỗi lần request thành công tăng start lên và get thêm item về. Request được thực hiện khi user scroll tới phần tử cuối cùng của list.


## Create extension implement loadmore
Để thực hiện được load more bạn cần Implement một số func dưới đây vào  BaseTableController.
Thêm một số property cho BaseTableController.
```
    private var tableState: TableControllerState = .Normal
    private var limit:Int = 20
    private var startIndex:Int = 0
```
Thêm một abstract method 
```
    func loadMoreContent() {}
```
Create extension và thêm một số func sau:
```
    // Update entity of section
    func addEntityForSection(newItems _newItems:[AnyObject]?, atSection section:Int) {
        guard let newItems = _newItems else { return }
        guard section < items.count else { return }
        guard var listItemAtSection = items[section] as? [AnyObject] else { return }
        
        listItemAtSection.append(newItems as AnyObject)
        reloadData()
    }
    
    func handleDidGetNewItems(withItems items:[AnyObject]?){
        guard let listItem = items else {
            self.tableState = .NoLoadMore
            self.reloadData()
            return
        }
        
        self.tableState = .Normal;
        if listItem.count < limit {
            self.tableState = .NoLoadMore;
        }
        startIndex = self.items[0].count
        self.addEntityForSection(newItems: items, atSection: 0)
    }
```
Tiếp theo sửa lại một chút trong UITableViewDelegate như sau:
```
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if indexPath.row > tableView.numberOfRows(inSection: indexPath.section)  - 6 {
            if tableState == .Normal {
                loadMoreContent()
                if TableControllerConfig.ImplementLoadingCell {
                    return getLoadingCell(tableView, cellForRowAt: indexPath)
                }
            }
        }
        .....
        return cell
    }
    
    func getLoadingCell(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return UITableViewCell()
    }
```

Ở đây chúng ta thấy khi chúng ta scroll TableView xuống phần tử cuối cùng của list nó sẽ check trạng thái của TableView. Nếu nó đang loading thì thôi còn trường hợp TableView đang ở trạng thái normal thì thực hiện load more data.

Với TH bạn customize loading cell thì bạn override getLoadingCell ở subclass. Thực hiện giống `func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell`.

## Example
Tại subclass tiến hành override các function sau:

```
override func loadMoreContent() {}
```
Ex:
```
    override func loadMoreContent() {
        guard tableState == .Normal else { return }
        tableState = .LoadingMore
        APIEngine.sharedInstance.getBooks(withStartIndex: startIndex, Limit: limit, usingCache: false).completeBlock { (result, cache) in
            if let listGenreDict = result["data"].array {
                let listAlbum = BookObject.createListObjectFromListDict(listGenreDict)
                self.handleDidGetNewItems(withItems: listAlbum)
             } else {
                    self.stopIndicator()
             }
        }.errorBlock { (error) in
            self.stopIndicator()
        }
    }
```

Override `func getLoadingCell(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell` nếu bạn customize LoadingCell.

Vậy là xong phần xong phần loadmore. Trong bài sau mình sẽ hướng dẫn xây dựng BaseCollectionController.