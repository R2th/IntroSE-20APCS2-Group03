### Phần đầu tiên hãy tạo 1 hiệu ứng đơn giản

Tạo mới 1 project và sau đó vào ViewController để cấu hình lại
Setup UI chúng ta cần có 2 label

```
    let titleLabel = UILabel()
    let bodyLabel = UILabel()
```

tiếp theo, ở ViewDidLoad ta set các giá trị cho chúng

```
        titleLabel.numberOfLines = 0
        titleLabel.text = "Welcome To Project Simple Visual Effect"
        titleLabel.font = UIFont(name: "Futura", size: 34)
        bodyLabel.numberOfLines = 0
        bodyLabel.text = "Lorem ipsum dolor sit er elit lamet, consectetaur cillium adipisicing pecu, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nam liber te conscient to factor tum poen legum odioque civiuda."
```

Tạo thêm StackView để 2 Label đc đều và đẹp

```
        let stackView = UIStackView(arrangedSubviews: [titleLabel, bodyLabel])
        stackView.axis = .vertical
        stackView.spacing = 8
        view.addSubview(stackView)
        
        //enables autolayout
        stackView.translatesAutoresizingMaskIntoConstraints = false
        stackView.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        stackView.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
        stackView.widthAnchor.constraint(equalTo: view.widthAnchor, constant: -100).isActive = true
```

Thêm vào ViewDidLoad GestureRecognizer là tap để thực hiện Animation
```
 // fun animations
        view.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(handleTapAnimations)))
```

Viết hàm cho sự kiện này
```
@objc fileprivate func handleTapAnimations() {
        print("Animating")
        UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 0.5, initialSpringVelocity: 0.5, options: .curveEaseOut, animations: {
            
            self.titleLabel.transform = CGAffineTransform(translationX: -30, y: 0)
            
        }) { (_) in
            
            UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
                
                self.titleLabel.alpha = 0
                self.titleLabel.transform = self.titleLabel.transform.translatedBy(x: 0, y: -200)
            })
            
        }
        
        UIView.animate(withDuration: 0.5, delay: 0.5, usingSpringWithDamping: 0.5, initialSpringVelocity: 0.5, options: .curveEaseOut, animations: {
            
            self.bodyLabel.transform = CGAffineTransform(translationX: -30, y: 0)
            
        }) { (_) in
            
            UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
                
                self.bodyLabel.alpha = 0
                self.bodyLabel.transform = self.bodyLabel.transform.translatedBy(x: 0, y: -200)
            })
            
        }
    }
```
        
