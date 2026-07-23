import loginPage from '../../po/pages/login.page';
import inventoryPage from '../../po/pages/inventory.page';

describe('Cart state logic', () => {
    beforeEach(async()=> {
        await loginPage.open();
        await loginPage.expectFieldsToBeEmpty();
        await loginPage.login('standard_user');   
        await inventoryPage.verifyPageUrl(); 
    });
      
it ('should add items to the cart, check their visibility in the cart and remove them from the cart', async () => {
        await inventoryPage.addBackpackToCart();
        await inventoryPage.addLightToCart();
    
        const {backpackText, lightText} = await inventoryPage.getRemoveBtnTexts();
        await expect(backpackText).toEqual('Remove');
        await expect(lightText).toEqual('Remove');

        const cartBadgeText = await inventoryPage.getCartBadgeText();
        await expect(cartBadgeText).toEqual('2');
 
        await inventoryPage.removeBackpackFromCart();
        const newBackpackButton = await inventoryPage.addToCartBackpackBtn.getText();
        await expect(newBackpackButton).toEqual('Add to cart');
        
        const updatedCartBadgeText = await $('//span[@data-test="shopping-cart-badge"]').getText();
        await expect(updatedCartBadgeText).toEqual('1');
        });   
 });