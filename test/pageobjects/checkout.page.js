class CheckoutPage {
    get firstNameInput() {
        return $('[data-test="firstName"]');
    }

    get lastNameInput() {
        return $('[data-test="lastName"]');
    }

    get postalCodeInput() {
        return $('[data-test="postalCode"]');
    }

    get continueButton() {
        return $('[data-test="continue"]');
    }

    get errorMessage() {
        return $('[data-test="error"]');
    }

    get finishButton() {
        return $('[data-test="finish"]');
    }

    get overviewItems() {
        return $$('[data-test="inventory-item"]');
    }

    get overviewItemsNames() {
        return $('[data-test="inventory-item-name"]');
    }

    get paymentInformation() {
        return $('[data-test="payment-info-value"]');
    }

    get shippingInformation() {
        return $('[data-test="shipping-info-value"]');
    }

    get totalPrice() {
        return $('[data-test="total-label"]');
    }

    get completeHeader() {
        return $('[data-test="complete-header"]');
    }


    async fillCustomerInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async getOverviewItemCount() {
        const items = await this.overviewItems;
        return items.length;
    }
}

export default new CheckoutPage();