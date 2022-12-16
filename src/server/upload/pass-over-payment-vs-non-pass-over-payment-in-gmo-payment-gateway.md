In recent years, Payment through online shop face to alot of problems relate to card's information. The most of that reason cause by merchant has not yet fully utilized the security measures for credit card payment.

Therefore, the Japan Government and Industry have developed a "Implementation Plan for Enhancing Security Measures in Credit Card Transactions" and "Sales Law". The revised installment is expected to take effect around June 2018. Thus, Pay.JP has issued instructions that require merchants to transfer payments from the Pass-over-payment to the Non-pass-over-payment. Merchants that are not yet processed for non-passing processes will be required to comply with the PCI DSS (Payment Card Industry Data Security Standard is a mandatory information security standard for businesses. Transfer and process payment cards managed by 05 international payment organizations such as Visa, MasterCard, American Express, Discover and JCB)

## Pass-over-payment vs Non-pass-over-payment

![](https://images.viblo.asia/880449d8-6669-4472-8c26-3d916cc0e74f.png)

- Pass-over-payment: Merchant passes or stores the card number through the merchant's server and need to require following with PCI DSS.
- Non-pass-over-payment: Merchant doesn't pass the card number through the merchant's server.

## Non-pass-over-payment
This way merchants do not need to store or pass card information to their server. When user input card information for checkout proccess, merchants need to send that information straight to GMO and GMO will return back token using for next step. 
Payment with token (Non-pass-over-payment with the use of JavaScript) is a security service that minimizes the risk of data breaches. It completes the payment by converting the credit card number into a unique alphanumeric token. By using tokenization service, you are able to process payments without touching credit card numbers.

For getting the token, you need to call a request to Pay.JP API from client side with modules like payjp.js, checkout, payjp-ios, payjp-android.

**Data flow**

![](https://images.viblo.asia/275a63fa-3f90-4efc-833b-98789bd9ca47.png)

1. Purchase screen is displayed
2. Credit card number is sent by linking JavaScript from html
3. Token is returned
4. Token is sent
5. Authorization with the token and an amount of money is processed.
6. Token is converted into the card number. Authorization is processed.
7. Authorization result is returned
8. Authorization result is returned
9. Receipt page is displayed

**Advantages of Tokenization**

・It minimizes the risk of data breaches
Tokenization enables payment processing without "storing", "processing" and "transmitting" credit card information, thus minimizing data breach risks. Even if the token is leaked, it itself has no meaning, and thus, it will not be illegally used on other websites.Tokenization is a processing method recommended by GMO "Action Plan 2018 for the Strengthening of Measures for Security in Credit Card Transactions" formulated by the Japan Consumer Credit Association.

・It does not require significant changes in the system.
As it allows to use the protocol/module connection type, Merchants are able to provide their customers with secure payment environment without making them jump to the payment screen provided by GMO.

## Pass-over-payment

This way merchants will pass over or store card information to their own server. According to "Action Plan 2018 for the Strengthening of Measures for Security in Credit Card Transactions" formulated by the Japan Consumer Credit Association, merchants which send card information to their own server, are required to comply with PCI DSS.

Now, let's me show you some important information relate to PCI DSS:

**PCI DSS**

PCI DSS is provided by the PCI Security Standards Council (including members of international card organizations: Visa Inc., MasterCard Worldwide, American Express, Discover Financial Services, JCB International). The purpose of PCI DSS ensures the security of card data when processed and stored at banks or payment businesses. PCI DSS helps set the standards for card information security and applies globally.

Accordingly, all organizations involved in the transfer, processing and storage of payment card data (called "Cardholder Data") must comply with the PCI DSS standard.

PCI DSS is a system of requirements to meet security, policy, process, network, software, and other standards. This set of standards guides banks and businesses on the security of payment card data.

Basically, PCI DSS is a set of principles and requirements related to the following issues:

**Build and maintain a secure network**
* Build and maintain the firewall system to protect the card data.
* Do not use parameters or passwords available from system providers.

**Protect payment card data**
* Protect payment card data when stored on the system
* Encrypt card information on transmission line when transaction.

**Build and maintain network security**
* Use and update the antivirus software regularly
* Build and maintain systems and applications to ensure network security.

**Build intrusion control systems**
* Restrict access to payment card data
* Grant and track employee access accounts
* Limit the physical approach to card data

**System monitoring and evaluation regularly**
* Check and save all access to the system and card data
* Regularly review and re-test the system security process

**Information protection policy**
* Develop information protection policy