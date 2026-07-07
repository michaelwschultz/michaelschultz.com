export type HeroIntroSpec = {
	kind: 'text';
	text: string;
	style: 'body' | 'highlight';
};

export const heroIntroSpecs: HeroIntroSpec[] = [
	{
		kind: 'text',
		text: 'Software designer and engineer with a passion for creating—from innovative ',
		style: 'body'
	},
	{ kind: 'text', text: 'web solutions', style: 'highlight' },
	{ kind: 'text', text: ' to ', style: 'body' },
	{ kind: 'text', text: 'video games', style: 'highlight' },
	{ kind: 'text', text: ', ', style: 'body' },
	{ kind: 'text', text: 'music', style: 'highlight' },
	{ kind: 'text', text: ', and impactful ', style: 'body' },
	{ kind: 'text', text: 'software projects.', style: 'highlight' }
];

export const heroIntroPlainText = heroIntroSpecs.map((spec) => spec.text).join('');
