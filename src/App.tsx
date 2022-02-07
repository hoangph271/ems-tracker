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
  const queryParams = new URLSearchParams(location.search)
  const [code, setCode] = useState(queryParams.get('code') ?? '')
  const [data, setData] = useState<APIContent>()

  useEffect(() => {
    if (!code) {
      setData(undefined)
      return
    }

    if (code !== queryParams.get('code')) {
      window.location.href = `/?code=${code}`
      return
    }

    fetch(`https://api.myems.vn/TrackAndTraceItemCode?itemcode=${code}&language=1`)
      .then(async res => {
        const data: APIContent = await res.json()
        setData(data)
      })
  }, [code, queryParams.get('code')])

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
          <table className="tbl-dinh-vi">
            <thead>
              <tr>
                <th>Ngay gio</th>
                <th>Trang thai</th>
                <th>Vi tri</th>
              </tr>
            </thead>
            <tbody>
              {data.List_TBL_DINH_VI.map((item, i) => (
                <tr key={i}>
                  <td>
                    <p>{item.GIO}</p>
                    <p>{item.NGAY}</p>
                  </td>
                  <td>{item.TRANG_THAI}</td>
                  <td>{item.VI_TRI}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

  .tbl-dinh-vi {
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;

    td, th {
      border: 1px solid #ddd;
      padding: 0.4rem;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    tr:hover {
      background-color: #ddd;
    }

    td p {
      font-weight: normal;
    }
  }
`

export default StyledApp
