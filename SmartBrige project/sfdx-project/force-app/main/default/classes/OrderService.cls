/**
 * @description OrderService handles Order lookups, fulfillment status checks,
 * return eligibility verification, and warranty status for Customer Support and Agentforce.
 */
public with sharing class OrderService {

    public class OrderDetails {
        @AuraEnabled public String orderNumber;
        @AuraEnabled public String customerName;
        @AuraEnabled public String customerEmail;
        @AuraEnabled public Decimal totalAmount;
        @AuraEnabled public String status; // 'Delivered', 'In Transit', 'Processing', 'Cancelled'
        @AuraEnabled public String trackingNumber;
        @AuraEnabled public String carrier;
        @AuraEnabled public Date orderDate;
        @AuraEnabled public Date deliveryDate;
        @AuraEnabled public Boolean isReturnEligible;
        @AuraEnabled public String warrantyStatus; // 'Active Warranty', 'Expired', 'Standard (1 Year)'
        @AuraEnabled public List<String> items;
    }

    /**
     * @description Fetch order details by order number
     */
    @AuraEnabled(cacheable=true)
    public static OrderDetails getOrderInfo(String orderNumber) {
        OrderDetails details = new OrderDetails();
        details.orderNumber = orderNumber;

        // In production SF org, query Order / Order__c and OrderItem
        // Simulating robust response logic matching real-world schema:
        if (orderNumber == 'ORD-9824' || orderNumber == '9824') {
            details.customerName = 'Sarah Jenkins';
            details.customerEmail = 'sarah.j@example.com';
            details.totalAmount = 349.99;
            details.status = 'Delivered';
            details.trackingNumber = 'FEDEX-9405-2819';
            details.carrier = 'FedEx Express';
            details.orderDate = Date.today().addDays(-5);
            details.deliveryDate = Date.today().addDays(-2);
            details.isReturnEligible = true;
            details.warrantyStatus = 'Active Warranty (Expires 2027-10-24)';
            details.items = new List<String>{ 'OmniSound Pro Wireless ANC Headphones - Matte Black' };
        } else if (orderNumber == 'ORD-7612' || orderNumber == '7612') {
            details.customerName = 'Marcus Vance';
            details.customerEmail = 'm.vance@techcorp.io';
            details.totalAmount = 1299.00;
            details.status = 'In Transit';
            details.trackingNumber = 'UPS-1Z9999999999999999';
            details.carrier = 'UPS Ground';
            details.orderDate = Date.today().addDays(-2);
            details.deliveryDate = Date.today().addDays(1);
            details.isReturnEligible = false; // Must be delivered first
            details.warrantyStatus = 'Pending Delivery';
            details.items = new List<String>{ 'SmartDock Ultra 4K Dual Display Station', 'USB-C Braided Cable 2M' };
        } else {
            // Default generic fallback
            details.customerName = 'Valued Customer';
            details.customerEmail = 'customer@example.com';
            details.totalAmount = 199.50;
            details.status = 'Processing';
            details.trackingNumber = 'Pending Fulfillment';
            details.carrier = 'DHL Express';
            details.orderDate = Date.today();
            details.deliveryDate = Date.today().addDays(4);
            details.isReturnEligible = false;
            details.warrantyStatus = 'Standard Warranty (1 Year)';
            details.items = new List<String>{ 'Apex Smart Keyboard - Mechanical RGB' };
        }

        return details;
    }
}
