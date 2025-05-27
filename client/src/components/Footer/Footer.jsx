import { CustomFooter, CustomFooterColumn, FooterGroup } from './Footer.styles'
import { Typography } from '@mui/material'

const Footer = () => {
  return (
    <CustomFooter>
      <FooterGroup>
        <Typography variant='h6'>Materia:</Typography>
        <CustomFooterColumn>
          <Typography>Aplicaciones Interactivas</Typography>
        </CustomFooterColumn>
      </FooterGroup>
      <FooterGroup>
        <Typography variant='h6'>Docente:</Typography>
        <CustomFooterColumn>
          <Typography></Typography>
          
        </CustomFooterColumn>
      </FooterGroup>
      <FooterGroup>
        <Typography variant='h6'>Integrantes:</Typography>
        <CustomFooterColumn>
          <Typography></Typography>
          <Typography></Typography>
          <Typography></Typography>
          <Typography></Typography>
        </CustomFooterColumn>
      </FooterGroup>
    </CustomFooter>
  )
}

export default Footer