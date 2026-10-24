// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightOpenAPI, { createOpenAPISidebarGroup } from 'starlight-openapi';

const apiReference = createOpenAPISidebarGroup();

// Each spec in openapi/ becomes a section of the API reference at /api/<base>/.
const specs = [
	{ base: 'api/datadome', schema: './openapi/datadome.yaml', label: 'DataDome' },
	{ base: 'api/incapsula', schema: './openapi/incapsula.yaml', label: 'Incapsula' },
	{ base: 'api/kasada', schema: './openapi/kasada.yaml', label: 'Kasada' },
	{ base: 'api/tmpt', schema: './openapi/tmpt.yaml', label: 'Ticketmaster tmpt' },
	{ base: 'api/metadata1', schema: './openapi/metadata1.yaml', label: 'Amazon metadata1' },
	{ base: 'api/developer', schema: './openapi/developer.yaml', label: 'Developer API' },
];

export default defineConfig({
	site: 'https://docs.disasm.dev',
	integrations: [
		starlight({
			title: 'disasm.dev',
			description: 'Request-based anti-bot solving API for DataDome, Incapsula, Kasada, Ticketmaster and Amazon.',
			logo: { dark: './src/assets/logo-dark.svg', light: './src/assets/logo-light.svg', replacesTitle: true },
			favicon: '/favicon.svg',
			customCss: ['./src/styles/theme.css'],
			social: [{ icon: 'external', label: 'Dashboard', href: 'https://dashboard.disasm.dev' }],
			plugins: [
				starlightOpenAPI(
					specs.map(({ base, schema, label }) => ({
						base,
						schema,
						sidebar: { label, group: apiReference, operations: { badges: true } },
						snippets: {
							operation: {
								clients: { shell: ['curl'], javascript: ['fetch'], go: ['nethttp'], csharp: ['httpclient'] },
								default: { target: 'shell', client: 'curl' },
							},
						},
					})),
				),
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Introduction', link: '/' },
						'start/quickstart',
						'start/authentication',
						'start/errors',
						'start/fingerprinting',
					],
				},
				{ label: 'DataDome', items: ['datadome/overview', 'datadome/interstitial', 'datadome/captcha', 'datadome/tags'] },
				{ label: 'Incapsula', items: ['incapsula/reese84', 'incapsula/utmvc'] },
				{
					label: 'Kasada',
					badge: { text: 'Beta', variant: 'caution' },
					items: ['kasada/overview', 'kasada/payload', 'kasada/proof-of-work'],
				},
				{ label: 'Ticketmaster', items: ['ticketmaster/tmpt'] },
				{ label: 'Amazon', items: ['amazon/metadata1'] },
				{ label: 'Account', items: ['account/developer-api'] },
				{ label: 'API reference', items: [apiReference] },
			],
		}),
	],
});
