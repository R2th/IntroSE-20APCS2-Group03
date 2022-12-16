# Robotium là gì?
Robotium là một Android Testing Framework để tự động hóa các trường hợp thử nghiệm cho các native và hybrid applications. Sử dụng Robotium, nhà phát triển có thể tạo trường hợp thử nghiệm GUI tự động mạnh mẽ cho các ứng dụng Android. Ngoài ra, nhà phát triển có thể viết một kịch bản thử nghiệm các chức năng, hệ thống, chấp nhận và trải rộng nhiều hoạt động của Android.
# Robotium testing framework
Android Testing Framework tiêu chuẩn có một số hạn chế như sau:
* Không thể xử lý nhiều hoạt động
* Hiệu suất thực thi thử nghiệm chậm
* Test cases phức tạp và khó thực hiện

**Robotium framework** là lựa chọn tốt hơn để tiến hành thử nghiệm trên ứng dụng Android. 

Robotium là open source framework và được coi là phần mở rộng của Android Testing Framework. 

Các tính năng nâng cao của Robotium như sau:

![](https://images.viblo.asia/da6259fd-1954-44b4-b354-72a2685eefbf.png)

**Robotium Test Case Classes**
Robotium sử dụng tập hợp các class (com.jayway.android.robotium.solo) để thử nghiệm. Class này hỗ trợ các trường hợp kiểm thử trải dài trên nhiều hoạt động. Solo được tích hợp với ActivityIusalmentationTestCase2.

![](https://images.viblo.asia/38ca8537-79e7-4019-9632-cfe278a67ac4.png)

**Tester có thể viết các trường hợp thử nghiệm mà không cần kiến thức về application design (kiểm thử hộp đen) bằng cách sử dụng Robotium test case classes. Đây là một tính năng nổi bật so với Android test case classes.**
# Cách sử dụng Robotium
Để sử dụng Robotium trong dự án thử nghiệm Android, bạn cần làm theo các bước bên dưới:

![](https://images.viblo.asia/0bce432b-215d-40e4-999a-1ff43b32b3aa.png)

Sử dụng Robotium để tiến hành thử nghiệm trên ứng dụng Android. Để đảm bảo chất lượng ứng dụng Android, bạn nên làm theo quy trình dưới đây:
* Thiết kế test specification
* Viết Test Program
* Thực thi [Test Case](https://www.guru99.com/test-case.html) trên thiết bị
* Thu thập kết quả kiểm thử

![](https://images.viblo.asia/ae226f4e-790a-4e1c-96fb-f3b9811a7573.png)

## Bước 1: Thiết kế test specification
* Đây là bước đầu tiên để kiểm thử ứng dụng của bạn. Trong bước này, bạn cần xác định mục tiêu để kiểm thử. Trong ứng dụng Android của bạn, có nhiều mục tiêu cần được kiểm tra như giao diện người dùng, hoạt động, thành phần, dịch vụ. Xác định rõ ràng mục tiêu kiểm thử trong ứng dụng của bạn sẽ giúp đạt được phạm vi kiểm tra rộng rãi.
* Lập kế hoạch cho các loại kiểm thử nên được tiến hành (Kiểm thử đơn vị, Kiểm thử chức năng, Kiểm thử hệ thống).
* Thiết kế các trường hợp thử nghiệm để có độ phủ tối đa nhưng giảm thiểu số lượng cases thử nghiệm. Càng nhiều mã code được kiểm tra, càng có nhiều cơ hội phát hiện lỗi sớm.

## Bước 2: Viết Test Program
Phần này hướng dẫn bạn cách viết một chương trình thử nghiệm Android bằng Android [Junit](https://www.guru99.com/junit-tutorial.html) Test và Robotium. Giả sử rằng bạn đã phát triển một tên chương trình Android HelloAndroid. Chương trình này có một số chức năng được mô tả dưới đây:
* Hiển thị dòng chữ "Hello world!" trên màn hình.
* Hiển thị thông báo HelloAndroid khi người dùng nhấn nút "Start"

![](https://images.viblo.asia/86d33a02-1b33-41cc-89d0-ed2ffd4fde94.png)

**Yêu cầu hệ thống:**
* Nền tảng Android đi kèm với framework JUnit 3.0 được tích hợp sẵn.
* Để tạo Dự án thử nghiệm Android từ Eclipse, máy tính của bạn phải cài đặt:
    * Phiên bản mới nhất Nền tảng Android

Bạn có thể [tải xuống](http://developer.android.com/sdk/index.html) Eclipse IDE với ADT (Công cụ dành cho nhà phát triển Android) được tích hợp sẵn. Nó bao gồm các thành phần Android SDK thiết yếu và một phiên bản của IDE Eclipse. 

Đối với Robotium testing framework, bạn cần gỡ bỏ thư viện Robotium từ [trang web Robotium](https://github.com/robotiumtech/robotium).

**Tạo Android Test Project**
* Click File -> New -> Other
* Chọn: Android -> Android Test Project as per below figure -> Chọn Next

![](https://images.viblo.asia/70149223-e7f0-42d9-ab86-fa6c059f1d8c.png)

Viết tên dự án thử nghiệm của bạn. Theo quy ước đặt tên, dự án thử nghiệm của bạn phải có tên "HelloAndroidTest"

![](https://images.viblo.asia/5e18718a-680a-47c1-be26-33bbe5604519.png)

Chọn ứng dụng mục tiêu đang thử nghiệm. Trong trường hợp này là HelloAndroid. Sau đó nhấn vào Finish.

![](https://images.viblo.asia/d1bee036-34e7-45d2-bd36-7c6e7bf42cb7.jpg)

**Tạo Test Suites**
Dựa trên test specification của mình, bạn bắt đầu tạo các test suites cho chương trình thử nghiệm của mình. Bạn có thể chọn nhiều Testing framework khác nhau. Trong hướng dẫn này, tôi chọn Android testing framework tiêu chuẩn **ActivityIusalmentationTestCase2**. Bạn phải thêm tệp thư viện Robotium vào thư mục *libs* trong thư mục dự án của mình trong trường hợp bạn muốn thử nghiệm với khung công tác Robotium. (Bạn tạo thư mục lib trong thư mục dự án của mình).

Một trường hợp thử nghiệm cần xác định vật cố định để chạy nhiều thử nghiệm. Để xác định một trường hợp kiểm thử, bạn phải tuân theo cấu trúc chương trình dưới đây:
* Triển khai một lớp con (subclass) của TestCase.
* Xác định các biến thể hiện lưu trữ trạng thái của vật cố định
* Khởi tạo trạng thái cố định bằng cách ghi đè [setUp()](https://developer.android.com/reference/junit/framework/TestCase.html#setUp%28%29)
* Clean-up sau khi kiểm thử bằng cách ghi đè lên [tearDown()](https://developer.android.com/reference/junit/framework/TestCase.html#tearDown%28%29).

![](https://images.viblo.asia/534376e3-f061-4706-be57-675cd9926683.png)

```
package com.example.helloandroid.test;

import com.example.helloandroid.HelloAndroid;
import com.jayway.android.robotium.solo.Solo;
import android.test.ActivityInstrumentationTestCase2;
import android.widget.TextView;

public class HelloAndroidTest extends ActivityInstrumentationTestCase2 <HelloAndroid> {
   
	private HelloAndroid mActivity;
	private TextView mView;
	private String resourceString;
	private Solo solo;
	
	public HelloAndroidTest () {
		// TODO Auto-generated constructor stub
		super("com.example.helloandroid",HelloAndroid.class);	
	}
	
	 @Override
	protected void setUp() throws Exception {
		// TODO Auto-generated method stub
	//	super.setUp();
		 
	 	mActivity = this.getActivity();
		solo = new Solo(getInstrumentation(),getActivity());
		mView = (TextView) mActivity.findViewById(com.example.helloandroid.R.id.textview2);
		resourceString = mActivity.getString(com.example.helloandroid.R.string.hello_world);
	}
	 
	 @Override
	protected void tearDown() throws Exception {
		// TODO Auto-generated method stub
		//super.tearDown();
		solo.finishOpenedActivities();
	}
	
	public void testPrecondition() {
		assertNotNull(mView);
	}
	
	/* test Target application contains a text display "Hello World!"*/
	public void testSearchText() {
		assertEquals(resourceString,(String) mView.getText());
	}
	
	/* test HelloAndroid Activity on target application is exist*/
	public void testCurrentActivity() throws Exception  {
    	solo.assertCurrentActivity("wrong activity", HelloAndroid.class);
    }
    
	/* test Application UI contains "Start" button */
	/* send event click button to target application */
    public void testSearchButton() throws Exception {
    	boolean found = solo.searchButton("Start");
    	solo.clickOnButton("Start");
    	assertTrue(found);
    }
}
```

**Thêm Test Cases**
* Trong cùng một package với TestSuite, chúng tôi tạo class TestCase
* Để kiểm tra một số hoạt động nhất định, tức là *HelloAndroid*, hãy tạo một test case extent *ActivityInticmentationTestCase2 <HelloAndroid>*
* Trong class này, người kiểm thử có thể có được hoạt động kiểm tra thông qua phương thức getActivity ().
* Bạn có thể thoải mái tạo thử nghiệm cho một hoạt động thử nghiệm bằng phương pháp tạo với tên "test + original Method Name"
* Trong phương pháp thử nghiệm, người thử nghiệm có thể sử dụng chức năng Android JUnit để so sánh giá trị thực tế và giá trị mong đợi. Các phương pháp này được hiển thị trong bên dưới.

![](https://images.viblo.asia/f4d99d25-02b3-4de3-af53-ac7f606fa157.png)

Các bộ thử nghiệm ở trên đã xác minh rằng GUI ứng dụng phải hiển thị văn bản *"Hello World!"* và chứa tên nút *"Start"*.
 
## Bước 3: Chạy thử nghiệm
Sau khi bạn viết xong chương trình thử nghiệm của mình, hãy chạy thử nghiệm theo các bước bên dưới:
* Kết nối thiết bị Android với PC của bạn (hoặc khởi động Trình mô phỏng trong trường hợp bạn không có thiết bị thực).
* Trong IDE của bạn, nhấn chuột phải vào Run as > Android Unit Test

![](https://images.viblo.asia/d20ebaff-c4e5-4145-a19e-541f97e485b7.png)

Bên cạnh việc chạy thử nghiệm trên IDE, bạn có thể chạy thử nghiệm bằng dòng lệnh. Trong chương trình thử nghiệm này, test package là *com.example.helloandroid.test*. Trong **Linux** terminal, bạn có thể sử dụng lệnh sau để chạy tất cả kiểm tra trong package này:

```
$ adb shell am instrument -w -e package com.example.helloandroid.test
```

## Bước 4: Nhận kết quả kiểm thử
Sau khi thực hiện kiểm thử, bạn sẽ nhận được kết quả thử nghiệm đó.

Trong chương trình thử nghiệm này, 4 phương pháp thử nghiệm đã được thực hiện và tất cả các trường hợp thử nghiệm đều được thông qua.
    
![](https://images.viblo.asia/21e97a90-8ba2-43ad-af34-794029d945de.png)

Trong trường hợp trường hợp thử nghiệm không thành công, output sẽ hiển thị và cho bạn biết trường hợp thử nghiệm nào không thành công.
    
![](https://images.viblo.asia/da4a828d-e50e-48e6-8c08-1c7402c3a64c.png)

**Source code examples**
Bài viết này bao gồm một số ví dụ về Mã nguồn giúp bạn hiểu rõ ràng hơn và nhanh chóng nắm bắt được kiến thức kỹ thuật:
* [HelloAndroid](https://drive.google.com/uc?export=download&id=0B_vqvT0ovzHca3Fpb3RjN2Jfb2c): Ứng dụng được thử nghiệm.
* [HelloAndroidTest](https://drive.google.com/uc?export=download&id=0B_vqvT0ovzHcYW5LTWdhQ2pseTg): Chương trình thử nghiệm sử dụng Android Test Framework
    
**Bài viết được dịch từ:**

https://www.guru99.com/first-android-testing.html#3