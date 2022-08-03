import { Table } from '@mantine/core';
import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';
import { Resource } from '../models/Resource';
import {
	booleanToYesNo,
	formatDate_MMM_YYYY,
	getFirstAuthorName,
} from '../utils';

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
			<td>{resource.title}</td>
			<td>{getFirstAuthorName(resource.authors)}</td>
			<td>{formatDate_MMM_YYYY(resource.publishedDate)}</td>
		</tr>
	));

	return (
		<Table role="resources-list">
			<thead>
				<tr>
					<th>Resource Title</th>
					<th>Author</th>
					<th>Published Date</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};

export default ResourceList;
