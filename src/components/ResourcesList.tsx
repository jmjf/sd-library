import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';
import { Resource } from '../models/Resource';
import { booleanToYesNo, dateAsDate } from '../utils';

export interface ResourcesListProps {
	resources: Resource[];
	setSelectedResourceId: Dispatch<SetStateAction<string>>;
}

const ResourcesList = ({
	resources,
	setSelectedResourceId,
}: ResourcesListProps) => {
	const handleClick = (resourceId: string, ev: BaseSyntheticEvent) => {
		ev.preventDefault();
		setSelectedResourceId(resourceId);
	};

	return (
		<Table id="resources-list">
			<Thead>
				<Tr>
					<Th>Resource Title</Th>
					<Th>Resource Type</Th>
					<Th>Published Date</Th>
					<Th>Lendable?</Th>
				</Tr>
			</Thead>
			<Tbody>
				{resources.map((resource) => (
					<Tr
						key={resource.resourceId}
						onClick={(ev: BaseSyntheticEvent) => {
							handleClick(resource.resourceId, ev);
						}}
					>
						<Td>{resource.resourceTitle}</Td>
						<Td>{resource.resourceTypeCode}</Td>
						<Td>
							{new Intl.DateTimeFormat('en-US', {
								month: 'short',
								year: 'numeric',
							}).format(dateAsDate(resource.publishedDate))}
						</Td>
						<Td>{booleanToYesNo(resource.lendableFlag)}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};

export default ResourcesList;
