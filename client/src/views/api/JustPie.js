import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch
} from '@coreui/react'
import {
    CChartPie
} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'

const JustPie = () => {

  const [downloadLink, setDownloadLink] = useState("");
  const [data, setData] = useState("10,25,40,25");
  const [colors, setColors] = useState("#41B883',#E46651,#00D8FF,#DD1B16");
  const [wedge, setWedge] = useState("0.05");
  const apiBaseUrl = 'https://wordcloudme.herokuapp.com/api/justpie/'

  function fetchData () {
    setDownloadLink = '';
    let urlRequestString = apiBaseUrl + 
                          '?data=' + data + 
                          '&colors=' + colors + 
                          '&wedge=' + wedge
    fetch(urlRequestString).then(res => res.json()).then(
      (result) => {
        setDownloadLink(result.message);
      },

      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <CRow>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
              API Inputs
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="data">Data</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      id="data" 
                      name="data"
                      placeholder="10,25,40,25"
                      value={data} 
                      onChange={(event) => setData(event.target.value)}
                      required
                    />
                    <CFormText>Enter your data separated by a comma.</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="colors">Color Set</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      id="colors" 
                      name="colors" 
                      placeholder="#41B883',#E46651,#00D8FF,#DD1B16"
                      value={colors}
                      onChange={(event) => setColors(event.target.value)} 
                      required
                      />
                    <CFormText>Enter your HEX codes, separated by a comma, without the # sign.</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="wedge">Wedge</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      id="wedge" 
                      name="wedge" 
                      placeholder="0.05" 
                      value={wedge}
                      onChange={(event) => setWedge(event.target.value)}
                      required/>
                    <CFormText>Specify your wedge size.</CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
              <CButton type="submit" color="primary" onClick={() => fetchData()}>Generate Plot</CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>
              Chart Output
            </CCardHeader>
            <CCardBody>
              <CChartPie
                datasets={[
                  {
                    backgroundColor: colors,
                    data: data
                  }
                ]}
                labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default JustPie
