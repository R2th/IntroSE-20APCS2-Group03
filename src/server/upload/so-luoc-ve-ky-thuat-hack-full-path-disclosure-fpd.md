Hello mọi người, vừa hôm qua thì mình có viết bài hướng dẫn một số thủ thuật về XSS, các bạn có thể xem lại tại đây

[Một số thủ thuật vượt qua tường lửa XSS](https://anonymousvn.org/mot-so-thu-thuat-vuot-qua-filter-xss.hav)

Nay mình giới thiệu tiếp với các bạn về một lỗi cũng rất phổ biến đó là Full Path Disclosure. Tới phần chính luôn nào.

1) Giới thiệu chung
-------------------

Full path disclosure là một lỗi không quá lớn. Nhưng đôi khi nó quyết định cả vấn đề có thể khai thác được tiếp hay là không.FPD cho phép ta xác định được đường dẫn trong server.Từ đó giúp khai thác nhanh hơn, ví dụ như khi ta khai thác LFI chẳng hạn. Nếu như folder thay đổi.Ta có thể dùng cách này để xác định.

<http://site.com/index.php?page=../../../../../../../home/example/public_html/includes/config.php>

Nhìn vào đường dẫn trên ,để đọc được file config bằng kĩ thuật LFI (Local File Inclusion ) trước tiên ta phải xác định đc đường dẫn đến nó.Và FPD là một phương pháp giúp ta đi nhanh hơn trong việc này. ( Còn tới đâu thì mình chưa biết :))

2) Cách khai thác.
------------------

Việc tận dụng và khai thác FPD còn tùy thuộc vào nhiều yếu tố khác. Ví dụ đối với một số mã nguồn mở phổ biến thì mình có thể tham khảo để xác định được đường dẫn tới file mình cần. Ví dụ với Vbulletin 4.x hoặc 5.x thì bạn có thể check qua một số đường dẫn phổ biến sau :

/includes/api/commonwhitelist_2.php /includes/api/commonwhitelist_5.php /includes/api/commonwhitelist_6.php /includes/api/1/album_album.php /includes/api/1/album_editalbum.php /includes/api/1/album_latest.php /includes/api/1/album_overview.php /includes/api/1/album_picture.php /includes/api/1/album_user.php /includes/api/1/announcement_edit.php /includes/api/1/announcement_view.php /includes/api/1/api_cmscategorylist.php /includes/api/1/api_cmssectionlist.php /includes/api/1/api_forumlist.php /includes/api/1/api_getnewtop.php /includes/api/1/api_getsecuritytoken.php /includes/api/1/api_getsessionhash.php /includes/api/1/api_init.php /includes/api/1/api_mobilepublisher.php /includes/api/1/api_usersearch.php /includes/api/1/blog_blog.php /includes/api/1/blog_bloglist.php /includes/api/1/blog_comments.php /includes/api/1/blog_custompage.php /includes/api/1/blog_dosendtofriend.php /includes/api/1/blog_list.php /includes/api/1/blog_members.php /includes/api/1/blog_post_comment.php /includes/api/1/blog_post_editblog.php /includes/api/1/blog_post_editcomment.php /includes/api/1/blog_post_edittrackback.php /includes/api/1/blog_post_newblog.php /includes/api/1/blog_post_postcomment.php /includes/api/1/blog_post_updateblog.php /includes/api/1/blog_sendtofriend.php /includes/api/1/blog_subscription_entrylist.php /includes/api/1/blog_subscription_userlist.php /includes/api/1/blog_usercp_addcat.php /includes/api/1/blog_usercp_editcat.php /includes/api/1/blog_usercp_editoptions.php /includes/api/1/blog_usercp_editprofile.php /includes/api/1/blog_usercp_modifycat.php /includes/api/1/blog_usercp_updateprofile.php /includes/api/1/editpost_editpost.php /includes/api/1/editpost_updatepost.php /includes/api/1/forum.php /includes/api/1/forumdisplay.php /includes/api/1/inlinemod_domergeposts.php /includes/api/1/list.php /includes/api/1/login_lostpw.php /includes/api/1/member.php /includes/api/1/memberlist_search.php /includes/api/1/misc_showattachments.php /includes/api/1/misc_whoposted.php /includes/api/1/newreply_newreply.php /includes/api/1/newreply_postreply.php /includes/api/1/newthread_postthread.php /includes/api/1/newthread_newthread.php /includes/api/1/poll_newpoll.php /includes/api/1/poll_polledit.php /includes/api/1/poll_showresults.php /includes/api/1/private_editfolders.php /includes/api/1/private_insertpm.php /includes/api/1/private_messagelist.php /includes/api/1/private_newpm.php /includes/api/1/private_showpm.php /includes/api/1/private_trackpm.php /includes/api/1/profile_editattachments.php /includes/api/1/profile_editoptions.php /includes/api/1/profile_editprofile.php /includes/api/1/register_addmember.php 

