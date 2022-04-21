import React from 'react';
import Formulario from '../components/Formulario';

const NuevoCliente = () => {
	return (
		<>
			<h1 className='font-black text-4xl text-blue-600'>Nuevo Cliente</h1>
			<p className='mt-3'>Llena los siguientes campos para registrar un Cliente</p>
			<Formulario />
		</>
	);
};

export default NuevoCliente;
