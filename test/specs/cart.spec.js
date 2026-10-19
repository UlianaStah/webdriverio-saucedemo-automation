import loginPage from '../pageobjects/login.page';
import inventoryPage from '../pageobjects/inventory.page';

describe('Cart state logic', () => {
    const testData = [
        {
        item1: 'Sauce Labs Backpack',
        item2: 'Sauce Labs Bike Light',
        itemToRemove: 'Sauce Labs Backpack'
        }
    ];

    beforeEach(async()=> {
        await loginPage.open();
        await loginPage.expectFieldsToBeEmpty();
        await loginPage.login('standard_user');   
        await inventoryPage.verifyPageUrl(); 
    });

    testData.forEach(({item1, item2, itemToRemove}) => {
        it ('should add items to the cart, check their visibility in the cart and remove them from the cart', async () => {
            await inventoryPage.addItemToCart(item1);
            await inventoryPage.addItemToCart(item2);

            expect(await inventoryPage.getBtnText(item1)).toEqual('Remove');
            expect(await inventoryPage.getBtnText(item2)).toEqual('Remove');

            expect(await inventoryPage.getCartText()).toEqual('2');

            await inventoryPage.removeItemFromCart(itemToRemove);

            expect(await inventoryPage.getBtnText(itemToRemove)).toEqual('Add to cart');

            expect(await inventoryPage.getCartText()).toEqual('1');
        });
    });
});