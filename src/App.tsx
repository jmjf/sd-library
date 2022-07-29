import ListResources from './components/ListResources';

import { resources } from './temp/resources';

function App() {
	return (
		<div className="App">
			<ListResources resources={resources} />
		</div>
	);
}

export default App;
