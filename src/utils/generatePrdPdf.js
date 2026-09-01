import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePrdPdf = (project) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    let yPos = margin;

    // --- Header ---
    const isRiskManagement = project.category?.toLowerCase().includes('risk') || project.category?.toLowerCase().includes('audit');
    const docTitle = isRiskManagement ? "Fraud Control & Risk Report" : "Product Requirements Document";
    const headTitle = isRiskManagement ? "Audit/Analysis Area" : "Product Requirements";

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(docTitle, margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.setFont("helvetica", "normal");
    doc.text(`Internal Reference: ${project.id.toUpperCase()}-V1.0  |  Generated: 7 January 2026`, margin, yPos);
    yPos += 10;

    // Prepare table data
    // Format: [[Label, Content]]

    // Helper to format lists
    const formatList = (items) => items.map(i => `• ${i}`).join("\n");
    const formatKeyValList = (items, keyProp, valProp) => items.map(i => `• ${i[keyProp]}: ${i[valProp]}`).join("\n");
    const formatProblemMap = (items) => items.map(i => `• ${i.problem} (Scenario: ${i.context}) -> ${i.solution}`).join("\n");

    // Helper for tools
    const formatTools = () => {
        let text = "";
        if (project.designTools) text += `Tools: ${project.designTools.join(", ")}\n`;
        if (project.researchMethods) text += `Research: ${project.researchMethods.join(", ")}`;
        return text.trim() || "N/A";
    };

    const bodyData = [
        ["Product Name", project.title],
        ["Vision", project.vision || "N/A"],
        ["Description", project.description],
        ["Timing", project.timeline ? `Target Phase 1: ${project.timeline[0]?.period} - ${project.timeline[project.timeline.length - 1]?.period}` : "TBD"],
        ["Status", project.status || "DRAFT"],
        ["Team", project.team ? (Array.isArray(project.team) ? project.team.map(m => `• ${m.name}${m.role ? ` (${m.role})` : ''}`).join("\n") : project.team) : "Sulthan Abdi Dzikry"],
        ["Background", project.background || project.problem],
        ["Strategic Alignment", project.strategicAlignment || (project.businessModel ? formatKeyValList(project.businessModel, 'type', 'value') : "N/A")],
        ["Metrics", project.stats ? project.stats.map(s => `• ${s.label}: ${s.value}`).join("\n") : "N/A"],
        ["Who it benefits", project.benefits || (project.personas ? project.personas.map(p => `• ${p.role}: ${p.goal}`).join("\n") : "N/A")],
        ["Use Cases", project.problemMap ? formatProblemMap(project.problemMap) : "N/A"],
        ["Assumptions", project.assumptions || "N/A"],
        ["Investment Required", project.investmentRequired || "N/A"],
        ["Product Architecture", project.productArchitecture || (project.tags ? project.tags.join(", ") : "N/A")],
        ["Core Features", project.coreFeatures ? formatKeyValList(project.coreFeatures, 'name', 'desc') : (project.solution || "N/A")],
        ["Design System & DNA", project.designSystem || "N/A"],
        ["Tools & Methods", formatTools()],
        ["UX Overview", project.uxOverview || "See Design Gallery."]
    ];

    // Main Table
    autoTable(doc, {
        startY: yPos,
        head: [[headTitle, 'Details']],
        body: bodyData,
        theme: 'grid',
        headStyles: {
            fillColor: [41, 128, 185], // Header Color from Template (Blueish)
            fontSize: 12,
            fontStyle: 'bold',
            halign: 'left'
        },
        columnStyles: {
            0: {
                cellWidth: 45,
                fillColor: [245, 245, 245], // Light gray for labels
                fontStyle: 'bold',
                textColor: 50
            },
            1: {
                cellWidth: 'auto',
                fontSize: 10
            }
        },
        styles: {
            overflow: 'linebreak',
            cellPadding: 4,
            valign: 'middle'
        },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.height - 10, { align: 'right' });
    }

    doc.save(`${project.id}_${isRiskManagement ? 'Analysis_Report' : 'PRD_Table'}.pdf`);
};
