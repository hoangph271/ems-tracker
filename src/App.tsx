/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BarcodeScanner } from './components/BarcodeScanner'
import type { StyledFC } from './types'

export interface ListTBLDELIVERY {
  NGAY_TRANG_THAI: string;
  GIO_TRANG_THAI: string;
  NGAY_PHAT: string;
  NGAY_NHAP: null;
  VI_TRI: string;
  TRANG_THAI: string;
}
export interface ListTBLDINHVI {
  NGAY_TRANG_THAI: string;
  NGAY: string;
  GIO: string;
  TRANG_THAI: string;
  VI_TRI: string;
  DIEN_THOAI: string;
}
export interface TblInfo {
  Nuoc_Chapnhan: string;
  Nuoc_Phat: string;
  BC_GUI: string;
  BC_PHAT: string;
  HO_TEN_GUI: string;
  DIA_CHI_GUI: string;
  HO_TEN_NHAN: string;
  DIA_CHI_NHAN: string;
  LO: string;
  MA_KH: string;
  MA_THAM_CHIEU: string;
  KHOI_LUONG: string;
  MAE1: string;
  TRANG_THAI: string;
}
export interface APIContent {
  List_TBL_DINH_VI: ListTBLDINHVI[];
  List_TBL_DELIVERY: ListTBLDELIVERY[];
  List_TBL_DELIVERY_lIST: null;
  Code: string;
  Message: string;
  TBL_INFO: TblInfo;
}

const App: StyledFC = (props) => {
  const { className } = props
  const [code, setCode] = useState('')
  const [data, setData] = useState<APIContent>()

  useEffect(() => {
    if (!code) {
      setData(undefined)
      return
    }

    fetch(`https://api.myems.vn/TrackAndTraceItemCode?itemcode=${code}&language=1`)
      .then(async res => {
        const data: APIContent = await res.json()
        setData(data)
      })
  }, [code])

  return (
    <div className={className} data-testid="App">
      {code ? (
        <button onClick={() => setCode('')} style={{ padding: '2rem' }}>
          {'Scan again'}
        </button>
      ) : (
        <BarcodeScanner
          onData={setCode}
        />
      )}
      {data && (
        <div>
          <div>
            {data.TBL_INFO.MAE1} - {data.TBL_INFO.TRANG_THAI}
          </div>
          <pre style={{ maxWidth: 'calc(100vw - 4rem)' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

const StyledApp = styled(App)`
  font-family: 'Courier New', Courier, monospace;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-image: url(background.jpg);
  background-size: cover;

  h4 {
    font-size: xx-large;
  }
  h4, p {
    font-weight: bold;
    text-align: center;
  }
`

export default StyledApp
