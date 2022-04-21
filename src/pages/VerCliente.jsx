import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const VerCliente = () => {
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

	return cargando ? (
		<>
			<Spinner />
			<p className='text-center'>Cargando...</p>
		</>
	) : Object.keys(cliente).length === 0 ? (
		<div className='flex flex-col items-center mt-40'>
			<FontAwesomeIcon icon={faPersonCircleExclamation} size='6x' className='text-red-600' />
			<p className='font-semibold mt-5 text-2xl'>¡No se han encontrado Resultados!</p>
		</div>
	) : (
		<div>
			<>
				<h1 className='font-black text-4xl text-blue-600'>
					Ver Cliente: <span className='ml-3 underline underline-offset-8 text-lime-500'>{nombre}</span>
				</h1>
				<p className='mt-8 text-2xl'>Información del Cliente:</p>

				{nombre && (
					<p className='text-3xl mt-10'>
						<span className='text-gray-700 uppercase font-bold'>Cliente: </span>
						{nombre}
					</p>
				)}

				{email && (
					<p className='text-2xl mt-4'>
						<span className='text-gray-700 uppercase font-bold'>Email: </span>
						{email}
					</p>
				)}

				{telefono && (
					<p className='text-2xl mt-4'>
						<span className='text-gray-700 uppercase font-bold'>Teléfono: </span>
						{telefono}
					</p>
				)}

				{empresa && (
					<p className='text-2xl mt-4'>
						<span className='text-gray-700 uppercase font-bold'>Empresa: </span>
						{empresa}
					</p>
				)}

				{notas && (
					<p className='text-2xl mt-4'>
						<span className='text-gray-700 uppercase font-bold'>Notas📄: </span>
						{notas}
					</p>
				)}
			</>
		</div>
	);
};

export default VerCliente;
