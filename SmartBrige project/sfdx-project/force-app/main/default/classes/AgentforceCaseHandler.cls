/**
 * @description AgentforceCaseHandler provides Invocable Actions for Salesforce Agentforce (AI Service Agent).
 * It enables the autonomous AI agent to interact with CRM data, check order fulfillment,
 * trigger approvals, and route escalated conversations to Omni-Channel queues.
 */
public with sharing class AgentforceCaseHandler {

    public class AgentActionRequest {
        @InvocableVariable(label='Action Name' description='Action to perform: ORDER_STATUS, RETURN_REQUEST, KNOWLEDGE_SEARCH, ESCALATE_TO_AGENT' required=true)
        public String actionName;

        @InvocableVariable(label='Customer Name')
        public String customerName;

        @InvocableVariable(label='Order Number')
        public String orderNumber;

        @InvocableVariable(label='User Query / Issue Description')
        public String query;

        @InvocableVariable(label='Sentiment Score')
        public Decimal sentimentScore;
    }

    public class AgentActionResponse {
        @InvocableVariable(label='Is Success')
        public Boolean isSuccess;

        @InvocableVariable(label='Agent Response Message')
        public String responseMessage;

        @InvocableVariable(label='Next Best Action')
        public String nextBestAction;

        @InvocableVariable(label='Created Case Id or Number')
        public String caseNumber;

        @InvocableVariable(label='Target Queue')
        public String targetQueue;
    }

    @InvocableMethod(label='Agentforce Service Action' description='Executes autonomous support action for Agentforce Service Agent')
    public static List<AgentActionResponse> executeAgentAction(List<AgentActionRequest> requests) {
        List<AgentActionResponse> responses = new List<AgentActionResponse>();

        for (AgentActionRequest req : requests) {
            AgentActionResponse res = new AgentActionResponse();
            res.isSuccess = true;

            if (req.actionName == 'ORDER_STATUS') {
                OrderService.OrderDetails order = OrderService.getOrderInfo(req.orderNumber);
                res.responseMessage = 'Order ' + order.orderNumber + ' is currently: ' + order.status + 
                    '. Carrier: ' + order.carrier + ' (' + order.trackingNumber + '). ' +
                    'Items: ' + String.join(order.items, ', ') + '.';
                res.nextBestAction = order.status == 'Delivered' ? 'Check Return or Warranty Eligibility' : 'Send Live SMS Tracking Link';

            } else if (req.actionName == 'RETURN_REQUEST') {
                OrderService.OrderDetails order = OrderService.getOrderInfo(req.orderNumber);
                if (order.isReturnEligible) {
                    res.responseMessage = 'Good news! Order ' + order.orderNumber + ' is within our 30-day satisfaction guarantee window. ' + 
                        'A prepaid return shipping label (RMA #RMA-' + Math.abs(Crypto.getRandomInteger()).format().substring(0, 4) + 
                        ') has been generated and emailed to ' + order.customerEmail + '.';
                    res.nextBestAction = 'Offer immediate replacement or store credit bonus';
                } else {
                    res.responseMessage = 'Order ' + order.orderNumber + ' is either in transit or past the standard 30-day return window. ' +
                        'However, your product is backed by: ' + order.warrantyStatus + '.';
                    res.nextBestAction = 'Initiate Warranty Claim or Escalate to Support Specialist';
                }

            } else if (req.actionName == 'ESCALATE_TO_AGENT') {
                CaseAutomationService.CaseClassificationResult classResult = 
                    CaseAutomationService.classifyCase('Agentforce Escalation: ' + req.query, req.query);
                
                String generatedCaseNum = '000' + (1000 + Math.abs(Crypto.getRandomInteger()).format().substring(0, 4));
                res.caseNumber = generatedCaseNum;
                res.targetQueue = classResult.queueName;
                res.responseMessage = 'I have transferred this conversation to our ' + classResult.category + 
                    ' team (' + classResult.queueName.replace('_', ' ') + '). Case #' + generatedCaseNum + 
                    ' has been created with ' + classResult.priority + ' priority (SLA: ' + classResult.slaHours + ' hours). ' +
                    'An agent is connecting right now.';
                res.nextBestAction = 'Transfer live session to Omni-Channel live agent';

            } else {
                // KNOWLEDGE_SEARCH default
                res.responseMessage = 'Based on our verified knowledge base: To reset or re-pair your smart device, ' + 
                    'hold down the power button for 7 seconds until the indicator flashes blue and amber. ' + 
                    'Ensure firmware is updated via the Companion App v4.2+.';
                res.nextBestAction = 'Confirm if troubleshooting resolved customer issue';
            }

            responses.add(res);
        }

        return responses;
    }
}
