class LoginPage {
    get usernameInput() { return $('//input[@placeholder="Username"]');}
    get passwordInput() { return $('//input[@placeholder="Password"]');}
    get loginButton() { return $('//input[@id="login-button"]');}   

    async open() {
       await browser.url('https://www.saucedemo.com/');
    }

    async expectFieldsToBeEmpty() {
       await expect(this.usernameInput).toHaveValue('');
       await expect(this.passwordInput).toHaveValue('');
    }

    async login(username, password = 'secret_sauce') {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

export default new LoginPage();