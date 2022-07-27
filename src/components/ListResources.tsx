// import ViewResource from './ViewResource';
import { Resource } from '../models/Resource';
import { useState } from 'react';
import { resources } from '../temp/resources';
import ResourcesList from './ResourcesList';

const ListResources = () => {
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
				<p>{selectedResource.resourceId}</p>
			) : (
				<p>Nothing selected</p>
			)}
			{/* {resources.map((resource: Resource) => {
				return (
					<ViewResource
						key={resource.resourceId}
						resource={{
							...resource,
							publishedDate:
								typeof resource.publishedDate === 'string'
									? new Date(resource.publishedDate)
									: resource.publishedDate,
						}}
					/>
				);
			})} */}
		</section>
	);
};

export default ListResources;
