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

    async verifyPageUrl() {
        await expect(browser).toHaveUrl (
            `${browser.options.baseUrl}/inventory.html`
        ); 
    }

    async sortByNameAtoZ() {
    await this.sortDropdown.waitForDisplayed();
    await this.sortDropdown.selectByVisibleText('Name (A to Z)');
    }

    async sortByPriceLowToHigh() {
        await this.sortDropdown.waitForDisplayed();
        await this.sortDropdown.selectByVisibleText("Price (low to high)");
    }

    async getProductNames() {
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
        return $(``//div[@data-test="inventory-item" and .//div[@data-test="inventory-item-name" and text()="${itemName}"]]//button`
        );
    }

    async addItemToCart(itemName) {
        await this.getItemBtn(itemName).click();
    }

    async removeItemFromCart(itemName) {
        await this.getItemBtn(itemName).click();
    }

    async getBtnText(itemName){
        return await this.getItemBtn(itemName).getText();
    }

    async getCartText() {
        if (await this.cartBadge.isExisting()){
            return await this.cartBadge.getText();
        }
        return '0'
    }
}

export default new InventoryPage();