import { supabase } from "@/integrations/supabase/client";

const ADMIN = "admin@stranz.in";

async function send(to: string, subject: string, html: string) {
  try {
    await supabase.functions.invoke("send-notification", {
      body: { to, subject, html },
    });
  } catch {
    // fire-and-forget
  }
}

export function notifyExpenseSubmitted(opts: { employeeName: string; amount: number; category: string; date: string }) {
  const subject = `[Stranz HR] New Expense Claim – ${opts.employeeName} ₹${opts.amount.toFixed(0)}`;
  const html = `<h2>New Expense Claim</h2><p><strong>${opts.employeeName}</strong> submitted a <strong>${opts.category}</strong> expense.</p><table><tr><td>Amount</td><td>₹${opts.amount.toFixed(2)}</td></tr><tr><td>Date</td><td>${opts.date}</td></tr><tr><td>Status</td><td>Pending Accounts review</td></tr></table><p>Please log in to <a href="https://stranz.in/portal">Stranz HR</a> to review.</p>`;
  send(ADMIN, subject, html);
}

export function notifyLeaveSubmitted(opts: { employeeName: string; leaveType: string; fromDate: string; toDate: string; totalDays: number; reason?: string | null }) {
  const subject = `[Stranz HR] New Leave Request – ${opts.employeeName} (${opts.totalDays} day${opts.totalDays !== 1 ? "s" : ""})`;
  const html = `<h2>New Leave Request</h2><p><strong>${opts.employeeName}</strong> has submitted a leave request.</p><table><tr><td>Leave Type</td><td>${opts.leaveType}</td></tr><tr><td>From</td><td>${opts.fromDate}</td></tr><tr><td>To</td><td>${opts.toDate}</td></tr><tr><td>Days</td><td>${opts.totalDays}</td></tr>${opts.reason ? `<tr><td>Reason</td><td>${opts.reason}</td></tr>` : ""}</table>`;
  send(ADMIN, subject, html);
}

export function notifyAdvanceSubmitted(opts: { employeeName: string; kind: string; principal: number; repaymentMonths: number; reason?: string | null }) {
  const subject = `[Stranz HR] New Salary ${opts.kind === "loan" ? "Loan" : "Advance"} Request – ${opts.employeeName} ₹${opts.principal.toFixed(0)}`;
  const html = `<h2>New Salary ${opts.kind === "loan" ? "Loan" : "Advance"} Request</h2><p><strong>${opts.employeeName}</strong> has submitted a request.</p><table><tr><td>Type</td><td>${opts.kind}</td></tr><tr><td>Amount</td><td>₹${opts.principal.toFixed(2)}</td></tr><tr><td>Repayment</td><td>${opts.repaymentMonths} month${opts.repaymentMonths !== 1 ? "s" : ""}</td></tr>${opts.reason ? `<tr><td>Reason</td><td>${opts.reason}</td></tr>` : ""}</table>`;
  send(ADMIN, subject, html);
}

export function notifyExpenseDecision(opts: { employeeName: string; amount: number; decision: string; step: "verified" | "forwarded" | "approved" | "rejected"; approverRole: string; notes?: string | null }) {
  const label = opts.step === "rejected" ? "Rejected" : opts.step === "approved" ? "Approved" : opts.step === "forwarded" ? "Forwarded to Owner" : "Verified";
  const subject = `[Stranz HR] Expense ${label} – ${opts.employeeName} ₹${opts.amount.toFixed(0)}`;
  const html = `<h2>Expense Claim ${label}</h2><table><tr><td>Employee</td><td>${opts.employeeName}</td></tr><tr><td>Amount</td><td>₹${opts.amount.toFixed(2)}</td></tr><tr><td>Decision</td><td>${label}</td></tr><tr><td>By Role</td><td>${opts.approverRole}</td></tr>${opts.notes ? `<tr><td>Notes</td><td>${opts.notes}</td></tr>` : ""}</table>`;
  send(ADMIN, subject, html);
}

export function notifyAdvanceDecision(opts: { employeeName: string; principal: number; status: "approved" | "rejected"; notes?: string | null }) {
  const label = opts.status === "approved" ? "Approved" : "Rejected";
  const subject = `[Stranz HR] Advance ${label} – ${opts.employeeName} ₹${opts.principal.toFixed(0)}`;
  const html = `<h2>Salary Advance ${label}</h2><table><tr><td>Employee</td><td>${opts.employeeName}</td></tr><tr><td>Amount</td><td>₹${opts.principal.toFixed(2)}</td></tr><tr><td>Decision</td><td>${label}</td></tr>${opts.notes ? `<tr><td>Notes</td><td>${opts.notes}</td></tr>` : ""}</table>`;
  send(ADMIN, subject, html);
}

export function notifyLeaveDecision(opts: { employeeName: string; leaveType: string; fromDate: string; toDate: string; totalDays: number; decision: "approved" | "rejected"; notes?: string | null }) {
  const label = opts.decision === "approved" ? "Approved" : "Rejected";
  const subject = `[Stranz HR] Leave ${label} – ${opts.employeeName} (${opts.totalDays} day${opts.totalDays !== 1 ? "s" : ""})`;
  const html = `<h2>Leave Request ${label}</h2><table><tr><td>Employee</td><td>${opts.employeeName}</td></tr><tr><td>Leave Type</td><td>${opts.leaveType}</td></tr><tr><td>Period</td><td>${opts.fromDate} → ${opts.toDate}</td></tr><tr><td>Days</td><td>${opts.totalDays}</td></tr><tr><td>Decision</td><td>${label}</td></tr>${opts.notes ? `<tr><td>Notes</td><td>${opts.notes}</td></tr>` : ""}</table>`;
  send(ADMIN, subject, html);
}
