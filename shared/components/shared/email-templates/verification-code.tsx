import * as React from 'react';

interface PayOrderTemplateProps {
  code: string;
}

export const VerificationCodeTemplate: React.FC<PayOrderTemplateProps> = ({
  code
}) => {
	return (
		<div>
			<h1>Підтвердження реєстрації на сайті Next Pizza</h1>
			
		  <p>Код підтвердження: <h2>{code}</h2></p>

		  <p><a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Підтвердити реєстрацію</a></p>
		</div>
	 );
	
}
