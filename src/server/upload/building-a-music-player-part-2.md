In the previous part we initiated our project and implemented the permission and also we searched the music files on the device passing them to a list. This is the part two of our Music app tutorial and in this part we will populate our fetched music in a recyclerview, add on click listeners to it and implement on swipe to delete a track. Without further adue lets dive right in.

First create the layout for our songs items.

**item_song**

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
        android:background="@color/bg_row_background">

        <ImageView
            android:id="@+id/delete_icon"
            android:layout_width="@dimen/ic_delete"
            android:layout_height="@dimen/ic_delete"
            android:layout_alignParentEnd="true"
            android:layout_centerVertical="true"
            android:layout_marginEnd="@dimen/padd_10"
            android:src="@android:drawable/ic_menu_delete"/>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerVertical="true"
            android:layout_marginEnd="@dimen/padd_10"
            android:layout_toStartOf="@id/delete_icon"
            android:text="@string/text_delete"
            android:textColor="#fff"
            android:textSize="@dimen/sp_12"/>

    </RelativeLayout>

    <RelativeLayout
        android:id="@+id/view_foreground"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@android:color/white"
        android:padding="@dimen/padd_10">

        <ImageView
            android:id="@+id/thumbnail"
            android:layout_width="@dimen/thumbnail"
            android:layout_height="@dimen/thumbnail"
            android:layout_marginEnd="@dimen/activity_padding_horizontal"
            android:scaleType="fitXY" />


        <TextView
            android:id="@+id/song_title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_toRightOf="@id/thumbnail"
            android:ellipsize="end"
            android:fontFamily="sans-serif-medium"
            android:maxLines="1"
            android:textColor="@color/item_name"
            android:textSize="@dimen/sp_14"/>

        <TextView
            android:id="@+id/song_artist"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@id/song_title"
            android:layout_toRightOf="@id/thumbnail"
            android:layout_marginTop="5dp"
            android:textColor="@color/description"
            android:textSize="@dimen/sp_12"/>

    </RelativeLayout>
</FrameLayout>
```

In the above xml we have created our layout for each music but we did not stop there no, we also added a layout that will act as our swipe to delete interface. More on that later...
While you are at it lets add our values and import our drawable images that will be used in this project.

**dimens.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <dimen name="widget_margin">8dp</dimen>
    <dimen name="activity_padding_horizontal">16dp</dimen>
    <dimen name="padd_10">10dp</dimen>
    <dimen name="padd_20">20dp</dimen>
    <dimen name="ic_delete">30dp</dimen>
    <dimen name="thumbnail">40dp</dimen>

    <dimen name="sp_10">10sp</dimen>
    <dimen name="sp_12">12sp</dimen>
    <dimen name="sp_14">14sp</dimen>
    <dimen name="sp_40">40sp</dimen>
    <dimen name="sp_50">50sp</dimen>
    <dimen name="sp_60">60sp</dimen>
    <dimen name="sp_70">70sp</dimen>

</resources>
```

**colors.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#D50000</color>
    <color name="colorPrimaryDark">#00574B</color>
    <color name="colorAccent">#D81B60</color>
    <color name="bg_row_background">#D50000</color>
    <color name="item_name">#535353</color>
    <color name="description">#a9a9a9</color>
</resources>
```

**strings.xml**

```
<resources>
    <string name="app_name">Music Player App</string>
    <string name="appwidget_text">EXAMPLE</string>
    <string name="add_widget">Add widget</string>
    <string name="date_count_format">%1$d @%2$s</string>
    <string name="text_delete">DELETE</string>
    <string name="drawer_open">Open navigation drawer</string>
    <string name="drawer_close">Close navigation drawer</string>
    <string name="text_menu">Menu</string>
    <string name="text_saved_to_playlist">Saved to Favourites</string>
</resources>
```

Next add the image file below to your drawable folder.

**drawable**

![](https://images.viblo.asia/9f98df9d-6e27-42d0-bdbf-7994b66b5e59.jpg)

Now we will create an Adapter for populating our song into a recyclerview.

**SongAdapter**

```
import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.pane.musicplayerapp.R;
import com.example.pane.musicplayerapp.model.Song;

import java.util.ArrayList;
import java.util.List;

