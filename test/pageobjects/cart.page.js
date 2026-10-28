class CartPage {
    get cartItems() {
        return $$('[data-test="inventory-item"]');
    }

    get cartItemNames() {
        return $$('[data-test="inventory-item-name"]');
    }

    get continueShoppingButton() {
        return $('[data-test="continue-shopping"]');
    }

    get checkoutButton() {
        return $('[data-test="checkout"]');
    }

    getCartItem(itemName) {
        return $(
            `//div[@data-test="inventory-item" and .//div[@data-test="inventory-item-name" and normalize-space()="${itemName}"]]`
        );
    }
    
    async getItemNames() {
        const elements = await this.cartItemNames;
        const names = [];

        for (const element of elements) {
            names.push(await element.getText());
        }
        return names;
    }

    async isItemInCart(itemName) {
        return (await this.getItemNames()).includes(itemName);
    }

    async removeItemInCart(itemName) {
        const cartItem = await this.getCartItem(itemName);
        const removeButton = await cartItem.$('button');

        await removeButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

export default new CartPage();