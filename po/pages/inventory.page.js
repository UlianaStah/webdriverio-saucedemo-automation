class InventoryPage {
    get sortDropdown() { return $('//select[@class="product_sort_container"]');}
    get itemPrices() { return $$('//div[@class="inventory_item_price"]');}
    get cartBadge() { return $('//span[@data-test="shopping-cart-badge"]');}

    async verifyPageUrl() {
        await expect(browser).toHaveUrl ('https://www.saucedemo.com/inventory.html'); 
    }

    async sortByLowerToHigh() {
        await this.sortDropdown.waitForDisplayed();
        await this.sortDropdown.selectByVisibleText("Price (low to high)");
    }

    async getPrices(){
        const priceElements = await this.itemPrices;
        const prices = [];
        for (const element of priceElements) {
            const priceText = await element.getText();
            const price = parseFloat(priceText.replace('$', ''));
            prices.push(price);
        }
        return prices;
    }

    getItemBtn(itemName) { return $(`//div[@data-test="inventory-item" and .//div[@data-test="inventory-item-name" and text()='${itemName}']]//button`);}

    async addItemToCart(itemName){
        const button = await this.getItemBtn(itemName);
        await button.click();
    }

    async removeItemFromCart(itemName) {
        const button = await this.getItemBtn(itemName);
        await button.click();
    }

    async getBtnText(itemName){
        const button = await this.getItemBtn(itemName);
        return await button.getText();
    }

    async getCartText() {
        if (await this.cartBadge.isExisting()){
            return await this.cartBadge.getText();
        }
        return '0'
    }
}

export default new InventoryPage();