public class SongAdapter extends RecyclerView.Adapter<SongAdapter.MyViewHolder> implements
    Filterable {
    private List<Song> mSongList;
    private List<Song> mSongListFiltered;
    private Context mContext;
    private SongAdapterListener listener;

    public SongAdapter(Context context, List<Song> songList, SongAdapterListener listener) {
        this.mContext = context;
        this.listener = listener;
        this.mSongList = songList;
        this.mSongListFiltered = songList;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
            .inflate(R.layout.item_song, parent, false);
        return new MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        Song song = mSongListFiltered.get(position);
        holder.title.setText(song.getTitle());
        holder.artist.setText(song.getArtist());
        Glide.with(mContext).load(song.getThumbnail()).placeholder(R.drawable
            .music_art).error(R.drawable.music_art)
            .crossFade().centerCrop().into(holder.thumbnail);
    }

    @Override
    public int getItemCount() {
        return mSongListFiltered.size();
    }

    public void removeItem(int position) {
        mSongList.remove(position);
        // notify the item removed by position
        // to perform recycler view delete animations
        // NOTE: don't call notifyDataSetChanged()
        notifyItemRemoved(position);
    }

    public void restoreItem(Song item, int position) {
        mSongList.add(position, item);
        // notify item added by position
        notifyItemInserted(position);
    }

    @Override
    public Filter getFilter() {
        return new Filter() {
            @Override
            protected FilterResults performFiltering(CharSequence charSequence) {
                String charString = charSequence.toString();
                if (charString.isEmpty()) {
                    mSongListFiltered = mSongList;
                } else {
                    List<Song> filteredList = new ArrayList<>();
                    for (Song row : mSongList) {
                        // name match condition. this might differ depending on your requirement
                        // here we are looking for name or phone number match
                        if (row.getTitle().toLowerCase().contains(charString.toLowerCase()) || row
                            .getArtist().toLowerCase().contains(charSequence)) {
                            filteredList.add(row);
                        }
                    }
                    mSongListFiltered = filteredList;
                }
                FilterResults filterResults = new FilterResults();
                filterResults.values = mSongListFiltered;
                return filterResults;
            }

            @Override
            protected void publishResults(CharSequence charSequence, FilterResults filterResults) {
                mSongListFiltered = (ArrayList<Song>) filterResults.values;
                notifyDataSetChanged();
            }
        };
    }

    public interface SongAdapterListener {
        void onSongSelected(Song song);
    }

    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView title, artist;
        public RelativeLayout viewBackground, viewForeground;
        public ImageView thumbnail;

        public MyViewHolder(View view) {
            super(view);
            title = view.findViewById(R.id.song_title);
            artist = view.findViewById(R.id.song_artist);
            viewBackground = view.findViewById(R.id.view_background);
            viewForeground = view.findViewById(R.id.view_foreground);
            thumbnail = view.findViewById(R.id.thumbnail);
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    // send selected contact in callback
                    listener.onSongSelected(mSongListFiltered.get(getAdapterPosition()));
                }
            });
        }
    }
}
```

Open the activity_main layout and add a recyclerview.

**activity_main**

```
<?xml version="1.0" encoding="utf-8"?>

<android.support.v4.widget.DrawerLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/drawer_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ListView
        android:id="@+id/navList"
        android:layout_width="200dp"
        android:layout_height="match_parent"
        android:layout_gravity="left|start"
        android:background="#ffeeeeee"/>

<android.support.design.widget.CoordinatorLayout
    android:id="@+id/coordinator_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <LinearLayout
        android:layout_width="fill_parent"
        android:layout_height="fill_parent"
        android:background="@android:color/white"
        android:orientation="vertical"
        tools:context=".MainActivity">

        <android.support.v7.widget.RecyclerView
            android:id="@+id/recycler_view"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:scrollbars="vertical"/>

    </LinearLayout>
</android.support.design.widget.CoordinatorLayout>
</android.support.v4.widget.DrawerLayout>
```

Next lets create our RecyclerItemTouchHelper for the swipe gesture. Create a new package and name it "helper" where inside we will create the RecyclerItemTouchHelper.

**RecyclerItemTouchHelper**

```
import android.graphics.Canvas;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.View;

