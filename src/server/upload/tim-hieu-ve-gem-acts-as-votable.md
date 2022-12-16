Acts_as_follower là một Ruby Gem được viết riêng cho các mô hình Rails / ActiveRecord nhằm phục vụ cho việc giải quyết các chức năng như like, dislike, vote up, vote down một cách nhanh chóng ...
# 1.Cài đặt
Thêm dòng sau vào Gemfile, sau đó chạy lệnh bundle install:
```ruby
gem 'acts_as_votable', '~> 0.11.1'
```
Tiếp đến chạy lệnh sau để thực thi :
```ruby
rails generate acts_as_votable:migration
rake db:migrate
```
# 2.Cách sử dụng 
## Votable Models
```ruby
class Post < ActiveRecord::Base
  acts_as_votable
end

@post = Post.new(:name => 'my post!')
@post.save
@post.liked_by @user
@post.votes_for.size # => 1
```
## Like/Dislike Yes/No Up/Down
Dưới đây là một số ví dụ về voting:

```ruby
@post.liked_by @user1
@post.downvote_from @user2
@post.vote_by :voter => @user3
@post.vote_by :voter => @user4, :vote => 'bad'
@post.vote_by :voter => @user5, :vote => 'like'
```
Theo mặc định vote sẽ là 'like'. Do đó @user3 đã vote 'like' cho @post.
@user1, @user3 @user5 tất cả đã vote 'like' cho @post.
@user2 và @user4 đã vote 'bad' cho @post.
Các từ khóa sau đây cũng có ý nghĩa như là vote giống như là ủng hộ hay chống lại. Up/Down, Like/Dislike, Positive/Negative...etc. Cờ booleannn sẽ được áp dụng.
Ví dụ về phiếu ủng hộ:

```ruby
@post.liked_by @user1
@post.vote_by :voter => @user3
@post.vote_by :voter => @user5, :vote => 'like'
```
Ví dụ về phiếu bầu phản đối:

```ruby
@post.downvote_from @user2
@post.vote_by :voter => @user2, :vote => 'bad'
```

Đếm số phiếu bầu:

```ruby
@post.votes_for.size # => 5
@post.weighted_total => 5
@post.get_likes.size # => 3
@post.get_upvotes.size # => 3
@post.get_dislikes.size # => 2
@post.get_downvotes.size # => 2
@post.weighted_score => 1
```
Active record cung cấp scope làm cho mọi thứ đơn giản hơn:

```ruby
@post.votes_for.up.by_type(User)
@post.votes_for.down
@user1.votes.up
@user1.votes.down
@user1.votes.up.for_type(Post)
```
Mỗi lần scope hoàn thành, bạn có thể kích hoạt với mỗi 1 vote:

```ruby
@post.votes_for.up.by_type(User).voters
@post.votes_for.down.by_type(User).voters

@user.votes.up.for_type(Post).votables
@user.votes.up.votables
```
Bạn cũng có thể bỏ vote khi đã vote trước đó:

```ruby
@post.liked_by @user1
@post.unliked_by @user1

@post.disliked_by @user1
@post.undisliked_by @user1
```
Bỏ vote bao gồm cả phiếu bầu tích cực và phiếu bầu phủ định.

## Ví dụ với scope
Bạn có thể thêm scope vào vote của bạn

```ruby
# positive votes
@post.liked_by @user1, :vote_scope => 'rank'
@post.vote_by :voter => @user3, :vote_scope => 'rank'
@post.vote_by :voter => @user5, :vote => 'like', :vote_scope => 'rank'

# negative votes
@post.downvote_from @user2, :vote_scope => 'rank'
@post.vote_by :voter => @user2, :vote => 'bad', :vote_scope => 'rank'

# tally them up!
@post.find_votes_for(:vote_scope => 'rank').size # => 5
@post.get_likes(:vote_scope => 'rank').size # => 3
@post.get_upvotes(:vote_scope => 'rank').size # => 3
@post.get_dislikes(:vote_scope => 'rank').size # => 2
@post.get_downvotes(:vote_scope => 'rank').size # => 2

# votable model can be voted under different scopes
# by the same user
@post.vote_by :voter => @user1, :vote_scope => 'week'
@post.vote_by :voter => @user1, :vote_scope => 'month'

@post.votes_for.size # => 2
@post.find_votes_for(:vote_scope => 'week').size # => 1
@post.find_votes_for(:vote_scope => 'month').size # => 1
```

