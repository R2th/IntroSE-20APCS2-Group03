Chào mọi người, đây là first post của mình =)))

Trong bài này mình sẽ giới thiệu cho các bạn 1 thứ rất hay ho : Dynamic Shortcuts Android
![](https://images.viblo.asia/3817ca54-95a0-40e3-ac5a-fcbda5e814b8.jpg)

Ok bắt đầu.

```

class MainActivity : AppCompatActivity() { 
	override fun onCreate(savedInstanceState: Bundle?) {
		super.onCreate(savedInstanceState)
		setContentView(R.layout.activity_main)

		// Shortcut Manager để quản lý shortcuts
		var shortcutManager = getSystemService(ShortcutManager::class.java)

		// Tạo Shortcut 1
		var shortcut1 = ShortcutInfo.Builder(applicationContext, "ID1") //id
				.setShortLabel("Instagram") // lable hiển thị
                .setLongLabel("Long lablelllll") //long lable, không nhất thiết phải set  
				.setIcon(Icon.createWithResource(applicationContext, R.drawable.icon))// icon hiển thị
				.setIntent(Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com"))) //intent khi action vào
                .setRank(xxx) // set rank nếu có nhiều shortcuts và cần ưu tiên
				.build()


		// add shortcut vào list, có thể add max 4 shortcuts
		shortcutManager!!.dynamicShortcuts = listOf(shortcut1)
        
        //tới đây thì khi run class lên, bạn đã tạo thành công shortcut rồi đấy 

		// Update shortcuts , mình sẽ lấy ví dụ là 1 action click
		btnUpdate.setOnClickListener {
			shortcut1 = ShortcutInfo.Builder(applicationContext, "ID1")
					.setShortLabel("Google")
					.setIcon(Icon.createWithResource(applicationContext, R.drawable.icon))
					.setIntent(Intent(Intent.ACTION_VIEW, Uri.parse("https://www.google.com")))
					.build()
                    
                    //update lại tất cả thông tin, nhưng vẫn giữ ID nhé, 
			shortcutManager!!.dynamicShortcuts = listOf(shortcut1)
		}

		// Add thêm shortcut
		 btnAdd.setOnClickListener {
			var shortcut2 = ShortcutInfo.Builder(applicationContext, "ID2")
					.setShortLabel("Newly Appended")
					.setIcon(Icon.createWithResource(applicationContext, R.drawable.icon))
					.setIntent(Intent(Intent.ACTION_VIEW, Uri.parse("https://www.newlyAppended.com")))
					.build()

			shortcutManager!!.dynamicShortcuts = listOf(shortcut1, shortcut2)
		}
        //Remove shortcuts
            btnRemove.setOnClickListener {
                 shortcutManager.removeAllDynamicShortcuts()
            }
	}
}

```

Chúc các bạn thành công.

Thanks