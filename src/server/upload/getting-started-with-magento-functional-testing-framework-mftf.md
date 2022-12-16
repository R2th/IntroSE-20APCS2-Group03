![](https://images.viblo.asia/35961d07-1a73-45b5-8cb2-86cebb4a9658.jpg)

Magento Functional Testing Framework (MFTF) was introduced by Tom Erskine at Mage Test Fest. MFTF has already seen 2 major releases and the latest version available till today is 2.3.12.

Before, getting to know about the MFTF (Magento functional Testing framework), we should be aware of the Functional Testing framework.

-----

## **What is Functional Testing Framework(FTF)?**
FTF is an open source cross-platform solution where we can develop functional tests for a Magento application. These tests can be performed at any time with the options of –

* Running a single test independently
* Running multiple tests together as a test suite
* Running all available tests in one-go

Tests usually cover the functionality of a business entity. The goal is to find discrepancies between expected and real behavior of the entity.

-----

## **What is the need for functional testing?**
Magento 2 offers a very complex architecture and it becomes very difficult to manually test everything. Also, manual testing can result in human mistakes due to complex flows.

Although unit and integration testing can cover the whole code but still don’t guarantee that everything will execute in the same way on different devices and browsers.

-----

## **What is Magento Functional Testing Framework (MFTF)?**
MFTF is a set of ready-made tests that check if a Magento 2 system functionality runs as expected. MFTF is based on selenium, codeception, allure etc.

**Key Features of MFTF –**

* Flexible, because of modularity support.
* Customizability, for existing tests.
* Informative, because of the reporting tool.
* Suitable, because of test suites.
* Compatible, because of web driver selection

-----

## **Benefits of MFTF over Unit Tests**
* **XML**
MFTF tests are written in XML, so, you no longer need to learn PHP to write tests.

* **Merging**
Merging is the most beneficial feature of MFTF. For example, we add a new field to the existing registration form of Magento website.

In the case of unit testing, we need to write test cases again for the complete page but in MFTF, we just need to provide extra attribute details and rest we can use the same test case code from the core.

-----

## **Environment setup for MFTF**
* **PHP version**
Upgrade your PHP version according to Magento instance which you are using. In our case, we will be using Magento 2.3, and our PHP version is 7.2.13

* **Composer**
Install the composer on your environment. Please follow the below link to install composer.

https://getcomposer.org/download/

* **Java**
You need to install Java on your system to run Selenium server.

* **Selenium server**
Now install selenium jar file on your instance, which will help you to run MFTF test cases.

Download the jar file and place it in the Magento root directory or some server (depends upon your requirement). Please follow the below link for download –

https://www.seleniumhq.org/download/

* **Web Browser Driver**
You need browser driver (Mozilla, Chrome, Safari) to run your test cases. In our case, we are using the Google Chrome Driver. Follow the below link for download –

https://sites.google.com/a/chromium.org/chromedriver/downloads

-----

## **Step by step guide to setup Magento Functional Testing Framework**
### * ### **Step 1 – Fresh Install Magento 2.3**
I hope you are already aware of Magento 2 installation. But still, if you are new please refer to the following link for Magento 2 installation –

https://devdocs.magento.com/guides/v2.3/install-gde/install-quick-ref.html

You can also download the Magento 2.3 from here and just extract it to your localhost directory. After that just hit the Magento directory on your browser and complete the Magento setup.

-----

### * **Step 2 – Install dependencies**
We need to install the MFTF. Please follow below command –

composer install -d dev/tests/acceptance/

-----

### * **Step 3 – Build the project**
In the Magento project root, run –

vendor/bin/mftf build:project
![](https://images.viblo.asia/88f71cc4-1bd8-4aba-9356-1513fba47067.png)


### * **Step 4 – Edit environmental settings**
In the [Magento_Root]/dev/tests/acceptance/ directory, edit the .env file to match your system.

vim dev/tests/acceptance/.env

Specify the following parameters, which are required for tests –

* MAGENTO_BASE_URL – Must contain a domain name of the Magento instance that will be tested. Ex: http://127.0.0.1/magento2mftf/
* MAGENTO_BACKEND_NAME: must contain the relative path for the Admin area. Ex: admin
* MAGENTO_ADMIN_USERNAME: must contain the username required for authorization in the Admin area. Ex: admin
* MAGENTO_ADMIN_PASSWORD: must contain the user password required for authorization in the Admin area. Ex: admin12345


### * **Step 5 – Enable the Magento CLI commands**
In the [Magento_Root]/dev/tests/acceptance directory, run the following command to enable the MFTF to send Magento CLI commands to your Magento instance.

cp dev/tests/acceptance/.htaccess.sample dev/tests/acceptance/.htaccess

### * **Step 6 – Generate and run tests**
To run tests, you need a running Selenium server and mftf commands.

Run the Selenium server in another terminal

Run the Selenium server in the terminal. Both selenium jar file and browser driver should be on the same place. In our case, both reside in the Magento root directory.

For example, the following commands run the Selenium server for Google Chrome –

cd <path_to_directory_with_selenium_server_and_webdriver>/Java -Dwebdriver.chrome.driver=chromedriver -jar selenium-server-standalone-3.14.0.jar
![](https://images.viblo.asia/0a4a70d3-f9dd-4246-a165-4f453c6f96f7.png)


**Generate the tests**

In the Magento root directory, run the below command –

vendor/bin/mftf generate:tests
![](https://images.viblo.asia/49f220b8-0566-4a04-b9b7-d0bf1c560e55.png)

Complete article available at this link - [MFTF](https://www.vtnetzwelt.com/ecommerce-blog/magento-development-blog/magento-functional-testing-framework/)