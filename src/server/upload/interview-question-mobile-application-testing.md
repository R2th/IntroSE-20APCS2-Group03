![image.png](https://images.viblo.asia/faa4a660-7aa8-4392-b618-3e7a5a7be42c.png)


Our Manual Testing Interview Questions and Answers blog guides you to master this field through the carefully collated set of Manual Testing interview questions. 

This series is intended to support you go to an interview, so I will use the simplest words and the answer will be short and easy to remember.

Good luck :smiley::smiley:

# 1. What are the types of mobile applications?

Mobile applications are of three types:

* **Native Application**: Native app installed from application store like Android’s google play and apple’s app store. The application which can be installed into your devices and run is known as a native application e.g. whats App, Angry Bird, etc.

* **Web Application**: Web applications run from mobile web browsers like Chrome, Firefox, Opera, Safari, etc using mobile network or WIFI. E.G. of web browser applications is m.facebook.com, m.gmail.com, m.yahoo.com, m.rediffmail.com, etc.

* **Hybrid Application**: Hybrid apps are combinations of native app and web apps. They can run on devices or offline and are written using web technologies.


# 2. What are the defects tracking tools used for mobile testing?

You can use the same testing tool which you use for web application testing like QC, Jira, Rally, and Bugzilla, etc.

# 3. What all major networks are considered while performing application testing?

You should test the application on 4G, 3G, 2G, and WIFI. 2G is a slower network, it’s good if you verify your application on a slower network also to track your application performance.

# 4. When performing a sanity test on the mobile application what all scenarios should be taken into consideration?

1.  Installation and uninstallation of the application
2.  Verify the device in different available networks like 2G, 3G, 4G, or WIFI
3.  Functional testing
4.  Interrupt testing- Able to receive the calls while running the application
5.  Compatibility testing – able to attach the photo in the message from the gallery
6.  Test application performance on a different handset.
7. Test your application on multiple devices
8. By changing the port and IP addresses to make sure the device is getting connected and disconnected properly
9. By testing your web application on different mobile browsers like Chrome, Firefox, opera, dolphin, etc

# 5. What is the best way to test the different screen sizes of the devices?

 Using emulator. But sometimes emulator also has bugs. So the better way is to define devices that are usually used by end-users. We will test it with real devices and others will use the emulator for testing them.
 
#  6. What is the basic difference between Emulator and Simulator?

1. An emulator is an application that allows your mobile phone to emulate the full features of a computer or other mobile software by installing them on your computer or mobile device. However, it is only relative to the real device.

2. Simulator is a less complex application, it simulates some behavior of a device, but does not mimic the hardware and does not work on the real operating system. The simulator will create a simulation application similar to mobile products to every detail, as realistic as possible.

# 7. What is the difference between Emulator/Simulator and a real device?

There is some difference as following:

**1. Pricing:**
* For a real device, you have to pay a big cost
* For emulator or Simulator, it's almost free. You only need to download and install it.

**2. Processing speed:**
* For real devices, it will process faster. But it can be slower and depend on network
* For the emulator or simulator, it will process slower. But compared to real devices, it has fewer problems related to network latency.

**3. Debugging:**

* For real devices, it's quite difficult to debug 
* For emulator or simulator, it can be easier to debug. Moreover, it also supports capturing the screen

**4. Interactive ability**

* Interact with real device for high reliability
* For emulator or simulator, it is not possible to describe all types of user interactions, so errors may happen and reliability is lower.
Moreover, an emulator/simulator can't mimic the following features:
- Mobile phone battery
- Mobile phone camera
-  Difficult mimicking interruptions on calls or sending SMS messages.
- There are not too many realistic simulations for mobile phone memory usage. 

# 8. What are the common challenges in mobile application testing?

We have to work on:

* Different operating systems
* Multiple devices
* A variety of handsets
* Different networks
* A variety of screen size

# 9. What is the strategy used to test the new mobile app?

* System integration testing
*  Functional testing
*  Installation and uninstallation of the app
*  Performance
*  Check-in multiple mobile operating systems
*  Cross-browser and cross-device testing
*  Gateway testing
*  Network and battery testing

# 10. What does a test plan for Mobile App contain?

Test plan for the mobile app is very similar to software app:

1. Objective
2. Automation tools required
3. Features to be tested
4. Features not to be tested
5.  Test strategy
6.  Resource
7.  Role and responsibility
8.  Deliverable documents


# 11. Can you tell me what the tests that are generally performed are in the standard Android strategy?

1.  Unit Test
2. Integration Test
3. Operation Test
4. System Test

# 12. List out the types of mobile app testing?

The types of mobile app testing include:
* ** Usability Testing**
*  **Compatibility testing**
*  Interface testing
*  Services testing
*  **Performance testing**
*  Operational testing
*  Installation testing
*  **Security testing**

# 13. Mention what are the common bugs found while mobile testing?

- Critical: Your phone system crash when testing a particular feature 
- Block: Unable to do anything though the phone is on unless you reboot your device
- Major: Unable to perform a function of a particular feature
- Minor: Under minor bugs usually GUI bugs fall

# 14. Explain how A/B testing is done for the ios app?

A/B testing for ios includes three steps:
* Configure a test: It prepares two versions of your IOS app (A&B) and tests metric
* Test: Tests two IOS versions above on devices simultaneously
* Analyze: It selects and measures better version to release

# 15. Explain what does mobile security testing include:

Mobile security testing includes:
* Checks for multi-users supporting without interfering the data of them
* Checks for access to files stored in the app by  any users
* Decryption or Encryption method used for sensitive data communications
* Detect sensitive areas in the tested application so that they do not receive any malicious content