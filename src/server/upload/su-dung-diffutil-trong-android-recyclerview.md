**Chào tạm biệt với notifyDataSetChanged()…**

Chúng ta thường dùng list  trong hầu hết những ứng dụng hiện hành. Ứng dụng cũng yêu cầu cập nhập dữ liệu khi người sử  vuốt list . Để đạt được điều đó, chúng ta phải kéo dữ liệu từ server và cập nhập item mới nhận được.

Nếu có ít độ chậm trong xuất quá trình này, nó sẽ ảnh hưởng không nhỏ đến trải nghiệm của người dùng.

Khi nội dung bị thay đổi, chúng ta phải gọi notifyDataSetChanged() để cập nhận dữ liệu mới nhưng nó lại rất tốn công. Cần rất nhiều lần lặp lại để hoàn thành trong việc gọi notifyDataSetChanged.

Vì thế DiffUtil class xuất hiện và Android đã phát triển  class tiện ích này để xử lý việc cập nhập dữ liệu cho RecyclerView

**Vậy DiffUtil là gì nhỉ ?**

Kể từ 24.2.0 , RecyclerView support library, v7 package cung cấp lớp tiện ích có tên là DiffUtil. Class này tìm sự khác nhau giữa 2 lists và cung cấp danh sách mới dưới dạng output. Lớp này được sử dụng để thông báo cấp nhập cho RecyclerView Adapter.

**Vậy DiffUtil được sử dụng như thế nào ta ?**

DiffUtil.Callback là abstract class và được sử dụng bới DiffUtil trong khi tính toán sự khác biệt giữa 2 lists. Nó có 4  phương thức abstract và 1 non-abstract . Bạn phải thừa kế nó và override tất cả các phương thức :

**getOldListSize()**– Trả về số lượng của list cũ

**getNewListSize()**– Trả về số lượng của list mới

**areItemsTheSame(int oldItemPosition, int newItemPosition)**– Nó quyết định xem 2 đối tượng có cùng Items hay là không

**areContentsTheSame(int oldItemPosition, int newItemPosition)**– Nó quyết định xem 2 Items có cùng dữ liệu hay là không. Phương thức này chỉ được gợi khi areItemsTheSame() trả về true.

**getChangePayload(int oldItemPosition, int newItemPosition)**– Nếu areItemTheSame() trả về  true và areContentsTheSame() trả false sau đó DiffUtil sẽ gọi phương thức này để trả về sự thay đổi.

**Cùng xem qua ví dụ nhé các bạn:**

**Cấu trúc**

