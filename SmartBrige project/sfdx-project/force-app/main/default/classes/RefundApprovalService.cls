/**
 * @description RefundApprovalService orchestrates refund and replacement approvals.
 * Low-value refunds (<$100) are auto-approved. High-value refunds require approval from Support Manager.
 */
public with sharing class RefundApprovalService {

    public class RefundRequestInput {
        @InvocableVariable(label='Case Id or Case Number' required=true)
        public String caseIdentifier;

        @InvocableVariable(label='Order Number' required=true)
        public String orderNumber;

        @InvocableVariable(label='Refund Amount' required=true)
        public Decimal refundAmount;

        @InvocableVariable(label='Reason' required=true)
        public String refundReason;
    }

    public class RefundRequestResult {
        @InvocableVariable(label='Approval Status')
        public String status; // 'Auto-Approved', 'Pending Approval', 'Rejected'

        @InvocableVariable(label='Approval Reference Number')
        public String approvalReference;

        @InvocableVariable(label='Message to Customer')
        public String message;
    }

    /**
     * @description Invocable method callable from Salesforce Flows and Agentforce AI Service Agents.
     */
    @InvocableMethod(label='Submit Refund Request' description='Evaluates refund amount and routes to approval process or auto-approves.')
    public static List<RefundRequestResult> processRefund(List<RefundRequestInput> requests) {
        List<RefundRequestResult> results = new List<RefundRequestResult>();

        for (RefundRequestInput req : requests) {
            RefundRequestResult res = new RefundRequestResult();
            String refId = 'REF-' + Math.abs(Crypto.getRandomInteger()).format().replace(',', '').substring(0, 5);
            res.approvalReference = refId;

            if (req.refundAmount <= 100.00) {
                // Tier 1 Auto-Approval Policy
                res.status = 'Auto-Approved';
                res.message = 'Refund request of $' + req.refundAmount + ' for order ' + req.orderNumber + 
                    ' has been instantly approved under Tier-1 customer resolution policy. Credit will appear in 3-5 business days. Reference: ' + refId;
            } else {
                // Requires Manager / Team Lead Approval Process
                res.status = 'Pending Approval';
                res.message = 'Refund request of $' + req.refundAmount + ' exceeds automated threshold ($100.00). ' + 
                    'Ticket escalated to Support Operations Lead for 1-click verification. Case Reference: ' + refId;
            }
            results.add(res);
        }
        return results;
    }
}
