import { Button } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

/**
 * Title Tools Panel.
 * @returns {JSX.Element}
 * @constructor
 */
const TitleToolsPanel = ( { title, setPostTitle } ) => {
	const [ titleLength, setTitleLength ] = useState( 0 );
	const [ wordLength, setWordLength ] = useState( 0 );
	useEffect( () => {
		setTitleLength( title.length );
		setWordLength( title.replace( /[^A-Za-z0-9 ]/g, '' ).replace( /\s{2,}/g, ' ' ).trim().split( ' ' ).length );
	}, [ title ] );

	const setTitleToTitleCase = () => {
		const lowers = 'a, abaft, about, above, afore, after, along, amid, among, an, apud, as, aside, at, atop, below, but, by, circa, down, for, from, given, in, into, lest, like, mid, midst, minus, near, next, of, off, on, onto, out, over, pace, past, per, plus, pro, qua, round, sans, save, since, than, thru, till, times, to, under, until, unto, up, upon, via, vice, with, worth, the, and, nor, or, yet, so'.split( ', ' );
		const uppers = 'id, tv'.split( ', ' );

		let titleCopy = title.split( ' ' ).map( word => {
			if ( lowers.includes( word.toLowerCase() ) ) {
				return word.toLowerCase();
			}

			if ( uppers.includes( word.toUpperCase() ) ) {
				return word.toUpperCase();
			}

			return word.toLowerCase().replace( /./, c => c.toUpperCase() );
		} ).join( ' ' );

		setPostTitle( titleCopy );
	};

	const setTitleToLowerCase = () => {
		setPostTitle( title.toLowerCase() );
	};

	const setTitleToUpperCase = () => {
		setPostTitle( title.toUpperCase() );
	};

	return (
		<PluginDocumentSettingPanel
			className="document-setting-title-tools"
			title={ __( 'Title Tools', 'greatscott-title-tools' ) }
		>
			<p>{ __( 'Title characters:' ) } { titleLength }</p>
			<p>{ __( 'Title words:' ) } { wordLength }</p>

			<p><Button variant="secondary" onClick={ e => setTitleToTitleCase() }>{ __( 'Title Case' ) }</Button></p>
			<p><Button variant="secondary" onClick={ e => setTitleToLowerCase() }>{ __( 'Lower Case' ) }</Button></p>
			<p><Button variant="secondary" onClick={ e => setTitleToUpperCase() }>{ __( 'Upper Case' ) }</Button></p>
		</PluginDocumentSettingPanel>
	);
};

const TitleToolsPanelWithCompose = compose( [
	withSelect( ( select ) => {
		return {
			title: select( 'core/editor' ).getEditedPostAttribute( 'title' ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		return {
			setPostTitle( title ) {
				dispatch( 'core/editor' ).editPost( { title } );
			},
		};
	} ),
] )( TitleToolsPanel );

registerPlugin( 'document-setting-title-tools', { render: TitleToolsPanelWithCompose } );
