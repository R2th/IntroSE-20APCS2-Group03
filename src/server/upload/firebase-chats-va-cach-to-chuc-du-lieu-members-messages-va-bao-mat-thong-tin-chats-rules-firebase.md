Bài viết gốc: [anonystick.com](https://anonystick.com/blog-developer/firebase-chats-va-cach-to-chuc-du-lieu-members-messages-va-bao-mat-thong-tin-chats-rules-firebase-2022072049129518)

Giả sử bạn có một ứng dụng trò chuyện mà bạn muốn kích hoạt cuộc trò chuyện riêng tư giữa một nhóm người được chọn or cá nhân và có thể hơn nữa là chia sẻ hình ảnh, video...

Nếu bạn đã hiểu cơ bản về firebase thì tôi khuyên bạn nên xem video về cách triển khai [Bảo mật tin nhắn của hệ thống khi sử dụng firebase](https://youtu.be/TWSWymrSmiE)

Và ví dụ bạn sẽ quyết định sử dụng firebase, một sdk mạnh mẽ về realtime cho đến hiện tại so với socket.io và quan trọng là có thể sử dụng làm database. Nhưng càng mạnh mẽ thì bạn phải thật cẩn thận khi chơi với nó. Bài này thì có lẽ tôi sẽ giúp một bạn, bạn ấy cần gấp cho nên tôi sẽ đi vào ví dụ cụ thể. 

## Security firebase

Các quy tắc bảo mật của Firebase có thể khá mạnh mẽ, nhưng đôi khi chúng yêu cầu một chút hướng dẫn. Điều này thực sự không phải vì chúng phức tạp, mà chủ yếu là vì hầu hết mọi người có xu hướng không sử dụng chúng thường xuyên nên có một chút khó khăn. Cũng may, tôi đã ở đây hehe... Vào việc anh em.

Quay lại, giả sử chúng ta đang triển khai một ứng dụng thay cho zalo chẳng hạn, thiết kế nhóm hay 2 người cũng là tương đối giống nhau. Bất kỳ ai trong nhóm trò chuyện đều có thể đọc và viết tin nhắn trò chuyện, nhưng chúng tôi không muốn người khác có thể nghe được.

Vậy cấu trúc của một hệ thống chat như thế nào? Bạn có thể tham khảo dưới đây. Tất nhiên, nếu bạn không muốn thì có rất nhiều cách để làm điều này, nhưng đây có lẽ là cách dễ nhất để cho các bạn hiểu được quyền trong firebase.

```
{
"rules": {
	"chats":  {
		"$chatID":  {
			"messages":  {
				".read":  true
				}
			}
		}
	}
}
```
Nếu set `".read": true` thì đương nhiên ai cũng có thể đọc được nội dung chat... Cho nên chúng ta sử lại như sau:

```
{
"rules": {
	"chats":  {
		"$chatID":  {
			"messages":  {
				".read":  "data.parent().child('members').child(auth.uid).exists()",
				}
			}
		}
	}
}
```

Như vậy thì chúng ta có thể yên tâm, vì những ai có trong `members` mới có thể đọc, tương tự như vậy viết thì sao?

```
{
"rules": {
	"chats":  {
		"$chatID":  {
			"messages":  {
				".read":  "data.parent().child('members').child(auth.uid).exists()",
				".write":  "data.parent().child('members').child(auth.uid).exists()"
				}
			}
		}
	}
}
```
Thì cũng như vậy, chúng ta cho phép tất cả các thành viên trong `list members` có thể chat và đọc thoải mái. Miễn là `user` đó có trong danh sách được phép. Như vậy chúng ta đã đi xong phần đơn giản nhất. Giờ đi cao hơn một chút.

Giả sử app zilo của chúng ta có chức năng cấm người đó chat, chỉ đọc thôi thì làm sao?

```
{
"rules": {
	"chats":  {
		"$chatID":  {
			"messages":  {
				".read":  "data.parent().child('members').child(auth.uid).exists()",
				".write":  "data.parent().child('members').child(auth.uid).val() != 'listener'"
				}
			}
		}
	}
}
```

Nhưng làm như vậy thì chúng ta sẽ rất sơ hở, đó là những thành viên không có trong `members` vẫn có thể read hay write. CHúng ta đã sai từ chi tiết nhỏ nhất... Cho nên chúng ta nên như thế này

```
{
"rules": {
	"chats":  {
		"$chatID":  { 
			"messages":  {
				".read":  "data.parent().child('members').child(auth.uid).exists()",
				".write":  "data.parent().child('members').child(auth.uid).val() == 'owner' || data.parent().child('members').child(auth.uid).val()=='chatter'"
				}
			}
		}
	}
}
```