![](https://images.viblo.asia/61232305-953d-465c-8c8e-a16f14d6d415.png)

**Code**

File activity_main.xml  dưới đây : 

```

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <android.support.v7.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />


    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fabAddList"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_alignParentEnd="true"
        android:layout_alignParentRight="true"
        android:layout_margin="16dp"
        android:src="@android:drawable/ic_input_add" />

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fabChangeList"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_margin="16dp"
        android:src="@android:drawable/ic_menu_sort_by_size" />

</RelativeLayout>
```

File cardview_item_layout.xml :

```

<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="8dp">

        <TextView
            android:id="@+id/txtName"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Bitcoin" />

        <TextView
            android:id="@+id/txtPrice"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="1000 USD" />

    </LinearLayout>

</android.support.v7.widget.CardView>
```

Cùng xem Model.jave nhé các bạn :

```

package com.journaldev.androidrecyclerviewdiffutil;

public class Model implements Comparable, Cloneable {

    public String name;
    public int id, price;

    public Model(int id, String name, int price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    @Override
    public int compareTo(Object o) {
        Model compare = (Model) o;

        if (compare.id == this.id && compare.name.equals(this.name) && compare.price == (this.price)) {
            return 0;
        }
        return 1;
    }

    @Override
    public Model clone() {

        Model clone;
        try {
            clone = (Model) super.clone();

        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e); //should not happen
        }

        return clone;
    }

}
```

ở màn hình MainActivity.java :

```

package com.journaldev.androidrecyclerviewdiffutil;

import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {


    RecyclerView recyclerView;
    RecyclerViewAdapter recyclerViewAdapter;
    FloatingActionButton fabAddList, fabChangeList;

    private ArrayList<Model> modelArrayList = new ArrayList<>();

    public int i = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recyclerView = findViewById(R.id.recyclerView);
        fabAddList = findViewById(R.id.fabAddList);
        fabChangeList = findViewById(R.id.fabChangeList);

        dummyData();
        recyclerViewAdapter = new RecyclerViewAdapter(modelArrayList);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setAdapter(recyclerViewAdapter);

        fabAddList.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                addMoreCoinsToTheList();
            }
        });

        fabChangeList.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                changePricesInTheList();
            }
        });
        
    }

    private void dummyData() {

        modelArrayList.add(new Model(i++, "Bitcoin", 8000));
        modelArrayList.add(new Model(i++, "Ethereum", 600));
        modelArrayList.add(new Model(i++, "Litecoin", 250));
        modelArrayList.add(new Model(i++, "Bitcoin Cash", 1000));
    }

    private void addMoreCoinsToTheList() {
        ArrayList<Model> models = new ArrayList<>();

        for (Model model : modelArrayList) {
            models.add(model.clone());
        }
        models.add(new Model(i++, "Tron", 1));
        models.add(new Model(i++, "Ripple", 5));
        models.add(new Model(i++, "NEO", 100));
        models.add(new Model(i++, "OMG", 20));

        recyclerViewAdapter.setData(models);
    }

    private void changePricesInTheList() {

        ArrayList<Model> models = new ArrayList<>();
        
        for (Model model : modelArrayList) {
            models.add(model.clone());
        }

        for (Model model : models) {
            if (model.price < 900)
                model.price = 900;
        }
        recyclerViewAdapter.setData(models);
    }

}
```

Phần code cho RecyclerViewAdapter.java

```

package com.journaldev.androidrecyclerviewdiffutil;

import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.util.DiffUtil;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.CryptoViewHolder> {

    private ArrayList<Model> data;

    public class CryptoViewHolder extends RecyclerView.ViewHolder {

        private TextView mName, mPrice;

        public CryptoViewHolder(View itemView) {
            super(itemView);
            mName = itemView.findViewById(R.id.txtName);
            mPrice = itemView.findViewById(R.id.txtPrice);
        }
    }

    public RecyclerViewAdapter(ArrayList<Model> data) {
        this.data = data;
    }

    @Override
    public CryptoViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.cardview_item_layout, parent, false);
        return new CryptoViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(CryptoViewHolder holder, int position) {
        holder.mName.setText(data.get(position).name);
        holder.mPrice.setText(data.get(position).price + " USD");
    }

    @Override
    public void onBindViewHolder(CryptoViewHolder holder, int position, List<Object> payloads) {

        if (payloads.isEmpty()) {
            super.onBindViewHolder(holder, position, payloads);
        } else {
            Bundle o = (Bundle) payloads.get(0);
            for (String key : o.keySet()) {
                if (key.equals("price")) {
                    holder.mName.setText(data.get(position).name);
                    holder.mPrice.setText(data.get(position).price + " USD");
                    holder.mPrice.setTextColor(Color.GREEN);
                }
            }
        }
    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    public ArrayList<Model> getData() {
        return data;
    }

    public void setData(ArrayList<Model> newData) {

        DiffUtil.DiffResult diffResult = DiffUtil.calculateDiff(new MyDiffUtilCallBack(newData, data));
        diffResult.dispatchUpdatesTo(this);
        data.clear();
        this.data.addAll(newData);
    }
}

```

onBindViewHolder(CryptoViewHolder holder, int position, List<Object> payloads) được kích hoạt  khi DiffUtil  tạo thay đổi trong Adapter.

Trong đó chúng ta nhận bundle từ payload của DiffUtil . Và chứa các trường đã được thay đổi.
    
Bên trong  setData() chúng ta truyền cho ArrayList mới.
    
dispatchUpdatesTo(this) gọi adapter  và thông báo về Views được cập nhập
   
Sau đó , newData sẽ truyền vào data.
    
 Trong MyDiffUtilCallback.java :
 
 ```
 
package com.journaldev.androidrecyclerviewdiffutil;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.util.DiffUtil;
import java.util.ArrayList;

public class MyDiffUtilCallBack extends DiffUtil.Callback {
    ArrayList<Model> newList;
    ArrayList<Model> oldList;

    public MyDiffUtilCallBack(ArrayList<Model> newList, ArrayList<Model> oldList) {
        this.newList = newList;
        this.oldList = oldList;
    }

    @Override
    public int getOldListSize() {
        return oldList != null ? oldList.size() : 0;
    }

    @Override
    public int getNewListSize() {
        return newList != null ? newList.size() : 0;
    }

    @Override
    public boolean areItemsTheSame(int oldItemPosition, int newItemPosition) {
        return newList.get(newItemPosition).id == oldList.get(oldItemPosition).id;
    }

    @Override
    public boolean areContentsTheSame(int oldItemPosition, int newItemPosition) {
        int result = newList.get(newItemPosition).compareTo(oldList.get(oldItemPosition));
        return result == 0;
    }

    @Nullable
    @Override
    public Object getChangePayload(int oldItemPosition, int newItemPosition) {
        
        Model newModel = newList.get(newItemPosition);
        Model oldModel = oldList.get(oldItemPosition);

        Bundle diff = new Bundle();

        if (newModel.price != (oldModel.price)) {
            diff.putInt("price", newModel.price);
        }
        if (diff.size() == 0) {
            return null;
        }
        return diff;
        //return super.getChangePayload(oldItemPosition, newItemPosition);
    }
}

```

Đây là kết quả của bạn nhận được nek :)
    
![](https://images.viblo.asia/ae8acf52-fd19-48d4-a015-4dee2c531c90.gif)
    

Mình hy vọng bài này sẽ giúp ích được cho các bạn. Nếu có sai xót gì các bạn có thể comment cho mình bên dưới để mình cải hiện hơn ạ :)
    
    
Tài liệu tham khảo :
    
https://android.jlelse.eu/smart-way-to-update-recyclerview-using-diffutil-345941a160e0
    
https://medium.com/@iammert/using-diffutil-in-android-recyclerview-bdca8e4fbb00
    
https://www.journaldev.com/20873/android-recyclerview-diffutil