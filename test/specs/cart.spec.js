import loginPage from '../pageobjects/login.page';
import inventoryPage from '../pageobjects/inventory.page';
import cartPage from '../pageobjects/cart.page';

describe('Cart functionality', () => {
    const testData = [
        {
        item1: 'Sauce Labs Backpack',
        item2: 'Sauce Labs Bike Light',
        itemToRemove: 'Sauce Labs Backpack'
        }
    ];

    beforeEach(async()=> {
        await loginPage.open();
        await loginPage.login('standard_user','secret_sauce');   
        await inventoryPage.verifyPageUrl(); 
    });

    testData.forEach(({item1, item2, itemToRemove}) => {
        it ('should add products, display them in the cart and remove a product', async () => {
            await inventoryPage.addItemToCart(item1);
            await inventoryPage.addItemToCart(item2);

            const btnText1 = await inventoryPage.getBtnText(item1);
            const btnText2 = await inventoryPage.getBtnText(item2);
            await expect(btnText1).toEqual('Remove');
            await expect(btnText2).toEqual('Remove');
            await expect(inventoryPage.cartBadge).toHaveText('2');

            await inventoryPage.openCart();

            await expect(cartPage.cartItems).toBeElementsArrayOfSize(2);
            const cartNames = await cartPage.getItemNames();
            await expect(cartNames).toEqual(
                expect.arrayContaining([item1,item2])
            );

            await cartPage.removeItemInCart(itemToRemove);

            const remainingNames = await cartPage.getItemNames();
            await expect(remainingNames).toEqual([item2]);
            await expect(cartPage.cartItems).toBeElementsArrayOfSize(1);
        });
    });
});