import React from 'react'

import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const FooterContainer = styled.div`  
  text-align: center;
  position: relative;
  bottom: 0;  
  padding: 20px;
 
 
`

const Footer = () => (
  <FooterContainer>
    <Typography variant='body1'>
      © 2021 Course project for open Full Stack, mooc.fi
    </Typography>
  </FooterContainer>
)

export default Footer
