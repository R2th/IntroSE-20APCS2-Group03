> Chúng ta có thể giải quyết các vấn đề với số lượng lớn các tham số bằng cách cung cấp một hàm tạo với các tham số bắt buộc và sau đó các phương thức setter khác nhau để thiết lập các tham số tùy chọn. Vấn đề với cách tiếp cận này là trạng thái Object sẽ không nhất quán cho đến khi trừ khi tất cả các thuộc tính được thiết lập một cách rõ ràng
> 

**BUiLDER PARTTEN**
> 
> xây dựng giải quyết vấn đề với số lượng lớn các tham số tùy chọn và trạng thái không nhất quán bằng cách cung cấp cách để xây dựng đối tượng theo từng bước và cung cấp một phương thức sẽ thực sự trả về đối tượng cuối cùng

-----
* Cách xây dựng Builder Pattern như sau :

1. Ta có 1 class Song chứa tất cả thuộc tính của 1 đối tượng.Tiếp theo là tạo 1 static class builder bên trong class Song.
2. sau đó sao chép tất cả các đối số từ lớp bên ngoài sang lớp Builder.
3. Lớp Java Builder nên có các phương thức để thiết lập các tham số tùy chọn và nó sẽ trả về cùng một đối tượng Builder sau khi thiết lập thuộc tính tùy chọn. Bước cuối cùng là cung cấp một phương thức build () 
```
public class Song implements Parcelable {
    private int mId;
    private String mGenre;
    private String mTitle;
    private String mStreamUrl;
    private String mArtworkUrl;
    private int mDuration;
    private Artist mArtist;
    
      protected Song(Builder builder) {
        mId = builder.mId;
        mGenre = builder.mGenre;
        mTitle = builder.mTitle;
        mStreamUrl = builder.mStreamUrl;
        mArtworkUrl = builder.mArtworkUrl;
        mDuration = builder.mDuration;
        mArtist = builder.mArtist;
    }
        public int getId() {
        return mId;
    }

    public String getGenre() {
        return mGenre;
    }

    public String getTitle() {
        return mTitle;
    }

    public String getStreamUrl() {
        return mStreamUrl;
    }

    public String getArtworkUrl() {
        return mArtworkUrl;
    }

    public int getDuration() {
        return mDuration;
    }

    public Artist getArtist() {
        return mArtist;
    }
 public static class Builder {
        private int mId;
        private String mGenre;
        private String mTitle;
        private String mStreamUrl;
        private String mArtworkUrl;
        private int mDuration;
        private Artist mArtist;

        public Builder() {
        }

        public Builder(int id, String genre, String title, String streamUrl, String artworkUrl,
                int duration, Artist artist) {
            mId = id;
            mGenre = genre;
            mTitle = title;
            mStreamUrl = streamUrl;
            mArtworkUrl = artworkUrl;
            mDuration = duration;
            mArtist = artist;
        }

        public Builder withId(int id) {
            mId = id;
            return this;
        }

        public Builder withGenre(String genre) {
            mGenre = genre;
            return this;
        }

        public Builder withTitle(String title) {
            mTitle = title;
            return this;
        }

        public Builder withStreamUrl(String streamUrl) {
            mStreamUrl = streamUrl;
            return this;
        }

        public Builder withArtworkUrl(String artworkUrl) {
            mArtworkUrl = artworkUrl;
            return this;
        }

        public Builder withDuration(int duration) {
            mDuration = duration;
            return this;
        }

        public Builder withArtist(Artist artist) {
            mArtist = artist;
            return this;
        }

        public Song build() {
            return new Song(this);
        }
    }

}
```
4. Đây là một chương trình thử nghiệm ví dụ mẫu xây dựng cho thấy cách sử dụng lớp Builder để lấy đối tượng

>   
>       Song song = new Song.Builder().withId(jsonObjectSong.getInt(Song.SongComponent.ID))
>                         .withGenre(jsonObjectSong.getString(Song.SongComponent.GENRE))
>                         .withTitle(jsonObjectSong.getString(Song.SongComponent.TITLE))
>                         .withArtworkUrl(jsonObjectSong.getString(Song.SongComponent.ARTWORK_URL))
>                         .withStreamUrl(jsonObjectSong.getString(Song.SongComponent.STREAM_URL))
>                         .withDuration(jsonObjectSong.getInt(Song.SongComponent.DURATION))
>                         .withArtist(new Artist(jsonObjectArtist.getInt(Artist.ArtistComponent.ID),
>                                 jsonObjectArtist.getString(Artist.ArtistComponent.USERNAME),
>                                 jsonObjectArtist.getString(Artist.ArtistComponent.AVATAR_URL)))
>                         .build();
### 
### Kết Thúc Phần Introduce của mình về Builder Partten . Chúc các bạn thành công !! Thank for Watching