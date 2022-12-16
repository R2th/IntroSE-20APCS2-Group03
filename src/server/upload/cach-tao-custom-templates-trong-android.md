Hê-lô 501 anh chị em

Mỗi khi chúng ta làm việc trong một dự án mới, chúng ta phải viết rất nhiều code liên tục và trong một khoảng thời gian, nó trở nên rất tẻ nhạt. Tôi đã trải nghiệm nó trong khi tạo Ứng dụng Android nơi tôi phải viết quá nhiều code template  bất cứ khi nào tôi tạo một Acitivity hoặc Fragment. Không chỉ mất thời gian, mà còn gây ra sự nhàm chán cho nhà phát triển.

####
Để khắc phục điều đó, Android Studio có một số templates  sẵn có cũng hữu ích khi chúng tôi bắt đầu làm việc trên bất kỳ ứng dụng nào. Ví dụ, khi chúng ta tạo Activity hoặc Fragment, chúng ta chỉ cần viết tên của lớp và điều đó. Android Studio sẽ sinh ra một số đoạn cần thiết cho chúng ta.

####
Dưới đây là cấu trúc phổ biến của Fragment mà nhiều người trong chúng ta có thể đang sử dụng từ lâu:

```java
import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class DetailFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, 
        Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_rssitem_detail,   container, false);
        return view;
    }
}
```

####
Bây giờ, viết điều này cho mọi mô-đun, cho mọi chức năng là một bài kiểm tra về sự kiên nhẫn của nhà phát triển.

Giải pháp cho vấn đề này được cung cấp bởi Android Studio -> Custom templates.

Trong bài này, chúng ta sẽ lấy ví dụ về  RecyclerView Adapter  và sẽ tạo một template cho nó. Lần tới khi chúng ta  tạo RecyclerView và muốn tạo adapter cho nó, chúng ta không cần phải viết lại một số đoạn code lặp lại nữa. Điều này chắc chắn sẽ giúp chúng ta tăng tốc phát triển.

###
##### Vậy, Template là gì?
###
![](https://images.viblo.asia/b5e82f0a-6bd0-404b-8904-c8244bd6fc35.png)
###
Template là các tập tin có một số đoạn code được viết sẵn. Ví dụ: khi chúng ta tạo Activity, Service, Fragment từ danh sách các tùy chọn được xác định trước, chúng ta thấy rất nhiều code đã được viết sẵn từ các template được xác định trước.

Hãy  cùng nhau tạo template  của riêng chúng ta về việc tạo Adapter cho RecyclerView với lớp ViewHolder bên trong với các bước được đề cập dưới đây:

- Nhấp chuột phải vào thư mục package và sau đó chọn **New**-> **Edit File Templates...**
 ###
![](https://images.viblo.asia/5c7e36a0-b193-48a2-961d-496365937cb1.png)

 - Nhấn vào nút + để tạo một template mới. Bạn có thể đặt tên cho template này như bạn muốn
- Paste đoạn code bên dưới
```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import java.util.List;

#parse("File Header.java")
public class ${NAME} extends RecyclerView.Adapter<${VIEWHOLDER_CLASS}> {
    private final Context context;
    private List<${ITEM_CLASS}> items;
   
    public ${NAME}(List<${ITEM_CLASS}> items, Context context) {
        this.items = items;
        this.context = context;
    }

    @Override
    public ${VIEWHOLDER_CLASS} onCreateViewHolder(ViewGroup parent,
                                             int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.${LAYOUT_RES_ID}, parent, false);
        return new ${VIEWHOLDER_CLASS}(v);
    }

    @Override
    public void onBindViewHolder(${VIEWHOLDER_CLASS} holder, int position) {
        ${ITEM_CLASS} item = items.get(position);
        holder.set(item);
    }

    @Override
    public int getItemCount() {
        if (items == null){
            return 0;
        }
        return items.size();
    }
    
    public class ${VIEWHOLDER_CLASS} extends RecyclerView.ViewHolder {

        public ${VIEWHOLDER_CLASS}(View itemView) {
            super(itemView);
        }

        public void set(${ITEM_CLASS} item) {
            //UI setting code
        }
    }
 }
```
- ${<VARIABLE_NAME>} được sử dụng để tạo các biến trong các template . Khi bạn sử dụng template này, sẽ có một dấu nhắc yêu cầu nhập giá trị cho chúng để tạo ra code.
- Lệnh #if được sử dụng để kiểm tra xem package đó có trống hay không. Nó thêm tên được chuyển dưới dạng biến $ {PACKAGE_NAME} cho package không trống.
- Lệnh #parse được sử dụng để chèn nội dung của template khác.
- Bây giờ một lần nữa bấm vào thư mục **package** và sau đó chọn **New** và bạn sẽ có thể thấy template của bạn ở đó. Nhấp vào template đó sẽ mở một hộp nhắc nhở để điền vào các giá trị được xác định trong biến trên.

![](https://images.viblo.asia/d1cd0de8-0702-4354-9448-516291c17572.png)

![](https://images.viblo.asia/3bc0fa99-b1f9-49d4-bdbd-4355f9e34ba8.png)

- Đây là code được tạo sau khi điền tất cả thông tin

```java
import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.List;

public class EmployeeData extends RecyclerView.Adapter<EmployeeData> {
    private final Context context;
    private List<EmpItems> items;

    public EmployeeData(List<EmpItems> items, Context context) {
        this.items = items;
        this.context = context;
    }

    @Override
    public EmployeeData onCreateViewHolder(ViewGroup parent,
                                         int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.R.layout.item_emp, parent, false);
        return new EmployeeData(v);
    }

    @Override
    public void onBindViewHolder(EmployeeData holder, int position) {
        EmpItems item = items.get(position);
        holder.set(item);
    }

    @Override
    public int getItemCount() {
        if (items == null) {
            return 0;
        }
        return items.size();
    }

    public class EmployeeData extends RecyclerView.ViewHolder {

        public EmployeeData(View itemView) {
            super(itemView);
        }

        public void set(EmpItems item) {
            //UI setting code
        }
    }
}
```

Rất ngầu phải không? Chúng ta cũng có thể tạo các template tương tự và có thể sử dụng bất cứ nơi nào trong dự án để tránh code  soạn sẵn. Android Studio là một công cụ rất mạnh và các tính năng như các template thực sự hữu ích trong việc đẩy nhanh quá trình phát triển. Các mẫu này thực sự hữu ích nếu bạn làm việc với các thành viên khác trong nhóm để tất cả đều có thể sử dụng nó để làm lợi thế cho họ. Tôi hy vọng điều này đã giúp bạn hiểu cách custom template Android hoạt động
####
##### Nếu bạn thích bài viết này, vui lòng nhấn nút upvote và chia sẻ với các anh em khác nhé!
###
#### Tham khảo 
-  [Medium](https://medium.com/mindorks/how-to-implement-android-custom-templates-humble-bits-2ca757b52c28)
-  [Google](https://developer.android.com/studio/projects/templates)