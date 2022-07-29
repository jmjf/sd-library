import ViewResource from './ViewResource';
import { Resource } from '../models/Resource';
import { useState } from 'react';

import ResourcesList from './ResourcesList';
import { dateAsDate } from '../utils';

interface ListResourcesProps {
	resources: Resource[];
}

const ListResources = ({ resources }: ListResourcesProps) => {
	const [selectedResourceId, setSelectedResourceId] = useState('');

	const selectedResource = resources.find(
		(resource: Resource) => resource.resourceId === selectedResourceId
	);

	return (
		<section id="resources">
			<ResourcesList
				resources={resources}
				setSelectedResourceId={setSelectedResourceId}
			/>
			{selectedResource ? (
				<ViewResource
					resource={{
						...selectedResource,
						publishedDate: dateAsDate(selectedResource.publishedDate),
					}}
				/>
			) : null}
		</section>
	);
};

export default ListResources;
