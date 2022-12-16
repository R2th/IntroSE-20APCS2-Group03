*(Trò troll này đã được test trong JavaScript)*

Thay đổi một hoặc vài dấu chấm phẩy trong JavaScript của đứa bạn hoặc đồng nghiệp bằng dấu chấm phẩy fake (dấu chấm hỏi trong tiếng Hi Lạp): `;`
Khi so sánh dấu chấm hỏi tiếng Hi Lạp `;` (dấu chấm phẩy fake) và dấu chấm phẩy bình thường `;` thì chúng nhìn hoàn toàn giống nhau.

Dấu chấm hỏi tiếng Hi Lạp (dấu chấm phẩy fake) sẽ gây ra lỗi `SyntaxError: Unexpected token ILLEGAL` trong JavaScript, và có thể sẽ gây ra lỗi ở trong các ngôn ngữ khác (chưa test). Cần phải lưu file dưới encoding Unicode hoặc UTF-8 để troll.
Những người hay copy luôn code từ GitHub hoặc các trang khác cũng dễ dính trò troll này.

Sau đây là ví dụ của việc troll người khác bằng dấu chấm phẩy fake:
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return; // Dấu chấm phẩy fake
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.login(config.token);
```

*Cảnh báo: Người viết bài không chịu trách nhiệm về mọi thiệt hại gây ra bởi trò troll này.*