/includes/api/1/register_checkdate.php /includes/api/1/search_process.php /includes/api/1/search_showresults.php /includes/api/1/showthread.php /includes/api/1/subscription_addsubscription.php /includes/api/1/subscription_editfolders.php /includes/api/1/subscription_viewsubscription.php /includes/api/1/threadtag_managetags.php /includes/api/2/album_picture.php /includes/api/2/api_blogcategorylist.php /includes/api/2/blog_blog.php /includes/api/2/blog_bloglist.php /includes/api/2/blog_list.php /includes/api/2/blog_subscription_entrylist.php /includes/api/2/blog_subscription_userlist.php /includes/api/2/blog_usercp_groups.php /includes/api/2/content.php /includes/api/2/editpost_editpost.php /includes/api/2/forumdisplay.php /includes/api/2/member.php /includes/api/2/newreply_newreply.php /includes/api/2/forum.php /includes/api/2/poll_newpoll.php /includes/api/2/poll_polledit.php /includes/api/2/poll_showresults.php /includes/api/2/private_messagelist.php /includes/api/2/private_trackpm.php /includes/api/2/profile_editattachments.php /includes/api/2/search_showresults.php /includes/api/2/showthread.php /includes/api/3/api_gotonewpost.php /includes/api/4/album_user.php /includes/api/4/api_forumlist.php /includes/api/4/api_getnewtop.php /includes/api/4/breadcrumbs_create.php /includes/api/4/facebook_getforumid.php /includes/api/4/facebook_getnewforummembers.php /includes/api/4/get_vbfromfacebook.php /includes/api/4/login_facebook.php /includes/api/4/newreply_postreply.php /includes/api/4/newthread_postthread.php /includes/api/4/register.php /includes/api/4/register_addmember.php /includes/api/4/search_findusers.php /includes/api/4/subscription_viewsubscription.php /includes/api/5/api_init.php /includes/api/6/api_getnewtop.php /includes/api/6/api_gotonewpost.php /includes/api/6/content.php /includes/api/6/member.php /includes/api/6/newthread_newthread.php /includes/block/blogentries.php /includes/block/cmsarticles.php /includes/block/html.php /includes/block/newposts.php /includes/block/sgdiscussions.php /includes/block/tagcloud.php /includes/block/threads.php /forumrunner/include/subscriptions.php /forumrunner/include/search_forum.php /forumrunner/include/profile.php /forumrunner/include/post.php /forumrunner/include/pms.php /forumrunner/include/online.php /forumrunner/include/moderation.php /forumrunner/include/misc.php /forumrunner/include/login.php /forumrunner/include/get_thread.php /forumrunner/include/get_forum.php /forumrunner/include/cms.php /forumrunner/include/attach.php /forumrunner/include/announcement.php /forumrunner/include/album.php /forumrunner/support/vbulletin_methods.php /forumrunner/support/stringparser_bbcode.class.php /forumrunner/support/utils.php /forumrunner/support/other_methods.php /packages/skimlinks/hooks/postbit_display_complete.php /packages/skimlinks/hooks/showthread_complete.php /packages/skimlinks/hooks/userdata_start.php

Đối với các mã nguồn khác như wordpress hay joomla cũng đều có những đường dẫn như này. ( Blog mình cũng chạy trên nền wordpress, khuyến khích các bạn không nên thử vì sau này không còn chỗ để đọc bài nữa)\
Tuy nhiên, nếu website không sử dụng mã nguồn mở thì ta có thể kiểm tra bằng 1 trong 3 phương pháp sau.\
+ **Empty array**: Thêm vào một empty array để yêu cầu in ra một thông báo.\
Ví dụ như thêm [] vào cuối biến index.php?page=home chẳng hạn.\
Khi ta thêm vào index.php?page[]=home sẽ nhận được thông báo như sau:

Warning: include_once() [function.include]: Failed opening " for inclusion (include_path='.:/usr/local/php5/lib/php') in/home/content/37/4936137/html/template.php on line 40

Nó có chỉ cho ta thấy đường dẫn /home/content/37/4936137/html/template.php từ đó có thể suy đoán ra đường dẫn file mà ta cần.Hoặc suy đoán được ra đường dẫn đến root folder.

**+Null Session Cookie:**

Một phương pháp phổ biến khác để đưa ra yêu cầu thông báo lỗi trong đó có chứa full path đó là dùng JS Injection (ở đây dùng Null Session Cookie)\
Đoạn code JS để get thông báo lỗi trên site có thể mô tả với dạng như sau 

javascript:void(document.cookie='PHPSESSID=');\
hoặc javascript:alert(document.cookie="PHPSESSID=");

Trong đó PHPSESSID được set bằng giá trị null. Như vậy chúng ta có thể nhận được một lời cảnh báo như sau

Warning: session_start() [function.session-start]: The session id contains illegal characters,\
valid characters are a-z, A-Z, 0-9 and '-,' in /home/example/public_html/includes/functions.php on line 2

**+ Invalid Session Cookie**

Tương tự như Null Session Cookie một session với PHPSESSID dược set >128 byte cũng sẽ cho ra thông báo lỗi với FPD.

javascript:void(document.cookie='PHPSESSID=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

Một kiểu khác cũng có tác dụng tương tự 

javascript:void(document.cookie='PHPSESSID=.');

ta có thể sử dụng một số tool để khai thác full path disclosure như inspathx ( link tải ở đây <https://code.google.com/p/inspathx/>)

3) Cách phòng chống.
--------------------

Để phòng chống khai thác full path disclosure ta có thể ngăn chặn việc đưa ra thông báo lỗi bằng việc set trong php.ini

**error_reporting(0);\
display_errors = 'off';**

Hoặc trong php script thực hiện\
**ini_set('display_errors',false);**

Trong httpd.conf/apache2.conf set\
**php_flag display_errors off**

Nguồn : https://anonymousvn.org/so-luoc-ve-full-path-disclosure-fpd.hav