# Lý do

Bài viết ngắn này mình làm vì lý do mình gặp phải 1 số code rất rất "bẩn" mà nếu đập đi làm lại từ đầu thì ko khả thi(cty mình mạng hơi conflict với github), mà ngồi gỡ thì thà làm phương án 1 còn hơn. Nhiều khi chỉ muốn đập máy.

# Cách đặt tên
1. Hãy đặt tên theo chuẩn PSR: https://www.php-fig.org/psr/psr-2/
2. Cách đặt tên cụ thể trong Laravel

Cái gì | Đặt tên ra sao | Nên | ĐỪNG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
------------ | ------------- | ------------- | -------------
Controller | singular | ArticleController | ~~ArticlesController~~
Route | plural | articles/1 | ~~article/1~~
Named route | snake_case with dot notation | users.show_active | ~~users.show-active, show-active-users~~
Model | singular | User | ~~Users~~
hasOne or belongsTo relationship | singular | articleComment | ~~articleComments, article_comment~~
All other relationships | plural | articleComments | ~~articleComment, article_comments~~
Table | plural | article_comments | ~~article_comment, articleComments~~
Pivot table | singular model names in alphabetical order | article_user | ~~user_article, articles_users~~
Table column | snake_case without model name | meta_title | ~~MetaTitle; article_meta_title~~
Model property | snake_case | `$model->created_at` | ~~`$model->createdAt`~~
Foreign key | singular model name with _id suffix | article_id | ~~ArticleId, id_article, articles_id~~
Primary key | - | id | ~~custom_id~~
Migration | - | 2017_01_01_000000_create_articles_table | ~~2017_01_01_000000_articles~~
Method | camelCase | getAll | ~~get_all~~
Method in resource controller | [table](https://laravel.com/docs/master/controllers#resource-controllers) | store | ~~saveArticle~~
Method in test class | camelCase | testGuestCannotSeeArticle | ~~test_guest_cannot_see_article~~
Variable | camelCase | `$articlesWithAuthor` | ~~`$articles_with_author`~~
Collection | descriptive, plural | `$activeUsers = User::active()->get()` | ~~`$active, $data`~~
Object | descriptive, singular | `$activeUser = User::active()->first()` | ~~`$users, $obj`~~
Config and language files index | snake_case | articles_enabled | ~~ArticlesEnabled; articles-enabled~~
View | snake_case | show_filtered.blade.php | ~~showFiltered.blade.php, show-filtered.blade.php~~
Config | snake_case | google_calendar.php | ~~googleCalendar.php, google-calendar.php~~
Contract (interface) | adjective or noun | Authenticatable | ~~AuthenticationInterface, IAuthentication~~
Trait | adjective | Notifiable | ~~NotificationTrait~~

# Bài học
Thực sự những quy tắc trên rất đơn giản, cơ bản và hầu như ai cũng biết, thế nhưng hôm nay làm việc mình gặp 1 model đặt tên SỐ NHIỀU và viết ở lowercase(tương đương vi phạm luôn quy tắc đặt trên class của OOP). Thực sự lý do ở đây là 1 là tiếng Anh ko được tốt và 2 là học các nguồn ko chuẩn(ví dụ như Kho@pha# là 1 nguồn vô cùng tồi tệ để học code khi mà bố trí thư mục cũng như lập trình tạo file rất thủ công). Mình chỉ có thể đưa ra lời khuyên cho những người đọc post này là hãy dùng tài liệu tiếng Anh mà học. Mình ko nói là chỗ tài liệu tiếng Anh hoàn toàn là code tốt(có nhiều code cũng vấn đề), nhưng đỡ hơn rất nhiều so với các tài liệu code tiếng Việt hiện tại đang free ở internet. Tiếng Anh chỉ cần đọc được là OK, nghe đc thì càng tốt. Còn nếu chịu thì xem họ code như nào rồi bắt chước và google dịch để hiểu sơ sơ. 

Chúc các bạn code sạch và ko gây ức chế cho người khác.

Bài viết có tham khảo từ:  https://github.com/alexeymezenin/laravel-best-practices#follow-laravel-naming-conventions