That stores your password and allow you to login using those credentials in future. 

Benefits :- AutoFill simplifies the login and account creation for your app. The system will be handling auto filling the user’s password in case of login, or generate a unique and strong passwords when creating an account. Main benefit is that the users don’t even need to remember their password, since the system handles everything. Additionally, auto generating strong passwords will increase the security of your app. User data is saved in the users device and is synced to the iCloud keychain and will be available to all the devices using the same iCloud.

How to enable autofill?
Just set the textContentType for each Textfield.
txtUserName.textContentType = .username
txtPassword.textContentType = . password

App Id Creation and Enable Associated Domain: - 
First start with creation of an app in Apple Developer Centre with Enable “Associated Domains” and “AutoFill Credential Provider”.

After Create App ID, create a Provision profile for that App ID and you are ready to use that in you XCode project.
XCode Project Setup: -

Step 1: - Enable Associated Domain and Autofill Credential provider in your Project Capabilities Section

Associated Domain is used to store your credentials for that particular Domain or you can add multiple domains in that section.

Step 2: - Server-Side Coding

2.1) Create an apple-app-site-association file on your server and create that json file 

echo '{"webcredentials":{"apps”:[“AppID Prefix.com.YourBundleID”]}}’ > json.txt

Step 3: - Coding

3.1) Create a function to store your credentials with domain

class func updateSafariCredentials(username: String, password: String) {

let domain: CFString = "example.com" as CFString

SecAddSharedWebCredential(domain, username as CFString, password as CFString) { (error) in
print(error ?? "")
}
}

This method will open a Popup menu in order to ask for the permission of saving password and your password will be saved in iCloud keychain.

3.2) Retrieve Saved password

This Methods will retrieve your saved password.

class func checkSafariCredentialsWithCompletion(completion: @escaping ((_ username: String?, _ password: String?) -> Void)) {

let domain: CFString = "example.com" as CFString

SecRequestSharedWebCredential(domain, .none, {
(credentials: CFArray!, error: CFError?) -> Void in

if let error = error {
print("error: \(error)")
completion(nil, nil)
} else if CFArrayGetCount(credentials) > 0 {
let unsafeCred = CFArrayGetValueAtIndex(credentials, 0)
let credential: CFDictionary = unsafeBitCast(unsafeCred, to: CFDictionary.self)
let dict: Dictionary<String, String> = credential as! Dictionary<String, String>
let username = dict[kSecAttrAccount as String]
let password = dict[kSecSharedPassword as String]
DispatchQueue.main.async {
completion(username, password)
}

} else {

DispatchQueue.main.async {
completion(nil, nil)
}
}
});
}

Step 4:- Setting
4.1) Launch the Settings app on your iOS device → Passwords & Accounts.
4.2) Now, tap on Website & App Passwords.
4.3) You need to go to Settings → Safari → AutoFill → Turn on the switch next to Names and Passwords.