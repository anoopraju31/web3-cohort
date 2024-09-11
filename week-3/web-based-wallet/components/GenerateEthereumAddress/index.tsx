'use client'

import { type FC, useState } from 'react'
import { mnemonicToSeed } from 'bip39'
import { Wallet, HDNodeWallet } from 'ethers'
import { Button } from '../ui/button'

type AddressCardProps = {
	address: string
}

const AddressCard: FC<AddressCardProps> = ({ address }) => {
	return (
		<div className='bg-gray-400 p-4 rounded-lg'>
			<p className='text-gray-950'>{address}</p>
		</div>
	)
}

type Props = {
	mnemonic: string
}

const GenerateEthereumAddress: FC<Props> = ({ mnemonic }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const [addresses, setAddresses] = useState<string[]>([])

	const generateAddress = async () => {
		const seed = await mnemonicToSeed(mnemonic)
		const derivationPath = `m/44'/60'/${currentIndex}'/0'`
		const hdNode = HDNodeWallet.fromSeed(seed)
		const child = hdNode.derivePath(derivationPath)
		const privateKey = child.privateKey
		const wallet = new Wallet(privateKey)

		setCurrentIndex((prev) => prev + 1)
		setAddresses((prev) => [...prev, wallet.address])
	}

	if (!mnemonic) return null

	return (
		<div className='flex flex-col gap-6 p-4 bg-gray-100 rounded-lg'>
			<div className='flex items-center justify-between gap-4'>
				<h2 className='text-xl font-semibold text-gray-950'>
					Generate Ethereum Addresses
				</h2>
				<Button
					type='button'
					onClick={generateAddress}
					className='bg-gray-800 hover:bg-gray-950/90 active:bg-gray-950/80'>
					Generate Address
				</Button>
			</div>

			{addresses && addresses.length > 0 && (
				<div className='flex flex-col gap-4'>
					{addresses.map((address, index) => (
						<AddressCard key={index} address={address} />
					))}
				</div>
			)}
		</div>
	)
}

export default GenerateEthereumAddress
