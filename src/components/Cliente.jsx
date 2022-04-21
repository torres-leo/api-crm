import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cliente = ({ cliente, handleEliminar }) => {
	const navigate = useNavigate();

	const { nombre, empresa, telefono, email, id } = cliente;

	return (
		<tr className='border-b hover:bg-gray-100'>
			<td className='p-3 text-center'>{nombre}</td>
			<td className='p-3 w-1/4 text-center'>
				<p>
					<span className='text-gray-600 font-bold'>Email: </span>
					{email}
				</p>
				{telefono && (
					<p>
						<span className='text-gray-600 font-bold'>Tel: </span>
						{telefono}
					</p>
				)}
			</td>
			<td className='p-3 text-center w-auto'>{empresa}</td>
			<td className='p-3 text-center'>
				<div className='flex justify-around mt-3'>
					<button
						type='button'
						className='bg-lime-400 p-2 rounded-md font-semibold hover:bg-lime-500 mx-1'
						onClick={() => navigate(`/clientes/${id}`)}>
						Ver Más
					</button>
					<button
						type='button'
						className='bg-blue-400 p-2 rounded-md font-semibold hover:bg-blue-500 w-auto'
						onClick={() => navigate(`/clientes/editar/${id}`)}>
						Editar
					</button>
					<button
						type='button'
						className='bg-red-600 p-2 rounded-md font-semibold hover:bg-red-700 text-white w-20'
						onClick={() => handleEliminar(id, nombre)}>
						Eliminar
					</button>
				</div>
			</td>
		</tr>
	);
};

export default Cliente;
