## 1. Giới thiệu.
Xin chào tất cả mọi người. Trong bài viết này mình xem chia sẻ về Continuous Integration (CI) hay còn gọi là tích hợp liên tục và Unit Test trong dự án Android. <br>
#### 1.1 Continuous Integration (CI) 
**Continuous Integration (CI)** một thuật ngữ đã không còn mới với các lập trình viên. Nên trong bài viết này mình xin tóm tắt lại chứ không nêu chi tiết ra nữa. Để có thể tập chung vào việc tích hợp CI trong projects Android. CI là thực hành của việc liên tục tích hợp những thay đổi tạo ra với project và test lại nó hàng ngày hoặc thường xuyên hơn nữa trong quá trình phát triển dự án. <br>
Việc tự động hóa này build, test và deploy của bạn có thể giảm thiểu rất nhiều vấn đề đau đầu phát sinh trong dự án. <br>
Đem lại những lợi ích rõ rệt như:
   - Tìm kiếm lỗi nhanh chóng, giảm thiểu rủi ro.
   - Chất lượng code cao hơn.
   - Phần mềm chức năng có giá trị mọi thời điểm.
   - Giúp thành viên kiểm thử đỡ đau đầu hơn.
   - Dễ dàng theo dõi ứng dụng. <br>
   
Cách thức hoạt động của những tool CI nói chung là sẽ dùng web hook vào project tại GIthub hoặc version control nào đó. Khi bạn push lên một commit mới, CI sẽ được thông báo tiến hành chạy các job đã config từ trước. <br>

