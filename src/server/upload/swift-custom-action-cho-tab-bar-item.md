# 1. Giới thiệu: 
* Ứng dụng điện thoại ngày càng có nhiều chức năng hơn trên cùng một ứng dụng, chính vì thế một ứng dụng cần có một hình thức phân chia các khu vực chức năng chính khác nhau để người dùng có thể dễ dàng sử dụng, sẽ có rất nhiều cách làm được điều đó và hiện tại tab bar đang được sử dụng phổ biến trên các ứng dụng điện thoại hiện nay. Hôm nay tôi sẽ hướng dẫn các bạn các bước cơ bản để tạo nên một tab bar.

# 2. Tạo một Custom Tab Bar Controller:
*    Đầu tiên chúng ta sẽ khởi tạo một class CustomTabBarController được kế thừa từ class UITabBarController và protocol UITabBarControllerDelegate.

```
            class CustomTabBarController:  UITabBarController, UITabBarControllerDelegate {
            }
```

# 3. Định danh các View Controllers được sử dụng trên tab bar:
* Ở bước này ta sẽ khởi tạo các viewController chính được sử dụng trên tab bar
 
 ```
            var homeViewController: HomeViewController!
            var secondViewController: SecondViewController!
            var actionViewController: actionViewController!
            var thirdViewController: ThirdViewController!
            var fourthViewController: FourthViewController!
            override func viewDidLoad(){        
              super.viewDidLoad()                   
              homeViewController = HomeViewController()
              secondViewController = SecondViewController()
              actionViewController = ActionViewController()
              thirdViewController = ThirdViewController()
              fourthViewController = FourthViewController()
            }
```

# 4. Thêm icon cho tab bar button:
* Ta sẽ thêm các icon cho các tab bar item button, điều này sẽ giúp người dùng nhận biết được các chức năng chính của từng tab. Hãy đảm bảo rằng các image được sử dụng đã được thêm vào project trong thư mục asset. Ta viết trong hàm viewDidLoad().


```
            homeViewController.tabBarItem.image = UIImage(named: "home")
            homeViewController.tabBarItem.selectedImage =
            UIImage(named: "home-selected")
            secondViewController.tabBarItem.image = UIImage(named: "second")
            secondViewController.tabBarItem.selectedImage = UIImage(named: "second-selected")
            actionViewController.tabBarItem.image = UIImage(named: "action")
            actionViewController.tabBarItem.selectedImage = UIImage(named: "action-selected")
            thirdViewController.tabBarItem.image = UIImage(named: "third")
            thirdViewController.tabBarItem.selectedImage = UIImage(named: "third-selected")
            fourthViewController.tabBarItem.image = UIImage(named: "fourth")
            fourthViewController.tabBarItem.selectedImage = UIImage(named: "fourth-selected")
```

# 5. Set Tab Bar’s View Controllers
* Ta sẽ cần đăng ký ứng với tab bar nào sẽ hiển thị viewController nào bằng các khởi tạo một mảng viewController, thứ tự các tab bar sẽ ứng với thứ tự các viewController có trong mảng.

```
            viewControllers = [homeViewController, secondViewController, actionViewController, thirdViewController, fourthViewController]

```
# 7. Remove Tab Bar Titles
* Nếu bạn không cần sử dụng các title trên tab bar, bạn có thể xoá chúng đi.

```
            for tabBarItem in tabBar.items! {
              tabBarItem.title = ""
              tabBarIt`em.imageInsets = UIEdgeInsetsMake(6, 0, -6, 0)
            }
```

#  8. Set Action for Center Tab
* Để set action cho các tab bar, bạn cần nhận biết khi nào người dùng nhấn vào các tab bar đó, bạn cần sử dụng delegate của UITabBarControllerDelegate để detect khi nào người dùng nhấn vào tab bar. Đăng ký delegate tại hàm viewDidLoad(). Sau đó sử dụng hàm delegate của UITabBarControllerDelegate để tạo action chuyển màn hình khi nhấn vào tab bar.

```
           override func viewDidLoad(){
           super.viewDidLoad()
           self.delegate = self

```

```
            //MARK: UITabbar Delegate
            func tabBarController(_ tabBarController: UITabBarController, shouldSelect viewController: UIViewController) -> Bool {
              if viewController.isKind(of: ActionViewController.self) {
                 let vc =  ActionViewController()
                 vc.modalPresentationStyle = .overFullScreen
                 self.present(vc, animated: true, completion: nil)
                 return false
              }
              return true
            }
```

* Đây là toàn bộ code ta đã viết để tạo ra một tab bar đơn giản, hy vọng bài viết đã có thể giúp bạn tự tạo một tab bar trong ứng dụng của mình.

```
//
//  CustomTabBarController.swift
//  For Medium Article @yalcinozd
//
//  Created by Yalcin Ozdemir on 19/08/2018.
//
import UIKit

class CustomTabBarController:  UITabBarController, UITabBarControllerDelegate {
    
    var homeViewController: HomeViewController!
    var secondViewController: SecondViewController!
    var actionViewController: ActionViewController!
    var thirdViewController: ThirdViewController!
    var fourthViewController: FourthViewController!

    override func viewDidLoad(){
        super.viewDidLoad()
        self.delegate = self   
        
        homeViewController = HomeViewController()
        secondViewController = SecondViewController()
        actionViewController = ActionViewController()
        thirdViewController = ThirdViewController()
        fourthViewController = FourthViewController()
     
        homeViewController.tabBarItem.image = UIImage(named: "home")
        homeViewController.tabBarItem.selectedImage =
        UIImage(named: "home-selected")
        secondViewController.tabBarItem.image = UIImage(named: "second")
        secondViewController.tabBarItem.selectedImage = UIImage(named: "second-selected")
        actionViewController.tabBarItem.image = UIImage(named: "action")
        actionViewController.tabBarItem.selectedImage = UIImage(named: "action-selected")
        thirdViewController.tabBarItem.image = UIImage(named: "third")
        thirdViewController.tabBarItem.selectedImage = UIImage(named: "third-selected")
        fourthViewController.tabBarItem.image = UIImage(named: "fourth")
        fourthViewController.tabBarItem.selectedImage = UIImage(named: "fourth-selected")
        viewControllers = [homeViewController, secondViewController, actionViewController, thirdViewController, fourthViewController]
        for tabBarItem in tabBar.items! {
          tabBarItem.title = ""
          tabBarItem.imageInsets = UIEdgeInsetsMake(6, 0, -6, 0)
        }
    }
    
    //MARK: UITabbar Delegate
    func tabBarController(_ tabBarController: UITabBarController, shouldSelect viewController: UIViewController) -> Bool {
      if viewController.isKind(of: ActionViewController.self) {
         let vc =  ActionViewController()
         vc.modalPresentationStyle = .overFullScreen
         self.present(vc, animated: true, completion: nil)
         return false
      }
      return true
    }
    
}
```

* References: https://medium.com/better-programming/how-to-create-a-custom-action-for-center-tab-bar-item-65e3e5cb0519