const domesticShippingAmount = 1.00;
const internationalShippingAmount = 3.00;
const freeThreshold = 1000;
const shippingFromCountry = 'Kenya';

const calculateShipping = (amount, config, req) => {
    // If a subscription, remove shipping
    if(req.session.cartSubscription){
        req.session.shippingMessage = 'Subscription offer';
        req.session.totalCartShipping = 0;
        req.session.totalCartAmount = req.session.totalCartAmount + 0;
        return;
    }

    // Calculate free threshold
    if(amount >= freeThreshold){
        req.session.shippingMessage = 'Gateway fee';
        req.session.totalCartShipping = 1.00;
        req.session.totalCartAmount = req.session.totalCartAmount + 0;
        return;
    }

    // If there is no country set, we estimate shipping
    if(!req.session.customerCountry){
        req.session.shippingMessage = 'Gateway fees';
        req.session.totalCartShipping = domesticShippingAmount;
        req.session.totalCartAmount = amount + domesticShippingAmount;
        return;
    }

    // Check for international
    if(req.session.customerCountry.toLowerCase() !== shippingFromCountry.toLowerCase()){
        req.session.shippingMessage = 'Fees';
        req.session.totalCartShipping = internationalShippingAmount;
        req.session.totalCartAmount = amount + internationalShippingAmount;
        return;
    }

    // Domestic shipping
    req.session.shippingMessage = 'Fees';
    req.session.totalCartShipping = domesticShippingAmount;
    req.session.totalCartAmount = amount + domesticShippingAmount;
};

module.exports = {
    calculateShipping
};
