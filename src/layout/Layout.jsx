import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
	const location = useLocation();
	const urlActual = location.pathname;

	return (
		<div className='md:flex md:min-h-screen'>
			<div className='md:w-1/4 bg-blue-800 px-5 py-10'>
				<h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>
				<nav className='mt-10'>
					<Link
						to='/clientes'
						className={`${
							urlActual === '/clientes' ? 'bg-yellow-200 rounded-sm' : 'text-white'
						} text-center text-2xl block mt-2 drop-shadow-xl`}>
						Clientes
					</Link>
					<Link
						to='/clientes/nuevo'
						className={`${
							urlActual === '/clientes/nuevo' ? 'bg-yellow-200 rounded-sm' : 'text-white'
						} text-center text-2xl block mt-2 drop-shadow-xl`}>
						Nuevo Cliente
					</Link>
				</nav>
			</div>
			<div className='md:w-3/4 ml-10 mt-10 md:h-screen overflow-scroll'>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
