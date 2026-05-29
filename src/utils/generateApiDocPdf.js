import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateApiDocPdf = (project) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    let yPos = margin;

    // --- Header ---
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41); // Dark Gray
    doc.text("API Reference Documentation", margin, yPos);
    yPos += 10;

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(73, 80, 87);
    doc.text(`Service: ${project.title} API`, margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Base URL: https://api.dharmap.com/v1/${project.id.replace(/-/g, '')}`, margin, yPos);
    yPos += 6;

    doc.text(`Doc Ref: API-${project.id.toUpperCase()}-v1.0  |  Date: 7 January 2026`, margin, yPos);
    yPos += 12;

    // --- Overview ---
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    doc.text("1. Overview & Authentication", margin, yPos);
    yPos += 6;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(73, 80, 87);
    const overviewText = `Gunakan API endpoint ini untuk berinteraksi dengan sistem ${project.title}. Semua request memerlukan autentikasi menggunakan Bearer Token (JWT) yang dilewatkan pada header Authorization.`;
    const splitOverview = doc.splitTextToSize(overviewText, pageWidth - (margin * 2));
    doc.text(splitOverview, margin, yPos);
    yPos += splitOverview.length * 5 + 6;

    // --- Endpoint 1 ---
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    doc.text("2. Spesifikasi Endpoint", margin, yPos);
    yPos += 6;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(73, 80, 87);
    
    // Endpoint Box
    doc.setDrawColor(220);
    doc.setFillColor(248, 249, 250);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 22, 2, 2, 'FD');
    
    doc.setFont("helvetica", "bold");
    doc.text("POST", margin + 5, yPos + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(220, 53, 69); // Red-ish for endpoint path
    doc.text(`/api/v1/${project.id.replace(/-/g, '')}/process`, margin + 20, yPos + 8);
    
    doc.setTextColor(73, 80, 87);
    doc.setFontSize(9);
    doc.text("Headers: Content-Type: application/json, Authorization: Bearer <token>", margin + 5, yPos + 16);
    yPos += 28;

    // --- Parameters Table ---
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    doc.text("3. Parameter Request (Body)", margin, yPos);
    yPos += 2;

    autoTable(doc, {
        startY: yPos,
        head: [['Nama Parameter', 'Tipe', 'Wajib', 'Deskripsi']],
        body: [
            ['userId', 'String', 'Ya', 'ID Unik dari pengguna yang melakukan request.'],
            ['actionType', 'String', 'Ya', 'Jenis aksi yang ingin dilakukan pada sistem.'],
            ['payloadData', 'Object', 'Tidak', 'Data tambahan (opsional) sesuai dengan kebutuhan fitur.'],
            ['timestamp', 'Number', 'Ya', 'Waktu eksekusi dalam format Unix epoch.']
        ],
        theme: 'grid',
        headStyles: { fillColor: [108, 117, 125], textColor: [255, 255, 255], fontSize: 9 },
        bodyStyles: { fontSize: 9, textColor: [73, 80, 87] },
        styles: { cellPadding: 3, lineColor: [222, 226, 230], lineWidth: 0.1 },
    });
    
    yPos = doc.lastAutoTable.finalY + 12;

    // --- Response Example ---
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    doc.text("4. Contoh Respons (200 OK)", margin, yPos);
    yPos += 6;

    const codeSnippet = `{
  "status": "success",
  "message": "Data berhasil diproses.",
  "data": {
    "transactionId": "TRX-9823749823",
    "processedAt": "2026-01-07T10:00:00Z",
    "status": "COMPLETED"
  }
}`;

    // Code block background
    doc.setDrawColor(220);
    doc.setFillColor(33, 37, 41); // Dark theme for code
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 45, 2, 2, 'FD');
    
    doc.setFontSize(9);
    doc.setFont("courier", "normal");
    doc.setTextColor(166, 226, 46); // Green-ish text for code
    doc.text(codeSnippet, margin + 5, yPos + 6);

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(150);
        
        doc.setDrawColor(200);
        doc.line(margin, doc.internal.pageSize.height - 15, pageWidth - margin, doc.internal.pageSize.height - 15);
        
        doc.text(`API Documentation - ${project.title}`, margin, doc.internal.pageSize.height - 10);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.height - 10, { align: 'right' });
    }

    doc.save(`${project.id}_API_Documentation.pdf`);
};
