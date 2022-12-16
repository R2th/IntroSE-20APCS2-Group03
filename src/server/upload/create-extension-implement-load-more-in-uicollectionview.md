Trong bài trước mình đã hướng dẫn Implement [Loadmore cho UITableView](https://viblo.asia/p/create-extension-implement-load-more-in-uitableview-Eb85oMNjZ2G). Trong bài này mình sẽ hướng dẫn các bạn implement loadmore cho UICollectionView.

## Create extension implement loadmore
Để thực hiện được load more bạn cần Implement một số func dưới đây vào BaseCollectionController. Thêm một số property cho BaseCollectionController.

```
    private var tableState: ControllerState = .Normal
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
Tiếp theo sửa lại một chút trong UICollectionViewDelegate như sau:
```
 func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if indexPath.row > collectionView.numberOfItems(inSection: 0)  - 6 {
            if tableState == .Normal {
                loadMoreContent()
                if CollectionControllerConfig.ImplementLoadingCell {
                    return getLoadingCell(collectionView, cellForItemAt: indexPath)
                }
            }
        }
        
        let item = self.itemAtIndexPath(indexPath)
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: getCellIndenifi(withItem: item, _isClassName: false),  for:indexPath)
        
        if let baseCell = cell as? BaseCollectionViewCell {
            if sectionIsEditing < 0 {
                baseCell.tableState = tableState
            } else if indexPath.section == self.sectionIsEditing{
                baseCell.tableState = .isEditting
            }
            baseCell.sectionIsEditing = sectionIsEditing
            baseCell.indexPath = indexPath
            baseCell.configCellWithData(item);
        }
        return cell
    }
    
    func getLoadingCell(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        return UICollectionViewCell()
    }
```

Ở đây chúng ta thấy khi chúng ta scroll CollectionView xuống phần tử cuối cùng của list nó sẽ check trạng thái của CollectionView. Nếu nó đang loading thì thôi còn trường hợp CollectionView đang ở trạng thái normal thì thực hiện load more data.

Với TH bạn customize loading cell thì bạn override getLoadingCell ở subclass. Thực hiện giống `func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell`

Example
Tại subclass tiến hành override các function sau:

override func loadMoreContent() {}
Ex:
```
override func loadMoreContent() {
        print("Load more contents")
        startIndicator()
        if !self._isLisBooks {
            guard tableState == .Normal else { return }
            tableState = .LoadingMore
            APIEngine.sharedInstance.getBooks(withStartIndex: startIndex, Limit: limit, usingCache: false).completeBlock { (result, cache) in
                if let listGenreDict = result["data"].array {
                    let books = BookObject.createListObjectFromListDict(listGenreDict)
                    self.handleDidGetNewItems(withItems: books)
                } else {
                    self.stopIndicator()
                }
                }.errorBlock { (error) in
                    self.stopIndicator()
            }
        }
    }
```
Nếu bạn customize LoadingCell.
```
Override func getLoadingCell(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        return UICollectionViewCell()
    }
```

Về cơ bản mình đã xây dựng xong BaseTableController & BaseCollectionController.