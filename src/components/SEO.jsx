import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords }) {
  const nombreColegio = "Liceo Formador de Exploradores";
  const tituloCompleto = `${title} | ${nombreColegio}`;

  return (
    <Helmet>

      <title>{tituloCompleto}</title>
      

      <meta name="description" content={description} />
      

      <meta name="keywords" content={keywords} />
      

      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}