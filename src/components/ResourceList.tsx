import { Table } from '@mantine/core';
import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';
import { Resource } from '../models/Resource';
import { booleanToYesNo, formatDate_MMM_YYYY } from '../utils';

interface ResourceListProps {
	resources: Resource[];
	setSelectedResourceId: Dispatch<SetStateAction<string>>;
}

const ResourceList = ({
	resources,
	setSelectedResourceId,
}: ResourceListProps) => {
	const handleClick = (resourceId: string, ev: BaseSyntheticEvent) => {
		ev.preventDefault();
		setSelectedResourceId(resourceId);
	};

	const rows = resources.map((resource) => (
		<tr
			key={resource.resourceId}
			onClick={(ev: BaseSyntheticEvent) => {
				handleClick(resource.resourceId, ev);
			}}
			data-testid={resource.resourceId}
		>
			<td>{resource.resourceTitle}</td>
			<td>{resource.resourceTypeCode}</td>
			<td>{formatDate_MMM_YYYY(resource.publishedDate)}</td>
			<td>{booleanToYesNo(resource.lendableFlag)}</td>
		</tr>
	));

	return (
		<Table role="resources-list">
			<thead>
				<tr>
					<th>Resource Title</th>
					<th>Resource Type</th>
					<th>Published Date</th>
					<th>Lendable?</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};

export default ResourceList;
