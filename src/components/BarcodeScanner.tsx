import { FC } from 'react'
import ReactQABarcodeScanner from 'react-qr-barcode-scanner'

export const BarcodeScanner: FC<{
  onData(data: string): void
}> = ({ onData }) => {
  return (
    <div>
      <ReactQABarcodeScanner
        height={350}
        onUpdate={(_, result) => {
          onData(result?.getText() ?? '')
        }}
      />
    </div>
  )
}
