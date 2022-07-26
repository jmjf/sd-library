import ViewResource from './ViewResource';
import { Resource } from '../models/Resource';
import { resources } from '../temp/resources';

const ListResources = () => {
	return (
		<section id="resources">
			{resources.map((resource: Resource) => {
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
			})}
		</section>
	);
};

export default ListResources;
