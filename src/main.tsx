import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LangProvider } from './i18n';
import { weddingConfig } from './config/weddingConfig';
import './styles/globals.css';

// Keep <head> SEO tags in sync with the single config file.
function syncHead() {
  const { site } = weddingConfig;
  document.title = site.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', site.description);
  if (site.canonicalUrl) {
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = site.canonicalUrl;
    document.head.appendChild(link);
    const og = document.createElement('meta');
    og.setAttribute('property', 'og:url');
    og.content = site.canonicalUrl;
    document.head.appendChild(og);
    const img = document.querySelector('meta[property="og:image"]');
    if (img) img.setAttribute('content', new URL(site.ogImage, site.canonicalUrl).href);
  }
}
syncHead();

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <LangProvider>
        <App />
      </LangProvider>
    </StrictMode>,
  );
}
