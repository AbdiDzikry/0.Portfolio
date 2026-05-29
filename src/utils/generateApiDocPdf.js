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
    doc.setTextColor(33, 37, 41);
    doc.text("API Reference Documentation", margin, yPos);
    yPos += 10;

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(73, 80, 87);
    doc.text(`Service: ${project.title} Application`, margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Doc Ref: API-${project.id.toUpperCase()}-v1.0  |  Date: 7 January 2026`, margin, yPos);
    yPos += 12;

    // --- Overview ---
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    doc.text("1. Overview", margin, yPos);
    yPos += 6;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(73, 80, 87);
    
    let overviewText = `Gunakan API endpoint ini untuk berinteraksi dengan sistem ${project.title}. Semua request memerlukan autentikasi menggunakan Bearer Token (JWT) yang dilewatkan pada header Authorization.`;
    if (project.id === 'doors') {
        overviewText = "Aplikasi Doors secara garis besar adalah aplikasi Monolith berbasis Laravel (menggunakan Blade/Livewire untuk view), sehingga sebagian besar interaksi data menggunakan form submission standar. Namun, dokumen ini merangkum REST API internal dan eksternal kunci yang digunakan dalam ekosistem (contoh: integrasi Tablet dan Sinkronisasi Karyawan).";
    }

    const splitOverview = doc.splitTextToSize(overviewText, pageWidth - (margin * 2));
    doc.text(splitOverview, margin, yPos);
    yPos += splitOverview.length * 5 + 6;

    const renderEndpoint = (title, method, url, headers, paramsTitle, paramsData, responseCode, responseJson) => {
        // Title
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(33, 37, 41);
        doc.text(title, margin, yPos);
        yPos += 6;

        // Endpoint Box
        doc.setDrawColor(220);
        doc.setFillColor(248, 249, 250);
        doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 22, 2, 2, 'FD');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        // Method Color
        if (method === 'GET') doc.setTextColor(40, 167, 69); // Green
        else if (method === 'POST') doc.setTextColor(0, 123, 255); // Blue
        else doc.setTextColor(33, 37, 41);
        doc.text(method, margin + 5, yPos + 8);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(220, 53, 69); // Red-ish for url
        doc.text(url, margin + 25, yPos + 8);
        
        doc.setTextColor(73, 80, 87);
        doc.setFontSize(9);
        doc.text(`Headers: ${headers}`, margin + 5, yPos + 16);
        yPos += 28;

        // Params Table
        if (paramsData && paramsData.length > 0) {
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(33, 37, 41);
            doc.text(paramsTitle, margin, yPos);
            yPos += 2;

            autoTable(doc, {
                startY: yPos,
                head: [['Nama Parameter', 'Tipe', 'Wajib', 'Deskripsi']],
                body: paramsData,
                theme: 'grid',
                headStyles: { fillColor: [108, 117, 125], textColor: [255, 255, 255], fontSize: 9 },
                bodyStyles: { fontSize: 9, textColor: [73, 80, 87] },
                styles: { cellPadding: 3, lineColor: [222, 226, 230], lineWidth: 0.1 },
            });
            yPos = doc.lastAutoTable.finalY + 8;
        }

        // Response Box
        // Check if yPos is near bottom, add page if needed
        if (yPos > doc.internal.pageSize.height - 60) {
            doc.addPage();
            yPos = margin;
        }

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(33, 37, 41);
        doc.text(`Response Example (${responseCode})`, margin, yPos);
        yPos += 4;

        const lines = responseJson.split('\\n');
        const boxHeight = (lines.length * 4.5) + 10;
        
        doc.setDrawColor(220);
        doc.setFillColor(33, 37, 41);
        doc.roundedRect(margin, yPos, pageWidth - (margin * 2), boxHeight, 2, 2, 'FD');
        
        doc.setFontSize(9);
        doc.setFont("courier", "normal");
        doc.setTextColor(166, 226, 46);
        doc.text(responseJson, margin + 5, yPos + 6);
        yPos += boxHeight + 12;
    };

    if (project.id === 'doors') {
        renderEndpoint(
            "2. Employee Sync API (External)",
            "GET",
            "https://msa-be.dharmagroup.co.id/api/data/company",
            "x-api-key: <stored_in_env>",
            "Query Parameters",
            [
                ['company', 'String', 'Ya', 'Kode perusahaan (contoh: dpm) untuk filter data.']
            ],
            "200 OK",
            `[
  {
    "EMPLOYEE_NO": "12345",
    "EMPLOYEE_NAME": "Budi Santoso",
    "DIVISION": "Information Technology",
    "DEPARTMENT": "Software Development",
    "ORGANIZATION_UNIT": "IT Programmer",
    "JOB_FAMILY": "Staff"
  }
]`
        );

        // Add page for the next endpoints if needed
        if (yPos > doc.internal.pageSize.height - 100) {
            doc.addPage();
            yPos = margin;
        }

        renderEndpoint(
            "3. Tablet Battery Alert (Internal)",
            "POST",
            "/tablet/battery-alert",
            "Content-Type: application/json",
            "Request Body (JSON)",
            [
                ['room_id', 'Integer', 'Ya', 'ID Ruangan tempat tablet berada.'],
                ['level', 'Integer', 'Ya', 'Sisa persentase baterai tablet.']
            ],
            "200 OK",
            `{
  "status": "ok",
  "message": "Alert recorded."
}`
        );
        
        if (yPos > doc.internal.pageSize.height - 100) {
            doc.addPage();
            yPos = margin;
        }

        renderEndpoint(
            "4. Tablet Check Updates (Internal)",
            "GET",
            "/tablet/check-updates/{id_ruangan}",
            "Accept: application/json",
            "Path Parameters",
            [
                ['id_ruangan', 'Integer', 'Ya', 'ID Unik dari ruangan (Room ID).']
            ],
            "200 OK",
            `{
  "hash": "a1b2c3d4e5f6g7h8",
  "timestamp": 1700000000
}`
        );

    } else {
        // Fallback for other projects
        renderEndpoint(
            "2. Endpoint Example",
            "POST",
            `/api/v1/${project.id.replace(/-/g, '')}/process`,
            "Content-Type: application/json",
            "Request Body",
            [
                ['userId', 'String', 'Ya', 'ID Unik dari pengguna yang melakukan request.'],
                ['actionType', 'String', 'Ya', 'Jenis aksi yang ingin dilakukan.']
            ],
            "200 OK",
            `{\n  "status": "success",\n  "data": {\n    "processedAt": "2026-01-07T10:00:00Z"\n  }\n}`
        );
    }

    // Footer for all pages
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
