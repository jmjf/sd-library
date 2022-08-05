import { useEffect, useState } from 'react';
import ResourceSearchResultsPage from './components/ResourceSearchResultsPage';
import { Resource } from './models/Resource';

const jsonServerUrl = 'http://localhost:3030';

function App() {
	const [resources, setResources] = useState<Resource[]>([]);

	useEffect(() => {
		async function loadResources(url: string) {
			try {
				const response = await fetch(url);
				if (response.ok) {
					setResources(await response.json());
				} else {
					// HTTP error statuses go to the catch
					throw response;
				}
			} catch (err) {
				// network errors
				console.log('App useEffect', JSON.stringify(err, null, 3));
			}
		}

		const url = `${jsonServerUrl}/resources?title_like=kawabata&_limit=10`;
		loadResources(url);
	}, []); // [] -> run once

	return (
		<div className="App">
			<ResourceSearchResultsPage resources={resources} />
		</div>
	);
}

export default App;
