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
    CChartLine
} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'

const WordCloud = () => {

  // const [downloadLink, setDownloadLink] = useState("");
  const [data, setData] = useState("Data science is a concept to unify statistics, data analysis and their related methods \
                                    in order to understand and analyze actual phenomena with data. It uses techniques and \
                                    theories drawn from many fields within the context of mathematics, statistics, computer \
                                    science, domain knowledge and information science. Turing award winner Jim Gray imagined \
                                    data science as a fourth paradigm of science (empirical, theoretical, computational and \
                                    now data-driven) and asserted that everything about science is changing because of the \
                                    impact of information technology and the data deluge.");
  const [backgroundColor, setBackgroundColor] = useState("FFFFFF");
  // const apiBaseUrl = 'https://wordcloudme.herokuapp.com/api/wordcloud/'
  const apiBaseUrl = 'http://localhost:5000/api/JustPie/'

  /* function fetchData () {
    setDownloadLink = '';
    let urlRequestString = apiBaseUrl + 
                          '?data=' + data + 
                          '&backgroundColor=' + backgroundColor

    fetch(urlRequestString).then(res => res.json()).then(
      (result) => {
        setDownloadLink(result.message);
      },

      (error) => {
        console.log(error);
      }
    );
  }; */

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
                    <CTextarea 
                      name="data" 
                      id="data" 
                      rows="10"
                      placeholder=" 
                      Data science is a concept to unify statistics, data analysis and their related methods
                      in order to understand and analyze actual phenomena with data. It uses techniques and 
                      theories drawn from many fields within the context of mathematics, statistics, computer 
                      science, domain knowledge and information science. Turing award winner Jim Gray imagined 
                      data science as a fourth paradigm of science (empirical, theoretical, computational and 
                      now data-driven) and asserted that everything about science is changing because of the 
                      impact of information technology and the data deluge.
                      "        
                      value={data} 
                      onChange={(event) => setData(event.target.value)}
                      required
                    />
                    <CFormText>Enter your text.</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="color">Background Color</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      id="color" 
                      name="color" 
                      placeholder="\#FFFFFF"
                      value={backgroundColor}
                      onChange={(event) => setBackgroundColor(event.target.value)} 
                      required
                      />
                    <CFormText>Enter the HEX code for the background color.</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="max-words">Max Words</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      id="max-words" 
                      name="max-words" 
                      placeholder="200" 
                      required/>
                    <CFormText>Max number of words included in the word cloud.</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="repeat-words">Repeat Words</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSwitch className={'mx-1'} shape={'pill'} color={'info'} defaultChecked />
                  </CCol>
                </CFormGroup>
              </CForm>
              <CButton type="submit" color="primary">Generate Plot</CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>
              Chart Output
            </CCardHeader>
            <CCardBody>
              <CChartLine
                datasets={[
                  {
                    label: 'Data One',
                    backgroundColor: 'rgb(228,102,81,0.9)',
                    data: [30, 39, 10, 50, 30, 70, 35]
                  },
                  {
                    label: 'Data Two',
                    backgroundColor: 'rgb(0,216,255,0.9)',
                    data: [39, 80, 40, 35, 40, 20, 45]
                  }
                ]}
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default WordCloud