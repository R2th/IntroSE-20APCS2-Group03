## 1)  Đặt vấn đề

Giả sử khách hàng chúng ta có 1 list các ảnh và yêu cầu list này sẽ được hiển thị ra màn hình và item trung tâm được scale hơn so với các item bên cạnh kiểu như sau:

![](https://images.viblo.asia/cdfa7328-2b47-4dc8-a02d-00c86697f1fd.png)


##  2) Giải pháp

Có nhiều cách để có thể làm được như trên, trong bài viết này mình sẽ hướng dẫn các bạn sử dụng RecyclerView để giải quyết vấn đề này
            
 Như chúng ta thấy thì item ở giữa sẽ to nhất (chính tâm) và ra xa tâm thì item sẽ nhỏ đi. 
 
 Như vậy thì độ lớn của các item sẽ tỷ lệ nghịch với khoảng cách giữa item đó và tâm của recyclerView
 

```java:ZoomCenterLinearLayoutManager.java
class ZoomCenterLinearLayoutManager extends LinearLayoutManager {
    public ZoomCenterLinearLayoutManager(Context context) {
        super(context);
    }

    public ZoomCenterLinearLayoutManager(Context context, int orientation, boolean reverseLayout) {
        super(context, orientation, reverseLayout);
    }

    public ZoomCenterLinearLayoutManager(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    @Override
    public boolean checkLayoutParams(RecyclerView.LayoutParams lp) {
        lp.width = getWidth() / 3; //Độ rộng của mỗi item sẽ bằng 1/3 độ rộng của RecyclerView
        return true;
    }

    @Override
    public void onLayoutCompleted(RecyclerView.State state) {
        super.onLayoutCompleted(state);
        scaleMiddle();
    }

    @Override
    public int scrollHorizontallyBy(int dx, RecyclerView.Recycler recycler, RecyclerView.State state) {
        scaleMiddle();
        return super.scrollHorizontallyBy(dx, recycler, state);
    }

    public void scaleMiddle() {
        float midpoint = getWidth() / 2.f;
        for (int i = 0; i < getChildCount(); i++) {
            View child = getChildAt(i);
            float childMidpoint = (getDecoratedRight(child) + getDecoratedLeft(child)) / 2.f; // tính hoành độ của item
            float d = Math.abs(midpoint - childMidpoint); // khoảng cách giữa item và điểm trung tâm của recyclerView
            float scale = 1f - 0.35f * d / midpoint; //tính độ scale của item (0/35: Số này càng lớn thì các item 2 bên sẽ càng nhỏ
            child.setScaleX(scale);
            child.setScaleY(scale);
        }
    }
}

```


```xml:item_recycler
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/text_name"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintDimensionRatio="1:1"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.0"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

item_empty.xml (Do chúng ta cần 1 khoảng trống ở đầu và cuối để hiển thị scale item đầu tiên và cuối cùng)

```xml:item_empty.xml 
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/text_name"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintDimensionRatio="1:1"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.0"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```



```java:ItemAdapter.java
package com.example.recyclerviewzoomcenter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.IntDef;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.recyclerviewzoomcenter.databinding.ItemEmptyBinding;
import com.example.recyclerviewzoomcenter.databinding.ItemRecyclerBinding;

import java.util.List;

import static com.example.recyclerviewzoomcenter.ItemAdapter.ViewType.EMPTY;
import static com.example.recyclerviewzoomcenter.ItemAdapter.ViewType.NORMAL;

public class ItemAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private List<Data> dataList;

    public ItemAdapter(List<Data> dataList) {
        this.dataList = dataList;
    }

    @Override
    public int getItemViewType(int position) {
        if (position == 0 || position == dataList.size() - 1) {
            return EMPTY;
        }
        return NORMAL;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == EMPTY) {
            ItemEmptyBinding binding = ItemEmptyBinding.inflate(LayoutInflater.from(parent.getContext()), parent, false);
            return new EmptyViewHolder(binding);
        }
        ItemRecyclerBinding binding = ItemRecyclerBinding.inflate(LayoutInflater.from(parent.getContext()), parent, false);
        return new ItemViewHolder(binding);
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if (holder instanceof ItemViewHolder) {
            ((ItemViewHolder) holder).bindData(dataList.get(holder.getAdapterPosition()));
        }
    }

    @Override
    public int getItemCount() {
        return dataList.size();
    }

    static class ItemViewHolder extends RecyclerView.ViewHolder {
        private ItemRecyclerBinding binding;

        public ItemViewHolder(@NonNull ItemRecyclerBinding binding) {
            super(binding.getRoot());
            this.binding = binding;
        }

        private void bindData(Data data) {
            binding.imageView.setImageResource(data.getImageId());
            binding.textName.setText(data.getName());
        }
    }

    static class EmptyViewHolder extends RecyclerView.ViewHolder {

        public EmptyViewHolder(@NonNull ItemEmptyBinding binding) {
            super(binding.getRoot());
        }
    }

    @IntDef({EMPTY, NORMAL})
    public @interface ViewType {
        int EMPTY = 0;
        int NORMAL = 1;
    }
}

```


```java:MainActivity.java
package com.example.recyclerviewzoomcenter;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.LinearSnapHelper;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.view.View;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static com.example.recyclerviewzoomcenter.ItemAdapter.ViewType.EMPTY;
import static com.example.recyclerviewzoomcenter.ItemAdapter.ViewType.NORMAL;

public class MainActivity extends AppCompatActivity {
    private String[] names = {"A", "B", "C"};
    private List<Data> dataList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        for (int i = 0; i < 10; i++) {
            Random random = new Random();
            Data data = new Data(names[random.nextInt(3)], R.drawable.image_1, NORMAL);
            dataList.add(data);
        }
        dataList.add(0, new Data("", 0, EMPTY));
        dataList.add(new Data("", 0, EMPTY));
        ItemAdapter adapter = new ItemAdapter(dataList);
        recyclerView.setLayoutManager(new ZoomCenterLinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        recyclerView.setAdapter(adapter);
        LinearSnapHelper snapHelper = new LinearSnapHelper(); // Sử dụng SnapHelper để RecyclerView luôn focus vào 1 item (snap position)
        snapHelper.attachToRecyclerView(recyclerView);
    }
}
```

Như vậy chúng ta đã giải quyết xong vấn đề trên rồi đó ^^

![](https://images.viblo.asia/0af7419f-5670-4d85-b41c-dcb080af2273.gif)