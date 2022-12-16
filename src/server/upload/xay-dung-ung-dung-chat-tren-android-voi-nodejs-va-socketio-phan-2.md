# I. Mở đầu
Xin chào các bạn, mính đã trở lại rồi đây :D và xin chào mừng các bạn tới bài viết tiếp theo của mình về chủ đề Xây dựng ứng dụng chat trên Android với NodeJS và Socket.io

*  Ở bài viết lần trước https://viblo.asia/p/xay-dung-ung-dung-chat-tren-android-voi-nodejs-va-socketio-phan-1-gDVK28WjlLj mình đã giới thiệu tổng quan với các bạn về NodeJS và nêu ra một số ưu, nhược điểm của nó trong việc xây dựng một ứng dụng realtime . Ngoài ra, mình cũng đã giới thiệu về thư viện Socket.io và cách cấu hình các modul cần thiết trong ứng dụng của mình.
*   Nếu bạn chưa đọc bài viết đó mình rất khuyến khích các bạn nên xem trước để dễ hiểu hơn trong bài viết này của mình nhé!

Hôm nay chúng ta sẽ tiếp tục với chủ đề Xây dựng ứng dụng chat trên Android với NodeJs và Socket.io nhé!!!

# II. Một số tính năng của Socket.io
Như bài viết mình cũng đã giới thiệu qua với các bạn về cách giao tiếp giữa client và server, nay mình xin nhắc lại một số điều và kèm theo đó là bổ sung thêm một số tính năng khá hay của thư viện socket.io:
*  Theo đó, khi muốn lắng nghe sự kiện hoặc gửi thì bạn có thể sử dụng:
    * Lắng nghe: "on" . Với mỗi một sự kiện thì chúng ta sẽ sử dụng một **Key** tương ứng với mỗi sự kiện để có thể giao tiếp giữa client và server. Khi server hoặc client nhận thấy **Key** theo sự kiện mình đang lắng nghe sẽ nhận được dữ liệu của *bên kia gửi* lại.
    * Gửi: "emit". Tương tự với on, với mỗi sự kiện được gửi đi chúng ta cũng phải thiết lập cho chúng một *định danh* để *bên kia* có thể nhận ra được sự kiện đang được gửi là gì và *bắt* lấy dữ liệu.
* Ngoài ra, mình sẽ giới thiệu một số tính năng khác của thư viện Socket.io như sau:
    * Với các trường hợp trên server như sau:
        *  io.sockets.emit: Gửi dữ liệu đến tất cả các client đang kết nối đến server, kể cả client đã gửi sự kiện đó
        *  socket.emit: Chỉ gửi dữ liệu lại cho client nào đã gửi sự kiện đó lên server.
        *  socket.broadcast.emit: Gửi dữ liệu nhận được cho tất cả các client trừ client vừa gửi sự kiện đó.
        *  io.to("socketId").emit: Gửi riêng lẻ đến một client có socketId được chỉ định
        *  Ngoài ra, còn có tính năng chat theo room. Mình xin phép giới thiệu với các bạn trong phần 3 của series này. Mình thấy đây là một tính năng rất hay mà thư viện này mang lại. Hãy đón chờ trong số tiếp theo mọi người nhé :D
    * Chắc hẳn sẽ có rất nhiều bạn thắc mắc về tại sao thư viện socket.io lại chia ra nhiều các phương thức gửi sự kiện khác nhau như trên. Mình xin phép lấy một số ví dụ điển hình như sau:
        *  socket.emit: Ví dụ điển hình nhất cho trường hợp này là khi bạn đăng kí tài khoản hoặc các tác vụ liên quan đến cá nhân thì đây là một lựa chọn,...
        *  socket.broadcast.emit: Ví dụ có thể kể đến là khi bạn xây dựng một game online mà có chế độ chơi ném bom chỉ gây sát thương cho những người xung quanh mặc dù quả bom đó nổ ngay chân nhân vật của bạn thì đây là một sự lựa chọn hoàn hảo,...
        *  io.to("socketId").emit: Có thể dễ nhận thấy đây là khi hai client muốn trò truyện hoặc gửi dữ liệu riêng tư cho nhau,...
      
