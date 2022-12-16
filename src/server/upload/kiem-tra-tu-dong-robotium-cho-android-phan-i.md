Tự động hóa một cách hiệu quả để kiểm thử cho các ứng dụng Android bằng cách sử dụng Robotium
# 1. Bắt đầu với Robotium

Kiểm thử tự động giúp chúng ta duy trì chất lượng phần mềm cao và cung cấp một cơ sở để nắm bắt rõ ràng với bất kỳ thay đổi mã nào gây ảnh hưởng khi sử dụng thực tế. Đầu tiên giới thiệu tổng quan về Robotium, các tính năng khác nhau và lợi ích của nó trong kiểm thử tự động. Đến cuối phần này, sẽ thiết lập hoàn chỉnh Môi trường Android trong Android studio để kiểm thử Robotium.

## 1.1 Robotium framework

Robotium là một khung kiểm thử tự động mã nguồn mở, được sử dụng để kiểm thử hộp đen mạnh mẽ và đặc biệt là các ứng dụng Android . Nó hỗ trợ đầy đủ cho các trường hợp kiểm thử ứng dụng gốc và lai. Ứng dụng gốc được phát trực tiếp trên thiết bị, được thiết kế cho một nền tảng cụ thể và có thể được cài đặt từ Cửa hàng Google Play. Trong khi đó ứng dụng Hybrid (lai) chứa một phần web cơ bản và một phần là ứng dụng mobile, nó cũng có thể được cài đặt từ kho ứng dụng, nhưng yêu cầu HTML phải được hiển thị trong trình duyệt.

Robotium chủ yếu được sử dụng để kiểm thử tự động UI và kết nối ràng buộc  các thao tác cũng như thời gian chạy với các thành phần có trong giao diện.

Robotium được phát hành theo Giấy phép Apache 2.0. Nó được tải về hoàn toàn miễn phí và có thể dễ dàng sử dụng bởi các cá nhân và doanh nghiệp, được xây dựng trên Java và JUnit 3.  Robotium một phần mở rộng của Android Test Unit Framework, có sẵn tại: http://developer.android.com/tools/testing/testing_android.html.

Robotium cũng có thể làm việc mà không cần ứng dụng, nó dựa vào mã nguồn để kiểm thử.

Các trường hợp kiểm thử được viết bằng Robotium có thể được thực hiện trên giả lập Android (Thiết bị ảo Android (AVD)) - chúng ta sẽ xem cách tạo AVD ở phần sau) hoặc trên thiết bị Android thực. Nhà phát triển có thể viết các kịch bản kiểm thử chức năng, hệ thống và chấp nhận trên nhiều hoạt động. Robotium là Khung kiểm thử tự động hàng đầu thế giới và nhiều nhà phát triển mã nguồn mở đang đóng góp để giới thiệu nhiều tính năng thú vị hơn trong các phiên bản tiếp theo. Ảnh chụp màn hình sau đây là của trang web kho git cho dự án Robotium:
 
Vì Robotium là một dự án mã nguồn mở, bất cứ ai cũng có thể đóng góp cho mục đích phát triển và giúp đỡ trong việc tăng cường khuôn khổ với nhiều tính năng hơn. Mã nguồn Robotium được duy trì tại GitHub và có thể truy cập bằng cách sử dụng liên kết sau: https://github.com/jayway/robotium . Bạn chỉ cần truy cập dự án. Thực hiện tất cả các thay đổi của bạn trong một dự án nhân bản và nhấp vào Pull Request trên kho lưu trữ để thông báo cho các thành viên nhóm cốt lõi thấy thay đổi. Nếu chưa quen với môi trường git, bạn có thể tham khảo hướng dẫn GitHub tại liên kết sau: https: //help.github.com/
Robotium giống như Selenium nhưng dành cho Android. Dự án này được bắt đầu vào tháng 1 năm 2010 bởi Renas Reda. Ông là người sáng lập và là nhà phát triển chính cho Robotium. Dự án bắt đầu với phiên bản v1.0 và tiếp tục được theo dõi với các bản phát hành mới do có yêu cầu mới. Nó hỗ trợ cho các tính năng của Android như hoạt động, toash, menu, menu ngữ cảnh, lượt xem web và điều khiển từ xa.

