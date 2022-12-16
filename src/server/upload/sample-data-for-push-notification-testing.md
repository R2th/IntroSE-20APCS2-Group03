# 1. Intro
Last time I made an article about sample testing data for sending email.<br>
[Sample Data for Testing Sending Email Function](https://viblo.asia/p/sample-data-for-testing-sending-email-function-924lJDE6KPM)<br><br>
This time I list up sample data for testing data for push notification.<br>
Push notification is important function for any services, so I suppose you test this function carefully.<br>
However, some incidents happen sometimes like sending notifications to real users.<br>
A broken egg cannot be put back together. Incident is Incident.<br>
But if we use sample data below, we can minimize our damage.<br><br>
※Notification for PC needs Title and Content, but it needs only content for smartphone. So, you can skip Title for testing on smartphone.

# 2. Sample Data for Local Notification
* ## 2-1. Sample 1 (Simple)<br>
    ### Title
   ` 【テスト】ローカル通知Test1`<br>
    ### Content
    `ローカル通知テスト1中です。This is test notification!`
* ## 2-2. Sample 2 (Long text on content)<br>
    ### Title
    `【テスト】ローカル通知Test2`<br>
    ### Content
   ` これはローカル通知テスト2です。This is Local notification2 test!`(49 characters)

# 3. Sample Data for Remote Notification
* ## 3-1. Sample 1 (Simple)<br>
    ### Title
    `【テスト】リモート通知Test1`<br>
    ### Content
    `リモート通知テスト1中です。This is test notification!`
* ## 3-2. Sample 2 (Long text on content)<br>
    ### Title
   ` 【テスト】リモート通知Test2`<br>
   ### Content
   `これはリモート通知テスト2です。This is Remote notification2 test!`(50 characters)<br>
   
# 4. Conclusion
Thanks for reading my post!<br>
I will keep uploading posts about test sample data.<br>
Keep checking my posts.<br>
Bye!<br>