import com.example.pane.musicplayerapp.adapter.SongAdapter;

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
            final View foregroundView = ((SongAdapter.MyViewHolder) viewHolder).viewForeground;
            getDefaultUIUtil().onSelected(foregroundView);
        }
    }

    @Override
    public void onChildDrawOver(Canvas c, RecyclerView recyclerView,
                                RecyclerView.ViewHolder viewHolder, float dX, float dY,
                                int actionState, boolean isCurrentlyActive) {
        final View foregroundView = ((SongAdapter.MyViewHolder) viewHolder).viewForeground;
        getDefaultUIUtil().onDrawOver(c, recyclerView, foregroundView, dX, dY,
            actionState, isCurrentlyActive);
    }

    @Override
    public void clearView(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder) {
        final View foregroundView = ((SongAdapter.MyViewHolder) viewHolder).viewForeground;
        getDefaultUIUtil().clearView(foregroundView);
    }

    @Override
    public void onChildDraw(Canvas c, RecyclerView recyclerView,
                            RecyclerView.ViewHolder viewHolder, float dX, float dY,
                            int actionState, boolean isCurrentlyActive) {
        final View foregroundView = ((SongAdapter.MyViewHolder) viewHolder).viewForeground;
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

Next open the MainActivity.class and create your adapter and set it to the recyclerview we created.

```
    private RecyclerView mRecyclerViewSongs;
    private SongAdapter mAdapter;
    private CoordinatorLayout mCoordinatorLayout;
```
    
Next add this to the init() method.

```
mRecyclerViewSongs = findViewById(R.id.recycler_view);
mCoordinatorLayout = findViewById(R.id.coordinator_layout);
```

Next we need to set up our adapter and listeners.

```
private void setUpAdapter() {
    mAdapter = new SongAdapter(getApplicationContext(), mSongList, this);
    RecyclerView.LayoutManager mLayoutManager =
        new LinearLayoutManager(getApplicationContext());
    mRecyclerViewSongs.setLayoutManager(mLayoutManager);
    mRecyclerViewSongs.setItemAnimator(new DefaultItemAnimator());
    mRecyclerViewSongs.setAdapter(mAdapter);
}
```

```
private void setUpListeners() {
    ItemTouchHelper.SimpleCallback itemTouchHelperCallback =
        new RecyclerItemTouchHelper(0, ItemTouchHelper.LEFT, this);
    new ItemTouchHelper(itemTouchHelperCallback).attachToRecyclerView(mRecyclerViewSongs);
}
```

Now lets make the MainActivity implements the listeners for the swipe gesture and adapter listener.

```
public class MainActivity extends AppCompatActivity implements
    RecyclerItemTouchHelper.RecyclerItemTouchHelperListener, SongAdapter.SongAdapterListener {.....
```

import the overriding methods and edit onSwipe as below..

```
@Override
public void onSwiped(RecyclerView.ViewHolder viewHolder, int direction, int position) {
    if (viewHolder instanceof SongAdapter.MyViewHolder) {
        // get the removed item name to display it in snack bar
        String name = mSongList.get(viewHolder.getAdapterPosition()).getTitle();
        // backup of removed item for undo purpose
        final Song deletedItem = mSongList.get(viewHolder.getAdapterPosition());
        final int deletedIndex = viewHolder.getAdapterPosition();
        // remove the item from recycler view
        mAdapter.removeItem(viewHolder.getAdapterPosition());
        // showing snack bar with Undo option
        Snackbar snackbar = Snackbar
            .make(mCoordinatorLayout, name + " removed from library!", Snackbar.LENGTH_LONG);
        snackbar.setAction("UNDO", new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // undo is selected, restore the deleted item
                mAdapter.restoreItem(deletedItem, deletedIndex);
            }
        });
        snackbar.setActionTextColor(Color.YELLOW);
        snackbar.show();
    }
}
```

onSongSelected we will leave for now.

```
@Override
public void onSongSelected(Song contact) {
    // TODO: 2/28/19 we will open another activity that will play selected song here.. 
}
```

Here is the final MainActivity after completed all above code.

**MainActivity**

```
import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.design.widget.CoordinatorLayout;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.View;

import com.example.pane.musicplayerapp.adapter.SongAdapter;
import com.example.pane.musicplayerapp.helper.RecyclerItemTouchHelper;
import com.example.pane.musicplayerapp.model.Song;
import com.example.pane.musicplayerapp.utils.PermissionsUtil;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class MainActivity extends AppCompatActivity implements
    RecyclerItemTouchHelper.RecyclerItemTouchHelperListener, SongAdapter.SongAdapterListener {
    private static Uri sArtworkUri = Uri.parse("content://media/external/audio/albumart");
    private final int STORAGE_PERMISSION_ID = 0;
    private List<Song> mSongList = new ArrayList<>();
    private RecyclerView mRecyclerViewSongs;
    private SongAdapter mAdapter;
    private CoordinatorLayout mCoordinatorLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        init();
        setUpAdapter();
        setUpListeners();
    }

    private void init() {
        if (!checkStorePermission(STORAGE_PERMISSION_ID)) {
            showRequestPermission(STORAGE_PERMISSION_ID);
        }
        mRecyclerViewSongs = findViewById(R.id.recycler_view);
        mCoordinatorLayout = findViewById(R.id.coordinator_layout);
    }

    private void setUpAdapter() {
        mAdapter = new SongAdapter(getApplicationContext(), mSongList, this);
        RecyclerView.LayoutManager mLayoutManager =
            new LinearLayoutManager(getApplicationContext());
        mRecyclerViewSongs.setLayoutManager(mLayoutManager);
        mRecyclerViewSongs.setItemAnimator(new DefaultItemAnimator());
        mRecyclerViewSongs.setAdapter(mAdapter);
    }

    private void setUpListeners() {
        ItemTouchHelper.SimpleCallback itemTouchHelperCallback =
            new RecyclerItemTouchHelper(0, ItemTouchHelper.LEFT, this);
        new ItemTouchHelper(itemTouchHelperCallback).attachToRecyclerView(mRecyclerViewSongs);
    }

    public void getSongList() {
        //retrieve item_song info
        ContentResolver musicResolver = getContentResolver();
        Uri musicUri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        Cursor musicCursor = musicResolver.query(musicUri, null, null, null, null);
        if (musicCursor != null && musicCursor.moveToFirst()) {
            //get columns
            int titleColumn = musicCursor.getColumnIndex
                (android.provider.MediaStore.Audio.Media.TITLE);
            int idColumn = musicCursor.getColumnIndex
                (android.provider.MediaStore.Audio.Media._ID);
            int albumID = musicCursor.getColumnIndex
                (MediaStore.Audio.Media.ALBUM_ID);
            int artistColumn = musicCursor.getColumnIndex
                (android.provider.MediaStore.Audio.Media.ARTIST);
            int songLink = musicCursor.getColumnIndex
                (MediaStore.Audio.Media.DATA);
            //add songs to list
            do {
                long thisId = musicCursor.getLong(idColumn);
                String thisTitle = musicCursor.getString(titleColumn);
                String thisArtist = musicCursor.getString(artistColumn);
                Uri thisSongLink = Uri.parse(musicCursor.getString(songLink));
                long some = musicCursor.getLong(albumID);
                Uri uri = ContentUris.withAppendedId(sArtworkUri, some);
                mSongList.add(new Song(thisId, thisTitle, thisArtist, uri.toString(),
                    thisSongLink.toString()));
            }
            while (musicCursor.moveToNext());
        }
        assert musicCursor != null;
        musicCursor.close();
        // Sort music alphabetically
        Collections.sort(mSongList, new Comparator<Song>() {
            public int compare(Song a, Song b) {
                return a.getTitle().compareTo(b.getTitle());
            }
        });
        mAdapter.notifyDataSetChanged();
    }

    private boolean checkStorePermission(int permission) {
        if (permission == STORAGE_PERMISSION_ID) {
            return PermissionsUtil.checkPermissions(this,
                Manifest.permission.WRITE_EXTERNAL_STORAGE);
        } else {
            return true;
        }
    }

    private void showRequestPermission(int requestCode) {
        String[] permissions;
        if (requestCode == STORAGE_PERMISSION_ID) {
            permissions = new String[]{
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE
            };
        } else {
            permissions = new String[]{
                Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE
            };
        }
        PermissionsUtil.requestPermissions(this, requestCode, permissions);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        if (requestCode == 0) {
            for (int i = 0, len = permissions.length; i < len; i++) {
                if (grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                    getSongList();
                    return;
                }
            }
        }
    }

    @Override
    public void onSwiped(RecyclerView.ViewHolder viewHolder, int direction, int position) {
        if (viewHolder instanceof SongAdapter.MyViewHolder) {
            // get the removed item name to display it in snack bar
            String name = mSongList.get(viewHolder.getAdapterPosition()).getTitle();
            // backup of removed item for undo purpose
            final Song deletedItem = mSongList.get(viewHolder.getAdapterPosition());
            final int deletedIndex = viewHolder.getAdapterPosition();
            // remove the item from recycler view
            mAdapter.removeItem(viewHolder.getAdapterPosition());
            // showing snack bar with Undo option
            Snackbar snackbar = Snackbar
                .make(mCoordinatorLayout, name + " removed from library!", Snackbar.LENGTH_LONG);
            snackbar.setAction("UNDO", new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    // undo is selected, restore the deleted item
                    mAdapter.restoreItem(deletedItem, deletedIndex);
                }
            });
            snackbar.setActionTextColor(Color.YELLOW);
            snackbar.show();
        }
    }

    @Override
    public void onSongSelected(Song song) {
        // TODO: 2/28/19 we will open another activity that will play selected song here.. 
    }
}
```

Now to check the flow again let's uninstall the previous app and run this. Check video below for demo of laoding the songs and deleting a track.

**DEMO**

![](https://images.viblo.asia/423c6597-931c-4dfc-8830-2f2fe7697aca.gif)

In the next [part](https://viblo.asia/p/building-a-music-player-part-3-LzD5dJ3wZjY) we will implement the media player and add media features. Happy Coding.