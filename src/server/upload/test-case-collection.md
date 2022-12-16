Bộ tesecase này mình tổng hợp từ kinh nghiệm 6 năm trong nghề và sau khi tham khảo các tài liệu trên mạng. 
Phù hợp cho những bạn Fresher đang cần một cái nhìn tổng quan khi test các function cơ bản

Test Case Collection 

:watermelon: I. REGISTER 
- User Name 
- First Name 
- Last Name 
- Password 
- Confirm Password 
- Email Id 
- Date of birth 
- Terms of use 
- Submit button 
- Login (If you already have an account) 
1. Verify that the Registration form contains Username, First Name, Last Name,  Password, Confirm Password, Email Id, Phone number, Date of birth, Gender,  Location, Terms of use, Submit, Login (If you already have an account). 
2. Verify that tab functionality is working correctly or not (The user can use tab key to  move the mouse up OR down). 
3. Verify that Enter key works as Submit button. 
4. Verify that all the fields such as Username, First Name, Last Name, Password and  other fields have a placeholder text or not. 
5. Verify that all the mandatory fields are marked with * against the field. 
6. Verify that clicking on submit button after entering all the mandatory fields, submits  the data to the server. 
7. Verify that system displays error message when clicking on submit button without  filling all the mandatory fields. 
8. Verify that the system displays error message if user input only spacing for required  fields. 
9. Verify that clicking on submit button by leaving optional fields, submits the data to  the server without any validation error. 
10. Verify that system displays error message when entering existing username 11. Verify the limit character of the textboxes. 
12. Verify that the username validation as per business requirement (in some  application, username should not allow numeric and special characters). 
13. Verify that the validation of all the fields are as per business requirement.
14. Verify that the date of birth field should not allow the dates greater than current date  (some applications have age limit of 18 in that case you have to validate whether the  age is greater than or equal to 18 or not). 
15. Verify that the show error message when user input invalid Email. 16. Verify that the system trims the spacing before and after the text. 
17. Verify that the “terms and conditions” checkbox is unselected by default (depends  on business logic, it may be selected or unselected). 
18. Verify that the system displays error message when clicking on submit button  without selecting “terms and conditions” checkbox. 
19. Verify that the password is in encrypted form when entered. 
20. Verify whether the password and confirm password are same or not. 21. Verify that the user can paste data into fields. 

:watermelon: II. LOGIN PAGE 
- Email/phone number/username 
- Password 
- Login button 
- Remember me checkbox 
- Forgot password link 
- Sign up/create an account link 
- CAPTCHA 
1. Verify that the cursor is focused on “username” text box on the login page. 2. Verify that the login screen contains all elements as design document. 3. Verify that all the fields such as username, password has a valid placeholder. 4. Verify that user is able to login with valid credentials. 
5. Verify that the user is not able to login with invalid username and invalid password. 6. Verify that user is not able to login with valid username and invalid password. 7. Verify that the user is not able to login with invalid username and valid password. 8. Verify that user is not able to login with blank username or password. 9. Verify that user is not able to login with inactive credentials. 
10. Verify that clicking on browser back button after successful login should not take  user to log out mode. 
11. Verify that user should be able to login with the new password after changing the  password. 
12. Verify that user should not be able to login with the old password after changing the  password. 
13. Verify that the user is still logged in after series of actions such as sign in, close  browser and re-open the application. 
14. Verify that “remember password” checkbox is unselected by default (depends on  business logic, it may be selected or unselected). 
15. Verify that the system auto logins if the session is timeout. 
16. Verify that the logout link is redirected to login/home page. 
17. Verify that user is redirected to ‘’home’’ page after successful login. 
18. Verify that user is redirected to ‘’forgot password’’ page when clicking on ‘’forgot  password’’ link. 
19. Verify that user is redirected to ‘’create an account’’ page when clicking on sign up/  create an account link. 
20. Verify that validation message is displayed in case user leaves username or  password as blank. 
If there is a captcha on the login page, we should... 
21. Verify that there is an error message when user doesn’t enter CAPTCHA. 22. Verify that the refresh link of CAPTCHA is generating a new CAPTCHA. 

:watermelon: III. FORGOT PASSWORD 
1. Verify that the forgot password link is directing to forgot password link page. 2. Verify that the page asks for an email id to send the link. 
3. Verify that the link was sent to the mail which provided by that user. 4. Verify that the link was sent just can use one time. 
5. Verify that the system only accepts if the new password and the confirm  password are the same. 
6. Verify that once the new password is accepted then the current section should  re-direct user to login page. 
7. Verify that the user can login to system with the new password. 8. Verify time duration to access the link. It should not for long time (This depends  on business requirement). 
9. To check if the password is set then it moves to the account page.

