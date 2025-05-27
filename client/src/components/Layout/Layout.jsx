import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Main, Section } from './Layout.styles'

const Layout = ({ children }) => {
  return (
    <Main>
      <NavBar/>
      <Section>{children}</Section>
      <Footer/>
    </Main>
  )
}
export default Layout