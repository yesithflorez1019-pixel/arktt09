// usePageMeta.js
import { useEffect } from 'react';

export default function usePageMeta(title, description) {
  const nombreColegio = 'LICEO FORMADOR DE EXPLORADORES';

  useEffect(() => {
    document.title = `${title} | ${nombreColegio}`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}
