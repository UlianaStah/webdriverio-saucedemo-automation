class InventoryPage {
    get sortDropdown() { 
        return $('[data-test="product-sort-container"]');
    }
    get itemPrices() { 
        return $$('[data-test="inventory-item-price"]');
    }
    get itemNames() {
        return $$('[data-test="inventory-item-name"]');
    }
    get cartBadge() { 
        return $('[data-test="shopping-cart-badge"]');
    }
    get shoppingCartLink() {
        return $('[data-test="shopping-cart-link"]');
    }

    async sortByNameZtoA() {
        await this.sortDropdown.waitForDisplayed();
        await this.sortDropdown.selectByVisibleText('Name (Z to A)');
    }

    async sortByPriceLowToHigh() {
        await this.sortDropdown.waitForDisplayed();
        await this.sortDropdown.selectByVisibleText('Price (low to high)');
    }

    async getItemNames() {
        const elements = await this.itemNames;
        const names = [];
    
        for (const element of elements) {
            names.push(await element.getText());
        }
        return names;
    }

    async getProductPrices() {
        const elements = await this.itemPrices;
        const prices = [];

        for (const element of elements) {
            const priceText = await element.getText();
            prices.push(parseFloat(priceText.replace('$', '')));
        }
        return prices;
    }

    getItemBtn(itemName) { 
        return $(`//div[@data-test="inventory-item" and .//div[@data-test="inventory-item-name" and text()="${itemName}"]]//button`
        );
    }

    async addItemToCart(itemName) {
        await this.getItemBtn(itemName).click();
    }

    async getBtnText(itemName){
        return await this.getItemBtn(itemName).getText();
    }

    async openCart() {
        await this.shoppingCartLink.click();
    }
}

export default new InventoryPage();