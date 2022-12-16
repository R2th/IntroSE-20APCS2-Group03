In the previous part we populated our fetched music in a recyclerview, add on click listeners to it and implement on swipe to delete a track. In this part we will continue the project adding media functionalities and complete previous fetaures such as deleting a track and so on. Without further adue lets dive right in.

First open the Manifest and add this permission.

**Mainfest**

`<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />`

Next open the MainActivity and fix a bug from previous code. Sometimes music doesnt display so lets add getSongList() to onCreate() method.

**MainActivity**

```
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    init();
    setUpAdapter();
    setUpListeners();
   //Add this
    getSongList();
}
```
    
Next lets add deleteMusic method. Note that this will be commented as it will delete the file on the device. If you want this result you can uncomment the line where this method is called.
    
```
public boolean deleteMusic(final File file) {
    final String where = MediaStore.MediaColumns.DATA + "=?";
    final String[] selectionArgs = new String[]{
        file.getAbsolutePath()
    };
    final ContentResolver contentResolver = MainActivity.this.getContentResolver();
    final Uri filesUri = MediaStore.Files.getContentUri("external");
    contentResolver.delete(filesUri, where, selectionArgs);
    if (file.exists()) {
        contentResolver.delete(filesUri, where, selectionArgs);
    }
    return !file.exists();
}
```
    
Next you can call this methoid when user swipes a track to delete. Update your onSwipe(....)
    
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
    //To delete song from device uncomment below code
//            File file = new File(deletedItem.getSongLink());
//            deleteMusic(file);
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
We will handle the undo later. Next lets edit the **activity_main** layout to include some media buttons and a layout to hold these buttons. We will try to archieve the design of the image below.

