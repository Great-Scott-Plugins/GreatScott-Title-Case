const { registerPlugin } = wp.plugins;

import GSTitleCasePlugin from './gs-title-case-plugin';

registerPlugin( 'gs-title-case-plugin', {
	render() {
		return <GSTitleCasePlugin />;
	},
} );
