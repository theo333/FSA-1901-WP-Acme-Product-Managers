// make managerOpenings(products)

import React from 'react';

const Home = ({ openings }) => {
	return (
		<div>
			We
			<span style={{ fontWeight: 600 }}>
				{openings ? ' HAVE ' : ' DO NOT HAVE '}
			</span>
			openings for Product Managers!
		</div>
	);
};

export default Home;