:watermelon: IV. LINKS 
1. Verify that all the links open exactly the page as requirement. 
2. Verify that email address links open the mail like outlook. 
3. Verify that the links change color after user clicks on them (It depends on the  requirement). 
4. Verify that there is no blank page after linking. 
5. Verify that the link color is shown as requirement. 
6. Verify that a hand icon is displayed when user mouse hover on the link. 7. Verify that the shared link will be shared with correct data. 
8. Verify that the shared link can open with correct data. 

:watermelon: V. FORMS 
1. Verify that the form position is shown as design. 
2. Verify that all items in a form look as design/requirement. 
3. Verify that an asterisk (start icon) is displayed near required fields. 4. Verify that the heading of the form is shown correctly as requirement. 5. Verify that save and cancel buttons work correctly in the form. 
6. Verify that the system shows an error message if user leaves required fields blank. 7. Verify that the user can input data for all fields using tab key. 
8. Verify that multiple clicks on the submit will not cause many progresses. 
:watermelon: VI. SEARCH BOX AND SEARCH RESULT 
1. Verify that the “search” function is not working if there is no text inputted. 2. Verify that the “cancel” or “x” icon will remove the text inside. 
3. Verify that there is an auto suggestion or not (it depends on requirement). 4. Verify that the system allows both uppercase and lowercase when searching. 
5. Enter the search criteria in search field which will give only one result and verify the  UI and results. 
6. Enter the search criteria in search field which will not give any results then verify the  UI and results → Should display a message in this case. 
7. Enter first / middle/ last word of any title then verify the search results.
8. Enter the value in search field which will give multiple results then: a. Verify the UI and pagination. 
b. Verify sorting order of search results. 
c. Validate the search results and no. of Search results from the database. 9. Add a new item in the system then search by search box → Verify the result. 
10. Update title of any existing items then search updated item through the search field  with the old and new title → Verify the result. 
11. Remove an existing item from the system then search removed item through the  search field → Verify the result. 
12. Verify that users are able to search public items only.  
13. Check the total number of results to be displayed in one page. 14. Verify that duplicate records should not be displayed in result. 
15. Verify that pagination should be enabled when there are more results than the  default result count per page. 
16. Verify that the number of result appears on a page is the same on all pages till last  page. 
17. Verify that search keyword will be highlighted in the search results page and also in  the page where the keyword exists. 
Don’t forget to verify all above test cases on all pages where search box is available. 

:watermelon: VII. TEXT BOXES AND TEXT AREAS 
1. Verify the data type is accepted for each textbox as requirement.
2. Verify that the textbox is blank /or have placeholder by default. 
3. Verify that the system doesn’t allow only spacing on required fields. 
4. Verify that the user can go to those fields by using the tab key. 
5. Verify that the system allows copy and paste texts from word or notepad, etc. 
6. Verify that the height and alignment of text boxes are shown as requirement.  
7. Verify that the spacing before and after text will be trim after saving.

:watermelon: VIII. BUTTONS 
 Radio button 
1. Verify that the user can select a radio button. 
2. Verify that there is only one radio button being selected at a time. 
3. Verify that the radio button label description is displayed as requirement. 4. Verify that the size and color of the button are displayed as requirement. 5. Verify the alignment of the radio buttons. 
 Checkbox 
1. Verify that the user can select checkbox. 
2. Verify the checkbox button label is shown as requirement. 
3. Verify the alignment of the check boxes. 
4. Verify the height, length and width of each box. 
5. Verify that the user can check multiple boxes at a time. 
6. Verify that the check box can be ticked. 
7. Verify that the checkbox can be unticked. 
 Command buttons (add/edit/delete) 
1. Verify that the font size, color look as design. 
2. Verify that when user clicks on the “add” button then record should be added. 3. Verify that when user clicks on the “delete” button, a confirm pop-up will appear.  4. Verify that the value gets modified when user clicks on edit/update buttons. 

:watermelon: IX. PASSWORD 
1. Verify that the password is encrypted when being entered. 
2. Verify that the password can be pasted from other sources. 
3. Verify that encrypted characters in “password” field should not be allowed to  decipher if being copied. 
4. Verify that the system only accepts the password format as requirement (alphabets,  numbers and special characters). 
5. Verify that the password has length as requirement. 
6. Verify that the system shows an error message if user inputs a wrong format  password.
7. Verify that spaces should not be allowed before any password characters  attempted. 

