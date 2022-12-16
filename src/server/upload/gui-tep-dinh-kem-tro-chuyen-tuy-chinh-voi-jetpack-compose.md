Trong hướng dẫn này, bạn sẽ tìm hiểu cách tùy chỉnh UI Compose components của Stream và gửi file tùy chỉnh như tệp đính kèm với AttachmentFactory. <br>
![image.png](https://images.viblo.asia/434d165e-c6eb-4257-bca5-1cda1889e177.png) <br> Cụ thể, hướng dẫn này bao gồm các phần:
* AttachmentFactory là gì
* Tạo một `AttachmentFactory` tùy chỉnh
* Tùy chỉnh Stream [Compose UI Components](https://getstream.io/chat/docs/sdk/android/compose/overview/)
* Gửi file tùy chỉnh như là tệp đính kèm
* Thêm chế độ xem trước cho file đính kèm tùy chỉnh của bạn <br>

**Lưu ý:** Stream gần đây đã thông báo [Jetpack Compose UI Components ](https://getstream.io/blog/jetpack-compose-sdk/)của họ, cái mà hiện nay là bản beta. Điều này diễn ra sau thông báo của bản ổn định của Jetpack Compose. Bạn có thể thử SDK mới trong [Jetpack Compose Chat Tutorial](https://getstream.io/chat/compose/tutorial/).<br>[Stream Chat SDK ](https://getstream.io/chat/sdk/)hỗ trợ mặc định các file đính kèm khác nhau, bao gồm hình ảnh, URLs, gifs (ảnh động, và videos. Với XML UI Components, bạn có thể tùy chỉnh một lớp `AttachmentViewFactory` mà sẽ render ra file đính kèm xem trước của bạn. Tin tốt là với Compose UI components, điều này vẫn có thể đạt được :]<br> Nhưng trước tiên, bạn sẽ phải hiểu một `AttachmentFactory` là gì.<br> **Lưu ý :** Code của hướng dẫn này có sẵn trên [Github](https://github.com/wangerekaharun/StreamComposeAttachments)
## Giới thiệu về AttachmentFactory
`AttachmentFactory` là một lớp cho phép bạn có thể dựng và render file đính kèm của bạn trong một danh sách tin nhắn. [Stream Chat Compose SDK](https://getstream.io/chat/sdk/compose/) cung cấp các factories khác nhau mặc định để chuyển đổi hình ảnh, tệp, và link file đính kèm. Bạn có thể lấy ra tất cả các factories default bằng cách dùng:<br>
``` 
val defaultFactories = StreamAttachmentFactories.defaultFatories() 
```
Nếu ứng dụng của bạn cần file đính kèm khác với những cái có mặc định được cung cấp, bạn phải tự tạo một cái tùy chỉnh (bạn sẽ tìm hiểu điều này trong các phần tiếp theo).<br> 
Để tạo một `AttachmentFactory` tùy chỉnh, bạn sẽ cần:
* Một view để hiển thị file đính kèm. Trong trường hợp này, điều này sẽ là một [composable function](https://developer.android.com/jetpack/compose/mental-model#simple-example).
* Để tạo mới một `AttachmentFactory`. Tại đây, bạn cung cấp một thuộc tính để kiểm tra cho file đính kèm tùy chỉnh của bạn và chỉ định cách để render ra nội dung file đính kèm.<br>

Trước khi tạo một `AttachmentFactory` tùy chỉnh, bạn sẽ cần tạo một đối tượng `Attachment`.
## Tùy chỉnh Mật khẩu Tệp đính kèm
Để bắt đầu, bạn phải chuẩn bị một tin nhắn mà bạn sẽ gửi đến một kênh.
```java
val attachment = Attachment(
    type = "password",
    extraData = mutableMapOf("password" to "12345"),
)
val message = Message(
    cid = channelId,
    attachments = mutableListOf(attachment),
)
```
Đây là một tin nhắn với một file đính kèm chứa một mật khẩu. Bạn truyền mật khẩu thông qua thuộc tính `extraData`. Mặc định, [SDK Chat của Stream](https://getstream.io/chat/sdk/) không biết cách để render ra nội dung của file đính kèm.<br>
Để render ra nó, bạn bạn sẽ tạo ra một composable mà hiển thị ra mật khẩu. Đoạn code của nó sẽ trông như sau:
```java
// 1
@Composable
// 2
fun PasswordAttachmentView(attachmentState: AttachmentState) {
    // 3
    var showPassword by remember { mutableStateOf(false) }
    // 4
    val passwordAttachment = attachmentState.messageItem.message.attachments.first { it.type == "password" }

    Row(
        modifier = Modifier
            .padding(6.dp)
            .clip(ChatTheme.shapes.attachment)
            .background(Color.White)
    ) {
        // 5
        OutlinedTextField(
            value = passwordAttachment.extraData["password"].toString(),
            onValueChange = {},
            modifier = Modifier
                .fillMaxWidth()
                .padding(6.dp)
                .height(50.dp),
            enabled = false,
            visualTransformation = if (showPassword) VisualTransformation.None else PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            trailingIcon = {
                val image = if (showPassword) Icons.Filled.Visibility else Icons.Filled.VisibilityOff

                IconButton(onClick = { showPassword = !showPassword }) {
                    Icon(imageVector = image, null)
                }
            }
        )
    }
}
```
Trong đoạn code trên, bạn đã:
1. Chú thích hàm `PasswordAttachmentView` dùng chú thích (annotation) `@Composable`. Điều này để cho bạn dựng UI của component với Compose thay vì sử dụng XML.
2. Truyền `AttachmentState` vào hàm `PasswordAttachmentView` như là một đối số. `AttachmentState` là một lớp mà xử lí trạng thái của tệp đính kèm. Nó có một `MessageItem`, `Modifier`, và trình xử lí `onLongItemClick`: 
    * `MessageItem` chứa tất cả thông tin về từng tệp đính kèm riêng.
    * `Modifier` cho phép bạn xác định size, padding, background, v.v... của component.
 3. Lưu giá trị `showPassword` vào bộ nhớ của composable với [remember](https://developer.android.com/jetpack/compose/state#state-in-composables) composable. Giá trị này gây nên một sự sắp xếp lại của composable khi giá trị thay đổi.
 4. Nhìn vào tệp đính kèm có `type` là `password` từ `AttachmentState`.
 5. Dùng composable `OutlinedTextField` để xử lí input của người dùng. Trong bối cảnh này, bạn dùng nó để hiển thị file đính kèm mật khẩu:
    * Bạn set một giá trị của `OutlinedTextField` bằng cách lấy `extraData` mà bạn đã truyền vào file đính kèm.
    * Thông báo rằng `visualTransformation` và `trailingIcon` phụ thuộc vào giá trị của `showPassword`. Điều này giúp làm ẩn/hiện mật khẩu.<br>
    
Bạn đã dựng được view render ra nội dung file đính kèm của bạn. Tiếp theo, bạn sẽ tạo một `AttachmentFactory` tùy chỉnh, cái bạn cần để hiển thị nội dung file đính kèm của bạn.
## Tạo một AttachmentFactory Tùy chỉnh Mật khẩu
Để dựng một nội dung tin nhắn mật khẩu tùy chỉnh, bạn phải tạo factory của chính mình. Nó sẽ trông như thế này:
```java
@ExperimentalStreamChatApi
val customAttachmentFactories: List<AttachmentFactory> = listOf(
     AttachmentFactory(
        canHandle = { attachments -> attachments.any { it.type == "password" } },
        content = @Composable { PasswordAttachmentView(it) }
    )
)
```
Đây là một danh sách file đính kèm factories. Mỗi `AttachmentFactory` có hai thuộc tính sau:
*  `canHandle` - một hàm lambda mà chấp nhận một danh sách tệp đính kèm. Bạn cũng chỉ định loại tệp đính kèm nào factory có thể xử lí. Trong trường hợp này là file đính kèm `type` là mật khẩu.
*  `content` - chỉ định composable mà render ra nội dung mật khẩu file đính kèm. Nó dùng composable `PasswordAttachmentView` mà bạn đã tạo trước đó. <br>

Cuối cùng là thêm factory tùy chỉnh của bạn vào `ChatTheme`. Để làm điều này, ghi đè `attachmentFactories` trong wrapper `ChatTheme`:
```java
ChatTheme(
    attachmentFactories = customAttachmentFactories + defaultFactories
)
```
Tại đây, bạn ghi đè factories mặc định bằng cách cung cấp factory tùy chỉnh và cũng thêm `defaultFactories`.<br> Bây giờ, gửi một tin nhắn có `type` là mật khẩu, nó sẽ xuất hiện trong **Message List** như sau:
![image.png](https://images.viblo.asia/a18ca44b-6f00-4aca-ab92-81e1214e8f2c.png) <br>
Chạm vào icon hiện mật khẩu, bạn sẽ thấy giá trị mật khẩu: <br> ![image.png](https://images.viblo.asia/c5ece206-d934-41fd-b149-b740b4a7a7ae.png)
Biến `showPassword` ẩn/hiện nội dung mật khẩu. Nó cũng hiển thị icon ẩn/hiện thay đổi phụ thuộc vào cái gì được hiện ra. View này sẽ render tất cả tệp đính kèm với `type` mật khẩu là mặc định.<br> Bạn đã hiểu cách gửi tệp đính kèm mà không có tệp nào. Trong phần tiếp theo, bạn cũng sẽ tìm hiểu cách ghi âm file âm thanh và gửi chúng như là tệp đính kèm tùy chỉnh.
## Tùy chỉnh Tệp đính kèm Âm thanh
Gửi tệp âm thanh là một tính năng 'xịn sò' trong ứng dụng nhắn tin. Với [Steam Chat](https://getstream.io/chat/), bạn có thể gửi các tệp âm thanh như là các tệp đính kèm tùy chỉnh. Tương tự như gửi file đính kèm mật khẩu, bạn sẽ cần: 
* Tạo và gửi tệp đính kèm tùy chỉnh của bạn.
* Tạo view tùy chỉnh cho tệp đính kèm của bạn.
* Thêm `AttachmentFactory` tùy chỉnh.<br>

Dưới đây là tin nhắn với tệp đính kèm:
```java
val attachment = Attachment(
    type = "audio",
    upload = File(output),
)
val message = Message(
    cid = channelId,
    attachments = mutableListOf(attachment),
)
```
Đối với phần đính kèm có nhiều tệp, bạn phải dùng thuộc tính `upload`. Nó sẽ tải lên tệp đính kèm của bạn. Bạn có thể truy cập tệp đính kèm bằng cách dùng thuộc tính `url` của tệp đính kèm.<br>

> Để có thêm thông tin về tạo và gửi file đính kèm, đọc hướng dẫn [Sending Custom Attachments](https://getstream.io/chat/docs/sdk/android/client/guides/sending-custom-attachments/).


Bạn sẽ dùng `MediaRecorder` để tạo file `output`. Chúng ta sẽ không đi chi tiết phần chức năng tại đây, nhưng bạn có thể tìm tất cả code của nó trong [project mẫu trên Github](https://github.com/wangerekaharun/StreamComposeAttachments).<br> Đối tượng `Attachment` đã sẵn sàng. Tiếp theo, bạn sẽ tìm hiểu cách tạo một chế độ xem trước nội dung của file đính kèm âm thanh.
##     View tệp đính kèm âm thanh tùy chỉnh <br>
Với âm thanh, bạn sẽ cần một giao diện trình phát để bạn có thể nghe âm thanh đã được gửi. Bạn sẽ dùng [Andoid MediaPlayer](https://developer.android.com/reference/android/media/MediaPlayer) để phát tệp âm thanh.<br>Đây là phần code cho component này:<br>
 ```java
 @Composable
fun AudioAttachmentView(attachmentState: AttachmentState) {
    // 1
    var playing by remember { mutableStateOf(false) }
    // 2
    val audioAttachment = attachmentState.messageItem.message.attachments.first { it.type == "audio" }
    // 3
    val player = PlayerWrapper(
        player = MediaPlayer.create(LocalContext.current, Uri.parse(audioAttachment.url)),
        onStop = { playing = false },
    )

    // 4
    DisposableEffect(Unit) {
        onDispose { player.release() }
    }

    ConstraintLayout(
        modifier = Modifier
            .fillMaxWidth()
            .padding(6.dp)
            .clip(ChatTheme.shapes.attachment)
            .background(Color.White)
    ) {
        val (iconButton, text) = createRefs()
        // 5
        IconButton(
            onClick = {
                playing = !playing
                if (playing) player.play() else player.stop()
            },
            modifier = Modifier
                .width(50.dp)
                .height(55.dp)
                .constrainAs(iconButton) {
                    start.linkTo(parent.start)
                    top.linkTo(parent.top)
                }
        ) {
            Image(
                painter = painterResource(
                    when (playing) {
                        true -> R.drawable.ic_baseline_stop_circle_24
                        false -> R.drawable.ic_baseline_play_circle_filled_24
                    }
                ),
                contentDescription = "Play Icon",
            )
        }
        val fileName = audioAttachment.name ?: ""
        // 6
        Text(
            text = fileName,
            fontSize = 16.sp,
            modifier = Modifier
                .constrainAs(text) {
                    start.linkTo(iconButton.end)
                    top.linkTo(iconButton.top)
                    bottom.linkTo(iconButton.bottom)
                }
        )
    }
}
```
Trong đoạn code trên, bạn đã:<br>
1. Dùng biến trạng thái `playing` để theo dõi trạng thái trình phát. Nó giúp bạn chuyển icon giữa phát và dừng.
2. Lấy ra tệp đính kèm âm thanh từ `AttachmentState`.
3. Tạo một instance `PlayerWrapper`. Nó có những phương thức thiết thực như phát, dừng, và giải phóng MediaPlayer. Bạn cũng có thể truyền tệp âm thanh như một URI.
4. Gọi hàm `release()` từ lớp `PlayWrapper` để dọn dẹp MediaPlayer. Điều này để đảm bảo composable của bạn không có bất cứ phản ứng phụ nào và PlayerWrapper đã được được dọn dẹp khi composable rời khỏi thành phần.<br>
5. Tạo một `IconButton` để thay điỉu trạng thái phụ thuộc vào trạng thái của trình phát. Chạm vào nút này để phát âm thành và hiển thị **stop** icon. Chạm vào **stop** icon sẽ dừng phát âm thanh.
6. Gọi composable `Text`, cái mà sẽ hiển thị ra tên tệp.<br>

Chế độ xem trước đã sẵn sàng. Kế tiếp, bạn sẽ tạo một tin nhắn tùy chỉnh với một nút ghi ở phía dưới.<br>
## Tùy chỉnh màn hình Tin nhắn
Với các components mới của Compose UI, thật dễ dàng để thêm tính năng trò chuyện vào app của bạn và tùy chỉnh những components này theo nhu cầu của bạn. Bạn sẽ tìm hiểu cách tùy chỉnh một vài component trong những phần dưới đây.<br> Để có chức năng ghi âm âm thanh, bạn cần thêm một icon ghi vào input layout nhắn tin như sau:<br>
![image.png](https://images.viblo.asia/181574cf-fcb4-4db1-9ac6-eaa0408b2041.png) <br>
Trong hình trên, có 2 icon đã được thêm:<br>
* Một icon mật khẩu để gửi file đính kèm mật khẩu mà bạn đã tìm hiểu trước đó trong bài này.
* Một icon microphone để kích hoạt tất cả chức năng ghi âm.<br>

Để có giao diện này, bắt đầu tùy chỉnh **Messages Screen:**
```java
ChatTheme(
    attachmentFactories = customAttachmentFactories + defaultFactories
) {
    CustomUi(onBackPressed = { onBackPressed() })
}
```
Ở đây, bạn dùng `ChatTheme` từ các yếu tố Compose UI của Stream. Nó cung cấp cho bạn style mặc định, nhưng bạn có thể truyền factory tùy chỉnh để xử lí file đính kèm tùy chỉnh.<br>
Đặt nội dung của component tùy chỉnh mà bạn sẽ triển khai trong code dưới đây: <br>
```java
@Composable
fun CustomUi(onBackPressed: () -> Unit) {
    val isShowingAttachments = attachmentsPickerViewModel.isShowingAttachments
    val selectedMessage = listViewModel.currentMessagesState.selectedMessage
    val user by listViewModel.user.collectAsState()

    Box(modifier = Modifier.fillMaxSize()) {
        Scaffold(
            modifier = Modifier.fillMaxSize(),
            bottomBar = {
                CustomAudioComposer()
            },
            content = {
                Column(modifier = Modifier.fillMaxSize()) {
                    MessageListHeader(
                        channel = listViewModel.channel,
                        currentUser = user,
                        isNetworkAvailable = true,
                        messageMode = listViewModel.messageMode,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp),
                        onBackPressed = onBackPressed,
                        onHeaderActionClick = {},
                    )

                    MessageList(
                        modifier = Modifier
                            .padding(it)
                            .background(ChatTheme.colors.appBackground),
                        viewModel = listViewModel,
                        onThreadClick = { message ->
                            composerViewModel.setMessageMode(Thread(message))
                            listViewModel.openMessageThread(message)
                        }
                    )
                }
            }
        )

        if (isShowingAttachments) {
            AttachmentsPicker(
                attachmentsPickerViewModel = attachmentsPickerViewModel,
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .height(350.dp),
                onAttachmentsSelected = { attachments ->
                    attachmentsPickerViewModel.changeAttachmentState(false)
                    composerViewModel.addSelectedAttachments(attachments)
                },
                onDismiss = {
                    attachmentsPickerViewModel.changeAttachmentState(false)
                    attachmentsPickerViewModel.dismissAttachments()
                }
            )
        }

        if (selectedMessage != null) {
            SelectedMessageOverlay(
                messageOptions = defaultMessageOptions(
                    selectedMessage,
                    user,
                    listViewModel.isInThread
                ),
                message = selectedMessage,
                onMessageAction = { action ->
                    composerViewModel.performMessageAction(action)
                    listViewModel.performMessageAction(action)
                },
                onDismiss = { listViewModel.removeOverlay() }
            )
        }
    }
}
```
Một vài đoạn code của `CustomMessageScreen` đã được lược bớt cho ngắn gọn. Để giải thích phần component then chốt trong `Customi` composable: Bạn định nghĩa một layout cha, là Box và Scaffold.<br>
Layout `Box` cho phép bạn hiển thị những thứ ở trên những thứ khác. `Scafold` là một layout chất liệu thiết kế mà làm cho việc thêm những component nguyên liệu khác như thanh ứng dung, điều hướng phía dưới, thêm nội dung trở nên dễ dàng hơn. Trong `Scaffold` bạn định nghĩa:<br>
* `bottomBar` - Đây là một thanh phía dưới với một `MessageComposer` để gửi tin nhắn và các tệp đính kèm. Mặc định, nó chỉ có icon tệp đính kèm. Bạn cũng sẽ thêm các icons khác và các hành động của nó. Bạn sẽ thấy nội dung của `CustomAudioComposer` trong một khoảnh khắc.
* `content` - Đây là nội dung phần còn lại của màn. Bạn có một `Column` với `MessageListHeader` và `MessageList`.
    * `MessageListHeader` hiển thị nút quay lại, thông tin của kênh (như các thành viên đang hoạt động), và hiện ra avatar hiện tại của người dùng.
    * Component `MessageList` hiển thị tin nhắn trong kênh được chọn. Hai component này có thể tùy chỉnh phù thuộc vào thông tin nào mà bạn muốn hiển thị.<br>
    
Tiếp theo, bạn sẽ đi sâu vào component `CustomAudiocComposer` để xem cách mà bạn thêm các hành động tùy chỉnh vào `MessageComposer`.
## Tạo Composer Nhắn tin Tùy chỉnh
`MessageComposer` cho phép một người dùng nhập và gửi tin nhắn cũng như gửi tệp đính kèm.
```java
@Composable
fun CustomAudioComposer() {
    val buttonState by stateViewModel.isRecording.collectAsState()
    MessageComposer(
        modifier = Modifier
            .fillMaxWidth()
            .wrapContentHeight(),
        viewModel = composerViewModel,
        // 1
        integrations = {
            IconButton(
                modifier = Modifier
                    .align(Alignment.CenterVertically)
                    .width(35.dp)
                    .height(35.dp)
                    .padding(4.dp),
                content = {
                    Icon(
                        imageVector = Icons.Default.Attachment,
                        contentDescription = null,
                        tint = ChatTheme.colors.textLowEmphasis,
                    )
                },
                onClick = {
                    attachmentsPickerViewModel.changeAttachmentState(true)
                }
            )
            IconButton(
                onClick = {
                    sendPasswordAttachmentMessage()
                },
                modifier = Modifier
                    .width(35.dp)
                    .height(35.dp)
                    .padding(4.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Visibility,
                    contentDescription = null,
                    tint = ChatTheme.colors.textLowEmphasis,
                )
            }
            IconButton(
                onClick = {
                    if (!buttonState) {
                        checkPermissions()
                    } else {
                        stopRecording()
                    }
                },
                modifier = Modifier
                    .width(35.dp)
                    .height(35.dp)
                    .padding(4.dp)
            ) {
                Icon(
                    imageVector = if (buttonState) {
                        Icons.Default.Stop
                    } else Icons.Default.Mic,
                    contentDescription = null,
                    tint = if (buttonState) ChatTheme.colors.errorAccent else ChatTheme.colors.textLowEmphasis,
                )
            }
        },
        // 2
        input = {
            MessageInput(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(7f)
                    .padding(start = 8.dp),
                value = composerViewModel.input,
                attachments = composerViewModel.selectedAttachments,
                activeAction = composerViewModel.activeAction,
                onValueChange = { composerViewModel.setMessageInput(it) },
                onAttachmentRemoved = { composerViewModel.removeSelectedAttachment(it) },
            )
        }
    )
}
```
Đây là `CustomAudioComposer` với 2 component chính sau đây:
* `integrations` - Bạn dùng cái này để cung cấp tích hợp tệp đính kèm. Mặc định, có ảnh, tệp, và tệp đính kèm ghi đa phương tiện (cap màn hình, cap video). Trong tệp đính kèm tùy chỉnh, có 3 sự tích hợp: nút tệp đính kèm mặc định của trình duyệt, một nút để tích hợp mật khẩu, và một nút với microphone để tích hợp âm thanh. Với những `IconButton` này, bạn có thể cung cấp các hành động tùy chỉnh để xử lí chúng khi chúng được chọn. Trong trường hợp này, chúng xử lí việc gửi mật khẩu và tệp đính kèm âm thanh.
* `input` - Nó có một component `MessageInput` nơi mà người dùng có thể nhập tin nhắn của họ.

Và đó là tất cả những gì bạn cần cho màn nhắn tin tùy chỉnh với các tích hợp tùy chỉnh. Khi run app, `MessageComposer` của bạn trông ló dư làyyyy:<br>
![image.png](https://images.viblo.asia/98f5a808-4f0d-494e-8839-179ba3476871.png)
Khi chạm vào icon microphone, bạn sẽ thấy một `Toast` với một dòng tin nhắn "Recording started!" (*Đã bắt đầu ghi âm*)
![image.png](https://images.viblo.asia/cb098b6e-7670-4118-8ed9-cbd986b1cd2a.png) <br>
Khi chạm vào **Stop**, bản ghi âm sẽ dừng lại và tệp âm thanh của bạn sẽ được tải lên:<br>
![image.png](https://images.viblo.asia/fb3111f2-c105-4fc3-b032-700c965205b7.png)<br>
Factory tùy chỉnh sẽ render ra tệp đính kèm âm thanh của bạn, cái mà sẽ hiển thị ra tên âm thanh và một icon **Play**. Khi bạn chạm vào nút phát, âm thanh của bạn sẽ bắt đầu phát:<br>
![image.png](https://images.viblo.asia/84630c07-1f24-4490-b013-65fa65f893d0.png)<br>
Lưu ý là bây giờ icon đổi màu và hiển thị icon dừng, cái mà sẽ dừng trình phát khi được chạm.<br>
Hai tệp đính kèm tùy chỉnh trông ló dư thế lày:<br>
![image.png](https://images.viblo.asia/ab4f594d-d277-43e6-97e2-e444321d9bed.png)<br>
Xin chúc mừng! Bạn đã tìm hiểu xong cách để thêm tệp đính kèm tùy chỉnh vào mà không cần thêm tệp. Bây giờ, bạn có thể nâng cao app trò chuyện của mình với các tính năng tùy chỉnh thật '*Ờ mây dzinggg* mà bạn vừa tìm hiểu được!
## Kết luận
Bạn đã thấy được việc thêm tệp đính kèm tùy chỉnh vào các component Compose UI của Stream dễ như thế nào. Bạn có thể thêm nhiều kiểu tệp đính kèm tùy chỉnh khác mà app của bạn cần.<br>
Trong trường hợp bạn bỏ lỡ nó, bạn có thể tìm thấy project sample đầy đủ với các ví dụ trong hướng dẫn này [trên Github](https://github.com/wangerekaharun/StreamComposeAttachments).<br>
[Compose SDK](https://getstream.io/chat/docs/sdk/android/compose/overview/) vẫn còn là bản beta. Trong trường hợp bạn có bất kì feedback nào khi dùng SDK, hãy tiếp cận với team trên [Twitter](https://twitter.com/getstream_io) và [Github](https://github.com/GetStream/stream-chat-android)
he he, bài được dịch từ blog stream chat, link bài viết gốc : https://getstream.io/blog/custom-attachments-jetpack-compose/