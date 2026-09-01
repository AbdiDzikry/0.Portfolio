const ICON_NAMES = [
    'defect', 'solution', 'impact', 'timeline', 'tools',
    'target', 'users', 'kaizen', 'alert', 'check',
];

const fetchAsDataUrl = (url) =>
    fetch(url)
        .then((res) => res.blob())
        .then(
            (blob) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                })
        )
        .catch(() => null);

export const loadKaizenIcons = async () => {
    const entries = await Promise.all(
        ICON_NAMES.map(async (name) => [
            name,
            await fetchAsDataUrl(`/kaizen-icons/${name}.png`),
        ])
    );
    const map = {};
    entries.forEach(([name, dataUrl]) => {
        if (dataUrl) map[name] = dataUrl;
    });
    return map;
};

export const downloadKaizenPdf = async (project) => {
    const { generateKaizenPdf } = await import('./generateKaizenPdf');
    const icons = await loadKaizenIcons();
    await generateKaizenPdf(project, icons);
};
