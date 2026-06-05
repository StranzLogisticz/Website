import { supabase } from "@/integrations/supabase/client";

const ADMIN = "admin@stranz.in";
const BASE_URL = "https://stranz.in";

const emailStyle = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #1a1a1a;
  max-width: 520px;
  margin: 0 auto;
  padding: 24px;
`;

const btnStyle = `
  display: inline-block;
  background: #1d4ed8;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  margin-top: 16px;
`;

const tableStyle = `border-collapse: collapse; width: 100%; margin: 12px 0;`;
const tdStyle = `padding: 6px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;`;
const labelStyle = `color: #6b7280; width: 40%;`;

async function send(to: string, subject: string, html: string) {
  try {
    await supabase.functions.invoke("send-notification", {
      body: { to, subject, html },
    });
  } catch {
    // fire-and-forget
  }
}

function wrap(content: string): string {
  return `<div style="${emailStyle}">${content}</div>`;
}

export function notifyExpenseSubmitted(opts: { employeeName: string; amount: number; category: string; date: string }) {
  const subject = `[Stranz HR] New Expense Claim – ${opts.employeeName} ₹${opts.amount.toFixed(0)}`;
  const html = wrap(`
    <h2 style="margin:0 0 8px">New Expense Claim</h2>
    <p style="color:#6b7280;margin:0 0 16px"><strong style="color:#1a1a1a">${opts.employeeName}</strong> submitted an expense claim.</p>
    <table style="${tableStyle}">
      <tr><td style="${tdStyle}${labelStyle}">Amount</td><td style="${tdStyle}"><strong>₹${opts.amount.toFixed(2)}</strong></td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Category</td><td style="${tdStyle}">${opts.category}</td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Date</td><td style="${tdStyle}">${opts.date}</td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Status</td><td style="${tdStyle}">Pending Accounts review</td></tr>
    </table>
    <a href="${BASE_URL}/portal/admin/approvals" style="${btnStyle}">Review Expense →</a>
  `);
  send(ADMIN, subject, html);
}

export function notifyLeaveSubmitted(opts: { employeeName: string; leaveType: string; fromDate: string; toDate: string; totalDays: number; reason?: string | null }) {
  const subject = `[Stranz HR] New Leave Request – ${opts.employeeName} (${opts.totalDays} day${opts.totalDays !== 1 ? "s" : ""})`;
  const html = wrap(`
    <h2 style="margin:0 0 8px">New Leave Request</h2>
    <p style="color:#6b7280;margin:0 0 16px"><strong style="color:#1a1a1a">${opts.employeeName}</strong> applied for leave.</p>
    <table style="${tableStyle}">
      <tr><td style="${tdStyle}${labelStyle}">Leave Type</td><td style="${tdStyle}">${opts.leaveType.replace(/_/g, " ")}</td></tr>
      <tr><td style="${tdStyle}${labelStyle}">From</td><td style="${tdStyle}">${opts.fromDate}</td></tr>
      <tr><td style="${tdStyle}${labelStyle}">To</td><td style="${tdStyle}">${opts.toDate}</td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Days</td><td style="${tdStyle}"><strong>${opts.totalDays}</strong></td></tr>
      ${opts.reason ? `<tr><td style="${tdStyle}${labelStyle}">Reason</td><td style="${tdStyle}">${opts.reason}</td></tr>` : ""}
    </table>
    <a href="${BASE_URL}/portal/admin/leave-requests" style="${btnStyle}">Review Leave Request →</a>
  `);
  send(ADMIN, subject, html);
}

export function notifyAdvanceSubmitted(opts: { employeeName: string; kind: string; principal: number; repaymentMonths: number; reason?: string | null }) {
  const subject = `[Stranz HR] New ${opts.kind === "loan" ? "Loan" : "Advance"} Request – ${opts.employeeName} ₹${opts.principal.toFixed(0)}`;
  const html = wrap(`
    <h2 style="margin:0 0 8px">New Salary ${opts.kind === "loan" ? "Loan" : "Advance"} Request</h2>
    <p style="color:#6b7280;margin:0 0 16px"><strong style="color:#1a1a1a">${opts.employeeName}</strong> submitted a request.</p>
    <table style="${tableStyle}">
      <tr><td style="${tdStyle}${labelStyle}">Type</td><td style="${tdStyle}">${opts.kind}</td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Amount</td><td style="${tdStyle}"><strong>₹${opts.principal.toFixed(2)}</strong></td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Repayment</td><td style="${tdStyle}">${opts.repaymentMonths} month${opts.repaymentMonths !== 1 ? "s" : ""}</td></tr>
      ${opts.reason ? `<tr><td style="${tdStyle}${labelStyle}">Reason</td><td style="${tdStyle}">${opts.reason}</td></tr>` : ""}
    </table>
    <a href="${BASE_URL}/portal/admin/advances" style="${btnStyle}">Review Advance Request →</a>
  `);
  send(ADMIN, subject, html);
}

