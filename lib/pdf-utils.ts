import { jsPDF } from "jspdf";
import { formatDate } from "@/lib/utils/formatting";
import { parseResponse } from "@/lib/response-utils";
import { COLORS } from "@/lib/constants/themes";
import { PDF_CONFIG } from "@/lib/constants/config";

export async function generateResponsePDF(response: string, founder: string) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: PDF_CONFIG.format,
  });

  // Set up fonts and colors
  doc.setFont("times", "normal");
  doc.setTextColor(COLORS.primary.DEFAULT);

  // Add title to first page only
  doc.setFontSize(24);
  doc.text("Ask the Founding Fathers", 20, 20);
  
  // Add metadata
  doc.setFontSize(14);
  doc.text(`Response from ${founder}`, 20, 30);
  
  doc.setFontSize(12);
  doc.setTextColor("#666666");
  doc.text(formatDate(new Date()), 20, 40);

  // Add separator
  doc.setDrawColor(COLORS.primary.DEFAULT);
  doc.setLineWidth(0.5);
  doc.line(20, 45, 190, 45);

  // Process and add content
  const sections = parseResponse(response);
  let yPosition = 60;

  sections.forEach((section) => {
    // Add section header
    doc.setTextColor(COLORS.primary.DEFAULT);
    doc.setFontSize(14);
    doc.setFont("times", "bold");

    const sectionTitle = getSectionTitle(section.type);
    if (yPosition + 30 > doc.internal.pageSize.height) {
      doc.addPage();
      yPosition = 20;
    }
    doc.text(sectionTitle, 20, yPosition);
    yPosition += 10;

    // Add section content
    doc.setTextColor("#000000");
    doc.setFontSize(12);
    doc.setFont("times", "normal");

    const contentLines = doc.splitTextToSize(
      section.content,
      doc.internal.pageSize.width - 40
    );

    contentLines.forEach((line: string) => {
      if (yPosition + 7 > doc.internal.pageSize.height - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, 20, yPosition);
      yPosition += 7;
    });

    yPosition += 10;
  });

  // Add footer to all pages
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor("#666666");
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
  }

  // Save the PDF
  const filename = `${PDF_CONFIG.filename}-${founder.toLowerCase().replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
}

function getSectionTitle(type: string): string {
  switch (type) {
    case "context":
      return "Historical Context";
    case "recommendation":
      return "Recommendations";
    case "quote":
      return "Historical Reference";
    case "action":
      return "Action Steps";
    default:
      return "Response";
  }
}