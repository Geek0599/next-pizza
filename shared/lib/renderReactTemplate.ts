// Варіант з глобальним кешуванням
export const loadRenderReactTemplateModule = async () => {
	if (typeof globalThis.ReactDOMServer === 'undefined') {
		globalThis.ReactDOMServer = (await import('react-dom/server')).default;
		console.log('Module Loaded');
	}
};

export const renderReactTemplate = async (component: React.ReactNode) => {
	if (typeof globalThis.ReactDOMServer === 'undefined') {
		await loadRenderReactTemplateModule();
	}
	const staticMarkup = globalThis.ReactDOMServer?.renderToStaticMarkup(component);
	return staticMarkup;
};


// Варіант з динамічним імпортом при кожному виклику функції
// export const renderReactTemplate = async (component: any) => {
// 	const ReactDOMServer = (await import('react-dom/server')).default;
// 	const staticMarkup = ReactDOMServer.renderToStaticMarkup(component);
// 	return staticMarkup;
// };

// Варіант з локальним кешуванням
// let ReactDOMServer: typeof import('react-dom/server') | null = null;

// export const renderReactTemplate = async (component: any) => {
// 	if (!ReactDOMServer) {
// 		ReactDOMServer = (await import('react-dom/server')).default;
// 	}
// 	const staticMarkup = ReactDOMServer.renderToStaticMarkup(component);
// 	return staticMarkup;
// };








