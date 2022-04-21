import React from 'react';

const Alerta = ({ children }) => {
	return <small className=' text-red-500 font-semibold rounded-sm mb-5 ml-3'>{children}</small>;
};

export default Alerta;
