# Giới thiệu
Nếu bạn đã từng tương tác với các trợ lý ảo qua giọng nói như Siri hay Google Now hoặc bot của các ứng dụng hiện hành như Facebook Messenger, Kik, Simsimi thì chắc bạn đã có một trải nhghiệm thực sự thú vị, trực quan và một giao diện người dùng mạnh mẽ . Tuy nhiên, vì hầu hết các ngôn ngữ tự nhiên đều vô cùng phức tạp, việc tạo ra các bot như vậy thật sự là không hề dễ dàng. May mắn thay, sự ra đời của IBM Watson đã giúp các lập trình viên tạo ra các con chat bot như vậy một cách dễ dàng hơn. Ở bài viết này, mình sẽ giới thiệu cho các bạn cách là sao để tạo ra một con chat bot thông qua IBM Watson
# Yêu cầu
* Tài khoản IBM Bluemix
* Android sutdio phiên bản mới nhất
* Android SDK từ 4.4 trở lên
# 1. Tạo Conversation Service
Trước khi bạn có thể sử dụng IBM Watson Conversation API, bạn phải tạo một Conversation Service trên nền tảng IBM Bluemix và xác thực thông tin đăng nhập cho nó. Đầu tiên bạn cần đăng nhập vào Bluemix [console](https://cloud.ibm.com/login), sau đó chuyển tới **Services > Watson**, và chọn  Create Watson service. Ở mà hình tiếp theo, chọn **Conversation**  từ danh mục dịch vụ.
![](https://images.viblo.asia/8cd191d7-05dd-4f32-91dc-8e2e54350b93.png)
Tiếp theo, nhập tên thích hợp cho dịch vụ và nhấn nút **Create**.
![](https://images.viblo.asia/7a004a0c-6fcd-45a5-93db-64dc622676b4.png)
## Step1 Tạo Conversation Workspace
**Conversation Service** chỉ có thể hoạt động nếu có ít nhất một Conversation Workspace được liên kết với nó. Hiện tại, bạn có thể nghĩ về một Conversation Workspace như một tập hợp các quy tắc và chi tiết cấu hình, xác định các khả năng và tính cách của Chat bot của bạn

Bảng điều khiển của Bluemix có một công cụ dễ sử dụng cho phép bạn tạo và quản lý các Conversation Workspace. Chọn Launch tool để bắt đầu. 
![](https://images.viblo.asia/0fec88e1-4cc7-4439-ad0d-9b514481b05b.png)

Trong màn hình tiếp theo, nhấn nút Create để tạo một Conversation Workspace mới. Trong hộp thoại bật lên, đặt một tên có ý nghĩa Conversation Workspace và chọn ngôn ngữ cho nó.
![](https://images.viblo.asia/3651385f-3a0a-4644-bbc2-c4d763ccaea3.png)

Khi Conversation Workspace mới được tạo, bạn sẽ phải thêm intents, entities, và dialog details cho nó.
![](https://images.viblo.asia/929f572c-763d-43dd-86ba-95e78c7b7888.png)

Trong khi intent xác định các hành động mà người dùng có thể thực hiện bằng giao diện người dùng trò chuyện của bạn, các thực thể xác định các đối tượng có liên quan đến các hành động đó. Ví dụ: trong câu "đặt vé cho tôi từ New York đến Chicago", "đặt vé" sẽ là một ý định và "New York" và "Chicago" sẽ là các thực thể. Chi tiết hộp thoại xác định các phản hồi thực tế mà giao diện người dùng trò chuyện tạo ra và cách các cuộc hội thoại của nó diễn ra.

Bước 1: Tạo intents

Trong hướng dẫn này, chúng ta sẽ tạo một chatbot Android rất đơn giản có khả năng thực hiện các hành động sau:

* Chào người dùng
* Tự giới thiệu
* Trích dẫn truyền cảm hứng

Theo đó, chatbot của chúng ta cần 3 intents.
Chọn Create mới để tạo intent đầu tiên. Tiếp theo,  hãy đặt tên cho intent của chúng ta #Greet, cung cấp một vài từ hoặc câu mẫu mà người dùng có thể sử dụng cho mục đích đó, chẳng hạn như "hi" và "xin chào" và nhấn nút Done.
![](https://images.viblo.asia/f89a618f-8ea0-488f-9379-8961487cd476.png)

Điều tốt nhất về dịch vụ Watson Conversation service  là chat bot sẽ được học hỏi một cách thông minh theo các dữ liệu đầu vào mà chúng ta cung cấp. Do đó, nó có thể thích ứng được với một số biến thể của các mẫu đầu vào. Ví dụ: nó sẽ có thể khớp chính xác các từ và cụm từ như "howdy", "goog morning" và "yo!" với intent #Greet.

Nhấn nút Create một lần nữa để tạo intent tiếp theo. Đặt tên là #Name và cung cấp các ví dụ người dùng sau.
![](https://images.viblo.asia/5dffd177-bd5d-4b59-9e59-ffeb788c2625.png)

Tương tự, đặt tên cho intent thứ ba #RequestQuote và cung cấp các ví dụ người dùng sau đây.
![](https://images.viblo.asia/869890a8-43c1-401e-8105-d54c6bc9e93f.png)

## Step 2: Tạo Dialog
Chatbot của chúng ta đơn giản đến mức chúng ta không cần xác định bất kỳ thực thể nào cho nó. Do đó, bây giờ chúng ta có thể trực tiếp bắt đầu chỉ định cách nó đáp ứng với từng intent mà chúng ta đã tạo.

Bắt đầu bằng cách chuyển đến tab Dialog và nhấn nút Create. Trong màn hình tiếp theo, bạn sẽ thấy hai nút của dialog được tạo tự động cho bạn: một nút có tên Wellcome, đó là chào người dùng và một nút có tên Anything else, đó là bắt các đầu vào mà bot không hiểu.
![](https://images.viblo.asia/25f3f7f7-a81e-43b0-8dca-d89fd87f485f.png)

Hiện tại, chúng ta hãy bỏ qua nút Anything else và cấu hình cho nút Wellcome. Trong Dialog bật lên, nhập #Greet trong trường If bot nhận ra, sau đó thêm một vài câu trả lời. Rõ ràng, bạn càng thêm nhiều phản hồi, chatbot của bạn sẽ càng giống con người.
![](https://images.viblo.asia/4b5754d9-2c35-4dea-a4a3-51574399e9ad.png)

Tiếp theo, tạo một nút mới cho intent #Name bằng cách nhấn nút Add nút. Một lần nữa, điền vào mẫu hiển thị một cách thích hợp.
![](https://images.viblo.asia/01979e74-6a29-4501-b9d8-91054b61afa5.png)

Intent #RequestQuote sẽ hơi khác một chút. Chúng ta sẽ không gõ thủ công một vài trích dẫn truyền cảm hứng như phản hồi của nút này bởi vì làm như vậy sẽ khiến bot của chúng tôi quá tĩnh và không thú vị. Thay vào đó, chatbot Android của chúng tôi sẽ có thể tìm nạp các câu hội thoại từ API bên ngoài. Do đó, các câu trả lời của nút này phải là những câu yêu cầu người dùng chờ trong khi bot tìm kiếm một câu trả lời mới.
![](https://images.viblo.asia/793fb7ae-6e22-4a70-9c8c-52501272291e.png)

Tại thời điểm này, không gian làm việc của chúng ta đã sẵn sàng. Bạn có thể kiểm tra nó ngay lập tức bằng cách nhấp vào biểu tượng bong bóng lời nói. Hãy thử nghiệm nó với nhiều câu khác nhau để đảm bảo rằng nó liên kết đúng với intent tương ứng.
![](https://images.viblo.asia/b553aaf1-1170-4b32-8c9c-1eee7d6e9749.png)

## Step 3: Determine Credentials
Để có thể tích hợp Conversation Service vào trong ứng dụng Android, bạn sẽ cần một tài khoản của riêng mình. Ngoài ra, bạn sẽ cần ID của Conversation WorkSpace. Do đó, đi đến phần Deploy và chuyển sang tab Credentials.

Bây giờ bạn có thể thấy các thông tin bạn cần. Sau khi ghi nhớ tất cả các thông tin cần thiết, bạn có thể đóng bảng điều khiển Bluemix.
![](https://images.viblo.asia/41d2118e-d26a-496b-b11b-b77124d45b19.png)

# 2. Android Studio Project Setup
Hiện tại chúng ta có thể tương tác với Conversation Service bằng bất kỳ thư viện mạng Android nào, nhưng sử dụng Watson Java SDK là một lựa chọn tốt vì nó cung cấp API rất mạnh mẽ và trực quan. Để thêm nó vào dự án Android Studio của bạn, hãy thêm phụ thuộc :
`compile 'com.ibm.watson.developer_cloud:java-sdk:3.7.2'`

Ngoài ra, chúng tôi sẽ cần thư viện mạng Fuel để lấy các đoạn hội thoại từ máy chủ từ xa và thư viện Design Support để có thể làm việc với một vài tiện ích của Material Design.
```
compile 'com.android.support:design:23.4.0'
compile 'com.github.kittinunf.fuel:fuel-android:1.9.0'
```

Đừng quên thêm quyền truy cập internet trong manifet nhé :

` <uses-permission android:name="android.permission.INTERNET"/> `
Cuối cùng, hãy mở tệp res / value / String.xml và thêm tên người dùng và mật khẩu củaConversation service và ID của Conversation workspace
```
<string name="username">1234567890-abde-12349-abdef</string>
<string name="password">ABCD123456</string>
<string name="workspace">abdefg1234567890-abcdef</string>
```

# 3. Defining a Layout
Tiếp theo chúng ta cùng tạo giao diện cho ứng dụng
```
<android.support.design.widget.TextInputLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_alignParentBottom="true"
    android:id="@+id/user_input_container">
    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Message"
        android:id="@+id/user_input"
        android:imeOptions="actionDone"
        android:inputType="textShortMessage"/>
</android.support.design.widget.TextInputLayout>
 
<ScrollView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_above="@+id/user_input_container">
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/conversation"
        android:textSize="16sp"
        />
</ScrollView>
```
# 4. Sử dụng Conversation Service
Lớp ConversService của Watson SDK có tất cả các phương thức bạn sẽ cần để giao tiếp với Conversation service.. Do đó, điều đầu tiên bạn cần làm trong class Activity là tạo một thể hiện của nó. 
```
final ConversationService myConversationService =
            new ConversationService(
                    "2017-05-26",
                    getString(R.string.username),
                    getString(R.string.password)
            );
```
Tiếp theo, để có thể làm việc với các widget có trong tệp XML bố cục, bạn phải lấy các tham chiếu đến chúng bằng phương thức findViewById () và bắt sự kiện cho các view.
	
```
final TextView conversation = (TextView)findViewById(R.id.conversation);
final EditText userInput = (EditText)findViewById(R.id.user_input);

userInput.setOnEditorActionListener(new TextView
                                        .OnEditorActionListener() {
    @Override
    public boolean onEditorAction(TextView tv, 
                                int action, KeyEvent keyEvent) {
        if(action == EditorInfo.IME_ACTION_DONE) {
            // More code here
        }
        return false;
    }
});

final String inputText = userInput.getText().toString();
conversation.append(
        Html.fromHtml("<p><b>You:</b> " + inputText + "</p>")
);
 
// Optionally, clear edittext
userInput.setText("");
```
Tin nhắn của người dùng phải được gửi đến Conversation service  được bọc trong một đối tượng MessageRequest. Bạn có thể dễ dàng tạo một lớp bằng cách sử dụng lớp MessageRequest.Builder.
```
MessageRequest request = new MessageRequest.Builder()
        .inputText(inputText)
        .build();
```

Khi yêu cầu đã sẵn sàng, bạn phải chuyển nó đến phương thức message () của đối tượng ConversService, cùng với ID của Conversation Workspace. Cuối cùng, để thực sự gửi tin nhắn đến Conversation service, bạn phải gọi phương thức enqueue ().

Vì phương thức enqueue () chạy không đồng bộ, nên bạn cũng sẽ cần một đối tượng ServiceCallback để nhận phản hồi của dịch vụ.
```
myConversationService
    .message(getString(R.string.workspace), request)
    .enqueue(new ServiceCallback<MessageResponse>() {
        @Override
        public void onResponse(MessageResponse response) {
           final String outputText = response.getText().get(0);
        }
 
        @Override
        public void onFailure(Exception e) {}
    });
```
Bot của chúng ta gần như đã sẵn sàng để có thể sử dụng. Nếu bạn thử chạy ứng dụng, bạn sẽ có thể nhận được phản hồi chính xác từ ứng dụng cho mục đích #Greet và #Name. Nó vẫn không thể đọc các trích dẫn truyền cảm hứng, mặc dù. Do đó, bây giờ chúng ta phải thêm mã để tìm kiếm rõ ràng ý định #RequestQuote và tạo phản hồi theo cách thủ công.

Để trích xuất tên của mục đích được phát hiện từ đối tượng MessageResponse, bạn phải gọi phương thức getIntents () của nó, trả về danh sách các đối tượng MessageResponse.Intent, chọn mục đầu tiên và gọi phương thức getIntent () của nó.
```
if(response.getIntents().get(0).getIntent()
                        .endsWith("RequestQuote")) {
    // More code here
}
```

Có rất nhiều trang web với API miễn phí mà bạn có thể sử dụng để lấy các trích dẫn truyền cảm hứng. Forismatic là một trong số đó. API REST của nó cung cấp các trích dẫn dưới dạng văn bản thuần túy mà bạn có thể sử dụng trực tiếp trong ứng dụng của mình.

Để thực hiện một yêu cầu HTTP đến URL của Forismatic API, tất cả những gì bạn cần làm là gọi phương thức get () của lớp Fuel. Vì phương thức chạy không đồng bộ, bạn phải xử lý phản hồi HTTP bằng cách gọi phương thức answerString () và truyền đối tượng Handler cho nó.

Bên trong phương thức  success() của trình xử lý, bạn chỉ cần thêm phần trích dẫn vào tiện ích TextView. Đoạn mã sau cho bạn thấy làm thế nào:

String quotesURL = 
    "https://api.forismatic.com/api/1.0/" + 
    "?method=getQuote&format=text&lang=en";
     
Fuel.get(quotesURL)
    .responseString(new Handler<String>() {
        @Override
        public void success(Request request, 
                            Response response, String quote) {
            conversation.append(
                    Html.fromHtml("<p><b>Bot:</b> " +
                            quote + "</p>")
            );
        }
 
        @Override
        public void failure(Request request, 
                            Response response, 
                            FuelError fuelError) {
        }
    });
Bot hiện đã hoàn tất và sẽ có thể tạo ra các phản hồi phù hợp cho tất cả các ý định chúng tôi đã thêm vào không gian làm việc.
    ![](https://images.viblo.asia/f2179df4-4416-45b6-af52-efac9e050a96.png)