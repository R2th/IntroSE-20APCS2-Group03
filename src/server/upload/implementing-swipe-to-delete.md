In this tutorial we will create an App showing the popular swipe to delete design such as the one on gmail app on android. First let's create a project and call it SwipeToDeleteDemo. Next import necessary libraries for this project. Have to import support for Recyclerview and design support.

**build.gradle**

```
implementation 'com.android.support:recyclerview-v7:28.0.0'
implementation 'com.android.support:design:28.0.0'
```

Next open the **activity_main.xml** and add a recyclerview.

**activity_main.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout
    android:id="@+id/coordinator_layout"
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

        <android.support.v7.widget.RecyclerView
            android:id="@+id/recycler_view"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:scrollbars="vertical"/>
</android.support.design.widget.CoordinatorLayout>
```

Next create the model class Item.

**Item**

```
public class Item {
    private int id;
    private String title;

    public Item(int id, String title) {
        this.id = id;
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
```

Next create the item layout file.

**item.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <RelativeLayout
        android:id="@+id/view_background"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="#D50000">

        <ImageView
            android:id="@+id/delete_icon"
            android:layout_width="30dp"
            android:layout_height="30dp"
            android:layout_alignParentEnd="true"
            android:layout_centerVertical="true"
            android:layout_marginEnd="10dp"
            android:src="@android:drawable/ic_menu_delete"/>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerVertical="true"
            android:layout_marginEnd="10dp"
            android:layout_toStartOf="@id/delete_icon"
            android:text="Delete"
            android:textColor="#fff"
            android:textSize="12sp"/>

    </RelativeLayout>

    <RelativeLayout
        android:id="@+id/view_foreground"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@android:color/white"
        android:padding="10dp">

        <TextView
            android:id="@+id/title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:ellipsize="end"
            android:fontFamily="sans-serif-medium"
            android:maxLines="1"
            android:textSize="14sp"/>

    </RelativeLayout>
</FrameLayout>
```

In the above layout **item.xml** i have added a TextView for the title of the item and also added a text "Delete" alongside a delete icon that is shown when the user interacts with the design by swipe gesture.

Next create the Adapter class ItemAdapter.

**ItemAdapter.java**

```
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.util.List;

public class ItemAdapter extends RecyclerView.Adapter<ItemAdapter.MyViewHolder> {
    private List<Item> mItemList;
    private ItemAdapterListener listener;

    public ItemAdapter(List<Item> ItemList, ItemAdapterListener listener) {
        this.listener = listener;
        this.mItemList = ItemList;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
            .inflate(R.layout.item, parent, false);
        return new MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        Item Item = mItemList.get(position);
        holder.title.setText(Item.getTitle());
    }

    @Override
    public int getItemCount() {
        return mItemList.size();
    }

    public void removeItem(int position) {
        mItemList.remove(position);
        notifyItemRemoved(position);
    }

    public void restoreItem(Item item, int position) {
        mItemList.add(position, item);
        notifyItemInserted(position);
    }

    public interface ItemAdapterListener {
        void onItemSelected(Item contact);
    }

    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView title;
        public RelativeLayout viewBackground, viewForeground;

        public MyViewHolder(View view) {
            super(view);
            title = view.findViewById(R.id.title);
            viewBackground = view.findViewById(R.id.view_background);
            viewForeground = view.findViewById(R.id.view_foreground);
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    listener.onItemSelected(mItemList.get(getAdapterPosition()));
                }
            });
        }
    }
}
```

In the adapter class we have included two methods for handling removing of item **removeItem()** and restoring item **restoreItem()** when user swipes to delete an item or clicks undo.

Next create a class for implementing the swipe gesture support that will be used by the recyclerview.

**RecyclerItemTouchHelper**

```

import android.graphics.Canvas;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.View;

public class RecyclerItemTouchHelper extends ItemTouchHelper.SimpleCallback {
    private RecyclerItemTouchHelperListener listener;

    public RecyclerItemTouchHelper(int dragDirs, int swipeDirs,
                                   RecyclerItemTouchHelperListener listener) {
        super(dragDirs, swipeDirs);
        this.listener = listener;
    }

    @Override
    public boolean onMove(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder,
                          RecyclerView.ViewHolder target) {
        return true;
    }

    @Override
    public void onSelectedChanged(RecyclerView.ViewHolder viewHolder, int actionState) {
        if (viewHolder != null) {
            final View foregroundView = ((ItemAdapter.MyViewHolder) viewHolder).viewForeground;
            getDefaultUIUtil().onSelected(foregroundView);
        }
    }

    @Override
    public void onChildDrawOver(Canvas c, RecyclerView recyclerView,
                                RecyclerView.ViewHolder viewHolder, float dX, float dY,
                                int actionState, boolean isCurrentlyActive) {
        final View foregroundView = ((ItemAdapter.MyViewHolder) viewHolder).viewForeground;
        getDefaultUIUtil().onDrawOver(c, recyclerView, foregroundView, dX, dY,
            actionState, isCurrentlyActive);
    }

    @Override
    public void clearView(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder) {
        final View foregroundView = ((ItemAdapter.MyViewHolder) viewHolder).viewForeground;
        getDefaultUIUtil().clearView(foregroundView);
    }

    @Override
    public void onChildDraw(Canvas c, RecyclerView recyclerView,
                            RecyclerView.ViewHolder viewHolder, float dX, float dY,
                            int actionState, boolean isCurrentlyActive) {
        final View foregroundView = ((ItemAdapter.MyViewHolder) viewHolder).viewForeground;
        getDefaultUIUtil().onDraw(c, recyclerView, foregroundView, dX, dY,
            actionState, isCurrentlyActive);
    }

    @Override
    public void onSwiped(RecyclerView.ViewHolder viewHolder, int direction) {
        listener.onSwiped(viewHolder, direction, viewHolder.getAdapterPosition());
    }

    @Override
    public int convertToAbsoluteDirection(int flags, int layoutDirection) {
        return super.convertToAbsoluteDirection(flags, layoutDirection);
    }

    public interface RecyclerItemTouchHelperListener {
        void onSwiped(RecyclerView.ViewHolder viewHolder, int direction, int position);
    }
}
```

Next open the main activity and populate a list with some data for demo purpose.

**MainActivity.java**

```
import android.graphics.Color;
import android.support.design.widget.CoordinatorLayout;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.View;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements RecyclerItemTouchHelper.RecyclerItemTouchHelperListener,
    ItemAdapter.ItemAdapterListener {
    private List<Item> mItemList = new ArrayList<>();
    private RecyclerView mRecyclerViewSongs;
    private ItemAdapter mAdapter;
    private CoordinatorLayout mCoordinatorLayout;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        init();
        setUpAdapter();
        getItems();
    }

    private void init() {
        mRecyclerViewSongs = findViewById(R.id.recycler_view);
        mCoordinatorLayout = findViewById(R.id.coordinator_layout);
    }


    private void setUpAdapter() {
        mAdapter = new ItemAdapter(mItemList, this);
        RecyclerView.LayoutManager mLayoutManager =
            new LinearLayoutManager(getApplicationContext());
        mRecyclerViewSongs.setLayoutManager(mLayoutManager);
        mRecyclerViewSongs.setItemAnimator(new DefaultItemAnimator());
        mRecyclerViewSongs.setAdapter(mAdapter);

        ItemTouchHelper.SimpleCallback itemTouchHelperCallback =
            new RecyclerItemTouchHelper(0, ItemTouchHelper.LEFT, this);
        new ItemTouchHelper(itemTouchHelperCallback).attachToRecyclerView(mRecyclerViewSongs);
    }

    private void getItems() {
        Item itemOne = new Item(1, "Item One");
        Item itemTwo = new Item(2, "Item Two");
        Item itemThree = new Item(3, "Item Three");
        mItemList.add(itemOne);
        mItemList.add(itemTwo);
        mItemList.add(itemThree);
        mAdapter.notifyDataSetChanged();
    }

    @Override
    public void onItemSelected(Item item) {
        Toast.makeText(this, "Selected " +item.getTitle(), Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onSwiped(RecyclerView.ViewHolder viewHolder, int direction, int position) {
        if (viewHolder instanceof ItemAdapter.MyViewHolder) {
            String name = mItemList.get(viewHolder.getAdapterPosition()).getTitle();
            final Item deletedItem = mItemList.get(viewHolder.getAdapterPosition());
            final int deletedIndex = viewHolder.getAdapterPosition();
            mAdapter.removeItem(viewHolder.getAdapterPosition());
            Snackbar snackbar = Snackbar
                .make(mCoordinatorLayout, name + " removed from library!", Snackbar.LENGTH_LONG);
            snackbar.setAction("UNDO", new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    mAdapter.restoreItem(deletedItem, deletedIndex);
                }
            });
            snackbar.setActionTextColor(Color.YELLOW);
            snackbar.show();
        }
    }
}
```

In the MainActivity class we setup our adapter and added some items in this method **getItems()**. Further more we are implementing the **RecyclerItemTouchHelper.RecyclerItemTouchHelperListener** to catch whenever the user swipes on the item in the list and handling it on the override method **onSwiped**. It is in this onSwiped method we will write our specific code based on what acction we want it to do, in this case simply delete it when user swipes by calling **mAdapter.removeItem(viewHolder.getAdapterPosition());** and also when user selects undo from our snackbar we restore the item back to the initial position/index using **mAdapter.restoreItem(deletedItem, deletedIndex);**.

It is pretty straight forward and easy to implement. Note: You can change the swipe direction to your prefered direction. I am using LEFT but this can also be changed to swipe from RIGHT by changing this line of code:

`ItemTouchHelper.SimpleCallback itemTouchHelperCallback = new RecyclerItemTouchHelper(0, ItemTouchHelper.LEFT, this);`
TO THIS >>>
`ItemTouchHelper.SimpleCallback itemTouchHelperCallback = new RecyclerItemTouchHelper(0, ItemTouchHelper.RIGHT, this);`

This however will require a design change in the item.xml as currently the delete text and icon are placed on the right. 

And that is it, Now you have a working swipeable view just like gmail. Happy Coding!!!

**Preview**

![](https://images.viblo.asia/5bf4b198-bb71-4c85-b42e-d752e1d279a1.gif)