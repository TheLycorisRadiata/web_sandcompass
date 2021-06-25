import {useState, useEffect} from 'react';

const PageNotFound = () =>
{
	const [back_title, set_back_title] = useState('');
	const [back_message, set_back_message] = useState('');

	useEffect(() => 
	{
		fetch('http://localhost:3001/*')
		.then(res => res.json())
		.then(json => 
		{
			set_back_title(json.title);
			set_back_message(json.message);
		});
	}, []);

	return (
		<main>
			<h1>{back_title}</h1>
			<p id="error_message">{back_message}</p>
		</main>
	);
}

export default PageNotFound;