:watermelon: X. IMAGE/FILE UPLOAD 
1. Verify that the system allows image path. 
2. Verify that the upload functionality allows many formats (e.g. JPEG, PNG, BMP etc.)  - This depends on the requirement. 
3. Verify that the system allows upload images which have space or special characters  in file name. 
4. Verify that the system shows a confirm popup if user uploads duplicate name image. 
5. Verify that the system shows an error message if user uploads an image with size  greater than the max allowed size. 
6. Verify that the system shows an error message if user uploads file types which are  not allowed (e.g. txt, doc, pdf, exe etc.). 
7. Verify the height and width that are accepted or rejected (This depends on the  requirement). 
8. Verify that the progress bar will appear while uploading. 
9. Verify that the cancel button is working while uploading. 
10. Verify that the user can upload multiple images. 
11. Verify that the “image quality” doesn’t change after being uploaded. 12. Verify that user is able to use/view the uploaded images. 
XI. DROPDOWN FILTER 
1. Verify that system shows default selected value in dropdown as requirement. 2. Verify the maximum character length displays in the dropdown. 3. Verify the maximum number of values displays in dropdown without a scroll bar. 4. Verify that the dropdown should be opened by clicking OR keyboard arrow. 
5. Verify that once dropdown is selected, you should be able to select values by  keyboard arrow keys or mouse scroll. 
6. Verify that the user can not able to edit the dropdown value. 
7. Verify that dropdown values are arranged in alphabetical order (This depends on  requirement).

:watermelon: XII. CALENDAR CONTROL 
1. Verify that the max day of Feb should be 29. 
2. Verify that the user can enter zero before the single digit number in date/month. 
3. Verify that the system auto populates calendar filed if user clicks on box or on  calendar icon. 
4. Verify that the user can be able to select the desired day/month on the calendar. 5. Verify that the date should be shown on the box after user selects on calendar. 6. Verify that the “calendar” field can be able to edit (this depends on the requirement). 7. Verify that the system should show the correct format date in the box. 8. Verify that the calendar control is opening in all browsers. 

:watermelon: XIII. MESSAGES 
1. Verify that the messages have correct spelling and grammar. 
2. Verify that alert/error messages should be shown in red color. 
3. Verify that all alert messages should display a question mark. 
4. Verify that a confirmation message of successful functionality should be in green  color. 
5. Verify that the system should show confirmation before delete functionality. 6. Verify font, alignment, size, spacing and color of the messages as requirement. 7. Verify that the message should be easily understandable. 
8. Verify that the messages should disappear once on a new page. XIV. REPORTS  
1. Verify that the reports will be generated for respective data. 
2. Verify that the data must be reflected same as given input. 
3. Verify that any changes in input will be immediately updated in reports on refresh. 4. Check for different formats of reports.

:watermelon: XV. VALIDATE DATA TYPE 
Number 
 Integer: An integer can be positive, negative, or zero (123, -123, 0) 
 Decimal: A decimal includes digit after the decimal separator (123.00 OR 1,234.00 OR  0.1233) 
1. Verify that the system doesn’t allow users to input text. 
2. Verify that the system doesn’t allow any texts before or after the number., eg "$5.00",  "4 lbs", "about 60", "50+". 
3. Verify that the system doesn’t allow spacing only. A number must be included. 4. Verify that the system doesn’t allow leading 0 before number. 
5. Verify that the system doesn’t allow special characters. 
6. Verify that the system doesn’t allow both plus and minus sign, eg "+-4" and "-4e+30". 
7. Verify that the system doesn’t allow multiple decimals and commas (eg, "4..4" and  "4,,434.4.4"). 
8. Verify that the system doesn’t allow “e” character, eg "4e4e4" "4EE4". 9. Verify that the system doesn’t allow long numeric strings  
String 
1. Verify that the input text is accepted in both upper and lower case. 2. Verify that the input text is accepted in numeric, special character, spacing, etc. 3. Verify max-min character limit.  
4. Verify that the system allows <HTML> tag and it doesn’t change after saving. 5. Verify that the system allows <Javascript> and it doesn’t change after saving. 

