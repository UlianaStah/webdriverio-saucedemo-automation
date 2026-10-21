import loginPage from '../pageobjects/login.page';

describe ('Login functionality', () => {

    beforeEach(async () => {
        await loginPage.open();
    });

it('Should log in successfully with valid credentials', async () => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(browser).toHaveUrl(
        expect.stringContaining('/inventory.html')
    );
});

it ('Should display an error with an invalid password', async () => {
    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username and password do not match any user in this service'
    );
});

it ('Should display an error for a locked-out user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Sorry, this user has been locked out.'
    );
});

it('Should display an error when the username and password are empty', async () => {
    await loginPage.login('','');

    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username is required'
    );
});

it('Should display an error when the password is empty', async () => {
    await loginPage.login('standard_user','');

    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Password is required'
    );
});
});