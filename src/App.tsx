import ResourceSearchResultsPage from './components/ResourceSearchResultsPage';

import { resources } from './temp/resources';

function App() {
	return (
		<div className="App">
			<ResourceSearchResultsPage resources={resources} />
		</div>
	);
}

export default App;