# III. Xây dựng tính năng 
Ở phạm vi bài viết này, mình xin chia sẻ xây dựng tính năng **Tài khoản đang online**. Tức là chúng ta sẽ biết được những user đang online trên server và sẽ được update realtime khi tài khoản đó offline.
Chúng ta cùng bắt đầu nhé!
## 1. Server
### Sau đây là đoạn code cần thêm và có thay đổi so với phần 1 trên server:
```
io.sockets.on('connection', function (socket) {

	socket.on('user_login', function(user_name){
		if (listUser.indexOf(user_name) > -1) {
			return;
		}
		listUser.push(user_name);
		socket.user = user_name;
		io.sockets.emit("get_list_user", {data:listUser});
		io.sockets.emit("new_user_online", {data:socket.user});

		console.log(listUser);
	});

	socket.on('send_message', function(message){
		io.sockets.emit('receiver_message', {data: socket.user +": " +message});
	});

	socket.on('disconnect', function () {
		if (socket.user != null) {
			let index = listUser.indexOf(socket.user);
			if (index > -1) {
 			 listUser.splice(index, 1);
			}
		console.log(socket.user +" disconnect");
		io.sockets.emit('user_disconnect', {data: socket.user});
		}			
	});
});
```
## 2.Client
### Trên client cũng có một số thay đổi và thêm mới:
* Thêm mới file ContactAdapter
```
public class ContactAdapter extends RecyclerView.Adapter<ContactAdapter.ContactHolder> {
    private List<String> mListContacts;

    public ContactAdapter(List<String> listContacts) {
        mListContacts = listContacts;
    }

    @Override
    public ContactHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.itemt_chat, parent, false);
        return new ContactHolder(view);
    }

    @Override
    public void onBindViewHolder(ContactHolder holder, int position) {
        holder.mTextView.setText(mListContacts.get(position));
    }

    @Override
    public int getItemCount() {
        return mListContacts != null ? mListContacts.size() : 0;
    }

    public void addUserOnline(String user) {
        if (user == null || mListContacts.contains(user)) {
            return;
        }
        mListContacts.add(user);
        notifyDataSetChanged();

    }

    public void removeUserOffline(String user) {
        if (user == null) {
            return;
        }
        mListContacts.remove(user);
        notifyDataSetChanged();
    }

    public class ContactHolder extends RecyclerView.ViewHolder {
        private TextView mTextView;

        public ContactHolder(View itemView) {
            super(itemView);
            mTextView = itemView.findViewById(R.id.text_chat);
        }
    }
}
```
* Thay đổi và thêm mới file layout
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.v4.widget.DrawerLayout android:id="@+id/layout_contact"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:android="http://schemas.android.com/apk/res/android" >

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:id="@+id/content_chat"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        xmlns:app="http://schemas.android.com/apk/res-auto">

        <EditText
            android:id="@+id/edt_name"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:layout_constraintRight_toLeftOf="@id/btn_login" />

        <Button
            app:layout_constraintTop_toBottomOf="@id/edt_name"
            android:id="@+id/btn_login"
            android:text="login"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content" />

        <Button
            app:layout_constraintTop_toBottomOf="@id/edt_name"
            android:id="@+id/btn_chat"
            android:text="chat"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:layout_constraintLeft_toRightOf="@id/btn_login"/>

        <android.support.v7.widget.RecyclerView
            app:layout_constraintTop_toBottomOf="@id/btn_login"
            android:id="@+id/rc_chat"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
        </android.support.v7.widget.RecyclerView>
    </android.support.constraint.ConstraintLayout>


    <LinearLayout
        android:background="#d0e1f9"
        android:layout_gravity="end"
        android:layout_width="160dp"
        android:layout_height="match_parent">
        <android.support.v7.widget.RecyclerView
            android:id="@+id/rc_contact"
            android:layout_width="match_parent"
            android:layout_height="match_parent"/>
    </LinearLayout>

