class CartPage {
    get cartItems() {
        return $$('[data-test="inventory-item"]');
    }

    get itemNames() {
        return $$('[data-test="inventory-item-name"]');
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
        const elements = await this.itemNames;
        const names = [];

        for (const element of elements) {
            names.push(await element.getText());
        }
        return names;
    }

    async removeItemInCart(itemName) {
        const cartItem = await this.getCartItem(itemName);
        const removeButton = await cartItem.$('button');

        await removeButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

export default new CartPage();