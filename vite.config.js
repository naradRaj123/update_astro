import path from 'node:path';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

// Runtime error handler
const configRuntimeErrorHandler = `
window.onerror = (message, source, lineno, colno, errorObj) => {
  const errorDetails = errorObj ? JSON.stringify({
    name: errorObj.name,
    message: errorObj.message,
    stack: errorObj.stack,
    source,
    lineno,
    colno,
  }) : null;

  window.parent.postMessage({
    type: 'horizons-runtime-error',
    message,
    error: errorDetails
  }, '*');
};
`;

// Vite error overlay handler
const configViteOverlayHandler = `
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const addedNode of mutation.addedNodes) {
      if (
        addedNode.nodeType === Node.ELEMENT_NODE &&
        (
          addedNode.tagName?.toLowerCase() === 'vite-error-overlay' ||
          addedNode.classList?.contains('backdrop')
        )
      ) {
        handleViteOverlay(addedNode);
      }
    }
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

function handleViteOverlay(node) {
  if (!node.shadowRoot) return;

  const backdrop = node.shadowRoot.querySelector('.backdrop');
  if (backdrop) {
    const overlayHtml = backdrop.outerHTML;
    const parser = new DOMParser();
    const doc = parser.parseFromString(overlayHtml, 'text/html');
    const message = doc.querySelector('.message-body')?.textContent.trim() || '';
    const file = doc.querySelector('.file')?.textContent.trim() || '';

    window.parent.postMessage({
      type: 'horizons-vite-error',
      error: message + (file ? ' File: ' + file : ''),
    }, '*');
  }
}
`;

// Console error monkey patch
const configConsoleErrorHandler = `
const originalConsoleError = console.error;
console.error = function(...args) {
  originalConsoleError.apply(console, args);

  let errorString = '';
  for (const arg of args) {
    if (arg instanceof Error) {
      errorString = arg.stack || \`\${arg.name}: \${arg.message}\`;
      break;
    }
  }

  if (!errorString) {
    errorString = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
  }

  window.parent.postMessage({
    type: 'horizons-console-error',
    error: errorString
  }, '*');
};
`;

// Fetch monkey patch
const configFetchMonkeyPatch = `
const originalFetch = window.fetch;
window.fetch = function(...args) {
  const url = args[0] instanceof Request ? args[0].url : args[0];
  if (url.startsWith('ws:') || url.startsWith('wss:')) return originalFetch.apply(this, args);

  return originalFetch.apply(this, args)
    .then(async response => {
      const contentType = response.headers.get('Content-Type') || '';
      const isDocument = contentType.includes('text/html') || contentType.includes('application/xhtml+xml');
      if (!response.ok && !isDocument) {
        const errorText = await response.clone().text();
        console.error(\`Fetch error from \${response.url}: \${errorText}\`);
      }
      return response;
    })
    .catch(error => {
      if (!url.match(/\\.html?$/i)) console.error(error);
      throw error;
    });
};
`;

// Inject handlers into index.html
const injectErrorHandlersPlugin = {
  name: 'inject-error-handlers',
  transformIndexHtml(html) {
    return {
      html,
      tags: [
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configRuntimeErrorHandler,
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configViteOverlayHandler,
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configConsoleErrorHandler,
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configFetchMonkeyPatch,
          injectTo: 'head',
        },
      ],
    };
  },
};

// Suppress CSS syntax warning
console.warn = () => {};

// Custom logger
const logger = createLogger();
const originalLoggerError = logger.error;
logger.error = (msg, options) => {
  if (options?.error?.toString().includes('CssSyntaxError: [postcss]')) return;
  originalLoggerError(msg, options);
};

// Final Vite config
export default defineConfig({
  customLogger: logger,
  plugins: [react(), injectErrorHandlersPlugin],
  server: {
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
    allowedHosts: true,
  },
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},

});

