/**
 * @description CaseAutomationService provides automated case classification,
 * sentiment scoring, queue routing, and SLA priority calculations for Service Cloud.
 * Part of the AI-Powered Customer Support & Service Automation System.
 */
public with sharing class CaseAutomationService {

    public class CaseClassificationResult {
        @AuraEnabled public String category;
        @AuraEnabled public String priority;
        @AuraEnabled public String queueName;
        @AuraEnabled public String sentiment;
        @AuraEnabled public Decimal sentimentScore;
        @AuraEnabled public Integer slaHours;
    }

    /**
     * @description Analyzes inbound case details and classifies priority, sentiment, and queue.
     */
    public static CaseClassificationResult classifyCase(String subject, String description) {
        CaseClassificationResult res = new CaseClassificationResult();
        String text = (String.isNotBlank(subject) ? subject : '') + ' ' + (String.isNotBlank(description) ? description : '');
        String lower = text.toLowerCase();

        // 1. Sentiment & Urgency detection
        if (lower.contains('urgent') || lower.contains('furious') || lower.contains('unacceptable') 
            || lower.contains('broken') || lower.contains('terrible') || lower.contains('legal') || lower.contains('fail')) {
            res.sentiment = 'Negative';
            res.sentimentScore = -0.85;
            res.priority = 'High';
            res.slaHours = 2;
        } else if (lower.contains('thank') || lower.contains('great') || lower.contains('appreciate') || lower.contains('love')) {
            res.sentiment = 'Positive';
            res.sentimentScore = 0.80;
            res.priority = 'Low';
            res.slaHours = 24;
        } else {
            res.sentiment = 'Neutral';
            res.sentimentScore = 0.05;
            res.priority = 'Medium';
            res.slaHours = 8;
        }

        // 2. Category & Queue Assignment
        if (lower.contains('refund') || lower.contains('charged') || lower.contains('billing') || lower.contains('invoice') || lower.contains('payment')) {
            res.category = 'Billing & Refunds';
            res.queueName = 'Billing_Support_Queue';
        } else if (lower.contains('return') || lower.contains('replacement') || lower.contains('exchange') || lower.contains('defective')) {
            res.category = 'Returns & Exchanges';
            res.queueName = 'Returns_Support_Queue';
        } else if (lower.contains('error') || lower.contains('bug') || lower.contains('setup') || lower.contains('crash') || lower.contains('technical') || lower.contains('connect')) {
            res.category = 'Technical Support';
            res.queueName = 'Tier_2_Technical_Queue';
            if (res.priority == 'Medium') {
                res.priority = 'High'; // Bump technical issues
                res.slaHours = 4;
            }
        } else if (lower.contains('order') || lower.contains('tracking') || lower.contains('shipment') || lower.contains('delivery')) {
            res.category = 'Order Fulfillment';
            res.queueName = 'Tier_1_Customer_Care';
        } else {
            res.category = 'General Inquiry';
            res.queueName = 'Tier_1_Customer_Care';
        }

        return res;
    }

    /**
     * @description Bulk trigger helper for automatic case enrichment before insert.
     */
    public static void enrichCasesOnInsert(List<Case> newCases) {
        for (Case c : newCases) {
            CaseClassificationResult result = classifyCase(c.Subject, c.Description);
            if (String.isBlank(c.Priority)) {
                c.Priority = result.priority;
            }
            if (String.isBlank(c.Type)) {
                c.Type = result.category;
            }
        }
    }
}
