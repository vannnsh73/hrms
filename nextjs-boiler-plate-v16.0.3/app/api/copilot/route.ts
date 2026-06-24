import { NextRequest, NextResponse } from "next/server";

// Simple route to handle AI Copilot prompts
export async function POST(req: NextRequest) {
  try {
    const { prompt, context } = await req.json();
    
    // Gathers { currentView, userRole, isOnboarding }
    const currentView = context?.currentView || "Home";
    const userRole = context?.userRole || "Employee";
    const isOnboarding = context?.isOnboarding || false;

    // Check for Anthropic API key (optional)
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey) {
      // In a real production system, we would make a POST call to Anthropic Claude API:
      /*
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 1024,
          messages: [{ role: "user", content: `System: You are PropVivo HR Copilot. Active view is ${currentView}, user role is ${userRole}, onboarding state is ${isOnboarding}. Respond to: ${prompt}` }]
        })
      });
      const data = await response.json();
      return NextResponse.json({ response: data.content[0].text });
      */
    }

    // High quality context-specific mock responses if API key is not configured
    let mockResponse = `I am your PropVivo HR Copilot. I see you are looking at the **${currentView}** screen as a **${userRole}**. `;

    const queryLower = prompt.toLowerCase();
    
    if (isOnboarding) {
      mockResponse += `Since you are currently in the onboarding stage, remember to complete your pre-joining checklist (signing contracts, uploading national identity cards) under the "Pre-Joining" tasks. If you need travel accommodation or visa transfer help, Arjun Mehta and your buddy Alex Johnson are ready to support you. Let me know if you want me to explain any task!`;
    } else if (queryLower.includes("attendance") || queryLower.includes("clock")) {
      mockResponse += `To track attendance, use the "Time Tracker" card. Click "Clock In via Selfie" to log your shift. We will capture your location (Jaipur HQ) and check your gateway IP. You can also view your weekly shift logs directly on that tab. Let me know if you need to submit a manual clock exception.`;
    } else if (queryLower.includes("leave") || queryLower.includes("holiday") || queryLower.includes("vacation")) {
      mockResponse += `Under Leave Management, you can check your live balances for casual, sick, personal, and compensatory leaves. You can submit a leave request form, and Riya Patel will receive an approval request instantly. You can check the "My Requests History" card to monitor its approval status.`;
    } else if (queryLower.includes("pay") || queryLower.includes("salary") || queryLower.includes("slip") || queryLower.includes("pf")) {
      mockResponse += `Your payslips are detailed itemizations of your earnings (Basic Pay ₹45,000, HRA ₹18,000, Special Allowance) and deductions (PF ₹5,400, ESI ₹1,125, TDS). You can view the May 2026 payslip and click "PDF" to download it. If you need US tax W-4 forms or India Form 16, they are located under the compliance portal link.`;
    } else if (queryLower.includes("expense") || queryLower.includes("reimburse") || queryLower.includes("mileage")) {
      mockResponse += `For expense claims, submit a receipt, date, and description. For travel claims, check "Is this a mileage distance claim?" to use the mileage calculator (charged at ₹15/km). If a claim exceeds soft policy bounds (like food > ₹1000), our system will add a warning notice for manager approval.`;
    } else if (queryLower.includes("goal") || queryLower.includes("okr") || queryLower.includes("target")) {
      mockResponse += `Goals and Key Results (OKRs) are grouped under your individual objectives. You can slide the progress bar on your KRs (like delivering NextJS modules) and click "Save" to dynamically update your objective completion scores. Active goal appraisals can be viewed in the Performance tab.`;
    } else if (queryLower.includes("contribut") || queryLower.includes("bounty") || queryLower.includes("point")) {
      mockResponse += `PropVivo runs a gamified contributions system. You can browse active projects under "Claim Projects" to earn contribution points. You can also propose your own work under "Propose Work" to earn reward points. Check out the leaderboard tab to see who is leading!`;
    } else if (queryLower.includes("hello") || queryLower.includes("hi") || queryLower.includes("hey")) {
      mockResponse += `Hello! How can I assist you with your PropVivo HR requests today? I can guide you through leaves, attendance, payroll components, document uploads, or OKRs.`;
    } else {
      mockResponse += `I'm happy to help you with your question about "${prompt}". As your AI assistant, I can check statutory rules, look up your leave balances, calculate travel mileage, check candidate pipelines, or display training modules. How can I help you proceed?`;
    }

    return NextResponse.json({ response: mockResponse });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