![](https://images.viblo.asia/c69958b2-5c62-4dc3-b475-5c4318c3e3cc.png)

Here we will provide basic play and pause function and next and previous while also adding a slider to skip through out song. Later on in the next parts we will design a screen for single now palying view and add a database for saving playlists, most played and so on.

**activity_main**

```
<?xml version="1.0" encoding="utf-8"?>

<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <android.support.design.widget.CoordinatorLayout
        android:id="@+id/coordinator_layout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@+id/layout_media"
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

    <LinearLayout
        android:id="@+id/layout_media"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:background="@color/colorPrimary"
        android:orientation="vertical"
        android:visibility="gone">

        <!-- Progress Bar/Seek bar -->
        <SeekBar
            android:id="@+id/songProgressBar"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:theme="@style/MySeekBarTheme"/>

        <LinearLayout
            android:id="@+id/timerDisplay"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:layout_marginLeft="@dimen/dp_5"
            android:layout_marginRight="@dimen/dp_5">

            <!-- Current Duration Label -->
            <TextView
                android:id="@+id/songCurrentDurationLabel"
                android:layout_width="fill_parent"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:gravity="start"
                android:textColor="@color/white"/>

            <!-- Total Duration Label -->
            <TextView
                android:id="@+id/songTotalDurationLabel"
                android:layout_width="fill_parent"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:gravity="end"
                android:textColor="@color/white"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:orientation="horizontal">

            <ImageView
                android:id="@+id/iv_artwork"
                android:layout_width="@dimen/dp_50"
                android:layout_height="@dimen/dp_50"
                android:layout_margin="@dimen/dp_5"
                android:scaleType="fitXY"/>

            <TextView
                android:id="@+id/tv_title"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_gravity="center"
                android:layout_margin="@dimen/dp_5"
                android:layout_weight="1"
                android:textAlignment="center"
                android:textColor="@color/white"/>

            <LinearLayout
                android:layout_width="wrap_content"
                android:layout_height="wrap_content">

                <ImageView
                    android:id="@+id/iv_previous"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_gravity="center"
                    android:layout_margin="@dimen/dp_5"
                    android:src="@android:drawable/ic_media_previous"/>

                <ImageView
                    android:id="@+id/iv_play"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_gravity="center"
                    android:layout_margin="@dimen/dp_5"/>

                <ImageView
                    android:id="@+id/iv_next"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_gravity="center"
                    android:layout_margin="@dimen/dp_5"
                    android:src="@android:drawable/ic_media_next"/>
            </LinearLayout>

        </LinearLayout>
    </LinearLayout>
</RelativeLayout>
```

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
    <dimen name="dp_50">50dp</dimen>
    <dimen name="dp_5">5dp</dimen>

</resources>
```

You will notice that i have set the visibility of the layout holding the media buttons to "gone". This will be later set to visible when a song is selected and playing. More on that later. Now that our layout is ready we can open our class and add our features by using the MediaPlayer class provided by android.

**MainActivity**

We need to add all our objects (Buttons, Slider.....)

```
private LinearLayout mMediaLayout;
private TextView mTvTitle;
private ImageView mIvArtwork;
private ImageView mIvPlay;
private ImageView mIvPrevious;
private ImageView mIvNext;
private boolean isPlaying = false;
private SeekBar songProgressBar;
private MediaPlayer mMediaPlayer;
private TextView mTvCurrentDuration;
private TextView mTvTotalDuration;
private Utilities utils;
private int currentSongIndex;
// Handler to update UI timer, progress bar etc,.
private Handler mHandler = new Handler();
```
    
    I have added an Handler. This will be used to update the slider and progress when user slides through a track. More on this later. Next lets update our init() and initialise our objects but before that lets implements our listners. We will add 
    View.OnClickListener, MediaPlayer.OnCompletionListener,AudioManager.OnAudioFocusChangeListener and SeekBar.OnSeekBarChangeListener. Import the overiding methods and continue.
    
    Next lets create a utility class "TimeUtil" for formating our time properties. Add this class to the utils folder.
    
    **TimeUtil**
    
```
public class TimeUtil {
public String milliSecondsToTimer(long milliseconds) {
    String finalTimerString = "";
    String secondsString;
    // Convert total duration into time
    int hours = (int) (milliseconds / (1000 * 60 * 60));
    int minutes = (int) (milliseconds % (1000 * 60 * 60)) / (1000 * 60);
    int seconds = (int) ((milliseconds % (1000 * 60 * 60)) % (1000 * 60) / 1000);
    // Add hours if there
    if (hours > 0) {
        finalTimerString = hours + ":";
    }
    // Prepending 0 to seconds if it is one digit
    if (seconds < 10) {
        secondsString = "0" + seconds;
    } else {
        secondsString = "" + seconds;
    }
    finalTimerString = finalTimerString + minutes + ":" + secondsString;
    // return timer string
    return finalTimerString;
}

public int getProgressPercentage(long currentDuration, long totalDuration) {
    Double percentage;
    long currentSeconds = (int) (currentDuration / 1000);
    long totalSeconds = (int) (totalDuration / 1000);
    // calculating percentage
    percentage = (((double) currentSeconds) / totalSeconds) * 100;
    // return percentage
    return percentage.intValue();
}

public int progressToTimer(int progress, int totalDuration) {
    int currentDuration = 0;
    totalDuration = totalDuration / 1000;
    currentDuration = (int) ((((double) progress) / 100) * totalDuration);
    // return current duration in milliseconds
    return currentDuration * 1000;
}
}
```

Now the **init()** in the MainActivity.......
    
```
private void init() {
if (!checkStorePermission(STORAGE_PERMISSION_ID)) {
    showRequestPermission(STORAGE_PERMISSION_ID);
}
mMediaPlayer = new MediaPlayer();
utils = new Utilities();
mRecyclerViewSongs = findViewById(R.id.recycler_view);
mCoordinatorLayout = findViewById(R.id.coordinator_layout);
mMediaLayout = findViewById(R.id.layout_media);
mIvArtwork = findViewById(R.id.iv_artwork);
mIvPlay = findViewById(R.id.iv_play);
mIvPrevious = findViewById(R.id.iv_previous);
mIvNext = findViewById(R.id.iv_next);
mTvTitle = findViewById(R.id.tv_title);
mTvCurrentDuration = findViewById(R.id.songCurrentDurationLabel);
mTvTotalDuration = findViewById(R.id.songTotalDurationLabel);
songProgressBar = findViewById(R.id.songProgressBar);
}
```

Next we will update our **setUpListeners()**

```
private void setUpListeners() {
    ItemTouchHelper.SimpleCallback itemTouchHelperCallback =
        new RecyclerItemTouchHelper(0, ItemTouchHelper.LEFT, this);
    new ItemTouchHelper(itemTouchHelperCallback).attachToRecyclerView(mRecyclerViewSongs);
    mIvPlay.setOnClickListener(this);
    mIvPrevious.setOnClickListener(this);
    mIvNext.setOnClickListener(this);
    songProgressBar.setOnSeekBarChangeListener(this);
    mMediaPlayer.setOnCompletionListener(this);
}
```

Next lets go to the onClick(View v) method and update it so that each button when clicked will do a specific action.

```
@Override
public void onClick(View v) {
    switch (v.getId()) {
        case R.id.iv_play:
            playMusic();
            break;
        case R.id.iv_previous:
            playPreviousSong();
            break;
        case R.id.iv_next:
            playNextSong();
            break;
        default:
            break;
    }
}
```

Below are the methods for playing/pause a track, skip to next track and previous. We change the image background of the play button to pause when user plays a track and to play when pause.

**playMusic()**

```
private void playMusic() {
    if (isPlaying) {
        mIvPlay.setBackground(getResources().getDrawable(android.R.drawable.ic_media_pause));
        isPlaying = false;
        mMediaPlayer.start();
        return;
    }
    mIvPlay.setBackground(getResources().getDrawable(android.R.drawable.ic_media_play));
    mMediaPlayer.pause();
    isPlaying = true;
}
```

Below method is responsible for playing a song and updating the titile, changing the album artwork by loading the image using Glide.

**playSong()**

```
public void playSong(Song song) {
        try {
            mMediaPlayer.reset();
            mMediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
            mMediaPlayer
                .setDataSource(getApplicationContext(), Uri.parse(song.getSongLink()));
            mMediaPlayer.prepare();
            mMediaPlayer.start();
            // Displaying Song title
            isPlaying = true;
            mIvPlay.setBackground(getResources().getDrawable(android.R.drawable.ic_media_pause));
            mMediaLayout.setVisibility(View.VISIBLE);
            mTvTitle.setText(song.getTitle());
            Glide.with(this).load(song.getThumbnail()).placeholder(R.drawable
                .music_art).error(R.drawable.music_art)
                .crossFade().centerCrop().into(mIvArtwork);
            // set Progress bar values
            songProgressBar.setProgress(0);
            songProgressBar.setMax(100);
            // Updating progress bar
            updateProgressBar();
        } catch (IllegalArgumentException | IllegalStateException | IOException e) {
            e.printStackTrace();
        }
    }
```

For skipping to the next song.

**playNextSong()**

```
private void playNextSong() {
    if (currentSongIndex < (mSongList.size() - 1)) {
        Song song = mSongList.get(currentSongIndex + 1);
        playSong(song);
        currentSongIndex = currentSongIndex + 1;
    } else {
        playSong(mSongList.get(0));
        currentSongIndex = 0;
    }
}
```

For the previous song.

**playPreviousSong()**

```
private void playPreviousSong() {
    if (currentSongIndex > 0) {
        Song song = mSongList.get(currentSongIndex - 1);
        playSong(song);
        currentSongIndex = currentSongIndex - 1;
    } else {
        Song song = mSongList.get(mSongList.size() - 1);
        playSong(song);
        currentSongIndex = mSongList.size() - 1;
    }
}
```

Now before we further we need to complete our Handler previously mention using Runnable.

```
private Runnable mUpdateTimeTask = new Runnable() {
    public void run() {
        if (mMediaPlayer == null) return;
        long totalDuration = mMediaPlayer.getDuration();
        long currentDuration = mMediaPlayer.getCurrentPosition();
        mTvTotalDuration
            .setText(String.format("%s", timeUtil.milliSecondsToTimer(totalDuration)));
        mTvCurrentDuration
            .setText(String.format("%s", timeUtil.milliSecondsToTimer(currentDuration)));
        int progress = (timeUtil.getProgressPercentage(currentDuration, totalDuration));
        songProgressBar.setProgress(progress);
        mHandler.postDelayed(this, 100);
    }
};
```

Now that we have the handler we can use it to update our progressBar.

**updateProgressBar()**

```
public void updateProgressBar() {
    mHandler.postDelayed(mUpdateTimeTask, 100);
}
```

Now we can update our overriden methods. First lets update the onCompletion(MediaPlayer mp) method. This method is called whena track finishes so we will want to play the next track if there is any of course.

**onCompletion()**

```
@Override
public void onCompletion(MediaPlayer mp) {
    if (currentSongIndex < (mSongList.size() - 1)) {
        playSong(mSongList.get(currentSongIndex + 1));
        currentSongIndex = currentSongIndex + 1;
    } else {
        playSong(mSongList.get(0));
        currentSongIndex = 0;
    }
}
```

Next lets update the overriden methods of the seekbar.

**onStartTrackingTouch()**

```
@Override
public void onStartTrackingTouch(SeekBar seekBar) {
    mHandler.removeCallbacks(mUpdateTimeTask);
}
```

**onStopTrackingTouch()**

```
@Override
public void onStopTrackingTouch(SeekBar seekBar) {
    mHandler.removeCallbacks(mUpdateTimeTask);
    int totalDuration = mMediaPlayer.getDuration();
    int currentPosition = timeUtil.progressToTimer(seekBar.getProgress(), totalDuration);
    mMediaPlayer.seekTo(currentPosition);
    updateProgressBar();
}
```

Here is the full MainActivity class after all methods is added.

**MainActivity**

```
import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Color;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
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
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.pane.musicplayerapp.adapter.SongAdapter;
import com.example.pane.musicplayerapp.helper.RecyclerItemTouchHelper;
import com.example.pane.musicplayerapp.model.Song;
import com.example.pane.musicplayerapp.utils.PermissionsUtil;
import com.example.pane.musicplayerapp.utils.TimeUtil;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class MainActivity extends AppCompatActivity implements
    RecyclerItemTouchHelper.RecyclerItemTouchHelperListener, SongAdapter.SongAdapterListener,
    View.OnClickListener, MediaPlayer.OnCompletionListener,
    AudioManager.OnAudioFocusChangeListener, SeekBar.OnSeekBarChangeListener {
    private static Uri sArtworkUri = Uri.parse("content://media/external/audio/albumart");
    private final int STORAGE_PERMISSION_ID = 0;
    private List<Song> mSongList = new ArrayList<>();
    private RecyclerView mRecyclerViewSongs;
    private SongAdapter mAdapter;
    private CoordinatorLayout mCoordinatorLayout;
    private LinearLayout mMediaLayout;
    private TextView mTvTitle;
    private ImageView mIvArtwork;
    private ImageView mIvPlay;
    private ImageView mIvPrevious;
    private ImageView mIvNext;
    private boolean isPlaying = false;
    private SeekBar songProgressBar;
    private MediaPlayer mMediaPlayer;
    private TextView mTvCurrentDuration;
    private TextView mTvTotalDuration;
    private TimeUtil timeUtil;
    private int currentSongIndex;
    // Handler to update UI timer, progress bar etc,.
    private Handler mHandler = new Handler();
    private Runnable mUpdateTimeTask = new Runnable() {
        public void run() {
            if (mMediaPlayer == null) return;
            long totalDuration = mMediaPlayer.getDuration();
            long currentDuration = mMediaPlayer.getCurrentPosition();
            mTvTotalDuration
                .setText(String.format("%s", timeUtil.milliSecondsToTimer(totalDuration)));
            mTvCurrentDuration
                .setText(String.format("%s", timeUtil.milliSecondsToTimer(currentDuration)));
            int progress = (timeUtil.getProgressPercentage(currentDuration, totalDuration));
            songProgressBar.setProgress(progress);
            mHandler.postDelayed(this, 100);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        init();
        setUpAdapter();
        setUpListeners();
        getSongList();
    }

    private void init() {
        if (!checkStorePermission(STORAGE_PERMISSION_ID)) {
            showRequestPermission(STORAGE_PERMISSION_ID);
        }
        mMediaPlayer = new MediaPlayer();
        timeUtil = new TimeUtil();
        mRecyclerViewSongs = findViewById(R.id.recycler_view);
        mCoordinatorLayout = findViewById(R.id.coordinator_layout);
        mMediaLayout = findViewById(R.id.layout_media);
        mIvArtwork = findViewById(R.id.iv_artwork);
        mIvPlay = findViewById(R.id.iv_play);
        mIvPrevious = findViewById(R.id.iv_previous);
        mIvNext = findViewById(R.id.iv_next);
        mTvTitle = findViewById(R.id.tv_title);
        mTvCurrentDuration = findViewById(R.id.songCurrentDurationLabel);
        mTvTotalDuration = findViewById(R.id.songTotalDurationLabel);
        songProgressBar = findViewById(R.id.songProgressBar);
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
        mIvPlay.setOnClickListener(this);
        mIvPrevious.setOnClickListener(this);
        mIvNext.setOnClickListener(this);
        songProgressBar.setOnSeekBarChangeListener(this);
        mMediaPlayer.setOnCompletionListener(this);
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
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE);
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
            //To delete song from device uncomment below code
//            File file = new File(deletedItem.getSongLink());
//            deleteMusic(file);
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
        playSong(song);
        currentSongIndex = mSongList.indexOf(song);
    }

    public boolean deleteMusic(final File file) {
        final String where = MediaStore.MediaColumns.DATA + "=?";
        final String[] selectionArgs = new String[]{
            file.getAbsolutePath()
        };
        final ContentResolver contentResolver = MainActivity.this.getContentResolver();
        final Uri filesUri = MediaStore.Files.getContentUri("external");
        contentResolver.delete(filesUri, where, selectionArgs);
        if (file.exists()) {
            contentResolver.delete(filesUri, where, selectionArgs);
        }
        return !file.exists();
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.iv_play:
                playMusic();
                break;
            case R.id.iv_previous:
                playPreviousSong();
                break;
            case R.id.iv_next:
                playNextSong();
                break;
            default:
                break;
        }
    }

    private void playMusic() {
        if (isPlaying) {
            mIvPlay.setBackground(getResources().getDrawable(android.R.drawable.ic_media_pause));
            isPlaying = false;
            mMediaPlayer.start();
            return;
        }
        mIvPlay.setBackground(getResources().getDrawable(android.R.drawable.ic_media_play));
        mMediaPlayer.pause();
        isPlaying = true;
    }

    public void playSong(Song song) {
        try {
            mMediaPlayer.reset();
            mMediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
            mMediaPlayer
                .setDataSource(getApplicationContext(), Uri.parse(song.getSongLink()));
            mMediaPlayer.prepare();
            mMediaPlayer.start();
            // Displaying Song title
            isPlaying = true;
            mIvPlay.setBackground(getResources().getDrawable(android.R.drawable.ic_media_pause));
            mMediaLayout.setVisibility(View.VISIBLE);
            mTvTitle.setText(song.getTitle());
            Glide.with(this).load(song.getThumbnail()).placeholder(R.drawable
                .music_art).error(R.drawable.music_art)
                .crossFade().centerCrop().into(mIvArtwork);
            // set Progress bar values
            songProgressBar.setProgress(0);
            songProgressBar.setMax(100);
            // Updating progress bar
            updateProgressBar();
        } catch (IllegalArgumentException | IllegalStateException | IOException e) {
            e.printStackTrace();
        }
    }

    private void playNextSong() {
        if (currentSongIndex < (mSongList.size() - 1)) {
            Song song = mSongList.get(currentSongIndex + 1);
            playSong(song);
            currentSongIndex = currentSongIndex + 1;
        } else {
            playSong(mSongList.get(0));
            currentSongIndex = 0;
        }
    }

    private void playPreviousSong() {
        if (currentSongIndex > 0) {
            Song song = mSongList.get(currentSongIndex - 1);
            playSong(song);
            currentSongIndex = currentSongIndex - 1;
        } else {
            Song song = mSongList.get(mSongList.size() - 1);
            playSong(song);
            currentSongIndex = mSongList.size() - 1;
        }
    }

    public void updateProgressBar() {
        mHandler.postDelayed(mUpdateTimeTask, 100);
    }

    @Override
    public void onAudioFocusChange(int focusChange) {
    }

    @Override
    public void onCompletion(MediaPlayer mp) {
        if (currentSongIndex < (mSongList.size() - 1)) {
            playSong(mSongList.get(currentSongIndex + 1));
            currentSongIndex = currentSongIndex + 1;
        } else {
            playSong(mSongList.get(0));
            currentSongIndex = 0;
        }
    }

    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {
        mHandler.removeCallbacks(mUpdateTimeTask);
    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
        mHandler.removeCallbacks(mUpdateTimeTask);
        int totalDuration = mMediaPlayer.getDuration();
        int currentPosition = timeUtil.progressToTimer(seekBar.getProgress(), totalDuration);
        mMediaPlayer.seekTo(currentPosition);
        updateProgressBar();
    }
}
```

Next, Previous, Play and Pause have all been implemented. As you can also tell from the onCompletion() method, the next track will be played after a track is completed and when the last music is completed it plays the first track again. This can be the loop or replayAll case but for now lets leave it as such.

Now lets run the app.

**Demo**

![](https://images.viblo.asia/c74795fb-a9d2-4d24-ba89-8f024fbae7e9.gif)

**Brief**

In this part i have implemented the media features and tried to explain how the mediaplayer works. However this is not the best or ideal way of implementing this. In the next part we will create a Service class that will have the MediaBrowserServiceCompat and implements MediaPlayer.OnCompletionListener, AudioManager.OnAudioFocusChangeListener. This class will handle all playback features in a more robust and clean way. Because there are other media players on the users device it is only reasonable to implement ours in a professional way. For example the music should pause when other apps require the audio feature of the device. We can also have our media controls on the screen when its locked or on the notification drawer so user can still control or jump to the current track by clicking on the notification bar.