![](https://images.viblo.asia/be9909aa-7402-4e37-a482-e756917f58a3.png)
 
Hãy xem các tính năng và lợi ích của Robotium dành cho nhà phát triển ứng dụng kiểm thử Android.

## 1.2 Tính năng và lợi ich

Kiểm thử tự động bằng cách sử dụng Robotium có nhiều tính năng và lợi ích vượt trội. Biểu đồ luồng công việc được tam giác hóa giữa người dùng, Robotium và thiết bị Android sẽ giải thích rõ ràng các trường hợp sử dụng giữa chúng:

![](https://images.viblo.asia/8e0f6a7a-ab8e-4152-a77b-2549b6e00072.png)
 
 
Các tính năng và lợi ích của Robotium:

* Robotium giúp chúng ta viết nhanh các trường hợp kiểm thử mạnh mẽ với kiến thức ở mức tối thiểu về ứng dụng đang được kiểm thử.
* Robotium cung cấp các API để tương tác trực tiếp với các điều khiển giao diện người dùng trong Ứng dụng Android như EditText, TextView và Button.
* Robotium chính thức hỗ trợ các phiên bản Android 1.6 trở lên.
* Nền tảng Android không được sửa đổi bởi Robotium.
* Các kiểm thử  Robotium cũng có thể được thực hiện bằng cách sử dụng dấu nhắc lệnh.
* Robotium có thể được tích hợp thông suốt với Maven hoặc Ant. Điều này có ích để thêm Robotium vào quá trình tự động hóa xây dựng dự án của bạn.
* Hiển thị trong Robotium (ví dụ ảnh chụp màn hình):
 
 ![](https://images.viblo.asia/207cd917-e89d-457d-a416-7ef01ae3866c.png)
 
* Dự án ứng dụng kiểm thử và dự án ứng dụng chạy trên cùng JVM, đó là:  Máy ảo Dalvik (DVM).
* Có thể chạy Robotium mà không cần mã nguồn.
* Robotium có thể làm việc với các công cụ đo lường phạm vi mã khác, chẳng hạn như Cobertura và Emma.
* Robotium có thể phát hiện các tin nhắn được hiển thị trên màn hình (Toasts).
* Robotium hỗ trợ các tính năng của Android như các hoạt động, menu và trình đơn ngữ cảnh.
* Robotium tự động kiểm tra có thể được thực hiện một cách nhanh chóng. Robotium được xây dựng trên JUnit, vì nó thừa kế tất cả các tính năng của JUnit. Khung Robotium tự động xử lý nhiều hoạt động trong một ứng dụng Android.
* Các trường hợp kiểm thử rô bốt khá nổi bật, so với tiêu chuẩn kiểm tra thiết bị đo đạc.
* Hoạt động thanh cuộn được tự động xử lý bởi khung Robotium.

## 1.3. Thiết lập môi trường Android
## 
Tham khảo hướng dẫn cài đặt android studio tại https://o7planning.org/vi/10405/huong-dan-cai-dat-va-cau-hinh-android-studio

# 2. Tạo một dự án kiểm thử Sử dụng Robotium

Phần này sẽ hướng dẫn bạn tạo dự án kiểm thử đầu tiên cho Android bằng cách sử dụng Khung Robotium. Trước tiên, hãy thực hiện thiết lập một ứng dụng máy tính android đơn giản. Sau đó, bằng cách sử dụng ứng dụng này, sẽ xem xét quá trình tạo ra một dự án kiểm thử Robotium
    
## 2.1 Tạo ứng dụng kiểm thử

   Trong phần này, chúng ta sẽ tạo một ứng dụng máy tính đơn giản cho phép nhập hai số. Người dùng có thể thực hiện hai thao tác sau trên các số này:
   
* Phép cộng
* Phép trừ
 
Các hoạt động này có thể lựa chọn thông qua điều khiển **Spinner**. **Spinner** tương tự như hộp lựa chọn hiển thị bằng các ngôn ngữ mã hóa như HTML hay C#. Nút **Get Result** là điều kiện cần để có được kết quả hoạt động trong TextView bên dưới.
 
Tạo ứng dụng kiểm thử bằng cách sử dụng Robotium

Ảnh chụp màn hình sau đây cho thấy ứng dụng ZCalculator

![](https://images.viblo.asia/149f27d3-476b-4263-9e9e-08218c4a0f2f.png)

Để tạo, thực hiện các bước sau:

Dự án Android hiện đã được thiết lập. Hãy có thể tham khảo mã nguồn dự án ZCalculator cơ sở, được đưa ra như suồn

1. Sử dụng mã sau trong tệp Main.java của bạn:
```
package com.example.linh.zcalculator;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {

    private Spinner mSpinner;
    private EditText mTxtFirstNumber, mTxtSecondNumber;
    private TextView mTextResult, mTxtComment;

    private enum OperationType {
        Addition, Subtraction
    }

    @Override
    public void onCreate(final Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setContentView(R.layout.activity_main);
        mTxtFirstNumber = findViewById(R.id.txtFirstNumber);
        mTxtSecondNumber = findViewById(R.id.txtSecondNumber);
        mTextResult = findViewById(R.id.txtResult);
        mTxtComment = findViewById(R.id.txtComment);
        mSpinner = findViewById(R.id.operationSpinner);
        // Adding listener to get mTextResult button
        findViewById(R.id.btnGetResult).setOnClickListener(new View.OnClickListener() {
            public void onClick(final View v) {
                OperationType operationType = OperationType.valueOf(mSpinner.getSelectedItem().toString());
                int num1 = Integer.parseInt(mTxtFirstNumber.getText().toString());
                int num2 = Integer.parseInt(mTxtSecondNumber.getText().toString());
                // Getting first & second values and passing to show mTextResult
                showResult(num1, num2, operationType);
            }
        });
    }

    // Showing operation results
    protected void showResult(int firstNumber, int secondNumber, OperationType type) {
        int resultVal = 0;
        if (type.equals(OperationType.Addition)) {
            resultVal = firstNumber + secondNumber;
        } else if (type.equals(OperationType.Subtraction)) {
            resultVal = firstNumber - secondNumber;
        }
        String operationResult = String.valueOf(resultVal);
        mTextResult.setText(operationResult);

        if (resultVal % 2 == 0) {
            mTxtComment.setText("Đây là số chẵn");
            Toast.makeText(this, "Đây là số chẵn", Toast.LENGTH_SHORT).show();
        } else {
            mTxtComment.setText("Đây là số lẻ");
            Toast.makeText(this, "Đây là số lẻ", Toast.LENGTH_SHORT).show();
        }
    }
}
```

2. Thay đổi mã nguồn trong tệp main.xml layout:

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/guide" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/space" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/first_number" />

    <EditText
        android:id="@+id/txtFirstNumber"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="numberDecimal" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/space" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/second_number" />

    <EditText
        android:id="@+id/txtSecondNumber"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="numberDecimal" />

    <Spinner
        android:id="@+id/operationSpinner"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:entries="@array/spinnerItems" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/space" />

    <Button
        android:id="@+id/btnGetResult"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/result" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/space" />

    <TextView
        android:id="@+id/txtResult"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:text="0"
        android:textSize="20sp" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/space" />

    <TextView
        android:id="@+id/txtComment"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:text=""
        android:textSize="20sp" />
</LinearLayout>
```

3. Cập nhật tệp String.xml với các mục sau:

```
<resources>
    <string name="app_name">ZCalculator</string>
    <string name="guide">Enter any two numbers and select operation and get the result</string>
    <string name="first_number">First Number</string>
    <string name="second_number">Second Number</string>
    <string name="result">Get Result</string>
    <string name="space">\n</string>

    <string-array name="spinnerItems">
        <item>Addition</item>
        <item>Subtraction</item>
    </string-array>
</resources>
```

4. Cập nhật tệp array.xml với các mục sau:

```
<string-array name="spinnerItems">
                <item>Addition</item>
                <item>Subtraction</item>
</string-array>
```

5. Ngoài ra, hãy cập nhật tệp AndroidManifest.xml bằng hoạt động nhập tác vụ và trình khởi chạy:

```
<uses-sdk android: minSdkVersion = "8" />
      <application android: icon = "@ drawable / ic_launcher" android: label = "@ string / app_name">
      <activity android: name = "com.zcalculator.Main" android: label = "@ string / app_name">
      <intent-filter>
      <action android: name = "android.intent.action.MAIN" />
      <category android: name ="android.intent.category.LAUNCHER" />
      </ intent-filter>
      </ activity>
</ application>
```

## 2.2 Tạo một dự án kiểm thử

   Hãy tiếp tục, tạo một dự án kiểm thử để kiểm tra ứng dụng ZCalculator.
   Trong Android studio đã hỗ trợ tạo sẵn lớp android Test.Chỉ cần chọn **ZCalculator/app/src/androidTest/java/com/example/zcalculator/ZCalculatorTest.java**. Đổi tên theo quy ước đặt tên như "Tên kiểm thử + AUT". Đó là lý do ứng dụng kiểm thử này được đặt tên là TestZCalculator, như được hiển thị trong ảnh chụp màn hình sau:
   
   ![](https://images.viblo.asia/31d6bb67-c3dd-4b58-ae3a-1063f5e3238b.png)
   
## 2.3 Tạo testcase

Để tạo testcasse, hãy làm theo các bước:

1. Để tạo testcase, nhấn chuột phải vào com.calculator.test trong  Package Explorer và điều hướng đến **ExampleInstrumentedTest.java**, như được hiển thị trong ảnh chụp màn hình sau. 

![](https://images.viblo.asia/3bf68c86-bf95-4e9f-ab43-93b2dfd7254c.png)

2. Trên cửa sổ JUnit Test Case, hầu hết các trường đã được điền. Chỉ cần chỉ định tên của Testcase là ZCalculatorTest, vì chúng ta sẽ kiểm tra Lớp chính trong ZCalculator. Giữ setUp (), tearDown () và hàm tạo hộp tùy chọn được chọn trong phần khai báo phương thức.


> Các phương thức setUp () và tearDown () là một phần của junit.class framework.TestCase. Phương thức setUp () được sử dụng để khởi tạo dữ liệu cần thiết để chạy kiểm thử và đặt lại biến. Các Phương thức tearDown () được sử dụng để gọi bộ sưu tập rác để buộc phục hồi bộ nhớ. Nó được gọi sau mỗi phương thức @Test, như được hiển thị trong đoạn mã sau:
> Call @Before setUp
> Call @Test method test1
> Call @After tearDown
> Call @Before setUp
> Call @Test method test2

## 2.4 Thêm thư viện Robotium

Tất cả các phiên bản của tệp JAR Robotium có thể được tải xuống từ https://code.google.com/p/robotium/downloads/list.

Hoặc thêm thư viện vào file build.gradle trong project: 

![](https://images.viblo.asia/ff32c3a1-50e0-4004-ba9c-ad71070be392.png)

## 2.5 Mã hóa Testcase của Robotium

Trước khi đi vào thực tế mã hóa, có một số lớp và phương thức của robotium bạn nên biết. Solo là lớp Robotium được sử dụng để kiểm thử. Nó được khởi tạo với thiết bị, kiểm tra các hoạt động kiểm thử đầu tiên. Điều này được thực hiện trong phương thức setUp (). Lớp Solo cung cấp API dễ dàng gọi đến các thành phần của giao diện người dùng Android, ví dụ, hàm enterText () đặt văn bản dưới dạng sửa Textview. Chúng ta sẽ thấy hầu hết các API này trong phần sau. Tên phương thức test case trong JUnit luôn bắt đầu bằng từ "test". Do Robotium được xây dựng trên JUnit, chúng ta có phương thức **CalculatorBlackBox ()** cho trường hợp kiểm thử. Bạn có thể thêm bất kỳ số lượng phương thức test nào trong một lớp test.

   Trong trường hợp kiểm tra sau, chúng ta sẽ truy cập các thành phần giao diện người dùng của ZCalculator với thứ tự như sau:
   
1.    Truy cập trường Editext cho các đầu vào (số đầu và số thứ hai).
2.     Nhập bất kỳ giá trị nào.
3.     Truy cập và nhấp vào **Spinner** để chọn hoạt động.
4.     Truy cập và nhấp vào nút **Get Result**.

Đặt đoạn mã thực hiện chức năng sau trong phương thức testzcalculatorblackbox() của lớp test vừa tạo:

```
package com.example.linh.zcalculator;

import android.content.Context;
import android.support.test.InstrumentationRegistry;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;
import android.widget.TextView;

import com.robotium.solo.Solo;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.Random;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;

@RunWith(AndroidJUnit4.class)
public class ZCalculatorTest {

    @Rule
    public ActivityTestRule<MainActivity> activityTestRule = new ActivityTestRule<>(MainActivity.class);

    private Context context;
    private Solo solo;

    @Before
    public void setUp() throws Exception {
        //setUp() is run before a test case is started.'8/
        //This is where the solo object is created.
        solo = new Solo(InstrumentationRegistry.getInstrumentation(), activityTestRule.getActivity());
        context = InstrumentationRegistry.getInstrumentation().getTargetContext().getApplicationContext();
    }

    @After
    public void tearDown() throws Exception {
        //tearDown() is run after a test case has finished.
        //finishOpenedActivities() will finish all the activities that have been opened during the test execution.
        solo.finishOpenedActivities();
    }

    @Test
    public void testAdd() throws Exception {
        for (int i = 0; i < 10; i++) {
            solo.clearEditText(0);
            solo.clearEditText(1);
            int first = new Random().nextInt(200);
            int second = new Random().nextInt(200);
            solo.enterText(0, String.valueOf(first));
            solo.enterText(1, String.valueOf(second));
            solo.clickOnView(solo.getView(R.id.btnGetResult));
            TextView textResult = (TextView) solo.getView(R.id.txtResult);
            int actualResult = Integer.parseInt(textResult.getText().toString());

            int expectedResult = first + second;

            assertEquals(expectedResult, actualResult);

            TextView textComment = (TextView) solo.getView(R.id.txtComment);

            TextView toast = (TextView) solo.getView(android.R.id.message);
            if (expectedResult % 2 == 0) {
                assertEquals("toast is not showing", "Đây là số chẵn", toast.getText().toString());
                assertEquals("Đây là số chẵn", textComment.getText().toString());
            } else {
                assertEquals("toast is not showing", "Đây là số lẻ", toast.getText().toString());
                assertEquals("Đây là số lẻ", textComment.getText().toString());
            }
        }
    }

    @Test
    public void testZCalculatorBlackBox() {
        // Enter 5 in first number field
        this.solo.enterText(0, "5");
        // Enter 4 in second number field
        this.solo.enterText(1, "4");
        // Press Addition Spinner Item
        this.solo.pressSpinnerItem(0, 0);
        // Click on get result button
        this.solo.clickOnButton(0);
        // Verify that resultant of 5 + 4
        assertTrue(this.solo.searchText("9"));
        // Press Subtraction Spinner Item
        this.solo.pressSpinnerItem(0, 1);
        // Click on get result button
        this.solo.clickOnButton(0);
        // Verify that resultant of 5 – 4
        assertTrue(this.solo.searchText("1"));

    }
}
```

## 2.6 Chạy kiểm thử

  Bây giờ chúng ta đã hoàn thành việc tạo một dự án kiểm thử với một kiểm tra hợp lệ cho ZCalculator.
  
   Đã đến lúc chạy kiểm thử  nhấn chuột vào biểu tượng “ **run**” trong  **zcarculatortest.java** và chọn **run as android junit test**. chọn **android emulator** từ màn hình thiết bị .
   
 Trường hợp kiểm thử của Robotium cho ZCalculator sẽ hoạt động như sau:
 
   1. Ứng dụng ZCalculator sẽ được tải.
    2. Số đầu tiên và số thứ hai sẽ được tự động nhập vào lần đầu tiên và các trường Edit text thứ hai, sau đó nhấn vào spinner lựa chọn hoạt động (nó sẽ có bổ sung đầu tiên).
    3. Nút Get Result sẽ được nhấp vào và kết quả sẽ được hiển thị trong chế độ xem kết quả.
    4. Câu lệnh khẳng định sẽ kiểm tra kết quả hoạt động hợp lệ. Quá trình này sẽ tiếp tục cho Phép trừ và nếu mọi khẳng định là đúng, trường hợp kiểm thử là được thông qua, được biểu thị bằng một thanh màu xanh lục trong tab JUnit, như ảnh chụp màn hình sau:
    
    ![](https://images.viblo.asia/2fb1e17b-349f-4bfa-82ed-69a083eab75b.png)
    
Ứng dụng và thiết bị phải được cài đặt trước, nếu bạn muốn chạy dự án kiểm thử thông qua Dòng lệnh. Nếu chúng đã được cài đặt, hãy sử dụng lệnh sau:

`adb shell am nstrument-w com.calculator.test/android.test.InstrumentationTestRunner`
   
   Trước khi chạy lệnh, lưu ý rằng bạn chạy nó từ vị trí nơi adb.exe hiện diện hoặc thêm đường dẫn adb.exe vào danh sách biến của đường dẫn môi trường để truy cập nó từ bất cứ đâu trong hệ thống. Bạn có thể tìm thấy adb trong thư mục nền tảng công cụ bên trong Android SDK.
   
#    Tài liệu tham khảo
https://doc.lagout.org/programmation/Android/Robotium%20Automated%20Testing%20for%20Android%20%5BZadgaonkar%202013-11-22%5D.pdf?fbclid=IwAR0JSTaqgDW4ShQEDgY9KKCSEulJ3cLYr4OkF50dPZ6M8OALYnVsJckYz_k