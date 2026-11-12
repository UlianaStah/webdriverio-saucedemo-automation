import loginPage from "../pageobjects/login.page";
import inventoryPage from "../pageobjects/inventory.page";
import cartPage from "../pageobjects/cart.page";
import {users} from "../data/users";

describe('Cart functionality', () => {
    const item1 = 'Sauce Labs Backpack';
    const item2 = 'Sauce Labs Bike Light';
        
    beforeEach(async()=> {
        await loginPage.open();
        await browser.execute(() => window.localStorage.clear());
        await browser.deleteCookies();
        await loginPage.login(users.standard.username, users.standard.password);   
        await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html')); 
    });

    it ('should show "Remove" buttons and update the badge after adding products', async () => {
        await inventoryPage.addItemToCart(item1);
        await inventoryPage.addItemToCart(item2);

        await expect(inventoryPage.getItemBtn(item1)).toHaveText('Remove');
        await expect(inventoryPage.getItemBtn(item2)).toHaveText('Remove');
        await expect(inventoryPage.cartBadge).toHaveText('2');
    });
    
    it('should display the added products in the cart', async () => {
        await inventoryPage.addItemToCart(item1);
        await inventoryPage.addItemToCart(item2);
        await inventoryPage.openCart();

        await expect(cartPage.cartItems).toBeElementsArrayOfSize(2);
        const cartNames = await cartPage.getItemNames();
        expect(cartNames).toEqual([item1, item2]);
    });

    it('should remove product from the cart', async () => {
        await inventoryPage.addItemToCart(item1);
        await inventoryPage.addItemToCart(item2);
        await inventoryPage.openCart();

        await cartPage.removeItemInCart(item1);

        await expect(cartPage.cartItems).toBeElementsArrayOfSize(1);
        const remainingNames = await cartPage.getItemNames();
        expect(remainingNames).toEqual([item2]);
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });
});    
        