Hiện tại có rất nhiều công cụ giúp các lập trình viên có thể tích hợp CI vào dự án của mình: Circle CI, Gitlab, Jenkins , Travis CI,... Trong bài viết này mình xin chia sẻ về [Circle CI](https://circleci.com/vcs-authorize/).
#### 1.2 Unit Test trong Android
**Unit Test** là một kỹ thuật quan trọng góp phần nâng cao chất lượng phần mềm. <br>
Kỹ thuật này kiểm nghiệm các hoạt động của mọi chi tiết mã (code) với một quy trình tách biệt với quy trình phát triển PM, giúp phát hiện sai sót kịp thời. UT còn có thể giúp phát hiện các vấn đề tiềm ẩn và các lỗi thời gian thực ngay cả trước khi các QA tìm ra, thậm chí có thể sửa lỗi ngay từ ý tưởng thiết kế. <br>
Unit Test có các đặc điểm sau:
 -  Đóng vai trò như những người sử dụng đầu tiên của hệ thống.
 - Chỉ có giá trị khi chúng có thể phát hiện các vấn đề tiềm ẩn hoặc lỗi kỹ thuật. <br>
 
UT thường có 3 trạng thái chính như : Pass, Fails và Ignore. <br>
## 2. Circle CI & Testing
#### 2.1 Circle CI <br>

![](https://images.viblo.asia/681af4af-7926-4e0a-a61e-5c908e0bc8ea.png)

 **Circle CI** là công cụ  được tin dùng bởi hơn 100.000 công ty và developer trên thế giới, trong đó có Facebook, Segment, Kickstarter vv. <br>
 
Với các ưu điểm:
- Faster Performance: Có thể tùy chọn resource để tối ưu performance cho quá trình building, testing và deploying code
- Granular Control: Có thể build theo các cách tùy thích bằng cách sử dụng custom job với WorkWorkflows
- Complete Flexibility: Tất cả ngôn ngữ chạy trên Linux thì đều chạy được với CricleCI. Hỗ trợ First-class Docker giúp ta có thể tùy chỉnh môi trường tùy thích<br>

CricleCI tương thích với nhiều sản phẩm và dịch vụ được sử dụng nhiều trong quá trình phát triển phần mềm:
 - Source Code: GitHub, Atlassian Bitbucket, GitHub Enterprise.
 - Tương thích với rất nhiều test tool.
 - Deployment: Heroku, Docker, AWS, Azure, Google Cloud, ...
 - Collaborations: Jira, HipChat, Slack, ... <br>
 
Và một điều mình khá thích nữa là bản Free của Circle CI rất thích hợp với dự án vừa và nhỏ ^^. <br>
#### 2.2 Testing (Robolectric) <br>
Nếu là
Circle CI hộ trợ rất nhiều framework test phục vụ việc testing trong android. 
Với việc support nhiều tool test: Robolectric, Mockito, [Espresso](https://medium.com/android-testing-daily/running-espresso-tests-on-circle-ci-ec919f85a116) hay những tool test UI như  Firebase Test Lab các ban có thể tham khảo [tại đây](https://proandroiddev.com/test-and-publish-your-apps-with-circleci-fastlane-firebase-test-lab-e716c075b99b). <br>

Tuy nhiên bài viết này mình xin phép chia sẻ một ví dụ đơn giản về việc tích hợp Robolectric với Circle CI trong project android. <br>

![](https://images.viblo.asia/3ff6a3eb-ebc2-4c78-8a44-ecc1ebe2fac5.png).

 **Robolectric** là một Framework cho phép thực thi unit test trên Java Virtual Machine (JVM) mà không cần device hoặc emulator.
  -  Robolectric cung cấp cách thực thi các unit test trên android bằng cách nén các ngoại lệ(Throws Exceptions) của method.
  -  Hộ trợ sự dụng các view child bằng findViewById()
  -  Robolectric dự trên cơ sở framework JUnit 4, nó không phải là 1 framework nguyên vẹn, nghĩa là bạn không thể test sự tương tác giữa các thành phần của android với nó.

Nào giờ chúng ta bắt đầu thực hiện dự án thôi ^^.
## 3. Thực hiện
#### 3.1 Bắt đầu với github.<br>
Việc đầu tiên có lẽ sẽ là login vào github và tạo cho mình một repo public nhé các bạn. Phần này mình xem phép không giới thiệu thêm mà chỉ show ra kết quả như hình bên dưới: <br>

![](https://images.viblo.asia/d7e34b6a-d62b-4bbb-bc94-9ffd7296d2a1.png)
#### 3.2 Sử dụng Circle CI
**B1**: Đăng ký tài khoản [tại đây](https://circleci.com/signup/) <br>
Hoặc bạn có thể đăng nhập bằng account Github or Bitbucket: <br>

![](https://images.viblo.asia/60126dc9-2f1e-42c6-bfec-fb1fed24abb2.png) <br>

**B2**: Tại màn Home => Click **Add Projects** sau đó bạn chọn project mà bạn muốn setup với circle ci click **Set Up Project** <br>

![](https://images.viblo.asia/1cb674e9-2d87-4ca9-b3a6-5f8574a0b335.png) <br>

**B3**: Trong màn hình mới bạn lựa chọn ngôn ngữ phù hợp. Hiện tại mình đang chọn là: <br>

![](https://images.viblo.asia/99d7d287-d3b0-4200-b8be-79c016cd8fd2.png) 

Sau đó kéo xuống là click: <br>

![](https://images.viblo.asia/7cdb53b0-77dc-4820-b695-3080859b195e.png) 

Do hiện tại mình vẫn chưa config trong project andoird của mình nên với bản build đầu tiên thì sẽ là **FAILED**. Các bạn cũng đừng nản nhé :D <br>

**B4**: Ngay sau đây mình sẽ vào phần code Android. Tạo folder **.circleci** sau đó là file **config.yml**  <br>

![](https://images.viblo.asia/8bc4750e-1a31-45b8-9523-39c54534d1ba.png) 

Tại file **config.yml** này chính là nơi để mình có thể config toàn bộ các jobs sẽ chạy trên circle ci.
Các tại liệu về file config.yml này các bạn có thể tham khảo [tại đây](https://circleci.com/docs/2.0/language-android/) <br>

Đây là setup đầu tiền của mình với file config.yml: <br>

```
version: 2
jobs:
  build:
    working_directory: ~/code
    docker:
      - image: circleci/android:api-28-alpha
    environment:
      JVM_OPTS: -Xmx3200m
    steps:
      - checkout
      - restore_cache:
          key: jars-{{ checksum "build.gradle" }}-{{ checksum  "app/build.gradle" }}
#      - run:
#         name: Chmod permissions #if permission for Gradlew Dependencies fail, use this. 
#         command: sudo chmod +x ./gradlew
      - run:
          name: Download Dependencies
          command: ./gradlew androidDependencies
      - save_cache:
          paths:
            - ~/.gradle
          key: jars-{{ checksum "build.gradle" }}-{{ checksum  "app/build.gradle" }}
      - run:
          name: Run App
          command: ./gradlew lint
      - store_artifacts:
          path: app/build/reports
          destination: reports
      - store_test_results:
          path: app/build/test-results
```

Mình xin phép tóm tắt các câu lệnh trong bản config trên như sau: <br>
Bắt đầu với việc khai báo phiên bản của Circle CI. Hiện tại thì sẽ luôn luôn đặt là `2`.  <br>
```
version: 2
```
Tiếp theo, Mình có một `jobs` key. Mỗi job thể hiện một giai đoạn trong quy trình Build-Test-Deploy của bạn. Sample này của mình chỉ cần một build job, vì vậy mọi thứ được hoạt động trên một *job* duy nhất. Trong trượng hợp các bạn có nhiều job ví dụ gồm cả build/test thì các bạn sẽ cần khai báo một `workflows` dùng để chạy được cả 2 job này hoặc tuần tự từng job một. <br>
Đây chính là ưu điểm **Granular Control** của Circle CI: Có thể build theo các cách tùy thích bằng cách sử dụng custom job với Workflows.
```
jobs:
  build:
    docker:
      - image: circleci/<language>:<version TAG>
    steps:
      - checkout
      - run: <command>
  test:
    docker:
      - image: circleci/<language>:<version TAG>
    steps:
      - checkout
      - run: <command>
workflows:
  version: 2
  build_and_test:
    jobs:
      - build
      - test
```

Trong mỗi job sẽ có option `working_directory`. Đây là thư mục mà code của bạn sẽ được kiểm tra và đường dẫn này sẽ được sử dụng làm thư mục làm việc mặc định cho phần còn lại của `job` trừ khi có quy định khác.
```
jobs:
  build:
    working_directory: ~/code
```
Ngay bên dưới `working_directory` là sử dụng image docker Circleci/android: api-28-alpha.  <br>
Cùng tim hiểu rộng ra một chút: <br>
Bản chất Circle CI là sử dụng `docker`, trong cấu hình Circle CI ta sẽ chỉ định các `docker image` sẽ sử dụng và các `job`, trong các job lại có các `step`, trong các step là cụ thể các command. Ngoài ra còn có cấu hình filter trong website giúp ta linh hoạt điều chỉnh sao cho chỉ run các job khi có merge/push vào 1 số branch nhất định. <br>
 - Docker đây là một công cụ tạo môi trường được packaging (Container) trên máy tính độc lập mà không làm tác động tới môi máy, môi trường trong Docker sẽ chạy độc lập.<br>
 -  Docker images : Mỗi khi bạn muốn chạy ứng dụng Docker là thì bạn cần một cái image, cái image này có thể là OS Centos hoặc Linux, đã cài sẵn các ứng dụng PHP, Nginx. <br>
 
Tương ứng với Android Project thì docker sẽ chứa tất cả các tùy chọn SDK Android để chạy các builds - tests - deploys. <br>
Với CircleCI cung cấp một bộ Image Docker để build các ứng dụng Android. Những Image này dựng sẵn trong [CircleCI.org trên Docker Hub](https://hub.docker.com/r/circleci/android/) . Source và Dockerfiles cho những image này trong [GitHub Repository](https://github.com/circleci/circleci-images/tree/master/android) . <br> 

Về phần API: Sẽ có một Image Docker khác nhau cho mỗi cấp độ API Android . <br>
Ví dụ: Trong project android đang sử dụng compileSdkVersion 28 (Pie 9.0) sẽ tương ứng config job với <br>
`circleci/android:api-28-alpha`. <br>

Thẻ Alpha:  Image Docker Android được gắn thẻ với hậu tố -alpha. Điều này là để chỉ ra các Image hiện đang được phát triển và có thể thay đổi theo cách không tương thích ngược. <br>

```
 docker:
      - image: circleci/android:api-28-alpha
```

Tiếp theo đó là xác định một loạt các bước bao gồm tạo gradlew runnable, download dependencies của project, running linters, building và unit testing: <br>

Bây giờ mình sẽ thêm một số `steps` trong việc build job. <br>
Bắt đầu với `checkout` để có thể hoạt động trên codebase. <br>
Tiếp theo sẽ xuống `restore_cache`.  <br>
```
- restore_cache:
          key: jars-{{ checksum "build.gradle" }}-{{ checksum  "app/build.gradle" }}
```
Tại đây bạn sẽ hoạt động theo đường dẫn tới file build.gradle tại project. Nếu như không có sự thay đổi gì với mặc định thì sẽ như trên. Còn không hãy tuy chỉnh theo app của bạn <br>
Phần tới thì mình sẽ chạy `./gradlew androidDependencies` để download dependevcied của project. Thông thường bạn không bao giờ gọi task này trực tiếp vì nó được thực hiện tự động, nhưng gọi dòng lệnh trên mình sẽ chèn một bước `save_cache` sẽ lưu trữ các dependencies để hoạt động cho lần tiếp theo được nhanh hơn.<br>
Sau đó `./gradlew lint ` sẽ chạy các tool linting tích hợp.<br>
Cuối cùng là tải lên các reports build dưới dạng  job artifacts và upload test metadata (XML) cho CircleCI để xử lý. <br>
```
- run:
          name: Run Tests
          command: ./gradlew lint
      - store_artifacts: 
      # for display in Artifacts: https://circleci.com/docs/2.0/artifacts/ 
          path: app/build/reports
          destination: reports
      - store_test_results: 
      # for display in Test Summary: https://circleci.com/docs/2.0/collect-test-data/
          path: app/build/test-results
```

**B5**:   Đẩy code lên **Github** <br>
Nào bây giờ chúng ta hãy commit code lên github và xem sự thay đổi trên circleci.com cũng như tại github.com nhé. <br>
Ở đây mình sẽ checkout sang một branch khác để xem sự thay đổi rõ rệt nhất thay vì lên master. <br>
<br>
Đây là kết quả tại **Github:** 

![](https://images.viblo.asia/24c764dd-f090-49c8-9707-4302c24fb2c3.png)

Bản build lần này đã Success rồi. click **Show all checks** sẽ nhìn thấy chi tiết hơn về CircleCI đã pass pull này của mình.

![](https://images.viblo.asia/c575ce90-746f-4588-b28b-69880fda0dc3.png)

và tại **circleci.com**: <br>

![](https://images.viblo.asia/20e50d9e-87d0-42cd-8721-590973eb259e.png) 

Chi tiết hơn nữa:

![](https://images.viblo.asia/3c1fbb67-885b-4a38-9713-3db887a28944.png)
<br>

**B6**: Enabling GitHub Checks. <br>

Phần cuối mình muốn hướng dẫn cách Enable Github Checks với Circle CI nhằm sử dụng Circle CI để báo cáo trạng thái công việc cho ứng dụng trên GIthub một cách chi tiết và cụ thể hơn tới bản thân và các thành viên trong team. Và có thể điều hướng vào website xem chi tiết về liên kết Circle CI Checks.

Đây là một hình ảnh sau khi mình đã enable checks github của Circle CI. Mình sẽ thử với trạng thái là build - Failed <br>

![](https://images.viblo.asia/71421ea9-38ba-49e5-a668-1e3f8a00b3ee.png) 

Đầu tiên mình sẽ nói về những điều kiện để bạn có thể Enable Github Checks:  
* Dự án của bạn phải được sử dụng Circle CI 2.0 và làm việc với [Workflows](https://circleci.com/docs/2.0/workflows/).
* Bạn sẽ phải có role Admin trong Github repository để cho phép bạn tích hợp  CircleCI Checks. <br>

Các bước tiếp theo: 
* Bạn vào phần **SETTINGS** trong Menu chính của ứng dụng.
* Chọn **VCS**.
* Click button **Manager Github Checks**.

![](https://images.viblo.asia/d9890587-0ab6-4e43-b579-ebca5d8d2e4a.png)

* Select Github repository mà bạn muốn enable github checks.

![](https://images.viblo.asia/182e51cf-0a15-4650-916f-324fab893f9a.png)

* Click button **Install**. => Như thế là Github Repository của bạn đã Enable Github Checks rồi.

Như vậy đã xong phần mở đầu về Circle CI & Github rồi. <br>
**Kết luận:** <br>
Cấu hình này là một phiên bản đơn giản của Circle CI. Chúng ta có thể thêm nhiều bước vào bản build này bao gồm UI tests: Testing với Firebase Test Lab , packaging và even deployment. 


#### 3.2 Sử dụng Robolectric



**B1**: Thêm thư viện Robolectric vào project 
```
android {
  testOptions {
    unitTests {
      includeAndroidResources = true
    }
  }
}

dependencies {
  testImplementation 'org.robolectric:robolectric:4.3'
}
```
Các file java dùng viết test case trong thư mục sau: <br>
MÌnh sẽ tạo ra file **MainActivityTest** để test class **MainActivity** <br>

![](https://images.viblo.asia/0c3d824a-7271-478a-9f98-ccc4a5d5179d.png)

Từ bài toán đơn giản sau: Nhập vào giá trị X và giá trị Y. tính kết quả trả về (X+Y) <br>

**B2**: Tiến hành viết code tại **MainActivity**: <br>
```
package com.datvt.demo.testci;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private EditText valueX, valueY;
    private TextView result;
    private Button btnSum;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
        btnSum.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View view) {
                if (TextUtils.isDigitsOnly(valueX.getText()) && TextUtils.isDigitsOnly(valueY.getText()))
                {
                    Toast.makeText(MainActivity.this, "Tinh Tong", Toast.LENGTH_SHORT).show();
                    sum();
                }
            }
        });
    }

    private void initView() {
        valueX = (EditText) findViewById(R.id.edt_x);
        valueY = (EditText) findViewById(R.id.edt_y);
        result = (TextView) findViewById(R.id.tv_sum);
        btnSum = (Button) findViewById(R.id.btn_ok);
    }

    private void sum() {
        int val1 = Integer.parseInt(valueX.getText().toString());
        int val2 = Integer.parseInt(valueY.getText().toString());
        int answer = val1 + val2;
        result.setText(answer + "");
    }
}
```

**B3**: Viết **TestCase**: <br>
- Check các thành phần giao diện không null.
- Các giá trị nhập vào là một số nguyên.
- TÍnh kết quả trả về. <br>

Config file MainActivityTest
```
@RunWith(RobolectricTestRunner.class)
public class MainActivityTest {
}
```
 - Bắt đầu 1 test case sử dụng hàm setUp @Before, ở đây mình đang thực hiện khởi tạo cho các thành phần trong  MainActivity. <br>

```
        @Before public void setUp() throws Exception {
        // khơi tạo activity
              mActivity = Robolectric.buildActivity(MainActivity.class).create().get();
        // khởi tạo các thành phần sử dụng trong activity
              valueX = (EditText) mActivity.findViewById(R.id.edt_x);
              valueY = (EditText) mActivity.findViewById(R.id.edt_y);
              result = (TextView) mActivity.findViewById(R.id.tv_sum);
              addButton = (Button) mActivity.findViewById(R.id.btn_ok);
        }
```

- Bắt đầu mỗi method test mình sẽ phải thêm ký tự @Test
```
         // test case kiểm tra các thành phần giao diện không null
        @Test public void testNotNull() throws Exception {
              assertNotNull(valueX);
              assertNotNull(valueY);
              assertNotNull(result);
              assertNotNull(addButton);
              assertNotNull(mActivity);
        }
        // test case kiểm tra giá trị nhập vào là 1 số nguyên
        @Test public void testInputValue() throws Exception {
              assertThat(TextUtils.isDigitsOnly(valueX.getText())).isEqualTo(true);
              assertThat(TextUtils.isDigitsOnly(valueY.getText())).isEqualTo(true);
        }
        // test case kiểm tra kết quả là chính xác khi nhập (8 + 1  = 9)
        @Test public void testResult() throws Exception {
              valueX.setText("8");
              valueY.setText("1");
              addButton.performClick();
              assertThat(result.getText().toString().trim()).isEqualTo("9");
        }
```
**B4** Run App và đẩy code lên Github <br>

Nếu như bình thường mình sẽ tạo file Configurations để kiểm tra build test tại local. Tuy nhiên bài này mình sẽ đẩy code lên github nhắm mục đích để circle ci build test giúp. Và đây là kết quả mình thu về:

![](https://images.viblo.asia/87789108-9a6c-4d33-ac25-ff8b4a78bc9c.png)

Tuy đã success tuy nhiên file MainActivityTest của mình lại chưa hề được chạy. Các bạn có thể kiểm tra tại **Artifacts** trong Circle CI <br>

![](https://images.viblo.asia/6468fddd-fd96-4822-b721-b2efbf5b96c4.png)

Điều này cũng là dễ hiểu khi file **config.yml** của mình chưa hề được config để chạy file test trong projects này. Để thực hiện nó chúng ta hãy thay đổi câu lệnh: <br>

```
- run:
          name: Run App
          command: ./gradlew lint
```

sang 

```
- run:
          name: Run App and Run Test
          command: ./gradlew lint test
```

câu lệnh này cũng tương tự như khi ta gọi thêm: 
```
- run:
          name: Run App Module Unit Tests
          command: ./gradlew :app:testDebugUnitTest
```
Chỉ có điều với lint test chúng ta đang thực hiện cả 2 công việc là chạy app và chạy file test. Rất tiện phải không nào. <br>
Và sau đây là kết quả của chương trình này: <br>

![](https://images.viblo.asia/07ba6dcf-82dc-4042-91a8-fb8c0e7e983a.png)

File **MainActivityTest** đã được chạy:<br>

![](https://images.viblo.asia/14eb596f-efb5-449e-807f-adba35796b7a.png)

Và report cụ thể mà circle ci đã thống kê cho minh tại file .html: <br>

![](https://images.viblo.asia/9e0e60a2-f225-4730-b341-28c35cfcb472.png)

Rất cụ thể phải không nào. Từng dòng từng chỉ số đều rất ổn ^^. Các bạn có thể tay đổi test case sai để có thể xem trường hợp đó như nào nhé. Sẽ rất thú vị đấy. <br>
**DONE**
## 4. Kết luận
Continuous Integration  hay Unit Test đều góp phần nâng cao chất lượng của phần mềm. 
Và với CricleCI, ta có thể:
- Tích hợp test tự động vào hệ thống một cách nhanh chóng, dễ dàng. 
- Granular Control: Có thể build theo các cách tùy thích bằng cách sử dụng custom job với WorkWorkflows.
- Complete Flexibility: Hỗ trợ First-class Docker giúp ta có thể tùy chỉnh môi trường tùy thích phù hợp với dự án.

Bài viết này mới chỉ đưa ra ví dụ đơn giản về việc tích hợp CricleCI và Robolectric. Với CricleCI còn rất nhiều tính năng hữu ích khác, các bạn có thể tự tìm hiểu và mày mò thêm ở [Documentation](https://circleci.com/docs/)

Mong rằng bài viết của mình sẽ giúp các bạn áp dụng CI hay Unit Test vào project Android một cách nhanh chóng và đơn giản hơn. <br>
Cảm ơn các bạn đã theo dõi bài viết.