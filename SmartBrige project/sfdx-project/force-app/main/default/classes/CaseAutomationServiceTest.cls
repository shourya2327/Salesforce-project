/**
 * @description Comprehensive unit tests for CaseAutomationService, OrderService, 
 * RefundApprovalService, and AgentforceCaseHandler.
 */
@IsTest
private class CaseAutomationServiceTest {

    @IsTest
    static void testCaseClassificationUrgentRefund() {
        Test.startTest();
        CaseAutomationService.CaseClassificationResult res = 
            CaseAutomationService.classifyCase('Urgent: Defective item need refund immediately', 'Furious with product failure');
        Test.stopTest();

        System.assertEquals('High', res.priority, 'Priority should be High for urgent keywords');
        System.assertEquals('Negative', res.sentiment, 'Sentiment should be negative');
        System.assertEquals('Billing_Support_Queue', res.queueName, 'Refund keyword maps to billing queue');
        System.assertEquals(2, res.slaHours, 'High urgency has 2h SLA');
    }

    @IsTest
    static void testCaseClassificationTechnical() {
        Test.startTest();
        CaseAutomationService.CaseClassificationResult res = 
            CaseAutomationService.classifyCase('Setup error bluetooth failure', 'App keeps crashing');
        Test.stopTest();

        System.assertEquals('Technical Support', res.category);
        System.assertEquals('Tier_2_Technical_Queue', res.queueName);
    }

    @IsTest
    static void testOrderServiceLookup() {
        Test.startTest();
        OrderService.OrderDetails ord = OrderService.getOrderInfo('ORD-9824');
        Test.stopTest();

        System.assertEquals('Delivered', ord.status);
        System.assertEquals(true, ord.isReturnEligible);
        System.assertEquals('Sarah Jenkins', ord.customerName);
    }

    @IsTest
    static void testRefundApprovalAutoApproved() {
        RefundApprovalService.RefundRequestInput req = new RefundApprovalService.RefundRequestInput();
        req.caseIdentifier = '500xx000001';
        req.orderNumber = 'ORD-9824';
        req.refundAmount = 45.00; // Under 100
        req.refundReason = 'Accessory cable missing';

        Test.startTest();
        List<RefundApprovalService.RefundRequestResult> results = 
            RefundApprovalService.processRefund(new List<RefundApprovalService.RefundRequestInput>{ req });
        Test.stopTest();

        System.assertEquals(1, results.size());
        System.assertEquals('Auto-Approved', results[0].status);
    }

    @IsTest
    static void testRefundApprovalManagerEscalation() {
        RefundApprovalService.RefundRequestInput req = new RefundApprovalService.RefundRequestInput();
        req.caseIdentifier = '500xx000002';
        req.orderNumber = 'ORD-9824';
        req.refundAmount = 349.99; // Above 100
        req.refundReason = 'Full headset return';

        Test.startTest();
        List<RefundApprovalService.RefundRequestResult> results = 
            RefundApprovalService.processRefund(new List<RefundApprovalService.RefundRequestInput>{ req });
        Test.stopTest();

        System.assertEquals(1, results.size());
        System.assertEquals('Pending Approval', results[0].status);
    }

    @IsTest
    static void testAgentforceCaseHandler() {
        AgentforceCaseHandler.AgentActionRequest req = new AgentforceCaseHandler.AgentActionRequest();
        req.actionName = 'ORDER_STATUS';
        req.orderNumber = 'ORD-9824';

        Test.startTest();
        List<AgentforceCaseHandler.AgentActionResponse> responses = 
            AgentforceCaseHandler.executeAgentAction(new List<AgentforceCaseHandler.AgentActionRequest>{ req });
        Test.stopTest();

        System.assertEquals(1, responses.size());
        System.assertEquals(true, responses[0].isSuccess);
        System.assert(responses[0].responseMessage.contains('Delivered'));
    }
}
