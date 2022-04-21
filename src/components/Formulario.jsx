import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
	const navigate = useNavigate();

	const nuevoClienteSchema = Yup.object().shape({
		nombre: Yup.string()
			.required('*El nombre del Cliente es Obligatorio*')
			.min(3, '*El nombre es muy corto*')
			.max(20, '*El nombre es muy largo*'),
		empresa: Yup.string().required('*El nombre de la Empresa es Obligatorio*'),
		email: Yup.string().required('*El email es obligatorio*').email('*Agrega un email válido*'),
		telefono: Yup.number()
			.integer('*Ingresa un número telefónico válido*')
			.typeError('*Ingresa un número telefónico válido*')
			.positive('*Ingresa un número telefónico válido*'),
		notas: '',
	});

	// Validando el formulario
	const handleSubmit = async (campos) => {
		// console.log(campos);
		try {
			let respuesta;
			if (cliente.id) {
				// EDITANDO REGISTRO
				const url = `http://localhost:4000/clientes/${cliente.id}`;

				respuesta = await fetch(url, {
					method: 'PUT',
					body: JSON.stringify(campos),
					headers: { 'Content-type': 'application/json' },
				});
			} else {
				// NUEVO REGISTRO
				const url = 'http://localhost:4000/clientes';

				respuesta = await fetch(url, {
					method: 'POST',
					body: JSON.stringify(campos),
					headers: { 'Content-type': 'application/json' },
				});
			}
			await respuesta.json();
			navigate('/clientes');
		} catch (error) {
			console.log(error);
		}
	};

	return cargando ? (
		<Spinner />
	) : (
		<div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
			<h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
				{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
			</h1>
			<Formik
				initialValues={{
					nombre: cliente?.nombre ?? '',
					empresa: cliente?.empresa ?? '',
					email: cliente?.email ?? '',
					telefono: cliente?.telefono ?? '',
					notas: cliente?.notas ?? '',
				}}
				enableReinitialize={true}
				onSubmit={async (values, { resetForm }) => {
					await handleSubmit(values);

					resetForm();
				}}
				validationSchema={nuevoClienteSchema}>
				{({ errors, touched }) => {
					{
						/* console.log(data); */
					}
					return (
						<Form className='mt-10'>
							<div className='mb-4'>
								<label className='text-gray-700' htmlFor='nombre'>
									Nombre:
								</label>
								<Field
									type='text'
									className='mt-2 w-full p-3 bg-gray-50'
									id='nombre'
									placeholder='Nombre del Cliente'
									name='nombre'
								/>
								{errors.nombre && touched.nombre ? <Alerta>{errors.nombre}</Alerta> : null}
							</div>
							<div className='mb-4'>
								<label className='text-gray-700' htmlFor='empresa'>
									Empresa:
								</label>
								<Field
									type='text'
									className='mt-2 w-full p-3 bg-gray-50'
									id='empresa'
									placeholder='Empresa del Cliente'
									name='empresa'
								/>
								{errors.empresa && touched.empresa ? <Alerta>{errors.empresa}</Alerta> : null}
							</div>
							<div className='mb-4'>
								<label className='text-gray-700' htmlFor='email'>
									Email:
								</label>
								<Field
									type='text'
									className='mt-2 w-full p-3 bg-gray-50'
									id='email'
									placeholder='Email del Cliente'
									name='email'
								/>
								{errors.email && touched.email ? <Alerta>{errors.email}</Alerta> : null}
							</div>
							<div className='mb-4'>
								<label className='text-gray-700' htmlFor='telefono'>
									Teléfono:
								</label>
								<Field
									type='tel'
									className='mt-2 w-full p-3 bg-gray-50'
									id='telefono'
									placeholder='Teléfono del Cliente'
									name='telefono'
								/>
								{errors.telefono && touched.telefono ? <Alerta>{errors.telefono}</Alerta> : null}
							</div>
							<div className='mb-4'>
								<label className='text-gray-700' htmlFor='notas'>
									Notas:
								</label>
								<Field
									as='textarea'
									type='text'
									className='mt-2 w-full p-3 bg-gray-50 h-40'
									id='notas'
									placeholder='Notas del Cliente'
									name='notas'
								/>
							</div>

							<input
								type='submit'
								value={cliente?.nombre ? 'Actualizar' : 'Agregar Cliente'}
								className='mt-6 block mx-auto w-3/4 bg-blue-500 p-3 text-white font-bold text-lg uppercase -tracking-normal rounded-md shadow-md hover:bg-blue-700 '
							/>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

Formulario.defaultProps = {
	cliente: {},
	cargando: false,
};

export default Formulario;
