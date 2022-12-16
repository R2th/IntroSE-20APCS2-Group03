# Giới thiệu

Android phát triển đi kèm với sự thay đổi của các tính năng, cách design navigation cũng không phải ngoại lệ. Design navigation là việc tư duy thiết kế việc điều hướng giữa các màn hình trong một ứng dụng sao cho phù hợp nhất.

Khi mới bắt đầu thì chúng ta sẽ có các màn hình là các activity và activity, design navigation lúc này khá đơn giản là cứ từng màn hình và thực hiện giao tiếp với nhau qua intent.

Sau đó xuất hiện fragment với mục đích dùng lại UI cho device màn lớn như tablet. Lúc này design navigation  phức tạp hơn với các cặp activity-activity, activity-fragment, fragment-fragment.

Sự lớn mạnh của fragment khiến cho nhiều view được sinh ra thêm hỗ trợ cho nó và giúp cho user như [Bottom Navigation Bar](https://material.io/components/bottom-navigation/android#using-bottom-navigation), [Navigation Drawer](https://material.io/components/navigation-drawer#usage), .. 

Đặc biệt bottom navigation bar là component rất hữu ích và khi design navigation phải đi kèm với fragment chứ không mấy ai làm nó với các activity vì khi thực hiện transition nhìn rất kì cục và lặp code rất nhiều.

Google giới thiệu [Navigation component](https://developer.android.com/guide/navigation) cũng mang hướng ủng hộ cho sử dụng hầu hết là fragment và phong cách "single activity multi fragmens". Dù cho vẫn còn lỗi vặt và thiếu một số case phổ biến nhưng cũng thể hiện việc Google hỗ trợ cho các developer trong việc phát triển và tập trung vào triển khai bussiness logic.

Các ứng dụng hiện nay khi thiết kế thường có các loại điều hướng chính như sau:

- Chỉ có các màn hình full, ko có bottom bar
- Có bottom bar ở duy nhất 1 màn
- Có bottom bar xuất hiện ở nhiều màn, bottom bar giữ trạng thái của từng tab

Với từng loại bên trên thì khi design navigation chúng ta nên làm sao cho hợp lý thì hãy cũng bàn luận nhé

# Loại 1: Chỉ có các màn hình full, ko có bottom bar

Loại này giống các app ngày xưa rồi, các bạn có thể chọn hướng làm toàn các activity

Nhưng liệu như vậy thì có nên ko, như mình nói ở trên đó, fragment sinh ra vì có nhu cầu và nó đã lớn mạnh và mang ý nghĩa nên các bạn hãy thử làm theo hướng là một activity host và các màn full là các fragment thử xem. Và hỗ trợ đắc lực cho lựa chọn này là [Navigation component](https://developer.android.com/guide/navigation)

# Loại 2: Có bottom bar ở duy nhất 1 màn

Loại này hiện đại hơn, phổ biến với các app bây giờ, bạn vẫn có thể design navigation theo hướng toàn activity, nhưng mà thôi đừng làm như vậy chứ.

Ít nhất thì cũng nên cân nhắc dùng các fragment với [Navigation component](https://developer.android.com/guide/navigation). Do bottom bar chỉ có ở duy nhất một màn nên bạn có thể chọn sử dụng [Bottom Navigation Bar](https://material.io/components/bottom-navigation/android#using-bottom-navigation) hoặc tự mình làm bottom bar rồi custom theo yêu cầu.

# Loại 3: Có bottom bar xuất hiện ở nhiều màn, bottom bar giữ trạng thái của từng tab

Đây là loại thiết kế đa dụng và khó quản lý nhất, cũng đã xuất hiện một thời gian, từ trước cả khi Google giới thiệu stable [Navigation component](https://developer.android.com/guide/navigation)

Với thiết kế này thì không thể dùng các activity vì khi transition nó sẽ ko hợp lý và việc quản lý thì khó, code lại bị lặp, vì thế mà ko phù hợp chút nào cả nên là loại phương án design navigation bằng các activity nhé.

Tiếp đến là "single activity multi fragmens", bottom bar đặt ở activity hoặc fragment, các tab con sẽ được khởi tạo trên container của phần view trên bottom bar và quản lý bở `fragment manager`.của từng tab. Về hướng thì là vậy nhưng triển khai code như thế nào cho tiện:

## Khi chưa có navigation component

Khi chưa có navigation component thì chỉ có cách là tự xây dựng hết từ tư tưởng bên trên, bản thân mình cũng từng xây dựng những app như vậy và có sample các bạn có thể tham khảo qua

```kotlin
    private fun onClickBottomNavigationItem(position: Int): Boolean {
        val currentTag = getTabFragmentTag(viewModel.currentTab.value ?: Tab.POPULAR.position)
        val newTag = getTabFragmentTag(position)

        val fragmentManager = childFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()

        val currentFragment = fragmentManager.findFragmentByTag(currentTag)
        if (currentFragment != null) {
            fragmentTransaction.hide(currentFragment)
        }

        var newFragment: Fragment? = fragmentManager.findFragmentByTag(newTag)
        if (newFragment == null) {
            newFragment = newFragmentInstance(position)
            if (newFragment.isAdded) {
                fragmentTransaction.show(newFragment)
            } else {
                fragmentTransaction.add(R.id.frame_layout, newFragment, newTag)
            }
        } else {
            fragmentTransaction.show(newFragment)
        }

        viewModel.currentTab.value = position
        fragmentTransaction.commit()

        return true
    }
```
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/screen/oldmain/OldMainFragment.kt#L44

Ngoài ra thì các bạn còn cần thực hiên việc quản lý navigation back, nếu tab bạn đang chọn và mở thêm các màn khác ở tab đó thì hẳn khi nhấn back bạn sẽ muốn nó quay trở lại các màn trước đó của cùng tab chứ ko ai lại muốn thoát luôn cả.

Việc phải tự control khiến cho dễ phát sinh nhiều vấn đề.

## Khi có navigation component

Tuy là một thiết kế cũng khá phổ biến nhưng navigation component lại chưa support thiết kế này tốt cho lắm khiến cho việc design navigation cho loại này còn nhiều vấn đề.

Hiện tại navigation component mới chỉ có solution tạm cho loại này và được giới thiệu trong sample ở đây https://github.com/android/architecture-components-samples/blob/main/NavigationAdvancedSample/app/src/main/java/com/example/android/navigationadvancedsample/NavigationExtensions.kt

Solution này hiện yêu cầu chúng ta cần sử dụng host và bottom bar ở activity, các tab sẽ là các graph con. Việc khai báo cùng 1 thành phần trong các graph con khác nhau cần lưu ý về tính động bộ vì có thể gây ra conflict trong quá trình gọi trong code khiến cho không biết gọi cái nào cho đúng

Bên cạnh các điểm yếu còn tồn tại thì đó là sự hỗ trợ từ sức mạnh của navigation component vẫn là thứ đáng để chúng ta cân nhắc lựa chọn khi design navigation cho loại này.

Đặc biệt design navigation theo cách này có thể apply cho loại 2 bằng cách ẩn bottom bar ở những màn bạn muốn,

# Kết luận

Trên đây là một số cách design navigation mà mình thấy hay được sử dụng, các bạn hãy cùng bàn luận xem sao nhé.