Bây giờ hãy chạy ứng dụng và xem kết quả nhé
![](https://images.viblo.asia/2ac640c2-82e7-4fdb-96f7-25523313b574.gif)

Thật đơn giản phải không nào. Bây giờ hãy thêm 1 vài page nữa, chúng ta hoàn toàn có thể biến chúng thành phần giới thiệu hấp dẫn cho app của bạn rồi đó

### Simple Introduction my app

Đầu tiên mình sẽ viết thêm 1 Extension nhỏ nhỏ để sử dụng trong project này
```
extension UIView {
    
    func anchor(top: NSLayoutYAxisAnchor?, leading: NSLayoutXAxisAnchor?, bottom: NSLayoutYAxisAnchor?, trailing: NSLayoutXAxisAnchor?, padding: UIEdgeInsets = .zero, size: CGSize = .zero) {
        
        translatesAutoresizingMaskIntoConstraints = false
        
        if let top = top {
            self.topAnchor.constraint(equalTo: top, constant: padding.top).isActive = true
        }
        
        if let leading = leading {
            self.leadingAnchor.constraint(equalTo: leading, constant: padding.left).isActive = true
        }
        
        if let bottom = bottom {
            self.bottomAnchor.constraint(equalTo: bottom, constant: -padding.bottom).isActive = true
        }
        
        if let trailing = trailing {
            self.trailingAnchor.constraint(equalTo: trailing, constant: -padding.right).isActive = true
        }
        
        if size.width != 0 {
            self.widthAnchor.constraint(equalToConstant: size.width).isActive = true
        }
        
        if size.height != 0 {
            self.heightAnchor.constraint(equalToConstant: size.height).isActive = true
        }
        
    }
    
    func fillSuperview(padding: UIEdgeInsets) {
        translatesAutoresizingMaskIntoConstraints = false
        if let superviewTopAnchor = superview?.topAnchor {
            topAnchor.constraint(equalTo: superviewTopAnchor, constant: padding.top).isActive = true
        }
        
        if let superviewBottomAnchor = superview?.bottomAnchor {
            bottomAnchor.constraint(equalTo: superviewBottomAnchor, constant: -padding.bottom).isActive = true
        }
        
        if let superviewLeadingAnchor = superview?.leadingAnchor {
            leadingAnchor.constraint(equalTo: superviewLeadingAnchor, constant: padding.left).isActive = true
        }
        
        if let superviewTrailingAnchor = superview?.trailingAnchor {
            trailingAnchor.constraint(equalTo: superviewTrailingAnchor, constant: -padding.right).isActive = true
        }
    }
    
}
```

Tiếp đến chúng ta cần có 1 stuct là page với 2 property sau

struct Page {
    let title: String
    let body: String
}

để giới thiệu app cho người dùng mình cần tới 4 page. Và để làm điều này thì dùng tới 1 CollectionView với 4 cell, mỗi cell là 1 page. Vì vậy ta cần cấu hình cho các page ở class PageCell

```
class PageCell: UICollectionViewCell {
    
    var parentController: PageController?
    
    var page: Page! {
        didSet {
            titleLabel.text = page.title
            bodyLabel.text = page.body
        }
    }

    let stackView = UIStackView()
    let titleLabel = UILabel()
    let bodyLabel = UILabel()
    let blackView = UIView()
    
    fileprivate func setupUI() {
        blackView.backgroundColor = .black
        titleLabel.text = "Quick Lists"
        titleLabel.font = UIFont(name: "Futura", size: 44)
        titleLabel.numberOfLines = -1
        bodyLabel.text = "How to create a custom list under one minute"
        bodyLabel.font = UIFont(name: "HelveticaNeue", size: 22)
        bodyLabel.numberOfLines = -1
        stackView.addArrangedSubview(titleLabel)
        stackView.addArrangedSubview(bodyLabel)
        stackView.axis = .vertical
        stackView.spacing = 0
        
        addSubview(blackView)
        addSubview(stackView)
        stackView.translatesAutoresizingMaskIntoConstraints = false
        stackView.centerXAnchor.constraint(equalTo: centerXAnchor).isActive = true
        stackView.centerYAnchor.constraint(equalTo: centerYAnchor).isActive = true
        stackView.widthAnchor.constraint(equalTo: widthAnchor, constant: -100).isActive = true
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupUI()
        titleLabel.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(handleTitleTap)))
        titleLabel.isUserInteractionEnabled = true
        bodyLabel.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(handleBodyTap)))
        bodyLabel.isUserInteractionEnabled = true
        addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(handleTap)))
    }
    
    @objc func handleBodyTap() {
        titleLabel.backgroundColor = .clear
        titleLabel.textColor = .black
        bodyLabel.backgroundColor = .black
        bodyLabel.textColor = .white
    }
    
    @objc func handleTitleTap(gesture: UITapGestureRecognizer) {
        titleLabel.backgroundColor = .black
        titleLabel.textColor = .white
        bodyLabel.backgroundColor = .clear
        bodyLabel.textColor = .black
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc fileprivate func handleTap(gesture: UITapGestureRecognizer) {
        let location = gesture.location(in: self)
        if location.x < frame.width / 2 {
            reset()
        } else {
            animatePageOut()
        }
    }
    
    fileprivate func animatePageOut() {
        animateLabelOut()
    }

    override func prepareForReuse() {
        reset()
    }
    
    fileprivate func animateLabelOut(up: Bool = true, completion: (() -> ())? = nil) {
        UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 0.5, initialSpringVelocity: 0.5, options: .curveEaseOut, animations: {
            self.titleLabel.transform = CGAffineTransform(translationX: -30, y: 0)
        }) { (_) in
            UIView.animate(withDuration: 0.75, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseIn, animations: {
                self.titleLabel.alpha = 0
                self.titleLabel.transform = CGAffineTransform(translationX: -30, y: -150 * (up ? 1 : -1))
            }, completion: { (_) in
                
            })
        }
        
        UIView.animate(withDuration: 0.5, delay: 0.5, usingSpringWithDamping: 0.5, initialSpringVelocity: 0.75, options: .curveEaseOut, animations: {
            self.bodyLabel.transform = CGAffineTransform(translationX: -30, y: 0)
        }) { (_) in
            self.perform(#selector(self.advance), with: nil, afterDelay: 0.3)
            UIView.animate(withDuration: 0.75, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseIn, animations: {
                self.bodyLabel.alpha = 0
                self.bodyLabel.transform = CGAffineTransform(translationX: -30, y: -350 * (up ? 1 : -1))
            }, completion: { (_) in
                
            })
        }
    }
    
    @objc func advance() {
        self.parentController?.scrollToNext()
    }
    
    fileprivate func reset() {
        titleLabel.transform = .identity
        titleLabel.alpha = 1
        bodyLabel.transform = .identity
        bodyLabel.alpha = 1
        titleLabel.backgroundColor = .clear
        titleLabel.textColor = .black
        bodyLabel.backgroundColor = .clear
        bodyLabel.textColor = .black
    }
}

```

Như trên ta có thể thấy phần animation của project trước đc dùng ở đây, và đương nhiên ở mỗi page khi chúng ta tap vào view sẽ có effect và khi kết thúc sẽ chuyển sang page tiếp theo

Và cuối cùng ở PageViewController ta cấu hình cho CollectionView

```
class PageController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    
    let cellId = "cellId"
    
    let pages = [
        Page(title: "Welcome To My App", body: "This is Simple Visual Effect Project"),
        Page(title: "Awesome People", body: "We work hard every day to make sure you don't have to."),
        Page(title: "Mission Statement", body: "Here at company XYZ, no stone is left unturned when looking for the BEST Solutions.\n\n🔥🔥🔥"),
        Page(title: "Leave us a message", body: "Lorem ipsum dolor sit er elit lamet, consectetaur cillium adipisicing pecu, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis "),
    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let layout = collectionViewLayout as? UICollectionViewFlowLayout {
            layout.scrollDirection = .horizontal
            layout.minimumLineSpacing = 0
        }
        collectionView?.isPagingEnabled = true
        collectionView?.backgroundColor = .white
        collectionView?.register(PageCell.self, forCellWithReuseIdentifier: cellId)
        setupPageControl()
    }
    
    let pageControl = UIPageControl()
    fileprivate func setupPageControl() {
        pageControl.numberOfPages = pages.count
        pageControl.currentPage = 0
        pageControl.currentPageIndicatorTintColor = .black
        pageControl.pageIndicatorTintColor = .lightGray
        view.addSubview(pageControl)
        pageControl.anchor(top: nil, leading: view.leadingAnchor, bottom: view.safeAreaLayoutGuide.bottomAnchor, trailing: view.trailingAnchor, padding: .zero, size: .init(width: 0, height: 50))
    }
    
    func scrollToNext() {
        guard let currentCell = collectionView?.visibleCells.first else { return }
        guard let index = collectionView?.indexPath(for: currentCell)?.item else { return }
        
        if index < pages.count - 1 {
            let nextIndexPath = IndexPath(item: index + 1, section: 0)
            collectionView?.scrollToItem(at: nextIndexPath, at: .centeredHorizontally, animated: true)
            pageControl.currentPage = index + 1
        }
    }
    
    override func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
        let x = scrollView.contentOffset.x
        let index = x / view.frame.width
        pageControl.currentPage = Int(index)
    }
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return pages.count
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath) as! PageCell
        cell.parentController = self
        cell.page = pages[indexPath.item]
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return view.bounds.size
    }   
}
```

Tèn tén ten, giờ hay nhìn thành quả cuối cùng nào

![](https://images.viblo.asia/2ac640c2-82e7-4fdb-96f7-25523313b574.gif)