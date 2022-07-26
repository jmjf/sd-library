import { Resource, ResourceTypeValues } from '../models/Resource';

export interface ViewResourceProps {
	resource: Resource;
}

const ViewResource = ({ resource }: ViewResourceProps) => {
	const {
		resourceId,
		resourceTypeCode,
		resourceTitle,
		lendableFlag,
		publishedDate,
		book,
		periodical,
	} = resource;

	return (
		<div>
			<h3>{resourceTitle}</h3>
			<p>Resource Type Code: {resourceTypeCode}</p>
			<p>Lendable?: {lendableFlag ? 'Yes' : 'No'}</p>
			<p>
				Published:{' '}
				{new Intl.DateTimeFormat('en-US', {
					month: 'short',
					year: 'numeric',
				}).format(publishedDate)}
			</p>
			{resourceTypeCode === ResourceTypeValues.book ? (
				<div>
					<p>Author: {book?.authorName}</p>
					<p>ISBN: {book?.ISBN}</p>
				</div>
			) : (
				<div>
					<p>
						Volume {periodical?.volumeNumber}, Issue
						{periodical?.issueNumber}
					</p>
					<p>ISSN: {periodical?.ISSN}</p>
				</div>
			)}
			<p>Resource Id: {resourceId}</p>
			<br />
		</div>
	);
};
export default ViewResource;
