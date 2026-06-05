import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface PayslipData {
  employeeName: string;
  employeeId?: string;
  month: number;
  year: number;
  baseSalary: number;
  incentive: number;
  reimbursements: number;
  deductions: number;
  advanceDeduction: number;
  unpaidAbsenceDays: number;
  netPay: number;
  companyName?: string;
}

const fmtINR = (n: number) =>
  `INR ${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const monthName = (m: number) =>
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1] ?? String(m);

export function generatePayslipPdf(data: PayslipData): Blob {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(data.companyName ?? "Stranz Logistics — Payslip", pageW / 2, 18, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Pay Period: ${monthName(data.month)} ${data.year}`, pageW / 2, 26, { align: "center" });

  doc.setFontSize(10);
  doc.text(`Employee: ${data.employeeName}`, 14, 38);
  if (data.employeeId) doc.text(`ID: ${data.employeeId}`, 14, 44);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-IN")}`, pageW - 14, 38, { align: "right" });

  const earnings: [string, string][] = [
    ["Base Salary", fmtINR(data.baseSalary)],
    ["Incentive", fmtINR(data.incentive)],
    ["Reimbursements", fmtINR(data.reimbursements)],
  ];
  const grossEarn = data.baseSalary + data.incentive + data.reimbursements;

  const deductions: [string, string][] = [
    ["Other Deductions", fmtINR(data.deductions)],
    ["Advance Deduction", fmtINR(data.advanceDeduction)],
    ["Unpaid Absence", `${data.unpaidAbsenceDays} day(s)`],
  ];
  const totalDed = data.deductions + data.advanceDeduction;

  autoTable(doc, {
    startY: 52,
    head: [["Earnings", "Amount"]],
    body: [...earnings, ["Gross Earnings", fmtINR(grossEarn)]],
    theme: "striped",
    headStyles: { fillColor: [30, 41, 59] },
    margin: { left: 14, right: 14 },
  });

  autoTable(doc, {
    head: [["Deductions", "Amount"]],
    body: [...deductions, ["Total Deductions", fmtINR(totalDed)]],
    theme: "striped",
    headStyles: { fillColor: [30, 41, 59] },
    margin: { left: 14, right: 14 },
  });

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Net Pay: ${fmtINR(data.netPay)}`, pageW - 14, finalY, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("This is a system-generated payslip.", pageW / 2, 285, { align: "center" });

  return doc.output("blob");
}

export function downloadPayslip(data: PayslipData) {
  const blob = generatePayslipPdf(data);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `payslip-${data.year}-${String(data.month).padStart(2, "0")}-${data.employeeName.replace(/\s+/g, "_")}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
