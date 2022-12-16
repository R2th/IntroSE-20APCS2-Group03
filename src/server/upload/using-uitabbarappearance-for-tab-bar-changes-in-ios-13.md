### Giới thiệu

Có thể nói với mỗi lập trình viên iOS thì UI tabbar đã quá đỗi quen thuộc mỗi khi xây dựng ứng dụng iOS với nhiều màn hình và các tính năng riêng biệt. UItabbar giúp xây dựng ứng dụng chia theo các nhóm màn hình với các tính năng khác nhau, người dùng dễ dàng thao tác với các tính năng mà không cần phải đóng hoàn toàn các tính năng mình đang thao tác dở khi mở tính năng khác. 

Với iOS 13, Apple đã thực hiện khá nhiều thay đổi để chúng ta có thể dễ dàng tuỳ chỉnh: hình nền, màu sắc, khoảng cách, font chữ... thông qua **UITabBarAppearance** ,  **UIBarAppearance** . Nào chúng ta cùng tìm hiểu nhé! 

![](https://images.viblo.asia/356c2a55-4773-4791-94d2-a1fb922d9008.jpg)

### The Old Way

Ở iOS 12, chúng ta có thể thực hiện thao tác set background color và color cho các trạng thái selected/unselected bằng những dòng code dưới đây:

```Swift
//Set the background color
    UITabBar.appearance().backgroundColor = .red
    tabBar.backgroundImage = UIImage()   //Clear background

    //Set the item tint colors
    tabBar.tintColor = .white
    tabBar.unselectedItemTintColor = .lightGray
    
   ```
    
  Việc sử dụng UIAppearance để set một thuộc tính global như background color hoạt động tốt nhưng trên iOS 13 thì dường như không được như vậy ví dụ như việc hiển thị Tabbar trên **UISplitViewController** bị vỡ hoặc nhiều trường hợp xuất hiện lỗi. Vì vậy từ iOS 13 trở lên sẽ đòi hỏi chúng ta thực hiện theo cách khác để tuỳ chỉnh UItabbar.
  
###  New and Improved!

Với iOS 13, bạn có thể cài đặt background color  với classs UITabBarAppearance và thuộc tính backgroundColor. Chú ý rằng phương thức này nó chỉ avaible từ iOS 13 trở lên. Dưới đây là đoạn code chúng tôi cài đặt  tabbar màu đỏ. 

```Swift
//This example assumes a custom UITabBarController overridden class.  You can 
    //also use it anywhere the `tabBar` of the current `tabBarController` is available.
    let appearance = UITabBarAppearance()
    appearance.backgroundColor = .red
    tabBar.standardAppearance = appearance
   ```

Việc đặt màu cho tabbar icons và text ở trạng thái **selected** và **unselected** thông qua class UITabBarItemAppearance. Bạn có thể dễ dàng sử dụng cho rất nhiều các trạng thái: default normal, selected, disabled, or focused propertie cho iconColor, titleTextAttributes và các thuộc tính khác. Dưới đây là đoạn code thực hiện việc update color cho trạng thái normal và selected của tab bar items
    
```Swift
    @available(iOS 13.0, *)
    private func setTabBarItemColors(_ itemAppearance: UITabBarItemAppearance) {
        itemAppearance.normal.iconColor = .lightGray
        itemAppearance.normal.titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.lightGray]
        
        itemAppearance.selected.iconColor = .white
        itemAppearance.selected.titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white]
    } 
```

Bạn có thể dễ dàng gọi function trên cho các kích thước màn hình khác nhau và thậm chí cả các trạng thái xoay view khác nhau như **portrait** và **landscape**
 
 ```Swift
 //Set all possible tab bar item styles as necessary (based on rotation and size capabilities).  Here
    //we're setting all three available appearances
    setTabBarItemColors(appearance.stackedLayoutAppearance)
    setTabBarItemColors(appearance.inlineLayoutAppearance)
    setTabBarItemColors(appearance.compactInlineLayoutAppearance)
   ```
    
Kết quả hiển thị dưới đây:
    
![](https://images.viblo.asia/ebebdacc-2415-4f86-9aa4-53a3e86980c1.png)

![](https://images.viblo.asia/ea4ad9a7-5253-45b7-a135-9a58c50fc6c7.png)


Nếu bạn muốn thao tác với title thì bạn sẽ tương tác với các thuộc tính như: **titleTextAttributes**  và **titlePositionAdjustment**


### Setting Tab Bar Item Badge Appearance

Nếu bạn đã làm các tính năng liên quan đến thông báo thì chắc hẳn đã quá quen với thuộc tính **Badge**. Chúng ta cùng quan sát ảnh dưới đây để thấy rõ việc hiển thị Badge trên tabbar:

![](https://images.viblo.asia/6b37f809-e2db-4b0a-9643-bf2e35f21687.png)

```Swift

@available(iOS 13.0, *)
    private func setTabBarItemBadgeAppearance(_ itemAppearance: UITabBarItemAppearance) {
        //Adjust the badge position as well as set its color
        itemAppearance.normal.badgeBackgroundColor = .blue
        itemAppearance.normal.badgeTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white]
        itemAppearance.normal.badgePositionAdjustment = UIOffset(horizontal: 10, vertical: -10)
    }
    
```

### Kết Luận

Hi vọng bài viết này đã giúp bạn có thể cập nhật thay đổi cho UITabbar được tốt hơn cũng như đảm bảo giao diện tabbar được hiển thị chính xác trên các thiết bị iOS với phiên bản hệ điều hành khác nhau.

Cám ơn bạn đã dành thời gian cho bài viết!
##### _Nguồn:_

[https://insights.dice.com/2020/04/10/using-uitabbarappearance-tab-bar-changes-ios-13/](https://insights.dice.com/2020/04/10/using-uitabbarappearance-tab-bar-changes-ios-13/)