## Thêm trọng số vào những lần vote của bạn
Bạn có thể thêm trọng số vào lần vote của bạn, giá trị mặc định là 1
```ruby
# positive votes
@post.liked_by @user1, :vote_weight => 1
@post.vote_by :voter => @user3, :vote_weight => 2
@post.vote_by :voter => @user5, :vote => 'like', :vote_scope => 'rank', :vote_weight => 3

# negative votes
@post.downvote_from @user2, :vote_scope => 'rank', :vote_weight => 1
@post.vote_by :voter => @user2, :vote => 'bad', :vote_scope => 'rank', :vote_weight => 3

# tally them up!
@post.find_votes_for(:vote_scope => 'rank').sum(:vote_weight) # => 6
@post.get_likes(:vote_scope => 'rank').sum(:vote_weight) # => 6
@post.get_upvotes(:vote_scope => 'rank').sum(:vote_weight) # => 6
@post.get_dislikes(:vote_scope => 'rank').sum(:vote_weight) # => 4
@post.get_downvotes(:vote_scope => 'rank').sum(:vote_weight) # => 4
```
## The Voter
Act_as_voter cung cấp chức năng lưu trữ những người voters mà bạn có.

```ruby
class User < ActiveRecord::Base
  acts_as_voter
end

@user.likes @article

@article.votes.size # => 1
@article.likes.size # => 1
@article.dislikes.size # => 0
```

Để kiểm tra xem liệu một người vote có vote cho một model, bạn có thể dùng voted_for?Ngoài ra bạn có thể kiểm tra những người vote đã được vote như thế nào thông qua voted_as_when_voted_for.

```ruby
@user.likes @comment1
@user.up_votes @comment2
# user has not voted on @comment3

@user.voted_for? @comment1 # => true
@user.voted_for? @comment2 # => true
@user.voted_for? @comment3 # => false

@user.voted_as_when_voted_for @comment1 # => true, user liked it
@user.voted_as_when_voted_for @comment2 # => false, user didnt like it
@user.voted_as_when_voted_for @comment3 # => nil, user has yet to vote
```
Bạn cũng có thể kiểm tra xem người vote đã bỏ phiếu ủng hộ hay ko ủng hộ.

```ruby
@user.likes @comment1
@user.dislikes @comment2
# user has not voted on @comment3

@user.voted_up_on? @comment1 # => true
@user.voted_down_on? @comment1 # => false

@user.voted_down_on? @comment2 # => true
@user.voted_up_on? @comment2 # => false

@user.voted_up_on? @comment3 # => false
@user.voted_down_on? @comment3 # => false
```

Những định danh cho phương thức: voted_up_on?, voted_down_on? là: voted_up_for?, voted_down_for?, liked? và disliked?.

Dĩ nhiên, bạn có thể có được một danh sách các đối tượng người dùng đã thực hiện hành động vote cho cái gì đó. Cái danh sách này sẽ trả về một cái đối tượng thực tế (actual object) thay vì là thể hiện của model Vote. Tất cả các đối tượng đều là eager loaded.

```ruby
@user.find_voted_items

@user.find_up_voted_items
@user.find_liked_items

@user.find_down_voted_items
@user.find_disliked_items
```
Các thành phần của một model riêng lẻ cái mà người dùng đã vote cũng có thể được hiển thị. Kết quả sẽ là một mối quan hệ ActiceRecord.

```ruby
@user.get_voted Comment

@user.get_up_voted Comment

@user.get_down_voted Comment
```
## Registered Votes
Người vote có thể chỉ được vote 1 lần. Trong ví dụ này vote 2 lần là không được vì @user đã vote cho @shoe rồi

```ruby
@user.likes @shoe
@user.likes @shoe

@shoe.votes # => 1
@shoe.likes # => 1
```
Để check nếu 1 vote được tính, hoặc đã đăng ký, dùng vote_registered? trên model sau khi vote. Ví dụ:

```ruby
@hat.liked_by @user
@hat.vote_registered? # => true

@hat.liked_by => @user
@hat.vote_registered? # => false, because @user has already voted this way

@hat.disliked_by @user
@hat.vote_registered? # => true, because user changed their vote

@hat.votes.size # => 1
@hat.positives.size # => 0
@hat.negatives.size # => 1
```
Để cho phép các mục bị trùng lặp của một người vote, sử dụng lựa chọn duplicate. Cần chú ý rằng điều đó sẽ giới hạn một vài phương thức khác, nó không thể có nhiều vote trong trường hợp này.

```ruby
@hat.vote_by voter: @user, :duplicate => true
```
# 3.Tham khảo
https://github.com/ryanto/acts_as_votable