import { jsPDF } from 'jspdf';

// Kaizen visual LANDSCAPE dashboard (multi-slide).
// Uses real PNG icons served from /kaizen-icons, embedded via dataURL.
const GREEN = '#10B981';
const GREEN_D = '#065F46';
const GREEN_L = '#D1FAE5';
const RED = '#EF4444';
const RED_L = '#FEF2F2';
const DARK = '#18181b';
const GREY = '#71717a';

const W = 297;
const H = 210;
const M = 14;
const foot = 8;

export const generateKaizenPdf = async (project, icons = {}) => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const slides = estimateSlides(project);
    let n = 1;

    const icon = (name) => icons[name];

    const putIcon = (name, x, y, w, h) => {
        const src = icon(name);
        if (src) doc.addImage(src, 'PNG', x, y, w, h);
    };

    const header = (title, kicker) => {
        doc.setFillColor(...color(GREEN_D));
        doc.rect(0, 0, W, 13, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.text(title, M, 9.2);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        putIcon('kaizen', W - M - 6, 3.5, 6, 6);
        doc.text(`${n} / ${slides}`, W - M - 10, 9.2, { align: 'right' });
        if (kicker) {
            doc.setFontSize(9);
            doc.setTextColor(...color(GREEN_L));
            doc.text(kicker, M + 80, 9.2);
        }
        doc.setLineDashPattern([2, 1], 0);
        doc.setDrawColor(...color(GREEN));
        doc.setLineWidth(0.8);
        doc.line(0, 13.6, W, 13.6);
        doc.setLineDashPattern([], 0);
    };

    const footer = (txt) => {
        doc.setPage(doc.internal.getNumberOfPages());
        doc.setTextColor(...color(GREY));
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.text(`Kaizen · ${project.title} · ${txt}`, M, H - foot);
        doc.setFillColor(...color(GREEN));
        doc.rect(0, H - 2, W, 2, 'F');
    };

    const card = (x, y, w, h, fill, stroke = null, sw = 0.5) => {
        doc.setFillColor(...color(fill));
        if (stroke) doc.setDrawColor(...color(stroke)); else doc.setDrawColor(220, 220, 228);
        doc.setLineWidth(sw);
        doc.roundedRect(x, y, w, h, 3, 3, 'FD');
    };

    const label = (x, y, text, c = DARK, size = 8, bold = true, caps = true) => {
        doc.setFont('helvetica', bold ? 'bold' : 'normal');
        doc.setFontSize(size);
        doc.setTextColor(...color(c));
        doc.text(caps ? String(text).toUpperCase() : String(text), x, y);
    };
    /* ══════════ COVER ══════════ */
    doc.setFillColor(...color(GREEN_D));
    doc.rect(0, 0, W, H, 'F');
    // faint grid
    doc.setDrawColor(...color(GREEN_L));
    doc.setLineWidth(0.15);
    for (let gx = 0; gx <= W; gx += 15) doc.line(gx, 0, gx, H);
    for (let gy = 0; gy <= H; gy += 15) doc.line(0, gy, W, gy);

    putIcon('kaizen', W / 2 - 20, 20, 40, 40);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...color(GREEN_L));
    doc.text('KA I ZEN  ·  改 善  ·  IMPROVEMENT REPORT', W / 2, 70, { align: 'center' });
    doc.setFontSize(34);
    doc.setTextColor(255, 255, 255);
    doc.text(String(project.title).toUpperCase(), W / 2, 86, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(...color(GREEN_L));
    if (project.tagline) doc.text(project.tagline, W / 2, 96, { align: 'center' });

    // description card
    card(M, 104, W - M * 2, 30, '#ffffff', GREEN, 0.7);
    label(M + 7, 112, 'ONE MINUTE · ONE SLIDE', GREEN_D);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...color(DARK));
    doc.text(doc.splitTextToSize(String(project.description || ''), W - M * 2 - 14), M + 7, 121);

    // chips
    let cx = W / 2;
    const chips = [project.category, project.status, project.benefits].filter(Boolean);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    chips.forEach((c, i) => {
        const tw = doc.getTextWidth(c) + 12;
        if (i % 2 === 0) { doc.setFillColor(...color(GREEN_L)); doc.setTextColor(...color(GREEN_D)); }
        else { doc.setFillColor(...[255, 255, 255]); doc.setTextColor(...color(DARK)); }
        doc.roundedRect(cx - tw / 2, 146, tw, 9, 5, 5, 'F');
        doc.text(c, cx, 152.5, { align: 'center' });
        cx += tw / 2 + 6;
    });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...color(GREEN_L));
    doc.text(`${project.id.toUpperCase()}-KZ-V1.0`, W / 2, H - 12, { align: 'center' });
    n = 2;

    /* ══════════ SLIDE 2 · THE DEFECT (PROBLEM) ══════════ */
    doc.addPage();
    header('THE DEFECT · PROBLEM', '現状の課題');
    putIcon('defect', M, 26, 22, 22);
    label(M + 28, 36, 'CORE PROBLEM', RED, 10);
    label(M + 28, 43, String(project.title).toUpperCase(), GREY, 7, false);

    const pw = W / 2 - M - 4;
    card(M, 56, pw, 92, RED_L, RED, 0.8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...color(DARK));
    doc.text(doc.splitTextToSize(String(project.problem || project.background || project.description || ''), pw - 16), M + 8, 68, { maxWidth: pw - 16 });

    // right: pain points list
    const rx = M + pw + 8;
    const rw = W - M - rx;
    card(rx, 56, rw, 92, '#ffffff', '#e4e4e7', 0.5);
    label(rx + 8, 66, 'PAIN POINTS', GREY, 9);
    const pains = (project.personas && project.personas.length)
        ? project.personas.map(p => ({ role: p.role || 'User', pain: p.pain || p.pain_point || '' }))
        : [{ role: 'End user', pain: project.problem || '' }];
    let py = 74;
    pains.slice(0, 5).forEach((p) => {
        putIcon('alert', rx + 8, py - 4, 6, 6);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(...color(RED));
        doc.text(String(p.role), rx + 18, py);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...color(DARK));
        doc.text(doc.splitTextToSize(String(p.pain || ''), rw - 26), rx + 18, py + 4, { maxWidth: rw - 26 });
        py += (String(p.pain || '').length > 45 ? 26 : 18);
    });
    footer('Defect identified');
    n = 3;

    /* ══════════ SLIDE 3 · THE COUNTERMEASURE (SOLUTION) ══════════ */
    doc.addPage();
    header('THE COUNTERMEASURE · SOLUTION', '対策・解決策');
    putIcon('solution', M, 26, 22, 22);
    label(M + 28, 36, 'SOLUTION · COUNTERMEASURE', GREEN_D, 10);
    const rows = project.problemMap && project.problemMap.length
        ? project.problemMap
        : [{ problem: project.problem, solution: project.solution, mitigation: '' }];
    const g = 8;
    const cw = (W - M * 2 - g) / 2;
    const chh = 62;
    const sy = 48;
    rows.slice(0, 4).forEach((pm, i) => {
        const col = i % 2;
        const rowr = Math.floor(i / 2);
        const x = M + col * (cw + g);
        const y = sy + rowr * (chh + g + 4);
        // defect left
        card(x, y, cw, chh, RED_L, RED, 0.7);
        putIcon('alert', x + 7, y + 7, 10, 10);
        label(x + 21, y + 13, 'DEFECT', RED, 8);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...color(DARK));
        doc.text(doc.splitTextToSize(String(pm.problem || ''), cw / 2 - 10), x + 7, y + 26, { maxWidth: cw / 2 - 10 });
        // solution right
        const sx = x + cw / 2;
        card(sx, y, cw / 2, chh, GREEN_L, GREEN, 0.7);
        putIcon('check', sx + 6, y + 7, 10, 10);
        label(sx + 20, y + 13, 'COUNTERMEASURE', GREEN_D, 7);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(...color(GREEN_D));
        doc.text(doc.splitTextToSize(String(pm.solution || ''), cw / 2 - 12), sx + 6, y + 26, { maxWidth: cw / 2 - 12 });
        if (pm.mitigation) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
            doc.setTextColor(...color(DARK));
            doc.text(doc.splitTextToSize(String(pm.mitigation), cw / 2 - 12), sx + 6, y + chh - 18, { maxWidth: cw / 2 - 12 });
        }
    });
    if (project.solution) {
        const baseY = sy + 2 * (chh + g + 4) + 2;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...color(GREEN_D));
        doc.text('OVERALL SOLUTION', M, baseY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...color(DARK));
        doc.text(doc.splitTextToSize(String(project.solution), W - M * 2), M, baseY + 6, { maxWidth: W - M * 2 });
    }
    footer('Countermeasure applied');
    n = 4;

    /* ══════════ SLIDE 4 · IMPACT ══════════ */
    doc.addPage();
    header('IMPACT · QC GAUGE', '成果・検査結果');
    putIcon('target', M, 26, 22, 22);
    label(M + 28, 36, 'MEASURED OUTCOMES', GREEN_D, 10);
    const stats = project.stats && project.stats.length ? project.stats : [];
    const gap = 8;
    const sww = (W - M * 2 - gap * (stats.length - 1)) / Math.max(stats.length, 1);
    stats.slice(0, 4).forEach((s, i) => {
        const x = M + i * (sww + gap);
        card(x, 50, sww, 70, '#ffffff', GREEN, 0.8);
        doc.setFillColor(...color(GREEN_D));
        doc.circle(x + sww / 2, 64, 9, 'F');
        putIcon('impact', x + sww / 2 - 4, 60, 8, 8);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(...color(GREEN_D));
        doc.text(String(s.value), x + sww / 2, 84, { align: 'center' });
        doc.setFontSize(8.5);
        doc.setTextColor(...color(DARK));
        doc.text(String(s.label || '').toUpperCase(), x + sww / 2, 91, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...color(GREY));
        doc.text(doc.splitTextToSize(String(s.description || ''), sww - 10), x + sww / 2, 99, { align: 'center', maxWidth: sww - 10 });
    });
    if (project.impact) {
        card(M, 130, W - M * 2, 30, GREEN_L, GREEN, 0.7);
        label(M + 8, 138, 'KEY OUTCOME', GREEN_D, 8);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(...color(DARK));
        doc.text(doc.splitTextToSize(String(project.impact), W - M * 2 - 16), M + 8, 146, { maxWidth: W - M * 2 - 16 });
    }
    footer('Measured outcomes');
    n = 5;

    /* ══════════ SLIDE 5 · PROCESS LINE (TIMELINE) ══════════ */
    doc.addPage();
    header('PROCESS LINE · TIMELINE', '工程表');
    putIcon('timeline', M, 26, 22, 22);
    label(M + 28, 36, 'DELIVERY PHASES', GREEN_D, 10);
    const tl = project.timeline && project.timeline.length ? project.timeline : [];
    const tg = 8;
    const tiw = (W - M * 2 - tg * (tl.length - 1)) / Math.max(tl.length, 1);
    tl.slice(0, 4).forEach((t, i) => {
        const x = M + i * (tiw + tg);
        const y = 56;
        card(x, y, tiw, 70, '#ffffff', '#e4e4e7', 0.5);
        // phase number
        doc.setFillColor(...color(GREEN));
        doc.circle(x + tiw / 2, 68, 12, 'F');
        putIcon('check', x + tiw / 2 - 5, 63, 10, 10);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...color(GREEN_D));
        doc.text(String(t.phase || '').toUpperCase(), x + tiw / 2, 92, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...color(GREY));
        doc.text(String(t.period || ''), x + tiw / 2, 99, { align: 'center' });
        doc.setTextColor(...color(DARK));
        doc.setFontSize(7);
        let ty = 106;
        (t.activities || []).slice(0, 4).forEach((a) => {
            doc.text(`• ${a}`, x + tiw / 2, ty, { align: 'center' });
            ty += 5;
        });
    });
    footer('Delivery phases');
    n = 6;

    /* ══════════ SLIDE 6 · BEFORE / AFTER ══════════ */
    doc.addPage();
    header('KAIZEN EFFECT · BEFORE / AFTER', '改善効果');
    putIcon('alert', M, 26, 18, 18);
    label(M + 24, 36, 'BEFORE', RED, 11);
    putIcon('check', W / 2 - 9, 26, 18, 18);
    label(W / 2 + 5, 36, 'AFTER', GREEN_D, 11);
    const ba = project.beforeAfter && project.beforeAfter.length ? project.beforeAfter : [];
    const bw = W / 2 - M - 4;
    const bh = 20;
    ba.slice(0, 5).forEach((b, i) => {
        const y = 48 + i * (bh + 7);
        // before card
        card(M, y, bw, bh, RED_L, RED, 0.6);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...color(RED));
        doc.text(String(b.aspect || ''), M + 6, y + 8);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...color(DARK));
        doc.text(doc.splitTextToSize(String(b.before || ''), bw - 20), M + 20, y + 8, { maxWidth: bw - 20 });
        // after card
        const ax = W / 2 + 4;
        card(ax, y, bw, bh, GREEN_L, GREEN, 0.6);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...color(GREEN_D));
        doc.text(String(b.aspect || ''), ax + 6, y + 8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...color(DARK));
        doc.text(doc.splitTextToSize(String(b.after || ''), bw - 20), ax + 20, y + 8, { maxWidth: bw - 20 });
        // arrow
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...color(GREEN));
        doc.text('→', W / 2 - 3, y + 8);
    });
    footer('Improvement achieved');
    n = 7;

    /* ══════════ SLIDE 7 · TOOLS & CLOSING ══════════ */
    doc.addPage();
    header('TOOLS & EQUIPMENT', '工程基準');
    putIcon('tools', M, 26, 22, 22);
    label(M + 28, 36, 'TOOLS · METHODS · TAGS', GREEN_D, 10);
    const tools = [
        ...(project.designTools || []),
        ...(project.researchMethods || []),
        ...(project.tags || []),
    ].filter((v, i, a) => a.indexOf(v) === i);
    let cx2 = M;
    let cy2 = 46;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    tools.slice(0, 16).forEach((t) => {
        const tw = doc.getTextWidth(t) + 12;
        if (cx2 + tw > W - M) { cx2 = M; cy2 += 13; }
        doc.setFillColor(...color(GREEN_L));
        doc.setDrawColor(...color(GREEN));
        doc.setLineWidth(0.4);
        doc.roundedRect(cx2, cy2, tw, 9, 5, 5, 'FD');
        doc.setTextColor(...color(GREEN_D));
        doc.text(t, cx2 + 6, cy2 + 6.4);
        cx2 += tw + 6;
    });
    cy2 = Math.max(cy2 + 16, 80);
    // closing
    card(M, cy2, W - M * 2, 66, GREEN_D);
    putIcon('kaizen', W / 2 - 12, cy2 + 8, 24, 24);
    doc.setTextColor(...color(GREEN_L));
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('改 善 は 終 わ ら な い  ·  K A I Z E N   N E V E R   E N D S', W / 2, cy2 + 40, { align: 'center' });
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    const quote = project.kesanSaran || project.vision || project.impact || 'Continuous improvement, one small step at a time.';
    doc.text(doc.splitTextToSize(`“${quote}”`, W - M * 2 - 30), W / 2, cy2 + 50, { align: 'center', maxWidth: W - M * 2 - 30 });
    footer('Continuous improvement');

    doc.save(`${project.id}_Kaizen_Report.pdf`);
};

function color(h) {
    if (Array.isArray(h)) return h;
    const hex = String(h).replace('#', '');
    return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16),
    ];
}

function estimateSlides(p) {
    let c = 1;
    if (p.problem || p.background || (p.personas && p.personas.length)) c++;
    if (p.problemMap || p.solution) c++;
    if (p.impact || (p.stats && p.stats.length)) c++;
    if (p.timeline && p.timeline.length) c++;
    if (p.beforeAfter && p.beforeAfter.length) c++;
    c++;
    return c;
}
