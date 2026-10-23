import { useEffect } from 'react';

export default function Porto2Wrapper() {
  useEffect(() => {
    window.location.replace('/porto-2.0/');
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfbf7] dark:bg-[#12131c] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
      <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">Membuka Porto 2.0...</h2>
      <p className="text-sm text-zinc-500 mt-2 font-mono">
        Jika tidak otomatis terbuka, <a href="/porto-2.0/" className="text-amber-600 underline font-bold">klik di sini</a>.
      </p>
    </div>
  );
}
