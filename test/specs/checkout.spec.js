import loginPage from "../pageobjects/login.page";
import inventoryPage from "../pageobjects/inventory.page";
import cartPage from "../pageobjects/cart.page";
import checkoutPage from "../pageobjects/checkout.page";
import {users} from "../data/users";

describe('Checkout functionality', () => {
    const customer = {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '12345'
    };

    const product = 'Sauce Labs Backpack';

    beforeEach(async () => {
        await loginPage.open();
        await browser.execute(() => window.localStorage.clear());
        await browser.deleteCookies();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'));

        await inventoryPage.addItemToCart(product);
        await inventoryPage.openCart();

        await cartPage.proceedToCheckout();
    });

    it ('should complete checkout successfully with valid customer information', async () => {
        await checkoutPage.fillCustomerInformation(
            customer.firstName,
            customer.lastName,
            customer.postalCode
        );

        await checkoutPage.continueToOverview();

        await expect(checkoutPage.overviewItems).toBeElementsArrayOfSize(1);

        await expect(checkoutPage.overviewItemsNames).toHaveText(product);

        await expect(checkoutPage.paymentInformation).toHaveText(
            expect.stringContaining('SauceCard')
        );

        await expect(checkoutPage.shippingInformation).toHaveText(
            expect.stringContaining('Pony Express')
        );

        await expect(checkoutPage.totalPrice).toBeDisplayed();

        await checkoutPage.finishCheckout();

        await expect(checkoutPage.completeHeader).toHaveText(
            'Thank you for your order!'
        );

    });

    it('should display an error when the first name is missing', async () => {
        await checkoutPage.fillCustomerInformation(
            '',
            customer.lastName,
            customer.postalCode
        );

        await checkoutPage.continueToOverview();

        await expect(checkoutPage.errorMessage).toHaveText(
            'Error: First Name is required'
        );
    });

    it('should display an error when the last name is missing', async () => {
        await checkoutPage.fillCustomerInformation(
            customer.firstName,
            '',
            customer.postalCode
        );

        await checkoutPage.continueToOverview();

        await expect(checkoutPage.errorMessage).toHaveText(
            'Error: Last Name is required'
        );
    });

    it('should display an error when the postal code is missing', async () => {
        await checkoutPage.fillCustomerInformation(
            customer.firstName,
            customer.lastName,
            ''
        );

        await checkoutPage.continueToOverview();

        await expect(checkoutPage.errorMessage).toHaveText(
            'Error: Postal Code is required'
        );
    });
});