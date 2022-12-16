Chắc hẳn các bạn đều biết chức năng chat có tag giống zalo, hôm nay, mình xin giới thiệu một ý tưởng làm tag chat mà mình tự nghĩ ra. Bạn nào có ý tưởng khác hay hơn thì xin comment ở phía dưới để mình tham khảo với nha.
# Ý tưởng:
Trước khi nói về ý tưởng thì ban đầu các bạn phải tạo được màn hình như dưới đây:
![](https://images.viblo.asia/58429bdc-202a-4855-9902-e0a8beb508a3.jpg)

Ở đây các bạn chỉ cần làm cái chat text ở bottom thôi nhé, còn phần text chat ở trên thì nó là ở module khác, các bạn không cần chú ý. Vì mục tiêu bài viết của mình là cách làm cách hiện chat tag thôi mà :D. Tiếp tục nói về ý tưởng nào:
1. Bạn tạo 1 RecyclerView cho nó nằm ở trên EditText chat ở bottom đó
2. Khi bạn mới vào app thì mặc định cho RecyclerView ẩn đi, chỉ khi nào người dùng ấn @ tag thì bạn mới cho nó hiện
3. Khi người dùng nhập chữ sau @ thì bạn bắt đầu lọc các thành viên có chứa các kí tự đó.
4. Sau khi người dùng ấn chọn một thành viên nào đó trong nhóm chat, thì tiến hành ẩn RecyclerView đi, và chọn người đó hiện vào EditText.
Vì ở đây mình đã xây dựng server sẵn rồi nên server của mình sẽ hiểu những tên nào nằm trong cặp <s_@> và <e_@> thì đó chính là tag người dùng từ client để gửi lên server.
Và để cho mọi người dễ hiểu về phần mình trình bày sau này. Mình xin đưa ra các dữ liệu sẵn có trong nhóm chat này: 
1. Tên nhóm chat: Note chi tiết.
2. Thành viên trong nhóm: Nguyễn Bá Hùng, Nguyễn Hữu Thành, Thái Khắc Điệp
3. EditText chỉ cho phép chat text với ảnh, 2 cái này riêng biệt, nên khi chat ảnh không thể tag người khác vào ảnh đó luôn.

Sơ qua dữ liệu là thế, chúng ta tiếp tục bắt tay xây dựng chức năng này thôi nào
# Tiến hành xây dựng chức năng.
## Xây dựng RecyclerView:
### Xây dựng EditText chat:
Ở đây mình chỉ lấy một phần nhỏ layout trong project thôi nhé, nhưng sẽ đảm bảo cho các bạn đủ hiểu. Đầu tiên bạn sẽ xây dựng Edittext như sau: (Mình có sử dụng hardcode (vấn đề không nên trong lập trình) để các bạn dễ theo dõi nha)
```java
<RelativeLayout
        android:id="@+id/rlTextChat"
        android:layout_width="match_parent"
        android:layout_height="@dimen/chat_height"
        android:layout_alignParentBottom="true"
        android:background="@color/colorWhite">

        <ImageView
            android:id="@+id/iconSmile"
            android:layout_width="@dimen/icon_width"
            android:layout_height="@dimen/icon_height"
            android:layout_centerVertical="true"
            android:layout_margin="@dimen/size_5"
            android:src="@drawable/add_emoj_chat"
            android:visibility="gone" />

        <EditText
            android:id="@+id/edtChat"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_centerVertical="true"
            android:layout_marginLeft="@dimen/size_5"
            android:layout_toLeftOf="@id/iconAttach"
            android:layout_toRightOf="@id/iconSmile"
            android:background="@null"
            android:hint="Nhập thảo luận, tag @ ..."
            android:paddingLeft="5dp"
            android:textSize="20sp" />

        <ImageView
            android:id="@+id/iconImage"
            android:layout_width="@dimen/icon_width"
            android:layout_height="@dimen/icon_height"
            android:layout_alignParentRight="true"
            android:layout_centerVertical="true"
            android:layout_margin="@dimen/size_5"
            android:src="@drawable/add_photo_chat"
            android:visibility="visible" />

        <ImageView
            android:id="@+id/iconAttach"
            android:layout_width="@dimen/icon_width"
            android:layout_height="@dimen/icon_height"
            android:layout_centerVertical="true"
            android:layout_margin="@dimen/size_5"
            android:layout_toLeftOf="@id/iconImage"
            android:src="@drawable/add_file_chat"
            android:visibility="visible" />

        <ImageView
            android:id="@+id/iconSend"
            android:layout_width="@dimen/icon_width"
            android:layout_height="@dimen/icon_height"
            android:layout_alignParentRight="true"
            android:layout_centerVertical="true"
            android:layout_margin="@dimen/size_5"
            app:srcCompat="@drawable/ic_icon_sent"
            android:visibility="gone" />
    </RelativeLayout>
```
###  Xây dựng RecyclerView
Tiếp theo bạn hãy thêm đoạn code sau vào để tiến hành thêm RecyclerView hiện thành viên bạn tag lên trên EditText chat đó.
```java
   <android.support.v7.widget.RecyclerView
        android:id="@+id/rcvUserTag"
        android:background="@color/colorWhite"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_above="@+id/rlTextChat"
        android:layout_alignParentEnd="true"
        android:layout_marginEnd="0dp"
        android:layout_marginBottom="0dp">
    </android.support.v7.widget.RecyclerView>
```
Sau khi thực hiện những chức năng trên, bạn sẽ nhận được giao diện như thế này.
![](https://images.viblo.asia/3488a1a7-34eb-4441-a236-86138f5104d3.png)
Vậy là ta đã xong phần giao diện đúng không. Tiếp theo ta sẽ xây dựng phần xử lý sự kiện cho nó.
## Xây dựng xử lý sự kiện:
### Xây dựng Adapter cho RecyclerView hiển thị người dùng mình cần tag.
1. Đầu tiên bạn phải nhớ ánh xạ RecyclerView nhé:
```java
 private RecyclerView rcvUserTag;
 rcvUserTag = findViewById(R.id.rcvUserTag); \\ Mình viết đây cho trực quan
```
2. Xây dựng adapter cho recyclerview trên:
```java
public class UserChatAdapter extends RecyclerView.Adapter<UserChatAdapter.ViewHolder> {
  private final Context context;
  private ArrayList<UserTag> items;
  ChangeUserTag  changeUserTag;
  public UserChatAdapter(ArrayList<UserTag> items, Context context) {
    this.items = items;
    this.context = context;
    changeUserTag = (ChangeUserTag)context;
  }

  @Override
  public ViewHolder onCreateViewHolder(ViewGroup parent,
                                       int viewType) {
    View v = LayoutInflater.from(parent.getContext())
      .inflate(R.layout.custom_item_user_tag, parent, false);
    return new ViewHolder(v);
  }

  @Override
  public void onBindViewHolder(ViewHolder holder, int position) {
    UserTag item = items.get(position);
    holder.set(item);
    holder.itemView.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        changeUserTag.changeUserTag(item.getName());

      }
    });
  }

  @Override
  public int getItemCount() {
    if (items == null) {
      return 0;
    }
    return items.size();
  }

  public class ViewHolder extends RecyclerView.ViewHolder {
    public CircleImageView image;
    public TextView txtName;
    public ViewHolder(View itemView) {
      super(itemView);
      image = itemView.findViewById(R.id.circleImageView);
      txtName = itemView.findViewById(R.id.textView);
    }

    public void set(UserTag item) {
      Glide.with(context).load(Params.SERVER_URL_ROOT +item.getImage()).into(image);
      txtName.setText(item.getName());
    }
  }
  public void updateData(ArrayList<UserTag> datas ){
    this.items = datas;
    notifyDataSetChanged();
  }
  public interface ChangeUserTag{
    void changeUserTag(String name);
  }
}
```
Ở đây mình có sử dụng interface ChangeUsertag cụ thể tên hàm là changeUserTag(String name) để mỗi khi người dùng chọn người cần tag thì mình thực hiện gắn tên người đó vào EditText Chat  đó.

3. Tiến hành khởi tạo RecyclerView và gắn adapter vào RecyclerView.
```java
  private UserChatAdapter userTagAdapter;
  private ArrayList<UserTag> dataUserTag;
  
  private void rcvUserTag() {
    dataUserTag = new ArrayList<>();
    userTagAdapter = new UserChatAdapter(dataUserTag, this);
    rcvUserTag.setLayoutManager(new LinearLayoutManager(this));
    rcvUserTag.setAdapter(userTagAdapter);
    rcvUserTag.setVisibility(View.GONE); // ban đầu mình cứ cho recyclerview đó không hiện lên, khi nào ấn tag @ thì mới hiện
}

```
4. Do mình lúc nãy có tạo interface bên adapter và mình dùng TextWatcher để bắt sự kiện khi nhập chuỗi nên mình phải implement các interface đó vào Activity Chat của mình như sau:
```
public class ChatActivity extends BaseActivity implements View.OnFocusChangeListener, TextWatcher, UserChatAdapter.ChangeUserTag 
```
5. Sau khi thực hiện dòng trên xong, bạn tiến hành override 2 hàm:
  5.1.  Đầu tiên là hàm changeUserTag(String name), hàm này mục đích là khi mình chọn người cần tag vào, thì lập tức điền tên người đó vào edittext theo dạng <s_@>Tên_Người_Được_Tag<e_@>. 
    Ở đây edtText chính là EditText Chat mà mình nhập input để chat. Cụ thể hàm và mình sẽ giải thích trong code luôn như sau:
```java
 @Override
  public void changeUserTag(String name) {
    String[] s = edtChat.getText().toString().split("\\s"); \\ Dùng để lấy toàn bộ text đã nhập trong edittext chat.
    String text = ""; 
    for(int i=0; i<s.length-1; i++){
      text= text+" "+ s[i] ;
    } // Đoạn này dùng để xử lý không lấy chữ @ khi ta nhập để xuất hiện RecyclerView của người mình muốn tag
    edtChat.setText(text+" <s_@>"+name+"<e_@>"); // Khi mình đã có chọn người cần tag rồi thì tiến hành điền người đó vào edittext chat
    edtChat.setSelection(edtChat.getText().length());  // Cho con trỏ nhập EditText về vị trí cuối cùng để tiến hành nhập tiếp

    rcvUserTag.setVisibility(View.GONE); // Khi đã chọn người cần tag xong thì tiến hành ẩn RecyclerView đi.
  }
```

 5.2: Tiến hành xử lý bắt sự kiện khi người dụng nhập ký tự vào EditText Chat.
```java
String nameUserTag = "";

  @Override
  public void onTextChanged(CharSequence charSequence, int start, int before, int count) {
    rcvUserTag.setVisibility(View.GONE);
    String s = charSequence.toString();
    String[] arrS = s.split("\\s");
 
    if (arrS.length > 0) {
      int sizeArr = arrS.length - 1;
      if (!arrS[sizeArr].equals("") &&arrS[sizeArr].charAt(0) == '@' && arrS[sizeArr].length()>=1) {
        rcvUserTag.setVisibility(View.VISIBLE);
        ArrayList<UserTag> dataFilter = new ArrayList<>();
        String nameMain = arrS[sizeArr].substring(1,arrS[sizeArr].length());
        for (int k = 0; k < dataUserTag.size(); k++) {
          if (dataUserTag.get(k).getName().toLowerCase().contains(nameMain.toLowerCase())) {
            dataFilter.add(dataUserTag.get(k));
          }
        }
        userTagAdapter.updateData(dataFilter);
      }
    }
  }
```
  Sau đây mình xin giải thích code:
```java
  rcvUserTag.setVisibility(View.GONE);
    String s = charSequence.toString();
    String[] arrS = s.split("\\s");
```
    
   Đoạn này dòng 1 là ẩn RecyclerView đi, dòng 2 là lấy chuỗi String bạn đã nhập vào ra, dòng 3 là mình tách chuỗi đó thành một mảng arrS của các từ cách nhau bằng dấu cách (Mục tiêu là tý nữa mình phát hiện nếu từ nào có chữ @ đầu tiên thì đó là tag và tiến hành hiện RecyclerView).
```java
 if (arrS.length > 0) {
      int sizeArr = arrS.length - 1;
      if (!arrS[sizeArr].equals("") &&arrS[sizeArr].charAt(0) == '@' && arrS[sizeArr].length()>=1) {
        rcvUserTag.setVisibility(View.VISIBLE);
        ArrayList<UserTag> dataFilter = new ArrayList<>();
        String nameMain = arrS[sizeArr].substring(1,arrS[sizeArr].length());
        for (int k = 0; k < dataUserTag.size(); k++) {
          if (dataUserTag.get(k).getName().toLowerCase().contains(nameMain.toLowerCase())) {
            dataFilter.add(dataUserTag.get(k));
          }
        }
        userTagAdapter.updateData(dataFilter);
      }
    }

```
    
   Giải thích: (Vì tiếng việt khá lằng nhằng khi nói, nên ở đây mình nói "từ" thì các bạn hiểu là: Ví dụ: "Nguyễn Bá Hùng" thì có 3 từ cách nhau bởi khoảng trắng nha)
    
   if (arrS.length > 0):  Nghĩa là chỉ khi có text thì mới xét dòng phía dưới.
    
   int sizeArr = arrS.length - 1; : Lấy ra size của mảng arrS
    
   if (!arrS[sizeArr].equals("") && arrS[sizeArr].charAt(0) == '@' && arrS[sizeArr].length()>=1):
    
   !arrS[sizeArr].equals("") :  Nếu từ cuối cùng là khác rỗng (ví dụ: Nhập Nguyễn Bá Hùng mà sau chữ g (của chữ Hùng) có dấu cách thì không duyệt) .
   
   arrS[sizeArr].charAt(0) == '@' : Nếu từ cuối cùng mà bắt đầu bằng @ thì true
   
  arrS[sizeArr].length()>=1: Từ cuối cùng phải hơn 1 chữ. Ví dụ bạn nhập "Học tập @" thì  arrS[sizeArr].length()>=1 là false,
       còn nhập "Học tập @N" thì khi đó  arrS[sizeArr].length()>=1 là true, bạn hiểu rồi chứ. :D
      Khi mà các điều kiện trên thỏa mãn thì chúng ta tiến hành vào chỗ xử lý sau:

```java
       rcvUserTag.setVisibility(View.VISIBLE);
        ArrayList<UserTag> dataFilter = new ArrayList<>();
        String nameMain = arrS[sizeArr].substring(1,arrS[sizeArr].length());
        for (int k = 0; k < dataUserTag.size(); k++) {
          if (dataUserTag.get(k).getName().toLowerCase().contains(nameMain.toLowerCase())) {
            dataFilter.add(dataUserTag.get(k));
          }
        }
        userTagAdapter.updateData(dataFilter);
```
   Giải thích:
        rcvUserTag.setVisibility(View.VISIBLE);: Khi thỏa mãn các điều kiện if ở trên thì hiện RecyclerView
        
        ` ArrayList<UserTag> dataFilter = new ArrayList<>();
        String nameMain = arrS[sizeArr].substring(1,arrS[sizeArr].length());`:
Lấy tên người dùng mà mình đã nhập sau @ để lọc trong list danh sách. Ở đây dataFilter dùng để lưu lại những tên người dùng mà giống với tên mình nhập sau @.
```java
     for (int k = 0; k < dataUserTag.size(); k++) {
          if (dataUserTag.get(k).getName().toLowerCase().contains(nameMain.toLowerCase())) {
            dataFilter.add(dataUserTag.get(k));
          }
        }
    userTagAdapter.updateData(dataFilter);
```
   Đoạn này chắc đọc các bạn dễ hiểu không nào, tức là lấy ra tên những người trùng với nhập sau @ để hiện lên RecyclerView đó. Chỗ updateData(dataFilter) là cập nhật lại data của adapter đó nha các bạn.
 
 6.Cuối cùng cũng đã xong phải không nào. Chúng ta cùng xem demo app nha:
{@embed: https://www.youtube.com/watch?v=CFu1BluUuQQ}
 
 Cảm ơn các bạn đã đọc bài viết của mình nha. Nếu thấy hay mình xin 1 vote cho bài viết ạ. Còn có gì sai sót mong các bạn comment phía dưới để cùng trao đổi. :D