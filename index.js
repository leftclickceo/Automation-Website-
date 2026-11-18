/**
 * LEFTCLICKCEO — INTERACTIVE SCRIPTS
 * Exactly matching the behavior and UX demonstrated in the preview
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // 1. ROTATING HEADLINE WORD
  // ========================================================
  const rotatingWordEl = document.getElementById('rotating-word');
  const words = ['operations', 'finance', 'sales', 'support'];
  let currentWordIdx = 0;

  if (rotatingWordEl) {
    setInterval(() => {
      rotatingWordEl.classList.add('fade-out');
      setTimeout(() => {
        currentWordIdx = (currentWordIdx + 1) % words.length;
        rotatingWordEl.textContent = words[currentWordIdx];
        rotatingWordEl.classList.remove('fade-out');
        rotatingWordEl.classList.add('fade-in');
        setTimeout(() => {
          rotatingWordEl.classList.remove('fade-in');
        }, 250);
      }, 250);
    }, 2800);
  }

  // ========================================================
  // 2. MOBILE DRAWER TOGGLE
  // ========================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileDrawer.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // ========================================================
  // 3. AGENT SKETCH PRESETS & MODAL
  // ========================================================
  const sketchModal = document.getElementById('sketch-modal');
  const closeSketchBtn = document.getElementById('close-sketch-modal');
  const heroSketchInput = document.getElementById('hero-sketch-input');
  const heroSketchBtn = document.getElementById('hero-sketch-btn');
  const pillChips = document.querySelectorAll('.pill-chip');

  const modalAgentTitle = document.getElementById('modal-agent-title');
  const modalAgentSub = document.getElementById('modal-agent-sub');
  const modalTriggerText = document.getElementById('modal-trigger-text');
  const modalHandsOffText = document.getElementById('modal-hands-off-text');
  const modalStepsList = document.getElementById('modal-steps-list');
  const modalConnectsTags = document.getElementById('modal-connects-tags');
  const modalStartText = document.getElementById('modal-start-text');

  const sketchPlaybook = {
    'match-invoices': {
      title: 'Invoice Processor',
      query: 'Match invoices to purchase orders',
      trigger: 'An invoice or payment record arrives in AP inbox.',
      handsOff: "Amounts don't match, or the vendor is new.",
      steps: [
        'Reads every line item from incoming PDF or vendor portal',
        'Matches it to the purchase order or ERP ledger',
        'Flags variance exceeding $1.00 or unmatched line items',
        'Prepares clean reconciliation bundle for Controller approval'
      ],
      connects: ['Email', 'Accounting', 'Google Sheets'],
      start: 'A Build, from $6,000 fixed. We confirm scope on a free call.'
    },
    'reply-lead': {
      title: 'Lead Responder',
      query: 'Reply to every new lead within a minute',
      trigger: 'A new demo request or contact form submission occurs.',
      handsOff: 'Enterprise accounts over 500 employees, or custom enterprise terms.',
      steps: [
        'Enriches company headcount, funding, and tech stack in 45s',
        'Scores fit against ideal customer profile (ICP)',
        'Drafts highly customized response addressing their specific stack',
        'Routes calendar invite or alerts account executive with call brief'
      ],
      connects: ['HubSpot', 'Clearbit', 'Slack', 'Gmail'],
      start: 'A Build, from $6,000 fixed. We confirm scope on a free call.'
    },
    'resolve-ticket': {
      title: 'Ticket Resolver',
      query: 'Resolve refund and order-status tickets',
      trigger: 'A customer files a support ticket regarding order status or return.',
      handsOff: 'Refunds exceeding $50, or angry sentiment score > 0.85.',
      steps: [
        'Parses order ID and fetches real-time carrier delivery status',
        'Validates 30-day return window and inventory condition',
        'Automatically triggers refund if order is within policy (<$50)',
        'Drafts empathetic response and requests supervisor sign-off for exceptions'
      ],
      connects: ['Zendesk', 'Shopify', 'Stripe', 'Gorgias'],
      start: 'A Build, from $6,000 fixed. We confirm scope on a free call.'
    },
    'monday-slack': {
      title: 'Reporting Agent',
      query: 'Send the Monday numbers to Slack',
      trigger: 'Scheduled execution every Monday at 07:30 AM EST.',
      handsOff: 'Metric anomaly detected (>25% weekly drop in core KPIs).',
      steps: [
        'Queries transactional DB, Google Analytics, and Stripe revenue feed',
        'Calculates WoW changes in MRR, gross churn, and active users',
        'Synthesizes top 3 positive drivers and top 2 operational bottlenecks',
        'Publishes executive visual summary card directly to #leadership'
      ],
      connects: ['Postgres', 'Stripe', 'Slack', 'Metabase'],
      start: 'A Build, from $6,000 fixed. We confirm scope on a free call.'
    }
  };

  function openSketchModal(data) {
    if (!sketchModal) return;
    modalAgentTitle.textContent = data.title;
    modalAgentSub.innerHTML = `For: &ldquo;${data.query}&rdquo;`;
    modalTriggerText.textContent = data.trigger;
    modalHandsOffText.textContent = data.handsOff;

    modalStepsList.innerHTML = data.steps.map((s, idx) => `
      <div class="num-item">
        <span class="red-num">0${idx + 1}</span>
        <span>${s}</span>
      </div>
    `).join('');

    modalConnectsTags.innerHTML = data.connects.map(tag => `
      <span class="tag-pill">${tag}</span>
    `).join('');

    modalStartText.textContent = data.start;

    sketchModal.classList.add('open');
    sketchModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSketchModal() {
    if (!sketchModal) return;
    sketchModal.classList.remove('open');
    sketchModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeSketchBtn) {
    closeSketchBtn.addEventListener('click', closeSketchModal);
  }

  if (sketchModal) {
    sketchModal.addEventListener('click', (e) => {
      if (e.target === sketchModal) closeSketchModal();
    });
  }

  pillChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-workflow');
      if (sketchPlaybook[key]) {
        heroSketchInput.value = sketchPlaybook[key].query;
        openSketchModal(sketchPlaybook[key]);
      }
    });
  });

  if (heroSketchBtn && heroSketchInput) {
    heroSketchBtn.addEventListener('click', () => {
      const query = heroSketchInput.value.trim() || 'Custom Workflow Agent';
      
      // Check if it matches a preset
      let matched = null;
      for (const key in sketchPlaybook) {
        if (sketchPlaybook[key].query.toLowerCase().includes(query.toLowerCase()) ||
            query.toLowerCase().includes(sketchPlaybook[key].title.toLowerCase())) {
          matched = sketchPlaybook[key];
          break;
        }
      }

      if (matched) {
        openSketchModal(matched);
      } else {
        // Dynamic custom generation
        openSketchModal({
          title: query.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Agent',
          query: query,
          trigger: `New event or batch trigger matching '${query}' in your workspace.`,
          handsOff: 'Edge cases, unauthorized spend thresholds, or unexpected input schemas.',
          steps: [
            `Ingests raw inputs and standardizes data structures for ${query}`,
            'Executes deterministic policy rules and checks internal data models',
            'Prepares verified execution payload and logs audit reasoning',
            'Hands off ambiguous cases to human team before committing actions'
          ],
          connects: ['Your Cloud', 'Custom API', 'Slack'],
          start: 'A Build, from $6,000 fixed. We confirm scope on a free call.'
        });
      }
    });

    heroSketchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        heroSketchBtn.click();
      }
    });
  }

  // Link to focus sketch input
  const focusSketchLink = document.getElementById('focus-sketch-link');
  if (focusSketchLink) {
    focusSketchLink.addEventListener('click', (e) => {
      e.preventDefault();
      heroSketchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      heroSketchInput.focus();
      heroSketchInput.select();
    });
  }

  // ========================================================
  // 4. "WHAT WE BUILD" MATRIX DIRECTORY
  // ========================================================
  const matrixTabs = document.querySelectorAll('.matrix-tab-btn');
  const matrixContainer = document.getElementById('matrix-cards-container');

  const agentsDatabase = {
    sales: [
      {
        name: 'Lead Responder',
        desc: 'Researches every inbound lead, scores it against your ideal customer and drafts a hyper-personalized response.',
        tools: ['HubSpot', 'Gmail', 'Clearbit'],
        asks: 'Asks a person when account size > 500 or budget is unconfirmed.'
      },
      {
        name: 'Meeting Prepper',
        desc: 'Sends your rep a one-page brief before each call: who they are, what changed, past tickets and talking points.',
        tools: ['Calendar', 'LinkedIn', 'Slack'],
        asks: 'Asks a person when conflicting relationship records are found.'
      },
      {
        name: 'Follow-up Closer',
        desc: 'Turns call notes and recordings into CRM updates, next steps, contracts and follow-up emails so nothing drops.',
        tools: ['Gong', 'Salesforce', 'DocuSign'],
        asks: 'Asks a person before sending any revised price quotes.'
      }
    ],
    support: [
      {
        name: 'Ticket Resolver',
        desc: 'Handles routine order tracking, account questions, password resets and address changes across chat and email.',
        tools: ['Zendesk', 'Shopify', 'Klaviyo'],
        asks: 'Asks a person when customer sentiment drops or refund > $50.'
      },
      {
        name: 'Dispute Handler',
        desc: 'Reviews chargeback notifications, gathers delivery proofs and evidence logs, and drafts bank responses.',
        tools: ['Stripe', 'FedEx', 'Email'],
        asks: 'Asks a person when dispute amount exceeds standard authorization.'
      },
      {
        name: 'Feedback Synthesizer',
        desc: 'Categorizes every customer complaint into product feature requests and reports weekly clusters to engineering.',
        tools: ['Intercom', 'Linear', 'Notion'],
        asks: 'Asks a person when severe security or downtime reports emerge.'
      }
    ],
    operations: [
      {
        name: 'Reporting Agent',
        desc: 'Queries databases and third-party dashboards, calculates week-over-week deltas, and delivers Monday morning briefs.',
        tools: ['Postgres', 'Stripe', 'Slack'],
        asks: 'Asks a person when variance exceeds 20% compared to forecast.'
      },
      {
        name: 'Vendor Onboarder',
        desc: 'Collects W-9s, NDAs, security questionnaires, and bank verification details into compliance records.',
        tools: ['Airtable', 'DocuSign', 'Drive'],
        asks: 'Asks a person when security certificate fails automated audit.'
      },
      {
        name: 'Inventory Balancer',
        desc: 'Monitors regional fulfillment centers, projects restock dates based on velocity, and drafts POs for low stock.',
        tools: ['ShipBob', 'ERP', 'Excel'],
        asks: 'Asks a person before releasing batch payment to suppliers.'
      }
    ],
    finance: [
      {
        name: 'Invoice Processor',
        desc: 'Reads every line from incoming invoices, checks them against purchase orders, and pre-populates the ledger.',
        tools: ['Sheets', 'Accounting', 'Email'],
        asks: "Asks a person when amounts don't match or a vendor is new."
      },
      {
        name: 'Billing Reconciler',
        desc: 'Matches incoming wire receipts and Stripe transactions to customer contracts and flags unearned revenue.',
        tools: ['Payments', 'QuickBooks', 'Bank API'],
        asks: 'Asks a person when a customer disputes or asks for custom terms.'
      },
      {
        name: 'Expense Auditor',
        desc: 'Reviews receipts submitted on corporate cards against company travel policies and flags duplicates or overages.',
        tools: ['Ramp', 'Brex', 'Slack'],
        asks: "Asks a person when any transaction doesn't reconcile."
      }
    ]
  };

  function renderAgents(cat) {
    if (!matrixContainer || !agentsDatabase[cat]) return;
    const cards = agentsDatabase[cat];
    matrixContainer.innerHTML = cards.map(c => `
      <div class="agent-dir-card">
        <div>
          <h3 class="card-agent-name">${c.name}</h3>
          <p class="card-agent-desc">${c.desc}</p>
        </div>
        <div class="card-bottom-meta">
          <div class="tools-group">
            <span>TOOLS:</span>
            ${c.tools.map(t => `<span class="tool-chip">${t}</span>`).join('')}
          </div>
          <div class="asks-rule-box">
            <strong>Rule:</strong> ${c.asks}
          </div>
        </div>
      </div>
    `).join('');
  }

  matrixTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      matrixTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderAgents(tab.getAttribute('data-cat'));
    });
  });

  // Render initial tab (sales)
  renderAgents('sales');

  // ========================================================
  // 5. "SEE ONE WORK" (Interactive Live Terminal)
  // ========================================================
  const scenarioCards = document.querySelectorAll('.scenario-card');
  const terminalTraceBody = document.getElementById('terminal-trace-body');
  const terminalAgentTitle = document.getElementById('terminal-agent-title');
  const replayDemoBtn = document.getElementById('replay-demo-btn');

  const demoTraces = {
    lead: {
      title: 'sales-agent',
      steps: [
        { type: 'trigger', text: '[23:04:12] Webhook received: Demo form submission from sarah@vortexlogistics.com' },
        { type: 'exec', text: '[23:04:13] Enrichment query: Vortex Logistics &middot; 340 employees &middot; Series B &middot; ERP: NetSuite' },
        { type: 'exec', text: '[23:04:14] Scoring engine: ICP match score = 94/100 (Tier-1 Enterprise Lead)' },
        { type: 'exec', text: '[23:04:15] Synthesized tailored response with calendar booking link and NetSuite case study.' },
        { type: 'approval', text: '[23:04:16] Policy rule: VIP accounts (>100 FTE) require Account Executive review before send.' },
        { type: 'action', text: 'Draft queued in Slack #sales-inbound for @Dave approval.', buttonText: 'Approve & Dispatch' }
      ]
    },
    finance: {
      title: 'finance-agent',
      steps: [
        { type: 'trigger', text: '[09:12:04] Incoming invoice received: INV-88419 from CloudScale Networks ($14,250.00)' },
        { type: 'exec', text: '[09:12:05] OCR parsing: Extracted line items, tax ID, and remittance bank details.' },
        { type: 'exec', text: '[09:12:06] Ledger cross-check: Matching against Purchase Order #PO-2026-904' },
        { type: 'warn', text: '[09:12:07] Notice: Remittance IBAN differs from past 3 historical payments for this vendor.' },
        { type: 'approval', text: '[09:12:08] Policy rule: Any vendor bank account change requires Controller sign-off.' },
        { type: 'action', text: 'Approval request generated: Flagged bank discrepancy to Controller.', buttonText: 'Verify & Release' }
      ]
    },
    support: {
      title: 'support-agent',
      steps: [
        { type: 'trigger', text: '[14:28:40] Support ticket #49102: "Damaged packaging, requesting immediate $120 refund"' },
        { type: 'exec', text: '[14:28:41] Shopify lookup: Order #8192 delivered 3 days ago. Customer LTV = $1,840.' },
        { type: 'exec', text: '[14:28:42] Sentiment analysis: Frustrated (0.82), photo attachment inspected and verified.' },
        { type: 'approval', text: '[14:28:43] Guardrail: Autonomous refund limit is $50.00. $120.00 exceeds limit.' },
        { type: 'action', text: 'Pre-drafted full refund and apology credit note. Awaiting lead approval.', buttonText: 'Approve $120 Refund' }
      ]
    }
  };

  let currentScenario = 'lead';
  let traceTimer = null;

  function runDemoTrace(scenarioKey) {
    if (!terminalTraceBody) return;
    clearTimeout(traceTimer);
    const trace = demoTraces[scenarioKey];
    terminalAgentTitle.textContent = trace.title;
    terminalTraceBody.innerHTML = '';

    let i = 0;
    function printNextLine() {
      if (i >= trace.steps.length) return;
      const step = trace.steps[i];
      const lineEl = document.createElement('div');
      lineEl.className = 'trace-line';

      if (step.type === 'trigger') {
        lineEl.innerHTML = `<span class="trace-tag trigger">TRIGGER</span><span>${step.text}</span>`;
      } else if (step.type === 'exec') {
        lineEl.innerHTML = `<span class="trace-tag exec">EXEC</span><span>${step.text}</span>`;
      } else if (step.type === 'warn') {
        lineEl.innerHTML = `<span class="trace-tag warn">VARIANCE</span><span>${step.text}</span>`;
      } else if (step.type === 'approval') {
        lineEl.innerHTML = `<span class="trace-tag approval">GUARDRAIL</span><span>${step.text}</span>`;
      } else if (step.type === 'action') {
        lineEl.innerHTML = `
          <div class="approval-action-box">
            <span>${step.text}</span>
            <button class="btn-approve-sm" id="demo-action-btn">${step.buttonText}</button>
          </div>
        `;
      }

      terminalTraceBody.appendChild(lineEl);

      const actionBtn = lineEl.querySelector('#demo-action-btn');
      if (actionBtn) {
        actionBtn.addEventListener('click', () => {
          actionBtn.textContent = '&check; Approved';
          actionBtn.style.backgroundColor = '#10b981';
          const confirmedLine = document.createElement('div');
          confirmedLine.className = 'trace-line';
          confirmedLine.style.color = '#34d399';
          confirmedLine.innerHTML = `<span class="trace-tag exec">DISPATCHED</span> Action executed with human digital signature.`;
          terminalTraceBody.appendChild(confirmedLine);
        });
      }

      i++;
      traceTimer = setTimeout(printNextLine, 450);
    }

    printNextLine();
  }

  scenarioCards.forEach(card => {
    card.addEventListener('click', () => {
      scenarioCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentScenario = card.getAttribute('data-scenario');
      runDemoTrace(currentScenario);
    });
  });

  if (replayDemoBtn) {
    replayDemoBtn.addEventListener('click', () => {
      runDemoTrace(currentScenario);
    });
  }

  // Run default trace
  runDemoTrace('lead');

  // ========================================================
  // 6. CONTROL POLICY SWITCHER
  // ========================================================
  const modeApproveBtn = document.getElementById('mode-approve-btn');
  const modeAutopilotBtn = document.getElementById('mode-autopilot-btn');
  const policyModeDisplay = document.getElementById('policy-mode-display');
  const policyRowsContainer = document.getElementById('policy-rows-container');

  const policyConfigs = {
    autopilot: {
      label: 'AUTOPILOT',
      rows: [
        { action: 'Answer order-status questions', badge: 'AGENT DOES IT', type: 'green' },
        { action: 'Update a shipping address', badge: 'AGENT DOES IT', type: 'green' },
        { action: 'Refund under $50', badge: 'AGENT DOES IT', type: 'green' },
        { action: 'Refund over $50', badge: 'ASKS YOU FIRST', type: 'red' },
        { action: 'Close an account', badge: 'ASKS YOU FIRST', type: 'red' }
      ]
    },
    approve: {
      label: 'STRICT APPROVAL',
      rows: [
        { action: 'Answer order-status questions', badge: 'AGENT DOES IT', type: 'green' },
        { action: 'Update a shipping address', badge: 'ASKS YOU FIRST', type: 'red' },
        { action: 'Refund under $50', badge: 'ASKS YOU FIRST', type: 'red' },
        { action: 'Refund over $50', badge: 'ASKS YOU FIRST', type: 'red' },
        { action: 'Close an account', badge: 'ASKS YOU FIRST', type: 'red' }
      ]
    }
  };

  function updatePolicyMode(mode) {
    if (!policyRowsContainer) return;
    const cfg = policyConfigs[mode];
    policyModeDisplay.textContent = cfg.label;
    policyRowsContainer.innerHTML = cfg.rows.map(r => `
      <div class="policy-row">
        <span class="policy-action">${r.action}</span>
        <span class="policy-badge ${r.type}-badge">${r.badge}</span>
      </div>
    `).join('');
  }

  if (modeApproveBtn && modeAutopilotBtn) {
    modeApproveBtn.addEventListener('click', () => {
      modeApproveBtn.classList.add('active');
      modeAutopilotBtn.classList.remove('active');
      updatePolicyMode('approve');
    });

    modeAutopilotBtn.addEventListener('click', () => {
      modeAutopilotBtn.classList.add('active');
      modeApproveBtn.classList.remove('active');
      updatePolicyMode('autopilot');
    });
  }

  // ========================================================
  // 7. ROI CALCULATOR
  // ========================================================
  const sliderPeople = document.getElementById('slider-people');
  const sliderHours = document.getElementById('slider-hours');
  const sliderRate = document.getElementById('slider-rate');
  const sliderShare = document.getElementById('slider-share');

  const valPeople = document.getElementById('val-people');
  const valHours = document.getElementById('val-hours');
  const valRate = document.getElementById('val-rate');
  const valShare = document.getElementById('val-share');

  const displayManualCost = document.getElementById('display-manual-cost');
  const displayHoursSaved = document.getElementById('display-hours-saved');
  const displayValueSaved = document.getElementById('display-value-saved');
  const displayNetYearOne = document.getElementById('display-net-year-one');

  function updateCalculator() {
    if (!sliderPeople) return;
    const people = parseInt(sliderPeople.value, 10);
    const hours = parseInt(sliderHours.value, 10);
    const rate = parseInt(sliderRate.value, 10);
    const share = parseInt(sliderShare.value, 10) / 100;

    // Display labels
    valPeople.textContent = people;
    valHours.textContent = hours;
    valRate.textContent = `$${rate}`;
    valShare.textContent = `${Math.round(share * 100)}%`;

    // Calculations
    const annualTotalHours = people * hours * 52;
    const manualCost = annualTotalHours * rate;
    const hoursSaved = Math.round(annualTotalHours * share);
    const valueSaved = hoursSaved * rate;
    const fixedBuildAndRun = 24000; // $6,000 build + 12 * $1,500 run
    const netYearOne = valueSaved - fixedBuildAndRun;

    displayManualCost.textContent = `$${manualCost.toLocaleString()}`;
    displayHoursSaved.textContent = hoursSaved.toLocaleString();
    displayValueSaved.textContent = `$${valueSaved.toLocaleString()}`;
    displayNetYearOne.textContent = `$${netYearOne.toLocaleString()}`;
  }

  [sliderPeople, sliderHours, sliderRate, sliderShare].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', updateCalculator);
    }
  });

  updateCalculator();

  // ========================================================
  // 8. 60-SECOND FIT TEST MODAL (Multi-Step Flow)
  // ========================================================
  const fitModal = document.getElementById('fit-modal');
  const closeFitModalBtn = document.getElementById('close-fit-modal');
  const openFitBtns = document.querySelectorAll('.open-fit-modal-btn');

  const fitProgressText = document.getElementById('fit-progress-text');
  const fitProgressFill = document.getElementById('fit-progress-fill');

  const step1 = document.getElementById('fit-step-1');
  const step2 = document.getElementById('fit-step-2');
  const step3 = document.getElementById('fit-step-3');
  const step4 = document.getElementById('fit-step-4');

  const continue1 = document.getElementById('fit-continue-1');
  const continue2 = document.getElementById('fit-continue-2');
  const continue3 = document.getElementById('fit-continue-3');

  const back2 = document.getElementById('fit-back-2');
  const back3 = document.getElementById('fit-back-3');
  const back4 = document.getElementById('fit-back-4');

  const fitOptions = document.querySelectorAll('.fit-option-btn');
  const fitListBtns = document.querySelectorAll('.fit-list-btn');
  const stackChips = document.querySelectorAll('.stack-chip');

  const resultBadge = document.getElementById('result-badge');
  const resultTitle = document.getElementById('result-title');
  const resultBody = document.getElementById('result-body');

  const fitForm = document.getElementById('fit-booking-form');
  const fitSuccessMessage = document.getElementById('fit-success-message');

  function openFitModal() {
    if (!fitModal) return;
    // Close sketch modal if open
    closeSketchModal();
    fitModal.classList.add('open');
    fitModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    goToStep(1);
  }

  function closeFitModal() {
    if (!fitModal) return;
    fitModal.classList.remove('open');
    fitModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openFitBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openFitModal();
    });
  });

  if (closeFitModalBtn) {
    closeFitModalBtn.addEventListener('click', closeFitModal);
  }

  if (fitModal) {
    fitModal.addEventListener('click', (e) => {
      if (e.target === fitModal) closeFitModal();
    });
  }

  // Keyboard escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSketchModal();
      closeFitModal();
    }
  });

  function goToStep(num) {
    [step1, step2, step3, step4].forEach((s, idx) => {
      if (s) {
        if (idx + 1 === num) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      }
    });

    const percent = num * 25;
    if (fitProgressText) {
      fitProgressText.textContent = num === 4 ? 'YOUR RESULT' : `${percent}% COMPLETED`;
    }
    if (fitProgressFill) {
      fitProgressFill.style.width = `${percent}%`;
    }
  }

  // Step 1 option clicks
  fitOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('selected');
    });
  });

  if (continue1) {
    continue1.addEventListener('click', () => goToStep(2));
  }

  // Step 2 list clicks (single-select)
  fitListBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fitListBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  if (back2) back2.addEventListener('click', () => goToStep(1));
  if (continue2) continue2.addEventListener('click', () => goToStep(3));

  // Step 3 chips clicks (multi-select)
  stackChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
    });
  });

  if (back3) back3.addEventListener('click', () => goToStep(2));
  if (continue3) {
    continue3.addEventListener('click', () => {
      // Calculate assessment
      const selectedHours = document.querySelector('.fit-list-btn.selected')?.getAttribute('data-val');
      if (selectedHours === 'under-10') {
        resultBadge.textContent = 'PROBABLY NOT YET';
        resultBadge.className = 'result-badge-red';
        resultTitle.textContent = 'An agent may not pay back here.';
        resultBody.textContent = 'At this volume, or with this much judgment per case, the math is often thin. Book the free call anyway and we will tell you straight.';
      } else {
        resultBadge.textContent = 'HIGH ROI CANDIDATE';
        resultBadge.className = 'result-badge-red text-emerald';
        resultTitle.textContent = 'An agent could save 25+ hours weekly here.';
        resultBody.textContent = 'Your tool stack and volume represent an ideal candidate for deterministic guardrails. A production build typically pays back in under 45 days.';
      }
      goToStep(4);
    });
  }

  if (back4) back4.addEventListener('click', () => goToStep(3));

  // Form submission
  if (fitForm) {
    fitForm.addEventListener('submit', () => {
      fitForm.classList.add('hidden');
      if (fitSuccessMessage) {
        fitSuccessMessage.classList.remove('hidden');
      }
    });
  }

});
