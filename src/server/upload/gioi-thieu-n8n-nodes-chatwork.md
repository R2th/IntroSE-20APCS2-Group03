Chatwork là gì? Tại sao có bài viết này?
----------------------------------------

"[Chatwork](https://go.chatwork.com/vi/) là một nền tảng tích hợp tất cả trong một: tính năng chat, chỉ định công việc, gọi thoại/video và chia sẻ tập tin."

Vì là một công cụ thường dùng để giao tiếp với các thành viên trong một tổ chức, sẽ có nhiều trường hợp cần phải tích hợp các dịch vụ, hệ thống bên ngoài vào Chatwork. Ví dụ: Có một đơn hàng mới trên hệ thống bán hàng thì nhắn tin cho nhân viên phụ trách trên Chatwork, có một issue trên project thì gửi tin nhắn tới đội kỹ thuật...

Hiện tại, Chatwork đã có public api, webhook khá đầy đủ để tích hợp với các hệ thống bên ngoài. Việc sử dụng public của Chatwork cũng khá đơn giản. Vấn đề chỉ gặp phải khi bạn có nhiều hệ thống, dịch vụ cần phải tích hợp, hoặc bạn sử dụng các dịch vụ được cung cấp sẵn bạn có rất ít tùy chọn trên đó.

Với trường hợp các hệ thống, dịch vụ là của bạn, bạn có thể tích hợp trực tiếp Chatwork api lên đó, nhưng bạn sẽ phải viết đi viết lại phần tích hợp cho nhiều hệ thống, chưa kể tới việc bạn có nhiều hơn một con "bot". Hiện tại có nhiều thư viện hỗ trợ làm việc với Chatwork api:

-   PHP: [laravel-chatwork](https://github.com/sun-asterisk-research/laravel-chatwork), [php-chatwork-api](https://github.com/polidog/php-chatwork-api), ...
-   Nodejs: [chatwork-api-client](https://www.npmjs.com/package/chatwork-api-client), [chatwork-api](https://www.npmjs.com/package/chatwork-api-wrap), ...

Những thư viện này chỉ "gói" lại giúp bạn những public api của Chatwork, bạn vẫn phải thực hiện phần lớn logic của bước tích hợp. Việc đưa phần tích hợp vào là một phần của hệ thống cũng sẽ sinh ra một số rủi ro nhất định.

Với trường hợp các bạn sử dụng các dịch vụ của bên thứ 3, ví dụ Github, và bạn muốn tích hợp nó với Chatwork. Với ví dụ là Github, dịch vụ này đã có sẵn những webhook, api để tích hợp, nhưng để tích hợp chúng với Chatwork, bạn cần xây dựng một hệ thống trung gian để tích hợp Github và Chatwork. Nếu bạn không chỉ sử dụng một dịch vụ là Github, bạn sẽ cần nhiều hơn một dịch vụ tích hợp trung gian hoặc làm phức tạp thêm hệ thống tích hợp.

Với những vấn đề trên, bài viết này sẽ giới thiệu n8n và n8n-nodes-chatwork. n8n sẽ thay cho phần tích hợp trung gian, với những luồng công việc độc lập, dựng một lần có thể tích hợp rất nhiều dịch vụ.

n8n là gì?
----------

[n8n](https://n8n.io/) (tên đầy đủ là "**Nodemation**") là một công cụ tạo ra các công việc tự động, và kết nối các công việc đó thành một chuỗi, chuỗi đó gọi là **workflows**. Workflows có thể được chạy tự động, n8n thực hiện các workflows của bạn lặp đi lặp lại mỗi tuần, mỗi ngày, mỗi giờ, hoặc dựa theo một sự kiện nào đó mà bạn cài đặt. Nó sẽ giúp bạn tiết kiệm được nhiều thời gian.

Đặc biệt, bạn có thể tự cài đặt n8n lên máy chủ của mình và có thể tùy biến sử dụng trên đó.

![](https://codetheworld.io/wp-content/uploads/2020/08/screenshot-n8n-chatwork-node.herokuapp.com-2020.08.14-23_09_19.png)

n8n-nodes-chatwork là gì?
-------------------------

Hiện tại n8n đã hỗ trợ sẵn rất nhiều "node", hỗ trợ rất các dịch vụ phổ thông.

![](https://codetheworld.io/wp-content/uploads/2020/08/screenshot-n8n.io-2020.08.14-23_20_57.png)

Đây là danh sách các dịch vụ đã được hỗ trợ, tại thời điểm viết bài:

```text
Active Campaign Trigger, Active Campaign Trigger, Acuity Scheduling Trigger, ActiveCampaign, Affinity, 
Affinity Trigger, Agile CRM, Airtable, AMQP Sender, AMQP Trigger, Asana, Asana Trigger, AWS Lambda, AWS S3, 
AWS SES, AWS SNS, AWS SNS Trigger, Bannerbear, Bitbucket Trigger, Bitly, Box, Box Trigger, Calendly Trigger, 
Chargebee, Chargebee Trigger, CircleCI, Clearbit, ClickUp, ClickUp Trigger, Clockify Trigger, Cockpit, Coda, 
Copper Trigger, CrateDB, Cron, Crypto, Customer.io Trigger, Date & Time, Discord, Disqus, Drift, Dropbox,
Edit Image, EmailReadImap, Error Trigger, Eventbrite Trigger, Execute Command, Execute Workflow, Facebook Graph API,
FileMaker, Flow, Flow Trigger, Freshdesk, FTP, Function, Function Item, GitHub, Github Trigger,
GitLab, GitLab Trigger, Google Calendar, Google Drive, Google Sheets , Google Tasks, GraphQL, Gumroad Trigger,
Hacker News, Harvest, HelpScout, HelpScout Trigger, HTML Extract, HTTP Request, HubSpot, HubSpot Trigger, 
Hunter, IF, Intercom, Interval, Invoice Ninja, Invoice Ninja Trigger, Jira Software, Jira Trigger,
JotForm Trigger, Keap, Keap Trigger, link.fish Scrape, Mailchimp, Mailchimp Trigger, Mailgun, Mailjet,
Mailjet Trigger, Mandrill, Mattermost, Mautic, Mautic Trigger, Medium, Merge, MessageBird, Microsoft Excel,
Microsoft OneDrive, Microsoft SQL, Mocean, Monday.com, MongoDB, Move Binary Data, MSG91, MySQL, NextCloud,
No Operation, do nothing, OpenWeatherMap, PagerDuty, PayPal, PayPal Trigger, Philips Hue, Pipedrive,
Pipedrive Trigger, Postgres, Postmark Trigger, QuestDB, Read Binary File, Read Binary Files, Read PDF, Redis, 
Rename Keys, RocketChat, RSS Read, Rundeck, Salesforce, Salesmate, Segment, Send Email, Set, Shopify,
Shopify Trigger, SIGNL4, Slack, sms77, Split In Batches, Spotify, Spreadsheet File, SSE Trigger, Start,
Stripe Trigger, SurveyMonkey Trigger, Switch, Telegram, Telegram Trigger, Todoist, Toggl Trigger, TravisCI,
Trello, Trello Trigger, Twake, Twilio, Twitter , Typeform Trigger, Uplead, Vero, Webflow Trigger, Webhook,
WooCommerce, WooCommerce Trigger, WordPress, Write Binary File, Xero, XML, Zendesk, Zendesk Trigger, Zoho CRM,
Zoom, Zulip
```

Nhưng trong danh sách này lại không có Chatwork, để tích hợp Chatwork vào công cụ này, chúng ta có thể sử dụng node HTTP Request để giao tiếp với Chatwork api. Nhưng các này có nhiều điểm không thuận tiện: Phải viết đi viết lại nhiều lần, quản lý api key...

Đây là lý do n8n-nodes-chatwork được tạo ra, node này sẽ giúp cho việc tích hợp với Chatwork dễ dàng hơn trong n8n.

![](https://codetheworld.io/wp-content/uploads/2020/08/screenshot-n8n-chatwork-node.herokuapp.com-2020.08.15-14_04_25.png)

n8n-nodes-chatwork là một n8n custom node, có nghĩa là node này sẽ không phải là node mặc định khi bạn sử dụng n8n. Hiện tại bạn chỉ có thể sử dụng node này nếu bạn tự cài đặt n8n lên máy chủ của mình.

Cách cài đặt các bạn có thể tham khảo ở link này: [n8n-nodes-chatwork](https://www.npmjs.com/package/n8n-nodes-chatwork)

Tổng kết
--------

Bài viết này chỉ mang tính chất giới thiệu, các bạn có thể tự tìm hiểu để cài đặt n8n và sử dụng n8n-nodes-chatwork.

Mình đang phát triển n8n-nodes-chatwork trong thời gian rảnh, sẽ rất vui nếu có người hứng thú góp ý, cùng thực hiện cùng để cải thiện chất lượng của node này.

Đây là những api đã hoàn thành:

```mardown

- `/me` - Used to access your account information

- [x] `GET /me` - Get your account information

- `/my` - Used to access your data on the account.

- [x] `GET /my/status` - Get the number of: unread messages, unread To messages, and unfinished tasks.

- [x] `GET /my/task` - Get the list of all unfinished tasks.

- `/contacts` - Used to access the list of your contacts

- [x] `GET /contacts` - Get the list of your contacts

- `/rooms` - Used to access information such as messages, members, files, and tasks associated to a specific conversation.

- [x] `GET /rooms` - Get the list of all chats on your account

- [ ] `POST /rooms` - Create a new group chat

- [x] `GET /rooms/{room_id}` - Get chat name, icon, and Type (my, direct, or group)

- [x] `PUT /rooms/{room_id}` - Change the title and icon type of the specified chat

- [ ] `DELETE /rooms/{room_id}` - Leave/Delete a group chat

- [x] `GET /rooms/{room_id}/members` - Get the list of all chat members associated with the specified chat

- [ ] `PUT /rooms/{room_id}/members` - Change associated members of group chat at once

- [x] `GET /rooms/{room_id}/messages` - Get all messages associated with the specified chat

- [x] `POST /rooms/{room_id}/messages` - Add new message to the chat

- [x] `GET /rooms/{room_id}/messages/{message_id}` - Get information about the specified message

- [ ] `PUT /rooms/{room_id}/messages/{message_id}` - Update the specified message

- [x] `DELETE /rooms/{room_id}/messages/{message_id}` - Delete the specified message

- [ ] `GET /rooms/{room_id}/tasks` - Get the list of tasks associated with the specified chat

- [ ] `POST /rooms/{room_id}/tasks` - Add a new task to the chat

- [ ] `GET /rooms/{room_id}/tasks/{task_id}` - Get information about the specified task

- [ ] `GET /rooms/{room_id}/files` - Get the list of files associated with the specified chat

- [ ] `GET /rooms/{room_id}/files/{file_id}` - Get information about the specified file

- `/incoming_requests` - You can access contact approval requests you received

- [ ] `GET /incoming_requests` - You can get the list of contact approval request you received

- [ ] `PUT /incoming_requests/{request_id}` - You can approve a contact approval request you received

- [ ] `DELETE /incoming_requests/{request_id}` - You can decline a contact approval request you received

```

Mã nguồn của dự án được public tại link: <https://github.com/hoangsetup/n8n-nodes-chatwork>

Hiện tại, có khá nhiều việc phải làm:

![](https://codetheworld.io/wp-content/uploads/2020/08/screenshot-github.com-2020.08.15-14_25_00.png)

Dự án được viết bằng Typescript, tài liệu bắt đầu để tham gia phát triền sản phẩm các bạn có thể đọc ở link này: <https://github.com/hoangsetup/n8n-nodes-chatwork/blob/master/CONTRIBUTING.md>

![](https://codetheworld.io/wp-content/uploads/2020/08/Screen-Shot-2020-08-15-at-2.29.40-PM.png)

Ở bài viết sau, mình sẽ nói chi tiết hơn về việc làm thế nào để tham gia phát triền n8n-nodes-chatwork.

Mình đăng bài viết này ở đây vì Viblo là một cộng đồng có lượng thành viên sử sụng Chatwork tương đối lớn, hy vọng tìm được người sử dụng cho gói n8n-nodes-chatwork này :D .

Bài viết được đăng bởi cùng tác giả tại [https://codetheworld.io/gioi-thieu-n8n-nodes-chatwork.html](https://codetheworld.io/gioi-thieu-n8n-nodes-chatwork.html).