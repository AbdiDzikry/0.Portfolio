// ─────────────────────────────────────────────────────────
//  EXPERIENCE TAXONOMY
//  Every project is tagged with one `experience` id below so
//  the Projects page can filter work by where it was done.
// ─────────────────────────────────────────────────────────

export const experiences = [
    {
        id: 'all',
        short: 'All',
        shortId: 'Semua',
        company: '',
        role: '',
        period: ''
    },
    {
        id: 'dharma-controlcable',
        short: 'DCI',
        shortId: 'DCI',
        company: 'PT Dharma Controlcable Indonesia',
        companyId: 'PT Dharma Controlcable Indonesia',
        role: 'IT Support & Digitalization',
        roleId: 'IT Support & Digitalisasi',
        period: 'Aug 2026 - Oct 2026',
        periodId: 'Agu 2026 - Okt 2026'
    },
    {
        id: 'dharma-polimetal',
        short: 'DP',
        shortId: 'DP',
        company: 'PT Dharma Polimetal Tbk.',
        companyId: 'PT Dharma Polimetal Tbk.',
        role: 'IT Support & Digitalization',
        roleId: 'IT Support & Digitalisasi',
        period: 'Oct 2025 - Apr 2026',
        periodId: 'Okt 2025 - Apr 2026'
    },
    {
        id: 'codetag-studio',
        short: 'Codetag',
        shortId: 'Codetag',
        company: 'Codetag Studio',
        companyId: 'Codetag Studio',
        role: 'Software Engineer',
        roleId: 'Software Engineer',
        period: 'Jul 2025 - Oct 2025',
        periodId: 'Jul 2025 - Okt 2025'
    },
    {
        id: 'other',
        short: 'Other',
        shortId: 'Lainnya',
        company: 'Personal & Independent',
        companyId: 'Pribadi & Mandiri',
        role: '',
        roleId: '',
        period: '',
        periodId: ''
    }
];

export const experienceMap = experiences.reduce((acc, exp) => {
    acc[exp.id] = exp;
    return acc;
}, {});

export const getExperience = (id) => experienceMap[id] ?? experienceMap.other;
