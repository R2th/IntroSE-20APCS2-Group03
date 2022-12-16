# Mục tiêu đạt được: 

![](https://images.viblo.asia/a5b123a6-e597-40d7-b772-83f9bced96fa.gif)

Link github project mẫu: https://github.com/anitaa1990/OnboardingSample

# Bước 1: Tạo project mới trong xcode

![](https://images.viblo.asia/b55720f1-beaf-4b83-aab6-b353fc29fcc7.png)
![](https://images.viblo.asia/9fa260b4-a477-405b-b58e-0cf63552514b.png)

Hãy chắc chắn ngôn ngữ code là Swift

# Bước 2:Thêm scrollView UI
Trong màn hình main.storyboard, chọn UISCrollview từ Object Library và thêm nó bên trong view controller. UIScrollview nên được phủ đầy view như hình bên dưới


![](https://images.viblo.asia/32a1f323-111d-476a-81e4-ae7b3e23a756.png)![](https://images.viblo.asia/1a0fe21c-34cf-42e0-8fa1-75032accd3a7.png)


# Bước 3:Thêm PageControl vào giao diện
Chọn PageControl từ Object Library và thêm nó vào controller. Hãy chắc chắn rằng page control ở bên ngoài scrollview và không phải 1 phần của nó.

# Bước 4: Kết nối ScrollView với Code
Click vào nút Assistant ở phần toolbar Xcode gần phía trái trên của Xcode để mở ra asistant editor.

![](https://images.viblo.asia/22b4d22e-a068-4425-ad18-0b41665a5890.png)
![](https://images.viblo.asia/a21278e4-a269-437b-87a5-351b007d1544.png)


Ở storyboard của bạn, chọn scrollview. Giữ và kéo thả từ storyboard vào khu vực hiển thị code bên dưới. Khi kết thúc sẽ xuất hiện 1 hộp thoại xuát hiện, type scrollView và chọn Connect

# Bước 5: Thêm Custom View
Chọn File ->New ->File (hoặc bấm Command-N). 
Lựa chọn Cocoa Touch Class. Và click Next.
Ở khu vực Class, điền Slide. Ở phần "Subclass ò field", chọn UIVIew

![](https://images.viblo.asia/6c34c5e7-eb8c-41c6-b5dd-de9c92470343.png)


# Bước 6: Tạo file xib
Chuột phải vào vị trí màn hình nơi mà các file project của bạn ( như view controller, storyboard, etc ) chọn new file. Xcode sẽ nhắc nhở bạn về loại file mà bạn tạo. Chọn lựa chọn View bên dưới Interace menu. Trên cửa sổ bật lên, bạn sẽ được nhắc nhở về tên file xib bạn tạo, chúng ta gọi là Slide


![](https://images.viblo.asia/ce049267-1592-46d4-82cd-1347def829e2.png)


# Bước 7: Thiết kế màn hình tích hợp của chúng ta.
Chọn View và sau đó ở phần bên phải của mfn hình phần "Indentity Inspector" đặt tên của file UIView (Slide) như tên 1 class.

![](https://images.viblo.asia/45c17075-4107-4a6d-acd8-c2be5add9765.png)

Kéo 1 imageView và 2 labels từ Object Library. Bạn có thể sắp xếp lại imageView và các dán nhãn theo yêu cầu của bạn. Constaint được sử dụng trong project sẽ được thể hiện bên dưới:

![](https://images.viblo.asia/8a20adff-7cee-4651-bf6c-83dcb5fd8bd7.png)


# Bước 8: Thêm imageView và labels từ bước phía trước như 1 IB outlet ở Slide.swift 


![](https://images.viblo.asia/2a423461-73c9-44c0-9d4c-8551205892ac.png)

# Bước 9: Cài đặt scrollview pages ở controller
Giờ thì UI của chúng ta đã xong, chúng ta có thể thêm 1 vài page vào scrollview:

```
func createSlides() -> [Slide] {

        let slide1:Slide = Bundle.main.loadNibNamed("Slide", owner: self, options: nil)?.first as! Slide
        slide1.imageView.image = UIImage(named: "ic_onboarding_1")
        slide1.labelTitle.text = "A real-life bear"
        slide1.labelDesc.text = "Did you know that Winnie the chubby little cubby was based on a real, young bear in London"
        
        let slide2:Slide = Bundle.main.loadNibNamed("Slide", owner: self, options: nil)?.first as! Slide
        slide2.imageView.image = UIImage(named: "ic_onboarding_2")
        slide2.labelTitle.text = "A real-life bear"
        slide2.labelDesc.text = "Did you know that Winnie the chubby little cubby was based on a real, young bear in London"
        
        let slide3:Slide = Bundle.main.loadNibNamed("Slide", owner: self, options: nil)?.first as! Slide
        slide3.imageView.image = UIImage(named: "ic_onboarding_3")
        slide3.labelTitle.text = "A real-life bear"
        slide3.labelDesc.text = "Did you know that Winnie the chubby little cubby was based on a real, young bear in London"
        
        let slide4:Slide = Bundle.main.loadNibNamed("Slide", owner: self, options: nil)?.first as! Slide
        slide4.imageView.image = UIImage(named: "ic_onboarding_4")
        slide4.labelTitle.text = "A real-life bear"
        slide4.labelDesc.text = "Did you know that Winnie the chubby little cubby was based on a real, young bear in London"
        
        
        let slide5:Slide = Bundle.main.loadNibNamed("Slide", owner: self, options: nil)?.first as! Slide
        slide5.imageView.image = UIImage(named: "ic_onboarding_5")
        slide5.labelTitle.text = "A real-life bear"
        slide5.labelDesc.text = "Did you know that Winnie the chubby little cubby was based on a real, young bear in London"
        
        return [slide1, slide2, slide3, slide4, slide5]
    }
```

Chúng ta đang khởi tạo 1 list gồm 5 Slides cái mà sẽ được add như là subview tới scrollView

```
 func setupSlideScrollView(slides : [Slide]) {
        scrollView.frame = CGRect(x: 0, y: 0, width: view.frame.width, height: view.frame.height)
        scrollView.contentSize = CGSize(width: view.frame.width * CGFloat(slides.count), height: view.frame.height)
        scrollView.isPagingEnabled = true
        
        for i in 0 ..< slides.count {
            slides[i].frame = CGRect(x: view.frame.width * CGFloat(i), y: 0, width: view.frame.width, height: view.frame.height)
            scrollView.addSubview(slides[i])
        }
    }
```

Giờ chúng ta cần gọi hàm ở bên trong viewController của chúng ta

```
 var slides:[Slide] = [];
    
    override func viewDidLoad() {
        super.viewDidLoad()
        slides = createSlides()
        setupSlideScrollView(slides: slides)
        
        pageControl.numberOfPages = slides.count
        pageControl.currentPage = 0
        view.bringSubview(toFront: pageControl)
    }
```

Chúng ta đang cài đặt chính xác số silde tới pageControl


# Bước 10: Thêm animation tới scrollView
Đầu tiên, chúng ta cần cài đặt scrollView delegate trong view controller.

![](https://images.viblo.asia/fce2f398-d39b-4080-b77e-76ee9990c671.png)

Giờ thì ghi đè hàm scrollViewDidScroll trong ViewController

```
 /*
     * default function called when view is scolled. In order to enable callback
     * when scrollview is scrolled, the below code needs to be called:
     * slideScrollView.delegate = self or
     */
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let pageIndex = round(scrollView.contentOffset.x/view.frame.width)
        pageControl.currentPage = Int(pageIndex)
        
        let maximumHorizontalOffset: CGFloat = scrollView.contentSize.width - scrollView.frame.width
        let currentHorizontalOffset: CGFloat = scrollView.contentOffset.x
        
        // vertical
        let maximumVerticalOffset: CGFloat = scrollView.contentSize.height - scrollView.frame.height
        let currentVerticalOffset: CGFloat = scrollView.contentOffset.y
        
        let percentageHorizontalOffset: CGFloat = currentHorizontalOffset / maximumHorizontalOffset
        let percentageVerticalOffset: CGFloat = currentVerticalOffset / maximumVerticalOffset
        
        
        /*
         * below code changes the background color of view on paging the scrollview
         */
//        self.scrollView(scrollView, didScrollToPercentageOffset: percentageHorizontalOffset)
        
    
        /*
         * below code scales the imageview on paging the scrollview
         */
        let percentOffset: CGPoint = CGPoint(x: percentageHorizontalOffset, y: percentageVerticalOffset)
        
        if(percentOffset.x > 0 && percentOffset.x <= 0.25) {
            
            slides[0].imageView.transform = CGAffineTransform(scaleX: (0.25-percentOffset.x)/0.25, y: (0.25-percentOffset.x)/0.25)
            slides[1].imageView.transform = CGAffineTransform(scaleX: percentOffset.x/0.25, y: percentOffset.x/0.25)
            
        } else if(percentOffset.x > 0.25 && percentOffset.x <= 0.50) {
            slides[1].imageView.transform = CGAffineTransform(scaleX: (0.50-percentOffset.x)/0.25, y: (0.50-percentOffset.x)/0.25)
            slides[2].imageView.transform = CGAffineTransform(scaleX: percentOffset.x/0.50, y: percentOffset.x/0.50)
            
        } else if(percentOffset.x > 0.50 && percentOffset.x <= 0.75) {
            slides[2].imageView.transform = CGAffineTransform(scaleX: (0.75-percentOffset.x)/0.25, y: (0.75-percentOffset.x)/0.25)
            slides[3].imageView.transform = CGAffineTransform(scaleX: percentOffset.x/0.75, y: percentOffset.x/0.75)
            
        } else if(percentOffset.x > 0.75 && percentOffset.x <= 1) {
            slides[3].imageView.transform = CGAffineTransform(scaleX: (1-percentOffset.x)/0.25, y: (1-percentOffset.x)/0.25)
            slides[4].imageView.transform = CGAffineTransform(scaleX: percentOffset.x, y: percentOffset.x)
        }
    }
```

Và cuối cùng chúng ta cũng đã xong! Chạy app thôi

![](https://images.viblo.asia/8528d7f0-572a-4971-b211-d5f628869694.png)

### Bổ sung: Thêm hàm sau bên trong controller:

```
override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
     /*  
      * 
      */
    setupSlideScrollView(slides: slides)
}
```

Hệ thống sẽ gọi hàm trên mỗi khi môi trường giao diện IOS thay đổi.


***Bài dịch nguồn: https://medium.com/@anitaa1990/create-a-horizontal-paging-uiscrollview-with-uipagecontrol-swift-4-xcode-9-a3dddc845e92***