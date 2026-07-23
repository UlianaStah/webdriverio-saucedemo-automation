class InventoryPage {
    get sortDropdown() { return $('//select[@class="product_sort_container"]');}
    get itemPrices() { return $$('//div[@class="inventory_item_price"]');}
    get addToCartBackpackBtn() { return $('//button[@id="add-to-cart-sauce-labs-backpack"]');}
    get addToCartLightBtn() { return $('//button[@id="add-to-cart-sauce-labs-bike-light"]');}
    get removeBackpackBtn() { return $('//button[@id="remove-sauce-labs-backpack"]');}
    get removeLightBtn() { return $('//button[@id="remove-sauce-labs-bike-light"]');}
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

    async addBackpackToCart(){
        await this.addToCartBackpackBtn.waitForDisplayed();
        await this.addToCartBackpackBtn.click();
    }

    async addLightToCart(){
        await this.addToCartLightBtn.waitForDisplayed();
        await this.addToCartLightBtn.click();
    }

    async getRemoveBtnTexts(){
        await this.removeBackpackBtn.waitForDisplayed();
        await this.removeLightBtn.waitForDisplayed();
        const backpackText = await this.removeBackpackBtn.getText();
        const lightText = await this.removeLightBtn.getText();
        return {backpackText,lightText};
    }

    async getCartBadgeText(){
        await this.cartBadge.waitForDisplayed();
        return await this.cartBadge.getText();
    }

    async removeBackpackFromCart(){
        await this.removeBackpackBtn.waitForDisplayed();
        await this.removeBackpackBtn.click();
    }
}

export default new InventoryPage();