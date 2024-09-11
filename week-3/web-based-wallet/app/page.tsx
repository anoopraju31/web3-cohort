'use client'

import { useState, type FC } from 'react'
import GenerateSeedPhrase from '@/components/GenerateSeedPhrase'
import GenerateEthereumAddress from '@/components/GenerateEthereumAddress'

const HomePage: FC = () => {
	const [mnemonic, setMnemonic] = useState<string>('')
	const handleMnemonicChange = (value: string) => setMnemonic(value)

	return (
		<main className='bg-gray-200 min-h-screen font-mono'>
			<div className='w-full max-w-2xl mx-auto px-6 md:px-0 py-12 flex flex-col gap-6'>
				<div className='mb-6'>
					<h1 className='text-3xl font-semibold text-gray-950'>
						Crypto Web Wallet
					</h1>
				</div>

				<GenerateSeedPhrase
					mnemonic={mnemonic}
					handleMnemonicChange={handleMnemonicChange}
				/>

				<GenerateEthereumAddress mnemonic={mnemonic} />
			</div>
		</main>
	)
}

export default HomePage
