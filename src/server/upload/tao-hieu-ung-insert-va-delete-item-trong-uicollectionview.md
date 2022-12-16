## 1. UICollectionView sử dụng UICollectionViewFlowLayout
Như trước đây chúng ta đã tìm hiểu về UICollectionView sử dụng UICollectionViewFlowLayout, chúng ta sẽ phải tạo 1 file Layout riêng cho collectionview.
Việc này dẫn đến 1 hạn chế là khi thực hiện các action thêm mới hoặc xóa item trong collectionview sẽ khó thêm hiệu ứng animation hơn, hôm nay chúng ta sẽ tìm hiểu cách tạo ra hiệu ứng khị thêm hoặc xóa item trong collectionview.

## 2. Tạo collectionView

### 2.1 Tạo sectionHeaderView
Chúng ta sẽ tiến hành tạo 1 collectionview với nhiều section, mỗi section có 1 số item nhất định, bên phải sẽ có 1 button thêm mới, bên trái sẽ có 1 button edit cho phép chúng ta chọn item cần remove.
Chúng ta cũng cần tạo section headerview cho collectionview

```
class Section {
	var title: String?
	var count = 0
}

class SectionHeader: UICollectionReusableView {
	@IBOutlet private weak var flagImage: UIImageView!
	@IBOutlet private weak var countLabel: UILabel!
	@IBOutlet private weak var titleLabel: UILabel!
	
	var section: Section! {
		didSet {
			titleLabel.text = section.title
			flagImage.image = UIImage(named: section.title ?? "")
			countLabel.text = "\(section.count)"
		}
	}
}
```

### 2.2 Tạo object Park

Data chúng ta sử dụng trong collectionview lần này sẽ là list park.

```
class Park {
	var name: String
	var state: String
	var date: String
	var photo: String
	var index: Int
	
	init(name: String, state: String, date: String, photo: String, index: Int) {
		self.name = name
		self.state = state
		self.date = date
		self.photo = photo
		self.index = index
	}
	
	convenience init(copying park: Park) {
		self.init(name: park.name, state: park.state, date: park.date, photo: park.photo, index: park.index)
	}
}
```

### 2.3 Tạo datasource

Tiếp đó chúng ta tạo 1 datasource để load list park từ file text

```
class DataSource {
	private var parks = [Park]()
	private var immutableParks = [Park]()
	private var sections = [String]()
	
	var count: Int {
		return parks.count
	}
	
	var numberOfSections: Int {
		return sections.count
	}
}
```

Chúng ta viết function load data từ file plist

```
private func loadParksFromDisk() -> [Park] {
	sections.removeAll(keepingCapacity: false)
	if let path = Bundle.main.path(forResource: "NationalParks", ofType: "plist") {
		if let dictArray = NSArray(contentsOfFile: path) {
			var nationalParks: [Park] = []
			for item in dictArray {
				if let dict = item as? NSDictionary {
					let name = dict["name"] as! String
					let state = dict["state"] as! String
					let date = dict["date"] as! String
					let photo = dict["photo"] as! String
					let index = dict["index"] as! Int
					let park = Park(name: name, state: state, date: date, photo: photo, index: index)
					if !sections.contains(state) {
						sections.append(state)
					}
					nationalParks.append(park)
				}
			}
			return nationalParks
		}
	}
	return []
}
```

Ngoài ra trong class DataSource chúng ta viết thêm 1 số hàm dùng trong viewcontroller
Hàm xóa item từ list indexPath

```
func deleteItemsAtIndexPaths(_ indexPaths: [IndexPath]) {
	var indexes = [Int]()
	for indexPath in indexPaths {
		indexes.append(absoluteIndexForIndexPath(indexPath))
	}
	var newParks = [Park]()
	for (index, park) in parks.enumerated() {
		if !indexes.contains(index) {
			newParks.append(park)
		}
	}
	parks = newParks
}
```

Hàm move item từ indexPath cũ sang indexPath mới

```
func moveParkAtIndexPath(_ indexPath: IndexPath, toIndexPath newIndexPath: IndexPath) {
	if indexPath == newIndexPath {
		return
	}
	let index = absoluteIndexForIndexPath(indexPath)
	let nationalPark = parks[index]
	nationalPark.state = sections[newIndexPath.section]
	let newIndex = absoluteIndexForIndexPath(newIndexPath)
	parks.remove(at: index)
	parks.insert(nationalPark, at: newIndex)
}
```