export function notifyExpenseDecision(opts: { employeeName: string; amount: number; decision: string; step: "verified" | "forwarded" | "approved" | "rejected"; approverRole: string; notes?: string | null }) {
  const label = opts.step === "rejected" ? "Rejected" : opts.step === "approved" ? "Approved" : opts.step === "forwarded" ? "Forwarded to Owner" : "Verified";
  const subject = `[Stranz HR] Expense ${label} – ${opts.employeeName} ₹${opts.amount.toFixed(0)}`;
  const html = wrap(`
    <h2 style="margin:0 0 8px">Expense Claim ${label}</h2>
    <table style="${tableStyle}">
      <tr><td style="${tdStyle}${labelStyle}">Employee</td><td style="${tdStyle}">${opts.employeeName}</td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Amount</td><td style="${tdStyle}"><strong>₹${opts.amount.toFixed(2)}</strong></td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Decision</td><td style="${tdStyle}"><strong>${label}</strong></td></tr>
      <tr><td style="${tdStyle}${labelStyle}">By</td><td style="${tdStyle}">${opts.approverRole}</td></tr>
      ${opts.notes ? `<tr><td style="${tdStyle}${labelStyle}">Notes</td><td style="${tdStyle}">${opts.notes}</td></tr>` : ""}
    </table>
    <a href="${BASE_URL}/portal/admin/approvals" style="${btnStyle}">View Approvals →</a>
  `);
  send(ADMIN, subject, html);
}

export function notifyAdvanceDecision(opts: { employeeName: string; principal: number; status: "approved" | "rejected"; notes?: string | null }) {
  const label = opts.status === "approved" ? "Approved" : "Rejected";
  const subject = `[Stranz HR] Advance ${label} – ${opts.employeeName} ₹${opts.principal.toFixed(0)}`;
  const html = wrap(`
    <h2 style="margin:0 0 8px">Salary Advance ${label}</h2>
    <table style="${tableStyle}">
      <tr><td style="${tdStyle}${labelStyle}">Employee</td><td style="${tdStyle}">${opts.employeeName}</td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Amount</td><td style="${tdStyle}"><strong>₹${opts.principal.toFixed(2)}</strong></td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Decision</td><td style="${tdStyle}"><strong>${label}</strong></td></tr>
      ${opts.notes ? `<tr><td style="${tdStyle}${labelStyle}">Notes</td><td style="${tdStyle}">${opts.notes}</td></tr>` : ""}
    </table>
    <a href="${BASE_URL}/portal/admin/advances" style="${btnStyle}">View Advances →</a>
  `);
  send(ADMIN, subject, html);
}

export function notifyLeaveDecision(opts: { employeeName: string; leaveType: string; fromDate: string; toDate: string; totalDays: number; decision: "approved" | "rejected"; notes?: string | null }) {
  const label = opts.decision === "approved" ? "Approved" : "Rejected";
  const subject = `[Stranz HR] Leave ${label} – ${opts.employeeName} (${opts.totalDays} day${opts.totalDays !== 1 ? "s" : ""})`;
  const html = wrap(`
    <h2 style="margin:0 0 8px">Leave Request ${label}</h2>
    <table style="${tableStyle}">
      <tr><td style="${tdStyle}${labelStyle}">Employee</td><td style="${tdStyle}">${opts.employeeName}</td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Leave Type</td><td style="${tdStyle}">${opts.leaveType.replace(/_/g, " ")}</td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Period</td><td style="${tdStyle}">${opts.fromDate} → ${opts.toDate}</td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Days</td><td style="${tdStyle}"><strong>${opts.totalDays}</strong></td></tr>
      <tr><td style="${tdStyle}${labelStyle}">Decision</td><td style="${tdStyle}"><strong>${label}</strong></td></tr>
      ${opts.notes ? `<tr><td style="${tdStyle}${labelStyle}">Notes</td><td style="${tdStyle}">${opts.notes}</td></tr>` : ""}
    </table>
    <a href="${BASE_URL}/portal/admin/leave-requests" style="${btnStyle}">View Leave Requests →</a>
  `);
  send(ADMIN, subject, html);
}
