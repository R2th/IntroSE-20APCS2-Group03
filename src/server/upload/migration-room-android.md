Trong quá trình xây dựng phần mềm mà sử dụng Room, đôi khi chúng ta cần thêm, sửa, xóa các trường trong database để phù hợp với việc phát triển. Tuy nhiên, khi chúng ta thay đổi cấu trúc database sau đó chạy lại sẽ gặp exception sau:

```
java.lang.IllegalStateException: Room cannot verify the data integrity. 
Looks like you’ve changed schema but forgot to update the version number. 
You can simply fix this by increasing the version number.
```

và nếu chúng ta tăng version database lên thì lại gặp exception

```
java.lang.IllegalStateException: A migration from 1 to 2 is necessary. 
Please provide a Migration in the builder or call fallbackToDestructiveMigration in the builder in which case Room will re-create all of the tables.
```

Với những bạn mới bắt đầu sử dụng và làm việc với database có thể sẽ nghĩ: "Ơ. Mình làm gì sai ấy nhở mà nó thành thế này?". 

Tuy nhiên việc này rất chi là bình thường và sau đây mình sẽ suggest các bạn cách để khắc phục điều này.

### Cách 1:  "Game là dễ" :v

Cách đơn giản nhất là... gỡ app đi cài lại :v Cách này chỉ dùng được khi ứng dụng của bạn chưa có user nào cả. Vì nếu như vậy thì sẽ xóa đi toàn bộ dữ liệu cũ của user. Chẳng lẽ khi update chúng ta lại hiển thị 1 cái dialog lên cho user và thông báo rằng: "Xin chia buồn với bạn, chúng tôi vừa cập nhật csdl. Gỡ app đi cài lại bạn ei" =)) và đó cũng có thể là lần cuối họ dùng app của bạn. Nhưng bạn có thể sử dụng cách này trong quá trình selftest khi chưa có user và có thể còn cập nhật thêm trong quá trình code  

### Cách 2: Sử dụng Migration

Nghe có vẻ nguy hiểm hóa ra cũng bình thường thôi. Các bước thực hiện sẽ như sau:

- Đầu tiên chúng ta vẫn cần tăng version của database lên
- Tạo 1 migration cho việc update
- Add migation đã tạo khi khởi tạo Room

### Ví dụ:

Mình có 1 entity Question như sau:

```
@Entity(tableName = "question")
public class Question {

    @PrimaryKey(autoGenerate = true)
    private int id;

    private String question;

    private String answerA;

    private String answerB;

    private String answerC;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswerA() {
        return answerA;
    }

    public void setAnswerA(String answerA) {
        this.answerA = answerA;
    }

    public String getAnswerB() {
        return answerB;
    }

    public void setAnswerB(String answerB) {
        this.answerB = answerB;
    }

    public String getAnswerC() {
        return answerC;
    }

    public void setAnswerC(String answerC) {
        this.answerC = answerC;
    }
}
```

và method khởi tạo Room ban đầu:

```
@Database(entities = {Question.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {
    public static final String DB_NAME = "database";

    private static AppDatabase instance = null;
    public static AppDatabase getInstance(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(context, AppDatabase.class, DB_NAME)
                    .fallbackToDestructiveMigration()
                    .build();
        }
        return instance;
    }
}
```

Bây giờ mình muốn thêm 1 trường answerD để tăng độ khó cho game hoặc để làm khó user chơi thì chúng ta phải tạo 1 biến migration và add vào room

```
@Database(entities = {Question.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {
    static Migration MIGRATION_1_TO_2 = new Migration(1, 2) {
        @Override
        public void migrate(@NonNull SupportSQLiteDatabase database) {
            database.execSQL("ALTER TABLE question ADD COLUMN answerD TEXT");
        }
    };
    
    public static final String DB_NAME = "database";

    private static AppDatabase instance = null;
    public static AppDatabase getInstance(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(context, AppDatabase.class, DB_NAME)
                    .addMigrations(MIGRATION_1_TO_2)
                    .build();
        }
        return instance;
    }
}
```

Trên đây mình đã giới thiệu sơ lược về Migraion Room trong Android.

Các bạn có thể tìm hiểu thêm tại [đây](https://developer.android.com/training/data-storage/room/migrating-db-versions#java)