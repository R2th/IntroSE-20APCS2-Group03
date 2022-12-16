# Những thay đổi của components trong ios 14 - UIPageControl
Như chúng ta đã biết thì IOS 14 mới được apple tung ra gần đây kéo theo sự thay đổi của nhiều component và có nhiều anh em đã gặp phải không ít phiền toái hay khó khăn vì sự thay đổi này. Chính vì thế mình dự định sẽ làm một loạt bài về sự thay đổi của các component trong ios 14 để anh em để ý và tránh mắc phải những thứ không đáng có. Bài đầu tiên mình xin đề cập tới sự thay đổi trên UIPageControl.
UIPageControl là lớp cung cấp cho chúng ta một control dùng để quản lí các trang trong giao diện ứng dụng. Một số hình ảnh của UIPageControl anh em thường thấy ví dụ như:
![](https://images.viblo.asia/0c80cbec-c6f3-46db-8998-189969d29f08.png)

![](https://images.viblo.asia/37810d2f-ecdf-4246-b7cf-74af6206aa65.png)

Vậy trên IOS 14 UIPageControl thay đổi những gì chúng ta cùng tìm hiểu qua một lượt.
những thay đổi được điểm mặt đặt tên gồm có:
+ Background style
+ Custom indicator image
+ Custom indicator image at a specific index
+ Infinite pages (new scrubbing behavior)

## Background style
Trên ios 14 chúng ta có một option mới dành cho UIPageControl đó chính là **BackgroundStyle**. Đây là 1 enum gồm 3 giá trị:
```swift
@available(iOS 14.0, *)
     public enum BackgroundStyle : Int {
    /// The default background style that adapts based on the current interaction state.
     case automatic = 0
     /// The background style that shows a full background regardless of the interaction
     case prominent = 1
      /// The background style that shows a minimal background regardless of the interaction
     case minimal = 2
     }
```

 Sử dụng khá đơn giản, mặc định là minimal:
 ![](https://images.viblo.asia/86c08df6-7476-49d8-a066-fd00cab39b48.png)

 
 Khi đổi sang **.prominent**
```swift
pageControl.backgroundStyle = .prominent
```
![](https://images.viblo.asia/a637b1b3-9752-4180-a42a-04b54cd77cb1.png)


trường hợp khi bạn chuyển qua **.automatic** thì background sẽ chuyển liên tục tuỳ theo current interaction state

## Custom indicator image
 Chắc anh em đã phải custom lại để đạt được như kết quả sau:
 
  ![](https://images.viblo.asia/31dfed7b-ae8c-4267-b8aa-df5bec073dcf.png)
 ![](https://images.viblo.asia/6b42e56a-9e2c-49ce-ad23-bf90155b1605.png)
![](https://images.viblo.asia/40e3ddcb-6273-4a93-aae3-87b114c6b8b2.png)

Giờ đây Apple đã cũng cấp tính năng này khi ra mắt ios 14 cho phép anh em custom lại icon hay imae của UIPageControl thông qua **preferredIndicatorImage**
```swift
/// The preferred image for indicators. Symbol images are recommended. Default is nil.
 @available(iOS 14.0, *)
 open var preferredIndicatorImage: UIImage?
```
để sử dụng chúng ta chỉ cấnet Image cho nó.
```swift
pageControl.preferredIndicatorImage = UIImage.init(systemName: "heart.fill")

```
Thế là chúng ta đã custom lại dc icon của nó
![](https://images.viblo.asia/6b42e56a-9e2c-49ce-ad23-bf90155b1605.png)
Quá dễ phải không anh em.

## Custom Indicator Image at Specific Index
![](https://images.viblo.asia/b5480b86-37aa-4b34-b835-c174fb018fdd.jpeg)
![](https://images.viblo.asia/a1b93ca2-930f-4c19-b909-e223b35668c9.png)

Chắc hẳn anh em đã thấy UIPageControll trên Yahoo Weather app. Khá hấp dẫn phải không. Giờ không chỉ custom dc indicatorImage  mà chúng ta còn có thể custom cho từng vị trí index một. Apple đã cung cấp thêm khả năng này cho anh em tuỳ biến. Để làm dc điều này chúng ta chỉ cần implement như sau:
```swift
/**
 * @abstract Returns the override indicator image for the specific page, nil if no override image was set.
 * @param page Must be in the range of 0..numberOfPages
 */
 @available(iOS 14.0, *)
 open func indicatorImage(forPage page: Int) -> UIImage?
 
 pageControl.setIndicatorImage(UIImage.init(systemName: "location.fill"),
 forPage: 0)
```

## Infinite Pages (New Scrubbing Behavior)
Khi phát hành IOS14 Apple đã giới thiệu một API mới và UX hoàn toàn mới. Apple đã cung cấp một tương tác tùy chỉnh cho UIPageControl mới  trong iOS14 được gọi là InteractionState. Đây là một enum có hai loại tương tác:
+ Discrete
+ Continuous

Trong iOS 14, giá trị mặc định của tương tác UIPageControl là **Continuous**:
```swift
@available(iOS 14.0, *)
 public enum InteractionState : Int {
 /// The default interaction state, where no interaction has occured.
 case none = 0
 /// The interaction state for which the page was changed via a single, discrete interaction.
 case discrete = 1
 /// The interaction state for which the page was changed via a continuous interaction.
 case continuous = 2
 }
```

Chúng ta cũng có thể đổi dạng thành **.discrete** bằng cách thay đổi biến sau thành false:
```Swift
/// Returns YES if the continuous interaction is enabled, NO otherwise. Default is YES.
 @available(iOS 14.0, *)
 open var allowsContinuousInteraction: Bool
```

chúng ta cũng có thể kiểm tra giá trị thông qua thuộc tính
```swift
/// The current interaction state for when the current page changes. Default is UIPageControlInteractionStateNone
 @available(iOS 14.0, *)
 open var interactionState: UIPageControl.InteractionState { get }

```
Dưới đây là hình ảnh của 2 trạng thái **Discrete** và **Continuous**
![](https://images.viblo.asia/7f6bcaa2-22a0-43a2-8de7-060870f603fc.gif)
![](https://images.viblo.asia/e3980e64-2d27-4f7a-ab88-68a54fbc9f9b.gif)


Trên đây là một số điểm mới của UIPageControl trên IOS 14. Hi vọng có thể giúp ích được cho anh em. Hẹn gặp lại anh em trong các bài chia sẻ tới về các những thay đổi trong IOS 14 của các component khác.

link tham khảo: https://medium.com/better-programming/take-a-look-at-ios-14s-new-uipagecontrol-3207a10212b9