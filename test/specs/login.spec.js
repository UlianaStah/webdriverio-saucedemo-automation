import loginPage from "../pageobjects/login.page";
import {users} from "../data/users";

describe('Login functionality', () => {

    beforeEach(async () => {
        await loginPage.open();
    });

    it('should log in successfully with valid credentials', async () => {
        await loginPage.login(users.standard.username, users.standard.password);

        await expect(browser).toHaveUrl(
            expect.stringContaining('/inventory.html')
        );
    });

    it ('should display an error with an invalid password', async () => {
        await loginPage.login(users.standard.username, 'wrong_password');

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    it ('should display an error for a locked-out user', async () => {
        await loginPage.login(users.locked.username, users.locked.password);

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Sorry, this user has been locked out.'
        );
    });

    it('should display an error when the username and password are empty', async () => {
        await loginPage.login('','');

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username is required'
        );
    });

    it('should display an error when the password is empty', async () => {
        await loginPage.login(users.standard.username,'');

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Password is required'
        );
    });

    it('should not allow access to the inventory page without logging in', async () => {
        await browser.url('/inventory.html');

        await expect(loginPage.errorMessage).toHaveText(
           "Epic sadface: You can only access '/inventory.html' when you are logged in."
        );
    });
});