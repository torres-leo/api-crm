import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Formulario from '../components/Formulario';

const EditarCliente = () => {
	const [cliente, setCliente] = useState({});
	const [cargando, setCargando] = useState(true);
	const { id } = useParams();

	const { nombre, empresa, email, telefono, notas } = cliente;

	useEffect(() => {
		const obtenerCliente = async () => {
			try {
				const url = `http://localhost:4000/clientes/${id}`;
				const respuesta = await fetch(url);
				const resultado = await respuesta.json();
				setCliente(resultado);
			} catch (error) {
				console.log(error);
			}
			setCargando(!cargando);
		};
		obtenerCliente();
	}, []);

	return (
		<>
			<h1 className='font-black text-4xl text-blue-600'>Editar Cliente</h1>
			<p className='mt-3'>Actualiza los datos del Cliente</p>
			{cliente?.nombre ? (
				<Formulario cliente={cliente} cargando={cargando} />
			) : (
				<p>{`Cliente con el ID:${id} no encontrado`}</p>
			)}
		</>
	);
};

export default EditarCliente;
