import ResourceView from './ResourceView';
import ResourceList from './ResourceList';

import { Resource } from '../models/Resource';
import { useState } from 'react';
import { dateAsDate } from '../utils';

interface ResourceSearchResultsPageProps {
	resources: Resource[];
}

const ResourceSearchResultsPage = ({
	resources,
}: ResourceSearchResultsPageProps) => {
	const [selectedResourceId, setSelectedResourceId] = useState('');

	const selectedResource = resources.find(
		(resource: Resource) => resource.resourceId === selectedResourceId
	);

	return (
		<section id="resources">
			<ResourceList
				resources={resources}
				setSelectedResourceId={setSelectedResourceId}
			/>
			{selectedResource ? (
				<ResourceView
					resource={{
						...selectedResource,
						publishedDate: dateAsDate(selectedResource.publishedDate),
					}}
				/>
			) : null}
		</section>
	);
};

export default ResourceSearchResultsPage;
