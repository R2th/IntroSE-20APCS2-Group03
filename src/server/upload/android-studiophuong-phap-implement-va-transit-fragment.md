**Dịch từ nguồn: https://qiita.com/Hideaki_Takagi/items/df2af84a4df02fd720d2**

# Lời nói đầu
Gần đây, tôi có dự định sẽ viết một bài báo về Fragment- thứ tôi đã va chạm khi bắt đầu học và nghiên cứu Android Studio. Phiên bản Android Studio tôi sử dụng là 4.2.2. OS là Windows10.

# Fragment là gì?
Ta gọi từng màn hình hiển thị lên app Android là **Activity**.

**Fragment** là thuật ngữ để chỉ một bộ phận của Activity, có thể làm cho một phần của màn hình được hoạt động độc lập.

Bằng cách thay đổi Fragment do Activity call, ta có thể biến hóa lên một phần đó của màn hình.

Ngoài ra, Fragment mang một vòng đời riêng của nó, khác với Activity.

# Implement Fragment
Tôi xin được tổng hợp lại các cách đơn giản để thực hiện implement Fragment.

Trước hết tôi đã chuẩn bị main activity chỉ bố trí mỗi text view để làm ví dụ. Như sau:

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1767634/b21c670b-ae4e-5b94-71b8-893957a3fb92.png)


#### (1) Click phải vào file list → chọn「New」→「Fragment」→「Gallery...」
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1767634/008851b4-8e05-3953-5611-eeb36c46e24f.png)


#### (2) Chọn loại Fragment bạn thích rồi ấn「Next」
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1767634/fb169a11-17b4-fcd9-7b9f-bec4e36ca347.png)


#### (3) Nhập các item sau rồi ấn 「Finish」

- Tên của file source code Java(Kotlin)
- Tên của file layout Fragment
- Ngôn ngữ của source code

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1767634/a2d37579-c8e3-4068-8d5d-b83183143b88.png)

Như vậy, bạn đã có thể add Fragment.

Ở ví dụ, tôi đã thử layout Fragment như sau:

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1767634/1f70aa77-b145-9729-68e2-549c6e6722d9.png)

Tạm thời, cứ như vậy, bạn hãy thử nhìn vào màn hình app thực tế.
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1767634/ac496337-5cfb-e7c8-c744-fd5942be2f84.png)
↑ Chỉ hiển thị Main activity, còn Fragment không hiện trên màn hình.

　Để nó hiện ra, ta cần phải thao tác thêm một chút nữa.


#### (4) Đặt layout để hiển thị Fragment vào trong Activity (Fragment container)

Layout đó là gì cũng được: `<LinearLayout>`, `<RelativeLayout>`, `<FrameLayout>`.

Ở ví dụ, tôi đang dùng `<FrameLayout>`
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1767634/e912c27d-b222-ea4b-e338-3e021e042d02.png)


#### (5) Mô tả để call Fragment, vào trong source code của main activity

```MainActivity.kt

package com.example.fragmenttest

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Call the class generated when adding Fragment //
        val mainfragment = main()
        
        // FragmentManager can be used to control the addition and deletion of Fragments. //
        val transaction = supportFragmentManager.beginTransaction()
        
        // Decide "where" and "which" Fragment to add with the add method //
        transaction.add(R.id.FragmentContainer, mainfragment)
        
        //Reflect the method added by the commit method //
        transaction.commit()
    }
}
```
Tạm thời chỉ cần mô tả như vậy thôi là chắc chắn sẽ hiển thị Fragment.

Khi đi check thực tế...
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1767634/d1b5a9a9-b603-a548-18f7-8a6907ed03e2.png)
↑ Fragment đã được hiển thị vào trong main activity.

# Transit Fragment
Đến đoạn này, chúng ta đã có thể implement được Fragment rồi.

Tiếp theo đây, tôi sẽ giới thiệu thật đơn giản dễ hiểu về cách transit/di chuyển giữa các Fragment.

Chuẩn bị 2 Fragment, nhấn vào nút đặt trong Fragment thứ nhất, thì sẽ thêm xử lý để di chuyển vào trong Fragment thứ hai.

Hơn nữa, khi nhấn nút đặt trong Fragment thứ hai, sẽ lại thêm xử lý để quay về Fragment thứ hất.

Hai fragment sau đây được chuẩn bị để làm ví dụ cho lần này.


・Activity thứ nhất：fragment_main
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1767634/6acf047a-0e5d-7823-5e52-198c5e577e21.png "main")

・Activity thứ hai：fragment_sub
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1767634/2c08b8b7-46f9-a648-0fb4-09082b3a9fc3.png "sub")

Sau khi làm xong layout cho từng Fragment, ta sẽ mô tả xử lý khi ấn vào nút.

Mô tả code để có thể di chuyển nó vào Fragment thứ hai, sau khi ấn GotosubButton ở trong Fragment thứ nhất.

Tôi xin trích code như sau:

```main.kt

class main : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_main, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Prepare FragmentManager //
        val transaction = parentFragmentManager.beginTransaction()

        // Button located in fragment_main //
        val gotosubButton = view.findViewById<Button>(R.id.GotosubButton)

        // Describe the event when the button is pressed //
        gotosubButton.setOnClickListener {
            // Call the destination Fragment class //
            val subfragment = sub()

            // By stacking the current Fragment, you can use the button to return from the transition destination //
            transaction.addToBackStack(null)

            // Remove the Fragment contained in the R.id.FragmentContainer and insert another Fragment //
            transaction.replace(R.id.FragmentContainer, subfragment)
            transaction.commit()
        }
    }
}

```
Nếu bạn mô tả xong ở bước này rồi thì khi ấn vào nút của Fragment thứ nhất, chắc chắn sẽ di chuyển tới Fragment thứ hai.

Và nếu bạn mô tả xử lý: ấn vào ReturnButton đặt trong Fragment thứ hai để quay lại Fragment trước đó => Tức là bạn đã hoàn thành!

Tôi xin trích lại đoạn code:

```sub.kt

class sub : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_sub, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Button located in Sub Fragment //
        val returnButton = view.findViewById<Button>(R.id.ReturnButton)

        // Describe the event when the button is pressed //
        returnButton.setOnClickListener {

            // Return Fragment to the previous state //
            parentFragmentManager.popBackStack()
        }
    }
}

```
Nếu bạn mô tả xong đến đây rồi thì có thể di chuyển giữa các Fragment với nhau rồi đó!

Nào ta cùng đi xem thực tế!

![ezgif.com-gif-maker.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1767634/2322f5f3-85e8-6241-913c-6638ec913ce9.gif)

↑ Đã implement xong sự di chuyển Fragment như trên.

Yay!!! Vậy là hết rồi. Chúc các bạn đọc vui vẻ.

#Nguồn tham khảo của tác giả bài viết

http://memento-mori-blog.com/android-kotlin-fragment/

https://calculus-app.com/blog/develop_android/android_fragment/201