:watermelon: XVI. CHAT FUNCTION
1. Verify that two Users should be available for the chat. 
2. Verify that Chat application has been installed in two devices at least. 3. Verify that Chat application should be launch or evoke. 
4. Verify that Users are able to send requests to other Users for chat or not. 5. Verify that how many number of words or characters can be send in a time. 6. Verify that Status (Active, Inactive, Invisible, etc.) of User is changing or not. 7. Verify that User is able to create Account in Chat application or not.
8. Verify that User is able to Login in Chat application or not. 
9. Verify that User is able to Login in a system simultaneously with two or more different  IDs or not. 
10. Verify that User is able to send messages to other offline User. 
11. Verify that User is able to see the time of comment in Chat or not. 12. Verify that User is able to send special characters in Chat or not. 13. Verify that User is able to set its profile pic which is visible to other users or not. 14. Verify that Users are able to accept requests from other Users for chat or not. 15. Verify that Users are able to Add or Remove other Users from their Chat list or not. 16. Verify that Users are able to create a Chat group or not. 
17. Verify that Users are able to Chat with their group or not. 
18. Verify that Users are able to see current Chat/discussion in the group. 19. Verify that Users are able to see Chat history of the group or not. 20. Verify that Users are able join current Chat/discussion in their group. 
21. Verify that Multiple Users can do Chat or discussion in their group simultaneously and  every Chat should be visible to every member of the group. 
22. Verify that Chat application or functionality saves their Chat history or removes after  session expire/ Chat application close. 
23. Verify that name of the User should be displaying to others in Chat application while  chatting with other Users or group. 
24. Verify that whenever any member join or leave the Chat / discussion then it should be  notified in the group and is visible to every member of the group. 
25. Verify that User is able to edit or delete its Chat or not. 
26. Verify that User is able to share Image, Video, documents etc or not. 27. Verify that User is able to share hyperlinked URL, Emails or not. 28. Verify that Profanity filter has been used in Chat application / functionality or not. 
29. Verify that is there any size limit of files if any file (Video, Image, Documents etc.) is  uploading and sharing through the Chat application / functionality. 
30. Verify that the User is able Chat in any language to the Users if that language is locally  identified and registered by the governing body or not. 
31. Verify that the User is able Chat in any language to the Users if that language is  globally identified or not. 
32. Verify that the User is able to translate the Chats of other users in any desired  language or not.
33. Verify that Chat application is able to display that which device has been used to send  message or not. 
34. Verify that Chat application is able to display that whether comment or comments  have been seen by the respective User or not. 
35. Verify that User is chatting with only original Users not any bot. 
36. Verify that User is able to send any emoticons or not. 
37. Verify that User is able to use Copy and Paste functionality in Chat functionality or  not. 
38. Verify that User is able to Chat with two or more different devices with one ID at a  time to other user or in a group. 
39. Verify that “Does a User is able to login in two different devices at a time or not?” 40. Verify that “How much time is it taking to send a message from one User to another?” 41. Verify that “How much time is it taking to send a message in a group?” 
42. Verify that “How much time is it taking to send a message from one User to another  if internet is weak?” 
43. Verify that “How long a chat can be saved?” 

:watermelon: XVII. CREATE A NEW RECORD
1. Verify that the create form contains all fields as design. 
2. Verify that tab functionality is working correctly (The user can use tab key to move  the mouse up OR down). 
3. Verify that Enter key works as Create button. 
4. Verify that all fields have a placeholder text or not. 
5. Verify that all the mandatory fields are marked with * against the field. 
6. Verify that clicking on create button after entering all the mandatory fields, submits  the data to the server. 
7. Verify that system displays error message when clicking on create button without  filling all the mandatory fields. 
8. Verify that the system displays error message if user input only spacing for required  fields. 
9. Verify that clicking on create button by leaving optional fields, submits the data to the  server without any validation error.

:watermelon: XVIII. EDIT A RECORD
1. Verify that the system re-direct the user to Edit page when user click on Edit button. 2. Verify that all the data which inputted when create record are shown on edit page. 3. Verify that there are 2 button are “Cancel” and “Save” into that form. 4. Verify that the create form contains all fields as design. 
5. Verify that tab functionality is working correctly (The user can use tab key to move  the mouse up OR down). 
6. Verify that Enter key works as Save button. 
7. Verify that all the mandatory fields are marked with * against the field. 8. Verify that clicking on save button after entering all the mandatory fields, submits the  data to the server. 
9. Verify that system displays error message when clicking on save button without filling  all the mandatory fields. 
10. Verify that the system displays error message if user input only spacing for required  fields. 
11. Verify that clicking on create button by leaving optional fields, submits the data to  the server without any validation error. 
12. Verify that if user click on “Cancel” button then the old data is keep. 13. Verify that the field which not allow edit still shows data but it is disable. 

:watermelon: XIX. DELETE A RECORD
1. Verify that the system displays confirm message when user delete a record. 2. Verify that when the user clicks on OK button at confirm pop-up then the record is  removed from the list. 
3. Verify that when user clicks on Cancel button then nothing the record is not  removed. 
4. Verify that the record which just removed cannot find by search tool. 5. Verify that no user can see the removed records.