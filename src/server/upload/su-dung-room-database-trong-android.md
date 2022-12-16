Trong bài viết này, chúng ta sẽ làm việc với [Room](https://developer.android.com/training/data-storage/room) database.
[Room](https://developer.android.com/training/data-storage/room) là một cơ sở dữ liệu ORM dựa trên SQLite database.
[Room](https://developer.android.com/training/data-storage/room) là cơ sở dữ liệu được giới thiệu bơi Google, cho phép bạn dễ dàng thao tác các truy vấn SQLite trong Android.

## 1. Chuẩn bị

- Android Studio 3.0 trở lên

## 2. Tạo Android Project

- Trong app/build.gradle, thêm các dependency sau để sử dụng Room :

```
implementation  "android.arch.persistence.room:runtime:1.0.0"
annotationProcessor  "android.arch.persistence.room:compiler:1.0.0"
```

- Trong build.gradle của Project, thêm google() reposity :

```
repositories  {
    google()
    jcenter()
}
```

## 3. Thêm Room Entities

- Tạo class Item như sau :

```
import android.arch.persistence.room.Entity;  
import android.arch.persistence.room.PrimaryKey;  
import android.support.annotation.NonNull;  

@Entity(tableName = "items")  
public class Item {  
    @PrimaryKey  
    @NonNull  private Long id;  
    private String name;  
    private String description;  
    private Long quantity;  
}
```

## 4. Tạo DAO Interface

```
import android.arch.persistence.room.Dao;  
import android.arch.persistence.room.Delete;  
import android.arch.persistence.room.Insert;  
import android.arch.persistence.room.Update;  
import inventory.techiediaries.com.models.Item;  

@Dao  
public interface ItemDAO {  
    @Insert  
  public void insert(Item... items);    
    @Update  
  public void update(Item... items);   
    @Delete  
  public void delete(Item item);  
}
```

## 5. Thêm các truy vấn

Room cho phép bạn thực hiện các truy vấn SQL như thêm, sửa, xóa.

Import các class sau :

```
import android.arch.persistence.room.Query;  
import java.util.List;
```

Và thêm các method :

```
@Query("SELECT * FROM items")  
public List<Item> getItems();
```

Truy vấn Item theo id như sau :

```
@Query("SELECT * FROM items WHERE id = :id")  
public Item getItemById(Long id);
```

## 6. Tạo Room Database

```
import android.arch.persistence.room.Database;  
import android.arch.persistence.room.RoomDatabase;  

@Database(entities = {Item.class}, version = 1)  
public abstract class AppDatabase extends RoomDatabase {  
    public abstract ItemDAO getItemDAO();  
}
```

## 7. Khởi tạo Database

Khởi tạo database trong hàm onCreate() của MainActivity như sau :

```
AppDatabase database = Room.databaseBuilder(this, AppDatabase.class, "mydb")  
        .allowMainThreadQueries()  
        .build();
```

Cuối cùng, chúng ta tạo các phương thức tạo, thêm, sửa , xóa, và cập nhật dữ liệu trong database như sau :

```
ItemDAO itemDAO = database.getItemDAO();  
Item item = new Item();  
item.setName("Item001");  
item.setDescription("Item 001");  
item.setQuantity(1000);  

itemDAO.insert(item);  
List<Item> items = itemDAO.getItems();    
System.out.println(items);
```















-