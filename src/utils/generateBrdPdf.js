import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateBrdPdf = (project) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    let yPos = margin;

    // --- Header ---
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41); // Dark Gray
    doc.text("Business Requirements Document", margin, yPos);
    yPos += 10;

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(73, 80, 87);
    doc.text(`Project: ${project.title}`, margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Doc Ref: BRD-${project.id.toUpperCase()}-v1.0  |  Date: 7 January 2026`, margin, yPos);
    yPos += 12;

    // Helper functions
    const formatList = (items) => items ? items.map(i => `• ${i}`).join("\n") : "N/A";
    const formatKeyValList = (items, keyProp, valProp) => items ? items.map(i => `• ${i[keyProp]}: ${i[valProp]}`).join("\n") : "N/A";
    const formatProblemMap = (items) => items ? items.map(i => `• Issue: ${i.problem}\n  Solution: ${i.solution}`).join("\n\n") : "N/A";

    // Prepare table data
    const bodyData = [
        ["1. Executive Summary", project.description || "N/A"],
        ["2. Business Objectives", project.vision || "N/A"],
        ["3. Problem Statement", project.problem || project.background || "N/A"],
        ["4. Proposed Solution", project.solution || "N/A"],
        ["5. Target Audience", project.personas ? project.personas.map(p => `• ${p.role}: ${p.goal}`).join("\n") : "N/A"],
        ["6. Business Requirements", project.coreFeatures ? formatKeyValList(project.coreFeatures, 'name', 'desc') : "N/A"],
        ["7. Use Cases / Scenarios", project.problemMap ? formatProblemMap(project.problemMap) : "N/A"],
        ["8. Business Value & ROI", project.roi ? (typeof project.roi === 'string' ? project.roi : JSON.stringify(project.roi)) : (project.stats ? project.stats.map(s => `• ${s.label}: ${s.value}`).join("\n") : "N/A")],
        ["9. Strategic Alignment", project.strategicAlignment || (project.businessModel ? formatKeyValList(project.businessModel, 'type', 'value') : "N/A")],
        ["10. Timeline & Phases", project.timeline ? project.timeline.map(t => `• ${t.period}: ${t.title}`).join("\n") : "N/A"]
    ];

    // Main Table
    autoTable(doc, {
        startY: yPos,
        head: [['Section', 'Description']],
        body: bodyData,
        theme: 'grid',
        headStyles: {
            fillColor: [33, 37, 41], // Dark header
            textColor: [255, 255, 255],
            fontSize: 12,
            fontStyle: 'bold',
            halign: 'left'
        },
        columnStyles: {
            0: {
                cellWidth: 50,
                fillColor: [248, 249, 250], // Very light gray
                fontStyle: 'bold',
                textColor: [33, 37, 41]
            },
            1: {
                cellWidth: 'auto',
                fontSize: 10,
                textColor: [73, 80, 87]
            }
        },
        styles: {
            overflow: 'linebreak',
            cellPadding: 5,
            valign: 'middle',
            lineColor: [222, 226, 230],
            lineWidth: 0.1
        },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        
        // Footer line
        doc.setDrawColor(200);
        doc.line(margin, doc.internal.pageSize.height - 15, pageWidth - margin, doc.internal.pageSize.height - 15);
        
        doc.text(`Business Requirements Document - ${project.title}`, margin, doc.internal.pageSize.height - 10);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.height - 10, { align: 'right' });
    }

    doc.save(`${project.id}_BRD_Report.pdf`);
};
