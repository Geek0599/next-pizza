'use client';
import React from 'react';
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import { ButtonTop } from './button-top';


type ProvidersProps = {
	
 };
 
 export default function Providers({ children }: React.PropsWithChildren<ProvidersProps>) {
	return (
	  <>
		 <NextTopLoader />
		 <SessionProvider>
			{children}
		 </SessionProvider>
		 <Toaster />
		 <ButtonTop/>
	  </>
	);
 }