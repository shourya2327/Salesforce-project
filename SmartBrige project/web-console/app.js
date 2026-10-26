/**
 * Salesforce Service Cloud + Agentforce AI Assistant
 * Application Logic & Automation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mock Database of Cases
  let casesData = [
    {
      id: 'case-1042',
      caseNumber: '0001042',
      subject: 'Defective ANC Headphones - Audio cutting out & request replacement',
      description: 'The right earcup produces cracking audio and bluetooth drops constantly. I need a replacement or refund immediately.',
      customer: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      tier: 'Platinum VIP ($2,450 LTV)',
      sentimentScore: -0.82,
      sentimentLabel: 'Frustrated (-0.82)',
      sentimentType: 'negative',
      priority: 'High',
      status: 'Working',
      slaRemaining: '1h 48m remaining',
      queue: 'Returns_Support_Queue',
      queueDisplay: 'Returns & RMA Queue',
      orderNumber: 'ORD-9824',
      orderItem: 'OmniSound Pro Wireless ANC Headphones - Matte Black',
      orderAmount: '$349.99 USD',
      orderStatus: 'Delivered',
      orderTracking: 'FedEx Express (FEDEX-9405-2819)',
      warrantyStatus: 'Active 2-Year Care+ (Expires 2027)',
      returnEligible: true,
      pendingRefund: 349.99,
      timeline: [
        { time: '10 mins ago', author: 'Agentforce Service Agent', text: 'Autonomous triage completed. Customer is within 30-day window. RMA pre-authorized.' },
        { time: '18 mins ago', author: 'Salesforce Flow Engine', text: 'Case created via Web-to-Case. CaseAutomationService.cls classified priority as High. Routed to Returns Queue.' }
      ]
    },
    {
      id: 'case-1043',
      caseNumber: '0001043',
      subject: 'Urgent: Double charged on subscription invoice #INV-2024-88',
      description: 'I was charged twice on my American Express card for this month subscription renewal. Please reverse immediately.',
      customer: 'Marcus Vance',
      email: 'm.vance@techcorp.io',
      tier: 'Enterprise ($12,000 ARR)',
      sentimentScore: -0.75,
      sentimentLabel: 'Urgent (-0.75)',
      sentimentType: 'negative',
      priority: 'High',
      status: 'New',
      slaRemaining: '45m remaining (Urgent)',
      queue: 'Billing_Support_Queue',
      queueDisplay: 'Billing & Refunds Queue',
      orderNumber: 'ORD-7612',
      orderItem: 'SmartDock Ultra 4K Station & Pro Subscription',
      orderAmount: '$1,299.00 USD',
      orderStatus: 'In Transit',
      orderTracking: 'UPS Ground (UPS-1Z9999999999999999)',
      warrantyStatus: 'Pending Delivery',
      returnEligible: false,
      pendingRefund: 199.00,
      timeline: [
        { time: '25 mins ago', author: 'Salesforce Flow Engine', text: 'Invoice duplication detected. Sent to Billing Queue for Finance Lead verification.' }
      ]
    },
    {
      id: 'case-1044',
      caseNumber: '0001044',
      subject: 'Firmware update v4.2 bricked device WiFi connection',
      description: 'After the latest software patch, the device cannot obtain an IP address from our mesh router.',
      customer: 'Elena Rostova',
      email: 'e.rostova@cybernet.de',
      tier: 'Standard Member',
      sentimentScore: -0.30,
      sentimentLabel: 'Neutral / Dissatisfied (-0.30)',
      sentimentType: 'negative',
      priority: 'High',
      status: 'Working',
      slaRemaining: '3h 15m remaining',
      queue: 'Tier_2_Technical_Queue',
      queueDisplay: 'Tier 2 Technical Support',
      orderNumber: 'ORD-6520',
      orderItem: 'Apex Smart Gateway Hub v2',
      orderAmount: '$189.00 USD',
      orderStatus: 'Delivered',
      orderTracking: 'DHL Express (DHL-882190)',
      warrantyStatus: 'Active Warranty (1 Year)',
      returnEligible: false,
      pendingRefund: 0,
      timeline: [
        { time: '40 mins ago', author: 'Agentforce Bot', text: 'Provided troubleshooting article KB-00481 (WiFi Mesh Fallback). Escalated to Tier 2 after unsuccessful retry.' }
      ]
    },
    {
      id: 'case-1045',
      caseNumber: '0001045',
      subject: 'Inquiry regarding bulk discount for education institute',
      description: 'Looking to purchase 50 units for our engineering university lab. What educational pricing is available?',
      customer: 'Professor Liam Chen',
      email: 'lchen@stanford.edu',
      tier: 'Educational Partner',
      sentimentScore: 0.65,
      sentimentLabel: 'Positive (+0.65)',
      sentimentType: 'positive',
      priority: 'Medium',
      status: 'New',
      slaRemaining: '6h 30m remaining',
      queue: 'Tier_1_Customer_Care',
      queueDisplay: 'Tier 1 Customer Care',
      orderNumber: 'N/A',
      orderItem: 'Commercial & Academic Bulk Quote',
      orderAmount: '$8,500.00 USD Est.',
      orderStatus: 'Quote Phase',
      orderTracking: 'Pending Sales Rep',
      warrantyStatus: '3-Year Enterprise Care Included',
      returnEligible: false,
      pendingRefund: 0,
      timeline: [
        { time: '1 hour ago', author: 'Omni-Channel Router', text: 'Tagged as High-Value Sales Lead. Assigned to Tier 1 Partner Desk.' }
      ]
    },
    {
      id: 'case-1046',
      caseNumber: '0001046',
      subject: 'Need expedited address change before shipment departs',
      description: 'Entered wrong apartment number during checkout for order ORD-5519. Please update to Apt 4B.',
      customer: 'Jason Taylor',
      email: 'j.taylor@gmail.com',
      tier: 'Standard Member',
      sentimentScore: 0.10,
      sentimentLabel: 'Neutral (0.10)',
      sentimentType: 'positive',
      priority: 'Medium',
      status: 'Working',
      slaRemaining: '5h 10m remaining',
      queue: 'Tier_1_Customer_Care',
      queueDisplay: 'Tier 1 Customer Care',
      orderNumber: 'ORD-5519',
      orderItem: 'UltraSlim Ergonomic Wireless Keyboard',
      orderAmount: '$99.00 USD',
      orderStatus: 'Processing',
      orderTracking: 'Label Created (Carrier Dispatch)',
      warrantyStatus: 'Standard 1-Year',
      returnEligible: true,
      pendingRefund: 0,
      timeline: [
        { time: '1h 20m ago', author: 'Customer Care Service', text: 'Address updated with warehouse dispatch team.' }
      ]
    },
    {
      id: 'case-1047',
      caseNumber: '0001047',
      subject: 'Agentforce autonomous resolution: Order tracking status delivered',
      description: 'Customer checked tracking for shipment ORD-3310 via Agentforce Web Chatbot.',
      customer: 'Chloe Bennett',
      email: 'chloe.b@outlook.com',
      tier: 'Silver Member ($620 LTV)',
      sentimentScore: 0.85,
      sentimentLabel: 'Delighted (+0.85)',
      sentimentType: 'positive',
      priority: 'Low',
      status: 'Closed',
      slaRemaining: 'Resolved on time',
      queue: 'Tier_1_Customer_Care',
      queueDisplay: 'Agentforce AI Deflection',
      orderNumber: 'ORD-3310',
      orderItem: 'Magnetic Fast Wireless Charging Pad',
      orderAmount: '$45.00 USD',
      orderStatus: 'Delivered',
      orderTracking: 'USPS Priority (USPS-9400-1111)',
      warrantyStatus: 'Standard 1-Year',
      returnEligible: true,
      pendingRefund: 0,
      timeline: [
        { time: '2 hours ago', author: 'Agentforce AI Agent', text: 'Resolved autonomously without human agent touch. AI Deflection recorded.' }
      ]
    }
  ];

  let selectedCase = casesData[0];

  // DOM Elements
  const queueSelect = document.getElementById('queue-filter-select');
  const caseListContainer = document.getElementById('case-list-container');
  const caseCountDisplay = document.getElementById('case-count-display');
  const kpiQueueCount = document.getElementById('kpi-queue-count');

  // Case Workspace elements
  const detailCaseNumber = document.getElementById('detail-case-number');
  const detailPriorityBadge = document.getElementById('detail-priority-badge');
  const detailStatusBadge = document.getElementById('detail-status-badge');
  const detailSlaTimer = document.getElementById('detail-sla-timer');
  const detailSubject = document.getElementById('detail-subject');

  // Customer 360 elements
  const custName = document.getElementById('cust-name');
  const custEmail = document.getElementById('cust-email');
  const custTier = document.getElementById('cust-tier');
  const custSentiment = document.getElementById('cust-sentiment');
  const orderNumberDisplay = document.getElementById('order-number-display');
  const orderProductName = document.getElementById('order-product-name');
  const orderAmount = document.getElementById('order-amount');
  const orderTracking = document.getElementById('order-tracking');
  const orderWarranty = document.getElementById('order-warranty');
  const orderReturnWindow = document.getElementById('order-return-window');
  const orderStatusBadge = document.getElementById('order-status-badge');
  const caseTimeline = document.getElementById('case-timeline');

  // Approvals tab elements
  const approvalCalloutText = document.getElementById('approval-callout-text');
  const btnApproveRefund = document.getElementById('btn-approve-refund');
  const btnRejectRefund = document.getElementById('btn-reject-refund');
  const stepApprovalNode = document.getElementById('step-approval-node');
  const stepPayoutNode = document.getElementById('step-payout-node');
  const stepApprovalSub = document.getElementById('step-approval-sub');

  // Agentforce Chat elements
  const aiChatStream = document.getElementById('ai-chat-stream');
  const aiInput = document.getElementById('ai-input');
  const btnSendAi = document.getElementById('btn-send-ai');
  const btnAutoRma = document.getElementById('btn-auto-rma');

  // Modals
  const modalNewCase = document.getElementById('modal-new-case');
  const btnOpenNewCaseModal = document.getElementById('btn-open-new-case-modal');
  const btnCloseNewCaseModal = document.getElementById('btn-close-new-case-modal');
  const btnCancelNewCase = document.getElementById('btn-cancel-new-case');
  const formNewCase = document.getElementById('form-new-case');

  const modalRma = document.getElementById('modal-rma');
  const btnCloseRmaModal = document.getElementById('btn-close-rma-modal');
  const btnDoneRma = document.getElementById('btn-done-rma');
  const rmaCustName = document.getElementById('rma-cust-name');
  const rmaTrackingCode = document.getElementById('rma-tracking-code');

  // Workspace Action buttons
  const btnActionRefund = document.getElementById('btn-action-refund');
  const btnActionRma = document.getElementById('btn-action-rma');
  const btnActionReroute = document.getElementById('btn-action-reroute');
  const btnActionKnowledge = document.getElementById('btn-action-knowledge');
  const btnActionClose = document.getElementById('btn-action-close');

  // Search input
  const globalSearchInput = document.getElementById('global-search-input');

  // Render Case List
  function renderCaseList() {
    const selectedQueue = queueSelect.value;
    const searchQuery = globalSearchInput.value.trim().toLowerCase();

    const filtered = casesData.filter(c => {
      const queueMatch = (selectedQueue === 'ALL' || c.queue === selectedQueue);
      const searchMatch = !searchQuery || 
        c.caseNumber.toLowerCase().includes(searchQuery) ||
        c.customer.toLowerCase().includes(searchQuery) ||
        c.subject.toLowerCase().includes(searchQuery) ||
        c.orderNumber.toLowerCase().includes(searchQuery);
      return queueMatch && searchMatch;
    });

    caseCountDisplay.textContent = `Showing ${filtered.length} cases`;
    kpiQueueCount.textContent = `${casesData.filter(c => c.status !== 'Closed').length} Active`;

    caseListContainer.innerHTML = '';
    filtered.forEach(c => {
      const card = document.createElement('div');
      card.className = `case-card ${c.id === selectedCase.id ? 'active' : ''}`;
      
      const priorityClass = c.priority === 'High' ? 'badge-high' : c.priority === 'Medium' ? 'badge-med' : 'badge-low';

      card.innerHTML = `
        <div class="case-card-top">
          <span class="case-card-num">#${c.caseNumber}</span>
          <span class="case-card-badge ${priorityClass}">${c.priority}</span>
        </div>
        <div class="case-card-subj">${c.subject}</div>
        <div class="case-card-contact">👤 ${c.customer}</div>
        <div class="case-card-footer">
          <span class="case-queue-tag">${c.queueDisplay.split(' ')[0]}</span>
          <span>${c.status}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        selectCase(c);
      });

      caseListContainer.appendChild(card);
    });
  }

  // Select a Case
  function selectCase(c) {
    selectedCase = c;
    renderCaseList();
    renderCaseDetails();
  }

  // Render Detailed Workspace
  function renderCaseDetails() {
    const c = selectedCase;
    detailCaseNumber.textContent = c.caseNumber;
    detailPriorityBadge.textContent = `${c.priority.toUpperCase()} PRIORITY`;
    detailPriorityBadge.className = `badge ${c.priority === 'High' ? 'priority-high' : 'badge-med'}`;
    
    detailStatusBadge.textContent = c.status.toUpperCase();
    detailStatusBadge.className = `badge ${c.status === 'Closed' ? 'status-delivered' : 'status-working'}`;

    detailSlaTimer.textContent = `⏱️ SLA: ${c.slaRemaining}`;
    detailSubject.textContent = c.subject;

    // Customer 360
    custName.textContent = c.customer;
    custEmail.textContent = c.email;
    custTier.textContent = c.tier;
    
    custSentiment.innerHTML = `
      <span class="sentiment-indicator ${c.sentimentType}"></span> ${c.sentimentLabel}
    `;

    // Order Info
    orderNumberDisplay.textContent = c.orderNumber;
    orderProductName.textContent = c.orderItem;
    orderAmount.textContent = c.orderAmount;
    orderTracking.textContent = c.orderTracking;
    orderWarranty.textContent = c.warrantyStatus;
    orderReturnWindow.textContent = c.returnEligible ? 'Eligible (Within 30 Days)' : 'Not Eligible (Expired or Processing)';
    orderReturnWindow.className = `field-val ${c.returnEligible ? 'tag-eligible' : 'tag-warranty'}`;

    orderStatusBadge.textContent = c.orderStatus.toUpperCase();
    orderStatusBadge.className = `badge ${c.orderStatus === 'Delivered' ? 'status-delivered' : 'status-working'}`;

    // Timeline Feed
    renderTimeline(c.timeline);

    // Approval Card State
    updateApprovalState(c);
  }

  function renderTimeline(timelineItems) {
    caseTimeline.innerHTML = '';
    timelineItems.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'timeline-item';
      itemEl.innerHTML = `
        <div class="timeline-bullet"></div>
        <div class="timeline-header">${item.author}</div>
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-body">${item.text}</div>
      `;
      caseTimeline.appendChild(itemEl);
    });
  }

  function updateApprovalState(c) {
    if (c.pendingRefund && c.pendingRefund > 0) {
      approvalCalloutText.innerHTML = `Pending Refund Request: <strong>$${c.pendingRefund.toFixed(2)}</strong> for order ${c.orderNumber}. Exceeds $100 automated limit.`;
      btnApproveRefund.style.display = 'inline-block';
      btnRejectRefund.style.display = 'inline-block';
      btnApproveRefund.textContent = `✓ Approve Refund ($${c.pendingRefund.toFixed(2)})`;
      stepApprovalNode.className = 'step active';
      stepPayoutNode.className = 'step';
      stepApprovalSub.textContent = 'Awaiting Manager Review';
    } else {
      approvalCalloutText.innerHTML = `No pending approvals for this case. Standard automated thresholds applied.`;
      btnApproveRefund.style.display = 'none';
      btnRejectRefund.style.display = 'none';
      stepApprovalNode.className = 'step completed';
      stepApprovalSub.textContent = 'Completed / None Required';
    }
  }

  // Tab switching
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      tabLinks.forEach(l => l.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      link.classList.add('active');
      const targetId = link.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Action Buttons
  btnActionRefund.addEventListener('click', () => {
    document.querySelector('[data-tab="tab-approval"]').click();
    appendAiMessage('Agentforce Copilot', `I have navigated to the Approval Process workspace for Case #${selectedCase.caseNumber}. The refund amount requires Tier 2 approval under Service Cloud routing rules.`);
  });

  btnActionRma.addEventListener('click', () => {
    openRmaModal();
  });

  btnActionClose.addEventListener('click', () => {
    selectedCase.status = 'Closed';
    selectedCase.slaRemaining = 'Resolved On-Time';
    selectedCase.timeline.unshift({
      time: 'Just now',
      author: 'Alex Rivera (Support Specialist)',
      text: 'Case resolved and closed. Customer satisfaction survey dispatched automatically.'
    });
    renderCaseDetails();
    renderCaseList();
    appendAiMessage('Agentforce Copilot', `Case #${selectedCase.caseNumber} has been successfully closed. Customer resolution audit logged.`);
  });

  btnActionReroute.addEventListener('click', () => {
    const newQueue = selectedCase.queue === 'Billing_Support_Queue' ? 'Tier_2_Technical_Queue' : 'Billing_Support_Queue';
    selectedCase.queue = newQueue;
    selectedCase.queueDisplay = newQueue === 'Billing_Support_Queue' ? 'Billing & Refunds Queue' : 'Tier 2 Technical Support';
    selectedCase.timeline.unshift({
      time: 'Just now',
      author: 'Omni-Channel Flow',
      text: `Case re-routed manually to ${selectedCase.queueDisplay}.`
    });
    renderCaseDetails();
    renderCaseList();
    appendAiMessage('Agentforce Copilot', `Case #${selectedCase.caseNumber} re-routed to ${selectedCase.queueDisplay}.`);
  });

  btnActionKnowledge.addEventListener('click', () => {
    appendAiMessage('Agentforce Knowledge Engine', `Verified Knowledge Article Attached to Case #${selectedCase.caseNumber}:\n\n📘 KB-00921: Standard RMA and Hardware Diagnostics Policy (V3)\n• Standard replacement warranty covers audio cut-out and driver degradation.\n• Direct replacement units dispatched via FedEx 2-Day Air upon receipt of defective device.`);
  });

  // Approve Refund
  btnApproveRefund.addEventListener('click', () => {
    const amt = selectedCase.pendingRefund;
    selectedCase.pendingRefund = 0;
    stepApprovalNode.className = 'step completed';
    stepPayoutNode.className = 'step completed';
    stepApprovalSub.textContent = 'Approved by Alex Rivera';
    approvalCalloutText.innerHTML = `✅ <strong>Approved:</strong> Refund of $${amt.toFixed(2)} credited via automated payment gateway. Confirmation ref #REF-${Math.floor(10000 + Math.random() * 90000)}.`;
    btnApproveRefund.style.display = 'none';
    btnRejectRefund.style.display = 'none';

    selectedCase.timeline.unshift({
      time: 'Just now',
      author: 'Alex Rivera (Support Specialist)',
      text: `Approved refund of $${amt.toFixed(2)} under Salesforce Approval Process. ERP webhook fired.`
    });
    renderTimeline(selectedCase.timeline);
    appendAiMessage('Agentforce Copilot', `Refund of $${amt.toFixed(2)} for ${selectedCase.customer} is approved. Customer notified via email.`);
  });

  // Reject Refund
  btnRejectRefund.addEventListener('click', () => {
    selectedCase.pendingRefund = 0;
    approvalCalloutText.innerHTML = `❌ <strong>Refund Request Rejected:</strong> Request does not meet return eligibility criteria.`;
    btnApproveRefund.style.display = 'none';
    btnRejectRefund.style.display = 'none';

    selectedCase.timeline.unshift({
      time: 'Just now',
      author: 'Alex Rivera (Support Specialist)',
      text: `Rejected refund request. Alternate credit offer generated.`
    });
    renderTimeline(selectedCase.timeline);
    appendAiMessage('Agentforce Copilot', `Refund rejected. Next Best Action: Offer 15% promotional store credit code.`);
  });

  // RMA Modal
  function openRmaModal() {
    rmaCustName.textContent = selectedCase.customer;
    rmaTrackingCode.textContent = `RMA-${Math.floor(1000 + Math.random() * 9000)}-FEDEX-RETURN`;
    modalRma.classList.remove('hidden');
    selectedCase.timeline.unshift({
      time: 'Just now',
      author: 'Agentforce Service Agent',
      text: `Generated pre-paid RMA return shipping label (${rmaTrackingCode.textContent}). Dispatched to ${selectedCase.email}.`
    });
    renderTimeline(selectedCase.timeline);
  }

  btnCloseRmaModal.addEventListener('click', () => modalRma.classList.add('hidden'));
  btnDoneRma.addEventListener('click', () => modalRma.classList.add('hidden'));

  // Quick action from AI bubble
  btnAutoRma.addEventListener('click', () => {
    openRmaModal();
    appendAiMessage('Agentforce Service Agent', `Pre-paid RMA label generated and emailed to ${selectedCase.customer} (${selectedCase.email}).`);
  });

  // Agentforce AI Chat
  function appendAiMessage(sender, text) {
    const isUser = sender === 'You' || sender === 'Support Agent';
    const bubble = document.createElement('div');
    bubble.className = `ai-bubble ${isUser ? 'user' : 'agent'}`;
    bubble.innerHTML = `
      <div class="bubble-sender">${sender}</div>
      <div class="bubble-text">${text.replace(/\n/g, '<br>')}</div>
    `;
    aiChatStream.appendChild(bubble);
    aiChatStream.scrollTop = aiChatStream.scrollHeight;
  }

  function handleAiInput(query) {
    if (!query) return;
    appendAiMessage('Support Agent', query);
    aiInput.value = '';

    // Show simulated reasoning
    setTimeout(() => {
      const q = query.toLowerCase();
      if (q.includes('ord-9824') || (q.includes('order') && q.includes('status'))) {
        appendAiMessage('Agentforce Service Agent', `📦 Order Status for ORD-9824:\n• Customer: Sarah Jenkins\n• Status: Delivered (2 days ago)\n• Carrier: FedEx Express (FEDEX-9405-2819)\n• Total Amount: $349.99\n• Warranty: Active 2-Year Care+\n• Return Window: Open (28 days remaining).`);
      } else if (q.includes('return') || q.includes('rma') || q.includes('label')) {
        openRmaModal();
        appendAiMessage('Agentforce Service Agent', `I have generated pre-paid RMA Return Label for ${selectedCase.customer}. RMA Code: ${rmaTrackingCode.textContent}. Customer sent email with drop-off instructions.`);
      } else if (q.includes('refund') || q.includes('invoice')) {
        appendAiMessage('Agentforce Service Agent', `Evaluating Refund Policy:\n• Orders over $100 require approval under the standard Salesforce Service Cloud process.\n• Case #${selectedCase.caseNumber} has a pending refund of $349.99.\n• Suggestion: Click 'Approve Refund' in the Approvals & Milestones tab.`);
      } else if (q.includes('reset') || q.includes('article') || q.includes('knowledge') || q.includes('headphone') || q.includes('wifi')) {
        appendAiMessage('Agentforce Knowledge Grounding', `Grounding in verified Salesforce Knowledge:\n\n1. Press and hold power button for 7 seconds until LED pulses Blue/Amber.\n2. Open Companion App > Settings > Reset Network Profile.\n3. Re-pair via Bluetooth 5.3.\n\nWould you like me to send these troubleshooting steps directly to ${selectedCase.email}?`);
      } else if (q.includes('draft') || q.includes('email')) {
        appendAiMessage('Agentforce Copilot (GenAI)', `Here is a drafted customer resolution email for Sarah Jenkins:\n\n"Dear Sarah,\nThank you for reaching out regarding your OmniSound Pro Wireless ANC Headphones. We apologize for the audio cutting out. As a Platinum VIP member, we have already issued a pre-paid FedEx return label to your inbox. As soon as scanned by the carrier, an immediate replacement or full refund will be expedited.\n\nWarm regards,\nSalesforce Service Team"`);
      } else {
        appendAiMessage('Agentforce Service Agent', `I have queried your Salesforce Service Cloud instance. Case #${selectedCase.caseNumber} is assigned to ${selectedCase.queueDisplay} with ${selectedCase.priority} priority. I can help lookup orders, draft responses, generate RMA return labels, or execute approval workflows.`);
      }
    }, 600);
  }

  btnSendAi.addEventListener('click', () => handleAiInput(aiInput.value.trim()));
  aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAiInput(aiInput.value.trim());
  });

  // Prompt chips
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      handleAiInput(q);
    });
  });

  // New Case Modal & Classification Engine (Matching CaseAutomationService.cls)
  btnOpenNewCaseModal.addEventListener('click', () => modalNewCase.classList.remove('hidden'));
  btnCloseNewCaseModal.addEventListener('click', () => modalNewCase.classList.add('hidden'));
  btnCancelNewCase.addEventListener('click', () => modalNewCase.classList.add('hidden'));

  formNewCase.addEventListener('submit', (e) => {
    e.preventDefault();
    const contact = document.getElementById('input-case-contact').value;
    const email = document.getElementById('input-case-email').value;
    const subject = document.getElementById('input-case-subject').value;
    const desc = document.getElementById('input-case-desc').value;
    const order = document.getElementById('input-case-order').value || 'ORD-' + Math.floor(1000 + Math.random() * 9000);

    // AI Classification logic directly replicating CaseAutomationService.cls:
    const lower = (subject + ' ' + desc).toLowerCase();
    let priority = 'Medium';
    let sentimentScore = 0.05;
    let sentimentLabel = 'Neutral (+0.05)';
    let sentimentType = 'positive';
    let queue = 'Tier_1_Customer_Care';
    let queueDisplay = 'Tier 1 Customer Care';
    let slaRemaining = '8h remaining';

    if (lower.includes('urgent') || lower.includes('furious') || lower.includes('unacceptable') || lower.includes('broken') || lower.includes('fail')) {
      priority = 'High';
      sentimentScore = -0.85;
      sentimentLabel = 'Negative / Critical (-0.85)';
      sentimentType = 'negative';
      slaRemaining = '2h remaining';
    }

    if (lower.includes('refund') || lower.includes('charge') || lower.includes('invoice') || lower.includes('billing')) {
      queue = 'Billing_Support_Queue';
      queueDisplay = 'Billing & Refunds Queue';
    } else if (lower.includes('return') || lower.includes('replacement') || lower.includes('defective')) {
      queue = 'Returns_Support_Queue';
      queueDisplay = 'Returns & RMA Queue';
    } else if (lower.includes('error') || lower.includes('bug') || lower.includes('crash') || lower.includes('setup') || lower.includes('technical')) {
      queue = 'Tier_2_Technical_Queue';
      queueDisplay = 'Tier 2 Technical Support';
      if (priority === 'Medium') {
        priority = 'High';
        slaRemaining = '4h remaining';
      }
    }

    const newCaseNumber = '000' + (1048 + casesData.length);
    const newCaseObj = {
      id: 'case-' + newCaseNumber,
      caseNumber: newCaseNumber,
      subject: subject,
      description: desc,
      customer: contact,
      email: email,
      tier: 'Standard Customer',
      sentimentScore: sentimentScore,
      sentimentLabel: sentimentLabel,
      sentimentType: sentimentType,
      priority: priority,
      status: 'New',
      slaRemaining: slaRemaining,
      queue: queue,
      queueDisplay: queueDisplay,
      orderNumber: order,
      orderItem: 'Smart Connected Device',
      orderAmount: '$249.00 USD',
      orderStatus: 'Delivered',
      orderTracking: 'FedEx Express (FEDEX-TRK-771)',
      warrantyStatus: 'Active Warranty (1 Year)',
      returnEligible: true,
      pendingRefund: lower.includes('refund') ? 249.00 : 0,
      timeline: [
        { time: 'Just now', author: 'Salesforce Record-Triggered Flow', text: `Inbound case evaluated by CaseAutomationService.cls. Tagged as ${priority} Priority, Sentiment ${sentimentLabel}, and routed to ${queueDisplay}.` }
      ]
    };

    casesData.unshift(newCaseObj);
    modalNewCase.classList.add('hidden');
    formNewCase.reset();

    selectCase(newCaseObj);
    appendAiMessage('Agentforce AI Router', `⚡ New Case #${newCaseNumber} auto-ingested!\n• Customer: ${contact}\n• Priority: ${priority}\n• Sentiment: ${sentimentLabel}\n• Queue: ${queueDisplay}\n• SLA Milestone: ${slaRemaining}`);
  });

  // Filter & Search events
  queueSelect.addEventListener('change', renderCaseList);
  globalSearchInput.addEventListener('input', renderCaseList);
  document.getElementById('btn-refresh-cases').addEventListener('click', () => {
    renderCaseList();
    renderCaseDetails();
  });

  // Keyboard shortcut cmd+k
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      globalSearchInput.focus();
    }
  });

  // Initial load
  renderCaseList();
  renderCaseDetails();
});
