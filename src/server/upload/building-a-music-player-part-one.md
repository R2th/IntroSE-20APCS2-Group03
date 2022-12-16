# Introduction
In this tutorial we will be developing a simple but well designed music player. Something like Google Music and it will be in various parts. Without further adue lets dive right in.
First lets open Andropid Studio and create a new project and name it MusicPlayerApp then leave everything else default.
Next we will create our permission class. This is very important as the app will crash on devices with OS 5 and above without permission request from the users. So first lets create a package "utils" and into this package a class called PermissionUtil.

**PermissionUtil**

```
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;

public class PermissionsUtil {
    public static boolean checkPermissions(Context context, String... permissions) {
        for (String permission : permissions) {
            if (!checkPermission(context, permission)) {
                return false;
            }
        }
        return true;
    }

    public static boolean checkPermission(Context context, String permission) {
        return ActivityCompat.checkSelfPermission(context, permission)
            == PackageManager.PERMISSION_GRANTED;
    }

    public static void requestPermissions(Activity activity, int requestCode,
                                          String... permissions) {
        ActivityCompat.requestPermissions(activity, permissions, requestCode);
    }
}
```

This class will be used to prompt users for storage permission when the app is launched. Now that we have that over with lets import our libraries in the graddle file.

**build.gradle**

```
implementation 'com.android.support:recyclerview-v7:28.0.0'

implementation 'com.android.support:design:28.0.0'

implementation 'com.github.bumptech.glide:glide:3.7.0'

implementation 'com.j256.ormlite:ormlite-android:4.48'
```

We have now imported libraries for RecyclerView support, Glide to load our music art covers and ormlite as the database for saving our favourites and playlist. Next open the MainActivity class and get all songs on device by making a search for supported files. But first, we need to follow some steps to ensure our app runs as intented. First would be asking for permissions and when permision is granted we can go ahead and sync our music files and all. Note that this will be asked only once when app is launched.

**MainActivity**

```
import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;

import com.example.pane.musicplayerapp.utils.PermissionsUtil;

public class MainActivity extends AppCompatActivity {
    private final int STORAGE_PERMISSION_ID = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        init();
        }
    
        private void init() {
        if (!checkStorePermission(STORAGE_PERMISSION_ID)) {
            showRequestPermission(STORAGE_PERMISSION_ID);
        }
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
                    // TODO: 2/25/19 get song list here as user as accept the storage permisssion. 
                    return;
                }
            }
        }
    }
}
```

Looking at the above methods we can clearly see we ask user's permission when the app is first launched by calling the init() on the OnCreate() method and the init() is checking if permission has been accepted in which case it is asked if user hasnt granted the permission yet. A toast is shown when user grants the permission. Add below permission to the Manifest and run the app.

Manifest

```
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```

![](https://images.viblo.asia/c2ba07b3-fec4-4b1d-80a0-f7edc777184c.png)

Next we will create a method that is called when user grants the permission. This method will get all audio files on device and return a list of the songs but first we need to create our song model.
Create a package named "model" and add the Song class as below.

**Song**

```
import java.io.Serializable;

public class Song implements Serializable {
    private long id;
    private String title;
    private String artist;
    private String thumbnail;
    private String songLink;

    public Song() {
    }

    public Song(long songID, String songTitle, String songArtist, String thumbNail, String link) {
        id = songID;
        title = songTitle;
        artist = songArtist;
        thumbnail = thumbNail;
        songLink = link;
    }

    public long getID() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getArtist() {
        return artist;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public String getSongLink() {
        return songLink;
    }
}
```

Next we will open the MainActivity and add the getSongList method.

**MainActivity**

```
import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;

import com.example.pane.musicplayerapp.model.Song;
import com.example.pane.musicplayerapp.utils.PermissionsUtil;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private static Uri sArtworkUri = Uri.parse("content://media/external/audio/albumart");
    private final int STORAGE_PERMISSION_ID = 0;
    private List<Song> mSongList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        init();
    }

    private void init() {
        if (!checkStorePermission(STORAGE_PERMISSION_ID)) {
            showRequestPermission(STORAGE_PERMISSION_ID);
        }
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
        Toast.makeText(this, mSongList.size() + " Songs Found!!!", Toast.LENGTH_SHORT).show();
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
}
```

Run the app and you should see a toast showing the numbers of music files found on your device. In the part 2 will display this song in a recycler view and add media features. Happy Codding!!!
**Updated!!!** Part 2 [here....](https://viblo.asia/p/building-a-music-player-part-2-Do754kJLlM6)