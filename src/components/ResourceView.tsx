import { Resource } from '../models/Resource';
import { formatDate_MMM_YYYY } from '../utils';

interface ResourceViewProps {
	resource: Resource;
}

const ResourceView = ({ resource }: ResourceViewProps) => {
	const {
		resourceId,
		title,
		publishedDate,
		publisherName,
		authors,
		subjects,
		isbn,
		lcCallNumber,
		abstract,
	} = resource;

	return (
		<div role="resource-detail">
			<h3>{title}</h3>
			<p>
				Author:{' '}
				{authors && authors[0] && authors[0].authorName
					? authors[0].authorName
					: 'none listed'}
			</p>
			<p>ISBN: {isbn}</p>
			<p>LC Call Number: {lcCallNumber}</p>
			<p>
				{publisherName ? `${publisherName} ` : ''}
				{formatDate_MMM_YYYY(publishedDate)}
			</p>
			<p>Resource Id: {resourceId}</p>
			{subjects && subjects.length > 0 && subjects[0].length > 0 ? (
				<div>
					<p>Subjects:</p>
					{subjects.map((subject) => (
						<p key={subject}>{subject}</p>
					))}
				</div>
			) : null}
			{abstract ? <p>Abstract: {abstract}</p> : null}
			<br />
		</div>
	);
};
export default ResourceView;
