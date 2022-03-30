import select from 'select-dom';
import * as pageDetect from 'github-url-detection';

import features from '.';
import {isEditable} from '../helpers/dom-utils';

const handler = ({key, target}: KeyboardEvent): void => {
	if (key === 'y' && !isEditable(target)) {
		const permalink = select('a.js-permalink-shortcut')!.href;
		void navigator.clipboard.writeText(permalink + location.hash);
	}
};

function init(): Deinit {
	window.addEventListener('keyup', handler);

	return () => {
		window.removeEventListener('keyup', handler);
	};
}

void features.add(import.meta.url, {
	include: [
		pageDetect.isBlame,
		pageDetect.isCompare,
		pageDetect.isRepoTree,
		pageDetect.isRepoCommitList,
		pageDetect.isSingleCommit,
		pageDetect.isSingleFile,
	],
	awaitDomReady: false,
	deduplicate: false,
	init,
});
