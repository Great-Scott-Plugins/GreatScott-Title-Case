const { __ } = wp.i18n;
const { PluginDocumentSettingPanel } = wp.editPost;
const { PanelRow } = wp.components;

const GSTitleCasePlugin = () => {
	return (
		<PluginDocumentSettingPanel
			title={ __( 'Yoink!!!', 'txtdomain' ) }
			initialOpen="true"
		>
			<PanelRow>Hello there.</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

export default GSTitleCasePlugin;