</android.support.v4.widget.DrawerLayout>
```
* Thay đổi và thêm mới trong ChatActivity
```
public class ChatActivity extends AppCompatActivity {
    private RecyclerView mRecyclerViewChat;
    private Button mButtonLogin;
    private Button mButtonChat;
    private EditText mEditTextName;
    private List<String> mListMessages;
    private ChatAdapter mChatAdapter;
    private final String URL_SERVER = "http://192.168.100.4:3000";
    private Socket mSocket;

    // >=== start addition
    private List<String> mContacts;
    private RecyclerView mRecyclerViewContact;
    private ContactAdapter mContactAdapter;
    // <=== end addition


    {
        try {
            mSocket = IO.socket(URL_SERVER);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        // >=== start addition
        mContacts = new ArrayList<>();
        mRecyclerViewContact = findViewById(R.id.rc_contact);
        mRecyclerViewContact.setLayoutManager(new LinearLayoutManager(ChatActivity.this));
        // <=== end addition


        mButtonLogin = findViewById(R.id.btn_login);
        mButtonChat = findViewById(R.id.btn_chat);
        mEditTextName = findViewById(R.id.edt_name);
        mListMessages = new ArrayList<>();
        mRecyclerViewChat = findViewById(R.id.rc_chat);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this);
        mRecyclerViewChat.setLayoutManager(layoutManager);
        mChatAdapter = new ChatAdapter(mListMessages);
        mRecyclerViewChat.setAdapter(mChatAdapter);

        mButtonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mSocket.emit("user_login", mEditTextName.getText().toString());
            }
        });

        mButtonChat.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mSocket.emit("send_message", mEditTextName.getText().toString());
            }
        });
    }

    private Emitter.Listener onNewMessage = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JSONObject data = (JSONObject) args[0];
                    String message;
                    message = data.optString("data");
                    mChatAdapter.addMessage(message);
                }
            });
        }
    };

    // >=== start addition
    private Emitter.Listener onReceiptStatusUserOnline = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JSONObject obj = (JSONObject) args[0];
                    String user = obj.optString("data");
                    mContactAdapter.addUserOnline(user);
                }
            });
        }
    };

    private Emitter.Listener onReceiptStatusUserOffline = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JSONObject obj = (JSONObject) args[0];
                    String user = obj.optString("data");
                    mContactAdapter.removeUserOffline(user);
                }
            });
        }
    };

    private Emitter.Listener onGetListUser = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    mContacts.clear();
                    JSONObject obj = (JSONObject) args[0];
                    JSONArray data = obj.optJSONArray("data");
                    for (int i = 0; i < data.length(); i++) {
                        mContacts.add(data.optString(i));
                    }
                    mContactAdapter = new ContactAdapter(mContacts);
                    mRecyclerViewContact.setAdapter(mContactAdapter);
                }
            });
        }
    };

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onStart() {
        super.onStart();
        mSocket.connect();
        mSocket.on("receiver_message", onNewMessage);
        mSocket.on("get_list_user", onGetListUser);
        mSocket.on("new_user_online", onReceiptStatusUserOnline);
        mSocket.on("user_disconnect", onReceiptStatusUserOffline);
    }

    @Override
    protected void onStop() {
        super.onStop();
        mSocket.disconnect();
    }

    // <=== end addition
}
```
## 3.Kết quả
![](https://images.viblo.asia/c01b65e4-865e-4c13-a4b2-3ba0f8f3be77.gif)
# III. Kết luận
Ở bài viết này mình đã giới thiệu đến các bạn tính năng realtime của socket.io trong việc hiển thị danh bạ những người đang online hay offline được update tức thời khi server nhận được kết quả. Đây là ví dụ nhỏ của mình, nếu có gì sai xót hay cần góp ý thì mong mợi người comment phía dưới để những bài viết tiếp theo mình sẽ cố gắng làm tốt hơn.
Cảm ơn mọi người đã theo dõi bài viết của mình!