## 3. Tạo UICollectionViewFlowLayout
### 3.1 layoutAttributesForElements
Đầu tiên chúng ta cần implement funcion tạo layout layoutAttributesForElements, trong function này chúng ta đơn giản chỉ attribute với frame và width và height x2

```
override func layoutAttributesForElements(in rect: CGRect) -> [UICollectionViewLayoutAttributes]? {
	var result = [UICollectionViewLayoutAttributes]()
	if let attributes = super.layoutAttributesForElements(in: rect) {
		for item in attributes {
			let cellAttributes = item.copy() as! UICollectionViewLayoutAttributes
			if item.representedElementKind == nil {
				let frame = cellAttributes.frame
				cellAttributes.frame = frame.insetBy(dx: 2.0, dy: 2.0)
			}
			result.append(cellAttributes)
		}
	}
	
	return result
}
```

### 3.2 finalLayoutAttributesForDisappearingItem

Để layout có thể xử lý được những item bị remove chúng ta cần implement function finalLayoutAttributesForDisappearingItem, trong hàm này sẽ lấy list các item mà chúng ta muốn xóa, so sánh với từng item trong collectionview, nếu đúng nó sẽ trả về UICollectionViewLayoutAttributes kèm theo hiệu ứng tranform chúng ta cần

```
override func finalLayoutAttributesForDisappearingItem(at itemIndexPath: IndexPath) -> UICollectionViewLayoutAttributes? {
	guard let attributes = super.finalLayoutAttributesForDisappearingItem(at: itemIndexPath),
	let deleted = deletedItems,
		deleted.contains(itemIndexPath) else {
			return nil
	}
	attributes.alpha = 1.0
	attributes.transform = CGAffineTransform(scaleX: 0.1, y: 0.1)
	attributes.zIndex = -1
	return attributes
}
```

### 3.3 initialLayoutAttributesForAppearingItem

Hàm initialLayoutAttributesForAppearingItem có tác dụng tạo layout cho item khi insert

```
override func initialLayoutAttributesForAppearingItem(at itemIndexPath: IndexPath) -> UICollectionViewLayoutAttributes? {
	guard let attributes = super.initialLayoutAttributesForAppearingItem(at: itemIndexPath),
	let added = addedItem,
		added == itemIndexPath else {
			return nil
	}
	// set new attributes
	attributes.center = CGPoint(x: collectionView!.frame.width - 23.5, y: -24.5)
	attributes.alpha = 1.0
	attributes.transform = CGAffineTransform(scaleX: 0.15, y: 0.15)
	attributes.zIndex = 50
	return attributes
}
```

## 4. Xây dựng collectionview trong viewcontroller

Với số lượng item và section trong collectionview chúng ta chỉ cần implement 2 hàm 

```
override func numberOfSections(in collectionView: UICollectionView) -> Int {
	return dataSource.numberOfSections
}

override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
	return dataSource.numberOfParksInSection(section)
}
```

Để tạo hiệu ứng khi insert vào collectionview chúng ta cần hàm

```
func addItem() {
	let index = dataSource.indexPathForNewRandomPark()
	let layout = collectionView?.collectionViewLayout as! FlowLayout
	layout.addedItem = index
	UIView.animate(withDuration: 1.0, delay: 0, usingSpringWithDamping: 0.65, initialSpringVelocity: 0.0, options: [], animations: {
		self.collectionView?.insertItems(at: [index])
	}) { (finished) in
		layout.addedItem = nil
	}
}
```

Khi chúng ta tạo 1 item, chúng ta sẽ random index của nó dựa vào datasource và tạo 1 layout tương ứng, sau đó hàm 	UIView.animate sẽ tạo hiệu ứng animation khi add vào collection view.
Tương tự như vậy để xóa item khỏi collection view chúng ta cần hàm

```
func deleteSelected() {
	if let selected = collectionView?.indexPathsForSelectedItems {
		let layout = collectionView?.collectionViewLayout as! FlowLayout
		layout.deletedItems = selected
		
		dataSource.deleteItemsAtIndexPaths(selected)
		collectionView?.deleteItems(at: selected)
	}
}
```

Khi chúng ta xóa item, chúng ta sẽ chọn 1 list item từ collectionview, khi nhấn xóa, indexpath tương ứng của từng item được đưa vào datasource để tiến hành xóa.